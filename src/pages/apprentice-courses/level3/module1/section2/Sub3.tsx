/**
 * Module 1 · Section 2 · Subsection 3 — Limits of responsibility: knowing when to escalate
 * Maps to City & Guilds 2365-03 / Unit 201 / LO2 / AC 2.3
 *   AC 2.3 — "state the actions to be taken in situations which exceed their level of
 *            responsibility for Health and Safety in the workplace"
 *
 * Layered depth (supplementary):
 *   - 2357 Unit 601 ELTK01 / AC 2.3 — limitations of responsibilities
 *   - 2357 Unit 601 ELTK01 / AC 2.4 — actions exceeding responsibility
 *
 * L3 expands the limits but they still exist. ERA 1996 s.44 protects you for
 * crossing the line upwards.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR, ConceptBlock, RegsCallout, CommonMistake, Scenario,
  KeyTakeaways, FAQ, LearningOutcomes, ContentEyebrow, SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Limits of responsibility — knowing when to escalate (2.3) | Level 3 Module 1.2.3 | Elec-Mate';
const DESCRIPTION = 'L3 refresher on limits of responsibility — competence boundaries, escalation routes, ERA 1996 s.44 protection and the supervisor judgement call.';

const checks = [
  {
    id: 'l3-m1-s2-sub3-comp',
    question: 'A customer asks you to disconnect their gas hob so they can renovate the kitchen. What\'s the L3 response?',
    options: [
      'Disconnect it — gas hobs use electricity too.',
      'Refuse. Gas work is restricted to Gas Safe registered engineers under the Gas Safety (Installation and Use) Regulations 1998. As an electrician you are not competent — and not lawfully authorised — to disturb the gas connection. Recommend the customer engage a Gas Safe engineer for the disconnection. You can isolate the electrical supply to the appliance once the gas is safe.',
      'Disconnect the gas and the electric in one go.',
      'Tell the customer to do it themselves.',
    ],
    correctIndex: 1,
    explanation: 'Competence boundaries are statutory in some areas — gas work, F-Gas refrigerant work, asbestos licensed work, HV work all require specific certification you cannot acquire by good intention. The L3 reflex: refuse politely, signpost the right contractor, document.',
  },
  {
    id: 'l3-m1-s2-sub3-escalate',
    question: 'You\'re on site and your supervisor isn\'t answering the phone. The customer is pressing you to do something you\'re not sure about. What\'s the L3 escalation?',
    options: [
      'Just do it and hope.',
      'Escalate up the chain — contracts manager, technical manager, Qualified Supervisor, director. Document every attempt to reach someone in writing (text/email). If no-one responds and the work cannot wait safely, decline to proceed and inform the customer in writing of the reason. EAWR Reg 16, HASAWA s.7 and ERA 1996 s.44 all protect this position.',
      'Ask the customer to decide.',
      'Drive home without telling anyone.',
    ],
    correctIndex: 1,
    explanation: 'Escalation upwards is your right and your duty. The chain doesn\'t stop at the immediate supervisor; senior managers and the firm\'s Qualified Supervisor are the next steps. Document everything in writing as it happens.',
  },
  {
    id: 'l3-m1-s2-sub3-era44',
    question: 'Your firm punishes you (demotion, removal from a job, disciplinary) for refusing an unsafe task. What protection do you have?',
    options: [
      'None — it\'s the firm\'s right.',
      'Employment Rights Act 1996 s.44 — right not to suffer detriment for raising a health and safety concern, refusing dangerous work, or leaving the workplace in serious and imminent danger. Plus Public Interest Disclosure Act 1998 (whistleblowing) for qualifying disclosures. Tribunal route. Compensation can be substantial; reinstatement may be ordered.',
      'Only the right to resign.',
      'Only protection against assault.',
    ],
    correctIndex: 1,
    explanation: 'ERA 1996 s.44 is the protection that makes refusal sustainable. Without it, the threat of demotion or sacking would silence safety concerns. Knowing it exists changes the conversation when you push back.',
  },
];

const quizQuestions = [
  { id: 1, question: 'What\'s the legal source of an L3 apprentice\'s personal duty?', options: ['None.', 'HASAWA s.7 (personal H&S duty), EAWR Reg 16 (competence), MHSWR Reg 14 (cooperate and report), CDM 2015 Reg 15 (worker), and any specific regulation duty (e.g. PUWER Reg 9 training).', 'Only the apprenticeship contract.', 'Only the JIB grade.'], correctAnswer: 1, explanation: 'Multiple parallel duties; same conclusion — refuse the unsafe instruction and escalate.' },
  { id: 2, question: 'When is escalation upwards justified?', options: ['Never — supervisors decide.', 'Whenever the situation exceeds your competence, when an unsafe instruction is given, when an inspector arrives, when a serious near-miss occurs, when documents you need don\'t exist, when a customer requests work outside your scope.', 'Only after an injury.', 'Only at end of day.'], correctAnswer: 1, explanation: 'L3 escalation is part of normal supervision discipline, not failure. The firm\'s safety system depends on it.' },
  { id: 3, question: 'What does ERA 1996 s.44 protect?', options: ['Tea breaks.', 'Right not to suffer detriment for raising a H&S concern, refusing dangerous work, leaving the workplace in serious and imminent danger, or being a designated H&S representative. Detriment = sacking, demotion, removal from job, disciplinary, victimisation, harassment.', 'Only the right to a holiday.', 'Only the right to a phone call.'], correctAnswer: 1, explanation: 'The single most-important employment-law protection for safety conduct. Tribunal claim if breached.' },
  { id: 4, question: 'What does PIDA 1998 (whistleblowing) protect?', options: ['Nothing.', 'Workers making a "qualifying disclosure" — a disclosure of information that the worker reasonably believes shows malpractice, including criminal offences, breach of legal obligations, miscarriage of justice, danger to health and safety, environmental damage. Protects from detriment and dismissal.', 'Only criminals.', 'Only public servants.'], correctAnswer: 1, explanation: 'PIDA extends ERA s.44 protection for wider disclosures, including those made externally to a regulator. The key test is "reasonable belief".' },
  { id: 5, question: 'What\'s a "designated competent person" under MHSWR Reg 7?', options: ['A celebrity.', 'A person appointed by the employer to assist in undertaking measures to comply with H&S duties. Often the firm\'s H&S manager or contracts manager. Must have appropriate training, knowledge and experience.', 'Anyone.', 'Only the director.'], correctAnswer: 1, explanation: 'Knowing who the designated competent person is in your firm is the L3 escalation address. Often the contracts manager, sometimes a separate H&S manager, sometimes an external consultant.' },
  { id: 6, question: 'What\'s the difference between competence and authority?', options: ['They\'re the same.', 'Competence = having the technical knowledge / skill / experience to do the work safely. Authority = being permitted by the firm or a regulator to do it. Both are required. An L3 may be competent on a task but not authorised (e.g. EIC sign-off requires Qualified Supervisor authority); or authorised by job title but not yet competent on a specific item (e.g. CompEx work).', 'Competence is just paperwork.', 'Authority is just a stamp.'], correctAnswer: 1, explanation: 'Both required; L3 sits in the gap on many tasks. Honesty about which limb is missing keeps you on the right side of EAWR Reg 16.' },
  { id: 7, question: 'How should refusal of an unsafe task be documented?', options: ['Verbally only.', 'In writing, contemporaneously. Text or email to the supervisor; CC to a senior manager or H&S manager; copy retained. State what was asked, what you said, and the reason (regulation cited or risk identified). Time-stamped. The contemporaneous written record is the strongest evidence in any subsequent ERA s.44 claim or HSE prosecution.', 'On Twitter.', 'In a hidden notebook.'], correctAnswer: 1, explanation: 'Writing it down at the time is what makes the protection real. Reconstructed accounts months later are much weaker.' },
  { id: 8, question: 'L2 to L3 — has the limit of responsibility changed?', options: ['It\'s gone away.', 'No — it\'s shifted. At L2 the limits were tighter (most things needed supervisor sign-off). At L3 you can do more without immediate supervision, but the limits still exist (EIC sign-off, complex three-phase, hazardous areas, F-Gas, gas, asbestos licensed work). Honestly knowing where YOUR current limit sits is the L3 judgement skill.', 'It\'s gone up infinitely.', 'It\'s the same as L2.'], correctAnswer: 1, explanation: 'The L3 limit isn\'t fixed — it grows with experience and certification. The skill is honest self-assessment of where it sits today, for this task.' },
];

const faqs = [
  { question: 'My supervisor says "stop being so cautious, just do it" — what now?', answer: 'Document the conversation. Refuse if you genuinely judge the task unsafe or outside your competence. Escalate to a senior manager. ERA 1996 s.44 protects you from detriment for the refusal. PIDA 1998 protects you for raising it externally if internal escalation fails.' },
  { question: 'Can I refuse to work for a customer who\'s being unreasonable about safety?', answer: 'Yes. The customer\'s commercial pressure doesn\'t override your s.7 duty. Politely explain the reason, document it in writing, escalate to your firm\'s contracts manager. The firm may decide to withdraw from the job; that\'s their commercial call but your safety position is sound.' },
  { question: 'What if I genuinely don\'t know whether a task is within my competence?', answer: 'Default to "no" until you\'ve checked with someone competent. EAWR Reg 16 second-limb supervision is the appropriate route — work alongside someone competent, ask, observe, learn. The "I had a go" approach is what creates incidents.' },
  { question: 'How do I escalate without burning bridges with my supervisor?', answer: 'Frame it as "I want to make sure I\'m doing this safely — can you help me think through it?". Most supervisors respond well to honesty. The minority who don\'t are the ones you needed to escalate around anyway. ERA s.44 gives you cover.' },
  { question: 'Is there a tribunal time limit for an ERA s.44 claim?', answer: 'Yes — generally 3 months less one day from the act complained of. Get advice early; legal aid is rare for tribunal but unions and CAB offer help. Document everything contemporaneously.' },
  { question: 'Can I be prosecuted personally if I do follow an unsafe instruction?', answer: 'Yes — HASAWA s.7 is a personal duty. "I was told to" is no defence. The HSE has prosecuted operatives who carried out unsafe instructions. Refusal + escalation + documentation is the personal-protection sequence.' },
];

export default function Sub3() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section2')} className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start">
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero eyebrow="Module 1 · Section 2 · Subsection 3" title="Limits of responsibility — knowing when to escalate" description="Remember from L2 — limits exist and you escalate when in doubt. At L3 the limits expand but they're still real, and ERA 1996 s.44 / PIDA 1998 give you legal protection for the upward push." tone="emerald" />

          <TLDR points={[
            "L3 limits are wider than L2 but still exist. EIC sign-off, complex three-phase, hazardous areas, F-Gas, gas, asbestos licensed work — all sit outside the L3 scope.",
            "Escalation upwards is your right and your duty. Chain: supervisor → contracts manager → Qualified Supervisor → director. Document every attempt in writing.",
            "ERA 1996 s.44 protects you from detriment for refusing dangerous work or raising H&S concerns. PIDA 1998 (whistleblowing) extends protection for qualifying disclosures including external to regulators.",
          ]} />

          <LearningOutcomes outcomes={[
            'Identify the legal sources of personal H&S duty (HASAWA s.7, EAWR Reg 16, MHSWR Reg 14, CDM Reg 15).',
            'Distinguish competence from authority and identify situations where one is missing.',
            'Apply the L3 escalation chain — supervisor → contracts manager → Qualified Supervisor → director.',
            'State the protection under ERA 1996 s.44 (detriment) and PIDA 1998 (whistleblowing).',
            'Recognise statutory competence boundaries — gas (Gas Safe), F-Gas, asbestos licensed work, HV.',
            'Document refusals and escalations in writing contemporaneously.',
          ]} initialVisibleCount={3} />

          <ContentEyebrow>The L3 limit — wider but still real</ContentEyebrow>

          <ConceptBlock title="What you can and can't do at L3" plainEnglish="L3 expands the scope from L2. You can run small jobs alone, supervise an L2 mate, sign off some testing under supervision. But statutory and competence limits still exist — EIC sign-off needs a Qualified Supervisor; gas needs Gas Safe; F-Gas needs Cat I-IV; asbestos licensed work needs the HSE-licensed contractor; HV needs SAP authorisation." onSite="Honesty about where YOUR limit sits today, for this task, is the L3 judgement. The limit moves over time as you gain experience and certifications. The risk is treating L3 as 'fully qualified' — it isn't.">
            <p>Statutory and scheme limits L3 cannot cross:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Gas work</strong> — Gas Safe Register only (Gas Safety (Installation and Use) Regs 1998).</li>
              <li><strong>F-Gas refrigerant</strong> — Cat I-IV certified (F-Gas Regulation).</li>
              <li><strong>Asbestos licensed work</strong> — HSE-licensed contractor only.</li>
              <li><strong>HV / SAP work</strong> — separate appointment and authorisation under EAWR Reg 16.</li>
              <li><strong>EIC sign-off</strong> — Qualified Supervisor / Approved Electrician under firm&apos;s scheme registration.</li>
              <li><strong>EICR coding</strong> — competent inspector with appropriate post-qualification experience.</li>
              <li><strong>CompEx hazardous-area work</strong> — CompEx-certified.</li>
              <li><strong>Notifiable Building Regs work in dwellings</strong> — Approved Doc P competent person scheme.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="Employment Rights Act 1996 — s.44(1)(c)" clause={<>"An employee has the right not to be subjected to any detriment by any act, or any deliberate failure to act, by his employer done on the ground that — (c) being an employee at a place where (i) there was no such representative or safety committee, or (ii) there was such a representative or safety committee but it was not reasonably practicable for the employee to raise the matter by those means, he brought to his employer&apos;s attention, by reasonable means, circumstances connected with his work which he reasonably believed were harmful or potentially harmful to health or safety."</>} meaning={<>The s.44 protection is broad — any reasonable means of raising a H&amp;S concern is protected. Detriment includes sacking (s.100 makes that automatically unfair), demotion, removal from a job, disciplinary, victimisation. Tribunal claim within 3 months. Compensation can include loss of earnings, injury to feelings, reinstatement. The protection makes the refusal sustainable.</>} cite="Source: Employment Rights Act 1996 (1996 c.18), s.44 — verbatim from legislation.gov.uk." />

          <InlineCheck {...checks[0]} />

          <SectionRule />
          <ContentEyebrow>Escalation chain</ContentEyebrow>

          <ConceptBlock title="Up the chain in writing" plainEnglish="When the immediate supervisor isn't available or won't accept the concern, escalate up. Contracts manager, technical manager, Qualified Supervisor, director. Document each step in writing — text, email, job-pack note. The contemporaneous written record is the evidence the protection rests on." onSite="The chain is yours to use. Most firms have a designated H&S manager (MHSWR Reg 7 competent person) who is often the right escalation address. If your firm doesn't have one named, ask — it's a Reg 7 requirement.">
            <p>Practical escalation sequence:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>Phone immediate supervisor first; document the call.</li>
              <li>If no answer or refusal, text and email — written trail.</li>
              <li>Contact contracts manager / project manager.</li>
              <li>Contact firm's Qualified Supervisor or H&S manager.</li>
              <li>Contact a director if the chain has failed.</li>
              <li>External (HSE / regulator) only after internal escalation has demonstrably failed; PIDA 1998 protects this.</li>
            </ol>
          </ConceptBlock>

          <ConceptBlock title="Documenting the refusal" plainEnglish="Every refusal goes in writing at the time. State what was asked, what you said, why (regulation or risk). Time-stamped. Sent to the supervisor and a senior manager." onSite="A simple text \'Just to confirm what we discussed at 14:20: you asked me to live-work the DB; I declined under EAWR Reg 14; please confirm next steps' is enough. Email is better. The contemporaneous record is the evidence that makes ERA s.44 work in your favour later if needed.">
            <p>Elements of a defensible refusal record:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Date and time.</li>
              <li>Who asked and what was asked.</li>
              <li>Your response and the reason (regulation cited or hazard identified).</li>
              <li>Any escalation made and to whom.</li>
              <li>Any response received.</li>
              <li>Sent in writing (text/email) to the relevant parties same day.</li>
              <li>Copy retained by you.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="Public Interest Disclosure Act 1998 — inserted into Employment Rights Act 1996 as s.43A onwards" clause={<>"In this Act a 'qualifying disclosure' means any disclosure of information which, in the reasonable belief of the worker making the disclosure, is made in the public interest and tends to show one or more of the following — (a) that a criminal offence has been committed, is being committed or is likely to be committed, (b) that a person has failed, is failing or is likely to fail to comply with any legal obligation to which he is subject, ... (d) that the health or safety of any individual has been, is being or is likely to be endangered, (e) that the environment has been, is being or is likely to be damaged."</>} meaning={<>PIDA extends ERA protections to "qualifying disclosures" — including raising the concern externally to a regulator like the HSE. The reasonable-belief test is wide; you don&apos;t have to be right, you have to reasonably believe. Internal disclosure is preferred but external (HSE etc) is protected if internal channels have failed.</>} cite="Source: Public Interest Disclosure Act 1998 (1998 c.23), s.1 inserting Part IVA into ERA 1996 — verbatim from legislation.gov.uk." />

          <InlineCheck {...checks[1]} />
          <InlineCheck {...checks[2]} />

          <SectionRule />
          <ContentEyebrow>Competence vs authority — the L3 daily judgement</ContentEyebrow>

          <ConceptBlock
            title="Two parallel questions on every task"
            plainEnglish="At L3 every task carries two questions: am I competent to do this safely (do I have the knowledge, skill and experience)? And am I authorised to do this (does the firm, the regulator, the scheme permit me to)? Either can be missing. Competence without authority means you can do the work but the firm can&apos;t use the result (e.g. a perfectly tested EICR you can&apos;t sign). Authority without competence is the dangerous case (the regulator says you can but you don&apos;t actually have the experience yet)."
            onSite="The L3 honest answer changes by task. Routine domestic CU testing — likely both. Initial verification sign-off — competent maybe, authorised no (Qualified Supervisor signs). Three-phase commercial fault-finding — likely under supervision. CompEx hazardous area — neither without certification. The supervisor judgement is matching today&apos;s task to today&apos;s competence + authority status, not assuming one carries the other."
          >
            <p>Common L3 task types and where the line typically sits:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Domestic socket / lighting alteration</strong> — competent + authorised
                under firm&apos;s scheme registration. Reg 16 first limb usually applies.
              </li>
              <li>
                <strong>Initial verification testing</strong> — competent for the testing
                itself; sign-off authority sits with the Qualified Supervisor or Approved
                Electrician.
              </li>
              <li>
                <strong>EICR coding and sign-off</strong> — competent only with significant
                post-qualification experience; authority via scheme.
              </li>
              <li>
                <strong>Three-phase commercial</strong> — under supervision throughout L3
                unless the specific task is straightforward and the operative has prior
                experience.
              </li>
              <li>
                <strong>Hazardous area (CompEx)</strong> — neither without CompEx
                certification.
              </li>
              <li>
                <strong>Gas / F-Gas / asbestos licensed</strong> — neither; refer to certified
                contractors.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>The PIDA disclosure framework — internal vs external</ContentEyebrow>

          <ConceptBlock
            title="Why internal first matters even when you suspect cover-up"
            plainEnglish="PIDA 1998 (inserted into ERA 1996 as Part IVA) protects &quot;qualifying disclosures&quot; — disclosures of information that the worker reasonably believes shows malpractice. Internal disclosure to the employer is the primary protected route. External disclosure to a prescribed person (HSE, Environment Agency, others) is also protected but generally requires either reasonable belief that internal disclosure would lead to detriment or destruction of evidence, OR that the matter has already been raised internally without action."
            onSite="The practical L3 sequence when you spot something serious: raise internally first, in writing, to the appropriate responsible person. Allow a reasonable period for response. Document what you raised, when, to whom, and the response (or absence of response). Only when the internal route has failed (or you have evidence it would fail) does external disclosure become both protected and proportionate. The exception is &apos;exceptionally serious&apos; matters — these can go straight external under s.43H ERA 1996."
          >
            <p>The PIDA disclosure tiers:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>s.43C — internal to employer</strong>. Easiest to satisfy; reasonable
                belief test only.
              </li>
              <li>
                <strong>s.43D — to a legal adviser</strong>. Always protected.
              </li>
              <li>
                <strong>s.43E — to a Minister of the Crown</strong>. For workers in
                publicly-funded bodies.
              </li>
              <li>
                <strong>s.43F — to a prescribed person</strong>. For HSE / EA / SEPA / NRW /
                other regulators on relevant sectoral matters. Reasonable belief test plus
                substantially-true test.
              </li>
              <li>
                <strong>s.43G — wider disclosure</strong> (e.g. media, MP, professional body).
                Higher threshold including reasonable belief that internal disclosure would
                cause detriment or be ineffective.
              </li>
              <li>
                <strong>s.43H — exceptionally serious matters</strong>. Wider disclosure
                permitted where the matter is exceptionally serious; reasonable belief test
                still applies.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Employment Rights Act 1996 — s.43B(1)"
            clause={
              <>
                &quot;In this Part a &apos;qualifying disclosure&apos; means any disclosure of
                information which, in the reasonable belief of the worker making the disclosure,
                is made in the public interest and tends to show one or more of the following —
                (a) that a criminal offence has been committed, is being committed or is likely
                to be committed, (b) that a person has failed, is failing or is likely to fail
                to comply with any legal obligation to which he is subject, (c) that a
                miscarriage of justice has occurred, is occurring or is likely to occur, (d)
                that the health or safety of any individual has been, is being or is likely to
                be endangered, (e) that the environment has been, is being or is likely to be
                damaged, or (f) that information tending to show any matter falling within any
                one of the preceding paragraphs has been, is being or is likely to be
                deliberately concealed.&quot;
              </>
            }
            meaning={
              <>
                The qualifying disclosure definition. Six categories — criminal offence, breach
                of legal obligation, miscarriage of justice, health and safety endangerment,
                environmental damage, deliberate concealment of any of the above. The
                &quot;reasonable belief&quot; test means you don&apos;t have to be right; you
                have to reasonably believe. The &quot;public interest&quot; test was added by
                the Enterprise and Regulatory Reform Act 2013 to filter out purely personal
                workplace grievances. At L3 most safety concerns will satisfy at least
                limb (b) (legal obligation) and (d) (health or safety).
              </>
            }
            cite="Source: Employment Rights Act 1996 (1996 c.18), s.43B as inserted by Public Interest Disclosure Act 1998 — verbatim from legislation.gov.uk."
          />

          <SectionRule />
          <ContentEyebrow>Fitness for duty — the L3 honest self-assessment</ContentEyebrow>

          <ConceptBlock
            title="Tired, hungover, distressed — &apos;not today&apos; is a competence answer"
            plainEnglish="EAWR Reg 16 competence isn&apos;t just about training and qualifications — it&apos;s about being competent at the moment of the work. Fatigue, illness, alcohol or drug effects (including legitimate prescription drugs), grief or acute stress can all reduce your safe-working capacity. Working live circuits or in safety-critical environments while compromised is a Reg 16 + s.7 issue. The defensible response is to report fitness-for-duty concerns and accept reassignment for the day."
            onSite="The L3 supervisor reflex applies both to yourself and to the L2 mate working with you. If something looks off — slurred speech, smell of alcohol, obvious exhaustion, distraction at a level that affects task focus — pause the safety-critical work. Talk privately. Document the conversation. Reassign to lower-risk work or send home. The firm&apos;s drug and alcohol policy and the firm&apos;s welfare policy are the supporting documents."
          >
            <p>Practical fitness-for-duty considerations at L3:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fatigue</strong> — long shifts, second jobs, poor sleep. Working Time
                Regulations 1998 limits and rest-break requirements support the safety case.
              </li>
              <li>
                <strong>Alcohol</strong> — even residual alcohol from the night before reduces
                cognitive function. Many firms apply zero-tolerance during work hours.
              </li>
              <li>
                <strong>Recreational and prescription drugs</strong> — sedating
                antihistamines, opioid painkillers, sleep aids all carry &quot;may impair&quot;
                warnings. Discuss with your GP or occupational health.
              </li>
              <li>
                <strong>Acute stress / grief / mental health</strong> — temporarily reduced
                concentration is a real safety factor. Talking to the firm&apos;s welfare lead
                or EAP is the right route.
              </li>
              <li>
                <strong>Illness</strong> — flu, food poisoning, vertigo. Working through can
                feel virtuous; in safety-critical roles it&apos;s a Reg 16 risk.
              </li>
              <li>
                <strong>The firm&apos;s response</strong> — should be supportive, not punitive.
                Punitive responses to honest fitness-for-duty disclosure drive concealment, which
                makes the safety risk worse.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Tribunal protection — the s.44 process in practice</ContentEyebrow>

          <ConceptBlock
            title="Time limits, evidence and what to expect"
            plainEnglish="If the firm subjects you to detriment for raising a safety concern or refusing dangerous work, ERA 1996 s.44 gives you a tribunal claim. The time limit is generally 3 months less one day from the act complained of (or the last in a series of acts). ACAS Early Conciliation is mandatory before lodging the claim — this can extend the time limit modestly. Most cases settle before hearing; tribunal awards include compensatory awards for loss of earnings and (where applicable) injury to feelings."
            onSite="If you find yourself heading towards a s.44 claim, the contemporaneous evidence trail is what makes or breaks the case. Texts, emails, job-pack notes from the time of the events are gold. ACAS, your union, Citizens Advice, or a no-win-no-fee employment solicitor can help. The protection is real; the procedure is technical and time-sensitive."
          >
            <p>Practical sequence if you&apos;re facing detriment after a refusal:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Document everything immediately</strong> — timeline, the safety
                concern, who you raised it to, the firm&apos;s response, the detriment imposed.
              </li>
              <li>
                <strong>Use the firm&apos;s grievance procedure</strong> — written grievance to
                the firm. Demonstrates you tried to resolve internally; supports the claim if
                the firm doesn&apos;t.
              </li>
              <li>
                <strong>Take advice early</strong> — ACAS helpline (0300 123 1100), union if
                you&apos;re a member, Citizens Advice, employment solicitor.
              </li>
              <li>
                <strong>ACAS Early Conciliation</strong> — mandatory before tribunal claim.
                ACAS contacts the employer and explores settlement. Issues a certificate
                whether settled or not.
              </li>
              <li>
                <strong>Tribunal claim (ET1)</strong> — within 3 months less one day of the
                detriment, extended by the EC period. Filed online or by post.
              </li>
              <li>
                <strong>Hearing or settlement</strong> — most cases settle. Hearings tend to be
                1-3 days for s.44 / s.47B cases.
              </li>
            </ol>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <ConceptBlock
            title="The lone-working scenario — when there&apos;s no supervisor to ask"
            plainEnglish="At L3 you increasingly work alone — domestic call-outs, small commercial jobs, fault-finding visits. Lone working changes the risk profile and the escalation route. There&apos;s no immediate second pair of hands to help if something goes wrong; phones can lose signal; the time-to-help is longer. The HSE&apos;s INDG73 (Working alone) sets out the reasonably-practicable controls."
            onSite="Practical L3 lone-working discipline: the firm should know where you are and when you&apos;ll check in (booking system or SMS schedule). A buddy check-in arrangement covers the gap if something goes wrong. The dynamic risk assessment on arrival should identify whether the task is appropriate to lone working — some tasks (live work, MEWP use, hazardous-area entry, complex three-phase) require a second person regardless of competence."
          >
            <p>Tasks that should not be done lone-worked:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Live working</strong> under EAWR Reg 14 — second person almost always
                required as part of the precautions.
              </li>
              <li>
                <strong>MEWP / hoist / lift operation</strong> — banksman or second person for
                rescue cover.
              </li>
              <li>
                <strong>Confined-space entry</strong> — Confined Spaces Regs 1997 require
                emergency arrangements that lone working cannot satisfy.
              </li>
              <li>
                <strong>Hazardous-area work</strong> (CompEx) — competence rules and
                rescue-cover requirements.
              </li>
              <li>
                <strong>Work at height in significant fall-risk locations</strong> — rescue
                cover essential.
              </li>
              <li>
                <strong>Visits to addresses with documented safeguarding concerns</strong> —
                lone-worker safety as well as customer.
              </li>
              <li>
                <strong>Out-of-hours work in remote or unfamiliar locations</strong> — without
                a check-in arrangement.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake title="Following an unsafe instruction because 'I was told to\'" whatHappens={<>Apprentice told by supervisor to live-work a small commercial DB; complies; arc-flash burns to forearm. HSE prosecution; firm under EAWR Reg 14; supervisor under HASAWA s.7 (encouraging an unsafe act); apprentice under HASAWA s.7 (personal duty). Apprentice&apos;s &quot;I was told to&quot; defence rejected.</>} doInstead={<>Refuse, escalate, document. ERA s.44 protects from detriment. The 5-minute conversation is far less painful than a HSE prosecution and a hospital visit.</>} />

          <CommonMistake title="Doing F-Gas / gas / asbestos work because \'it&apos;s only a small job\'" whatHappens={<>Apprentice disconnects a small refrigerant line on an old AC unit during electrical strip-out; releases R410A to atmosphere; not F-Gas certified; firm prosecuted under F-Gas Reg + environmental release; apprentice personally prosecuted under HASAWA s.7 for working outside competence.</>} doInstead={<>Statutory competence boundaries don&apos;t bend for small jobs. F-Gas, gas, asbestos licensed work all need certified contractors regardless of size. Refer the work; document the referral.</>} />

          <Scenario title="Customer pressure to do gas-related work" situation={<>You&apos;re replacing a kitchen socket and the customer says &quot;while you&apos;re here, can you just disconnect the gas hob so I can move it tomorrow?&quot;. They offer cash for the favour. Your supervisor isn&apos;t answering the phone. The hob has a flexible gas hose with a bayonet fitting; disconnecting at the bayonet is &quot;easy&quot; in physical terms.</>} whatToDo={<>Refuse. Gas work is restricted to Gas Safe registered engineers under the Gas Safety (Installation and Use) Regulations 1998 — you are not authorised regardless of physical ease. Politely explain to the customer: &quot;I&apos;m not Gas Safe registered so I can&apos;t lawfully disconnect the gas. I can recommend a Gas Safe engineer who can do it for you tomorrow morning&quot;. Don&apos;t accept the cash; don&apos;t do the work; document the conversation in your job-pack note that evening. If your firm has a Gas Safe sister-firm or a regular subcontractor, suggest them. If not, the customer can find a Gas Safe engineer via gassaferegister.co.uk.</>} whyItMatters={<>Customer cash-in-hand requests are the most common entry-route for un-authorised work. Doing it once is a HASAWA s.7 breach, a Gas Safety regulation breach, and a professional reputation risk. The customer&apos;s &quot;just this once&quot; doesn&apos;t protect you. Refusal + signposting + documentation is the L3 response, and the customer typically respects it once it&apos;s clearly explained.</>} />

          <SectionRule />
          <FAQ items={faqs} />
          <SectionRule />

          <KeyTakeaways points={[
            "Remember from L2 — limits exist, escalate when in doubt. At L3 the limits are wider but still real.",
            "Statutory limits L3 can\'t cross: gas (Gas Safe), F-Gas (Cat I-IV), asbestos licensed work, HV (SAP), EIC sign-off (Qualified Supervisor), CompEx, Approved Doc P competent person scheme.",
            "Personal duty sources: HASAWA s.7, EAWR Reg 16, MHSWR Reg 14, CDM Reg 15. Multiple parallel duties; same conclusion — refuse and escalate when warranted.",
            "Escalation chain: supervisor → contracts manager → Qualified Supervisor → director. Document each step in writing contemporaneously.",
            "ERA 1996 s.44 protects you from detriment for refusing dangerous work or raising H&S concerns. Tribunal route; 3-month time limit.",
            "PIDA 1998 protects qualifying disclosures including those made externally to regulators when internal escalation has failed.",
            "\'I was told to' is no defence to a s.7 prosecution. Refusal + documentation is the personal-protection sequence.",
            "L3 honesty about today\'s competence boundary is the judgement skill that distinguishes safe operators from incident-causers.",
          ]} />

          <Quiz title="Limits of responsibility — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section2-2')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">2.2 Emergency procedures</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section2-4')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next subsection <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">2.4 Reporting routes</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
