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
  { id: 6, question: 'How does the L3 supervisor frame the consequence to a customer?', options: ['Long lecture.', 'Brief and respectful: "I understand the pressure but the legal framework here is X. The consequences cascade if we cut corners. We\'re a regulated trade; we have to comply. We can do this safely with X / Y / Z; we can\'t do it the other way.&quot; Most customers accept the framing once explained calmly.', 'Aggressive.', 'Hide.'], correctAnswer: 1, explanation: 'Brief, calm, factual. Most customers respect the boundary once it\'s clearly stated.' },
  { id: 7, question: 'What\'s the relationship between legal compliance and commercial reputation?', options: ['Inverse.', 'Aligned - reputation for compliance and quality wins repeat business. The HSE Public Register prosecutions / notices are a competitive disadvantage. Firms with clean records win frameworks; firms with poor records lose them.', 'Random.', 'No relationship.'], correctAnswer: 1, explanation: 'Compliance and commercial success are aligned over time. Cutting corners is short-term thinking with long-term cost.' },
  { id: 8, question: 'L3 personal protection in legal-vs-commercial conflicts?', options: ['None.', 'ERA 1996 s.44 (no detriment for raising H&S concerns); PIDA 1998 (whistleblowing, qualifying disclosures including external regulator); HASAWA s.7 (personal duty so refusal is required); EAWR Reg 16 (competence-based refusal).', 'Customer service.', 'Random.'], correctAnswer: 1, explanation: 'Multiple legal protections for the L3 who refuses unsafe work. Use them.' },
];

const faqs = [
  { question: 'What if the firm pressures me to compromise?', answer: 'Refuse; document; escalate. ERA s.44 protects from detriment. PIDA 1998 protects external if internal fails.' },
  { question: 'What if losing a customer would cost the firm a major contract?', answer: 'Commercial decisions are the firm\'s; safety decisions are statutory. The L3 escalates the safety concern to the contracts manager / director who handles the commercial response.' },
  { question: 'Can a firm refuse to do work that is legally required (e.g. EICR remedial)?', answer: 'A firm can decline a contract; once contracted to deliver, they must deliver compliantly or break the contract (with consequences). Refusing legally-required remedial mid-contract is breach unless safety justifies.' },
  { question: 'How do I know when commercial pressure has tipped into asking me to do something illegal?', answer: 'When the proposed action breaches statute — HASAWA / EAWR / MHSWR / RIDDOR / CAR / WAH / etc. The L3 supervisor recognises the regulatory framework and identifies when actions cross the line.' },
  { question: 'Are there situations where commercial considerations legitimately influence safety decisions?', answer: 'Yes — within the legal framework. Choice of platform vs ladder, scope of testing, frequency of inspection — all involve commercial choices within ALARP. But absolute requirements (EAWR Reg 14 three-test, MHSWR Reg 3, etc) are not commercially negotiable.' },
  { question: 'What about the customer who insists on a non-compliant install (e.g. omitting RCD)?', answer: 'Refuse. BS 7671 may permit some choices but compliance with relevant safety standards is non-negotiable for the firm. Customer can refuse to engage you; they cannot direct an unsafe install.' },
  { question: 'Does the L3 supervisor have personal exposure if the firm proceeds with non-compliant work?', answer: 'Yes — HASAWA s.7 personal duty + s.36 cause-of-offence route. If the L3 supervises the non-compliant work, they share liability. ERA s.44 protection only operates where the L3 refuses; participation removes the protection.' },
  { question: 'How does the Sentencing Council guideline apply to individuals?', answer: 'Separate matrix from the corporate one. Culpability (very high / high / medium / low) x harm category (1 / 2 / 3 / minor risk) maps to starting points. High culpability x category 1 harm for individuals starts at custody. Aggravating factors include previous convictions, ignoring warnings, attempting to conceal.' },
  { question: 'Can the customer recover their commercial losses from the firm if the firm refuses?', answer: 'A firm that refuses to perform a contract breaches contract; the customer may have civil remedies. However, if the refusal is because performance would be illegal, the contract is unenforceable in that respect. The firm cannot be required by court order to perform an illegal act.' },
  { question: 'What happens to the firm\'s PI insurance after a prosecution?', answer: 'Premiums typically rise sharply; some insurers may decline renewal. Coverage going forward may require additional disclosures, exclusions or higher excesses. The HSE public register entry visible during placement.' },
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
            "Legal duty wins. Statutory duties cannot be contracted away. HASAWA s.7 / EAWR Reg 16 personal duties do not bend to commercial pressure.",
            "Compliance cost is small; breach cost cascades (fine + FFI + legal + civil + insurance + reputation + lost contracts). Insurance does not cover criminal fines.",
            "L3 supervisor toolkit: refuse + document + escalate + frame consequences. ERA s.44 + PIDA 1998 protect.",
            "Customer indemnity does not transfer criminal liability — only civil cost. The customer&apos;s signature is not a permission slip; statute applies regardless.",
            "Sentencing Council guideline produces six-figure fines for serious cases, and individual matrix includes custody at high culpability x category 1 harm.",
            "Compliance and long-term commercial reputation are aligned. HSE public register entries persist 5+ years and lock firms out of major frameworks.",
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

          <RegsCallout source="HASAWA 1974 - s.36(1)" clause={<>"Where the commission by any person of an offence under any of the relevant statutory provisions is due to the act or default of some other person, that other person shall be guilty of the offence, and a person may be charged with and convicted of the offence by virtue of this subsection whether or not proceedings are taken against the first-mentioned person."</>} meaning={<>s.36 - third party can be liable where their act or default caused another&apos;s breach. Means the customer who instructs a non-compliant install can be liable; the supplier who provides false information can be liable; the contractor who pressures the apprentice can be liable. Duties cascade across parties; commercial relationship doesn&apos;t insulate.</>} cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), s.36." />

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

          <RegsCallout source="Employment Rights Act 1996 — s.44(1)" clause={<>&quot;An employee has the right not to be subjected to any detriment by any act, or any deliberate failure to act, by his employer done on the ground that — ... (c) being an employee at a place where there was no such representative or safety committee, or where there was such a representative or safety committee but it was not reasonably practicable for the employee to raise the matter by those means, he brought to his employer&apos;s attention, by reasonable means, circumstances connected with his work which he reasonably believed were harmful or potentially harmful to health or safety...&quot;</>} meaning={<>The detriment protection. Subsection (c) covers the standard L3 case — raising a concern by reasonable means (verbal, written, escalation in writing). Subsection (d) covers leaving the workplace in serious and imminent danger; subsection (e) covers taking appropriate steps. Together they form the operative&apos;s safety-refusal toolkit.</>} cite="Source: Employment Rights Act 1996 (1996 c.18), s.44." />

          <RegsCallout source="Public Interest Disclosure Act 1998 — inserted into ERA 1996 as s.43A-L" clause={<>&quot;A &apos;qualifying disclosure&apos; means any disclosure of information which, in the reasonable belief of the worker making the disclosure, is made in the public interest and tends to show one or more of the following — (a) that a criminal offence has been committed... (b) that a person has failed to comply with any legal obligation... (d) that the health or safety of any individual has been, is being or is likely to be endangered...&quot;</>} meaning={<>The whistleblowing protection. &quot;Qualifying disclosure&quot; covers six categories including criminal offences, breach of legal obligation, danger to health or safety. Reasonable-belief standard — does not need to be proven true, just reasonably believed. Internal route normal first; external (to prescribed person such as HSE) protected after internal failure or in serious cases.</>} cite="Source: Public Interest Disclosure Act 1998, inserting Part IVA into Employment Rights Act 1996." />

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
          <ContentEyebrow>Insurance, indemnity and the limits of contractual transfer</ContentEyebrow>

          <ConceptBlock
            title="Why &apos;the customer has signed off the risk&apos; is rarely a defence"
            plainEnglish="Commercial pressure often arrives wrapped in apparent indemnity — the customer or principal contractor signs a document saying they accept the risk of a non-compliant install, the contractor proceeds, and assumes they&apos;ve transferred liability. Statutory criminal liability cannot be transferred by contract. HASAWA, EAWR, BS 7671 (under Building Regs Part P) all impose duties on the contractor that no signed waiver removes. The customer&apos;s indemnity may shift civil costs but not the criminal exposure, the personal s.7 conviction, or the scheme deregistration risk."
            onSite="The L3 supervisor faced with a &apos;sign here and we&apos;ll take the risk&apos; conversation needs to be clear: civil indemnity is between customer and firm; criminal liability stays with the contractor regardless. The customer&apos;s signature is not a permission slip; it&apos;s a piece of paper that doesn&apos;t cross the regulator&apos;s desk. Refusal remains the right answer; documenting the conversation and the customer&apos;s offered indemnity strengthens the firm&apos;s defence if the matter is later contested."
          >
            <p>What contracts can and cannot do:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>CAN allocate civil cost</strong> — who pays the claim, who pays
                the legal fees, who pays the remedial.
              </li>
              <li>
                <strong>CAN shift insurance burden</strong> — who carries PI / EL / PL
                cover for a given risk.
              </li>
              <li>
                <strong>CAN set commercial penalties</strong> — for delay, defects,
                non-performance.
              </li>
              <li>
                <strong>CANNOT remove statutory duty</strong> — HASAWA s.2/s.3, EAWR
                Reg 4/13/14/16, MHSWR Reg 3/5 etc all sit on the dutyholder
                regardless.
              </li>
              <li>
                <strong>CANNOT remove personal liability</strong> — s.7 (operative),
                s.36 (cause of another&apos;s offence), s.37 (director).
              </li>
              <li>
                <strong>CANNOT validate non-compliant work</strong> — Building Regs Part P
                non-compliance is not cured by customer consent.
              </li>
              <li>
                <strong>CANNOT cover criminal fines</strong> — insurance policies
                explicitly exclude criminal penalties.
              </li>
              <li>
                <strong>Customer&apos;s pressure can attract s.36 liability</strong> —
                where pressure caused another&apos;s offence.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Customer-side s.36 — when the customer is liable too</ContentEyebrow>

          <ConceptBlock
            title="When the customer&apos;s pressure exposes them to prosecution"
            plainEnglish="HASAWA s.36 allows prosecution of any person whose act or default caused another person&apos;s offence — including a customer whose pressure on a contractor caused the contractor to breach. The route is not theoretical. The HSE has used it against clients in CDM cases, against principal contractors who pressured subcontractors, against landlords who demanded non-compliant work. A customer who knowingly instructs a non-compliant install (e.g. omitting RCD protection in a special location) and whose pressure causes the contractor to comply may themselves be prosecuted under s.36 — regardless of whether they are a regulated trade themselves."
            onSite="L3 supervisor framing in conversations with customers who push for non-compliant work: the contract pressure they place on the firm has potential s.36 exposure for them personally as well as for the firm. The HSE has prosecuted clients in cases like this. The framing is sharper than &quot;we cannot do it&quot; because it puts the customer&apos;s own exposure on the table. Most customers, faced with personal regulatory exposure, recalibrate sharply. Some do not; those are the ones where the conversation moves swiftly to walking away from the contract entirely. The framing protects everyone — the firm, the apprentice, the contracts manager, the director, and the customer themselves whose pressure was building toward an s.36 exposure they may not have understood."
          >
            <p>Customer-side s.36 in practice:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>HASAWA s.36 reaches any person whose act or default caused another&apos;s offence.</li>
              <li>HSE has used the route against clients, principal contractors, landlords.</li>
              <li>Customer who knowingly instructs non-compliant install may be liable.</li>
              <li>Customer&apos;s commercial pressure that causes contractor breach may attract s.36.</li>
              <li>Personal exposure for the customer — not just the firm.</li>
              <li>Framing to customer: &quot;this exposes you too&quot; tends to recalibrate sharply.</li>
              <li>Where it does not, the conversation moves to walking away from the contract.</li>
              <li>Protects the firm, the supervisor, the director and the customer simultaneously.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Director s.37 framing — making the conversation land</ContentEyebrow>

          <ConceptBlock
            title="How to talk to a director about their personal exposure"
            plainEnglish="The conversation framing that lands with directors uses HASAWA s.37 plus the Sentencing Council individual matrix plus the public-register and procurement consequences. The framing depersonalises the operational issue and personalises the consequence. &quot;Director, the proposed action is high culpability under EAWR Reg 14. If anything goes wrong, the matrix produces a starting point of suspended custodial sentence for you personally under s.37. That goes on your record and on the public register for 5 years, affecting every framework we tender for. The fine for the firm is in the high six figures starting point. The insurance does not cover any of that. I cannot recommend proceeding.&quot; Most directors at this point recalibrate quickly — the personal exposure converts the conversation from operational to strategic."
            onSite="Standard L3 supervisor practice: have the framing prepared. Have the Sentencing Council outline available (a one-page summary in the firm&apos;s H&amp;S system is invaluable). Have the relevant regulation cited. Have the cascade items listed. Deliver the framing factually, not emotionally. Most directors are commercially intelligent and will respond to factual framing of their own exposure. A minority will not — those are the directors where escalation to other directors, or PIDA 1998 external disclosure, become necessary."
          >
            <p>Director conversation toolkit:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Cite the specific regulation breached by the proposed action.</li>
              <li>Cite s.37 personal liability route for directors.</li>
              <li>Cite Sentencing Council individual matrix starting point for the relevant cell.</li>
              <li>Cite public register entry consequence — 5+ years, procurement impact.</li>
              <li>Cite insurance exclusion for criminal fines.</li>
              <li>Calm, factual, depersonalised — &quot;the framework produces X consequence&quot;.</li>
              <li>Have a compliant alternative path to offer.</li>
              <li>Document the conversation contemporaneously.</li>
              <li>Most reasonable directors recalibrate; minority require further escalation or external disclosure.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Environmental Protection Act 1990 — the parallel statutory framework</ContentEyebrow>

          <ConceptBlock
            title="When commercial pressure crosses into environmental offence territory"
            plainEnglish="The Environmental Protection Act 1990 (EPA 1990) creates parallel statutory offences alongside H&amp;S — duty of care for waste (s.34), pollution offences, statutory nuisance. Electrical-trade-relevant scenarios: fly-tipping of WEEE waste (refrigeration removed without F-Gas certificate, contaminating soil with refrigerant), oil contamination from transformer / capacitor work, asbestos fragments mixed with construction waste, batteries disposed of inappropriately. Environment Agency (England), NRW (Wales), SEPA (Scotland), NIEA (NI) all have enforcement powers similar to HSE. Fines under EPA 1990 can be substantial; criminal liability runs in parallel with H&amp;S where the same incident has both dimensions."
            onSite="L3 supervisor framing: commercial pressure to &apos;just dispose of it&apos; or &apos;skip the WEEE certificate&apos; runs into EPA 1990 the same way live working runs into EAWR. The Environment Agency Public Register catalogues prosecutions parallel to the HSE Register, with the same procurement consequences. The L3 supervisor toolkit (refuse, document, escalate, frame, protect) works for environmental refusals as for H&amp;S refusals. The framework reach extends — the L3 supervisor&apos;s legal awareness is broader than HASAWA alone."
          >
            <p>EPA 1990 touchpoints in electrical work:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>s.34 duty of care for waste — must reach authorised disposal route with transfer notes.</li>
              <li>WEEE Regulations 2013 — separate duty for electrical equipment waste.</li>
              <li>F-Gas Regulations — refrigeration / heat pump refrigerant work requires certification.</li>
              <li>Hazardous Waste Regulations 2005 — additional controls for asbestos / batteries / oils.</li>
              <li>Environment Agency / NRW / SEPA / NIEA enforcement powers parallel to HSE.</li>
              <li>EA Public Register parallel to HSE Public Register.</li>
              <li>Criminal liability under EPA 1990 may run alongside HASAWA in the same incident.</li>
              <li>Same L3 supervisor toolkit applies — refuse, document, escalate, frame, protect.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>EAWR Reg 16 — competence as a personal duty</ContentEyebrow>

          <ConceptBlock
            title="Why a competence-based refusal is uniquely defensible"
            plainEnglish="EAWR 1989 Reg 16 requires that no person shall be engaged in any work activity where technical knowledge or experience is necessary to prevent danger or, where appropriate, injury, unless he possesses such knowledge or experience, or is under such degree of supervision as may be appropriate having regard to the nature of the work. The L3 supervisor refusing work on competence grounds — &quot;I do not have the competence to do this safely&quot; or &quot;my mate does not have the competence to do this without closer supervision than is available&quot; — is on uniquely defensible ground. Reg 16 is the operative&apos;s own statutory duty; complying with it cannot be construed as insubordination."
            onSite="Practical L3 reflex when pressed beyond capability: &quot;Reg 16 requires me to have the competence or supervision appropriate for this work. I do not have it for this task in these conditions. Therefore I cannot proceed.&quot; The framing is factually grounded in the operative&apos;s own legal duty. It does not require asserting that the firm is acting illegally — it requires asserting that the operative cannot lawfully comply. The framing protects the relationship while protecting the position."
          >
            <p>Reg 16 competence framework:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>EAWR Reg 16 — competence or appropriate supervision required for any work where technical knowledge / experience is needed to prevent danger.</li>
              <li>Personal duty — sits on the operative, not just the firm.</li>
              <li>&quot;Competence&quot; is qualifications + experience + current capability for the specific task.</li>
              <li>Supervision must be &quot;appropriate&quot; — proximity, knowledge, availability.</li>
              <li>The Reg 16 refusal is one the firm cannot legitimately overrule.</li>
              <li>Pairs with HASAWA s.7 personal duty for refusal of unsafe work.</li>
              <li>Pairs with ERA s.44 protection from detriment for raising the concern.</li>
              <li>Calm factual framing &quot;Reg 16 requires X; I do not have it; cannot proceed&quot;.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Worked example — the full consequence cascade</ContentEyebrow>

          <ConceptBlock
            title="One incident, one full cascade — what actually lands on the firm"
            plainEnglish="Worked example to make the cascade concrete. A medium-sized firm (turnover £25m) is prosecuted following a serious electric-shock injury to an apprentice who was instructed to work live on a 415V distribution board. The injury caused permanent reduction in grip strength to one hand. The firm pleads guilty after charging. Investigations conclude high culpability (deliberate breach of EAWR Reg 14; supervisor knew of three-test requirement and instructed bypass) and category 2 harm (permanent harm not life-threatening). Sentencing Council matrix gives starting point around £600k-£800k corporate fine. The supervisor is separately convicted under s.7 with starting point of high-level community order. The director is convicted under s.37 with starting point of suspended custodial sentence."
            onSite="The complete cascade itemised: corporate fine ~£600k (mitigated by guilty plea to ~£400k after credit); FFI invoice ~£15k for inspector and investigation time; legal defence costs (solicitor + barrister + expert witnesses) ~£150k even on a guilty plea; civil compensation to the apprentice ~£250k (paid by EL insurer subject to policy limit); insurance premium increases over 3 years ~£60k cumulative; NICEIC scheme investigation triggers re-assessment with ~£20k cost; one major public-sector framework excludes the firm at next renewal, losing ~£800k of expected annual revenue for 5 years; one major private client terminates ongoing contract, losing further revenue; the supervisor faces community order (200 hours unpaid work) plus the personal conviction on record; the director faces 12-month suspended custodial plus the personal conviction on record. Total quantifiable cost approaching £6m over 5 years from a single incident. The original commercial pressure that drove the live-working decision was reportedly a £40k contract value."
          >
            <p>Cascade itemised (illustrative example):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Corporate fine — Sentencing Council matrix starting point hundreds of thousands.</li>
              <li>Guilty-plea credit — typically one-third reduction if early.</li>
              <li>FFI invoice — typically four-to-five figures depending on investigation complexity.</li>
              <li>Legal defence costs — six figures even on guilty plea for serious cases.</li>
              <li>Civil compensation — varies widely by injury severity and loss; paid by insurer subject to limit.</li>
              <li>Insurance premium increases — typically 20-50% increase for 3+ years.</li>
              <li>Scheme investigation cost — re-assessment + remedial.</li>
              <li>Procurement exclusion — public-sector frameworks and major private clients.</li>
              <li>Customer contract terminations — direct revenue loss.</li>
              <li>Supervisor individual conviction — record, sentencing outcome.</li>
              <li>Director individual conviction — record, sentencing outcome (potential custody).</li>
              <li>Reputational tail — 5+ years from public register entry.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The compliance investment as commercial decision"
            plainEnglish="Framed against the cascade above, compliance investment is among the most cost-effective spend in the firm&apos;s budget. RAMS development, training, supervision, tooling, PPE, insurance, scheme registration — collectively typically 3-8% of revenue. Compared to the multi-million-pound consequence of one serious incident in the cascade, the compliance investment is a small fraction of the avoided cost. The L3 supervisor framing on commercial pressure is therefore not anti-commercial — it is the most commercial framing available. Investing in compliance is investing in the firm&apos;s long-term competitive position; cutting compliance corners is the most expensive short-term saving the firm can make."
            onSite="This framing is what makes the L3 supervisor&apos;s legal-vs-commercial conversation persuasive to senior management. Compliance is not a cost to minimise — it is an investment that returns avoided cascade plus framework eligibility plus insurance pricing advantage plus customer retention. Firms that internalise this are the ones with clean records and growing market share; firms that do not are the ones whose names appear on the public register and who struggle through procurement cycles. The L3 supervisor is on the commercial winning side when they hold the line on compliance."
          >
            <p>Compliance investment categories:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>RAMS development and review — internal time + external consultant where used.</li>
              <li>Operative training — initial competence, refresher, scheme-specific.</li>
              <li>Supervision time — supervisors&apos; salaried time spent on H&amp;S.</li>
              <li>Tooling and PPE — appropriate equipment, replacement cycle.</li>
              <li>Insurance — PL, EL, PI, Product Liability premiums.</li>
              <li>Scheme registration — NICEIC / NAPIT / ELECSA fees + assessment time.</li>
              <li>H&amp;S management system — manual development, audit, continuous improvement.</li>
              <li>Typically 3-8% of firm&apos;s revenue for compliant electrical contractors.</li>
              <li>Returns: framework eligibility, insurance pricing, customer retention, clean public register.</li>
              <li>Avoided cost: multi-million-pound cascade per serious incident.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Public-register and procurement consequences</ContentEyebrow>

          <ConceptBlock
            title="Why one conviction can lock a firm out of frameworks for years"
            plainEnglish="The HSE maintains a public register of prosecutions and enforcement notices accessible to anyone with internet access. Entries persist for at least 5 years. During procurement, major clients — public-sector frameworks, large private clients, insurance underwriters — routinely check the register. A prohibition notice can be enough to disqualify a firm from a framework opportunity. A prosecution conviction often is. The reputational and commercial impact of a public-register entry frequently exceeds the fine itself over time. The L3 supervisor framing on the cost cascade includes this longer-term tail, not just the immediate fine."
            onSite="Practical example: a £30k fine for an EAWR breach is significant but recoverable for a healthy firm. The 5-year public register entry that follows it routinely costs the firm framework opportunities worth multiples of that figure — major contractor frameworks have explicit disclosure requirements for any HSE entries in the last 5 years. A firm with a clean register is materially more competitive in procurement than one with even a single recent entry. The reputational consequence is what gives compliance its long-term commercial logic — short-term cost saving from corner-cutting is exponentially outweighed by lost procurement over the public-register tail."
          >
            <p>Procurement consequence pattern:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>HSE Public Register lists prosecutions, improvement notices, prohibition notices, Crown Censures.</li>
              <li>Entries persist 5+ years from date of entry.</li>
              <li>Visible to anyone with internet access — competitors, clients, insurers.</li>
              <li>Major public-sector frameworks require disclosure of HSE entries in pre-qualification questionnaires.</li>
              <li>Major private clients (Tier 1 contractors, large estates) routinely check the register before engaging.</li>
              <li>Insurance underwriters use register entries in pricing renewals.</li>
              <li>Scheme bodies may take parallel action — NICEIC / NAPIT investigations triggered by HSE outcome.</li>
              <li>Long-term reputational tail often exceeds fine value in commercial impact.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Scheme body action — NICEIC, NAPIT, ELECSA, Stroma"
            plainEnglish="Competent Person Schemes (NICEIC, NAPIT, ELECSA, Stroma etc) have their own enforcement powers separate from HSE. Major safety failings can trigger scheme suspension or de-registration. Loss of CPS registration means notifiable work under Approved Doc P cannot be self-certified — every job needs separate building control notification with fees, effectively ending the firm&apos;s competitive position in the domestic market. Scheme actions can run alongside HSE prosecution or independently — a complaint from a customer or another contractor can trigger a scheme investigation without HSE involvement at all."
            onSite="L3 supervisor framing in the consequence cascade conversation: HSE prosecution is one path; scheme action is another, often faster and equally damaging. Scheme suspension is often abrupt — within weeks of an investigation. Loss of CPS registration ends domestic-trade competitiveness immediately. The framing &quot;HSE prosecution + scheme action + insurance renewal + procurement loss&quot; gives a fuller picture than just &quot;HSE will fine us&quot;."
          >
            <p>Scheme body actions:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Technical investigation triggered by customer complaint, building control referral or media coverage.</li>
              <li>Re-assessment visit at firm&apos;s cost.</li>
              <li>Conditional registration with mandatory remedial works.</li>
              <li>Suspension from scheme — temporary loss of self-certification capability.</li>
              <li>De-registration — most serious action; effectively ends domestic trading.</li>
              <li>Loss of CPS registration ends self-certification under Approved Doc P.</li>
              <li>Insurance premiums often rise where scheme actions on record.</li>
              <li>Public-facing customer-search portals (Trustmark, scheme directories) reflect status.</li>
              <li>Faster than HSE — scheme action can resolve within weeks where HSE prosecution takes months to years.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Insurance — what is covered and what is not"
            plainEnglish="Insurance is part of the consequence-mitigation toolkit but its limits are often misunderstood. Public Liability (PL) covers civil claims by third parties for injury or property damage; Employer&apos;s Liability (EL) is statutory and covers civil claims by employees; Professional Indemnity (PI) covers civil claims arising from professional service failures; Product Liability covers civil claims from supplied products. None covers criminal fines — this is a settled principle of public policy. None covers FFI invoices (the regulator&apos;s cost recovery is treated as a regulatory rather than civil cost). None covers loss of contracts or reputation damage. Premium increases after claims are routine; some insurers may decline renewal entirely after serious prosecutions."
            onSite="The L3 supervisor consequence-framing should be honest about insurance: it cushions civil cost but does not protect against criminal cost, regulatory cost or reputational cost. The framing &quot;our insurance will cover it&quot; is incomplete — what it covers depends entirely on the nature of the cost, and the most consequential costs (fine, FFI, procurement loss) are uncovered. Senior management who understand this often shift quickly from commercial pressure to compliance support; those who do not should be coached patiently through the actual coverage map."
          >
            <p>Insurance coverage scope:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Public Liability (PL)</strong> — civil claims by third parties for injury / property damage.</li>
              <li><strong>Employer&apos;s Liability (EL)</strong> — statutory; civil claims by employees.</li>
              <li><strong>Professional Indemnity (PI)</strong> — civil claims for professional service failures.</li>
              <li><strong>Product Liability</strong> — civil claims from supplied products.</li>
              <li><strong>NOT covered</strong> — criminal fines (public policy).</li>
              <li><strong>NOT covered</strong> — FFI invoices (regulatory cost recovery).</li>
              <li><strong>NOT covered</strong> — loss of contracts, framework exclusion.</li>
              <li><strong>NOT covered</strong> — reputational damage, scheme deregistration.</li>
              <li>Premium increases routine after claims; some insurers decline renewal post-prosecution.</li>
              <li>Disclosure requirements at renewal — non-disclosure can void cover.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>The Sentencing Council guideline in detail</ContentEyebrow>

          <ConceptBlock
            title="Why the 2016 guideline transformed corporate penalties"
            plainEnglish="Before 2016 H&amp;S fines were often modest relative to turnover — a few tens of thousands for serious breaches in large firms. The Sentencing Council&apos;s Definitive Guideline for Health and Safety Offences, Corporate Manslaughter and Food Safety and Hygiene Offences (2016) restructured the approach. The court works through a structured matrix: identify culpability (very high / high / medium / low) and harm category (1 / 2 / 3 / minor risk), then locate the company in a turnover band (large &gt; £50m / medium £10-50m / small £2-10m / micro &lt; £2m), then apply a starting point with a range, then adjust for aggravating and mitigating factors. The result has been multi-million-pound fines for large companies in serious cases and proportionate but still significant fines lower down. Knowing the matrix exists changes the conversation."
            onSite="L3 supervisor framing on the cost cascade: the matrix predicts the band — a serious incident at a £20m turnover firm with high culpability and category 1 harm produces a starting point in the hundreds of thousands, not tens. That is before legal defence, FFI, civil compensation and the rest of the cascade. The framing matters because it makes the consequence specific, not abstract. Saying &quot;a fine could be a lot&quot; is unhelpful; saying &quot;this matrix produces a starting point around X for this culpability + harm + turnover&quot; is concrete."
          >
            <p>Sentencing Council matrix in outline:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Culpability — Very high</strong> — deliberate breach of, or flagrant disregard for, the law.</li>
              <li><strong>Culpability — High</strong> — actual foresight of, or wilful blindness to, risk; systemic failure to address known risks.</li>
              <li><strong>Culpability — Medium</strong> — failure to put in place recognised industry measures.</li>
              <li><strong>Culpability — Low</strong> — failure that fell only slightly short of the appropriate standard.</li>
              <li><strong>Harm category 1</strong> — life-threatening / fatal / permanent.</li>
              <li><strong>Harm category 2</strong> — physical or psychological harm not falling within category 1.</li>
              <li><strong>Harm category 3</strong> — minor / short-term harm.</li>
              <li><strong>Turnover bands</strong> — Large &gt; £50m, Medium £10-50m, Small £2-10m, Micro &lt; £2m.</li>
              <li><strong>Starting points</strong> — vary by cell; very large companies with high culpability and category 1 harm start in the millions.</li>
              <li><strong>Range adjustment</strong> — aggravating factors (previous convictions, deliberate concealment, vulnerable victims) push up; mitigating factors (prompt acceptance, cooperation, remediation) pull down.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Sentencing Council — Health and Safety Offences, Corporate Manslaughter and Food Safety and Hygiene Offences Definitive Guideline (2016)"
            clause={
              <>
                &quot;Step One — Determining the offence category. The court should
                determine the offence category using only the culpability and harm
                factors set out in the tables below. Where an offence does not fall
                squarely into a category, individual factors may require a degree
                of weighting before making an overall assessment and determining
                the appropriate offence category.&quot;
              </>
            }
            meaning={
              <>
                The matrix is structured but with judicial discretion. The court
                works through culpability and harm first, then locates the offender
                in a turnover band, then applies a starting point. The published
                guideline runs to over 30 pages with worked examples; the L3
                supervisor needs the outline understanding, not the detailed
                calculation. The point is that fines are no longer arbitrary — they
                are structured and predictable for given cells of the matrix.
              </>
            }
            cite="Source: Sentencing Council Definitive Guideline (effective from 1 February 2016)."
          />

          <ConceptBlock
            title="The individual sentencing matrix — when custody is the starting point"
            plainEnglish="The Sentencing Council guideline has a separate matrix for individuals. Culpability bands are the same (very high / high / medium / low). Harm categories follow the corporate scheme. The starting points and ranges differ — at the high-culpability x category 1 harm cell the starting point for individuals is immediate custody (around 18 months, range 1-2 years). At lower cells, fines, community orders, or suspended sentences apply. The matrix reaches directors and senior managers under HASAWA s.37, supervisors under s.7 in serious cases, and any individual prosecuted under s.36 (cause of another&apos;s offence)."
            onSite="L3 supervisor framing: at high culpability and serious harm, individual sentences include immediate custody. The framing &quot;the director might be sent down for this&quot; is not rhetoric — it is the published matrix. Knowing this changes the weight of director-level conversations about commercial pressure. The director under s.37 has skin in the game; framing the consequence cascade in terms of their personal exposure tends to focus the conversation productively."
          >
            <p>Individual matrix starting points:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Very high culpability x harm 1</strong> — starting point custody around 18 months; range 1-2 years.</li>
              <li><strong>High culpability x harm 1</strong> — starting point custody around 12 months; range 36 weeks to 2 years.</li>
              <li><strong>High culpability x harm 2</strong> — high-level community order or short custody.</li>
              <li><strong>Medium culpability x harm 2</strong> — medium community order or substantial fine.</li>
              <li><strong>Low culpability</strong> — typically band B-C fines.</li>
              <li>Aggravating factors push up — previous convictions, ignoring warnings, deliberate concealment, abuse of position.</li>
              <li>Mitigating factors pull down — early guilty plea, cooperation, genuine remorse, voluntary remediation.</li>
              <li>Routes to individual liability — HASAWA s.7 (operative), s.36 (cause of another&apos;s offence), s.37 (director).</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>The conversation framing that actually works</ContentEyebrow>

          <ConceptBlock
            title="How to deliver the refusal without losing the relationship"
            plainEnglish="A blunt refusal can damage a customer relationship unnecessarily. A well-framed refusal preserves the relationship while protecting the legal position. The technique is to lead with the regulatory framework (not personal preference), acknowledge the commercial pressure (do not pretend it does not exist), offer an alternative path (what we can do), and respect the customer&apos;s autonomy (they can choose another contractor if they prefer). Most reasonable customers, faced with a calmly-framed legal explanation, accept the constraint and adjust expectations. A minority will push back regardless; those are the situations where escalation and ERA s.44 protection matter."
            onSite="Practical script outline. (1) &quot;I hear that the timeline / cost / spec pressure is real, and I want to help where I can.&quot; (2) &quot;The constraint here is X regulation / standard — it is not negotiable for me as the contractor.&quot; (3) &quot;What we can do is Y / Z within that framework — let me walk you through it.&quot; (4) &quot;If you would prefer a different approach, I understand and can recommend you talk to my contracts manager about whether the firm can accommodate.&quot; The tone is calm and respectful. The legal framing is firm. The alternative path keeps the conversation constructive."
          >
            <p>Framing technique elements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Lead with regulatory framework — depersonalises the refusal.</li>
              <li>Acknowledge the commercial pressure — do not pretend it is not real.</li>
              <li>Offer an alternative compliant path — what we can do.</li>
              <li>Respect the customer&apos;s autonomy — they can choose to go elsewhere.</li>
              <li>Stay calm and respectful — the relationship is worth preserving where possible.</li>
              <li>Document the conversation contemporaneously — text / email same day.</li>
              <li>Escalate to contracts manager if pressure persists.</li>
              <li>Most reasonable customers accept the framing; the minority that do not are exactly where protections matter.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="When to escalate to the firm&apos;s director — the threshold"
            plainEnglish="Not every commercial pressure scenario needs director-level escalation. Most resolve at supervisor or contracts-manager level. Director escalation is appropriate where: the contracts manager is the source of the pressure (no peer to escalate to); the pressure crosses into clearly-illegal territory (live working without three-test, unisolated work in a hazardous environment, omitting safety-critical components); the customer is threatening regulatory complaint or litigation; or the supervisor has been repeatedly overruled on safety judgements. Director escalation is not a nuclear option — it is the correct response when the supervisor / contracts manager loop cannot resolve."
            onSite="The L3 supervisor reflex: try resolution at supervisor or contracts manager level first. If that fails, or if the issue is grave enough that lower-level resolution is inadequate, escalate to director with a brief factual summary in writing. Include: what was asked, what the regulatory framework requires, what has been tried, what the consequence cascade is, what action is requested. Directors typically respond constructively to factual escalation; they are the s.37 dutyholder and have personal interest in not being on the wrong side of an HSE prosecution."
          >
            <p>Escalation thresholds:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Standard issue → resolve at supervisor or contracts manager level.</li>
              <li>Contracts manager is source of pressure → escalate to QS / H&amp;S manager / director.</li>
              <li>Clearly illegal proposed action → escalate to director.</li>
              <li>Repeated overruling of supervisor on safety judgements → escalate to director.</li>
              <li>Customer threatening regulatory complaint / litigation → director / legal team.</li>
              <li>Brief factual escalation in writing — what was asked, framework, consequence cascade, action requested.</li>
              <li>Director is s.37 dutyholder — has personal interest in correct outcome.</li>
              <li>Most directors respond constructively to factual escalation.</li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="Contracts manager pressures L3 to ignore safe-isolation"
            situation={
              <>
                Your contracts manager calls late afternoon: a high-value commercial
                client is demanding the work continue overnight without scheduled
                isolation because their production line cannot afford the downtime.
                The work is on a 415V three-phase distribution board feeding the
                production circuits. The contracts manager says: &quot;just work
                around it, use rubber gloves, we cannot afford to lose this
                customer.&quot; Your L2 mate is on site with you.
              </>
            }
            whatToDo={
              <>
                Refuse — calmly, factually, in the language of the regulation.
                &quot;Live working on three-phase distribution is governed by EAWR
                Reg 14 — it requires the three-test: not reasonable to dead-work,
                properly-judged risk, suitable precautions. The customer&apos;s
                commercial preference does not satisfy any of the three. We cannot
                work live on this kit.&quot; Document immediately — text the
                contracts manager confirming the conversation; email a brief
                summary with the EAWR Reg 14 reference. Escalate — if the contracts
                manager pushes back, ask whether the firm&apos;s QS or director is
                available; brief them factually. Frame the consequence cascade —
                EAWR Reg 14 breach + HASAWA s.2 + s.3 + s.7 personal exposure +
                s.37 director personal exposure + Sentencing Council matrix +
                insurance exclusion of criminal fines + HSE public register entry +
                scheme implications. Most directors at this point accept the
                constraint and call the customer to renegotiate the window.
                Protect — ERA s.44 covers your refusal; PIDA 1998 covers external
                escalation to HSE if internal route fails. Brief your L2 mate
                clearly that you are stopping; do not leave them in ambiguity.
              </>
            }
            whyItMatters={
              <>
                This scenario is one of the most common legal-vs-commercial
                conflicts in the trade. The customer&apos;s commercial preference,
                the contracts manager&apos;s commercial response, and the
                supervisor&apos;s legal duty all collide in a single late-afternoon
                phone call. The L3 supervisor&apos;s toolkit — refuse + document +
                escalate + frame + protect — gives a structured response that
                protects the team, the firm and the operative personally. The
                discipline matters because cases exactly like this have produced
                prosecutions, custody for directors, and firm closures. Calm
                factual refusal at the supervisor level prevents all of that.
              </>
            }
          />

          <SectionRule />
          <ContentEyebrow>Corporate Manslaughter — the parallel route</ContentEyebrow>

          <ConceptBlock
            title="When commercial pressure crosses into manslaughter territory"
            plainEnglish="The Corporate Manslaughter and Corporate Homicide Act 2007 (CMCHA) creates a separate offence — corporate manslaughter — triggered where an organisation&apos;s activities cause death, those activities amount to a gross breach of a relevant duty of care, and the way those activities were managed or organised by senior management was a substantial element in the breach. Triable on indictment only; unlimited fines; publicity orders requiring publication of the conviction; remedial orders if appropriate. The Act fixed the pre-2007 &apos;identification doctrine&apos; problem that had made it almost impossible to prosecute large companies for manslaughter — convictions now do not require identification of a single directing mind."
            onSite="Why this matters in the legal-vs-commercial conversation: when senior management routinely places commercial considerations above safety and a fatality follows, CMCHA reaches the firm directly. The investigation looks at senior management&apos;s management and organisation of activities — RAMS quality, training records, response to past near-misses, response to operative concerns. The supervisor&apos;s contemporaneous documentation of pressure conversations becomes precisely the &apos;senior management failure&apos; evidence the prosecution looks for. The L3 supervisor refusing pressure and documenting the refusal is not just protecting themselves — they are protecting the firm against the CMCHA route too."
          >
            <p>CMCHA triggers in practice:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Organisation&apos;s activities cause a person&apos;s death.</li>
              <li>Activities amount to gross breach of relevant duty of care.</li>
              <li>Senior management&apos;s management or organisation was substantial element in breach.</li>
              <li>Triable on indictment only — Crown Court, jury trial.</li>
              <li>Unlimited fines (Sentencing Council guideline produces multi-million fines for serious cases).</li>
              <li>Publicity order — conviction must be publicised.</li>
              <li>Remedial order — court can require specific remedial action.</li>
              <li>Sits alongside HASAWA charges — most fatal cases run both.</li>
              <li>Pre-2007 &apos;identification doctrine&apos; problem fixed — large companies now prosecutable.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Corporate Manslaughter and Corporate Homicide Act 2007 — s.1(1)"
            clause={
              <>
                &quot;An organisation to which this section applies is guilty of an
                offence if the way in which its activities are managed or organised
                — (a) causes a person&apos;s death, and (b) amounts to a gross
                breach of a relevant duty of care owed by the organisation to the
                deceased.&quot;
              </>
            }
            meaning={
              <>
                The CMCHA offence. &quot;Managed or organised&quot; is the route
                that fixes the old identification-doctrine problem — the
                prosecution does not have to find a single directing mind. Senior
                management failure to manage or organise is the gravamen.
                &quot;Gross breach&quot; is a high bar — conduct falling far below
                what could reasonably be expected. The Sentencing Council
                guideline produces fines in the millions for serious cases.
              </>
            }
            cite="Source: Corporate Manslaughter and Corporate Homicide Act 2007 (2007 c.19), s.1."
          />

          <SectionRule />
          <ContentEyebrow>Civil liability — the parallel claim path</ContentEyebrow>

          <ConceptBlock
            title="Why a single incident produces multiple parallel proceedings"
            plainEnglish="An incident producing injury or death typically produces several parallel legal processes — criminal (HSE prosecution under HASAWA / specific regs, potentially CMCHA), civil (negligence claim by injured party or family), regulatory (scheme body investigation), coronial (where death occurred), insurance (PI / EL / PL claim), employment tribunal (where the L3 was disciplined for refusing). Each runs on its own timescale with its own evidence requirements and its own outcomes. The L3 supervisor&apos;s contemporaneous documentation is evidence in all of them — same notebook, same emails, same RAMS, used in different forums."
            onSite="Practical L3 implication: write everything as if it will be read by a Crown Court jury, a civil judge, a coroner, an insurance loss adjuster, an employment tribunal and an HSE inspector — because in serious cases it may be. Factual, contemporaneous, signed and dated. Avoid speculation or opinion in operational records. Stick to observation and decisions made. Strategic / legal commentary belongs in privileged channels handled by the firm&apos;s solicitor; operational records are the supervisor&apos;s territory."
          >
            <p>Parallel processes after a serious incident:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>HSE criminal prosecution</strong> — HASAWA / EAWR / specific regs; magistrates&apos; or Crown Court.</li>
              <li><strong>Corporate Manslaughter (CMCHA 2007)</strong> — where death occurred and senior management failure substantial.</li>
              <li><strong>Civil negligence claim</strong> — by injured party or family; PI / EL / PL insurance involvement.</li>
              <li><strong>Defective Premises Act claim</strong> — residential work; up to 30 years retrospective.</li>
              <li><strong>Coroner&apos;s inquest</strong> — where death occurred.</li>
              <li><strong>Scheme body investigation</strong> — NICEIC / NAPIT / ELECSA / Stroma.</li>
              <li><strong>Employment tribunal</strong> — ERA s.44 / PIDA 1998 claims by operatives.</li>
              <li><strong>Building Safety Regulator</strong> — where HRRB involvement.</li>
              <li><strong>Insurance investigation</strong> — separate from regulatory and civil.</li>
              <li><strong>Police investigation</strong> — where criminal conduct beyond H&amp;S suspected.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <FAQ items={faqs} />
          <SectionRule />
          <KeyTakeaways points={[
            "Remember from Section 5.1 — statute imposes; contract cannot remove. The L3 framing on commercial pressure: legal wins.",
            "Statutory duties cannot be contracted away. Personal duties on individuals do not bend to employer / customer pressure.",
            "Compliance cost small; breach cost cascades (3-5x fine alone for serious cases).",
            "Insurance does not cover criminal fines. The fine comes off the firm&apos;s bottom line.",
            "L3 supervisor toolkit: refuse, document, escalate, frame, protect.",
            "ERA 1996 s.44 + PIDA 1998 + HASAWA s.7 = legal protection for refusing unsafe / unlawful work.",
            "Customer / employer commercial leverage real but does not override statute.",
            "Compliance and long-term commercial reputation aligned. Cutting corners short-term thinking.",
            "Customer indemnity may shift civil cost but never criminal liability. The signature is not a permission slip.",
            "Conversation framing: lead with regulation, acknowledge pressure, offer compliant alternative, respect autonomy.",
            "Director escalation appropriate where contracts manager is source of pressure or illegality is clear.",
            "CMCHA 2007 reaches firms for fatal cases where senior management failure is substantial — supervisor documentation is evidence.",
            "Parallel processes after a serious incident — criminal, civil, scheme, coronial, BSR, insurance, employment — all draw on the same contemporaneous records.",
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
