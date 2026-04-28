/**
 * Module 1 · Section 2 · Subsection 4 — Reporting routes: the right responsible person
 * Maps to City & Guilds 2365-03 / Unit 201 / LO2 / AC 2.4 + AC 2.6
 *   AC 2.4 — "specify appropriate responsible persons to whom Health and Safety and
 *            welfare related matters should be reported"
 *   AC 2.6 — "specify the current requirements and good working practices for processing
 *            waste on site"
 *
 * Layered depth (supplementary):
 *   - 2357 Unit 601 ELTK01 / AC 2.5 + 2.6 — reporting H&S issues; responsible persons
 *
 * Multiple parallel reporting routes. The L3 step is identifying the right
 * responsible person for each kind of issue.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import { TLDR, ConceptBlock, RegsCallout, CommonMistake, Scenario, KeyTakeaways, FAQ, LearningOutcomes, ContentEyebrow, SectionRule } from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Reporting routes — the right responsible person (2.4) | Level 3 Module 1.2.4 | Elec-Mate';
const DESCRIPTION = 'L3 refresher on H&S reporting routes — internal, RIDDOR, environmental, safeguarding, scheme bodies. Identifying the right responsible person for each kind of issue.';

const checks = [
  { id: 'l3-m1-s2-sub4-route', question: 'You discover a customer has been bypassing an RCD by clipping the test button down. They\'re elderly and have safeguarding concerns. What\'s the L3 reporting route?', options: ['Just fix the RCD and forget it.', 'Multiple parallel routes: (1) restore safety — reinstate the RCD, document with photos; (2) inform the customer / their nominated representative; (3) escalate to your firm\'s contracts manager / H&S manager; (4) consider safeguarding referral if vulnerability is genuine — local authority adult social care; (5) document everything in writing in the job pack.', 'Refuse to do any work for them.', 'Tell the neighbours.'], correctIndex: 1, explanation: 'Multiple parallel duties = multiple parallel reports. The L3 step is recognising which routes apply to which kinds of issue.' },
  { id: 'l3-m1-s2-sub4-internal', question: 'What\'s the difference between an "internal" and an "external" report?', options: ['Internal = paper, External = email.', 'Internal = report within your firm to the responsible person (H&S manager, contracts manager, director). External = report to a regulator (HSE for H&S, Environment Agency for pollution, local authority for some EHO matters, scheme body like NICEIC for installation defects). Most issues need both — internal first, then the firm\'s responsible person decides on external.', 'Only the police are external.', 'Only the customer is internal.'], correctIndex: 1, explanation: 'Internal first is the discipline. The firm\'s responsible person makes the external-report decision unless the chain has demonstrably failed (then PIDA 1998 protects external escalation).' },
  { id: 'l3-m1-s2-sub4-near-miss', question: 'You spot a near-miss on site — a colleague nearly fell from a step-up because the rubber feet had perished. No injury. What do you do?', options: ['Nothing — no injury, no problem.', 'Log internally — most firms have a near-miss reporting system; if not, write it up. Pull the step-up out of service immediately and tag it. Notify the firm\'s H&S manager / contracts manager. Consider whether the issue affects other equipment in the firm\'s fleet — does the fleet need a recall? Near-misses are the leading indicator that prevents incidents; treating them seriously is what stops the next one.', 'Wait until someone gets hurt.', 'Tell the casualty to be more careful.'], correctIndex: 1, explanation: 'Near-miss culture is the L3 supervisor mindset. Heinrich\'s ratio (300 near-misses : 30 minor injuries : 1 serious incident) is a useful framing — the near-miss is the cheapest possible chance to prevent the serious incident.' },
];

const quizQuestions = [
  { id: 1, question: 'Who is the "responsible person" for H&S reports within a firm?', options: ['The receptionist.', 'Usually the MHSWR Reg 7 designated competent person — H&S manager, contracts manager, Qualified Supervisor, or director. Every firm with 5+ employees should have one named in the H&S policy.', 'Only the director.', 'Only the apprentice mentor.'], correctAnswer: 1, explanation: 'Reg 7 designation. Knowing your firm\'s named person is L3-essential.' },
  { id: 2, question: 'What\'s the route for a RIDDOR-reportable incident?', options: ['Tell anyone you like.', 'Internal first — to the firm\'s responsible person who is the "Reg 3 responsible person" under RIDDOR. They make the F2508 / F2508A submission via riddor.hse.gov.uk or phone 0345 300 9923 for fatalities/specified injuries. Your job is to escalate to them, not to make the report yourself unless you ARE the responsible person.', 'Tell the customer to do it.', 'Tell the press.'], correctAnswer: 1, explanation: 'RIDDOR responsibility is on the "responsible person" defined by Reg 3 — typically the employer. Operatives escalate; responsible person reports.' },
  { id: 3, question: 'What\'s the route for an environmental hazard / pollution incident?', options: ['Tell no-one.', 'Internal to firm\'s responsible person; external to Environment Agency 0800 80 70 60 (24/7) in England, SEPA in Scotland, NRW in Wales. For controlled waters / water pollution / land contamination / hazardous-substance escape. Local authority for noise nuisance / contaminated land issues.', 'Tell the local council only.', 'Tell the customer\'s neighbour.'], correctAnswer: 1, explanation: 'Environmental reporting has its own dedicated routes separate from H&S. The 24/7 EA hotline for pollution is the headline number to memorise.' },
  { id: 4, question: 'What\'s a "near-miss" and why does it matter?', options: ['A miss with a stepladder.', 'An event that could have caused injury but didn\'t — a slip without a fall, a near-contact, a tool drop without injury, a small fire that self-extinguished. Near-misses are the leading indicator of where the next incident will happen. Internal reporting and review of near-misses is one of the highest-impact preventive activities.', 'A small distance.', 'A near-by-friend.'], correctAnswer: 1, explanation: 'Heinrich\'s pyramid (loosely) — many near-misses for each minor injury, many minor injuries for each serious incident. Tackle the near-miss and you reduce the major incident rate.' },
  { id: 5, question: 'What\'s the report route for a defective installation discovered during EICR?', options: ['Bin the cert.', 'Code it on the EICR (C1 immediate danger / C2 potentially dangerous / C3 improvement recommended / FI further investigation). Inform the customer / dutyholder. Recommend remedial action with timescales appropriate to the code. C1 requires immediate action — make safe on the day. The EICR itself is the formal report; it goes to the dutyholder.', 'Tell only your supervisor.', 'Hide it from the customer.'], correctAnswer: 1, explanation: 'EICR coding is the L3-level professional reporting route for installation defects. The dutyholder receives the cert; their duty under EAWR Reg 4(2) is to act on the findings.' },
  { id: 6, question: 'When should you report a safeguarding concern about a customer?', options: ['Never.', 'When you see signs of abuse, neglect, undue pressure, vulnerability or risk that go beyond the scope of an electrical job. Report internally to your firm\'s safeguarding lead (where one exists) or contracts manager; signpost to local authority adult/children\'s social care if appropriate. Care Act 2014 (England) places statutory duties on local authorities; you don\'t make the assessment but you can raise the concern.', 'Always — every customer.', 'Only on Sundays.'], correctAnswer: 1, explanation: 'Safeguarding referrals go to local authority adult social services (or children\'s services if relevant). You raise; they assess. Some apprentice trades have formal safeguarding training; if your firm does, you\'ll be briefed.' },
  { id: 7, question: 'What\'s the route for a defect that may indicate a wider product fault?', options: ['Bin the product.', 'Report internally; if the defect appears systemic (e.g. a brand of MCB failing prematurely across multiple installs), escalate to the firm\'s technical lead who can report to the manufacturer / RAPEX (Rapid Alert System for Non-Food Products) / Office for Product Safety and Standards. Product withdrawals and safety alerts come out of these channels.', 'Tell only the customer.', 'Hide it.'], correctAnswer: 1, explanation: 'Product-safety reporting is increasingly important. The Office for Product Safety and Standards (OPSS) issues alerts; the trade press covers them; firms maintain product-safety registers.' },
  { id: 8, question: 'How does the L3 supervisor decide which report route to use?', options: ['Random.', 'Map the issue: Personal injury / illness → RIDDOR + internal; equipment defect → internal + product reporting; environmental hazard → EA/SEPA/NRW + internal; safeguarding → local authority + internal; installation defect → EICR + customer + internal; near-miss → internal log; HSE notice → firm\'s legal/H&S team. Multiple routes can apply simultaneously.', 'Whichever is fastest.', 'Whichever is loudest.'], correctAnswer: 1, explanation: 'The mapping skill is L3-essential. Knowing which route applies to which kind of issue means concerns get to the right place at the right time.' },
];

const faqs = [
  { question: 'What if my firm doesn\'t have a named H&S manager?', answer: 'They\'re required to have one if 5+ employees (MHSWR Reg 7). Ask the contracts manager or director who the designated competent person is. If the answer is "no-one", that\'s itself a Reg 7 breach — escalate to a director and consider raising it externally if necessary.' },
  { question: 'Can I report a concern anonymously?', answer: 'You can request anonymity from the firm\'s responsible person, and the HSE accepts anonymous tip-offs (though they\'re harder to act on). PIDA 1998 protections require you to be identifiable to claim them, but the act of reporting in good faith is protected regardless.' },
  { question: 'What\'s the timescale for raising a near-miss internally?', answer: 'Same day if practical. The next morning at the latest. Memory and detail fade fast; contemporaneous reports have more value.' },
  { question: 'Should I copy the customer on internal H&S reports?', answer: 'Generally no — internal reports are for the firm\'s management. The customer gets information relevant to them (e.g. EICR results, RIDDOR reports affecting their premises) through appropriate channels.' },
  { question: 'How do I report an HSE inspector\'s findings I disagree with?', answer: 'Through the firm\'s legal / H&S team. Improvement notices have a 21-day appeal route to Employment Tribunal; FFI invoices have an internal HSE disputes panel. Don\'t engage directly with HSE on the firm\'s behalf without the firm\'s authority.' },
  { question: 'Are scheme bodies (NICEIC, NAPIT) reporting bodies?', answer: 'They\'re registration bodies for installer competence, not regulators with statutory powers. But a serious installation defect or fraudulent cert can be reported to them and they can suspend / withdraw a firm\'s registration. Often the practical path for installer-level concerns when the firm itself is the issue.' },
];

export default function Sub4() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);
  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section2')} className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"><ArrowLeft className="h-4 w-4" /> Section 2</button>
          <PageHero eyebrow="Module 1 · Section 2 · Subsection 4" title="Reporting routes — the right responsible person" description="Remember from L2 — escalate to a responsible person. At L3 the depth is identifying WHICH responsible person for which kind of issue, and recognising that multiple parallel routes often apply simultaneously." tone="emerald" />
          <TLDR points={[
            'Multiple reporting routes exist in parallel — internal (firm), RIDDOR (HSE), environmental (EA/SEPA/NRW), safeguarding (local authority), scheme body (NICEIC/NAPIT), product safety (OPSS). One incident often needs several.',
            "The 'responsible person' under MHSWR Reg 7 is the firm's designated competent person — usually H&S manager, contracts manager, Qualified Supervisor or director.",
            "Internal first is the discipline — except where internal escalation has demonstrably failed (then PIDA 1998 protects external).",
          ]} />
          <LearningOutcomes outcomes={[
            "Identify the responsible persons for different categories of H&S report — internal, RIDDOR, environmental, safeguarding, product, scheme.",
            "Apply the principle of parallel reporting (one incident = multiple appropriate routes).",
            "Distinguish near-miss from incident and apply same-day internal reporting discipline.",
            "Identify the EICR coding system as the formal report route for installation defects.",
            "Apply Care Act 2014 safeguarding awareness — raising the concern, not making the assessment.",
            "Recognise product-safety reporting routes via Office for Product Safety and Standards (OPSS) and trade body alerts.",
          ]} initialVisibleCount={3} />

          <ContentEyebrow>Internal reporting — the firm's responsible person</ContentEyebrow>
          <ConceptBlock title="MHSWR Reg 7 designated competent person" plainEnglish="Every firm with 5+ employees must have a designated competent person to assist in undertaking H&S measures. This is your first internal escalation address — usually the H&S manager, contracts manager, Qualified Supervisor or a director." onSite="Find out who this is for YOUR firm on day one. The H&S policy will name them. If the policy doesn\'t exist or doesn\'t name them, that\'s itself a Reg 7 / s.2(3) breach to flag.">
            <p>Internal report categories:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Incidents and near-misses</strong> — same day report.</li>
              <li><strong>Equipment defects</strong> — pull from service, tag, internal report.</li>
              <li><strong>Procedure failures</strong> — RAMS doesn&apos;t match the site, instructions missing, training gap identified.</li>
              <li><strong>Customer / site concerns</strong> — vulnerable persons, dangerous occupant behaviour, safeguarding indicators.</li>
              <li><strong>Inspector visit</strong> — immediate phone notification of any HSE / EA visit.</li>
              <li><strong>Concerns about colleagues</strong> — competence, behaviour, fitness for duty.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Near-miss culture" plainEnglish="Near-misses are events that could have caused injury but didn\'t. Reporting them is the cheapest way to prevent the next incident — Heinrich\'s loose ratio of 300:30:1 (near-misses : minor : serious) is a memory aid." onSite="Most firms have an electronic near-miss reporting form. If yours doesn\'t, write a short note in the job pack. Make it routine — if the only thing that gets reported is actual injury, the firm misses the leading indicators.">
            <p>What counts as a near-miss worth reporting:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Slip without a fall.</li>
              <li>Tool drop from height with no injury.</li>
              <li>Stepladder wobble that didn&apos;t fall.</li>
              <li>Cable detector miss that didn&apos;t lead to a strike.</li>
              <li>Small fire that self-extinguished.</li>
              <li>Tripped breaker that wasn&apos;t expected.</li>
              <li>Safe-isolation lock-off bypass discovered.</li>
              <li>Customer behaviour that put you in difficulty (running children near work area, aggressive interaction).</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="Management of Health and Safety at Work Regulations 1999 — Reg 7(1)" clause={<>"Every employer shall, subject to paragraphs (6) and (7), appoint one or more competent persons to assist him in undertaking the measures he needs to take to comply with the requirements and prohibitions imposed upon him by or under the relevant statutory provisions and by Part II of the Fire Precautions (Workplace) Regulations 1997."</>} meaning={<>The Reg 7 competent person is the firm&apos;s &quot;responsible person&quot; for H&amp;S reporting. Reg 7(8) defines competence as having &quot;sufficient training and experience or knowledge and other qualities&quot; for the role. In a small electrical firm this is often the Qualified Supervisor (NICEIC / NAPIT designation); in a larger firm a separate H&amp;S manager.</>} cite="Source: Management of Health and Safety at Work Regulations 1999 (SI 1999/3242), Reg 7 — verbatim from legislation.gov.uk." />

          <InlineCheck {...checks[0]} />

          <SectionRule />
          <ContentEyebrow>External reporting routes</ContentEyebrow>
          <ConceptBlock title="Multiple regulators, multiple routes" plainEnglish="External reports go to the appropriate regulator depending on the issue type. RIDDOR-reportable injuries → HSE. Pollution → Environment Agency / SEPA / NRW. Safeguarding → local authority. Product safety → manufacturer + OPSS. Installation defects with scheme implications → NICEIC / NAPIT. Each has its own route and timescale." onSite="The L3 mapping skill: when an issue arises, identify which regulator(s) and route(s) apply. Internal first; then external via the firm\'s responsible person; then direct external (PIDA-protected) only if internal has failed.">
            <p>External regulator quick-reference:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>HSE</strong> — workplace H&amp;S, RIDDOR. Online: hse.gov.uk; phone: 0345 300 9923.</li>
              <li><strong>Local Authority EHO</strong> — H&amp;S in retail/office/leisure/residential; statutory nuisance.</li>
              <li><strong>Environment Agency</strong> (England) — pollution, waste, contaminated land. 0800 80 70 60 (24/7).</li>
              <li><strong>SEPA</strong> (Scotland) — same scope, separate body.</li>
              <li><strong>NRW</strong> (Wales) — same scope, separate body.</li>
              <li><strong>Local Authority Adult/Children&apos;s Social Care</strong> — safeguarding referrals.</li>
              <li><strong>OPSS</strong> — product safety alerts and recalls.</li>
              <li><strong>NICEIC / NAPIT / Stroma / ELECSA</strong> — installer competence schemes; complaints and defective work.</li>
              <li><strong>Building Safety Regulator</strong> (BSR, within HSE) — HRRB matters under BSA 2022.</li>
              <li><strong>Fire and Rescue Service</strong> — RRFSO 2005 fire safety enforcement.</li>
              <li><strong>Gas Safe Register</strong> — gas safety / unauthorised gas work.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="EICR — the formal report route for installation defects" plainEnglish="Electrical Installation Condition Reports are the L3-relevant formal route for reporting installation defects. The coding system (C1/C2/C3/FI) is the structured way to communicate severity to the dutyholder." onSite="C1 = immediate danger; remedial action required immediately, often before leaving site. C2 = potentially dangerous; remedial action urgent. C3 = improvement recommended; not unsafe but doesn\'t comply with current edition. FI = further investigation needed. The EICR goes to the dutyholder; their EAWR Reg 4(2) duty drives the response.">
            <p>EICR coding shorthand:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>C1 — Danger present</strong>. Immediate action — make safe on the day or escalate.</li>
              <li><strong>C2 — Potentially dangerous</strong>. Remedial action urgent.</li>
              <li><strong>C3 — Improvement recommended</strong>. Not currently unsafe but doesn&apos;t meet current edition.</li>
              <li><strong>FI — Further investigation</strong>. Cause of finding cannot be established without intrusive work.</li>
              <li>Overall outcome: Satisfactory only if no C1 / C2 / FI present.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />

          <SectionRule />
          <ContentEyebrow>Safeguarding awareness</ContentEyebrow>
          <ConceptBlock title="Care Act 2014 — raise the concern, don\'t make the assessment" plainEnglish="Visiting electricians are sometimes the only outside contact a vulnerable adult has in a week. Recognising signs of abuse, neglect or undue pressure — and knowing how to raise it — is a real-world part of L3 trade work, even though it isn\'t the C&G syllabus headline." onSite="If something doesn\'t feel right — bruising the customer doesn\'t explain, a relative who pushes the customer around verbally, evidence of self-neglect, signs of cognitive impairment with no support visible — raise it. Internally to your firm; externally to local authority adult social care if you believe there\'s a safeguarding need. You raise; they assess.">
            <p>Practical signposting:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Internal — firm&apos;s safeguarding lead (where one exists) or contracts manager.</li>
              <li>Local authority — adult social care (Care Act 2014) for adults; children&apos;s social care (Children Act 1989) for children.</li>
              <li>Police — if you witness an immediate safeguarding crime in progress (assault etc).</li>
              <li>NSPCC helpline — if children are at risk and immediate police isn&apos;t appropriate.</li>
              <li>Document what you observed and what you reported. Don&apos;t investigate or interview the suspected victim.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <SectionRule />
          <ContentEyebrow>HSE concerns line — when external is the right route</ContentEyebrow>

          <ConceptBlock
            title="The 0300 003 1647 line and the online concerns form"
            plainEnglish="The HSE operates a Concerns and Advice line for members of the public, workers and others who want to report safety issues. Phone 0300 003 1647; web form via hse.gov.uk/contact/concerns. Reports can be anonymous (though anonymous reports are harder to act on). The HSE doesn&apos;t investigate every concern — they triage by risk, evidence and pattern — but every concern is logged and contributes to the inspector&apos;s intelligence picture."
            onSite="At L3 the external HSE concerns route is the option you reach for when internal escalation has demonstrably failed and the issue is significant enough to warrant external attention. PIDA 1998 protects the disclosure provided the conditions are met. Use it sparingly and seriously — the HSE relies on credible reporters and discounts vexatious or trivial complaints quickly."
          >
            <p>What to include in an HSE concerns report:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Specific facts</strong> — what, where, when, who, how often. Photos if
                you have them lawfully.
              </li>
              <li>
                <strong>Regulation breached</strong> — name the relevant statute or regulation
                if you know it.
              </li>
              <li>
                <strong>Internal escalation history</strong> — what you raised internally, when,
                response received.
              </li>
              <li>
                <strong>Risk and harm</strong> — what could happen, who is at risk, has anyone
                been hurt yet.
              </li>
              <li>
                <strong>Your relationship to the issue</strong> — worker, contractor, customer,
                neighbour, member of the public.
              </li>
              <li>
                <strong>Contact details</strong> — anonymous reporting is allowed but
                contactable reports get follow-up that anonymous can&apos;t.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Scheme body complaints — when the firm is the issue</ContentEyebrow>

          <ConceptBlock
            title="NICEIC, NAPIT and the scheme&apos;s complaint route"
            plainEnglish="Competent Person Schemes — NICEIC, NAPIT, Stroma, ELECSA, Certsure — are voluntary registration bodies that audit firm and Qualified Supervisor competence. They run formal complaints processes. A complaint can result in re-audit, additional inspection visits, training requirements, suspension or removal of registration. For installation defects on registered firm work, the scheme is often the most practically effective route — particularly when the customer can&apos;t get the firm to put right defective work."
            onSite="At L3 the scheme route comes up most often when a customer engages your firm to remediate work done by another scheme-registered firm. Your firm typically has a duty to flag the defective work to the scheme; the scheme then investigates. Anonymity for the reporting firm is normally protected. The route is used regularly and works."
          >
            <p>When to use the scheme complaint route:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Defective work by a scheme-registered firm</strong> that the firm
                won&apos;t put right when challenged.
              </li>
              <li>
                <strong>Fraudulent certificates</strong> — EICs / EICRs / Minor Works that
                don&apos;t reflect work actually done.
              </li>
              <li>
                <strong>Work claimed as compliant under Approved Doc P that wasn&apos;t
                notified</strong> — the scheme should have notified Building Control on the
                firm&apos;s behalf.
              </li>
              <li>
                <strong>Use of scheme branding by an unregistered firm</strong> — passing-off
                fraud.
              </li>
              <li>
                <strong>Pattern of poor work across multiple jobs</strong> by a registered
                Qualified Supervisor.
              </li>
              <li>
                <strong>Failure to honour the scheme&apos;s warranty / consumer-protection
                provisions</strong>.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Pre-qualification questionnaires — the commercial-impact layer</ContentEyebrow>

          <ConceptBlock
            title="Why your firm&apos;s reporting record affects what work you can bid for"
            plainEnglish="Major clients (housing associations, NHS trusts, local authorities, framework agreements like CHAS / Constructionline / SafeContractor / Achilles) operate Pre-Qualification Questionnaires (PQQ) that ask for declarations of HSE notices, RIDDOR reports, prosecutions, FFI invoices and disciplinary actions in the past 3-5 years. A clean record opens doors; a poor record closes them. The PQQ effect is often the firm&apos;s biggest commercial driver of safety culture — bigger than fines."
            onSite="At L3 you contribute to the firm&apos;s PQQ record every time you raise a near-miss, close out an action, follow safe-isolation procedures and document the work properly. The accumulated record across the firm becomes the evidence at the next PQQ submission. The firm&apos;s ability to bid for the next major framework depends on what you and your colleagues did over the past 3 years."
          >
            <p>What PQQs typically ask:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>HSE notices in past 3-5 years</strong> — declared with detail.
              </li>
              <li>
                <strong>Convictions for H&amp;S offences</strong> — including under HASAWA,
                EAWR, CDM.
              </li>
              <li>
                <strong>RIDDOR-reportable incidents</strong> — number per year per 100,000
                hours worked. Comparison against industry average.
              </li>
              <li>
                <strong>Insurance claims experience</strong> — Employer&apos;s Liability and
                Public Liability claims.
              </li>
              <li>
                <strong>Training records</strong> — proportion of operatives with current
                qualifications and CPD.
              </li>
              <li>
                <strong>Scheme registrations and accreditations</strong> — NICEIC, NAPIT,
                CHAS, Constructionline, ISO 45001, ISO 14001.
              </li>
              <li>
                <strong>Sample RAMS and method statements</strong> — for similar projects.
              </li>
              <li>
                <strong>References</strong> — from previous projects of similar size and risk.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 — Reg 12"
            clause={
              <>
                &quot;The responsible person must keep a record of any reportable injury,
                disease or dangerous occurrence which requires reporting under regulations 4, 5,
                6 or 7. The record must be kept for at least 3 years from the date on which it
                was made.&quot;
              </>
            }
            meaning={
              <>
                The 3-year retention duty. Most firms keep RIDDOR records far longer for PQQ
                purposes (clients commonly ask for 5+ years) and for Defective Premises Act
                purposes (BSA 2022 extension to 30-year retrospective limit on residential).
                The retention duty applies to the responsible person — usually the employer —
                and the records must be available for inspection.
              </>
            }
            cite="Source: Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 (SI 2013/1471), Reg 12 — verbatim from legislation.gov.uk."
          />

          <RegsCallout
            source="Health and Safety at Work etc. Act 1974 — s.37(1)"
            clause={
              <>
                &quot;Where an offence under any of the relevant statutory provisions committed
                by a body corporate is proved to have been committed with the consent or
                connivance of, or to have been attributable to any neglect on the part of, any
                director, manager, secretary or other similar officer of the body corporate or
                a person who was purporting to act in any such capacity, he as well as the
                body corporate shall be guilty of that offence and shall be liable to be
                proceeded against and punished accordingly.&quot;
              </>
            }
            meaning={
              <>
                Director-level personal liability. When an internal report is escalated and
                the &quot;responsible person&quot; chooses not to act, s.37 reaches them
                personally — not just the company. This is why robust internal reporting
                systems matter: the paper trail showing an issue was raised and ignored is
                exactly the evidence that converts a corporate prosecution into a personal
                one. The L3 escalation discipline (verbal plus written, copies retained)
                protects both you and forces the responsible person to engage.
              </>
            }
            cite="Source: Health and Safety at Work etc. Act 1974 (1974 c.37), s.37 — verbatim from legislation.gov.uk."
          />

          <SectionRule />
          <CommonMistake title='"Just telling the supervisor" and assuming it goes from there' whatHappens={<>Apprentice spots a near-miss on a customer&apos;s site (faulty step-up). Mentions it to the supervisor verbally over the phone. Supervisor forgets. Three weeks later a different operative falls from the same step-up; injury results. Investigation finds the original near-miss wasn&apos;t logged. Firm prosecuted; original apprentice &quot;told someone&quot; but didn&apos;t document.</>} doInstead={<>Verbal + written. Phone the supervisor AND log the near-miss in the firm&apos;s system AND email the supervisor with the details. Triple-channel reporting for anything safety-relevant. The cost is two minutes; the benefit is creating a record that survives memory failure.</>} />

          <CommonMistake title="Reporting an HSE-reportable matter directly without internal escalation" whatHappens={<>Apprentice unilaterally calls HSE about a workplace concern without first escalating internally. HSE attends; firm is blindsided; the underlying concern was real but the relationship is destroyed; apprentice loses the protection of having gone through proper channels.</>} doInstead={<>Internal first — give the firm a reasonable opportunity to address the concern. PIDA 1998 protections for external disclosure require (in most cases) internal route to have been tried OR for there to be evidence internal route would be ineffective (e.g. firm complicit). Document the internal route; only go external when it&apos;s demonstrably failed.</>} />

          <Scenario title="Multiple parallel reports for one incident" situation={<>You arrive at a small commercial unit to investigate a flickering circuit. You find: (1) the customer has been bypassing the RCD by clipping the test button; (2) the customer is an elderly lone trader who seems confused; (3) there&apos;s a small smoke mark on the consumer unit suggesting a previous overheat event; (4) you notice the building&apos;s fire alarm is showing a fault and the panel says &quot;disabled&quot;; (5) the customer&apos;s landlord is on speakerphone pressuring them to &quot;not worry about all this stuff&quot;.</>} whatToDo={<>Map the multiple parallel routes. (1) Restore safe isolation immediately — reinstate the RCD if possible; if you can&apos;t make safe today, leave the supply isolated and document with photos. EICR coding C1 for the bypass; C2 / FI for the smoke mark depending on what you can determine. (2) Internal report to your firm&apos;s contracts manager / H&amp;S manager — pressure from landlord is a customer-care escalation; possible safeguarding concern about confused elderly customer. (3) Customer notification of the EICR findings in writing; copy to landlord if customer authorises. (4) Fire alarm disabled is a Regulatory Reform (Fire Safety) Order 2005 issue — the responsible person (likely the landlord) is in breach; advise the customer in writing; consider notifying the local Fire and Rescue Service if it&apos;s clearly a breach with risk to life. (5) Safeguarding concern about elderly customer with potentially undue pressure — consider local authority adult social care referral; raise with your firm first. Document everything. One incident; five potentially-required reports.</>} whyItMatters={<>The L3 reporting-route mapping is what stops issues falling through the cracks. Each of these issues sits with a different responsible person; failing to escalate any one of them leaves a duty unfulfilled. The firm&apos;s reputation for thoroughness is what wins repeat business and the operative&apos;s personal s.7 record stays clean.</>} />

          <SectionRule />
          <FAQ items={faqs} />
          <SectionRule />
          <KeyTakeaways points={[
            "Remember from L2 — report H&S concerns to a responsible person. At L3 the depth is mapping the right person for each kind of issue.",
            "MHSWR Reg 7 designated competent person is the firm\'s internal H&S \'responsible person\'. Find out who they are on day one.",
            "RIDDOR responsible person is the employer / self-employed; they make the F2508. Operatives escalate to them.",
            "Environmental hazards: EA (England, 0800 80 70 60), SEPA (Scotland), NRW (Wales). 24/7 hotlines.",
            "Safeguarding: local authority adult / children\'s social care. You raise; they assess.",
            "EICR coding (C1/C2/C3/FI) is the formal report route for installation defects.",
            "Near-miss reporting is the highest-value preventive activity. Same-day internal log.",
            "Multiple parallel routes apply to many issues. Map each one and escalate appropriately.",
          ]} />
          <Quiz title="Reporting routes — knowledge check" questions={quizQuestions} />
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section2-3')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">2.3 Limits of responsibility</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section2-5')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next subsection <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">2.5 RIDDOR F2508 process</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
