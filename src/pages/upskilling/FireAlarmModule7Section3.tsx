import { ArrowLeft, ChevronLeft, ChevronRight, FileText } from 'lucide-react';
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
    id: 'fam7-s3-cat',
    question:
      'Under BS 5839-1:2025, which system category is intended for protection of LIFE and provides automatic detection in all areas of the building (excluding only specified low-risk locations such as toilets and shower rooms)?',
    options: [
      'Category L1 — life protection, automatic detection throughout the protected premises.',
      'Category M — life protection by manual call points only, no automatic detection.',
      'Category P1 — full automatic detection aimed at protecting property, not life.',
      'Category L4 — life protection confined to escape-route circulation spaces only.',
    ],
    correctIndex: 0,
    explanation:
      'L1 is the broadest life-protection category — automatic detection throughout (excluding only specified low-risk rooms such as toilets/shower rooms), giving the earliest possible warning. L2/L3/L4/L5 progressively reduce coverage; P1/P2 protect property; M is manual only. The 2025 revision tightened L2 to include rooms where people sleep, banning heat detectors there, and added a flue-top detector recommendation in L4.',
  },
  {
    id: 'fam7-s3-mcp',
    question:
      'BS 5839-1:2025 §13 (manual call points). What is the maximum distance from any point in the building to the nearest MCP, post-2025 revision?',
    options: [
      '50 m straight line and 75 m actual travel distance to the nearest manual call point.',
      '20 m straight line and 30 m actual travel distance to the nearest manual call point.',
      '30 m straight line and 45 m actual travel distance to the nearest manual call point.',
      '60 m straight line and 90 m actual travel distance to the nearest manual call point.',
    ],
    correctIndex: 2,
    explanation:
      '30 m straight, 45 m travel — these are maximums; shorter may be specified where the FRA/risk indicates. The 2025 revision simplified the previous escape-route distinctions. MCP mounting 1.4 m ± 200 mm up / 300 mm down → 1.1-1.6 m range; transparent covers preferred. The 2017 "enclosed stairway" location reference has been removed.',
  },
  {
    id: 'fam7-s3-cable',
    question:
      'BS 5839-1:2025 §16 (cabling). What is the recommended cable colour for fire alarm cables, including the low-voltage mains supply, post-2025 revision?',
    options: [
      'Any colour the installer chooses, since cable colour is not specified for fire alarm systems.',
      'Black for the power conductors and red for the signal conductors throughout.',
      'Yellow throughout, to distinguish fire alarm cabling from all other building services.',
      'A single, common colour for all fire alarm cables, with red preferred.',
    ],
    correctIndex: 3,
    explanation:
      'A single common colour (red preferred) applied to ALL fire alarm cables AND the LV mains supply to the system — making the circuit instantly identifiable and reducing misidentification. The functional earth (FE) conductor is now pink (was cream), aligning with IEC 60445 A2:2022 / BS 7671, marked "FE". The 2025 guidance is a clarification, but explicitly including the LV mains is new.',
  },
  {
    id: 'fam7-s3-arc',
    question:
      'BS 5839-1:2025 §14 (alarm transmission). What is the maximum time for an alarm signal from a Cat L system to reach the ARC?',
    options: [
      '90 seconds for Category L systems (120 seconds for Category P systems).',
      'No time is specified — the signal simply has to reach the ARC eventually.',
      '5 minutes for both Category L and Category P systems alike.',
      '30 seconds for both Category L and Category P systems alike.',
    ],
    correctIndex: 0,
    explanation:
      'Cat L = 90 s alarm, Cat P = 120 s; the longer P time reflects property (not life) priority. A catastrophic transmission failure must be indicated at ARC and CIE within 3 min (L) / 31 min (P). These are maximums; IP systems are typically much faster. New in 2025, prompted by the 2027 PSTN switch-off, which mandates IP/digital transmission; any separate PSU should conform to BS EN 54-4 or BS EN 50131-6 Grade 4.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'BS 5839-1:2025 took effect on what date, and what is its legal status?',
    options: [
      '30 April 2025; it is a code of practice published by BSI, not a statutory instrument.',
      '1 January 2025; it is statute law, enforced directly as a statutory instrument.',
      'It has not yet been published; the 2017 edition remains the current standard.',
      '1 January 2026; it becomes statutory law from that date onwards.',
    ],
    correctAnswer: 0,
    explanation:
      'Published 30 April 2025 — a code of practice, referenced by Approved Document B as the route to compliance but not law, and treated by AHJs/insurers/courts as the de facto specification. Departures ("variations") must be justified and recorded; some are now explicitly unacceptable. First full rewrite since 2017.',
  },
  {
    id: 2,
    question:
      'A KEY 2025 change: heat detectors in rooms where people sleep. What does the standard now say?',
    options: [
      'Heat detectors remain fully permitted in sleeping rooms with no new restriction.',
      'Heat detectors are now permitted only in commercial (non-residential) sleeping rooms.',
      'Heat detectors are no longer permitted in rooms where people sleep (L2 and L3 new works).',
      'There is no change from the 2017 edition on detector type in sleeping rooms.',
    ],
    correctAnswer: 2,
    explanation:
      'L2 now treats sleeping rooms as high-risk requiring AFD, and heat detectors are banned there in both L2 and L3 new works — smoke or multi-sensor required, because heat detectors respond too late for sleeping persons. Not retrospective: existing systems remain compliant until a system upgrade triggers refurbishment.',
  },
  {
    id: 3,
    question: 'Another 2025 change: stairway lobbies. What does the standard now require?',
    options: [
      'There is no change — stairway lobbies are treated exactly as in the 2017 edition.',
      'Stairway lobbies now require manual call points (MCPs) only, with no automatic detection.',
      'Stairway lobbies are now explicitly exempt from any detection requirement.',
      'Stairway lobbies are now designated as areas requiring automatic detection (AFD).',
    ],
    correctAnswer: 3,
    explanation:
      'Lobbies were previously excludable as "areas of low fire risk"; 2025 requires AFD because smoke accumulating in lobbies can impede stairway use and lobby detection gives earlier warning of stairway compromise. Combined with the L2 sleeping-room change, this materially extends detection scope in residential and mixed-use buildings.',
  },
  {
    id: 4,
    question:
      'BS 5839-1:2025 introduces a new requirement on cause-and-effect at handover. What is it?',
    options: [
      'A cause-and-effect matrix or text description must be included in the handover documentation.',
      'Cause-and-effect documentation remains optional and is produced only on request.',
      'A cause-and-effect document is required only for Category L1 systems.',
      'A cause-and-effect document is required only in higher-risk buildings (HRBs).',
    ],
    correctAnswer: 0,
    explanation:
      'Mandatory at handover. The form is unspecified and scaled to complexity — as simple as "operates as a simultaneous evacuation" for a small Cat M, or a full matrix for a phased-evacuation system — but it must be produced. The legal hook is RRO Art 38 (firefighter information): without it the responsible person cannot discharge that duty. The contractor produces; the responsible person retains and uses it.',
  },
  {
    id: 5,
    question: 'BS 5839-1:2025 §43.4 introduces a new clause on what subject?',
    options: [
      'The safe disposal of spent standby batteries from the control equipment.',
      'A new procedure for the routine cleaning of point smoke detectors.',
      'Cyber security and remote services for connected, all-IP control and indicating equipment.',
      'A revised method statement for battery testing of the standby supply only.',
    ],
    correctAnswer: 2,
    explanation:
      'Clause 43.4 covers cyber security and remote services. With all-IP networks and connected CIE (Control and Indicating Equipment), it requires preventing unauthorised access to the system and network pathways: physical means (locking the comms cabinet, anti-tamper plugs to patch leads) plus authentication of remote-connection requests before access is allowed. A risk assessment must precede any remote service — particularly read, control or write functions — and the responsible individual must verify the system is fully operational on completion.',
  },
  {
    id: 6,
    question: 'BS 5839-1:2025 changed which annex letter for the logbook?',
    options: [
      'The logbook is now in Annex C, having moved up from Annex F in 2017.',
      'The logbook is now in Annex A, placed at the front of the annexes for prominence.',
      'The logbook is now in Annex Z, the last annex in the reorganised standard.',
      'The logbook is now in Annex H, having moved from Annex F in 2017.',
    ],
    correctAnswer: 3,
    explanation:
      'Logbook = Annex H (was F). Acceptance cert = Annex G. Detector selection = Annex D (was E). The renumbering reflects the structural reorganisation and the new Section 7 (extensions and modifications). The logbook clause now requires ALL agreed variations to be recorded — a change from the 2017 "major" variations (with "major" undefined).',
  },
  {
    id: 7,
    question:
      'BS 5839-1:2025 lists certain variations as "unacceptable" — likely so detrimental to safety that they should not be regarded as acceptable variations. Identify two of these.',
    options: [
      'No zone plan in multi-zone sleeping premises, and no ARC transmission in Grade A supported housing or residential care homes.',
      'Using a different cable colour from the recommended single common colour, and mounting detectors slightly off the recommended height.',
      'Mounting detectors below the recommended height, and siting an MCP just beyond the recommended travel distance.',
      'Substituting one approved cable type for another, and omitting a single sounder in a low-risk store room.',
    ],
    correctAnswer: 0,
    explanation:
      'Unacceptable variations 2025: (i) zone plan missing in multi-zone premises where people sleep (§22.2.5); (ii) ARC transmission absent in supported housing requiring Grade A, or residential care homes. Big change from 2017 where these were just "agreed variations" — contractors and FRAs can no longer rationalise them away. ARC connection is now treated as a life-safety baseline for these sleeping-risk premises.',
  },
  {
    id: 8,
    question:
      'BS 5839-1:2025 maintenance — successive service visits should be at intervals of approximately 6 months. What tolerance is now explicitly permitted in the 2025 revision?',
    options: [
      'No tolerance is permitted — each service must fall exactly six months after the last.',
      'A 3 to 4 month window is permitted between successive service visits.',
      'A 5 to 7 month window between successive service visits, measured from the date of acceptance.',
      'A single 12-month interval between service visits is now permitted.',
    ],
    correctAnswer: 2,
    explanation:
      '5-7 month tolerance window, datum = acceptance date (e.g. a 12 March system gets its first service between 12 August and 12 October). It is a tolerance, not a relaxation — outside the window is non-compliant. The 2017 wording said "should not exceed six months", which was harsher. The CIE clock is checked and adjusted at every visit, and ducted-detector function testing is added to the 12-monthly activity list.',
  },
  {
    id: 9,
    question:
      'BS 5839-1:2025 applies to the non-domestic side of the BS 5839 family. What scope does it cover?',
    options: [
      'All buildings of every type, both domestic and non-domestic, under one common code.',
      'Single-family dwellings only, with all non-domestic premises covered by other standards.',
      'Open-air premises only, such as multi-storey car parks and external storage yards.',
      'Non-domestic premises plus the common parts of multi-occupied residential buildings.',
    ],
    correctAnswer: 3,
    explanation:
      'BS 5839-1 = non-domestic (offices, retail, factories, theatres, hotels, hospitals, schools, stations) plus the common parts of residential blocks. The flats themselves are domestic and fall under BS 5839-6. Boundary = flat entrance door (§7.4). The two parts meet here, and a residential-block project typically engages both standards.',
  },
  {
    id: 10,
    question:
      "A contractor commissions a Cat L2 system on 5 May 2026 in a hotel with sleeping rooms. The detection in the sleeping rooms is heat detection. The maintenance has been on a 9-month interval at the customer's request. What are the BS 5839-1:2025 compliance issues?",
    options: [
      'Two issues: heat detection in the sleeping rooms is non-compliant, and the 9-month service interval is outside the tolerance window.',
      'No issues — both the detection design and the maintenance interval are compliant.',
      'Only the heat detection in the sleeping rooms is a compliance issue, the service interval being acceptable.',
      'Only the 9-month service interval is a compliance issue, the heat detection being acceptable.',
    ],
    correctAnswer: 0,
    explanation:
      'Both. Heat detection in sleeping rooms is not permitted in L2 new works from 2025 — smoke or multi-sensor required; the design needs remediation. A 9-month interval is outside the 5-7 month tolerance window; the next service must be brought forward and then sustained at approximately 6 months. Both are RRO Art 13 / 17 breaches by the responsible person and professional failures by the contractor.',
  },
];

const FireAlarmModule7Section3 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'BS 5839-1 requirements | Fire Alarm Module 7.3 | Elec-Mate',
    description:
      'BS 5839-1:2025 — non-domestic fire detection and alarm code of practice. Categories M / L1-L5 / P1-P2, the major 2025 changes (heat detectors in sleeping rooms, stairway lobbies, cause-and-effect, cyber security, alarm transmission timings, cable colour, MCP distances, mounting heights, service tolerance, unacceptable variations).',
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
            <ArrowLeft className="h-4 w-4" /> Module 7
          </button>

          <PageHero
            eyebrow="Module 7 · Section 3"
            title="BS 5839-1 requirements"
            description="BS 5839-1:2025 (published 30 April 2025) is the code of practice for non-domestic fire detection and fire alarm systems. The first full revision since 2017. Categories M, L1-L5, P1-P2. Major 2025 changes: heat detectors banned in sleeping rooms, stairway lobbies require AFD, cause-and-effect mandatory at handover, cyber security clause, ARC transmission timings, cable colour guidance, MCP distances simplified, service tolerance window, new unacceptable variations."
            tone="yellow"
          />

          <TLDR
            points={[
              'BS 5839-1:2025 — non-domestic code of practice. Published 30 April 2025. Replaces BS 5839-1:2017. Code of practice (not law) but referenced by ADB as the route to B1 compliance.',
              'Categories: M (manual only); L1-L5 (life protection, decreasing coverage); P1-P2 (property protection). /M suffix on L/P categories indicates MCPs additional.',
              '2025 KEY CHANGE 1 — heat detectors banned in rooms where people sleep (L2 / L3 new works). Smoke or multi-sensor required.',
              '2025 KEY CHANGE 2 — stairway lobbies now require AFD (no longer permitted as low-risk exclusion).',
              '2025 KEY CHANGE 3 — cause-and-effect matrix or text description mandatory at handover.',
              '2025 KEY CHANGE 4 — cyber security clause 43.4 (physical access + authenticated remote service + risk assessment).',
              '2025 KEY CHANGE 5 — alarm transmission timings: Cat L 90 s, Cat P 120 s; catastrophic-fail indication 3 min L, 31 min P.',
              '2025 KEY CHANGE 6 — cable colour: red preferred, applies to FA cables AND LV mains supply. FE conductor pink (was cream) per IEC 60445 A2:2022.',
              '2025 KEY CHANGE 7 — MCP distance simplified: 30 m straight, 45 m travel. Mounting 1.1-1.6 m. Transparent covers preferred.',
              '2025 KEY CHANGE 8 — service interval tolerance 5-7 months (was "should not exceed 6 months"). Datum = acceptance date.',
              '2025 KEY CHANGE 9 — ALL variations recorded in logbook (Annex H, was F). Some variations now explicitly UNACCEPTABLE: zone plan missing in multi-zone sleeping premises; ARC absent in supported housing / residential care.',
              '2025 KEY CHANGE 10 — Annexes renumbered: Annex D detector selection (was E), G acceptance cert, H logbook (was F).',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify BS 5839-1:2025 publication date (30 April 2025) and its legal status as a code of practice referenced by ADB',
              'Apply the category framework: M, L1-L5, P1-P2, with /M suffix for added MCPs',
              'Recall the 2025 ban on heat detectors in rooms where people sleep (L2 / L3 new works) and the rationale',
              'Apply the new requirement for AFD in stairway lobbies (was excluded as low-risk in 2017)',
              'Produce a cause-and-effect matrix or text description as a mandatory handover deliverable',
              'Apply the cyber security clause 43.4 (physical access controls, authenticated remote services, risk assessment before remote work)',
              'Apply alarm transmission timings: Cat L 90 s alarm / 3 min catastrophic-fail; Cat P 120 s alarm / 31 min catastrophic-fail',
              'Apply cable colour guidance — red preferred, applies to LV mains as well as FA cables; FE conductor pink',
              'Apply MCP distances (30 m straight, 45 m travel) and mounting heights (1.1-1.6 m) per the simplified 2025 wording',
              'Apply the 5-7 month service tolerance window with date of acceptance as datum',
              'Identify the new "unacceptable variations" introduced in 2025 (zone plan absence; ARC absence in supported housing / care)',
              'Locate BS 5839-1 / BS 5839-6 boundary at the flat entrance door',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The standard — scope and status</ContentEyebrow>

          <ConceptBlock
            title="What BS 5839-1 is, and what it isn't"
            plainEnglish="BS 5839-1 is one part of the BS 5839 family of standards covering fire detection and fire alarm systems. Part 1 covers non-domestic premises (commercial, industrial, places of assembly, retail, hospitality, healthcare, education, common parts of residential blocks). Part 6 covers domestic premises (the inside of dwellings; a separate code of practice covered in §7.4). BS 5839-1 is a CODE OF PRACTICE — it gives recommendations, not mandatory requirements. Departures from it are called variations and must be justified and recorded; the 2025 revision adds the new concept of unacceptable variations (departures so detrimental they are not regarded as acceptable, even if agreed). BS 5839-1 is not law in itself, but is referenced by Approved Document B as the route to compliance with Building Regulations B1 (means of warning and escape) for non-domestic premises."
            onSite="When a client asks 'is the system BS 5839-1 compliant?' the question is about the code of practice. A technically excellent system that departs from BS 5839-1 without justification may still be questioned by the AHJ / insurer / FRS. The standard is the lingua franca; departures need explanation."
          >
            <p>The status of BS 5839-1:2025:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Code of practice.</strong> Published by BSI. Not a statutory instrument.
                Recommendations, not mandatory requirements.
              </li>
              <li>
                <strong>Referenced by ADB.</strong> Approved Document B Volume 2 references BS
                5839-1 as the route to B1 (warning and escape) compliance for non-domestic premises.
                Compliance with BS 5839-1 is therefore the route to compliance with Building
                Regulations.
              </li>
              <li>
                <strong>De facto specification.</strong> AHJs (FRS, building control), insurers, and
                courts treat BS 5839-1 as the expected specification. Departures (variations) are
                permitted but require justification.
              </li>
              <li>
                <strong>Variations and unacceptable variations.</strong> The 2025 revision retains
                the variations concept but introduces "unacceptable variations" — departures that
                are so detrimental to safety that they should not be regarded as acceptable
                variations. These are explicitly listed.
              </li>
              <li>
                <strong>Logbook recording of variations.</strong> The 2025 revision changed the
                logbook clause to require ALL agreed variations to be recorded (was "major"
                variations in 2017, with "major" undefined). Every departure from BS 5839-1
                recommendations must now appear in the logbook with justification.
              </li>
            </ul>
            <p>
              The 2025 revision was published on 30 April 2025 and supersedes BS 5839-1:2017. It is
              the first full revision since 2017 and incorporates eight years of operational
              experience, technological change (IP networking, multi-sensor detectors,
              cyber-connected CIE), and post-Grenfell regulatory pressure. The new section on
              extensions and modifications (Section 7) recognises that most fire alarm work in the
              UK is on existing systems, not new build.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Foreword (Status and use of the code)"
            clause={
              <>
                Compliance with a British Standard cannot confer immunity from legal obligations.
                This British Standard is a code of practice. It takes the form of guidance and
                recommendations. It should not be quoted as if it were a specification and
                particular care should be taken to ensure that claims of compliance are not
                misleading.
              </>
            }
            meaning="The BSI standard wording is precise and worth knowing. BS 5839-1 is GUIDANCE — it cannot be claimed as a specification and the responsible person, designer or contractor cannot use compliance with it as immunity from legal duties. The legal duties (RRO, Building Regulations) are separate. BS 5839-1 is the engineering route TO satisfying those duties, but it is not the duties themselves."
          />

          <ConceptBlock
            title="Categories — the 2025 picture"
            plainEnglish="BS 5839-1 categorises systems by the protective objective. The category drives the design — what to detect, where to detect it, how to alarm, how to transmit. The categories are unchanged in name from 2017 to 2025 but the COVERAGE WITHIN categories changed materially in 2025 (sleeping rooms, stairway lobbies)."
          >
            <p>The category framework:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Category M — Manual only.</strong> Manual call points (MCPs) and sounders.
                No automatic detection. Used in premises where the FRA concludes that human
                detection is reliable and timely (small offices, low-risk shops).
              </li>
              <li>
                <strong>Category L1 — Life protection, full coverage.</strong> Automatic detection
                throughout the protected premises (excluding only specified low-risk locations:
                bathrooms, shower rooms, toilets, areas with similar negligible fire risk). The
                broadest life-protection category. Earliest possible warning. Used in high-risk
                life-safety scenarios — large hospitals, hotels, care homes, nightclubs.
              </li>
              <li>
                <strong>Category L2 — Life protection, escape routes + high-risk areas.</strong>
                AFD on all escape routes plus rooms / areas of higher risk (kitchens, plant rooms,
                storage areas, places where ignition sources are concentrated). 2025 CHANGE: rooms
                where people sleep are now defined as high-risk and require AFD; heat detectors in
                those rooms are no longer permitted (smoke / multi-sensor required).
              </li>
              <li>
                <strong>Category L3 — Life protection, escape routes only.</strong> AFD on escape
                routes (corridors, stairs, lobbies) only. Detection is to give early warning before
                escape routes become smoke-logged; not to protect persons in rooms off the escape
                routes. 2025 CHANGE: even in L3, heat detectors should not be used in rooms where
                people sleep where any AFD is provided in those rooms (objective remains escape
                route, but heat detection in sleeping rooms is inappropriate even where it is
                added).
              </li>
              <li>
                <strong>Category L4 — Life protection, circulation spaces.</strong> AFD in
                circulation spaces forming part of the escape routes only. Smaller scope than L3.
                Used where the FRA / fire strategy concludes that limited detection is adequate.
                2025 CHANGE: where flue-like structures are present, a detector at the top of the
                flue is now recommended (unlike L1, L2, L3, P1, no detector required at every floor
                penetration in L4).
              </li>
              <li>
                <strong>Category L5 — Life protection, custom.</strong> AFD coverage scoped to a
                specific risk identified by the FRA. The "everything else" category — anywhere the
                fire strategy says detection is needed for life safety but the L1-L4 frameworks
                don't fit cleanly.
              </li>
              <li>
                <strong>Category P1 — Property protection, full coverage.</strong> AFD throughout
                the protected premises (excluding the same low-risk locations as L1) but with the
                primary objective of property / business continuity protection rather than life
                safety. Often combined with Cat L for premises with both life and property concerns.
              </li>
              <li>
                <strong>Category P2 — Property protection, defined area.</strong> AFD in defined
                parts of the premises only — typically high-value or high-criticality areas (server
                rooms, archives, museum collections, plant areas) — for property protection.
              </li>
              <li>
                <strong>/M suffix.</strong> Any L or P category may have "/M" added to indicate that
                MCPs are additionally provided throughout. e.g. L2/M means the L2 detection coverage
                plus a complete MCP installation. The /M is operationally significant — without /M,
                an L or P system has only the MCPs at the standard locations (final exits, stairway
                landings); with /M, MCPs are throughout.
              </li>
            </ul>
            <p>
              The category is the FRA / fire strategy decision. The contractor implements; the
              category drives the design. Misalignment between the FRA-recommended category and the
              installed category is one of the commonest sources of regulatory non-compliance — and
              one of the easiest to spot in audit.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The 2025 changes — major technical updates</ContentEyebrow>

          <ConceptBlock
            title="Heat detectors in sleeping rooms — banned (L2/L3 new works)"
            plainEnglish="The 2025 revision changes Category L2 to include rooms where people sleep as a high-risk area requiring AFD. Heat detectors are no longer acceptable in these rooms. The reasoning: by the time a heat detector reaches its activation temperature (typically 54-78°C depending on class), smoke from a smouldering fire has already become a fatal hazard to a sleeping person. Smoke detection or multi-sensor (smoke + heat combined) is the appropriate technology. The change is NOT retrospective: existing systems with heat detection in sleeping rooms remain compliant until the system undergoes new works (e.g. an upgrade or major modification). The change applies prospectively to design and new install. For L3 systems (escape routes only), heat detectors should not be used in sleeping rooms either, even though L3 does not have an explicit objective of protecting persons in those rooms."
            onSite="Hotels, care homes, supported housing, HMOs — anywhere persons sleep — must have smoke or multi-sensor detection in sleeping rooms in any new system or upgraded system from 2025 onwards. Heat detection in a kitchen near a sleeping room is fine (kitchen is not a sleeping room); heat detection in a bedroom is not."
          >
            <p>The technical detail:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Sleeping rooms in L2.</strong> Now require AFD as a high-risk area. The AFD
                must be smoke or multi-sensor — not heat-only.
              </li>
              <li>
                <strong>Sleeping rooms in L3.</strong> Even where AFD is provided in sleeping rooms
                (the L3 objective is escape route, but additional sleeping-room cover is sometimes
                added), heat-only detection is not appropriate. Smoke or multi-sensor.
              </li>
              <li>
                <strong>Multi-sensor configuration.</strong> Where a multi-sensor (smoke + heat) is
                used, the configuration setting matters. The 2025 revision §20.11 emphasises that
                where detection can be set to a number of operating modes (e.g. smoke alone, heat
                alone, smoke + heat OR mode, smoke + heat AND mode), the designer must record the
                selection and configuration. The commissioning technician programs the device per
                the design and records the setting in the operating and maintenance manual. Annex D
                Figure D.1 gives a recommended recording format.
              </li>
              <li>
                <strong>Sprinkler heads as heat detection.</strong> Where sprinkler heads are used
                to initiate a fire condition on the CIE (a long-standing BS 5839-1 acceptance), the
                2025 revision adds a new recommendation: the indication of sprinkler operation
                should be such that there can be no confusion between the area in which the
                sprinkler has operated and any of the fire detection zones. The sprinkler zone
                should not overlap with more than one fire detection zone. (Avoids ambiguity at
                cause-and-effect — the FRS arriving sees clearly which area the sprinkler has
                operated in.)
              </li>
              <li>
                <strong>Not retrospective.</strong> Existing installations with heat detection in
                sleeping rooms remain compliant until they undergo new works. New works trigger
                bringing the affected areas up to 2025 requirements.
              </li>
            </ul>
            <p>
              For the contractor, the operational consequence is that any 2025+ design or
              significant upgrade in a premises with sleeping risk must specify smoke or
              multi-sensor in those rooms. Quotations for upgrades should explicitly confirm or
              exclude the sleeping-room detection upgrade — silence is not acceptable.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · §20.11 (Selection and configuration of detectors)"
            clause={
              <>
                Where detection can be set to a number of different operating modes (e.g. when a
                system incorporates multi sensor detector(s) with a number of different response
                characteristics), the designer should record the selection of the detector type and
                configuration. This information should be made available to the commissioning
                technician and recorded in the operating and maintenance manual for the system [see
                38.1b)]. NOTE A suitable means of recording the information is given in Annex D,
                Figure D.1.
              </>
            }
            meaning="Multi-sensor detectors can be configured for a range of modes — smoke-only, heat-only, smoke+heat OR, smoke+heat AND. The configuration drives the response characteristics. The 2025 standard requires the designer to RECORD the configuration, hand it to the commissioning technician, and put it in the O&M manual. This is a paper-trail requirement designed to prevent silent reconfiguration that changes the system performance without trace."
          />

          <ConceptBlock
            title="Stairway lobbies — AFD now required"
            plainEnglish="The 2017 revision treated stairway lobbies as 'areas of low fire risk' that could be excluded from AFD. The 2025 revision designates stairway lobbies as areas requiring automatic detection. The reasoning: smoke can accumulate in lobbies and impede stairway use during evacuation; lobby smoke detection gives earlier warning of incipient stairway compromise. The change is consistent with the wider 2025 focus on protecting escape routes."
          >
            <p>The technical detail:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Where applicable.</strong> Multi-storey buildings with protected stairways
                that include lobby ventilation (i.e. lobbies separating accommodation from
                stairways). Common in residential blocks, hotels, hospitals, multi-let offices.
              </li>
              <li>
                <strong>Detection type.</strong> Smoke detection — point or beam, with selection per
                BS 5839-1 §20 / Annex D considerations. Heat detection is unsuitable for lobbies
                (smoke fills before heat rises).
              </li>
              <li>
                <strong>Zoning.</strong> Lobby detectors are typically zoned with the floor served
                rather than with the stairway — so that the alarm panel indicates the floor of
                origin clearly to FRS arriving.
              </li>
              <li>
                <strong>Cause-and-effect.</strong> Stairway lobby detection typically initiates
                local sounders (the alarm in the affected area), and may interact with smoke
                ventilation, AOV (automatic opening vent) operation, and lift call-down depending on
                the building's fire strategy.
              </li>
            </ul>
            <p>
              Existing systems without lobby detection are not retrospectively non-compliant — the
              2025 change applies to new works. But adding a floor of new works in an existing
              building may bring the lobby AFD requirement into the affected scope.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Cause-and-effect — mandatory at handover"
            plainEnglish="The 2025 revision adds a specific requirement that a cause-and-effect matrix or text description of how cause-and-effect operates must be included with the documentation provided to the purchaser or user of the system. The standard does not dictate the form: a simple text description ('this system operates as a simultaneous evacuation') is acceptable for a small straightforward system; a complex multi-zone phased-evacuation system needs a full matrix. But it MUST be produced — silence is not acceptable."
          >
            <p>What a cause-and-effect document captures:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Causes.</strong> Each input device (or category of device) and the zone /
                area it covers. Smoke detector in zone 3, heat detector in zone 4, MCP at exit X,
                etc.
              </li>
              <li>
                <strong>Effects.</strong> What happens on activation — sounders, VADs, smoke vent
                operation, lift call-down, maglock release, ARC signal, fire shutter close, gas
                isolation, etc.
              </li>
              <li>
                <strong>Mapping.</strong> For each cause, which effects activate. For complex
                systems with phased evacuation, two-stage alarm, or zoned response, the matrix shows
                which causes trigger which combinations of effects.
              </li>
              <li>
                <strong>Form.</strong> Matrix (rows = causes, columns = effects, X = activate);
                logic-diagram; text description; depending on complexity. The standard does not
                dictate.
              </li>
              <li>
                <strong>Retention.</strong> The document is part of the operating and maintenance
                manual and the logbook ecosystem. The responsible person retains it; the competent
                maintainer uses it at periodic service to verify function.
              </li>
            </ul>
            <p>
              The legal teeth: RRO Article 38 requires the responsible person to provide information
              to firefighters about the building and equipment that affects their safety. The
              cause-and-effect is a primary Article 38 artefact. Without it, the responsible person
              is in default of Article 38; the contractor who handed the system over without one is
              in default of professional duty. The 2025 BS 5839-1 explicit requirement closes the
              loophole.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · §38.1 (Documentation provided at handover) — cause-and-effect"
            clause={
              <>
                A cause-and-effect matrix or text description of how the cause and effect operates
                should be included with the documentation that is provided to the purchaser or user
                of the system. NOTE: For a system that operates as a simultaneous evacuation, this
                could be as simple as a statement to that effect. For more complex strategies, a
                cause-and-effect matrix might be required.
              </>
            }
            meaning='Mandatory cause-and-effect at handover. Form scaled to complexity. The "could be as simple as" wording allows pragmatism for simple systems but does not allow silence.'
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Diagram — BS 5839-1 / BS 5839-6 application boundary</ContentEyebrow>

          {/* BS 5839-1 vs -6 boundary diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              BS 5839-1 (non-domestic) vs BS 5839-6 (domestic) — application boundary
            </h4>
            <svg
              viewBox="0 0 880 480"
              className="w-full h-auto"
              role="img"
              aria-label="BS 5839-1 covers non-domestic premises (offices, retail, hospitality, healthcare, education, places of assembly) and the common parts of multi-occupied residential. BS 5839-6 covers the inside of dwellings. Boundary at flat entrance door. Building types listed by part."
            >
              {/* Title row */}
              <text x="440" y="26" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">
                BS 5839 family — application boundary
              </text>

              {/* Left column — BS 5839-1 NON-DOMESTIC */}
              <g>
                <rect
                  x="20"
                  y="50"
                  width="400"
                  height="380"
                  rx="14"
                  fill="rgba(251,191,36,0.06)"
                  stroke="#FBBF24"
                  strokeWidth="2"
                />
                <text
                  x="220"
                  y="78"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="13"
                  fontWeight="bold"
                >
                  BS 5839-1:2025
                </text>
                <text x="220" y="96" textAnchor="middle" fill="white" fontSize="11">
                  NON-DOMESTIC PREMISES
                </text>
                <text x="220" y="112" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                  + common parts of residential
                </text>

                {/* Building type list */}
                <text x="40" y="140" fill="white" fontSize="10" fontWeight="bold">
                  Commercial:
                </text>
                <text x="40" y="155" fill="rgba(255,255,255,0.85)" fontSize="9.5">
                  {' '}
                  · offices, retail, banks
                </text>
                <text x="40" y="173" fill="white" fontSize="10" fontWeight="bold">
                  Industrial:
                </text>
                <text x="40" y="188" fill="rgba(255,255,255,0.85)" fontSize="9.5">
                  {' '}
                  · factories, warehouses, workshops
                </text>
                <text x="40" y="206" fill="white" fontSize="10" fontWeight="bold">
                  Places of assembly:
                </text>
                <text x="40" y="221" fill="rgba(255,255,255,0.85)" fontSize="9.5">
                  {' '}
                  · theatres, cinemas, leisure, worship
                </text>
                <text x="40" y="239" fill="white" fontSize="10" fontWeight="bold">
                  Hospitality:
                </text>
                <text x="40" y="254" fill="rgba(255,255,255,0.85)" fontSize="9.5">
                  {' '}
                  · hotels, hostels, restaurants
                </text>
                <text x="40" y="272" fill="white" fontSize="10" fontWeight="bold">
                  Healthcare:
                </text>
                <text x="40" y="287" fill="rgba(255,255,255,0.85)" fontSize="9.5">
                  {' '}
                  · hospitals, residential care (Grade A)
                </text>
                <text x="40" y="305" fill="white" fontSize="10" fontWeight="bold">
                  Education:
                </text>
                <text x="40" y="320" fill="rgba(255,255,255,0.85)" fontSize="9.5">
                  {' '}
                  · schools, FE, universities
                </text>
                <text x="40" y="338" fill="white" fontSize="10" fontWeight="bold">
                  Transport:
                </text>
                <text x="40" y="353" fill="rgba(255,255,255,0.85)" fontSize="9.5">
                  {' '}
                  · stations, airports, terminals
                </text>
                <text x="40" y="371" fill="white" fontSize="10" fontWeight="bold">
                  Common parts:
                </text>
                <text x="40" y="386" fill="rgba(255,255,255,0.85)" fontSize="9.5">
                  {' '}
                  · stairs, lobbies, corridors of flats
                </text>
                <text x="40" y="404" fill="rgba(255,255,255,0.7)" fontSize="9">
                  {' '}
                  Categories: M / L1-L5 / P1-P2
                </text>
                <text x="40" y="418" fill="rgba(255,255,255,0.7)" fontSize="9">
                  {' '}
                  Panel-based architecture
                </text>
              </g>

              {/* Boundary in middle */}
              <g>
                <rect
                  x="430"
                  y="200"
                  width="20"
                  height="80"
                  rx="6"
                  fill="rgba(239,68,68,0.30)"
                  stroke="#EF4444"
                  strokeWidth="2"
                />
                <text
                  x="440"
                  y="174"
                  textAnchor="middle"
                  fill="#EF4444"
                  fontSize="10"
                  fontWeight="bold"
                >
                  BOUNDARY
                </text>
                <text
                  x="440"
                  y="188"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.75)"
                  fontSize="9"
                >
                  flat entrance
                </text>
                <text
                  x="440"
                  y="200"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.75)"
                  fontSize="9"
                >
                  door
                </text>
                <text x="440" y="295" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                  RRO scope post-
                </text>
                <text x="440" y="307" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                  Fire Safety
                </text>
                <text x="440" y="319" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                  Act 2021
                </text>
              </g>

              {/* Right column — BS 5839-6 DOMESTIC */}
              <g>
                <rect
                  x="460"
                  y="50"
                  width="400"
                  height="380"
                  rx="14"
                  fill="rgba(34,211,238,0.06)"
                  stroke="#22D3EE"
                  strokeWidth="2"
                />
                <text
                  x="660"
                  y="78"
                  textAnchor="middle"
                  fill="#22D3EE"
                  fontSize="13"
                  fontWeight="bold"
                >
                  BS 5839-6:2019+A1:2020
                </text>
                <text x="660" y="96" textAnchor="middle" fill="white" fontSize="11">
                  DWELLINGS
                </text>
                <text x="660" y="112" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                  inside the home, HMOs, flats
                </text>

                {/* Dwelling type list */}
                <text x="480" y="140" fill="white" fontSize="10" fontWeight="bold">
                  Single-family:
                </text>
                <text x="480" y="155" fill="rgba(255,255,255,0.85)" fontSize="9.5">
                  {' '}
                  · houses, bungalows, flats (interior)
                </text>
                <text x="480" y="173" fill="white" fontSize="10" fontWeight="bold">
                  Multi-occupied (HMO):
                </text>
                <text x="480" y="188" fill="rgba(255,255,255,0.85)" fontSize="9.5">
                  {' '}
                  · shared houses, bedsits, lodgings
                </text>
                <text x="480" y="206" fill="white" fontSize="10" fontWeight="bold">
                  Supported housing:
                </text>
                <text x="480" y="221" fill="rgba(255,255,255,0.85)" fontSize="9.5">
                  {' '}
                  · sheltered, extra-care
                </text>
                <text x="480" y="239" fill="white" fontSize="10" fontWeight="bold">
                  Granny annexes:
                </text>
                <text x="480" y="254" fill="rgba(255,255,255,0.85)" fontSize="9.5">
                  {' '}
                  · self-contained dwelling extensions
                </text>
                <text x="480" y="272" fill="white" fontSize="10" fontWeight="bold">
                  Loft conversions:
                </text>
                <text x="480" y="287" fill="rgba(255,255,255,0.85)" fontSize="9.5">
                  {' '}
                  · new storey in existing dwelling
                </text>
                <text x="480" y="305" fill="rgba(255,255,255,0.4)" fontSize="9">
                  {' '}
                  ─
                </text>
                <text x="480" y="324" fill="white" fontSize="10" fontWeight="bold">
                  Grades (post-A1:2020):
                </text>
                <text x="480" y="339" fill="rgba(255,255,255,0.85)" fontSize="9.5">
                  {' '}
                  A · C · D1 · D2 · F1 · F2
                </text>
                <text x="480" y="357" fill="white" fontSize="10" fontWeight="bold">
                  Categories:
                </text>
                <text x="480" y="372" fill="rgba(255,255,255,0.85)" fontSize="9.5">
                  {' '}
                  LD1 · LD2 · LD3
                </text>
                <text x="480" y="392" fill="rgba(255,255,255,0.7)" fontSize="9">
                  {' '}
                  Detector-based / panel-based
                </text>
                <text x="480" y="406" fill="rgba(255,255,255,0.7)" fontSize="9">
                  {' '}
                  Interlinked (HW or RF)
                </text>
                <text x="480" y="420" fill="rgba(255,255,255,0.7)" fontSize="9">
                  {' '}
                  Covered in detail in §7.4
                </text>
              </g>

              {/* Bottom annotation */}
              <g>
                <rect
                  x="20"
                  y="445"
                  width="840"
                  height="28"
                  rx="6"
                  fill="rgba(255,255,255,0.04)"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="1"
                />
                <text
                  x="440"
                  y="463"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.75)"
                  fontSize="9.5"
                >
                  Mixed schemes (e.g. residential block) typically engage BOTH parts: BS 5839-1 in
                  common parts, BS 5839-6 inside flats. Cause-and-effect must coordinate at flat
                  entrance door.
                </text>
              </g>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>The 2025 changes — operational detail</ContentEyebrow>

          <ConceptBlock
            title="Cyber security — clause 43.4"
            plainEnglish="With the rise of all-IP networks and connected CIE (Control and Indicating Equipment), the 2025 revision introduces a specific cyber security clause. The clause covers physical access control (locking the comms cabinet, anti-tamper plugs to patch leads), authentication of remote-connection requests, and a requirement to conduct a risk assessment before performing any remote service — particularly when executing read, control or write functions. The responsible individual must ensure the system is fully operational on completion of the remote service."
          >
            <p>The cyber security elements:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Physical access.</strong> Lock comms cabinets housing the CIE network
                interface. Anti-tamper plugs in patch leads that would otherwise be accessible.
                Limit physical access to the equipment to authorised persons.
              </li>
              <li>
                <strong>Authentication.</strong> Remote-connection requests should be authenticated
                in the CIE or gateway software before remote access is allowed. The principle: no
                unauthenticated remote connection.
              </li>
              <li>
                <strong>Risk assessment before remote work.</strong> Particularly for read / control
                / write functions, a risk assessment evaluates the impact on CIE operation. If there
                is risk that the remote service might compromise CIE function, the responsible
                individual must ensure full operational verification on completion.
              </li>
              <li>
                <strong>Audit trail.</strong> Remote service activities should leave an audit trail
                in the CIE log.
              </li>
              <li>
                <strong>Network architecture.</strong> Where the fire alarm system shares network
                with other building systems, isolation / segmentation should prevent
                cross-contamination of cyber risk.
              </li>
            </ul>
            <p>
              This is a new operational area for many fire alarm contractors. The competence
              expected post-2025 includes basic cyber-aware practice — segregating fire alarm
              networks from general IT, configuring authentication, conducting risk assessment
              before remote intervention. Contractors who treat their CIE network port as "just
              another connection" are not 2025-compliant.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Alarm transmission — Cat L 90 s, Cat P 120 s"
            plainEnglish="With the PSTN switch-off scheduled for 2027 and the UK move to all-IP networks, the 2025 revision specifies maximum times for alarm transmission to an Alarm Receiving Centre (ARC). For Cat L (life protection): an indication should be received at the ARC within 90 seconds of fire alarm activation; a catastrophic failure of the transmission system (no signals can be transmitted) should be indicated at the ARC and CIE within 3 minutes. For Cat P (property protection): 120 seconds for alarm; 31 minutes for catastrophic failure indication. These are MAXIMUM times — IP-based systems are typically much faster."
          >
            <p>The detail:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Cat L — alarm to ARC:</strong> ≤ 90 seconds.
              </li>
              <li>
                <strong>Cat L — catastrophic-fail indication:</strong> ≤ 3 minutes (at ARC AND CIE).
              </li>
              <li>
                <strong>Cat P — alarm to ARC:</strong> ≤ 120 seconds.
              </li>
              <li>
                <strong>Cat P — catastrophic-fail indication:</strong> ≤ 31 minutes (at ARC AND
                CIE).
              </li>
              <li>
                <strong>Power supply for transmission equipment.</strong> Where a separate PSU is
                used to power alarm transmission equipment, it should conform to BS EN 54-4 OR BS EN
                50131-6 Grade 4. The latter is an Intruder & Hold-Up Alarm Systems (I&HAS) PSU
                standard — recognised in 2025 as adequate for fire alarm transmission.
              </li>
              <li>
                <strong>False alarm notice.</strong> The 2025 revision recommends a label fixed to
                or adjacent to the CIE: "False alarm notice — this fire alarm has an active
                connection to the fire and rescue service. Contact telephone: [ARC number]." Reduces
                FRS attendance to false alarms by reminding premises management to notify the ARC
                before testing.
              </li>
              <li>
                <strong>ARC information.</strong> The ARC should be provided with all relevant
                information about the premises (e.g. whether sleeping accommodation is present), so
                it can pass that information to FRS on alarm. Where practicable, the alarm signal
                should indicate the nature of the triggering device (smoke / heat / MCP) and whether
                coincidence filtering is in place.
              </li>
            </ul>
            <p>
              For the contractor, the practical effect is that alarm transmission must use IP (or
              other digital path) capable of meeting the timing. Old-style PSTN dialler equipment
              becomes obsolete with the 2027 PSTN switch-off; replacement is necessary regardless of
              any other consideration. The 2025 timings give the engineering target.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · §14.17 / §14.18 (Alarm transmission timings)"
            clause={
              <>
                14.17 For Category L systems, in the event of a fire alarm signal, an indication
                should be received at the ARC within a maximum of 90 s; a catastrophic failure of
                the transmission system (whereby no alarm signals can be transmitted) should be
                indicated at the ARC and the CIE within 3 min. 14.18 For Category P systems, in the
                event of a fire alarm signal, an indication should be received at the ARC within a
                maximum of 120 s; a catastrophic failure of the transmission system (whereby no
                alarm signals can be transmitted) should be indicated at the ARC and the CIE within
                31 min.
              </>
            }
            meaning="90 / 3 for L; 120 / 31 for P. The catastrophic-fail timing for P (31 minutes) reflects the property-protection priority — slower to detect transmission loss is acceptable for property than for life. The IP-based transmission path makes these timings readily achievable."
          />

          <ConceptBlock
            title="Cabling, MCPs, mounting heights — the simplifications"
            plainEnglish="The 2025 revision tidies several long-running ambiguities in the 2017 standard. Cable colour: red preferred, applied to FA cables AND to the LV mains supply (the 2017 wording was unclear whether the LV mains should be the same colour). FE conductor pink (was cream) per IEC 60445 amendment 2 (2022), which BS 7671 also picked up. MCP distance: simplified to 30 m straight, 45 m travel (was a more complex statement in 2017). MCP mounting: 1.4 m above finished floor level with tolerance 200 mm above (1.6 m max) and 300 mm below (1.1 m min) — clarifying the 2017 wording. The reference to 'enclosed stairway' in the 2017 MCP location clause has been removed in 2025."
          >
            <p>The cable colour change in detail:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>FA cables.</strong> Single common colour. Red preferred.
              </li>
              <li>
                <strong>LV mains supply to FA system.</strong> Same colour. Red preferred. This is
                the 2025 clarification — the 2017 was silent on the mains supply colour.
              </li>
              <li>
                <strong>FE (functional earth) conductor.</strong> Pink. Marked or coloured pink with
                the alphanumeric designation "FE". This change reflects BS 7671 / IEC 60445
                amendment 2 (2022). Previous colour was cream.
              </li>
              <li>
                <strong>Battery labels.</strong> 2025 acknowledges the long-standing custom of
                labelling batteries with date of installation using a permanent marker as acceptable
                practice (was a "should affix a label" requirement; permanent marker now explicitly
                accepted).
              </li>
            </ul>
            <p>The MCP detail:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Distance.</strong> ≤ 30 m straight line AND ≤ 45 m actual travel from any
                point in the building to the nearest MCP. These are MAXIMUM; design can specify
                shorter.
              </li>
              <li>
                <strong>Mounting height.</strong> 1.4 m above finished floor level. Tolerance: up to
                200 mm above (i.e. up to 1.6 m); up to 300 mm below (i.e. down to 1.1 m). Acceptable
                range therefore 1.1-1.6 m. This range accommodates ergonomic and accessibility
                considerations.
              </li>
              <li>
                <strong>Protective covers.</strong> Where used, recommended to be transparent (so
                the MCP indicator remains visible).
              </li>
              <li>
                <strong>Stairway MCPs.</strong> The 2017 reference to "enclosed stairway" has been
                removed. The 2025 wording: "if manual call points are located on the landings of a
                stairway, the MCP on each level, other than a final exit level from the stairway,
                should be incorporated within the zone that serves the adjacent accommodation on
                that level." Cleaner wording, same operational effect.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Variations — what changed in 2025</ContentEyebrow>

          <ConceptBlock
            title="Acceptable, recorded, unacceptable"
            plainEnglish="BS 5839-1 has always permitted variations — agreed departures from the recommendations where the design context justifies it. The 2017 revision required only 'major' variations to be recorded in the logbook (with 'major' undefined). The 2025 revision tightens this in two ways. First, ALL agreed variations must now be recorded in the logbook — no threshold, no judgment call. Second, the standard introduces 'unacceptable variations' — departures that are so detrimental to safety they should NOT be regarded as acceptable variations even if all parties agreed. Two are explicitly listed; the standard contemplates more emerging in practice."
          >
            <p>The two unacceptable variations explicitly named in 2025:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Zone plan absence.</strong> The absence of a zone plan (or other suitable
                diagrammatic representation as recommended in §22.2.5) in premises with more than
                one zone on any storey, particularly premises in which people sleep. The reasoning:
                without a zone plan at the CIE, the FRS arriving cannot tell which area is in alarm
                — a fundamental Article 38 (firefighter information) failure.
              </li>
              <li>
                <strong>ARC absence in supported housing / residential care.</strong> The absence of
                a facility for transmission of fire alarm signals to an Alarm Receiving Centre in
                either (a) supported housing in which the facility is considered necessary to meet
                the recommendations of BS 5839-1 (where a Grade A system per BS 5839-6 is
                necessary), or (b) a residential care home. The reasoning: in premises with
                vulnerable sleeping occupants and limited self-evacuation capability, ARC connection
                is the difference between a 90-second response and an unsignalled fire.
              </li>
            </ul>
            <p>
              The change is significant. Pre-2025, contractors and FRA assessors could rationalise
              away these omissions as "agreed variations" — the responsible person didn't want the
              cost of an ARC connection, or the original system pre-dated zoning, or whatever the
              reason. Post-2025, those variations are unacceptable; agreement does not legitimise
              them; the standard regards them as outside the envelope of acceptable practice. AHJs,
              insurers and courts will treat them accordingly.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Cl 6 (Variations) — unacceptable variations"
            clause={
              <>
                Whilst BS 5839-1:2025 is a code of practice, and variations against the
                recommendations of the standard are allowed, it has now been recognised that the
                following departures from the recommendations of BS 5839-1:2025 are likely to be so
                detrimental to the safety of life that they should NOT be regarded as acceptable
                variations. These are: (a) The absence of a zone plan (or other suitable
                diagrammatic representation as recommended in 22.2.5) in premises in which there is
                more than one zone on any storey, particularly premises in which people sleep; (b)
                The absence of a facility for transmission of fire alarm signals to an ARC in either
                (i) supported housing in which the facility is considered necessary to meet the
                recommendations of BS 5839-1 (where a Grade A system according to BS 5839-6:2019 is
                necessary); or (ii) a residential care home.
              </>
            }
            meaning='Two named unacceptable variations. Beyond these, the principle introduced in 2025 is that variations need justification — especially if proposed at installation or commissioning stage rather than at design stage. ALL variations now go in the logbook (was "major" only).'
          />

          <ConceptBlock
            title="Service interval — the 5-7 month window"
            plainEnglish="The 2017 standard said inspection / servicing visits 'should not exceed six months' — strict and uncompromising. The 2025 revision restates this as: visits at intervals of approximately 6 months, with explicit acceptable tolerance of 5 to 7 months between visits. The date of acceptance is the datum for these periods. The change reflects customary practice (servicing within a month of due date) and removes the harsh edge of the 2017 wording. But it remains a tolerance — not a relaxation. Sliding outside 5-7 months is non-compliant."
          >
            <p>The mechanics:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Datum.</strong> Date of acceptance (commissioning) of the system. e.g.
                accepted 12 March 2026.
              </li>
              <li>
                <strong>First service window.</strong> 12 August (5 months) to 12 October (7 months)
                2026.
              </li>
              <li>
                <strong>Subsequent visits.</strong> Each at approximately 6 months from the
                previous, with the same 5-7 tolerance band.
              </li>
              <li>
                <strong>Outside the window.</strong> Non-compliant. The system is "no longer
                compliant with this part of BS 5839" in the language of the 2017 revision.
              </li>
              <li>
                <strong>Daylight savings / time clock.</strong> The 2025 revision adds: at every
                service visit, the time clock of the CIE should be checked and adjusted. Important
                where the system has day / night settings (different sensitivity, sounder strategies
                for occupied / unoccupied periods).
              </li>
              <li>
                <strong>Ducted detector function test.</strong> Added at 12-monthly visit in 2025 —
                function test of smoke detectors in ventilation ducts.
              </li>
              <li>
                <strong>Text descriptor verification.</strong> On addressable systems, the premises
                management informs the servicing organisation of any text-descriptor changes;
                periodic verification (e.g. every 5 years) is prudent. The 2025 standard does not
                require text descriptor verification at every routine service.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Designing 2026 new works to BS 5839-1:2017"
            whatHappens="The contractor's standard design practice was set in 2018 and uses BS 5839-1:2017. A 2026 new-works project is designed to that standard. The system has heat detectors in sleeping rooms, no AFD in stairway lobbies, and a thin handover pack with no cause-and-effect document. The system is commissioned. An FRA review or AHJ audit picks it up: non-compliant with BS 5839-1:2025 on multiple counts."
            doInstead="Update standard practice to BS 5839-1:2025 from publication (30 April 2025). New works after that date design to 2025. Where existing systems exist and undergo new works, the new works specifically must meet 2025; legacy parts of the system may remain on 2017 norms until next refurbishment. Document the version applied in design notes and on certificates."
          />

          <CommonMistake
            title="Recording only 'major' variations in the logbook (2017 habit)"
            whatHappens="The maintainer continues 2017 practice and records only what they judge to be 'major' variations. A small variation — e.g. a detector mounted at 1.5 m on a high-ceiling area where a deeper mount would normally apply — is not recorded. Over time, the cumulative undocumented variations make the system hard to assess against the standard. An audit reveals an unfavourable picture; the responsible person cannot demonstrate compliance."
            doInstead="Record EVERY agreed variation in the logbook from the 2025 revision onwards. Each variation gets: description, justification, date agreed, parties agreeing. The logbook then becomes the primary evidence at audit. Better to over-record than to under-record."
          />

          <Scenario
            title="The 36-bed care home — Cat L1, ARC, sprinklers"
            situation="A residential care home (36 bedrooms, single-storey corridor layout) is being refurbished. Existing system: Cat L3 (escape routes only). Existing detection: heat in resident rooms. No ARC connection. The fire risk assessment recommends Cat L1 with full coverage including residents' rooms; the building also has sprinklers due to the 2025 sprinkler regulations for new and altered care premises."
            whatToDo="The residents' rooms must have smoke or multi-sensor detection — heat detectors are no longer permitted in sleeping rooms in 2025 new works (2025 §14). The sprinkler heads, if used to initiate fire condition on the CIE, must be zoned so that there can be no confusion between sprinkler operation area and detection zones; sprinkler zones must not overlap with more than one detection zone (2025 §14). ARC connection is now mandatory under the new unacceptable variations clause — its absence in a residential care home is an unacceptable variation. Cause-and-effect (smoke / multi-sensor → local sounder + remote sounder + ARC + sprinkler-zone-correlated indication) must be documented at handover (2025 §38.1). The cable colour: red preferred for FA and LV mains; FE pink (2025 §16). MCPs at exits, 30 m straight / 45 m travel maximum, mounted 1.1-1.6 m. Service interval thereafter 5-7 months from acceptance."
            whyItMatters="Residential care premises are heavily regulated (CQC for the care; FRS for fire). The 2025 changes specifically aimed at sleeping-risk premises (heat ban, ARC unacceptable variation) bite hardest here. The contractor delivering a 2017-style system to a 2026 care home creates an immediate compliance deficit; the responsible person who accepts it is in default of RRO Art 13 / Art 17. Get 2025-aware from project start."
          />

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'BS 5839-1:2025 published 30 April 2025. Code of practice (not law) but referenced by ADB as route to B1 compliance.',
              'Categories: M (manual only); L1-L5 (life, decreasing coverage); P1-P2 (property). /M suffix adds MCPs throughout.',
              'KEY 2025: heat detectors banned in sleeping rooms (L2 / L3 new works). Smoke or multi-sensor required.',
              'KEY 2025: stairway lobbies require AFD (was excluded as low-risk).',
              'KEY 2025: cause-and-effect matrix or text description mandatory at handover.',
              'KEY 2025: cyber security clause 43.4. Physical access + authentication + risk assessment before remote service.',
              'KEY 2025: ARC alarm transmission Cat L 90 s / 3 min catastrophic-fail; Cat P 120 s / 31 min.',
              'KEY 2025: cable colour red preferred (FA and LV mains). FE conductor pink (was cream) per IEC 60445 A2:2022.',
              'KEY 2025: MCPs 30 m straight / 45 m travel, mounted 1.1-1.6 m, transparent covers preferred.',
              'KEY 2025: service interval tolerance 5-7 months. Acceptance date = datum.',
              'KEY 2025: ALL agreed variations in logbook (was "major" only). Logbook is now Annex H (was F).',
              'KEY 2025: unacceptable variations — zone plan absence in multi-zone sleeping premises; ARC absence in supported housing / residential care.',
              'A4:2026 BS 7671 cross-reference: §560 special locations safety services — fire alarm cabling and circuit segregation per 560.7 / 560.8 / 560.10. Updated cable performance criteria align with BS 5839-1:2025 cable colour and identification.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  "Our existing care home has heat detectors in residents' rooms. Are we now non-compliant?",
                answer:
                  'Not retrospectively. The 2025 ban on heat detectors in sleeping rooms applies to new works (new install or upgrade). Existing systems remain compliant with the standard at the time of installation until they undergo new works. But — the FRA may already have flagged the heat detection in sleeping rooms as inadequate; if so, you have an FRA-level finding to address regardless of standard retrospection. Best practice: plan a phased replacement to smoke / multi-sensor in sleeping rooms over the next service cycles.',
              },
              {
                question: 'What is the difference between Cat L2 with /M suffix and Cat L1?',
                answer:
                  "L2 is escape routes plus high-risk areas. L2/M adds MCPs throughout the premises (not only at exits / stairways). L1 is escape routes plus all areas (excluding only specified low-risk locations). Coverage is the difference: L2/M still has automatic detection only in escape routes plus high-risk areas; L1 has automatic detection essentially everywhere. The /M suffix doesn't extend AFD; it extends manual call point provision. So L2/M < L1 in detection coverage.",
              },
              {
                question: 'For Cat M (manual only) systems, do the 2025 changes affect me?',
                answer:
                  "Some yes, some no. Cat M is unaffected by the heat-detector-in-sleeping-rooms change (no AFD anywhere). Cat M systems are affected by: cable colour clarification (red preferred including LV mains), MCP distance simplification (30 m / 45 m), mounting height tolerance (1.1-1.6 m), service interval tolerance (5-7 months), all variations recorded in logbook. Cause-and-effect for a Cat M can be a single sentence ('this system operates as a simultaneous evacuation') but it MUST appear in the documentation.",
              },
              {
                question:
                  'Our existing addressable panel is an older model with no cyber security features (no authentication for remote connection, no audit log). Does the 2025 cyber clause make it non-compliant?',
                answer:
                  'The 2025 §43.4 applies primarily to systems that are remotely connected. A standalone panel with no remote service capability is largely outside the cyber concerns. Where the panel has remote service capability and the capability lacks the §43.4 features, the 2025 standard says you should manage the gap with physical access controls, organisational controls, and risk assessment before any remote intervention. Long-term, replacing the panel with a 2025-compliant model is the path; short-term, document the gap and the controls in the logbook as a recorded variation.',
              },
              {
                question: 'What changed about the logbook in 2025?',
                answer:
                  "The logbook annex is now Annex H (was Annex F in 2017). The logbook clause itself (Cl 48) was updated to require ALL agreed variations to be recorded — the 2017 wording said only 'major' variations, with 'major' undefined. The Annex H content reflects this and other changes (e.g. service tolerance recording, text descriptor verification record).",
              },
              {
                question:
                  'How does BS 5839-1:2025 interact with the BS 7671 A4:2026 update for fire alarm circuit cabling?',
                answer:
                  'BS 7671:2018+A4:2026 §560 (Safety services) governs the electrical installation of fire alarm circuits — segregation, protection against fault propagation, supply arrangements (560.7-560.10), AFDD requirements where applicable. BS 5839-1:2025 governs the fire alarm system itself — cable type (fire-resistant per BS 8434 / BS EN 50200 / BS 50362), colour (red preferred), routing, identification. The two interact: A4:2026 sets the BS 7671 electrical requirements; BS 5839-1:2025 sets the fire alarm system requirements; both apply concurrently. The contractor must satisfy both. Cable colour red preferred (BS 5839-1) AND fire-resistant per the relevant BS test (BS 5839-1) AND segregated from other circuits per BS 7671 §560.',
              },
              {
                question:
                  "The new 'unacceptable variations' for ARC absence — does this apply to all premises with sleeping risk?",
                answer:
                  'No — the 2025 list is specific. Unacceptable variation 1: zone plan absence in multi-zone premises with sleeping risk. Unacceptable variation 2: ARC absence in (i) supported housing where Grade A is necessary, or (ii) residential care homes. A standard hotel is not in the unacceptable variation list (though the FRA is very likely to recommend ARC anyway). The unacceptable variations are calibrated to the highest-risk sleeping premises — supported housing and residential care, where occupants have limited self-evacuation capability.',
              },
              {
                question: 'Where do I find Annex G (acceptance certificate) and is it new in 2025?',
                answer:
                  'Annex G is the acceptance certificate template — the document the commissioning organisation issues to confirm the system has been installed and tested in accordance with the recommendations of BS 5839-1. It existed in 2017 (Annex G was the same content) but the 2025 revision updated it to reflect the new clauses (cause-and-effect handover, cyber security, alarm transmission timings). Use the 2025 version for any system commissioned from 30 April 2025 onwards.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="BS 5839-1 requirements — Module 7.3" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/fire-alarm-course/module-7')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 7
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/fire-alarm-course/module-7/section-4')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                7.4 BS 5839-6 requirements
              </div>
            </button>
          </div>

          <div className="hidden">
            <FileText />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default FireAlarmModule7Section3;
