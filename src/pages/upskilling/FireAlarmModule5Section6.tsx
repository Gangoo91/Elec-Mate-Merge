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
    id: 'fam5-s6-doc-set',
    question:
      'What is the minimum documentation set that BS 5839-1:2025 requires to be handed over with a new fire alarm system?',
    options: [
      'Just the operating manual.',
      "The handover documentation set comprises: (a) ACCEPTANCE CERTIFICATE per Annex G; (b) OPERATING MANUAL — the day-to-day operation guide for the user; (c) O&M MANUAL — operation and maintenance procedures, technical data, service intervals; (d) AS-INSTALLED DRAWINGS — including zone plan, device locations and addresses, cable routes, panel layout; (e) CAUSE-AND-EFFECT MATRIX or text description (NEW 2025 mandatory documentation); (f) LOGBOOK per Annex H 2025 (was Annex F 2017); (g) third-party scheme certification (FIA / BAFE / NSI / SSAIB if applicable); (h) all variations recorded (NEW 2025 — was 'major variations' only in 2017).",
      'Drawings only.',
      'Logbook only.',
    ],
    correctIndex: 1,
    explanation:
      'The full documentation set is the contractually-handed-over package. Each document has a defined purpose: acceptance certificate proves commissioning sign-off; operating manual lets the user run the system day-to-day; O&M manual supports the maintenance organisation; drawings show what is installed; cause-and-effect documents the design intent; logbook records ongoing events; certification shows competence; variations record departures from BS 5839-1:2025.',
  },
  {
    id: 'fam5-s6-logbook',
    question: 'BS 5839-1:2025 has updated which Annex covers the logbook? (Was Annex F in 2017.)',
    options: [
      'Annex F still.',
      "Annex H 2025 (the 2017 Annex F has been re-lettered to Annex H in the 2025 revision). Content updated to reflect what is in clause 48 of the 2025 standard. The logbook records: events at the system (alarms, faults, service visits, test events), service visits (date, engineer, findings), variations (NEW 2025 — ALL variations recorded, not just 'major'), and any other system-relevant events. Held by the user; updated by service organisation at every visit.",
      'Annex G.',
      'No annex — logbook deleted in 2025.',
    ],
    correctIndex: 1,
    explanation:
      'Annex H is the 2025 logbook annex. The 2017 Annex F has been re-lettered. Content updated to reflect clause 48 (the logbook clause). Most significant content change is the all-variations-recorded requirement (NEW 2025 — was only "major" in 2017).',
  },
  {
    id: 'fam5-s6-unacceptable',
    question:
      'BS 5839-1:2025 §6 declares some variations UNACCEPTABLE — they cannot be agreed as variations regardless of project context. Which two are the most prominent?',
    options: [
      'No variations are unacceptable — all are agreed.',
      '(a) The ABSENCE OF A ZONE PLAN (or other suitable diagrammatic representation per 22.2.5) in premises with more than one zone on any storey, particularly premises in which people sleep; (b) the ABSENCE OF A FACILITY FOR TRANSMISSION OF FIRE ALARM SIGNALS TO AN ARC in supported housing where a Grade A system per BS 5839-6:2019 is necessary, OR in residential care homes. NEW DEPARTURE for 2025 — the 2017 revision permitted any variation if agreed; the 2025 revision draws a line that some variations are too dangerous to agree.',
      'Cable colour deviation.',
      'Battery autonomy below design.',
    ],
    correctIndex: 1,
    explanation:
      'The 2025 revision is the first edition of BS 5839-1 to declare any variation unacceptable. Previously all variations could be agreed if the design rationale supported. The 2025 §6 now says no — a zone plan absence in multi-zone sleeping premises, or an ARC absence in supported housing / residential care, are too dangerous to agree. Both reflect specific past incidents and the FRS / regulatory environment.',
  },
  {
    id: 'fam5-s6-rro-duties',
    question:
      'The user takes ownership of the system on handover. Under the Regulatory Reform (Fire Safety) Order 2005, what duties apply to the responsible person?',
    options: [
      'No duties — the system is the contractor’s responsibility.',
      'The responsible person (employer / occupier / building owner depending on context) has DUTIES under the RRO 2005 including: (a) carry out a fire risk assessment and review it regularly; (b) ensure the fire detection and fire alarm system is appropriate and maintained; (c) ensure persons on the premises receive adequate fire safety information and training; (d) maintain the system in efficient working order; (e) keep records as appropriate. The handover briefing introduces the responsible person to these duties so the user is not surprised by them post-handover. Failure of these duties is a criminal offence under the RRO.',
      'Only insurance requirements.',
      'Only fire drill rules.',
    ],
    correctIndex: 1,
    explanation:
      'The RRO 2005 (England and Wales; equivalent legislation in Scotland and Northern Ireland) imposes duties on the responsible person — fire risk assessment, system maintenance, occupant training, record-keeping. Handover briefing should make clear that the user is now in the ownership / responsibility chain. The commissioning organisation hands over the system; the responsible person is then accountable under the RRO for keeping it in working order.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which Annex of BS 5839-1:2025 specifies the format of the acceptance certificate handed over with a new fire alarm system?',
    options: [
      'Annex F.',
      'Annex G — gives a model acceptance certificate format. The certificate records system parameters (category, zones, devices, autonomy), commissioning verifications, variations recorded, issuer signature, user signature. Project may use an organisation-specific form provided it captures all the Annex G elements.',
      'Annex H.',
      'No annex.',
    ],
    correctAnswer: 1,
    explanation:
      'Annex G of BS 5839-1:2025 gives the model acceptance certificate format. Project may use an organisation-specific form, but it must capture the Annex G elements: parameters, verifications, variations, signatures.',
  },
  {
    id: 2,
    question:
      'Which Annex of BS 5839-1:2025 specifies the logbook? (And what was its letter in the 2017 revision?)',
    options: [
      'Annex H 2025 (was Annex F 2017). Content updated to reflect clause 48 of the 2025 standard. Records system events, service visits, ALL variations (NEW 2025), and other system-relevant items.',
      'Annex G 2025 (was Annex F 2017).',
      'Annex H 2025 (was Annex G 2017).',
      'No logbook required.',
    ],
    correctAnswer: 0,
    explanation:
      'Annex H is the 2025 logbook annex; was Annex F in the 2017 revision. The re-lettering reflects re-organisation of the standard; the substantive change is the all-variations-recorded requirement (NEW 2025 — was "major" only in 2017).',
  },
  {
    id: 3,
    question: 'BS 5839-1:2025 §6 declares some variations UNACCEPTABLE. Which is one of them?',
    options: [
      'Cable colour deviation from red.',
      'The absence of a zone plan (or other suitable diagrammatic representation per 22.2.5) in premises with more than one zone on any storey, particularly premises in which people sleep. New departure for 2025 — first edition of BS 5839-1 to declare any variation unacceptable. Reflects specific incident history where occupants in sleeping premises could not be located by the FRS in the absence of a zone plan.',
      'Battery autonomy 28 h instead of 24 h.',
      'Use of multi-sensors instead of point smoke.',
    ],
    correctAnswer: 1,
    explanation:
      'Zone plan absence in multi-zone sleeping premises is one of the two unacceptable variations declared in BS 5839-1:2025 §6. The other is ARC absence in supported housing where Grade A is necessary, or in residential care homes. Both reflect specific incident history and FRS attendance pressures.',
  },
  {
    id: 4,
    question:
      'BS 5839-1:2025 §6 declares the ABSENCE of an ARC connection unacceptable in which premises?',
    options: [
      'Any premises.',
      'Supported housing in which the facility is considered necessary to meet the recommendations of BS 5839-1 (where a Grade A system per BS 5839-6:2019 is necessary), OR in a residential care home. New for 2025. Both premises types have particularly vulnerable occupants who depend on ARC-summoned FRS attendance for life safety.',
      'Office buildings.',
      'Industrial premises.',
    ],
    correctAnswer: 1,
    explanation:
      'Supported housing (where Grade A per BS 5839-6:2019 is necessary) and residential care homes are the two premises types where ARC absence is now unacceptable. Both have vulnerable occupants who cannot self-evacuate or self-summon FRS reliably; ARC connection is the safety-of-life mechanism.',
  },
  {
    id: 5,
    question: 'In the 2025 revision, which variations are recorded in the system documentation?',
    options: [
      'Only major ones.',
      'ALL variations from the recommendations of BS 5839-1:2025 (NEW 2025 — was "major variations only" in 2017). Each variation is justified — particularly variations proposed at installation or commissioning stage. The 2017 revision referenced "major variations" without defining what "major" meant; the 2025 revision removes the ambiguity by requiring all variations to be recorded. The variations record goes in the system documentation including the logbook.',
      'Only commissioning-stage variations.',
      'Only design-stage variations.',
    ],
    correctAnswer: 1,
    explanation:
      'NEW 2025: ALL variations recorded — settled the 2017 ambiguity around what "major" meant. Each variation justified. Recorded in design documentation, on the acceptance certificate, and in the logbook. Some variations now declared unacceptable (zone plan absence, ARC absence in vulnerable premises) cannot be agreed at all.',
  },
  {
    id: 6,
    question:
      'Under the Regulatory Reform (Fire Safety) Order 2005, what is the responsible person?',
    options: [
      'The contractor who installed the system.',
      "The person who has control of the premises in connection with the carrying on of a trade, business or undertaking — typically the employer for an employer's premises, the occupier for non-employer premises, the owner where no occupier in undertaking control. The responsible person carries the duties under the RRO including fire risk assessment, system maintenance, occupant training, and record-keeping. Failure of these duties is a criminal offence under the RRO.",
      'The fire and rescue service.',
      'The local authority.',
    ],
    correctAnswer: 1,
    explanation:
      'The responsible person under the RRO 2005 is identified by control of the premises. Employer for employer-controlled premises (offices, factories, schools); occupier for non-employer premises (shops, restaurants, leisure); owner where neither employer nor occupier is in control. The RRO duties run with the role.',
  },
  {
    id: 7,
    question:
      'Cause-and-effect matrix or text description — what does BS 5839-1:2025 require regarding handover?',
    options: [
      'No requirement.',
      'A cause-and-effect matrix or text description of how the cause and effect operates is INCLUDED with the documentation provided to the purchaser or user of the system. NEW 2025 mandatory documentation. Format flexible (matrix for complex; text for simple, e.g. "this system operates as a simultaneous evacuation"); requirement firm. Verified at commissioning; handed over with the O&M manual.',
      'Only commissioning organisation keeps it.',
      'Optional documentation.',
    ],
    correctAnswer: 1,
    explanation:
      'NEW 2025: cause-and-effect matrix or text description handed over with the system documentation. Format flexible to scale with system complexity; requirement firm. Verified at commissioning, handed over with O&M.',
  },
  {
    id: 8,
    question:
      'A fire alarm system is handed over to the user. Who has primary responsibility for ongoing maintenance under BS 5839-1:2025 and the RRO 2005?',
    options: [
      'The commissioning engineer.',
      'The USER (typically the responsible person under the RRO 2005), exercised through a service contract with a competent organisation (FIA / BAFE / NSI / SSAIB third-party scheme membership common). The user maintains the system in efficient working order under the RRO; the service organisation provides the technical maintenance under the contract. Successive inspection and servicing visits at intervals of approximately 6 months (BS 5839-1:2025 clause 43.2.1; tolerance ±1 month).',
      'The local authority.',
      'The fire and rescue service.',
    ],
    correctAnswer: 1,
    explanation:
      'The user (responsible person) carries the RRO duty to maintain. The maintenance is typically delivered by a competent service organisation under contract. BS 5839-1:2025 clause 43.2.1 sets the service interval at approximately 6 months with ±1 month tolerance — a clarification of the 2017 strict 6-month rule.',
  },
  {
    id: 9,
    question:
      'Third-party scheme certification (FIA, BAFE, NSI, SSAIB) on the handover certificate — what does it indicate?',
    options: [
      'Just a marketing badge.',
      "Independent third-party verification that the commissioning / service / maintenance organisation operates to a defined quality and competence standard (e.g. BAFE SP203 for fire detection and fire alarm system providers; NSI / SSAIB for security and life-safety services). The scheme audits the organisation's management system, technical competence, training records, equipment calibration, complaint handling, and ongoing performance. Inclusion on the handover certificate gives the user assurance that the work was done by a competent organisation, audited externally.",
      'Optional — has no formal status.',
      'Only relevant for ARC connections.',
    ],
    correctAnswer: 1,
    explanation:
      'Third-party scheme certification is the recognised industry mechanism for verifying competence. BAFE SP203 (fire detection and fire alarm), FIA (Fire Industry Association membership), NSI / SSAIB (security and life-safety) — each scheme audits the organisation. Inclusion on certificates gives user-side assurance of competence; insurers and regulators frequently expect it.',
  },
  {
    id: 10,
    question:
      'A user calls the service organisation: "I have just had three false alarms in two weeks." Under BS 5839-1:2025, what is the trigger point for a preliminary investigation?',
    options: [
      'Any false alarm.',
      'Preliminary investigation when the rate of false alarms over the previous 12 months EXCEEDS FOUR PER 100 DETECTORS PER ANNUM. In-depth investigation when the rate exceeds five per 100 detectors per annum on systems with more than 40 automatic fire detectors. Trigger points unchanged from 2017 to 2025. The commissioning organisation has, since 2025, an explicit duty to brief the user on the trigger points and the investigation process (clause 29.6).',
      'Six per year regardless of system size.',
      'Only when ARC notices.',
    ],
    correctAnswer: 1,
    explanation:
      'Preliminary investigation: rate >4 per 100 detectors p.a. In-depth investigation: rate >5 per 100 detectors p.a. on systems with >40 detectors. Trigger points unchanged 2017 → 2025. The 2025 addition is the commissioning organisation duty (clause 29.6) to brief the user on these trigger points and on the investigation process.',
  },
];

const FireAlarmModule5Section6 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Handover and documentation | Fire Alarm Module 5.6 | Elec-Mate',
    description:
      'BS 5839-1:2025 handover: acceptance certificate (Annex G), operating manual, O&M, as-installed drawings, cause-and-effect matrix or text (NEW 2025 mandatory), logbook (Annex H 2025 — was F in 2017), third-party scheme certification, ALL variations recorded (NEW 2025), unacceptable variations declared (zone plan / ARC), false-alarm-investigation procedure handover (clause 29.6 NEW 2025), responsible person duties under the Regulatory Reform Order 2005.',
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
            <ArrowLeft className="h-4 w-4" /> Module 5
          </button>

          <PageHero
            eyebrow="Module 5 · Section 6"
            title="Handover and documentation"
            description="The end-of-project sign-off: acceptance certificate, operating and O&M manuals, as-installed drawings, cause-and-effect (NEW 2025 mandatory), logbook (Annex H 2025), third-party certification, ALL variations recorded (NEW 2025), and the responsible person's duties under the Regulatory Reform Order 2005."
            tone="yellow"
          />

          <TLDR
            points={[
              'Handover documentation set: Acceptance certificate (Annex G) · Operating manual · O&M manual · As-installed drawings · Cause-and-effect matrix or text (NEW 2025 mandatory) · Logbook (Annex H 2025) · Third-party certification · Variations record.',
              'Acceptance certificate per Annex G — issued by commissioning engineer, signed by user. Records parameters, verifications, variations.',
              'Cause-and-effect matrix or text description — NEW 2025 MANDATORY documentation. Verified at commissioning, handed over with system.',
              'Logbook now in Annex H (was Annex F in 2017). Content updated to reflect clause 48 of 2025 standard. Records all variations (NEW 2025).',
              'ALL variations recorded (NEW 2025 — was "major variations only" in 2017). Each variation justified, particularly at install / commissioning stage.',
              'NEW 2025: some variations are UNACCEPTABLE — zone plan absence in multi-zone sleeping premises; ARC absence in supported housing / residential care.',
              'Client / responsible-person training: identification of responsible person, RRO 2005 duties (fire risk assessment, maintenance, training, records).',
              'NEW 2025 clause 29.6: commissioning organisation must advise user on FALSE ALARM INVESTIGATION procedure at handover.',
              'Third-party scheme certification (FIA / BAFE SP203 / NSI / SSAIB) shown on certificates — independent competence verification.',
              'Service intervals: approximately 6-monthly (BS 5839-1:2025 clause 43.2.1 — clarified vs strict 2017 rule). ±1 month tolerance, so 5-7 month window between visits.',
              'Section 7 EXTENSIONS AND MODIFICATIONS — NEW section in 2025. CIE firmware update is a modification = certificate required.',
              'Redundant equipment: removed where practicable, or clearly identified as no longer in use (NEW 2025 wording).',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Compile the handover documentation set per BS 5839-1:2025: acceptance certificate (Annex G), operating manual, O&M manual, as-installed drawings, cause-and-effect, logbook (Annex H), variations record, third-party certification',
              'Issue an acceptance certificate per Annex G with all commissioning records appended',
              'Hand over the cause-and-effect matrix or text description as NEW 2025 mandatory documentation',
              'Maintain the logbook per Annex H 2025 (was Annex F 2017), recording all events, service visits, and ALL variations (NEW 2025)',
              'Record ALL variations from BS 5839-1:2025 in the system documentation (NEW 2025 — was "major variations" only in 2017)',
              'Recognise the variations DECLARED UNACCEPTABLE in BS 5839-1:2025 §6: zone plan absence in multi-zone sleeping premises; ARC absence in supported housing / residential care',
              'Brief the responsible person on duties under the Regulatory Reform (Fire Safety) Order 2005: fire risk assessment, system maintenance, occupant training, record-keeping',
              'Advise the user on false-alarm investigation procedure per NEW 2025 clause 29.6',
              'Recognise third-party scheme certification (FIA / BAFE SP203 / NSI / SSAIB) on documentation as independent competence verification',
              'Apply the BS 5839-1:2025 Section 7 (Extensions and modifications — NEW for 2025) — including CIE firmware updates as modifications requiring a certificate',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The handover documentation set</ContentEyebrow>

          <ConceptBlock
            title="What is handed over — the eight documents"
            plainEnglish="At handover, the commissioning organisation hands over a defined set of documents that constitute the system's permanent record. The user retains them for the life of the system. Each document has a specific purpose and audience: the acceptance certificate proves commissioning sign-off; the operating manual lets the user run the system day-to-day; the O&M manual supports the maintenance organisation; the as-installed drawings show what was built; the cause-and-effect documents the design intent; the logbook records ongoing events; the variations record documents departures from BS 5839-1:2025; the third-party certification shows competence."
            onSite="Compile the documentation set as the project progresses, not at the last minute. Drawings updated as the cable is pulled. Cause-and-effect verified during commissioning. Variations recorded as they arise. Logbook started as the first commissioning event happens. At handover, the bundle is complete and ready to go to the user. Last-minute compilation produces incomplete records and projects that drift past handover for weeks while paperwork is finalised."
          >
            <p>The eight documents:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Acceptance certificate (Annex G).</strong> The commissioning sign-off.
                System parameters (category, zones, devices, autonomy), commissioning verifications,
                variations recorded. Issued by commissioning engineer; signed by user.
              </li>
              <li>
                <strong>Operating manual.</strong> The day-to-day operation guide for the user. How
                to silence an alarm, how to reset, how to put the system on test, how to respond to
                a fault indication. Written for non-technical readers — the building manager or the
                receptionist who answers the panel at 02:00.
              </li>
              <li>
                <strong>O&M manual.</strong> Operation and maintenance — written for the service
                organisation. Technical data, panel programming, device addresses, service
                intervals, spare parts, manufacturer data sheets. Used at every service visit.
              </li>
              <li>
                <strong>As-installed drawings.</strong> Zone plan, device locations and addresses,
                cable routes, panel layout, sounder zones, ARC interface. Shows what was actually
                built (not what was originally drawn). Drawings updated to reflect rectified
                variations.
              </li>
              <li>
                <strong>Cause-and-effect matrix or text description.</strong> NEW 2025 mandatory
                documentation. Format flexible (matrix for complex; text for simple); requirement
                firm. Verified at commissioning.
              </li>
              <li>
                <strong>Logbook (Annex H 2025).</strong> Records system events (alarms, faults,
                tests, service visits), variations (NEW 2025: ALL variations), and other
                system-relevant items. Held by user; updated by service organisation at every visit.
              </li>
              <li>
                <strong>Variations record.</strong> NEW 2025: ALL variations from BS 5839-1:2025
                recorded. Was &quot;major variations&quot; only in 2017. Each variation justified.
              </li>
              <li>
                <strong>Third-party scheme certification.</strong> FIA / BAFE SP203 / NSI / SSAIB
                certification of the commissioning / service organisation. Independent competence
                verification.
              </li>
            </ol>
            <p>
              The set is sometimes physically delivered as a binder, sometimes electronically (PDF
              set on a USB stick or via a project portal), commonly both. The commissioning
              organisation retains a copy; the user retains the original; the service organisation
              references the user copy at each service visit.
            </p>
          </ConceptBlock>

          {/* Handover document set hierarchy diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Handover documentation set — hierarchy and audiences
            </h4>
            <svg
              viewBox="0 0 820 540"
              className="w-full h-auto"
              role="img"
              aria-label="Handover documentation hierarchy. Top: BS 5839-1:2025 system documentation. Below: eight documents — acceptance certificate (Annex G), operating manual, O&M manual, as-installed drawings, cause-and-effect (NEW 2025 mandatory), logbook (Annex H 2025), variations record (NEW 2025 ALL variations), third-party certification."
            >
              <text x="20" y="30" fill="#FBBF24" fontSize="13" fontWeight="bold">
                Handover documentation set — eight documents
              </text>

              {/* Root */}
              <rect
                x="280"
                y="50"
                width="260"
                height="56"
                rx="8"
                fill="rgba(251,191,36,0.15)"
                stroke="#FBBF24"
                strokeWidth="2"
              />
              <text
                x="410"
                y="74"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="12"
                fontWeight="bold"
              >
                BS 5839-1:2025 system documentation
              </text>
              <text x="410" y="92" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9.5">
                handed over to user · retained for life of system
              </text>

              {/* Connectors */}
              <line x1="410" y1="106" x2="410" y2="130" stroke="#FBBF24" strokeWidth="1.5" />
              <line x1="100" y1="130" x2="720" y2="130" stroke="#FBBF24" strokeWidth="1.5" />

              {/* Row 1 — first 4 docs */}
              <line x1="100" y1="130" x2="100" y2="155" stroke="#FBBF24" strokeWidth="1.5" />
              <rect
                x="20"
                y="155"
                width="160"
                height="80"
                rx="6"
                fill="rgba(34,211,238,0.12)"
                stroke="#22D3EE"
                strokeWidth="1.5"
              />
              <text
                x="100"
                y="178"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="11"
                fontWeight="bold"
              >
                1 · Acceptance cert
              </text>
              <text x="100" y="194" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Annex G
              </text>
              <text x="100" y="208" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                commissioning sign-off
              </text>
              <text x="100" y="222" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                audience: user
              </text>

              <line x1="280" y1="130" x2="280" y2="155" stroke="#FBBF24" strokeWidth="1.5" />
              <rect
                x="200"
                y="155"
                width="160"
                height="80"
                rx="6"
                fill="rgba(34,211,238,0.12)"
                stroke="#22D3EE"
                strokeWidth="1.5"
              />
              <text
                x="280"
                y="178"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="11"
                fontWeight="bold"
              >
                2 · Operating manual
              </text>
              <text x="280" y="194" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                day-to-day guide
              </text>
              <text x="280" y="208" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                silence / reset / test
              </text>
              <text x="280" y="222" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                audience: building mgr
              </text>

              <line x1="460" y1="130" x2="460" y2="155" stroke="#FBBF24" strokeWidth="1.5" />
              <rect
                x="380"
                y="155"
                width="160"
                height="80"
                rx="6"
                fill="rgba(34,211,238,0.12)"
                stroke="#22D3EE"
                strokeWidth="1.5"
              />
              <text
                x="460"
                y="178"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="11"
                fontWeight="bold"
              >
                3 · O&amp;M manual
              </text>
              <text x="460" y="194" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                technical data
              </text>
              <text x="460" y="208" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                programming / devices
              </text>
              <text x="460" y="222" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                audience: service org
              </text>

              <line x1="640" y1="130" x2="640" y2="155" stroke="#FBBF24" strokeWidth="1.5" />
              <rect
                x="560"
                y="155"
                width="160"
                height="80"
                rx="6"
                fill="rgba(34,211,238,0.12)"
                stroke="#22D3EE"
                strokeWidth="1.5"
              />
              <text
                x="640"
                y="178"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="11"
                fontWeight="bold"
              >
                4 · As-installed dwgs
              </text>
              <text x="640" y="194" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                zone plan · cables
              </text>
              <text x="640" y="208" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                device addresses
              </text>
              <text x="640" y="222" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                audience: service org
              </text>

              {/* Connectors row 2 */}
              <line x1="100" y1="235" x2="100" y2="260" stroke="#FBBF24" strokeWidth="1.5" />
              <line x1="280" y1="235" x2="280" y2="260" stroke="#FBBF24" strokeWidth="1.5" />
              <line x1="460" y1="235" x2="460" y2="260" stroke="#FBBF24" strokeWidth="1.5" />
              <line x1="640" y1="235" x2="640" y2="260" stroke="#FBBF24" strokeWidth="1.5" />

              {/* Row 2 — next 4 docs */}
              <rect
                x="20"
                y="260"
                width="160"
                height="80"
                rx="6"
                fill="rgba(168,85,247,0.12)"
                stroke="#A855F7"
                strokeWidth="1.5"
              />
              <text
                x="100"
                y="280"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="11"
                fontWeight="bold"
              >
                5 · Cause-and-effect
              </text>
              <text
                x="100"
                y="296"
                textAnchor="middle"
                fill="rgba(236,72,153,0.85)"
                fontSize="9"
                fontWeight="bold"
              >
                NEW 2025 mandatory
              </text>
              <text x="100" y="310" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                matrix or text
              </text>
              <text x="100" y="324" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                audience: all
              </text>

              <rect
                x="200"
                y="260"
                width="160"
                height="80"
                rx="6"
                fill="rgba(168,85,247,0.12)"
                stroke="#A855F7"
                strokeWidth="1.5"
              />
              <text
                x="280"
                y="280"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="11"
                fontWeight="bold"
              >
                6 · Logbook
              </text>
              <text
                x="280"
                y="296"
                textAnchor="middle"
                fill="rgba(236,72,153,0.85)"
                fontSize="9"
                fontWeight="bold"
              >
                Annex H 2025 (was F)
              </text>
              <text x="280" y="310" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                events · service · vars
              </text>
              <text x="280" y="324" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                audience: user + svc
              </text>

              <rect
                x="380"
                y="260"
                width="160"
                height="80"
                rx="6"
                fill="rgba(168,85,247,0.12)"
                stroke="#A855F7"
                strokeWidth="1.5"
              />
              <text
                x="460"
                y="280"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="11"
                fontWeight="bold"
              >
                7 · Variations record
              </text>
              <text
                x="460"
                y="296"
                textAnchor="middle"
                fill="rgba(236,72,153,0.85)"
                fontSize="9"
                fontWeight="bold"
              >
                NEW 2025 ALL recorded
              </text>
              <text x="460" y="310" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                was "major" only 2017
              </text>
              <text x="460" y="324" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                audience: all
              </text>

              <rect
                x="560"
                y="260"
                width="160"
                height="80"
                rx="6"
                fill="rgba(168,85,247,0.12)"
                stroke="#A855F7"
                strokeWidth="1.5"
              />
              <text
                x="640"
                y="280"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="11"
                fontWeight="bold"
              >
                8 · 3rd-party cert
              </text>
              <text x="640" y="296" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                FIA / BAFE / NSI / SSAIB
              </text>
              <text x="640" y="310" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                competence verification
              </text>
              <text x="640" y="324" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                audience: user · insurer
              </text>

              {/* Bottom — UNACCEPTABLE variations callout */}
              <rect
                x="20"
                y="370"
                width="780"
                height="64"
                rx="8"
                fill="rgba(239,68,68,0.06)"
                stroke="rgba(239,68,68,0.5)"
                strokeWidth="1.5"
              />
              <text x="40" y="392" fill="rgba(239,68,68,0.95)" fontSize="11" fontWeight="bold">
                ⚠ UNACCEPTABLE variations (NEW 2025 §6)
              </text>
              <text x="40" y="408" fill="rgba(255,255,255,0.75)" fontSize="9.5">
                a) Absence of zone plan in multi-zone sleeping premises (per 22.2.5)
              </text>
              <text x="40" y="422" fill="rgba(255,255,255,0.75)" fontSize="9.5">
                b) Absence of ARC connection in supported housing (Grade A per BS 5839-6:2019) OR
                residential care home
              </text>

              {/* Bottom — clause 29.6 + RRO 2005 */}
              <rect
                x="20"
                y="450"
                width="780"
                height="80"
                rx="8"
                fill="rgba(34,211,238,0.06)"
                stroke="rgba(34,211,238,0.5)"
                strokeWidth="1.5"
              />
              <text x="40" y="472" fill="#22D3EE" fontSize="11" fontWeight="bold">
                User briefing at handover
              </text>
              <text x="40" y="488" fill="rgba(255,255,255,0.75)" fontSize="9.5">
                · NEW 2025 clause 29.6 — false-alarm investigation procedure briefed and recorded in
                O&amp;M
              </text>
              <text x="40" y="504" fill="rgba(255,255,255,0.75)" fontSize="9.5">
                · Responsible person identified — RRO 2005 duties (FRA, maintenance, training,
                records) briefed
              </text>
              <text x="40" y="520" fill="rgba(255,255,255,0.75)" fontSize="9.5">
                · Service contract — competent organisation, ~6-monthly visits per clause 43.2.1 (±1
                month tolerance)
              </text>
            </svg>
          </div>

          <RegsCallout
            source="BS 5839-1:2025 · Documentation clause / §21 of FIA Guide (Documentation / handover — NEW elements 2025)"
            clause={
              <>
                A new item that appears within the documentation clause of BS 5839-1:2025 is the
                recommendation that a cause-and-effect matrix or text description of how the cause
                and effect operates is included with the documentation to be provided to the
                purchaser or user of the system. This could be as simple as &quot;this system
                operates as a simultaneous evacuation&quot; or a cause-and-effect matrix document
                might be required for more complex strategies. The standard does not dictate the
                manner of the cause-and-effect matrix only that it needs to be produced. The
                commissioning technician should inform the user that it is important to keep the
                documentation provided up to date and available to interested parties.
              </>
            }
            meaning="NEW 2025: cause-and-effect mandatory; format flexible. The commissioning technician's role explicitly extends beyond verification — the technician must inform the user that the documentation must be kept up to date. Documentation goes stale fast in service; the user is advised at handover to maintain it."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>
            Variations — ALL recorded (NEW 2025), some declared unacceptable
          </ContentEyebrow>

          <ConceptBlock
            title="The 2025 break with the 2017 'major variations only' rule"
            plainEnglish="A variation is a departure from the recommendations of BS 5839-1:2025. The 2017 revision required only 'major variations' to be recorded; the term 'major' was not defined, leaving the recording requirement effectively voluntary at the discretion of the designer / installer. The 2025 revision settles the ambiguity: ALL variations from BS 5839-1:2025 are now recorded. Each variation must be justified, particularly variations proposed at installation or commissioning stage. Recorded in design documentation, on the acceptance certificate, and in the logbook (Annex H 2025)."
            onSite="On any new project, treat every departure from BS 5839-1:2025 as a variation that needs recording. The cable colour decision (red vs other) — variation if other. A JB used where re-routing was rejected — variation. A detector position outside 25-600 mm because of a cell-ceiling — variation. A device address scheme that does not follow the design schedule — variation. The variation record is no longer a list of 'big things'; it is a complete record of every departure with justification."
          >
            <p>The 2025 variations rules:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>ALL recorded.</strong> Every departure from BS 5839-1:2025 recommendations.
                Settled the 2017 ambiguity around &quot;major&quot;.
              </li>
              <li>
                <strong>Each justified.</strong> Variation needs a reason — usually project-specific
                constraint, structural issue, occupant requirement, or pre-existing system limit.
                Variation without justification is non-compliance, not a variation.
              </li>
              <li>
                <strong>Particularly install / commissioning stage.</strong> Variations agreed
                during install or commissioning — typically because the as-built deviates from the
                design — are explicitly called out for justification. The design-stage variations
                are usually documented; install / commissioning variations were the ones that often
                went unrecorded under 2017.
              </li>
              <li>
                <strong>Recorded in three places.</strong> Design documentation (variations from the
                standard accepted at design stage), acceptance certificate (variations accepted at
                commissioning), and logbook (variations agreed in service-life modifications).
              </li>
              <li>
                <strong>Some variations now UNACCEPTABLE.</strong> See next concept block.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Unacceptable variations — NEW 2025 departures"
            plainEnglish="Until the 2025 revision, BS 5839-1 was a code of practice where any variation could be agreed if the design rationale supported it. The 2025 revision draws a line. Some departures from the standard are so detrimental to safety of life that they cannot be agreed as variations regardless of project context. Two are explicitly named: (a) the absence of a zone plan (or other suitable diagrammatic representation per 22.2.5) in premises with more than one zone on any storey, particularly premises in which people sleep; (b) the absence of a facility for transmission of fire alarm signals to an ARC in supported housing in which a Grade A system per BS 5839-6:2019 is necessary, OR in a residential care home."
            onSite="If a project specifies omitting a zone plan in multi-zone sleeping premises, or omitting an ARC connection in supported housing or a residential care home, the design is non-compliant and cannot be made compliant by treating the omission as an agreed variation. The designer / installer must include both items. The 2025 rules reflect specific incident history and the FRS / regulatory environment around vulnerable occupants."
          >
            <p>The two unacceptable variations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Zone plan absence in multi-zone sleeping premises.</strong> Per 22.2.5 —
                premises with more than one zone on any storey, particularly premises in which
                people sleep, MUST have a zone plan (or other suitable diagrammatic representation).
                The plan is the FRS / building-occupant tool for locating an alarm activation.
                Absence makes locating an active fire dangerously slow when seconds matter.
              </li>
              <li>
                <strong>ARC absence in vulnerable premises.</strong> In supported housing where a
                Grade A system per BS 5839-6:2019 is necessary, OR in a residential care home, a
                facility for transmission of fire alarm signals to an ARC is mandatory. Both
                premises types have particularly vulnerable occupants who depend on ARC-summoned FRS
                attendance for life safety. The 2025 revision makes the ARC non-negotiable in these
                specific premises.
              </li>
              <li>
                <strong>Why these specifically.</strong> Both reflect specific incident history and
                the FRS / regulatory environment. The 2025 revision is the first edition of BS
                5839-1 to declare any variation unacceptable; the choice of these two specific
                departures, out of all possible variations, reflects the proportionality of the
                safety case.
              </li>
              <li>
                <strong>Effect on installations.</strong> A new system in scope cannot be signed off
                if either unacceptable variation is present. An existing system needs to be
                considered against these — 2025 wording is generally not retrospective, so an
                existing system with one of these omissions can continue, but the next major works
                (extension, modification) need to remedy the omission.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Variations / §6 of FIA Guide (Variations — NEW unacceptable departures for 2025)"
            clause={
              <>
                Whilst BS 5839-1:2025 is a code of practice, and variations against the
                recommendations of the standard are allowed, it has now been recognised that the
                following departures from the recommendations of BS 5839-1:2025 are likely to be so
                detrimental to the safety of life that they should NOT be regarded as acceptable
                variations:
                <br />
                <br />
                (a) The absence of a zone plan (or other suitable diagrammatic representation as
                recommended in 22.2.5) in premises in which there is more than one zone on any
                storey, particularly premises in which people sleep; or
                <br />
                <br />
                (b) The absence of a facility for transmission of fire alarm signals to an ARC in
                either: supported housing in which the facility is considered necessary to meet the
                recommendations of BS 5839-1 (where a Grade A system according to BS 5839-6:2019 is
                necessary); or a residential care home.
              </>
            }
            meaning="NEW 2025 departure from the previous editions where any variation could be agreed. Two specific omissions — zone plan in multi-zone sleeping premises, ARC in supported housing / residential care — are too dangerous to safety of life to be agreed as variations. The 2025 revision is the first to draw this line. ALL variations need justification; some can no longer be agreed at all."
          />

          <CommonMistake
            title="A residential care home brief asking for 'no ARC connection — too expensive'"
            whatHappens="A small private residential care home is being refurbished. The owner asks the contractor to omit the ARC connection — 'we have on-site staff who will hear the alarm and call the FRS themselves; ARC subscription is too expensive'. The contractor agrees, treats the omission as a variation, and signs off the system. Two years later, an overnight fire occurs. The on-site care assistant is in the kitchen at the far end of the building, does not hear the panel buzzer for several minutes, and the FRS receive the call later than they would have via ARC. Two residents die. The HSE investigation finds the ARC omission was an unacceptable variation under BS 5839-1:2025 §6 and the contractor / designer is criminally liable for the omission."
            doInstead="Refuse the variation. Explain to the user that BS 5839-1:2025 §6 declares ARC absence in residential care homes UNACCEPTABLE — it cannot be agreed as a variation. Recommend the ARC connection per the standard. If the user insists on omitting, the contractor / designer must decline the work — signing off non-compliance with an unacceptable variation is criminal exposure. The 2025 revision makes this explicit; the cost argument is no defence."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Logbook — Annex H 2025 (was Annex F 2017)</ContentEyebrow>

          <ConceptBlock
            title="The logbook — what it records, who keeps it"
            plainEnglish="The logbook is the system's running diary. It records every event of significance during the system's life — alarms (real and false), faults, service visits, test events, modifications, variations agreed in service-life. The logbook is held by the user and updated by the service organisation at every visit. It is the single source of truth for the system's history. At the next service visit, the engineer reviews the logbook to understand what has happened since the last visit. At a fire incident, the FRS or the HSE investigator reviews the logbook to understand the system's recent history. The 2025 revision moves the logbook annex from F to H and updates the content to reflect clause 48 of the 2025 standard."
            onSite="At handover, hand over the logbook physically (paper bound) or electronically (project portal). Brief the user on what the logbook is, what they record (alarm events, occupant tests), and what the service organisation records (service visits, faults, variations). Update the logbook at every service visit — date, engineer, findings, actions, next-visit-due date. The logbook stays with the system; it does not go to the service organisation's office."
          >
            <p>The logbook content per Annex H 2025:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>System events.</strong> Every alarm activation (date, time, cause as
                identified, action taken, outcome). Every fault (date, time, cause, action,
                outcome). Every test event (occupant tests, weekly tests where carried out, ARC
                tests). The logbook is the primary record of system behaviour.
              </li>
              <li>
                <strong>Service visits.</strong> Every service visit (date, engineer name,
                organisation, third-party scheme membership, findings, actions, next-visit-due
                date). The service visit record shows the system has been maintained per clause
                43.2.1 (~6-monthly with ±1 month tolerance).
              </li>
              <li>
                <strong>Variations.</strong> NEW 2025: ALL variations recorded (was &quot;major
                variations only&quot; in 2017). Variations agreed in service-life — typically
                because of building changes or system modifications — recorded with justification.
              </li>
              <li>
                <strong>Modifications.</strong> Per the new Section 7 of the 2025 standard
                (Extensions and modifications, NEW for 2025), every modification is recorded.
                Includes CIE firmware updates (NEW 2025 clarification — firmware update is a
                modification requiring a certificate).
              </li>
              <li>
                <strong>Disablements.</strong> Periods where parts of the system have been disabled
                for service or temporary works. Recorded with start time, end time, reason,
                alternative protection arrangements.
              </li>
              <li>
                <strong>False alarm investigations.</strong> NEW 2025 link to clause 29.6 —
                false-alarm investigations recorded with cause, action, outcome.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Logbook in practice — the running record"
            plainEnglish="The logbook is the easiest document to skip and the most regretted skip. Service organisations sometimes maintain their own service records and treat the logbook as a duplicate; users sometimes delegate the logbook to the service organisation and lose track. Both are wrong. The logbook is the user's record, kept by the user, updated by the service organisation at the user's site. Skipping or duplicating loses the integrity of the system history."
            onSite="The logbook should be at the panel or in a defined location near the panel. Bound book (preferred — survives) or electronic system (acceptable if backed up). Pre-printed columns for date, event type, description, action, signature. Service organisation entry at every visit; user entry at every alarm or significant event. Reviewed by the next service engineer at the start of each visit; reviewed by the FRS / investigator at any incident."
          />

          <RegsCallout
            source="BS 5839-1:2025 · Logbook clause 48 / Annex H 2025 (was Annex F 2017) · §25 of FIA Guide"
            clause={
              <>
                The logbook clause has been updated to include the recommendation for recording ALL
                variations. The Annex for the logbook (Annex H, previously Annex F in 2017) has been
                updated to reflect the information that is within clause 48. The logbook is held by
                the user and is updated by the service organisation at every visit.
              </>
            }
            meaning="2025 logbook is in Annex H (was F in 2017) — re-lettering reflects re-organisation of the standard's annexes. Content updated for clause 48 alignment. Most significant content change is the all-variations-recorded requirement (NEW 2025 — was 'major' only in 2017)."
          />

          <SectionRule />

          <ContentEyebrow>
            The responsible person and the Regulatory Reform Order 2005
          </ContentEyebrow>

          <ConceptBlock
            title="Who is the responsible person?"
            plainEnglish="The Regulatory Reform (Fire Safety) Order 2005 (the 'RRO' or 'Fire Safety Order') is the primary fire safety legislation for non-domestic premises in England and Wales (equivalent legislation in Scotland and Northern Ireland). It identifies a 'responsible person' who carries the duties for fire safety on the premises. The responsible person is identified by control of the premises: the employer for an employer-controlled premises (offices, factories, schools, hospitals); the occupier where the occupier has control but is not an employer; the owner where the building is unoccupied or in transition. The RRO duties run with the role, not with the building."
            onSite="At handover, identify the responsible person. Often the building manager, the operations director, or a named officer in the occupier organisation. The handover briefing addresses that person — the day-to-day operation of the system, the maintenance arrangements, the logbook, the false-alarm investigation procedure (per 2025 clause 29.6), and the responsible person's broader RRO duties. The briefing is recorded; the user signs to acknowledge."
          >
            <p>The RRO 2005 duties (paraphrased):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Fire risk assessment.</strong> Suitable and sufficient assessment of fire
                risks; reviewed regularly; recorded in writing where 5+ employees or where a licence
                applies. The fire alarm system design follows the FRA — the FRA identifies risks,
                the system controls them.
              </li>
              <li>
                <strong>Fire detection and warning system maintenance.</strong> The fire detection
                and fire alarm system is appropriate to the risk and maintained in efficient working
                order. Maintenance is per BS 5839-1:2025 — clause 43.2.1 approximately 6-monthly
                visits (±1 month).
              </li>
              <li>
                <strong>Information, instruction and training.</strong> Persons on the premises
                receive adequate fire safety information about the system and its use. Includes
                training for staff on response procedures (silence, reset, evacuate).
              </li>
              <li>
                <strong>Records.</strong> Records of the FRA, of system maintenance, of training, of
                significant events. The logbook (Annex H 2025) is the system maintenance record; the
                FRA and training records are separate.
              </li>
              <li>
                <strong>Cooperation and coordination.</strong> Where multiple occupiers share a
                building, the responsible persons cooperate on fire safety. Common in multi-tenanted
                commercial buildings, shopping centres, mixed-use developments.
              </li>
              <li>
                <strong>Enforcement.</strong> The local Fire and Rescue Service is the enforcement
                authority. Notices (informal, prohibition, enforcement) can be issued for breaches.
                Failure to comply with the duties is a criminal offence.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Handover briefing — what to cover"
            plainEnglish="The handover briefing is the formal moment when the commissioning organisation transfers ownership of the system to the user. The briefing is recorded; the user signs to acknowledge receipt of documentation and understanding of duties. Content of the briefing is more than just 'how to use the panel' — it covers the responsible person's RRO duties, the maintenance arrangements, the logbook, the false-alarm investigation procedure (NEW 2025), and the documentation set."
            onSite="Schedule the handover briefing for at least 1-2 hours with the responsible person. Walk through each document; demonstrate panel operation (silence, reset, test); identify the false-alarm-investigation procedure; brief on the RRO duties and what the user is now responsible for; confirm the maintenance arrangement (typically a service contract with a competent organisation); confirm the next service-due date. Sign the acceptance certificate; sign the briefing record. The briefing is the project's last formal step before ongoing service-life begins."
          >
            <p>The briefing agenda:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Documentation walk-through.</strong> Each document explained — purpose,
                audience, where kept. Acceptance certificate, operating manual, O&M, drawings,
                cause-and-effect, logbook, variations record, third-party certification.
              </li>
              <li>
                <strong>Panel operation.</strong> Live demonstration: alarm activation, silence,
                reset, test mode entry / exit, fault response, battery replacement timing, routine
                occupant test. The building manager / receptionist who answers the panel at 02:00
                needs to know exactly what to do.
              </li>
              <li>
                <strong>False-alarm investigation procedure.</strong> NEW 2025 clause 29.6 briefing.
                Categories of false alarm; trigger points for preliminary / in-depth investigation;
                what action looks like (managerial change, system mod, engaged investigator);
                record-keeping requirements.
              </li>
              <li>
                <strong>Responsible person's RRO duties.</strong> Identified responsible person
                briefed on fire risk assessment, system maintenance, occupant training,
                record-keeping. Confirmed in writing.
              </li>
              <li>
                <strong>Maintenance arrangement.</strong> Service contract details (organisation,
                frequency, scope), next service-due date, contact details for fault response. Clause
                43.2.1 ~6-monthly with ±1 month tolerance.
              </li>
              <li>
                <strong>Acceptance certificate signed.</strong> User signs acknowledging acceptance
                and receipt of documentation. System is now in service.
              </li>
            </ol>
          </ConceptBlock>

          <RegsCallout
            source="Regulatory Reform (Fire Safety) Order 2005 · Articles 8-22 · Reflected in BS 5839-1:2025 documentation and handover requirements"
            clause={
              <>
                The Regulatory Reform (Fire Safety) Order 2005 imposes duties on the responsible
                person, including the requirement to carry out a fire risk assessment, ensure the
                fire detection and fire alarm system is appropriate and maintained, ensure persons
                on the premises receive adequate fire safety information and training, maintain the
                system in efficient working order, and keep appropriate records. Failure to comply
                with these duties is a criminal offence.
              </>
            }
            meaning="The RRO 2005 is the primary fire safety legislation for non-domestic premises in England and Wales. The responsible person carries the duties; failure is criminal. BS 5839-1:2025 handover documentation is part of how the responsible person evidences compliance — the FRA references the system; the maintenance record proves ongoing efficient working order; the training record proves occupant briefing."
          />

          <Scenario
            title="Handover of a new system in a 4-storey hotel"
            situation="A new 4-storey 80-bedroom hotel has a Cat L1 system commissioned. Sleeping rooms have smoke detectors (no heat per 2025 §14); MCPs at all required positions; sounders to 65 / 75 / +5 dB targets; ARC connection; multi-zone with zone plan posted at fire panel and at building entrance; full cause-and-effect verified. The system is ready for handover."
            whatToDo="Compile the documentation set: acceptance certificate (Annex G); operating manual; O&M manual; as-installed drawings (zone plan, device schedule, cable routes); cause-and-effect matrix (formal matrix for the 4-storey complex); logbook (Annex H 2025); variations record (any agreed variations from the design + any agreed at install / commissioning — all recorded); third-party scheme certification (FIA / BAFE SP203 / NSI / SSAIB depending on contractor). Identify the responsible person (typically the duty manager or operations director). Schedule a 2-hour handover briefing covering: documentation walk-through, panel operation demonstration, false-alarm-investigation procedure (NEW 2025 clause 29.6 — particularly relevant for a hotel given high false-alarm rate from cooking activities, occupant smoke detectors, etc.), RRO 2005 duties briefing, service-contract confirmation. Sign acceptance certificate and briefing record. Hand over the documentation bundle."
            whyItMatters="Hotels are mid-risk premises with sleeping accommodation. The 2025 revision changes affect them disproportionately — smoke (not heat) in sleeping rooms (§14), zone plan mandatory (§6), false-alarm-investigation procedure briefing (clause 29.6). The handover briefing must address all of these. Hotels also have very high false-alarm rates from cooking smoke and occupant-induced events; the false-alarm-investigation procedure briefing is particularly important — the responsible person needs to know how to investigate, document, and learn from each false alarm."
          />

          <SectionRule />

          <ContentEyebrow>Section 7 — Extensions and modifications (NEW 2025)</ContentEyebrow>

          <ConceptBlock
            title="The new section on extensions and modifications"
            plainEnglish="The 2025 revision adds a new Section 7 — Extensions and modifications. This consolidates the 2017 clause 46 content and adds a clause on extensions. The new wording clarifies that when undertaking an extension to a system, the new works should comply with the current version of BS 5839-1 (2025), but acknowledges that the overall system might not conform to the current standard. The certificate that should be issued after an extension or modification is now an EXTENSION OR MODIFICATION CERTIFICATE (was 'modification certificate' in 2017). And — a NEW 2025 clarification — updating the firmware of a CIE is a MODIFICATION and a certificate must be produced."
            onSite="Any work on an existing system is either an extension (new devices / zones added) or a modification (existing system altered). Both produce an extension or modification certificate. Firmware updates on the CIE — frequently overlooked — are modifications and produce a certificate. Variations from BS 5839-1:2025 introduced by the work are recorded in the certificate, the logbook, and the variations record."
          >
            <p>Section 7 elements:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Extensions.</strong> New work on an existing system — additional zones,
                additional devices, additional sounders. New work complies with BS 5839-1:2025;
                overall system may retain compliance with whichever edition it was originally
                designed to.
              </li>
              <li>
                <strong>Modifications.</strong> Alterations to existing system — device relocation,
                panel firmware update, zone reconfiguration, cause-and-effect changes. Each
                modification produces a certificate.
              </li>
              <li>
                <strong>CIE firmware update.</strong> NEW 2025 clarification — firmware update is a
                modification. Many service organisations had treated firmware updates as routine
                maintenance not requiring a certificate; the 2025 wording removes that ambiguity.
              </li>
              <li>
                <strong>Extension or modification certificate.</strong> Certificate name updated
                from &quot;modification certificate&quot; (2017) to &quot;extension or modification
                certificate&quot; (2025). Records the work, the variations introduced, and any
                updates to the documentation set.
              </li>
              <li>
                <strong>Redundant equipment.</strong> Where a system has been modified and existing
                equipment is no longer in use, NEW 2025 wording — redundant devices should be
                REMOVED where practicable, OR clearly identified as no longer in use. Reduces the
                risk of confusion at future service or in an incident.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Section 7 (Extensions and modifications — NEW for 2025) · §24 of FIA Guide"
            clause={
              <>
                A new Section 7 Extensions and modifications has been added. This new section
                incorporates the previous BS 5839-1:2017 clause 46 and adds a new clause on
                extensions. This clarifies that when undertaking an extension to a system, whilst
                the new works undertaken should comply with the current version of the standard, it
                acknowledges that the overall system might not conform to the current standard. The
                certificate that should be issued after any extension or modification has been
                completed has been updated from a modification certificate to an extension or
                modification certificate. It has now been clarified that updating the firmware of a
                CIE is a modification and as such will require a certificate to be produced.
              </>
            }
            meaning="NEW 2025 section consolidates extensions / modifications guidance. Firmware update is explicitly a modification (closes a 2017 ambiguity). Redundant equipment removed or clearly identified as no longer in use. New certificate name: extension or modification certificate (was modification certificate)."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Third-party scheme certification</ContentEyebrow>

          <ConceptBlock
            title="FIA, BAFE, NSI, SSAIB — independent competence verification"
            plainEnglish="Third-party scheme certification is the recognised industry mechanism for verifying that a fire alarm contractor, designer, commissioning engineer, or service organisation operates to defined competence and quality standards. The schemes audit the organisation's management system, technical competence, training records, equipment calibration, complaint handling, and ongoing performance. Certification is renewed periodically by re-audit. The four major schemes in the UK fire alarm industry are FIA (Fire Industry Association membership), BAFE SP203 (specifically for fire detection and fire alarm system providers), NSI (National Security Inspectorate), and SSAIB (Security Systems and Alarms Inspection Board). Many contractors hold combinations (e.g. FIA + BAFE SP203)."
            onSite="Inclusion of third-party scheme certification on the handover documentation gives the user assurance of competence — independent verification, not just the contractor's own claim. Insurers frequently expect to see certification before issuing or renewing fire-related cover. Local authorities and the FRS may reference scheme membership in enforcement decisions. The certification is included on the acceptance certificate, the extension / modification certificate, and the service visit records."
          >
            <p>The four major schemes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>FIA — Fire Industry Association.</strong> Trade association membership.
                Members commit to industry codes of practice. Common across fire detection / fire
                alarm contractors. Membership audit-based.
              </li>
              <li>
                <strong>BAFE SP203 — Fire Detection and Fire Alarm System.</strong>
                Scheme-specific certification for fire detection and fire alarm system providers.
                Modules cover design, installation, commissioning, maintenance. Audit-based,
                third-party certified by UKAS-accredited certification bodies. Many commercial
                contracts specify BAFE SP203 as a procurement requirement.
              </li>
              <li>
                <strong>NSI — National Security Inspectorate.</strong> Multi-discipline
                certification scheme covering fire detection, intruder, CCTV, access control.
                Audit-based, third-party certified. Tier system reflects the breadth of services
                offered.
              </li>
              <li>
                <strong>SSAIB — Security Systems and Alarms Inspection Board.</strong>
                Multi-discipline certification scheme parallel to NSI; covers fire detection among
                other security and life-safety services. Audit-based, third-party certified.
              </li>
              <li>
                <strong>UKAS-accredited certification bodies.</strong> The organisation that
                actually issues the certification (BSI, NSI, SSAIB, etc.) is itself accredited by
                UKAS — the United Kingdom Accreditation Service. UKAS accreditation gives trust in
                the certification scheme itself.
              </li>
            </ul>
            <p>
              Third-party scheme certification is the answer to &quot;who said you were competent to
              do this?&quot; — the answer is the scheme, not the contractor's own marketing. On a
              serious project, the user / insurer / FRS will look for the scheme. On a handover, the
              certification is part of the documentation set; the expiry date is recorded.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Handover documentation set: acceptance certificate (Annex G) · operating manual · O&M · as-installed drawings · cause-and-effect (NEW 2025 mandatory) · logbook (Annex H 2025) · variations record (NEW 2025 ALL recorded) · third-party certification.',
              'Acceptance certificate per Annex G — issued by commissioning engineer, signed by user. Records parameters, verifications, variations.',
              'Cause-and-effect matrix or text description: NEW 2025 mandatory documentation. Format flexible (matrix for complex; text for simple).',
              'Logbook now in Annex H 2025 (was Annex F 2017). Records all events, service visits, ALL variations (NEW 2025).',
              'NEW 2025: ALL variations recorded (was "major" only in 2017). Each variation justified.',
              'NEW 2025: TWO unacceptable variations declared — (a) zone plan absence in multi-zone sleeping premises; (b) ARC absence in supported housing / residential care.',
              'NEW 2025 clause 29.6: commissioning organisation must brief user on false-alarm investigation procedure.',
              'Responsible person under the RRO 2005 — duties include FRA, system maintenance, occupant training, record-keeping. Failure is criminal.',
              'Service intervals: ~6-monthly per clause 43.2.1 (±1 month tolerance) — NEW 2025 wording, clarifies 2017 strict rule.',
              'Section 7 EXTENSIONS AND MODIFICATIONS — NEW 2025 section. CIE firmware update IS a modification — certificate required.',
              'Redundant equipment: removed where practicable, or clearly identified as no longer in use (NEW 2025 wording).',
              'Third-party certification: FIA / BAFE SP203 / NSI / SSAIB — independent competence verification, audit-based, on certificates and visit records.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'BS 5839-1:2025 mandates a cause-and-effect matrix or text description. What format is acceptable?',
                answer:
                  'Format is flexible. A formal matrix table (rows = causes, columns = effects, ticked cells = mapped) for complex systems; a text description (e.g. "this system operates as a simultaneous evacuation") for simple systems. The standard does not dictate the manner — only that it is produced. The format scales with system complexity. Verified at commissioning and handed over with the system documentation.',
              },
              {
                question:
                  'The 2017 logbook was Annex F. The 2025 logbook is Annex H. Why the re-letter?',
                answer:
                  "The 2025 revision re-organised the standard's annexes. Annex H is the 2025 logbook annex; the content was updated to reflect clause 48 of the 2025 standard, including the all-variations-recorded requirement (NEW 2025 — was 'major' only in 2017). Existing logbooks per the 2017 Annex F format remain valid for systems commissioned to 2017; new systems use Annex H 2025.",
              },
              {
                question:
                  'My client has asked for a system with ARC connection omitted in a residential care home — they want to use on-site staff to call the FRS. Can I agree this as a variation?',
                answer:
                  'No. BS 5839-1:2025 §6 declares the absence of an ARC connection in a residential care home UNACCEPTABLE — it cannot be agreed as a variation regardless of the project context. The 2025 revision is the first edition to declare specific variations unacceptable, reflecting the safety-of-life consequences. Decline the work or insist on the ARC. Signing off non-compliance with an unacceptable variation is criminal exposure under the RRO and BS 5839-1.',
              },
              {
                question: 'A CIE firmware update — does this really need a certificate?',
                answer:
                  'Yes. NEW 2025 clarification — firmware update is a modification, and modifications produce an extension or modification certificate. The 2017 revision was ambiguous; many service organisations treated firmware updates as routine maintenance. The 2025 revision removes the ambiguity. Each firmware update produces a certificate; the logbook is updated; the change is captured in the system documentation.',
              },
              {
                question:
                  'The service interval per clause 43.2.1 is ~6 months with ±1 month tolerance. What does that mean in practice?',
                answer:
                  'It is acceptable for one inspection, test and service of the system to be carried out any time between 5 months and 7 months after the previous inspection, test and service. The acceptance date is the datum for these periods. NEW 2025 wording clarifies the 2017 strict 6-month rule, which had been interpreted as "system non-compliant if outside 6 months". The 2025 wording captures the customary practice of servicing within the month before or the month after the due date.',
              },
              {
                question: 'Variations record — what level of detail does each variation need?',
                answer:
                  'Each variation needs: (a) what the variation is (departure from BS 5839-1:2025 — be specific about the clause); (b) why it was agreed (project-specific reason — structural, occupant requirement, pre-existing system limit); (c) when it was agreed (design / install / commissioning / service stage); (d) by whom (designer / installer / engineer name); (e) effect on the system (any compensating measure — e.g. increased sounder coverage to compensate for a missing zone). Each variation is justified, particularly install / commissioning stage variations.',
              },
              {
                question:
                  'The responsible person under the RRO — must I formally identify them by name on the documentation?',
                answer:
                  'Recommended. Identification on the acceptance certificate or briefing record is good practice, even if the RRO does not strictly mandate it. The RRO identifies the responsible person by role (employer / occupier / owner depending on context); naming the individual makes the duties operationally clear. If the named individual leaves, the role passes to the successor, but a re-confirmation of identity is good practice.',
              },
              {
                question:
                  'A user has lost the original handover documentation. Can the commissioning organisation re-issue?',
                answer:
                  'The commissioning organisation typically retains a copy of the documentation set; re-issue is usually possible. Where a service organisation has taken over from the original commissioning organisation, the service org may have a copy or be able to source one. Where neither retain a copy, the system documentation can be reconstructed from inspection (as-built survey), commissioning re-runs (cause-and-effect re-verified), and a fresh acceptance certificate issued. The reconstruction is more expensive than the original; users should be briefed at handover to keep the documentation safe.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Handover and documentation — Module 5.6" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/fire-alarm-course/module-5')}
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
              onClick={() => navigate('/electrician/upskilling/fire-alarm-course/module-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next module <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">Module 6</div>
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

export default FireAlarmModule5Section6;
