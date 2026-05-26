/**
 * Module 7 · Section 5 · Subsection 6 — Insurance and liability for electricians
 * Maps to C&G 2365-03 / Unit 308 / LO3 / AC 3.x
 *   AC — "Identify the insurance and liability requirements for electrical contractors".
 *
 * The full insurance stack for an electrical contracting business — Public
 * Liability, Employers' Liability (Compulsory Insurance Act 1969),
 * Professional Indemnity, Product Liability, Tools-in-Transit, Contract
 * Works, Personal Accident / Income Protection — plus the concepts that
 * matter (excess, subrogation, claims-made vs occurrence, run-off cover,
 * indemnity clauses, non-disclosure voiding).
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

const TITLE = 'Insurance and liability for electricians | Level 3 Module 7.5.6 | Elec-Mate';
const DESCRIPTION =
  "The full insurance stack for an electrical contracting business — PL, EL, PI, product liability, tools cover, contract works — plus excess, subrogation, claims-made and indemnity clause concepts.";

const checks = [
  {
    id: 'mod7-s5-sub6-el',
    question: "Which insurance is a legal requirement if you employ staff?",
    options: [
      "Employers' Liability insurance — Compulsory Insurance Act 1969. Minimum statutory cover £5 million. The certificate must be displayed where employees can see it. Penalty for trading without: up to £2,500 per day. HSE enforces.",
      "Below-minimum or above-maximum values indicate a fault that prevents the protective measure from operating as designed — risking shock, fire, or equipment damage",
      "Because the coil voltage is the CONTROL voltage — fed from a control transformer or a different supply, NOT the same as the load voltage being switched. 110 V control is standard in industrial environments for safety.",
      "The entire waste load becomes classified as hazardous, increasing disposal costs and regulatory requirements, and potentially causing environmental contamination or chemical reactions",
    ],
    correctIndex: 0,
    explanation:
      "Employers' Liability is the only legally compulsory insurance under the 1969 Act once you have any employee — full-time, part-time, casual, apprentice or family member working in the business. Statutory minimum cover £5m; £10m typically supplied. The 1998 Regulations require display of the certificate where employees can see it (or accessible electronic copy). HSE enforces; penalty up to £2,500/day.",
  },
  {
    id: 'mod7-s5-sub6-pl-cover',
    question: 'What does Public Liability insurance typically cover?',
    options: [
      "Self-rescue first (if the person can descend unaided), assisted rescue from the tower (colleagues help), mechanical rescue (MEWP, descent device) and emergency services as the final option",
      "They may unintentionally alienate colleagues, miss important social cues, fail to adapt their communication style to different audiences, and receive repeated negative feedback they cannot understand or act upon",
      "National Insurance number, personal details, business start date, business activity description, expected annual turnover, and business contact details. Register at gov.uk; UTR issued by post within 1-3 weeks.",
      "Claims from third parties (clients, members of the public, other trades on site) for bodily injury or property damage caused by your work or business activities. Pays the claimant's compensation plus your legal defence costs up to the policy limit.",
    ],
    correctIndex: 3,
    explanation:
      "Public Liability is the practical-essential cover for any contractor — claims by third parties for bodily injury or property damage caused by your work. Includes the claimant's compensation and your legal defence costs. Not legally compulsory in itself (unlike Employers' Liability), but required by virtually every commercial client, CPS scheme and main contractor. Typical cover £2-5m for working sole traders; £10m+ for those on larger commercial sites.",
  },
  {
    id: 'mod7-s5-sub6-pi',
    question: "What is 'professional indemnity' insurance for?",
    options: [
      "Under CDM 2015 Reg 6 a project is notifiable when the construction work is scheduled to last longer than 30 working days AND have more than 20 workers working simultaneously at any point, OR exceed 500 person-days. The Client must notify the HSE in writing as soon as practicable before construction starts using F10 notification.",
      "HB pencil leaves a graphite line that washes away with water-based marking and barely shows on rough textured surfaces; chinagraph is wax-bound and stays visible on dust, oil and rough mineral surfaces.",
      "Claims arising from professional advice, designs, specifications or instructions you provide that cause financial loss to a client. Distinct from Public Liability — PI covers economic loss from advice / design; PL covers injury / property damage from physical work.",
      "Scope 1 = direct emissions (vans, gas heating); Scope 2 = indirect from purchased electricity; Scope 3 = value-chain (materials, subcontractors, waste, business travel) — usually the largest",
    ],
    correctIndex: 2,
    explanation:
      "Professional Indemnity (PI) covers claims arising from professional advice, design work, specifications, or technical instructions that cause financial loss. Distinct from PL which covers physical-injury / property-damage claims from your installation work. Electricians providing design services (EV / PV system design, commercial installation design, advisory work) typically need PI; pure installers following someone else's design may not. Typical cover £1-2m for design-active contractors; cost £300-700/yr.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the typical minimum Public Liability cover recommended for electrical contractors?",
    options: [
      'Proper installation techniques and regular maintenance',
      '£2 million to £5 million (with £10m+ for larger commercial work).',
      'To break down tasks into steps and identify hazards at each stage',
      'Information about efficient operation of heating, ventilation, and hot water systems',
    ],
    correctAnswer: 1,
    explanation:
      "£2m is the typical minimum required by most commercial clients and CPS schemes; £5m is the working standard for most contractors; £10m+ for those working on larger commercial sites or specialist work. The right level depends on the type and scale of work — bigger jobs and bigger sites mean bigger potential claims. Premium typically £200-700/yr for £2m sole trader; £400-1,000/yr for £5m.",
  },
  {
    id: 2,
    question: "What must you do with your Employers' Liability certificate?",
    options: [
      "Unlimited fine and/or up to 2 years imprisonment for individuals; unlimited fine for companies. Sentencing follows the Definitive Guideline (HSE Sentencing Council, 2016) and turns on culpability, harm and turnover.",
      "Pre-commissioning checklists, test results and certificates, equipment settings and configurations, thermal survey results, snag lists, soak test records, and a clear statement of the system's operational status at handover",
      "Display the certificate where employees can readily see it, or make an electronic copy accessible to employees. The Employers' Liability (Compulsory Insurance) Regulations 1998 require display and reasonable access. Records of all certificates from the previous 40 years must be retained.",
      "Theft, accidental damage, fire and loss of tools across various circumstances — on site, in transit, from vehicles. Check policy exclusions carefully: many exclude 'theft from unattended vehicle overnight' unless specifically extended; many limit cover per item.",
    ],
    correctAnswer: 2,
    explanation:
      "The 1998 Regulations require the EL certificate to be displayed where employees can see it (paper notice board) or made available electronically with reasonable access. Records of all EL certificates from the previous 40 years must be retained — this is important for occupational disease claims that can surface decades after exposure. Many policies are now electronic-only; the requirement is reasonable accessibility, not paper specifically.",
  },
  {
    id: 3,
    question: "What does 'all risks' tool insurance typically cover?",
    options: [
      "SDS-Plus bits have specially shaped slots in the shank that allow the bit to move forward and back (for hammering) while being positively driven in rotation — they cannot slip in the chuck",
      "No fixed minimum in regulations — driven by needs assessment. HSE ACOP L74 gives indicative numbers (low-hazard: 1 appointed person for &lt;25 employees; 1 EFAW for 25-50; 1 FAW for &gt;50; high-hazard: more demanding). Construction and electrical work generally falls in higher-hazard band.",
      "Atmospheric conditions can change rapidly during work — continuous monitoring provides real-time warning of deteriorating conditions so workers can evacuate before reaching dangerous levels",
      "Theft, accidental damage, fire and loss of tools across various circumstances — on site, in transit, from vehicles. Check policy exclusions carefully: many exclude 'theft from unattended vehicle overnight' unless specifically extended; many limit cover per item.",
    ],
    correctAnswer: 3,
    explanation:
      "All-risks tool / Tools-in-Transit / Goods-in-Vehicle insurance covers theft, accidental damage, fire and loss in various circumstances. Common exclusions to check: theft from unattended vehicle overnight (often excluded unless specifically extended); single-item limits (often £500-1,000 per item — needs increasing for high-value test equipment); valuables cover for laptops / phones. Typical cover level £5-15k for sole-trader tool set; cost £100-300/yr depending on cover and excess.",
  },
  {
    id: 4,
    question: 'When might you need contract works insurance?',
    options: [
      "When working on contracts where you're responsible for the value of work-in-progress (typically commercial fit-out, design-and-build projects, or any larger project where you've installed significant value of materials that haven't been signed-off to the client yet). Contract Works covers fire, flood, theft and accidental damage to work-in-progress.",
      "Use physiological regulation (controlled breathing to manage cortisol), cognitive reappraisal (reframe as \\\"this is a solvable technical challenge, not a personal attack\\\"), psychological flexibility (accept discomfort while committing to values of professionalism), and measured vulnerability (\\\"I understand this is frustrating — let me walk you through our resolution plan\\\")",
      "The Scottish Joint Industry Board (SJIB) is the equivalent of the JIB for the electrical contracting industry in Scotland. It sets working rules, pay rates and grades for Scottish electricians, working alongside SELECT (the Scottish trade association). SJIB grading uses similar terminology (Apprentice, Approved Electrician, Technician) but the rates and the ECS card variants are Scottish-specific.",
      "The supervisor might notice: decreasing patience with apprentices' problems, emotional numbness when hearing about difficulties, cynicism about whether support makes a difference, withdrawal from mentoring conversations, and irritability — all signs that their empathic capacity is depleted and they need to restore their own emotional resources",
    ],
    correctAnswer: 0,
    explanation:
      "Contract Works (also called Contractors' All Risks, CAR) covers work-in-progress on a contract — protects you from fire, flood, theft, accidental damage events that destroy or damage materials already installed but not yet handed over to the client. Important on larger contracts where you have significant value of installed materials. Sometimes provided by the main contractor as project-wide cover; sometimes by you directly. Check the contract — who is responsible for what.",
  },
  {
    id: 5,
    question: "What is an 'excess' on an insurance policy?",
    options: [
      "Under 10 percent of the average phase load — e.g. if average is 50 A, no phase should be below 45 A or above 55 A. Heavy imbalance wastes service rating and overloads the heaviest phase.",
      "The amount you pay towards each claim before the insurer pays. Higher excess = lower premium and vice versa. Some policies have separate excesses for different claim types (e.g. theft excess higher than damage excess).",
      "Oxygen (deficiency below 19.5%; enrichment above 23.5%); flammable gases (LEL); toxic gases - typically H2S, CO, sometimes others depending on space history.",
      "EAWR Reg 13/14 breach; HASAWA s.2/3/7 breach; potential RIDDOR; insurance void; personal prosecution; firm prosecution; reputational damage on HSE Public Register; possible JIB / scheme-body deregistration; criminal record for individuals at director level under s.37.",
    ],
    correctAnswer: 1,
    explanation:
      "Excess (or deductible) is your retained portion of every claim. Typical PL excess £250-500; tools excess £50-100; PI excess £500-1,000. Higher excess reduces premium meaningfully — many contractors take higher excess to lower premium and accept the risk of paying the first portion themselves. Choose an excess level you can afford to pay if a claim arises; don't accept £1,000 excess if you couldn't find £1,000 in a hurry.",
  },
  {
    id: 6,
    question: 'What should you do if an incident occurs that might lead to a claim?',
    options: [
      "Only when (a) you're trained in extinguisher use; (b) the fire is small (waste-bin sized); (c) you can identify the correct extinguisher class for the fire; (d) the route to a safe exit is behind you (you don't have to pass the fire to escape); (e) you can do so without risking yourself; (f) someone else has called 999 or is doing so. Otherwise EVACUATE.",
      "All protective devices operate (RCD test, RCBO test, AFDD self-test), correct switching/control sequences, interlocks, emergency stops, automatic devices and that the system performs as intended without re-introducing the original fault",
      "Report it to your insurer promptly within the timeframe specified in the policy (often within 7-30 days). Preserve evidence (photos, statements, certificates). Don't admit liability — let the insurer handle the negotiation. Failure to notify within the policy timeframe can void cover for that claim.",
      "Combine an IET mentor (expert guidance), a 4DX accountability partner (weekly commitments and scoreboard reviews), and a mastermind group (peer support) into a layered support structure with different review cadences",
    ],
    correctAnswer: 2,
    explanation:
      "Notify the insurer promptly per the policy conditions — most require notification within 7-30 days of becoming aware. Preserve evidence (photos of the work, copies of certificates, written customer correspondence). Don't admit liability or settle directly with the claimant — that voids the insurer's right of subrogation and can void cover. Let the insurer's claims team handle the negotiation. They have specialists who do this for a living.",
  },
  {
    id: 7,
    question: 'What is subrogation in insurance?',
    options: [
      "Direct application to the Local Authority Building Control (LABC) office before the work starts, with a Building Notice or Full Plans application; LABC inspects and issues a completion certificate. Significantly more expensive and slower than CPS routes — most contractors register with a scheme for this reason.",
      "The apprenticeship contract (a formal indenture under the Apprenticeships, Skills, Children and Learning Act 2009), the wages, the off-the-job training declaration (a minimum 20% of paid working hours under the Apprenticeship Standard), the provision of suitable work and supervision, and HASAWA s.2 duties to provide a safe place of work and adequate training.",
      "Isolate the entire board where reasonably practicable, or apply lock-off to every circuit that could become live within reach, and barrier off any remaining live parts to provide protection per HSE EAW Regulation 14",
      "The insurer's right, after paying your claim, to step into your legal position and pursue recovery from any third party who caused or contributed to the loss. This is why you shouldn't settle directly with a third party or admit liability — it can prejudice the insurer's recovery and void your cover.",
    ],
    correctAnswer: 3,
    explanation:
      "Subrogation is the insurer's right to 'step into your shoes' after paying your claim and pursue recovery from third parties who caused or contributed to the loss. Standard feature of most indemnity insurance. Practical implication: if a customer or third party causes you a loss, don't settle directly with them — let the insurer pay you and pursue them through subrogation. Settling directly destroys subrogation and the insurer can void cover.",
  },
  {
    id: 8,
    question: "What does 'claims-made' basis mean for professional indemnity insurance?",
    options: [
      "The policy covers claims notified during the policy period, regardless of when the underlying work was done. Distinct from 'occurrence' basis (covers events during policy period regardless of when claim made). Claims-made is standard for PI; means you need continuous cover (or run-off cover after ceasing) to protect against late-emerging claims.",
      "Establish a full exclusion zone with barriers minimum 6 metres from the base, deploy adequate task and area lighting, station banksmen at all access points, display warning signs, ensure all personnel wear enhanced high-visibility clothing, have a traffic management plan approved by the local authority, and confirm the rescue plan accounts for reduced visibility",
      "The diary is the source from which NVQ portfolio entries are written up. The portfolio needs evidence of competence against specific units and learning outcomes — circuit installs, fault-finding, testing, customer interaction. The diary is where the contemporaneous record of those activities lives, with the level of detail needed to write up a portfolio entry months later. Portfolio entries written from a thin diary tend to be thin themselves.",
      "Investigate the I/O signals using PLC monitoring software, check sensor outputs and wiring, review the PLC programme logic for timing issues, check for electrical noise from nearby VSDs, and examine the safety circuit for marginal switch contacts",
    ],
    correctAnswer: 0,
    explanation:
      "Claims-made policies cover claims notified during the policy period, regardless of when the original work was done. Critical implication: if you stop trading without arranging run-off cover, late-emerging claims (the customer realises a design error 2 years later) have no policy to attach to. Always buy run-off cover (3-6 years typically) when ceasing trading or moving insurers — premium typically 100-150% of one year's premium amortised over the run-off period.",
  },
];

const faqs = [
  {
    question: 'What insurance do I need as an absolute minimum?',
    answer:
      "Day-one minimum for a working sole trader: Public Liability (£2-5m, ~£200-700/yr); commercial vehicle insurance for the van (legally compulsory under the Road Traffic Act 1988); Tools-in-Transit (~£100-300/yr). Add Employers' Liability the moment you employ anyone — Compulsory Insurance Act 1969 makes it mandatory (~£300-500/yr). Add Professional Indemnity if you do design / advice work (~£300-700/yr). Trade-broker packages often bundle these competitively.",
  },
  {
    question: 'How much does contractor insurance cost in total?',
    answer:
      "Highly variable depending on cover levels, turnover, claims history and work types. Typical sole trader without employees: £600-1,500/yr for PL + tools + accident. Add £300-500 for Employers' Liability if employing. Add £300-700 for Professional Indemnity if design-active. Plus £800-2,000 for commercial vehicle insurance. Total typical: £2,000-4,500/yr for a fully-covered working sole trader. Trade-specialist brokers (Simply Business, Tradesman Saver, Hiscox) often beat generic insurers on price and policy fit.",
  },
  {
    question: 'Can I work without Public Liability insurance?',
    answer:
      "Legally — yes, PL isn't statutorily compulsory for sole traders without employees. Practically — no. Most clients won't engage you without PL; CPS schemes require it as a registration condition (£2m typical minimum); main contractors require it on most projects. Without it you'd personally bear any claim — easily exceeding the entire net worth of a small contracting business. Buy it on day one; don't try to skip it.",
  },
  {
    question: "What happens if I'm underinsured?",
    answer:
      "Two main consequences. If you've insured for an insufficient cover level (e.g. £2m PL on a £3m claim), you pay the excess and the insurer pays up to the limit; you personally bear any amount above the limit. If you've undervalued specific assets (e.g. declared £5k tools but actually have £15k), most policies apply 'average' — claims reduced proportionally (you'd get only 33% of the claim). Worse: serious under-declaration can be treated as non-disclosure and void the policy entirely. Declare accurately; update annually as business and assets grow.",
  },
  {
    question: 'Do I need insurance to work as a subcontractor?',
    answer:
      "Most main contractors require subcontractors to carry their own Public Liability (typically £5-10m minimum on larger projects); some also require Professional Indemnity. Even if not contractually required, you need PL — main-contractor cover doesn't always extend to subcontractor errors, and you face direct exposure to third-party claims. Read the subcontract agreement carefully; confirm what insurance is required and provide certificates before starting work.",
  },
  {
    question: 'What should I look for when choosing an insurance provider?',
    answer:
      "Cover levels matching your work scope; what's included and excluded (read the policy summary at minimum); excess levels you can afford; claims-handling reputation (talk to other tradespeople; check Trustpilot reviews specifically about claims); whether they understand the electrical trade (trade-specialist brokers often do better than generic insurers); price (but not just price); whether they're authorised by the FCA (most are; check on the FCA register). Compare 3-5 quotes from trade-specialist brokers when renewing each year.",
  },
  {
    question: 'What is run-off cover and when do I need it?',
    answer:
      "Run-off cover is insurance that continues to cover claims notified after you've stopped trading or moved insurers, relating to work done while the original policy was in force. Critical for Professional Indemnity (which is claims-made and typically excludes claims after policy expiry). Typical run-off period: 3-6 years (matches the typical limitation period for contractual claims). Premium often 100-150% of one year's premium spread over the run-off period. Buy run-off whenever you cease trading or change insurer — claims from past work can emerge years later.",
  },
  {
    question: 'Can I just rely on my main contractor\'s insurance?',
    answer:
      "No. Main-contractor cover usually doesn't extend to subcontractor errors or third-party claims directly against you. Even where a project-wide insurance policy exists (sometimes on larger commercial / public-sector projects), it typically only covers project-specific risks, not your day-to-day exposures. You need your own Public Liability minimum. Read any project policy carefully if it's offered — it usually supplements rather than replaces your own cover.",
  },
];

export default function Sub6() {
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
            eyebrow="Module 7 · Section 5 · Subsection 6"
            title="Insurance and liability"
            description="The full insurance stack for an electrical contracting business — PL, EL, PI, product, tools, contract works — plus excess, subrogation, claims-made and indemnity clause concepts."
            tone="blue"
          />

          <TLDR
            points={[
              "Public Liability (£2-5m typical, ~£200-700/yr) — practically essential. Covers third-party injury / property damage claims.",
              "Employers' Liability (£5m statutory minimum, ~£300-500/yr) — legally compulsory under Compulsory Insurance Act 1969 the moment you employ anyone.",
              "Professional Indemnity (£1-2m, ~£300-700/yr) — needed if you do design / advice work; claims-made basis means you need continuous cover or run-off.",
              "Tools-in-Transit / Goods-in-Vehicle (~£100-300/yr) — check exclusions for theft from unattended vehicle overnight; check single-item limits.",
              "Contract Works (project-specific) — for larger jobs where work-in-progress value is significant.",
              "Excess: typical PL £250-500, tools £50-100, PI £500-1,000. Higher excess = lower premium.",
              "Subrogation: insurer's right to pursue third parties after paying your claim. Don't settle directly with claimants.",
              "Notify insurer promptly per policy conditions (typical 7-30 days). Failure to notify can void cover.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Maps to C&G 2365-03 / Unit 308 / LO3 — identify the insurance and liability requirements for electrical contractors.",
              "Distinguish between legally compulsory and practically essential insurances.",
              "Explain the scope of Public Liability, Employers' Liability, Professional Indemnity, Product Liability, Tools-in-Transit and Contract Works cover.",
              "Apply the concepts of excess, subrogation, claims-made vs occurrence, run-off cover and policy conditions.",
              "Identify the risks of underinsurance, non-disclosure and direct settlement with claimants.",
              "Manage indemnity clauses in commercial contracts so that they align with insurance cover.",
              "Build a proportionate insurance stack for a working sole-trader electrical business.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The compulsory insurance — Employers' Liability</ContentEyebrow>

          <ConceptBlock
            title="Employers' Liability — legally compulsory the moment you employ"
            plainEnglish="Employers' Liability (EL) is the only legally compulsory insurance for typical businesses, under the Employers' Liability (Compulsory Insurance) Act 1969. The duty: insure against liability for bodily injury or disease sustained by employees in the course of their employment. Statutory minimum cover £5m; most package policies provide £10m. The certificate must be displayed where employees can see it or made accessible electronically (Employers' Liability Regulations 1998). Records of all EL certificates from the previous 40 years must be retained — important for occupational disease claims that surface decades after exposure. Penalty for trading without valid cover: up to £2,500 per day. HSE enforces."
            onSite="The 1969 Act has a broad 'employee' definition — covers full-time, part-time, casual, apprentice, family worker. The day you take on an apprentice, you need EL in force from day one. Genuine self-employed subcontractors (with their own PL) usually don't trigger EL — but sham self-employment can. Use proper CIS subcontract arrangements rather than off-books cash payments. Keep EL certificate copies for 40 years; this is one of the few compliance items with such a long retention requirement."
          >
            <p>
              Employers&apos; Liability essentials:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Statutory basis</strong>: Employers&apos; Liability (Compulsory Insurance) Act 1969.
              </li>
              <li>
                <strong>Minimum cover</strong>: &pound;5,000,000 statutory; &pound;10m typical.
              </li>
              <li>
                <strong>Display</strong>: certificate where employees can see (paper or accessible electronic).
              </li>
              <li>
                <strong>Retention</strong>: certificates of last 40 years.
              </li>
              <li>
                <strong>Penalty</strong>: up to &pound;2,500/day for trading without cover.
              </li>
              <li>
                <strong>Enforcement</strong>: HSE.
              </li>
              <li>
                <strong>&quot;Employee&quot; definition</strong>: broad &mdash; full-time, part-time, casual, apprentice, family worker.
              </li>
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
            source="Employers' Liability (Compulsory Insurance) Act 1969 — Section 1"
            clause={
              <>
                <p className="mb-2">
                  &quot;Every employer carrying on any business in Great Britain shall insure, and
                  maintain insurance, under one or more approved policies with an authorised
                  insurer or insurers against liability for bodily injury or disease sustained by
                  his employees, and arising out of and in the course of their employment in Great
                  Britain in that business.&quot;
                </p>
                <p className="mt-2">
                  Minimum statutory cover &pound;5,000,000. Certificate must be displayed under
                  Employers&apos; Liability (Compulsory Insurance) Regulations 1998. Penalty for
                  trading without cover: up to &pound;2,500 per day.
                </p>
              </>
            }
            meaning={
              <>
                EL is the only legally compulsory insurance for typical employers. The moment you
                employ anyone (full-time, part-time, casual, apprentice, family worker), the Act
                applies. Most package policies provide &pound;10m cover; &pound;5m is the floor.
                Display the certificate; retain past certificates 40 years; renew before expiry.
                HSE enforces.
              </>
            }
            cite="Source: Employers' Liability (Compulsory Insurance) Act 1969, s.1; Employers' Liability (Compulsory Insurance) Regulations 1998 (SI 1998/2573)."
          />

          <SectionRule />

          <ContentEyebrow>Public Liability — the practical essential</ContentEyebrow>

          <ConceptBlock
            title="What Public Liability actually covers and why every contractor needs it"
            plainEnglish="Public Liability (PL) is the practical-essential cover for any contractor — not legally compulsory in itself but required by virtually every commercial client, CPS scheme and main contractor. PL covers claims from third parties (clients, members of the public, other trades on site) for bodily injury or property damage caused by your work or business activities. Pays the claimant's compensation plus your legal defence costs up to the policy limit. Typical cover levels: £2m for small sole-trader domestic work (most CPS schemes require this); £5m for most working contractors; £10m+ for those on larger commercial sites or specialist work. Premium typically £200-700/yr for £2m cover for a sole trader."
            onSite="Compare quotes from trade-specialist brokers (Simply Business, Tradesman Saver, Hiscox, Direct Line for Business). Read the policy summary at minimum; check exclusions (some policies exclude hot works, working at height beyond a threshold, specific specialist scopes). Pay annually rather than monthly where you can afford it (saves typically 10-15%). Update cover annually as business and turnover change — under-declaring turnover can be treated as non-disclosure and void the policy."
          >
            <p>
              Public Liability practicalities:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cover level</strong>: &pound;2m minimum, &pound;5m typical, &pound;10m+ for larger commercial.
              </li>
              <li>
                <strong>What&apos;s covered</strong>: third-party injury or property damage caused by your work.
              </li>
              <li>
                <strong>What&apos;s NOT covered</strong>: your own injury (Personal Accident covers that); damage to your own tools (Tools cover); employee injuries (EL covers that); economic loss from design errors (PI covers that).
              </li>
              <li>
                <strong>Premium</strong>: &pound;200-700/yr for &pound;2m sole trader; more for higher cover, employees or higher turnover.
              </li>
              <li>
                <strong>Excess</strong>: typically &pound;250-500 per claim.
              </li>
              <li>
                <strong>Common exclusions</strong>: hot works (welding, cutting); working at height beyond threshold; specialist scopes (HV, ATEX).
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

          <ContentEyebrow>Professional Indemnity — design and advice cover</ContentEyebrow>

          <ConceptBlock
            title="Professional Indemnity — what it covers and when electricians need it"
            plainEnglish="Professional Indemnity (PI) covers claims arising from professional advice, design work, specifications or technical instructions that cause financial loss to a client. Distinct from Public Liability — PL covers physical injury / property damage from your installation work; PI covers economic loss from advice or design. Electricians providing design services (EV system design, PV system design, commercial installation design, fire alarm design, lighting calculations) typically need PI. Pure installers following someone else's design typically don't. The line can blur — providing 'advice' on a customer's project beyond pure installation may bring PI exposure. PI is typically written on a claims-made basis; the policy covers claims notified during the policy period regardless of when the work was done."
            onSite="Buy PI if you do any design or advisory work. Typical cover £1-2m for design-active sole traders; cost £300-700/yr. Critical: maintain continuous cover or buy run-off cover when ceasing trading or changing insurers. Claims-made basis means a claim arising 3 years after the work is done has no policy to attach to if you've stopped paying premiums — the past policy doesn't cover late claims. Run-off cover (typically 3-6 years) bridges this; premium typically 100-150% of one year's premium spread over the run-off period."
          >
            <p>
              Professional Indemnity essentials:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cover</strong>: claims from professional advice / design / spec errors causing financial loss.
              </li>
              <li>
                <strong>Distinct from PL</strong>: PL covers physical-damage claims; PI covers economic-loss claims.
              </li>
              <li>
                <strong>Typical cover</strong>: &pound;1-2m for design-active sole traders.
              </li>
              <li>
                <strong>Cost</strong>: &pound;300-700/yr.
              </li>
              <li>
                <strong>Basis</strong>: usually claims-made &mdash; covers claims notified in policy period.
              </li>
              <li>
                <strong>Run-off cover</strong>: needed when ceasing trade or changing insurer; typically 3-6 years.
              </li>
              <li>
                <strong>Limitation</strong>: align cover period with Limitation Act 1980 simple-contract 6-year period.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Product Liability and how it relates to materials you install"
            plainEnglish="Product Liability covers claims arising from defective products you supply or install that cause injury or damage. Often included in Public Liability policies as standard, but check — some policies have separate limits or exclusions. Practical relevance for electricians: if you supply a defective consumer unit or RCD that causes a fire or shock, the claim against you may be product-liability-coded rather than installation-coded. Most working contractors don't need to think about Product Liability separately because the PL policy covers it — but check the policy summary to confirm."
            onSite="The Consumer Protection Act 1987 establishes strict liability for defective products that cause injury — the producer (or in some cases the supplier) is liable regardless of negligence. As an electrician you're generally a supplier (not a producer) and have limited Product Liability exposure where the manufacturer can be identified. Where you can't identify the manufacturer (cheap online imports without clear branding), you may be treated as the producer for liability purposes. Stick to branded products with clear supply chains; don't install cheap unbranded kit you can't trace."
          >
            <p>
              Product Liability framework:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Statutory basis</strong>: Consumer Protection Act 1987.
              </li>
              <li>
                <strong>Scope</strong>: strict liability for defective products causing injury.
              </li>
              <li>
                <strong>Producer</strong>: manufacturer, importer into UK, or own-brand seller liable as producer.
              </li>
              <li>
                <strong>Supplier</strong>: must identify the producer if asked; otherwise treated as producer.
              </li>
              <li>
                <strong>Insurance</strong>: usually within PL policy; check for separate Product Liability limits or exclusions.
              </li>
              <li>
                <strong>Practical mitigation</strong>: branded products with clear supply chains; document what you installed.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The supporting cover — tools, vehicle, contract works</ContentEyebrow>

          <ConceptBlock
            title="Tools-in-Transit / Goods-in-Vehicle — protecting your livelihood"
            plainEnglish="Tools cover (variously called Tools-in-Transit, Goods-in-Vehicle, or All Risks Tool insurance) protects the value of tools and test equipment against theft, accidental damage, fire and loss. Practical importance: van theft of tools is a meaningful risk — the trade press regularly carries stories of contractors losing £10-30k of tools overnight. Typical cover £5-15k for a sole-trader tool set; cost £100-300/yr. Critical exclusions to check: 'theft from unattended vehicle overnight' is often excluded as standard unless specifically extended (which costs more); single-item limits (often £500-1,000 per item — your £2,000 MFT needs the limit extending); valuables clause for laptops, phones, tablets."
            onSite="Don't leave high-value tools in the van overnight if you can help it — many policies don't cover that loss regardless of how good the van security is. Photograph and serial-number your tools; keep purchase receipts; a documented tool list makes claims easier. Some insurers offer enhanced cover for declared high-value items (your MFT, your impact driver collection) with no single-item limit but a declared schedule. Worth doing for expensive specialist test equipment."
          >
            <p>
              Tools cover essentials:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cover scope</strong>: theft, damage, fire, loss across various circumstances.
              </li>
              <li>
                <strong>Cover level</strong>: typically &pound;5-15k for a sole-trader tool set.
              </li>
              <li>
                <strong>Cost</strong>: &pound;100-300/yr.
              </li>
              <li>
                <strong>Excess</strong>: typically &pound;50-100 per claim.
              </li>
              <li>
                <strong>Critical exclusions</strong>: theft from unattended vehicle overnight (often excluded); single-item limits.
              </li>
              <li>
                <strong>Scheduled items</strong>: declare high-value test equipment separately for full cover.
              </li>
              <li>
                <strong>Documentation</strong>: photo + serial numbers + receipts make claims easier.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Contract Works — for larger jobs with work-in-progress value"
            plainEnglish="Contract Works (also called Contractors' All Risks, CAR) covers the value of work-in-progress on a contract — protects you from fire, flood, theft, accidental damage events that destroy or damage materials already installed but not yet signed-off to the client. Relevant on larger commercial jobs where you have significant installed-but-not-handed-over value, or on new-build projects where the building isn't insured until handover. Often provided by the main contractor as project-wide cover on commercial sites; sometimes by you directly. Check the project contract — who is responsible for which insurance? Standard form contracts (JCT, NEC) usually specify."
            onSite="Don't assume the main contractor's project insurance covers you — read the contract. Where you're responsible for Contract Works, the cover level should match the installed value at peak (typically toward the end of your scope of work). Cost varies hugely with project scope and risk — £500-2,000 typical for a £50-200k contract works value. Many contractors operate without Contract Works cover on small jobs and accept the risk; on larger jobs with five-figure installed value, the cover is sensible."
          >
            <p>
              Contract Works practicalities:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Scope</strong>: fire, flood, theft, accidental damage to work-in-progress on contracts.
              </li>
              <li>
                <strong>When needed</strong>: larger jobs with significant installed value not yet handed over.
              </li>
              <li>
                <strong>Project policies</strong>: often provided by main contractor on commercial sites &mdash; check contract.
              </li>
              <li>
                <strong>Cover level</strong>: matches peak installed value during the contract.
              </li>
              <li>
                <strong>Cost</strong>: varies; typical &pound;500-2,000 for &pound;50-200k contract value.
              </li>
              <li>
                <strong>Standard contracts</strong>: JCT, NEC contracts specify allocation of Contract Works responsibility.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Insurance concepts that matter</ContentEyebrow>

          <ConceptBlock
            title="Excess, subrogation, claims-made vs occurrence — the operational concepts"
            plainEnglish="Three concepts that come up in claims handling. Excess (deductible): the amount you pay towards each claim before the insurer pays. Higher excess = lower premium. Subrogation: the insurer's right after paying your claim to step into your legal position and pursue recovery from any third party who caused the loss. This is why you shouldn't settle directly with claimants or admit liability — destroys subrogation rights and can void cover. Claims-made vs occurrence basis: occurrence policies (typical PL) cover events occurring during the policy period regardless of when claims are made; claims-made policies (typical PI) cover claims made during the policy period regardless of when the events occurred. Claims-made requires continuous cover or run-off to protect against late-emerging claims."
            onSite="When a potential claim arises: notify your insurer promptly within the policy timeframe (typically 7-30 days); preserve evidence (photos, certificates, correspondence); don't admit liability or settle directly. Let the insurer's claims team handle the negotiation. Failure to notify within timeframe, admitting liability, or settling directly can all void cover for that claim. Read your policy conditions when you take cover out, not when a claim arises."
          >
            <p>
              Operational insurance concepts:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Excess (deductible)</strong>: amount you pay per claim before insurer pays.
              </li>
              <li>
                <strong>Subrogation</strong>: insurer&apos;s right to pursue third parties after paying your claim.
              </li>
              <li>
                <strong>Occurrence basis</strong>: covers events in policy period; typical PL.
              </li>
              <li>
                <strong>Claims-made basis</strong>: covers claims in policy period; typical PI; needs continuous cover or run-off.
              </li>
              <li>
                <strong>Notification</strong>: prompt notification within policy timeframe.
              </li>
              <li>
                <strong>Don&apos;t admit liability or settle directly</strong>: voids cover.
              </li>
              <li>
                <strong>Non-disclosure</strong>: undeclared material facts can void the policy entirely.
              </li>
              <li>
                <strong>Indemnity clauses</strong>: contractual liability transfers; align with insurance cover.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Non-disclosure and the duty of fair presentation"
            plainEnglish="Under the Insurance Act 2015, business insurance applicants have a duty of fair presentation — disclose every material circumstance that the applicant knows or ought to know, and present it in a way that's reasonably clear and accessible to the insurer. Material circumstances include: business activities and turnover (under-declaring turnover is the most common non-disclosure problem); claims history and incidents (even those that didn't lead to a claim); specific risk factors (specialist work, hazardous activities, employee numbers). Non-disclosure or misrepresentation can lead to claim reduction or, for serious cases, total cover voidance. Apply the duty whenever you renew, change cover, or buy new cover."
            onSite="Review your insurance disclosure annually. Has turnover grown beyond what you declared? Have you started new types of work (added EV charging, started doing commercial work)? Have you had any incidents — even minor ones that didn't lead to claims? Disclose them at renewal; the alternative is worse if it surfaces during a claim. Most renewals offer 'check / update' options for material facts; use them honestly."
          >
            <p>
              Fair presentation checklist at renewal:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Current turnover (correct, not estimated low).</li>
              <li>Types of work undertaken (include any new specialties).</li>
              <li>Number of employees and apprentices.</li>
              <li>Claims and incidents in last 5 years (even minor ones).</li>
              <li>Specialist or higher-risk activities (HV, work at height beyond threshold, hot works).</li>
              <li>Subcontractor usage (and their own cover levels).</li>
              <li>Geographic scope of work.</li>
              <li>Sectors / customer types.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Settling a claim directly with the customer to 'keep it simple'"
            whatHappens={
              <>
                Contractor accidentally damages a customer&apos;s expensive kitchen worktop while
                running cable. Customer claims &pound;1,500 for the damage. Contractor wants to
                avoid &quot;an insurance hassle&quot;, pays the &pound;1,500 directly. Two months
                later the same customer claims further damage from an alleged short-circuit in the
                same work area &mdash; &pound;6,000 of follow-on damage. Contractor notifies
                insurer this time. Insurer asks about the original incident, learns about the
                direct settlement, and refuses cover on the basis that the direct settlement
                destroyed subrogation rights and was a breach of the policy condition not to
                admit liability or settle directly. Contractor personally liable for the
                &pound;6,000.
              </>
            }
            doInstead={
              <>
                Notify the insurer the moment a potential claim arises &mdash; even small ones.
                Let the insurer&apos;s claims team handle the negotiation; they have specialists
                who do this professionally. The excess might mean you pay the first &pound;250-500
                yourself but the policy structure stays intact for any related follow-on claims.
                Direct settlement is almost always a false economy because of the cover-voiding
                consequences if related claims emerge later.
              </>
            }
          />

          <CommonMistake
            title="Letting Professional Indemnity lapse after ceasing trading — late claim with no cover"
            whatHappens={
              <>
                Sole trader does EV / PV design work for several years; carries Professional
                Indemnity insurance. Decides to stop trading; cancels all insurances at the end
                of the year. Three years later a customer&apos;s PV system underperforms;
                investigation traces it to a design error in the system sizing; customer claims
                &pound;25,000 for loss of FIT income over the system&apos;s life. Trader has no
                PI cover at the time of claim (PI is claims-made; the policy at the time of the
                work doesn&apos;t cover claims made years later); no run-off cover was purchased
                when ceasing trading. Trader is personally liable for &pound;25,000.
              </>
            }
            doInstead={
              <>
                Always buy run-off cover when ceasing trade or changing insurer if you carry
                Professional Indemnity. Typical run-off period 3-6 years (matches Limitation Act
                1980 simple-contract 6-year period). Premium typically 100-150% of one year&apos;s
                premium amortised over the run-off period &mdash; modest cost relative to the
                exposure. Set the cover to extend for the longest plausible claim window for
                your work types.
              </>
            }
          />

          <Scenario
            title="A customer is injured at their property six months after your work — what now?"
            situation={
              <>
                You did a consumer-unit upgrade and new socket installation 6 months ago. Customer
                phones: their child received an electric shock from a socket in the room you
                worked in; minor injury, no hospitalisation, but they&apos;re asking what
                you&apos;re going to do about it. You issued a clean EIC at the time. What do you
                do?
            </>
            }
            whatToDo={
              <>
                <strong>Step 1 &mdash; respond calmly and seriously</strong>. Don&apos;t deny;
                don&apos;t admit liability. &quot;I&apos;m really sorry to hear about your child &mdash;
                first thing, is everyone OK? Tell me what happened.&quot; Listen; get the facts.
                <br /><br />
                <strong>Step 2 &mdash; arrange a return visit</strong>. Go back; test the
                installation against the original EIC results. Take photographs. Bring your MFT
                and test gear. Document conditions thoroughly. If something is genuinely wrong, find
                out what. If everything tests OK, document that thoroughly too.
                <br /><br />
                <strong>Step 3 &mdash; notify your insurer immediately</strong>. Don&apos;t wait
                to see if the customer escalates &mdash; most policies require prompt notification
                of incidents that might lead to claims, regardless of whether a claim has
                materialised. Phone your broker / insurer&apos;s claims line; describe the
                incident factually; follow up in writing. Your insurer&apos;s claims team will
                take over from this point.
                <br /><br />
                <strong>Step 4 &mdash; preserve evidence</strong>. Keep copies of: original
                quotation; original EIC and test results; photos from the original job; photos
                from the return visit; any written communication with the customer. Insurer will
                ask for this evidence pack.
                <br /><br />
                <strong>Step 5 &mdash; don&apos;t admit liability or settle directly</strong>.
                Even if you suspect your work might have contributed, don&apos;t admit liability
                in any conversation or written communication with the customer. Don&apos;t offer
                a goodwill payment without insurer agreement. These actions can destroy subrogation
                rights and void cover. Refer the customer to your insurer&apos;s claims team if
                they want to pursue a formal claim.
                <br /><br />
                <strong>Step 6 &mdash; let the process run</strong>. The insurer&apos;s claims
                team will investigate, possibly arrange an independent inspection, negotiate with
                the customer or their solicitor. You pay the excess if the claim succeeds; the
                insurer handles the rest. Most claims like this are either resolved on facts (the
                work was OK; another cause; no contractor liability) or settled efficiently if
                there was a genuine fault.
                <br /><br />
                <strong>Step 7 &mdash; learn from it</strong>. Regardless of liability outcome,
                review what happened. Was the testing thorough enough? Were there any indicators
                you could have spotted? Update your processes if needed. Treat as CPD, not as
                personal failure.
              </>
            }
            whyItMatters={
              <>
                Personal injury claims are the highest-stakes incidents in contracting work.
                Insurance is what stands between a contained event handled professionally and a
                career-ending personal-liability outcome. The discipline matters: prompt
                notification, no liability admission, no direct settlement, full cooperation with
                the insurer. Done right, the policy works as designed. Done wrong &mdash; direct
                settlement, late notification, admitted liability &mdash; the contractor ends up
                personally exposed for the full claim. Most contractors will face one or two
                incidents like this in a career; how you handle them defines whether insurance
                actually protects you.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Employers' Liability — only legally compulsory insurance; Compulsory Insurance Act 1969; £5m minimum; £10m typical; certificate displayed; 40-year retention.",
              "Public Liability — practically essential; £2-5m typical; covers third-party injury / property damage; £200-700/yr for sole trader.",
              "Professional Indemnity — needed if design / advice work; claims-made basis; requires continuous cover or run-off when ceasing.",
              "Tools-in-Transit — check exclusions for theft from unattended vehicle overnight; check single-item limits; schedule high-value test equipment.",
              "Contract Works — for larger jobs with significant work-in-progress value; check who's responsible per contract (you or main contractor).",
              "Excess: typical PL £250-500; tools £50-100; PI £500-1,000. Higher excess = lower premium.",
              "Subrogation: insurer's right to pursue third parties after paying claim. Don't settle directly; don't admit liability.",
              "Insurance Act 2015 duty of fair presentation — disclose material facts at renewal; non-disclosure can void cover.",
            ]}
          />

          <Quiz title="Insurance and liability — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module7-section5-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                5.5 Legal requirements
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module7')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Module 7 hub
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
