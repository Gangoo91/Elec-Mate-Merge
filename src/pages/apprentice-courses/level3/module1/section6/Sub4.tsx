/**
 * Module 1 · Section 6 · Subsection 4 - Asbestos CAR 2012: supervisor escalation in detail
 * Maps to C&G 2365-03 / Unit 201 — supplementary depth (beyond AC framework)
 * Layered depth from 2357 Unit 601 ELTK01 - going deeper on Section 4.6
 */
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import { TLDR, ConceptBlock, RegsCallout, CommonMistake, Scenario, KeyTakeaways, FAQ, LearningOutcomes, ContentEyebrow, SectionRule } from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Asbestos CAR 2012 - supervisor escalation | Level 3 Module 1.6.4 | Elec-Mate';
const DESCRIPTION = 'L3 deeper on CAR 2012 - the licensed-vs-non-licensed boundary in detail, refurbishment surveys, supervisor escalation chain, NNLW notification requirements.';

const checks = [
  { id: 'l3-m1-s6-sub4-licensed', question: 'Examples of licensed asbestos work?', options: ['Anything.', 'Removal / disturbance of sprayed coatings, lagging, large quantities of AIB, friable insulation, asbestos cement at significant scale. HSE-licensed contractor only - not optional.', 'Just paint.', 'Anything small.'], correctIndex: 1, explanation: 'Licensed work = high-risk activity. HSE-licensed contractor essential. The L3 supervisor recognises and escalates.' },
  { id: 'l3-m1-s6-sub4-nnlw', question: 'What\'s NNLW?', options: ['No notification.', 'Notifiable Non-Licensed Work - middle category between licensed and non-licensed. Trained operatives following written plan; HSE notification 14 days in advance; medical surveillance + records. Limited removal of less-friable materials.', 'Just paperwork.', 'Random.'], correctIndex: 1, explanation: 'NNLW is the middle tier. Trained, written plan, advance notification, medical surveillance.' },
  { id: 'l3-m1-s6-sub4-discovery', question: 'Discovery procedure on suspected asbestos?', options: ['Continue.', 'STOP work. Don\'t disturb. Vacate area; close off. Photograph from safe distance. Phone firm + dutyholder + PC (where applicable). Wait for confirmation (non-asbestos by survey OR licensed contractor takes over). Document everything.', 'Take samples.', 'Random.'], correctIndex: 1, explanation: 'Six-step discovery procedure. The L3 supervisor reflex on suspect material.' },
];

const quizQuestions = [
  { id: 1, question: 'When is asbestos work licensed?', options: ['Always.', 'When the work is high-risk - typically removal of sprayed coatings, lagging, AIB beyond very small quantities, friable insulation. Detailed in CAR 2012 Reg 8 + HSE guidance L143.', 'Random.', 'Customer choice.'], correctAnswer: 1, explanation: 'Licensed work = high-risk activity. HSE Approved Code of Practice L143 gives the detail.' },
  { id: 2, question: 'When is NNLW appropriate?', options: ['Always.', 'For some lower-risk asbestos work that\'s above non-licensed threshold but below licensed - e.g. limited AIB removal, certain encapsulation work. Trained operatives + written plan + 14-day HSE notification + medical surveillance + records.', 'Random.', 'Sometimes.'], correctAnswer: 1, explanation: 'NNLW middle category. Specific notification + surveillance requirements.' },
  { id: 3, question: 'When is non-licensed work permitted?', options: ['Anything.', 'Limited short-duration low-exposure work by trained operatives - typically small handling of asbestos cement, small encapsulation, observation. Follows CAR 2012 controls (assessment, training, PPE, hygiene). Below NNLW threshold.', 'Random.', 'Customer choice.'], correctAnswer: 1, explanation: 'Non-licensed = lowest tier. Still requires CAR 2012 compliance + training.' },
  { id: 4, question: 'How is the categorisation decided?', options: ['Random.', 'Per CAR 2012 Reg 6 (assessment) + Reg 8 (licensed work) + HSE guidance L143. Considers: type of asbestos (chrysotile/amosite/crocidolite); friability; quantity; nature of work (removal vs encapsulation vs observation); duration; exposure level.', 'Customer.', 'Random.'], correctAnswer: 1, explanation: 'Multiple factors; technical judgement. The L3 supervisor doesn\'t make the call alone - escalates to specialist.' },
  { id: 5, question: 'What\'s the L3 supervisor\'s role on asbestos discovery?', options: ['Make the call.', 'Stop work; preserve scene; escalate to firm + dutyholder + PC. Don\'t attempt categorisation; that\'s for asbestos specialists. Don\'t restart until confirmation OR licensed contractor takes over.', 'Anything.', 'Customer service.'], correctAnswer: 1, explanation: 'L3 = escalator, not categoriser. Specialist makes the call.' },
  { id: 6, question: 'What\'s the asbestos register and who maintains it?', options: ['Anyone.', 'Per CAR 2012 Reg 4 - dutyholder of non-domestic premises maintains an asbestos register documenting location, condition, type of ACMs. Must be available to anyone working on the fabric. Updated as conditions change.', 'Customer.', 'Random.'], correctAnswer: 1, explanation: 'Reg 4 duty to manage. Register is the operational document. Ask for it before work.' },
  { id: 7, question: 'How is asbestos awareness training delivered?', options: ['Self-study.', 'UKATA / IATP-certified providers offer asbestos awareness (1 day, refresher periodic). Higher levels (non-licensed work, licensed work) require more advanced certified training. CAR 2012 Reg 10 requires adequate training for anyone who may be exposed.', 'Random.', 'YouTube.'], correctAnswer: 1, explanation: 'UKATA / IATP are recognised. Reg 10 mandatory for anyone potentially exposed.' },
  { id: 8, question: 'What\'s the asbestos waste regime?', options: ['General waste.', 'Hazardous waste - double-bagged (red inner with asbestos label, clear outer with hazardous waste label), accompanied by Hazardous Waste Consignment Note, transported by licensed asbestos waste carrier, disposed of at permitted asbestos waste facility.', 'Random.', 'Burn.'], correctAnswer: 1, explanation: 'Specialist disposal regime. Mixing with general waste = multiple offences (CAR 2012 + Hazardous Waste Regs + EPA 1990).' },
];

const faqs = [
  { question: 'Can my firm do non-licensed work?', answer: 'Only if operatives are trained per CAR 2012 Reg 10; written plan in place; controls applied per the regs. Many firms refer all asbestos work to specialists rather than maintain non-licensed capability.' },
  { question: 'How quickly can a refurbishment survey be arranged?', answer: 'Days to weeks depending on lab capacity and scope. Bulk samples 24-48hr turnaround typical. Full refurbishment surveys longer. Plan ahead where pre-2000 building disturbance is anticipated.' },
  { question: 'What if the customer can\'t / won\'t pay for a survey?', answer: 'Don\'t proceed with disturbance work. Survey isn\'t the contractor\'s cost (typically) but the contractor can\'t safely or lawfully proceed without it. Document; escalate; let firm decide commercial response.' },
  { question: 'Are floor tiles always asbestos?', answer: 'Pre-2000 vinyl tiles (especially &quot;thermoplastic&quot;) often contained chrysotile. Adhesive (bitumen-based) sometimes contained asbestos. Treat as suspect until tested.' },
  { question: 'What about asbestos in old electrical fuse boards?', answer: 'Some pre-2000 fuse boards used AIB backing or asbestos-containing sealing. Rare in UK but possible in older industrial installations. Treat suspect material as asbestos until ruled out.' },
  { question: 'How does the L3 communicate asbestos risk to customer / homeowner?', answer: 'Calmly. &quot;We\'ve found a suspect material. Until we know what it is, we can\'t safely continue this part of the work. The right step is a survey / specialist contractor depending on what it is. This is to protect you and us. The cost is much less than the cost of getting it wrong.&quot;' },
];

export default function Sub4() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);
  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section6')} className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"><ArrowLeft className="h-4 w-4" /> Section 6</button>
          <PageHero eyebrow="Module 1 · Section 6 · Subsection 4" title="Asbestos CAR 2012 - supervisor escalation in detail" description="Remember from Section 4.6 - CAR 2012 + presumption + escalation. Here we deepen on licensed-vs-non-licensed boundary and the L3 supervisor escalation chain." tone="emerald" />
          <TLDR points={[
            "Three categories: Licensed (HSE-licensed contractor only - high-risk), NNLW (Notifiable Non-Licensed Work - trained + written plan + 14-day notification + medical surveillance), Non-licensed (trained + CAR 2012 controls).",
            "Discovery procedure: STOP, don't disturb, vacate, photograph from safe distance, escalate to firm + dutyholder + PC, don't restart until confirmed.",
            "L3 supervisor role = ESCALATE, not categorise. Specialist makes the call. Default = treat as licensed-territory until proven otherwise.",
          ]} />
          <LearningOutcomes outcomes={[
            "Distinguish licensed asbestos work from NNLW and non-licensed work.",
            "State the NNLW notification and surveillance requirements.",
            "Apply the supervisor discovery procedure for suspect material.",
            "Recognise the dutyholder under CAR 2012 Reg 4 and the asbestos register requirement.",
            "Identify asbestos awareness training requirement under Reg 10.",
            "Apply the asbestos waste regime (HWCN, licensed carrier, permitted facility).",
          ]} initialVisibleCount={3} />

          <ContentEyebrow>Three categories of asbestos work</ContentEyebrow>
          <ConceptBlock title="Licensed / NNLW / Non-licensed" plainEnglish="Three categories under CAR 2012. Licensed (Reg 8) - high-risk; HSE-licensed contractor only. NNLW (Reg 6 + 8 supplemented by HSE guidance) - lower-risk but still significant; trained operatives, written plan, 14-day HSE notification, medical surveillance. Non-licensed - lowest-risk; trained operatives, CAR 2012 controls." onSite="The L3 supervisor doesn't categorise. Specialist asbestos surveyor / licensed contractor makes the call. The L3 escalates and waits.">
            <p>Category indicators:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Licensed</strong> - sprayed coatings; lagging; AIB beyond very small / encapsulation; significant friable material; substantial asbestos cement work.</li>
              <li><strong>NNLW</strong> - limited AIB removal where conditions permit; some encapsulation work above non-licensed threshold; specific operations defined in HSE guidance.</li>
              <li><strong>Non-licensed</strong> - small short-duration low-exposure handling; limited asbestos cement; observation work; very limited disturbance.</li>
              <li>The category boundaries are technical and judged by qualified asbestos specialists.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="Control of Asbestos Regulations 2012 - Reg 8(1)" clause={<>"Subject to regulation 3(2), an employer must ensure that any work with asbestos undertaken by the employer's employees is carried out in accordance with a licence granted by the Executive."</>} meaning={<>Reg 8 = licensing. Default is licensed; Reg 3(2) and HSE guidance create the NNLW and non-licensed exemptions for lower-risk activity. The L3 reflex: assume licensed-territory until proven otherwise.</>} cite="Source: Control of Asbestos Regulations 2012 (SI 2012/632), Reg 8 - verbatim from legislation.gov.uk." />

          <InlineCheck {...checks[0]} />

          <SectionRule />
          <ContentEyebrow>NNLW in detail</ContentEyebrow>
          <ConceptBlock title="The middle tier - what NNLW actually requires" plainEnglish="NNLW = Notifiable Non-Licensed Work. Trained operatives following a written plan; HSE notified 14 days in advance via online portal; medical surveillance for operatives; records kept including air monitoring." onSite="L3 awareness: NNLW exists; it's a specialist activity; few general electrical contractors carry NNLW capability. Most defer to licensed asbestos contractors for anything beyond non-licensed.">
            <p>NNLW requirements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Trained operatives (CAR 2012 Reg 10 - higher level than awareness).</li>
              <li>Written plan of work.</li>
              <li>HSE notification 14 days in advance via online portal.</li>
              <li>Medical surveillance for operatives (every 3 years).</li>
              <li>Records kept (air monitoring; medical surveillance; training).</li>
              <li>Specific control measures per HSE guidance.</li>
              <li>Personal exposure monitoring where required.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />

          <SectionRule />
          <ContentEyebrow>Discovery procedure (deeper)</ContentEyebrow>
          <ConceptBlock title="The six-step L3 supervisor reflex" plainEnglish="On discovery of suspect material: STOP work; don't disturb; vacate area; photograph from safe distance; phone firm + dutyholder + PC; wait for confirmation (non-asbestos via lab test OR licensed contractor takes over). Document everything. Don't restart until clear." onSite="The procedure is rigid for a reason - asbestos exposure is cumulative and long-latency. A short exposure today contributes to disease decades later. The L3 supervisor doesn't take chances.">
            <p>The full procedure:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li><strong>STOP</strong> - all work in the affected area immediately.</li>
              <li><strong>DON'T DISTURB</strong> - no further drilling, cutting, movement of material.</li>
              <li><strong>VACATE</strong> - team leaves the area; close off if possible.</li>
              <li><strong>DOCUMENT</strong> - photograph from safe distance; note location, what you saw, the action that exposed it, surrounding materials.</li>
              <li><strong>ESCALATE</strong> - phone firm\'s H&amp;S manager / contracts manager; inform dutyholder (building owner / managing agent / customer); inform principal contractor (if appointed).</li>
              <li><strong>DON\'T RESTART</strong> - in the affected area until: (a) lab test confirms non-asbestos, OR (b) licensed contractor takes over disturbance work, OR (c) NNLW / non-licensed pathway formally established with appropriate controls.</li>
              <li>Update RAMS to reflect the discovery and new procedure.</li>
              <li>Record personal exposure if any disturbance occurred.</li>
            </ol>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <SectionRule />
          <ContentEyebrow>Asbestos register and the dutyholder under Reg 4</ContentEyebrow>
          <ConceptBlock title="The duty to manage in non-domestic premises" plainEnglish="CAR 2012 Reg 4 imposes the duty to manage asbestos on the dutyholder of non-domestic premises — typically the building owner, managing agent, or person otherwise in control of the building fabric. Duties: identify whether ACMs are present (presumption + survey); record location and condition; assess risk; manage; provide information to anyone working on the fabric." onSite="L3 supervisor on first arrival at non-domestic premises: ask for the asbestos register. Absence of a register on a pre-2000 building is itself a red flag — escalate. The register is the contractor&apos;s primary defence against unwitting disturbance.">
            <p>Reg 4 dutyholder duties:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Take reasonable steps to identify presence of ACMs.</li>
              <li>Presume ACMs unless evidence shows otherwise.</li>
              <li>Maintain a register documenting location, type, condition.</li>
              <li>Assess risk and prepare written management plan.</li>
              <li>Implement plan including monitoring, controls, removal where needed.</li>
              <li>Provide information to anyone potentially exposed (including contractors).</li>
              <li>Review and update as conditions change.</li>
              <li>Apply only to non-domestic premises — domestic premises mostly outside Reg 4 (though common parts of leasehold flats are non-domestic for Reg 4).</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="Control of Asbestos Regulations 2012 — Reg 4(3)" clause={<>&quot;In order to enable him to manage the risk from asbestos in non-domestic premises, the dutyholder shall ensure that — (a) such steps as are reasonable in the circumstances are taken in order to determine whether asbestos is or is liable to be present in the premises; (b) in determining whether asbestos is or is liable to be present in the premises, the dutyholder shall presume asbestos is present, unless there is strong evidence that it is not.&quot;</>} meaning={<>The presumption rule is the operational backbone of CAR 2012. Pre-2000 building = presume present until proven otherwise. The asbestos register and refurbishment / management surveys are the evidence base for ruling out presumption.</>} cite="Source: Control of Asbestos Regulations 2012 (SI 2012/632), Reg 4 — verbatim from legislation.gov.uk." />

          <ConceptBlock title="Asbestos surveys — management vs refurbishment vs demolition" plainEnglish="Three survey types under HSG264: (1) Management Survey — locates and assesses ACMs in normal occupation, less invasive; (2) Refurbishment / Demolition Survey — fully intrusive survey before any disturbance work, identifies all ACMs that could be disturbed; (3) Targeted survey — focused on specific area for specific work. The L3 supervisor matches survey type to scope of work." onSite="Common L3 oversight: relying on a Management Survey for refurbishment work. Management surveys are NOT designed for disturbance — they routinely miss ACMs in concealed locations (inside walls, behind panels, in voids). Refurbishment Survey is the right tool before any disturbance work in pre-2000 buildings.">
            <p>Survey types:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Management Survey</strong> — for normal occupation; non-invasive; identifies visible / accessible ACMs.</li>
              <li><strong>Refurbishment / Demolition Survey</strong> — fully intrusive; required before disturbance / refurbishment / demolition work.</li>
              <li><strong>Targeted Survey</strong> — focused on specific area / component for specific work.</li>
              <li>Surveys conducted by UKAS-accredited surveyors.</li>
              <li>Survey report becomes part of asbestos register.</li>
              <li>Sample analysis at UKAS-accredited lab.</li>
              <li>Refurbishment Survey scope must match work scope — gaps = unsurveyed areas.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Asbestos exposure — the long-latency consequence" plainEnglish="Asbestos-related diseases (mesothelioma, asbestos-related lung cancer, asbestosis) typically develop 20-50 years after exposure. There is no safe exposure threshold. Each fibre inhaled contributes to risk. The cumulative dose over a career determines lifetime probability. The L3 supervisor framing: short-cuts today are diseases in 30 years." onSite="The motivational framing on asbestos discipline: not a fine in 5 years but a diagnosis in 30 years. The control measures (presumption, survey, escalation, no-disturb) protect operatives across a career, not just a single shift. Asbestos remains the largest occupational disease killer in UK construction.">
            <p>Disease facts:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Mesothelioma — incurable cancer of mesothelium; specifically caused by asbestos exposure.</li>
              <li>Asbestos-related lung cancer — overlaps with smoking risk; multiplicative.</li>
              <li>Asbestosis — fibrosis of lung tissue from heavy exposure.</li>
              <li>Pleural plaques — non-malignant marker of exposure.</li>
              <li>Latency 20-50 years typical.</li>
              <li>No safe threshold — each fibre contributes.</li>
              <li>Largest single occupational disease killer in UK construction.</li>
              <li>UK deaths from past asbestos exposure ~5,000/year (HSE estimate).</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Asbestos waste — the disposal regime in detail" plainEnglish="Asbestos waste is hazardous waste under the Hazardous Waste (England and Wales) Regulations 2005 + Environmental Protection Act 1990. Disposal regime: double-bagged (red inner with asbestos label, clear outer with hazardous waste label); accompanied by Hazardous Waste Consignment Note (HWCN); transported by carrier registered for hazardous waste; disposed of at permitted asbestos waste facility. Mixing with general waste = multiple offences." onSite="L3 supervisor on a job that generates asbestos waste (typically only after licensed / NNLW work; general electrical work should not generate asbestos waste because the L3 reflex is no-disturb): the waste documentation chain is part of the job pack. HWCN copies retained 3 years minimum. Carrier and disposal facility evidence in the records.">
            <p>Asbestos waste regime elements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Hazardous waste classification under Hazardous Waste Regs 2005.</li>
              <li>Double-bagged: red inner (asbestos label) + clear outer (hazardous waste label).</li>
              <li>Hazardous Waste Consignment Note (HWCN) for every consignment.</li>
              <li>Carrier registered for hazardous waste transport.</li>
              <li>Disposal at permitted asbestos waste facility (limited number nationally).</li>
              <li>HWCN retained 3 years minimum.</li>
              <li>Mixing with general waste = CAR 2012 + Hazardous Waste Regs + EPA 1990 offences.</li>
              <li>Domestic asbestos waste — householders can dispose via local authority arrangements but typically via licensed contractor.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="Control of Asbestos Regulations 2012 — Reg 10(1)" clause={<>&quot;Every employer must ensure that adequate information, instruction and training is given to those of his employees — (a) who are or who are liable to be exposed to asbestos, or who supervise such employees, so that they are aware of — (i) the properties of asbestos and its effects on health... (iv) the means of identifying suspected asbestos containing materials, the actions to take to control exposure, and the importance of preventive controls.&quot;</>} meaning={<>The training duty. Three tiers: Asbestos Awareness for anyone potentially exposed; Non-Licensed Work training for non-licensed activity; Licensed Work training for HSE-licensed firms. UKATA / IATP recognised providers. Refresher periodic. Without current training + exposure occurs = Reg 10 breach + EAWR Reg 16 competence gap.</>} cite="Source: Control of Asbestos Regulations 2012 (SI 2012/632), Reg 10 — verbatim from legislation.gov.uk." />

          <ConceptBlock title="Reg 10 training — awareness, non-licensed, licensed" plainEnglish="CAR 2012 Reg 10 requires adequate information, instruction and training for anyone potentially exposed to asbestos. Three tiers: Asbestos Awareness (everyone potentially exposed); Non-Licensed Work training (operatives doing non-licensed asbestos work); Licensed Work training (operatives in HSE-licensed firms). Refresher training periodic (typically annual for awareness)." onSite="L3 supervisor: confirm own awareness training is current; confirm L2 mate&apos;s same. UKATA / IATP are the recognised certificate-issuing bodies. Without current training, Reg 10 breach if exposure occurs. Training records part of the firm&apos;s competence evidence.">
            <p>Training tiers and providers:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Awareness</strong> — for anyone who might encounter ACMs in the course of work; 1 day; annual refresher recommended.</li>
              <li><strong>Non-Licensed Work</strong> — for operatives doing non-licensed asbestos work; 2-3 days; periodic refresher.</li>
              <li><strong>Licensed Work</strong> — for operatives in HSE-licensed asbestos firms; specialist training.</li>
              <li>UKATA — UK Asbestos Training Association.</li>
              <li>IATP — Independent Asbestos Training Providers.</li>
              <li>Training records part of competence evidence under EAWR Reg 16 / CAR 2012 Reg 10.</li>
              <li>Without current training + exposure occurs = Reg 10 breach.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <CommonMistake title="Trying to determine licensed-vs-non-licensed yourself" whatHappens={<>L3 finds AIB-looking material; assumes &quot;it\'s a small piece, we can do it ourselves under non-licensed&quot;; disturbs it; potential exposure incident. The categorisation was actually licensed-territory (size + friability + nature of work); CAR 2012 Reg 8 breach; firm prosecution.</>} doInstead={<>Don\'t categorise yourself. Escalate to specialist; let them make the call. The L3 supervisor\'s role is to recognise the hazard and escalate, not to determine the regulatory category.</>} />

          <CommonMistake title="Disturbing suspect material before survey" whatHappens={<>Suspect material found; L3 wants to &quot;just have a quick look&quot; by lifting / cutting / drilling further. Disturbance creates exposure. Should have stopped at first suspect.</>} doInstead={<>STOP at first suspect. Photograph from distance. Escalate. Wait for survey / specialist. The 24-48hr delay for survey results is far better than the alternative.</>} />

          <Scenario title="Suspect AIB found mid-cable-pull in 1980s building" situation={<>You\'re pulling cable through a ceiling void in a 1980s commercial building. Lifting a ceiling tile to access the void, you see what looks like AIB above the tiles. The customer\'s site manager doesn\'t know if it\'s been surveyed. You\'ve already disturbed the tile but no further action yet.</>} whatToDo={<>Apply six-step procedure immediately. (1) STOP - don\'t lift any more tiles, don\'t pull cable, don\'t enter the void. (2) DON\'T DISTURB - lower the tile back gently. (3) VACATE - withdraw from the area; close off if possible. (4) DOCUMENT - photograph from distance through the partially lifted tile (what you saw); note location, time, the lift that exposed it. (5) ESCALATE - phone your firm\'s H&amp;S manager + the customer\'s site manager (dutyholder); request the asbestos register; if no register, escalate to firm and customer for refurbishment survey of the void. (6) DON\'T RESTART - cable pull stops until either non-asbestos confirmed by survey OR licensed contractor takes over any required disturbance. Record your potential exposure (brief contact with disturbed tile; report to firm for incident log). Update dynamic risk assessment for the project. Brief team; close off area.</>} whyItMatters={<>The 1980s building is presumed-asbestos until rule-out. The L3 supervisor reflex - STOP, escalate, wait - is what discharges CAR 2012 duty and protects the team. The customer&apos;s &quot;just keep going&quot; pressure is real but not legally defensible. ERA s.44 protects refusal. The cost of pausing for 48hrs is small; the cost of cumulative asbestos exposure decades later is generational.</>} />

          <SectionRule />
          <FAQ items={faqs} />
          <SectionRule />
          <KeyTakeaways points={[
            "Remember from Section 4.6 - CAR 2012 + presumption + escalation. Here we go deeper on the categorisation.",
            "Three categories: Licensed (HSE-licensed only), NNLW (trained + 14-day notification + medical surveillance), Non-licensed (trained + CAR controls).",
            "L3 supervisor doesn\'t categorise - escalates. Specialist makes the call.",
            "Discovery procedure: STOP / don\'t disturb / vacate / photograph / escalate / don\'t restart until confirmed.",
            "Reg 4 dutyholder maintains asbestos register for non-domestic premises.",
            "Reg 10 training mandatory for anyone potentially exposed. UKATA / IATP recognised providers.",
            "Asbestos waste regime: hazardous waste, HWCN, licensed carrier, permitted facility.",
            "Customer / employer pressure to skip survey is real but legally defensible refusal protected by ERA s.44.",
          ]} />
          <Quiz title="Asbestos supervisor escalation - knowledge check" questions={quizQuestions} />
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section6-3')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">6.3 Approved Documents</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section6-5')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next subsection <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">6.5 Confined Spaces 1997</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
