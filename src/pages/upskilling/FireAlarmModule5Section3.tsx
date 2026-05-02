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
    id: 'fam5-s3-spacing',
    question:
      'BS 5839-1:2025 21.2.4 sets the distance below ceiling for the sensitive element of fire detectors. What are the figures for smoke and heat?',
    options: [
      '0 mm to 50 mm for both.',
      'Smoke: 25 mm to 600 mm below the ceiling. Heat: 25 mm to 150 mm below the ceiling. The numbers are unchanged from 2017 — only the clause re-numbering changed in 2025 (was 22.3 e). The lower bound (25 mm) keeps the sensing chamber clear of the dead-air boundary layer at the ceiling; the upper bound matches the smoke / heat plume spread expected at typical ceilings.',
      'No range — flush to ceiling only.',
      'Whatever fits.',
    ],
    correctIndex: 1,
    explanation:
      'The 25 mm to 600 mm (smoke) / 25 mm to 150 mm (heat) range is one of the most-cited numbers in BS 5839-1. The 2025 revision keeps the figures and only re-numbers the clause. Below 25 mm the sensing chamber is in the dead-air layer; above the upper bound the plume has dispersed.',
  },
  {
    id: 'fam5-s3-heat-sleeping',
    question:
      'Under BS 5839-1:2025 §14, where should heat detectors NOT be installed in new L2 / L3 systems?',
    options: [
      'Plant rooms.',
      'In rooms in which people sleep. The 2025 revision recategorises sleeping rooms as high-risk and excludes heat detectors from sleeping room protection in new L2 / L3 work. Use a smoke detector or a multi-sensor with a smoke element instead. The change is not retrospective; existing systems continue. New work must reflect the rule.',
      'Anywhere with a ceiling.',
      'Any garage.',
    ],
    correctIndex: 1,
    explanation:
      'The 2025 §14 / §15 changes reflect that early warning of fire in sleeping accommodation requires smoke detection. Heat detectors only respond when the fire has reached the heat-detection threshold — too late for someone asleep. Smoke detection (point or multi-sensor with smoke element) gives earlier warning.',
  },
  {
    id: 'fam5-s3-mcp',
    question:
      'BS 5839-1:2025 sets the manual call point (MCP) mounting height as 1.4 m with what tolerance?',
    options: [
      '+/- 1 m.',
      '+200 mm and -300 mm — so an acceptable range of 1.1 m to 1.6 m measured from FFL to the centreline of the operating element. The 1.4 m datum is the design height; the tolerance permits relaxation in service to suit door frames, dado rails and other fixed obstructions. The 2025 revision clarified the tolerance figures explicitly.',
      'No tolerance.',
      'Whatever the wall height permits.',
    ],
    correctIndex: 1,
    explanation:
      'The 2025 revision makes the 1.4 m mounting height tolerance explicit: +200 mm and -300 mm. Acceptable range 1.1 m to 1.6 m. The 2017 revision was less clear. MCPs above 1.6 m or below 1.1 m are non-compliant in new work.',
  },
  {
    id: 'fam5-s3-linear',
    question:
      'BS 5839-1:2025 has given recognition to two BS EN product standards for linear heat cable. Which are they?',
    options: [
      'BS EN 54-3 and BS EN 54-7.',
      'BS EN 54-22 (resettable line type heat detectors) and BS EN 54-28 (non-resettable line type heat detectors). Linear heat cable is increasingly used in environments where point detectors are impractical (cable trays, conveyors, parking decks, escalators). The 2025 revision aligns BS 5839-1 product expectations with the BS EN 54 family.',
      'BS EN 54-22 only.',
      'BS EN 54-28 only.',
    ],
    correctIndex: 1,
    explanation:
      'BS EN 54-22 (resettable) and BS EN 54-28 (non-resettable) — both new normative references in BS 5839-1:2025 §3 reflecting the increased use of linear heat cable. Resettable cable returns to service after activation; non-resettable cable is replaced. Selection follows the application: high-recurrence environments favour resettable, single-event environments may use non-resettable.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'BS 5839-1:2025 21.2.4 (re-numbered from 2017 22.3 e) sets the position of the sensitive element of point detectors below ceilings as...?',
    options: [
      'Flush to the ceiling.',
      'Smoke detectors: 25 mm to 600 mm below the ceiling. Heat detectors: 25 mm to 150 mm below the ceiling. The lower bound keeps the sensing chamber clear of the ceiling boundary layer where smoke and heat are slow to reach; the upper bound captures the plume before it disperses. Numbers are unchanged from 2017; 2025 only re-numbers the clause.',
      '50 mm flat for everything.',
      '500 mm minimum.',
    ],
    correctAnswer: 1,
    explanation:
      'Smoke 25-600 mm, heat 25-150 mm below ceiling. One of the most-cited rules in the standard. Sensing element is positioned within the band; not flush, not arbitrarily deep.',
  },
  {
    id: 2,
    question:
      'In a new Category L2 system installed under BS 5839-1:2025, what detector type should be used in a bedroom?',
    options: [
      'Heat detector.',
      'A smoke detector or a multi-sensor detector that includes a smoke sensing element, configured to respond to smoke. The 2025 revision §14 / §15 excludes heat detectors from sleeping rooms in new L2 / L3 work. Sleeping rooms are now classed as high-risk; smoke detection gives earlier warning than heat for someone asleep.',
      'Any of the above.',
      'No detector.',
    ],
    correctAnswer: 1,
    explanation:
      'Smoke or smoke-mode multi-sensor in sleeping rooms in new L2 / L3 work. Heat is excluded by the 2025 revision. Existing systems continue; new work follows the rule.',
  },
  {
    id: 3,
    question:
      'Manual call point mounting height per BS 5839-1:2025 is 1.4 m to the operating element with a tolerance of...?',
    options: [
      '+/- 0 mm — exactly 1.4 m.',
      '+200 mm / -300 mm. Acceptable range 1.1 m to 1.6 m. The 2025 revision states the tolerance explicitly. The MCP is reachable by an adult of average height while standing; the lower limit allows for wall-mounted obstructions; the upper limit prevents fitments above standing reach.',
      '+500 mm / -500 mm.',
      'Anywhere on the wall.',
    ],
    correctAnswer: 1,
    explanation:
      'MCP at 1.4 m, +200 / -300 mm tolerance, range 1.1-1.6 m. The 2025 explicit-tolerance statement removes a long-standing area of debate.',
  },
  {
    id: 4,
    question:
      'A beam detector consists of a transmitter and a receiver mounted across a large open space. Alignment must be...?',
    options: [
      'Approximate.',
      'Precise, per the manufacturer’s alignment tool (typically a sight, target and signal-strength indicator), with the beam set within the manufacturer-specified angular tolerance, the beam path clear of obstructions throughout the working envelope, and a record of the as-installed alignment on the commissioning documentation. Misalignment causes spurious alarms or missed signals; the alignment is critical-path commissioning.',
      'Vague.',
      'Pointed at the floor.',
    ],
    correctAnswer: 1,
    explanation:
      'Beam alignment is a precision activity. Manufacturer alignment tool, signal-strength target, clear beam path, documented as-installed setting. Misalignment is the dominant beam-detector failure mode in service.',
  },
  {
    id: 5,
    question: 'Sounder coverage for a Category L system per BS 5839-1:2025 is...?',
    options: [
      'Whatever sounds loudest.',
      'A minimum of 65 dB(A) at all accessible points in the protected area, increasing to 75 dB(A) at the bed-head in sleeping accommodation, and at least 5 dB above any background noise lasting 30 seconds or longer. The audibility test verifies the levels at handover and at every periodic service.',
      '50 dB(A) only.',
      '90 dB(A) everywhere.',
    ],
    correctAnswer: 1,
    explanation:
      '65 dB(A) general / 75 dB(A) bed-head / 5 dB above sustained background. The figures are calibrated to wake a sleeping occupant (bed-head) and overcome plausible background (5 dB margin). Verified at commissioning by sound-level survey.',
  },
  {
    id: 6,
    question:
      'Where a visual alarm device (VAD) is the primary signal for evacuation (e.g. for hearing-impaired occupants), it must comply with...?',
    options: [
      'Aesthetic preference.',
      'BS EN 54-23 — covering light intensity, coverage volume, and verified by calculation or by a manufacturer’s coverage table. The VAD has a defined cuboid or cylinder of coverage at a specified light intensity (cd / m²); the design verifies the layout produces continuous coverage across the protected area for an occupant whose attention can only be gained visually.',
      'A flag pole.',
      'Daylight alone.',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 54-23 is the product standard for VADs. Coverage volume defined by the manufacturer per the standard; design layout produces continuous coverage. Where VAD is primary, BS EN 54-23 is the governing reference.',
  },
  {
    id: 7,
    question:
      'BS 5839-1:2025 §3 introduces new normative references for linear heat cable. Which products are now covered?',
    options: [
      'Smoke detectors only.',
      'BS EN 54-22 (resettable line type heat detectors) and BS EN 54-28 (non-resettable line type heat detectors) — explicitly recognising linear heat cable as a system component covered by the standard. Recognition aligns BS 5839-1 with the EN 54 product family.',
      'Conventional MCPs only.',
      'Sounder bases only.',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 54-22 and BS EN 54-28 — both new normative references in 2025. Linear heat cable is increasingly used in cable-tray, conveyor, parking and escalator applications.',
  },
  {
    id: 8,
    question: 'Detector documentation at install per BS 5839-1:2025 §15 / §20 should record...?',
    options: [
      'Nothing.',
      'Detector address, location (room, position), type (optical, ionisation, multi-sensor with operating mode set, heat with class, beam, linear heat) and the configuration (e.g. multi-sensor mode programmed). Recorded at install and made available to the commissioning technician and to the operating and maintenance manual. The 2025 revision §15 places greater emphasis on detector-selection records.',
      'The colour of the carpet only.',
      'A guess.',
    ],
    correctAnswer: 1,
    explanation:
      'Address, location, type, configuration. The 2025 revision §15 (greater emphasis on selection and application) and §20.11 (record of detector type and configuration) tighten the documentation expectation. The maintainer reads the record at every service.',
  },
  {
    id: 9,
    question:
      'A closely-spaced beam configuration in 21.2 of BS 5839-1:2025 has been clarified as...?',
    options: [
      'Beams more than 5 m apart.',
      'Beams approximately 1 m or less centre-to-centre. The 2017 revision left "closely spaced" undefined; the 2025 revision fixes it. Closely-spaced beams trap smoke and require additional detector positions per the spacing rules.',
      'Beams of any spacing.',
      'Beams over 10 m apart.',
    ],
    correctAnswer: 1,
    explanation:
      'Closely-spaced beams are now defined as approximately 1 m or less centre-to-centre. The 2025 clarification removes a long-standing ambiguity.',
  },
  {
    id: 10,
    question:
      'A detector base installed at first-fix without the head — to be plugged in at second-fix — should be protected against what during the construction phase?',
    options: [
      'Nothing — it is fine bare.',
      'Dust ingress (drilling and cutting dust will contaminate sensing elements that arrive later), paint and decorating overspray, mechanical impact, and accidental disconnection of terminations. Manufacturer dust caps fit the base during the construction phase; heads are fitted at second-fix only after the area is clean. The maintainer arriving to a contaminated base finds detectors signalling fault or producing false alarms in service.',
      'Cosmetic damage only.',
      'Heat only.',
    ],
    correctAnswer: 1,
    explanation:
      'Dust caps protect bases during construction. The base is wired and tested at first-fix; the head is fitted at second-fix only when the area is clean and dry. Skipping the dust caps leads to contaminated detectors and false alarms in service.',
  },
];

const FireAlarmModule5Section3 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Device installation | Fire Alarm Module 5.3 | Elec-Mate',
    description:
      'BS 5839-1:2025 device installation: detector mounting per 21.2.4, the new restriction on heat detectors in sleeping rooms (§14/§15), MCP mounting at 1.4 m with +200/-300 tolerance, beam detector alignment, sounder/VAD positioning for 65/75 dB(A) coverage, linear heat cable per BS EN 54-22 / BS EN 54-28, and documentation per §15/§20.',
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
            eyebrow="Module 5 · Section 3"
            title="Device installation"
            description="Detectors, manual call points, sounders, VADs, beam and linear heat. The 2025 revision changes detector use in sleeping rooms, clarifies MCP mounting tolerance and recognises new product standards for linear heat cable."
            tone="yellow"
          />

          <TLDR
            points={[
              'Point detector positioning (BS 5839-1:2025 21.2.4): smoke 25 mm to 600 mm below ceiling; heat 25 mm to 150 mm below ceiling. Numbers unchanged from 2017; only the clause re-numbers in 2025.',
              'Heat detectors NOT in sleeping rooms in new L2 / L3 work (NEW 2025 §14 / §15). Sleeping rooms reclassified as high-risk; use smoke or multi-sensor with smoke element. Existing systems not retrospective.',
              'MCP mounting: 1.4 m to operating element with tolerance +200 mm / -300 mm. Acceptable range 1.1 m to 1.6 m. Tolerance made explicit in 2025.',
              'MCPs: protective covers now recommended to be transparent (was opaque in 2017). Stairway-landing wording removed in 2025 — use 12.1 a clause for landing MCPs.',
              'Beam detectors: precise alignment per manufacturer instruction; clear beam path; documented as-installed setting. Misalignment is the dominant in-service failure mode.',
              'Sounder coverage: 65 dB(A) at all accessible points / 75 dB(A) bed-head / at least 5 dB above sustained background (30s+).',
              'VAD coverage where VAD is primary signal: BS EN 54-23 — defined coverage volume and light intensity; design verified by calculation or manufacturer table.',
              'Linear heat cable: NEW 2025 normative references — BS EN 54-22 (resettable) and BS EN 54-28 (non-resettable). Selection per application.',
              'Detector documentation per §15 / §20: address, location, type, configuration recorded at install and made available to commissioning and to the O&M manual.',
              'Construction-phase protection: dust caps on bases at first-fix; heads fitted at second-fix only when clean. Skipping leads to contaminated detectors and service-life false alarms.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Position point smoke and heat detectors per BS 5839-1:2025 21.2.4 (25-600 mm smoke / 25-150 mm heat below ceiling)',
              'Apply the 2025 §14 / §15 rule excluding heat detectors from sleeping rooms in new L2 / L3 systems and select smoke or smoke-mode multi-sensor in their place',
              'Mount manual call points at 1.4 m with the explicit 2025 tolerance of +200 mm / -300 mm (range 1.1-1.6 m), with transparent protective covers per the 2025 recommendation',
              'Set up beam detectors with precise alignment per manufacturer instruction, documented as-installed beam path and signal strength',
              'Position sounders, VADs and combined units to achieve 65 dB(A) general / 75 dB(A) bed-head / 5 dB above sustained background, verified at commissioning',
              'Apply BS EN 54-23 to VAD coverage where VAD is the primary evacuation signal',
              'Install linear heat cable to BS EN 54-22 (resettable) or BS EN 54-28 (non-resettable) per application — both NEW 2025 normative references',
              'Document detector address, location, type and configuration per §15 / §20 and make the record available to commissioning and to the O&M manual',
              'Protect detector bases during the construction phase with manufacturer dust caps; fit heads only at second-fix in a clean environment',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Point detectors — mounting and positioning</ContentEyebrow>

          <ConceptBlock
            title="Position below ceiling — the 25 mm / 600 mm / 150 mm rule"
            plainEnglish="Point detectors are mounted with the sensitive element positioned in a band below the ceiling. Too high (in the dead-air boundary layer right at the ceiling) and the sensing chamber misses the smoke or heat plume because air movement is minimal there. Too low and the plume disperses before reaching the chamber. The band differs by sensor type because smoke spreads further from the ceiling than heat does."
            onSite="Measure to the sensing element, not to the base. The sensing chamber is inside the head; manufacturer datasheets give the dimension from base to chamber. The mounted detector’s effective sensing position is base height + element offset."
          >
            <p>The position rules:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Smoke detectors.</strong> Sensing element 25 mm to 600 mm below the ceiling.
                Standard ceiling installation is base flush to ceiling; the element is then
                naturally inside the band depending on detector geometry. Pendant or stalk-mounted
                installations push the element down — verify the offset.
              </li>
              <li>
                <strong>Heat detectors.</strong> Sensing element 25 mm to 150 mm below the ceiling.
                Tighter range than smoke. The shorter heat-plume reach means sensor must be closer
                to the ceiling.
              </li>
              <li>
                <strong>Multi-sensor detectors.</strong> Configured operating mode determines the
                applicable rule. Smoke-only mode follows the smoke rule; heat-only mode follows the
                heat rule. Mixed mode follows the more restrictive (heat — 150 mm).
              </li>
              <li>
                <strong>Detectors in voids.</strong> Mounted at the top of the void per the 2025
                Figure (Module Section 1 §18 / FIA Guide): voids ≤ 1.25 m deep — top 125 mm; voids
                1.25-1.5 m deep — top 10 % of void depth; voids &gt; 1.5 m deep — treated as a
                normal room with the standard ceiling rule applied.
              </li>
              <li>
                <strong>L3 rooms off escape route.</strong> Per 21.2.5, smoke detection in rooms
                that open onto an escape route. The 25-600 mm smoke rule applies; ceiling
                construction is usually solid construction (the 2025 revision removed the previous
                "fire-resisting construction" wording in favour of "solid construction with no
                holes" — easier to verify).
              </li>
              <li>
                <strong>Cell-style ceilings.</strong> Per 21.2.13 / 21.2.14 — ceilings comprising a
                series of small cells (e.g. exposed structural waffle slab). Detector positioning
                rules adapted; survey records cell geometry.
              </li>
            </ul>
            <p>
              The clause numbering changed in 2025; the figures did not. A 2017-era detector install
              at the wrong height was non-compliant under 22.3 e); the same install at the wrong
              height in 2025 is non-compliant under 21.2.4. The numerical rule is identical.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 21.2.4 (Position of point detectors below ceilings)"
            clause={
              <>
                Other than within rooms in a Category L3 system (see 21.2.5), in voids (see 21.2.7)
                or where a horizontal ceiling comprises a series of small cells (see 21.2.13 and
                21.2.14), fire detectors should be sited on ceilings, such that their sensitive
                elements are between the following distances below ceilings: a) 25 mm to 600 mm for
                smoke detectors; and b) 25 mm to 150 mm for heat detectors.
              </>
            }
            meaning="The lower bound (25 mm) keeps the sensing chamber clear of the dead-air boundary layer. The upper bound (600 mm smoke / 150 mm heat) catches the plume before dispersion. Numbers unchanged since 2017; the 2025 revision only re-numbers from 22.3 e) to 21.2.4."
          />

          <ConceptBlock
            title="Heat detectors — the 2025 sleeping-room rule"
            plainEnglish="The single biggest detector-selection change in the 2025 revision. Sleeping rooms are reclassified as high-risk. The reasoning: an occupant who is asleep cannot self-rescue at the speed an awake occupant can; early detection (smoke) gives the time margin. Heat detection only triggers when the fire is large enough to produce heat at the ceiling — by then the smoke has already filled the room and the occupant has likely been overcome. New L2 / L3 work therefore uses smoke or smoke-mode multi-sensor in sleeping rooms; heat is excluded."
          >
            <p>The change in detail:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Affected categories.</strong> L2 systems where the bedroom is part of the
                area requiring early warning. L3 systems where bedrooms open onto escape routes.
                Even though L3 detection is escape-route-protective rather than person-protective,
                the 2025 revision now excludes heat in sleeping rooms in L3 too.
              </li>
              <li>
                <strong>Replacement detectors.</strong> Smoke detector (optical preferred for
                bedrooms — fewer false alarms from cooking and steam ingress to a closed bedroom) or
                multi-sensor with smoke element configured to respond to smoke.
              </li>
              <li>
                <strong>Existing systems not retrospective.</strong> Existing L2 / L3 with heat
                detectors in sleeping rooms continues. Replacement-on-failure would replace like-
                for-like under the existing system. New work and system upgrades follow the new
                rule.
              </li>
              <li>
                <strong>Stairway lobbies.</strong> Now require automatic detection in L2 (was
                excluded as low fire risk). Survey lists every stairway lobby; detectors added.
              </li>
              <li>
                <strong>Sprinkler-head zone overlap.</strong> Sprinkler heads can be used to
                initiate fire-alarm conditions; the indication of sprinkler operation must not
                overlap with more than one fire detection zone (2025 clarification).
              </li>
            </ul>
            <p>
              The change ripples through procurement, install, programming and documentation. The
              survey records room use; the install schedule reflects detector type per room; the
              programmed cause-and-effect handles the new sleeping-room detectors; the as-built
              documentation records type and configuration per §20.11.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 14 (Use of heat detectors)"
            clause={
              <>
                With the changes to category L2 systems now including early warning of fire to rooms
                in which occupants sleep, the use of heat detectors is no longer permitted in these
                areas. Similarly, heat detectors should now not be used in rooms where people sleep
                in a category L3 system, albeit the objective of L3 is not to protect persons in
                that room. Despite previous editions of BS 5839-1 allowing the use of heat detectors
                in sleeping rooms, the new recommendation is not retrospective.
              </>
            }
            meaning="Three load-bearing words. 'No longer permitted' — explicit rule, not optional. 'Sleeping rooms' — defined by use, not by drawing label. 'Not retrospective' — existing systems continue; new work and upgrades follow the rule. Survey rooms by actual use."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          {/* Detector placement diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Detector placement examples — ceiling, void, cell, sleeping room
            </h4>
            <svg
              viewBox="0 0 820 540"
              className="w-full h-auto"
              role="img"
              aria-label="Diagram showing four detector placement examples: a normal room with smoke detector 25 to 600 mm below ceiling and heat detector 25 to 150 mm below ceiling, a void with detector mounted in the top portion, a cell ceiling with detectors per cell, and a sleeping room showing smoke detector required and heat detector excluded by 2025 revision."
            >
              <text
                x="410"
                y="24"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="13"
                fontWeight="bold"
              >
                BS 5839-1:2025 detector placement — 21.2.4 + 21.2.7 + 14/15
              </text>

              {/* Panel 1 — normal room */}
              <g>
                <rect
                  x="20"
                  y="50"
                  width="380"
                  height="220"
                  rx="8"
                  fill="rgba(34,211,238,0.04)"
                  stroke="rgba(34,211,238,0.5)"
                  strokeWidth="1.4"
                />
                <text
                  x="210"
                  y="70"
                  textAnchor="middle"
                  fill="#22D3EE"
                  fontSize="11"
                  fontWeight="bold"
                >
                  Normal room — smoke + heat
                </text>

                {/* ceiling line */}
                <line x1="40" y1="90" x2="380" y2="90" stroke="#fff" strokeWidth="2" />
                <text x="40" y="84" fill="rgba(255,255,255,0.7)" fontSize="9">
                  Ceiling
                </text>

                {/* smoke detector */}
                <circle
                  cx="120"
                  cy="120"
                  r="10"
                  fill="rgba(34,211,238,0.2)"
                  stroke="#22D3EE"
                  strokeWidth="1.6"
                />
                <text
                  x="120"
                  y="124"
                  textAnchor="middle"
                  fill="#22D3EE"
                  fontSize="9"
                  fontWeight="bold"
                >
                  S
                </text>
                <line
                  x1="120"
                  y1="90"
                  x2="120"
                  y2="110"
                  stroke="#22D3EE"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                />
                <text x="142" y="115" fill="rgba(34,211,238,0.85)" fontSize="9">
                  25 - 600 mm
                </text>
                <text x="142" y="128" fill="rgba(255,255,255,0.55)" fontSize="9">
                  smoke (21.2.4 a)
                </text>

                {/* heat detector */}
                <circle
                  cx="280"
                  cy="100"
                  r="10"
                  fill="rgba(239,68,68,0.2)"
                  stroke="#EF4444"
                  strokeWidth="1.6"
                />
                <text
                  x="280"
                  y="104"
                  textAnchor="middle"
                  fill="#EF4444"
                  fontSize="9"
                  fontWeight="bold"
                >
                  H
                </text>
                <line
                  x1="280"
                  y1="90"
                  x2="280"
                  y2="92"
                  stroke="#EF4444"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                />
                <text x="298" y="105" fill="rgba(239,68,68,0.85)" fontSize="9">
                  25 - 150 mm
                </text>
                <text x="298" y="118" fill="rgba(255,255,255,0.55)" fontSize="9">
                  heat (21.2.4 b)
                </text>

                {/* floor */}
                <line
                  x1="40"
                  y1="240"
                  x2="380"
                  y2="240"
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="1.4"
                  strokeDasharray="4,3"
                />
                <text x="40" y="258" fill="rgba(255,255,255,0.55)" fontSize="9">
                  Floor / FFL
                </text>
              </g>

              {/* Panel 2 — void */}
              <g>
                <rect
                  x="420"
                  y="50"
                  width="380"
                  height="220"
                  rx="8"
                  fill="rgba(168,85,247,0.04)"
                  stroke="rgba(168,85,247,0.5)"
                  strokeWidth="1.4"
                />
                <text
                  x="610"
                  y="70"
                  textAnchor="middle"
                  fill="#A855F7"
                  fontSize="11"
                  fontWeight="bold"
                >
                  Void — 21.2.7 / FIA Figure
                </text>

                {/* deck */}
                <line x1="440" y1="90" x2="780" y2="90" stroke="#fff" strokeWidth="2" />
                <text x="440" y="84" fill="rgba(255,255,255,0.7)" fontSize="9">
                  Structural deck
                </text>

                {/* ceiling line below */}
                <line
                  x1="440"
                  y1="170"
                  x2="780"
                  y2="170"
                  stroke="rgba(255,255,255,0.6)"
                  strokeWidth="1.4"
                />
                <text x="440" y="164" fill="rgba(255,255,255,0.55)" fontSize="9">
                  Suspended ceiling
                </text>

                {/* detector in void */}
                <circle
                  cx="540"
                  cy="105"
                  r="9"
                  fill="rgba(168,85,247,0.2)"
                  stroke="#A855F7"
                  strokeWidth="1.6"
                />
                <text
                  x="540"
                  y="109"
                  textAnchor="middle"
                  fill="#A855F7"
                  fontSize="9"
                  fontWeight="bold"
                >
                  D
                </text>
                <text x="556" y="108" fill="rgba(168,85,247,0.85)" fontSize="9">
                  top 125 mm if void ≤ 1.25 m
                </text>
                <text x="556" y="120" fill="rgba(168,85,247,0.7)" fontSize="9">
                  top 10 % if 1.25-1.5 m
                </text>
                <text x="556" y="132" fill="rgba(168,85,247,0.55)" fontSize="9">
                  treat as normal &gt; 1.5 m
                </text>

                {/* arrow */}
                <line
                  x1="460"
                  y1="90"
                  x2="460"
                  y2="170"
                  stroke="rgba(168,85,247,0.6)"
                  strokeWidth="1"
                />
                <line x1="455" y1="92" x2="465" y2="92" stroke="#A855F7" strokeWidth="1.4" />
                <line x1="455" y1="168" x2="465" y2="168" stroke="#A855F7" strokeWidth="1.4" />
                <text x="448" y="135" textAnchor="end" fill="rgba(168,85,247,0.85)" fontSize="9">
                  void
                </text>
                <text x="448" y="148" textAnchor="end" fill="rgba(168,85,247,0.7)" fontSize="9">
                  depth
                </text>

                <line
                  x1="440"
                  y1="240"
                  x2="780"
                  y2="240"
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="1.4"
                  strokeDasharray="4,3"
                />
                <text x="440" y="258" fill="rgba(255,255,255,0.55)" fontSize="9">
                  Floor / FFL
                </text>
              </g>

              {/* Panel 3 — sleeping room (NEW 2025) */}
              <g>
                <rect
                  x="20"
                  y="290"
                  width="380"
                  height="220"
                  rx="8"
                  fill="rgba(239,68,68,0.04)"
                  stroke="rgba(239,68,68,0.5)"
                  strokeWidth="1.4"
                />
                <text
                  x="210"
                  y="310"
                  textAnchor="middle"
                  fill="#EF4444"
                  fontSize="11"
                  fontWeight="bold"
                >
                  Sleeping room — NEW 2025 §14/§15
                </text>

                <line x1="40" y1="330" x2="380" y2="330" stroke="#fff" strokeWidth="2" />

                {/* smoke required */}
                <circle
                  cx="120"
                  cy="360"
                  r="10"
                  fill="rgba(34,197,94,0.2)"
                  stroke="#22C55E"
                  strokeWidth="1.6"
                />
                <text
                  x="120"
                  y="364"
                  textAnchor="middle"
                  fill="#22C55E"
                  fontSize="9"
                  fontWeight="bold"
                >
                  S
                </text>
                <text x="100" y="395" fill="#22C55E" fontSize="9" fontWeight="bold">
                  SMOKE — required
                </text>
                <text x="100" y="408" fill="rgba(255,255,255,0.55)" fontSize="9">
                  or smoke-mode multi-sensor
                </text>

                {/* heat excluded */}
                <circle cx="280" cy="360" r="10" fill="none" stroke="#EF4444" strokeWidth="1.6" />
                <text
                  x="280"
                  y="364"
                  textAnchor="middle"
                  fill="#EF4444"
                  fontSize="9"
                  fontWeight="bold"
                >
                  H
                </text>
                <line x1="269" y1="349" x2="291" y2="371" stroke="#EF4444" strokeWidth="2" />
                <line x1="291" y1="349" x2="269" y2="371" stroke="#EF4444" strokeWidth="2" />
                <text x="260" y="395" fill="#EF4444" fontSize="9" fontWeight="bold">
                  HEAT — excluded
                </text>
                <text x="260" y="408" fill="rgba(255,255,255,0.55)" fontSize="9">
                  in new L2/L3 only
                </text>

                {/* bed icon */}
                <rect
                  x="120"
                  y="460"
                  width="180"
                  height="20"
                  rx="4"
                  fill="rgba(255,255,255,0.1)"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="1"
                />
                <rect
                  x="120"
                  y="450"
                  width="40"
                  height="14"
                  rx="3"
                  fill="rgba(255,255,255,0.15)"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="1"
                />
                <text x="210" y="475" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                  bed
                </text>

                <text x="40" y="495" fill="rgba(239,68,68,0.85)" fontSize="9">
                  Existing systems not retrospective.
                </text>
              </g>

              {/* Panel 4 — MCP mounting */}
              <g>
                <rect
                  x="420"
                  y="290"
                  width="380"
                  height="220"
                  rx="8"
                  fill="rgba(251,191,36,0.04)"
                  stroke="rgba(251,191,36,0.5)"
                  strokeWidth="1.4"
                />
                <text
                  x="610"
                  y="310"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="11"
                  fontWeight="bold"
                >
                  MCP mounting — 1.4 m +200/-300
                </text>

                {/* wall + floor */}
                <line
                  x1="610"
                  y1="330"
                  x2="610"
                  y2="490"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="1"
                />
                <line
                  x1="440"
                  y1="490"
                  x2="780"
                  y2="490"
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="1.4"
                  strokeDasharray="4,3"
                />
                <text x="440" y="505" fill="rgba(255,255,255,0.55)" fontSize="9">
                  Floor / FFL
                </text>

                {/* MCP body */}
                <rect
                  x="600"
                  y="395"
                  width="50"
                  height="50"
                  rx="4"
                  fill="rgba(239,68,68,0.4)"
                  stroke="#EF4444"
                  strokeWidth="1.6"
                />
                <text
                  x="625"
                  y="425"
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="14"
                  fontWeight="bold"
                >
                  MCP
                </text>

                {/* dimension lines */}
                <line x1="560" y1="490" x2="560" y2="420" stroke="#FBBF24" strokeWidth="1.4" />
                <line x1="555" y1="490" x2="565" y2="490" stroke="#FBBF24" strokeWidth="1.4" />
                <line x1="555" y1="420" x2="565" y2="420" stroke="#FBBF24" strokeWidth="1.4" />
                <text
                  x="540"
                  y="460"
                  textAnchor="end"
                  fill="#FBBF24"
                  fontSize="10"
                  fontWeight="bold"
                >
                  1.40 m
                </text>
                <text x="540" y="474" textAnchor="end" fill="rgba(251,191,36,0.7)" fontSize="9">
                  design
                </text>

                {/* tolerance bracket */}
                <line
                  x1="680"
                  y1="490"
                  x2="680"
                  y2="370"
                  stroke="rgba(251,191,36,0.5)"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                />
                <line
                  x1="675"
                  y1="370"
                  x2="685"
                  y2="370"
                  stroke="rgba(251,191,36,0.7)"
                  strokeWidth="1"
                />
                <text x="690" y="374" fill="rgba(251,191,36,0.85)" fontSize="9">
                  +200 mm = 1.6 m
                </text>
                <line
                  x1="675"
                  y1="450"
                  x2="685"
                  y2="450"
                  stroke="rgba(251,191,36,0.7)"
                  strokeWidth="1"
                />
                <text x="690" y="454" fill="rgba(251,191,36,0.85)" fontSize="9">
                  -300 mm = 1.1 m
                </text>

                <text x="440" y="335" fill="rgba(251,191,36,0.6)" fontSize="9">
                  transparent protective cover (2025)
                </text>
              </g>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>Manual call points</ContentEyebrow>

          <ConceptBlock
            title="MCP siting and mounting — 1.4 m +200 / -300 mm"
            plainEnglish="The manual call point is the human-initiated alarm trigger. Anyone in the building must be able to reach one within the maximum travel distance from anywhere in the protected area. The 2025 revision simplifies the travel distance to 30 m straight-line and 45 m actual travel — both maxima; designers can use shorter distances where appropriate. Mounting height is 1.4 m to the operating element, with the 2025-explicit tolerance of +200 mm / -300 mm."
          >
            <p>The MCP rules:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Distance to nearest MCP.</strong> Maximum 30 m straight-line and 45 m actual
                travel from any point in the protected area. 2025 simplification — single pair of
                figures rather than the previous category-dependent values.
              </li>
              <li>
                <strong>Mounting height.</strong> 1.4 m to the operating element from FFL, with
                tolerance +200 mm / -300 mm (range 1.1 m to 1.6 m). 2025 makes the tolerance
                explicit.
              </li>
              <li>
                <strong>Position relative to escape routes.</strong> On escape routes, particularly
                near final exits, near stairway landings (per 12.1 a clause). 2025 removed the
                "enclosed stairway" wording from 13.2.1 a) — clearer interpretation now: MCP on each
                landing, other than final exit level, is incorporated within the zone serving the
                adjacent accommodation.
              </li>
              <li>
                <strong>Identification and signage.</strong> Standard MCP is a red box with white
                text; addressable systems show the address on the panel after operation. Local
                signage (a "FIRE ALARM CALL POINT" label) where the local environment makes the MCP
                less visible (cluttered corridor, dim lighting).
              </li>
              <li>
                <strong>Protective covers.</strong> 2025 recommends transparent (clear plastic)
                protective covers; the 2017 revision recommended covers in general but did not
                specify transparent. Transparent covers preserve the visual recognition of the MCP
                while preventing accidental operation.
              </li>
              <li>
                <strong>Resettable types.</strong> Operating elements that reset after fault
                clearance, vs. break-glass types that require glass replacement. Maintenance regime
                differs; both are acceptable; the design records the type chosen.
              </li>
              <li>
                <strong>Address and zone.</strong> Each MCP has a unique address on addressable
                systems. The address is documented at install per §20 and verified at commissioning.
              </li>
            </ul>
            <p>
              MCP mounting at the wrong height is a common audit finding. The 2025 explicit
              tolerance removes the "is 1.7 m close enough to 1.4 m?" debate — 1.7 m is outside the
              +200 mm bound, so it is non-compliant. Set the height at install; do not let
              second-fix moves drift outside the tolerance.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 12.1 a (Stairway landing MCPs)"
            clause={
              <>
                If manual call points are located on the landings of a stairway, the manual call
                point on each level, other than a final exit level from the stairway, should be
                incorporated within the zone that serves the adjacent accommodation on that level.
              </>
            }
            meaning="The 2025 wording removes the previous 'enclosed stairway' qualifier that caused interpretation problems. The rule now reads cleanly: a stairway-landing MCP is zoned with the adjacent accommodation on its level, not with the stairway itself. The exception is the final exit level — that MCP is zoned independently."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Beam, sounders, VADs and linear heat</ContentEyebrow>

          <ConceptBlock
            title="Beam detector alignment"
            plainEnglish="Beam detectors cover large open spaces (warehouses, atria, hangars) where point detectors would be impractical due to ceiling height or coverage area. A transmitter sends an infrared beam to a receiver across the protected space; smoke crossing the beam attenuates the signal; the detector raises alarm. Alignment is precise — the receiver must see the transmitter at full signal strength under normal conditions, with sufficient margin that smoke attenuation triggers the alarm and beyond-margin attenuation triggers fault."
          >
            <p>The alignment procedure:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Mounting.</strong> Transmitter and receiver mounted on stable surfaces —
                structural beam, structural wall, dedicated bracket. Mounting must not move under
                building movement (thermal, wind, vibration).
              </li>
              <li>
                <strong>Alignment tool.</strong> Manufacturer-supplied alignment aid: optical sight,
                target on the receiver, or signal-strength indicator on the receiver showing the
                live attenuation reading. Beam aimed using the sight; fine-tuned using the signal-
                strength reading.
              </li>
              <li>
                <strong>Signal strength.</strong> Set within manufacturer-specified margin —
                typically a "green zone" on the indicator. Excessive signal strength causes
                saturation; too low triggers fault.
              </li>
              <li>
                <strong>Path clearance.</strong> The beam path must be clear throughout the working
                envelope — no obstructions, no temporary obstructions (e.g. forklift mast, mobile
                lighting tower) that block the beam intermittently.
              </li>
              <li>
                <strong>Reflector type.</strong> Some beam systems use a single transceiver and a
                reflector at the far end; alignment is to the reflector, with the same precision.
                Reflector position must be stable.
              </li>
              <li>
                <strong>Documentation.</strong> As-installed signal strength recorded; beam path
                drawn on the drawing; reflector / receiver position recorded. Service visits
                re-verify alignment.
              </li>
              <li>
                <strong>Limit testing.</strong> Manufacturer test filters simulate smoke
                attenuation; beam alarms at a calibrated attenuation level. Limit-testing at
                commissioning verifies the beam triggers at the correct attenuation.
              </li>
            </ul>
            <p>
              Beam detector misalignment is the dominant in-service failure mode for beams. The
              cause is typically building movement or temporary obstructions; the detection is fault
              signal; the remediation is re-alignment during a service visit. Robust install
              alignment reduces the likelihood.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Sounders and VADs — coverage by audibility and visibility"
            plainEnglish="The audible alarm must reach every accessible point in the protected area at a level that prompts evacuation. The visible alarm (where required for hearing-impaired occupants or as a primary signal) must produce a flash visible across the protected area. Both are coverage problems — devices positioned to produce continuous coverage, verified at commissioning by survey."
          >
            <p>The audibility rules:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>65 dB(A) at all accessible points in the protected area.</strong> The
                base-line threshold; verified at commissioning.
              </li>
              <li>
                <strong>75 dB(A) at the bed-head in sleeping accommodation.</strong> Higher
                threshold to wake a sleeping occupant. Verified at the bed-head position with the
                bedroom door in its normal sleeping condition (commonly closed).
              </li>
              <li>
                <strong>5 dB above sustained background.</strong> Where the background noise lasts
                30 seconds or longer (machinery, plant, music in licensed premises), the alarm must
                exceed it by 5 dB. Locations with high background may need additional sounders or
                higher-output devices.
              </li>
              <li>
                <strong>Frequency content.</strong> Sounders should produce a tone or modulated tone
                that is recognisably "fire alarm" — typically the BS 5839-1 specified tone family
                (slow whoop, two-tone, or recorded voice for voice alarm systems).
              </li>
              <li>
                <strong>Directional / coverage characteristics.</strong> Sounders have a published
                output level and dispersion pattern; positioning takes both into account.
              </li>
              <li>
                <strong>Wall vs. ceiling mounting.</strong> Per manufacturer instruction; the output
                level published is for the rated mounting orientation.
              </li>
            </ul>
            <p>The VAD rules where VAD is the primary signal:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px] mt-2">
              <li>
                <strong>BS EN 54-23 product compliance.</strong> The VAD itself must be BS EN 54-23
                compliant. Manufacturer publishes a coverage volume — typically a cuboid or
                cylindrical volume in metres at a specified light intensity (cd / m²).
              </li>
              <li>
                <strong>Layout to produce continuous coverage.</strong> Layout the VADs so the
                coverage volumes union over the protected area. Gaps in coverage mean an occupant in
                that gap may not see the flash.
              </li>
              <li>
                <strong>Wall vs. ceiling vs. corner.</strong> Per the manufacturer’s coverage table
                for that mounting position. Coverage shape changes with mounting position.
              </li>
              <li>
                <strong>Lux baseline.</strong> Coverage figures assume an ambient lux level; bright
                sunlit rooms may need higher intensity or shaded VADs.
              </li>
              <li>
                <strong>Verified at commissioning.</strong> Walk the protected area; verify visible
                flash from every accessible point.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 25 (Audibility) — sound levels"
            clause={
              <>
                The audible alarm signal should produce a sound pressure level of at least 65 dB(A)
                at all accessible points in the area protected by the system, increasing to 75 dB(A)
                at the bed-head in sleeping accommodation. Where ambient noise of duration greater
                than 30 seconds is likely to be present, the alarm signal should be at least 5 dB
                above the ambient noise level.
              </>
            }
            meaning="Three thresholds: 65 dB(A) general, 75 dB(A) bed-head, 5 dB above sustained background. Verified at commissioning by sound-level survey at every accessible point. Failures usually indicate too-few sounders or sounders too-far-apart; remedy is additional or higher-output devices."
          />

          <ConceptBlock
            title="Linear heat cable — BS EN 54-22 / BS EN 54-28"
            plainEnglish="Linear heat detection extends fire detection along a continuous cable that responds to heat anywhere along its length. Used where point detection is impractical: cable trays, conveyors, parking decks, escalators, refrigerated stores. The 2025 revision adds two new normative references — BS EN 54-22 for resettable linear heat cable and BS EN 54-28 for non-resettable types — placing linear heat firmly within the BS 5839-1 product framework."
          >
            <p>The linear heat installation rules:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Cable type selection.</strong> Resettable (BS EN 54-22) returns to service
                after activation by cooling; non-resettable (BS EN 54-28) is replaced after
                activation. Resettable suits high-recurrence environments (cable tray, conveyors);
                non-resettable suits single-event environments where calibrated, repeatable response
                is more important than reset.
              </li>
              <li>
                <strong>Routing.</strong> Cable routed where heat from any expected fire would reach
                it — typically at ceiling level above protected loads, or in direct contact with the
                load (e.g. wrapped around cable bundles).
              </li>
              <li>
                <strong>Support intervals.</strong> Per manufacturer instruction. Typically tied to
                cable tray with cable-tie spacing per the manufacturer; clipped to soffits at
                published intervals.
              </li>
              <li>
                <strong>Bend radius.</strong> Cable has a minimum bend radius — sharper bends damage
                the heat-sensing characteristic.
              </li>
              <li>
                <strong>End-of-line termination.</strong> Manufacturer-supplied EOL device. The EOL
                completes the loop and provides the fault-supervision baseline.
              </li>
              <li>
                <strong>Interface.</strong> The cable terminates at an addressable interface that
                presents to the CIE as a detection point. Address documented per §20.
              </li>
              <li>
                <strong>Test method.</strong> Manufacturer-specified — typically a heat source
                applied at a designated test point, simulating activation. Limit-testing at
                commissioning verifies the cable activates at the correct temperature.
              </li>
            </ul>
            <p>
              Linear heat is increasingly common as buildings include more cable management
              installations, EV charging plant rooms and large commercial kitchens. The 2025
              recognition of BS EN 54-22 / BS EN 54-28 means linear heat installs now have explicit
              product-standard coverage in BS 5839-1.
            </p>
          </ConceptBlock>

          <Scenario
            title="The bedroom heat detector that came back to bite"
            situation="A two-storey HMO is being upgraded from a Grade D LD2 system to a Category L2 BS 5839-1:2025 addressable system. The designer carries a 2017-era detail that places heat detectors in bedrooms because they are above a kitchen on the ground floor. First-fix detector bases are installed per the design. At pre-commissioning review the third-party scheme assessor flags that BS 5839-1:2025 §14 explicitly excludes heat detectors from sleeping rooms in new L2 / L3 work. The contractor argues the heat detector is justifiable on the kitchen-below ground; the assessor responds that the standard makes no exception — heat is excluded from new work in sleeping rooms regardless of ground-floor use."
            whatToDo="Replace the bedroom heat detectors with smoke or smoke-mode multi-sensor detectors. Update the cause-and-effect matrix to handle the new detector type. Re-issue the as-built detector schedule recording address, location, type and configuration per §20.11. Brief the Responsible Person that the kitchen below remains protected by its own detector(s) per the design — the bedroom detector is for bedroom protection and must give early warning. The variation log records the change and the justification."
            whyItMatters="The 2025 §14 / §15 change is explicit and not retrospective. Carrying 2017 thinking into a new install is one of the most common 2025-era findings. Catching it at survey is cheap; catching it at first-fix is expensive; catching it at the scheme assessment is reputational damage. The standard is a code of practice; departures need written justification under §6 and may not be acceptable at all."
          />

          <CommonMistake
            title="MCP fitted at door-handle height for builder convenience"
            whatHappens="An MCP is fitted at 950 mm AFFL because the wall has a dado rail at 1100 mm and the installer prefers to fit below the rail rather than re-route. The drawing shows 1.4 m. The 2025 tolerance is +200 / -300 mm — range 1.1-1.6 m. 950 mm is below the lower bound. Auditor flags non-compliant. Re-work removes the MCP, repairs the wall, refits at 1.1 m above the dado rail."
            doInstead="Survey the wall before MCP layout. If the dado rail prevents a 1.1-1.6 m fitting, change the position of the MCP, not the height. The tolerance is fixed by the standard and is not negotiable on a build basis. 950 mm is non-compliant under any 2025 reading."
          />

          <CommonMistake
            title="Detectors with bases dust-contaminated at first-fix"
            whatHappens="Detector bases are wired in at first-fix, ahead of plasterboard, painting and floor finishes. No dust caps are fitted. Plasterboard dust, sanding dust and paint overspray accumulate inside the open bases over the next four weeks. At second-fix the heads are plugged in; commissioning runs; within a week, three detectors are signalling fault from contamination of the sensing chamber. The maintainer cleans them; two return to service, one is replaced."
            doInstead="Manufacturer dust caps fit the base during the construction phase. Cap fitted as soon as the base is wired and tested; cap removed and head fitted only when the area is clean and dry (typically after final painting and final cleaning, before handover). The dust caps are part of the install kit, not optional."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Detector documentation per §15 / §20</ContentEyebrow>

          <ConceptBlock
            title="Recording detector type, location and configuration"
            plainEnglish="The 2025 revision §15 (selection and application of fire detectors) and §20.11 (record of detector type and configuration) place greater emphasis on detector documentation. The intent: the maintainer arriving at a service visit knows exactly what detector is in each location, what mode it is configured to, and whether the configuration matches the design. The record is made available to the commissioning technician (during commissioning) and to the operating and maintenance manual (during service)."
          >
            <p>The minimum record per detector:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Address.</strong> Loop number and address number on the loop. Unique in the
                system. Programmed in the CIE; physically labelled on the detector at install.
              </li>
              <li>
                <strong>Location.</strong> Room name, position within room (e.g. "centre of
                ceiling", "at MCP-1.4 m").
              </li>
              <li>
                <strong>Type.</strong> Optical smoke, ionisation smoke (rare in new work), heat
                (with class — typically A1R or A2S), multi-sensor (with operating mode set —
                smoke-only, heat-only, smoke + heat with priority, etc.), beam, linear heat (with BS
                EN 54-22 / BS EN 54-28 type), aspirating (with sensitivity setting).
              </li>
              <li>
                <strong>Configuration.</strong> Multi-sensor mode, sensitivity setting, day / night
                mode if used, group / zone membership, cause-and-effect linkages.
              </li>
              <li>
                <strong>Manufacturer / model.</strong> For service purposes — replacement-on-fault
                must use a compatible model.
              </li>
              <li>
                <strong>Installation date.</strong> Lifecycle datum for service planning.
              </li>
            </ul>
            <p>
              The record is typically a spreadsheet or database with one row per detector,
              cross-referenced to the as-built drawing. Annex D Figure D.1 of the 2025 revision is a
              suitable means of recording the information per §20.11 NOTE.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Point detector below-ceiling rule (BS 5839-1:2025 21.2.4): smoke 25-600 mm, heat 25-150 mm. Numbers unchanged from 2017; only the clause re-numbers.',
              'Heat detectors NOT in sleeping rooms in new L2 / L3 work (NEW 2025 §14 / §15). Use smoke or smoke-mode multi-sensor. Existing systems not retrospective.',
              'MCP mounting: 1.4 m to operating element, tolerance +200 mm / -300 mm (range 1.1-1.6 m). 2025 tolerance now explicit.',
              'MCP protective covers recommended TRANSPARENT (was opaque) in 2025. Stairway-landing MCP per 12.1 a — zoned with adjacent accommodation, not the stairway.',
              'Distance to nearest MCP: 30 m straight-line, 45 m actual travel — single pair of figures in 2025 (was category-dependent in 2017).',
              "Beam detectors: precise alignment per manufacturer instruction, signal strength in manufacturer 'green zone', clear beam path, documented as-installed setting.",
              'Sounders: 65 dB(A) all accessible points / 75 dB(A) bed-head / 5 dB above sustained background. Verified at commissioning by sound survey.',
              'VADs (where primary signal): BS EN 54-23 — defined coverage volume at specified intensity. Layout produces continuous coverage; verified by walk-through at commissioning.',
              'Linear heat cable: NEW 2025 normative references — BS EN 54-22 (resettable) and BS EN 54-28 (non-resettable). Selection per application.',
              'Detector documentation per §15 / §20: address, location, type, configuration, manufacturer / model, installation date. Record made available to commissioning and to the O&M manual.',
              'Construction-phase protection: dust caps on bases at first-fix, heads at second-fix only when clean. Skipping leads to contaminated detectors and false alarms in service.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'Why did BS 5839-1:2025 exclude heat detectors from sleeping rooms — what changed?',
                answer:
                  'The 2025 revision reclassifies sleeping rooms as high-risk: an asleep occupant cannot self-rescue at the speed an awake occupant can, so early warning matters more. Heat detectors only respond once the fire has produced enough heat to reach the ceiling threshold — too late for an asleep occupant. Smoke detection (point or multi-sensor with smoke element) gives the earlier warning the asleep occupant needs. The change is not retrospective; existing installs continue. New work uses smoke.',
              },
              {
                question:
                  'My existing system has heat detectors in bedrooms. Do I have to replace them?',
                answer:
                  'No. The 2025 §14 / §15 change is explicit not retrospective. Existing systems continue. At service-replacement (e.g. a heat detector fails and must be replaced) the like-for-like replacement remains acceptable in the existing system. Only when the system is upgraded, extended or replaced does the new rule apply.',
              },
              {
                question: 'Do I need a tape measure to verify the 25-600 mm / 25-150 mm rule?',
                answer:
                  'Yes — the rule is to the SENSING ELEMENT, not the base. Manufacturer datasheets give the offset from base to element. With a base flush to the ceiling and a typical detector profile, the element will normally be in the band; with pendant or stalk-mounted installations, the offset can push the element below the band. Verify the actual position with the datasheet dimension.',
              },
              {
                question:
                  'How is the MCP tolerance applied — 1.4 m exactly or anywhere in 1.1-1.6 m?',
                answer:
                  'Anywhere in 1.1-1.6 m is compliant. The design preference is 1.4 m; the tolerance recognises that walls have features (dado rails, frames, pipework) that may force a small deviation. Choose within the tolerance — do not deviate above 1.6 m or below 1.1 m without a written justified-variation entry under §6.',
              },
              {
                question: 'Are transparent MCP covers a hard requirement in 2025?',
                answer:
                  'BS 5839-1 is a code of practice; recommendations are persuasive rather than mandatory. The 2025 revision strengthens the protective-cover recommendation to specifically prefer transparent. New installs should fit transparent covers. Where opaque covers are already in service, replacement at fault or at planned upgrade is the approach.',
              },
              {
                question: 'How do I verify beam detector alignment at commissioning?',
                answer:
                  'Use the manufacturer alignment tool — the optical sight or signal-strength indicator that is part of the beam detector kit. Aim using the sight; fine-tune using the signal-strength reading until it sits within the manufacturer "green zone". Then run a limit test using the manufacturer test filters to verify the beam alarms at the correct attenuation. Record the as-installed signal strength on the commissioning paperwork.',
              },
              {
                question: 'What is the difference between BS EN 54-22 and BS EN 54-28?',
                answer:
                  'BS EN 54-22 covers RESETTABLE linear heat detectors — the cable returns to service after the heat condition clears. BS EN 54-28 covers NON-RESETTABLE — the cable activates once and is then replaced. Both are recognised as normative references in BS 5839-1:2025 §3 (NEW 2025). Selection follows application: high-recurrence environments favour resettable; single-event environments may use non-resettable for calibrated repeatable response.',
              },
              {
                question:
                  'What does §20.11 require to be recorded for multi-sensor detectors specifically?',
                answer:
                  'For multi-sensor detectors with multiple operating modes, the design records the SELECTED operating mode and configuration so the commissioning technician programs them correctly. The record is made available to the commissioning technician (programs the CIE) and is captured in the O&M manual (so the maintainer at service knows what the detector should be set to). Annex D Figure D.1 of the 2025 revision is a suitable recording template.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Device installation — Module 5.3" questions={quizQuestions} />

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
              onClick={() =>
                navigate('/electrician/upskilling/fire-alarm-course/module-5/section-4')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.4 Wiring and terminations
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

export default FireAlarmModule5Section3;
