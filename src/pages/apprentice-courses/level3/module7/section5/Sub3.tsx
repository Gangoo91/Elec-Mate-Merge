/**
 * Module 7 · Section 5 · Subsection 3 — Setting up as a self-employed electrician
 * Maps to C&G 2365-03 / Unit 308 / LO3 / AC 3.x
 *   AC — "Identify the requirements for becoming self-employed".
 *
 * The first-day setup checklist for going self-employed in the trade — UTR
 * application, Self Assessment registration, National Insurance classes,
 * essential insurance stack (Public Liability, Employers' Liability if hiring,
 * Tools-in-Transit, Goods-in-Vehicle, Professional Indemnity), banking and
 * accounting setup, CPS scheme application timing and the data-protection
 * (ICO) registration that most sole traders miss.
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

const TITLE = 'Setting up as a self-employed electrician | Level 3 Module 7.5.3 | Elec-Mate';
const DESCRIPTION =
  "First-day setup for going self-employed in the trade — UTR, Self Assessment, National Insurance, essential insurances, banking, accounting, CPS scheme and ICO registration.";

const checks = [
  {
    id: 'mod7-s5-sub3-utr',
    question: 'What is the UTR and when do you need it?',
    options: [
      'A business registration certificate from Companies House.',
      "A 10-digit Unique Taxpayer Reference issued by HMRC when you register for Self Assessment as a self-employed individual. You need it to file your annual tax return and for all HMRC correspondence. Apply within 3 months of starting trade.",
      'A trade-association membership number.',
      'A scheme registration number.',
    ],
    correctIndex: 1,
    explanation:
      "The UTR is your unique HMRC tax reference. Apply online at gov.uk for Self Assessment registration; HMRC issues the UTR by post (usually 1-3 weeks). You can't file a tax return without it. Sole traders, partners and limited-company directors each have their own personal UTRs; limited companies also have their own corporate UTR. Late registration penalty £100 + percentage of tax due.",
  },
  {
    id: 'mod7-s5-sub3-self-assessment-deadline',
    question: 'When must you register for Self Assessment with HMRC?',
    options: [
      'Within 1 month of starting work.',
      "Within 3 months of starting to trade — formally, by 5 October following the end of the tax year in which you started self-employment. Failure to register on time can attract penalties of up to 100% of the tax due.",
      'Within 6 months of earning £1,000.',
      'Before you start any work.',
    ],
    correctIndex: 1,
    explanation:
      "The formal deadline is 5 October after the end of the tax year (6 April-5 April) in which you started. So if you start trading in May 2026, you must register by 5 October 2027. Practical advice: register within 1-3 months of starting; the UTR takes weeks to arrive and you'll want it ready before the first January tax deadline. There's also a £1,000 trading allowance — gross income below that doesn't require registration.",
  },
  {
    id: 'mod7-s5-sub3-pl-minimum',
    question: 'What is the typical minimum Public Liability insurance cover for an electrical contractor?',
    options: ['£500,000.', '£1 million.', '£2 million (with most working contractors carrying £5 million).', '£10 million.'],
    correctIndex: 2,
    explanation:
      "£2m is the typical minimum required by most commercial clients, CPS schemes and main contractors; £5m is increasingly the working standard. Public Liability isn't legally compulsory (unlike Employers' Liability) but it's practically essential — most clients won't engage you without it, and the cost of an uninsured claim could easily exceed the value of any business. Typical premium for a sole trader: £200-500/year for £2m cover.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What information do you need to register for Self Assessment with HMRC?',
    options: [
      'Just your name and address.',
      "National Insurance number, personal details, business start date, business activity description, expected annual turnover, and business contact details. Register at gov.uk; UTR issued by post within 1-3 weeks.",
      'A business plan and bank statement.',
      'Your ECS card and qualifications.',
    ],
    correctAnswer: 1,
    explanation:
      "The Self Assessment registration form is straightforward and takes ~15 minutes online. You'll need your NI number, personal details and basic business info. HMRC issues the UTR by post; activation code arrives separately; both are needed to access your online Self Assessment account. Don't lose the activation code — it's a pain to replace.",
  },
  {
    id: 2,
    question: 'Which insurance is legally compulsory for self-employed electricians who employ anyone?',
    options: [
      'Public Liability insurance.',
      "Employers' Liability insurance — required by the Employers' Liability (Compulsory Insurance) Act 1969. £5m minimum statutory cover; £10m typically supplied. Penalty for trading without: up to £2,500 per day.",
      'Professional Indemnity insurance.',
      'Income Protection insurance.',
    ],
    correctAnswer: 1,
    explanation:
      "Employers' Liability is the only legally compulsory insurance under the 1969 Act once you have any employee (full-time, part-time, casual, apprentice, family member working in the business). Public Liability is practically essential but not legally compulsory in itself. Self-employed sole traders with no employees don't need EL — but the moment you take on an apprentice, you do, and from day one.",
  },
  {
    id: 3,
    question: 'What is Class 4 National Insurance?',
    options: [
      'A premium NI contribution for high earners.',
      "Self-employed NI calculated as a percentage of profits over a threshold; paid alongside income tax via Self Assessment. Currently 9% on profits between the lower and upper limits, 2% above. (Rates and thresholds adjust annually — check current HMRC figures.)",
      'NI for limited company directors only.',
      'NI for foreign workers.',
    ],
    correctAnswer: 1,
    explanation:
      "Self-employed sole traders pay Class 2 NI (flat weekly amount, often paid via Self Assessment) and Class 4 NI (percentage of profits, paid via Self Assessment). Class 4 is the larger amount for most contractors. Limited-company directors pay Class 1 NI (employee NI) on salary drawn through PAYE, plus the company pays Employer's NI on the same. Different routes; broadly similar overall NI bill for similar earnings.",
  },
  {
    id: 4,
    question: 'When is the most common practical recommendation to apply for CPS scheme registration?',
    options: [
      'Years after starting in business.',
      "As early as practical — initial scheme assessment typically takes 4-8 weeks from application. Apply 6-8 weeks before you need to do your first Part P notifiable domestic work; pre-apply during the 6-week pre-launch period if going self-employed.",
      'Only after you have 10 employees.',
      "There's no need to apply for any scheme.",
    ],
    correctAnswer: 1,
    explanation:
      "CPS scheme assessment takes time — initial application processing 2-3 weeks; on-site assessment 4-8 weeks after application; certification issued after passing assessment. If you wait until you have notifiable work to do, you'll either lose those jobs to competitors or have to notify building control per-job at higher cost. Apply during the pre-launch period; assessment can happen on early notifiable jobs.",
  },
  {
    id: 5,
    question: 'What is Professional Indemnity insurance and when do electricians typically need it?',
    options: [
      'Cover for tools and equipment.',
      "Insurance covering claims arising from professional advice, designs, specifications or instructions that cause financial loss. Electricians need it when providing design services, specifications, technical advice, or any advisory work beyond pure installation.",
      'Cover for vehicle damage.',
      'Cover for personal illness.',
    ],
    correctAnswer: 1,
    explanation:
      "Professional Indemnity (PI) covers economic loss from advice or design errors — distinct from Public Liability (which covers injury/property damage from your physical work). Pure installers doing follow-the-design work may not need PI. Electricians offering design services, EV / PV system design, or commercial advisory roles typically need PI — £1m minimum, £2m+ for larger commercial work. Cost typically £300-700/year on top of Public Liability.",
  },
  {
    id: 6,
    question: 'What records must you keep as a self-employed electrician?',
    options: [
      'Just your bank statements.',
      "All business income (invoices issued, payments received), all business expenses (receipts, invoices), bank statements, mileage records if claiming vehicle expenses, capital purchases (tools, equipment, vehicle). Keep for at least 5 years after the 31 January filing deadline.",
      'Only large transactions over £1,000.',
      "Records are optional for sole traders.",
    ],
    correctAnswer: 1,
    explanation:
      "HMRC's record-keeping requirement for sole traders: at least 5 years after the 31 January filing deadline for the tax year. For 2025-26 tax year (filed January 2027), keep records until at least January 2032. Limited companies must keep records 6 years under the Companies Act 2006. Cloud accounting software with receipt-capture is the modern best practice; paper records still acceptable but harder for Making Tax Digital compliance.",
  },
  {
    id: 7,
    question: 'When must you register for VAT?',
    options: [
      'Immediately on starting business.',
      "When your VAT-taxable turnover crosses the HMRC threshold over the previous rolling 12 months (currently £90,000; check the live figure) — or when you reasonably expect to cross it in the next 30 days.",
      "When you've worked for 2 years.",
      'Only when you have employees.',
    ],
    correctAnswer: 1,
    explanation:
      "VAT registration is triggered by rolling-12-month turnover. Once you cross the threshold, you must register within 30 days. Voluntary registration is allowed below the threshold — typically chosen by firms whose customers are VAT-registered businesses (they reclaim the VAT; you reclaim your input VAT). Domestic-focused sole traders often deliberately stay below the threshold; commercial-focused firms often register voluntarily to reclaim input VAT.",
  },
  {
    id: 8,
    question: 'What is the ICO and why do most self-employed electricians need to register with it?',
    options: [
      'A trade association for electricians.',
      "The Information Commissioner's Office — the UK regulator for data protection. Most businesses processing personal data (customer names, addresses, phone numbers, photos) must register and pay the annual data protection fee (£40-60 for small businesses).",
      'A scheme for low-cost insurance.',
      'A government-grant administrator.',
    ],
    correctAnswer: 1,
    explanation:
      "If you hold customer names, addresses, phone numbers, photos of property, or any personal data — you're processing personal data under UK GDPR and the Data Protection Act 2018. The ICO data protection fee is mandatory for most businesses doing this; small businesses pay the lowest tier (~£40/year). Registration takes 10 minutes online at ico.org.uk. Non-registration is widely missed by small contractors and attracts penalties up to £4,350.",
  },
];

const faqs = [
  {
    question: 'How quickly can I be fully set up as a self-employed electrician?',
    answer:
      "Realistic timeline: 6-8 weeks from decision to first job. Critical-path items: CPS scheme application (4-8 weeks for assessment); UTR issuance (1-3 weeks); insurance (1-3 days); business banking (same day to 1 week); van signwriting (1-2 weeks). Most other steps (HMRC registration, ICO, accounting software, Google Business Profile) take hours not weeks. Treat the 6-8 week timeline as the realistic minimum if you want to be fully set up rather than scrambling on day one.",
  },
  {
    question: 'Do I need to give up my employment immediately or can I start side-by-side?',
    answer:
      "Many electricians start side-by-side — keeping the employment while building the self-employed work in evenings and weekends — and transition full-time once the self-employed income is reliable. Practical considerations: check your employment contract for moonlighting clauses (many forbid competing work); declare both income streams on Self Assessment; the £1,000 trading allowance covers very small side income but most contractor work crosses that fast. Tell HMRC; the structure is normal.",
  },
  {
    question: 'Should I register for VAT voluntarily from the start?',
    answer:
      "Depends on your customer base. If your customers are mainly other VAT-registered businesses (commercial firms, building contractors, other trades), voluntary VAT registration is usually beneficial — they reclaim the VAT you charge, costing them nothing, and you reclaim VAT on your van, tools, fuel, materials and overheads. If your customers are mainly domestic homeowners who can't reclaim VAT, voluntary registration adds 20% to your prices for no benefit — most contractors avoid it until forced by the threshold. Mixed customer base: model the maths and decide.",
  },
  {
    question: "Can I claim my van and home office expenses?",
    answer:
      "Yes, with proper records. Vehicle: either claim actual costs (proportion of purchase, finance, fuel, MOT, repairs, insurance, road tax — apportioned for business vs personal use) or the simplified mileage allowance (45p/mile for first 10,000 business miles, 25p thereafter). Most contractors use the mileage method. Home office: if you genuinely use part of your home for the business, you can claim a proportion of utilities or the simplified £6/week working-from-home flat rate. Keep mileage records as you go — backfilling 12 months in January is painful.",
  },
  {
    question: 'What about pension contributions as a self-employed electrician?',
    answer:
      "Self-employed people don't have auto-enrolment but can (and should) set up a personal pension. Options: SIPP (Self-Invested Personal Pension) for hands-on investors; standard personal pension via providers like AJ Bell, Vanguard, Hargreaves Lansdown; or NEST if you've previously been auto-enrolled. Contributions get income tax relief (basic rate added automatically; higher rate claimed via Self Assessment). Annual allowance currently £60,000 (subject to earnings cap). Default to setting up at least a modest pension early; the state pension alone is well below most working incomes.",
  },
  {
    question: 'How do I handle holidays and sick days as a sole trader?',
    answer:
      "There's no paid leave — every day not worked is a day not earning. Build it into your charge-out rate calculation: assume 220 chargeable days per year (out of 365, less weekends, less 4 weeks holiday, less 1-2 weeks for sickness / training / admin days). This means your daily rate must support the unchargeable days. Build a 1-3 month cash reserve so a flu week or a slow December doesn't trigger a cash-flow crisis. Critical illness cover or income protection insurance is worth considering for serious illness scenarios.",
  },
  {
    question: "What's IR35 and does it apply to me?",
    answer:
      "IR35 (off-payroll working rules) applies when a contractor provides services through their own limited company to a client in a way that resembles employment more than genuine self-employment. The client (for medium/large clients) or the contractor (for small clients) determines IR35 status; if 'inside IR35', tax and NI are deducted as if employed. Pure sole-trader work for domestic customers is generally outside IR35 scope. Limited-company subcontractors working for a single main contractor on long-term arrangements are most exposed. Get advice if you're going Ltd to subcontract through.",
  },
  {
    question: 'What insurance package do you actually need on day one?',
    answer:
      "Minimum day-one stack for a sole trader: Public Liability (£2-5m, ~£200-500/yr); commercial vehicle insurance for the van (~£800-2,000/yr depending on age / area / record); Tools-in-Transit or Goods-in-Vehicle cover (~£100-300/yr for £5-15k tools); CPS scheme requirement is usually £2m PL minimum. Add Employers' Liability the moment you take on anyone, even an apprentice or a casual labourer (~£300-500/yr). Add Professional Indemnity if you do design / advisory work (~£300-700/yr). Trade-specialist brokers (Simply Business, Tradesman Saver, Hiscox) often package these competitively.",
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
            onClick={() => navigate('/study-centre/apprentice/level3-module7-section5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 5
          </button>

          <PageHero
            eyebrow="Module 7 · Section 5 · Subsection 3"
            title="Setting up as a self-employed electrician"
            description="The first-day setup — UTR application, Self Assessment registration, National Insurance, the insurance stack, banking, accounting, CPS scheme and ICO data protection."
            tone="blue"
          />

          <TLDR
            points={[
              "Register with HMRC for Self Assessment within 3 months of starting trade — formally by 5 October after the end of the tax year. UTR issued 1-3 weeks.",
              "Self-employed NI: Class 2 (flat weekly amount via Self Assessment) + Class 4 (% of profits over threshold).",
              "Day-one insurance stack: Public Liability (£2-5m), commercial vehicle, Tools-in-Transit. Employers' Liability becomes legally compulsory the moment you employ anyone — Compulsory Insurance Act 1969.",
              "ICO data protection registration is widely missed by sole traders — ~£40/yr, mandatory if you hold customer personal data (almost certainly do).",
              "CPS scheme application: 4-8 weeks for initial assessment. Apply during the 6-week pre-launch period; don't wait until you have notifiable work to do.",
              "Set aside 25-30% of every payment for tax. Payment-on-account in January of year 2 is the single biggest cash shock for new sole traders.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Maps to C&G 2365-03 / Unit 308 / LO3 — identify the requirements for becoming self-employed.",
              "Describe the HMRC Self Assessment registration process and the role of the UTR.",
              "State the National Insurance classes that apply to self-employed electricians (Class 2 and Class 4).",
              "Identify the legally compulsory and practically essential insurances and the typical cover levels.",
              "Plan the CPS scheme application timing to align with the launch of the business.",
              "Describe the data-protection (ICO) registration obligation that applies to most sole traders.",
              "Build a realistic 6-8 week pre-launch checklist covering registration, insurance, banking, accounting, scheme and marketing setup.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>HMRC registration and tax</ContentEyebrow>

          <ConceptBlock
            title="Self Assessment registration and the UTR"
            plainEnglish="Every self-employed individual must register with HMRC for Self Assessment within 3 months of starting to trade. Formal deadline: 5 October following the end of the tax year (6 April-5 April) in which you started. Registration is online at gov.uk; takes ~15 minutes; needs your NI number, personal details, business start date and basic business info. HMRC issues a Unique Taxpayer Reference (UTR) — a 10-digit number — by post within 1-3 weeks. A separate activation code arrives separately for online filing. You can't file your annual return without the UTR. Penalty for late registration: £100 immediate, plus percentage of any tax due."
            onSite="Register early in the pre-launch period — you want the UTR in hand well before the first 31 January tax deadline rolls around. The activation code arrives separately from the UTR; don't lose either. If you started trading in May 2026, your first tax return covers 6 April 2026-5 April 2027, filed online by 31 January 2028, tax payment due 31 January 2028. Diary the date now."
          >
            <p>
              The HMRC self-employed registration sequence:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Register online</strong> at gov.uk &mdash; takes 15 minutes.
              </li>
              <li>
                <strong>UTR issued by post</strong> &mdash; 1-3 weeks.
              </li>
              <li>
                <strong>Activation code by separate post</strong> &mdash; 1-2 weeks after UTR.
              </li>
              <li>
                <strong>Activate online account</strong> &mdash; can then log in and view tax position.
              </li>
              <li>
                <strong>Annual return filing</strong> &mdash; by 31 January after each tax year end.
              </li>
              <li>
                <strong>Tax payment</strong> &mdash; 31 January (balancing payment + first payment on account for next year); 31 July (second payment on account).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="National Insurance — Class 2 and Class 4 for the self-employed"
            plainEnglish="Self-employed sole traders pay two classes of NI. Class 2 is a flat weekly amount (currently around £3.45/week, ~£180/year — check current rate as it adjusts annually); paid via Self Assessment for tax years from 2024-25 onwards (previously paid via direct debit). Class 4 is a percentage of profits over a threshold (currently 6% on profits between £12,570 and £50,270, then 2% above £50,270 — rates and thresholds adjust annually). Class 4 is the larger amount for most working contractors. Both are calculated and paid as part of the Self Assessment process; HMRC works out the amounts from your declared profits."
            onSite="When budgeting tax-savings (25-30% of payments received), this covers both income tax and Class 4 NI. Class 2 NI is small but matters for State Pension qualifying years — make sure your profits are above the Small Profits Threshold or that you've voluntarily paid Class 2 if profits are low, otherwise you miss qualifying years. The State Pension currently needs 35 qualifying years for the full amount; missing years can be made up with voluntary Class 3 contributions."
          >
            <p>
              NI summary for self-employed:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Class 2</strong> &mdash; flat weekly amount, ~&pound;180/year, paid via Self Assessment.
              </li>
              <li>
                <strong>Class 4</strong> &mdash; percentage of profits over the lower limit, capped at the upper limit.
              </li>
              <li>
                <strong>State Pension qualifying years</strong> &mdash; Class 2 secures these; check your record at gov.uk.
              </li>
              <li>
                <strong>Class 3 (voluntary)</strong> &mdash; fill gaps in NI record to qualify for full State Pension.
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

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The insurance stack</ContentEyebrow>

          <ConceptBlock
            title="Public Liability — practically essential even though not legally compulsory"
            plainEnglish="Public Liability (PL) insurance covers third-party claims for bodily injury or property damage caused by your work or business activities. Not legally compulsory in itself — but practically essential. Most commercial clients won't engage you without PL; CPS schemes require it as a registration condition (typically £2m minimum); main contractors often require £5m or £10m. A single claim without cover could easily exceed the entire net worth of a small contracting business. Typical cover levels: £2m for small domestic-only sole traders; £5m for most working contractors; £10m for those working on larger commercial sites. Premium typically £200-700/year for a sole trader."
            onSite="Compare quotes from trade-specialist brokers (Simply Business, Tradesman Saver, Hiscox, Direct Line for Business) rather than generic insurers — trade brokers understand the electrical-specific exposures and usually price more competitively. Pay annually rather than monthly where you can afford it (saves typically 10-15%). Read the policy excess and exclusions carefully; some policies exclude specific scopes (hot works, working at height beyond a height threshold, etc.) that you may need adding."
          >
            <p>
              Public Liability practicalities:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cover level</strong>: &pound;2m minimum, &pound;5m typical, &pound;10m for larger commercial work.
              </li>
              <li>
                <strong>Premium</strong>: &pound;200-700/yr for a sole trader; more if employing or higher turnover.
              </li>
              <li>
                <strong>Excess</strong>: typically &pound;250-500 per claim; higher excess = lower premium.
              </li>
              <li>
                <strong>Exclusions</strong>: check for hot works, height limits, specialist work scopes.
              </li>
              <li>
                <strong>Run-off cover</strong>: needed if you stop trading &mdash; covers claims arising after cessation.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Employers' Liability — legally compulsory the moment you employ"
            plainEnglish="Employers' Liability (EL) is the only legally compulsory insurance for businesses with employees, under the Employers' Liability (Compulsory Insurance) Act 1969. It covers claims by employees who suffer injury or illness in the course of their work. Statutory minimum cover £5m; most package policies provide £10m. The penalty for trading without valid EL: up to £2,500 per day. The certificate must be displayed where employees can see it (notice board or accessible electronic copy). 'Employee' in this context is broad — full-time, part-time, casual, apprentice, family member working in the business all trigger the obligation. The day you take on an apprentice, you need EL from day one of their employment."
            onSite="EL applies even to non-paid family workers in some interpretations of the Act — talk to the HSE or your broker if in doubt. Subcontractors who work under their own self-employment usually don't trigger EL (they should carry their own PL) — but the line between 'subcontractor' and 'employee' is HMRC's view, not yours; sham self-employment can trigger retrospective EL liability. Use proper CIS subcontract arrangements rather than off-books cash payments to genuine subbies."
          >
            <p>
              Employers&apos; Liability rules:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Legally compulsory</strong> if you employ anyone &mdash; the 1969 Act.
              </li>
              <li>
                <strong>Minimum &pound;5m statutory cover</strong> &mdash; &pound;10m typically supplied.
              </li>
              <li>
                <strong>Certificate displayed</strong> &mdash; where employees can see it.
              </li>
              <li>
                <strong>Penalty for non-compliance</strong> &mdash; up to &pound;2,500/day; HSE enforces.
              </li>
              <li>
                <strong>Broad &quot;employee&quot; definition</strong> &mdash; full-time, part-time, casual, apprentice, family worker.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Tools-in-Transit, Goods-in-Vehicle, Professional Indemnity — the supporting cover"
            plainEnglish="Beyond PL and EL, the typical supporting insurances: Tools-in-Transit or Goods-in-Vehicle cover (insures tools and materials in your van against theft and damage — sole trader typical premium £100-300/yr for £5-15k cover; check for 'theft from unattended vehicle' exclusions, especially overnight); commercial vehicle insurance (treats the van as a business vehicle — required by law, typically £800-2,000/yr depending on age, area and driving record); Professional Indemnity (PI) covers claims arising from design or advice errors — typically needed if you do EV / PV / commercial system design; £300-700/yr for £1-2m cover; Personal Accident / Income Protection / Critical Illness insurance for the individual (not compulsory but worth considering for serious illness scenarios)."
            onSite="The trade-broker package deal is usually best value — PL + EL + Tools-in-Transit + Personal Accident in one policy typically beats sourcing each separately. Update the policy when business changes (turnover increases, new specialty added, employees hired) — failure to disclose material changes can void the policy."
          >
            <p>
              The supporting insurance stack:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Tools-in-Transit / Goods-in-Vehicle</strong> &mdash; theft and damage cover for tools in van.
              </li>
              <li>
                <strong>Commercial vehicle insurance</strong> &mdash; legally required for vehicle use.
              </li>
              <li>
                <strong>Professional Indemnity</strong> &mdash; design and advice errors.
              </li>
              <li>
                <strong>Personal Accident</strong> &mdash; cover if you can&apos;t work due to injury.
              </li>
              <li>
                <strong>Income Protection</strong> &mdash; monthly income replacement if illness keeps you off work long-term.
              </li>
              <li>
                <strong>Critical Illness</strong> &mdash; lump-sum payout on specified diagnoses.
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

          <RegsCallout
            source="Employers' Liability (Compulsory Insurance) Act 1969 — Section 1"
            clause={
              <>
                <p className="mb-2">
                  &quot;Every employer carrying on any business in Great Britain shall insure, and
                  maintain insurance, under one or more approved policies with an authorised
                  insurer or insurers against liability for bodily injury or disease sustained by
                  his employees, and arising out of and in the course of their employment in
                  Great Britain in that business.&quot;
                </p>
                <p className="mt-2">
                  Minimum statutory cover &pound;5,000,000. The certificate must be displayed
                  where employees can see it. Penalty for trading without cover: up to &pound;2,500
                  per day.
                </p>
              </>
            }
            meaning={
              <>
                EL is the only legally compulsory insurance for the typical employer. The moment
                you employ anyone &mdash; apprentice, part-time, casual, family worker &mdash;
                the Act applies. Most package policies provide &pound;10m cover (the &pound;5m
                statutory minimum is the floor). HSE enforces. Don&apos;t employ anyone without
                the certificate in hand on day one.
              </>
            }
            cite="Source: Employers' Liability (Compulsory Insurance) Act 1969, s.1; Employers' Liability (Compulsory Insurance) Regulations 1998 (SI 1998/2573)."
          />

          <RegsCallout
            source="Data Protection Act 2018 / UK GDPR — registration with ICO"
            clause={
              <>
                <p className="mb-2">
                  Under the Data Protection (Charges and Information) Regulations 2018, most
                  businesses processing personal data must pay an annual data protection fee to
                  the Information Commissioner&apos;s Office (ICO). Tiered by size:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-[14px]">
                  <li>Tier 1 (small organisations): &pound;40 &mdash; turnover &lt; &pound;632k AND fewer than 11 staff.</li>
                  <li>Tier 2 (medium): &pound;60.</li>
                  <li>Tier 3 (large): &pound;2,900.</li>
                </ul>
                <p className="mt-2">
                  Sole traders processing personal data (customer names, addresses, phone numbers,
                  photos identifying property) fall under Tier 1 in most cases. Penalty for
                  non-registration: up to &pound;4,350.
                </p>
              </>
            }
            meaning={
              <>
                ICO registration is widely missed by small contractors. Almost every electrical
                business holds customer personal data (names, addresses, phone numbers) &mdash;
                that triggers the obligation. &pound;40/year for a small sole trader. Application
                is online at ico.org.uk and takes 10 minutes. Don&apos;t skip this.
              </>
            }
            cite="Source: Data Protection Act 2018; UK GDPR; Data Protection (Charges and Information) Regulations 2018 (SI 2018/480)."
          />

          <SectionRule />

          <ContentEyebrow>Banking, accounting, scheme and ICO</ContentEyebrow>

          <ConceptBlock
            title="Separate business banking and cloud accounting from day one"
            plainEnglish="A separate business bank account is essential from day one — cleaner records, easier tax preparation, more professional impression on clients (your invoice shows a business account name not 'Joe Smith'), required by many CPS schemes and insurers. For sole traders, the account doesn't have to be a 'business' account specifically — a separate personal account in your name dedicated to business use is allowed, though most banks require a business account if it's clearly business. Challenger banks (Starling, Tide, Mettle, Monzo Business) offer free or low-cost business accounts opened in a day, with cloud-accounting integration built in. Cloud accounting software (Xero, QuickBooks Self-Employed, FreeAgent — typically £10-30/month) auto-syncs with the bank account, captures receipts via app, tracks VAT (when applicable), produces the Self Assessment numbers automatically."
            onSite="Set up the bank account and accounting software before the first job — not after. Migrating from 'all in one personal account, untracked' to proper records at the end of year 1 is hours of pain and error-prone. Spend an hour setting it up cleanly from the start; it saves dozens of hours later. Most accountants now insist on cloud accounting as a condition of working with them."
          >
            <p>
              Banking and accounting setup checklist:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Open a business or dedicated personal bank account for business use.</li>
              <li>Sign up for cloud accounting software (FreeAgent / Xero / QuickBooks Self-Employed).</li>
              <li>Connect the bank account to the accounting software for auto-feed.</li>
              <li>Install a receipt-capture app (Dext, Receipt Bank, or native software feature).</li>
              <li>Set up customer-quote and invoice templates with your business details.</li>
              <li>Decide tax-savings split (~25-30% of net into a separate savings account).</li>
              <li>Choose an accountant (interview 2-3; check trade-specialism and price).</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="CPS scheme application — apply before launch, not after the first notifiable job"
            plainEnglish="If you'll do any Part P notifiable domestic work, you need either CPS scheme membership or per-job building-control notification. Per-job is dramatically more expensive at any volume (~£200-400 per notification vs ~£500/year for full scheme membership). Pick a scheme (NICEIC, NAPIT, ELECSA, STROMA — see Module 7.4.5 for the comparison); apply 4-8 weeks before you need to be doing notifiable work; the scheme assessor will visit, audit your test equipment and documentation, and either certify or require remediation. Once certified you can self-certify your own notifiable work."
            onSite="Trap to avoid: applying after you've already started taking on notifiable work. The scheme will want to see one or more pre-assessment installations to audit — you need work-in-progress to assess. Plan it: line up a couple of small notifiable jobs in the pre-application period; have those jobs ready for the assessor to inspect; complete the assessment; pass; then certify on the scheme going forward. Some schemes allow provisional certification while assessment is in progress; check what your chosen scheme offers."
          >
            <p>
              CPS scheme application sequence:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Week 1-2</strong> &mdash; pick scheme; submit application online.
              </li>
              <li>
                <strong>Week 2-3</strong> &mdash; scheme processes application; requests evidence (qualifications, insurance, equipment calibration).
              </li>
              <li>
                <strong>Week 3-6</strong> &mdash; line up suitable pre-assessment installations.
              </li>
              <li>
                <strong>Week 6-8</strong> &mdash; scheme assessor visits; inspects work, equipment and documentation.
              </li>
              <li>
                <strong>Week 8-10</strong> &mdash; certification issued; you can now self-certify notifiable work.
              </li>
              <li>
                <strong>Annual</strong> &mdash; surveillance assessment; CPD evidence; scheme fee renewal.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="ICO data protection — the registration most sole traders miss"
            plainEnglish="If you process personal data — and you almost certainly do (customer names, addresses, phone numbers, email addresses, photos that identify property) — you must register with the Information Commissioner's Office under the Data Protection (Charges and Information) Regulations 2018. Small businesses (turnover < £632k AND fewer than 11 staff) pay the Tier 1 fee of £40/year. Registration is online at ico.org.uk; takes 10 minutes; renews annually. Failure to register can attract penalties up to £4,350. This obligation is widely missed by small contractors — don't be one of them. Beyond paying the fee, the UK GDPR / DPA 2018 framework also requires you to handle personal data lawfully — have a privacy notice, keep data secure, allow data-subject access requests, report breaches within 72 hours."
            onSite="Set up a basic privacy notice on your website (if you have one) and include a reference to it on your invoices and quotes. Template privacy notices are widely available; ICO publishes a small-business template. Don't share customer data with third parties without consent or lawful basis. Don't hold customer data longer than needed (typical: 5-6 years for tax / certificate purposes; longer if certification or warranty period extends)."
          >
            <p>
              ICO registration checklist:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Register at ico.org.uk &mdash; 10 minutes online.</li>
              <li>Pay the &pound;40 small-business annual fee.</li>
              <li>Renew annually.</li>
              <li>Maintain a privacy notice (template available from ICO).</li>
              <li>Keep customer data secure (encrypted phone / laptop; strong passwords).</li>
              <li>Respect data-subject rights &mdash; access requests, correction, deletion.</li>
              <li>Report serious data breaches to ICO within 72 hours.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Forgetting to register for Self Assessment until the year-1 tax return is overdue"
            whatHappens={
              <>
                Apprentice goes self-employed in May 2026, gets busy, doesn&apos;t register with HMRC.
                December 2027 comes round; they realise they should have registered. Apply now: UTR
                arrives in late January 2028. By that point, their 2026-27 tax return was due 31
                January 2028 &mdash; missed. Initial &pound;100 late-filing penalty plus daily
                penalties after 3 months; potential late-registration penalty as a percentage of tax
                due; year-1 tax bill + interest + payments-on-account all hitting the cash flow at
                once. Stressful and avoidable.
              </>
            }
            doInstead={
              <>
                Register with HMRC for Self Assessment in the pre-launch period &mdash; weeks 5-6
                before going live. UTR arrives in 1-3 weeks; activation code in a similar window.
                You&apos;re set up well before any tax deadline. Set up a 25-30% tax-savings transfer
                from every payment received. The first January tax bill should arrive when you have
                the money already aside &mdash; no crisis.
              </>
            }
          />

          <CommonMistake
            title="Trading without ICO data-protection registration — easy to fix, easy to miss"
            whatHappens={
              <>
                Sole trader runs for 3 years; never registers with ICO; holds customer details
                routinely. ICO does a sweep of unregistered trade contractors; serves a fixed
                penalty (typically a couple of thousand pounds at the lower end). Contractor pays
                the penalty, registers, and is irritated &mdash; the registration was &pound;40/year
                that they would have paid willingly if they&apos;d known.
              </>
            }
            doInstead={
              <>
                Register with ICO in the pre-launch checklist. &pound;40/year; 10 minutes. Set a
                calendar reminder for the annual renewal. Set up the privacy notice template at the
                same time. It&apos;s one of the easier compliance items but widely missed by small
                contractors.
              </>
            }
          />

          <Scenario
            title="Your first January tax return — what happens?"
            situation={
              <>
                You went self-employed in May 2026. By 31 January 2028 your first Self Assessment
                tax return is due. You had &pound;55,000 of profit in the 2026-27 tax year (6 April
                2026-5 April 2027). What do you actually owe and when?
              </>
            }
            whatToDo={
              <>
                <strong>Step 1 &mdash; file the return</strong>. Online via gov.uk with your UTR.
                Most cloud accounting software (FreeAgent, QuickBooks Self-Employed) pre-populates
                the figures and submits direct to HMRC. Deadline: 31 January 2028.
                <br /><br />
                <strong>Step 2 &mdash; calculate the bill</strong>. On &pound;55,000 profit
                (approximate figures &mdash; rates and thresholds adjust annually):
                <ul className="space-y-1 list-disc pl-5 mt-2 text-[14px]">
                  <li>Personal allowance &pound;12,570 (no tax).</li>
                  <li>Basic rate 20% on profit &pound;12,570-&pound;50,270 &asymp; &pound;7,540.</li>
                  <li>Higher rate 40% on profit &pound;50,270-&pound;55,000 &asymp; &pound;1,892.</li>
                  <li>Income tax total &asymp; &pound;9,432.</li>
                  <li>Class 4 NI 6% on profits &pound;12,570-&pound;50,270 &asymp; &pound;2,262.</li>
                  <li>Class 4 NI 2% on profits &pound;50,270-&pound;55,000 &asymp; &pound;95.</li>
                  <li>Class 2 NI flat rate &asymp; &pound;180/year.</li>
                  <li><strong>Year-1 balancing payment &asymp; &pound;11,969.</strong></li>
                </ul>
                <br />
                <strong>Step 3 &mdash; payments on account</strong>. Plus 50% of year-1 tax as
                first payment on account for 2027-28 &asymp; &pound;5,984. <strong>Total due 31
                January 2028 &asymp; &pound;17,953.</strong>
                <br /><br />
                <strong>Step 4 &mdash; second payment on account</strong>. Second 50% payment on
                account due 31 July 2028 &asymp; &pound;5,984.
                <br /><br />
                <strong>Step 5 &mdash; reconcile next January</strong>. In January 2029 you file
                the 2027-28 return; balancing payment is the actual 2027-28 tax minus the
                &pound;11,969 already paid on account; new payments on account for 2028-29 are 50%
                of the actual 2027-28 tax.
                <br /><br />
                <strong>Cash-planning implication</strong>: by 31 January 2028 you need
                &pound;17,953 in the tax savings account, not &pound;11,969. The payments-on-account
                feature catches many new sole traders out &mdash; it&apos;s effectively paying 150% of
                year-1 tax in January of year 2. Plan for it explicitly.
              </>
            }
            whyItMatters={
              <>
                The first January tax bill is the single biggest financial event for new sole
                traders. Plan for the full amount (balancing payment + first payment on account)
                rather than just the year-1 amount. The 25-30% tax-savings habit through the year
                covers this comfortably if maintained from day one; ignoring the payment-on-account
                until it lands creates a cash crisis. Apprentices going self-employed: bake this
                into your year-1 financial plan; ask your accountant to walk through the numbers
                with you in October so there are no surprises in January.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Register for Self Assessment with HMRC within 3 months of starting trade — formal deadline 5 October after the end of the tax year. UTR issued 1-3 weeks.",
              "Self-employed NI: Class 2 (flat weekly, ~£180/yr) + Class 4 (% of profits over threshold). Both paid via Self Assessment.",
              "Day-one insurance: Public Liability (£2-5m, ~£200-700/yr), commercial vehicle, Tools-in-Transit. Add Employers' Liability the moment you employ anyone — Compulsory Insurance Act 1969 makes it mandatory.",
              "Professional Indemnity needed if you do design / advice work — £300-700/yr for £1-2m cover.",
              "ICO data protection registration is mandatory if you process personal data (almost everyone); £40/yr small-business tier; widely missed.",
              "CPS scheme application: 4-8 weeks for initial assessment. Apply during the 6-week pre-launch period.",
              "Separate business banking + cloud accounting + receipt-capture app from day one. Migrating later is expensive in time.",
              "Set aside 25-30% of every payment for tax. Year-2 January bill includes 150% of year-1 tax (balancing payment + first payment on account).",
            ]}
          />

          <Quiz title="Setting up self-employed — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module7-section5-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                5.2 Running your own business
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module7-section5-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.4 Pricing and estimating
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
