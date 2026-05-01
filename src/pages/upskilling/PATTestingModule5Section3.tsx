import { ArrowLeft, ChevronLeft, ChevronRight, Activity } from 'lucide-react';
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
    id: 'patm5-s3-on-register',
    question:
      "Should a hired pressure washer in use on site for 6 weeks be recorded on the duty holder's asset register?",
    options: [
      'No — only owned equipment goes on the register.',
      "Yes — any electrical equipment in use under the duty holder's control belongs on the register, regardless of ownership. Hired equipment is recorded as a hire-status row with the hire reference and the dates. The \"if it's not on the register, it didn't get tested\" rule applies to hired kit too.",
      'Only if the hire exceeds 3 months.',
      'Only if the hirer specifies it.',
    ],
    correctIndex: 1,
    explanation:
      "IET CoP 5th Ed. Chapter 16: the asset register covers electrical equipment in use under the duty holder's control. Hired and loaned equipment introduces additional steps (verify the hire firm's test record on receipt, and either accept it or re-test) but the register entry is mandatory while the kit is on site.",
  },
  {
    id: 'patm5-s3-no-register',
    question: 'A staff member brings their own kettle from home. Does it go on the asset register?',
    options: [
      'No — personal items are exempt.',
      "It depends on policy. If personally owned electrical equipment is permitted at work, it should either be tested and added to the register (preferred — extends the duty holder's safety regime) OR the duty holder must have a documented policy prohibiting personal electrical equipment. Either way, the question must be answered, not ignored.",
      'Yes — automatically.',
      'Only if used for company work.',
    ],
    correctIndex: 1,
    explanation:
      'EAWR Reg 4(2) does not distinguish ownership — what matters is whether the equipment is in use in the workplace. Sensible policy is to either include personally owned items in the test regime (and the register) or to prohibit them. An undocumented "we don\'t test those" creates a gap in the EAWR defence.',
  },
  {
    id: 'patm5-s3-shared-id',
    question:
      'Two identical kettles in the staff room are recorded with the same asset ID. What is the audit risk?',
    options: [
      'None — they are identical.',
      'High — the audit trail collapses. A failure on one kettle cannot be distinguished from the other in the records. The "test before next use" rule in high-risk environments cannot be applied. The asset ID has stopped uniquely identifying anything.',
      'Low — combine the records to save space.',
      'Only a problem in industrial settings.',
    ],
    correctIndex: 1,
    explanation:
      'The asset ID is a unique reference. Two items sharing one ID is the same defect as two records pointing at the same item: traceability is broken. Each physical item gets its own asset ID, even where the items are functionally identical.',
  },
  {
    id: 'patm5-s3-retiring',
    question:
      'How should an asset be retired from the register when it is permanently disposed of?',
    options: [
      'Delete the row.',
      'Mark the row "DISPOSED" with the disposal date, retain the full test history, and retain the row for at least 6 years post-disposal in line with Limitation Act 1980 considerations. The register grows over time — that is correct.',
      'Move the row to a different spreadsheet.',
      'Print and shred.',
    ],
    correctIndex: 1,
    explanation:
      'Deleting the row destroys the evidential record. If a claim relating to the disposed item is brought within the limitation window (commonly 6 years), the record has to exist. Mark "DISPOSED" with date and retain the row.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What columns should an asset register carry as a minimum, in line with IET CoP 5th Ed. Chapter 16?',
    options: [
      'Description and location only',
      'Unique asset ID, description, equipment class (I / II / III), location, owner / responsible department, status (active / disposed / under repair / quarantined), last test date, last test result, next test due, and a link to the test record',
      'Manufacturer and serial number only',
      'Cost and depreciation columns',
    ],
    correctAnswer: 1,
    explanation:
      'IET CoP 5th Ed. Chapter 16 expects the register to be the master list. The columns above let any item be located, identified, statused, and tied to its test history — which is what the register is for.',
  },
  {
    id: 2,
    question: 'The "if it\'s not on the register, it didn\'t get tested" rule means:',
    options: [
      'Only registered items get tested',
      'The asset register is the master list against which test rounds are reconciled. An item missing from the register is invisible to the test process — meaning it can sit untested for years. The register is the management tool that prevents drift.',
      'Items get crossed off as tested',
      'It is an old rule that no longer applies',
    ],
    correctAnswer: 1,
    explanation:
      "The register is the planning and reconciliation list. Test rounds work through the register; missing items never appear on a tester's round, so they never get tested. Audit your physical equipment against the register periodically — the gap is the management failure.",
  },
  {
    id: 3,
    question: 'How should hired or loaned equipment be handled in the asset register?',
    options: [
      'Excluded — only owned equipment goes on the register',
      "Included — recorded as a hire-status row with the hire reference, dates, and either the hire firm's test certificate accepted on receipt or a fresh test logged. The duty holder's control of the equipment is what matters for EAWR, not who owns it.",
      'Tracked separately on a hire log only',
      'Only required for long-term hires',
    ],
    correctAnswer: 1,
    explanation:
      "EAWR Reg 4(2) duty falls on whoever has control of the equipment in use. Hired equipment in use is under the duty holder's control. Practice is to record it on the register with hire-status flags, accept-or-re-test on receipt, and remove the row when the equipment is returned.",
  },
  {
    id: 4,
    question: 'A unique asset ID has what specific function in the recordkeeping system?',
    options: [
      'Inventory tracking',
      'Two-way linkage between the physical item (via the label) and the records (via the register and per-item history). Without a unique ID, an item cannot be tracked through repairs, retests, or audits — and a record cannot be matched back to the physical asset.',
      'Cost allocation',
      'Insurance reference',
    ],
    correctAnswer: 1,
    explanation:
      'The unique asset ID is what makes the entire system traceable. The label carries it, the register carries it, every test record carries it, every repair record carries it. Lose the unique ID and the audit trail collapses.',
  },
  {
    id: 5,
    question: 'When should an asset register row be deleted?',
    options: [
      'On disposal of the equipment',
      'Never deleted while the retention period is active (typically at least 6 years post-disposal under the Limitation Act 1980). On disposal the row is marked "DISPOSED" with the date; the test history is retained.',
      'After 12 months',
      'Whenever the register is tidied',
    ],
    correctAnswer: 1,
    explanation:
      'Deleting destroys evidence. The register grows over time as items are added and retired; the retired rows continue to live there with status flags. A claim brought during the limitation window needs the record to exist.',
  },
  {
    id: 6,
    question:
      "A staff member brings their own electrical equipment to work. The duty holder's position should be:",
    options: [
      'Personal property is automatically exempt',
      "Either the personal item is included in the duty holder's test regime and added to the register (preferred), or there is a documented policy prohibiting personal electrical equipment in the workplace. EAWR makes no distinction by ownership.",
      'It depends on the value',
      'Only laptops need policy',
    ],
    correctAnswer: 1,
    explanation:
      "EAWR Reg 4(2) is about equipment in use, not equipment ownership. A duty holder permitting personal equipment without test brings that equipment within the regime's gap. Either include it (test, label, register) or exclude it formally.",
  },
  {
    id: 7,
    question: 'Two identical printers in the same office have the same asset ID. The risk is:',
    options: [
      'Negligible — they are identical',
      'Significant — the audit trail collapses. A failure on one cannot be distinguished from the other; a test record matches both; "test before next use" cannot be applied to one specifically. Each physical item must have its own unique asset ID.',
      'Reduced register size',
      'Only a problem if they fail',
    ],
    correctAnswer: 1,
    explanation:
      'Identical equipment still has individual histories: different usage hours, different damage, different failure modes. Sharing an asset ID erases the individual history. One physical item, one asset ID.',
  },
  {
    id: 8,
    question:
      'How should the asset register integrate with a CAFM (computer-aided facilities management) or maintenance management system?',
    options: [
      'It should not — keep them separate',
      'The register should feed maintenance scheduling — next-test-due dates create work orders automatically; test results close work orders; failures generate fault tickets. Integration removes manual transcription and ensures the test programme is part of the wider maintenance regime.',
      'Only if the systems share a vendor',
      'It is forbidden by GDPR',
    ],
    correctAnswer: 1,
    explanation:
      'A standalone asset register requires manual scheduling. Integration with CAFM / CMMS makes the register the spine of the maintenance regime: due dates drive scheduling, results close tickets, failures escalate. Manual systems drift; integrated systems do not.',
  },
  {
    id: 9,
    question: 'A piece of equipment fails its test. What asset register actions are required?',
    options: [
      'Delete the row',
      'Update the row: status to "QUARANTINED" or "UNDER REPAIR", record the failure mode, link to the test record, and if repaired-and-retested, record the post-repair test and re-set status to "ACTIVE". If disposed, mark "DISPOSED" with date and retain.',
      'Mark with a coloured cell',
      'No action — the test record is enough',
    ],
    correctAnswer: 1,
    explanation:
      'The register is the master status board. Status transitions track every life-cycle event of the asset. A reader of the register at any moment should see the current status of every item without having to chase test records.',
  },
  {
    id: 10,
    question:
      'A site has 600 portable items but only 350 appear on the register. The most likely cause of the gap is:',
    options: [
      'Test instrument failure',
      'Drift: items added to the workplace over time without being entered on the register. Periodic physical audit of equipment against the register — typically annually — identifies the gap. The unregistered items are sitting untested.',
      'Records have been deleted',
      'Sub-contractor activity',
    ],
    correctAnswer: 1,
    explanation:
      'Drift is the most common cause of register-physical mismatch. Items move into the workplace via casual purchases, employee bring-ins, project deliveries, hire returns. Without a periodic walk-around audit, the register diverges from reality and the unregistered items go untested.',
  },
];

const PATTestingModule5Section3 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Asset register creation and management | PAT Module 5.3 | Elec-Mate',
    description:
      'IET CoP 5th Ed. Chapter 16 + HSG107: asset register structure, the "if it\'s not on the register, it didn\'t get tested" rule, hired / loaned / personal equipment, retiring assets, and integration with maintenance management systems.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/pat-testing-module-5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 5
          </button>

          <PageHero
            eyebrow="Module 5 · Section 3"
            title="Asset register creation and management"
            description="The register is the master list. Structure, the if-it\'s-not-on-the-register rule, hired and shared equipment, retiring assets, and integration with maintenance management."
            tone="yellow"
          />

          <TLDR
            points={[
              "The asset register is the master list of every electrical item in use under the duty holder's control. Each row represents one physical asset — identified by a unique asset ID, with description, class, location, owner, status, test history, and next test date.",
              '"If it\'s not on the register, it didn\'t get tested." Test rounds reconcile against the register; items missing from the register are invisible to the test process.',
              "Hired, loaned and personal equipment all belong on the register if they are in use under the duty holder's control. EAWR does not distinguish by ownership.",
              'Each physical item has its own unique asset ID — even where two items are identical. Shared IDs collapse the audit trail.',
              'Retiring an asset means status = DISPOSED with date, history retained for the limitation period (typically at least 6 years). Never delete the row.',
              'Integration with CAFM / CMMS turns the register into a live maintenance system: due dates drive work orders, test results close tickets, failures generate faults.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Design an asset register with the columns IET CoP 5th Ed. Chapter 16 expects, suited to the size and risk profile of the duty holder's estate",
              'Apply the "if it\'s not on the register, it didn\'t get tested" rule and reconcile physical equipment against the register periodically',
              'Handle hired, loaned, shared and personal equipment correctly within the register and within EAWR Reg 4(2)',
              'Allocate unique asset IDs, including for identical items, and explain why uniqueness is non-negotiable',
              'Retire an asset correctly: status flags, retention, and continuing audit value',
              'Integrate the asset register with a maintenance management system so test scheduling is automatic and drift is detected',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>What goes in the register</ContentEyebrow>

          <ConceptBlock
            title="Column-by-column — the data model that makes the register work"
            plainEnglish="The register has to do four things at once: identify the item uniquely, locate it, status it, and link it to its history. Get the column set right and the register supports the rest of the regime."
            onSite="A spreadsheet works for small estates. Larger estates need a database or a CMMS. The columns are the same; the storage technology scales."
          >
            <p>
              IET CoP 5th Ed. Chapter 16 expects the register to be the single source of truth for
              every electrical item the duty holder is responsible for. The minimum useful column
              set:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Unique asset ID</strong> — the load-bearing column. One per physical item.
                Format is the duty holder\'s choice (e.g. EM-0001, IT-PRT-042) but the format must
                be stable across the lifetime of the register.
              </li>
              <li>
                <strong>Description</strong> — what the item is. &ldquo;Kettle&rdquo;, &ldquo;110 V
                site transformer&rdquo;, &ldquo;IEC C13 lead 2 m&rdquo;. Specific enough that any
                reader knows what the entry refers to.
              </li>
              <li>
                <strong>Manufacturer / model</strong> — useful for warranty, parts and recall
                tracking. Not strictly required by IET CoP 5th Ed. Chapter 16, but commonly
                included.
              </li>
              <li>
                <strong>Equipment class</strong> — Class I, Class II, or Class III. Drives which
                tests apply (earth continuity is Class I only; insulation resistance and leakage
                differ across classes).
              </li>
              <li>
                <strong>Location</strong> — where the item lives. &ldquo;Office 2 — desk 4&rdquo;,
                &ldquo;Workshop tool store&rdquo;. Granular enough that a tester can find it.
              </li>
              <li>
                <strong>Owner / responsible department</strong> — who has day-to-day control. Needed
                for fault notifications, retest coordination, and disposal authorisation.
              </li>
              <li>
                <strong>Status</strong> — ACTIVE, QUARANTINED, UNDER REPAIR, AWAITING DISPOSAL,
                DISPOSED, ON HIRE OUT, ON HIRE IN. The status is the live operational state of the
                asset.
              </li>
              <li>
                <strong>Last test date</strong> — when the most recent test was carried out.
              </li>
              <li>
                <strong>Last test result</strong> — PASS / FAIL summary; the full numerical results
                live in the per-item test record.
              </li>
              <li>
                <strong>Next test due</strong> — calendar date. Drives scheduling and drift
                detection.
              </li>
              <li>
                <strong>Test interval policy</strong> — the policy applied to this item (annual,
                biennial, etc.), with reference to IET CoP Table 7.1 categorisation.
              </li>
              <li>
                <strong>Date added to register</strong> — and, where applicable, date retired.
              </li>
              <li>
                <strong>Link to test history</strong> — pointer / foreign key / file reference to
                the per-item test records.
              </li>
              <li>
                <strong>Notes / comments</strong> — free-text for anything that does not fit the
                structured columns: substitutions, repair history, deferred tests.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="IET Code of Practice for In-service Inspection and Testing of Electrical Equipment, 5th Edition (2020) · Chapter 16"
            clause={
              <>
                It is recommended that an asset register is maintained, identifying each item of
                portable and movable electrical equipment that is to be subject to in-service
                inspection and testing. The register provides the basis for planning and recording
                inspection and test activities, and for demonstrating compliance with the duty to
                maintain the equipment in a safe condition.
              </>
            }
            meaning="The register is named explicitly as the basis for both planning and recording. It is not optional administrative tidiness — it is the management tool that makes the regime operable. Without it, the duty holder is testing whatever happens to be visible on the day."
          />

          {/* Asset register structure diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Asset register structure — the data model
            </h4>
            <svg
              viewBox="0 0 800 470"
              className="w-full h-auto"
              role="img"
              aria-label="Asset register data model. The register is shown as a table with columns for asset ID, description, class, location, owner, status, last test, next test, and link to history. Annotations explain the function of each column group."
            >
              {/* Header row */}
              <rect
                x="40"
                y="30"
                width="720"
                height="36"
                rx="6"
                fill="rgba(251,191,36,0.10)"
                stroke="rgba(251,191,36,0.4)"
                strokeWidth="1"
              />
              <text x="80" y="53" fill="#FBBF24" fontSize="10" fontWeight="bold">
                ASSET ID
              </text>
              <text x="170" y="53" fill="#FBBF24" fontSize="10" fontWeight="bold">
                DESCRIPTION
              </text>
              <text x="290" y="53" fill="#FBBF24" fontSize="10" fontWeight="bold">
                CLASS
              </text>
              <text x="350" y="53" fill="#FBBF24" fontSize="10" fontWeight="bold">
                LOCATION
              </text>
              <text x="450" y="53" fill="#FBBF24" fontSize="10" fontWeight="bold">
                STATUS
              </text>
              <text x="525" y="53" fill="#FBBF24" fontSize="10" fontWeight="bold">
                LAST TEST
              </text>
              <text x="615" y="53" fill="#FBBF24" fontSize="10" fontWeight="bold">
                NEXT DUE
              </text>
              <text x="700" y="53" fill="#FBBF24" fontSize="10" fontWeight="bold">
                HISTORY
              </text>

              {/* Row 1 — Active kettle */}
              <rect
                x="40"
                y="70"
                width="720"
                height="34"
                rx="4"
                fill="rgba(34,197,94,0.06)"
                stroke="rgba(34,197,94,0.25)"
                strokeWidth="1"
              />
              <text x="80" y="91" fill="#FFFFFF" fontSize="10" fontWeight="bold">
                EM-0427
              </text>
              <text x="170" y="91" fill="#FFFFFF" fontSize="10">
                Kettle 1.7 L
              </text>
              <text x="290" y="91" fill="#FFFFFF" fontSize="10">
                Class I
              </text>
              <text x="350" y="91" fill="#FFFFFF" fontSize="10">
                Staff room
              </text>
              <text x="450" y="91" fill="#22C55E" fontSize="10" fontWeight="bold">
                ACTIVE
              </text>
              <text x="525" y="91" fill="#FFFFFF" fontSize="10">
                28 Apr 2026
              </text>
              <text x="615" y="91" fill="#FFFFFF" fontSize="10">
                28 Apr 2027
              </text>
              <text x="700" y="91" fill="rgba(255,255,255,0.55)" fontSize="9">
                #h-0427
              </text>

              {/* Row 2 — Drill on hire in */}
              <rect
                x="40"
                y="108"
                width="720"
                height="34"
                rx="4"
                fill="rgba(59,130,246,0.06)"
                stroke="rgba(59,130,246,0.25)"
                strokeWidth="1"
              />
              <text x="80" y="129" fill="#FFFFFF" fontSize="10" fontWeight="bold">
                HIRE-22
              </text>
              <text x="170" y="129" fill="#FFFFFF" fontSize="10">
                110 V SDS drill
              </text>
              <text x="290" y="129" fill="#FFFFFF" fontSize="10">
                Class II
              </text>
              <text x="350" y="129" fill="#FFFFFF" fontSize="10">
                Site cabin
              </text>
              <text x="450" y="129" fill="#3B82F6" fontSize="10" fontWeight="bold">
                ON HIRE IN
              </text>
              <text x="525" y="129" fill="#FFFFFF" fontSize="10">
                12 Apr 2026
              </text>
              <text x="615" y="129" fill="#FFFFFF" fontSize="10">
                12 Jul 2026
              </text>
              <text x="700" y="129" fill="rgba(255,255,255,0.55)" fontSize="9">
                #h-h22
              </text>

              {/* Row 3 — Drill quarantined */}
              <rect
                x="40"
                y="146"
                width="720"
                height="34"
                rx="4"
                fill="rgba(239,68,68,0.06)"
                stroke="rgba(239,68,68,0.25)"
                strokeWidth="1"
              />
              <text x="80" y="167" fill="#FFFFFF" fontSize="10" fontWeight="bold">
                EM-0319
              </text>
              <text x="170" y="167" fill="#FFFFFF" fontSize="10">
                Drill 18 V battery
              </text>
              <text x="290" y="167" fill="#FFFFFF" fontSize="10">
                Class III
              </text>
              <text x="350" y="167" fill="#FFFFFF" fontSize="10">
                Quarantine bin
              </text>
              <text x="450" y="167" fill="#EF4444" fontSize="10" fontWeight="bold">
                QUARANTINED
              </text>
              <text x="525" y="167" fill="#FFFFFF" fontSize="10">
                03 Apr 2026
              </text>
              <text x="615" y="167" fill="rgba(255,255,255,0.55)" fontSize="10">
                —
              </text>
              <text x="700" y="167" fill="rgba(255,255,255,0.55)" fontSize="9">
                #h-0319
              </text>

              {/* Row 4 — Disposed */}
              <rect
                x="40"
                y="184"
                width="720"
                height="34"
                rx="4"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1"
              />
              <text x="80" y="205" fill="rgba(255,255,255,0.6)" fontSize="10" fontWeight="bold">
                EM-0188
              </text>
              <text x="170" y="205" fill="rgba(255,255,255,0.6)" fontSize="10">
                Fan heater 2 kW
              </text>
              <text x="290" y="205" fill="rgba(255,255,255,0.6)" fontSize="10">
                Class I
              </text>
              <text x="350" y="205" fill="rgba(255,255,255,0.6)" fontSize="10">
                Disposed
              </text>
              <text x="450" y="205" fill="rgba(255,255,255,0.5)" fontSize="10" fontWeight="bold">
                DISPOSED
              </text>
              <text x="525" y="205" fill="rgba(255,255,255,0.6)" fontSize="10">
                14 Jan 2026
              </text>
              <text x="615" y="205" fill="rgba(255,255,255,0.55)" fontSize="10">
                —
              </text>
              <text x="700" y="205" fill="rgba(255,255,255,0.55)" fontSize="9">
                #h-0188
              </text>

              {/* Annotations group */}
              <text
                x="400"
                y="250"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                What each column group does
              </text>

              {/* Identity group */}
              <rect
                x="40"
                y="265"
                width="240"
                height="80"
                rx="6"
                fill="rgba(251,191,36,0.06)"
                stroke="rgba(251,191,36,0.2)"
                strokeWidth="1"
              />
              <text
                x="160"
                y="285"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                IDENTITY
              </text>
              <text x="50" y="305" fill="rgba(255,255,255,0.7)" fontSize="9">
                Asset ID, description, class.
              </text>
              <text x="50" y="320" fill="rgba(255,255,255,0.7)" fontSize="9">
                One per physical item, even
              </text>
              <text x="50" y="335" fill="rgba(255,255,255,0.7)" fontSize="9">
                when items are identical.
              </text>

              {/* Location/owner group */}
              <rect
                x="290"
                y="265"
                width="240"
                height="80"
                rx="6"
                fill="rgba(251,191,36,0.06)"
                stroke="rgba(251,191,36,0.2)"
                strokeWidth="1"
              />
              <text
                x="410"
                y="285"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                LOCATION + STATUS
              </text>
              <text x="300" y="305" fill="rgba(255,255,255,0.7)" fontSize="9">
                Where it lives, who is
              </text>
              <text x="300" y="320" fill="rgba(255,255,255,0.7)" fontSize="9">
                responsible, current state
              </text>
              <text x="300" y="335" fill="rgba(255,255,255,0.7)" fontSize="9">
                (active / quarantined / disposed).
              </text>

              {/* Schedule group */}
              <rect
                x="540"
                y="265"
                width="220"
                height="80"
                rx="6"
                fill="rgba(251,191,36,0.06)"
                stroke="rgba(251,191,36,0.2)"
                strokeWidth="1"
              />
              <text
                x="650"
                y="285"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                SCHEDULE + HISTORY
              </text>
              <text x="550" y="305" fill="rgba(255,255,255,0.7)" fontSize="9">
                Last test, next due, link to
              </text>
              <text x="550" y="320" fill="rgba(255,255,255,0.7)" fontSize="9">
                full per-item test history.
              </text>
              <text x="550" y="335" fill="rgba(255,255,255,0.7)" fontSize="9">
                Drives scheduling + drift detection.
              </text>

              {/* Bottom caption */}
              <rect
                x="40"
                y="370"
                width="720"
                height="80"
                rx="8"
                fill="rgba(251,191,36,0.06)"
                stroke="rgba(251,191,36,0.2)"
                strokeWidth="1"
              />
              <text x="400" y="395" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                IET CoP 5th Ed. Chapter 16 — the register is the basis for planning and recording.
              </text>
              <text x="400" y="412" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                Disposed rows stay on the register, marked DISPOSED, retained for the limitation
                period.
              </text>
              <text
                x="400"
                y="432"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                If it is not on the register, it did not get tested.
              </text>
            </svg>
          </div>

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The if-it-is-not-on-the-register rule</ContentEyebrow>

          <ConceptBlock
            title="Test rounds reconcile against the register — items missing from the register are invisible"
            plainEnglish="The register is the master list against which testing is planned and reconciled. The tester works through the register, ticking off items as tested. Anything not on the register is invisible to that process and never gets tested."
            onSite="The most common cause of untested equipment is not laziness — it is drift between the physical estate and the register."
          >
            <p>
              The principle is simple but consequential. A PAT round runs from the register: the
              tester is given a list of items due for test, locates each, tests it, records the
              result against its asset ID. At the end of the round, the register shows everything
              tested. The duty holder gets a clean summary.
            </p>
            <p>
              The failure mode is also simple. Items are added to the workplace over time — casual
              purchases, employee bring-ins, project deliveries, hire returns, equipment moved
              between sites. Without an explicit process for adding new items to the register, those
              items never appear on a tester\'s list, and so never get tested. The register and the
              physical reality drift apart.
            </p>
            <p>The mitigations are procedural:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Register-first procurement:</strong> any new electrical item entering the
                workplace is logged to the register before it is put into use. Procurement and
                facilities own this jointly.
              </li>
              <li>
                <strong>Periodic physical audit:</strong> typically annually, walk the estate and
                reconcile what is physically present against the register. The gap is the drift.
              </li>
              <li>
                <strong>User-side reporting:</strong> a clear way for users to flag &ldquo;new kit
                here&rdquo; — a form, an email, a QR code that creates a register row.
              </li>
              <li>
                <strong>Hire / return discipline:</strong> hired equipment is logged on receipt with
                hire-in status; returned equipment is logged out (and the register row either
                archived or, for items the duty holder owns, kept as ACTIVE under a new location).
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Treating the register as a static list maintained by IT or facilities only"
            whatHappens="The register is a spreadsheet maintained by one person in facilities. New equipment arrives but the user does not know the register exists. After 18 months the register is 30 % out of date, with new items uncatalogued and disposed items still ACTIVE. The PAT contractor tests what the register says is there; everything not on the list is missed. An HSE inspection asks for a register-vs-physical audit and finds the gap."
            doInstead="Make register entry part of the equipment-receiving process. Whoever uncrates new electrical equipment fills in (or triggers) a register row before the kit goes into use. Run an annual physical audit to catch drift. Treat the register as a live system, not an archive."
          />

          <Scenario
            title="A site walk-around discovers 80 unregistered items"
            situation="An annual audit walks the workplace and counts physical items vs the register. The register has 350 active rows. The physical count is 430. The 80 unregistered items include laptop chargers brought from home, three printers from a recent project, two electric heaters left over from winter, and a coffee machine someone donated to the staff room."
            whatToDo="For each unregistered item: decide whether it is permitted (chargers from home — yes, register or remove; donated coffee machine — yes, register; project surplus — yes, register and reassign or dispose). Test each item now (the audit has identified them as untested). Add a row to the register for each retained item. For items prohibited by policy (e.g. personal heaters in offices), remove them and document the removal. Update the procurement / receiving process so the gap does not reopen."
            whyItMatters="The 80-item gap means the duty holder has been operating a regime that demonstrably failed to cover 19 % of the physical estate. The 'reasonably practicable' defence on those items is undermined for the period they were unregistered. The audit reveals the drift, the corrective action closes it, and the documented process prevents recurrence."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Hired, loaned, shared and personal equipment</ContentEyebrow>

          <ConceptBlock
            title="EAWR follows control, not ownership"
            plainEnglish="The duty under EAWR Reg 4(2) attaches to whoever has control of the electrical system in use. Ownership is irrelevant. Hired, loaned, shared and personal equipment all engage the duty holder\'s record-keeping responsibilities."
            onSite="A tool you hired this morning that arrives with a hire firm certificate is still your responsibility on site. Verify the cert, accept-or-re-test, log on the register."
          >
            <p>Four equipment-source patterns and how they are handled:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Hired equipment (short-term):</strong> verify the hire firm\'s in-service
                test certificate on receipt. If the certificate is acceptable (in date, from a
                competent test regime, with numerical results), accept it and log the row as ON HIRE
                IN with the hire reference and dates. If not acceptable, re-test and log normally.
                On return, mark the row HIRE RETURNED with date.
              </li>
              <li>
                <strong>Loaned equipment (between businesses):</strong> handle as for hired, except
                the loan agreement should explicitly cover the test status of the equipment and
                where the records live during the loan period.
              </li>
              <li>
                <strong>
                  Shared equipment (between sites or departments within the same duty holder):
                </strong>{' '}
                the register row carries a current-location field that is updated when the item
                moves. Test history follows the item, not the location.
              </li>
              <li>
                <strong>Personal equipment (employees bringing their own kit):</strong> two
                acceptable policies. (a) Personal equipment is permitted, in which case it is tested
                by the duty holder, labelled, and registered — extending the regime over it. (b)
                Personal equipment is prohibited, in which case the policy is documented,
                communicated, and enforced. An undocumented &ldquo;we don\'t test those&rdquo; is a
                gap.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Accepting a hire firm\'s &ldquo;PAT cert&rdquo; without verification"
            whatHappens="A site supervisor hires a 110 V site transformer. The hire firm provides a one-line certificate: 'PAT tested, in date, ref H-2241'. The supervisor accepts it without looking. Three weeks later the transformer fails on site, an apprentice gets a shock, and the HSE investigation asks for the test record. The hire firm\'s 'cert' has no numerical results, no tester name, no instrument ID — and the duty holder accepted it as compliant evidence."
            doInstead="Treat the hire firm\'s test cert with the same scrutiny as your own records. Numerical results, tester ID, instrument ID, calibration. If the cert is thin, re-test the equipment on receipt — quicker than dealing with the consequences of accepting a worthless cert. Build the verification step into the hire-in process."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Asset IDs — the load-bearing column</ContentEyebrow>

          <ConceptBlock
            title="One physical item, one unique ID — even where items are identical"
            plainEnglish="The asset ID is the unique key that links the physical item to its records. Two items sharing one ID is the same defect as two records sharing one item: traceability is broken."
          >
            <p>Asset ID format is the duty holder\'s choice, but with practical constraints:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Unique:</strong> never re-used. When an item is disposed, its ID retires
                with it; new items get new IDs. Re-using IDs creates audit confusion years later.
              </li>
              <li>
                <strong>Stable:</strong> the format does not change across the lifetime of the
                register. If you start with EM-0001 you do not later switch to EM-A-0001 and migrate
                everyone. Stability is what makes historical records cross-reference.
              </li>
              <li>
                <strong>Short enough to fit on a label:</strong> 6 to 10 characters typically. Long
                IDs do not fit on small labels and tempt people to abbreviate, breaking the
                uniqueness.
              </li>
              <li>
                <strong>Optionally encoded:</strong> some duty holders encode location or class into
                the ID (e.g. IT-PRT-042 = printer #42). Useful for human reading; not required.
              </li>
              <li>
                <strong>QR-able:</strong> if labels carry QR codes, the asset ID encoded in the QR
                resolves directly to the register row.
              </li>
            </ul>
            <p>
              Two identical kettles get two asset IDs. They will accumulate different histories over
              time (different usage, different damage, different failure modes), and the audit trail
              has to follow each individually. The temptation to share an ID for identical items is
              the temptation to lose the individual history.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Retiring an asset — disposed but not deleted</ContentEyebrow>

          <ConceptBlock
            title="Disposal is a status change, not a deletion"
            plainEnglish="When an asset is disposed of, the register row is marked DISPOSED with the disposal date. The row, the test history, and any incident records associated with the item are retained for the limitation period. Never delete."
            onSite="A 'tidy' register that deletes disposed rows is a register that has destroyed its own evidential record."
          >
            <p>The disposal workflow:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Decision and authorisation.</strong> Equipment is disposed of for a reason —
                failure, end of life, redundancy. The reason is recorded. Authorisation (typically
                the responsible department / line manager) is recorded.
              </li>
              <li>
                <strong>Physical disposal.</strong> The equipment leaves the workplace via the
                appropriate route (WEEE recycling, donation, scrapping). For failed items, the plug
                is typically cut off as a final safeguard against re-use.
              </li>
              <li>
                <strong>Status change in the register.</strong> The row status is set to DISPOSED,
                with the disposal date and the disposal route. The location field is updated to
                &ldquo;Disposed&rdquo; or similar.
              </li>
              <li>
                <strong>Label retirement.</strong> If the equipment label is on a label-retention
                regime (some duty holders retain labels post-disposal as part of the asset history),
                record that. Otherwise the label leaves with the equipment.
              </li>
              <li>
                <strong>Retention.</strong> The row stays on the register for the retention period —
                typically at least 6 years post-disposal, longer where the item was incident-
                involved or where sector retention is longer.
              </li>
            </ol>
            <p>
              The register grows over time. Rows accumulate as new items come in and old items go
              out. Filter by status when working live (ACTIVE, QUARANTINED, ON HIRE IN), and by full
              history when running audits or responding to claims. The DISPOSED rows are never the
              day-to-day burden — they are the evidential file.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Integration with maintenance management systems</ContentEyebrow>

          <ConceptBlock
            title="From spreadsheet to live system — when integration earns its keep"
            plainEnglish="A spreadsheet works for a few hundred items. Beyond that, integration with a CAFM / CMMS turns the register into a live system: due dates create work orders, results close them, failures escalate as faults."
          >
            <p>The integration pattern:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Asset register feeds the CMMS asset master.</strong> Each register row is an
                asset in the CMMS. The asset ID is the same key in both systems.
              </li>
              <li>
                <strong>Next-test-due dates generate work orders.</strong> The CMMS creates a work
                order N days before the due date. The PAT round is the work-order list.
              </li>
              <li>
                <strong>Test results close work orders.</strong> When the tester completes the test,
                the result is logged against the work order. The CMMS updates the asset record with
                the new last-test-date and recalculates the next-test-due.
              </li>
              <li>
                <strong>Failures generate fault tickets.</strong> A fail closes the test work order
                with a fail outcome and creates a fault ticket — repair workflow, retest workflow,
                or disposal workflow.
              </li>
              <li>
                <strong>Reporting is automatic.</strong> Compliance dashboards (% on time, overdue
                items, failure rate by category) come from the system rather than from manual
                reconciliation.
              </li>
            </ul>
            <p>
              Without integration the same outcomes are achievable manually, but every step is a
              transcription point and a drift source. With integration the asset register is a
              living management tool rather than a backwards-looking record. For estates above a few
              hundred items, the integration earns its keep within months.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'The register is the master list. Columns: unique asset ID, description, class, location, owner, status, last/next test, link to history, comments.',
              'If it is not on the register, it did not get tested. The register is the planning and reconciliation list — items missing from it are invisible to the test process.',
              "EAWR follows control, not ownership. Hired, loaned, shared and personal equipment all belong on the register if they are in use under the duty holder's control.",
              'One physical item, one unique asset ID. Identical items get distinct IDs. Shared IDs collapse the audit trail.',
              'Verify hire firm test certs on receipt — numerical results, tester, instrument, calibration. Accept-or-re-test, then log to the register.',
              'Disposal is a status change, not a deletion. DISPOSED row + date + retain for the limitation period (typically at least 6 years).',
              'Periodic physical audit (typically annual) catches drift between register and reality. The gap is the management failure.',
              'Beyond a few hundred items, integration with CAFM / CMMS turns the register into a live management system: due dates → work orders, results close, failures escalate.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'Is an asset register a legal requirement?',
                answer:
                  'The register is not named in EAWR or HSAW. IET CoP 5th Ed. Chapter 16 recommends it as the basis for planning and recording in-service inspection and testing. In practice, the register is the only practical way to demonstrate to HSE that your testing covers all the equipment in use — without it, you cannot show what was supposed to be tested versus what was tested. The recommendation is essentially mandatory for any estate larger than a handful of items.',
              },
              {
                question:
                  'Can I keep the asset register in a spreadsheet, or do I need a dedicated system?',
                answer:
                  'For small estates (up to a few hundred items), a structured spreadsheet is fine — provided it has the columns IET CoP 5th Ed. Chapter 16 expects, is accessible only to authorised users, and is backed up. Above that, manual maintenance becomes the failure point: drift, transcription error, and missed retest dates. A CAFM / CMMS or a dedicated PAT management system pays back quickly at scale.',
              },
              {
                question: 'How do I assign asset IDs to a fleet I have inherited with no IDs?',
                answer:
                  'Pick a stable format (e.g. EM-XXXX), allocate sequentially as you walk and label, and capture the description, class, location and any visible test-status information at the same time. Test the items as you go (or schedule them straight into a test round with priority by perceived risk). The first cycle is the heavy lift; subsequent cycles benefit from the asset IDs being in place.',
              },
              {
                question:
                  'A piece of equipment goes between two sites regularly. Two register rows or one?',
                answer:
                  "One row, with a current-location field that is updated when the item moves. The asset history follows the item across locations; splitting it across two rows splits the history. For homeworkers' loaned equipment that moves between home and office, the same applies: one row, location updated, with appropriate data-protection considerations on the home address.",
              },
              {
                question:
                  'A piece of equipment was tested but never added to the register because of an admin error. Found two years later. What now?',
                answer:
                  'Add it to the register now, with the asset ID assigned, and back-fill the test history from the records. The register now reflects reality. The two-year gap is documented as an admin-process learning point — and the procurement / receiving process is reviewed so it does not happen again. The audit-able fact is that the item was in fact tested; the recording lapse is a process defect, not a regime failure.',
              },
              {
                question:
                  'A user says &ldquo;test my equipment less often, it is hardly used&rdquo;. How do I respond?',
                answer:
                  'IET CoP 5th Ed. Chapter 16 + Section 7 (test-frequency review) make the response data-driven: usage pattern, environment, equipment class, and historical failure rate determine the interval. If the equipment is genuinely lightly used and has a clean failure history in a low-risk environment, an extended interval can be justified — but documented as a per-item or per-category decision, not as an ad-hoc favour. Section 4 of this module covers the methodology.',
              },
              {
                question: 'Should the asset register be available to users, or is it restricted?',
                answer:
                  'Restricted to people who need it. The register is internal management data; for assets carrying personal data (assignees, home addresses), data-protection access controls apply. Users do not need the whole register — they need to know whether their specific equipment is in date, which the label answers. A user-facing portal showing only their own assigned equipment is a sensible compromise.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Asset register — Module 5.3" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/pat-testing-module-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 5
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/pat-testing-module-5-section-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.4 Retest period planning
              </div>
            </button>
          </div>

          <div className="hidden">
            <Activity />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default PATTestingModule5Section3;
