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
    id: 'fam2-s5-categories',
    question:
      'BS 5839-1:2025 (clause 30 commentary) recognises four categories of false alarm. What are they, and why does the categorisation matter?',
    options: [
      'Only one category.',
      'FOUR categories. (1) EQUIPMENT false alarms — caused by detector or panel faults, ageing, drift. Fixed by service or replacement. (2) ENVIRONMENTAL false alarms — caused by smoke-like phenomena (steam, aerosol, dust, cooking fumes) reaching detectors and triggering legitimate sensitivity. Fixed by detector relocation, mode change (AND-logic), or environmental control. (3) MALICIOUS false alarms — deliberate operation of MCPs without fire intent, typically by pranking pupils or vandalism. Fixed by Type B / transparent covers / staff training / engagement. (4) UNWANTED fire alarm signals — system operated correctly but in a scenario the user did not want (legitimate cooking, hot work without notification). Fixed by procedural changes, notification protocols, and detector siting/mode review. The categorisation matters because each category has a different remediation.',
      'Two categories.',
      'They are all the same.',
    ],
    correctIndex: 1,
    explanation:
      'BS 5839-1:2025 keeps the four categories used in the 2017 edition but moves them from the terms-and-definitions section into the commentary on clause 30. The 2025 edition also recommends that the commissioning organisation EXPLAIN the categories to the user — so the user can correctly assign each event to a category and direct the right remediation.',
  },
  {
    id: 'fam2-s5-trigger',
    question:
      'Per BS 5839-1:2025 clause 31, what false-alarm rate triggers a PRELIMINARY investigation, and what triggers an IN-DEPTH investigation?',
    options: [
      'Same threshold for both.',
      'PRELIMINARY investigation when the rate of false alarms over the previous 12 months exceeds FOUR FALSE ALARMS PER 100 DETECTORS PER ANNUM. IN-DEPTH investigation when the rate exceeds FIVE FALSE ALARMS PER 100 DETECTORS PER ANNUM AND the system has more than 40 automatic fire detectors. Both thresholds are calculated at every annual service visit and recorded in the system logbook. The trigger points have NOT changed in the 2025 revision but the calculation framework is brought forward to the start of clause 31 to make the obligation visible. The 4-per-100 / 5-per-100 thresholds are calibrated against industry data; below 4-per-100 the system is performing within reasonable expectations, above 5-per-100 something systematic is likely wrong.',
      '10 per 100 detectors only.',
      'No quantitative threshold.',
    ],
    correctIndex: 1,
    explanation:
      'The 4-per-100 preliminary and 5-per-100 in-depth (>40 detectors) thresholds are the load-bearing numbers of clause 31. They convert "the system has too many false alarms" from a subjective judgement to an auditable trigger point. Calculate at every annual service. Document the rate, the categorisation of each FA, and the remediation plan if a threshold is exceeded.',
  },
  {
    id: 'fam2-s5-investigate',
    question:
      'BS 5839-1:2025 clause 29.6 introduces a new requirement on the COMMISSIONING / HANDOVER organisation regarding false-alarm investigation. What is it?',
    options: [
      'Investigate every alarm themselves.',
      'The commissioning / handover organisation should ADVISE THE USER to arrange for suitable investigation and, if appropriate, action to be taken on EVERY OCCASION that a false alarm occurs. This is a NEW recommendation in 2025 — the 2017 edition required investigation only when thresholds were breached. The 2025 edition recommends that EVERY false alarm be investigated. The investigation could include managerial changes within the building, modifications to the fire detection and fire alarm system, or further separate investigation by the maintaining organisation. The recommendation puts a positive duty on the commissioner to inform the user, and on the user to act.',
      'Investigate only after 50 false alarms.',
      'Wait for the FRS to investigate.',
    ],
    correctIndex: 1,
    explanation:
      "Clause 29.6 is one of the most operationally significant 2025 additions. The 2017 edition's threshold-only approach allowed users to ignore individual events as long as the rate stayed under the trigger. The 2025 edition expects every event to be investigated and categorised; the trigger thresholds (4/100 preliminary, 5/100 in-depth) become the SECONDARY filter for systematic problems, not the only investigation gate. The change reflects FRS pressure to reduce attendance to repeated unwanted signals.",
  },
  {
    id: 'fam2-s5-multi',
    question:
      'BS 5839-1:2025 places greater emphasis on multi-sensor detectors as a measure to limit false alarms. In what scenarios specifically does the standard recommend multi-sensor in preference to point smoke detection?',
    options: [
      'Only in sleeping areas.',
      'Where point smoke detectors may present a HIGHER RISK of false alarms (clause 33). Typical scenarios: corridors near kitchens or kitchen-vent risers (cooking aerosol, steam); housekeeping or cleaning bays (aerosol, dust raised by vacuuming); hairdressing salons (aerosol propellant); printing rooms (paper-dust); plant rooms with intermittent steam release; bedrooms in HMOs or hotels (aerosol from showers, cooking on en-suite hobs); and any area with FA history. The multi-sensor in AND-logic mode requires both smoke AND heat to confirm before alarming, suppressing single-stimulus false alarms. Annex D (selection and application of fire detectors) provides detailed guidance. The 2025 emphasis reflects the maturation of multi-sensor technology and the reduction in price differential vs single-sensor optical.',
      'Only in offices.',
      'Multi-sensor never reduces false alarms.',
    ],
    correctIndex: 1,
    explanation:
      'The multi-sensor preference is one of the structural changes in 2025. Point smoke detection in known-FA-risk areas is now considered second-best practice; multi-sensor in AND-logic is the design default for those areas. Combined with clause 20.11 documentation (record the type AND mode), the design intent is preserved through commissioning and maintenance.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'How many categories of false alarm does BS 5839-1:2025 recognise (clause 30 commentary)?',
    options: [
      'Two.',
      'FOUR categories: (1) EQUIPMENT false alarms (detector/panel fault, drift); (2) ENVIRONMENTAL false alarms (steam, aerosol, dust, cooking fumes); (3) MALICIOUS false alarms (deliberate MCP operation without fire); (4) UNWANTED fire alarm signals (system operated correctly but in a non-fire scenario the user did not want). Each category has a different remediation. The 2025 edition moved the categories from the terms section into the clause 30 commentary and recommends the commissioning org EXPLAIN the categories to the user so each event is correctly categorised.',
      'One.',
      'Six.',
    ],
    correctAnswer: 1,
    explanation:
      'Equipment / environmental / malicious / unwanted. Each has a specific remediation pathway. The commissioning org explains the categories at handover; the user assigns each event to a category at the time of recording.',
  },
  {
    id: 2,
    question:
      'What rate of false alarms triggers a PRELIMINARY investigation under BS 5839-1:2025 clause 31?',
    options: [
      '1 per 100 detectors.',
      '4 per 100 detectors over the previous 12 months. The threshold is calculated at every annual service visit. If the rate exceeds 4 false alarms per 100 automatic fire detectors per annum, a preliminary investigation is recommended to identify systematic causes and remediation. The threshold has NOT changed in 2025; the framework is moved to clause 31 to make the trigger more visible.',
      '40 per 100.',
      '100 per 100.',
    ],
    correctAnswer: 1,
    explanation:
      'The 4-per-100 preliminary trigger is the first quantitative gate. Below 4-per-100 the system is performing within normal industry expectations; above it, something systematic likely needs attention.',
  },
  {
    id: 3,
    question:
      'What rate of false alarms triggers an IN-DEPTH investigation under BS 5839-1:2025 clause 31?',
    options: [
      'Same as preliminary.',
      '5 per 100 detectors over the previous 12 months, AND the system has MORE than 40 automatic fire detectors. The 5-per-100 threshold is the second gate. Combined with the >40-detector size threshold, it captures medium-to-large systems where the false alarm rate has crossed into territory that suggests fundamental design or operational issues. Below 40 detectors, in-depth investigation is not specifically triggered by clause 31, although the preliminary trigger (4/100) still applies.',
      '10 per 100, no size limit.',
      '100 per 100.',
    ],
    correctAnswer: 1,
    explanation:
      'The two-step (4-per-100 preliminary, 5-per-100 in-depth with >40 detectors) framework escalates investigation effort with the severity and the system size. Both thresholds appear unchanged in 2025 vs 2017; the 2025 framework is rationalised in clause 31 for clarity.',
  },
  {
    id: 4,
    question:
      'BS 5839-1:2025 clause 29.6 places a NEW positive duty on the commissioning organisation. What is it?',
    options: [
      'Investigate every alarm themselves.',
      'Advise the USER to arrange for suitable investigation and, if appropriate, action on EVERY occasion that a false alarm occurs. This is NEW in 2025 — the 2017 edition only required investigation when thresholds were breached. The 2025 edition expects every false alarm to be investigated and recorded. The commissioning organisation has a positive duty to make this expectation clear to the user at handover.',
      'Disable the system after every false alarm.',
      'Charge the user a fee.',
    ],
    correctAnswer: 1,
    explanation:
      'Clause 29.6 raises the bar — every false alarm investigated, not just when a threshold is breached. The shift reflects FRS pressure on call-out volumes and the maturation of monitoring technology that makes per-event investigation more feasible.',
  },
  {
    id: 5,
    question:
      'Why does BS 5839-1:2025 (clause 33) recommend multi-sensor detectors where point smoke detection has a higher risk of false alarms?',
    options: [
      'Multi-sensors are smaller.',
      'A multi-sensor in AND logic requires evidence from MORE THAN ONE sensing element before declaring alarm. A short-lived environmental event (steam, aerosol, dust) triggers only the optical element; the heat element does not respond, and the AND logic suppresses the false alarm. A real fire produces both smoke AND elevated heat; the multi-sensor responds. The result: materially fewer false alarms while preserving (or improving) real-fire response. Clause 33 explicitly recommends multi-sensor as a measure to limit unwanted alarms in known-FA-risk areas.',
      'Cost.',
      'Aesthetics.',
    ],
    correctAnswer: 1,
    explanation:
      'The multi-sensor + AND-logic combination is the design default for FA-risk areas in 2025. Annex D (Selection and application of fire detectors) gives detailed guidance. Clause 20.11 requires the operating mode to be recorded.',
  },
  {
    id: 6,
    question:
      'A new BS 5839-1:2025 recommendation involves a label or notice next to the CIE. What does it indicate, and why?',
    options: [
      'Manufacturer details.',
      'The 2025 edition recommends a NEW LABEL fixed on or adjacent to the CIE indicating that the system has an ACTIVE CONNECTION to the FRS via an ARC. Typical text: "FALSE ALARM NOTICE — This fire alarm has an active connection to the fire and rescue service. Contact telephone: [ARC telephone number]." The purpose: REMIND PREMISES MANAGEMENT — particularly contractors carrying out hot work, alarms tests, or maintenance — to NOTIFY THE ARC BEFORE undertaking any work that might trigger the alarm. Notification triggers the ARC to suppress FRS dispatch during the test window. The label addresses one of the most common preventable causes of unwanted fire signals: contractor work that triggers the alarm without ARC notification, leading to FRS attendance to a non-event.',
      'Capacity rating.',
      'IP rating.',
    ],
    correctAnswer: 1,
    explanation:
      'The "false alarm notice" label is one of the practical 2025 additions. It puts the ARC contact number at the panel where contractors and premises management see it — eliminating the "I did not know we had to phone" excuse for unnotified alarm tests.',
  },
  {
    id: 7,
    question:
      'Per BS 5839-1:2025, what information should the ARC be able to pass to the FRS on receipt of a fire signal?',
    options: [
      'Just the address.',
      'PREMISES TYPE (e.g. sleeping accommodation, school, hospital, industrial), and where practicable, the NATURE of the triggering device (smoke, heat, MCP, multi-sensor, sprinkler) and whether COINCIDENCE FILTERING is in place. The 2025 edition emphasises that the ARC should be provided with all relevant information about the premises so that this can be passed to the FRS at attendance. The information helps the FRS prioritise and prepare — knowing it is a sleeping-risk hotel changes the FRS response from knowing it is an unoccupied warehouse. The 2025 emphasis on premises type is a response to FRS call-challenging policies.',
      'Just the time.',
      'Just the panel make.',
    ],
    correctAnswer: 1,
    explanation:
      'FRS attendance protocols are increasingly driven by premises type and signal nature. The 2025 edition aligns BS 5839-1 with this — the ARC delivers not just "fire alarm" but "fire alarm at sleeping-risk hotel, smoke detector triggered, no coincidence". The richer signal supports faster, better-prioritised FRS response.',
  },
  {
    id: 8,
    question:
      'A maintenance organisation arrives at a building to do alarm-output testing. What MUST they do before triggering any alarm?',
    options: [
      'Nothing special.',
      'NOTIFY the ARC that the system is about to undergo a test. The ARC will then suppress FRS dispatch during the agreed test window (and confirm signals during the test if the test plan calls for it). Failure to notify produces an unwanted fire signal: the ARC receives the test trigger as a real fire, dispatches the FRS, and the FRS attends to a non-event — wasting FRS resource and potentially being charged back to the user. The 2025 false-alarm-notice label at the CIE was introduced specifically to remind everyone — contractors, maintenance, premises management — to make this notification.',
      'Disable the panel.',
      'Cut the cables.',
    ],
    correctAnswer: 1,
    explanation:
      'ARC notification before any work that could trigger the alarm is one of the most basic operational disciplines, and one of the most commonly skipped. The 2025 label at the CIE puts the reminder front and centre. Always notify; document the notification in the test record; close the loop with the ARC after the test.',
  },
  {
    id: 9,
    question:
      'A school has an FA rate of 6 per 100 detectors per annum. The school has 80 automatic fire detectors. What does clause 31 require?',
    options: [
      'Nothing.',
      'BOTH a preliminary AND an in-depth investigation. The rate (6 per 100) exceeds both thresholds: above 4 per 100 (preliminary trigger) and above 5 per 100 (in-depth trigger), AND the system has more than 40 detectors (the in-depth size criterion). The 2025 edition expects: (1) every individual FA investigated and categorised (clause 29.6); (2) preliminary investigation of trends and systematic causes (clause 31); (3) in-depth investigation of fundamental design or operational issues (clause 31). The output of the investigation feeds into a remediation plan — typically combining detector relocation/mode changes (multi-sensor AND-logic), MCP cover changes, staff/pupil engagement, and ARC-notification protocols.',
      'Disable the system.',
      'Reduce the detector count.',
    ],
    correctAnswer: 1,
    explanation:
      'The 6-per-100 rate is in the deep zone — above both thresholds in a system big enough to trigger the in-depth gate. The 2025 framework expects active management at this rate: every event categorised, trends analysed, fundamental issues addressed. The school in the example is heading for an FRS call-challenge or charge-back if remediation does not produce results.',
  },
  {
    id: 10,
    question:
      'What is "coincidence filtering" in the context of BS 5839-1 alarm signal transmission?',
    options: [
      'A form of noise reduction.',
      'A system feature that requires MORE THAN ONE detector to confirm a fire signal before transmitting an alarm to the ARC. With coincidence filtering active, a single detector triggering does not cause ARC notification (and therefore does not cause FRS attendance); only when a SECOND detector confirms is the alarm transmitted. The 2025 edition recommends that, where practicable, the alarm signal transmitted to the ARC should indicate whether coincidence filtering is in place — so the FRS knows the signal carries higher confidence than a single-detector trigger. Coincidence filtering reduces unwanted FRS attendances from single-stimulus events (one detector momentarily triggered by aerosol, dust or steam) without compromising response to real fires (where multiple detectors typically confirm rapidly).',
      'A power supply feature.',
      'A type of detector.',
    ],
    correctAnswer: 1,
    explanation:
      'Coincidence filtering is a key tool in modern false-alarm management. It is a system-level feature (panel programming) rather than a detector-level feature, and it interacts with detector siting and mode selection. The 2025 emphasis on signalling its presence to the ARC reflects FRS preference for higher-confidence signals.',
  },
];

const FireAlarmModule2Section5 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'False alarm management | Fire Alarm Module 2.5 | Elec-Mate',
    description:
      'BS 5839-1:2025 false-alarm management: four categories (equipment / environmental / malicious / unwanted), clause 29.6 every-event investigation, clause 31 thresholds (4/100 preliminary, 5/100 in-depth >40 detectors), clause 33 multi-sensor preference, ARC notification and the new false-alarm-notice label.',
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
            <ArrowLeft className="h-4 w-4" /> Module 2
          </button>

          <PageHero
            eyebrow="Module 2 · Section 5"
            title="False alarm management"
            description="BS 5839-1:2025 reorganises Section 3 of the standard into clauses 29-33 and tightens the false-alarm management framework. Every event investigated, multi-sensor preferred for FA-risk areas, ARC notification and the new false-alarm-notice label at the CIE."
            tone="yellow"
          />

          <TLDR
            points={[
              'Section 3 of BS 5839-1:2025 (Limitation of false alarms and unwanted fire alarm signals) is REORGANISED into five clauses: 29 (responsibility), 30 (categories and causes), 31 (investigation), 32 (design process), 33 (measures to limit FAs).',
              'Four FA categories — EQUIPMENT, ENVIRONMENTAL, MALICIOUS, UNWANTED — moved from terms section to clause 30 commentary; commissioning org EXPLAINS them to the user.',
              'NEW clause 29.6 — commissioning org should ADVISE THE USER to investigate EVERY false alarm. Previous edition only required investigation when thresholds breached.',
              'Clause 31 investigation thresholds (UNCHANGED in 2025): preliminary investigation > 4 FAs per 100 detectors per annum; in-depth investigation > 5 FAs per 100 detectors per annum AND > 40 automatic fire detectors.',
              'Clause 33 — greater emphasis on MULTI-SENSOR detectors where point smoke FA risk identified. Annex D (was Annex E) gives selection guidance.',
              'NEW false-alarm-notice label recommended at/adjacent to the CIE: "ACTIVE CONNECTION to the FRS via the ARC — Contact: [ARC tel]" — reminds contractors to NOTIFY the ARC before any test.',
              'Alarm transmission to ARC should now (where practicable) carry premises type, triggering device nature, and presence of coincidence filtering — supports FRS call-challenging and prioritisation.',
              'Heat detectors NO LONGER permitted in sleeping rooms for new L1/L2/L3 work (clause 14, see Section 1) — closes a known FA / fatality gap.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify the four BS 5839-1:2025 categories of false alarm (equipment, environmental, malicious, unwanted) and assign each event to the correct category',
              'Apply the NEW clause 29.6 every-event investigation duty: commissioning org advises user to investigate EVERY false alarm',
              'Apply the clause 31 quantitative thresholds: 4 per 100 preliminary; 5 per 100 in-depth (>40 detectors)',
              'Apply the clause 33 multi-sensor preference: specify multi-sensor in AND-logic for known FA-risk areas (kitchens, housekeeping, hairdressing, plant rooms)',
              'Recognise the NEW false-alarm-notice label recommendation at the CIE and ensure ARC contact number is displayed',
              'Apply ARC notification protocols before any system test or maintenance work; document notification in the test record',
              'Identify the 2025 alarm-transmission expectations (premises type, device nature, coincidence filtering) and ensure ARC delivers this to the FRS',
              'Audit existing systems against the 2025 false-alarm management framework and produce a remediation plan where thresholds are exceeded',
              'Connect false-alarm management to the wider clause 38 documentation regime (cause-and-effect matrix, system logbook, all variations recorded)',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Categories of false alarm — clause 30</ContentEyebrow>

          <ConceptBlock
            title="The four categories"
            plainEnglish="BS 5839-1:2025 recognises four categories of false alarm. Each has a different remediation pathway. The 2025 edition moves the categories from the terms-and-definitions section (where they sat in 2017) into the commentary on clause 30. The change emphasises that categorisation is an OPERATIONAL activity — every false-alarm event recorded in the logbook should be assigned to a category, and the categorisation drives the remediation."
          >
            <p>The four categories:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>EQUIPMENT false alarms.</strong> Caused by detector or panel faults, drift,
                ageing, contamination beyond drift-compensation range, water ingress, physical
                damage. The system itself is the source. Remediation: service, clean, replace,
                address the underlying defect.
              </li>
              <li>
                <strong>ENVIRONMENTAL false alarms.</strong> Caused by smoke-like phenomena reaching
                detectors and triggering legitimate sensitivity. Sources: steam (showers, kettles),
                cooking aerosol, aerosol propellant, dust raised by sweeping, vehicle exhaust,
                transient smoke from incinerators or chimneys. The DETECTOR responded correctly to a
                stimulus that resembled smoke — the issue is the stimulus, not the detector.
                Remediation: relocate detector away from the source; switch to multi-sensor in AND
                logic; upgrade ventilation; control the source.
              </li>
              <li>
                <strong>MALICIOUS false alarms.</strong> Deliberate operation of MCPs without fire
                intent. Typical: pranking pupils in schools, vandalism in public-access venues,
                disgruntled employees in commercial premises. Remediation: Type B MCPs, transparent
                covers (see Section 3), staff/pupil engagement, CCTV monitoring of MCPs, key-lock
                MCPs in selected areas.
              </li>
              <li>
                <strong>UNWANTED fire alarm signals.</strong> The system operated correctly but in a
                scenario the user did not want. Examples: legitimate cooking generating smoke that
                triggered an OK detector; hot work (welding, soldering) without ARC notification;
                planned works where alarm was supposed to be isolated but was not. Distinct from
                environmental — the SOURCE is a known and intended activity. The system did its job;
                the user did not manage the activity.
              </li>
            </ul>
            <p>
              The 2025 edition recommends that the commissioning organisation EXPLAIN the four
              categories to the user at handover, so the user can correctly categorise events and
              direct the right remediation. Without this explanation, users tend to default
              everything to "equipment" (blaming the system) or "environmental" (blaming the air) —
              both miss the malicious and unwanted categories which often have the most available
              remediation.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 30 commentary (categories of false alarms)"
            clause={
              <>
                The categories of false alarms have been moved from the terms and definitions to the
                commentary of clause 30. Whilst these have not changed from the previous revision it
                is now recommended that the commissioning/handover organisation explain to the user
                what they are and the differences between them to ensure that the user assigns the
                correct category of false alarm to every false alarm incident.
              </>
            }
            meaning="Categorisation is an OPERATIONAL discipline, not a definitional one. Every event in the logbook gets a category. The commissioning org's duty to explain the categories at handover ensures the user is equipped to do this correctly. Without proper categorisation, the data feeding clause 31 investigation triggers becomes noise."
          />

          <ConceptBlock
            title="Clause 29.6 — investigate EVERY event"
            plainEnglish="The 2025 edition introduces a new positive duty in clause 29.6: the commissioning / handover organisation should ADVISE THE USER to arrange for suitable investigation and, if appropriate, action to be taken on EVERY OCCASION that a false alarm occurs. This is a step beyond the 2017 edition, which required investigation only when threshold trigger points were exceeded. The 2025 expectation is that every event is investigated and categorised; trigger points become a SECONDARY filter for systematic problems."
          >
            <p>The clause 29.6 framework:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Every event investigated.</strong> No threshold for triggering the
                investigation duty. Every false alarm in the logbook gets some level of review —
                even if the conclusion is &quot;single isolated event, no action&quot;.
              </li>
              <li>
                <strong>The investigation level scales.</strong> A first-time event might warrant a
                quick categorisation and brief note. A repeated event in the same area or from the
                same detector warrants more depth. A clustered pattern (several events in a week)
                warrants attention from the maintaining organisation.
              </li>
              <li>
                <strong>Action where appropriate.</strong> Investigation may conclude no action is
                needed (the cause is identified, transient, and unlikely to recur). It may recommend
                managerial action (notify cleaners not to use aerosol near detector X),
                detector-level action (clean, relocate, change mode), or system-level action (review
                zone definitions, update cause-and-effect matrix).
              </li>
              <li>
                <strong>Logbook record.</strong> Every event, categorised and with investigation
                outcome, in the system logbook. The 2025 edition (clause 48) requires ALL variations
                to be in the logbook (not just &quot;major&quot; variations as in 2017); the same
                systematic recording applies to false alarms.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 29.6 (responsibility for limitation of false alarms)"
            clause={
              <>
                The commissioning/handover organization should advise the user to arrange for
                suitable investigation and, if appropriate, action to be taken on every occasion
                that a false alarm occurs. NOTE: This could, for example, comprise managerial
                changes within the building, modifications to the fire detection and fire alarm
                system, or further separate investigation by the organization that maintains the
                system.
              </>
            }
            meaning="Clause 29.6 is one of the most operationally significant 2025 additions. Every false alarm investigated; every event categorised; action where appropriate. The shift from threshold-only to event-by-event reflects FRS pressure on call-out volumes and the maturation of monitoring tooling that makes per-event review feasible. Existing maintenance contracts may need updating to capture this expectation."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          {/* False alarm decision tree diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              False alarm decision tree — categorise, investigate, remediate
            </h4>
            <svg
              viewBox="0 0 820 580"
              className="w-full h-auto"
              role="img"
              aria-label="Decision flowchart starting with a false alarm event, branching into the four categories (equipment, environmental, malicious, unwanted), each with associated remediation actions, and feeding into the clause 31 quantitative thresholds (4 per 100 preliminary, 5 per 100 in-depth) and the system logbook record."
            >
              {/* Root: FA event */}
              <rect
                x="320"
                y="20"
                width="180"
                height="44"
                rx="10"
                fill="#EF4444"
                stroke="white"
                strokeWidth="2"
              />
              <text x="410" y="40" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">
                FALSE ALARM EVENT
              </text>
              <text x="410" y="56" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5">
                log immediately · clause 29.6
              </text>

              {/* Branch lines down to 4 categories */}
              <line
                x1="410"
                y1="64"
                x2="410"
                y2="100"
                stroke="rgba(255,255,255,0.55)"
                strokeWidth="1.5"
              />
              <line
                x1="120"
                y1="100"
                x2="700"
                y2="100"
                stroke="rgba(255,255,255,0.55)"
                strokeWidth="1.5"
              />
              <line
                x1="120"
                y1="100"
                x2="120"
                y2="130"
                stroke="rgba(255,255,255,0.55)"
                strokeWidth="1.5"
              />
              <line
                x1="313"
                y1="100"
                x2="313"
                y2="130"
                stroke="rgba(255,255,255,0.55)"
                strokeWidth="1.5"
              />
              <line
                x1="507"
                y1="100"
                x2="507"
                y2="130"
                stroke="rgba(255,255,255,0.55)"
                strokeWidth="1.5"
              />
              <line
                x1="700"
                y1="100"
                x2="700"
                y2="130"
                stroke="rgba(255,255,255,0.55)"
                strokeWidth="1.5"
              />

              {/* Category 1 - Equipment */}
              <rect
                x="40"
                y="130"
                width="160"
                height="56"
                rx="8"
                fill="rgba(168,85,247,0.12)"
                stroke="#A855F7"
                strokeWidth="1.5"
              />
              <text
                x="120"
                y="148"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="11"
                fontWeight="bold"
              >
                EQUIPMENT
              </text>
              <text x="120" y="164" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                drift, fault, ageing,
              </text>
              <text x="120" y="176" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                contamination
              </text>

              <rect
                x="40"
                y="200"
                width="160"
                height="80"
                rx="8"
                fill="rgba(168,85,247,0.05)"
                stroke="rgba(168,85,247,0.4)"
                strokeWidth="1"
              />
              <text
                x="120"
                y="218"
                textAnchor="middle"
                fill="rgba(168,85,247,0.85)"
                fontSize="9.5"
                fontWeight="bold"
              >
                remediation
              </text>
              <text x="120" y="234" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                service, clean
              </text>
              <text x="120" y="248" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                replace device
              </text>
              <text x="120" y="262" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                address fault
              </text>
              <text x="120" y="276" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                at next service
              </text>

              {/* Category 2 - Environmental */}
              <rect
                x="233"
                y="130"
                width="160"
                height="56"
                rx="8"
                fill="rgba(34,211,238,0.12)"
                stroke="#22D3EE"
                strokeWidth="1.5"
              />
              <text
                x="313"
                y="148"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="11"
                fontWeight="bold"
              >
                ENVIRONMENTAL
              </text>
              <text x="313" y="164" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                steam, aerosol, dust,
              </text>
              <text x="313" y="176" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                cooking fumes
              </text>

              <rect
                x="233"
                y="200"
                width="160"
                height="80"
                rx="8"
                fill="rgba(34,211,238,0.05)"
                stroke="rgba(34,211,238,0.4)"
                strokeWidth="1"
              />
              <text
                x="313"
                y="218"
                textAnchor="middle"
                fill="rgba(34,211,238,0.85)"
                fontSize="9.5"
                fontWeight="bold"
              >
                remediation
              </text>
              <text x="313" y="234" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                multi-sensor AND
              </text>
              <text x="313" y="248" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                relocate detector
              </text>
              <text x="313" y="262" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                control source
              </text>
              <text x="313" y="276" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                clause 33
              </text>

              {/* Category 3 - Malicious */}
              <rect
                x="427"
                y="130"
                width="160"
                height="56"
                rx="8"
                fill="rgba(251,191,36,0.12)"
                stroke="#FBBF24"
                strokeWidth="1.5"
              />
              <text
                x="507"
                y="148"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                MALICIOUS
              </text>
              <text x="507" y="164" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                deliberate MCP
              </text>
              <text x="507" y="176" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                no fire intent
              </text>

              <rect
                x="427"
                y="200"
                width="160"
                height="80"
                rx="8"
                fill="rgba(251,191,36,0.05)"
                stroke="rgba(251,191,36,0.4)"
                strokeWidth="1"
              />
              <text
                x="507"
                y="218"
                textAnchor="middle"
                fill="rgba(251,191,36,0.85)"
                fontSize="9.5"
                fontWeight="bold"
              >
                remediation
              </text>
              <text x="507" y="234" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                Type B MCPs
              </text>
              <text x="507" y="248" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                transparent covers
              </text>
              <text x="507" y="262" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                CCTV / engagement
              </text>
              <text x="507" y="276" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                staff training
              </text>

              {/* Category 4 - Unwanted */}
              <rect
                x="620"
                y="130"
                width="160"
                height="56"
                rx="8"
                fill="rgba(239,68,68,0.12)"
                stroke="rgba(239,68,68,0.85)"
                strokeWidth="1.5"
              />
              <text
                x="700"
                y="148"
                textAnchor="middle"
                fill="rgba(239,68,68,0.95)"
                fontSize="11"
                fontWeight="bold"
              >
                UNWANTED
              </text>
              <text x="700" y="164" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                correct response to
              </text>
              <text x="700" y="176" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                non-fire activity
              </text>

              <rect
                x="620"
                y="200"
                width="160"
                height="80"
                rx="8"
                fill="rgba(239,68,68,0.05)"
                stroke="rgba(239,68,68,0.4)"
                strokeWidth="1"
              />
              <text
                x="700"
                y="218"
                textAnchor="middle"
                fill="rgba(239,68,68,0.85)"
                fontSize="9.5"
                fontWeight="bold"
              >
                remediation
              </text>
              <text x="700" y="234" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                hot-work permit
              </text>
              <text x="700" y="248" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                ARC notification
              </text>
              <text x="700" y="262" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                isolation procedure
              </text>
              <text x="700" y="276" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                user training
              </text>

              {/* Lines from each category to thresholds box */}
              <line
                x1="120"
                y1="280"
                x2="120"
                y2="320"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1"
                strokeDasharray="3,2"
              />
              <line
                x1="313"
                y1="280"
                x2="313"
                y2="320"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1"
                strokeDasharray="3,2"
              />
              <line
                x1="507"
                y1="280"
                x2="507"
                y2="320"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1"
                strokeDasharray="3,2"
              />
              <line
                x1="700"
                y1="280"
                x2="700"
                y2="320"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1"
                strokeDasharray="3,2"
              />
              <line
                x1="120"
                y1="320"
                x2="700"
                y2="320"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1"
                strokeDasharray="3,2"
              />
              <line
                x1="410"
                y1="320"
                x2="410"
                y2="350"
                stroke="rgba(255,255,255,0.55)"
                strokeWidth="1.5"
              />

              {/* Trend analysis - clause 31 thresholds */}
              <rect
                x="170"
                y="350"
                width="480"
                height="80"
                rx="10"
                fill="rgba(168,85,247,0.08)"
                stroke="#A855F7"
                strokeWidth="1.5"
              />
              <text
                x="410"
                y="372"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="12"
                fontWeight="bold"
              >
                CLAUSE 31 — TREND ANALYSIS (annual service)
              </text>
              <text x="410" y="392" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">
                rate &gt; 4 per 100 detectors / 12 months → PRELIMINARY investigation
              </text>
              <text x="410" y="408" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">
                rate &gt; 5 per 100 AND system &gt; 40 detectors → IN-DEPTH investigation
              </text>
              <text x="410" y="423" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                thresholds unchanged in 2025; framework rationalised in clause 31
              </text>

              {/* Logbook box */}
              <line
                x1="410"
                y1="430"
                x2="410"
                y2="460"
                stroke="rgba(255,255,255,0.55)"
                strokeWidth="1.5"
              />
              <rect
                x="200"
                y="460"
                width="420"
                height="50"
                rx="10"
                fill="rgba(34,211,238,0.08)"
                stroke="#22D3EE"
                strokeWidth="1.5"
              />
              <text
                x="410"
                y="482"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="11"
                fontWeight="bold"
              >
                SYSTEM LOGBOOK (Annex H)
              </text>
              <text x="410" y="500" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                date · zone · device · category · investigation · action · ALL variations recorded
                (clause 48)
              </text>

              {/* Side note - false alarm notice */}
              <rect
                x="40"
                y="540"
                width="740"
                height="36"
                rx="8"
                fill="rgba(251,191,36,0.06)"
                stroke="rgba(251,191,36,0.4)"
                strokeWidth="1"
              />
              <text
                x="410"
                y="557"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                NEW 2025 — false-alarm-notice label at the CIE
              </text>
              <text x="410" y="571" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                &quot;Active connection to FRS via ARC — Contact: [tel]&quot; · contractors notify
                ARC before any test
              </text>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>Investigation thresholds — clause 31</ContentEyebrow>

          <ConceptBlock
            title="The 4-per-100 and 5-per-100 quantitative gates"
            plainEnglish="Clause 31 retains the trigger-point framework from the 2017 edition (rationalised into the new clause 31 structure) for systematic investigation of false-alarm patterns. The thresholds are evaluated at every annual service visit and recorded in the system logbook. Two trigger levels: preliminary investigation when the rate exceeds 4 false alarms per 100 detectors per annum; in-depth investigation when the rate exceeds 5 per 100 AND the system has more than 40 automatic fire detectors."
          >
            <p>The two-step framework:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Preliminary investigation (&gt; 4/100/year).</strong> Triggered when the
                false-alarm rate exceeds 4 per 100 detectors per annum. Identifies systematic causes
                — repeated events in the same zone, recurring environmental sources, drifty
                detectors, malicious-activation patterns. Produces a remediation plan and a
                follow-up review at the next service.
              </li>
              <li>
                <strong>In-depth investigation (&gt; 5/100/year AND &gt; 40 detectors).</strong>
                Triggered when the rate exceeds 5 per 100 AND the system has more than 40 detectors.
                The medium-to-large system has crossed into territory suggesting fundamental design
                or operational issues. The investigation looks at design assumptions, detector
                type/mode, zone definitions, cause-and-effect matrix, user-management practices, and
                ARC-notification protocols. May produce significant remediation including
                detector-type changes (move to multi-sensor), MCP changes (Type B + transparent
                covers), or zone re-design.
              </li>
              <li>
                <strong>Sub-40-detector systems.</strong> The in-depth size threshold (&gt; 40
                detectors) means small systems do not formally trigger in-depth investigation under
                clause 31, even at high FA rates. The preliminary trigger (4/100) still applies.
                Small-system FA management is typically handled by service organisations directly
                without formal in-depth processes.
              </li>
              <li>
                <strong>The annual calculation.</strong> At every annual service visit, calculate
                the FA rate over the previous 12 months. The maintaining organisation typically
                computes this from the logbook; the user retains responsibility but rarely has the
                tooling. The number, the categorisation breakdown, and any remediation plan are
                recorded in the logbook and the annual service certificate.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 31 (investigation of false alarms)"
            clause={
              <>
                The investigation of false alarms has been simplified to bring the trigger points
                for a preliminary investigation and in-depth investigation in line with the false
                alarm calculation recommended to be carried out every service visit. These trigger
                points have not changed in the new 2025 revision. They are now expressed as
                preliminary investigation when the rate of false alarms over the previous 12 months
                exceeds four false alarms per 100 detectors per annum. With an in-depth
                investigation recommended for systems with more than 40 automatic fire detectors
                when the average rate of false alarms exceeds five false alarms per 100 detectors
                per annum.
              </>
            }
            meaning="The 4-per-100 / 5-per-100 thresholds are the auditable trigger points. The 2025 edition rationalises the framework into clause 31 (and aligns with the every-event clause 29.6 duty) but does NOT change the numbers. Calculate at every annual service. Document the rate and the categorisation breakdown. Where a threshold is exceeded, produce a remediation plan with named actions, owners and timescales."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Remediation — clause 33 measures</ContentEyebrow>

          <ConceptBlock
            title="The 2025 emphasis on multi-sensor"
            plainEnglish="Clause 33 of BS 5839-1:2025 lists measures to limit false alarms and prevent unwanted fire alarm signals. The 2025 edition places GREATER EMPHASIS on the use of multi-sensor detectors as the design default for areas where point smoke detectors present a higher risk of false alarms. The shift reflects (a) the maturation of multi-sensor technology, (b) the closing of the cost differential vs single-sensor optical, and (c) accumulated evidence that multi-sensor in AND-logic mode delivers comparable or better real-fire response with materially fewer false alarms."
          >
            <p>The clause 33 measures (typical):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>MULTI-SENSOR detectors in known FA-risk areas.</strong> Corridors near
                kitchens, housekeeping bays, hairdressing salons, plant rooms with steam release,
                bedrooms with en-suite hobs. Configure to AND logic (require BOTH smoke and heat).
                Document mode under clause 20.11.
              </li>
              <li>
                <strong>Detector relocation away from environmental sources.</strong> Detectors
                within 1.5 m of cooking fume vents, wall fans extracting steam, or aerosol-source
                bays should be relocated. Where relocation is impractical, substitute multi-sensor
                or apply variable-sensitivity programming.
              </li>
              <li>
                <strong>Coincidence filtering.</strong> System-level configuration requiring more
                than one detector to confirm before transmitting an alarm to the ARC. Suppresses
                single-stimulus false alarms without compromising real-fire response.
              </li>
              <li>
                <strong>Variable sensitivity (day/night).</strong> Some panels support programmable
                sensitivity profiles — lower sensitivity during occupied hours when cooking and
                human-activity sources are present, higher sensitivity overnight when the building
                is unoccupied. The capability is panel-specific; programmed settings are recorded in
                the cause-and-effect matrix.
              </li>
              <li>
                <strong>MCP measures (see Section 3).</strong> Type B double-action MCPs,
                transparent protective covers, key-locked MCPs in selected areas. Reduces malicious
                activation.
              </li>
              <li>
                <strong>User-management measures.</strong> Hot-work permits, ARC-notification
                protocols, isolation procedures during planned activities. Addresses unwanted
                fire-alarm signals from legitimate but unmanaged activities.
              </li>
              <li>
                <strong>Cause-and-effect matrix tuning.</strong> A 2025 documentation requirement —
                the cause-and-effect matrix defines what happens for each input. Tuning may involve
                delayed sounder operation in selected zones (with management response window),
                staged evacuation, or zone-specific responses.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 33 (measures to limit false alarms — multi-sensor preference)"
            clause={
              <>
                Greater emphasis has been placed on the use of multi-sensor detectors. In situations
                where point smoke detectors may present a higher risk of false alarms, the 2025
                revision recommends selecting multi-sensor detectors instead. With the Selection and
                application of fire detectors Annex (Annex D) providing guidance on the appropriate
                choice of detector.
              </>
            }
            meaning="The multi-sensor preference is now standardised. The 2017 edition mentioned multi-sensor as one option among several; the 2025 edition treats it as the design default for FA-risk areas. Annex D (renamed from Annex E in 2017) gives detailed selection guidance. The clause 33 emphasis combined with the clause 20.11 mode-recording requirement creates a coherent design-and-document workflow for false-alarm management."
          />

          <ConceptBlock
            title="ARC notification and the new false-alarm-notice label"
            plainEnglish="One of the most common preventable causes of unwanted fire-alarm signals is contractor or maintenance work that triggers the alarm without prior notification of the Alarm Receiving Centre (ARC). The ARC, receiving an apparently genuine signal, dispatches the FRS — which attends to a non-event. The 2025 edition introduces a NEW LABEL recommended at or adjacent to the CIE: 'FALSE ALARM NOTICE — This fire alarm has an active connection to the fire and rescue service. Contact telephone: [ARC number]'. The label puts the ARC contact number where contractors and premises management see it."
          >
            <p>The notification protocol:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Before any test or hot-work.</strong> The contractor or maintainer contacts
                the ARC, identifies the premises, gives the planned start and finish time, and
                confirms what kind of activity will be done.
              </li>
              <li>
                <strong>ARC suppresses dispatch.</strong> During the agreed window, the ARC receives
                any alarm from the system but does NOT dispatch the FRS. (For some premises and
                services, the ARC may also confirm signals on demand to support the test.)
              </li>
              <li>
                <strong>Closing the loop.</strong> At the end of the test, the contractor calls the
                ARC again to confirm the system is back in normal operation. The ARC re-enables
                dispatch.
              </li>
              <li>
                <strong>Documentation.</strong> The ARC notification (start, finish, contractor
                name) is recorded in the system logbook and the maintenance certificate.
              </li>
              <li>
                <strong>The 2025 label.</strong> Placed at or adjacent to the CIE. The ARC contact
                number is shown clearly. The label addresses the &quot;I did not know we had to
                phone&quot; excuse — the number is right there.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 14.17 / 14.18 commentary (alarm transmission and false-alarm notice)"
            clause={
              <>
                To aid the reduction in false alarms caused by not informing the Alarm Receiving
                Centre (ARC) that the system is about to undergo a test, a new label has been
                recommended to be fixed on, or adjacent to, the CIE to remind the premises
                management that the system has an active connection to the Fire and Rescue Service
                via an ARC. With the FRS now operating call challenging policies to reduce the
                number of false alarm attendances, informing the FRS of the type of premises is
                important. A new recommendation states that the ARC should be provided with all
                relevant information about the premises, for example, if it contains sleeping
                accommodation, so that this information can be passed on to the FRS.
              </>
            }
            meaning="Two coordinated 2025 measures. The CIE-adjacent label puts the ARC number where contractors see it (preventing unnotified tests). The premises-information protocol gives the FRS what it needs to call-challenge effectively (no FRS dispatch where signal pattern + premises type + lack of confirmation suggests probable false alarm). Both measures reduce unnecessary FRS attendance — which has become a primary KPI for fire alarm system performance."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <Scenario
            title="The hospital ward — categorising and remediating a year of false alarms"
            situation="A 200-bed general hospital has a BS 5839-1 L1 system with 480 automatic fire detectors. Over the previous 12 months, the logbook records 42 false alarms — a rate of 8.75 per 100 detectors per annum, well above both clause 31 thresholds. The breakdown: 12 from kitchen-vent corridor detectors triggering on cooking aerosol; 14 from housekeeping-bay detectors triggering on aerosol cleaning products; 8 from MCP-related events (3 documented as malicious activations on a paediatric ward, 5 unexplained); 6 from individual detectors flagged as suspected drift; 2 unwanted signals from estates-team hot work without ARC notification. The hospital is preparing for its annual service and the next FRS audit."
            whatToDo="Walk through the 2025 framework. (1) Categorise per clause 30: 26 environmental (kitchen + housekeeping), 8 malicious + unidentified MCP, 6 equipment, 2 unwanted. (2) Apply clause 29.6 per-event review — every event categorised, each with an action note. (3) Apply clause 31 — rate exceeds both thresholds; in-depth investigation triggered (>40 detectors). (4) Remediation per clause 33: KITCHEN/HOUSEKEEPING — replace single-sensor optical with multi-sensor in AND logic, document mode under clause 20.11. Project: 28 detector replacements. Expected FA reduction: 70-80 percent in those zones. PAEDIATRIC MCP — replace existing Type A no-cover MCPs with Type B (or Type A + transparent covers), reposition any vulnerable MCPs to staffed corridors, brief paediatric nursing staff on patient/visitor management. Project: 6 MCPs. EQUIPMENT — schedule cleaning service for the 6 drifty detectors at next routine maintenance; replace any showing persistent drift. UNWANTED — establish hot-work permit system; install the 2025 false-alarm-notice label at the CIE with ARC contact number. Communicate to estates and contractors. (5) Document the remediation plan in the system logbook and modification certificate; track FA rate at next annual service. Target: bring rate below 4 per 100. The hospital's investment (approximately £15-25k for detector replacement, £1-2k for MCP changes, label and procedural rollout) is recovered many times over in avoided FRS chargebacks (£300-500 per false attendance) and reduced ward disruption."
            whyItMatters="The hospital scenario shows the 2025 framework in action: every event categorised; thresholds breached triggering investigation; clause 33 measures applied per category; documentation closing the loop. The result is auditable false-alarm management, not anecdotal complaints. The hospital can demonstrate to the FRS at audit that the system is being actively managed; the FRS can leave its call-challenging response in 'measured' mode rather than 'no-attend' for repeat offenders."
          />

          <CommonMistake
            title="Treating every false alarm as 'equipment fault' and replacing detectors"
            whatHappens="A retail chain's facilities manager records every false alarm as 'detector fault' and demands the maintenance contractor replace the detector. Over 18 months, 47 detectors are replaced. The false alarm rate does not change — the new detectors trigger on the same environmental sources (cooking aerosol from in-store food stalls). The replacement cost (approximately £45 per detector × 47 = £2,100 plus labour) buys nothing. The actual category was environmental, requiring multi-sensor + AND logic, not equipment-replacement."
            doInstead="Categorise correctly per clause 30. Equipment events are caused by detector or panel faults — drift, contamination, water ingress, physical damage. Environmental events are caused by external smoke-like phenomena reaching a working detector. Misdiagnosing environmental as equipment leads to expensive non-fix replacements. The 2025 commissioning org duty (clause 30) to explain the four categories to the user is exactly aimed at this pattern. At the next service visit, properly recategorise the recurring events; pivot the remediation to multi-sensor (clause 33) and detector-relocation; track the FA rate through the next 12-month cycle."
          />

          <CommonMistake
            title="A school assumes the 5-per-100 in-depth threshold does not apply because it has 38 detectors"
            whatHappens="A primary school's maintenance contractor calculates the false-alarm rate at 12 per 100 detectors per annum (5 events on a 38-detector system). The contractor advises the school that no in-depth investigation is required because the school is below the 40-detector size threshold. The school accepts and moves on. The FRS audits a year later, identifies the high rate, and asks why no in-depth review was undertaken. The contractor's interpretation was technically correct under clause 31's exact wording, but it missed the spirit of clauses 29.6 and 30 — every event investigated and categorised."
            doInstead="Even where the in-depth investigation is not formally triggered (system size below 40 detectors), the every-event clause 29.6 duty still applies. The 5 events should have been categorised, with action per category. A typical primary-school FA pattern (malicious MCP activations + cooking-aerosol events) responds well to multi-sensor + Type B/transparent-cover MCPs. The categorisation and remediation plan would have brought the rate down without invoking the formal in-depth process. The clause 31 thresholds are GATES for systematic investigation; the underlying expectation of active false-alarm management does not pause at small-system size."
          />

          <CommonMistake
            title="Contractor work without ARC notification — a recurring 'unwanted' signal source"
            whatHappens="A commercial estate has weekly cleaning visits. The cleaners use aerosol cleaning products in the corridors. Single-sensor optical detectors trigger; the panel signals to the ARC; the ARC dispatches the FRS. The pattern repeats for six weeks before anyone joins the dots. Six FRS attendances at £350 chargeback each = £2,100. The cleaning company knew the building had a fire alarm system but had not been told it was monitored to an ARC — there was no false-alarm-notice label."
            doInstead="Install the 2025 clause 14 false-alarm-notice label at the CIE with the ARC contact number. Brief premises management on ARC-notification protocols for any work that might trigger the alarm — not just hot work, but cleaning, painting, ducting work, lift maintenance, anything generating aerosol/dust/fumes. Establish a hot-work permit system for the higher-risk activities. Where the cleaning regime is regular and predictable, consider a pre-arranged weekly notification window with the ARC during which alarm dispatch is suppressed. The 2025 label and the systematic notification together address the most common preventable cause of unwanted fire signals."
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
              'Section 3 of BS 5839-1:2025 is REORGANISED — clauses 29 (responsibility), 30 (categories), 31 (investigation), 32 (design), 33 (measures). Same content, clearer structure.',
              'FOUR categories — equipment, environmental, malicious, unwanted (clause 30 commentary). Commissioning org EXPLAINS them to the user at handover.',
              'NEW clause 29.6 — investigate EVERY false alarm. Was threshold-only in 2017; now event-by-event with categorisation.',
              'Clause 31 thresholds (UNCHANGED) — preliminary > 4/100/year, in-depth > 5/100/year AND > 40 detectors. Calculate at every annual service.',
              'Clause 33 — emphasise MULTI-SENSOR in AND logic for known FA-risk areas. Document mode under clause 20.11. Annex D for selection guidance.',
              'NEW false-alarm-notice label at the CIE with ARC contact number — addresses unnotified contractor tests, the most common preventable unwanted-signal cause.',
              'Alarm transmission to ARC — premises type, triggering device nature, coincidence-filter status — supports FRS call-challenging.',
              'Heat detectors NO LONGER permitted in sleeping rooms for new L1/L2/L3 work (clause 14, see Section 1) — closes a known FA / fatality gap.',
              'Logbook (Annex H) — every event recorded with category and action; ALL variations recorded (2025 — was "major variations" only in 2017).',
              "False-alarm management is auditable, not anecdotal. The 2025 framework converts 'we have a lot of false alarms' into a categorised, threshold-tracked, remediation-plan-backed dataset that the FRS, the FRA, and the user can all work with.",
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'My system has had 3 false alarms in the past 12 months on 100 detectors. Do I need to investigate?',
                answer:
                  "Yes — under the 2025 clause 29.6 duty, every false alarm is investigated and categorised, regardless of total rate. The 3-event rate (3 per 100 per annum) is BELOW the 4-per-100 preliminary trigger so no formal preliminary investigation is required at clause 31, but each event still gets reviewed and categorised in the logbook. The investigation may conclude 'isolated event, no action' for some or all of them — that is a valid outcome — but the review must happen. The 2025 framework is event-driven, not threshold-only.",
              },
              {
                question: 'How do I calculate the false-alarm rate for clause 31?',
                answer:
                  'Total number of false alarms recorded in the system logbook over the previous 12 months, divided by the number of automatic fire detectors in the system, multiplied by 100. Example: a system with 200 automatic fire detectors and 9 false alarms in the previous year has a rate of (9 / 200) × 100 = 4.5 false alarms per 100 detectors per annum. That rate exceeds the 4-per-100 preliminary trigger but not the 5-per-100 in-depth trigger. Calculation is at every annual service visit; the rate moves over time as events accumulate and the 12-month window slides.',
              },
              {
                question: 'Does an MCP count as a "detector" for the per-100 calculation?',
                answer:
                  'No — clause 31 is specific: "AUTOMATIC fire detectors". MCPs are excluded from the denominator. So a system with 100 detectors and 20 MCPs uses 100 in the calculation, not 120. The 4-per-100 and 5-per-100 thresholds apply to detector-driven false alarms primarily; MCP-driven malicious or unwanted activations are managed separately through the Type B / cover / engagement measures (see Section 3 and clause 33).',
              },
              {
                question:
                  'What if my false-alarm rate looks high, but I had several malicious activations from one disgruntled employee?',
                answer:
                  'Categorise as malicious (clause 30); document the events, the cause (single individual), and the remediation (HR action, MCP cover or relocation, CCTV monitoring of MCP). The clause 31 quantitative trigger may still be reached but the in-depth investigation focuses on the systematic question (does the design make malicious activation easy?) rather than treating each event as random. The categorisation matters because the remediation differs — a malicious event is not a detector-replacement issue, it is a behavioural/security issue.',
              },
              {
                question:
                  'My ARC charges me £400 per FRS dispatch. The system has 8 false alarms a year. Can I disable the ARC connection to save money?',
                answer:
                  "Disconnecting from the ARC may not be permitted by your fire risk assessment, your insurance, or by BS 5839-1 itself for some premises types (e.g. residential care homes — see clause 22 variations, where loss of ARC connection is now listed as NOT an acceptable variation). Disconnecting also removes the 24/7 monitoring that protects life and property when the building is unoccupied. The right answer is to REDUCE THE FALSE ALARMS — apply the 2025 framework (categorise, investigate, multi-sensor in FA-risk areas, MCP measures, ARC notification, false-alarm-notice label). Bringing the rate from 8 to 2 per 100 saves £2,400 per year and improves the system's life-safety performance.",
              },
              {
                question:
                  'For a residential care home, are there any specific 2025 false-alarm management requirements?',
                answer:
                  'Yes — clause 22 (variations) now lists certain departures from BS 5839-1 as NOT acceptable variations for sleeping-accommodation premises including residential care homes. Specifically: (a) absence of a zone plan in premises with more than one zone on any storey, particularly where people sleep; (b) absence of a facility for transmission of fire alarm signals to an ARC. These are residential-care-specific clauses-22 hard rules. False-alarm management for care homes therefore has to work WITH the ARC connection (it cannot be removed), and emphasises detector-level remediation (multi-sensor in known FA-risk areas like dining rooms, lounges with steam from beverage trolleys), MCP placement and cover, and procedural measures (planned-test ARC notification, hot-work permits).',
              },
              {
                question: 'Is there guidance for the cause-and-effect matrix in BS 5839-1:2025?',
                answer:
                  'Yes — clause 38 (documentation) introduced in 2025 explicitly recommends that a cause-and-effect matrix or text description of the system response is included in the documentation provided at handover. The matrix can be as simple as "this system operates as a simultaneous evacuation" for small premises, or as detailed as a full cause-and-effect document for complex systems with phased evacuation, lift homing, ventilation control, magnetic door release, lockdown logic, etc. The matrix supports false-alarm management because it makes the response to each input explicit — and therefore tunable. Adjusting cause-and-effect (e.g. delayed sounder operation in a kitchen-zone with 30-second management response window) can be a remediation measure for unwanted signals.',
              },
              {
                question:
                  'What is the relationship between BS 5839-1:2025 clause 33 and the FRS call-challenging policies?',
                answer:
                  'Complementary. Clause 33 measures (multi-sensor, coincidence filtering, ARC notification, the false-alarm-notice label, premises-type information to the ARC) all reduce the volume of false-alarm signals reaching the FRS. The FRS call-challenging policies use the signal pattern, premises type, signal nature and confirmation status to decide whether to dispatch — call challenging may suspend dispatch for a single-detector signal at low risk premises, but always dispatch for sleeping-risk premises or coincidence-filtered (high confidence) signals. The two regimes work together: clause 33 makes the signal that DOES reach the FRS a high-confidence one, while call challenging manages the residual low-confidence volume.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="False alarm management — Module 2.5" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/fire-alarm-course/module-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 2
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/fire-alarm-course/module-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next module <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Module 3 — System design
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

export default FireAlarmModule2Section5;
