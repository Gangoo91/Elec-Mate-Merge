/**
 * Module 1 · Section 5 · Subsection 3 — HSE Sentencing Council Definitive Guideline
 * Maps to C&G 2365-03 / Unit 201 — supplementary depth (beyond AC framework)
 * Layered depth from 2357 Unit 601 ELTK01 — depth on enforcement consequences
 */
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import { TLDR, ConceptBlock, RegsCallout, CommonMistake, Scenario, KeyTakeaways, FAQ, LearningOutcomes, ContentEyebrow, SectionRule } from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Sentencing Council Definitive Guideline | Level 3 Module 1.5.3 | Elec-Mate';
const DESCRIPTION = 'L3 depth on the 2016 Sentencing Council guideline — culpability x harm x turnover matrix; corporate fines and personal sentences.';

const checks = [
  { id: 'l3-m1-s5-sub3-matrix', question: 'Three inputs to the corporate fine matrix?', options: ['Random.', 'Culpability (Very High / High / Medium / Low) x Harm (Cat 1/2/3 with adjustments) x Turnover band (Large £50m+ / Medium £10-50m / Small £2-10m / Micro <£2m).', 'Customer x Date x Time.', 'One input.'], correctIndex: 1, explanation: 'Three inputs; cell gives starting point and range. Adjusted for aggravating and mitigating factors.' },
  { id: 'l3-m1-s5-sub3-individual', question: 'Can individuals receive custody under the guideline?', options: ['Never.', 'Yes — for high-culpability cases the individual sentencing matrix includes immediate custody. Director liability under HASAWA s.37 plus operative liability under s.7 in serious cases.', 'Only directors.', 'Only on weekends.'], correctIndex: 1, explanation: 'Individual sentences include custody at top end. Knowing this changes how senior conversations land.' },
  { id: 'l3-m1-s5-sub3-aggravating', question: 'Name two aggravating factors that push fines up.', options: ['None exist.', 'Cost-cutting at the expense of safety; failure to heed warnings; targeting of vulnerable victims; deliberate concealment; poor safety record; risk of multiple persons; failure to react to warnings; obstruction of investigation.', 'Customer mood.', 'Random.'], correctIndex: 1, explanation: 'Long list of aggravating factors. Knowing them informs the firm\'s incident response (no concealment, full cooperation, prompt remedial = mitigating).' },
];

const quizQuestions = [
  { id: 1, question: 'When was the Sentencing Council Definitive Guideline published?', options: ['1974.', '2016 — for Health and Safety Offences, Corporate Manslaughter and Food Safety and Hygiene Offences. Significant impact on fine levels (much higher than pre-2016).', '2000.', '2030.'], correctAnswer: 1, explanation: '2016 onwards. Pre-2016 fines often <£20k; post-2016 routinely six-figure to multi-million for major corporations.' },
  { id: 2, question: 'Define "very high" culpability.', options: ['Anything.', 'Deliberate breach of, or flagrant disregard for, the law. Knew about hazard and ignored it; knowingly used unsafe procedures; deliberate cost-cutting that caused exposure.', 'Just oversight.', 'Customer choice.'], correctAnswer: 1, explanation: 'Very high = deliberate. Top of the matrix; highest sentences.' },
  { id: 3, question: 'Define "Category 1 harm".', options: ['Minor.', 'Death OR physical or mental impairment resulting in lifelong dependency on third party care for basic needs OR significantly reduced life expectancy.', 'Mild.', 'Recoverable.'], correctAnswer: 1, explanation: 'Cat 1 = most serious; permanent / fatal. Different starting fine; range escalates.' },
  { id: 4, question: 'How is the turnover band determined?', options: ['Profit.', 'Annual turnover (revenue). Large = £50m+; Medium = £10m-£50m; Small = £2m-£10m; Micro = under £2m. Some "very large" companies have separate higher band where turnover greatly exceeds £50m.', 'Tax paid.', 'Number of employees.'], correctAnswer: 1, explanation: 'Turnover (not profit). Large electrical contractors regularly hit Medium / Large band.' },
  { id: 5, question: 'What\'s the highest cell of the matrix?', options: ['£100k.', 'Very High culpability x Cat 1 harm x Large/Very Large turnover. Starting points around £4m-£10m+; range up to £20m+. Examples: Whirlpool £15m (corporate manslaughter), Foodles Production £1.6m (Star Wars set injury — smaller turnover band).', '£500.', '£10.'], correctAnswer: 1, explanation: 'Top cell into the millions. Corporate manslaughter under CMCHA 2007 has unlimited fines and average ~£5-10m.' },
  { id: 6, question: 'What aggravating factors push fines UP?', options: ['Helping the HSE.', 'Cost-cutting motive; failure to heed warnings; risk to multiple persons; targeting vulnerable victims; poor previous safety record; deliberate concealment; obstruction of investigation; deliberate falsification of records.', 'Honest cooperation.', 'Quick remedial.'], correctAnswer: 1, explanation: 'Aggravating factors are well-defined; firms can avoid them by good incident response.' },
  { id: 7, question: 'What mitigating factors push fines DOWN?', options: ['Bad cooperation.', 'Early plea; prompt remedial action; full cooperation with investigation; no previous record; safety culture demonstrated; charity for victims; senior management changes; good ongoing safety performance.', 'Hiding evidence.', 'Lying.'], correctAnswer: 1, explanation: 'Mitigating factors are equally well-defined. Good incident response demonstrably reduces sentences.' },
  { id: 8, question: 'Why is the guideline relevant to the L3 apprentice?', options: ['It isn\'t.', 'Because it informs the supervisor\'s framing — "the consequence cascade isn\'t hypothetical; it\'s structured by the Sentencing Council guideline; here\'s roughly where this incident would land". Plus director liability under s.37 + Sentencing Council means the L3\'s observations to senior management land with weight.', 'For the test only.', 'Customer wants.'], correctAnswer: 1, explanation: 'L3 supervisor framing — the cascade is real, structured, and personal at the top end.' },
];

const faqs = [
  { question: 'Can the firm\'s insurance pay the criminal fine?', answer: 'No. Public Liability and Employer\'s Liability insurance does NOT cover criminal fines. Insurance can cover legal defence costs, civil compensation, rehabilitation - but not the fine itself. Criminal fines come off the firm\'s bottom line.' },
  { question: 'How much do larger HSE prosecutions cost overall?', answer: 'Fine + FFI + legal defence + civil claims + lost contracts + reputation damage + insurance premium increases. Total often 3-5x the fine alone for serious cases.' },
  { question: 'Are personal sentences under s.37 commonly applied?', answer: 'Increasingly common. The HSE actively pursues s.37 alongside corporate charges where culpability is high. Custodial sentences for directors are no longer rare.' },
  { question: 'How does corporate manslaughter (CMCHA 2007) differ from HASAWA?', answer: 'CMCHA = corporate offence where activities cause death AND amount to gross breach of duty AND breach is due to the way senior management organised activities. Triable on indictment only; unlimited fines; publicity orders; remedial orders. Sits ALONGSIDE HASAWA charges, not as replacement.' },
  { question: 'Does pleading early really reduce the sentence?', answer: 'Yes — up to 1/3 reduction for guilty plea at first opportunity, sliding down to 1/4 at start of trial, 1/10 once trial begins. Significant; encourages early acceptance.' },
  { question: 'What\'s a "publicity order"?', answer: 'Court order requiring the convicted firm to publish details of conviction. Used in CMCHA cases. Reputational impact often greater than the fine.' },
  { question: 'How is "very large" turnover handled in the Guideline?', answer: 'The Guideline notes that &quot;where an offending organisation\'s turnover or equivalent very greatly exceeds the threshold for large organisations, it may be necessary to move outside the suggested range to achieve a proportionate sentence&quot;. For very-large multinational corporations the courts have used this latitude — Whirlpool, Network Rail, and others have received fines in the millions reflecting their turnover scale.' },
  { question: 'What\'s the relationship between HASAWA prosecution and a coronial inquest?', answer: 'A coronial inquest investigates the cause of death in fatal cases; it is not a trial and does not determine criminal liability. However, the coroner can issue a Regulation 28 Prevention of Future Deaths report to organisations identified as having a role in the death. The HSE prosecution then runs separately under HASAWA / CMCHA. Both can run in parallel. The coronial process is generally less adversarial but the findings often inform the criminal prosecution.' },
  { question: 'What does a "publicity order" actually require?', answer: 'Under CMCHA 2007 the court can require the convicted organisation to publish, in a manner the court specifies, details of the conviction and the sentence. Typically published in trade press, national press, on the organisation&apos;s website, in annual report. The reputational impact is significant and is intended to be — Parliament made publicity orders available precisely to extend the consequence beyond the financial penalty.' },
  { question: 'Are HSE prosecutions and civil claims related?', answer: 'Yes — closely. The HSE prosecution establishes regulatory breach; the civil claim by injured parties / families establishes compensation. The criminal conviction is admissible evidence in subsequent civil proceedings. Insurance covers civil compensation subject to policy terms; insurance does NOT cover criminal fines. Civil settlement does NOT extinguish criminal prosecution; civil claim can proceed regardless of prosecution outcome.' },
];

export default function Sub3() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);
  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section5')} className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"><ArrowLeft className="h-4 w-4" /> Section 5</button>
          <PageHero eyebrow="Module 1 · Section 5 · Subsection 3" title="HSE Sentencing Council Definitive Guideline" description="Remember from Section 1.6 — the Sentencing Council guideline gives courts a structured matrix. At L3 the depth: knowing the matrix lets you communicate consequences to senior management with weight." tone="emerald" />
          <TLDR points={[
            "2016 Sentencing Council Definitive Guideline. Three-input matrix: Culpability x Harm x Turnover. Cells give starting points + ranges.",
            "Corporate fines now routinely six-figure to multi-million for serious cases. Insurance doesn't cover criminal fines.",
            "Individual sentences include custody at top end (HASAWA s.37 director / s.7 operative). Personal liability is real.",
            "Eight-step framework: offence category → starting point → adjustments → totality → compensation → reasons. The structure makes sentences predictable enough to use as conversation tools.",
            "CMCHA 2007 corporate manslaughter runs alongside HASAWA — unlimited fines, publicity orders, remedial orders.",
            "CDDA 1986 disqualification, FFI invoicing, civil claims, coronial inquests all run in parallel with the criminal prosecution.",
          ]} />
          <LearningOutcomes outcomes={[
            "State the year of the Sentencing Council Definitive Guideline (2016) and its scope.",
            "Identify the three matrix inputs: Culpability, Harm, Turnover.",
            "Describe the four culpability bands and three harm categories.",
            "Identify aggravating and mitigating factors.",
            "Recognise individual sentencing including custody.",
            "Apply the guideline framing to communicate consequences to senior management.",
          ]} initialVisibleCount={3} />

          <ContentEyebrow>The matrix in detail</ContentEyebrow>
          <ConceptBlock title="Three inputs, structured cells, starting points and ranges" plainEnglish="Culpability (Very High / High / Medium / Low). Harm (Cat 1 most serious / Cat 2 / Cat 3). Turnover (Large £50m+ / Medium £10-50m / Small £2-10m / Micro <£2m). Each combination gives a starting point and a range. Adjusted for aggravating / mitigating factors." onSite="Knowing the matrix exists lets you have informed conversations about consequence. The L3 doesn't memorise specific numbers but knows the framework.">
            <p>Culpability bands:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Very High</strong> — deliberate breach / flagrant disregard.</li>
              <li><strong>High</strong> — fell far short of appropriate standard, including systemic failure.</li>
              <li><strong>Medium</strong> — fell short of appropriate standard.</li>
              <li><strong>Low</strong> — failure was minor / isolated.</li>
            </ul>
            <p>Harm categories:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Category 1</strong> — death / lifelong dependency / significantly reduced life expectancy.</li>
              <li><strong>Category 2</strong> — physical / mental harm not amounting to Cat 1.</li>
              <li><strong>Category 3</strong> — harm short of Cat 2.</li>
              <li>Adjustments — risk of higher harm even if not materialised; multiple persons exposed.</li>
            </ul>
            <p>Turnover bands:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Large £50m+; Medium £10m-50m; Small £2m-10m; Micro under £2m. &quot;Very large&quot; exceeds £50m significantly.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="Sentencing Council Definitive Guideline 2016 — Health and Safety Offences" clause={<>"In setting a fine, the court must consider the financial circumstances of the offender. The fine must be sufficiently substantial to have a real economic impact which will bring home to both management and shareholders the need to comply with health and safety legislation."</>} meaning={<>The guideline explicitly aims for fines that have economic impact — not symbolic. For larger firms this means multi-million fines for serious cases. Insurance can&apos;t cover. Reputation damage compounds the financial impact.</>} cite="Source: Sentencing Council Definitive Guideline for Health and Safety Offences, Corporate Manslaughter and Food Safety and Hygiene Offences (2016) — published by Sentencing Council." />

          <InlineCheck {...checks[0]} />
          <InlineCheck {...checks[1]} />

          <SectionRule />
          <ContentEyebrow>Aggravating and mitigating factors</ContentEyebrow>
          <ConceptBlock title="What pushes fines up; what pushes them down" plainEnglish="The matrix gives starting point and range; aggravating and mitigating factors push within the range and beyond. Firms with good incident response (cooperation, prompt remedial, early plea, no concealment) routinely come out at the lower end; firms with poor response come out higher." onSite="The L3 supervisor's incident response (preserve scene, cooperate, document, escalate) directly contributes to the firm's mitigating factor profile.">
            <p>Aggravating factors:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Cost-cutting motive at expense of safety.</li>
              <li>Failure to heed previous warnings or near-misses.</li>
              <li>Targeting of vulnerable victims (children, elderly, disabled).</li>
              <li>Multiple persons at risk.</li>
              <li>Deliberate concealment.</li>
              <li>Obstruction of investigation.</li>
              <li>Falsification of records.</li>
              <li>Poor previous safety record.</li>
            </ul>
            <p>Mitigating factors:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Early guilty plea.</li>
              <li>Prompt remedial action.</li>
              <li>Full cooperation with investigation.</li>
              <li>No previous record.</li>
              <li>Demonstrable safety culture / management system.</li>
              <li>Senior management changes / accountability.</li>
              <li>Charitable contributions to victims.</li>
              <li>Demonstrated improvements.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <SectionRule />
          <ContentEyebrow>Individual sentences</ContentEyebrow>
          <ConceptBlock title="Custody is on the table" plainEnglish="Individual sentencing under HASAWA s.37 (director) or s.7 (operative) has its own matrix. High culpability + serious harm = immediate custody at the top end. Knowing this changes how the L3 communicates with senior management — 'this isn't just a fine, it's your liberty if it goes badly\'." onSite="Personal sentences for directors have moved from rare to routine for serious cases. Custodial sentences in the news regularly. The L3 supervisor's observation to a director about safety issues now lands with potential personal-liberty consequences in mind.">
            <p>Individual sentence ranges (illustrative):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Low culpability, low harm — fine.</li>
              <li>Medium culpability, medium harm — fine + community order possible.</li>
              <li>High culpability, serious harm — custody possible.</li>
              <li>Very high culpability, fatal harm — immediate custody likely.</li>
              <li>Disqualification from acting as director (Company Directors Disqualification Act 1986) for serious breaches.</li>
              <li>Reputation: criminal record permanent; affects future employment and director appointments.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Worked example — the cell math</ContentEyebrow>
          <ConceptBlock title="A real cell from the matrix in numbers" plainEnglish="High culpability + Category 2 harm + Medium turnover gives a starting point around £600,000 with a range from £300,000 to £1.5m. Adjusted for aggravating / mitigating. A 1/3 early-plea reduction at first opportunity. Net fine on a Medium-turnover firm with a serious injury and acceptable mitigation might land around £250,000-£400,000 — plus FFI, plus legal, plus civil." onSite="The L3 supervisor uses example numbers to make the framework real to senior management. &quot;A serious injury here lands the firm around quarter-million in fine alone, plus legal and FFI, plus insurance premium increase, plus contract loss. The cost of doing it properly is probably £500.&quot; The asymmetry is the conversation.">
            <p>Worked example numbers (illustrative):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Starting point per cell — published in the guideline; firms use as planning baseline.</li>
              <li>Aggravating factor adjustments commonly +20% to +50%.</li>
              <li>Mitigating factor adjustments commonly -10% to -30%.</li>
              <li>Early-plea reduction up to -33%.</li>
              <li>Means-test adjustment for very-large or struggling firms.</li>
              <li>FFI inspector time billed at ~£170/hr — typically 10-50 hours per case.</li>
              <li>Legal defence £20k-£200k+ depending on complexity and contest.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="Sentencing Council 2016 — Step 1 (Determine offence category)" clause={<>&quot;The court should determine the offence category using only the culpability and harm factors identified... Where the offending falls between categories, the court will need to use its judgement.&quot;</>} meaning={<>The first step in fine determination is the culpability x harm matrix. Step 2 brings in turnover; Step 3 considers aggravating / mitigating; Step 4 considers other factors including assistance to prosecution; Step 5 considers reduction for early plea; Step 6 totality; Step 7 compensation; Step 8 reasons. The eight-step structure makes the framework transparent.</>} cite="Source: Sentencing Council Definitive Guideline for Health and Safety Offences, Corporate Manslaughter and Food Safety and Hygiene Offences (2016) — Step 1." />

          <ConceptBlock title="Corporate manslaughter under CMCHA 2007" plainEnglish="The Corporate Manslaughter and Corporate Homicide Act 2007 created a corporate offence where the way an organisation&apos;s activities are managed or organised by senior management causes a death and amounts to a gross breach of a relevant duty of care. Triable on indictment only; unlimited fines; publicity orders; remedial orders. Sits ALONGSIDE HASAWA charges, not instead of." onSite="L3 supervisor framing: CMCHA 2007 targets the organisational architecture — how senior management organised the activity, not just whether procedure was followed on the day. Systems failures that could be traced to senior decisions are the CMCHA 2007 hook. Fine averages around £5-10m for major cases.">
            <p>CMCHA 2007 elements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Activities managed or organised by senior management.</li>
              <li>Cause of death.</li>
              <li>Gross breach of relevant duty of care.</li>
              <li>Triable on indictment only — Crown Court.</li>
              <li>Unlimited fine.</li>
              <li>Publicity order — court can require publication of conviction.</li>
              <li>Remedial order — court can order specific remedial action.</li>
              <li>Personal manslaughter charges (gross negligence) sit separately under common law.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Fee for Intervention (FFI) — the parallel cost" plainEnglish="HSE Fee for Intervention (FFI) is a cost-recovery scheme — where HSE finds a material breach during inspection, the inspector&apos;s time is billed back to the firm at ~£170/hour. FFI applies to inspection / investigation time including report writing. Routine FFI invoices run into thousands; complex investigations into tens of thousands." onSite="L3 supervisor framing on the cost cascade: even before any prosecution, the FFI invoice arrives. A serious incident generating 40 hours of inspector time is a £6,800 FFI bill in addition to anything else. Not appealable except on procedural grounds. Goes in the firm&apos;s P&amp;L immediately.">
            <p>FFI mechanics:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Triggered when HSE inspector forms opinion of material breach.</li>
              <li>Hourly rate set by HSE (revised periodically, ~£170/hr at time of writing).</li>
              <li>Covers inspection, investigation, report writing, follow-up.</li>
              <li>Invoiced separately from any prosecution outcome.</li>
              <li>Disputable on procedural grounds via FFI Disputes process.</li>
              <li>Applies to all HSE-enforced workplaces.</li>
              <li>Routine invoices in low-thousands; complex cases tens of thousands.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Civil claims, insurance, and the parallel track" plainEnglish="Criminal prosecution under HASAWA is one track; civil compensation claims by injured parties or families are a parallel track. Public Liability and Employer&apos;s Liability insurance covers civil claims subject to policy limits. Insurance does NOT cover criminal fines (against public policy to insure the cost of breaking the law). Both tracks can run on the same incident." onSite="The L3 supervisor framing: the family&apos;s civil claim is separate from the HSE prosecution. Insurance pays the family (if covered); insurance does NOT pay the fine. The firm&apos;s P&amp;L takes the fine, the FFI, the legal defence excess, and any uncovered civil losses. Multiple parallel financial impacts.">
            <p>The parallel tracks:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Criminal — HSE prosecution under HASAWA / daughter regs / CMCHA 2007.</li>
              <li>Civil — claims by injured party / family under tort or breach of duty.</li>
              <li>Coronial — coroner&apos;s inquest into cause of death (separate from prosecution).</li>
              <li>Disciplinary — scheme bodies (NICEIC, NAPIT) may suspend / withdraw registration.</li>
              <li>Regulatory — directors disqualification under CDDA 1986.</li>
              <li>Insurance covers civil + legal defence; does NOT cover criminal fines.</li>
              <li>Settlement of civil claim does not extinguish criminal prosecution.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="Corporate Manslaughter and Corporate Homicide Act 2007 — s.1(1)" clause={<>&quot;An organisation to which this section applies is guilty of an offence if the way in which its activities are managed or organised — (a) causes a person&apos;s death, and (b) amounts to a gross breach of a relevant duty of care owed by the organisation to the deceased.&quot;</>} meaning={<>The corporate manslaughter offence. &quot;Senior management&quot; test brings the prosecution into the boardroom. Triable on indictment only; unlimited fines; publicity orders; remedial orders. Sits alongside HASAWA charges, not as replacement.</>} cite="Source: Corporate Manslaughter and Corporate Homicide Act 2007 (2007 c.19), s.1." />

          <ConceptBlock title="Director Disqualification and the long-term consequence" plainEnglish="Following a serious safety conviction the court can disqualify a director under the Company Directors Disqualification Act 1986. Disqualification 2-15 years; for serious cases routinely 5-10 years. During disqualification the person cannot act as director, manager, or be involved in formation / promotion of a company. Public register on Companies House." onSite="The L3 supervisor framing: even where custody is avoided, the director&apos;s career may be ended by disqualification. The senior conversation about safety lands with weight when the personal exposure is &quot;5-10 years out of business plus criminal record&quot;.">
            <p>CDDA 1986 elements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Disqualification 2-15 years for unfit conduct.</li>
              <li>Can follow safety conviction even where the conviction itself is non-custodial.</li>
              <li>Cannot act as director, manager, or involved in company formation during disqualification.</li>
              <li>Breach is a criminal offence in itself.</li>
              <li>Listed on Companies House public register.</li>
              <li>Affects future employment and director-level roles for years post-disqualification.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <CommonMistake title="Concealing or modifying evidence after an incident" whatHappens={<>Operative changes scene appearance after incident — moves tools, removes broken kit, "tidies up". Firm management instructs / encourages it. HSE finds the modification through witness statements / photos. Aggravating factor &quot;deliberate concealment&quot; pushes fine up significantly. Personal liability for those who modified evidence under s.37 / common law obstruction.</>} doInstead={<>Preserve the scene. Period. Cooperate with investigation. Document accurately. The mitigating factors of cooperation and prompt remedial action will reduce sentences far more than concealment ever helps.</>} />

          <CommonMistake title="Treating the matrix as 'directors' problem'" whatHappens={<>L3 doesn&apos;t bother understanding the consequence cascade; assumes fines are corporate; doesn't see the personal liability cascade. When pushed by a director to do something unsafe, doesn\'t recognise that the director&apos;s order may be putting the director themselves into custody-risk territory. Conversation goes badly.</>} doInstead={<>Understand the matrix. Senior management responses to safety concerns shift when they understand the personal exposure. The L3 communication is more effective when grounded in the consequence framework.</>} />

          <Scenario title="Briefing a director on consequences" situation={<>Your firm\'s director is pushing you to short-cut safe-isolation procedure on a project. Customer is pressing for completion. You want to refuse but feel uncomfortable about the conversation.</>} whatToDo={<>Use the consequence framing. "I understand the customer pressure but if anyone gets hurt because we shortcut isolation, the cascade is: HSE prosecution under EAWR Reg 13 / 14, HASAWA s.2/s.3, MHSWR. You personally under s.37 if you authorised the shortcut. Sentencing Council guideline gives starting points in six figures for high culpability + serious harm + our turnover. Personal sentences include custody at top end. Insurance doesn\'t cover criminal fines. Reputation damage on the public register affects future contracts. The cost of doing it right is small; the cost of doing it wrong is potentially the firm and your liberty." Refusal becomes much more grounded when the consequences are framed properly. Document the conversation; ERA s.44 protects.</>} whyItMatters={<>The Sentencing Council framework lets the L3 supervisor have the difficult conversation with weight. Without the framework the conversation is &quot;please don\'t do this, it\'s unsafe&quot;. With the framework it&apos;s &quot;please don\'t do this — here\'s the structured consequence cascade including potential custody for you personally&quot;. Same refusal, much stronger basis. Senior management responses change when they understand personal exposure.</>} />

          <SectionRule />
          <ContentEyebrow>The eight-step sentencing framework</ContentEyebrow>

          <ConceptBlock
            title="How a court actually calculates a Health and Safety fine"
            plainEnglish="The Sentencing Council Definitive Guideline sets out an explicit eight-step framework that courts follow when sentencing a HASAWA offence. Step 1 determines the offence category using the culpability and harm factors only — not the turnover. Step 2 maps the category to a starting point and range using the turnover band. Step 3 considers aggravating and mitigating factors and moves within the range. Step 4 considers factors that may warrant adjustment of the fine including totality across multiple charges and the overall effect on the offender. Step 5 considers reduction for early guilty plea. Step 6 considers totality where there are multiple offences. Step 7 considers compensation for victims. Step 8 requires the court to give reasons for the sentence. The structured framework is what makes Sentencing Council guideline sentences relatively predictable and what allows the L3 supervisor to use the framework as a senior-management conversation tool."
            onSite="The L3 supervisor doesn&apos;t need to memorise the steps but should know the framework exists. The practical implication: the sentence isn&apos;t arbitrary; it&apos;s the output of a published process. A serious incident at a £30m turnover firm with high culpability and category 2 harm has a fairly predictable starting fine in the hundreds-of-thousands range. Knowing this lets the L3 frame the consequence conversation with senior management in concrete numbers rather than vague warnings."
          >
            <p>The eight-step framework in detail:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Step 1 — Determine offence category</strong>:
                culpability (very high / high / medium / low) x harm
                category (1 / 2 / 3, with adjustments for risk of higher
                harm or multiple persons).
              </li>
              <li>
                <strong>Step 2 — Starting point and range</strong>: mapped
                from offence category x turnover band. Published tables in
                the Guideline give specific figures.
              </li>
              <li>
                <strong>Step 3 — Aggravating / mitigating factors</strong>:
                cost-cutting, repeat offending, vulnerable victims, prompt
                remedial, cooperation, etc.
              </li>
              <li>
                <strong>Step 4 — Adjustment for proportionality</strong>:
                considers the overall financial impact on the organisation
                and any wider consequences.
              </li>
              <li>
                <strong>Step 5 — Reduction for early guilty plea</strong>: up
                to 1/3 reduction at first opportunity; sliding scale to 1/10
                once trial begins.
              </li>
              <li>
                <strong>Step 6 — Totality</strong>: where multiple offences,
                ensure total sentence is just and proportionate.
              </li>
              <li>
                <strong>Step 7 — Compensation</strong>: consider compensation
                orders for victims.
              </li>
              <li>
                <strong>Step 8 — Reasons</strong>: court must give reasons for
                the sentence imposed.
              </li>
            </ol>
          </ConceptBlock>

          <ConceptBlock
            title="Individual sentencing — the parallel matrix"
            plainEnglish="The Definitive Guideline has a separate matrix for individual offenders. Inputs are culpability and harm, mapped against the individual&apos;s position. Output ranges from fines and community orders up to custodial sentences. For HASAWA s.37 (director / senior manager personal liability) and HASAWA s.7 (operative personal duty), and for common-law gross negligence manslaughter, the courts apply this individual matrix. The L3 supervisor framing on senior conversations: &apos;the matrix doesn&apos;t just produce corporate fines; it produces individual sentences including custody at the top end&apos;."
            onSite="Recent cases: Bilston Skip Hire director — 14 months custody following worker death (gross negligence manslaughter); various roofing-firm directors imprisoned following fatal falls from height; numerous suspended sentences and community orders for medium-severity cases. The HSE actively pursues s.37 alongside corporate charges where the facts support it. The L3 representative observing senior management instruction toward unsafe practice is observing the inputs to a potential s.37 conviction; the personal-exposure framing changes the senior conversation."
          >
            <p>Individual sentencing considerations:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Custody threshold</strong> — high culpability x
                serious harm; courts increasingly willing to impose.
              </li>
              <li>
                <strong>Suspended sentence</strong> — where custody threshold
                is met but personal circumstances justify suspension.
              </li>
              <li>
                <strong>Community order</strong> — for medium culpability /
                harm; unpaid work, curfew, programmes.
              </li>
              <li>
                <strong>Fine</strong> — for lower culpability or where
                individual financial circumstances justify; less commonly the
                primary sentence at top of the matrix.
              </li>
              <li>
                <strong>Disqualification from acting as director</strong> —
                under CDDA 1986; 2-15 years; runs in parallel with primary
                sentence.
              </li>
              <li>
                <strong>Compensation</strong> — additional to primary sentence.
              </li>
              <li>
                <strong>Permanent criminal record</strong> — affects future
                employment, director roles, professional registration.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Sentencing Council Definitive Guideline 2016 — Step 1 (Offence category)"
            clause={
              <>
                &quot;The court should determine the offence category using only
                the culpability and harm factors set out below. Where an offence
                does not fall squarely within a category, individual factors may
                require a degree of weighting before making an overall
                assessment and determining the appropriate offence
                category.&quot;
              </>
            }
            meaning={
              <>
                The Guideline&apos;s Step 1 structures the assessment by
                requiring culpability x harm to be determined before turnover
                is introduced (in Step 2). This prevents larger firms from
                being assessed differently on the same conduct. The
                culpability bands (very high, high, medium, low) reflect the
                organisation&apos;s state of mind and the harm bands (1, 2, 3
                with adjustments) reflect the actual or risked outcome.
              </>
            }
            cite="Source: Sentencing Council Definitive Guideline for Health and Safety Offences, Corporate Manslaughter and Food Safety and Hygiene Offences (2016)."
          />

          <Scenario
            title="Briefing the contracts manager after a near-miss"
            situation={
              <>
                A serious near-miss has occurred on your firm&apos;s site — an L2
                operative narrowly avoided a fall through a fragile rooflight
                during a luminaire replacement. The fall would have been from
                4m onto a hard floor; near-fatal credible outcome. The L2
                wasn&apos;t harmed but was understandably shaken. The contracts
                manager wants to play it down — &quot;no harm done; let&apos;s
                just move on&quot;. You&apos;re the L3 supervisor on site.
              </>
            }
            whatToDo={
              <>
                Resist the &quot;no harm done&quot; framing. (1) Investigate
                the near-miss using the firm&apos;s near-miss procedure —
                identify root cause, contributory factors, what could have
                made it worse, what controls failed or were absent. (2)
                Brief the contracts manager: &quot;if this had gone the other
                way, we&apos;d be in HASAWA s.2/s.3 prosecution territory; the
                Sentencing Council framework starts at high culpability
                (fragile-roof working at height without proper controls —
                that&apos;s a textbook benchmark gap from WAH Regs Reg 9
                fragile-surface duty); the harm would have been Cat 1
                (life-threatening / fatal); for our turnover band that&apos;s
                starting point in the high six-figure range plus FFI plus
                legal plus civil; and the contracts manager&apos;s position
                creates s.37 exposure for them personally because they knew
                about the deficient method statement and didn&apos;t act.&quot;
                (3) Insist on remedial action — RAMS rewrite, retraining,
                physical edge / fragile-surface controls before any further
                roof work. (4) Document the near-miss formally; submit to the
                firm&apos;s safety system; ensure it appears in the next
                lessons-learned review. (5) If the contracts manager
                continues to brush off, escalate above them — Qualified
                Supervisor, director — using the written escalation chain;
                ERA s.44 protects you.
              </>
            }
            whyItMatters={
              <>
                Near-misses are the cheapest learning opportunities the firm
                gets. Treating them as &quot;no harm done&quot; throws away the
                lesson. The Sentencing Council framework gives the L3 the
                vocabulary to make the near-miss conversation concrete: the
                outcome avoided, the matrix range, the personal-exposure
                landscape. A firm that genuinely engages with near-misses
                tends to have fewer actual incidents; a firm that suppresses
                them eventually has the actual incident and the corresponding
                prosecution. The L3&apos;s role in the safety-learning culture
                is one of the most important parts of the L2→L3 transition.
              </>
            }
          />

          <SectionRule />
          <ContentEyebrow>Notable cases — what the matrix looks like in practice</ContentEyebrow>

          <ConceptBlock
            title="Recent prosecutions that anchor the matrix in reality"
            plainEnglish="The Sentencing Council Definitive Guideline produces real numbers in real cases. Looking at recent prosecutions shows the matrix in action: very large turnover with high culpability and serious harm consistently produces fines in the millions; smaller firms with high culpability and fatal outcomes can produce fines that wipe out the company; individual directors have served custodial sentences after fatal incidents. These cases are public — the HSE prosecutions register at hse.gov.uk lists them — and serve as the most concrete answer to &apos;could it really happen here?&apos;."
            onSite="The L3 supervisor doesn&apos;t need to memorise case numbers but knowing the public register exists, and that fines run into the millions for serious cases at large firms, is the practical anchor for senior-management conversations. The cases also illustrate that small firms get prosecuted too — &apos;we&apos;re not big enough for HSE to bother&apos; is a defence that doesn&apos;t survive contact with reality."
          >
            <p>Reference cases illustrating the matrix (publicly reported):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Whirlpool UK Appliances Ltd (2017)</strong> — £700k fine after
                contractor death; product-safety case demonstrating very-high
                culpability scoring.
              </li>
              <li>
                <strong>Foodles Production (Star Wars set, 2018)</strong> — £1.6m fine
                following Harrison Ford&apos;s on-set injury; large-turnover with
                substantial harm category.
              </li>
              <li>
                <strong>Network Rail multiple cases</strong> — fines in the millions
                following various track-worker fatalities; very-large turnover
                multiplier active.
              </li>
              <li>
                <strong>Cotswold Geotechnical Holdings (2011)</strong> — first CMCHA
                conviction; £385k fine; small firm but unlimited fines available under
                CMCHA.
              </li>
              <li>
                <strong>Lion Steel Equipment (2012)</strong> — directors charged under
                CMCHA but acquitted personally; company convicted; £480k fine plus
                publicity order.
              </li>
              <li>
                <strong>R v Bilston Skip Hire (2018)</strong> — director sentenced to
                14 months custody for gross negligence manslaughter after worker
                death.
              </li>
              <li>
                <strong>HSE public register</strong> — current cases at hse.gov.uk
                provide ongoing examples; PQQ panels review the register routinely.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <FAQ items={faqs} />
          <SectionRule />
          <KeyTakeaways points={[
            "Remember from Section 1.6 — Sentencing Council guideline structures fines. At L3 you understand the matrix in enough detail to communicate consequences.",
            "2016 Definitive Guideline. Culpability x Harm x Turnover matrix.",
            "Culpability: Very High / High / Medium / Low. Harm: Cat 1 / 2 / 3 with adjustments.",
            "Turnover: Large £50m+ / Medium £10-50m / Small £2-10m / Micro <£2m.",
            "Aggravating factors: cost-cutting, concealment, obstruction, multiple victims, vulnerable victims, poor record.",
            "Mitigating factors: early plea, cooperation, prompt remedial, no previous record, demonstrable safety culture.",
            "Individual sentences include custody at top end. Director liability under s.37 routine for serious cases.",
            "Insurance doesn't cover criminal fines. The framework is the conversation tool with senior management.",
          ]} />
          <Quiz title="Sentencing guideline — knowledge check" questions={quizQuestions} />
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section5-2')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">5.2 CDM transition</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section5-4')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next subsection <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">5.4 RIDDOR specified injuries depth</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
