/**
 * Module 1 · Section 5 · Subsection 4 — RIDDOR specified injuries: depth
 * Maps to C&G 2365-03 / Unit 201 — supplementary depth (beyond AC framework)
 * Layered depth from 2357 Unit 601 ELTK01 — RIDDOR Schedule 1 deep-dive
 */
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import { TLDR, ConceptBlock, RegsCallout, CommonMistake, Scenario, KeyTakeaways, FAQ, LearningOutcomes, ContentEyebrow, SectionRule } from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'RIDDOR specified injuries depth | Level 3 Module 1.5.4 | Elec-Mate';
const DESCRIPTION = 'L3 deep-dive on RIDDOR Schedule 1 specified injuries — fractures, amputations, sight loss, crush, burns, scalping, unconsciousness, enclosed-space.';

const checks = [
  { id: 'l3-m1-s5-sub4-fingers', question: 'Are finger fractures RIDDOR specified injuries?', options: ['Yes always.', 'NO — Schedule 1 explicitly excludes "fingers, thumbs and toes" from the fracture category. So a finger fracture from a tool drop is NOT a specified injury (though may be over-7-day if 8+ days off normal duties = F2508A).', 'Maybe.', 'Random.'], correctIndex: 1, explanation: 'Important exclusion. Finger / thumb / toe fractures aren\'t Schedule 1; they may still be over-7-day reportable separately.' },
  { id: 'l3-m1-s5-sub4-burn', question: 'When is a burn a Schedule 1 specified injury?', options: ['Always.', 'When (a) covers more than 10% of the body, OR (b) causes significant damage to eyes, respiratory system or other vital organs. Smaller burns may be over-7-day if incapacitating.', 'Never.', 'Only on Mondays.'], correctIndex: 1, explanation: 'Two triggers: 10% body coverage OR vital organ damage. Many electrical burns hit one or the other.' },
  { id: 'l3-m1-s5-sub4-asphyx', question: 'What\'s an "enclosed-space injury" under Schedule 1?', options: ['Random.', 'Any injury arising from work in an enclosed space leading to (i) hypothermia or heat-induced illness, OR (ii) requiring resuscitation, OR (iii) requiring admittance to hospital for more than 24 hours.', 'Just being in a small room.', 'Allergy.'], correctIndex: 1, explanation: 'Enclosed-space category. Confined Spaces Regs 1997 hazards trigger this RIDDOR category.' },
];

const quizQuestions = [
  { id: 1, question: 'Where is the specified-injuries list?', options: ['HSG85.', 'RIDDOR 2013 Schedule 1.', 'BS 7671.', 'GS38.'], correctAnswer: 1, explanation: 'Schedule 1 RIDDOR. The full list is short; worth memorising.' },
  { id: 2, question: 'What\'s the timescale for reporting a specified injury?', options: ['One year.', 'Without delay (telephone notification expected for fatalities and specified injuries) + F2508 within 10 days.', 'Within an hour.', 'Within 30 days.'], correctAnswer: 1, explanation: 'Phone immediately, F2508 within 10 days. Same as fatality timescale.' },
  { id: 3, question: 'Are amputations always specified injuries?', options: ['Only major.', 'Yes — Schedule 1 includes "amputation" with no minimum size threshold. A finger-tip amputation is a specified injury.', 'Only legs.', 'Only on weekends.'], correctAnswer: 1, explanation: 'Amputations all in. Even partial finger-tip amputation triggers immediate phone notification + F2508.' },
  { id: 4, question: 'What\'s a "scalping requiring hospital treatment"?', options: ['Just hair loss.', 'Detachment of skin / soft tissue from the head / scalp area requiring surgical / hospital treatment. Often from machinery contact (rotating shafts catching hair). Specified injury.', 'Haircut.', 'Dandruff.'], correctAnswer: 1, explanation: 'Scalping = traumatic skin detachment. Rare in electrical work but possible (rotating tools).' },
  { id: 5, question: 'What\'s "loss of consciousness from head injury or asphyxia"?', options: ['Just a faint.', 'Specified injury — unconsciousness arising from head impact OR from asphyxiation (including from electrical events causing respiratory failure). Even brief loss requires immediate notification.', 'Tiredness.', 'Sleep.'], correctAnswer: 1, explanation: 'Schedule 1 covers head-injury LOC and asphyxia LOC. Electrical shocks causing brief LOC are specified injuries.' },
  { id: 6, question: 'What\'s the difference between Schedule 1 and over-7-day?', options: ['Same thing.', 'Schedule 1 = list of severe injuries triggering immediate phone + F2508 within 10 days. Over-7-day = injury causing 8+ days off normal duties triggering F2508A within 15 days. Different categories, different timescales, different forms.', 'Cost.', 'Distance.'], correctAnswer: 1, explanation: 'Two distinct categories. An injury can be both (specified injury that also causes 8+ days off — but reported as specified, not as over-7-day).' },
  { id: 7, question: 'What\'s "crush injury leading to internal organ damage"?', options: ['Just a bruise.', 'Specified injury — crushing trauma resulting in internal organ damage (liver, kidney, lung, abdominal organs). Commonly from falling objects, vehicle impacts, structural collapse. Significant force required.', 'Headache.', 'Cold.'], correctAnswer: 1, explanation: 'Crush + internal damage = Schedule 1. The internal-organ aspect is the trigger.' },
  { id: 8, question: 'How does the L3 supervisor identify a specified injury at the scene?', options: ['Guess.', 'Match symptoms to Schedule 1 categories: visible fracture (excl finger/thumb/toe), amputation, sight loss reported, crush with internal symptoms, burn &gt;10% / vital organ, scalping, LOC, enclosed-space asphyxia / heat. When in doubt, treat as specified and escalate.', 'Random.', 'Customer\'s opinion.'], correctAnswer: 1, explanation: 'Symptom match to Schedule 1. When in doubt = treat as specified; better to over-escalate than miss.' },
];

const faqs = [
  { question: 'Does the RIDDOR responsible person have to phone before submitting F2508?', answer: 'For fatalities and specified injuries, immediate phone notification (0345 300 9923) is expected. F2508 follows within 10 days online. For other categories, online F2508 / F2508A is the only required submission.' },
  { question: 'What if the injury is reported by the casualty later (not at the time)?', answer: 'The 10-day clock starts at the INCIDENT, not the report. Late reporting because the casualty was slow to mention it doesn\'t excuse the firm. Once the responsible person becomes aware, they should report promptly even if the deadline has passed.' },
  { question: 'Are mental health injuries specified injuries?', answer: 'Generally no — Schedule 1 is physical injuries. Mental health may be reportable as occupational disease (Schedule 3) in some cases. Stress claims more typically civil rather than RIDDOR territory.' },
  { question: 'What if hospital says "no fracture" but X-ray weeks later finds one?', answer: 'Once aware, report. The responsible person\'s "without delay" duty kicks in when they become aware. Document the diagnostic timeline.' },
  { question: 'Does the operative\'s choice not to seek treatment affect RIDDOR?', answer: 'No — RIDDOR is duty on responsible person, not casualty. If the responsible person believes a specified injury occurred, they report regardless of casualty\'s treatment decisions.' },
  { question: 'Why does the responsible person need to know the Schedule 1 list?', answer: 'Because they make the categorisation decision at the moment of the incident report. Operative provides facts; responsible person matches to category and decides timescale / form.' },
  { question: 'Who counts as the "responsible person" for RIDDOR purposes?', answer: 'Reg 3 RIDDOR 2013 defines it. For employees, the responsible person is the employer. For the self-employed working under someone\'s control, it is the person in control of the premises. For training arrangements, the placement provider. The L3 supervisor is rarely the responsible person but is usually the first to know the facts.' },
  { question: 'Can an operative submit the F2508 themselves?', answer: 'F2508 is the responsible person\'s submission. An operative can act as agent of the firm but the legal duty sits on the responsible person. In practice the firm\'s H&S manager or contracts manager submits with the operative\'s factual input.' },
  { question: 'What is the relationship between RIDDOR and a civil claim?', answer: 'RIDDOR is a criminal-side reporting duty to the regulator. A civil claim runs separately under common law negligence and the relevant statutes (PI, EL, PL). The RIDDOR report often becomes evidence in any subsequent civil claim, which is why the contemporaneous documentation discipline matters so much.' },
  { question: 'Why does HSE publish RIDDOR statistics?', answer: 'RIDDOR data feeds the HSE\'s national statistics on workplace injury and ill health, drives intervention targeting and informs sector-specific campaigns. Under-reporting distorts the picture; the regulator routinely cross-checks RIDDOR returns against A&E data and insurance claims to identify potential under-reporting at firm level.' },
];

export default function Sub4() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);
  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section5')} className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"><ArrowLeft className="h-4 w-4" /> Section 5</button>
          <PageHero eyebrow="Module 1 · Section 5 · Subsection 4" title="RIDDOR specified injuries — depth" description="Remember from Section 2.5 — RIDDOR has multiple categories. This Sub deep-dives Schedule 1 (specified injuries) - the immediate-phone-notification category." tone="emerald" />
          <TLDR points={[
            "Schedule 1 specified injuries trigger IMMEDIATE phone notification (0345 300 9923) + F2508 within 10 days.",
            "List: fracture (excl finger/thumb/toe), amputation, sight loss, crush + internal damage, burn over 10% body or vital organ, scalping requiring hospital, head-injury LOC or asphyxia LOC, enclosed-space (hypothermia / heat / resuscitation / 24h hospital).",
            "Important exclusion — finger/thumb/toe fractures NOT Schedule 1 (may still be over-7-day F2508A if 8+ days off).",
            "Categorisation is the responsible person's call; the L3 supervisor provides facts promptly. When in doubt, escalate as specified — over-escalation has no penalty, under-escalation is a Reg 6 offence.",
            "Records of any reportable incident must be kept for at least 3 years (Reg 12); residential / Defective Premises Act work pushes this towards indefinite retention.",
            "Schedule 1 sits within the wider RIDDOR map alongside fatalities (Reg 6), over-7-day (Reg 4(3)), occupational diseases (Reg 8 + Schedule 3) and dangerous occurrences (Reg 7 + Schedule 2) — each with its own form and timescale.",
          ]} />
          <LearningOutcomes outcomes={[
            "List the categories of specified injury under RIDDOR Schedule 1.",
            "Identify the exclusion of finger / thumb / toe fractures from Schedule 1.",
            "State the immediate phone + F2508-within-10-days timescale.",
            "Distinguish Schedule 1 specified injuries from over-7-day injuries (F2508A).",
            "Apply the L3 operative role of providing facts to the responsible person promptly.",
            "Recognise enclosed-space and asphyxia categories as specified injuries.",
          ]} initialVisibleCount={3} />

          <ContentEyebrow>Schedule 1 in detail</ContentEyebrow>
          <ConceptBlock title="The full specified-injury list" plainEnglish="RIDDOR 2013 Schedule 1 lists the specified injuries that trigger immediate phone notification and F2508 within 10 days. Short list; worth knowing in detail because the L3 supervisor often makes the first categorisation call at the scene." onSite="Match symptoms to the list. When in doubt, treat as specified and escalate. Over-escalation has no penalty; under-escalation can mean late-reporting offence under Reg 6.">
            <p>Schedule 1 categories:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Fractures</strong> (other than to fingers, thumbs and toes) — including hand, wrist, forearm, leg, foot (excl toes), head, ribs, pelvis, spine.</li>
              <li><strong>Amputations</strong> — any amputation including partial (finger-tip).</li>
              <li><strong>Permanent loss of sight or reduction of sight</strong> — any eye injury causing sight loss.</li>
              <li><strong>Crush injuries to head or torso causing damage to brain or internal organs</strong>.</li>
              <li><strong>Serious burns</strong> covering more than 10% of body OR causing significant damage to eyes, respiratory system or other vital organs.</li>
              <li><strong>Scalpings</strong> (separation of skin from head) requiring hospital treatment.</li>
              <li><strong>Loss of consciousness</strong> caused by head injury or asphyxia.</li>
              <li><strong>Any other injury arising from work in an enclosed space</strong> leading to hypothermia or heat-induced illness; OR requiring resuscitation; OR requiring admittance to hospital for more than 24 hours.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="RIDDOR 2013 — Reg 4(2)" clause={<>"Where any person at work suffers a specified injury (Schedule 1) as a result of a work-related accident, the responsible person must follow the reporting procedure."</>} meaning={<>Reg 4(2) creates the specified-injury reporting duty. Reg 6 sets out the procedure (immediate notification + F2508 within 10 days). Schedule 1 lists the categories. Together they form the specified-injury reporting regime.</>} cite="Source: RIDDOR 2013 (SI 2013/1471), Reg 4(2) + Schedule 1." />

          <InlineCheck {...checks[0]} />
          <InlineCheck {...checks[1]} />
          <InlineCheck {...checks[2]} />

          <SectionRule />
          <ContentEyebrow>L3 operative's role at the scene</ContentEyebrow>
          <ConceptBlock title="Provide facts to the responsible person promptly" plainEnglish="The operative isn\'t the report-maker (responsible person is). But the operative is often the first to see the injury and the first to know the basic facts. Match observed symptoms to Schedule 1 categories; phone the responsible person immediately if a match seems likely." onSite="The faster the responsible person knows, the better positioned they are to make the immediate phone notification within the without-delay window. Don\'t wait for hospital diagnosis to escalate; escalate based on apparent injury and update later if confirmed differently.">
            <p>Operative-to-responsible-person flow:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>Render first aid; arrange ambulance / transport.</li>
              <li>Note observed symptoms and possible Schedule 1 match.</li>
              <li>Phone responsible person (firm\'s H&amp;S manager / contracts manager) IMMEDIATELY.</li>
              <li>Brief them factually: &quot;possible specified injury — appears to be X&quot;.</li>
              <li>Preserve scene; document.</li>
              <li>Update responsible person as diagnosis confirms.</li>
              <li>Provide written witness account same day.</li>
              <li>Cooperate with any HSE follow-up via the firm\'s legal / H&amp;S team.</li>
            </ol>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>The wider RIDDOR categories — context</ContentEyebrow>
          <ConceptBlock title="Where Schedule 1 sits in the broader RIDDOR map" plainEnglish="RIDDOR 2013 has multiple parallel reporting categories: fatalities (Reg 6), specified injuries Schedule 1 (Reg 4), over-7-day injuries (Reg 4(3)), occupational diseases (Reg 8 + Schedule 3), dangerous occurrences (Reg 7 + Schedule 2), gas incidents (Regs 11-12), road traffic accidents at work in some cases. Each category has its own form, timescale and trigger." onSite="The L3 supervisor first decides which CATEGORY applies, then which FORM and TIMESCALE. Schedule 1 specified injury triggers immediate phone + F2508 within 10 days; over-7-day triggers F2508A within 15 days; dangerous occurrence triggers F2508 within 10 days regardless of injury.">
            <p>The category map:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Fatality</strong> — Reg 6 — phone immediately + F2508 within 10 days.</li>
              <li><strong>Specified injury (Schedule 1)</strong> — Reg 4(2) — phone immediately + F2508 within 10 days.</li>
              <li><strong>Over-7-day injury</strong> — Reg 4(3) — F2508A within 15 days.</li>
              <li><strong>Over-3-day injury (record-keeping only)</strong> — kept in accident book; not reported to HSE.</li>
              <li><strong>Occupational disease (Schedule 3)</strong> — Reg 8 — F2508A within 10 days of diagnosis.</li>
              <li><strong>Dangerous occurrence (Schedule 2)</strong> — Reg 7 — F2508 within 10 days regardless of injury.</li>
              <li><strong>Gas incident</strong> — Reg 11 — Gas-Safe-related; specific reporting.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="RIDDOR 2013 — Reg 6 (Fatalities)" clause={<>&quot;Where any person dies as a result of a work-related accident, the responsible person must follow the reporting procedure.&quot;</>} meaning={<>The fatality reporting duty. Same procedure as Schedule 1 — phone immediately + F2508 within 10 days. Coroner becomes involved separately. The L3 supervisor at the scene of a fatality preserves the scene completely, calls emergency services first, then the responsible person. Do not move the deceased except where required for first aid attempts.</>} cite="Source: RIDDOR 2013 (SI 2013/1471), Reg 6." />

          <ConceptBlock title="Dangerous occurrences — Schedule 2 in detail" plainEnglish="Dangerous occurrences are defined incidents that did not result in injury but could have. RIDDOR Schedule 2 lists categories — many are electrical-trade relevant: collapse / overturning of plant (e.g. MEWP failure), failure of pressure systems, failure of lifting equipment, electrical short-circuit causing fire / explosion, contact with overhead lines, contact with underground services, scaffold collapse." onSite="Reportable even with NO injury. The F2508 within 10 days. Common trigger that L3 misses: striking a buried electricity service when digging — that is a Schedule 2 dangerous occurrence whether or not anyone is injured.">
            <p>Schedule 2 dangerous occurrences relevant to electrical trade:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Collapse / overturning / failure of load-bearing parts of lifts, hoists, MEWPs, cranes.</li>
              <li>Plant or equipment coming into contact with overhead power lines.</li>
              <li>Failure of any closed vessel under pressure (transformer / capacitor / battery in some cases).</li>
              <li>Electrical short-circuit / overload causing fire or explosion.</li>
              <li>Unintentional ignition of explosives.</li>
              <li>Contact with buried services causing injury risk (cable strike, gas line strike).</li>
              <li>Collapse of scaffolding more than 5m high.</li>
              <li>Failure of pipework carrying flammable / hot / corrosive substances.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Occupational disease reporting under Schedule 3" plainEnglish="RIDDOR Reg 8 + Schedule 3 cover specified work-related diseases. Most directly relevant to electrical trade: hand-arm vibration syndrome (HAVS), occupational asthma, occupational dermatitis, carpal tunnel syndrome where work-related, occupational cancer (asbestos exposure → mesothelioma), tetanus where work-related, hepatitis where work-related." onSite="Triggered by written diagnosis from a doctor that the disease is work-related. F2508A within 10 days of diagnosis. Long-tail diseases (asbestos-related cancer, HAVS) may surface decades after exposure — the responsible person at the time of diagnosis (the current employer or the firm where exposure occurred) reports.">
            <p>Schedule 3 categories relevant to electrical work:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Hand-arm vibration syndrome (HAVS) — extensive use of vibrating tools.</li>
              <li>Occupational dermatitis — exposure to chemicals, oils, irritants.</li>
              <li>Occupational asthma — exposure to sensitisers (resins, dust).</li>
              <li>Carpal tunnel syndrome — repetitive force / vibration exposure.</li>
              <li>Tendonitis / tenosynovitis — repetitive movement.</li>
              <li>Mesothelioma and other asbestos-related cancers — historical exposure.</li>
              <li>Lead poisoning — historical / specific work.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Record-keeping and the accident book" plainEnglish="RIDDOR Reg 12 requires the responsible person to keep records of any reportable incident for 3 years from the date of report. Practice in residential / Defective Premises Act-relevant work is to keep indefinitely (DPA 30-year retrospective limitation under BSA 2022 reaches old records). Accident book entries (BI 510 or equivalent) are separate but related — every workplace must maintain one." onSite="The L3 supervisor culture: every incident logged in the accident book regardless of RIDDOR triggering. Date, time, casualty, witnesses, what happened, treatment, follow-up. The accident book is the firm&apos;s contemporaneous record and feeds RIDDOR decisions plus the firm&apos;s near-miss programme.">
            <p>Record-keeping practice:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Accident book entry for every incident regardless of RIDDOR trigger.</li>
              <li>RIDDOR record retention: legal minimum 3 years; practice 30+ years.</li>
              <li>Investigation report and findings retained alongside.</li>
              <li>Witness statements taken contemporaneously.</li>
              <li>Photographs and scene preservation evidence.</li>
              <li>Communication records (calls, emails, escalations).</li>
              <li>Remedial actions taken and dates.</li>
              <li>Lessons-learned summary fed into firm RAMS process.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Overlap with safeguarding, coronial, and police processes" plainEnglish="A serious incident can trigger parallel processes: HSE under RIDDOR, coroner&apos;s inquest where death occurred, police investigation if criminal conduct suspected (manslaughter etc), safeguarding referrals where vulnerable persons involved, scheme body investigations (NICEIC / NAPIT). Each runs independently with their own timescales and disclosure requirements." onSite="L3 supervisor at scene: cooperate with all but speak through firm legal / H&amp;S contact. Do not give long impromptu interviews to anyone — provide name, basic facts, and the firm&apos;s contact. Police interviews under caution should always be with legal representation.">
            <p>Parallel processes that may run:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>HSE investigation under RIDDOR.</li>
              <li>Coroner&apos;s inquest (death).</li>
              <li>Police investigation (suspected criminal conduct).</li>
              <li>Local authority environmental health (in some cases).</li>
              <li>Scheme body (NICEIC, NAPIT) investigation.</li>
              <li>Safeguarding referral (vulnerable adult / child involvement).</li>
              <li>Civil claim by injured party / family.</li>
              <li>Insurance investigation (separate from criminal).</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <CommonMistake title="Waiting for hospital confirmation before phoning the responsible person" whatHappens={<>Operative waits for X-ray / discharge before contacting firm. Several hours pass. Responsible person now has compressed window to make immediate phone notification. F2508 still possible within 10 days but the &quot;without delay&quot; phone duty for specified injury is degraded. Aggravating factor for any subsequent prosecution.</>} doInstead={<>Phone immediately based on observed symptoms. Update later as diagnosis confirms. The responsible person can phone HSE based on the operative&apos;s preliminary report and update through the F2508 process.</>} />

          <RegsCallout source="RIDDOR 2013 — Reg 12 (Records)" clause={<>&quot;The responsible person must keep a record of — (a) any reportable accident, dangerous occurrence or diagnosis of a reportable disease... The record... must be kept for at least three years from the date on which it was made.&quot;</>} meaning={<>The record-keeping duty. Three-year minimum is the legal floor; practice in residential / DPA-relevant work is to keep indefinitely. Records include incident details, witness accounts, reporting timeline, follow-up actions.</>} cite="Source: RIDDOR 2013 (SI 2013/1471), Reg 12." />

          <ConceptBlock title="Scene preservation and the L3 evidence reflex" plainEnglish="After any specified injury or dangerous occurrence, the scene preservation discipline is critical. Photograph from multiple angles before anything is touched; note time, position, isolation status, witnesses, weather, lighting; preserve any equipment involved (do not return to stores, do not allow others to handle); secure the area." onSite="The L3 supervisor reflex on a serious incident: render first aid → call ambulance → call responsible person → preserve scene → photograph → witness statements. The order matters but the photographic evidence is the irreversible step — once the scene is cleaned the evidence is gone forever.">
            <p>Scene preservation checklist:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Photograph from multiple angles before anything is moved.</li>
              <li>Note time markers (when work started, when incident occurred, when found).</li>
              <li>Preserve equipment involved — do not clean, return, or allow handling.</li>
              <li>Note isolation status (was supply isolated? proven?).</li>
              <li>Witness names and contact details captured immediately.</li>
              <li>Brief written witness account same day while fresh.</li>
              <li>Secure area — barriers, signage, prevent contamination of evidence.</li>
              <li>Hand off to firm H&amp;S manager / legal contact for HSE cooperation.</li>
            </ul>
          </ConceptBlock>

          <CommonMistake title="Treating a finger fracture as not reportable" whatHappens={<>Apprentice fractures finger; firm assumes RIDDOR doesn\'t apply (correct — finger excluded from Schedule 1) and doesn\'t consider over-7-day. Apprentice is off normal duties for 12 days. The over-7-day F2508A IS due within 15 days but the firm doesn\'t submit. Late reporting offence under Reg 6.</>} doInstead={<>Schedule 1 exclusion of fingers does NOT exclude over-7-day reporting. Two parallel categories: specified injury (Schedule 1) and over-7-day. Check both.</>} />

          <Scenario title="Suspected specified injury at the scene" situation={<>L2 mate falls from a step-up onto the floor at the start of a job. Visible deformity in lower leg. Says they think it\'s broken. Ambulance called. You\'re the L3 supervisor on site.</>} whatToDo={<>Immediate sequence. (1) First aid — keep them still and warm; don&apos;t move suspected fracture; ambulance called. (2) Identify likely Schedule 1 — fracture excluding fingers/thumbs/toes; lower leg fracture qualifies. (3) PHONE responsible person immediately — &quot;suspected specified injury, lower leg fracture from fall from step-up&quot;. They will (a) contact HSE 0345 300 9923 without delay; (b) initiate F2508 process for submission within 10 days. (4) Preserve scene — photograph the step-up (which appeared damaged), the work area, the position of the casualty, isolation status, time markers. (5) Witness statements - yourself, customer if present. (6) Pull other equipment from same fleet if equipment defect is suspected — internal recall. (7) Update responsible person on hospital diagnosis when confirmed. (8) Document everything in writing same day. (9) Cooperate with HSE follow-up via firm\'s H&amp;S team. (10) RIDDOR record retention 3 years (in practice longer for residential / Defective Premises Act considerations).</>} whyItMatters={<>The L3 supervisor\'s prompt categorisation and escalation enables the responsible person to discharge the without-delay duty. The phone notification is what RIDDOR demands for Schedule 1; the F2508 follows. Late phone notification is the most-prosecuted RIDDOR-procedure failure. The L3\'s decision to phone immediately based on observed symptoms (rather than wait for hospital confirmation) is what makes timely notification possible.</>} />

          <SectionRule />
          <ContentEyebrow>Schedule 1 walked through — the specified injury list in detail</ContentEyebrow>

          <ConceptBlock
            title="Each category, with electrical-trade examples"
            plainEnglish="RIDDOR 2013 Schedule 1 lists the &apos;specified injuries&apos; that trigger immediate phone notification. The list is closed — only the categories in Schedule 1 qualify. Knowing each category by heart is what lets the L3 supervisor recognise a Schedule 1 injury at the scene rather than waiting for diagnosis confirmation."
            onSite="The L3 supervisor on scene needs to recognise these categories instantly. Fracture of bone (excluding fingers / thumbs / toes) is the most common one in the electrical trade. Loss of consciousness from electric shock is the next most common. Crush injuries from gear / plant; burns to more than 10% of body or involving vital organs; sight loss; scalping; amputation; loss of consciousness from head injury or asphyxiation — each has been a real-world specified-injury report from electrical-trade incidents."
          >
            <p>RIDDOR Schedule 1 specified injuries, with examples:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fracture, other than to fingers, thumbs or toes</strong> — fall
                from ladder / step-up; struck by falling object; crush from equipment.
              </li>
              <li>
                <strong>Amputation of an arm, hand, finger, thumb, leg, foot or
                toe</strong> — entanglement in moving plant; severe crush.
              </li>
              <li>
                <strong>Permanent loss of sight or reduction of sight</strong> —
                arc-flash or chemical splash to eye.
              </li>
              <li>
                <strong>Crush injuries leading to internal organ damage</strong> —
                falling equipment, vehicle incident.
              </li>
              <li>
                <strong>Serious burns covering more than 10% of body, or causing
                significant damage to eyes, respiratory system or other vital
                organs</strong> — arc-flash event; chemical exposure.
              </li>
              <li>
                <strong>Scalping requiring hospital treatment</strong> — entanglement of
                hair in rotating plant.
              </li>
              <li>
                <strong>Loss of consciousness caused by head injury or
                asphyxiation</strong> — fall, confined-space gas exposure.
              </li>
              <li>
                <strong>Any other injury arising from working in an enclosed
                space</strong> — that leads to hypothermia, heat-induced illness or
                requires resuscitation or admittance to hospital for more than 24
                hours.
              </li>
              <li>
                <strong>Electric shock loss of consciousness OR 24h+
                hospitalisation</strong> — explicit Schedule 1 inclusion under the
                head-injury / asphyxiation limb when consciousness is lost.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Electric-shock incidents and the RIDDOR categorisation question</ContentEyebrow>

          <ConceptBlock
            title="When an electric shock crosses the RIDDOR threshold"
            plainEnglish="Electric shock incidents are common in the trade and the RIDDOR categorisation is often ambiguous at the scene. The rule of thumb: any electric shock causing loss of consciousness OR requiring more than 24 hours&apos; hospital admission is a Schedule 1 specified injury (under the head-injury / asphyxiation limb, which courts read to include LOC from any cause including electrical). Any shock causing 7+ days off normal duties is over-7-day reportable separately under Reg 4(3). Any near-miss electric shock event without injury may still be a Schedule 2 dangerous occurrence if it arose from a defined event (short-circuit causing fire / explosion, contact with overhead line)."
            onSite="The L3 supervisor handling a shock incident on site: first aid + ambulance, then categorisation. The casualty&apos;s account of whether they lost consciousness (even briefly), whether they remember the event clearly, whether there are any neurological symptoms (headache, vision change, palpitations) all matter for the responsible person&apos;s decision. Where shock involved 230V or higher AND there was any loss of consciousness or extended hospital admission, treat as specified injury and phone immediately. Where the shock was a brief contact without LOC and the casualty was cleared at A&E within hours, it is likely below RIDDOR trigger but accident-book entry remains essential."
          >
            <p>Electric-shock RIDDOR decision tree:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Shock with LOC (any duration)</strong> — Schedule 1 specified
                injury under head-injury / asphyxiation limb. Immediate phone + F2508.
              </li>
              <li>
                <strong>Shock requiring hospital admission over 24 hours</strong> —
                Schedule 1 specified injury under enclosed-space / 24h hospital limb
                where applicable. Immediate phone + F2508.
              </li>
              <li>
                <strong>Shock causing 7+ days off normal duties</strong> — over-7-day
                reportable under Reg 4(3). F2508A within 15 days.
              </li>
              <li>
                <strong>Shock with serious burns (over 10% body or vital organ
                involvement)</strong> — Schedule 1 under the burns limb regardless of
                LOC.
              </li>
              <li>
                <strong>Arc-flash with eye injury</strong> — potentially Schedule 1
                under permanent sight loss / reduction.
              </li>
              <li>
                <strong>Near-miss shock without injury but from short-circuit causing
                fire / explosion</strong> — Schedule 2 dangerous occurrence reportable
                under Reg 7.
              </li>
              <li>
                <strong>Brief contact without LOC, A&amp;E cleared, no follow-up</strong>
                — likely below RIDDOR trigger; accident-book entry mandatory.
              </li>
              <li>
                <strong>Any uncertainty</strong> — escalate as specified and update
                later if facts change.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="RIDDOR 2013 — Reg 7 + Schedule 2 (Dangerous occurrences)"
            clause={
              <>
                &quot;The responsible person must, where a dangerous occurrence
                specified in Schedule 2 takes place in connection with the work
                activity, follow the reporting procedure...&quot; Schedule 2 includes
                &quot;any electrical short-circuit or overload attended by fire or
                explosion which results in the stoppage of the plant involved for more
                than 24 hours...&quot; and &quot;any unintentional incident in which
                plant or equipment either — (a) comes into contact with an uninsulated
                overhead electric line in which the voltage exceeds 200 volts; or (b)
                causes an electrical discharge from such an electric line by coming
                into close proximity with it.&quot;
              </>
            }
            meaning={
              <>
                Reg 7 + Schedule 2 capture electrical-trade dangerous occurrences
                regardless of whether anyone was injured. Short-circuit causing fire
                or stopping plant for over 24 hours; contact with overhead lines over
                200V; close-proximity discharge from overhead lines. Each is
                reportable on F2508 within 10 days. The L3 supervisor finding any of
                these on site must flag to the responsible person — even where no
                injury occurred.
              </>
            }
            cite="Source: RIDDOR 2013 (SI 2013/1471), Reg 7 + Schedule 2."
          />

          <Scenario
            title="Schedule 1 vs over-7-day vs dangerous occurrence — categorising at the scene"
            situation={
              <>
                An L2 mate working on a commercial DB upgrade brushes the back of
                their hand against an unexpected live conductor (230V) while reaching
                into the enclosure. They flinch back, drop their tool, and step off
                the step-up. They report &quot;a quick jolt&quot; and are slightly
                shaken but conscious throughout. There is a small reddened mark on
                the hand. You stop work, dynamic-assess that the supply needs
                immediate re-isolation and prove-dead testing, and confirm the
                customer&apos;s switch-fuse had been left partially closed in error
                by another trade. The mate goes to A&amp;E for ECG and observation as
                a precaution. They are discharged the same evening.
              </>
            }
            whatToDo={
              <>
                Phone the responsible person immediately with the facts. Categorisation
                discussion: no loss of consciousness was reported, no extended
                hospital admission, no burn over 10% body and no vital organ damage,
                no fracture. The shock itself does not meet Schedule 1 trigger.
                However: was the mate off normal duties for 7+ days? If yes, over-7-day
                F2508A within 15 days. Was the partially-closed switch-fuse a
                short-circuit / overload event? No fire or extended plant stoppage,
                so probably not Schedule 2. Was there a clear unsafe-isolation cause?
                Yes — escalate to the firm&apos;s internal incident investigation
                regardless of RIDDOR status. The L3 supervisor preserves the scene
                (photographs of the DB, the partially-closed fuse, the prove-test
                equipment used), takes witness statements while events are fresh, and
                logs the incident in the accident book. The decision &quot;not
                Schedule 1, monitor for over-7-day&quot; is the responsible
                person&apos;s call based on the operative&apos;s factual input.
              </>
            }
            whyItMatters={
              <>
                Most electrical-trade shock incidents sit in this grey zone — not
                obviously Schedule 1, but potentially over-7-day depending on
                recovery. The L3 supervisor&apos;s job is factual handover to the
                responsible person plus scene preservation plus internal incident
                investigation, regardless of which RIDDOR trigger eventually applies.
                Late reporting under Reg 6 is the trap when categorisation is ducked
                or delayed; the discipline is to escalate promptly with facts and let
                the responsible person decide.
              </>
            }
          />

          <SectionRule />
          <ContentEyebrow>Witness statements and contemporaneous notes</ContentEyebrow>

          <ConceptBlock
            title="Why same-day written accounts are non-negotiable"
            plainEnglish="Witness statements taken hours or days after an incident are systematically less reliable than statements taken same-day. Memory of detail (timing, sequence, position, exact words) degrades within hours; reconstruction biases creep in once the witness has discussed the event with colleagues or read other accounts. Same-day written statements taken individually before group discussion are the gold standard. The L3 supervisor on a serious incident captures statements while events are fresh."
            onSite="Practical approach: within the first hour after first aid and emergency services, ask each witness to write a short factual account in their own words — what they saw, where they were, what time, who else was present. Avoid leading questions. Witnesses sign and date. The firm&apos;s investigator may take fuller statements later but the same-day account is the anchor reference. The L3 supervisor&apos;s own contemporaneous notes form a separate record alongside the witness accounts."
          >
            <p>Statement-taking practice:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Same day, before witnesses have discussed events extensively.</li>
              <li>Individual not group — separate witnesses before they confer.</li>
              <li>Witness writes in own words; investigator does not put words in mouth.</li>
              <li>Factual: what saw, where, when, who, sequence — not opinion or speculation.</li>
              <li>Witness signs and dates each page.</li>
              <li>Statement retained alongside RIDDOR record for the same retention period.</li>
              <li>L3 supervisor&apos;s own notes form a separate contemporaneous record.</li>
              <li>Notebook discipline — date, time, address, observations, decisions made.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The accident book and BI 510"
            plainEnglish="Every workplace must maintain an accident book. The traditional form is BI 510 (HSE-published), though many firms use digital equivalents. Each incident is logged with date, time, casualty details, sequence, treatment given and follow-up. Accident book entries are separate from RIDDOR but feed the responsible person&apos;s RIDDOR decision. Data protection considerations apply — individual entries should be removable / redactable for GDPR compliance, hence the rise of single-entry forms or digital systems."
            onSite="Practical L3 supervisor culture: every incident, no exceptions, gets an accident book entry regardless of perceived severity. The discipline matters because near-misses today predict incidents tomorrow, and the accumulated record is what the firm&apos;s safety management system learns from. Digital systems with GDPR-compliant single-entry storage are preferred in modern firms; legacy paper BI 510 books are being phased out."
          >
            <p>Accident book content per entry:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Date and time of incident.</li>
              <li>Casualty&apos;s name, address (or employer for workers), occupation.</li>
              <li>Description of how incident happened.</li>
              <li>Injury sustained and any treatment given.</li>
              <li>Reporter&apos;s name and signature.</li>
              <li>Time and date of entry.</li>
              <li>GDPR-compliant single-entry storage to allow individual record removal.</li>
              <li>Entry feeds responsible person&apos;s RIDDOR decision.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>The firm&apos;s incident investigation discipline</ContentEyebrow>

          <ConceptBlock
            title="Why RIDDOR sits inside a wider investigation duty"
            plainEnglish="RIDDOR is a regulator-reporting duty. It does not, by itself, discharge the firm&apos;s wider duty under HASAWA s.2 / MHSWR Reg 3-5 to investigate, learn from and prevent recurrence of incidents. Every RIDDOR-reportable event triggers an internal investigation; many non-RIDDOR near-misses also warrant investigation under the firm&apos;s safety management system. HSE&apos;s HSG245 (Investigating accidents and incidents) is the practitioner reference."
            onSite="The L3 supervisor often leads or contributes to the firm&apos;s internal investigation alongside any RIDDOR reporting. The investigation goal is causation analysis — not blame, but understanding the chain of events that led to the incident so controls can be improved. Standard structures include the 5 Whys, fault tree analysis, or the HSG245 immediate / underlying / root cause framework. The investigation report becomes part of the firm&apos;s lessons-learned record and may feed RAMS updates, training refresh, equipment changes, supervisory pattern adjustments."
          >
            <p>HSG245 investigation framework:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Step 1 — Gather information</strong> — scene preservation,
                photographs, witness statements, documentary records, equipment
                examination.
              </li>
              <li>
                <strong>Step 2 — Analyse information</strong> — establish sequence of
                events, identify immediate causes (unsafe acts, conditions),
                underlying causes (job factors, individual factors), root causes
                (organisational factors, management system failures).
              </li>
              <li>
                <strong>Step 3 — Identify control measures</strong> — what would have
                prevented this incident, what mitigates similar future incidents.
              </li>
              <li>
                <strong>Step 4 — Plan implementation</strong> — assign actions, set
                deadlines, identify resource needs, communicate to workforce.
              </li>
              <li>
                <strong>Step 5 — Verify and review</strong> — confirm actions
                implemented, monitor effectiveness, feed into management review
                cycle.
              </li>
              <li>
                <strong>5 Whys</strong> — iterative why-questioning to drill from
                immediate to root cause.
              </li>
              <li>
                <strong>Fault tree analysis</strong> — for complex multi-causal
                incidents, particularly in higher-risk environments.
              </li>
              <li>
                <strong>Report retention</strong> — internal investigation reports
                kept alongside RIDDOR records; subject to legal privilege
                considerations where civil litigation possible.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Legal privilege and the investigation report"
            plainEnglish="Internal incident investigation reports may be subject to legal privilege if produced under the firm&apos;s solicitor instruction for the dominant purpose of litigation. Without legal privilege, the report is potentially disclosable to the HSE and to civil claimants. Many firms run investigations on two tracks — a factual operational investigation (non-privileged) and a legal-strategy assessment (privileged) — with the L3 supervisor contributing primarily to the operational track."
            onSite="L3 supervisor practical implication: write factually about what happened. Avoid speculating about cause or fault. Stick to observation and documented sequence. Strategic / legal assessment is for the firm&apos;s solicitors and senior management. The factual incident report becomes part of the management system; legal-strategy considerations belong to a separate, legally-privileged process. Confusing the two can compromise the firm&apos;s defence position."
          >
            <p>Investigation report discipline:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Factual operational investigation — sequence, observations, control evidence.</li>
              <li>Avoid speculation about cause or fault in factual report.</li>
              <li>Witness statements — first-person accounts taken contemporaneously.</li>
              <li>Photographic and physical evidence preserved.</li>
              <li>Legal-strategy assessment runs separately under solicitor direction.</li>
              <li>Legal privilege protects litigation-purpose documents from disclosure.</li>
              <li>Where in doubt about privilege scope, ask firm&apos;s solicitor before recording opinion.</li>
              <li>L3 supervisor contributes to operational track; senior / legal handle strategic track.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Enforcement undertakings — the negotiated alternative</ContentEyebrow>

          <ConceptBlock
            title="When an enforcement undertaking is offered instead of prosecution"
            plainEnglish="An enforcement undertaking is a less-common but published HSE option — a formal, binding voluntary agreement by the dutyholder to take specified action (remedy, training, payment to charity, system change) in exchange for the regulator not pursuing prosecution. Not available for the most serious cases; used where prosecution is technically warranted but a structured remediation package is more likely to deliver behaviour change. The undertaking is publicly registered and enforced through the courts if breached. The L3 supervisor at firm level may not engage with the undertaking decision directly but should know it exists as an option senior management may pursue."
            onSite="The undertaking pathway is not common in the electrical trade — it sits primarily in occupational health / process safety contexts where remediation programmes can be specified. But knowing it exists gives L3 supervisors a fuller picture of post-incident options: cooperation + corrective action plan + acceptance of breach can sometimes open the undertaking route in marginal cases. Outright denial of breach typically closes the route. Worth knowing about even where it does not apply day-to-day."
          >
            <p>Enforcement undertaking features:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Voluntary binding agreement to take specified action.</li>
              <li>Includes remediation, training, system change, charitable payment.</li>
              <li>Not available for most serious cases.</li>
              <li>Publicly registered alongside notices and prosecutions.</li>
              <li>Enforceable through courts if breached.</li>
              <li>Cooperation + acceptance of breach can open the route in marginal cases.</li>
              <li>Less common in electrical trade than in occupational health / process safety.</li>
              <li>L3 supervisor awareness — option senior management may pursue.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Fee For Intervention (FFI) and the costs cascade</ContentEyebrow>

          <ConceptBlock
            title="Why FFI matters and how it works"
            plainEnglish="HSE&apos;s Fee For Intervention (FFI) regime allows the HSE to recover the cost of regulatory work where a material breach of H&amp;S law is identified. Hourly rate is set annually — currently around the high-£100s per hour — and covers inspector time on site, investigation time, report writing, follow-up correspondence. A material breach is defined as one serious enough to warrant a written notification, an improvement / prohibition notice or prosecution. FFI invoices routinely reach four to five figures for serious incidents; appeal route exists but most invoices are accepted and paid. FFI is separate from any fine, civil claim or insurance premium impact."
            onSite="L3 supervisor practical reality: cooperation reduces inspector time on site. Thorough RAMS, clear records, accurate witness statements and a credible corrective action plan all reduce the investigation hours that become FFI hours. A defensive or disorganised firm typically accumulates more FFI hours than a cooperative one with system controls. The FFI is not the largest cost in the cascade but it is the most immediate — invoices arrive within weeks of inspection and must be paid regardless of any later prosecution outcome."
          >
            <p>FFI mechanics:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Triggered by material breach — serious enough to warrant written notification, notice or prosecution.</li>
              <li>Hourly rate set annually (currently high-£100s per hour).</li>
              <li>Covers inspector time on site, investigation, report writing, correspondence.</li>
              <li>Typical invoice four-figure for routine breach; five-figure for complex investigations.</li>
              <li>Separate from fines, civil claims, insurance premium impacts.</li>
              <li>Appeal route via Disputes Panel for queries about charges.</li>
              <li>Cooperation reduces inspector hours; thorough records reduce investigation time.</li>
              <li>Invoices arrive within weeks of inspection; must be paid regardless of later prosecution outcome.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>The HSE Enforcement Management Model</ContentEyebrow>

          <ConceptBlock
            title="How the inspector decides between advice, notice and prosecution"
            plainEnglish="The HSE&apos;s Enforcement Management Model (EMM) is the internal decision-tool inspectors use to choose between advice, improvement notice, prohibition notice, prosecution or enforcement undertaking. EMM weighs the actual harm and the potential for harm against the dutyholder&apos;s response history and the public-interest factors. The model is published — Operational Circular OC130/8 — and is worth reading at L3 because it gives a structured view of how enforcement decisions are actually made rather than relying on impressions. The framework runs: gap analysis (what the law requires vs what was found), risk gap (high / medium / low), strategic factors (history, attitude, public interest), then enforcement decision."
            onSite="L3 supervisor framing: cooperation, honesty and demonstration of system controls all factor into the inspector&apos;s EMM assessment. A firm with good RAMS, training records, near-miss logs and a clear corrective action plan after the incident sits in a materially better EMM position than one with thin paperwork and an obstructive demeanour. The EMM is not vindictive — it is structured. Knowing how it works changes the supervisor&apos;s posture from defensive to evidential. The inspector wants to see a competent firm taking the incident seriously; demonstrating that is what shifts the outcome from prosecution to notice, or from notice to advice."
          >
            <p>EMM decision factors:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Actual harm and potential for harm</strong> — the &apos;risk
                gap&apos; between what happened / could happen and what the law
                allows.
              </li>
              <li>
                <strong>Dutyholder response history</strong> — past notices,
                prosecutions, compliance pattern.
              </li>
              <li>
                <strong>Confidence in management</strong> — RAMS quality, training,
                supervision, system controls.
              </li>
              <li>
                <strong>Attitude and cooperation</strong> — engagement with the
                inspector, transparency, corrective action plan.
              </li>
              <li>
                <strong>Public interest factors</strong> — gravity, vulnerability of
                those at risk, media interest, deterrent effect.
              </li>
              <li>
                <strong>Outcomes</strong> — advice (verbal / written), improvement
                notice, prohibition notice, prosecution, enforcement undertaking
                (less common).
              </li>
              <li>
                <strong>Published reference</strong> — Operational Circular OC130/8
                sets out the structured framework.
              </li>
              <li>
                <strong>L3 supervisor implication</strong> — system controls and
                cooperative posture materially affect outcome.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Enforcement notices — improvement vs prohibition"
            plainEnglish="HASAWA s.21 (improvement notice) requires a specific breach to be remedied within a stated period — typically 21 days minimum, sometimes longer for complex remediation. HASAWA s.22 (prohibition notice) requires the unsafe activity to stop immediately or by a stated date; used where there is risk of serious personal injury. Both attract a right of appeal to an employment tribunal within 21 days. Failure to comply with a notice is itself a serious offence — fines, custody for individuals, named on HSE public register. The L3 supervisor on a site where a notice is served continues work that is NOT subject to the notice but stops everything within the notice scope."
            onSite="Practical L3 reflex when a notice is served: read it carefully, identify exactly what activity / location / equipment is restricted, brief the team, stop work in scope, document the notice receipt time, escalate to firm&apos;s contracts manager + H&amp;S manager immediately. Do not attempt to argue with the inspector at the scene — appeal route is tribunal not on-site negotiation. Compliance window starts immediately; do not assume the firm has the standard 21 days unless the notice says so. Some prohibition notices have immediate effect with no period for compliance."
          >
            <p>Notice operation:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Improvement notice (s.21)</strong> — specific breach, period for remedy (typically 21+ days).</li>
              <li><strong>Prohibition notice (s.22)</strong> — unsafe activity stops; immediate or by stated date.</li>
              <li>Notices specify the breach, the regulation breached, the required action and the time period.</li>
              <li>Appeal to employment tribunal within 21 days of notice issue.</li>
              <li>Notice operates pending appeal (for improvement notice; some flexibility for prohibition).</li>
              <li>Failure to comply with a notice — separate, serious offence — fine + custody possible.</li>
              <li>Notices listed on HSE public register — procurement consequence persists 5+ years.</li>
              <li>L3 supervisor reads, briefs team, stops in-scope work, escalates to firm.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>RIDDOR offences and enforcement</ContentEyebrow>

          <ConceptBlock
            title="Reg 6 late-reporting offence and Sentencing Council treatment"
            plainEnglish="Failure to report a reportable incident is itself an offence under Reg 6 RIDDOR 2013, prosecutable under HASAWA s.33. The standard pattern is a strict-liability summary offence triable in magistrates&apos; court with fines under the Sentencing Council&apos;s Definitive Guideline for H&amp;S offences. Late reporting is also treated as an aggravating factor when the underlying incident is prosecuted, increasing both the corporate fine and any personal sentence. The HSE&apos;s public position is that under-reporting will be enforced — the regulator routinely cross-checks RIDDOR returns against A&amp;E data, scheme returns, and insurance claim data to identify under-reporting at firm level."
            onSite="L3 supervisor framing: the wrong question is &apos;will the HSE find out?&apos; The right question is &apos;does this meet the trigger?&apos; If yes, escalate immediately. The reporting duty exists regardless of detection risk. A firm with a clean reporting record (proportionate to its activity) is more credible to the regulator after an incident than a firm that appears to under-report. The reputational risk of under-reporting cascades exactly like the rest of the H&amp;S cost cascade — fine + FFI + legal + civil + scheme action + procurement exclusion."
          >
            <p>RIDDOR enforcement pattern:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Reg 6 late-reporting offence — strict liability, summary-only, fines under Sentencing Council guideline.</li>
              <li>Underlying incident still prosecutable under HASAWA / EAWR / specific regs.</li>
              <li>Late reporting treated as aggravating factor in underlying prosecution.</li>
              <li>HSE cross-checks RIDDOR returns against external data sources to identify under-reporting.</li>
              <li>Pattern of under-reporting attracts targeted intervention and audit.</li>
              <li>Public register entries persist 5+ years — procurement consequence.</li>
              <li>Scheme bodies (NICEIC / NAPIT) may take separate action on reporting failures.</li>
              <li>Director personal liability under s.37 where late-reporting attributable to consent / connivance / neglect.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Cooperating with the HSE inspector after a reportable incident"
            plainEnglish="When the HSE inspector arrives after a reportable incident, the L3 supervisor may be the first point of contact on site. The inspector has statutory powers under HASAWA s.20 — to enter premises, take measurements, photograph, take samples, examine documents, interview persons, and require facilities. Cooperation is mandatory and obstruction is a separate offence under s.33. However, formal interviews under caution (PACE-style) trigger separate considerations — the operative is entitled to legal representation, and statements made under caution can be used as evidence. The L3 supervisor on the day of inspection cooperates with site-walk and factual questions, while routing any formal interview through the firm&apos;s legal channel."
            onSite="Standard L3 reflex on inspector arrival: introduce yourself, give factual answers to operational questions (where things are, who&apos;s in charge, what the work is), assist with site walk-around, provide requested documents (RAMS, certs, training records). Where the inspector wants formal interview under caution about the incident specifically, politely ask whether the firm&apos;s solicitor or H&amp;S manager should be present, and contact them. Cooperation is mandatory but legal representation for formal interviews is the operative&apos;s right. The HSE inspector understands and respects the distinction; obstruction does not include reasonable requests for legal representation."
          >
            <p>Inspector cooperation framework:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>HASAWA s.20 — inspector&apos;s statutory powers of entry, examination, document inspection.</li>
              <li>HASAWA s.21 — improvement notice power; s.22 — prohibition notice power.</li>
              <li>HASAWA s.33 — offences include obstruction, false information, failure to provide facilities.</li>
              <li>Standard cooperation: site walk, factual questions, documents, witness identification.</li>
              <li>Formal interview under caution — operative entitled to legal representation.</li>
              <li>Firm&apos;s solicitor / H&amp;S manager should be present for formal interview.</li>
              <li>Statements made under caution admissible as evidence.</li>
              <li>Inspector respects reasonable requests for legal representation in formal interviews.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Health and Safety at Work etc Act 1974 — s.20(2)"
            clause={
              <>
                &quot;The powers of an inspector referred to in the preceding
                subsection are the following, namely — (a) at any reasonable time
                (or, in a situation which in his opinion is or may be dangerous, at
                any time) to enter any premises which he has reason to believe it is
                necessary for him to enter for the purpose mentioned in subsection
                (1) above; ... (k) to require any person whom he has reasonable cause
                to believe to be able to give any information relevant to any
                examination or investigation under paragraph (d) above to answer
                (in the absence of persons other than a person nominated by him to
                be present and any persons whom the inspector may allow to be
                present) such questions as the inspector thinks fit to ask and to
                sign a declaration of the truth of his answers...&quot;
              </>
            }
            meaning={
              <>
                The inspector&apos;s s.20 powers. Power of entry, examination,
                documentation inspection, sample-taking, photograph-taking, and
                interview under (k). Subsection (k) interviews are NOT under PACE
                caution but are sworn declarations of truth — false statements are
                themselves an offence. The L3 supervisor faced with an s.20(k)
                interview cooperates but may have firm&apos;s legal representative
                present.
              </>
            }
            cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), s.20."
          />

          <SectionRule />
          <FAQ items={faqs} />
          <SectionRule />
          <KeyTakeaways points={[
            "Remember from Section 2.5 — RIDDOR Schedule 1 specified injuries trigger immediate phone + F2508.",
            "Categories: fracture (excl finger/thumb/toe), amputation (any), sight loss, crush + internal organ, burn over 10% / vital organ, scalping requiring hospital, LOC from head injury / asphyxia, enclosed-space injuries.",
            "Finger / thumb / toe fractures NOT Schedule 1 but may be over-7-day F2508A separately.",
            "Timescale: phone 0345 300 9923 without delay + F2508 within 10 days of incident.",
            "Operative's role: provide facts to responsible person promptly; don't wait for hospital confirmation.",
            "When in doubt, escalate as specified injury; update later if facts change.",
            "Late reporting is separate Reg 6 offence and aggravating factor in subsequent prosecution.",
            "Two parallel categories — Schedule 1 specified AND over-7-day — check both.",
            "Electric-shock incidents commonly sit in the grey zone — LOC or 24h+ hospital = Schedule 1; 7+ days off = over-7-day; short-circuit causing fire / overhead line contact = Schedule 2 dangerous occurrence even without injury.",
            "Schedule 2 dangerous occurrences are reportable regardless of injury — buried-cable strike, MEWP failure, overhead-line contact, short-circuit causing fire / explosion all trigger F2508.",
            "Schedule 3 occupational disease reporting catches HAVS, dermatitis, asthma, asbestos-related cancer — long-tail diseases reportable on diagnosis.",
            "Reg 12 record retention minimum 3 years; residential / DPA work pushes towards indefinite retention.",
            "Internal investigation under HSG245 sits alongside RIDDOR — same-day witness statements, scene preservation, immediate / underlying / root cause analysis.",
          ]} />
          <Quiz title="RIDDOR Schedule 1 — knowledge check" questions={quizQuestions} />
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section5-3')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">5.3 Sentencing guideline</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section5-5')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next subsection <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">5.5 Risk assessment as supervisor</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
