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
            "List: fracture (excl finger/thumb/toe), amputation, sight loss, crush + internal damage, burn &gt;10% body or vital organ, scalping requiring hospital, head-injury LOC or asphyxia LOC, enclosed-space (hypothermia / heat / resuscitation / 24h hospital).",
            "Important exclusion — finger/thumb/toe fractures NOT Schedule 1 (may still be over-7-day F2508A if 8+ days off).",
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

          <RegsCallout source="RIDDOR 2013 — Reg 4(2)" clause={<>"Where any person at work suffers a specified injury (Schedule 1) as a result of a work-related accident, the responsible person must follow the reporting procedure."</>} meaning={<>Reg 4(2) creates the specified-injury reporting duty. Reg 6 sets out the procedure (immediate notification + F2508 within 10 days). Schedule 1 lists the categories. Together they form the specified-injury reporting regime.</>} cite="Source: RIDDOR 2013 (SI 2013/1471), Reg 4(2) + Schedule 1 — verbatim from legislation.gov.uk." />

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

          <RegsCallout source="RIDDOR 2013 — Reg 6 (Fatalities)" clause={<>&quot;Where any person dies as a result of a work-related accident, the responsible person must follow the reporting procedure.&quot;</>} meaning={<>The fatality reporting duty. Same procedure as Schedule 1 — phone immediately + F2508 within 10 days. Coroner becomes involved separately. The L3 supervisor at the scene of a fatality preserves the scene completely, calls emergency services first, then the responsible person. Do not move the deceased except where required for first aid attempts.</>} cite="Source: RIDDOR 2013 (SI 2013/1471), Reg 6 — verbatim from legislation.gov.uk." />

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

          <RegsCallout source="RIDDOR 2013 — Reg 12 (Records)" clause={<>&quot;The responsible person must keep a record of — (a) any reportable accident, dangerous occurrence or diagnosis of a reportable disease... The record... must be kept for at least three years from the date on which it was made.&quot;</>} meaning={<>The record-keeping duty. Three-year minimum is the legal floor; practice in residential / DPA-relevant work is to keep indefinitely. Records include incident details, witness accounts, reporting timeline, follow-up actions.</>} cite="Source: RIDDOR 2013 (SI 2013/1471), Reg 12 — verbatim from legislation.gov.uk." />

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
          <FAQ items={faqs} />
          <SectionRule />
          <KeyTakeaways points={[
            "Remember from Section 2.5 — RIDDOR Schedule 1 specified injuries trigger immediate phone + F2508.",
            "Categories: fracture (excl finger/thumb/toe), amputation (any), sight loss, crush + internal organ, burn &gt;10% / vital organ, scalping requiring hospital, LOC from head injury / asphyxia, enclosed-space injuries.",
            "Finger / thumb / toe fractures NOT Schedule 1 but may be over-7-day F2508A separately.",
            "Timescale: phone 0345 300 9923 without delay + F2508 within 10 days of incident.",
            "Operative\'s role: provide facts to responsible person promptly; don\'t wait for hospital confirmation.",
            "When in doubt, escalate as specified injury; update later if facts change.",
            "Late reporting is separate Reg 6 offence and aggravating factor in subsequent prosecution.",
            "Two parallel categories — Schedule 1 specified AND over-7-day — check both.",
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
