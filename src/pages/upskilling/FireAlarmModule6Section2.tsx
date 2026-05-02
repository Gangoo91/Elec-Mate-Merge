import { ArrowLeft, ChevronLeft, ChevronRight, Wrench } from 'lucide-react';
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
    id: 'fam6-s2-competent',
    question:
      'BS 5839-1:2025 clause 3.13 defines a "competent person" for fire-alarm servicing. Which combination is required?',
    options: [
      'Anyone with a Part P card.',
      'A person who is suitably trained AND qualified by knowledge AND has practical experience AND has been provided with the necessary instructions to enable the required tasks to be carried out correctly. The standard adds (in a Note) that maintenance of competence is likely to require continuing professional development (CPD). The four-pillar definition (training, knowledge, experience, instructions) plus the CPD expectation is the load-bearing test for who is allowed to perform the six-monthly inspection and service.',
      'Just an electrician.',
      'Anyone the responsible person trusts.',
    ],
    correctIndex: 1,
    explanation:
      'Four pillars + CPD. Training, knowledge, experience, instructions — the standard expects all four. CPD keeps the competence current as products and standards evolve. Third-party schemes (BAFE SP203, FIA, NSI, SSAIB) are the practical assurance routes that the four pillars are evidenced; a self-declaration of competence without scheme accreditation is increasingly difficult to defend in front of an AHJ or insurer.',
  },
  {
    id: 'fam6-s2-tolerance',
    question:
      'A 2017-edition contract was due to be re-tendered in 2025. The incumbent servicing organisation has been consistently visiting at the seven-month mark — exactly five weeks late on the strict 2017 reading. The new BS 5839-1:2025 wording.',
    options: [
      'Makes no difference.',
      'Brings the seven-month visits inside the 2025 standard text — the five-to-seven-month tolerance window is now in clause 43.2.1 Note 1, recognising long-standing custom and practice. The visits are now compliant with the 2025 wording. The system itself does not change; the wording does. New service contracts should target six months and use the tolerance only when needed; the tolerance is not a permission to systematically slip.',
      'Means the new edition is no longer mandatory.',
      'Means tolerance is removed.',
    ],
    correctIndex: 1,
    explanation:
      'BS 5839-1:2025 clause 43.2.1 Note 1 brings the long-standing custom into the standard. Visits at the seven-month mark are inside the new tolerance window. The 2017 wording was strict ("should not exceed six months"); systematic seven-month visits were technically non-compliant pre-2025, are compliant post-2025. Best practice remains aiming for six months and using the tolerance only operationally.',
  },
  {
    id: 'fam6-s2-disablement',
    question:
      'During servicing, an engineer disables a zone to prevent false alarms while testing. BS 5839-1:2025 clause 22 expectations.',
    options: [
      'No requirement.',
      'Disablement should be kept to a practicable minimum. The premises management or their appointed representative should be informed of the areas affected. The same applies to disablement of sounders or visual alarms. The disablement should be logged with start time and end time. Pending the work being completed, premises management should put proportionate interim measures (e.g. a fire watch or roving alarm) in place where the disablement removes detection from a significant area or for an extended period.',
      'Disable the whole panel for convenience.',
      'No need to inform anyone.',
    ],
    correctIndex: 1,
    explanation:
      'Three load-bearing rules from clause 22: minimum scope, premises informed, logged. Disablement is a temporary erosion of life safety — the standard requires it to be visible, time-bounded, and supported by interim measures where the affected area is significant.',
  },
  {
    id: 'fam6-s2-cyber',
    question:
      'BS 5839-1:2025 introduces clause 43.4 on remote services and cyber security. The minimum recommendations include.',
    options: [
      'No specific recommendations.',
      'Physical-access controls (locking the comms cabinet, anti-tamper plugs on patch leads), authentication of any remote-access request before it is accepted by the CIE / gateway, a documented risk assessment before performing any remote read / control / write function, and confirmation that the system is fully operational at the end of any remote service. Remote access events are logged. The 2025 clause acknowledges the rise of IP-connected CIEs and the corresponding cyber-attack surface.',
      'Just a strong password.',
      'No remote access ever.',
    ],
    correctIndex: 1,
    explanation:
      'Clause 43.4 builds the cyber-security expectation into the servicing regime. Physical access control + authentication + risk assessment + post-service operational confirmation. Logging is implied (and supported by the clause 48 logbook requirements — Section 6.4). The clause does not ban remote services; it requires them to be done safely.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Who can perform the six-monthly inspection and service per BS 5839-1:2025 clause 43.2.1?',
    options: [
      'Anyone authorised by the building owner.',
      'A competent person as defined in clause 3.13: trained, qualified by knowledge, with practical experience, given the necessary instructions, and (per the Note) maintaining their competence through CPD. In practice this is best evidenced by employment by a third-party-certificated organisation (BAFE SP203, FIA, NSI, SSAIB) operating a documented quality system.',
      'A general electrician with no fire-alarm training.',
      'An apprentice without supervision.',
    ],
    correctAnswer: 1,
    explanation:
      'Clause 3.13 four-pillar definition + CPD. Third-party-scheme accreditation is the recognised assurance route for evidencing all four pillars and for demonstrating ongoing competence to AHJs and insurers.',
  },
  {
    id: 2,
    question:
      'BS 5839-1:2025 clause 43.2.1 changed the strict 2017 six-month rule. Which is the correct 2025 statement?',
    options: [
      'Visits are six months exactly.',
      'Successive inspection and servicing visits should be undertaken at intervals of approximately six months. Note 1 makes it acceptable for a visit to be carried out any time between five and seven months after the previous visit. Note 2 makes the date of acceptance the datum for these periods. The change formalises long-standing custom and practice.',
      'Visits are once a year.',
      'Visits are at the discretion of the responsible person.',
    ],
    correctAnswer: 1,
    explanation:
      "Approximate six months + 5-7-month tolerance + acceptance date as datum. The clause text is the 2025 revision's explicit recognition of operational reality.",
  },
  {
    id: 3,
    question:
      'During servicing, which of the following actions specifically requires informing premises management per clause 22 of BS 5839-1:2025?',
    options: [
      'Reading the panel event log.',
      'Disablement of any part of the system that removes detection or alarm from a significant area, or for an extended period — including disablement of sounders or visual alarms during testing. The disablement should be the practicable minimum, premises management should be informed of the areas affected, and the times of disablement should be logged. Where the affected area is significant or the period extended, premises management should put proportionate interim measures (fire watch / roving alarm) in place.',
      'Operating an MCP for testing.',
      'Reviewing the logbook.',
    ],
    correctAnswer: 1,
    explanation:
      'Clause 22 — disablement is a deliberate, time-bounded erosion of life safety and must be communicated and managed. Reading logs / panel state are not disablement events.',
  },
  {
    id: 4,
    question:
      'What is the customary in-service life of a sealed lead-acid standby battery, and how is it labelled in 2025?',
    options: [
      'Two years, no labelling required.',
      'Typically four years, with the date of installation marked on the battery. BS 5839-1:2025 has formally recognised the long-standing custom of labelling batteries with a permanent marker — the date of installation is now expected to be visible on the battery itself, supporting the end-of-design-life replacement decision.',
      'Ten years, no labelling.',
      'Six months, no labelling.',
    ],
    correctAnswer: 1,
    explanation:
      'Four-year customary life + permanent-marker date label now formally acknowledged in BS 5839-1:2025. The label is the single most useful piece of information for the engineer planning replacement.',
  },
  {
    id: 5,
    question:
      'A service visit detects a sensitivity drift on five out of forty smoke detectors. Correct action.',
    options: [
      'Replace all forty.',
      "Service the five drifted detectors per the manufacturer's procedure (chamber re-test, recalibration if available, cleaning, replacement if necessary), record the action against each device in the asset register, note the drift pattern in the service report (location, age, environment) for trend analysis, and recommend a closer monitoring of the remaining 35 at the next visit. Replacement of the whole population is not justified by a sample failure of one-eighth — but the trend is a watch-list item.",
      'Ignore the drift.',
      'Disable the five and continue.',
    ],
    correctAnswer: 1,
    explanation:
      'Targeted action + recording + trend analysis. Sensitivity drift on a fraction of devices is a normal servicing finding; mass replacement is excessive, no action is unsafe. The trend is the load-bearing data — feed it into the asset register and the next service plan.',
  },
  {
    id: 6,
    question:
      'A service visit involves a remote firmware upload to a CIE while the engineer is in the comms cabinet. Per BS 5839-1:2025 clause 43.4, what must precede this action?',
    options: [
      'Just the upload.',
      'A documented risk assessment evaluating the potential impact on the operation of the CIE, authentication of the request to the CIE / gateway, physical-access confirmation (the comms cabinet is locked, only the engineer has access during the work), and an end-of-work confirmation that the CIE is fully operational. The firmware upload is also classed as a modification under clause 7 (NEW 2025) and requires an extension or modification certificate to be issued.',
      'A casual decision.',
      'No requirement at all.',
    ],
    correctAnswer: 1,
    explanation:
      'Clause 43.4 cyber-security path + clause 7 modification certificate path. Both are 2025 additions. The firmware update must be planned, authenticated, risk-assessed, and certificated. Casual remote firmware uploads — common pre-2025 — are no longer compliant.',
  },
  {
    id: 7,
    question:
      'A six-monthly service visit at a 200-detector system has the engineer planning the functional-test sample. What is the correct sample size and selection logic?',
    options: [
      'Test 10% of detectors only.',
      "Plan a sample (typically 50% of devices) such that, combined with the next six-monthly visit's 50%, all 200 detectors are functionally tested over the rolling twelve-month period. Selection should be planned in the asset register so that adjacent visits do not test the same devices. Add full coverage of MCPs, sounders / VADs, and interfaces per the 12-month requirements (some categories every visit, some split). The asset register tracks dates so the gap is visible.",
      'Just one detector per zone.',
      'Test the same devices at every visit.',
    ],
    correctAnswer: 1,
    explanation:
      'Roughly half + planned non-overlap + asset-register tracking. Sample sizes vary in practice — sometimes 50/50, sometimes split by area or device type — but the principle is full coverage every twelve months with no device tested twice while another is not tested at all.',
  },
  {
    id: 8,
    question:
      'During the visual inspection at the panel, the engineer notices the date / time on the CIE has drifted by 23 minutes against actual time. Correct action.',
    options: [
      'Ignore as cosmetic.',
      "Adjust the CIE clock to correct time, log the adjustment in the service report. The clock is load-bearing for systems that have day / night sensitivity settings (where the CIE switches detection profile based on time of day) and for the panel's event log timestamps (which underpin fault investigation). BS 5839-1:2025 explicitly mentions this as a service-visit action — checking and adjusting the time clock at every visit is part of the standard servicing routine.",
      'Replace the CIE.',
      'Disable the system until investigated.',
    ],
    correctAnswer: 1,
    explanation:
      'Adjust + log. Time drift on the CIE is more than cosmetic — it can break day / night sensitivity logic and corrupt the event log timestamps used to investigate false alarms / faults. The 2025 standard explicitly lists clock check at every visit.',
  },
  {
    id: 9,
    question:
      "A service report has identified two open defects. Pending the responsible person's decision on remedial works, the engineer is finishing the visit. What is the conformity statement on the report?",
    options: [
      'System is compliant.',
      'System is left in a state of partial compliance / compliance with logged defects. The exact wording depends on the severity of the defects and whether a workaround is in place. The engineer states explicitly: which clauses or recommendations are not currently met, what interim measure (if any) is in place, what remedial work is recommended and quoted, and the timeframe for that work. The responsible person reads the report and accepts (or contests) the conformity statement before signing.',
      'No conformity statement is needed.',
      'Always state compliant regardless.',
    ],
    correctAnswer: 1,
    explanation:
      'Honest conformity statement + clear list of non-met clauses + interim measures + recommendations. The conformity statement is the audit trail to the AHJ / insurer. A "compliant" stamp on a report with open defects is a documentation failure.',
  },
  {
    id: 10,
    question:
      'A new BS 5839-1:2025 clause is 43.4 (remote services and cyber security). Which is NOT one of the recommended controls?',
    options: [
      'Physical access control to the comms cabinet.',
      'Authentication of any remote-access request before the CIE / gateway accepts it.',
      'Risk assessment before any remote read / control / write action.',
      "Allowing any third-party connection without authentication, on the basis of the engineer's reputation.",
    ],
    correctAnswer: 3,
    explanation:
      'Reputation is not authentication. Clause 43.4 expects technical and procedural controls — physical access, request authentication, risk assessment, post-action operational verification. Trust in the engineer is necessary but not sufficient; the standard expects the controls to be in the system itself.',
  },
];

const FireAlarmModule6Section2 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Servicing and maintenance | Fire Alarm Module 6.2 | Elec-Mate',
    description:
      'BS 5839-1:2025 servicing and maintenance — the competent-person definition, the new five-to-seven-month tolerance, six-monthly deliverables (visual, function-test sample, battery, ARC, defects, briefing), disablement under clause 22, and the new clause 43.4 cyber-security expectations for remote services.',
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
            eyebrow="Module 6 · Section 2"
            title="Servicing and maintenance"
            description="BS 5839-1:2025 reframes servicing through three load-bearing definitions: who counts as a competent person (clause 3.13), how often they must visit (clause 43.2.1, with a new five-to-seven-month tolerance), and what they must deliver (visual inspection, function-test sample, battery service, ARC verification, defect reporting, conformity statement). Clause 22 governs disablement, clause 43.4 introduces formal cyber-security expectations for remote services."
            tone="yellow"
          />

          <TLDR
            points={[
              'Competent person (clause 3.13) = trained + qualified by knowledge + experienced + given necessary instructions, with CPD to maintain competence. Third-party schemes (BAFE SP203, FIA, NSI, SSAIB) are the practical assurance route.',
              'Six-monthly visit interval per clause 43.2.1 with a NEW five-to-seven-month tolerance window (Note 1). Acceptance date is the datum (Note 2). Long-standing custom now in the standard.',
              'Visit deliverables: written report, asset-register update with test data, battery service evidence, fault list, recommendations, conformity statement, signed logbook entry.',
              'Battery service every six months: visual + float voltage + load-test evidence. Date label now formally recognised. Replace at design life — typically four years.',
              'Detector cleaning and sensitivity verification per manufacturer procedure. Some addressable detectors require chamber test; some require physical clean; some require replacement at sensitivity-drift threshold.',
              'Disablement (clause 22): minimum scope, premises management informed, logged with start / end times. Interim measures proportionate to the affected area.',
              'NEW clause 43.4 — remote services and cyber security: physical access controls, authentication of remote-access requests, risk assessment before remote read / control / write, post-action operational confirmation. Firmware updates classed as modifications (cert required, see Section 6.5).',
              'Time / date clock checked and adjusted at every service visit — load-bearing for day / night sensitivity settings and event-log timestamps.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Quote the BS 5839-1:2025 clause 3.13 definition of a competent person and identify how third-party schemes (BAFE SP203, FIA, NSI, SSAIB) provide the assurance route',
              'Apply the new BS 5839-1:2025 clause 43.2.1 five-to-seven-month tolerance window, with the acceptance date as the datum',
              'Plan and deliver the six-monthly inspection and service: visual inspection, panel event log review, sample functional test, battery service, ARC transmission verification, defect reporting, briefing',
              'Perform a battery service: visual condition, float voltage, load-test evidence, installation-date label confirmation, replacement decision against design life',
              'Manage detector cleaning and sensitivity verification per manufacturer procedure and trend the results in the asset register',
              'Apply BS 5839-1:2025 clause 22 disablement principles: minimum scope, premises management informed, time-bounded, with interim measures where appropriate',
              'Apply BS 5839-1:2025 clause 43.4 remote-services / cyber-security recommendations to all servicing involving connected CIEs',
              'Produce a service report with the appropriate conformity statement honestly reflecting any open defects or unmet recommendations',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Who counts as a competent person — clause 3.13</ContentEyebrow>

          <ConceptBlock
            title="The four pillars plus CPD"
            plainEnglish="BS 5839-1:2025 clause 3.13 defines a competent person as someone who is suitably trained AND qualified by knowledge AND has practical experience AND has been provided with the necessary instructions to enable the required tasks to be carried out correctly. The Note adds that maintenance of competence is likely to require continuing professional development. The four pillars are not interchangeable. Training without experience is fragile. Experience without instructions is improvisation. Knowledge without training risks gaps. The CPD expectation recognises that fire-alarm products and standards evolve, and last decade's competence does not automatically apply to today's systems."
            onSite="If you cannot evidence all four pillars plus current CPD, you should not be signing the service report. The signature carries personal liability under RRO 2005 if the system is later found to have been mis-serviced."
          >
            <p>What each pillar typically looks like in practice:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Suitably trained.</strong> Formal training on BS 5839-1, on the specific CIE
                platforms encountered, on detector technology types, on test equipment operation, on
                the ARC systems used. Training records dated and held by the employer.
              </li>
              <li>
                <strong>Qualified by knowledge.</strong> Recognised qualifications — FIA units,
                manufacturer accreditation, NVQ-level fire detection / alarm qualifications. Not
                self-attestation; an external body has verified the knowledge.
              </li>
              <li>
                <strong>Practical experience.</strong> Time spent under supervision performing the
                role on real systems. Logged hours, mentor sign-off, gradual progression from
                supervised to independent work.
              </li>
              <li>
                <strong>Necessary instructions.</strong> The specific manufacturer's product
                manuals, the system's as-installed documentation, the cause-and-effect matrix, the
                site-specific risk assessment. Without these, the engineer is improvising on the
                day.
              </li>
              <li>
                <strong>CPD.</strong> Annual training updates, attendance at standards-update
                seminars (BS 5839-1:2025 introduction events being a current example),
                manufacturer-product update briefings. Recorded by the employer; produced on
                request.
              </li>
            </ul>
            <p>
              Third-party-certificated organisations (BAFE SP203 for fire-detection-and-alarm
              maintenance, FIA membership and unit accreditation, NSI / SSAIB schemes) operate
              quality-management systems that formalise the four pillars and provide an audit trail.
              AHJs and insurers increasingly require evidence of one of these schemes — a
              self-declaration of competence is harder to defend if a system later fails.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 3.13 (Definition — competent person)"
            clause={
              <>
                Person, suitably trained and qualified by knowledge and practical experience, and
                provided with the necessary instructions, to enable the required task(s) to be
                carried out correctly. NOTE: Maintenance of competence is likely to require
                continuing professional development (CPD).
              </>
            }
            meaning="Four pillars (training, knowledge, experience, instructions) + a Note expectation of CPD. The four pillars are conjoined ('AND' each one). Missing any pillar means not competent for this purpose. The CPD note is technically advisory but is a load-bearing professional expectation — competence does not stand still as products and standards evolve."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The new five-to-seven-month tolerance window</ContentEyebrow>

          <ConceptBlock
            title="What changed and why"
            plainEnglish="BS 5839-1:2017 clause 45.3 said the period between successive inspection and servicing visits should not exceed six months — and added that if it did, the system was no longer compliant. In practice, servicing organisations have for years operated on a one-month-either-side rule of thumb because operational reality (Christmas closures, holiday cover, access constraints) makes strictly six months impossible to hit week-by-week. BS 5839-1:2025 clause 43.2.1 brings the custom into the standard. Note 1 makes five-to-seven months acceptable; Note 2 fixes the acceptance date as the datum so the schedule does not drift uncontrollably."
          >
            <p>The practical implications:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Compliance status of historic visits.</strong> A 2024 visit at the 6-month +
                3 weeks mark was technically non-compliant on the strict 2017 reading. Under 2025 it
                would be inside the tolerance and compliant. New service contracts should target six
                months and use the tolerance only when needed.
              </li>
              <li>
                <strong>Datum stability.</strong> Note 2 fixes the acceptance date as the datum, not
                the previous visit date. This prevents drift if successive visits happen to each
                slip by a few days — without a fixed datum, eight or ten cycles can compound into
                months of slippage. The datum keeps the schedule pinned to the original anniversary.
              </li>
              <li>
                <strong>Outside the window remains non-compliant.</strong> A visit at four months
                and three weeks is too early; a visit at seven months and one week is too late. Both
                should be flagged as system departures, with the reason recorded and the interval
                re-aligned at the next visit.
              </li>
              <li>
                <strong>The 2025 service report should evidence the window.</strong> Best practice:
                the report explicitly records the acceptance date (datum), the previous visit date,
                this visit date, and the calculated months-since-previous. Auditors can read the
                compliance off the page.
              </li>
            </ul>
            <p>
              Servicing organisations that want to demonstrate quality should aim for the six-month
              mark and treat the tolerance as a back-stop rather than a planning target. A
              consistently-mid-window pattern is a sign of disciplined scheduling; a consistently-
              late pattern is a symptom of resource shortages and forewarns AHJs of organisational
              risk.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          {/* Diagram — service visit checklist */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Six-monthly service visit — BS 5839-1:2025 deliverables checklist
            </h4>
            <svg
              viewBox="0 0 860 540"
              className="w-full h-auto"
              role="img"
              aria-label="Eight-step service visit checklist with deliverables for each step. Numbers 1-8 down the left, descriptive text for each step, and the asset register and service report emerging on the right as outputs."
            >
              <rect
                x="20"
                y="20"
                width="820"
                height="36"
                rx="8"
                fill="rgba(251,191,36,0.08)"
                stroke="#FBBF24"
                strokeWidth="1.5"
              />
              <text
                x="430"
                y="44"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="13"
                fontWeight="bold"
              >
                Six-monthly service visit — competent person, clause 43.2.1
              </text>

              {[
                {
                  n: '1',
                  t: 'On arrival',
                  d: 'Greet premises management. Confirm scope. Notify ARC (test mode).',
                  c: '#22D3EE',
                },
                {
                  n: '2',
                  t: 'Logbook + event log review',
                  d: 'Read logbook since last visit. Read panel event memory. Identify trends.',
                  c: '#22D3EE',
                },
                {
                  n: '3',
                  t: 'Panel visual inspection',
                  d: 'Status, disablements, time clock, configuration, battery, charger.',
                  c: '#A855F7',
                },
                {
                  n: '4',
                  t: 'Sample functional test',
                  d: 'Detectors / MCPs / sounders / VADs / interfaces per asset register split.',
                  c: '#A855F7',
                },
                {
                  n: '5',
                  t: 'Battery service',
                  d: 'Visual + float voltage + load-test evidence + date label + decision.',
                  c: '#FBBF24',
                },
                {
                  n: '6',
                  t: 'ARC transmission test',
                  d: 'Each signal type confirmed sent and acknowledged. Dual-path exercise.',
                  c: '#FBBF24',
                },
                {
                  n: '7',
                  t: 'Defect reporting',
                  d: 'Open defects, recommendations, quoted remedial works, urgency.',
                  c: '#EF4444',
                },
                {
                  n: '8',
                  t: 'Briefing + report',
                  d: 'Brief responsible person. Sign logbook. Conformity statement. Issue report.',
                  c: '#EF4444',
                },
              ].map((s, i) => {
                const y = 80 + i * 54;
                return (
                  <g key={s.n}>
                    <circle
                      cx="60"
                      cy={y + 18}
                      r="18"
                      fill={s.c}
                      opacity="0.18"
                      stroke={s.c}
                      strokeWidth="1.6"
                    />
                    <text
                      x="60"
                      y={y + 23}
                      textAnchor="middle"
                      fill={s.c}
                      fontSize="13"
                      fontWeight="bold"
                    >
                      {s.n}
                    </text>
                    <rect
                      x="92"
                      y={y}
                      width="540"
                      height="38"
                      rx="8"
                      fill="rgba(255,255,255,0.04)"
                      stroke={s.c}
                      strokeWidth="1.2"
                    />
                    <text x="104" y={y + 17} fill={s.c} fontSize="11" fontWeight="bold">
                      {s.t}
                    </text>
                    <text x="104" y={y + 30} fill="rgba(255,255,255,0.7)" fontSize="9.5">
                      {s.d}
                    </text>
                  </g>
                );
              })}

              <rect
                x="650"
                y="80"
                width="190"
                height="430"
                rx="10"
                fill="rgba(251,191,36,0.04)"
                stroke="#FBBF24"
                strokeWidth="1.4"
                strokeDasharray="4,2"
              />
              <text
                x="745"
                y="100"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                Outputs
              </text>
              <text x="745" y="118" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                left with the responsible person
              </text>

              {[
                'Service report (signed)',
                'Logbook entry (signed)',
                'Updated asset register',
                'Defect / fault list',
                'Recommendations + quotes',
                'Conformity statement',
                'Battery service evidence',
                'ARC transmission test record',
                'Disablement record',
                'Next visit window',
              ].map((o, i) => {
                const y = 142 + i * 32;
                return (
                  <g key={o}>
                    <rect
                      x="666"
                      y={y}
                      width="158"
                      height="22"
                      rx="6"
                      fill="rgba(251,191,36,0.06)"
                      stroke="#FBBF24"
                      strokeWidth="0.8"
                    />
                    <text
                      x="745"
                      y={y + 14}
                      textAnchor="middle"
                      fill="rgba(255,255,255,0.8)"
                      fontSize="9.5"
                    >
                      {o}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>The visit deliverables in detail</ContentEyebrow>

          <ConceptBlock
            title="Eight load-bearing actions"
            plainEnglish="The six-monthly visit is not a checklist signed at the end; it is eight discrete actions, each producing evidence, each contributing to the conformity statement at the visit's end. The competent engineer plans the visit before arrival, executes the eight actions in a logical order, and leaves with the responsible person briefed and the report in their hand."
          >
            <p>The eight actions:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>On arrival</strong> — confirm scope with premises management, notify the ARC
                the system is going into test mode, agree on areas to be tested and any operational
                restrictions (e.g. patient areas in hospitals, exam halls in schools).
              </li>
              <li>
                <strong>Logbook + event log review</strong> — read every logbook entry since the
                previous visit. Cross-reference to the panel event memory. Identify recurring faults
                (same device repeatedly resetting), repeated false alarms (same area repeatedly
                triggering), unresolved actions from the previous visit.
              </li>
              <li>
                <strong>Panel visual inspection</strong> — confirm normal status. Check for any
                zones / outputs disabled. Check the date / time clock and adjust as necessary
                (load-bearing for day / night sensitivity logic). Inspect battery condition and
                connections. Inspect any configuration changes against the as-commissioned baseline.
              </li>
              <li>
                <strong>Sample functional test</strong> — test the planned sample of detectors (per
                the asset register split), MCPs, sounders / VADs, interfaces. Record each device
                tested and the outcome. Use manufacturer-approved test methods (canned test smoke
                for smoke detectors; electrical test pulse for heat detectors; mechanical operation
                for MCPs; cause-and-effect verification for interfaces).
              </li>
              <li>
                <strong>Battery service</strong> — visual + float voltage + load-test evidence +
                installation-date label. Replacement decision based on age, performance, and trend.
              </li>
              <li>
                <strong>ARC transmission test</strong> — verify each signal type (fire alarm, fault,
                test, disablement, restoration) is sent and acknowledged. On dual-path systems
                exercise both paths. Record the test ID and acknowledgement timestamp from the ARC.
              </li>
              <li>
                <strong>Defect reporting</strong> — write up any defects observed during the visit.
                For each: location, device or component, description, recommended remedial action,
                urgency (immediate / short / planned), quoted cost or quotation to follow.
              </li>
              <li>
                <strong>Briefing + report</strong> — meet with the responsible person before
                leaving. Walk them through the report, the asset register update, the open defects,
                the conformity statement. Have them sign the logbook entry. Agree the next visit
                window.
              </li>
            </ol>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 22 (Disablement of system)"
            clause={
              <>
                When servicing a system involves the disablement of protection in significant parts
                of the system, this should be kept to a practicable minimum, and the premises
                management or their appointed representative should be informed of the areas
                affected. This also applies to disablement of sounders or visual alarms.
              </>
            }
            meaning="Three rules: minimum scope, premises informed, applies equally to alarm devices. Disablement is a deliberate, time-bounded erosion of life-safety provision and the standard requires it to be visible and managed. The disablement record (start time, end time, area / device, premises management informed) is a logbook entry. Where the affected area is significant or the period extended, premises management is responsible for instituting interim measures."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The battery service in detail</ContentEyebrow>

          <ConceptBlock
            title="Visual + float voltage + load-test evidence"
            plainEnglish="The standby battery is the most safety-critical wearing component in the system and the most predictable failure mode. Its degradation is gradual but its end-state failure is sudden — a battery that has been quietly losing capacity for two years can drop below the design threshold within a single week. Three actions every six months catch the trajectory before it falls off the cliff."
          >
            <p>The three actions in detail:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Visual.</strong> Open the panel. Inspect the battery case for swelling (sign
                of internal failure / overcharging), terminal corrosion (sign of poor connection /
                aged battery), vent / seal condition (sealed batteries should not show electrolyte
                signs). Confirm secure mechanical mounting. Confirm the installation-date label is
                present and legible. (BS 5839-1:2025 explicitly acknowledges the long-standing
                custom of marker-pen labelling.) If no label exists, add one with the install date
                as inferred from the asset register; if the date is more than four years back, raise
                replacement.
              </li>
              <li>
                <strong>Float voltage.</strong> Measure DC voltage at the battery terminals. Compare
                to the manufacturer-specified float voltage for the panel's charger. Typical values:
                13.6 to 13.8 V dc per 12 V battery, or 27.2 to 27.6 V dc for a 24 V pair.
                Significantly low (below ~13.4 V) suggests charger fault or end-of-life battery.
                Significantly high (above ~14.0 V) suggests a charger overcharging — a separate
                fault to investigate, but the battery is also being shortened in life.
              </li>
              <li>
                <strong>Load-test evidence.</strong> Two methods. First, initiate the panel's
                built-in battery test (most modern CIEs run a brief discharge into a known load and
                infer back-up capacity). Record the result. Second, on systems where the built-in
                test is inadequate (older panels) perform an off-line load test with a
                constant-current load and a stopwatch — discharge a percentage of the battery
                capacity and confirm the discharge curve is consistent with rated capacity. The
                result is compared to the design back-up duration recorded in the as-commissioned
                documentation.
              </li>
            </ol>
            <p>
              Replacement at design life — typically four years for sealed lead-acid — is planned
              into the service contract. The four-year mark is conservative for many environments
              but ages quickly in hot panel locations or where the panel cycles frequently. Any
              indication of trending performance decline should bring the replacement forward.
              Replacement is documented (model, capacity, install date, fitter's name, removed
              battery disposal) and the new installation-date label is fitted.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Detector cleaning and sensitivity verification</ContentEyebrow>

          <ConceptBlock
            title="Manufacturer procedure, recorded outcomes"
            plainEnglish="Smoke detectors accumulate dust, fibres, and contamination over their life. Optical detectors are particularly sensitive — a single year of exposure to a dusty environment can shift sensitivity meaningfully. The 2025 standard expects servicing organisations to follow the manufacturer's procedure: most modern addressable detectors report a contamination level via the CIE, and the procedure is to clean (or replace) once the level exceeds a threshold. Conventional or older detectors require either chamber re-test (in a specialist test rig) or — for many — outright replacement at the manufacturer's specified intervals."
          >
            <p>What the engineer does at each visit:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Read the contamination level (addressable systems).</strong> Most modern
                addressable detector heads report a percentage contamination via the CIE event log.
                Read the level for every detector tested at this visit. Record in the asset
                register. Detectors above the manufacturer threshold (often 70-80%) are flagged for
                clean or replace at this visit.
              </li>
              <li>
                <strong>Clean per manufacturer procedure.</strong> Most modern detectors have a
                specific clean process — either an in-place gentle vacuum / canned-air procedure, or
                a head-removal-and-clean procedure. Some are non-cleanable and the maintenance
                action is replacement.
              </li>
              <li>
                <strong>Re-test sensitivity.</strong> After cleaning, the detector's sensitivity
                should be re-verified. Some addressable systems do this automatically via the CIE;
                others require a test smoke / chamber check.
              </li>
              <li>
                <strong>Record the outcome.</strong> Asset register entry for each detector: cleaned
                / not cleaned, post-clean contamination level, sensitivity OK / drift / replaced.
                Trend the data — detectors that re-contaminate quickly are in the wrong location for
                their type and may need design review.
              </li>
              <li>
                <strong>End-of-life replacement.</strong> Manufacturer-specified detector
                replacement intervals (often 10 years from manufacture) are observed regardless of
                cleanability. The asset register tracks the install date for every detector; the
                planning system flags replacement-due in advance.
              </li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="Sensitivity drift in a kitchen-adjacent zone"
            situation="A care home has eight smoke detectors in a corridor adjacent to the kitchen. Over three consecutive six-monthly visits, the asset register shows contamination levels rising: V1 (12%, 14%, 18%, 11%, 12%, 22%, 14%, 13%) → V2 (28%, 30%, 35%, 22%, 25%, 48%, 30%, 27%) → V3 (54%, 58%, 65%, 41%, 47%, 72%, 56%, 51%). Detector 6 has now exceeded the manufacturer's 70% threshold. The other seven are trending toward it."
            whatToDo="At V3, clean detector 6 per the manufacturer procedure. Re-test its sensitivity. Record the outcome (contamination level post-clean, sensitivity OK or replaced). For the seven trending detectors, recommend a design review with premises management — the rate of contamination is unusually high for an internal corridor and suggests either (a) high cooking-smoke ingress from the kitchen suggesting the kitchen extract is undersized or unbalanced, or (b) the wrong detector technology (consider multi-sensor heat / smoke for kitchen-adjacent areas, which is more tolerant of cooking aerosols). Quote the design review and any detector technology change in the service report. The trend data — the detectors going from average 14% at V1 to average 56% at V3 — is the load-bearing evidence for the responsible person's decision."
            whyItMatters="Sensitivity drift is the single most predictable cause of false alarms and detection failure. Trending it across visits — rather than reacting to individual high readings — is what distinguishes a good service organisation. The asset register is the data spine that makes trending possible; without consistent recording of contamination levels, the trend is invisible."
          />

          <SectionRule />

          <ContentEyebrow>Cyber security and remote services — clause 43.4</ContentEyebrow>

          <ConceptBlock
            title="Why this is in the standard now"
            plainEnglish="Modern fire-alarm CIEs are increasingly connected — to the building's IT network, to the internet via a gateway, to manufacturer cloud services for diagnostics, to ARC services for signal transmission. This connectivity is operationally useful (remote diagnostics save site visits) but it expands the cyber-attack surface. A fire-alarm CIE compromised by a remote attacker — whose firmware is silently reconfigured, or whose alarm signal transmission is silently disabled — is a life-safety risk equivalent to the panel being physically destroyed. BS 5839-1:2025 introduces clause 43.4 to bring cyber-security expectations into the maintenance regime."
          >
            <p>The clause 43.4 controls:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Physical access controls</strong> — locking the comms cabinet, fitting
                anti-tamper plugs to unused patch leads, restricting access to the CIE's service
                ports. The first defence is preventing a casual physical connection by an
                unauthorised person.
              </li>
              <li>
                <strong>Authentication of remote-access requests</strong> — the CIE or its gateway
                should authenticate any request to accept a remote connection. Default passwords
                must be changed at commissioning. Two-factor authentication where the product
                supports it. Connection-request logs reviewed at each service visit.
              </li>
              <li>
                <strong>Risk assessment before remote service.</strong> Before any remote read /
                control / write action — particularly write actions like firmware updates or
                configuration changes — perform a documented risk assessment. What is the potential
                impact on system operation? What is the rollback if the action fails? Who is the
                authorised approver? The result of the risk assessment is recorded with the action.
              </li>
              <li>
                <strong>Post-action operational confirmation.</strong> After any remote service, the
                responsible individual must confirm the system is fully operational. Remote actions
                can leave the CIE in a partially-functional state without obvious indication. The
                post-action confirmation closes that gap.
              </li>
              <li>
                <strong>Logging.</strong> All remote-access events are logged — connection request,
                authentication outcome, actions performed, post-action state. The log is reviewed at
                the next service visit (Section 6.4 covers logbook discipline in full).
              </li>
            </ul>
            <p>
              Firmware updates are explicitly classed as modifications under clause 7 (NEW 2025) and
              require an extension or modification certificate (Section 6.5). A casual remote
              firmware push by a manufacturer's field engineer — common pre-2025 — is no longer
              compliant; it requires the same paperwork as a physical site visit modification.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 43.4 (Remote services and cyber security)"
            clause={
              <>
                Recommendations include preventing the unauthorized access to the system, access
                points, and network pathways by physical means such as locking the comms cabinet or
                fitting anti-tamper plugs to patch leads. A method of authentication of a request to
                accept a remote connection should be included in the CIE or gateway software before
                remote access is allowed. Prior to performing any remote service, particularly when
                executing read, control, or write functions, a thorough risk assessment should be
                conducted to evaluate the potential impact on the operation of the CIE. If there is
                any risk that the remote service might compromise the correct functioning of the
                CIE, the responsible individual must ensure that the system is fully operational
                upon completion of the remote service.
              </>
            }
            meaning="Five layered controls: physical, authentication, risk-assessed action, post-action verification, logging. The clause does not ban remote services; it brings them into the same disciplined regime as physical site visits. Casual remote firmware pushes / configuration tweaks are no longer compliant."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <CommonMistake
            title="Treating the tolerance window as the planning target"
            whatHappens="A service organisation under resource pressure starts scheduling visits at the seven-month mark to spread workload. Over four cycles, the visits drift cumulatively and what started as 'just inside seven months' becomes 'consistently at six months and three weeks'. A V5 visit slips to seven months and one week — outside the window. The system is now non-compliant. The responsible person's insurer flags the lapse at audit; the next visit's conformity statement has to record a system departure."
            doInstead="Schedule visits to target the six-month anniversary date (the datum). Use the five-to-seven-month tolerance only when operational reality requires it (Christmas, illness cover, access constraints). Record the reason in the service report when the tolerance is used. Over multiple cycles the schedule should oscillate around six months, not drift in one direction."
          />

          <CommonMistake
            title="Disabling 'just to get the testing done' without informing premises management"
            whatHappens="An engineer arrives at a hospital site for a six-monthly visit and disables the CIE's sounder outputs to avoid disturbing patients during testing. The disablement remains in place for three hours while testing proceeds. A real fire occurs in an adjacent ward during the disablement period; the alarm is delayed because the engineer's sounder disablement is still in effect. Premises management was not informed; ward staff did not know to stand-by."
            doInstead="Brief premises management on every disablement before it is effected. Limit the disablement to the practicable minimum (e.g. disable one zone's sounders at a time, not the whole building). Log the disablement in the logbook with start time and end time. Where a significant area or extended period is involved, premises management institutes a fire watch. Do not disable as a default convenience for the engineer's testing rhythm."
          />

          <CommonMistake
            title="Stamping 'compliant' on a service report that has unresolved defects"
            whatHappens="A service engineer leaves a site with two open defects — one VAD failure in a back-of-house corridor and a sensitivity drift on three ceiling detectors. The customer is on a fixed-price contract and the engineer wants to keep the relationship friendly. The service report records both defects in the body but stamps the conformity statement as 'compliant'. Eighteen months later the responsible person's insurer audits the documentation, sees the contradiction, and challenges every report from this servicing organisation."
            doInstead="The conformity statement must honestly reflect the system state. With open defects, the report records 'compliant with logged defects' or 'partially compliant — see defect list' as appropriate, lists the unmet recommendations, lists the interim measures, lists the recommended remedial works with quotes, and signs honestly. The customer relationship is built on accuracy, not on a flattering report."
          />

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Competent person (clause 3.13) = trained + qualified by knowledge + experienced + given necessary instructions, with CPD. Third-party schemes are the assurance route.',
              'Six-monthly interval per clause 43.2.1 — NEW five-to-seven-month tolerance. Acceptance date is the datum. Target six months; use tolerance only when needed.',
              'Eight visit deliverables: arrival, logbook + event review, panel visual, sample functional test, battery service, ARC test, defect report, briefing.',
              'Battery service: visual + float voltage + load-test evidence + date label. Replace at design life — typically four years.',
              'Detector cleaning and sensitivity verification per manufacturer procedure. Trend contamination across visits in the asset register.',
              'Disablement (clause 22): minimum scope, premises informed, logged. Interim measures proportionate.',
              'Cyber security (clause 43.4 NEW): physical access + authentication + risk assessment + post-action verification + logging. Firmware updates = modifications (cert required).',
              'Clock check at every visit — load-bearing for day / night sensitivity logic and event-log timestamps.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'How does an AHJ or insurer verify our competent-person status under clause 3.13?',
                answer:
                  "Best evidenced by employment by a third-party-certificated organisation (BAFE SP203 for fire detection and alarm maintenance, FIA membership and unit accreditation, NSI / SSAIB schemes). The organisation's certification provides external assurance that the four pillars (training, knowledge, experience, instructions) and CPD expectation are evidenced in a documented quality-management system. Self-declaration of competence is increasingly difficult to defend if an AHJ challenges it.",
              },
              {
                question:
                  'My visit is at six months and three weeks because the previous engineer was off sick. Is this acceptable?',
                answer:
                  'Yes — six months and three weeks is inside the five-to-seven-month tolerance window introduced in BS 5839-1:2025 clause 43.2.1 Note 1. Record the reason in the service report (engineer absence, resource constraint, agreed with responsible person). Aim to bring the next visit back toward the six-month target so the schedule does not drift cumulatively.',
              },
              {
                question:
                  'How is "datum = acceptance date" different from "datum = previous visit"?',
                answer:
                  'The acceptance date is fixed at handover; it does not move. The previous visit date moves slightly cycle-to-cycle. If the datum were the previous visit, small slippages compound across many cycles. Pinning to the acceptance date keeps the schedule anchored to the original anniversary even if individual visits use the tolerance. Clause 43.2.1 Note 2 explicitly fixes this.',
              },
              {
                question:
                  'A 12 V battery shows 12.4 V at the terminals during the float-voltage check. What is wrong?',
                answer:
                  '12.4 V is at or below the open-circuit voltage of a healthy 12 V sealed lead-acid battery. The charger is not delivering float voltage (which should be 13.6 to 13.8 V). Either the charger has failed (panel fault investigation) or the charger has detected a battery problem and isolated it (often results in a panel "battery fault" indication). Investigate the charger output, check the battery-fault status on the panel, replace the battery if it has reached end of life, replace the charger / panel power supply if the charger output is faulty. Do not leave the system on a 12.4 V battery — back-up duration is severely compromised.',
              },
              {
                question:
                  'Detector contamination level reads 85% on a five-year-old optical smoke detector. What action?',
                answer:
                  "Above the manufacturer's typical 70-80% threshold. Clean per the manufacturer procedure (vacuum / canned-air, or head removal + clean per the device manual). Re-read the contamination level after cleaning. If it remains above threshold after cleaning, replace the detector. Five-year-old detectors are also approaching the end of their typical 10-year design life — record the trend and plan replacement at the next visit if it is not done at this one.",
              },
              {
                question:
                  'During remote service, the engineer accidentally pushes a wrong configuration to the CIE. What does clause 43.4 expect to have prevented this?',
                answer:
                  'Three controls. First, the risk assessment before the action should have identified the configuration push as a write action with potential for impact, requiring a rollback plan. Second, the authentication should ensure the engineer is acting in the right system (a common cause of "wrong system" mishaps is multi-tenant remote-access tools without strong system identification). Third, the post-action operational confirmation should immediately reveal the misconfiguration and trigger rollback. The clause does not prevent the mistake but ensures it is contained and corrected.',
              },
              {
                question:
                  'Is firmware update on a CIE always a modification requiring a certificate?',
                answer:
                  'Yes per BS 5839-1:2025 clause 7 (NEW). Firmware updates change the operating behaviour of a life-safety device and are explicitly classed as modifications. An extension or modification certificate must be issued (Section 6.5). The certification path applies to remote firmware updates as well as physical-site firmware updates. The clause closes a long-standing gap where remote firmware pushes were treated as informal updates without paperwork.',
              },
              {
                question: 'How do I evidence that the panel time clock was checked at the visit?',
                answer:
                  'Record the time displayed on the CIE on arrival, your reference time (e.g. mobile phone showing the same time), any adjustment made, and the time displayed on departure. The service report includes a clock-check field. The check matters for day / night sensitivity logic and for event-log timestamp integrity — both are load-bearing for fault investigation. BS 5839-1:2025 explicitly lists clock check as a service-visit action.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Servicing and maintenance — Module 6.2" questions={quizQuestions} />

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
                navigate('/electrician/upskilling/fire-alarm-course/module-6/section-3')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.3 Fault finding techniques
              </div>
            </button>
          </div>

          <div className="hidden">
            <Wrench />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default FireAlarmModule6Section2;
