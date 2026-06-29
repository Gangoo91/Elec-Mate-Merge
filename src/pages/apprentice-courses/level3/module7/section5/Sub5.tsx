/**
 * Module 7 · Section 5 · Subsection 5 — Legal requirements for electrical contractors
 * Maps to C&G 2365-03 / Unit 308 / LO3 / AC 3.x
 *   AC — "Identify legal and contractual requirements for electrical contractors".
 *
 * Consumer Rights Act 2015 (services), Consumer Contracts Regulations
 * cooling-off period, written contracts and terms and conditions, retention
 * of title, CDM 2015 duties, UK GDPR / Data Protection Act 2018, ICO
 * registration, vicarious liability for employees, refusing unsafe or
 * non-compliant work, data breach reporting.
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

const TITLE = 'Legal requirements for electrical contractors | Level 3 Module 7.5.5 | Elec-Mate';
const DESCRIPTION =
  "Consumer Rights Act 2015, cooling-off period, written contracts, CDM 2015, UK GDPR / DPA 2018, ICO registration, vicarious liability and refusing unsafe work for electrical contractors.";

const checks = [
  {
    id: 'mod7-s5-sub5-cra',
    question: 'Under the Consumer Rights Act 2015, what is the standard required for services?',
    options: [
      "Performed to the absolute highest standard achievable in the industry, regardless of the agreed price — the Act requires perfection, and any defect however minor entitles the consumer to a full refund.",
      "Performed strictly to the written contract only — if a fault is not specifically listed in the contract, the consumer has no remedy under the Act, so a detailed written scope removes all liability.",
      "Performed with reasonable care and skill (s.49); within a reasonable time if no time is agreed (s.52); for a reasonable price if no price is agreed (s.51); statements made by the trader about the service that the consumer relied on become binding contract terms (s.50).",
      "Performed only by an electrician personally named on the contract — the Act prohibits the work being delegated to an employee or apprentice, and any substitution voids the consumer's rights.",
    ],
    correctIndex: 2,
    explanation:
      "CRA 2015 ss.49-52 set the statutory baseline for consumer service contracts: reasonable care and skill (s.49); reasonable time (s.52); reasonable price (s.51); pre-contractual statements relied on by the consumer (s.50). These are mandatory — can't be excluded by contract terms. Remedies for breach include re-performance, price reduction or refund.",
  },
  {
    id: 'mod7-s5-sub5-cooling-off',
    question: "What is the 'cooling-off' period for contracts signed in a consumer's home?",
    options: [
      "7 calendar days from the day the work is completed — under the Consumer Rights Act 2015, the consumer has a week after the job finishes to cancel and reclaim payment for any reason.",
      "14 calendar days from the day after the contract is concluded — under the Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013 for contracts concluded away from business premises (in the consumer's home, by phone, online).",
      "28 calendar days from the date of the quotation — the consumer has a month to cancel a quote signed in their home, after which the contract becomes binding.",
      "There is no cooling-off period for contracts signed in the home — because the consumer invited the trader in, they are bound from the moment they accept the quote and can only cancel with the trader's agreement.",
    ],
    correctIndex: 1,
    explanation:
      "The Consumer Contracts Regulations 2013 implement the EU Consumer Rights Directive (retained in UK law). For 'off-premises' contracts (including the consumer's home) and 'distance' contracts (online, phone), the consumer has 14 days to cancel without reason. Special rules apply if work starts within the cooling-off period at the consumer's express request — they can still cancel but may owe for work done. Know the rules; provide the required cancellation form and information at quote stage.",
  },
  {
    id: 'mod7-s5-sub5-gdpr',
    question: 'What does UK GDPR / DPA 2018 require for customer personal data?',
    options: [
      "Encrypt all customer records and store them on a server physically located within the UK — UK GDPR makes on-shore encrypted storage the single mandatory requirement, and nothing else is needed once that is in place.",
      "Obtain written, signed consent from every customer before holding any of their details — consent is the only lawful basis available to a small trader, so a job cannot proceed until the consent form is signed.",
      "Delete all customer data immediately on completion of each job — UK GDPR prohibits keeping any personal data once the work is finished, so records must be wiped the moment the invoice is paid.",
      "Process it lawfully, fairly and transparently; collect only what's needed for the specified purpose; keep it accurate; retain only as long as needed; keep it secure; provide a privacy notice; respond to data-subject rights requests; report serious breaches to ICO within 72 hours.",
    ],
    correctIndex: 3,
    explanation:
      "UK GDPR and DPA 2018 apply to every business processing personal data — including the smallest sole trader. The six data-processing principles (lawfulness, purpose limitation, data minimisation, accuracy, storage limitation, integrity and confidentiality) apply. Plus: data-subject rights (access, rectification, erasure, restriction, portability, objection); privacy notice requirement; mandatory ICO registration for most; 72-hour breach notification to ICO for serious breaches.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which legislation protects consumers when buying services from tradespeople?',
    options: [
      "The Health and Safety at Work etc. Act 1974 — it places the duty on tradespeople to protect their customers, and a customer unhappy with the work claims under this Act.",
      "The Consumer Rights Act 2015 — implies statutory terms into consumer service contracts (reasonable care and skill, reasonable time, reasonable price). Replaced the Supply of Goods and Services Act 1982 for consumer contracts.",
      "The Electricity at Work Regulations 1989 — it governs the standard of all electrical work and gives the customer the right to a refund if the installation is not to BS 7671.",
      "Part P of the Building Regulations — it is the consumer-protection statute for trade work and entitles a homeowner to compensation if notifiable work is not certified.",
    ],
    correctAnswer: 1,
    explanation:
      "The Consumer Rights Act 2015 is the consumer-protection statute for trader-to-consumer service contracts. It consolidated and updated earlier legislation. Key sections for service contracts: ss.49-52. Unfair contract terms framework: ss.61-76. The Sale of Goods Act 1979 still applies to goods sales between businesses; CRA 2015 governs consumer transactions for goods, services and digital content.",
  },
  {
    id: 2,
    question: "What does the 'limitation period' mean for contractual claims?",
    options: [
      "The period during which a customer must pay an invoice before late-payment interest can be charged — typically 30 days for commercial work under the Late Payment Act 1998.",
      "The maximum length of time a quotation remains valid before the price must be re-confirmed — usually stated as 30 days on the quotation itself.",
      "The time limit set by the Limitation Act 1980 for bringing legal action — 6 years from breach for simple contracts; 12 years for contracts under deed; 3 years for personal injury claims from the date of injury or knowledge.",
      "The length of time an electrician must keep a customer's personal data before deleting it under UK GDPR — generally six years for tax purposes.",
    ],
    correctAnswer: 2,
    explanation:
      "Limitation Act 1980 sets the time limits for legal action. Simple contracts (ordinary quotations and agreements): 6 years. Deeds: 12 years. Personal injury: 3 years from injury or date of knowledge. Defective premises (Defective Premises Act 1972): 6 years for original claims; the Building Safety Act 2022 extended retrospective limitation to 30 years for certain building safety claims relating to dwellings — significant for property-related electrical work. Keep records at least 6 years; longer for safety-critical work.",
  },
  {
    id: 3,
    question: 'What should happen if a customer claims your work is defective?',
    options: [
      "Refer the customer straight to your insurer and take no further part — once a defect is alleged it becomes an insurance matter, and engaging with the customer yourself only weakens your position.",
      "Refuse to return unless the customer pays a fresh call-out charge — your contractual obligation ended when the job was signed off, so any further visit is chargeable new work.",
      "Wait for the customer to take you to court before responding — there is no obligation to act on a complaint until a formal legal claim is served, and reacting early only invites more complaints.",
      "Investigate the complaint fairly. Under CRA 2015 s.49 (reasonable care and skill), if the work is defective the consumer is entitled to remedies — re-performance, or price reduction / partial refund if re-performance isn't possible or proportionate. Address the issue promptly; don't make it adversarial unless the claim is obviously baseless.",
    ],
    correctAnswer: 3,
    explanation:
      "CRA 2015 gives consumers statutory remedies for defective services. Practical approach: take the complaint seriously; visit and assess if appropriate; if your work is defective, put it right at your own cost (and update your processes to prevent recurrence). If the claim is mistaken or beyond your scope, explain politely and respectfully. Most complaints can be resolved without escalation — the ones that escalate often had poor early handling.",
  },
  {
    id: 4,
    question: 'What is a retention of title clause?',
    options: [
      "A contractual provision that materials you supply remain your property until you have been paid in full. Protects you if a customer doesn't pay — you have legal grounds to reclaim unpaid materials, subject to the practicalities (the goods being identifiable and recoverable).",
      "A clause that transfers ownership of the completed installation to the customer the moment work starts, so the customer is liable for any damage to the work before it is finished.",
      "A clause stating that the title deeds of the property must be checked before any work begins, to confirm the customer actually owns the building they are asking you to wire.",
      "A clause that retains the contractor's right to be credited as the installer on any future certificate or sale particulars for the property, protecting their professional reputation.",
    ],
    correctAnswer: 0,
    explanation:
      "Retention of title (often called 'Romalpa clause' after the leading case) is a standard contractual protection. The materials supplied remain the supplier's property until full payment is made. Practical limitations: hard to recover materials once incorporated into a building (fixtures); easier on movable items. Still worth including in T&Cs as it gives you a stronger negotiating position in payment disputes. Note the clause has limited effect against insolvent customers — proper credit control beats retention of title.",
  },
  {
    id: 5,
    question: 'What does the Construction (Design and Management) Regulations 2015 (CDM) apply to?',
    options: [
      "Only large commercial construction projects with more than 20 workers — small domestic jobs and single-contractor work are entirely outside the scope of CDM 2015.",
      "All construction work in Great Britain, with proportionate duties based on project type and size. Notifiable projects (more than 30 working days with 20+ workers simultaneously, or exceeding 500 person-days) trigger additional duties including HSE notification (F10) and the appointment of Principal Designer and Principal Contractor for multi-contractor projects.",
      "Only new-build construction — refurbishment, maintenance, alteration and repair work fall under separate regulations and are not covered by CDM 2015.",
      "Only the design stage of a project — CDM 2015 governs how a building is designed but places no duties on the contractors who actually carry out the construction work.",
    ],
    correctAnswer: 1,
    explanation:
      "CDM 2015 applies to all construction work — including domestic work, though the duties differ between commercial and domestic clients. Notifiable threshold: projects >30 working days with 20+ workers at any time, or >500 person-days. Notifiable projects need an F10 notification to HSE plus formal Principal Designer / Principal Contractor appointments. Duty-holders: Client, Principal Designer, Principal Contractor, Designer, Contractor, Worker. Even small electrical contractors are Contractor duty-holders under CDM.",
  },
  {
    id: 6,
    question: "When must you register with the Information Commissioner's Office (ICO)?",
    options: [
      "Only once your turnover crosses the VAT threshold — ICO registration is tied to VAT registration, so a sole trader below the threshold has no data-protection obligations.",
      "Only if you employ ten or more staff — ICO registration applies to medium and large organisations, and a sole trader or small firm is exempt regardless of the data they hold.",
      "If you process personal data for business purposes — almost every business does (customer names, addresses, phone numbers, photos). Small businesses (turnover < £632k AND fewer than 11 staff) pay the Tier 1 annual fee of £40 under the Data Protection (Charges and Information) Regulations 2018.",
      "Only if you store customer data on a computer — paper records of names and addresses are outside the scope, so a firm working entirely on paper job sheets need not register.",
    ],
    correctAnswer: 2,
    explanation:
      "ICO registration is mandatory for most businesses that process personal data. Small contractors are almost always processing personal data (customer details). Tier 1 fee £40/year for small businesses; Tier 2 £60; Tier 3 £2,900 for large organisations. Apply at ico.org.uk. Failure to register attracts ICO enforcement up to £4,350. Widely missed by small contractors — don't be one of them.",
  },
  {
    id: 7,
    question: "What is 'vicarious liability'?",
    options: [
      "An employee's personal legal liability for their own mistakes, which the employer cannot be drawn into — the worker alone answers for any harm they cause at work.",
      "The liability a customer takes on for the safety of a contractor working in their home, making the homeowner responsible for any injury the electrician suffers on the job.",
      "The shared liability between two trades working on the same site, where each is responsible for half of any damage caused regardless of who actually caused it.",
      "An employer's legal liability for wrongful acts committed by employees in the course of their employment. Distinct from personal liability of the employee. This is why Employers' Liability insurance is compulsory and why proper training, supervision and safe systems of work matter.",
    ],
    correctAnswer: 3,
    explanation:
      "Vicarious liability is the common-law principle that an employer is liable for wrongful acts of employees committed in the course of their employment. The employee is also personally liable but the claimant typically pursues the employer (who has the insurance and the assets). This is why Employers' Liability insurance is compulsory; why employee training and supervision matter; and why proper safe systems of work documented through RAMS and CDM frameworks protect the employer.",
  },
  {
    id: 8,
    question: 'Under what circumstances can / should you refuse to do work a customer requests?',
    options: [
      "When the work would breach regulations (BS 7671, Building Regulations Part P, planning permission); be unsafe (EWR Reg 16 competence; HASAWA general duty); or be illegal (Bribery Act, tax evasion, etc.). You can and must decline regardless of customer pressure or commercial incentive.",
      "Only when the customer refuses to pay a deposit up front — payment terms are the sole legitimate reason to turn down a job, and any work must otherwise be carried out as requested.",
      "Only when you are too busy to fit the job into your schedule — you must accept any work you have the capacity for, however it is to be carried out, because refusing compliant-looking work risks a discrimination claim.",
      "Never — a contractor must carry out whatever the paying customer asks, since the customer's wishes take priority and refusing work could be treated as breach of contract.",
    ],
    correctAnswer: 0,
    explanation:
      "You can and should refuse work that would breach the regs, be unsafe, or be illegal. The customer's preference doesn't override your statutory duties under EWR 1989, HASAWA 1974, BS 7671 (as implemented through Part P) or other relevant law. Explain politely; offer compliant alternatives where possible; walk away if necessary. 'The customer asked me to' is not a defence in any prosecution; conversely, doing the right thing protects your scheme registration, insurance, and personal liability position.",
  },
];

const faqs = [
  {
    question: 'Do I need written contracts for domestic work?',
    answer:
      "Verbal contracts are legally valid but written contracts are strongly recommended. Written terms provide clarity for both parties, evidence in any dispute, and demonstrate professionalism. At minimum, your quotation should reference your standard terms and conditions; once accepted, that forms the contract. For larger jobs (£3,000+), a separate signed contract document or detailed signed quotation with explicit T&Cs is sensible. Cooling-off period applies to off-premises consumer contracts under the 2013 Regulations — provide the required cancellation form and information.",
  },
  {
    question: "What happens if a customer won't pay?",
    answer:
      "Step 1: chase politely — phone, email, statement. Step 2: send a formal 'letter before action' giving 14 days to pay before escalation. Step 3: pursue through Money Claim Online (small claims) for sums under £10,000 — court fee £35-410 depending on value; you can recover the fee if you win. Step 4: enforcement if judgment unpaid — bailiffs, attachment of earnings, charging order on property. You cannot disconnect work you've done or remove installed materials without going through legal process — self-help can be unlawful interference with the customer's property.",
  },
  {
    question: 'Can I limit my liability in contracts?',
    answer:
      "Yes within limits. The Unfair Contract Terms Act 1977 and Consumer Rights Act 2015 restrict liability exclusions. You can't exclude liability for death or personal injury caused by negligence (UCTA s.2). Other limitations must be reasonable. Consumer contracts have additional restrictions — unfair terms are unenforceable. Practical liability caps in commercial T&Cs (e.g. capping liability at the contract value or insurance level) are usually fine if reasonable and clearly drafted. Get a solicitor to review your T&Cs once you're trading at scale.",
  },
  {
    question: 'What employment law applies if I take on staff?',
    answer:
      "Significant: employment contract (statement of particulars within 2 months under the Employment Rights Act 1996); minimum wage (currently various rates by age and apprenticeship status); paid holiday (5.6 weeks/year minimum under the Working Time Regulations 1998); workplace pension (auto-enrolment under the Pensions Act 2008); Employers' Liability insurance (Compulsory Insurance Act 1969); health and safety duties (HASAWA 1974); anti-discrimination (Equality Act 2010); statutory sick pay; PAYE registration with HMRC. Get HR advice when first employing — the framework is meaningful and the penalties for getting it wrong are real.",
  },
  {
    question: 'Do I need to register for data protection?',
    answer:
      "Most businesses processing personal data must register with the ICO under the Data Protection (Charges and Information) Regulations 2018. Sole traders processing customer details fall under Tier 1 (£40/yr) in almost all cases. Beyond paying the fee, UK GDPR / DPA 2018 require: a privacy notice; lawful basis for processing; data-subject rights handling; data security; 72-hour breach notification to ICO for serious breaches. Templates available from ICO for small businesses.",
  },
  {
    question: 'What should I do if a customer threatens legal action?',
    answer:
      "Take it seriously. Don't panic, don't react angrily. Review the facts objectively — was the work done properly? If you're at fault, acknowledge it and offer to put it right; this resolves most disputes without litigation. If you genuinely don't think you're at fault, document your position, gather evidence (photos, certificates, communications), and consider mediation before court. Notify your insurer if the claim might be covered. Get a solicitor's view if the sum is meaningful (over £5,000) or the issue is complex.",
  },
  {
    question: 'What records must I keep and for how long?',
    answer:
      "HMRC records (income, expenses, receipts): at least 5 years after the 31 January filing deadline for sole traders; 6 years for limited companies under the Companies Act 2006. Electrical certificates (EIC, EICR, Minor Works): minimum 5 years; many keep indefinitely on cloud storage. CDM-related records (RAMS, accident logs): keep for the project duration plus relevant limitation periods. Personal data: only as long as needed for the purpose (UK GDPR storage limitation). Building Safety Act 2022 limitation extension for dwellings: implications for property-related work — keep certificate evidence indefinitely where practical.",
  },
  {
    question: 'What is the Building Safety Act 2022 and does it affect me?',
    answer:
      "The Building Safety Act 2022 was a major response to the Grenfell Tower disaster. Most relevantly for electrical contractors: it extended retrospective limitation under the Defective Premises Act 1972 to 30 years for dwellings (forward limitation 15 years); created the Building Safety Regulator (BSR) with oversight of higher-risk buildings (HRBs — generally residential buildings 18m / 7 storeys+); introduced enhanced duty-holder obligations for HRBs. For most domestic electrical contractors the day-to-day impact is the extended limitation — keep electrical certificate records indefinitely where practical because claims can now be brought decades after the original work.",
  },
];

export default function Sub5() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module7-section5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 5
          </button>

          <PageHero
            eyebrow="Module 7 · Section 5 · Subsection 5"
            title="Legal requirements for electrical contractors"
            description="Consumer Rights Act 2015, cooling-off period, written contracts, CDM 2015, UK GDPR / DPA 2018, ICO registration, vicarious liability and refusing unsafe work."
            tone="blue"
          />

          <TLDR
            points={[
              "Consumer Rights Act 2015 ss.49-52 sets statutory baseline for consumer service contracts: reasonable care and skill, reasonable time, reasonable price; pre-contractual statements become binding.",
              "Consumer Contracts Regulations 2013: 14-day cooling-off period for off-premises and distance contracts; provide the required cancellation form and information at quote stage.",
              "Written contracts (or quotations referencing T&Cs) protect both parties — clear scope, exclusions, payment terms, dispute resolution.",
              "CDM 2015 applies to all construction work; small contractors are 'Contractor' duty-holders with proportionate duties.",
              "UK GDPR / DPA 2018 + ICO registration apply to almost every business; £40/yr small-business tier; 72-hour breach notification for serious breaches.",
              "You can and must refuse work that breaches regs, is unsafe or is illegal — customer pressure doesn't override statutory duties.",
              "Limitation periods: 6 years simple contract; 12 years deed; 3 years personal injury; Building Safety Act 2022 extended dwelling defects to 30 years retrospective.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Maps to C&G 2365-03 / Unit 308 / LO3 — identify legal and contractual requirements for electrical contractors.",
              "State the statutory baseline for consumer service contracts under CRA 2015.",
              "Apply the Consumer Contracts Regulations 2013 cooling-off period to off-premises and distance contracts.",
              "Structure written contracts and standard T&Cs that protect both parties.",
              "Identify duties under CDM 2015 for small contractors.",
              "Comply with UK GDPR / DPA 2018 obligations and ICO registration.",
              "Recognise vicarious liability and the limits on contractual liability exclusions.",
              "Confidently refuse unsafe or non-compliant work and explain the basis to customers.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Consumer Rights Act 2015 — the baseline</ContentEyebrow>

          <ConceptBlock
            title="The four statutory terms in consumer service contracts (ss.49-52)"
            plainEnglish="The Consumer Rights Act 2015 imposes four statutory terms on every consumer service contract. Section 49 — the service must be performed with reasonable care and skill. Section 50 — any information about the service given to the consumer that they relied on becomes a binding contract term (so quotation scope descriptions, claimed completion timescales, claimed price all become binding). Section 51 — if no price is fixed, a reasonable price must be paid. Section 52 — if no time is fixed, the work must be done within a reasonable time. These can't be excluded by contract terms — UCTA 1977 and CRA 2015 unfair terms framework police any attempted exclusion."
            onSite="The practical effect: be careful what you say in pre-quote conversations. A throwaway 'should be done by Friday' becomes binding under s.50 if the customer relies on it. Better to confirm what's actually agreed in writing in the quotation. The 'reasonable care and skill' standard (s.49) is the substantive performance bar — it's the legal expression of doing the job properly to BS 7671 / current standards."
          >
            <p>
              CRA 2015 service-contract sections:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Section 49</strong> &mdash; reasonable care and skill.
              </li>
              <li>
                <strong>Section 50</strong> &mdash; information from trader becomes binding term if relied on.
              </li>
              <li>
                <strong>Section 51</strong> &mdash; reasonable price if not fixed.
              </li>
              <li>
                <strong>Section 52</strong> &mdash; reasonable time if not fixed.
              </li>
              <li>
                <strong>Sections 54-57</strong> &mdash; consumer remedies: repeat performance, price reduction.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Unfair terms — what you can and can't put in your T&Cs"
            plainEnglish="The Consumer Rights Act 2015 Part 2 (sections 61-76) regulates unfair terms in consumer contracts. The headline test: a term is unfair if 'contrary to the requirement of good faith, it causes a significant imbalance in the parties' rights and obligations under the contract, to the detriment of the consumer.' Unfair terms are unenforceable. The Act also has a 'grey list' of specific terms that are likely unfair (Schedule 2): excluding liability for breach, allowing the trader to change terms unilaterally, very short cancellation periods favouring the trader, retention of money paid if the consumer cancels without similar protection for the trader. T&Cs can be legitimate but must be reasonable and balanced."
            onSite="Don't copy-paste random T&Cs off the internet. Get a solicitor to review your terms when you start trading at scale (cost typically £200-500 for a tradesman T&Cs review). Common landmines: blanket liability exclusions; punitive cancellation fees; unilateral price changes; preventing customer from claiming consumer rights. Trade-association template T&Cs (NICEIC, NAPIT, ECA) are generally well-drafted starting points; customise to your business."
          >
            <p>
              Unfair-terms danger list (likely unenforceable):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Blanket exclusion of liability (UCTA s.2 blocks death / personal injury exclusion entirely).</li>
              <li>Allowing trader to change material terms unilaterally.</li>
              <li>Very short or one-sided cancellation periods.</li>
              <li>Retention of deposit on customer cancellation without proportionate basis.</li>
              <li>Preventing consumer from exercising CRA 2015 rights.</li>
              <li>Excessive late-payment charges (must be a genuine pre-estimate of loss).</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <RegsCallout
            source="Consumer Rights Act 2015 — Sections 49, 50, 51, 52"
            clause={
              <>
                <p className="mb-2">
                  The Consumer Rights Act 2015 implies four statutory terms into consumer service
                  contracts:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-[14px]">
                  <li>
                    <strong>s.49</strong> &mdash; service to be performed with reasonable care and
                    skill.
                  </li>
                  <li>
                    <strong>s.50</strong> &mdash; trader&apos;s pre-contractual information becomes a
                    binding term where the consumer takes it into account.
                  </li>
                  <li>
                    <strong>s.51</strong> &mdash; reasonable price if no price agreed.
                  </li>
                  <li>
                    <strong>s.52</strong> &mdash; reasonable time if no time agreed.
                  </li>
                </ul>
                <p className="mt-2">
                  Cannot be excluded by contract terms. Consumer remedies for breach include
                  repeat performance (s.55) and price reduction (s.56).
                </p>
              </>
            }
            meaning={
              <>
                CRA 2015 is the consumer-protection baseline for trader-to-consumer service
                contracts. Plan your business on s.49 compliance &mdash; reasonable care and skill
                is the substantive performance bar. Write your quotations carefully &mdash; what
                you say there is binding under s.50. Keep records of what was agreed in writing.
                If a complaint arises, the question will be: did the work meet reasonable care and
                skill? Make sure the answer is yes.
              </>
            }
            cite="Source: Consumer Rights Act 2015, ss.49-57; Part 2 unfair terms ss.61-76."
          />

          <RegsCallout
            source="Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013"
            clause={
              <>
                <p className="mb-2">
                  For contracts concluded away from business premises (off-premises &mdash;
                  including the consumer&apos;s home) or at a distance (online, phone), the trader
                  must:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-[14px]">
                  <li>Provide specified pre-contractual information.</li>
                  <li>
                    Provide the consumer with a 14-day right to cancel without giving any reason
                    (calendar days from the day after the contract is concluded).
                  </li>
                  <li>Provide the cancellation form / instructions for exercising the right.</li>
                </ul>
                <p className="mt-2">
                  Where the consumer expressly requests work to start within the cancellation
                  period, they may still cancel but the trader is entitled to payment for the work
                  actually done before cancellation, subject to the proper express request and
                  acknowledgement procedure.
                </p>
              </>
            }
            meaning={
              <>
                Most domestic electrical work involves a contract concluded in the consumer&apos;s
                home &mdash; that&apos;s an &quot;off-premises contract&quot; and the cooling-off
                period applies. You must provide cancellation rights information at the quote stage.
                If the customer wants you to start within 14 days, get an express written request
                acknowledging the cancellation rights and waiving the &quot;don&apos;t start until
                14 days are up&quot; default. Failure to comply with the information requirements
                can extend the cancellation period to up to 12 months.
              </>
            }
            cite="Source: Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013 (SI 2013/3134)."
          />

          <SectionRule />

          <ContentEyebrow>CDM 2015 and construction-specific law</ContentEyebrow>

          <ConceptBlock
            title="CDM 2015 — duty-holders and what 'Contractor' duties mean for small electrical firms"
            plainEnglish="The Construction (Design and Management) Regulations 2015 apply to all construction work in Great Britain, with duties scaled to the project. Six duty-holders defined: Client (who commissions the work — including domestic clients with reduced duties); Principal Designer (coordinates design-stage H&S on multi-contractor projects); Principal Contractor (coordinates construction-stage H&S on multi-contractor projects); Designer (anyone preparing or modifying design); Contractor (anyone carrying out construction work); Worker (every operative). Notifiable projects (>30 working days with 20+ workers simultaneously, OR >500 person-days) trigger HSE notification (F10) and formal Principal Designer / Principal Contractor appointments. Most small electrical work falls under non-notifiable thresholds — but Contractor duties still apply."
            onSite="Even on a small domestic job you're a Contractor under CDM. Duties: cooperate with other duty-holders; have a Construction Phase Plan proportionate to the work (can be very short for small jobs — a single-page risk assessment may suffice); make sure your workers (including yourself) are competent for the work; provide site induction if employing or subcontracting; report accidents and dangerous occurrences. Larger work brings additional duties — read CDM 2015 properly if you're moving into multi-contractor commercial work."
          >
            <p>
              CDM 2015 Contractor duties (always apply, scale with project):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Plan, manage and monitor your construction work.</li>
              <li>Cooperate with other duty-holders.</li>
              <li>Ensure workers are competent and have necessary information / training.</li>
              <li>Have a Construction Phase Plan proportionate to the project.</li>
              <li>Comply with the Principal Contractor&apos;s site rules (multi-contractor work).</li>
              <li>Report accidents and dangerous occurrences (RIDDOR 2013).</li>
              <li>Provide PPE and ensure it&apos;s used.</li>
              <li>Ensure work areas are safe (welfare, access, lighting).</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Construction (Design and Management) Regulations 2015 — Regulation 15 (Contractor duties)"
            clause={
              <>
                <p className="mb-2">
                  &quot;A contractor must plan, manage and monitor construction work carried out
                  either by the contractor or by workers under the contractor&apos;s control, to
                  ensure that, so far as is reasonably practicable, it is carried out without risks
                  to health and safety. Where there is more than one contractor working on a project,
                  the contractor must comply with any directions given by the principal designer or
                  principal contractor and any site rules in the construction phase plan.&quot;
                </p>
              </>
            }
            meaning={
              <>
                CDM 2015 Reg 15 is the central Contractor duty. Plan-manage-monitor your work for
                H&amp;S; cooperate with the Principal Designer / Principal Contractor on multi-
                contractor work. Even on small domestic jobs as a single contractor, you have
                planning and management duties. The Construction Phase Plan can be short and
                proportionate for small work &mdash; a 1-page document covering scope, risks, controls,
                emergency arrangements is often sufficient. Have one; keep it on file with the job
                records.
              </>
            }
            cite="Source: Construction (Design and Management) Regulations 2015 (SI 2015/51), reg. 15."
          />

          <SectionRule />

          <ContentEyebrow>Data protection — UK GDPR and DPA 2018</ContentEyebrow>

          <ConceptBlock
            title="The six data-processing principles"
            plainEnglish="UK GDPR Article 5 sets six data-processing principles that apply to every business processing personal data. (1) Lawfulness, fairness and transparency — processing must have a lawful basis and be transparent to the data subject. (2) Purpose limitation — collect for specified, explicit, legitimate purposes; don't process for incompatible purposes. (3) Data minimisation — collect only what's adequate, relevant and necessary. (4) Accuracy — keep data accurate and up to date; correct or erase inaccurate data. (5) Storage limitation — retain only as long as needed for the purpose. (6) Integrity and confidentiality — protect data with appropriate security."
            onSite="Practical implementation for small contractors: have a privacy notice on your website / invoices / quotes explaining what data you collect and why; keep customer details only as long as needed (typically 5-6 years for tax / certificate purposes); secure storage (encrypted phone, strong password on accounting software, locked filing if paper); know the customer's rights (access, correction, erasure, restriction, portability, objection); have a process for responding to data-subject requests (Subject Access Request response within 1 month). Templates available from ICO."
          >
            <p>
              UK GDPR Article 5 principles:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Lawfulness, fairness and transparency.</li>
              <li>Purpose limitation.</li>
              <li>Data minimisation.</li>
              <li>Accuracy.</li>
              <li>Storage limitation.</li>
              <li>Integrity and confidentiality (security).</li>
              <li>Accountability (you must demonstrate compliance).</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="ICO registration and the 72-hour breach notification rule"
            plainEnglish="ICO registration is mandatory for most businesses processing personal data under the Data Protection (Charges and Information) Regulations 2018. Tier 1 (small business, turnover < £632k AND fewer than 11 staff): £40/year. Tier 2 (medium): £60. Tier 3 (large): £2,900. The 72-hour rule: if you have a personal data breach that's likely to result in risk to the rights and freedoms of individuals, you must notify the ICO within 72 hours of becoming aware (UK GDPR Article 33). If the breach is high risk, you must also notify affected individuals (Article 34). Even non-notifiable breaches must be documented. Examples of breaches: laptop stolen with customer data; emailing a customer list to the wrong recipient; ransomware encrypting customer records."
            onSite="Most small-contractor breaches will be low-risk and don't need notification — a single email sent to the wrong customer, quickly recalled, with limited data exposed. Higher-risk breaches (lost laptop with hundreds of customer records, ransomware, hack) absolutely need notification. Document every incident, even low-risk ones; the ICO will ask for the documentation if a complaint or audit comes up. Encryption on laptops / phones / cloud is the single biggest practical step to reduce breach risk."
          >
            <p>
              Data breach response checklist:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Contain &mdash; stop the breach from continuing (revoke access, recall email).</li>
              <li>Assess &mdash; what data, how many people, what risk.</li>
              <li>Notify ICO within 72 hours if likely risk to individuals.</li>
              <li>Notify affected individuals if high risk.</li>
              <li>Document everything &mdash; even non-notifiable breaches.</li>
              <li>Review &mdash; what controls failed; what changes prevent recurrence.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Refusing unsafe work and vicarious liability</ContentEyebrow>

          <ConceptBlock
            title="When you can — and should — refuse work"
            plainEnglish="You can and must refuse work that would breach the regulations, be unsafe, or be illegal. Specific triggers: BS 7671 non-compliance (e.g. socket in zone 0 of a bathroom); Part P non-compliance (notifiable work proposed without certification route); EWR 1989 Reg 16 issue (work outside your competence); HASAWA 1974 general duty of care (unsafe working method requested); tax evasion (cash to avoid VAT); fraud (false certification requested); Bribery Act 2010 (kickbacks or bribes). The customer's preference doesn't override your statutory duties. Personal liability under HASAWA s.7 and EWR Reg 3 means 'I was only following the customer's wishes' is not a defence."
            onSite="Refuse politely and offer the compliant alternative where possible. 'I can't install a socket in that position because BS 7671 doesn't allow socket outlets within the bathroom zones — but I can put a shaver socket here, or a socket just outside the door — would either of those work for you?' Most customers accept a polite explanation with an alternative. Walk away if necessary; the lost job is cheaper than the consequences of doing non-compliant work."
          >
            <p>
              Common refusal triggers:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>BS 7671 non-compliance (zone violations, undersized cable, etc.).</li>
              <li>Part P non-compliance (uncertified notifiable work).</li>
              <li>EWR Reg 16 (work outside competence).</li>
              <li>HASAWA general duty (unsafe working method).</li>
              <li>Tax evasion / VAT avoidance pressure.</li>
              <li>False certification requests.</li>
              <li>Bribery Act 2010 inducements.</li>
              <li>Unsafe or non-compliant materials / equipment specification.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Vicarious liability and contractual liability limits"
            plainEnglish="Vicarious liability is the common-law principle that an employer is liable for wrongful acts committed by employees in the course of their employment. This is why Employers' Liability insurance is compulsory, why proper employee training and supervision matter, and why RAMS and CDM compliance protect the employer. The employee is also personally liable but the claimant usually pursues the employer who has the insurance and assets. Note that vicarious liability applies to genuine employees — not to genuine independent subcontractors (though the test for who's an employee vs subcontractor is HMRC's view, not yours; sham self-employment can trigger retrospective employer liability)."
            onSite="Contractual liability limits in your T&Cs can manage exposure to customers but can't manage statutory or tort liability. You can't exclude liability for death or personal injury caused by negligence (UCTA s.2). You can cap consequential loss or limit total liability to contract value or insurance level — must be reasonable. Insurance is the practical answer for vicarious liability exposure: EL covers employee-injury claims; PL covers third-party claims arising from employee actions. Maintain both at appropriate levels."
          >
            <p>
              Liability management framework:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Employers&apos; Liability</strong> &mdash; compulsory under the 1969 Act; protects against employee-injury vicarious-liability claims.
              </li>
              <li>
                <strong>Public Liability</strong> &mdash; third-party injury / property damage including from employee actions.
              </li>
              <li>
                <strong>Professional Indemnity</strong> &mdash; design / advice errors.
              </li>
              <li>
                <strong>T&amp;Cs liability caps</strong> &mdash; reasonable limits subject to UCTA / CRA framework.
              </li>
              <li>
                <strong>Training and supervision</strong> &mdash; reduces likelihood of breaches that trigger vicarious liability.
              </li>
              <li>
                <strong>RAMS / CDM Construction Phase Plan</strong> &mdash; documented safe systems of work.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="No cooling-off information at the quote stage — extended cancellation window"
            whatHappens={
              <>
                Contractor quotes a domestic consumer-unit upgrade in the customer&apos;s home;
                customer signs the quote on the day. Doesn&apos;t provide the cooling-off notice
                required by the Consumer Contracts Regulations 2013. Work proceeds, completes, gets
                paid. Three months later customer disputes the work and tries to cancel; under the
                Regulations, the cancellation period was extended to 12 months because the
                cooling-off information wasn&apos;t provided. Customer can rescind the contract and
                claim back payment, even though the work is fully done.
              </>
            }
            doInstead={
              <>
                Provide the cooling-off information at the quote stage on any contract signed in
                the consumer&apos;s home or by phone / online. Standard form is available from
                gov.uk / ICO; many trade-association template T&amp;Cs include it. If the customer
                wants you to start within 14 days, get a signed express request acknowledging the
                cooling-off rights and authorising early start &mdash; this preserves your right
                to be paid for work done if they later cancel.
              </>
            }
          />

          <CommonMistake
            title="Operating without ICO registration for years — easy fix, easy miss"
            whatHappens={
              <>
                Sole trader has been trading for 4 years, holding customer details routinely.
                Never registered with ICO &mdash; didn&apos;t know about it. ICO does a routine sweep
                of unregistered trade contractors using cross-referenced business databases. Serves
                a fixed enforcement notice and penalty &mdash; typically a few hundred to a few
                thousand pounds. Trader pays, registers, regrets &mdash; the registration was
                &pound;40/year for the lower tier.
              </>
            }
            doInstead={
              <>
                Register with ICO at the start of trading. &pound;40/year for the small-business
                tier (turnover &lt; &pound;632k AND fewer than 11 staff). Application takes 10
                minutes at ico.org.uk. Set up the privacy notice template at the same time. Annual
                renewal reminder in your calendar. It&apos;s one of the easiest compliance items but
                widely missed by small contractors.
              </>
            }
          />

          <Scenario
            title="A customer disputes your invoice and threatens 'small claims court'"
            situation={
              <>
                You did a &pound;3,200 consumer unit upgrade + new ring main. Job complete, invoice
                issued, customer paid &pound;800 deposit. Final balance &pound;2,400 outstanding.
                Customer emails: &quot;The work isn&apos;t up to standard, I&apos;m not paying the
                balance, see you in small claims court.&quot; What do you do?
              </>
            }
            whatToDo={
              <>
                <strong>Step 1 &mdash; respond promptly and professionally</strong>. &quot;Thanks for
                getting in touch. I&apos;m sorry to hear there&apos;s a concern with the work. Could
                you tell me what specifically isn&apos;t up to standard so I can investigate?&quot;
                Don&apos;t get adversarial; don&apos;t pre-defend.
                <br /><br />
                <strong>Step 2 &mdash; visit and assess</strong>. Go back to the property; look at
                the specific issue raised; take photos. Check against the EIC and the test results.
                Genuine defect? &mdash; CRA 2015 s.49 says fix it at your cost. Genuine
                misunderstanding about scope? &mdash; explain what was and wasn&apos;t included per
                the original quotation. Genuine non-issue / customer changed their mind? &mdash;
                explain the position politely.
                <br /><br />
                <strong>Step 3 &mdash; document everything</strong>. Photos of the work; copy of
                the quotation showing agreed scope; copy of the EIC and test results; written
                summary of your assessment and the customer&apos;s position. This evidence pack is
                what you&apos;d need at court if it goes that far.
                <br /><br />
                <strong>Step 4 &mdash; try to resolve</strong>. If genuine defect: fix it; invoice
                final balance after; usually resolved. If misunderstanding: explain in writing
                referring to the quotation; offer to walk through; usually resolved. If
                customer-changed-mind: hold the position politely; refer to the contract; offer
                Alternative Dispute Resolution (ADR) via Trustmark or scheme provider before court.
                <br /><br />
                <strong>Step 5 &mdash; if unresolved, formal stages</strong>. Send a &quot;letter
                before action&quot;: &quot;I notice that the balance of &pound;2,400 remains
                outstanding from your invoice dated [date]. I&apos;ve addressed your concerns of
                [date] [as above]. Please make payment within 14 days or I will issue proceedings
                via the Money Claim Online service.&quot;
                <br /><br />
                <strong>Step 6 &mdash; small claims court if necessary</strong>. Money Claim Online
                for sums up to &pound;10,000 (small claims track up to &pound;10k). Court fee
                &pound;185 for &pound;1,500-&pound;3,000 (recoverable if you win). Most disputes
                settle before hearing once papers are filed; a small minority go to a hearing. The
                judge looks at the contract (your quotation + T&amp;Cs), the evidence (photos,
                certificates), and the dispute facts. CRA 2015 s.49 standard applies to the work.
                <br /><br />
                <strong>Step 7 &mdash; throughout, stay professional</strong>. No personal
                attacks; no inflammatory emails; no social-media public-shaming. Both because
                it&apos;s the right thing and because the judge will look at conduct. The
                professional contractor who calmly enforces a clear contract wins more often than
                the angry one with a sloppy paper trail.
              </>
            }
            whyItMatters={
              <>
                Customer disputes happen even on properly-done work. Having a clear contract
                (quotation + T&amp;Cs), documented work (photos, certificates, test results) and a
                professional response process turns most disputes into resolved-without-escalation
                outcomes. The contractor who panics or gets aggressive escalates; the calm one
                resolves. CRA 2015 provides the substantive standard; the Limitation Act, Money
                Claim Online and small claims court provide the enforcement framework if needed.
                Most disputes settle short of court when you handle them properly from day one.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Consumer Rights Act 2015 ss.49-52: reasonable care and skill, pre-contractual statements binding, reasonable price, reasonable time. Statutory baseline that can't be excluded.",
              "Consumer Contracts Regulations 2013: 14-day cooling-off for off-premises and distance contracts; provide cancellation information at quote stage or extended to 12 months.",
              "Written T&Cs protect both parties — but must be reasonable; unfair terms unenforceable under CRA 2015 Part 2.",
              "CDM 2015 applies to all construction work; small contractors are 'Contractor' duty-holders with proportionate planning / managing / monitoring duties.",
              "UK GDPR / DPA 2018 + ICO registration apply to almost every business; £40/yr small-business tier; six processing principles; 72-hour breach notification for serious breaches.",
              "Building Safety Act 2022 extended retrospective limitation for dwelling defects to 30 years — keep electrical certificate records indefinitely where practical.",
              "Vicarious liability makes employers liable for employee wrongful acts; Employers' Liability insurance is compulsory; training and supervision matter.",
              "Refuse work that breaches BS 7671 / Part P / EWR / HASAWA / tax law / Bribery Act — customer pressure doesn't override statutory duties; offer compliant alternatives.",
            ]}
          />

          <Quiz title="Legal requirements — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module7-section5-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                5.4 Pricing and estimating
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module7-section5-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.6 Insurance and liability
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
