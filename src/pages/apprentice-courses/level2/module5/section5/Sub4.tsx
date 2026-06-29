/**
 * Module 5 · Section 5 · Subsection 4 — Effects of poor communication
 * Maps to City & Guilds 2365-02 / Unit 210 / LO3 / AC 3.4
 *   AC 3.4 — "State the effects that poor communication may have on an organisation"
 *
 * Frame: poor communication has four cost categories — financial, safety,
 * reputational, legal. Each is real, each is recoverable from somebody at the
 * end of the day, and the recovery often falls on the apprentice or operative
 * personally. Near-misses that don't get reported are the leading indicator of
 * next month's RIDDOR. Variations not invoiced are the leading indicator of
 * next quarter's bad debt.
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
  'Effects of poor communication (3.4) | Level 2 Module 5.5.4 | Elec-Mate';
const DESCRIPTION =
  'Financial, safety, reputational and legal — what happens when the message does not land. Rework, fines, scheme withdrawal, RIDDOR-reportable incidents, prosecution under HASAWA s.7.';

/* ── Inline checks ────────────────────────────────────────────────── */

const checks = [
  {
    id: 'mod5-s5-sub4-nearmiss',
    question:
      "You're testing a sub-board you thought was isolated. Your test prods touch a phase conductor that's still live. You step back, no contact, no shock — but your heart's in your mouth. The board was supposed to have been isolated and locked off by the supervisor 30 minutes earlier. What do you do?",
    options: [
      "Stop, make the board safe, then tell your supervisor immediately and document the near-miss in writing so the defect gets investigated.",
      "Say nothing — no contact was made and no one was hurt, so quietly re-isolate the board yourself and carry on without raising it.",
      "Note it privately in your own diary in case it's ever needed, but don't tell the supervisor, since the duty to report sits with them.",
      "Mention it casually to a fellow apprentice at break so the team is aware, but leave it there without any formal written record.",
    ],
    correctIndex: 0,
    explanation:
      "Mgmt H&S Regs 1999 Reg 14(2) makes it a personal duty on the employee to inform the employer of any work situation which they reasonably consider represented a serious and immediate danger to health and safety, AND of any matter they reasonably consider represented a shortcoming in the employer's protection arrangements. A near-miss with a live conductor where the lock-off failed is exactly that kind of shortcoming. Reporting it allows the employer to investigate, fix the safe-isolation procedure, brief the team, and prevent the next incident. Not reporting it leaves the same defect in place for the next person — who may not be as lucky. The HSE consistently identifies failure to act on near-misses as a precursor to fatal incidents.",
  },
  {
    id: 'mod5-s5-sub4-variation',
    question:
      "Customer asks you on site to add a third light circuit to the kitchen rewire — verbally, in passing, while you're up the ladder. You agree verbally and add it. The variation isn't documented. The job overruns by half a day because of the extra work. The customer disputes the additional charge on the final invoice. What's the financial effect on the firm?",
    options: [
      "None — a verbal agreement is fully binding, so the firm just takes the customer to the Small Claims Court and recovers the disputed amount in full.",
      "The cost is capped at the extra materials only — labour fell within the normal working day, so the half-day overrun isn't a real loss to the firm.",
      "The firm probably won't recover the cost in dispute — the undocumented labour, materials and late completion all sit on its profit margin.",
      "There's no financial effect — the customer is obliged to pay for any work actually carried out under unjust-enrichment rules, documented or not.",
    ],
    correctIndex: 2,
    explanation:
      "Verbal contracts and verbal variations are binding under English law — but proving them in dispute is another matter. Courts and ombudsmen consistently weight written contractual evidence above verbal recollection. An undocumented variation is one the firm probably won't recover. Multiply that across many small variations on many jobs and it's a material drag on profitability. The 5-minute discipline of switching to a written variation document the moment a customer asks for additional work is one of the highest-ROI habits an apprentice can build.",
  },
  {
    id: 'mod5-s5-sub4-handover',
    question:
      "You finish a kitchen first-fix and hand over to another electrician for second-fix. You don't leave any notes, photos or a redline on the layout drawing — you assume they'll work it out from the drawings. Two weeks later the second-fix electrician drills through a cable you'd routed slightly differently from the design. What's the cost picture?",
    options: [
      "Negligible — the second-fix electrician carries liability for drilling without checking the route, so the cost falls on them and their insurer alone.",
      "Direct rework plus indirect delay, customer dissatisfaction and reputational damage — a whole chain of cost from one missing handover note.",
      "Just the cost of the damaged cable itself — it was concealed and the drawings showed the design route, so it's a materials write-off and nothing more.",
      "A small programme delay only — both work for the same firm, so the wasted labour cancels out internally and the real cost is a day or two added.",
    ],
    correctIndex: 1,
    explanation:
      "Handover communication is one of the lowest-cost, highest-value disciplines on a fit-out. Photos before plastering take five minutes; a redline on the layout drawing takes ten. The cost of NOT doing it lands on the second-fix electrician, the customer, the project programme and the firm's profit margin. Modern job-management apps make the photo + redline workflow almost frictionless. Skipping it is a false economy that pays for itself many times over the first time a downstream electrician drills into a cable they didn't know was there.",
  },
];

/* ── End-of-page Quiz ─────────────────────────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "What are the four broad cost categories of poor communication on an electrical project?",
    options: [
      "Financial (rework, lost variations, fines), safety (near-miss to RIDDOR incident, injury), reputational (scheme withdrawal, lost referrals) and legal (breach, negligence, prosecution).",
      "Technical (test results), administrative (paperwork), commercial (pricing) and contractual (terms) — the four areas where a message can be misread on a job.",
      "Spoken, written, visual and electronic — the four channels through which information travels on site, each one carrying its own distinct failure mode.",
      "Internal (operative to operative), external (to the customer), upward (to management) and downward (to apprentices) — the four directions communication flows.",
    ],
    correctAnswer: 0,
    explanation:
      "The four-category model (financial / safety / reputational / legal) is the structured way to think about communication failure cost. Each category is real, each is recoverable from someone at the end of the day, and the apprentice or operative personally is often the one in the firing line — particularly under HASAWA s.7 (employee duty) and Mgmt H&S Regs 1999 Reg 14 (employee duty to inform employer of dangers).",
  },
  {
    id: 2,
    question:
      "Under HASAWA s.7, what's the personal duty on every employee?",
    options: [
      "To take reasonable care for themselves and others affected by their acts or omissions, and to co-operate with the employer on health and safety duties.",
      "To provide a safe place of work, safe systems, welfare facilities and the information, instruction, training and supervision needed for everyone on site.",
      "To carry out a suitable and sufficient risk assessment for every activity, appoint a competent person, and arrange planning, organising and monitoring.",
      "To report specified injuries, diseases and dangerous occurrences to the HSE, keep an accident book, and co-operate with any HSE investigation.",
    ],
    correctAnswer: 0,
    explanation:
      "HASAWA s.7 puts a direct personal criminal duty on every employee. Communication failure that leads to injury — whether to the employee themselves or others — can result in a s.7 prosecution. Examples include not communicating a hazard to a colleague, not raising a concern about a defective lock-off, not telling a successor electrician about a route change. The s.7 duty cannot be delegated and cannot be transferred to the employer. It sits on the individual.",
  },
  {
    id: 3,
    question:
      "What does Mgmt H&S Regs 1999 Reg 14 require of employees?",
    options: [
      "To inform the employer of any work situation representing a serious and immediate danger, and of any shortcoming in the protection arrangements.",
      "To wear all PPE provided by the employer, use it in accordance with training, and return it to a designated store after each shift for inspection.",
      "To attend all toolbox talks and inductions, sign the attendance record, and pass a competence assessment before working unsupervised on an install.",
      "To stop work and evacuate on hearing the fire alarm, proceed to the assembly point, and report to the marshal so a roll call can be completed.",
    ],
    correctAnswer: 0,
    explanation:
      "Mgmt H&S Regs 1999 Reg 14(2) is the personal communication duty on the employee. It sits alongside HASAWA s.7 and complements it — s.7 is the duty to take reasonable care; Reg 14 is the duty to communicate concerns and shortcomings to the employer. Failing to communicate a near-miss, a defective lock-off, or a hazard you've spotted is a Reg 14 breach. The duty exists precisely because the employer can't fix what they don't know about — and most workplace incidents are preceded by near-misses or shortcomings that someone on the team had spotted but not raised.",
  },
  {
    id: 4,
    question:
      "What's the relationship between near-misses and serious incidents?",
    options: [
      "They are essentially unrelated — a near-miss is an event where nothing happened, so it carries no useful information about future serious incidents.",
      "Serious incidents are the leading indicator of near-misses — a site with a serious injury then experiences a run of near-misses as a lagging consequence.",
      "Near-misses are the leading indicator of serious incidents — the accident triangle shows many near-misses share the root cause of each serious one.",
      "They occur at roughly equal frequency — for every serious incident there is on average one near-miss with the same underlying root cause.",
    ],
    correctAnswer: 2,
    explanation:
      "The accident-triangle model (sometimes attributed to Heinrich) is the foundation of modern industrial safety. The numbers vary by source but the principle is consistent: serious incidents sit at the top of a pyramid of minor incidents, near-misses, and unsafe acts. Acting on near-misses removes the defects that would otherwise cause the next serious incident. Failing to act on them — whether by not reporting, not investigating, or not changing the safe system of work — leaves the same defects in place. HSE prosecutions repeatedly cite failure to act on prior near-misses as evidence of inadequate safety management.",
  },
  {
    id: 5,
    question:
      "What financial effect does an undocumented variation have on a project?",
    options: [
      "It improves the firm's cash position — work outside the original scope is chargeable at a premium under the Late Payment Act, documented or not.",
      "The firm probably won't recover the cost in dispute — verbal variations are hard to prove, so the labour, materials and time hit the profit margin.",
      "There is no financial effect provided the work is sound — the customer must pay for completed work regardless of paperwork, just a slight invoice delay.",
      "It shifts the cost onto the customer every time — once additional work is done they cannot lawfully refuse to pay, so it's the same as a documented one.",
    ],
    correctAnswer: 1,
    explanation:
      "Undocumented variations are the most consistent silent profit killer in electrical contracting. Each one looks small at the time — 'just an extra socket', 'just one more light' — but they accumulate into a measurable percentage of the firm's annual margin. The discipline of switching to a written variation document the moment a customer asks for additional work is the single highest-ROI habit an apprentice can build. Five minutes of written variation prevents the dispute and protects the payment.",
  },
  {
    id: 6,
    question:
      "What's the consequence of a scheme withdrawal (NICEIC, NAPIT, ELECSA) for a domestic electrical contractor?",
    options: [
      "None of any substance — the contractor just joins a different Competent Person Scheme the next week, since scheme membership is fully portable.",
      "It removes the right to issue Electrical Installation Certificates, so no work can be self-certified, but Part P notification is unaffected and handled by the customer.",
      "It only affects commercial and industrial work where scheme membership is a tender requirement — domestic Part P self-certification comes from the LA direct.",
      "Loss of the ability to self-certify domestic Part P work, forcing slower, costlier LABC notification — plus reputational and insurance fallout.",
    ],
    correctAnswer: 3,
    explanation:
      "Part P of the Building Regulations requires notifiable domestic electrical work to be either self-certified by a Competent Person Scheme member (NICEIC, NAPIT, ELECSA, etc.) or notified to LABC and inspected separately. Scheme withdrawal removes the self-certification route, dramatically increasing the cost and time of every notifiable job. It also damages reputation — scheme membership is a positive selection criterion for most domestic customers. Repeated communication failures (poor customer handling, complaints, missing documentation, failure to address remedial issues) are common triggers for scheme investigations and ultimately suspensions or withdrawals.",
  },
  {
    id: 7,
    question:
      "Under the Consumer Rights Act 2015, what's the standard expected of a tradesperson providing services to a consumer?",
    options: [
      "That the trader must guarantee the work free from any defect for at least six years, bearing the full cost of any failure including normal wear and tear.",
      "That the trader must perform the service with reasonable care and skill (s.49) — breach gives the consumer repeat performance or a price reduction.",
      "That the trader must complete strictly within the time and price quoted, with any overrun or cost increase borne entirely by the trader as absolute terms.",
      "That the trader must achieve whatever result the consumer expected, judged from their point of view, so it's compliant only if the customer is satisfied.",
    ],
    correctAnswer: 1,
    explanation:
      "Consumer Rights Act 2015 s.49 is the statutory standard for service quality in consumer contracts. 'Reasonable care and skill' is the test — it covers both the technical quality of the work and the communication around it (clear scope, accurate quoting, proper variation handling, comprehensive handover). Breaches of s.49 can be pursued through the small claims court without legal representation, which is why customer-facing communication failures are a meaningful financial risk for contractors.",
  },
  {
    id: 8,
    question:
      "Under what circumstances might the failure to communicate a hazard to a colleague amount to a personal HASAWA s.7 prosecution?",
    options: [
      "Only where the employee was the most senior person on site — the s.7 duty passes up the chain, so a junior can't be prosecuted while a supervisor is present.",
      "Only where the employee was formally appointed as the site's competent person for safety — an ordinary operative carries no personal duty under s.7 at all.",
      "Where the employee knew of the hazard, could have communicated it, and the failure caused or contributed to a colleague being exposed to the risk.",
      "Only where the employer has first been convicted under s.2 or s.3 — an individual can't be pursued under s.7 until the wider failure is established.",
    ],
    correctAnswer: 2,
    explanation:
      "HASAWA s.7 is a direct personal criminal duty. The HSE has the power to prosecute individuals separately from their employer, and does so where the evidence supports it. Communication failures — not briefing a successor, not raising a near-miss, not telling a colleague about a hazard you've spotted — fall squarely within s.7 if they cause or contribute to harm. The penalties are significant (unlimited fine on conviction in the Crown Court, plus possible imprisonment for some safety offences). 'I was told to' or 'I assumed someone else would tell them' aren't defences.",
  },
];

/* ── FAQs ─────────────────────────────────────────────────────────── */

const faqs = [
  {
    question: "What's a RIDDOR-reportable incident and why does it matter?",
    answer:
      "RIDDOR — the Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 — requires employers and self-employed people to report certain workplace injuries, occupational diseases and dangerous occurrences to the HSE. Reportable incidents include death, specified serious injuries, injuries causing more than 7 days incapacity, occupational diseases like hand-arm vibration syndrome, and dangerous occurrences such as the collapse of a structure or an unintended electrical contact with overhead lines. Once reported, the HSE reviews the circumstances and may inspect or investigate. RIDDOR data is the official record of UK workplace incidents and feeds into HSE enforcement priorities. Failure to report is itself an offence.",
  },
  {
    question: "If my supervisor tells me not to report a near-miss, what should I do?",
    answer:
      "Report it anyway. Mgmt H&S Regs 1999 Reg 14(2) puts a personal statutory duty on you as the employee to inform your employer of work situations you reasonably consider represented a serious and immediate danger or a shortcoming in the protection arrangements. The supervisor is part of your employer for these purposes — but if the supervisor refuses to escalate or instructs you not to report, that itself is a Reg 14 breach by the supervisor and you should escalate to the next layer (more senior manager, HR, or your training-provider tutor for an apprentice). Document the near-miss and the conversation with the supervisor in writing. Employment Rights Act 1996 s.44 protects you from being penalised for raising a health and safety concern.",
  },
  {
    question: "How does a customer complaint to a Competent Person Scheme actually work?",
    answer:
      "Customers can complain about a registered electrician to their Competent Person Scheme (NICEIC, NAPIT, ELECSA, etc.). The scheme is required to have a complaints procedure under the Building Regulations Part P framework. The scheme will typically write to the contractor, give them a chance to respond, may inspect the work in dispute, and may require remedial action or impose sanctions including warnings, additional supervision, suspension or withdrawal. Repeated complaints, refusal to engage with the process, or evidence of non-compliant work are all grounds for escalation. The complaints data feeds into the scheme's view of the contractor and influences ongoing membership.",
  },
  {
    question: "If I make a mistake on a job, am I personally liable to the customer?",
    answer:
      "In most cases the contract is between the employer (the firm) and the customer, so the firm is liable to the customer for breach of contract or for negligence. The firm's professional indemnity insurance and public liability insurance cover most claims. Your personal liability is to your employer, not the customer — though you can be subject to internal disciplinary action, performance review or, in extreme cases, dismissal for gross misconduct. If you're self-employed, the contract is between you and the customer and you're personally liable. For HASAWA s.7 and Mgmt H&S Regs 1999 Reg 14 prosecutions, the personal liability is direct regardless of employment status — those are statutory criminal duties that sit on you personally.",
  },
  {
    question: "Can poor communication be the cause of a successful professional negligence claim?",
    answer:
      "Yes. Professional negligence claims rely on showing that the contractor failed to exercise the standard of care expected of a reasonably competent electrician in the circumstances. Poor communication — failing to advise the customer of a safety risk, failing to explain the scope clearly, failing to handover properly to a successor electrician — can be a component of negligence. The leading professional negligence cases in construction often turn on what was communicated, when, and to whom. Courts will look at the contemporaneous evidence — emails, letters, written variations, file notes — and the absence of that evidence is itself often the problem.",
  },
  {
    question: "What's the difference between RIDDOR-reportable and 'near-miss' under HSE guidance?",
    answer:
      "RIDDOR-reportable incidents are defined in the regulations and include specified injuries, deaths, occupational diseases and 'dangerous occurrences' (a defined list including things like the collapse of scaffolding, the unintended contact with overhead power lines, and the failure of a lifting appliance). Near-misses generally aren't RIDDOR-reportable unless they fall within the dangerous-occurrences list, BUT they should still be reported internally to the employer under MHSWR Reg 14, investigated by the employer, and acted on to prevent the next incident. HSE guidance treats near-miss reporting and investigation as a core component of effective safety management — they're the leading indicator of the next RIDDOR-reportable incident.",
  },
];

export default function Sub4() {
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
            eyebrow="Module 5 · Section 5 · Subsection 4"
            title="Effects of poor communication"
            description="Financial, safety, reputational and legal — what happens when the message does not land. Rework, scheme withdrawal, RIDDOR-reportable incidents, prosecution under HASAWA s.7. Each cost is real and each is recoverable from someone at the end of the day."
            tone="emerald"
          />

          <TLDR
            points={[
              "Poor communication has four cost categories — financial, safety, reputational, legal. Each is real, each is recoverable from somebody, and the apprentice or operative personally is often in the firing line.",
              "Near-misses are the leading indicator of serious incidents. Failing to report a near-miss leaves the same defect in place for the next person.",
              "Mgmt H&S Regs 1999 Reg 14 puts a personal duty on every employee to inform the employer of dangers and of shortcomings in the protection arrangements. Not reporting is a Reg 14 breach.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "State the effects that poor communication may have on an organisation.",
              "Identify the four cost categories of poor communication — financial, safety, reputational, legal.",
              "Recognise the personal duty under HASAWA s.7 to take reasonable care for self and others — including communicating hazards.",
              "Identify the personal duty under Mgmt H&S Regs 1999 Reg 14 to inform the employer of serious dangers and shortcomings in protection arrangements.",
              "Apply the standard under Consumer Rights Act 2015 s.49 — services to be performed with reasonable care and skill, including communication around the work.",
              "Recognise near-misses as the leading indicator of serious incidents and the importance of investigating and acting on them.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why poor communication costs more than the message itself</ContentEyebrow>

          <ConceptBlock
            title="The cost is downstream — and someone always pays"
            plainEnglish="Poor communication rarely shows its full cost in the moment. The undocumented variation looks like a quick favour to the customer until the invoice is disputed three months later. The unreported near-miss looks like 'no harm done' until the next apprentice on the same circuit gets hurt. The skipped handover note looks like a saved five minutes until the second-fix electrician drills through a cable two weeks later. The cost lands somewhere — usually further down the timeline, often on someone other than the person who skipped the communication."
            onSite="Apprentices in particular tend to under-weight the cost because they don't see the downstream consequences. The customer dispute lands on the office. The near-miss escalation lands on the supervisor. The handover-failure rework lands on the next electrician. By the time the cost comes back to the apprentice (in performance reviews, lost training opportunities, or in the worst cases personal HASAWA s.7 liability), the connection to the original communication failure isn't obvious. This Sub makes that connection visible."
          >
            <p>
              The four cost categories — each gets its own block below:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Financial</strong> — rework, variations not invoiced, fines,
                warranty void, customer refunds, increased insurance premiums.
              </li>
              <li>
                <strong>Safety</strong> — near-miss escalating to RIDDOR-reportable
                incident, live-conductor exposure, injury, fatality.
              </li>
              <li>
                <strong>Reputational</strong> — scheme withdrawal, social media damage,
                lost referrals, loss of repeat business, damage to industry standing.
              </li>
              <li>
                <strong>Legal</strong> — breach of contract claim, professional
                negligence, prosecution under HASAWA s.7, prosecution under EAWR 1989,
                Mgmt H&amp;S Regs 1999 Reg 14 enforcement.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Financial cost</ContentEyebrow>

          <ConceptBlock
            title="Rework, variations not invoiced, fines, warranty void"
            plainEnglish="The financial cost of poor communication is the most visible category and the easiest to put a number on. Rework that has to be done because the spec wasn't communicated. Variations that don't get invoiced because they weren't documented. Fines from the HSE for missing toolbox talks. Warranty claims because the customer wasn't told how to operate the kit. Each one is recoverable from the firm's profit margin."
            onSite="The variations-not-invoiced category is consistently the largest financial drag on small electrical contracting firms. Five minutes of written variation per change saves the entire cost — but the discipline has to be built early in an apprentice's career or the casual 'yeah no problem' habit takes hold and never leaves."
          >
            <p>
              The headline financial-cost categories:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Rework</strong> — re-doing an install because the spec
                wasn&apos;t communicated, the design intent wasn&apos;t understood,
                or the customer wanted something different from what was on the
                drawings. Labour cost falls on the firm; materials cost too if
                they can&apos;t be reused.
              </li>
              <li>
                <strong>Variations not invoiced</strong> — additional work agreed
                verbally but never documented. Likely unrecoverable in dispute.
                Multiplied across many small variations, it&apos;s a material
                annual loss.
              </li>
              <li>
                <strong>Fines</strong> — HSE prohibition notice or improvement
                notice for missing safety briefings, missing risk assessments,
                or missing safe systems of work. Direct cost plus the cost of
                the remedial action.
              </li>
              <li>
                <strong>Warranty void</strong> — customer wasn&apos;t briefed on
                how to operate or maintain the kit, the kit fails, the customer
                claims under warranty. Manufacturer rejects the claim because
                operation was outside specification. Cost falls on the firm.
              </li>
              <li>
                <strong>Customer refunds and price reductions</strong> — under
                Consumer Rights Act 2015 s.49, the customer has a statutory right
                to a price reduction or repeat performance where the service
                wasn&apos;t performed with reasonable care and skill.
              </li>
              <li>
                <strong>Increased insurance premiums</strong> — repeat claims,
                particularly negligence claims, drive up professional indemnity
                premiums.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Safety cost</ContentEyebrow>

          <ConceptBlock
            title="Near-misses, RIDDOR, live-conductor exposure, injury"
            plainEnglish="The safety cost of poor communication is the highest-stakes category. Near-misses that aren't reported leave the same defect in place for the next person. Live-conductor exposure follows from a failed handover or a missed isolation. Injury and fatality follow from the same root cause — communication that didn't happen, didn't land, or didn't get documented."
            onSite="The HSE consistently identifies failure to act on prior near-misses as a precursor to fatal incidents. The personal duty under Mgmt H&S Regs 1999 Reg 14 to report near-misses and shortcomings is the apprentice's most important communication discipline. 'No harm done' is the phrase that should make you reach for the report form, not the one that should make you walk away."
          >
            <p>
              The safety-cost cascade:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Unsafe act / unsafe condition</strong> — the bottom of the
                safety pyramid. Skipping a step, taking a shortcut, working with a
                defective tool. Most don&apos;t lead anywhere — but they&apos;re the
                base of the pyramid.
              </li>
              <li>
                <strong>Near-miss</strong> — an event that could have caused harm
                but didn&apos;t. The gateway from unsafe acts to actual incidents.
                Reporting and investigating near-misses is what stops the next
                level.
              </li>
              <li>
                <strong>Minor injury</strong> — first-aid level injury that
                doesn&apos;t require time off work. Not RIDDOR-reportable but
                should be in the accident book.
              </li>
              <li>
                <strong>Reportable injury</strong> — RIDDOR-reportable injuries
                under the 2013 Regulations: specified injuries, injuries causing
                more than 7 days incapacity, occupational diseases.
              </li>
              <li>
                <strong>Major injury or fatality</strong> — the top of the pyramid.
                The HSE will investigate and prosecute. Communication failures in
                the days, weeks or months before the incident will be examined and
                often form the basis of the prosecution.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Management of Health and Safety at Work Regulations 1999 — Reg 14(2)"
            clause={
              <>
                &quot;Every employee shall inform his employer or any other employee of
                that employer with specific responsibility for the health and safety of
                his fellow employees — (a) of any work situation which a person with the
                first-mentioned employee&apos;s training and instruction would reasonably
                consider represented a serious and immediate danger to health and safety;
                and (b) of any matter which a person with the first-mentioned employee&apos;s
                training and instruction would reasonably consider represented a
                shortcoming in the employer&apos;s protection arrangements for health and
                safety, in so far as that situation or matter either affects the health and
                safety of that first-mentioned employee or arises out of or in connection
                with his own activities at work, and has not previously been reported to
                his employer or to any other employee of that employer in accordance with
                this paragraph.&quot;
              </>
            }
            meaning={
              <>
                Reg 14(2) is the personal communication duty on every employee. Two
                triggers: (a) a serious and immediate danger, and (b) a shortcoming in
                the protection arrangements. Both apply to near-misses that exposed a
                defect in the safe system of work — the failed lock-off, the missing
                permit-to-work, the colleague who didn&apos;t know a circuit was live.
                The duty is personal — the employee has to make the report. Not
                reporting is a Reg 14 breach. The duty exists because the employer
                can&apos;t fix what they don&apos;t know about, and most workplace
                incidents are preceded by near-misses or shortcomings someone on the
                team had spotted but not raised.
              </>
            }
            cite="Source: Management of Health and Safety at Work Regulations 1999 (SI 1999/3242), Reg 14 — verbatim from legislation.gov.uk."
          />

          <RegsCallout
            source="Health and Safety at Work etc Act 1974 — s.7"
            clause={
              <>
                &quot;It shall be the duty of every employee while at work — (a) to take
                reasonable care for the health and safety of himself and of other persons
                who may be affected by his acts or omissions at work; and (b) as regards
                any duty or requirement imposed on his employer or any other person by or
                under any of the relevant statutory provisions, to co-operate with him so
                far as is necessary to enable that duty or requirement to be performed
                or complied with.&quot;
              </>
            }
            meaning={
              <>
                HASAWA s.7 is the personal criminal duty on every employee. The duty
                covers acts AND omissions — failing to communicate a hazard you
                identified is an &quot;omission&quot; that affects others. The HSE
                has prosecuted individual employees under s.7 for not briefing a
                successor on a permit-to-work, for not communicating that a circuit
                was still live, and for not raising concerns about defective safe
                systems of work. &quot;I was told to&quot; is not a defence — the
                personal duty stays on the employee regardless of supervisor
                instructions. &quot;I assumed someone else would tell them&quot; is
                also not a defence.
              </>
            }
            cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), Part I, s.7 — verbatim from legislation.gov.uk."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Reputational cost</ContentEyebrow>

          <ConceptBlock
            title="Scheme withdrawal, social media damage, lost referrals"
            plainEnglish="Reputational damage is the slowest-burning cost category but often the most expensive in the long run. Scheme withdrawal removes the right to self-certify domestic notifiable work. A bad online review costs future customers. A complaint to Trading Standards puts the firm on a list. None of it shows up in the books immediately — it shows up over the next 12-24 months as referrals dry up, repeat business doesn't materialise, and new customers pick a competitor."
            onSite="Reputational cost compounds. One bad customer interaction generates a one-star review. The review affects the next ten potential customers, three of whom go elsewhere. Those three would have referred two each — six lost referrals over the following year. Multiplied across multiple incidents and the cost is in the tens of thousands of pounds for a small firm — none of it traceable to a single failed communication, but all of it caused by accumulated communication failures."
          >
            <p>
              The reputational-cost categories:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Scheme withdrawal</strong> — NICEIC, NAPIT, ELECSA suspension
                or withdrawal for repeated complaints, non-compliant work, or refusal
                to engage with the complaints process. See Module 3 §1 Sub 6 on
                certification schemes for the full picture.
              </li>
              <li>
                <strong>Social media damage</strong> — one-star reviews, public
                complaints on Google / Trustpilot / Checkatrade, social media posts
                from disgruntled customers. Visible to every potential future
                customer.
              </li>
              <li>
                <strong>Lost referrals</strong> — most domestic electrical work comes
                via word of mouth. A bad customer experience kills the referral
                pipeline from that customer&apos;s network.
              </li>
              <li>
                <strong>Loss of repeat business</strong> — the customer doesn&apos;t
                book the firm for the next job. Lifetime value of a domestic customer
                is meaningful when you add up boiler installs, EV chargers, EICRs,
                consumer-unit upgrades over the years.
              </li>
              <li>
                <strong>Damage to industry standing</strong> — visible failures of
                particular firms damage trust in the trade as a whole.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Legal cost</ContentEyebrow>

          <ConceptBlock
            title="Breach of contract, professional negligence, HASAWA prosecution"
            plainEnglish="The legal cost category is where communication failure crosses from internal cost into external liability. Breach of contract claims under the Consumer Rights Act 2015 s.49 (services performed without reasonable care and skill). Professional negligence claims where the work falls below the standard of a reasonably competent electrician. HASAWA s.7 personal prosecutions where a communication failure caused or contributed to harm."
            onSite="The legal cost is the rarest of the four categories but by far the highest per-incident. A successful HASAWA s.7 prosecution can result in unlimited fines and imprisonment for serious offences. A successful professional negligence claim can run into hundreds of thousands of pounds. Even a successful Small Claims Court claim costs a day in court, the time of the supervisor and the apprentice, and the reputational damage of a public judgment."
          >
            <p>
              The legal-cost categories:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Breach of contract — Consumer Rights Act 2015 s.49</strong> —
                services to consumer must be performed with reasonable care and skill.
                Breach gives the consumer a right to repeat performance or price
                reduction. Pursued via Small Claims Court, accessible without legal
                representation.
              </li>
              <li>
                <strong>Professional negligence</strong> — common-law tort claim where
                the work falls below the standard of a reasonably competent
                electrician. Damages can include rework, consequential loss
                (replacement of damaged property, alternative accommodation costs)
                and personal injury where applicable.
              </li>
              <li>
                <strong>HASAWA s.7 personal prosecution</strong> — where a
                communication failure caused or contributed to harm. Unlimited fine
                on conviction in the Crown Court; possible imprisonment for serious
                safety offences.
              </li>
              <li>
                <strong>HASAWA s.2 / s.3 employer prosecution</strong> — where the
                employer&apos;s safe system of work failed and the failure was a
                communication breakdown.
              </li>
              <li>
                <strong>Mgmt H&amp;S Regs 1999 Reg 14 enforcement</strong> — for
                employee failures to communicate hazards or shortcomings.
              </li>
              <li>
                <strong>EAWR 1989 prosecution</strong> — Electricity at Work
                Regulations 1989 for electrical-specific breaches, often involving a
                communication failure in the safe-isolation procedure.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Hard-cost vs soft-cost taxonomy"
            plainEnglish="The four cost categories above split usefully into 'hard' costs and 'soft' costs. Hard costs are the ones with a number on an invoice or a court order — rework labour, replacement materials, contract variations the firm couldn't recover, fines from the HSE, settlement payments. Soft costs are slower, less visible and often larger in the long run — reputation, lost referrals, scheme-membership pressure, the morale cost of working for a firm that's always firefighting. Apprentices tend to under-weight soft costs because they're not on a line in the books."
            onSite="A useful exercise on any communication failure is to write the costs in two columns. Hard costs go in the left column — the half-day of labour for the rework, the cost of the cable that had to be re-pulled, the fee for the dispute-resolution service. Soft costs go in the right column — the customer who won't book again, the two referrals that won't materialise, the supervisor's time spent firefighting instead of winning the next job. The right column is usually longer than the left column and the total is usually higher."
          >
            <p>
              The taxonomy in practice — typical hard and soft costs of a single
              communication failure (an undocumented variation that ends in
              dispute):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Hard — rework labour</strong> — the half-day of additional
                work that wasn&apos;t invoiced. Direct cost on the firm&apos;s
                wages bill.
              </li>
              <li>
                <strong>Hard — additional materials</strong> — the extra cable,
                MCB, accessories, consumables for the unrecovered variation.
                Direct cost on the firm&apos;s materials bill.
              </li>
              <li>
                <strong>Hard — variation amount unrecovered</strong> — the agreed
                value of the additional work that the customer disputes and the
                firm can&apos;t prove in the Small Claims Court. Direct loss to
                the firm&apos;s gross margin.
              </li>
              <li>
                <strong>Hard — HSE improvement notice or fine</strong> — where the
                same communication failure also breached a safety duty. Direct
                cost to the firm.
              </li>
              <li>
                <strong>Soft — lost referrals from the customer&apos;s network</strong>
                — the customer who would have recommended you to two friends
                doesn&apos;t. Each lost referral is the lifetime value of a
                domestic customer (boiler installs, EV chargers, EICRs,
                consumer-unit upgrades over the years).
              </li>
              <li>
                <strong>Soft — reputation in the trade</strong> — other
                contractors hear about the dispute, your name is associated
                with it. Future joint-venture work or sub-contracting
                opportunities quietly disappear.
              </li>
              <li>
                <strong>Soft — scheme-membership scrutiny</strong> — repeated
                customer complaints to NICEIC / NAPIT / ELECSA trigger
                additional supervision requirements, more frequent assessment
                visits, or in serious cases scheme withdrawal. Once you&apos;re
                on the scheme&apos;s watch list it&apos;s hard to come off.
              </li>
              <li>
                <strong>Soft — internal morale and retention</strong> — staff who
                spend their time firefighting communication failures get tired and
                leave. Replacement cost of an electrician is meaningful.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Regulatory investigation cost — a worked case study"
            plainEnglish="When a communication failure escalates to a regulatory investigation — typically by the HSE for a safety-related issue, or by the certification scheme for a customer-related issue — the cost is rarely a single line item. It's the direct cost of the investigation, the fine or improvement notice if one is issued, the cost of the remedial action required, the ongoing monitoring or additional supervision the regulator imposes, and the reputational damage that follows the public outcome. The case study below is illustrative of the cost pattern an HSE investigation triggered by a communication failure typically generates."
            onSite="The trigger for an HSE investigation is usually a RIDDOR-reportable incident — but the underlying root cause is often a communication failure that should have been caught months earlier. A near-miss that wasn't reported, a permit-to-work that wasn't briefed, a successor electrician who wasn't told about a live circuit. The cost of catching the issue at the near-miss stage is five minutes of the apprentice's time on a report form. The cost of catching it at the HSE-investigation stage is in the tens of thousands of pounds — and that's before the prosecution costs."
          >
            <p>
              Worked case study — illustrative HSE-investigation cost pattern
              following a serious electrical incident with a communication-failure
              root cause:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Direct investigation cost</strong> — HSE inspector site
                visits, document requests, interviews under caution with the
                apprentice, supervisor, contracts manager and director. Each
                interview takes the firm&apos;s time off the next job and
                requires legal representation. Typical firm-side cost runs into
                the thousands of pounds before any enforcement action is
                decided.
              </li>
              <li>
                <strong>Improvement notice or prohibition notice</strong> — issued
                by the inspector requiring specific remedial action within a
                fixed timescale. The firm has to do the work (revised RAMS,
                updated safe-isolation procedure, re-briefing all operatives) and
                pay the inspector&apos;s fee for the notice — Fee For
                Intervention (FFI) is charged at the published HSE hourly rate
                for the inspector&apos;s time on the case.
              </li>
              <li>
                <strong>Fine on conviction</strong> — for a HASAWA s.2 or s.3
                breach, fines in the Crown Court are unlimited and the Sentencing
                Council&apos;s definitive guideline ties the fine to the firm&apos;s
                turnover and the seriousness of the harm. For a small contractor
                a fine in the tens of thousands of pounds for a serious incident
                is realistic; for a larger firm the figure can be in the
                hundreds of thousands.
              </li>
              <li>
                <strong>Personal HASAWA s.7 prosecution</strong> — where the
                investigation finds an individual employee&apos;s communication
                failure caused or contributed to harm. Unlimited fine on
                conviction in the Crown Court, possible custodial sentence for
                the most serious safety offences. The conviction stays on the
                individual&apos;s record.
              </li>
              <li>
                <strong>Ongoing monitoring</strong> — the HSE may require
                follow-up visits, additional reporting or revised arrangements
                for a defined period. The firm carries the cost of the inspector
                time and the internal time spent demonstrating compliance.
              </li>
              <li>
                <strong>Reputational follow-on</strong> — HSE prosecutions are
                publicly reported on the HSE register and picked up by trade
                press and local news. Major customers (commercial clients,
                main contractors) consult the register before awarding contracts.
                A live entry on the register can lock the firm out of tendering
                opportunities for years.
              </li>
              <li>
                <strong>The discipline that prevents all of this</strong> — the
                near-miss report at the start. Five minutes of an apprentice&apos;s
                time, written up in the firm&apos;s near-miss register,
                investigated and acted on by the supervisor. The communication
                discipline is the cheapest insurance the firm has.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Reputational-loss cycle — how one bad review compounds into a bonded loop"
            plainEnglish="Reputational damage from a communication failure rarely stops at one bad review. The review goes onto a public review platform (Google, Trustpilot, Checkatrade) where it's visible to every potential future customer. Some of those customers post about it on social media, where it spreads further. The loss of new contracts that follows reduces the firm's revenue. The reduced revenue can be picked up by the Competent Person Scheme during routine assessment as a sign of business stress, which can trigger additional scrutiny. Each turn of the loop strengthens the next turn. Breaking the cycle takes years."
            onSite="The single bad review is recoverable. The firm responds calmly, addresses the substance, offers a remedy if appropriate, and most readers will weigh the response as much as the original complaint. What's not recoverable is a pattern — three or four bad reviews on the same platform telling the same story (poor communication, missed appointments, undocumented variations, defensive responses to complaints). The pattern shapes the firm's online identity and the loss compounds. Every customer interaction is a vote on the firm's future reputation; the apprentice's role in those interactions matters more than they often realise."
          >
            <p>
              The five turns of the reputational-loss cycle:
            </p>
            <ol className="space-y-2 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Trigger — one bad customer experience</strong> — a
                communication failure (missed handover, undocumented variation,
                argued-back response to a complaint) ends with an unhappy
                customer. The customer posts a one-star review on Google,
                Trustpilot or Checkatrade.
              </li>
              <li>
                <strong>Amplification on review platforms</strong> — the review
                is visible to every potential future customer who searches the
                firm. Algorithms surface negative reviews prominently; review
                count and average rating are weighted in search results. One
                bad review affects dozens of future search outcomes.
              </li>
              <li>
                <strong>Spread on social media</strong> — the customer posts
                about the experience on Facebook, in local community groups, or
                on tradesperson-recommendation pages. The post is shared, other
                customers comment, the original complaint takes on a life of
                its own outside the firm&apos;s control.
              </li>
              <li>
                <strong>Lost contracts</strong> — potential customers who would
                have booked the firm see the reviews or the social-media posts
                and pick a competitor. The lost revenue compounds — each lost
                customer doesn&apos;t generate referrals into their network
                either.
              </li>
              <li>
                <strong>Scheme audit and bonded loop</strong> — repeated customer
                complaints to NICEIC / NAPIT / ELECSA trigger investigation,
                additional supervision visits, or in serious cases scheme
                suspension. The firm now has higher costs (additional
                supervision fees, remedial work) AND lower revenue (lost
                contracts), which makes it harder to invest in the staff
                training, customer-service systems and quality discipline that
                would break the cycle. The loop is bonded — each turn makes
                the next turn more likely.
              </li>
            </ol>
            <p className="mt-3">
              Breaking the cycle takes deliberate work — calm public responses
              to negative reviews, proactive collection of positive reviews
              from satisfied customers, investment in customer-communication
              training, and consistent communication discipline on every job.
              The cheapest point of intervention is upstream — preventing the
              communication failure in the first place. The apprentice&apos;s
              five-minute discipline of writing the variation, photographing
              the chase, and reporting the near-miss is what stops the cycle
              starting.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Consumer Rights Act 2015 — s.49(1)"
            clause={
              <>
                &quot;Every contract to supply a service is to be treated as including a
                term that the trader must perform the service with reasonable care and
                skill.&quot;
              </>
            }
            meaning={
              <>
                Section 49 is the statutory standard for service quality in consumer
                contracts. &quot;Reasonable care and skill&quot; is the test —
                it&apos;s an objective standard judged against what a reasonably
                competent practitioner in the trade would do. Communication failures
                are routinely cited as part of negligence claims under s.49 — failure
                to advise the customer of a safety risk, failure to handover properly,
                failure to explain scope. Breach gives the customer rights including
                repeat performance and price reduction. Pursued via Small Claims Court
                without legal representation.
              </>
            }
            cite="Source: Consumer Rights Act 2015 (2015 c.15), Part 1, Chapter 4, s.49 — verbatim from legislation.gov.uk."
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
            title="Treating a near-miss as 'no harm done'"
            whatHappens={
              <>
                Apprentice tests a sub-board they thought was isolated. Test prods
                touch a phase conductor that&apos;s still live. No contact, no
                shock — they step back, heart pounding. Don&apos;t tell the
                supervisor because &quot;no harm done&quot;. Two weeks later
                another apprentice on the same circuit, with the same lock-off
                procedure, isn&apos;t as careful. Receives a serious electric
                shock. HSE investigates. The investigation identifies the prior
                near-miss and the failure to report it. The first apprentice is
                interviewed under HASAWA s.7 and Mgmt H&amp;S Regs 1999 Reg 14.
                The employer is interviewed under HASAWA s.2 and EAWR 1989.
                Multiple regulatory and personal liabilities.
              </>
            }
            doInstead={
              <>
                Report every near-miss, even (especially) when no harm was done.
                Mgmt H&amp;S Regs 1999 Reg 14(2) makes this a personal statutory
                duty. The report allows the employer to investigate, identify the
                root cause (defective lock-off, missing permit-to-work, briefing
                that didn&apos;t land), fix it, brief the team, and prevent the
                next incident. &quot;No harm done&quot; is the phrase that should
                make you reach for the report form, not walk away. The HSE
                consistently identifies failure to act on prior near-misses as a
                precursor to fatal incidents.
              </>
            }
          />

          <CommonMistake
            title="Doing the variation on a verbal yes and assuming the customer will pay"
            whatHappens={
              <>
                Customer asks for an extra circuit on day three of a five-day
                kitchen rewire. Apprentice agrees verbally. The work is done —
                takes half a day, two extra cable runs, an additional MCB and
                associated test work. Apprentice adds the cost to the final
                invoice. Customer disputes the additional charge — &quot;I never
                agreed to that price&quot;. Firm has no documented variation,
                no agreed price, no signed scope change. Disputes goes to the
                Small Claims Court. Court finds for the customer because the
                contractor cannot demonstrate the variation was properly
                documented. The half-day of labour, the additional materials,
                the late completion of the job — all sit on the firm&apos;s
                profit margin. The same pattern, repeated across many small
                variations on many jobs, is a material annual loss.
              </>
            }
            doInstead={
              <>
                The moment a customer asks for additional work, switch from
                verbal to written. A short written variation document by email
                — listing the work, the cost, the time impact, requesting the
                customer&apos;s confirmation — takes five minutes. Don&apos;t
                start the additional work until the written confirmation is
                back. The variation document protects payment, scope and
                warranty. The verbal yes is for the relationship; the written
                variation is for the file.
              </>
            }
          />

          <Scenario
            title="Apprentice doesn't report a near-miss with a live conductor"
            situation={
              <>
                You&apos;re testing a sub-distribution board you thought had been
                isolated and locked-off by the supervisor 30 minutes earlier. You
                proved the tester at the proving unit, did your dead test on the
                conductors, and one of them registered as live. You stepped back —
                no contact, no shock, no injury. Investigation in the moment shows
                the lock-off had been put on the wrong switch — the supervisor
                isolated the wrong sub-board. You re-do the isolation properly,
                lock-off correctly, dead-test, and proceed with the work.
                You&apos;re shaken but uninjured. Nobody else saw what happened
                and the supervisor doesn&apos;t mention it. You consider whether
                to report it.
              </>
            }
            whatToDo={
              <>
                Report it. Write up the near-miss in the firm&apos;s near-miss
                register or accident book — date, time, location, what you
                expected (board isolated, dead-test confirms dead), what you
                found (conductor live, lock-off on wrong switch), what action
                you took (re-isolated, locked-off, dead-tested, proved tester,
                proceeded). Tell the supervisor face-to-face calmly — &quot;I
                need to flag a near-miss from earlier&quot;. Mgmt H&amp;S Regs
                1999 Reg 14(2) makes this a personal statutory duty — the lock-
                off-on-wrong-switch is both a serious and immediate danger AND a
                shortcoming in the protection arrangements. Report it to the
                employer&apos;s nominated person if the supervisor is the source
                of the shortcoming. The employer is required to investigate,
                identify the root cause (was the supervisor briefed on which
                board to isolate? did they have the right drawings?), and fix
                the safe system of work to prevent the next incident. If you
                don&apos;t report it, the same defect is in place for the next
                apprentice — who may not be as lucky.
              </>
            }
            whyItMatters={
              <>
                The HSE&apos;s &quot;accident triangle&quot; consistently shows
                that for every fatality there are dozens of serious injuries,
                hundreds of minor injuries, and thousands of near-misses with
                similar root causes. Reporting and acting on near-misses is the
                single most effective way to prevent the next serious incident.
                Failing to report a near-miss leaves the same defect in place.
                Two weeks after the unreported near-miss, another apprentice on
                the same circuit, with the same lock-off procedure, isn&apos;t
                as careful and gets a serious shock. HSE investigates, finds the
                prior near-miss was known and not reported, and prosecutes both
                the employer (HASAWA s.2, EAWR 1989) AND the original apprentice
                (HASAWA s.7, Mgmt H&amp;S Regs 1999 Reg 14). The personal liability
                cannot be transferred to the employer or the supervisor. Reporting
                takes five minutes and prevents the entire downstream cost.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Poor communication has four cost categories — financial, safety, reputational, legal. Each is real and each is recoverable from someone.",
              "Financial — rework, variations not invoiced, fines, warranty void, refunds, increased insurance premiums. The variations-not-invoiced category is the largest silent profit killer.",
              "Safety — near-miss escalating to RIDDOR-reportable incident, live-conductor exposure, injury, fatality. Near-misses are the leading indicator of serious incidents.",
              "Reputational — scheme withdrawal, social media damage, lost referrals, loss of repeat business. Compounds over 12-24 months.",
              "Legal — breach of contract under Consumer Rights Act 2015 s.49, professional negligence, HASAWA s.7 personal prosecution, EAWR 1989 prosecution.",
              "HASAWA s.7 puts a personal criminal duty on every employee. 'I was told to' is not a defence. The duty cannot be transferred to the employer.",
              "Mgmt H&S Regs 1999 Reg 14(2) puts a personal duty on every employee to inform the employer of dangers and of shortcomings in the protection arrangements. Not reporting near-misses is a Reg 14 breach.",
              "The 5-minute discipline of writing a variation, photographing a chase before plastering, or reporting a near-miss is the highest-ROI habit an apprentice can build.",
            ]}
          />

          <Quiz title="Effects of poor communication — knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module5/section5/5-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                5.3 Conflict resolution
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module5/section5/5-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.5 Mental health and neurodiversity in the trade
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
