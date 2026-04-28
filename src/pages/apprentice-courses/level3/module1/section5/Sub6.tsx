/**
 * Module 1 · Section 5 · Subsection 6 — Legal vs commercial implications
 * Maps to C&G 2365-03 / Unit 201 — supplementary depth (beyond AC framework)
 * 2357 Unit 601 ELTK01 — AC 1.5: "State the categories of statutory legislation that influence health
 * and safety practice in the workplace and the implications of non-compliance to the employer, employee
 * and other persons." L3 supervisor judgement on the priority when legal duty conflicts with commercial
 * pressure. Statute imposes; contract cannot remove (HASAWA s.36 third-party liability).
 */
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import { TLDR, ConceptBlock, RegsCallout, CommonMistake, Scenario, KeyTakeaways, FAQ, LearningOutcomes, ContentEyebrow, SectionRule } from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Legal vs commercial implications | Level 3 Module 1.5.6 | Elec-Mate';
const DESCRIPTION = 'L3 supervisor judgement on the priority when legal duty conflicts with commercial pressure. Statutory duties cannot be contracted out.';

const checks = [
  { id: 'l3-m1-s5-sub6-priority', question: 'When legal duty conflicts with commercial pressure, what wins?', options: ['Whichever is bigger.', 'Legal duty - always. Statutory duties cannot be contracted out and HASAWA s.7 / EAWR Reg 16 personal duties don\'t bend to customer / employer commercial preference.', 'Commercial.', 'Customer.'], correctIndex: 1, explanation: 'Statute trumps contract; statute trumps preference. The L3 supervisor framing is firm: legal duty is non-negotiable.' },
  { id: 'l3-m1-s5-sub6-cost', question: 'What\'s the cost of legal compliance vs the cost of breach?', options: ['Compliance is more expensive.', 'Compliance is almost always cheaper than breach. Compliance = time, kit, training. Breach = fine + FFI + legal + civil + insurance + reputation + lost contracts. Sentencing Council guideline puts serious-case fines into six figures alone.', 'Same.', 'Random.'], correctIndex: 1, explanation: 'Compliance is the cheap option. Breach is exponentially more expensive once consequences cascade.' },
  { id: 'l3-m1-s5-sub6-pressure', question: 'How does the L3 supervisor handle commercial pressure to compromise safety?', options: ['Comply.', 'Refuse, document in writing, escalate up the chain, cite the regulatory framework, frame the consequence cascade. ERA s.44 protects from detriment. PIDA 1998 protects external escalation if internal fails.', 'Hide.', 'Quit.'], correctIndex: 1, explanation: 'Refusal + documentation + escalation + framing. The L3 supervisor toolkit for difficult conversations.' },
];

const quizQuestions = [
  { id: 1, question: 'Can statutory duties be contracted away?', options: ['Yes.', 'No - statute imposes; contract cannot remove. A contract may shift commercial liability between parties but statutory duty stays where Parliament put it. The HSE prosecutes on statutory hook.', 'Sometimes.', 'In Wales only.'], correctAnswer: 1, explanation: 'Statute trumps contract. Foundational principle of regulatory law.' },
  { id: 2, question: 'What\'s the typical commercial cost of an HSE prosecution?', options: ['£100.', 'Fine + FFI + legal defence + civil compensation + insurance premium increase + lost contracts + reputation damage. Often 3-5x the fine alone for serious cases.', '£1.', 'Free.'], correctAnswer: 1, explanation: 'Total cost much greater than fine alone. The cascade is severe.' },
  { id: 3, question: 'Can criminal fines be paid by the firm\'s insurance?', options: ['Yes.', 'No - against public policy to insure the cost of breaking the law. PI / EL covers legal defence costs and civil claims but NOT criminal fines.', 'Half.', 'Random.'], correctAnswer: 1, explanation: 'Insurance doesn\'t cover criminal fines. The fine comes off the firm\'s bottom line.' },
  { id: 4, question: 'What\'s the customer\'s leverage in commercial pressure scenarios?', options: ['Total.', 'The contract terms, the relationship, future work, payment timing. Commercial leverage is real but cannot override statutory duty. The L3 supervisor frames the conversation around legal compliance, not customer satisfaction.', 'None.', 'Random.'], correctAnswer: 1, explanation: 'Commercial leverage is real and worth respecting; it just cannot override statute.' },
  { id: 5, question: 'Who decides whether to walk away from a commercial conflict?', options: ['Apprentice.', 'Firm\'s contracts manager / director - that\'s their decision. The L3 supervisor escalates to them with the facts; they decide commercial response. The L3\'s personal duty is to refuse the unsafe instruction; the commercial decision is above that.', 'HSE.', 'Customer.'], correctAnswer: 1, explanation: 'L3 escalates; firm\'s commercial decision-makers decide. Clean separation.' },
  { id: 6, question: 'How does the L3 supervisor frame the consequence to a customer?', options: ['Long lecture.', 'Brief and respectful: \"I understand the pressure but the legal framework here is X. The consequences cascade if we cut corners. We\'re a regulated trade; we have to comply. We can do this safely with X / Y / Z; we can\'t do it the other way.&quot; Most customers accept the framing once explained calmly.', 'Aggressive.', 'Hide.'], correctAnswer: 1, explanation: 'Brief, calm, factual. Most customers respect the boundary once it\'s clearly stated.' },
  { id: 7, question: 'What\'s the relationship between legal compliance and commercial reputation?', options: ['Inverse.', 'Aligned - reputation for compliance and quality wins repeat business. The HSE Public Register prosecutions / notices are a competitive disadvantage. Firms with clean records win frameworks; firms with poor records lose them.', 'Random.', 'No relationship.'], correctAnswer: 1, explanation: 'Compliance and commercial success are aligned over time. Cutting corners is short-term thinking with long-term cost.' },
  { id: 8, question: 'L3 personal protection in legal-vs-commercial conflicts?', options: ['None.', 'ERA 1996 s.44 (no detriment for raising H&S concerns); PIDA 1998 (whistleblowing, qualifying disclosures including external regulator); HASAWA s.7 (personal duty so refusal is required); EAWR Reg 16 (competence-based refusal).', 'Customer service.', 'Random.'], correctAnswer: 1, explanation: 'Multiple legal protections for the L3 who refuses unsafe work. Use them.' },
];

const faqs = [
  { question: 'What if the firm pressures me to compromise?', answer: 'Refuse; document; escalate. ERA s.44 protects from detriment. PIDA 1998 protects external if internal fails.' },
  { question: 'What if losing a customer would cost the firm a major contract?', answer: 'Commercial decisions are the firm\'s; safety decisions are statutory. The L3 escalates the safety concern to the contracts manager / director who handles the commercial response.' },
  { question: 'Can a firm refuse to do work that\'s legally required (e.g. EICR remedial)?', answer: 'A firm can decline a contract; once contracted to deliver, they must deliver compliantly or break the contract (with consequences). Refusing legally-required remedial mid-contract is breach unless safety justifies.' },
  { question: 'How do I know when commercial pressure has tipped into asking me to do something illegal?', answer: 'When the proposed action breaches statute - HASAWA / EAWR / MHSWR / RIDDOR / CAR / WAH / etc. The L3 supervisor recognises the regulatory framework and identifies when actions cross the line.' },
  { question: 'Are there situations where commercial considerations legitimately influence safety decisions?', answer: 'Yes - within the legal framework. Choice of platform vs ladder, scope of testing, frequency of inspection - all involve commercial choices within ALARP. But absolute requirements (EAWR Reg 14 three-test, MHSWR Reg 3, etc) aren\'t commercially negotiable.' },
  { question: 'What about the customer who insists on a non-compliant install (e.g. omitting RCD)?', answer: 'Refuse. BS 7671 may permit some choices but compliance with relevant safety standards is non-negotiable for the firm. Customer can refuse to engage you; they can\'t direct an unsafe install.' },
];

export default function Sub6() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);
  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section5')} className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"><ArrowLeft className="h-4 w-4" /> Section 5</button>
          <PageHero eyebrow="Module 1 · Section 5 · Subsection 6" title="Legal vs commercial implications" description="Remember from Section 5.1 - statute imposes; contract can't remove. At L3 the practical judgement on commercial pressure: legal duty wins, every time, communicated clearly." tone="emerald" />
          <TLDR points={[
            "Legal duty wins. Statutory duties cannot be contracted away. HASAWA s.7 / EAWR Reg 16 personal duties don't bend to commercial pressure.",
            "Compliance cost is small; breach cost cascades (fine + FFI + legal + civil + insurance + reputation + lost contracts). Insurance doesn't cover criminal fines.",
            "L3 supervisor toolkit: refuse + document + escalate + frame consequences. ERA s.44 + PIDA 1998 protect.",
          ]} />
          <LearningOutcomes outcomes={[
            "State that statutory duties cannot be contracted away.",
            "Compare cost of compliance vs cost of breach.",
            "Apply the L3 supervisor toolkit for legal-vs-commercial conflicts.",
            "Frame consequence cascade to senior management and customers.",
            "Identify ERA s.44 and PIDA 1998 protections.",
            "Recognise alignment of compliance and long-term commercial reputation.",
          ]} initialVisibleCount={3} />

          <ContentEyebrow>Statute vs contract</ContentEyebrow>
          <ConceptBlock title="The non-negotiable legal foundation" plainEnglish="Statute imposes duties on parties (employer / employee / dutyholder etc) regardless of any contract between them. A contract can shift commercial risk - who pays the bill, who insures, who is liable to whom - but it cannot remove or modify statutory duty. The HSE prosecutes on the statutory hook." onSite="The L3 reflex: when a customer or employer pushes for something non-compliant, the response framework is &quot;the statute applies regardless of what the contract says or what we agree between us; we can't do it&quot;.">
            <p>What can / can&apos;t be contracted:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>CAN be contracted</strong> - commercial price, payment terms, scope of work, allocation of commercial liability between parties, who handles waste disposal arrangements, who provides welfare facilities.</li>
              <li><strong>CANNOT be contracted away</strong> - HASAWA duties, EAWR duties, MHSWR duties, CDM duties, RIDDOR duties, CAR duties, WAH duties, environment duties etc. Personal s.7 / Reg 16 duties on individuals.</li>
              <li>Contract clauses purporting to remove statutory duty are unenforceable; the duty stays where statute put it.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="HASAWA 1974 - s.36(1)" clause={<>"Where the commission by any person of an offence under any of the relevant statutory provisions is due to the act or default of some other person, that other person shall be guilty of the offence, and a person may be charged with and convicted of the offence by virtue of this subsection whether or not proceedings are taken against the first-mentioned person."</>} meaning={<>s.36 - third party can be liable where their act or default caused another&apos;s breach. Means the customer who instructs a non-compliant install can be liable; the supplier who provides false information can be liable; the contractor who pressures the apprentice can be liable. Duties cascade across parties; commercial relationship doesn&apos;t insulate.</>} cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), s.36 - verbatim from legislation.gov.uk." />

          <InlineCheck {...checks[0]} />

          <SectionRule />
          <ContentEyebrow>The cost cascade</ContentEyebrow>
          <ConceptBlock title="Compliance is cheap; breach is exponentially expensive" plainEnglish="The cost of compliance - time, kit, training, insurance - is small relative to revenue. The cost of breach cascades: fine, FFI, legal defence, civil compensation, insurance premium increases, lost contracts, reputation damage on HSE Public Register, possible scheme deregistration, possible director custody. Often 3-5x the fine alone for serious cases." onSite="Commercial framing of safety decisions starts from this asymmetry. Saving £200 on a procedure can cost £200,000 in cascade. The L3 supervisor reframes &quot;cutting corners saves money&quot; into &quot;cutting corners exposes the firm to disproportionate cost&quot;.">
            <p>The cascade itemised:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Fine</strong> - per Sentencing Council matrix; six figures for serious cases.</li>
              <li><strong>FFI</strong> - inspector time billed at ~£170/hr; routinely four-figure to five-figure invoice.</li>
              <li><strong>Legal defence</strong> - solicitor + barrister + experts; £20k-£200k+ for serious cases.</li>
              <li><strong>Civil compensation</strong> - injured party / family claims; PI insurance pays subject to limits.</li>
              <li><strong>Insurance premiums</strong> - rise after claims; some insurers decline cover.</li>
              <li><strong>HSE Public Register</strong> - listed for 5+ years; visible to clients during procurement.</li>
              <li><strong>Lost contracts</strong> - public-sector frameworks often disqualify firms with prohibition notices; major private clients similar.</li>
              <li><strong>Scheme deregistration</strong> - NICEIC / NAPIT may suspend / withdraw registration.</li>
              <li><strong>Director custody</strong> - HASAWA s.37 + Sentencing Council; serious cases include immediate custody.</li>
              <li><strong>Reputation</strong> - hardest to quantify, longest-lasting impact.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />
          <InlineCheck {...checks[2]} />

          <SectionRule />
          <ContentEyebrow>The L3 supervisor toolkit</ContentEyebrow>
          <ConceptBlock title="Refuse, document, escalate, frame, protect" plainEnglish="The five-step toolkit for legal-vs-commercial conflicts. Refuse the unsafe action; document in writing same time; escalate up the firm chain in writing; frame the consequence cascade for senior management; rely on ERA s.44 + PIDA 1998 protection." onSite="The toolkit isn\'t adversarial. Most senior management responds well when consequences are clearly framed. The protection mechanisms (ERA s.44, PIDA 1998) make refusal sustainable when the response isn\'t reasonable.">
            <p>Toolkit elements:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li><strong>Refuse</strong> - politely, immediately. Cite the regulation if you can.</li>
              <li><strong>Document</strong> - text, email, job-pack note. Time-stamped. Same day.</li>
              <li><strong>Escalate</strong> - supervisor → contracts manager → QS / H&amp;S manager → director.</li>
              <li><strong>Frame</strong> - consequence cascade for senior management; Sentencing Council bands; insurance limits.</li>
              <li><strong>Protect</strong> - ERA s.44 + PIDA 1998 + HASAWA s.7 (personal duty so refusal is required).</li>
            </ol>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>ERA 1996 s.44 — protection from detriment</ContentEyebrow>
          <ConceptBlock title="The statutory shield for raising H&amp;S concerns" plainEnglish="ERA 1996 s.44 protects employees from detriment imposed for taking specified action on health and safety. The protected actions include raising concerns, leaving the workplace in serious and imminent danger, and taking steps to protect oneself or others. Detriment includes dismissal, demotion, withholding of work, victimisation. The L3 supervisor refusing unsafe work has direct s.44 protection." onSite="The L3 reflex on retaliation: ERA s.44 makes detriment for raising H&amp;S concerns unlawful. Tribunal claim available without the usual two-year qualifying period. The framing &quot;ERA s.44 protects this conversation&quot; lands with HR / management precisely because it is correct.">
            <p>ERA s.44 protected actions:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Carrying out designated H&amp;S activities (safety reps).</li>
              <li>Performing functions as a member of a safety committee.</li>
              <li>Bringing reasonable concerns to the employer&apos;s attention by reasonable means.</li>
              <li>Leaving or refusing to return to a place of work in serious and imminent danger.</li>
              <li>Taking appropriate steps to protect self or others from danger.</li>
              <li>No qualifying period required for s.44 claim — protection from day one.</li>
              <li>Detriment includes dismissal, demotion, withholding overtime, transfer to worse role, harassment.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="Employment Rights Act 1996 — s.44(1)" clause={<>&quot;An employee has the right not to be subjected to any detriment by any act, or any deliberate failure to act, by his employer done on the ground that — ... (c) being an employee at a place where there was no such representative or safety committee, or where there was such a representative or safety committee but it was not reasonably practicable for the employee to raise the matter by those means, he brought to his employer&apos;s attention, by reasonable means, circumstances connected with his work which he reasonably believed were harmful or potentially harmful to health or safety...&quot;</>} meaning={<>The detriment protection. Subsection (c) covers the standard L3 case — raising a concern by reasonable means (verbal, written, escalation in writing). Subsection (d) covers leaving the workplace in serious and imminent danger; subsection (e) covers taking appropriate steps. Together they form the operative&apos;s safety-refusal toolkit.</>} cite="Source: Employment Rights Act 1996 (1996 c.18), s.44 — verbatim from legislation.gov.uk." />

          <RegsCallout source="Public Interest Disclosure Act 1998 — inserted into ERA 1996 as s.43A-L" clause={<>&quot;A &apos;qualifying disclosure&apos; means any disclosure of information which, in the reasonable belief of the worker making the disclosure, is made in the public interest and tends to show one or more of the following — (a) that a criminal offence has been committed... (b) that a person has failed to comply with any legal obligation... (d) that the health or safety of any individual has been, is being or is likely to be endangered...&quot;</>} meaning={<>The whistleblowing protection. &quot;Qualifying disclosure&quot; covers six categories including criminal offences, breach of legal obligation, danger to health or safety. Reasonable-belief standard — does not need to be proven true, just reasonably believed. Internal route normal first; external (to prescribed person such as HSE) protected after internal failure or in serious cases.</>} cite="Source: Public Interest Disclosure Act 1998, inserting Part IVA into Employment Rights Act 1996 — verbatim from legislation.gov.uk." />

          <ConceptBlock title="PIDA 1998 — whistleblowing for external escalation" plainEnglish="The Public Interest Disclosure Act 1998 amended ERA 1996 to protect &quot;qualifying disclosures&quot; — disclosure of information tending to show a criminal offence, breach of legal obligation, danger to health or safety, environmental damage, miscarriage of justice, or concealment of any of these. Internal disclosure is the normal first route; external disclosure (to a prescribed regulator like HSE) is protected where internal route has been exhausted or where the matter is exceptionally serious." onSite="The L3 supervisor who has escalated internally without action and now needs to call HSE has PIDA protection — provided the internal route was attempted and the disclosure is in the public interest. PIDA does NOT protect malicious or knowingly false disclosure.">
            <p>PIDA 1998 elements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Qualifying disclosure — information tending to show one of the six categories.</li>
              <li>Made in the public interest (not personal grievance alone).</li>
              <li>Reasonable belief that information is substantially true.</li>
              <li>Internal disclosure to employer is normal first route.</li>
              <li>External disclosure to prescribed person (HSE for safety) protected after internal failure or in serious cases.</li>
              <li>Wider disclosure (media) protected only in very limited exceptionally serious cases.</li>
              <li>Detriment for protected disclosure is unlawful; tribunal claim available.</li>
              <li>No qualifying period required.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="HSE Public Register and the procurement consequence" plainEnglish="The HSE maintains a public register of prosecutions and enforcement notices. Entries persist for at least 5 years. During procurement major clients (public sector, large private) routinely check the register; entries can disqualify firms from frameworks or trigger enhanced scrutiny. The reputational impact often exceeds the fine alone over time." onSite="The L3 supervisor framing on the cost cascade: the fine is one-off, but the public-register entry sits there for 5+ years affecting every tender during that window. A single Improvement Notice on the register can lock the firm out of public-sector framework eligibility. The L3 supervisor surfaces this when discussing why short-cuts hurt the firm long-term.">
            <p>Public register entries that affect procurement:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Prosecutions and convictions — case details, dates, fines.</li>
              <li>Improvement Notices — site, date, breach, deadline.</li>
              <li>Prohibition Notices — site, date, breach, immediate effect.</li>
              <li>Crown Censures (where prosecution against Crown body not possible).</li>
              <li>Visible to anyone with internet access — competitors, clients, insurers.</li>
              <li>Persists 5+ years; ongoing reputational tail.</li>
              <li>Public-sector frameworks routinely require disclosure of any entries.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Scheme body consequences — NICEIC, NAPIT, ELECSA, Stroma" plainEnglish="Competent Person Schemes (NICEIC, NAPIT, ELECSA, Stroma etc) have their own enforcement powers separate from HSE. Major safety failings can trigger scheme suspension or de-registration. Loss of CPS registration means notifiable work under Approved Doc P cannot be self-certified — every job needs separate building control notification with fees, effectively ending the firm&apos;s competitive position in the domestic market." onSite="The L3 supervisor framing: even where HSE prosecution is avoided, the scheme body may take action. NICEIC technical investigations can be triggered by customer complaints, building control referrals, or media coverage. Scheme suspension is sudden and effectively ends domestic trading. Scheme registration is the firm&apos;s commercial licence — protect it.">
            <p>Scheme body actions:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Technical investigation triggered by complaint / referral.</li>
              <li>Re-assessment visit at firm&apos;s cost.</li>
              <li>Conditional registration with mandatory remedial works.</li>
              <li>Suspension from scheme.</li>
              <li>De-registration — most serious action.</li>
              <li>Loss of CPS registration ends self-certification under Approved Doc P.</li>
              <li>Insurance premiums often rise where scheme actions on record.</li>
              <li>Public-facing customer-search portals (e.g. Trustmark) reflect scheme status.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Defective Premises Act 30-year retrospective limitation" plainEnglish="The Building Safety Act 2022 amended the Defective Premises Act 1972 to extend the limitation period for residential defect claims — 30 years retrospective for past claims, 15 years prospective for new work. This dramatically extends contractor liability for residential work. The L3 supervisor framing: shortcuts taken today can land in court 30 years later." onSite="The L3 supervisor culture on residential work: digital records indefinitely; design records retained; certification packs complete and traceable. Paper certs lost in 5 years are no defence in 25 years. The 30-year retrospective extension reaches old work; the 15-year prospective applies to new work going forward.">
            <p>DPA / BSA 2022 limitation effects:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>30 years retrospective limitation for past residential defect claims.</li>
              <li>15 years prospective limitation for new work after BSA 2022 commencement.</li>
              <li>Applies to dwellings (residential) — broader than HRRBs.</li>
              <li>Includes claims by leaseholders, freeholders, occupiers.</li>
              <li>Reaches design defects, installation defects, materials specification.</li>
              <li>Drives long-term record retention as practical defence.</li>
              <li>Affects contractor insurance pricing and coverage availability.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <CommonMistake title="Going along with commercial pressure to keep the customer happy" whatHappens={<>L3 succumbs to customer pressure to short-cut isolation. Incident occurs. HSE prosecution; firm + L3 + customer (under s.36 if their pressure caused the breach) all liable. The L3&apos;s &quot;customer wanted it&quot; defence is rejected.</>} doInstead={<>Refuse. The customer&apos;s commercial preference doesn&apos;t override statute. Document; escalate; frame. ERA s.44 protects.</>} />

          <CommonMistake title="Treating &quot;the firm decided&quot; as personal protection" whatHappens={<>Firm director instructs unsafe procedure. L3 follows because &quot;director said so&quot;. HSE prosecution names the L3 personally under s.7. &quot;Director told me&quot; rejected as defence. Director also prosecuted under s.37.</>} doInstead={<>HASAWA s.7 personal duty isn&apos;t reduced by employer instruction. Refuse; document; escalate. ERA s.44 protects from any retaliation.</>} />

          <Scenario title="Customer demands non-compliant work" situation={<>Customer wants you to install a circuit without the RCD that BS 7671 requires for the location. They argue &quot;it&apos;s my house, I don&apos;t want a nuisance trip&quot;. They&apos;ll go to another contractor if you refuse. Your contracts manager calls and says &quot;just do it — we need the customer&quot;.</>} whatToDo={<>Apply the toolkit. Refuse: &quot;BS 7671 requires RCD protection in this location; we can&apos;t install non-compliantly.&quot; Document: text the customer summarising the conversation; email contracts manager confirming refusal and reason. Escalate: speak to QS / director if contracts manager won&apos;t accept. Frame: &quot;if we install non-compliantly and someone is injured, the cascade is HSE prosecution under EAWR Reg 4 + BS 7671 non-compliance, civil claim by injured party, scheme deregistration risk, customer themselves may be liable under HASAWA s.36 for instructing the non-compliant install. Insurance won&apos;t cover criminal fines. The customer&apos;s commercial leverage is real but the legal framework isn&apos;t negotiable.&quot; Protect: ERA s.44 covers refusal to do unsafe / unlawful work. The customer can refuse to use you; they can&apos;t direct unsafe install. Most contracts managers respect the legal framing once it&apos;s clearly stated.</>} whyItMatters={<>This is the legal-vs-commercial conflict in action. Customer commercial preference + contracts-manager commercial response + firm&apos;s legal duty all collide. The L3 supervisor&apos;s toolkit gives a structured response that protects the team, the firm and the operative personally. Most situations resolve with calm framing; the minority that don&apos;t are exactly the ones where ERA s.44 and PIDA 1998 protections matter.</>} />

          <SectionRule />
          <FAQ items={faqs} />
          <SectionRule />
          <KeyTakeaways points={[
            "Remember from Section 5.1 - statute imposes; contract can\'t remove. The L3 framing on commercial pressure: legal wins.",
            "Statutory duties cannot be contracted away. Personal duties on individuals don\'t bend to employer / customer pressure.",
            "Compliance cost small; breach cost cascades (3-5x fine alone for serious cases).",
            "Insurance doesn\'t cover criminal fines. The fine comes off the firm\'s bottom line.",
            "L3 supervisor toolkit: refuse, document, escalate, frame, protect.",
            "ERA 1996 s.44 + PIDA 1998 + HASAWA s.7 = legal protection for refusing unsafe / unlawful work.",
            "Customer / employer commercial leverage real but doesn\'t override statute.",
            "Compliance and long-term commercial reputation aligned. Cutting corners short-term thinking.",
          ]} />
          <Quiz title="Legal vs commercial - knowledge check" questions={quizQuestions} />
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section5-5')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">5.5 Risk assessment as supervisor</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section6')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next section <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">Section 6 - BSA 2022 + advanced incidents</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
