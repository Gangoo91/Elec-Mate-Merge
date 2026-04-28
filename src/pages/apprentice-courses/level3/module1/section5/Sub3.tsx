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

          <RegsCallout source="Corporate Manslaughter and Corporate Homicide Act 2007 — s.1(1)" clause={<>&quot;An organisation to which this section applies is guilty of an offence if the way in which its activities are managed or organised — (a) causes a person&apos;s death, and (b) amounts to a gross breach of a relevant duty of care owed by the organisation to the deceased.&quot;</>} meaning={<>The corporate manslaughter offence. &quot;Senior management&quot; test brings the prosecution into the boardroom. Triable on indictment only; unlimited fines; publicity orders; remedial orders. Sits alongside HASAWA charges, not as replacement.</>} cite="Source: Corporate Manslaughter and Corporate Homicide Act 2007 (2007 c.19), s.1 — verbatim from legislation.gov.uk." />

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
            "Insurance doesn\'t cover criminal fines. The framework is the conversation tool with senior management.",
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
