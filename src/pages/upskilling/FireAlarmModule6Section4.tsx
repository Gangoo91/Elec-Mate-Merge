import { ArrowLeft, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  LearningOutcomes,
  ContentEyebrow,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'fam6-s4-annexh',
    question:
      'BS 5839-1:2025 moved the logbook annex from Annex F (in 2017) to Annex H (in 2025). What changed about the logbook content recommendation?',
    options: [
      'Nothing.',
      'The logbook annex has been updated to reflect the information that is within clause 48 (the new logbook clause). Importantly, the recommendation now expects ALL variations to be recorded — not just "major" variations as the 2017 version had it. The 2017 wording said only major variations needed recording but did not define "major"; the 2025 wording removes the ambiguity by requiring every variation to be recorded. The logbook continues to record every event (test, fault, service, repair, modification, false alarm) with date, time, and signed identity of the person responsible.',
      'It became optional.',
      'It is the same wording.',
    ],
    correctIndex: 1,
    explanation:
      'Two changes worth knowing: Annex location moved (F → H) so older guidance documents may reference the wrong annex; the "major variations only" wording was removed and replaced with all variations recorded. Same logbook spirit, tighter scope.',
  },
  {
    id: 'fam6-s4-events',
    question: 'Which of the following events should be recorded in the logbook per BS 5839-1:2025?',
    options: [
      'Only fire alarms.',
      "Every relevant event: weekly user tests, monthly auxiliary supply tests, six-monthly service visits, fire alarms (real and false), faults observed and resolved, modifications and extensions, disablements (with start and end times), software / firmware updates, remote-access events, and now also any agreed variation from the standard. The logbook is the operational diary of the system and the audit trail for the responsible person's RRO 2005 duty.",
      'Only major events.',
      'Only signed-off service entries.',
    ],
    correctIndex: 1,
    explanation:
      "Logbook = comprehensive diary. Every event of any consequence belongs in the logbook. The standard's wording captures the spirit: the logbook is the document that lets a future investigator (engineer, AHJ, insurer, court) reconstruct what the system did and what was done to it.",
  },
  {
    id: 'fam6-s4-cyber',
    question:
      'New under BS 5839-1:2025 clause 43.4 (remote services and cyber security): what additional logbook content is now expected?',
    options: [
      'Nothing new.',
      'A record of remote-access events: who connected, when, what authentication was used, what actions were performed (read / control / write), and the post-action operational state. Together with the wider clause 43.4 controls (physical access, authentication, risk assessment, post-action verification), this turns remote service into a documented activity rather than an invisible one. The logbook is the audit point.',
      "Only the engineer's name.",
      'Only fire alarms.',
    ],
    correctIndex: 1,
    explanation:
      'Cyber-security log content. Remote access events need to be visible in the audit trail because they affect the system and a future investigator needs to be able to see who did what when. The logbook is the natural location.',
  },
  {
    id: 'fam6-s4-retention',
    question: 'How long should a fire-alarm logbook and supporting records typically be retained?',
    options: [
      'One year.',
      'Typically six years from the date of the most recent entry, though specific insurer and AHJ requirements may extend this. The Regulatory Reform (Fire Safety) Order 2005 expects the responsible person to maintain evidence of compliance; six years aligns with insurance claim time limits and with civil litigation periods for property damage. Some sectors (care, education) have longer retention requirements set by sector regulators. The logbook itself remains with the system; copies of acceptance certificates, modification certificates, and major incident records may be archived securely off-site.',
      'Indefinitely.',
      'Three months.',
    ],
    correctIndex: 1,
    explanation:
      'Six years is a sensible default that aligns with insurance and litigation periods. Some sectors require longer. The logbook stays with the system; supporting documentation may be archived. The responsible person owns the retention decision.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Where in BS 5839-1:2025 is the logbook annex (with template content), and where was it in the 2017 edition?',
    options: [
      'Annex H in 2025; same place in 2017.',
      'Annex H in 2025; was Annex F in 2017. The annex moved as part of the standard\'s renumbering / restructure. Older reference documents and quality-management procedures that point to "Annex F" may need updating to reference the new Annex H. The content has been updated to align with the new clause 48 (logbook) wording.',
      'Annex E in both editions.',
      'No annex — only clause text.',
    ],
    correctAnswer: 1,
    explanation:
      'Annex F (2017) → Annex H (2025). Practical implication: update internal documentation, training materials, and audit templates that reference the old annex.',
  },
  {
    id: 2,
    question:
      'BS 5839-1:2025 changed the variation-recording rule. The old (2017) wording said only "major variations" were to be recorded. The 2025 wording.',
    options: [
      'Says only minor variations.',
      'Recommends that ALL agreed variations be recorded in the logbook. The 2017 word "major" was undefined and led to inconsistent practice. The 2025 standard removes the ambiguity — every variation, regardless of perceived significance, is recorded. This aligns with the new clause 6 wording on variations (some now declared unacceptable, all to be justified — see Section 6.5).',
      'Removed all variation recording.',
      'Only software variations.',
    ],
    correctAnswer: 1,
    explanation:
      'All variations recorded. Removes the "major" ambiguity. Variations are not bad per se (they are how the standard accommodates real buildings); recording them comprehensively is how the audit trail stays honest.',
  },
  {
    id: 3,
    question: 'A weekly user test is performed. What is the minimum logbook content?',
    options: [
      'Just a tick mark.',
      "Date, time, identity of the person who performed the test, MCP location operated, observation of alarm condition (zone correctly identified, sounders / VADs operating, ARC transmission received and acknowledged), reset confirmation, any anomaly observed, any follow-up action initiated. The entry is signed (or initialled per a controlled register). Best practice includes a unique reference number for cross-referring to the panel's event log.",
      'Just the date.',
      "Just the engineer's name.",
    ],
    correctAnswer: 1,
    explanation:
      'Date + time + person + MCP + outcome + reset + anomalies + signature. Six-line logbook entries are the audit-friendly target. A "tick mark" is not a logbook entry.',
  },
  {
    id: 4,
    question: 'A six-monthly service visit produces what minimum logbook content?',
    options: [
      'Just a signed certificate.',
      "A summary entry referencing the full service report (which is the substantive document and is filed with the logbook). The logbook entry itself names the engineer, the date and times of arrival and departure, the conformity statement (compliant / compliant with logged defects / partially compliant), the next planned visit window, and the engineer's signature. The service report carries the detailed test outcomes, asset register update, defect list, and recommendations.",
      'Just a date.',
      "Just the engineer's phone number.",
    ],
    correctAnswer: 1,
    explanation:
      'Logbook entry summarises and references the service report. The service report is the data spine. Together they form the audit trail.',
  },
  {
    id: 5,
    question:
      'A real fire alarm activation has occurred on a Tuesday afternoon. The logbook should record.',
    options: [
      'Just "fire — yes".',
      "Date, time of activation, time of reset, originating device (zone / address / location), occupant evacuation outcome, FRS attendance status (if signal sent and FRS attended), root cause (real fire / heat / smoke / other), any damage to system or premises, identity of the person who reset the system, follow-up action (e.g. detector replaced post-incident, post-event service visit). A real activation is the system's most consequential event class — the logbook entry should be detailed enough that an insurer or AHJ can reconstruct what happened.",
      "Just the engineer's name.",
      'Just an X mark.',
    ],
    correctAnswer: 1,
    explanation:
      'Comprehensive entry. Real activations are the most important events the logbook captures — the entry must support post-event reconstruction. Time, originating device, evacuation, FRS, cause, damage, reset, follow-up.',
  },
  {
    id: 6,
    question: 'A false alarm has occurred. BS 5839-1:2025 expectations on false-alarm recording.',
    options: [
      'Ignore false alarms.',
      'Record every false alarm in detail and assign a category (per the BS 5839-1 false-alarm classification — unwanted alarms from cooking, dust, steam, environmental triggers; equipment fault; malicious; system fault). Investigate per the trigger-points: preliminary investigation when the rate exceeds four false alarms per 100 detectors per annum, in-depth investigation for systems with more than 40 automatic detectors when the rate exceeds five false alarms per 100 detectors per annum. The 2025 standard now also recommends the user is informed by the commissioning / handover organisation what the categories are and the differences between them, so they assign correctly.',
      'Disable the affected detector.',
      'Just say "false alarm".',
    ],
    correctAnswer: 1,
    explanation:
      'False-alarm investigation is governed by clause 31 (BS 5839-1:2025) and trigger-point thresholds. Logbook records the alarm, the assigned category, the investigation outcome, and any remedial action. The user being trained on the categories is also explicit in 2025.',
  },
  {
    id: 7,
    question: 'The logbook records a disablement. What is the minimum content?',
    options: [
      'Just "disabled".',
      'Date, start time, end time, area or device disabled, reason for disablement, name of person authorising, name of premises management representative informed (per clause 22), interim measure (if any) put in place, and confirmation that the disablement has been removed and the system fully restored. Disablement entries pair with restoration entries to bracket the period of reduced protection.',
      'Just the date.',
      "Just the engineer's reference.",
    ],
    correctAnswer: 1,
    explanation:
      'Disablement entries must bracket the affected period. Start time + end time + area + reason + authoriser + premises-informed + interim measure + restoration confirmation. The bracketed entry is what allows future investigators to verify protection coverage at any historical moment.',
  },
  {
    id: 8,
    question:
      'A firmware update has been applied to the CIE. What is the logbook content per BS 5839-1:2025?',
    options: [
      'Not in the logbook.',
      'A modification entry: date, time, person performing the update, firmware version before and after, configuration verification post-update, post-action operational confirmation, and reference to the extension or modification certificate issued under clause 7 (firmware updates are now formally classed as modifications). The logbook entry brackets the cyber-security log entries (per clause 43.4) recording the remote-access details if applicable.',
      'Just "updated".',
      'A separate document only.',
    ],
    correctAnswer: 1,
    explanation:
      'Firmware update = modification (clause 7) + cyber-security event (clause 43.4) + logbook entry. Three trails converge in the logbook: what was done, who did it, what authority, and reference to the modification certificate.',
  },
  {
    id: 9,
    question: 'How long should fire-alarm logbooks be retained?',
    options: [
      'One year.',
      'Typically six years from the date of the most recent entry, aligning with insurance claim time limits and civil litigation periods. Some sectors (care, education, hazardous industries) have longer retention requirements set by sector regulators or insurers. Acceptance certificates, modification certificates, and major incident records may be retained longer. The responsible person under RRO 2005 owns the retention decision; the contract with the servicing organisation should specify their archive responsibilities.',
      'Indefinitely required by law.',
      'Three months.',
    ],
    correctAnswer: 1,
    explanation:
      'Six-year default + sector overlays. Aligns with insurance and litigation periods. The responsible person decides; the contract documents responsibilities.',
  },
  {
    id: 10,
    question:
      'At a six-monthly service visit, the engineer reviews the logbook. What is the engineer specifically looking for?',
    options: [
      'A clean record only.',
      'Patterns and gaps. Recurring faults at the same device or zone (suggesting a systemic issue beyond simple device replacement). Repeated false alarms in the same area (suggesting environmental design issue). Disablements that were not properly closed (gaps in the audit trail). Missed weekly tests (rotation discipline failing). Modifications that were carried out without certificates (clause 7 breach). Cyber-security log entries that look unusual. Variations that were agreed but not formally recorded. The logbook is the diagnostic spine for the service visit; the engineer reads it before doing any other work.',
      'Just the last entry.',
      'Only the cover page.',
    ],
    correctAnswer: 1,
    explanation:
      'Logbook review is diagnostic. Patterns and gaps are what the engineer looks for. The trends spotted in the logbook drive the technical investigation during the visit.',
  },
];

const FireAlarmModule6Section4 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Record keeping and logbooks | Fire Alarm Module 6.4 | Elec-Mate',
    description:
      "BS 5839-1:2025 record keeping — clause 48 logbook requirements, Annex H content (was Annex F), all variations now recorded, cyber-security log content per clause 43.4, false-alarm classification, retention periods, and the asset register as the system's data spine.",
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 6
          </button>

          <PageHero
            eyebrow="Module 6 · Section 4"
            title="Record keeping and logbooks"
            description="The logbook is the operational diary of the fire-alarm system and the audit trail for the responsible person\'s RRO 2005 duty. BS 5839-1:2025 keeps the function but tightens the content: all variations are now recorded (the 2017 'major variations only' wording is gone), Annex H replaces Annex F as the template, and clause 43.4 introduces a remote-access / cyber-security log component. The asset register works alongside the logbook as the device-level data spine."
            tone="yellow"
          />

          <TLDR
            points={[
              'BS 5839-1:2025 logbook annex is now Annex H (was Annex F in 2017). Reference documents and quality-management procedures pointing to "Annex F" need updating.',
              'All agreed variations are now recorded — the 2017 "major variations only" wording is removed (the word "major" was undefined and led to inconsistent practice).',
              'Logbook records every relevant event: weekly tests, monthly auxiliary tests, six-monthly services, real and false alarms, faults, modifications, disablements, software / firmware updates, remote-access events.',
              'NEW under clause 43.4: remote-access events recorded — who connected, when, authentication, actions performed, post-action operational state.',
              'False-alarm recording: every false alarm assigned a category. Trigger points for investigation: > 4 per 100 detectors per annum (preliminary), > 5 per 100 detectors per annum on systems with 40+ detectors (in-depth).',
              'Asset register = device-level data spine. Every device row tracks install date, last test date, contamination level trend, last replacement, addressable address, location.',
              'Retention typically six years from most recent entry. Acceptance and modification certificates retained longer. Sector overlays may extend retention.',
              'Logbook review by the servicing engineer at every visit looks for patterns and gaps — the diagnostic spine for service planning.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify BS 5839-1:2025 Annex H as the logbook template (was Annex F in 2017) and update reference documents accordingly',
              'Apply the new "all variations recorded" rule (removing the 2017 "major variations" ambiguity)',
              'Record every relevant event with appropriate detail: tests, alarms, faults, services, modifications, disablements, remote access',
              'Apply BS 5839-1:2025 clause 43.4 cyber-security logging — remote-access events as audit-trail content',
              'Categorise false alarms per BS 5839-1 classification and apply the trigger-point thresholds for preliminary and in-depth investigation',
              'Maintain the asset register as the device-level data spine: install dates, test history, contamination levels, replacement schedule',
              'Apply retention periods (typically six years, with sector overlays) per RRO 2005 and insurer expectations',
              'Use logbook review as a diagnostic activity at the start of every six-monthly service visit',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Why the logbook is load-bearing</ContentEyebrow>

          <ConceptBlock
            title="The single document that ties everything together"
            plainEnglish="A fire-alarm system has many documents — design specifications, commissioning certificates, asset registers, service reports, fault records, modification certificates, training records. The logbook is the document that ties all of these together chronologically. It is the operational diary; it is the audit trail; it is the document a future investigator (engineer, AHJ, insurer, or court) reaches for first to reconstruct what the system did and what was done to it. BS 5839-1:2025 clause 48 sets out what the logbook should contain; Annex H provides a template."
            onSite="If you cannot evidence what happened on the system through the logbook, you cannot evidence the system was managed responsibly. The logbook is the document that demonstrates compliance to RRO 2005."
          >
            <p>What the logbook does for each stakeholder:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>For the responsible person.</strong> Evidences the maintenance regime to the
                AHJ and insurer. Demonstrates the RRO 2005 duty has been discharged. Provides the
                chronological record of every event.
              </li>
              <li>
                <strong>For the servicing engineer.</strong> Diagnostic input for every visit — what
                has happened since last visit, what patterns have emerged, what is open. Hands over
                context to the next engineer who arrives without prior site knowledge.
              </li>
              <li>
                <strong>For the AHJ.</strong> Single document on which to focus an inspection /
                audit. The presence of well-maintained logbook entries is a strong indicator of a
                well-run system; the absence is a red flag.
              </li>
              <li>
                <strong>For the insurer.</strong> Evidence of the standard of maintenance.
                Premium-affecting in many cases. Critical post-incident in establishing whether the
                system was being maintained when an event occurred.
              </li>
              <li>
                <strong>For the court (post-incident).</strong> The contemporaneous record of what
                the system did and what was done to it. Reconstruction tool. The logbook is read out
                in evidence in many post-incident inquiries.
              </li>
            </ul>
            <p>
              A logbook is not "compliance paperwork" — it is the system\'s memory. Treat every
              entry as if a future investigator will read it. Date, time, person, event, outcome,
              signature.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 48 (Logbook) and Annex H (Logbook template)"
            clause={
              <>
                The logbook clause has been updated to include the recommendation for recording all
                variations. The Annex for the logbook Annex H (previously Annex F in 2017) has been
                updated to reflect the information that is within clause 48.
              </>
            }
            meaning="Two changes from 2017. First — annex moved (F → H), so reference documents pointing to F need updating. Second — all variations are now recorded, removing the 2017 'major' ambiguity. The logbook continues to record every relevant event; the standard is more explicit on what 'every relevant' means in the 2025 wording."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>What goes in the logbook — every event class</ContentEyebrow>

          <ConceptBlock
            title="The full event class list"
            plainEnglish="The logbook records every event of consequence to the fire-alarm system. The event classes are stable — they have been the same in spirit through multiple editions of BS 5839-1 — but BS 5839-1:2025 makes some classes more explicit (variations, cyber-security events) and tightens others (no concealment of faults means fault entries must be honest)."
          >
            <p>The event classes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Weekly user tests.</strong> Date, time, person, MCP operated, alarm outcome,
                reset, anomaly, signature.
              </li>
              <li>
                <strong>Monthly auxiliary supply tests</strong> (where applicable). Date, time,
                supply tested, observed alarm panel behaviour during changeover, restoration,
                signature.
              </li>
              <li>
                <strong>Six-monthly inspection and service visits.</strong> Summary entry
                referencing the full service report. Engineer name, arrival / departure times,
                conformity statement, next visit window, signature.
              </li>
              <li>
                <strong>Real fire alarms.</strong> Detailed entry — date / time / originating
                device, evacuation outcome, FRS attendance, cause, damage, reset, follow-up.
              </li>
              <li>
                <strong>False alarms.</strong> Date / time / originating device, assigned category,
                investigation outcome, remedial action.
              </li>
              <li>
                <strong>Faults observed and resolved.</strong> Date / time of observation, fault
                description, investigation, root cause, repair, post-repair test, resolution date.
              </li>
              <li>
                <strong>Faults open / unresolved.</strong> Per clause 23 — faults that cannot be
                repaired immediately are logged with their open status, agreed interim measures, and
                target repair date. They remain open in the logbook until repaired.
              </li>
              <li>
                <strong>Modifications and extensions.</strong> Per clause 7 — every modification
                (including firmware updates) is logged with reference to the extension or
                modification certificate.
              </li>
              <li>
                <strong>Disablements.</strong> Per clause 22 — date, start / end time, area, reason,
                authoriser, premises-informed, interim measure, restoration.
              </li>
              <li>
                <strong>Software / firmware updates.</strong> Per clause 7 + 43.4 — date, person,
                versions, post-action verification, certificate reference.
              </li>
              <li>
                <strong>Remote-access events.</strong> Per clause 43.4 — connection, authentication
                outcome, actions performed, post-action operational state.
              </li>
              <li>
                <strong>Variations.</strong> Per clause 6 — every agreed variation recorded (NEW
                2025 — was "major" only). Justification, agreement parties, scope.
              </li>
              <li>
                <strong>Training and competence events.</strong> Initial handover training,
                refresher training, change of designated weekly-test operator.
              </li>
            </ul>
            <p>
              The list is comprehensive but not exhaustive — anything that affects the operation or
              compliance status of the system belongs in the logbook. The threshold for recording is
              "would a future investigator want to know about this?" — if yes, log it.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          {/* Diagram — logbook structure */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Logbook structure — BS 5839-1:2025 clause 48 / Annex H
            </h4>
            <svg
              viewBox="0 0 880 540"
              className="w-full h-auto"
              role="img"
              aria-label="Logbook structure diagram. Front section with system identification and responsible person. Body sections with event classes (weekly tests, services, alarms, faults, modifications, disablements, remote access, variations). Asset register and service report cross-references."
            >
              <rect
                x="20"
                y="20"
                width="840"
                height="40"
                rx="8"
                fill="rgba(251,191,36,0.08)"
                stroke="#FBBF24"
                strokeWidth="1.5"
              />
              <text
                x="440"
                y="46"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="13"
                fontWeight="bold"
              >
                Logbook — BS 5839-1:2025 Annex H (was Annex F in 2017)
              </text>

              {/* Front section */}
              <rect
                x="40"
                y="80"
                width="380"
                height="120"
                rx="10"
                fill="rgba(34,211,238,0.06)"
                stroke="#22D3EE"
                strokeWidth="1.5"
              />
              <text x="55" y="100" fill="#22D3EE" fontSize="11" fontWeight="bold">
                FRONT — system identification
              </text>
              <text x="55" y="118" fill="rgba(255,255,255,0.8)" fontSize="9.5">
                • Premises name + address
              </text>
              <text x="55" y="132" fill="rgba(255,255,255,0.8)" fontSize="9.5">
                • Responsible person (RRO 2005) + contact
              </text>
              <text x="55" y="146" fill="rgba(255,255,255,0.8)" fontSize="9.5">
                • System category (M / L / P, sub-grade)
              </text>
              <text x="55" y="160" fill="rgba(255,255,255,0.8)" fontSize="9.5">
                • Acceptance date (= datum for service intervals)
              </text>
              <text x="55" y="174" fill="rgba(255,255,255,0.8)" fontSize="9.5">
                • Designer / installer / commissioner / servicer
              </text>
              <text x="55" y="188" fill="rgba(255,255,255,0.8)" fontSize="9.5">
                • ARC details (if applicable)
              </text>

              {/* Asset register */}
              <rect
                x="460"
                y="80"
                width="380"
                height="120"
                rx="10"
                fill="rgba(168,85,247,0.06)"
                stroke="#A855F7"
                strokeWidth="1.5"
              />
              <text x="475" y="100" fill="#A855F7" fontSize="11" fontWeight="bold">
                ASSET REGISTER (device-level data spine)
              </text>
              <text x="475" y="118" fill="rgba(255,255,255,0.8)" fontSize="9.5">
                • Every device: type, location, address, install date
              </text>
              <text x="475" y="132" fill="rgba(255,255,255,0.8)" fontSize="9.5">
                • Last test date (per six-monthly visit)
              </text>
              <text x="475" y="146" fill="rgba(255,255,255,0.8)" fontSize="9.5">
                • Contamination trend (addressable detectors)
              </text>
              <text x="475" y="160" fill="rgba(255,255,255,0.8)" fontSize="9.5">
                • Replacement-due date (sensitivity / age)
              </text>
              <text x="475" y="174" fill="rgba(255,255,255,0.8)" fontSize="9.5">
                • Open defect status
              </text>
              <text x="475" y="188" fill="rgba(255,255,255,0.8)" fontSize="9.5">
                • Cross-references to logbook entries
              </text>

              {/* Body — event classes */}
              <rect
                x="40"
                y="218"
                width="800"
                height="240"
                rx="10"
                fill="rgba(251,191,36,0.04)"
                stroke="#FBBF24"
                strokeWidth="1.4"
              />
              <text x="55" y="240" fill="#FBBF24" fontSize="11" fontWeight="bold">
                BODY — chronological event log
              </text>

              {[
                ['Weekly user tests', 'date · time · person · MCP · outcome · reset · sig'],
                ['Monthly aux supply tests', 'date · supply · panel behaviour · restored'],
                ['Six-monthly services', 'engineer · times · conformity · ref to service report'],
                ['Real fire alarms', 'date · device · evacuation · FRS · cause · damage'],
                ['False alarms', 'date · device · category · investigation · remedy'],
                [
                  'Faults (resolved + open)',
                  'observation · cause · repair · retest · OR open status',
                ],
                ['Modifications + firmware', 'clause 7 · cert reference · pre/post versions'],
                ['Disablements (clause 22)', 'start/end · area · reason · authoriser · interim'],
                ['Remote access (clause 43.4 NEW)', 'who · when · auth · actions · post-state'],
                ['Variations (clause 6 — ALL 2025)', 'agreed parties · justification · scope'],
              ].map((row, i) => {
                const y = 252 + i * 19;
                return (
                  <g key={i}>
                    <rect
                      x="55"
                      y={y}
                      width="240"
                      height="16"
                      rx="4"
                      fill="rgba(251,191,36,0.1)"
                      stroke="rgba(251,191,36,0.3)"
                      strokeWidth="0.6"
                    />
                    <text x="65" y={y + 12} fill="#FBBF24" fontSize="9" fontWeight="bold">
                      {row[0]}
                    </text>
                    <text x="305" y={y + 12} fill="rgba(255,255,255,0.7)" fontSize="9">
                      {row[1]}
                    </text>
                  </g>
                );
              })}

              {/* Back section */}
              <rect
                x="40"
                y="478"
                width="800"
                height="42"
                rx="10"
                fill="rgba(239,68,68,0.06)"
                stroke="#EF4444"
                strokeWidth="1.4"
              />
              <text x="55" y="500" fill="#EF4444" fontSize="11" fontWeight="bold">
                RETENTION + ARCHIVE
              </text>
              <text x="240" y="500" fill="rgba(255,255,255,0.8)" fontSize="9.5">
                Typically 6 years from last entry · sector overlays may extend · acceptance /
                modification certificates retained longer
              </text>
              <text x="55" y="514" fill="rgba(255,255,255,0.6)" fontSize="9">
                Responsible person owns the retention decision per RRO 2005 + insurer requirements
              </text>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>Cyber-security log content — clause 43.4</ContentEyebrow>

          <ConceptBlock
            title="What the cyber-security log records"
            plainEnglish="BS 5839-1:2025 clause 43.4 (remote services and cyber security) introduces a logging expectation alongside its physical-access, authentication, risk-assessment, and post-action verification controls. The logbook therefore now has a remote-access section. Each remote-access event is recorded so that a future investigator can reconstruct who connected, what they did, and the operational state afterwards."
          >
            <p>The minimum recorded fields per remote-access event:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Date and time.</strong> Connection start, connection end. The event log of
                the CIE / gateway is the source.
              </li>
              <li>
                <strong>Identity of the connecting party.</strong> Engineer name, organisation,
                authentication method used (username + password, two-factor, certificate-based).
              </li>
              <li>
                <strong>Authentication outcome.</strong> Successful authentication or rejected
                attempt. Failed authentications are also logged — they are the early signal of a
                possible attack.
              </li>
              <li>
                <strong>Actions performed.</strong> Read (event log download, contamination level
                read, configuration read), control (alarm reset, disablement, test mode), write
                (configuration change, firmware update). Write actions specifically must have been
                preceded by a documented risk assessment.
              </li>
              <li>
                <strong>Post-action operational state.</strong> Confirmation that the CIE is fully
                operational at the end of the connection. Where any issues, what was done to
                restore.
              </li>
              <li>
                <strong>Cross-references.</strong> Modification certificate reference if a firmware
                update was applied (clause 7); risk-assessment reference if a write action was
                performed.
              </li>
            </ul>
            <p>
              The cyber-security log is reviewed at every six-monthly service visit. Anomalies
              (failed authentications, write actions without risk-assessment references, connections
              from unexpected IP addresses) are flagged and investigated. The servicing organisation
              maintains the log content; the responsible person owns the audit trail.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>False-alarm classification and trigger points</ContentEyebrow>

          <ConceptBlock
            title="Categories, investigation, recording"
            plainEnglish="False alarms are not a moral failure of the system — they are a normal operational data class that must be managed. BS 5839-1:2025 (clauses 29-33) sets out the responsibility for limiting false alarms, the categories, the investigation thresholds, and the design measures to reduce them. The logbook is where every false alarm is recorded with its category and investigation outcome. The 2025 standard adds an explicit requirement that the commissioning / handover organisation should explain the categories to the user, so the user assigns false alarms correctly to category."
          >
            <p>The categories (per clause 30):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Unwanted alarms (cooking, dust, steam, environmental triggers).</strong>
                The detector responded to a real signature — smoke, heat, particles — but from a
                non-fire source. Most common category.
              </li>
              <li>
                <strong>Equipment fault.</strong> A device failure caused the alarm — failed
                electronics, contamination, comms glitch.
              </li>
              <li>
                <strong>Malicious.</strong> A person operated an MCP without cause.
              </li>
              <li>
                <strong>System fault.</strong> A panel-level fault or wiring issue caused the alarm.
              </li>
            </ul>
            <p>The trigger-point thresholds (per clause 31, unchanged from 2017):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Preliminary investigation.</strong> When the rate of false alarms over the
                previous twelve months exceeds four false alarms per 100 detectors per annum. The
                servicing organisation reviews the pattern, identifies the dominant cause,
                recommends action.
              </li>
              <li>
                <strong>In-depth investigation.</strong> For systems with more than 40 automatic
                detectors, when the rate exceeds five false alarms per 100 detectors per annum. A
                formal investigation including environmental survey, detector-technology review,
                cause-and-effect review.
              </li>
            </ul>
            <p>
              The 2025 standard also recommends greater use of multi-sensor detectors in situations
              where point smoke detectors present a higher risk of false alarms — a design-level
              response complementing the recording / investigation discipline.
            </p>
          </ConceptBlock>

          <Scenario
            title="False-alarm trend triggering an investigation"
            situation="A care home has 60 detectors. Over the previous twelve months the logbook records four false alarms — three categorised as cooking-related (kitchen-adjacent corridor detectors) and one categorised as equipment fault (dust contamination). The rate is 4 / 60 × 100 = 6.7 per 100 detectors per annum, above both trigger points. The system has more than 40 automatic detectors so the in-depth investigation threshold (5 per 100) applies."
            whatToDo="Schedule the in-depth investigation per clause 31. The investigation includes (a) environmental survey of the kitchen-adjacent area, including airflow patterns from the cooking area and any recent kitchen equipment changes; (b) detector-technology review — recommend replacing the kitchen-adjacent point smoke detectors with multi-sensor heat / smoke detectors that are more tolerant of cooking aerosols; (c) cause-and-effect review of how the kitchen extract is interlocked with the alarm system; (d) review of dust-control practices including HVAC filter maintenance and cleaning schedules; (e) review of the user\'s false-alarm category assignments to ensure they are being applied consistently. Quote the recommended changes (multi-sensor detector replacement, kitchen extract review) in the report. Update the logbook with the investigation outcome and the agreed remedial actions. Re-evaluate the false-alarm rate at the next anniversary."
            whyItMatters="False-alarm rates above the trigger thresholds carry both safety and operational consequences. Safety: residents become desensitised to alarms and may not respond promptly to a real one. Operational: FRS call-challenging may lead to attendance refusal, undermining the protection. Insurer: persistent high false-alarm rates often result in policy reviews. The investigation is required by the standard and is also a sound risk-management response."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The asset register — device-level data spine</ContentEyebrow>

          <ConceptBlock
            title="Why the asset register matters"
            plainEnglish="The logbook records events; the asset register records devices. Together they form the system\'s memory. The asset register has a row for every detector, MCP, sounder, VAD, interface, and system component. Each row tracks the device through its lifetime — install date, every test outcome, contamination trend, replacement schedule, addressable address, location. The servicing engineer uses the asset register to plan the sample functional test, to track contamination trends across visits, to plan replacements, and to evidence 100% annual coverage."
          >
            <p>The asset register fields (minimum):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Device identifier</strong> — addressable address, or unique tag for
                conventional systems.
              </li>
              <li>
                <strong>Device type</strong> — manufacturer, model, technology (optical smoke,
                ionisation smoke, multi-sensor, heat, MCP, sounder, VAD, interface).
              </li>
              <li>
                <strong>Location</strong> — zone, room, height, mounting position, building
                reference.
              </li>
              <li>
                <strong>Install date</strong> — original installation, replacement install if later.
              </li>
              <li>
                <strong>Last test date</strong> — updated at every six-monthly visit when this
                device is tested.
              </li>
              <li>
                <strong>Last test outcome</strong> — pass / fail / cleaned / sensitivity drift.
              </li>
              <li>
                <strong>Contamination trend</strong> — readings over recent visits to support clean
                / replace decisions.
              </li>
              <li>
                <strong>Replacement-due date</strong> — calculated from manufacturer-specified end
                of life and any sensitivity-drift threshold.
              </li>
              <li>
                <strong>Open defect status</strong> — current open faults or watch-list items.
              </li>
              <li>
                <strong>Logbook cross-reference</strong> — links to the chronological logbook
                entries where this device appears.
              </li>
            </ul>
            <p>
              The asset register lives with the logbook (often as an appendix or separately
              maintained spreadsheet / database with logbook cross-references). At every six-
              monthly visit, the engineer updates the rows for devices tested during the visit, and
              reviews the rows for devices not tested to plan the next visit\'s sample. The register
              is the spine that delivers the annual full-coverage requirement (Section 6.1).
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Logbook entries that are too brief to be useful"
            whatHappens="A weekly user test logbook entry reads simply 'Test - OK - JS'. Six months later the servicing engineer reviewing the logbook cannot tell which MCP was operated, what time, what was observed, whether the rotation discipline is being followed. The entry passes a casual glance but adds zero diagnostic value. A real fire occurs eight months later; the post-incident reconstruction cannot establish whether the system was being properly tested in the months before the event because the logbook entries are uninformative."
            doInstead="Every entry has six minimum fields: date, time, person, action / event, observation / outcome, signature. A weekly test entry: '2026-04-21, 09:15, J Smith (designated tester), MCP 12 (third floor north), zone 3 alarm, sounders / VADs operating, ARC OK, reset clear, JS [signature]'. The entry has diagnostic and audit value. The marginal effort is small; the long-term value is significant."
          />

          <CommonMistake
            title="Variations not recorded because they 'are not major'"
            whatHappens="A 2024 system commissioning agreed several departures from BS 5839-1: detector spacing slightly above the recommended density in a stairwell, a delay on automatic FRS signal transmission to allow for staff investigation. The 2017 wording said 'major variations' should be recorded; the engineer judged neither variation 'major' and recorded only a brief note. In 2026 the responsible person\'s insurer audits the documentation and finds the variations were not formally recorded. The audit also flags the system as non-compliant with BS 5839-1:2025 (which requires all variations recorded). The insurer requests retrospective documentation."
            doInstead="Per BS 5839-1:2025, ALL variations are recorded — the 2017 'major' qualifier is removed. Every departure from the standard\'s recommendations is recorded in the logbook with the agreed parties, the justification, and the scope. The 2025 standard also notes that some variations are now declared unacceptable (Section 6.5) — those cannot be agreed at all. The recording discipline is part of the 2025 update; existing systems with poorly-documented variations should have those documented retrospectively at the next service visit."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'BS 5839-1:2025 logbook annex = Annex H (was Annex F in 2017). Update reference documents.',
              'ALL variations recorded (NEW 2025) — the "major variations only" 2017 wording is removed.',
              'Every event class belongs in the logbook: tests, alarms, faults, services, modifications, disablements, remote access, variations, training.',
              'NEW under clause 43.4 — remote-access events recorded: who, when, auth, actions, post-state.',
              'False alarms: every false alarm assigned a category. Trigger points: > 4 per 100/annum (preliminary), > 5 per 100/annum on systems with 40+ detectors (in-depth).',
              'Asset register = device-level data spine. Every device row tracks install date, test history, contamination trend, replacement-due date, open defects.',
              'Retention typically six years from last entry. Sector overlays may extend. Acceptance and modification certificates retained longer.',
              'Logbook review at every service visit is diagnostic — patterns and gaps are what the engineer looks for.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'My existing logbook is on a paper-based format that references the 2017 Annex F. Do I need to replace it?',
                answer:
                  'Not the logbook itself — the existing entries continue. But the template / form should be updated to reflect Annex H content where it differs (notably the all-variations-recorded change and the cyber-security event class). At the next six-monthly service visit, the engineer should update the logbook front-matter to reference BS 5839-1:2025 / Annex H and ensure the event-class headers cover the 2025 additions. Historical entries are not retrospectively rewritten.',
              },
              {
                question:
                  'How does the logbook interact with electronic / cloud-based service-management systems?',
                answer:
                  'Many servicing organisations now offer electronic logbooks via cloud platforms — entries are made via app, the responsible person signs digitally. BS 5839-1:2025 does not mandate paper. Electronic logbooks should provide equivalent or better audit trail, including immutability of past entries (no silent edits), traceable digital signatures, and reliable retention / backup. The principle (every event recorded, full audit trail, accessible to the responsible person and to AHJ / insurer on request) is the same regardless of medium.',
              },
              {
                question:
                  'Who owns the logbook — the responsible person or the servicing organisation?',
                answer:
                  "The responsible person owns the logbook. The servicing organisation maintains it during visits and provides the technical entries; the user contributes the weekly-test entries; the responsible person's contractor relationship determines who physically holds the document but not who owns the duty. If the servicing contract changes, the logbook stays with the system / responsible person — it is not the property of the outgoing servicer.",
              },
              {
                question: 'A logbook entry has been made in error. How is it corrected?',
                answer:
                  'Never erase or scribble out. Strike a single line through the erroneous entry so it remains readable, write the correction next to or below it, sign and date the correction. The correction trail must show what was originally entered and what the correction is. On electronic logbooks, the system should support a similar audit-friendly correction mechanism (entry marked as corrected, original retained, correction visible, signed and dated). Quiet edits that hide the original entry are not compliant — the audit trail must show what happened, including mistakes.',
              },
              {
                question:
                  'How are false-alarm category assignments made by the user, and what does BS 5839-1:2025 add?',
                answer:
                  'The user (premises management or designated person) assigns the category at the time of the event based on observed evidence — what the device responded to, where the smoke / heat came from, whether it was a real alarm, an MCP misuse, or an equipment-level fault. BS 5839-1:2025 explicitly requires the commissioning / handover organisation to explain the categories to the user so they can assign correctly — a 2025 addition closing a known gap (categories were defined but users were not always taught how to apply them).',
              },
              {
                question:
                  "What if a remote-access event was carried out by a manufacturer's field engineer rather than the contracted servicing organisation?",
                answer:
                  "The clause 43.4 logging expectation applies regardless of who connected. The CIE / gateway records the event automatically (assuming the manufacturer's remote-access platform integrates with logging). The contracted servicing organisation reviews these entries at the next visit to confirm they were authorised, that any write actions had risk assessments, and that any firmware updates have certificates per clause 7. The logbook entry should cross-reference the manufacturer event log if the manufacturer maintains a separate platform.",
              },
              {
                question:
                  'Are weekly user-test entries reviewed at every six-monthly service visit?',
                answer:
                  'Yes. The servicing engineer reviews every weekly-test entry since the previous service. The review checks (a) frequency (was a test done every week? gaps explained?); (b) rotation discipline (different MCPs being operated each week?); (c) outcomes (any anomalies recorded? followed up?); (d) signatures (the entries are signed off by the designated user?). Patterns are identified — same MCP being tested every week (rotation discipline failing), or no entries for several weeks (test discipline failing) — and the engineer briefs the responsible person on the corrective action.',
              },
              {
                question:
                  'A system has been in service for 18 years with logbooks running back to commissioning. Should we still hold all of them?',
                answer:
                  "The default six-year retention applies to the most recent entries; older logbooks may be retained or archived per the responsible person's retention policy and per insurer / sector requirements. Acceptance certificates and major modification certificates should typically be retained for the life of the system. A system that has been in service 18 years with continuous logbook history is a strong asset to the responsible person — keep the current logbook on site, archive older volumes securely, and ensure the asset register is maintained continuously across the entire history.",
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Record keeping and logbooks — Module 6.4" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/fire-alarm-course/module-6')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 6
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/fire-alarm-course/module-6/section-5')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.5 Verification and certification
              </div>
            </button>
          </div>

          <div className="hidden">
            <BookOpen />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default FireAlarmModule6Section4;
