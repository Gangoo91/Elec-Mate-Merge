/**
 * Module 1 · Section 2 · Subsection 5 — RIDDOR F2508 process: responsible-person walkthrough
 * Maps to City & Guilds 2365-03 / Unit 201 / LO2 / AC 2.5
 *   AC 2.5 — "describe the ways in which the environment may be affected by work activities"
 *
 * Note: AC 2.5 in 2365-03 Unit 201 is environment-focused; this Sub uses the
 * RIDDOR F2508 walkthrough as a depth layer because L3 supervisors are
 * routinely the first point of contact for the responsible person, and
 * environmental impacts are covered separately in Sub 1.5.
 *
 * Layered depth (supplementary):
 *   - 2357 Unit 601 ELTK01 / AC 2.5 — reporting H&S issues per regulations
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import { TLDR, ConceptBlock, RegsCallout, CommonMistake, Scenario, KeyTakeaways, FAQ, LearningOutcomes, ContentEyebrow, SectionRule } from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'RIDDOR F2508 process — responsible-person walkthrough (2.5) | Level 3 Module 1.2.5 | Elec-Mate';
const DESCRIPTION = 'L3 walkthrough of the RIDDOR F2508 / F2508A process — trigger identification, online portal flow, retention, follow-up and the inevitable HSE conversation that follows.';

const checks = [
  { id: 'l3-m1-s2-sub5-trigger', question: 'Which of these triggers an IMMEDIATE phone notification (not 10-day F2508)?', options: [
    'A work-related fatality or a specified injury (Schedule 1) — fracture, amputation, sight loss, crush, serious burn, scalping, head-injury unconsciousness or enclosed-space injury.',
    'An over-7-day injury — where a worker is off normal duties for more than seven consecutive days. The seriousness of a week off work means the HSE must be told by phone the same day.',
    'Any injury requiring a trip to A&E — once a casualty is taken to hospital for treatment, the phone notification is triggered regardless of how minor the injury later turns out to be.',
    'A reportable occupational disease such as hand-arm vibration syndrome — because a diagnosed disease is serious, it must be phoned through to the HSE without delay rather than reported on a form.',
  ], correctIndex: 0, explanation: 'Fatality and specified injury (fracture excl fingers/thumbs/toes) get an immediate phone to HSE on 0345 300 9923, with the F2508 within 10 days. An over-7-day injury is F2508A within 15 days; A&E attendance alone and most occupational diseases are not immediate-phone triggers.' },
  { id: 'l3-m1-s2-sub5-form', question: 'Who actually fills in the F2508?', options: [
    'The injured person themselves — the casualty completes the F2508 because they have first-hand knowledge of what happened, then hands it to the employer to submit.',
    'The first-aider who treated the casualty — as the person who assessed the injury, the appointed first-aider is the one RIDDOR makes responsible for completing and submitting the form.',
    'The "responsible person" defined in RIDDOR Reg 3 — usually the employer, the self-employed person, or the person in control of premises.',
    'The HSE inspector — the report is completed by the HSE on the firm\'s behalf once the firm has phoned in the incident, so the employer only needs to make the initial call.',
  ], correctIndex: 2, explanation: 'For an employee incident on a contractor\'s site it\'s normally the contractor employer. The L3 operative escalates to the responsible person with the facts; the responsible person makes the report, not the operative directly.' },
  { id: 'l3-m1-s2-sub5-retain', question: 'How long must RIDDOR records be retained?', options: [
    'One year from the date of the incident — once the annual HSE statistics return has been compiled the record can be destroyed.',
    'Three years from the date of the incident under RIDDOR Reg 12, in any format that allows retrieval.',
    'Ten years — RIDDOR records share the same retention period as electrical certificates, so they are kept for a decade alongside the EICs.',
    'Until the casualty returns to normal duties — the record is closed and disposed of once the injured person is back at work, as the incident is then resolved.',
  ], correctIndex: 1, explanation: 'Three-year statutory minimum under Reg 12. The HSE may request retrospective access during investigations or sector reviews. Many firms retain far longer given the Defective Premises Act 30-year retrospective limit (BSA 2022 s.135) and PI insurance considerations.' },
];

const quizQuestions = [
  { id: 1, question: 'How is a RIDDOR report normally submitted?', options: [
    'By post — a paper F2508 is completed by hand and posted to the local HSE office, which logs it and returns a stamped copy as the firm\'s record.',
    'Online via riddor.hse.gov.uk for all categories, with a phone call to 0345 300 9923 reserved for fatalities and specified injuries.',
    'Through the firm\'s insurer — the employer notifies the EL insurer, who then forwards the details to the HSE on the firm\'s behalf as part of the claims process.',
    'In the workplace accident book only — completing the BI 510 accident book entry automatically satisfies the RIDDOR reporting duty without any submission to the HSE.',
  ], correctAnswer: 1, explanation: 'The online portal is the standard route — F2508 for incidents/dangerous occurrences, F2508A for over-7-day injuries and occupational diseases. Phone notification is reserved for the highest-priority categories (fatality, specified injury) where immediate notification is expected.' },
  { id: 2, question: 'What\'s the F2508 vs F2508A distinction?', options: [
    'F2508 is the form for incidents in England and Wales; F2508A is the Scottish version of the same form, used where the work took place north of the border.',
    'F2508 is for employee injuries; F2508A is for injuries to members of the public, with both carrying the same 10-day deadline.',
    'F2508 is the main form for deaths, specified injuries and dangerous occurrences (10-day deadline); F2508A is for over-7-day injuries and diseases (15 days).',
    'F2508 is the initial notification submitted within 24 hours; F2508A is the detailed follow-up report submitted once the investigation is complete, with no fixed deadline.',
  ], correctAnswer: 2, explanation: 'Two forms; two timescales. Knowing which applies to which trigger is L3-essential.' },
  { id: 3, question: 'When does the 10-day clock start?', options: [
    'On the date the responsible person first becomes aware of the incident, which on a multi-contractor site may be several days after it actually happened.',
    'On the date the casualty is discharged from hospital, because only then is the full extent of the injury known and the report can be completed accurately.',
    'On the date the HSE acknowledges the initial phone call, since that is when the formal reporting process is recognised as having begun.',
    'On the date of the incident, not the date of report or diagnosis — so reporting three days later uses three of the ten days.',
  ], correctAnswer: 3, explanation: 'If a casualty is hospitalised on Monday and the firm reports the following Thursday, that\'s 3 days into the 10-day window. Late reports are a separate offence under Reg 6 — they add a second offence to the underlying breach.' },
  { id: 4, question: 'What information does the F2508 require?', options: [
    'Full incident details — date, time, location, casualty details, what happened, equipment involved, the injury, witnesses and action taken since.',
    'Only the casualty\'s name, the date and a one-line summary — RIDDOR deliberately keeps the form brief so it can be filed quickly without delaying first aid.',
    'The casualty\'s full medical history and GP details, so the HSE can assess whether any pre-existing condition contributed to the injury.',
    'A signed admission of fault from the responsible person, since the F2508 doubles as the firm\'s acceptance of liability for the incident.',
  ], correctAnswer: 0, explanation: 'It also captures what the casualty was doing, the kind of accident and who else was involved. Full and accurate completion is the responsible person\'s job; gathering the facts is often the L3 operative\'s job — your contemporaneous notes from the scene feed the F2508 directly.' },
  { id: 5, question: 'What happens after a RIDDOR report is submitted?', options: [
    'The HSE automatically issues a fine to the firm for every report received, calculated on the severity of the injury, which the firm must pay within 28 days.',
    'HSE acknowledges receipt and may follow up with a desktop review, request for information, or a site visit depending on severity and context.',
    'The report is forwarded to the casualty\'s solicitor, who uses it as the basis for a personal-injury claim against the firm.',
    'Nothing further — RIDDOR is a one-way statistical return, so once submitted the firm hears no more and no follow-up is ever made even for a fatality.',
  ], correctAnswer: 1, explanation: 'Whether HSE attends depends on severity and wider context (recurrence, sector trends, public interest); for specified injuries and fatalities a follow-up visit is normally expected. RIDDOR feeds the HSE\'s intelligence picture and reports drive enforcement decisions.' },
  { id: 6, question: 'Can a RIDDOR report be amended after submission?', options: [
    'No — once submitted a RIDDOR report is final and locked; any new information has to be raised as a completely separate report rather than an amendment.',
    'Only within 24 hours of submission — after that the report is treated as a legal record and cannot be touched, so errors must be left in place.',
    'Yes — if new information comes to light the report can be updated through the portal, and honest amendment beats leaving an inaccurate record on file.',
    'Only by an HSE inspector — the firm cannot change its own report, but an inspector can update it during a follow-up visit if the facts have changed.',
  ], correctAnswer: 2, explanation: 'Examples include an injury upgraded from over-3-day to over-7-day, or a fatality following an initial specified-injury report. Updates are encouraged — the HSE wants accurate intelligence and corrected reports help.' },
  { id: 7, question: 'What\'s the operative\'s role in the F2508 process?', options: [
    'To make the formal report personally — as the person closest to the incident, the operative phones the HSE and submits the F2508 without waiting to involve the firm.',
    'To decide whether the incident is reportable at all — the operative judges the category and only escalates to the firm if they conclude it meets a RIDDOR trigger.',
    'None — the operative simply carries on working; RIDDOR is entirely a management matter and the person involved has no part to play in it.',
    'Gather and preserve facts at the scene, provide a contemporaneous written account, notify the responsible person immediately, and assist as asked.',
  ], correctAnswer: 3, explanation: 'The operative also provides witness information, preserves evidence and cooperates with any HSE follow-up. They aren\'t normally the report-maker but are the source of the facts — operative = facts source; responsible person = report-maker. Clean separation.' },
  { id: 8, question: 'When should the HSE be notified BEFORE the F2508 is submitted?', options: [
    'For fatalities, specified injuries and certain serious dangerous occurrences — phone 0345 300 9923 as soon as practical, with the F2508 within 10 days.',
    'For every reportable incident without exception — RIDDOR requires a phone call before any form is submitted, no matter how minor the injury.',
    'Only for over-7-day injuries — because the F2508A has a longer deadline, the HSE must be phoned first to flag that a report is coming.',
    'Never — the phone line is for general enquiries only, and all incidents including fatalities are reported solely through the online portal.',
  ], correctAnswer: 0, explanation: 'The phone notification is the formal "without delay" requirement under Reg 6. The highest-priority categories get phone-then-form; lower categories go through the online portal direct.' },
];

const faqs = [
  { question: 'Who pays for HSE follow-up after a RIDDOR report?', answer: 'If the inspector identifies a "material breach" during follow-up, FFI applies (~£170/hr inspector time billed to the dutyholder). A clean follow-up where no breach is found is free.' },
  { question: 'Should the firm always over-report rather than risk under-reporting?', answer: 'When in doubt, report. The HSE doesn\'t penalise over-reporting. Late or missed reports ARE a separate offence (Reg 6). Defensive reporting is the safer default.' },
  { question: 'Does a RIDDOR report mean the firm has admitted fault?', answer: 'No. RIDDOR is a statistical / intelligence reporting regime, not a fault admission. The HSE uses it to decide where to focus inspection and prosecution. The firm can defend the underlying breach separately.' },
  { question: 'What if the casualty refuses to consent to RIDDOR reporting?', answer: 'Casualty consent isn\'t required — it\'s the responsible person\'s legal duty. Casualty\'s personal data is protected by data protection law but the report itself goes regardless of consent.' },
  { question: 'Are near-misses RIDDOR reportable?', answer: '"Near-miss" isn\'t a RIDDOR category. Some near-misses ARE reportable as "dangerous occurrences" (Schedule 2) — e.g. uncontrolled electrical short circuit causing 24+ hour plant stoppage. Most near-misses are internal-only; check Schedule 2 each time.' },
  { question: 'How does RIDDOR interact with the firm\'s insurance?', answer: 'PI / EL insurers usually require notification of any incident likely to give rise to a claim — separate from RIDDOR. Late insurer notification can void cover. Many firms have an internal incident-management process that handles RIDDOR + insurance + customer comms in parallel.' },
  { question: 'Who has the right of access to RIDDOR records?', answer: 'HSE inspectors have right of access under HASAWA s.20 to any RIDDOR records. Insurance companies typically request RIDDOR records as part of claim investigations or annual renewal. PQQ clients can request RIDDOR data. Employees and their representatives can request their own data under Data Protection Act 2018; redactions may apply to third-party information.' },
  { question: 'What if a self-employed contractor on our site has an incident — who reports?', answer: 'The contractor as self-employed person is responsible for reporting their own RIDDOR-reportable injury to themselves. But the host firm has parallel responsibilities — they may also need to report under different categories (e.g. as &quot;person in control of premises&quot;), and their EAWR / CDM duties around contractor competence and supervision are likely to be relevant to the HSE investigation. Both firms should liaise on the reporting and the response.' },
  { question: 'Does a verbal apology to the casualty after an incident count as admission of liability?', answer: 'A genuine expression of sympathy is not the same as admitting legal liability — the Compensation Act 2006 s.2 specifically clarifies this for civil claims. For RIDDOR purposes a verbal apology has no statutory effect either way. But the L3 supervisor reflex is to be cautious — say what is genuinely felt (&quot;I&apos;m so sorry this has happened to you&quot;), do not speculate about cause (&quot;it was our fault, that ladder was no good&quot;) which is interpreted by insurers and the HSE as evidence of breach.' },
  { question: 'What if the incident happened to a member of the public, not an employee?', answer: 'Public-injury incidents on your firm&apos;s work activity are reportable under RIDDOR Reg 5 if the person was injured and taken from the scene of the accident to hospital for treatment in respect of that injury. The reporting category is different from employee injuries but the timescales are the same. The PL insurer notification runs in parallel. CDM 2015 may add design / Principal Contractor duty considerations.' },
  { question: 'Are reports submitted to RIDDOR ever published publicly?', answer: 'Individual RIDDOR reports are not published, but aggregate sectoral data is published in HSE statistics and may inform sector-targeted campaigns. Where prosecution follows, court records become public; firms can also be named in HSE press releases. PQQ clients can request RIDDOR statistics under their contractual rights.' },
];

export default function Sub5() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);
  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section2')} className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"><ArrowLeft className="h-4 w-4" /> Section 2</button>
          <PageHero eyebrow="Module 1 · Section 2 · Subsection 5" title="RIDDOR F2508 process — responsible-person walkthrough" description="Remember from L2 — RIDDOR is the reporting regulation. At L3 the depth is the end-to-end process: trigger → escalation → form completion → submission → retention → follow-up." tone="emerald" />
          <TLDR points={[
            "Trigger identification: fatality / specified injury → immediate phone (0345 300 9923) + F2508 within 10 days. Over-7-day injury → F2508A within 15 days. Dangerous occurrence (Schedule 2) → F2508 within 10 days. Disease (Schedule 3) → F2508A.",
            "Responsible person under Reg 3 makes the report. Operative escalates with facts. Online portal at riddor.hse.gov.uk.",
            "3-year statutory retention (Reg 12). Many firms retain longer for PI / Defective Premises Act considerations.",
            "Late reporting is a separate Reg 6 offence — stacks on top of the underlying breach. When in doubt, report; amend later if facts change.",
            "Specified injuries (Schedule 1) — fracture (excl fingers/thumbs/toes), amputation, sight loss, crush, serious burn, scalping, head-injury unconsciousness, enclosed-space injury.",
            "Enforcement Management Model (EMM) determines outcome — actual + potential consequence, probability, risk gap, firm history, response quality.",
          ]} />
          <LearningOutcomes outcomes={[
            "Identify the RIDDOR trigger categories — death, specified injury, over-7-day, dangerous occurrence, disease.",
            "State the timescales for each — immediate phone / 10 days / 15 days.",
            "Distinguish F2508 (incidents / dangerous occurrences) from F2508A (over-7-day / diseases).",
            "Apply the operative-to-responsible-person escalation chain.",
            "State the 3-year retention requirement under Reg 12.",
            "Describe the typical post-report HSE follow-up and the FFI implications.",
            "Recall Schedule 1 specified injuries and Schedule 2 dangerous occurrences most relevant to electrical work.",
            "Apply the parallel RIDDOR + insurance + customer-comms triangle of post-incident notification.",
            "Distinguish HASAWA s.20 fact-gathering interviews from PACE-cautioned investigative interviews.",
          ]} initialVisibleCount={3} />

          <ContentEyebrow>Trigger identification — what's reportable?</ContentEyebrow>
          <ConceptBlock title="Five categories with different timescales" plainEnglish="RIDDOR has five reportable buckets: fatalities, specified injuries, over-7-day injuries, dangerous occurrences and diseases. Each has its own form and timescale. Knowing which applies to the incident in front of you is the first L3 judgement call." onSite="The L3 reflex when an incident happens: identify the casualty\'s injury or the event, check it against the four schedules (1 specified injuries, 2 dangerous occurrences, 3 diseases) and decide which form / which timescale. When in doubt, escalate immediately and let the responsible person decide.">
            <p>Quick-reference table:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Fatality</strong> — IMMEDIATE phone (0345 300 9923) + F2508 within 10 days.</li>
              <li><strong>Specified injury (Schedule 1)</strong> — IMMEDIATE phone + F2508 within 10 days.</li>
              <li><strong>Over-7-day injury</strong> — F2508A within 15 days.</li>
              <li><strong>Dangerous occurrence (Schedule 2)</strong> — F2508 within 10 days.</li>
              <li><strong>Reportable disease (Schedule 3)</strong> — F2508A.</li>
              <li><strong>Gas incident</strong> — separate Reg 11–12 scheme.</li>
              <li><strong>Member of public taken to hospital (Reg 5)</strong> — F2508 within 10 days.</li>
              <li><strong>Self-employed similar list (Reg 4(2))</strong> — F2508 within 10 days.</li>
              <li><strong>When category uncertain</strong> — default to higher category; the HSE does not penalise over-reporting but does penalise under-reporting under Reg 6.</li>
              <li><strong>Amendment after submission</strong> — supported by the portal; honest update preferred over stale partial record.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 — Reg 6" clause={<>"The responsible person must follow the reporting procedure when the responsible person becomes aware of the death of any person, the suffering of a specified injury at work, the suffering of an injury that results in a person being incapacitated for more than 7 consecutive days, the suffering of an occupational disease, or the occurrence of a dangerous occurrence. The reporting procedure is — (a) the responsible person must without delay notify the relevant enforcing authority of the death, accident, occurrence or case by the quickest practicable means; and (b) within 10 days of the death, accident, occurrence or case, the responsible person must send a report of it to the relevant enforcing authority in an approved manner."</>} meaning={<>Reg 6 puts the duty on the responsible person to follow the prescribed reporting procedure (phone for the highest categories, F2508/F2508A within timescales). The L3 operative&apos;s role is to alert the responsible person promptly and accurately; the responsible person discharges Reg 6. The &quot;quickest practicable means&quot; wording sets the bar — text, phone or email; the 10-day clock for the formal F2508 runs from the date of the incident, not from when the firm decided to act.</>} cite="Source: Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 (SI 2013/1471), Reg 6." />

          <InlineCheck {...checks[0]} />

          <SectionRule />
          <ContentEyebrow>Responsible person and the report mechanics</ContentEyebrow>
          <ConceptBlock title="Reg 3 responsible person" plainEnglish="RIDDOR Reg 3 defines the \'responsible person' for each category. Usually the employer for employee incidents; the self-employed person for themselves; the person in control of premises in some cases. For an electrical contractor working on a customer\'s site, the contractor employer is usually the responsible person for incidents to their employees. Where the incident affects a member of the public on the customer&apos;s premises, the contractor employer and the premises occupier may BOTH have separate responsible-person duties; the F2508 should be coordinated to avoid duplicate or inconsistent reports." onSite="Knowing your firm\'s RIDDOR responsible person is essential — usually the H&S manager, contracts manager or director. Escalate to them immediately when a reportable trigger occurs. In multi-contractor scenarios (e.g. CDM project) the Principal Contractor often coordinates the RIDDOR response across the trades on site.">
            <p>The escalation flow:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>Operative identifies trigger event (incident, dangerous occurrence).</li>
              <li>Operative phones responsible person same day with facts.</li>
              <li>Responsible person decides on category and timescale.</li>
              <li>For fatality / specified injury — responsible person phones 0345 300 9923 without delay.</li>
              <li>For all categories — responsible person submits F2508 / F2508A via riddor.hse.gov.uk within statutory timescale.</li>
              <li>Records retained by firm for minimum 3 years (Reg 12).</li>
              <li>HSE acknowledgement received; firm may receive follow-up contact.</li>
            </ol>
          </ConceptBlock>

          <ConceptBlock title="The online portal" plainEnglish="riddor.hse.gov.uk is the modern reporting route. F2508 and F2508A are completed online; PDF copy emailed to the firm; HSE record created. Phone 0345 300 9923 used only for fatality / specified-injury immediate notification. The portal also supports F2508G (gas incidents under Reg 11) for Gas Safe registered businesses." onSite="Most firms have a single account on the portal — usually the H&S manager or a director-level safety lead. Operatives feed facts to that account-holder; the account-holder submits. Multi-site firms with several reporting points should still maintain a single consolidated account for audit consistency.">
            <p>What the form captures:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Reporter / responsible person details.</li>
              <li>Casualty details (name, age, occupation, employee status).</li>
              <li>Incident details (date, time, location).</li>
              <li>Description of the event.</li>
              <li>Type of accident (struck by, fell from height, contact with electricity etc).</li>
              <li>Injury details and body part affected.</li>
              <li>Equipment / substance / process involved.</li>
              <li>Witness information (if any).</li>
              <li>Immediate action taken.</li>
              <li>RIDDOR category being reported (specified injury, dangerous occurrence etc).</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />

          <SectionRule />
          <ContentEyebrow>Retention and follow-up</ContentEyebrow>
          <ConceptBlock title="3-year statutory retention; longer practice" plainEnglish="RIDDOR Reg 12 requires records to be retained for 3 years from the date the record was made. In practice many firms retain indefinitely, particularly residential incidents — the BSA 2022 / Defective Premises Act extension to 30-year retrospective limitation makes long retention prudent. Professional indemnity insurers often expect 6+ year retention to align with their own claims-handling cycle. Major framework clients commonly ask for 5+ years on PQQs." onSite="Records are typically the F2508 PDF, the firm\'s internal incident form, photos, witness statements, RIDDOR acknowledgement email, any HSE correspondence, root-cause analysis, corrective action register. Stored on the firm\'s H&S system or document management; backed up daily; access-controlled.">
            <p>What HSE follow-up typically looks like:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Acknowledgement email — automatic.</li>
              <li>Desktop review — HSE may request further information by email.</li>
              <li>Site visit — for serious incidents, fatalities, or where the inspector judges a visit warranted.</li>
              <li>Material breach investigation — if found, FFI applies (~£170/hr).</li>
              <li>Improvement / prohibition notice — if breach justifies.</li>
              <li>Prosecution — for serious or systemic breaches.</li>
              <li>Sector intelligence — RIDDOR reports feed HSE statistics and inform sector campaigns.</li>
              <li>Cross-reference with other regulators — Environment Agency, Fire and Rescue Service, scheme body, local authority where relevant.</li>
              <li>Industry alerts — the HSE may issue a sector safety alert if the incident reveals a pattern affecting other firms.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <SectionRule />
          <ContentEyebrow>HSE investigation interviews — PACE and the caution</ContentEyebrow>

          <ConceptBlock
            title="When the inspector says &apos;I am going to caution you&apos;"
            plainEnglish="HSE inspectors investigating a serious incident may interview operatives and dutyholders under the Police and Criminal Evidence Act 1984 (PACE). When the inspector decides there are grounds to suspect a person of an offence, that person is cautioned: &apos;You do not have to say anything. But it may harm your defence if you do not mention when questioned something which you later rely on in court. Anything you do say may be given in evidence.&apos; A PACE-cautioned interview is a formal evidence-gathering procedure — different in character from the on-site fact-gathering chat under HASAWA s.20."
            onSite="The L3 reflex when offered a PACE interview: ask for a solicitor before answering. The firm should arrange one (usually via the firm&apos;s legal panel or insurer). You have the right to silence under caution; using it doesn&apos;t prove guilt but failing to mention something you later rely on can be drawn against you. The interview is recorded; what you say becomes evidence in any subsequent prosecution. This is not the moment for free-flowing recollection without legal support."
          >
            <p>What changes once you&apos;re under caution:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Right to silence</strong> — but adverse inference may be drawn if you
                later rely on something you didn&apos;t mention.
              </li>
              <li>
                <strong>Right to legal representation</strong> — request before the interview
                proceeds.
              </li>
              <li>
                <strong>Recording</strong> — the interview is recorded (audio/video) and
                transcribed.
              </li>
              <li>
                <strong>Disclosure</strong> — you should be told the broad nature of the
                allegation before answering.
              </li>
              <li>
                <strong>Self-incrimination protection</strong> — you don&apos;t have to
                incriminate yourself, but you must not deceive or mislead.
              </li>
              <li>
                <strong>Post-interview</strong> — you should receive a copy of the transcript;
                review with your solicitor for accuracy.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Contemporaneous notes — the L3 evidence habit</ContentEyebrow>

          <ConceptBlock
            title="The notebook entry that wins or loses the case"
            plainEnglish="Contemporaneous notes — written at the time of the event, dated, signed — are some of the strongest evidence in any subsequent investigation. Reconstructed accounts months later are weaker; memory fades, details merge with what you read or hear afterwards. The L3 habit of keeping a daily job-pack note (what you did, what you found, what you raised) is what gives the firm and you the defence in the inevitable HSE follow-up."
            onSite="Practical: a hardback notebook in the van, dated entries, written same day. Or a job-app digital equivalent with timestamps that can&apos;t be edited retrospectively. Photos of conditions, isolation, voltage indicator readings. Texts and emails to supervisors documenting concerns and refusals. Together these form the evidence base on which everything from a routine FFI dispute to a Crown Court defence rests."
          >
            <p>What a defensible contemporaneous note looks like:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Date and time</strong> — start of work, key events, end of work.
              </li>
              <li>
                <strong>Location</strong> — full address; identifying features.
              </li>
              <li>
                <strong>Personnel present</strong> — names, roles, times present.
              </li>
              <li>
                <strong>Work undertaken</strong> — circuits, equipment, methods, isolation
                points.
              </li>
              <li>
                <strong>Findings</strong> — anything unexpected, anything that didn&apos;t
                match the plan.
              </li>
              <li>
                <strong>Decisions</strong> — what was decided, who decided it, why.
              </li>
              <li>
                <strong>Concerns raised</strong> — to whom, response received.
              </li>
              <li>
                <strong>Photos taken</strong> — file references, location of storage.
              </li>
              <li>
                <strong>Sign-off</strong> — your initials confirming the note is your own
                contemporaneous record.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Witness statements — capturing memory while it&apos;s fresh</ContentEyebrow>

          <ConceptBlock
            title="The 24-hour window when witness evidence is at its strongest"
            plainEnglish="After any significant incident the L3 supervisor act with the highest evidence-value impact is asking witnesses to write down what they saw, in their own words, on the day. Memory degrades fast — by the next day the account has reconstructed; by the next week details have merged with what was heard or read; by the next month the witness account may bear little resemblance to what they actually saw. The HSE, the firm&apos;s defence team and the insurer all want first-account witness statements."
            onSite="Practical at the scene: identify witnesses, get their names and contact details, hand them a sheet of paper or open a document on your phone, ask them to write what they saw in their own words, sign and date it. Don&apos;t prompt or suggest; let them describe what they remember. Multiple independent witness statements written before they&apos;ve discussed the event with each other are gold."
          >
            <p>What a useful witness statement contains:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Witness identity</strong> — full name, contact, relationship to the
                event (employee, customer, visitor, contractor).
              </li>
              <li>
                <strong>Date and time of writing</strong> — and date / time of the event being
                described.
              </li>
              <li>
                <strong>Location</strong> of the witness during the event — were they actually
                in a position to see what they describe?
              </li>
              <li>
                <strong>Account in their own words</strong> — chronological if possible.
              </li>
              <li>
                <strong>What they saw / heard</strong> — sensory description; not opinion or
                cause attribution.
              </li>
              <li>
                <strong>Anyone else present</strong> — names of other potential witnesses.
              </li>
              <li>
                <strong>Signature and date</strong> — confirming the statement is theirs.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Post-report enforcement — the decision tree</ContentEyebrow>

          <ConceptBlock
            title="What happens after the F2508 lands at the HSE"
            plainEnglish="Once a RIDDOR report is submitted, the HSE triages it. Most reports are logged as intelligence and don&apos;t result in inspector contact. Some lead to desktop review (an inspector emails the firm with follow-up questions). Some lead to site visits. A small minority lead to formal enforcement (notice, FFI, prosecution). The decision is made using the Enforcement Management Model and the HSE&apos;s sectoral priorities. The firm should expect contact for any specified-injury or fatality report; lower-category reports normally don&apos;t generate visits unless they show a pattern."
            onSite="The L3 awareness: a RIDDOR report doesn&apos;t guarantee enforcement, but it does put the event on the inspector&apos;s desk. Cooperation in any follow-up — providing requested documents promptly, making operatives available for interview, demonstrating remedial action — shapes the outcome. Defensive or obstructive responses tend to escalate the inspector&apos;s view."
          >
            <p>The post-report enforcement pathway:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Acknowledgement</strong> — automatic email confirming receipt.
              </li>
              <li>
                <strong>Triage</strong> — HSE review against severity, sector, recurrence.
              </li>
              <li>
                <strong>Desktop review</strong> (most cases) — inspector emails for further
                information; firm replies; matter closed or escalated.
              </li>
              <li>
                <strong>Site visit</strong> (serious cases) — inspector attends; investigation
                may extend to PACE-cautioned interviews if breach suspected.
              </li>
              <li>
                <strong>Notice of Contravention + FFI</strong> — if material breach found.
              </li>
              <li>
                <strong>Improvement / prohibition notice</strong> — if structural change
                required.
              </li>
              <li>
                <strong>Prosecution</strong> — for serious or systemic breach.
              </li>
              <li>
                <strong>Crown Court referral</strong> — for severe outcomes, large turnover or
                Corporate Manslaughter consideration.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 — Reg 4(1)"
            clause={
              <>
                &quot;Where any person dies as a result of a work-related accident, the
                responsible person must follow the reporting procedure.&quot; And Reg 6(1):
                &quot;The reporting procedure is — (a) the responsible person must without
                delay notify the relevant enforcing authority of the death, accident, occurrence
                or case by the quickest practicable means; and (b) within 10 days of the death,
                accident, occurrence or case, the responsible person must send a report of it to
                the relevant enforcing authority in an approved manner.&quot;
              </>
            }
            meaning={
              <>
                The two-stage reporting procedure for the highest-priority categories:
                immediate phone notification (&quot;without delay ... by the quickest
                practicable means&quot;) followed by the F2508 within 10 days. For over-7-day
                injuries (Reg 4(2)) the timescale is 15 days from the incident. For diseases
                (Reg 8) the report follows diagnosis. The 10-day clock is from incident, not
                from diagnosis or from when the firm decided to report — late reports are a
                separate offence under Reg 6 itself.
              </>
            }
            cite="Source: Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 (SI 2013/1471), Regs 4 and 6."
          />

          <RegsCallout
            source="Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 — Reg 12(1)"
            clause={
              <>
                &quot;The responsible person must keep a record of any reportable injury,
                disease or dangerous occurrence which requires reporting under regulations 4,
                5, 6 or 7 ... The record must be kept for at least 3 years from the date on
                which it was made and must contain such particulars as may be approved from
                time to time by the Executive.&quot;
              </>
            }
            meaning={
              <>
                The retention duty. Records must be kept for at least 3 years and made
                available on request to inspectors. In practice firms keep them indefinitely
                because the BSA 2022 s.135 amendment to the Defective Premises Act extends
                liability for residential work to 30 years retrospectively, professional
                indemnity insurers expect long retention, and PQQs commonly ask for 5+ year
                histories. Digital storage with daily backup is the standard approach; paper
                accident books on their own are no longer adequate for any sizeable firm.
              </>
            }
            cite="Source: Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 (SI 2013/1471), Reg 12."
          />

          <SectionRule />
          <CommonMistake title="Operative tries to make the report personally" whatHappens={<>Apprentice on small site has incident; tries to phone HSE directly without telling the firm. Firm only finds out from HSE follow-up call days later. Internal communications / insurance notification routes broken. Firm prosecuted for late or inaccurate reporting because the apprentice&apos;s phone account didn&apos;t have the responsible-person details correct.</>} doInstead={<>Operative escalates to firm responsible person immediately. Responsible person makes the formal report. Operative provides facts and assists.</>} />

          <CommonMistake title="Late reporting because \'we wanted to wait and see how serious it was\'" whatHappens={<>Casualty injured Monday; firm decides to &quot;see how it develops&quot; before reporting. Injury confirmed serious by Wednesday. F2508 filed on day 12. Late report = separate Reg 6 offence. Stacks on top of underlying breach. Two charges instead of one.</>} doInstead={<>When in doubt, report. Update the report later if facts change. Late reporting is itself an offence regardless of the underlying breach severity.</>} />

          <Scenario title="L3 walking through an end-to-end RIDDOR" situation={<>You&apos;re running a small commercial install with one L2 mate. Mid-morning the L2 falls from a 3-step podium-style platform — the rubber feet had perished. They land awkwardly and immediately complain of severe ankle pain; can&apos;t put weight on it. You arrange transport to A&amp;E (van + you driving, customer on standby). At A&amp;E the X-ray confirms a fracture. The L2 will be off normal duties for at least 3 weeks.</>} whatToDo={<>Immediate sequence: (1) on site — render first aid, organise transport (don&apos;t let them drive themselves), photograph the platform with perished feet visible, photograph the work area, get the platform tagged out of service. (2) Notify firm responsible person by phone immediately — &quot;L2 has fallen from podium, possible fracture, transporting to A&amp;E now&quot;. (3) At A&amp;E — accompany if possible; obtain initial diagnosis from casualty/medical team. (4) Notify firm again with confirmed diagnosis — &quot;fracture confirmed, looks like 3+ weeks off&quot;. (5) Report writing — same day write contemporaneous account: time, sequence, condition of platform, weather, lighting, witnesses (yourself, customer, A&amp;E paperwork). Trigger identification: fracture (excl fingers/thumbs/toes) is a SPECIFIED INJURY under Schedule 1. Responsible person must phone HSE 0345 300 9923 today and submit F2508 within 10 days. (6) Witnesses — written statement from yourself; customer statement if they witnessed; sign-off by responsible person. (7) Equipment — pull all similar platforms from fleet for inspection; document the fleet check. (8) Insurance notification — separate to RIDDOR; firm&apos;s EL insurer notified within their required timescale. (9) Preserve the failed platform itself for possible HSE follow-up. (10) Retain all records 3+ years; in practice indefinitely.</>} whyItMatters={<>This is a textbook L3 supervisor walkthrough. The fracture triggers the highest-priority category (immediate phone notification + F2508 within 10 days). Your contemporaneous account, the photographs of the perished feet, and the equipment preservation create the evidence trail the firm&apos;s defence and the HSE&apos;s investigation both rely on. Pulling the rest of the fleet for inspection is the supervisor act that prevents the next incident — and demonstrates to the HSE that the firm is taking the lessons seriously, which often shapes the enforcement decision (notice vs prosecution).</>} />

          <SectionRule />
          <ContentEyebrow>The HSE&apos;s decision framework — Enforcement Management Model</ContentEyebrow>

          <ConceptBlock
            title="Why some RIDDOR reports become prosecutions and most don&apos;t"
            plainEnglish="HSE inspectors use the Enforcement Management Model (EMM) to make consistent enforcement decisions. The EMM considers actual or potential consequence, likelihood of harm, public expectation, and the firm&apos;s response. Outputs range from informal advice through letters and improvement notices to prohibition notices and prosecution. Two firms reporting similar incidents can end up with very different outcomes depending on their cooperation, remediation and past record."
            onSite="The L3 supervisor cooperation reflex after a RIDDOR report shapes the EMM scoring: prompt provision of documents, candid interview answers (under legal advice), visible remediation, no obstruction. The opposite — delay, defensiveness, late responses, contradictory accounts — moves the EMM towards harder enforcement. The cooperation isn&apos;t an admission of fault; it&apos;s evidence of competence and seriousness that the inspector reads positively."
          >
            <p>EMM factors that move the enforcement decision:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Actual consequence</strong> — what happened (death, specified injury,
                lost-time, near-miss).
              </li>
              <li>
                <strong>Potential consequence</strong> — what could have happened given the
                breach.
              </li>
              <li>
                <strong>Probability</strong> — how likely was harm given the situation.
              </li>
              <li>
                <strong>Risk gap</strong> — distance between actual control and benchmark
                standard.
              </li>
              <li>
                <strong>Public expectation</strong> — would the public expect enforcement on
                this matter (children, vulnerable persons, public-facing premises).
              </li>
              <li>
                <strong>Firm&apos;s history</strong> — repeated similar breaches, prior
                notices, prosecution history.
              </li>
              <li>
                <strong>Firm&apos;s response</strong> — cooperation, candour, remediation,
                visible commitment to change.
              </li>
              <li>
                <strong>Senior management failure</strong> — Corporate Manslaughter referral
                where applicable.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Cross-reference table — RIDDOR vs EL / PL insurance notification</ContentEyebrow>

          <ConceptBlock
            title="The two parallel notification regimes that the L3 supervisor must keep in step"
            plainEnglish="Two notification regimes run side-by-side after most incidents: RIDDOR (statutory, prescribed timescales) and insurance (contractual, policy-driven, often shorter timescales). They have different audiences, different content requirements and different consequences for late notification. The L3 supervisor reflex is to ensure both notifications are made on time and consistently. Inconsistent or contradictory accounts to the two channels are one of the easiest ways to create problems further down the line."
            onSite="Practical: when the responsible person submits RIDDOR they should simultaneously ensure the EL / PL insurer is notified. The insurer&apos;s notification usually requires less detail than RIDDOR but in some respects more — name and address of any potential claimant, expected severity, witness contact details for the insurer&apos;s own investigation. The firm&apos;s broker is usually the operational route. Late insurer notification can void cover for the incident."
          >
            <p>The two regimes compared:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Audience</strong> — RIDDOR goes to HSE; insurance notification goes
                to the EL / PL insurer (Employers&apos; Liability for staff incidents;
                Public Liability for third-party incidents).
              </li>
              <li>
                <strong>Trigger</strong> — RIDDOR triggers on the categories in Regs 4-8;
                insurance triggers on &quot;any circumstance likely to give rise to a
                claim&quot; — often a wider net than RIDDOR.
              </li>
              <li>
                <strong>Timescale</strong> — RIDDOR has prescribed statutory deadlines
                (immediate / 10 days / 15 days); insurance is typically 7-14 days per
                policy terms, sometimes shorter.
              </li>
              <li>
                <strong>Format</strong> — RIDDOR uses F2508 / F2508A via portal;
                insurance uses the insurer&apos;s own notification form (online or via
                broker).
              </li>
              <li>
                <strong>Content</strong> — RIDDOR captures incident facts; insurance also
                captures contact details, expected severity, witness information.
              </li>
              <li>
                <strong>Privilege</strong> — insurance correspondence after notification
                may be subject to litigation privilege; RIDDOR records are not.
              </li>
              <li>
                <strong>Consequence of failure</strong> — RIDDOR lateness is a Reg 6
                offence; insurance lateness can void cover for the specific incident.
              </li>
              <li>
                <strong>Audit trail</strong> — both regimes generate records that may be
                disclosed years later in subsequent civil claims or HSE prosecutions.
              </li>
              <li>
                <strong>Consistency</strong> — accounts to RIDDOR and to insurer must
                match; contradictions are detected and damage both processes.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Case study — R v Conoco Phillips (UK) Ltd [2016] and the cost of inaccurate reporting</ContentEyebrow>

          <ConceptBlock
            title="When the underlying RIDDOR record becomes evidence in a manslaughter prosecution"
            plainEnglish="ConocoPhillips was fined £3m at Cardiff Crown Court in 2016 after three uncontrolled gas releases at the Bacton terminal in Norfolk. The HSE prosecution under HASAWA s.2 and s.3 was substantially supported by the RIDDOR records the firm itself had submitted over the preceding years — records that, examined in aggregate, showed a pattern of release events that had not been responded to with adequate corrective action. The case demonstrates that the RIDDOR data the firm submits is not just a one-time statistical return; it becomes part of the firm&apos;s permanent record and can be assembled by prosecutors to demonstrate systemic failure. Accurate, timely, comprehensive reporting protects the firm in many ways; inaccurate, partial or delayed reporting can come back to haunt the firm years later."
            onSite="The L3 reading: every RIDDOR submission is a building block of the firm&apos;s long-term defensibility. Submit accurately, submit on time, submit comprehensively. A firm with a clean and consistent record can defend a one-off incident as an outlier; a firm with a pattern of selectively reported events finds the prosecution assembling that pattern as evidence of systemic neglect."
          >
            <p>What the ConocoPhillips case teaches about reporting discipline:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Aggregate records become evidence</strong> — one report is a data
                point; five similar reports are a pattern; ten are a system failure.
              </li>
              <li>
                <strong>Selective reporting is detectable</strong> — operatives talk;
                inspectors check site logs against submitted reports; gaps get found.
              </li>
              <li>
                <strong>Corrective action tracking matters</strong> — what did the firm do
                after each previous report? If the answer is &quot;nothing visible&quot; the
                report counts against the firm not in its favour.
              </li>
              <li>
                <strong>The HSE&apos;s sectoral intelligence picture</strong> draws on
                aggregated RIDDOR data; firms that under-report can find themselves on
                sector-targeted inspection campaigns.
              </li>
              <li>
                <strong>PI / EL insurers also draw on RIDDOR data</strong> — significant
                under-reporting may emerge in a claim history audit and lead to coverage
                issues.
              </li>
              <li>
                <strong>Director knowledge</strong> — if the same director signed off each
                report and the pattern was visible, s.37 personal liability becomes hard
                to escape.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Specified injuries — Schedule 1 unpacked</ContentEyebrow>

          <ConceptBlock
            title="What actually counts as a &apos;specified injury&apos; under Reg 4(1)"
            plainEnglish="Schedule 1 of RIDDOR 2013 lists the specific injuries that trigger the immediate phone notification + F2508 within 10 days route. Many L3 supervisors know &apos;something serious&apos; triggers immediate reporting but cannot recite the actual list. Knowing the categories helps you make a defensible category decision at the scene of an incident without waiting for the responsible person to research the regulation."
            onSite="When an injury is observed, run the casualty&apos;s presentation against the Schedule 1 list mentally. If the injury is on the list, the trigger category is specified injury — immediate phone to HSE. If the injury is serious but not on the list and the casualty is likely to be off work 7+ days, the trigger is over-7-day. If neither, it is internal-only unless the wider event itself meets the dangerous-occurrence (Schedule 2) criteria. The list is short enough to memorise."
          >
            <p>RIDDOR 2013 Schedule 1 — specified injuries to a worker:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>(a) Fracture</strong>, other than to fingers, thumbs or toes.
              </li>
              <li>
                <strong>(b) Amputation</strong> of an arm, hand, finger, thumb, leg, foot or
                toe.
              </li>
              <li>
                <strong>(c) Permanent loss of sight</strong> or reduction of sight in one or
                both eyes.
              </li>
              <li>
                <strong>(d) Crush injury</strong> to the head or torso causing damage to the
                brain or internal organs.
              </li>
              <li>
                <strong>(e) Serious burns</strong> (including scalding) which cover more
                than 10% of the body or cause significant damage to eyes, respiratory system
                or other vital organs.
              </li>
              <li>
                <strong>(f) Scalping</strong> (separation of skin from the head) requiring
                hospital treatment.
              </li>
              <li>
                <strong>(g) Loss of consciousness</strong> caused by head injury or
                asphyxia.
              </li>
              <li>
                <strong>(h) Injury arising from work in an enclosed space</strong> leading to
                hypothermia, heat-induced illness or requiring resuscitation, or requiring
                admittance to hospital for more than 24 hours.
              </li>
              <li>
                <strong>Self-employed similar list</strong> — Reg 4(2) applies the same
                categories to self-employed persons doing work under another&apos;s
                control.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Dangerous occurrences — Schedule 2 (relevant to electrical work)</ContentEyebrow>

          <ConceptBlock
            title="The near-miss events that ARE RIDDOR-reportable"
            plainEnglish="Most near-misses are internal-only. But Schedule 2 of RIDDOR 2013 lists specific &apos;dangerous occurrences&apos; that ARE reportable even where no-one was injured. Several of the listed categories are directly relevant to electrical work — particularly the electrical short-circuit / overload causing fire, the failure of pressure systems, the collapse of scaffolding, and the unintended movement of work-at-height equipment. Knowing the list helps you spot the reportable near-miss that would otherwise be logged only internally."
            onSite="The L3 supervisor reflex when a near-miss occurs: check whether the event meets a Schedule 2 trigger. If yes, it is reportable on F2508 within 10 days even though no injury resulted. The internal logging continues as normal but the external report is also required. Inspectors take a dim view of firms that consistently classify Schedule 2 events as internal-only."
          >
            <p>RIDDOR 2013 Schedule 2 events most relevant to electrical work:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Electrical short circuit or overload</strong> causing fire or
                explosion resulting in plant stoppage for more than 24 hours, or which had
                the potential to cause death.
              </li>
              <li>
                <strong>Collapse, overturning or failure of load-bearing parts</strong> of
                lifts and lifting equipment.
              </li>
              <li>
                <strong>Failure of any closed vessel</strong> in which the internal pressure
                was above or below atmospheric, where the failure had the potential to cause
                death.
              </li>
              <li>
                <strong>Plant or equipment coming into contact with overhead power
                lines</strong> exceeding 200 volts.
              </li>
              <li>
                <strong>Electrical incident causing explosion or fire</strong> where the
                incident resulted in stoppage of the plant involved for more than 24 hours.
              </li>
              <li>
                <strong>Unintended collapse of any building or structure</strong> under
                construction, alteration or demolition.
              </li>
              <li>
                <strong>Unintended release of more than 100 kg of flammable liquid</strong>,
                or 10 kg of flammable liquid at temperature above its boiling point.
              </li>
              <li>
                <strong>Failure of breathing apparatus</strong> while in use or during
                testing immediately before use.
              </li>
              <li>
                <strong>Unintended ignition or explosion of explosives</strong>.
              </li>
              <li>
                <strong>Dangerous occurrence at a mine, quarry, well, transport
                system, dock, pipeline or offshore installation</strong> — sector-specific
                categories.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Occupational diseases — Schedule 3 categories most likely to affect L3 electricians</ContentEyebrow>

          <ConceptBlock
            title="The diseases that warrant a F2508A — and the long-latency ones to watch for"
            plainEnglish="RIDDOR Reg 8 + Schedule 3 cover reportable occupational diseases. The reporting trigger is medical diagnosis received in writing from a registered medical practitioner that attributes the disease to a work activity listed in the schedule. For electrical trade workers the most common reportable diseases are hand-arm vibration syndrome, occupational dermatitis from contact with substances, occupational cancer from carcinogenic exposure (including welding fume reclassified 2019), and occupational asthma. Long-latency diseases mean a 2025 exposure may produce a 2045 diagnosis — and the report at that point still needs the original employer&apos;s records."
            onSite="The L3 supervisor reflex: when an operative shows symptoms that could be work-related, the firm&apos;s occupational health route should be triggered, not just the GP route. The OH practitioner can advise on whether the diagnosis falls within Schedule 3 and whether a RIDDOR report is required. The firm&apos;s records of the operative&apos;s historical exposure (which substances, for how long, with what controls) become the documentation supporting the eventual report — sometimes decades later."
          >
            <p>Schedule 3 diseases most relevant to electrical-trade workers:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Carpal tunnel syndrome</strong> — work involves regular use of
                percussive or vibrating tools.
              </li>
              <li>
                <strong>Cramp of the hand or forearm</strong> — prolonged periods of
                repetitive movement of fingers, hands or arms.
              </li>
              <li>
                <strong>Occupational dermatitis</strong> — exposure to a known skin
                sensitiser or irritant.
              </li>
              <li>
                <strong>Hand-arm vibration syndrome</strong> — regular use of percussive
                or vibrating tools (drilling, breaking, chasing).
              </li>
              <li>
                <strong>Occupational asthma</strong> — exposure to a known respiratory
                sensitiser (rosin in soldering fume, certain isocyanates in adhesives).
              </li>
              <li>
                <strong>Tendonitis or tenosynovitis</strong> of the hand or forearm —
                physically demanding work involving frequent, repetitive movements.
              </li>
              <li>
                <strong>Any occupational cancer</strong> attributable to a Schedule 3
                exposure — asbestos (mesothelioma, lung cancer, asbestosis), welding fume
                (since HSE 2019 reclassification), some solvent exposures, ionising
                radiation.
              </li>
              <li>
                <strong>Any disease attributable to exposure to a biological agent</strong>
                — relevant where work involves wastewater, healthcare or animal contact.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <FAQ items={faqs} />
          <SectionRule />
          <KeyTakeaways points={[
            "Remember from L2 — RIDDOR is the reporting regulation. At L3 the depth is the end-to-end process from trigger to retention.",
            "Five reportable categories: fatality, specified injury, over-7-day, dangerous occurrence, disease. Different timescales for each.",
            "Fatality / specified injury → IMMEDIATE phone (0345 300 9923) + F2508 within 10 days. Over-7-day → F2508A within 15 days.",
            "Reg 3 responsible person makes the report — usually employer, self-employed, or person in control of premises. Operative escalates with facts.",
            "Online portal at riddor.hse.gov.uk for all categories. Phone reserved for highest-priority.",
            "3-year statutory retention (Reg 12). Practice often longer for PI / Defective Premises Act considerations.",
            "Late reporting is a separate Reg 6 offence. When in doubt, report; update later if facts change.",
            "HSE follow-up may include desktop review, site visit, FFI invoicing, notice or prosecution. Cooperation + accurate evidence = best outcome.",
            "Schedule 1 specified injuries — memorise the categories (fracture, amputation, sight, crush, burn, scalping, head-injury LOC, enclosed-space).",
            "Schedule 2 dangerous occurrences — electrical short / overload with 24h+ stoppage IS reportable even without injury.",
            "Schedule 3 occupational diseases — long-latency reports (HAVS, dermatitis, occupational cancer, asthma) come from medical diagnosis.",
            "Apologies after incidents — Compensation Act 2006 s.2 separates sympathy from admission; speak with care.",
          ]} />
          <Quiz title="RIDDOR F2508 process — knowledge check" questions={quizQuestions} />
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section2-4')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">2.4 Reporting routes</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section3')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next section <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">Section 3 — Establishing safe environment</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
