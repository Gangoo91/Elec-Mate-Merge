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
  { question: 'Does CAR 2012 apply to domestic premises?', answer: 'The Reg 4 duty to manage applies to non-domestic premises and the common parts of leasehold blocks. Inside individual domestic dwellings the Reg 4 duty does not bite, but CAR 2012 Reg 5 (identification) and Reg 16 (prevention or reduction of exposure) still apply to anyone working on the fabric — so contractors working in a 1960s flat must still presume ACMs, plan accordingly and seek information before disturbance.' },
  { question: 'How does CAR 2012 sit alongside CDM 2015 on a refurbishment job?', answer: 'CDM 2015 imposes the project-management duties (client, principal designer, principal contractor); CAR 2012 imposes the asbestos-specific duties. On a refurbishment of a pre-2000 building the client must provide pre-construction information including the asbestos register / refurbishment survey under CDM Reg 4. The principal contractor then plans the work around the surveyed ACMs. The two regimes interlock; missing either is a breach.' },
  { question: 'What is the 40-year exposure record requirement?', answer: 'CAR 2012 Reg 19 requires employers to keep a health record for each employee exposed above the Action Level for 40 years from the date of the last entry. Reason: the latency period for asbestos-related disease is 20-50 years, so the record needs to outlive most working careers to support diagnosis and any subsequent civil claim. Records typically include personal exposure monitoring results and medical surveillance outcomes.' },
  { question: 'How is the CAR 2012 enforcement landscape changing in 2026?', answer: 'HSE has maintained sustained focus on duty-to-manage compliance in non-domestic premises following the Work and Pensions Committee 2022 report. Inspection focus remains on the asbestos register being available, refurbishment survey scope matching work scope, and competence of any non-licensed work being performed. Penalties under CAR 2012 are unlimited in the Crown Court; the Sentencing Council Definitive Guideline applies.' },
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
            "Reg 4 duty to manage sits with the dutyholder of non-domestic premises — building owner, managing agent or person in control of the fabric. Register + survey + management plan + information to contractors are the operational outputs.",
            "Reg 19 requires 40-year retention of exposure records — latency for asbestos disease is 20-50 years so the record must outlive most working careers.",
            "Asbestos waste is hazardous waste under Hazardous Waste Regs 2005 — double-bagged, HWCN-accompanied, licensed-carrier-transported, permitted-facility-disposed. Mixing with general waste is a multiple-regs offence.",
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

          <RegsCallout source="Control of Asbestos Regulations 2012 - Reg 8(1)" clause={<>"Subject to regulation 3(2), an employer must ensure that any work with asbestos undertaken by the employer's employees is carried out in accordance with a licence granted by the Executive."</>} meaning={<>Reg 8 = licensing. Default is licensed; Reg 3(2) and HSE guidance create the NNLW and non-licensed exemptions for lower-risk activity. The L3 reflex: assume licensed-territory until proven otherwise.</>} cite="Source: Control of Asbestos Regulations 2012 (SI 2012/632), Reg 8." />

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

          <RegsCallout source="Control of Asbestos Regulations 2012 — Reg 4(3)" clause={<>&quot;In order to enable him to manage the risk from asbestos in non-domestic premises, the dutyholder shall ensure that — (a) such steps as are reasonable in the circumstances are taken in order to determine whether asbestos is or is liable to be present in the premises; (b) in determining whether asbestos is or is liable to be present in the premises, the dutyholder shall presume asbestos is present, unless there is strong evidence that it is not.&quot;</>} meaning={<>The presumption rule is the operational backbone of CAR 2012. Pre-2000 building = presume present until proven otherwise. The asbestos register and refurbishment / management surveys are the evidence base for ruling out presumption.</>} cite="Source: Control of Asbestos Regulations 2012 (SI 2012/632), Reg 4." />

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

          <RegsCallout source="Control of Asbestos Regulations 2012 — Reg 10(1)" clause={<>&quot;Every employer must ensure that adequate information, instruction and training is given to those of his employees — (a) who are or who are liable to be exposed to asbestos, or who supervise such employees, so that they are aware of — (i) the properties of asbestos and its effects on health... (iv) the means of identifying suspected asbestos containing materials, the actions to take to control exposure, and the importance of preventive controls.&quot;</>} meaning={<>The training duty. Three tiers: Asbestos Awareness for anyone potentially exposed; Non-Licensed Work training for non-licensed activity; Licensed Work training for HSE-licensed firms. UKATA / IATP recognised providers. Refresher periodic. Without current training + exposure occurs = Reg 10 breach + EAWR Reg 16 competence gap.</>} cite="Source: Control of Asbestos Regulations 2012 (SI 2012/632), Reg 10." />

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
          <ContentEyebrow>The Control Limit and Exposure Action Value</ContentEyebrow>

          <ConceptBlock
            title="Why asbestos has its own threshold framework separate from generic COSHH"
            plainEnglish="Asbestos has a Control Limit of 0.1 fibres per cm³ averaged over a 4-hour reference period. This is the airborne fibre concentration above which exposure must be reduced regardless of other factors. CAR 2012 also sets an Exposure Action Value (also called the Trigger Value in some HSE guidance) below which lower-tier non-licensed precautions may be adequate. The framework is structured but the L3 supervisor doesn&apos;t make the categorisation — that&apos;s the specialist&apos;s job. The L3 reflex is escalation; the framework lets you understand what the specialist will assess."
            onSite="Knowing the framework exists protects the L3 supervisor from over-confident self-categorisation. &apos;We&apos;ll do it ourselves under non-licensed&apos; sounds reasonable until you realise the categorisation involves measurement of expected fibre concentration, fibre type, friability of material, accessibility, duration of disturbance. That&apos;s a specialist judgement; the L3 supervisor&apos;s job is to escalate and document, not to decide."
          >
            <p>The CAR 2012 framework reference points:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Control Limit</strong> — 0.1 fibres/cm³ averaged over 4 hours;
                airborne concentration above which controls must be applied.
              </li>
              <li>
                <strong>Below Control Limit</strong> — non-licensed work may be permitted
                subject to other CAR 2012 requirements.
              </li>
              <li>
                <strong>Licensed work threshold</strong> — work likely to exceed Control
                Limit, or specific high-risk activities, requires HSE-licensed
                contractor.
              </li>
              <li>
                <strong>Notifiable Non-Licensed Work (NNLW)</strong> — middle tier; HSE
                notification, training, surveillance required but not full licensing.
              </li>
              <li>
                <strong>Health surveillance</strong> — required under Reg 22 for
                licensed and NNLW workers; lung function tests, chest X-rays,
                occupational health review.
              </li>
              <li>
                <strong>Exposure record</strong> — Reg 19 requires retention of exposure
                records for 40 years.
              </li>
              <li>
                <strong>Specialist assessment</strong> — the categorisation is the
                specialist&apos;s; the L3 supervisor&apos;s role is escalation, not
                determination.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Exposure records, health surveillance and the 40-year archive</ContentEyebrow>

          <ConceptBlock
            title="Why CAR 2012 mandates a 40-year health record"
            plainEnglish="Reg 19 of the Control of Asbestos Regulations 2012 requires every employer carrying out work with asbestos that exposes employees above the Action Level to keep a health record for each exposed employee, and to retain that record for 40 years from the date of the last entry. The logic is biological: mesothelioma, asbestos-related lung cancer and asbestosis typically declare 20-50 years after first exposure. A record retained only for the normal employment lifecycle (5-7 years) would routinely be discarded before disease emerged, leaving the worker without the evidence base needed to support diagnosis or claim. The 40-year window is engineered to outlast the latency period of most asbestos-related disease."
            onSite="The L3 supervisor practical reflex: confirm with the firm&apos;s H&amp;S manager that the exposure record exists; that personal monitoring (where required for NNLW or licensed work) has been done; that the record is held centrally; that operatives can request their own record. The record is not just an HSE compliance document — it is the operative&apos;s own life-long evidence base. When an operative leaves the firm, the firm retains the record (Reg 19(3)) and must provide a copy to the operative on request."
          >
            <p>Reg 19 health record elements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Record creation</strong> — for any employee exposed above the Action Level (a defined exposure level below the Control Limit but above which surveillance is triggered).</li>
              <li><strong>Personal monitoring</strong> — air sampling at the breathing zone where required by Reg 19; results form part of the record.</li>
              <li><strong>Medical surveillance</strong> — Reg 22 requires medical examination by an appointed doctor for licensed and NNLW workers, every 3 years.</li>
              <li><strong>Retention period</strong> — 40 years from the date of the last entry (Reg 19(2)).</li>
              <li><strong>Transfer on cessation</strong> — if the employer ceases trading, the record must be offered to HSE (Reg 19(4)).</li>
              <li><strong>Access by operative</strong> — operative entitled to a copy of their own record (Reg 19(3)).</li>
              <li><strong>Format</strong> — paper or electronic; legible; identifiable to a named individual.</li>
              <li><strong>Civil claim relevance</strong> — record is a primary evidence base in subsequent disease claim against employer or insurer.</li>
              <li><strong>L3 supervisor question</strong> — &quot;Does my firm keep this record and can I see mine?&quot;</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Control of Asbestos Regulations 2012 — Reg 22(1)"
            clause={<>&quot;Every employer shall ensure that each of his employees who is exposed to asbestos is under adequate medical surveillance by a relevant doctor.&quot;</>}
            meaning={<>Reg 22 is the medical-surveillance duty. Applies to operatives doing licensed work and NNLW. Medical examination by an HSE-appointed doctor; lung function tests; chest X-ray if clinically indicated; review every 3 years (or sooner if clinically required). Records integrate with the Reg 19 health record. Without medical surveillance an operative cannot lawfully do licensed or NNLW asbestos work.</>}
            cite="Source: Control of Asbestos Regulations 2012 (SI 2012/632), Reg 22."
          />

          <ConceptBlock
            title="Cross-regime — CDM 2015, BSA 2022 and the asbestos paper trail"
            plainEnglish="On any refurbishment or maintenance project in a pre-2000 building, CAR 2012 sits alongside CDM 2015 and (for higher-risk residential buildings) the Building Safety Act 2022. The client&apos;s pre-construction information under CDM 2015 Reg 4 must include the asbestos register and any refurbishment / demolition survey. The principal designer must factor ACM locations into the design; the principal contractor must factor them into the construction phase plan. For higher-risk residential buildings under BSA 2022, the Gateway 2 application to the Building Safety Regulator must demonstrate that asbestos has been identified and managed. The asbestos paper trail is therefore not optional CAR documentation — it is integral to CDM and BSA compliance too."
            onSite="L3 supervisor on a refurbishment project: ask three questions before starting. (1) Where is the asbestos register? (2) Is there a refurbishment / demolition survey scoped to the work areas? (3) Has the construction phase plan addressed ACMs? If any of the three is missing, the project is not properly de-risked and the contractor is exposed. Escalate; do not start. The CDM Reg 4 / Reg 8 / Reg 15 duties give you the regulatory basis to insist."
          >
            <p>The cross-regime asbestos paper trail:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>CAR 2012 Reg 4</strong> — dutyholder of non-domestic premises maintains the asbestos register and management plan.</li>
              <li><strong>CDM 2015 Reg 4</strong> — client provides pre-construction information including the asbestos register / refurbishment survey.</li>
              <li><strong>CDM 2015 Reg 11</strong> — principal designer plans the project considering ACMs in design decisions.</li>
              <li><strong>CDM 2015 Reg 12</strong> — principal contractor produces the construction phase plan addressing ACM management.</li>
              <li><strong>CDM 2015 Reg 12(5)</strong> — health and safety file at project completion records ACMs left in place.</li>
              <li><strong>BSA 2022 / HRRB Regs 2023</strong> — Gateway 2 application for higher-risk residential buildings must address asbestos management.</li>
              <li><strong>CAR 2012 Reg 8 + 9</strong> — licensed work / NNLW notification flows from the asbestos register identification.</li>
              <li><strong>CAR 2012 Reg 19 + 22</strong> — exposure record and medical surveillance for any operative exposed above the Action Level.</li>
              <li><strong>Defective Premises Act 1972 / BSA 2022 s.135</strong> — 30-year limitation period for claims relating to dwellings unfit for habitation — asbestos that subsequently exposes occupants is in scope.</li>
              <li><strong>L3 supervisor reflex</strong> — the paper trail is the project&apos;s defence; insist on it before starting.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The Asbestos (Prohibition) trail — 1985, 1992, 1999 and what that means for building age"
            plainEnglish="The UK banned asbestos in three waves. The Asbestos (Prohibition) Regulations 1985 banned crocidolite and amosite (the two amphiboles). The Asbestos (Prohibition) Regulations 1992 strengthened controls and extended prohibition. The Asbestos (Prohibition) Regulations 1999 banned the import, supply and use of all forms of asbestos in the UK from 24 November 1999 (with very narrow phase-out exceptions). The practical implication is &quot;pre-2000 building&quot; as the shorthand presumption: any building constructed, refurbished or maintained before November 1999 may contain ACMs and must be presumed to do so unless surveyed. The presumption is the operational backbone of CAR 2012 Reg 4."
            onSite="L3 supervisor mental model: building dated 1999 or earlier = presume ACMs until proven otherwise. Date the construction year, not the building&apos;s appearance — a 1990s building can look identical to a 2010 build; only the date matters. Refurbishment history matters too — a 1960s building refurbished in 1995 may have introduced ACMs in the 1995 work that weren&apos;t in the original construction. Ask the dutyholder about both construction and refurbishment dates when assessing presumption."
          >
            <p>Key dates in the UK asbestos prohibition trail:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1965</strong> — first scientific paper definitively linking asbestos exposure to mesothelioma (Newhouse and Thompson).</li>
              <li><strong>1969</strong> — Asbestos Regulations 1969 — first dedicated UK asbestos regulations.</li>
              <li><strong>1985</strong> — Asbestos (Prohibition) Regulations 1985 — crocidolite (blue) and amosite (brown) banned.</li>
              <li><strong>1987</strong> — Control of Asbestos at Work Regulations 1987 — expanded controls.</li>
              <li><strong>1992</strong> — Asbestos (Prohibition) Regulations 1992 — further prohibitions.</li>
              <li><strong>1999</strong> — Asbestos (Prohibition) Regulations 1999 — chrysotile (white) banned 24 November 1999.</li>
              <li><strong>2002</strong> — Control of Asbestos at Work Regulations 2002 — introduced duty to manage in non-domestic premises.</li>
              <li><strong>2006</strong> — Control of Asbestos Regulations 2006 — consolidated.</li>
              <li><strong>2012</strong> — Control of Asbestos Regulations 2012 (SI 2012/632) — current regulations.</li>
              <li><strong>Presumption date</strong> — pre-November 1999 = presume present until proven otherwise.</li>
              <li><strong>Refurbishment trail</strong> — refurbishment up to 1999 may have introduced ACMs even in newer base buildings.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The three asbestos minerals and friability — why categorisation depends on the type"
            plainEnglish="Three commercial asbestos minerals were used in UK buildings: chrysotile (white, serpentine family), amosite (brown, amphibole family) and crocidolite (blue, amphibole family). Crocidolite was the first to be banned (1985); amosite followed; chrysotile remained legal in some applications until November 1999 (Asbestos (Prohibition) Regulations 1992 and successors). All three are Group 1 carcinogens; the amphiboles (amosite, crocidolite) are more potent per fibre. Friability — how easily the material releases fibres — varies by product: sprayed coatings and lagging are highly friable (worst case); AIB is moderately friable; asbestos cement is the least friable (fibres bound in cement matrix, only released by aggressive disturbance like cutting / breaking). Categorisation under CAR 2012 reflects both the mineral type and the friability of the product."
            onSite="The L3 supervisor doesn&apos;t identify minerals on sight (that&apos;s a lab job under HSG248), but understanding the framework prevents over-confident self-categorisation. Friable + amphibole + significant quantity = licensed territory. Non-friable + small + chrysotile = potentially non-licensed but still requiring CAR 2012 controls. The point of the framework is that the specialist&apos;s categorisation is technical; the L3&apos;s job is to recognise the framework exists and escalate accordingly."
          >
            <p>The three minerals and their products:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Chrysotile (white)</strong> — serpentine family; most widely used; banned in UK November 1999.</li>
              <li><strong>Amosite (brown)</strong> — amphibole; insulating board, lagging, sprayed coatings.</li>
              <li><strong>Crocidolite (blue)</strong> — amphibole; most carcinogenic per fibre; banned 1985.</li>
              <li><strong>Friable products</strong> — sprayed coatings, lagging, loose fill insulation; high fibre release; licensed work.</li>
              <li><strong>Moderately friable</strong> — asbestos insulating board (AIB); ceiling tiles; partition panels.</li>
              <li><strong>Low friability</strong> — asbestos cement (sheet, pipes); textured coatings (Artex pre-1985); floor tiles.</li>
              <li><strong>Encapsulated</strong> — products where fibres are bound in resin / paint / cement matrix.</li>
              <li><strong>Categorisation</strong> — combines mineral type + friability + quantity + nature of disturbance.</li>
              <li><strong>HSG248</strong> — &quot;Asbestos: The analysts&apos; guide&quot; — HSE guidance on sampling and analysis.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="RPE for asbestos work — the right mask, the right fit, the right competence"
            plainEnglish="Respiratory protective equipment for asbestos work is highly specified. Disposable FFP3 masks are inadequate for sustained exposure. The minimum standard for non-licensed asbestos work is typically a half-mask reusable respirator with P3 filter cartridges (assigned protection factor 20) — and for licensed work powered air-purifying respirators (APF 40) or supplied-air systems. Fit-testing is mandatory under CAR 2012 Reg 8 and HSE OC 282/28: every wearer face-fit tested for the specific make and model of mask, with re-test every 2 years or on significant facial change. Fit-test record retained. Beard / stubble fails the fit-test — clean shaven for fitted mask work. The hierarchy: tight-fitting half-mask &lt; tight-fitting full-face &lt; loose-fitting hood / helmet (no fit-test needed but lower protection unless powered)."
            onSite="L3 supervisor on any asbestos-touching work: confirm RPE is fit-tested for each operative, fit-test certificate within 2 years, operative clean-shaven if wearing tight-fitting mask, filter cartridges in date and stored sealed when not in use. RPE without fit-test is RPE in name only — face-seal leak makes the assigned protection factor meaningless. Disposable FFP3 has very limited role in asbestos work and never for sustained exposure or licensed-territory tasks."
          >
            <p>Asbestos RPE specification:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>FFP3 disposable</strong> — APF 10; inadequate for sustained asbestos work; emergency / very brief contact only.</li>
              <li><strong>Half-mask reusable + P3</strong> — APF 20; non-licensed work minimum standard.</li>
              <li><strong>Full-face reusable + P3</strong> — APF 40; better seal and eye protection.</li>
              <li><strong>Powered air-purifying (PAPR) + P3</strong> — APF 40 (some 1000); preferred for sustained exposure.</li>
              <li><strong>Supplied-air breathing apparatus</strong> — APF 2000+; high-risk licensed work.</li>
              <li><strong>Fit-test</strong> — every wearer, every make / model, every 2 years (or significant facial change).</li>
              <li><strong>Fit-test methods</strong> — qualitative (taste / smell test) or quantitative (PortaCount); recorded.</li>
              <li><strong>Clean-shaven rule</strong> — beard / stubble breaks face seal; full beard fails fit-test for tight-fitting masks.</li>
              <li><strong>Filter management</strong> — sealed when not in use; replaced per manufacturer / on breakthrough indicator.</li>
              <li><strong>Decontamination</strong> — RPE doffed last; decontaminated or disposed of as hazardous waste.</li>
              <li><strong>Reg 16(1)(b)(i)</strong> — RPE is the last resort, not the first.</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Reusing the asbestos register as evidence the work area is &quot;clear&quot;"
            whatHappens={<>L3 supervisor reads the asbestos register, sees the work area not flagged, assumes no ACMs and proceeds with disturbance work. The register only documents what previous surveys found — not what they missed. Management surveys are non-invasive and routinely miss ACMs in concealed locations (inside walls, behind panels, in voids). The work disturbs concealed AIB; potential exposure incident; HSE investigation.</>}
            doInstead={<>The asbestos register is a starting point, not a conclusion. For refurbishment / disturbance work, insist on a Refurbishment / Demolition Survey scoped to the actual work areas — fully intrusive, designed to find what the management survey missed. The register confirms what was found; the refurb survey confirms what could be disturbed. They are different documents with different purposes.</>}
          />

          <RegsCallout
            source="Control of Asbestos Regulations 2012 — Reg 16(1)"
            clause={<>&quot;Every employer must — (a) prevent the exposure to asbestos of any employee employed by that employer so far as is reasonably practicable; (b) where it is not reasonably practicable to prevent such exposure — (i) take the measures necessary to reduce the exposure of his employees to asbestos to as low a level as is reasonably practicable by measures other than the use of respiratory protective equipment...&quot;</>}
            meaning={<>Reg 16 is the prevention-or-reduction duty. The hierarchy is fixed: prevent first; only if prevention is not reasonably practicable, reduce; RPE is the last resort, not the first. The L3 reflex on suspect ACM: don&apos;t disturb (prevention); if disturbance is unavoidable, full SSoW with controls (reduction); RPE is a control of last resort and never the primary line. Reg 16 binds even when the work is below licensed / NNLW threshold.</>}
            cite="Source: Control of Asbestos Regulations 2012 (SI 2012/632), Reg 16."
          />

          <Scenario
            title="1970s industrial unit — multiple ACMs identified during installation survey"
            situation={<>You&apos;re lead supervisor on a re-wire of a 1970s industrial unit being converted to a small workshop. The pre-construction information includes a refurbishment survey identifying: (1) AIB ceiling tiles throughout the office area (chrysotile + amosite mix, moderate condition); (2) asbestos cement guttering and downpipes externally (chrysotile, good condition); (3) suspected lagging on plant-room pipework (no sample taken — surveyor noted &quot;assumed amosite, requires further investigation&quot;). The customer wants to start in two weeks. Your firm is general electrical, not licensed asbestos.</>}
            whatToDo={<>Map each ACM to the appropriate response. (1) AIB ceiling tiles — any disturbance (cable routing through ceiling void, lighting installation, fire alarm) requires either licensed contractor to remove first OR work plan that demonstrably avoids disturbance (cables surface-mounted in trunking below ceiling, fittings on existing tile penetrations). Engage the asbestos surveyor / licensed contractor for the assessment. (2) Asbestos cement guttering — likely non-licensed if disturbed at small scale (cutting for new RCD-protected supply to external lighting), but written plan, RPE, dust suppression, hazardous waste handling required. Check whether your firm has the non-licensed capability or refer to specialist. (3) Plant-room lagging — &quot;assumed amosite, requires further investigation&quot; means the refurbishment survey is incomplete for that area. Insist on the further sample and analysis before any plant-room work starts. Update the construction phase plan accordingly. Brief the team — &quot;these are the three ACMs, these are the three responses, here are the boundaries you do not cross.&quot; Document. Two weeks is not enough time if the plant-room sample requires lab turnaround and any licensed removal is needed — push back on timeline with the customer / client.</>}
            whyItMatters={<>The 1970s industrial conversion is the classic high-risk asbestos project. Multiple ACMs, varying friability, an incomplete survey, and a customer in a hurry. The L3 supervisor reflex — map each ACM to its response, insist on the missing data, push back on timeline — is what prevents the cumulative exposure that contributes to disease decades later. Reg 16 hierarchy (prevent &gt; reduce &gt; RPE), Reg 8 licensing distinction, Reg 19 exposure record, CDM Reg 4 pre-construction information — all converge on this project. The supervisor who can hold the conversation across all of them is operating at L3 dutyholder level, not L2 operative level.</>}
          />

          <SectionRule />
          <ContentEyebrow>The L3 supervisor decision tree on a pre-2000 building</ContentEyebrow>

          <ConceptBlock
            title="Decision tree — from arrival to first disturbance on a pre-2000 building"
            plainEnglish="The L3 supervisor on a pre-2000 building runs a structured decision tree before any disturbance work. Step 1 — confirm building age (construction + refurbishment dates). Step 2 — non-domestic? Ask for the asbestos register and management plan (Reg 4 duty). Step 3 — domestic? Confirm whether a recent survey exists; if not, the contractor must still presume and plan. Step 4 — work involves disturbance? Refurbishment / Demolition Survey scoped to the work areas, not a management survey. Step 5 — ACMs identified? Map each to its response (licensed contractor / NNLW / non-licensed / avoid disturbance). Step 6 — work plan amended to reflect ACM locations. Step 7 — operatives briefed; training current; RPE in date and fit-tested. Step 8 — disturbance begins only when all preceding steps are documented and signed off."
            onSite="The tree is the discipline that prevents the cumulative drift of &quot;it&apos;s a small job, we&apos;ll just crack on.&quot; Every step is a checkpoint. If any step fails, escalate before proceeding. The dutyholder / firm / principal contractor share the duty-chain — the L3 supervisor&apos;s role is to insist on the tree being walked, document where it was walked, and refuse where it wasn&apos;t. ERA s.44 protects the refusal where conditions are unsafe."
          >
            <p>Decision-tree checkpoints:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li><strong>Building age</strong> — construction date + refurbishment dates; pre-1999 = presume.</li>
              <li><strong>Premises type</strong> — non-domestic = Reg 4 duty to manage applies; domestic = Reg 5 + 16 still apply to contractors.</li>
              <li><strong>Existing documentation</strong> — asbestos register; management plan; previous surveys; clearance certificates.</li>
              <li><strong>Work scope</strong> — disturbance vs non-disturbance; refurbishment survey if disturbance.</li>
              <li><strong>ACM mapping</strong> — each identified ACM mapped to response (licensed / NNLW / non-licensed / avoid).</li>
              <li><strong>Work plan amendment</strong> — design / programme adjusted to reflect ACM locations.</li>
              <li><strong>Competence check</strong> — operatives trained per Reg 10; refresher in date; medical surveillance where required.</li>
              <li><strong>PPE / RPE</strong> — fit-tested; in date; appropriate to the task.</li>
              <li><strong>Decontamination</strong> — DCU arrangements appropriate to the work tier.</li>
              <li><strong>Waste</strong> — HWCN arrangements; carrier registered; disposal facility identified.</li>
              <li><strong>Notification</strong> — HSE notified 14 days in advance if NNLW; licensed contractor handles for licensed work.</li>
              <li><strong>Sign-off</strong> — every step documented; signed by responsible person; available to HSE on inspection.</li>
              <li><strong>Refusal point</strong> — any step incomplete = refusal protected by ERA s.44 + CAR 2012 duty.</li>
            </ol>
          </ConceptBlock>

          <Scenario
            title="Customer pressure on a small after-hours commercial fit-out"
            situation={<>You&apos;re lead L3 on a small after-hours commercial fit-out in a 1980s retail unit. Customer wants new emergency lighting installed in a back-of-house corridor; needs cables run through suspended ceiling void; wants work complete in one evening to avoid trading disruption. On opening the first ceiling tile you see what looks like AIB above. No asbestos register has been provided by the customer; the customer&apos;s manager says &quot;it&apos;s fine, we&apos;ve had electricians in before.&quot;</>}
            whatToDo={<>Run the decision tree on the spot. Building 1980s = presume ACMs. Non-domestic = Reg 4 duty applies to the dutyholder (customer / managing agent). Disturbance work = refurbishment survey required. AIB visibly present = potentially licensed territory. Manager&apos;s &quot;electricians have been in before&quot; is not evidence — they may have created exposure incidents that simply weren&apos;t recognised. STOP. Don&apos;t open any more tiles. Lower the lifted tile back gently. Phone your firm&apos;s contracts manager and the customer&apos;s dutyholder. Request the asbestos register (Reg 4 obligation). Request a refurbishment survey of the ceiling void if any disturbance is to occur. Explain to the customer: the one-evening timeline is no longer feasible without survey + (possibly) licensed contractor. Offer alternative — surface-mounted conduit avoiding ceiling void disturbance, if engineering permits. Document everything. If the customer pushes for the work to continue without survey, refuse on the basis of CAR 2012 + ERA s.44; escalate to firm; let firm decide commercial response. The fact you found AIB on tile 1 means tiles 2-200 are statistically likely to contain the same; one evening&apos;s pressure cannot override decades of latency risk for the team.</>}
            whyItMatters={<>The after-hours commercial fit-out is a classic asbestos-discovery scenario. Customer in a hurry, no register, suspect material on first lift, manager dismissing concerns. The L3 supervisor reflex — stop, escalate, refuse without survey — is what discharges CAR 2012 duty and protects the team. The decision tree provides the structured basis for the refusal: not a personal reluctance but a regulatory requirement. The customer&apos;s commercial pressure is real but cannot override Reg 4 / Reg 5 / Reg 8 / Reg 16. The contract may be lost; the operative health is preserved across a career. The L3 supervisor who can hold this conversation calmly with the customer is operating at dutyholder level.</>}
          />

          <SectionRule />
          <ContentEyebrow>Decontamination, hygiene and the dirty-clean transition</ContentEyebrow>

          <ConceptBlock
            title="The HSE published action level and control limit — operational thresholds"
            plainEnglish="CAR 2012 sets two key operational thresholds. The Control Limit is 0.1 fibres/cm³ averaged over a 4-hour reference period — the airborne concentration above which exposure must be reduced through controls regardless of other factors. The Action Level (the older terminology, replaced by various trigger values in the current regs) historically sat at lower concentrations and triggered specific duties like medical surveillance. The Clearance Indicator after licensed work is 0.01 fibres/cm³ — one-tenth of the Control Limit, used in the four-stage clearance procedure. These thresholds are operational, not safe — there is no safe exposure threshold for asbestos. The thresholds calibrate the level of control required, not the acceptability of exposure."
            onSite="L3 supervisor framing: the thresholds are HSE&apos;s engineering targets for control measures, not a permission to expose below them. The hierarchy remains prevent &gt; reduce &gt; RPE; the thresholds tell you what controls are minimally required, not what is acceptable. Every fibre inhaled contributes to lifetime risk; the discipline is to minimise across the career, not to operate at threshold."
          >
            <p>CAR 2012 operational thresholds:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Control Limit</strong> — 0.1 fibres/cm³ averaged over 4 hours.</li>
              <li><strong>Clearance Indicator</strong> — 0.01 fibres/cm³ for four-stage clearance after licensed work.</li>
              <li><strong>Action Level (historical)</strong> — triggered specific surveillance duties; framework retained in current regs.</li>
              <li><strong>Short-term Exposure Limit</strong> — 0.6 fibres/cm³ averaged over 10 minutes for short-duration peak exposures.</li>
              <li><strong>No safe threshold</strong> — every fibre contributes to lifetime risk.</li>
              <li><strong>Engineering targets</strong> — thresholds calibrate control measures, not acceptability.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The IET Code of Practice and BS 7671:2018+A4:2026 cross-reference"
            plainEnglish="The IET Code of Practice for Electrical Installations and BS 7671:2018+A4:2026 (Wiring Regulations) intersect with CAR 2012 in several places: cable routing decisions that affect ACM disturbance; segregation requirements in buildings with ACMs; periodic inspection requirements that may encounter ACMs; consumer unit / distribution board work in pre-2000 buildings; fire alarm and emergency lighting installation in occupied premises with surveyed ACMs. BS 7671 Regulation 134.1.1 (selection and erection) and Regulation 522.1 (general selection requirements) both bring the installer&apos;s judgement on cable route and protection into the asbestos discipline — a cable route that minimises ACM disturbance discharges both BS 7671 and CAR 2012 duties simultaneously."
            onSite="L3 supervisor as designer / installer: ACM locations inform circuit design, cable route, accessory placement, containment routing. The design decision that avoids drilling through an AIB partition is both a BS 7671 selection-and-erection decision and a CAR 2012 Reg 16 prevention decision. The two regimes align in practice — good design under BS 7671 typically means low ACM disturbance under CAR 2012."
          >
            <p>BS 7671 / IET CoP cross-references with CAR 2012:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>BS 7671 Reg 134.1.1</strong> — selection and erection of equipment; design decision incorporates ACM locations.</li>
              <li><strong>BS 7671 Reg 522.1</strong> — general selection requirements; cable route avoids ACM disturbance where reasonably practicable.</li>
              <li><strong>BS 7671 Reg 132.6</strong> — additions and alterations; consideration of existing installation including ACMs.</li>
              <li><strong>BS 7671 Reg 651</strong> — periodic inspection; visual inspection may encounter ACMs.</li>
              <li><strong>IET CoP Section 2</strong> — competence and training including asbestos awareness.</li>
              <li><strong>IET CoP Section 5</strong> — design considerations including building fabric interactions.</li>
              <li><strong>Cross-regime alignment</strong> — good BS 7671 design typically means low CAR 2012 disturbance.</li>
              <li><strong>L3 dutyholder framing</strong> — design at L3 level integrates Wiring Regulations + asbestos discipline + CDM duties.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Toolbox topics — what to brief at the start of pre-2000 building work"
            plainEnglish="Every shift on a pre-2000 building begins with a brief toolbox specifically covering asbestos awareness — not the generic shift brief but a targeted ACM brief. Content: what ACMs are identified on this building (per register / survey); where they are; what the work plan does to avoid disturbance; what the discovery procedure is if suspect material is encountered; who to phone (firm + dutyholder + PC); what RPE / PPE is in use today; where the DCU / decontamination point is; where the H-class vacuum is; how waste is segregated. Five-minute brief at the start of shift; reinforced through the day at toolbox breaks. The repetition embeds the discovery reflex."
            onSite="The L3 supervisor delivers the brief consistently — even on day 50 of a long project. Repetition is the discipline; complacency is the enemy. Operatives who have heard the brief 50 times still benefit from the 51st, because the day they cut into an unsurveyed ceiling is the day the reflex matters. The brief also creates the documented evidence trail — toolbox talk records contribute to the firm&apos;s Reg 16 defence on prevention-or-reduction."
          >
            <p>Toolbox talk content for pre-2000 building work:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Building age recap</strong> — &quot;this building is 1970s; pre-2000 presumption applies.&quot;</li>
              <li><strong>Surveyed ACMs</strong> — &quot;these are the ACMs the survey identified, here are the locations.&quot;</li>
              <li><strong>Today&apos;s work plan</strong> — &quot;today we&apos;re working in X area; the plan avoids ACM disturbance because Y.&quot;</li>
              <li><strong>Discovery procedure</strong> — &quot;if you find suspect material, STOP, don&apos;t disturb, vacate, photograph, phone me.&quot;</li>
              <li><strong>Escalation contacts</strong> — names and phone numbers; firm&apos;s H&amp;S; customer&apos;s dutyholder; PC.</li>
              <li><strong>PPE / RPE</strong> — &quot;today we&apos;re wearing X; fit-test cert in date; clean shaven.&quot;</li>
              <li><strong>Decontamination point</strong> — location of DCU / wash facilities; segregation of contaminated items.</li>
              <li><strong>Waste handling</strong> — segregation; H-class vacuum; double-bagging if ACM-touching.</li>
              <li><strong>Record</strong> — toolbox attendance signed; topic recorded; contributes to Reg 16 defence.</li>
              <li><strong>Frequency</strong> — every shift on a pre-2000 building; refreshed if work area changes.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Common pre-2000 building ACMs an electrician encounters"
            plainEnglish="The L3 supervisor working on pre-2000 buildings learns to recognise the visual and contextual signatures of common ACMs — not to make the categorisation (that&apos;s the specialist&apos;s job) but to trigger the escalation reflex. AIB ceiling tiles, sprayed limpet coatings on structural steel, lagging on pipework / boilers, asbestos cement roofing and guttering, vinyl floor tiles with bituminous adhesive, textured coatings (Artex pre-1985), gaskets in switchgear, rope seals in industrial equipment, fire door cores, and string-lined cable trays in older industrial / utility settings. Each has a typical location and visual signature; each warrants STOP-and-escalate on encounter."
            onSite="The L3 supervisor builds a visual library over a career — what AIB looks like compared to plasterboard, what asbestos cement looks like compared to fibre cement, where lagging is typically routed in plant rooms. The point is not certainty (the specialist confirms) but reflex — recognising the candidate fast enough to stop disturbance before exposure occurs. Asbestos awareness training (CAR 2012 Reg 10) builds the initial library; on-the-job exposure to surveyed buildings extends it."
          >
            <p>Common pre-2000 ACMs and their typical locations:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>AIB (Asbestos Insulating Board)</strong> — ceiling tiles, partition panels, soffits, eaves, fire-protection linings on steelwork.</li>
              <li><strong>Sprayed coatings</strong> — limpet sprayed on structural steel for fire / thermal insulation; highly friable; licensed-only.</li>
              <li><strong>Lagging</strong> — pipework, boilers, calorifiers; thermal insulation; highly friable; licensed-only.</li>
              <li><strong>Asbestos cement</strong> — roofing sheets, guttering, downpipes, soffit boards, flue pipes; low friability bound in cement.</li>
              <li><strong>Vinyl / thermoplastic floor tiles</strong> — pre-2000 vinyl floor tiles often chrysotile; bitumen adhesive sometimes asbestos.</li>
              <li><strong>Textured coatings (Artex)</strong> — pre-1985 textured ceiling / wall coatings; chrysotile in the mix.</li>
              <li><strong>Gaskets and rope seals</strong> — switchgear flanges, industrial equipment joints, oven door seals.</li>
              <li><strong>Cable products</strong> — some older industrial cable trays / glands with asbestos rope packing.</li>
              <li><strong>Fire doors</strong> — pre-2000 fire door cores sometimes contained AIB or millboard.</li>
              <li><strong>Insulating panels in fuseboards</strong> — rare but possible in pre-2000 industrial fuseboards.</li>
              <li><strong>Reservoir / tank linings</strong> — some industrial tanks lined with asbestos products.</li>
              <li><strong>Boiler flues</strong> — older flue pipes often asbestos cement.</li>
              <li><strong>Soffit / fascia boards</strong> — pre-2000 external boards often asbestos cement.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Control of Asbestos Regulations 2012 — Reg 19(2)"
            clause={<>&quot;The health record, or a copy thereof, shall be kept in a suitable form for at least 40 years from the date of the last entry made in it.&quot;</>}
            meaning={<>The 40-year retention duty. Aligns with the 20-50 year latency for asbestos-related disease. The record must outlive the operative&apos;s working career and be available decades later to support diagnosis and any subsequent civil claim. Reg 19(3) entitles the operative to a copy of their own record. Reg 19(4) requires offering the record to HSE if the employer ceases trading.</>}
            cite="Source: Control of Asbestos Regulations 2012 (SI 2012/632), Reg 19."
          />

          <ConceptBlock
            title="The decontamination unit principle and the dirty-clean transition"
            plainEnglish="For any non-trivial asbestos work the operational discipline is the dirty-clean transition: the work area is &quot;dirty&quot;; the area outside is &quot;clean&quot;; the transition between them is managed by a decontamination procedure that prevents fibre carry-over on persons, clothing, tools and waste. For licensed work the standard is a three-stage decontamination unit (DCU): a dirty end for shedding contaminated PPE, a shower stage, and a clean end for fresh clothing. For non-licensed work simpler arrangements may be adequate — but the dirty-clean principle remains: nobody and nothing crosses from the work area to the wider site without managed transition."
            onSite="The L3 supervisor reflex even on a small non-licensed task: where does the dirty end? Where does the clean end begin? How does the operative cross? Without a clear answer the fibres travel home — to the van, to the workshop, to family members through clothing. The Allitt / Anglesey case-history pattern of family-member mesothelioma from a father&apos;s contaminated overalls is decades-old but still operationally relevant. Decontamination is what stops the dose carrying forward."
          >
            <p>Decontamination practice elements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Dirty area</strong> — the immediate work area where disturbance occurs; ACM dust possible.</li>
              <li><strong>Clean area</strong> — the wider site / outside; protected from contamination.</li>
              <li><strong>Transition zone</strong> — managed handover; doffing of PPE; cleaning of tools; shedding of overalls.</li>
              <li><strong>Three-stage DCU (licensed)</strong> — dirty end, shower, clean end; physically separated.</li>
              <li><strong>One-stage / vehicle DCU</strong> — for some NNLW; subject to risk assessment.</li>
              <li><strong>Disposable coveralls</strong> — type 5/6 minimum; disposed of as hazardous waste at end of shift.</li>
              <li><strong>Tools</strong> — H-class vacuum cleaned; wet-wiped; checked before removal.</li>
              <li><strong>Boots</strong> — disposable overshoes or dedicated work boots cleaned at transition.</li>
              <li><strong>Personal hygiene</strong> — wash hands and face before any eating / drinking / smoking.</li>
              <li><strong>Vehicle hygiene</strong> — separate bagged storage of contaminated items; no contaminated clothing in cab.</li>
              <li><strong>Home hygiene</strong> — never wear work clothes home from asbestos work — historic family-member exposure pattern.</li>
              <li><strong>H-class vacuum</strong> — Class H per BS EN 60335-2-69; HEPA filter; sealed disposal; only type rated for asbestos.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Domestic asbestos — the duty profile in a private home"
            plainEnglish="CAR 2012 Reg 4 (duty to manage) applies only to non-domestic premises and the common parts of leasehold residential blocks. Inside individual privately-owned dwellings the Reg 4 duty does not bite — the homeowner is not under a statutory duty to maintain an asbestos register. However, CAR 2012 Reg 5 (identification), Reg 16 (prevention or reduction of exposure) and Reg 8 (licensing) still apply to any contractor doing work in the home. The practical implication: contractors working in pre-2000 private dwellings cannot rely on the homeowner&apos;s register; the contractor must apply presumption and (for disturbance work) procure a refurbishment survey before disturbance. The cost discussion with the homeowner becomes part of the contractor&apos;s standard process for pre-2000 dwellings."
            onSite="L3 supervisor explaining to a homeowner: &quot;Your home is pre-2000. Asbestos was used in many materials in homes of that age. We can&apos;t safely or lawfully start disturbance work without knowing what&apos;s there. The survey costs £X and takes Y days; it protects you, your family, and us. We&apos;ll plan the work around what the survey finds.&quot; The homeowner&apos;s consent isn&apos;t the issue — the regulatory duty is on the contractor regardless. Tactful framing as a protective measure rather than a regulatory imposition keeps the customer relationship intact."
          >
            <p>Domestic asbestos duty profile:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Reg 4 not applicable</strong> — duty to manage applies only to non-domestic premises and common parts of leasehold blocks.</li>
              <li><strong>Reg 5 applicable</strong> — identification of ACMs by any contractor working on the fabric.</li>
              <li><strong>Reg 8 applicable</strong> — licensing requirement for licensed work regardless of premises type.</li>
              <li><strong>Reg 16 applicable</strong> — prevention or reduction of exposure applies to all contractors.</li>
              <li><strong>Reg 22 applicable</strong> — medical surveillance for contractor&apos;s operatives doing licensed / NNLW work.</li>
              <li><strong>Contractor&apos;s reliance</strong> — cannot rely on homeowner&apos;s register; must presume and survey for disturbance.</li>
              <li><strong>Domestic waste disposal</strong> — local authority arrangements for householder-generated; contractor-generated through licensed route.</li>
              <li><strong>Customer communication</strong> — framed as protection rather than imposition; cost and time agreed up front.</li>
              <li><strong>Liability framing</strong> — Defective Premises Act 1972 / BSA 2022 s.135 30-year period applies to dwellings.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The HSE notification of NNLW — the practical process and common failures"
            plainEnglish="Notifiable Non-Licensed Work requires HSE notification 14 days in advance via the online notification system (notification.hse.gov.uk). Notification requires: employer details, work location, type of asbestos work, start and end dates, scope of work, name of person responsible, details of operatives involved. Notification is per project; not a blanket annual notification. Failure to notify is a CAR 2012 Reg 9 breach. Common practical failures: notification submitted late (less than 14 days); notification submitted but no medical surveillance evidence; notification scope doesn&apos;t match work actually carried out; notification not retained as part of project records."
            onSite="L3 supervisor on any NNLW job: ask &quot;has the HSE notification been submitted, on what date, by whom?&quot;. If the answer is unclear, the project is at risk regardless of the work quality itself. The notification process is the dutyholder&apos;s evidence trail; the L3 supervisor confirms the trail exists before the work starts. The 14-day lead time also forces realistic planning — emergency NNLW the day before the work is rarely lawful."
          >
            <p>NNLW notification process:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Online portal</strong> — notification.hse.gov.uk for England, Wales, Scotland.</li>
              <li><strong>14-day lead time</strong> — notification must be submitted at least 14 days before work starts.</li>
              <li><strong>Per-project</strong> — separate notification for each NNLW project.</li>
              <li><strong>Required details</strong> — employer; location; type of asbestos; dates; scope; responsible person; operatives.</li>
              <li><strong>Confirmation</strong> — HSE provides acknowledgement reference; retain with project records.</li>
              <li><strong>Scope changes</strong> — if scope materially changes, fresh notification may be required.</li>
              <li><strong>Reg 9</strong> — CAR 2012 Reg 9 sets the notification duty.</li>
              <li><strong>Medical surveillance evidence</strong> — operatives must have current Reg 22 surveillance to work.</li>
              <li><strong>Records retention</strong> — notification + medical surveillance records part of Reg 19 health record archive.</li>
              <li><strong>Common failures</strong> — late submission; scope mismatch; missing medical surveillance; no operative training records.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Civil claims, occupational disease and the long tail of liability"
            plainEnglish="Asbestos-related disease drives one of the largest occupational civil claim regimes in UK law. Mesothelioma claims under the Compensation Act 2006 s.3 allow recovery against any responsible employer where the claimant was exposed even briefly; the courts apportion on contribution between employers and insurers. The Pneumoconiosis etc. (Workers&apos; Compensation) Act 1979 provides state compensation where civil recovery is not practical (employer dissolved, insurer untraceable). Limitation Act 1980 s.11 starts the 3-year limitation clock from date of knowledge — for mesothelioma typically the date of diagnosis, decades after exposure. The Defective Premises Act 1972 / BSA 2022 s.135 30-year period applies to dwellings unfit for habitation including those affected by improperly managed asbestos."
            onSite="L3 supervisor framing for the team: the asbestos discipline today is the family&apos;s defence in 30 years. The Reg 19 health record is the operative&apos;s primary evidence; the firm&apos;s liability insurance (Employers&apos; Liability Compulsory Insurance Act 1969 — minimum cover) is the financial backstop; the firm&apos;s succession (mergers, dissolution, sale) shapes which insurer ultimately bears the claim. The motivational framing is not abstract — it&apos;s the recognition that current discipline creates a paper trail that supports both diagnosis and claim if disease emerges decades later."
          >
            <p>Civil claim and compensation framework:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Compensation Act 2006 s.3</strong> — joint and several liability for mesothelioma where exposure occurred.</li>
              <li><strong>Pneumoconiosis etc. (Workers&apos; Compensation) Act 1979</strong> — state scheme where civil recovery impractical.</li>
              <li><strong>Limitation Act 1980 s.11</strong> — 3-year limit from date of knowledge (typically date of diagnosis).</li>
              <li><strong>Employers&apos; Liability Compulsory Insurance Act 1969</strong> — minimum cover requirement.</li>
              <li><strong>Defective Premises Act 1972 / BSA 2022 s.135</strong> — 30-year limitation for dwellings unfit for habitation.</li>
              <li><strong>Industrial Injuries Disablement Benefit</strong> — state benefit for prescribed industrial diseases including asbestos disease.</li>
              <li><strong>Reg 19 health record</strong> — primary evidence base in claim.</li>
              <li><strong>Insurer succession</strong> — historic exposure may be covered by insurers no longer trading; ELTO database tracks.</li>
              <li><strong>ELTO</strong> — Employers&apos; Liability Tracing Office; searchable database for historic insurance.</li>
              <li><strong>Trustee in bankruptcy</strong> — claims may proceed against insolvent firm via insurer.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Enforcement landscape — HSE inspection focus, FFI and Sentencing Council"
            plainEnglish="HSE enforcement of CAR 2012 has been a consistent priority since the 2002 duty-to-manage regime. Current enforcement focus areas: dutyholder asbestos register and management plan in non-domestic premises; refurbishment survey scope matching work scope; competence of operatives doing non-licensed work; HSE notification of NNLW (often poorly complied with by smaller contractors); medical surveillance records for NNLW workers. Fee For Intervention (FFI) under the Health and Safety (Fees) Regulations 2012 means HSE recovers inspection costs from dutyholders found in material breach — currently £174/hour (HSE published rate). For prosecutions the Sentencing Council Definitive Guideline for Health and Safety Offences (2016) sets the framework: culpability × harm × turnover, then aggravating / mitigating factors."
            onSite="L3 supervisor practical implication: HSE inspection of an asbestos-touching project is not theoretical. The inspector will ask for the register, the survey, the notification, the training records and the medical surveillance records. Absence of any of these is material breach with FFI consequences for the dutyholder / firm. Knowing the framework lets the L3 supervisor calibrate the firm&apos;s preparation: paper trail in order, escalation points identified, refusal-protected by ERA s.44 where conditions don&apos;t meet the framework."
          >
            <p>Enforcement framework elements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>HSE inspection priorities</strong> — duty to manage; refurbishment survey scope; non-licensed competence; NNLW notification; medical surveillance.</li>
              <li><strong>Fee For Intervention</strong> — Health and Safety (Fees) Regulations 2012; HSE recovers inspection costs on material breach.</li>
              <li><strong>FFI rate</strong> — £174/hour (HSE published rate, subject to periodic revision).</li>
              <li><strong>Improvement Notice</strong> — HSE notice requiring remedy within stated period.</li>
              <li><strong>Prohibition Notice</strong> — HSE notice prohibiting continuation of specified activity.</li>
              <li><strong>Prosecution</strong> — magistrates&apos; court (unlimited fine since LASPO 2012) or Crown Court (unlimited fine, custody for individuals).</li>
              <li><strong>Sentencing Council Definitive Guideline 2016</strong> — culpability × harm × turnover matrix.</li>
              <li><strong>Individual prosecution under HASAWA s.37</strong> — directors / managers personally liable.</li>
              <li><strong>Aggravating factors</strong> — previous convictions; deliberate breach; ignoring concerns raised.</li>
              <li><strong>Mitigating factors</strong> — early guilty plea; remediation; co-operation; safety record.</li>
              <li><strong>HSE Operational Circular 282</strong> — internal guidance on asbestos inspection.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Air monitoring and clearance — the four-stage four-stage clearance certificate"
            plainEnglish="After licensed asbestos removal the work area cannot return to normal occupation until a four-stage clearance procedure confirms the area is below the Clearance Indicator level of 0.01 fibres/cm³ (one-tenth of the Control Limit). The four stages: (1) preliminary check — visual inspection that gross removal is complete and the enclosure is intact; (2) thorough visual inspection — detailed visual to confirm no residual ACM debris; (3) air monitoring — sampling at the breathing zone with results below clearance indicator; (4) final assessment — independent UKAS-accredited analyst issues Certificate of Reoccupation. Without certificate of reoccupation the area remains controlled."
            onSite="L3 supervisor on a project where licensed asbestos work has been completed: before allowing operatives back into the affected area, confirm the Certificate of Reoccupation has been issued and read its scope — sometimes only specific rooms are cleared. The certificate is the regulatory permission to resume normal occupation; without it, fresh exposure risk persists from disturbed fibres still in the air or on surfaces. The four-stage process is not optional; HSG248 sets it out and HSE auditors check."
          >
            <p>Four-stage clearance procedure:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Stage 1</strong> — preliminary check of work completion and enclosure integrity by licensed contractor.</li>
              <li><strong>Stage 2</strong> — thorough visual inspection by independent UKAS-accredited analyst.</li>
              <li><strong>Stage 3</strong> — air monitoring at breathing zone; result below Clearance Indicator 0.01 fibres/cm³.</li>
              <li><strong>Stage 4</strong> — final assessment and Certificate of Reoccupation issued by analyst.</li>
              <li><strong>Clearance Indicator</strong> — 0.01 fibres/cm³ (one-tenth of the Control Limit 0.1 f/cm³).</li>
              <li><strong>UKAS accreditation</strong> — analyst body accredited under ISO/IEC 17025 for asbestos air monitoring.</li>
              <li><strong>HSG248</strong> — &quot;Asbestos: The analysts&apos; guide&quot; — HSE guidance underpinning the procedure.</li>
              <li><strong>Reoccupation</strong> — only after certificate; access to area controlled until then.</li>
              <li><strong>Scope</strong> — certificate often room-by-room; confirm scope before reoccupation.</li>
              <li><strong>Retention</strong> — certificate retained with asbestos register as evidence of work completion.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The L3 supervisor mindset — asbestos as a career-long discipline"
            plainEnglish="Asbestos discipline is not a one-off event but a career-long pattern. The L3 supervisor treats every pre-2000 building with the same reflex; every suspect material with the same STOP; every escalation as routine rather than exceptional. The cumulative discipline over decades is what produces a career without asbestos-related disease. The shortcut today is the diagnosis in thirty years. The team that sees the supervisor model the discipline consistently learns it; the team that sees the supervisor cut corners learns that too."
            onSite="The L3 framing for the team: &quot;we always presume; we always survey; we always stop on suspect; we always escalate. Not because someone is watching; because thirty years from now we want to be the team that didn&apos;t get the diagnosis.&quot;"
          >
            <p>Mindset principles:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Routine</strong> — same reflex every time; no exceptions for &quot;small jobs&quot;.</li>
              <li><strong>Modelling</strong> — supervisor behaviour shapes team behaviour.</li>
              <li><strong>Long-horizon</strong> — discipline today is diagnosis prevented in 30 years.</li>
              <li><strong>Documented</strong> — every step recorded; evidence trail for defence and for own health record.</li>
              <li><strong>Refusal-protected</strong> — ERA s.44 protects refusal of unsafe instruction.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Working alongside a licensed contractor — the L3 supervisor interface"
            plainEnglish="On a project where a licensed asbestos contractor is engaged for specific removal / encapsulation tasks, the L3 electrical supervisor manages the interface: when can electrical work proceed; what areas are off-limits; what enclosures are erected; what timetable governs handover; what evidence is needed before returning to a work area. The licensed contractor controls the enclosure boundary and the clearance; the electrical contractor controls work outside the enclosure and resumes work inside only on certificate."
            onSite="L3 supervisor practice: hold a coordination meeting with the licensed contractor at project start. Map the project areas; map the licensed work plan onto the electrical work plan; identify clashes; agree sequencing; agree handover criteria. Document. The Certificate of Reoccupation is the regulatory permission to resume; without it, the area is closed regardless of project pressure."
          >
            <p>Licensed contractor interface elements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Coordination meeting at start</strong> — area mapping; sequencing; handover criteria.</li>
              <li><strong>Enclosure boundaries</strong> — physical demarcation; off-limits to electrical until cleared.</li>
              <li><strong>Sequencing</strong> — licensed work first; clearance; then electrical inside the cleared area.</li>
              <li><strong>Certificate of Reoccupation</strong> — regulatory permission to resume work inside.</li>
              <li><strong>Updated register</strong> — provided post-clearance; reflects ACMs removed / remaining.</li>
              <li><strong>Construction Phase Plan</strong> — reflects the interface arrangements.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Closure — handover back to service after asbestos work in occupied premises"
            plainEnglish="When licensed or NNLW asbestos work completes in occupied premises (commercial, residential, mixed-use), the handover back to normal occupation is a structured process: licensed contractor confirms work complete; UKAS analyst conducts four-stage clearance; Certificate of Reoccupation issued; asbestos register updated to reflect ACMs left in place / removed; dutyholder briefed on new register status; occupants briefed where appropriate (typically by RP / managing agent); residual ACM management plan updated. The L3 supervisor on a follow-on electrical job benefits from being late in this chain — the updated register provides clearer ACM information than the original."
            onSite="L3 supervisor on a project following recent asbestos remediation: ask specifically for the updated register and the Certificate of Reoccupation. The remediation may have only addressed a specific area; ACMs elsewhere remain. The register and certificate together define the current state. Without both, the project is operating on out-of-date information."
          >
            <p>Handover-back-to-service sequence:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Licensed contractor sign-off</strong> — confirms removal / encapsulation complete to plan.</li>
              <li><strong>Four-stage clearance</strong> — UKAS analyst inspection and air monitoring.</li>
              <li><strong>Certificate of Reoccupation</strong> — issued by analyst; scope-defined; retained.</li>
              <li><strong>Register update</strong> — ACMs removed marked &quot;removed&quot;; ACMs encapsulated marked with method; remaining ACMs unchanged.</li>
              <li><strong>Management plan update</strong> — review frequency / monitoring / re-inspection schedule.</li>
              <li><strong>Dutyholder brief</strong> — new register status communicated; record of brief retained.</li>
              <li><strong>Occupant brief</strong> — where appropriate; RP / managing agent typically delivers.</li>
              <li><strong>Follow-on contractor</strong> — receives updated register before any subsequent work.</li>
              <li><strong>Reg 4 review</strong> — annual review or sooner if conditions change.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <FAQ items={faqs} />
          <SectionRule />
          <KeyTakeaways points={[
            "Remember from Section 4.6 - CAR 2012 + presumption + escalation. Here we go deeper on the categorisation.",
            "Three categories: Licensed (HSE-licensed only), NNLW (trained + 14-day notification + medical surveillance), Non-licensed (trained + CAR controls).",
            "L3 supervisor doesn't categorise - escalates. Specialist makes the call.",
            "Discovery procedure: STOP / don't disturb / vacate / photograph / escalate / don't restart until confirmed.",
            "Reg 4 dutyholder maintains asbestos register for non-domestic premises.",
            "Reg 10 training mandatory for anyone potentially exposed. UKATA / IATP recognised providers.",
            "Reg 16 prevention-or-reduction hierarchy — prevent first, reduce second, RPE last resort. Bind even below NNLW threshold.",
            "Reg 19 — 40-year exposure record retention because of 20-50 year disease latency.",
            "Reg 22 — medical surveillance by appointed doctor every 3 years for licensed and NNLW workers.",
            "Asbestos waste regime: hazardous waste, HWCN, licensed carrier, permitted facility.",
            "Cross-regime — CAR 2012 + CDM 2015 + BSA 2022 form the asbestos paper trail on refurbishment projects.",
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
