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
  { id: 'l3-m1-s2-sub5-trigger', question: 'Which of these triggers an IMMEDIATE phone notification (not 10-day F2508)?', options: ['Bruised arm.', 'A work-related FATALITY or a SPECIFIED INJURY (Schedule 1) — fracture (excl fingers/thumbs/toes), amputation, sight loss, crush injury, serious burn, scalping, head-injury unconsciousness, enclosed-space injury. Phone HSE on 0345 300 9923; F2508 follows within 10 days.', 'A paper cut.', 'A late lunch.'], correctIndex: 1, explanation: 'Immediate phone for fatality and specified injury. F2508 within 10 days. Over-7-day injury = F2508A within 15 days.' },
  { id: 'l3-m1-s2-sub5-form', question: 'Who actually fills in the F2508?', options: ['Anyone.', 'The "responsible person" defined in RIDDOR Reg 3 — usually the employer (in their capacity as such), the self-employed person (for themselves), or the person in control of premises (in some cases). For an employee incident on a contractor\'s site, it\'s normally the contractor employer. The L3 operative escalates to the responsible person; doesn\'t make the report directly.', 'The HSE inspector.', 'The casualty.'], correctIndex: 1, explanation: 'Reg 3 responsible person. The L3 operative\'s job is to escalate with the facts; the responsible person makes the report.' },
  { id: 'l3-m1-s2-sub5-retain', question: 'How long must RIDDOR records be retained?', options: ['Until next week.', 'Three years from the date of the incident under RIDDOR Reg 12. Records held in any format that allows retrieval. The HSE may request retrospective access during investigations or sector reviews. Many firms retain longer for PI insurance / Defective Premises Act purposes.', 'Until the bin lorry comes.', 'Forever in paper.'], correctIndex: 1, explanation: 'Three-year statutory minimum. Practice is often longer given Defective Premises Act 30-year retrospective limit (BSA 2022 s.135) and PI insurance considerations.' },
];

const quizQuestions = [
  { id: 1, question: 'How is a RIDDOR report normally submitted?', options: ['By post.', 'Online via riddor.hse.gov.uk for all categories. Phone 0345 300 9923 for fatalities and specified injuries (immediate notification expected). Forms (F2508 for incidents/dangerous occurrences; F2508A for over-7-day injuries / occupational diseases) are submitted through the portal.', 'By telegraph.', 'By passenger pigeon.'], correctAnswer: 1, explanation: 'Online portal is the standard route. Phone reserved for the highest-priority categories.' },
  { id: 2, question: 'What\'s the F2508 vs F2508A distinction?', options: ['No difference.', 'F2508 — main RIDDOR form for accidents involving death, specified injuries, dangerous occurrences. 10-day deadline. F2508A — for over-7-day injuries and reportable diseases. 15-day deadline.', 'F2508 is for cars.', 'F2508A is for animals.'], correctAnswer: 1, explanation: 'Two forms; two timescales. Knowing which applies to which trigger is L3-essential.' },
  { id: 3, question: 'When does the 10-day clock start?', options: ['When you remember.', 'On the date of the incident, NOT the date of report or diagnosis. So if a casualty is hospitalised on Monday and the firm reports on the following Thursday, that\'s 3 days into the 10-day window. Late reports are a separate offence under Reg 6.', 'When the HSE asks.', 'When the casualty signs a form.'], correctAnswer: 1, explanation: 'Clock starts at incident. Late reports add a second offence to the underlying breach.' },
  { id: 4, question: 'What information does the F2508 require?', options: ['Just the date.', 'Full incident details — date, time, location, casualty(ies) details, what happened, what they were doing, what equipment/substance involved, the kind of accident, the injury, who else was involved, any witness information, action taken since. Full and accurate completion is the responsible person\'s job; gathering the facts is often the L3 operative\'s job.', 'Just the postcode.', 'Just the weather.'], correctAnswer: 1, explanation: 'Comprehensive incident data. The L3 operative\'s contemporaneous notes from the scene feed the F2508 directly.' },
  { id: 5, question: 'What happens after a RIDDOR report is submitted?', options: ['Nothing.', 'HSE acknowledges receipt and may follow up — desktop review, request for further information, site visit, inspection. Whether HSE attends depends on the severity of the incident and the wider context (e.g. recurrence, sector trends, public interest). For specified injuries and fatalities a follow-up visit is normally expected.', 'You get an HSE T-shirt.', 'Free training.'], correctAnswer: 1, explanation: 'RIDDOR feeds the HSE\'s intelligence picture. Reports drive enforcement decisions; the firm should expect follow-up for serious incidents.' },
  { id: 6, question: 'Can a RIDDOR report be amended after submission?', options: ['No.', 'Yes — if new information comes to light (e.g. injury upgraded from over-3-day to over-7-day, fatality follows initial specified-injury report) the report can be updated through the portal. Honest amendment is much better than leaving an inaccurate report on file.', 'Only by court order.', 'Only on Mondays.'], correctAnswer: 1, explanation: 'Updates are encouraged. The HSE wants accurate intelligence; corrected reports help.' },
  { id: 7, question: 'What\'s the operative\'s role in the F2508 process?', options: ['Make the report.', 'Gather and preserve facts at the scene; provide a contemporaneous written account; notify the responsible person immediately; assist with form completion if asked; provide witness information; preserve evidence; cooperate with any HSE follow-up. The operative isn\'t normally the report-maker but is the source of the facts.', 'Hide.', 'Tell the press.'], correctAnswer: 1, explanation: 'Operative = facts source; responsible person = report-maker. Clean separation.' },
  { id: 8, question: 'When should the HSE be notified BEFORE the F2508 is submitted?', options: ['Never.', 'For fatalities, specified injuries (Schedule 1) and certain serious dangerous occurrences — phone 0345 300 9923 as soon as practical, with the F2508 following within 10 days. The phone notification is the formal "without delay" requirement under Reg 6.', 'Always.', 'Only at weekends.'], correctAnswer: 1, explanation: 'Highest-priority categories get phone-then-form. Lower categories online portal direct.' },
];

const faqs = [
  { question: 'Who pays for HSE follow-up after a RIDDOR report?', answer: 'If the inspector identifies a "material breach" during follow-up, FFI applies (~£170/hr inspector time billed to the dutyholder). A clean follow-up where no breach is found is free.' },
  { question: 'Should the firm always over-report rather than risk under-reporting?', answer: 'When in doubt, report. The HSE doesn\'t penalise over-reporting. Late or missed reports ARE a separate offence (Reg 6). Defensive reporting is the safer default.' },
  { question: 'Does a RIDDOR report mean the firm has admitted fault?', answer: 'No. RIDDOR is a statistical / intelligence reporting regime, not a fault admission. The HSE uses it to decide where to focus inspection and prosecution. The firm can defend the underlying breach separately.' },
  { question: 'What if the casualty refuses to consent to RIDDOR reporting?', answer: 'Casualty consent isn\'t required — it\'s the responsible person\'s legal duty. Casualty\'s personal data is protected by data protection law but the report itself goes regardless of consent.' },
  { question: 'Are near-misses RIDDOR reportable?', answer: '"Near-miss" isn\'t a RIDDOR category. Some near-misses ARE reportable as "dangerous occurrences" (Schedule 2) — e.g. uncontrolled electrical short circuit causing 24+ hour plant stoppage. Most near-misses are internal-only; check Schedule 2 each time.' },
  { question: 'How does RIDDOR interact with the firm\'s insurance?', answer: 'PI / EL insurers usually require notification of any incident likely to give rise to a claim — separate from RIDDOR. Late insurer notification can void cover. Many firms have an internal incident-management process that handles RIDDOR + insurance + customer comms in parallel.' },
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
          ]} />
          <LearningOutcomes outcomes={[
            "Identify the RIDDOR trigger categories — death, specified injury, over-7-day, dangerous occurrence, disease.",
            "State the timescales for each — immediate phone / 10 days / 15 days.",
            "Distinguish F2508 (incidents / dangerous occurrences) from F2508A (over-7-day / diseases).",
            "Apply the operative-to-responsible-person escalation chain.",
            "State the 3-year retention requirement under Reg 12.",
            "Describe the typical post-report HSE follow-up and the FFI implications.",
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
            </ul>
          </ConceptBlock>

          <RegsCallout source="Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 — Reg 6" clause={<>"The responsible person must follow the reporting procedure when the responsible person becomes aware of the death of any person, the suffering of a specified injury at work, the suffering of an injury that results in a person being incapacitated for more than 7 consecutive days, the suffering of an occupational disease, or the occurrence of a dangerous occurrence."</>} meaning={<>Reg 6 puts the duty on the responsible person to follow the prescribed reporting procedure (phone for the highest categories, F2508/F2508A within timescales). The L3 operative&apos;s role is to alert the responsible person promptly and accurately; the responsible person discharges Reg 6.</>} cite="Source: Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 (SI 2013/1471), Reg 6 — verbatim from legislation.gov.uk." />

          <InlineCheck {...checks[0]} />

          <SectionRule />
          <ContentEyebrow>Responsible person and the report mechanics</ContentEyebrow>
          <ConceptBlock title="Reg 3 responsible person" plainEnglish="RIDDOR Reg 3 defines the \'responsible person' for each category. Usually the employer for employee incidents; the self-employed person for themselves; the person in control of premises in some cases. For an electrical contractor working on a customer\'s site, the contractor employer is usually the responsible person for incidents to their employees." onSite="Knowing your firm\'s RIDDOR responsible person is essential — usually the H&S manager, contracts manager or director. Escalate to them immediately when a reportable trigger occurs.">
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

          <ConceptBlock title="The online portal" plainEnglish="riddor.hse.gov.uk is the modern reporting route. F2508 and F2508A are completed online; PDF copy emailed to the firm; HSE record created. Phone 0345 300 9923 used only for fatality / specified-injury immediate notification." onSite="Most firms have a single account on the portal — usually the H&S manager. Operatives feed facts to that account-holder; the account-holder submits.">
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
          <ConceptBlock title="3-year statutory retention; longer practice" plainEnglish="RIDDOR Reg 12 requires records to be retained for 3 years. In practice many firms retain indefinitely, particularly residential incidents — the BSA 2022 / Defective Premises Act extension to 30-year retrospective limitation makes long retention prudent." onSite="Records are typically the F2508 PDF, the firm\'s internal incident form, photos, witness statements, RIDDOR acknowledgement email, any HSE correspondence. Stored on the firm\'s H&S system or document management; backed up.">
            <p>What HSE follow-up typically looks like:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Acknowledgement email — automatic.</li>
              <li>Desktop review — HSE may request further information by email.</li>
              <li>Site visit — for serious incidents, fatalities, or where the inspector judges a visit warranted.</li>
              <li>Material breach investigation — if found, FFI applies (~£170/hr).</li>
              <li>Improvement / prohibition notice — if breach justifies.</li>
              <li>Prosecution — for serious or systemic breaches.</li>
              <li>Sector intelligence — RIDDOR reports feed HSE statistics and inform sector campaigns.</li>
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
            cite="Source: Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 (SI 2013/1471), Regs 4 and 6 — verbatim from legislation.gov.uk."
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
            cite="Source: Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 (SI 2013/1471), Reg 12 — verbatim from legislation.gov.uk."
          />

          <SectionRule />
          <CommonMistake title="Operative tries to make the report personally" whatHappens={<>Apprentice on small site has incident; tries to phone HSE directly without telling the firm. Firm only finds out from HSE follow-up call days later. Internal communications / insurance notification routes broken. Firm prosecuted for late or inaccurate reporting because the apprentice&apos;s phone account didn&apos;t have the responsible-person details correct.</>} doInstead={<>Operative escalates to firm responsible person immediately. Responsible person makes the formal report. Operative provides facts and assists.</>} />

          <CommonMistake title="Late reporting because \'we wanted to wait and see how serious it was\'" whatHappens={<>Casualty injured Monday; firm decides to &quot;see how it develops&quot; before reporting. Injury confirmed serious by Wednesday. F2508 filed on day 12. Late report = separate Reg 6 offence. Stacks on top of underlying breach. Two charges instead of one.</>} doInstead={<>When in doubt, report. Update the report later if facts change. Late reporting is itself an offence regardless of the underlying breach severity.</>} />

          <Scenario title="L3 walking through an end-to-end RIDDOR" situation={<>You&apos;re running a small commercial install with one L2 mate. Mid-morning the L2 falls from a 3-step podium-style platform — the rubber feet had perished. They land awkwardly and immediately complain of severe ankle pain; can&apos;t put weight on it. You arrange transport to A&amp;E (van + you driving, customer on standby). At A&amp;E the X-ray confirms a fracture. The L2 will be off normal duties for at least 3 weeks.</>} whatToDo={<>Immediate sequence: (1) on site — render first aid, organise transport (don&apos;t let them drive themselves), photograph the platform with perished feet visible, photograph the work area, get the platform tagged out of service. (2) Notify firm responsible person by phone immediately — &quot;L2 has fallen from podium, possible fracture, transporting to A&amp;E now&quot;. (3) At A&amp;E — accompany if possible; obtain initial diagnosis from casualty/medical team. (4) Notify firm again with confirmed diagnosis — &quot;fracture confirmed, looks like 3+ weeks off&quot;. (5) Report writing — same day write contemporaneous account: time, sequence, condition of platform, weather, lighting, witnesses (yourself, customer, A&amp;E paperwork). Trigger identification: fracture (excl fingers/thumbs/toes) is a SPECIFIED INJURY under Schedule 1. Responsible person must phone HSE 0345 300 9923 today and submit F2508 within 10 days. (6) Witnesses — written statement from yourself; customer statement if they witnessed; sign-off by responsible person. (7) Equipment — pull all similar platforms from fleet for inspection; document the fleet check. (8) Insurance notification — separate to RIDDOR; firm&apos;s EL insurer notified within their required timescale. (9) Preserve the failed platform itself for possible HSE follow-up. (10) Retain all records 3+ years; in practice indefinitely.</>} whyItMatters={<>This is a textbook L3 supervisor walkthrough. The fracture triggers the highest-priority category (immediate phone notification + F2508 within 10 days). Your contemporaneous account, the photographs of the perished feet, and the equipment preservation create the evidence trail the firm&apos;s defence and the HSE&apos;s investigation both rely on. Pulling the rest of the fleet for inspection is the supervisor act that prevents the next incident — and demonstrates to the HSE that the firm is taking the lessons seriously, which often shapes the enforcement decision (notice vs prosecution).</>} />

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
