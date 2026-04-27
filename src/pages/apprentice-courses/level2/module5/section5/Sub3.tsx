/**
 * Module 5 · Section 5 · Subsection 3 — Conflict resolution
 * Maps to City & Guilds 2365-02 / Unit 210 / LO3 / AC 3.3
 *   AC 3.3 — "State the actions to take to deal with conflicts between
 *            customers and operatives, co-workers, and supervisors and operatives"
 *
 * Frame: conflict on site is normal — high-pressure work, tight deadlines,
 * difficult customers, mismatched expectations. The ones that escalate are
 * the ones that weren't dealt with early. De-escalation, structured grievance
 * procedures and ACAS conciliation are the toolkit. The apprentice triangle
 * — tutor, workplace mentor, employer — is the apprentice-specific safety net
 * for disputes about training, hours and the line between banter and bullying.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Conflict resolution (3.3) | Level 2 Module 5.5.3 | Elec-Mate';
const DESCRIPTION =
  'Customer / co-worker / supervisor disputes — de-escalation, grievance procedures, ACAS conciliation and the apprentice triangle. Stay calm, document, escalate properly.';

/* ── Inline checks ────────────────────────────────────────────────── */

const checks = [
  {
    id: 'mod5-s5-sub3-customer',
    question:
      "A customer comes out of the kitchen mid-job, visibly angry, and says 'you're useless, I want a different electrician'. You're an apprentice on day three of a five-day rewire and you've done everything by the book. What's your response?",
    options: [
      "Argue back — defend yourself, explain why the customer is wrong.",
      "Stay calm. Don't take it personally. Acknowledge the customer's frustration without agreeing with the substance ('I can see this isn't what you expected — I'm sorry it's frustrating'). Don't argue, don't explain at length, don't get defensive. Offer to call your supervisor immediately so they can come to site or speak to the customer directly. Document the interaction in your job pack — date, time, exact words, your response — and let the supervisor handle the conversation about scope and quality. Carry on with the work in a non-confrontational way until the supervisor arrives.",
      "Pack up and leave the site immediately.",
      "Tell the customer it's not your problem and finish the day.",
    ],
    correctIndex: 1,
    explanation:
      "Customer-facing conflict is one of the most common situations apprentices face and one of the most badly handled when it isn't anticipated. The de-escalation principle is: acknowledge the feelings without conceding the substance, separate the person from the problem, escalate to the supervisor for the contractual conversation, and document everything for the file. 'You're useless' isn't a contractual statement — it's a frustrated outburst. The supervisor's job is to find out what's actually wrong (often unrelated to the apprentice's actual work) and address it. The apprentice's job is to stay safe, stay professional and not take the bait.",
  },
  {
    id: 'mod5-s5-sub3-coworker',
    question:
      "A co-worker on your team has been making comments about your accent for the past week. They're framed as 'banter' but they're consistent and they're starting to bother you. What's the right next step?",
    options: [
      "Ignore it — it's just banter, it'll stop.",
      "Have a direct, private conversation with the co-worker first. State clearly that the comments aren't welcome and you'd like them to stop ('I know it's meant as banter, but the accent comments aren't landing as funny — I'd appreciate it if you stopped'). Keep it brief, don't argue. If the comments continue, raise it with your supervisor or your training-provider mentor. Repeated unwanted conduct related to a protected characteristic (race, in this case) is harassment under Equality Act 2010 s.26 — it doesn't have to be 'severe' to count, just unwanted, repeated and connected to a protected characteristic. Document the conversations in writing.",
      "Confront the co-worker in front of the whole team to humiliate them.",
      "Tell the customer.",
    ],
    correctIndex: 1,
    explanation:
      "ACAS guidance and the Equality Act 2010 both treat the direct private conversation as the appropriate first step for low-level conflict — it gives the other party the chance to stop without formal escalation, and it preserves the working relationship. If the conduct continues, escalation to the supervisor and the training-provider mentor (the apprentice triangle) is the next step, followed by a formal grievance under the employer's procedure if needed. Equality Act 2010 s.26 makes harassment related to a protected characteristic unlawful — accent is closely tied to race / nationality / national origin and the law treats these as protected.",
  },
  {
    id: 'mod5-s5-sub3-supervisor',
    question:
      "Your supervisor has consistently been giving you tasks that are below your training level and refusing to let you do the more complex work. You've raised it informally twice and nothing has changed. What's the right next step?",
    options: [
      "Quit and find a new employer.",
      "Raise it formally. As an apprentice you have three points of contact — your employer (formal grievance procedure under the ACAS Code), your training-provider tutor (responsible for the quality of your training experience), and your end-point assessment organisation. Talk to your tutor first — they have the authority to intervene with the employer about training quality. If the employer is in breach of the apprenticeship agreement (which sets out the training the employer must provide), there's a documented escalation route. ACAS conciliation is available if it can't be resolved internally.",
      "Confront the supervisor publicly.",
      "Sabotage the work to prove a point.",
    ],
    correctIndex: 1,
    explanation:
      "Apprentices have specific protections that ordinary employees don't. The apprenticeship agreement (a tripartite agreement between apprentice, employer and training provider) sets out the training the employer must provide. Failure to provide that training is a breach of the agreement and the training provider has the authority and the duty to intervene. The 'apprentice triangle' — apprentice, tutor, employer — is the structural mechanism for resolving training-quality disputes without the apprentice having to raise a formal grievance against their employer alone. ACAS conciliation is the next step if the internal route fails, and an employment tribunal is the backstop.",
  },
];

/* ── End-of-page Quiz ─────────────────────────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "What's the first step in dealing with a conflict between an operative and a customer?",
    options: [
      "Argue back — defend the work.",
      "De-escalate. Stay calm, acknowledge the customer's feelings without conceding the substance, separate the person from the problem, don't get drawn into argument. Offer to involve the supervisor for the contractual conversation. Document the interaction. The first move in conflict resolution is to lower the temperature, not to win the point.",
      "Walk off site.",
      "Argue louder than the customer.",
    ],
    correctAnswer: 1,
    explanation:
      "De-escalation is the universal first step. ACAS guidance, conflict-resolution training in safeguarding contexts, and police de-escalation protocols all share the same core: lower the temperature first, address the substance second. Arguing back rarely wins the point and almost always escalates the conflict. The apprentice's job in a customer conflict is to stay calm, stay safe, stay professional and pass the contractual conversation to the supervisor.",
  },
  {
    id: 2,
    question:
      "Under the ACAS Code of Practice on Discipline and Grievance, what's the right approach to a workplace dispute?",
    options: [
      "Take it straight to an employment tribunal.",
      "Resolve it informally first where possible. The ACAS Code recommends informal resolution as the starting point, then a written grievance under the employer's documented grievance procedure, then a meeting with management with the right to be accompanied by a colleague or trade-union representative, then a written outcome with a right of appeal. ACAS conciliation is available if the internal procedure fails. Employment tribunal is the last resort and tribunals will assess whether both parties followed the Code reasonably.",
      "Quit and find a new employer.",
      "Argue with the supervisor in front of the whole team.",
    ],
    correctAnswer: 1,
    explanation:
      "The ACAS Code of Practice on Discipline and Grievance (issued under the Trade Union and Labour Relations (Consolidation) Act 1992 s.199) is the framework. Tribunals can adjust awards by up to 25% where one party has unreasonably failed to follow the Code. The structured escalation — informal, written grievance, meeting, outcome, appeal, ACAS conciliation, tribunal — is designed to resolve disputes at the earliest possible stage and most disputes are resolved before they reach tribunal.",
  },
  {
    id: 3,
    question:
      "What's the definition of harassment under the Equality Act 2010 s.26?",
    options: [
      "Only physical assault counts as harassment.",
      "Unwanted conduct related to a protected characteristic (or unwanted conduct of a sexual nature) which has the purpose or effect of violating a person's dignity or creating an intimidating, hostile, degrading, humiliating or offensive environment. The conduct doesn't have to be 'severe' to count — repeated 'banter' related to race, sex, disability or another protected characteristic can be harassment if it has the proscribed effect on the recipient.",
      "Only conduct by a supervisor counts as harassment.",
      "Only conduct that's intended to harass counts — accidental conduct doesn't.",
    ],
    correctAnswer: 1,
    explanation:
      "Equality Act 2010 s.26 is the harassment definition. Two important points: (1) the conduct only needs the 'purpose or effect' of creating the proscribed environment — so the perpetrator's intent doesn't matter if the recipient reasonably perceives the effect; (2) it covers conduct related to any protected characteristic (race, sex, disability, sexual orientation, religion, age, gender reassignment), not just sexual harassment. The 'banter' defence doesn't protect employers from liability when a reasonable recipient would have found the conduct offensive.",
  },
  {
    id: 4,
    question:
      "What does ACAS stand for and what does it do?",
    options: [
      "Association of Construction and Allied Sites — a trade body.",
      "Advisory, Conciliation and Arbitration Service — a non-departmental public body that provides free, impartial advice on workplace rights and conflict resolution. ACAS publishes the Codes of Practice on Discipline and Grievance, runs early conciliation (mandatory before most employment tribunal claims), provides advice through a national helpline, and trains employers and unions on workplace dispute resolution.",
      "Advanced Compliance and Audit Service — a regulator.",
      "American Construction and Architecture Society.",
    ],
    correctAnswer: 1,
    explanation:
      "ACAS — Advisory, Conciliation and Arbitration Service — is the UK's workplace disputes body. The Codes of Practice it issues are taken into account by employment tribunals when assessing the reasonableness of conduct on both sides. Early conciliation is mandatory before most employment tribunal claims — the prospective claimant must contact ACAS first and ACAS attempts to resolve the dispute without tribunal proceedings. ACAS guidance on managing workplace conflict is the practical reference for most situations short of formal grievance.",
  },
  {
    id: 5,
    question:
      "An apprentice has a dispute with their employer about the quality of training being provided. Who can the apprentice escalate to?",
    options: [
      "Nobody — the apprentice has to deal with it themselves.",
      "The training-provider tutor first — they have responsibility for the quality of the apprentice's training experience and the authority to intervene with the employer. The apprenticeship agreement is a tripartite document (apprentice, employer, training provider) and the training provider can hold the employer to account on training delivery. If that doesn't resolve it, the apprentice can raise a formal grievance with the employer under the ACAS Code, escalate to ACAS conciliation, and ultimately to an employment tribunal.",
      "The customer.",
      "The HSE.",
    ],
    correctAnswer: 1,
    explanation:
      "The 'apprentice triangle' is the apprentice-specific dispute-resolution mechanism. The training provider has both authority and duty to intervene on training-quality issues — they are funded on the basis of delivering the apprenticeship to standard, and the Education and Skills Funding Agency monitors their performance. Tutors are usually the first and best contact for disputes about hours, training opportunities, or any sense that the employer isn't honouring the apprenticeship agreement.",
  },
  {
    id: 6,
    question:
      "What's the right way to document a conflict that you've raised informally with a co-worker?",
    options: [
      "Don't document it — it'll blow over.",
      "Make a contemporaneous note in your own records — date, time, location, what was said, by whom, who else was present, your response. Keep the note factual and unemotional. Don't share with the co-worker (it's your private record at this stage). If the conflict continues and you escalate, the contemporaneous notes are your evidence base and they carry significant weight because they were written at the time, not from memory weeks later.",
      "Post about it on social media.",
      "Tell every other colleague to take sides.",
    ],
    correctAnswer: 1,
    explanation:
      "Contemporaneous notes are the apprentice's strongest protection in any later dispute. Tribunals and ACAS conciliation officers consistently give weight to notes written at or near the time, in factual unemotional language, in a private record kept by the person experiencing the conflict. The note is not for circulation — it's your private record. If the matter escalates to a formal grievance, the notes form the chronology that supports your account.",
  },
  {
    id: 7,
    question:
      "What protection does the Employment Rights Act 1996 s.44 provide?",
    options: [
      "No protection — it's not an employee-rights statute.",
      "The right not to suffer detriment for raising health and safety concerns. An employee who is dismissed, demoted, denied promotion, harassed or otherwise penalised for raising a genuine health and safety concern (or for refusing to work in conditions of serious and imminent danger) has a claim under s.44. The right is automatic and doesn't require a qualifying period of employment.",
      "Protection from being asked to work overtime.",
      "Protection from being asked to wear PPE.",
    ],
    correctAnswer: 1,
    explanation:
      "Employment Rights Act 1996 s.44 is the whistleblower-style protection for health and safety. Combined with HASAWA s.7 (the personal duty to take reasonable care and to co-operate with safety arrangements) it forms the apprentice's legal armour for raising safety concerns. 'Following orders' isn't a defence to a HASAWA s.7 prosecution if you knew the order was unsafe, and the employer can't lawfully penalise you for raising the concern. Document the safety concern in writing — even a short text or email — and the s.44 protection is much stronger.",
  },
  {
    id: 8,
    question:
      "What's the appropriate first step when a customer makes a formal complaint about your work to your employer?",
    options: [
      "Get angry at the customer next time you see them.",
      "Cooperate fully with your employer's investigation. Provide a calm, factual account of what happened — what you did, when, with what materials, against what specification, with what test results, with what documentation. Don't speculate about the customer's motives. Don't post about it on social media. Don't approach the customer directly. The employer will manage the customer relationship; your job is to give your employer the evidence base they need to respond.",
      "Confront the customer directly.",
      "Ignore it and hope it goes away.",
    ],
    correctAnswer: 1,
    explanation:
      "Customer complaints are managed by the employer. The apprentice's role is to provide a complete and honest account of what was done. The contemporaneous documentation — site diary, photos, test results, signed certificates, job-pack notes — is what allows the employer to respond effectively. Approaching the customer directly, posting on social media or getting defensive almost always makes the situation worse. Cooperate fully, document fully, and let the employer manage the relationship.",
  },
];

/* ── FAQs ─────────────────────────────────────────────────────────── */

const faqs = [
  {
    question: "If I'm being bullied at work, what should I do?",
    answer:
      "Document everything from now on — a private record of incidents with date, time, location, what was said or done, who else was present, your response. Raise it informally with the perpetrator first if you feel safe to do so ('this isn't OK with me, please stop'). If it continues or you don't feel safe, raise it with your supervisor or your training-provider tutor. Bullying that's related to a protected characteristic (race, sex, disability, sexual orientation, religion, age, gender reassignment) is harassment under Equality Act 2010 s.26 and the employer is liable. Bullying that's not related to a protected characteristic isn't directly covered by the Equality Act but may be a breach of the implied term of trust and confidence in the employment contract. ACAS provides guidance and the Lighthouse Club helpline (0345 605 1956, 24/7) is available for emotional support specific to construction workers."
  },
  {
    question: "What's the difference between banter and bullying?",
    answer:
      "Legally, the test is the recipient's perception. Equality Act 2010 s.26 makes unwanted conduct harassment if it has the purpose OR effect of violating dignity or creating an intimidating, hostile, degrading, humiliating or offensive environment. The perpetrator's intent doesn't shield them if the recipient reasonably perceives the effect. Practically, banter that's clearly mutual, light-touch and stops when asked is fine. Banter that's repeatedly unwanted, escalates when called out, targets a specific person or relates to a protected characteristic crosses into bullying. The 'we all rib each other on site' defence doesn't protect employers from harassment liability."
  },
  {
    question: "Can my employer dismiss me for raising a grievance?",
    answer:
      "No — that would be victimisation under Equality Act 2010 s.27 (where the grievance relates to a protected characteristic) or detriment for asserting a statutory right under Employment Rights Act 1996 (where the grievance relates to other employee rights). For health and safety grievances specifically, ERA 1996 s.44 protection applies. You don't need a qualifying period of service for s.44 protection. If you're dismissed in retaliation for raising a grievance, that's likely automatically unfair dismissal and the tribunal awards can be substantial. ACAS provides advice on protected disclosures (whistleblowing) and the conciliation route for resolution."
  },
  {
    question: "I think my supervisor is treating me unfairly because I'm new and female. What can I do?",
    answer:
      "Sex is a protected characteristic under Equality Act 2010 s.4. Less favourable treatment because of sex is direct discrimination under s.13. Document specific incidents — date, time, what happened, who was present, comparable treatment of male colleagues. Raise it informally with the supervisor or with the training-provider tutor first. If it continues, raise a formal grievance under your employer's procedure (ACAS Code on Discipline and Grievance). ACAS early conciliation is mandatory before tribunal but can resolve the dispute without proceedings. The Equality Advisory Support Service (gov.uk) provides free advice. WISE (Women into Science and Engineering) and the Electrical Industries Charity also offer guidance and peer support specifically for women in the electrical industry."
  },
  {
    question: "If a customer is being verbally abusive to me, am I allowed to leave?",
    answer:
      "Yes, in two ways. First, your employer's duty under HASAWA s.2 covers your safety — including your psychological safety. Verbal abuse from a customer is a workplace hazard the employer is required to control. Second, your personal duty under HASAWA s.7 covers your own safety — you're entitled to remove yourself from a situation where you're being subjected to verbal abuse. The practical sequence: stay calm, don't respond in kind, remove yourself from the immediate situation (go to the van or to the welfare cabin), call your supervisor immediately. The supervisor will manage the customer; you don't have to. Document the incident in writing as soon as you're safe."
  },
  {
    question: "How do I raise a formal grievance against my supervisor?",
    answer:
      "Your employer is required to have a written grievance procedure (ACAS Code recommendation, and an implied term of the employment contract). Get a copy of the procedure first. The general structure is: (1) put the grievance in writing to a named person (often HR or a more senior manager — not the supervisor you're complaining about); (2) the employer holds a grievance meeting with you, where you have the right to be accompanied by a colleague or trade-union representative; (3) the employer issues a written outcome with reasons; (4) you have a right of appeal. ACAS early conciliation is the next step if internal resolution fails. Document everything in writing, keep copies of all correspondence, and consider seeking advice from your training-provider tutor, ACAS or a trade union."
  },
];

export default function Sub3() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 5
          </button>

          <PageHero
            eyebrow="Module 5 · Section 5 · Subsection 3"
            title="Conflict resolution — customer, co-worker, supervisor"
            description="De-escalation is the universal first move. After that, the structured route is informal conversation → written grievance → ACAS conciliation → tribunal. The apprentice triangle (you, tutor, employer) is the apprentice-specific safety net."
            tone="emerald"
          />

          <TLDR
            points={[
              "De-escalate first. Acknowledge the feelings without conceding the substance, separate the person from the problem, lower the temperature before addressing the issue. Stay calm, stay safe, stay professional.",
              "Customer conflict goes to the supervisor for the contractual conversation. Co-worker conflict starts with an informal direct conversation, then escalates if needed. Supervisor conflict uses the apprentice triangle (tutor, employer) and the formal grievance procedure.",
              "Document everything — contemporaneous notes in your private record. Date, time, what happened, who was present, your response. Tribunals and ACAS officers give significant weight to contemporaneous notes.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "State the actions to take to deal with conflicts between customers and operatives, co-workers, and supervisors and operatives.",
              "Apply de-escalation as the universal first step in conflict — calm tone, acknowledgement of feelings, separation of person from problem.",
              "Identify the ACAS Code of Practice on Discipline and Grievance as the framework for workplace dispute resolution.",
              "Recognise the apprentice triangle (apprentice / tutor / employer) as the apprentice-specific dispute-resolution mechanism.",
              "Identify Equality Act 2010 s.26 as the harassment provision and the protection it provides for protected characteristics.",
              "Recognise Employment Rights Act 1996 s.44 as the protection from detriment for raising health and safety concerns.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why conflict on site is normal — and why most of it doesn't escalate</ContentEyebrow>

          <ConceptBlock
            title="Conflict is a feature of the work, not a bug"
            plainEnglish="Sites are high-pressure environments — tight deadlines, multiple trades, demanding customers, weather delays, supply-chain failures, scope creep. Conflict between people working in those conditions is normal. The conflicts that escalate into formal grievances or contract disputes are the ones that weren't handled early. Most are resolved by a calm conversation in the first hour."
            onSite="Apprentices often think conflict means failure — failure of the team, failure of the work, failure of the relationship. It doesn't. Conflict means two people see something differently. The skill is being able to handle the disagreement without making it personal, escalating it unnecessarily or shutting it down by walking off. The four de-escalation moves below are the universal toolkit."
          >
            <p>
              The four de-escalation moves:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Stay calm</strong> — control your tone and your body language.
                Match the other person&apos;s emotional level coming down, never up.
                A calm voice in the face of an angry one is the single most effective
                de-escalation tool.
              </li>
              <li>
                <strong>Acknowledge the feelings</strong> — &quot;I can see this is
                frustrating&quot;, &quot;I hear you&quot;, &quot;that sounds difficult&quot;.
                Acknowledging the emotion isn&apos;t agreeing with the substance — it&apos;s
                showing you&apos;ve heard the person.
              </li>
              <li>
                <strong>Separate the person from the problem</strong> — focus on the
                issue, not the personalities. &quot;You&apos;re useless&quot; is about
                the person; &quot;the kitchen still doesn&apos;t have power&quot; is
                about the issue. Address the issue.
              </li>
              <li>
                <strong>Don&apos;t take the bait</strong> — when someone is angry they
                may say things they don&apos;t mean. Responding to the worst things
                they say escalates the conflict. Stay focused on resolution.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Customer-operative conflict</ContentEyebrow>

          <ConceptBlock
            title="The customer conflict — de-escalate, escalate to supervisor, document"
            plainEnglish="Customer conflict comes from a range of triggers — delay, mess, unexpected cost, perceived rudeness, anxiety about the work, family pressures unrelated to the job. The apprentice's job is to de-escalate the immediate moment, get the supervisor involved for the contractual conversation, and document the interaction for the file."
            onSite="Customers don't usually mean what they say in the heat of an outburst. 'You're useless, I want a different electrician' often means 'I'm worried this is going to cost more than I planned' or 'I'm stressed about something unrelated and I'm taking it out on you'. The supervisor's job is to find out what's actually wrong; the apprentice's job is to stay calm, stay professional and not make it worse."
          >
            <p>
              The structured response to a customer conflict:
            </p>
            <ol className="space-y-2 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Stay calm and lower the temperature</strong> — calm tone, open
                body language, acknowledge the feelings (&quot;I can see this isn&apos;t
                what you expected&quot;).
              </li>
              <li>
                <strong>Don&apos;t argue, don&apos;t defend at length</strong> — short
                acknowledgement, then move to escalation. Long defensive explanations
                escalate the conflict.
              </li>
              <li>
                <strong>Offer to involve the supervisor</strong> — &quot;I&apos;d like
                to call my supervisor so they can talk you through this — they&apos;ll
                be here in 20 minutes&quot;. The supervisor is the right person for the
                contractual conversation.
              </li>
              <li>
                <strong>Step back from the immediate situation if you need to</strong>
                — go to the van, go to the welfare cabin, give the customer space and
                yourself a moment to breathe. You&apos;re entitled to do this under
                HASAWA s.7.
              </li>
              <li>
                <strong>Document the interaction</strong> — date, time, what was said,
                exact words where you remember them, your response, what action you
                took, who you contacted. The note becomes part of the project file.
              </li>
              <li>
                <strong>Never argue back, never swear, never walk off without notifying</strong>
                — those are the moves that turn a complaint into a scheme withdrawal,
                a contract loss, or a reputational issue.
              </li>
            </ol>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Co-worker conflict</ContentEyebrow>

          <ConceptBlock
            title="The co-worker conflict — direct conversation first, escalate if it continues"
            plainEnglish="Conflict between co-workers is most often resolved by a direct, private, calm conversation. ACAS guidance treats this as the appropriate first step for low-level workplace conflict — it gives the other party the chance to change without formal escalation, and it preserves the working relationship."
            onSite="The direct conversation works because most people are willing to adjust their behaviour when they realise it's affecting a colleague — particularly if the conversation is calm and private rather than confrontational and public. The conversation needs three things: a private location, a focus on the specific behaviour (not the person's character), and a clear statement of what you'd like to change."
          >
            <p>
              The structured approach to co-worker conflict:
            </p>
            <ol className="space-y-2 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Direct private conversation first</strong> — neutral location,
                calm tone, focus on the behaviour not the person. &quot;I know it&apos;s
                meant as banter, but the comments about my accent aren&apos;t landing as
                funny — I&apos;d appreciate it if you stopped&quot;.
              </li>
              <li>
                <strong>Be specific</strong> — describe the behaviour, when it happens,
                how it affects you. Avoid sweeping statements (&quot;you always&quot;,
                &quot;you never&quot;).
              </li>
              <li>
                <strong>Listen to their response</strong> — they may have a perspective
                you hadn&apos;t considered. Be open to it.
              </li>
              <li>
                <strong>Agree what changes</strong> — both sides leave the conversation
                clear on what the agreement is.
              </li>
              <li>
                <strong>If it continues, escalate</strong> — supervisor first, then
                training-provider tutor (for apprentices), then formal grievance under
                the employer&apos;s procedure.
              </li>
              <li>
                <strong>Document throughout</strong> — contemporaneous private notes
                of the incidents, the conversations, the agreed changes, what
                happened next.
              </li>
            </ol>
          </ConceptBlock>

          <RegsCallout
            source="Equality Act 2010 — s.26(1) (paraphrased)"
            clause={
              <>
                A person (A) harasses another (B) if A engages in unwanted conduct related
                to a relevant protected characteristic, and the conduct has the purpose or
                effect of (i) violating B&apos;s dignity, or (ii) creating an intimidating,
                hostile, degrading, humiliating or offensive environment for B. (Section
                26(1).)
              </>
            }
            meaning={
              <>
                Two important features of s.26. First — &quot;purpose or effect&quot;.
                The perpetrator&apos;s intent doesn&apos;t shield them if the recipient
                reasonably perceives the effect. The &quot;banter&quot; defence
                doesn&apos;t protect employers from liability when a reasonable
                recipient would have found the conduct offensive. Second — the
                conduct only needs to be &quot;related to&quot; a protected
                characteristic, not directly about it. Repeated comments about a
                worker&apos;s accent are race-related (accent is closely tied to
                national origin, which is part of race under the Act) and qualify
                as harassment if they have the proscribed effect.
              </>
            }
            cite="Source: Equality Act 2010 (2010 c.15), s.26 — paraphrased from legislation.gov.uk."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Supervisor-operative conflict</ContentEyebrow>

          <ConceptBlock
            title="The supervisor conflict — informal, formal grievance, ACAS, tribunal"
            plainEnglish="Conflict between a supervisor and an operative is more sensitive than co-worker conflict because of the power imbalance. The supervisor controls work allocation, training opportunities, performance reviews and (in many firms) the path to promotion or qualified status. Raising a conflict with a supervisor takes courage and needs to be done properly."
            onSite="The structured route is informal conversation first (with a witness if you don't feel safe), then formal grievance under the ACAS Code, then ACAS early conciliation, then employment tribunal as a last resort. For apprentices specifically the training-provider tutor is a parallel route — they have authority to intervene with the employer on training-quality issues without the apprentice having to raise a formal grievance against their employer alone."
          >
            <p>
              The structured response to a supervisor conflict:
            </p>
            <ol className="space-y-2 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Informal conversation first</strong> — raise the concern
                directly with the supervisor in a private setting, calmly, focused on
                the specific behaviour. Often the supervisor isn&apos;t aware of the
                impact and will adjust.
              </li>
              <li>
                <strong>If informal doesn&apos;t resolve it, escalate</strong> — for an
                apprentice, the training-provider tutor is often the best second point
                of contact. They have authority to intervene with the employer.
              </li>
              <li>
                <strong>Formal written grievance</strong> — under the employer&apos;s
                documented grievance procedure (ACAS Code on Discipline and Grievance).
                Submit in writing to a named person — usually HR or a more senior
                manager.
              </li>
              <li>
                <strong>Grievance meeting</strong> — held by the employer, you have
                the right to be accompanied by a colleague or trade-union
                representative.
              </li>
              <li>
                <strong>Written outcome</strong> — employer issues a written outcome
                with reasons; you have a right of appeal.
              </li>
              <li>
                <strong>ACAS early conciliation</strong> — mandatory before most
                employment tribunal claims. ACAS attempts to resolve without tribunal.
              </li>
              <li>
                <strong>Employment tribunal</strong> — the last resort. Most disputes
                are resolved before this stage.
              </li>
            </ol>
          </ConceptBlock>

          <ConceptBlock
            title="The apprentice triangle — apprentice, tutor, employer"
            plainEnglish="Apprentices have a three-way relationship — apprentice, employer, training provider — that ordinary employees don't. The training provider has both authority and duty to intervene on training-quality issues, including disputes about hours, the type of work being given, and any sense that the employer isn't honouring the apprenticeship agreement."
            onSite="Tutors are usually the first and best contact for apprentice-specific disputes. They can intervene with the employer informally, formally, or escalate to the Education and Skills Funding Agency if needed. The tutor's role isn't to take sides — it's to make sure the apprenticeship agreement is being honoured."
          >
            <p>
              When to use the apprentice triangle:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Training quality issues</strong> — the employer is giving you
                tasks below your training level, refusing to let you do more complex
                work, or not providing the off-the-job training time required by the
                apprenticeship agreement.
              </li>
              <li>
                <strong>Working hours disputes</strong> — being asked to work hours
                that conflict with college release, being denied college release time.
              </li>
              <li>
                <strong>Banter / bullying / harassment</strong> — particularly where
                the apprentice doesn&apos;t feel safe raising it directly with the
                employer.
              </li>
              <li>
                <strong>Pay disputes</strong> — National Minimum Wage for apprentices,
                holiday pay, unpaid wages.
              </li>
              <li>
                <strong>Health and safety concerns</strong> — particularly where the
                apprentice has been asked to work outside their competence or in
                unsafe conditions.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The escalation ladder — when to involve the supervisor, when to escalate further"
            plainEnglish="Most conflict is resolved at the lowest rung of the ladder — a calm direct conversation between the two people involved. The structured ladder above that is informal escalation to the supervisor, then mediation (often via the training-provider tutor for an apprentice), then a formal written grievance under the employer's procedure, then ACAS early conciliation, then employment tribunal as the backstop. Each rung is designed to keep the dispute as close to the source as possible."
            onSite="The mistake apprentices make is jumping rungs — going straight to a formal grievance without trying the informal conversation first, or going straight to ACAS without trying the internal grievance procedure. Tribunals look unfavourably on parties who skip rungs, and the ACAS Code allows tribunals to reduce awards by up to 25% for unreasonable failure to follow the Code. The other mistake is staying on a rung that's clearly not working — three months of 'banter' continuing after you've raised it informally is a signal to escalate, not to keep hoping it stops."
          >
            <p>
              The five rungs of the escalation ladder, in order:
            </p>
            <ol className="space-y-2 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Informal direct conversation</strong> — the two people
                involved, in a private setting, focused on the specific behaviour.
                Most conflicts end here. Document the conversation in your private
                notes.
              </li>
              <li>
                <strong>Supervisor involvement / mediation</strong> — if the direct
                conversation didn&apos;t land, raise it with your supervisor. For
                apprentices the training-provider tutor is a parallel mediator
                with the authority to talk to the employer about training-quality
                or relationship issues without it being a formal grievance.
              </li>
              <li>
                <strong>Formal written grievance under the ACAS Code</strong> — in
                writing to a named person (usually HR or a more senior manager,
                not the supervisor you&apos;re complaining about). Grievance
                meeting with the right to be accompanied. Written outcome with
                reasons. Right of appeal.
              </li>
              <li>
                <strong>ACAS early conciliation</strong> — mandatory before most
                employment tribunal claims. ACAS attempts to resolve the dispute
                without proceedings. Free, confidential, and resolves a
                significant share of disputes.
              </li>
              <li>
                <strong>Employment tribunal</strong> — the last resort.
                Time-limited (usually three months less one day from the act
                complained of, extended by the early-conciliation period).
                Costly in time and stress for both sides; most disputes are
                resolved before this rung.
              </li>
            </ol>
            <p className="mt-3">
              Worked example. An apprentice raises &quot;banter&quot; about their
              accent informally with the co-worker — the co-worker apologises and
              stops (rung 1, end of dispute). If it had continued, the apprentice
              would have escalated to the supervisor or training-provider tutor
              (rung 2). If that hadn&apos;t resolved it, a formal grievance to HR
              (rung 3). If the employer&apos;s response was inadequate, ACAS
              early conciliation (rung 4). If still unresolved, an employment
              tribunal claim under Equality Act 2010 s.26 (rung 5). Each rung
              gives the system a chance to fix the issue before the next one.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Written record discipline — why every conflict needs a paper trail"
            plainEnglish="The single most useful thing you can do during a workplace conflict is keep a contemporaneous written record. A short factual diary entry the same day. A follow-up email after a verbal conversation summarising what was agreed. The name of any witness who was present. ACAS officers and tribunals consistently weight contemporaneous notes above memory recalled weeks later — the notes were written when the events were fresh and they weren't crafted with a tribunal in mind."
            onSite="The discipline isn't difficult — it's a five-minute habit. Diary entry: date, time, location, who was present, what was said (exact words where you remember them), your response, what action followed. Email follow-up: 'Just to confirm what we agreed in our conversation today — you'll do X, I'll do Y, we'll review on date Z.' Send it from your work email so the timestamp is independent. Don't editorialise, don't speculate about motives, don't insult anyone in writing. The notes are for your private record and (if needed) the formal process; they aren't for circulation."
          >
            <p>
              What to record — and what to leave out:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Record the facts</strong> — date, time, location, people
                present, what was said in factual unemotional language, your
                response, what action was taken or agreed. Direct quotes where
                you remember them, in quotation marks.
              </li>
              <li>
                <strong>Record the witnesses</strong> — who else was present, where
                they were standing, whether they saw or heard the incident. A
                witness account written near the time is valuable evidence; a
                witness contacted three months later often can&apos;t remember.
              </li>
              <li>
                <strong>Send a follow-up email after verbal conversations</strong>
                — short, factual, summarising what was agreed. Independent
                timestamp, independent record. If the other party disputes the
                summary, that&apos;s itself useful information.
              </li>
              <li>
                <strong>Don&apos;t speculate about motives</strong> — &quot;he
                said X&quot; is fact; &quot;he said X because he&apos;s been
                trying to get rid of me for months&quot; is speculation that
                weakens your record. Stick to what was said and done.
              </li>
              <li>
                <strong>Don&apos;t insult anyone in writing</strong> — assume
                everything you write could end up in a grievance hearing or
                tribunal bundle. Calm factual language carries weight; angry
                or sarcastic language doesn&apos;t.
              </li>
              <li>
                <strong>Keep the notes private at this stage</strong> — your
                personal record. Don&apos;t share with the co-worker
                you&apos;re complaining about, don&apos;t post on social media,
                don&apos;t circulate among the team. If it escalates to a
                formal process, the notes go to the people in the procedure.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Customer-vs-coworker conflict differential — what changes when it's a customer not a colleague"
            plainEnglish="Conflict with a customer follows the same de-escalation principles as conflict with a co-worker, but the surrounding pressures are different. The customer is paying the firm and is the firm's reputation in their network. The Consumer Rights Act 2015 sits behind everything they say. A complaint to the Competent Person Scheme (NICEIC, NAPIT, ELECSA) can suspend or withdraw the firm's right to self-certify. The conflict has commercial weight that a co-worker dispute doesn't carry, and the apprentice's response needs to recognise that without losing composure."
            onSite="The de-escalation script is the same — stay calm, acknowledge feelings, separate person from problem, don't take the bait — but with three additions for customer conflict. First, escalate to the supervisor for the contractual conversation rather than trying to resolve it yourself. Second, document with extra care because the documentation may go to the certification scheme or Trading Standards. Third, never argue back, never swear, never walk off without notifying — those are the moves that turn a recoverable complaint into a scheme withdrawal."
          >
            <p>
              The differences between customer and co-worker conflict in practice:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Commercial pressure</strong> — the customer is paying. A
                broken customer relationship is lost revenue; a public complaint is
                lost future revenue from their network. The firm has a strong
                interest in preserving the relationship even when the customer is
                being unreasonable.
              </li>
              <li>
                <strong>Scheme implications</strong> — Part P of the Building
                Regulations relies on Competent Person Scheme membership for
                self-certification of domestic notifiable work. Customer complaints
                to NICEIC / NAPIT / ELECSA can trigger investigation, additional
                supervision requirements, or in serious cases scheme withdrawal.
                Co-worker disputes don&apos;t carry the same regulatory weight.
              </li>
              <li>
                <strong>Consumer Rights Act 2015 backdrop</strong> — every customer
                interaction is implicitly governed by s.49 (services performed
                with reasonable care and skill). Customer complaints often crystallise
                a s.49 dispute that can be pursued in the Small Claims Court without
                legal representation.
              </li>
              <li>
                <strong>Escalate to supervisor for the contractual conversation</strong>
                — the apprentice&apos;s job is to de-escalate the immediate moment;
                the supervisor&apos;s job is to handle the substance. With a
                co-worker dispute the apprentice often handles the whole
                conversation themselves.
              </li>
              <li>
                <strong>De-escalation script — &quot;I can see this isn&apos;t what
                you expected&quot;</strong> — acknowledge feelings without conceding
                the substance. Offer to call the supervisor immediately. Step back
                to the van or welfare cabin if you need to breathe. You&apos;re
                entitled to do this under HASAWA s.7 — your psychological safety
                is part of the s.2 duty owed by the employer.
              </li>
              <li>
                <strong>Never argue back, never swear, never walk off without
                notifying</strong> — those are the moves that turn a complaint
                into a scheme withdrawal, a contract loss, or a one-star online
                review. The apprentice&apos;s personal composure is part of the
                firm&apos;s commercial protection.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="ACAS Code of Practice on Discipline and Grievance Procedures (paraphrased)"
            clause={
              <>
                <p className="mb-2">
                  Employers and employees should where possible try to resolve disciplinary
                  and grievance issues in the workplace. Where this isn&apos;t possible,
                  the Code sets out principles for handling these situations fairly,
                  including: (1) raising and dealing with issues promptly; (2) acting
                  consistently; (3) carrying out necessary investigations to establish
                  the facts; (4) informing employees of the basis of the problem and
                  giving them an opportunity to put their case in response; (5) allowing
                  employees to be accompanied at any formal disciplinary or grievance
                  meeting; and (6) allowing an employee to appeal against any formal
                  decision made.
                </p>
                <p>
                  Employment tribunals are required to take the Code into account when
                  considering relevant cases. Tribunals will be able to adjust any
                  awards made in relevant cases by up to 25% for unreasonable failure
                  to comply with any provision of the Code.
                </p>
              </>
            }
            meaning={
              <>
                The ACAS Code is the procedural backbone of UK workplace dispute
                resolution. It&apos;s not law in itself but it&apos;s issued under
                the Trade Union and Labour Relations (Consolidation) Act 1992 s.199
                and tribunals are required to take it into account. The 25% award
                adjustment for unreasonable failure to follow the Code is the practical
                stick that makes employers comply. As an apprentice or operative
                raising a grievance, follow the Code yourself — informal first,
                written grievance, attend the meeting with a representative, request
                a written outcome, exercise your right of appeal. Following the Code
                strengthens your position significantly if the matter escalates.
              </>
            }
            cite="Source: ACAS Code of Practice on Discipline and Grievance Procedures (issued under TULRCA 1992 s.199) — paraphrased from acas.org.uk."
          />

          <RegsCallout
            source="Health and Safety at Work etc Act 1974 — s.2(1) (and s.2(2)(c) on information/training)"
            clause={
              <>
                <p className="mb-2">
                  <strong>s.2(1)</strong> — &quot;It shall be the duty of every employer
                  to ensure, so far as is reasonably practicable, the health, safety
                  and welfare at work of all his employees.&quot;
                </p>
                <p>
                  <strong>s.2(2)(c)</strong> — extends the duty to include &quot;the
                  provision of such information, instruction, training and supervision
                  as is necessary to ensure, so far as is reasonably practicable, the
                  health and safety at work of his employees.&quot;
                </p>
              </>
            }
            meaning={
              <>
                The s.2 duty extends beyond physical safety to welfare — and welfare
                covers psychological safety, including freedom from bullying and
                harassment in the workplace. An employer who fails to address bullying
                or harassment between co-workers is in potential breach of s.2 as well
                as Equality Act 2010. The s.2(2)(c) duty on information and training
                is the basis for the safe-system-of-work briefings, toolbox talks and
                supervision arrangements that prevent conflict escalating into
                incidents.
              </>
            }
            cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), Part I, s.2 — verbatim from legislation.gov.uk."
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="'Having it out' with the customer"
            whatHappens={
              <>
                Customer makes a sharp comment about the apprentice&apos;s work.
                Apprentice responds in kind. Customer escalates. Apprentice
                escalates further. Within five minutes there&apos;s a shouting
                match in the customer&apos;s kitchen. Customer rings the firm and
                makes a formal complaint. Customer complains to the certification
                scheme (NICEIC, NAPIT, ELECSA). Scheme opens an investigation. Firm
                receives a warning or suspension. Customer leaves a one-star review
                online. Other customers see the review and don&apos;t book the
                firm. The original issue (whatever the apprentice was actually
                doing) was probably resolvable in five minutes with a calm
                conversation.
              </>
            }
            doInstead={
              <>
                Stay calm. Don&apos;t take the bait. Acknowledge the feelings
                without conceding the substance. Offer to call the supervisor.
                Step back to the van or the welfare cabin if you need to breathe.
                Document the interaction. The supervisor is the right person for
                the contractual conversation. Your job as an apprentice is to
                stay safe, stay professional, and not turn a complaint into a
                scheme withdrawal, a lost contract or a reputational issue.
              </>
            }
          />

          <CommonMistake
            title="Sitting on a co-worker conflict until it becomes a formal grievance"
            whatHappens={
              <>
                Apprentice is on the receiving end of repeated &quot;banter&quot;
                from a co-worker — comments about accent, age, background. The
                apprentice doesn&apos;t want to make a fuss so they say nothing
                for three months. The comments continue and escalate. The
                apprentice&apos;s mental health suffers; they start dreading
                going to work; they consider leaving the apprenticeship. Eventually
                they raise a formal grievance. By that point the relationship is
                broken, the co-worker is defensive (&quot;why didn&apos;t you say
                anything&quot;), and the formal process has to manage three months
                of accumulated incidents rather than one.
              </>
            }
            doInstead={
              <>
                Raise low-level conflict early, in the moment or shortly after,
                in a private direct conversation. Most people are willing to
                adjust their behaviour when they realise it&apos;s affecting
                someone — but they need to be told. Document the conversation in
                your private notes. If it continues, escalate to your supervisor or
                training-provider tutor while it&apos;s still a small issue rather
                than a three-month-old pattern. Equality Act 2010 s.26 doesn&apos;t
                require you to suffer in silence — it requires the employer to
                prevent and address harassment. Use the structures available.
              </>
            }
          />

          <Scenario
            title="Customer says you're useless, demands a different electrician"
            situation={
              <>
                You&apos;re on day three of a five-day rewire. The customer comes out
                of the kitchen, visibly angry, and says &quot;you&apos;re useless,
                I want a different electrician&quot;. You&apos;ve done everything
                by the book — work is on programme, no quality issues, you&apos;ve
                kept the customer informed, you&apos;ve been polite throughout. The
                customer&apos;s outburst seems to come from nowhere. There&apos;s
                no one else at the property and your supervisor is on another job
                30 minutes away.
              </>
            }
            whatToDo={
              <>
                Stay calm. Don&apos;t argue, don&apos;t defend at length, don&apos;t
                walk off. Acknowledge the customer&apos;s feelings without conceding
                the substance — &quot;I can see this isn&apos;t what you expected
                — I&apos;m sorry it&apos;s frustrating&quot;. Offer to call your
                supervisor: &quot;I&apos;d like to call my supervisor right now so
                they can come down and talk this through with you — they&apos;ll
                be about 30 minutes&quot;. Step away to the van or welfare area
                briefly to make the call. Brief your supervisor honestly — what
                happened, what was said, what you&apos;ve done, what the work
                status is. Document the interaction in your job pack while it&apos;s
                fresh — date, time, exact words, your response, what action you took.
                Carry on with non-confrontational work (organise tools, prep
                materials) until the supervisor arrives. Let the supervisor lead
                the conversation about the substance — that&apos;s their job, not
                yours.
              </>
            }
            whyItMatters={
              <>
                &quot;You&apos;re useless&quot; isn&apos;t a contractual statement
                — it&apos;s a frustrated outburst. Often it&apos;s about something
                unrelated to the apprentice&apos;s actual work — financial pressure,
                family stress, a previous bad experience with a tradesperson, anxiety
                about disruption to the home. Engaging with the substance of the
                outburst (&quot;I&apos;m not useless, your work is being done
                properly&quot;) escalates the conflict because it&apos;s arguing
                against the surface comment rather than the underlying issue. The
                supervisor&apos;s job is to find out what&apos;s actually going on
                — often a five-minute calm conversation reveals the real concern
                and fixes it. The apprentice&apos;s job is to keep the situation
                from getting worse, document accurately, and let the contractual
                conversation happen at the right level. Argument back is the move
                that turns a recoverable customer relationship into a complaint to
                the certification scheme and a one-star online review.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "De-escalate first. Stay calm, acknowledge feelings, separate the person from the problem, don't take the bait. The four moves are universal.",
              "Customer conflict — de-escalate, escalate to supervisor for the contractual conversation, document. Never argue back, swear, or walk off without notifying.",
              "Co-worker conflict — direct private conversation first, escalate to supervisor / training-provider tutor if it continues, formal grievance under ACAS Code if needed.",
              "Supervisor conflict — informal conversation first, training-provider tutor for apprentices, formal grievance, ACAS conciliation, employment tribunal as last resort.",
              "ACAS Code of Practice on Discipline and Grievance is the framework. Tribunals can adjust awards by up to 25% for unreasonable failure to follow the Code — both employers and employees should follow it.",
              "Equality Act 2010 s.26 makes harassment related to a protected characteristic unlawful. The 'banter' defence doesn't protect employers when a reasonable recipient would have found the conduct offensive.",
              "Employment Rights Act 1996 s.44 protects you from detriment for raising health and safety concerns. No qualifying period of service required.",
              "Document everything in contemporaneous private notes. Date, time, what happened, who was present, your response. Notes written at the time carry significant weight.",
            ]}
          />

          <Quiz title="Conflict resolution — knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module5/section5/5-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                5.2 Effective comms across disabilities and language
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module5/section5/5-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.4 Effects of poor communication
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
