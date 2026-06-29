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
    id: 'elm1-s2-corridor-30m',
    question:
      'A new office fit-out has an internal corridor 36 m long, with no natural daylight, leading from the open-plan workspace to the fire-exit lobby. Approved Document B Volume 2 cl. 5 lists this as a trigger for emergency lighting. Why is the 30 m threshold significant?',
    options: [
      'It is the empirical length beyond which an occupant cannot reliably navigate an unfamiliar windowless corridor on residual dark-adaptation alone.',
      'It is a planning-permission threshold above which a separate building-control application is required for the corridor.',
      'It is the maximum travel distance permitted to a single fire exit before a second exit must be provided.',
      'It is the maximum spacing allowed between two mains luminaires on a corridor lighting circuit.',
    ],
    correctIndex: 0,
    explanation:
      'The 30 m threshold in Approved Document B Vol 2 cl. 5 reflects empirical evidence on how far an occupant can navigate in an unfamiliar windowless corridor on residual dark adaptation alone. Beyond that distance, performance degrades; beyond that the corridor needs emergency lighting. The 30 m figure has been carried forward from earlier editions and is mirrored in BS 5266-1.',
  },
  {
    id: 'elm1-s2-open-area-trigger',
    question:
      'BS 5266-1:2025 specifies open-area (anti-panic) lighting where the room exceeds a defined floor area OR exceeds a defined occupancy. What are the trigger thresholds?',
    options: [
      'Greater than 100 m² floor area, OR more than 100 occupants in the room.',
      'Greater than 60 m² floor area, OR more than 60 occupants in the room.',
      'Greater than 60 m², OR any room whose occupancy (typically more than 10) means evacuation cannot complete in seconds.',
      'Greater than 200 m² floor area, with no separate occupancy-based trigger.',
    ],
    correctIndex: 2,
    explanation:
      'Per BS 5266-1:2025 (mirroring BS EN 1838:2024 anti-panic lighting application). The 60 m² floor-area threshold targets large open spaces. The 10-occupant threshold targets smaller rooms whose occupancy creates bottleneck and panic risk independent of floor area — a small training room with 12 students, a packed restaurant booth area, a cellular meeting room.',
  },
  {
    id: 'elm1-s2-borrowed-light',
    question:
      'A 2026 design for a new building includes a stair half-landing whose only illumination on mains failure would come from a corridor luminaire on the upper landing, spilling into the half-landing through the open stair entry. Under BS 5266-1:2025 is this design acceptable?',
    options: [
      'Yes — the half-landing receives adequate light spilling from the corridor luminaire.',
      'Yes — only fully enclosed rooms with closed doors need direct illumination.',
      'No — the 2025 edition excludes borrowed light, so the half-landing needs its own dedicated luminaire.',
      'Yes — provided the corridor luminaire spilling into the stair is rated more than 8 W.',
    ],
    correctIndex: 2,
    explanation:
      'The borrowed-light exclusion is one of the most consequential 2025 changes. Designs prepared under the 2016 edition that relied on spill must be re-checked under the 2025 edition. Stair half-landings, lobbies, plant areas behind glazed walls — all common locations where borrowed light was used to economise on luminaire count and which now need their own provision.',
  },
  {
    id: 'elm1-s2-points-of-emphasis',
    question:
      'BS 5266-1:2025 requires luminaires (or compliant illumination) at specific "points of emphasis" along the escape route. Which of the following is NOT one of those points?',
    options: [
      'At each exit door intended for use in an emergency.',
      'At every change of direction.',
      'At each intersection of corridors.',
      'In the centre of every individual desk in an open-plan office.',
    ],
    correctIndex: 3,
    explanation:
      'Points of emphasis are navigational decision points and hazards on the escape route — exits, changes of direction, intersections, every staircase, outside each final exit, near fire alarm call points and firefighting equipment, near first-aid posts, at any change of floor level (steps, ramps), near each item of safety equipment. Individual desks are not points of emphasis. The escape route is illuminated to 1 lx along its centre line (full open width per BS EN 1838:2024); the points of emphasis get extra illumination to flag them.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which of the following premises types is LEAST likely to need emergency lighting under Approved Document B Volume 2 cl. 5?',
    options: [
      'A large open-air car park with overhead lighting only — no enclosed escape route, ample sky light during operating hours, well-lit by overhead luminaires at night.',
      'A multi-storey office block with 30 m+ internal corridors and no natural daylight in those corridors.',
      'A nightclub with a capacity of 400 occupants located in a basement with no natural daylight.',
      'A hospital ward providing overnight sleeping accommodation for patients who cannot self-evacuate.',
    ],
    correctAnswer: 0,
    explanation:
      'An open-air car park with no enclosed escape route is at the boundary — it has no internal corridors, no windowless rooms, and the escape is "outdoors" with sky light during the day and overhead illumination at night. Some risk-assessed installations include emergency lighting for stair towers and connecting paths. The other three premises types are clearly in scope: corridors > 30 m, basement places of assembly, sleeping accommodation in a hospital.',
  },
  {
    id: 2,
    question:
      'A toilet block in a workplace has total floor area 11 m² and is on an escape route that involves two changes of direction. Under BS 5266-1:2025 / Approved Document B does it need emergency lighting?',
    options: [
      'No — sanitary accommodation is categorically excluded from emergency lighting provision.',
      'No — only toilets with a floor area greater than 50 m² fall within the emergency-lighting trigger.',
      'Only if the block contains an accessible (disabled) WC fitted with an assistance alarm.',
      'Yes — at 11 m² it exceeds the > 8 m² threshold AND sits on a multi-turn escape route, so at least one luminaire is required.',
    ],
    correctAnswer: 3,
    explanation:
      'BS 5266-1 / Approved Document B trigger thresholds for toilets / sanitary spaces are floor area > 8 m² OR escape route with multiple turns. Either triggers provision. Smaller toilets with a single straight access from the corridor often do not require dedicated emergency lighting because the corridor luminaire and the visible exit door are sufficient.',
  },
  {
    id: 3,
    question:
      'A small basement plant room (3 m × 4 m) houses the building\'s switchgear and control panels. There are no windows; the room is accessed via a steel door from the lower ground floor corridor. Under what circumstances does it need emergency lighting?',
    options: [
      'Never — dedicated plant and switchgear rooms are exempt from emergency lighting requirements.',
      'Only when it is left permanently staffed during normal building operating hours.',
      'Whenever it is occupied — a windowless workspace where staff need light on mains failure (Workplace Reg 8) and responders need safe access to switchgear.',
      'Only if it houses more than three separate switchboards or distribution boards.',
    ],
    correctAnswer: 2,
    explanation:
      'Plant rooms / switchgear rooms are common emergency-lighting locations even though they are intermittently occupied. The Workplace Regulations 1992 Reg 8 applies to anyone working there; BS 5266-1 / Approved Document B explicitly list them as locations requiring EL because of the windowless construction, the safety-critical equipment, and the responder access requirement. A single luminaire is usually sufficient for a small room.',
  },
  {
    id: 4,
    question:
      'A high-risk task area is identified on a printing-press floor — operators must safely shut down the press on mains failure before evacuating. What category of emergency lighting is required AT the press, and what level of illumination must it provide?',
    options: [
      'High-risk task lighting at 15 lx (or 10% of normal task illuminance, whichever is greater), switching on within 0.5 s.',
      'Anti-panic lighting at 0.5 lx minimum, treating the press position the same as any open-area floor space.',
      'Escape route lighting at 1 lx along the centre line, since the press sits on the route the operator will use to leave.',
      'No emergency lighting at the workstation itself — provision is required only at the final exit door.',
    ],
    correctAnswer: 0,
    explanation:
      'High-risk task lighting differs from escape lighting in level (15 lx vs 1 lx), in switch-on speed (≤ 0.5 s vs ≤ 5 s for escape), and in the function it serves (continued operation for safe shutdown vs egress only). After the shutdown is complete, the operator follows the escape lighting on the egress route to outside.',
  },
  {
    id: 5,
    question:
      'Which document is the primary statutory source listing premises types that require emergency lighting in NEW BUILD or material alteration work in England?',
    options: [
      'BS 5266-1, which sets the technical performance criteria for emergency lighting systems.',
      'BS EN 1838, which defines the lighting levels and switch-on times for each emergency-lighting function.',
      'The Regulatory Reform (Fire Safety) Order 2005, which places the duty to assess fire risk on the responsible person.',
      'Approved Document B Volume 2 — statutory guidance under the Building Regulations 2010 (England), listing premises types and pointing to BS 5266-1 for the technical criteria.',
    ],
    correctAnswer: 3,
    explanation:
      'Approved Document B is the statutory guidance route for new build / material alteration in England — it gives compliance with the Building Regulations. BS 5266-1 is the technical British Standard delivering the Approved Document\'s "comply with BS 5266-1" requirement. The two documents work together: Approved Document tells you WHERE; BS 5266-1 tells you HOW.',
  },
  {
    id: 6,
    question:
      'Anti-panic lighting per BS EN 1838:2024 must achieve which of the following over the open-area floor (excluding a 0.5 m perimeter strip)?',
    options: [
      'A minimum of 5 lx across the area, with no limit placed on the maximum-to-minimum illuminance ratio.',
      'A minimum of 0.5 lx, with the maximum-to-minimum illuminance ratio across the area not exceeding 40:1.',
      'A minimum of 15 lx, the same level required for a high-risk task area on the same floor.',
      'No specific illuminance level — anti-panic lighting is assessed qualitatively rather than by measurement.',
    ],
    correctAnswer: 1,
    explanation:
      'Both numbers — 0.5 lx minimum AND ≤ 40:1 ratio — must be met. The 40:1 ratio is the killer in many designs: a small number of high-output luminaires gives a high mean illuminance but produces hot spots beneath each fitting and dark patches between, exceeding the ratio. The fix is more luminaires of lower output, distributed to flatten the illumination pattern.',
  },
  {
    id: 7,
    question:
      'A modern office fit-out has internal lobby spaces between the main corridor and the staircase entry. The lobby is windowless, approximately 3 m × 3 m, and serves only as a transition space. The 2016 BS 5266-1 design used "borrowed light" from the corridor luminaire. Under the 2025 edition, what changes?',
    options: [
      'Nothing changes — spill from the corridor luminaire remains an acceptable means of illuminating a transition lobby.',
      'The lobby must be enlarged to a defined minimum floor area before it can be served by a single luminaire.',
      'Each lobby now needs its own dedicated luminaire — the 2025 borrowed-light exclusion means it cannot rely on corridor spill and must achieve 1 lx on the egress line.',
      'Borrowed light becomes mandatory — corridor luminaires must be uprated to spill more light into adjacent transition spaces.',
    ],
    correctAnswer: 2,
    explanation:
      'The borrowed-light exclusion bites hardest on transition spaces: lobbies, stair half-landings, anterooms, plant areas behind glazed walls. Each needs its own luminaire under the 2025 edition. The cost impact on retrofits is real but small per space — typically one additional self-contained luminaire per affected lobby — and the safety improvement is material: the lobby is illuminated even if the adjacent corridor luminaire has itself failed.',
  },
  {
    id: 8,
    question:
      'Which of the following is a "point of emphasis" under BS 5266-1:2025 — a location where emergency lighting must be provided in addition to the general escape-route illumination?',
    options: [
      'The centre of every individual workstation across the open-plan office floor area.',
      'Only the main building entrance, since that is the point most occupants will head towards on egress.',
      'Only the sanitary accommodation, because windowless toilets are the hardest spaces to navigate in the dark.',
      'Changes of direction, corridor intersections, staircases, exits, fire-fighting and alarm points, and changes of floor level.',
    ],
    correctAnswer: 3,
    explanation:
      'Points of emphasis are navigational decision points (changes of direction, intersections, exits) and operational locations (fire alarm call points, firefighting equipment, first-aid posts) plus hazards (stairs, level changes). The standard emphasises these points because the escape route is most likely to fail at navigational ambiguity and at the points where a person must STOP to operate equipment.',
  },
  {
    id: 9,
    question:
      'A multi-storey care home has 60 individual resident bedrooms on its upper floors. Most residents are mobile but a small number are bed-bound and would be unable to evacuate quickly. What emergency lighting category most likely applies in the bedrooms themselves?',
    options: [
      'Local-area lighting per BS EN 1838:2024 — for occupants permitted or required to remain in place during a mains-failure event.',
      'Escape route lighting running the length of the bed, treating the bedroom as part of the corridor egress path.',
      'Anti-panic lighting applied uniformly throughout the building, including each resident bedroom.',
      'No emergency lighting is needed in the bedrooms, as residents will be assisted out by staff.',
    ],
    correctAnswer: 0,
    explanation:
      'Local-area lighting is a 2024 BS EN 1838 recognition. Care home bedrooms, hospital wards at night, hotel guest rooms in some cases — places where occupants do NOT immediately escape but remain safely in place during the outage. The corridor outside is served by escape route lighting; the room itself is served by local-area lighting; the two together deliver the safety case.',
  },
  {
    id: 10,
    question:
      'You are walking a new premises before quoting an emergency lighting design. What is the methodically correct way to identify locations requiring emergency lighting?',
    options: [
      'Specify enough luminaires to cover every wall and corridor at a uniform spacing, regardless of which spaces are triggers.',
      'Work through the layers — Approved Document B baseline, then BS 5266-1 trigger thresholds, then the RRO Art 9 risk assessment — and produce a schedule mapping every space to a category.',
      'Copy the emergency-lighting layout from a previously completed building of a broadly similar type and occupancy.',
      'Position one luminaire above each final exit door and treat the rest of the building as covered by the normal lighting.',
    ],
    correctAnswer: 1,
    explanation:
      'The methodical approach starts with statutory guidance (Approved Document B), layers the technical standard (BS 5266-1:2025), and finishes with the risk assessment (RRO Art 9). Each adds locations the previous layer may have missed. The output is a schedule — every space mapped to a category — that becomes the design brief for the luminaire layout.',
  },
];

const EmergencyLightingModule1Section2 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Locations requiring emergency lighting | Emergency Lighting M1.2 | Elec-Mate',
    description:
      'Approved Document B Volume 2 cl. 5 + BS 5266-1:2025 trigger thresholds — corridors > 30 m, places of assembly, sleeping accommodation, plant rooms, lifts, multi-turn toilets, high-risk task areas, and the 2025 borrowed-light exclusion.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 1
          </button>

          <PageHero
            eyebrow="Module 1 · Section 2"
            title="Locations where emergency lighting is required"
            description="Approved Document B Volume 2 cl. 5 plus BS 5266-1:2025 trigger thresholds — the methodical walk-through that identifies every space in a premises that needs emergency lighting."
            tone="yellow"
          />

          <TLDR
            points={[
              'Approved Document B Volume 2 cl. 5 is the starter checklist for new build / material alteration: internal corridors > 30 m, escape stairs, basements / windowless areas, places of assembly, sleeping accommodation, escape routes serving high-risk areas, lifts, toilets / sanitary above the threshold, plant rooms.',
              'BS 5266-1:2025 trigger thresholds add precision: > 60 m² open areas need anti-panic (or > 10 occupants in smaller rooms); > 8 m² toilets or multi-turn escape routes; high-risk task areas need 15 lx; standby lighting where activity must continue.',
              'The RRO Article 9 risk assessment overlays the standard checklists with use-specific drivers — what occupants actually need to do on mains failure determines the categories required.',
              'The 2025 edition EXCLUDES borrowed light from design provision. Each space requiring emergency lighting must be illuminated DIRECTLY. Stair half-landings, lobbies, plant rooms behind glazed walls now need their own luminaires.',
              'Points of emphasis: outside each final exit, every change of direction, corridor intersections, every staircase, near fire alarm call points and firefighting equipment, near first-aid posts, at every change of floor level.',
              'Domestic dwellings are out of scope under the RRO. HMOs and the communal parts of blocks of flats ARE in scope. Care homes, hostels, hospitals are workplaces and fully in scope.',
              'The methodical approach: Approved Document B baseline → BS 5266-1:2025 trigger thresholds → RRO Art 9 risk assessment → schedule mapping every space against the four EL functions plus local-area.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply the Approved Document B Volume 2 cl. 5 list of premises requiring emergency lighting as a starting checklist on a new design',
              'Apply the BS 5266-1:2025 trigger thresholds — > 30 m corridors, > 60 m² open areas, > 10 occupants, > 8 m² or multi-turn toilets, plant rooms, stairs, lifts',
              'Identify the points of emphasis where additional luminaires must be placed beyond the general escape-route illumination',
              'Recognise the BS 5266-1:2025 borrowed-light exclusion and its design impact on lobbies, stair half-landings and other transition spaces',
              'Distinguish escape route lighting, anti-panic lighting, high-risk task area lighting, and local-area lighting by the location each is intended to serve',
              'Apply the risk-assessment overlay (RRO Art 9) to identify locations not on the standard checklist that nevertheless need emergency lighting',
              'Produce a location-by-location schedule for a building, mapping each space against the appropriate EL category or combination of categories',
              'Recognise the special-premises supplements (BS 5266 Part 1 Annex; sector-specific guidance) for healthcare, education, places of assembly, residential care',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Approved Document B Volume 2 cl. 5 — the baseline checklist</ContentEyebrow>

          <ConceptBlock
            title="The list of premises and locations"
            plainEnglish="When you walk a building before designing, the first reference you reach for is Approved Document B Volume 2 (Buildings other than dwellinghouses). Cl. 5 sets out the categories of premises and locations where emergency escape lighting is required as part of the means of escape. The list is the statutory-guidance starting point; BS 5266-1:2025 fills in the engineering detail; the RRO risk assessment adds what the list misses."
            onSite="On site, take a printed checklist on the survey. Tick each location against the list as you walk; flag the ones that need EL; note the secondary functions (any high-risk task areas, any large open areas, any sleeping accommodation). The output of the survey is the design brief, not the design itself."
          >
            <p>The Approved Document B Vol 2 cl. 5 list (paraphrased — read original Cl. 5 / Table 5.1 for the canonical wording):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Internal corridors and circulation routes &gt; 30 m</strong>, particularly
                where they have no natural daylight or where the daylight contribution is
                insufficient outside daylight hours. Includes the connections between corridors
                and stair enclosures and the lobbies between corridors and final exits.
              </li>
              <li>
                <strong>Escape staircases</strong> — every staircase that forms part of the
                designated means of escape. Particularly important where the staircase has no
                natural daylight, is below ground level, or is enclosed for fire-protection
                purposes.
              </li>
              <li>
                <strong>Underground or windowless accommodation</strong> — basements used for any
                purpose where occupants may be present, windowless rooms used for working,
                storage or assembly. The lack of natural light means an unmitigated mains failure
                produces total darkness.
              </li>
              <li>
                <strong>Places of assembly</strong> — auditoria, theatres, cinemas, dance halls,
                function rooms, restaurants, bars, religious buildings, large meeting halls.
                Open-area / anti-panic lighting is the typical requirement, plus escape lighting
                on the egress routes from the assembly space.
              </li>
              <li>
                <strong>Sleeping accommodation</strong> — hotels, hostels, halls of residence,
                care homes, hospitals, hospices. Special considerations for waking occupants and
                allowing assisted evacuation; longer durations are sometimes required.
              </li>
              <li>
                <strong>Escape routes serving high-risk areas</strong> — the route from a
                high-risk task area to the place of safety. The high-risk task lighting (15 lx
                / 10%) covers the workstation; escape route lighting (1 lx full width with edge
                exclusions per BS EN 1838:2024) covers the egress; anti-panic covers any open
                area passed through.
              </li>
              <li>
                <strong>Lift cars</strong> — for occupants trapped during mains failure to be
                reassured, see the controls (alarm button), and be located by the rescue team.
                Cross-reference BS EN 81-20 / 81-50 for lift-specific requirements.
              </li>
              <li>
                <strong>Toilets and sanitary spaces</strong> above the trigger threshold (typically
                &gt; 8 m² OR escape route involves multiple turns). Smaller toilets with a single
                straight access from the corridor are usually adequately served by the corridor
                luminaire.
              </li>
              <li>
                <strong>Plant rooms, switchgear rooms, control rooms</strong> — windowless rooms
                housing safety-critical equipment, particularly those that may be entered by an
                emergency-response engineer during the outage event itself.
              </li>
              <li>
                <strong>Service routes and tunnels</strong> — long enclosed services routes,
                cable tunnels, plant access routes that occupants may traverse as part of an
                evacuation or that maintenance staff use.
              </li>
            </ul>
            <p>
              The list is the baseline. Any premises that contains any of these features needs
              the corresponding emergency lighting provision. The risk assessment then adds
              anything else use-specific.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Approved Document B Volume 2 (2019, with 2020 / 2022 amendments) · Cl. 5 (Emergency escape lighting)"
            clause={
              <>
                Areas listed in Table 5.1 should have emergency escape lighting, including
                escape routes through internal corridors and staircases, underground or
                windowless accommodation, places of assembly, parts of premises used for
                sleeping accommodation, escape routes serving high-risk areas, lift cars and
                toilets / sanitary accommodation exceeding the size or layout threshold.
                Emergency lighting should comply with BS 5266-1.
              </>
            }
            meaning="The Approved Document is statutory guidance for the Building Regulations — it tells you WHERE emergency lighting is needed for a new build or material alteration. The technical performance is delivered through compliance with BS 5266-1:2025. The two documents work together: Approved Document for location, BS 5266-1 for engineering."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          {/* Location triggers diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Location triggers — where emergency lighting is required
            </h4>
            <svg
              viewBox="0 0 820 440"
              className="w-full h-auto"
              role="img"
              aria-label="Building cross-section showing the typical location triggers for emergency lighting: a 30 m+ internal corridor, an escape stair without natural daylight, a basement plant room, an open-area assembly space exceeding 60 m², a high-risk task area, and a lift car. Each is marked with the BS 5266-1:2025 / Approved Document B trigger and the EL category that applies."
            >
              {/* Building outline */}
              <rect x="20" y="40" width="780" height="320" rx="10" fill="rgba(168,85,247,0.04)" stroke="rgba(168,85,247,0.4)" strokeWidth="1.6" />
              <text x="410" y="62" textAnchor="middle" fill="#A855F7" fontSize="11" fontWeight="bold">BUILDING — TYPICAL LOCATION TRIGGERS</text>
              <text x="410" y="76" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9.5">cross-section showing where Approved Doc B + BS 5266-1:2025 require provision</text>

              {/* Floor divider */}
              <line x1="20" y1="206" x2="800" y2="206" stroke="rgba(255,255,255,0.3)" strokeWidth="1.4" strokeDasharray="3,3" />
              <text x="34" y="200" fill="rgba(255,255,255,0.55)" fontSize="9">Ground floor</text>
              <text x="34" y="222" fill="rgba(255,255,255,0.55)" fontSize="9">Basement</text>

              {/* Corridor — top floor (left) */}
              <g>
                <rect x="40" y="100" width="300" height="44" rx="6" fill="rgba(251,191,36,0.08)" stroke="#FBBF24" strokeWidth="1.4" />
                <text x="190" y="118" textAnchor="middle" fill="#FBBF24" fontSize="10" fontWeight="bold">1 · Internal corridor &gt; 30 m</text>
                <text x="190" y="132" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">Escape route lighting · 1 lx full width (edge excl.)</text>
                <text x="190" y="143" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">Approved Doc B cl. 5 · BS 5266-1:2025 §5</text>
              </g>

              {/* Open-area assembly (top right) */}
              <g>
                <rect x="358" y="100" width="222" height="92" rx="6" fill="rgba(34,211,238,0.08)" stroke="#22D3EE" strokeWidth="1.4" />
                <text x="469" y="120" textAnchor="middle" fill="#22D3EE" fontSize="10" fontWeight="bold">2 · Open area &gt; 60 m²</text>
                <text x="469" y="135" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">Anti-panic · 0.5 lx · max 40:1 ratio</text>
                <text x="469" y="149" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">OR &gt; 10 occupants regardless of size</text>
                <text x="469" y="166" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">e.g. assembly hall, restaurant</text>
                <text x="469" y="180" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">BS EN 1838:2024 §4</text>
              </g>

              {/* Stair (top right edge) */}
              <g>
                <rect x="600" y="100" width="180" height="92" rx="6" fill="rgba(168,85,247,0.08)" stroke="#A855F7" strokeWidth="1.4" />
                <text x="690" y="120" textAnchor="middle" fill="#A855F7" fontSize="10" fontWeight="bold">3 · Escape staircase</text>
                <text x="690" y="135" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">Every flight · half-landings</text>
                <text x="690" y="149" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">Point of emphasis at each step</text>
                <text x="690" y="166" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">2025: half-landings need own</text>
                <text x="690" y="180" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">luminaire (no borrowed light)</text>
              </g>

              {/* Plant room (basement left) */}
              <g>
                <rect x="40" y="232" width="180" height="100" rx="6" fill="rgba(239,68,68,0.06)" stroke="#EF4444" strokeWidth="1.4" />
                <text x="130" y="252" textAnchor="middle" fill="#EF4444" fontSize="10" fontWeight="bold">4 · Plant / switchgear room</text>
                <text x="130" y="267" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">Windowless · safety-critical</text>
                <text x="130" y="281" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">Workplace Regs Reg 8</text>
                <text x="130" y="298" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">Egress + responder access</text>
                <text x="130" y="314" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">≥ 1 luminaire per room</text>
              </g>

              {/* High-risk task area (basement centre) */}
              <g>
                <rect x="240" y="232" width="240" height="100" rx="6" fill="rgba(239,68,68,0.08)" stroke="#EF4444" strokeWidth="1.4" />
                <text x="360" y="252" textAnchor="middle" fill="#EF4444" fontSize="10" fontWeight="bold">5 · High-risk task area</text>
                <text x="360" y="267" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">15 lx OR 10% of task illuminance</text>
                <text x="360" y="281" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">Switch-on ≤ 0.5 s</text>
                <text x="360" y="298" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">2025 NEW · ≥ 2 circuits</text>
                <text x="360" y="314" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">≤ 20 luminaires per fault</text>
              </g>

              {/* Lift car (basement right) */}
              <g>
                <rect x="500" y="232" width="140" height="100" rx="6" fill="rgba(34,197,94,0.06)" stroke="#22C55E" strokeWidth="1.4" />
                <text x="570" y="252" textAnchor="middle" fill="#22C55E" fontSize="10" fontWeight="bold">6 · Lift car</text>
                <text x="570" y="267" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">Reassurance · alarm button</text>
                <text x="570" y="281" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">Locator for rescue team</text>
                <text x="570" y="298" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">BS EN 81-20 cross-ref</text>
                <text x="570" y="314" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">Self-contained typical</text>
              </g>

              {/* Toilets (basement far right) */}
              <g>
                <rect x="660" y="232" width="120" height="100" rx="6" fill="rgba(34,211,238,0.06)" stroke="#22D3EE" strokeWidth="1.4" />
                <text x="720" y="252" textAnchor="middle" fill="#22D3EE" fontSize="10" fontWeight="bold">7 · Toilets &gt; 8 m²</text>
                <text x="720" y="267" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">OR multi-turn escape</text>
                <text x="720" y="284" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">Single straight-run</text>
                <text x="720" y="298" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">small toilets often</text>
                <text x="720" y="312" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">covered by corridor</text>
              </g>

              {/* Risk-assessment overlay strip */}
              <rect x="20" y="380" width="780" height="48" rx="8" fill="rgba(251,191,36,0.06)" stroke="rgba(251,191,36,0.4)" strokeWidth="1.4" />
              <text x="410" y="400" textAnchor="middle" fill="#FBBF24" fontSize="11" fontWeight="bold">⚠ + RRO Article 9 risk assessment overlays the standard checklist</text>
              <text x="410" y="416" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9.5">Use-specific drivers — high-risk processes, sleeping accommodation, datacentre standby — add locations beyond the baseline list</text>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>BS 5266-1:2025 trigger thresholds — the precision layer</ContentEyebrow>

          <ConceptBlock
            title="Open-area trigger — > 60 m² OR > 10 occupants"
            plainEnglish="BS 5266-1:2025 says any room over 60 m² floor area triggers anti-panic lighting; any room with more than about 10 occupants also triggers it, even if the floor area is below 60 m². Either threshold operates independently. The reasoning: large floor area produces panic risk on its own; high occupancy produces evacuation-bottleneck risk on its own. A small packed meeting room is in scope; a large empty atrium is in scope."
          >
            <p>The two-trigger logic:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>&gt; 60 m² floor area.</strong> Above this size, a sudden plunge into
                darkness produces panic because occupants cannot resolve the geometry of the
                space. The 0.5 lx anti-panic illumination keeps the room's shape legible enough
                for occupants to orient themselves.
              </li>
              <li>
                <strong>&gt; 10 occupants regardless of size.</strong> Even a smaller room can
                have a bottleneck-and-panic problem if there are enough people. A training room
                with 12 students moving toward a single door, plunged into darkness, is exactly
                the scenario anti-panic addresses. The trigger is occupancy, not just area.
              </li>
              <li>
                <strong>Anti-panic level.</strong> 0.5 lx minimum across the floor, excluding a
                0.5 m perimeter strip. Maximum 40:1 ratio of brightest to darkest point.
              </li>
              <li>
                <strong>Combination with escape route.</strong> Anti-panic is the area
                illumination of the room; escape route lighting is the navigational illumination
                of the path leaving the room. Both apply where both functions are needed: the
                room is anti-panic, the corridor leaving is escape-route, the door between them
                is a point of emphasis.
              </li>
            </ul>
            <p>
              Distinguish the two functions clearly. Anti-panic does NOT replace escape route
              lighting — it complements it. A large open meeting room needs anti-panic in the
              room AND escape route lighting on the corridor leaving the room. Both categories,
              same incident, different illuminance levels and different luminaire positions.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="High-risk task area — 15 lx and ≤ 0.5 s switch-on"
            plainEnglish="A high-risk task area is one where occupants must continue to operate equipment for some seconds or minutes after mains failure to make the equipment safe before evacuating. Printing presses, chemical reactors, X-ray equipment, large machinery with kinetic-energy hazards, surgical procedures. The standard places the highest demands on the lighting here: 15 lx (or 10% of task illuminance, whichever is greater), switch-on time ≤ 0.5 s (effectively instantaneous), and from 2025 onwards specific electrical-supply segmentation."
          >
            <p>The high-risk task area requirements:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>15 lx or 10% of normal task illuminance, whichever is greater.</strong>
                Why 15 lx? Because that is the level at which printed labels, control panel
                displays, gauges, valves and isolators can still be read. Below it, the operator
                cannot reliably operate the equipment. The 10% rule scales the standard up where
                the normal task illuminance is high (e.g. surgical theatre at 1000 lx → emergency
                level 100 lx).
              </li>
              <li>
                <strong>Switch-on time ≤ 0.5 s.</strong> Faster than the standard 5 s for escape
                route. The reason: the press is in motion, the reactor is exothermic, the
                surgical incision is open. A 5-second outage of light may be intolerable for the
                process; the lighting must be effectively instantaneous.
              </li>
              <li>
                <strong>Duration appropriate to the task.</strong> The lighting must last long
                enough for the safe-shutdown procedure plus a margin. Often this is just a few
                minutes — but it must be evaluated and documented. Some processes have longer
                safe-shutdown procedures and the high-risk lighting must run for the full
                duration plus margin.
              </li>
              <li>
                <strong>NEW in 2025: ≥ 2 separate circuits, ≤ 20 luminaires per fault.</strong>
                Segmentation rule. Splits the EL provision so a single circuit fault cannot
                disable the protection in a hazardous area. Designs after 31 October 2025 must
                meet this rule; pre-existing systems are reviewed at the next photometric
                survey.
              </li>
            </ul>
            <p>
              High-risk task areas need a documented design. Identify the hazardous activity,
              identify the safe-shutdown procedure, time the procedure, define the duration,
              specify the illuminance and the switch-on time, and segment the EL supply per the
              2025 rule. The design output goes into the BS 5266 design certificate and survives
              audit.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 1838:2024 · Clause 4.4 (Lighting of high-risk task areas)"
            clause={
              <>
                Where the workforce has to leave hazardous machinery or processes safely, the
                illuminance level for high-risk task area lighting shall be at least 10% of the
                required maintained illuminance for the task, but not less than 15 lx. The
                lighting shall be free from harmful stroboscopic effects. The illuminance shall
                be reached within 0.5 s with a uniformity (Emin / Emax) not less than 0.1 (i.e.
                the maximum-to-minimum ratio shall not exceed 10:1).
              </>
            }
            meaning="Three numbers to remember: 15 lx OR 10% of task illuminance (the higher); 0.5 s switch-on; 10:1 maximum-to-minimum uniformity ratio. The third is tighter than the 40:1 anti-panic ratio because the operator needs to read precise control surfaces, not just navigate the room."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The 2025 borrowed-light exclusion</ContentEyebrow>

          <ConceptBlock
            title="What borrowed light was, and why it has gone"
            plainEnglish='"Borrowed light" was a 2016-edition design technique: relying on light spilling in from an adjacent illuminated space to satisfy the emergency lighting requirement of a smaller transition space. Stair half-landings illuminated by spill from the upper landing. Lobbies illuminated by spill from the corridor. Plant areas behind glazed walls illuminated by spill from the corridor. The 2025 edition explicitly excludes borrowed light from design provision. Each space requiring emergency lighting must be illuminated DIRECTLY.'
          >
            <p>The reasoning behind the 2025 exclusion:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>The borrowed source may have failed.</strong> If the corridor luminaire
                that was supposed to spill into the lobby has itself failed (LED module failure,
                local circuit fault), the lobby is in darkness. The premises has no defence
                against this scenario when relying on borrowed light.
              </li>
              <li>
                <strong>The intervening door may be closed.</strong> Many lobbies have
                fire-resisting doors that are closed in a fire situation. Light that spills into
                the lobby through an open door does not spill when the door is closed. The 2016
                edition often glossed over this; the 2025 edition does not.
              </li>
              <li>
                <strong>The decoration may have changed.</strong> A wall painted dark, a glazed
                screen retro-fitted with privacy film, a partition installed — all reduce the
                borrowed light that was assumed in the original design. Premises change over
                their life; a design dependent on assumed reflectances and light paths is
                fragile.
              </li>
              <li>
                <strong>The standard committee judged the savings disproportionate to the
                risk.</strong> Borrowed-light designs typically save one or two luminaires per
                affected lobby — 5 to 15% of the luminaire count for the affected route. The
                committee judged the cost saving disproportionate to the safety risk; the new
                edition mandates direct illumination.
              </li>
            </ul>
            <p>
              The practical impact on retrofits is real but bounded. Audit any 2016-design
              scheme by walking the building with the design drawings; identify every space that
              is illuminated by spill rather than by its own luminaire; specify additional
              luminaires for those spaces; install during the next photometric verification
              cycle. Cost per affected space is small (typically £80-150 for a self-contained
              LED luminaire plus minor wiring); cost across a building can be material.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · Clause 5.2 (Design provision — direct illumination requirement)"
            clause={
              <>
                The illumination required by this standard for any space shall be provided
                directly by emergency luminaires positioned to illuminate that space.
                Illumination spilled from luminaires positioned in adjacent spaces ("borrowed
                light") shall not be counted as a contribution to the design provision for the
                space. This requirement applies whether the adjacent space is connected by an
                open aperture, a closed door, or a glazed partition.
              </>
            }
            meaning="The 2025 borrowed-light exclusion is unambiguous. Every space requires its own dedicated luminaire(s). 'Adjacent space spill' is no longer a design contribution. The text explicitly closes the loophole that some 2016 designs exploited where the adjacent space was 'open' to the space being designed."
          />

          <Scenario
            title="The 2026 lobby retrofit"
            situation="A 2018-built office block was designed to BS 5266-1:2016. Each floor has a small lobby (3 m × 3 m) between the main corridor and the staircase entry. The 2018 design illuminated the lobbies by 'borrowed light' from the corridor luminaire, with the open lobby doors. The current responsible person commissions a 2026 photometric survey under the new BS 5266-1:2025. The luxmeter reading in the lobbies, with the doors closed (their normal fire-event position), is 0.1 lx — below the 1 lx escape-route threshold."
            whatToDo="The system fails the 2025 photometric survey on the lobby spaces. Remediation: install one self-contained LED escape-route luminaire per affected lobby, positioned to illuminate the floor area directly. Test, measure, document. Across a 6-storey building, that is 6 lobbies — typically £600-900 in product cost plus installation labour. Update the design drawings to reflect the new luminaires; update the maintenance log; re-issue the photometric record. The premises is non-compliant from the date of the survey to the date of remediation; rectify promptly and document."
            whyItMatters="This is the single most common 2025-driven retrofit. Every premises with a 2016-edition design and any transition spaces (lobbies, half-landings, plant areas behind glazed walls) is exposed. The 5-year photometric verification cycle is the audit point at which it surfaces. Quoting and scoping for this work is a substantial body of contractor opportunity for the next 5-7 years as the existing built stock cycles through its first photometric survey."
          />

          <CommonMistake
            title="Treating the lobby as 'just a transition space'"
            whatHappens="The original 2018 design noted the lobby as a transition space — passed through, not occupied — and considered borrowed light from the corridor adequate. In the actual 2026 evacuation, the corridor luminaire fails first (random product failure), then the mains fails. The lobby has no light. Occupants reach the lobby and are unable to find the staircase entry; the queue forms at the corridor / lobby boundary; congestion delays the evacuation."
            doInstead="Design every transition space — lobby, ante-room, stair half-landing, plant area behind a glazed wall — with its own dedicated luminaire. Treat 'transition' as 'escape route', not as 'borrowed area'. The 2025 edition codifies what was always good practice. The single self-contained luminaire is the cheapest insurance available."
          />

          <CommonMistake
            title="Counting lift-shaft light as the lift-car light"
            whatHappens="A premises has a lift with internal lighting that fails on mains failure. The designer assumed the shaft would have ambient light from the upper-landing luminaire and that this would 'spill into' the lift car through the gap above the door. Lift car internal emergency lighting was therefore considered unnecessary. In the actual evacuation event, an occupant is in a lift between floors when the mains fails. The lift halts; the car is in pitch darkness; the alarm button glow is barely visible; the occupant cannot tell where the controls are; panic ensues."
            doInstead="Lift cars require their own emergency lighting per Approved Document B and BS EN 81-20 / 81-50. The lighting is integral to the lift car — not borrowed from the shaft. Modern lift cars typically have a small self-contained LED battery unit fitted at install. Verify it is present, functional, and tested as part of the building EL regime. Cross-reference the lift maintenance contract: who tests it, who logs the test, who rectifies it on failure."
          />

          <SectionRule />

          <ContentEyebrow>Points of emphasis — where extra luminaires go</ContentEyebrow>

          <ConceptBlock
            title="The full list of points of emphasis"
            plainEnglish="The general escape-route illumination provides 1 lx across the full width of the route at floor level, with edge exclusions per BS EN 1838:2024 (outer 0.5 m on routes > 2 m, outer ¼ width on routes ≤ 2 m). At specific decision points and operational locations, additional luminaires are placed to flag the point and bring the local illuminance up so the point can be reliably found and used. These locations are the 'points of emphasis' in BS 5266-1:2025 §5."
            onSite="On site, walk the escape route in your head as if it were an evacuation. Where do you have to stop? Where do you have to make a decision? Where might you find a hazard? Where do you have to operate equipment? Each of those is a point of emphasis. Mark them on the design drawing; add a luminaire at each one (or position the general luminaires so a luminaire happens to be over each point)."
          >
            <p>The full list of points of emphasis from BS 5266-1:2025 §5 (paraphrased):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>At each exit door</strong> intended for use in an emergency. Both
                sides — internally to flag the door from the room, and externally (where
                applicable) to flag the assembly area outside the final exit.
              </li>
              <li>
                <strong>Outside each final exit, at the point of safety.</strong> Reassures
                evacuated occupants that they have reached safety; allows the muster point /
                assembly area to be located and used; allows the fire and rescue service to
                identify the building entry.
              </li>
              <li>
                <strong>At every change of direction</strong> on the escape route. Where the
                corridor turns, where a stair top opens onto a corridor, where two corridors
                meet at an angle. Without an emphasis luminaire, the occupant may continue past
                the turn.
              </li>
              <li>
                <strong>At each intersection of corridors.</strong> Decision point — which way?
                The luminaire at the intersection (often combined with a directional
                running-man sign) makes the decision support visible.
              </li>
              <li>
                <strong>At every staircase.</strong> Each individual flight of every stair on
                the escape route. From the 2025 edition, half-landings need their own provision
                (no borrowed light).
              </li>
              <li>
                <strong>Near each fire alarm call point and near each item of firefighting
                equipment.</strong> 5 lx vertical at the fire alarm call point and at the fire
                extinguisher / hose reel. The vertical level allows the occupant to read the
                instructions on the equipment and to operate it correctly.
              </li>
              <li>
                <strong>Near each first-aid post.</strong> Same logic as firefighting equipment;
                first-aid use during or after an evacuation may be required and the responder
                must be able to read instructions and use the equipment.
              </li>
              <li>
                <strong>At every change of floor level.</strong> Steps, ramps, mezzanine
                transitions. These are the highest-risk points in an evacuation for trip and
                fall injury; emphasis lighting reduces the risk.
              </li>
              <li>
                <strong>Near each safety equipment item</strong> generally — emergency stop
                buttons, isolator handles, refuge points for assisted evacuation, evacuation
                chairs, fire blankets in kitchens.
              </li>
            </ul>
            <p>
              The list is exhaustive in concept though contextual in application. A small office
              may have only three or four points of emphasis (final exit, change of direction,
              fire alarm call point); a hospital may have hundreds. The luminaire layout that
              hits all the points of emphasis is the design output.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · Clause 5.3 (Points of emphasis)"
            clause={
              <>
                Emergency escape lighting luminaires shall be provided at the points of
                emphasis listed in this clause. These are the locations on the escape route or
                associated with safety equipment where additional illumination is required to
                ensure the location is identifiable and the equipment is usable. Points of
                emphasis include but are not limited to: exits, changes of direction,
                intersections, staircases, near fire safety equipment, near first-aid posts,
                and at changes of floor level.
              </>
            }
            meaning="The phrase 'include but are not limited to' is important. The list is non-exhaustive; the designer must apply judgement to identify any additional decision points or hazards on a particular route. Emphasis at firefighting equipment is 5 lx vertical (allows reading equipment instructions); at general decision points the level is the prevailing escape-route illuminance plus the natural emphasis of a luminaire over the point."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Special premises — sector-specific overlays</ContentEyebrow>

          <ConceptBlock
            title="Healthcare, education, places of assembly, residential care"
            plainEnglish="Some premises types have special requirements layered on top of the BS 5266-1:2025 baseline — sector-specific drivers from healthcare, education, leisure / hospitality, residential care. The standard's annexes give guidance; the sector-specific bodies (HTM 06-01 for healthcare, BB 100 for education, Purple Guide for events, regulators for care homes) elaborate."
          >
            <p>The sector overlays:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Healthcare — HTM 06-01.</strong> Hospitals, clinics, dental surgeries.
                Standby lighting for operating theatres (under 2025 scope expansion), special
                durations for areas where assisted evacuation is required (longer than 3 hours
                for some wards), local-area lighting for night-time wards, IPS / UPS
                considerations for life-critical equipment per BS EN 50171.
              </li>
              <li>
                <strong>Education — BB 100.</strong> Schools, colleges, universities. Anti-panic
                in halls, sports halls, lecture theatres. Escape route lighting in long
                corridors. Special considerations for SEN provision and disabled-access escape
                routes, evacuation chairs at refuge points.
              </li>
              <li>
                <strong>Places of assembly — Purple Guide / venue-specific.</strong> Theatres,
                cinemas, dance halls, nightclubs, restaurants, sports venues. Anti-panic
                throughout the assembly area; escape route lighting on every egress; special
                considerations for stage / performance lighting interacting with the EL system,
                blackout transitions, audience-direction (audience faces the stage; emergency
                lighting must illuminate without blinding the performance).
              </li>
              <li>
                <strong>Residential care — CQC-regulated.</strong> Care homes, nursing homes,
                hospices, supported living. Local-area lighting in resident bedrooms (under 2024
                EN), longer durations for assisted evacuation (3 hours minimum, some sectors
                longer), anti-panic in dining and lounge areas, sleep-friendly colour
                temperatures so night-time use does not disturb residents.
              </li>
              <li>
                <strong>Industrial / manufacturing — high-risk task driven.</strong> Factories,
                workshops, plant. High-risk task lighting at hazardous machinery, escape route
                from the workstation through the production area, anti-panic where the
                production area exceeds 60 m², with the 2025 segmentation rule (≥ 2 circuits,
                ≤ 20 luminaires per fault) for the high-risk areas.
              </li>
              <li>
                <strong>Retail / hospitality.</strong> Shops, supermarkets, restaurants, bars,
                hotels. Anti-panic in trading floor and dining areas, escape route lighting on
                egress through stockrooms / kitchens / back-of-house, emphasis at front-of-house
                exits, hotel sleeping accommodation provisions.
              </li>
              <li>
                <strong>Specialist — datacentres, broadcast studios, transport.</strong> Standby
                lighting (under 2025 scope) for continued operations during fail-over, special
                durations matched to the operational requirement, BS EN 50171 central battery
                / IPS considerations.
              </li>
            </ul>
            <p>
              The sector overlay is layered ON TOP of BS 5266-1:2025 — it does not replace it.
              The baseline standard delivers the engineering; the sector guidance delivers the
              context-specific decisions. A care home design follows BS 5266-1:2025 plus the
              relevant CQC / care-sector guidance; a hospital follows BS 5266-1:2025 plus HTM
              06-01.
            </p>
          </ConceptBlock>

          <Scenario
            title="The mixed-use building"
            situation="A new 5-storey building has retail at ground (Boots-style chemist), restaurants at first floor, offices at floors 2 and 3, and a residential care unit at floor 4 (12 apartments for assisted living). Each occupier is a different responsible person under the RRO, but the common parts of the building are managed by the landlord. The lift, the ground-floor lobby, the central staircase, and the rooftop plant room are landlord-managed. Each tenancy has its own internal areas. How do the location-trigger thresholds apply?"
            whatToDo="Treat the building as a layered design. The landlord is the responsible person for common parts: landlord designs the EL for the staircase, lift, lobbies, plant rooms, external paths to assembly point. Each occupier is the responsible person for their tenancy: the chemist designs anti-panic for the trading floor (likely > 60 m²), escape route on egress through stockroom; the restaurants design anti-panic for the dining area, escape route through kitchen, with high-risk task lighting at any large gas/electric cooking equipment; the offices design escape route lighting and anti-panic for any open-plan area > 60 m² or > 10 occupants; the residential care unit designs local-area lighting in apartments, escape route in unit corridor, with longer durations and assisted-evacuation considerations. Common-parts EL must be coordinated with each tenancy's EL — the boundary between landlord-EL and tenant-EL needs documentation. RRO Article 22 cooperation duty applies."
            whyItMatters="Mixed-use buildings are increasingly common in UK property. The location triggers do not stop at the tenancy boundary. The landlord and each tenant each have their own RRO duty for their part of the premises; the building only delivers safety as a whole if the parts coordinate. As an EL contractor working in mixed-use, you may be engaged separately by landlord and tenants and your scope must clearly identify the boundary. Make sure any space your client controls is covered; make sure the boundary with the landlord's scope is documented; make sure the photometric verification cycle for each tenancy aligns with the building-wide 5-year survey cycle."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The methodical walk-through</ContentEyebrow>

          <ConceptBlock
            title="A repeatable survey method"
            plainEnglish="Walking a building to identify EL locations is a methodical, repeatable activity. The output is a schedule — every space mapped to one or more EL functions — that becomes the design brief. The method below is the one professional designers use; it is reproducible across new build, retrofit, and existing-system audit."
          >
            <p>The four-step survey method:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Step 1 — The Approved Document B baseline walk.</strong> Walk the
                building with the Approved Document B Vol 2 cl. 5 list as a checklist. Tick
                each space on your survey form: corridor &gt; 30 m, escape stair, basement,
                place of assembly, sleeping accommodation, escape from high-risk area, lift,
                toilet block, plant room. Output: list of premises locations triggering EL by
                the Approved Document.
              </li>
              <li>
                <strong>Step 2 — The BS 5266-1:2025 trigger overlay.</strong> Apply the
                technical thresholds to every room: floor area &gt; 60 m² or occupancy &gt; 10
                (anti-panic); &gt; 8 m² toilet or multi-turn (anti-panic / escape); high-risk
                task identifiable; escape route flow defined. Refine the list. Mark each space
                as one or more of escape / anti-panic / high-risk / standby / local-area.
              </li>
              <li>
                <strong>Step 3 — The RRO Article 9 risk-assessment overlay.</strong> What does
                the building actually DO? What activities take place that the standard
                checklists may not capture? Standby lighting requirements for life-critical
                equipment? Local-area lighting for residents who remain in place? High-risk
                task at unusual workstations? Special-premises sector requirements? Add
                locations and categories that the previous steps missed.
              </li>
              <li>
                <strong>Step 4 — The schedule.</strong> Produce a printed schedule listing every
                space, its area, its trigger, its EL category(ies), its target illuminance, the
                points of emphasis it contains, and the special considerations. The schedule is
                the design brief; the design (luminaire layout, supply, controls) is built FROM
                the schedule, not the other way round. The schedule also becomes the
                photometric-verification reference at year 5 — every space and every point of
                emphasis must be re-verified.
              </li>
            </ol>
            <p>
              This methodical approach is also defensible. If a question is later asked about
              why a particular space was (or was not) provided with EL, the schedule shows the
              reasoning. "Triggered by Approved Document B Vol 2 cl. 5 line 3 — corridor &gt;
              30 m without natural daylight" is a documented justification; "we put a luminaire
              there because we had one spare" is not.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Approved Document B Vol 2 cl. 5 is the starter checklist — corridors > 30 m, escape stairs, windowless / basement areas, places of assembly, sleeping accommodation, escape routes serving high-risk areas, lifts, toilets above the threshold, plant rooms.',
              'BS 5266-1:2025 trigger thresholds: > 60 m² OR > 10 occupants → anti-panic; > 8 m² OR multi-turn escape → toilets; high-risk task → 15 lx + ≤ 0.5 s switch-on + 2025 segmentation rule.',
              'Borrowed light is EXCLUDED in the 2025 edition. Every space requiring EL must be illuminated DIRECTLY. Lobbies, stair half-landings, plant areas behind glazed walls — all need their own luminaire.',
              'Points of emphasis: outside final exits, every change of direction, corridor intersections, every staircase, near fire alarm call points and firefighting equipment, near first-aid posts, every change of floor level, near safety equipment.',
              'Lift cars need their own internal emergency lighting (Approved Document B + BS EN 81-20). Borrowed shaft light does not satisfy.',
              'High-risk task areas need ≥ 2 separate circuits with ≤ 20 luminaires per fault under the 2025 edition — segmentation prevents a single circuit fault disabling EL where it is most critical.',
              'Sector overlays apply: HTM 06-01 (healthcare), BB 100 (education), Purple Guide (events), CQC (care homes). The standard delivers the engineering; sector guidance delivers the context-specific decisions.',
              'Methodical survey: Approved Document baseline → BS 5266-1 thresholds → RRO Art 9 risk assessment → schedule. The schedule is the design brief and the year-5 photometric verification reference.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'Do single private dwellings need emergency lighting?',
                answer:
                  'No. The RRO 2005 does not apply to a private dwelling occupied as a single-family home. Domestic smoke / heat alarm provisions under Building Regulations Approved Document B Volume 1 apply, but not BS 5266 emergency lighting. HMOs and the communal parts of blocks of flats ARE in scope and need EL on shared escape routes, including the entrance hall, communal corridors and stairs.',
              },
              {
                question:
                  'Does my client need emergency lighting in a small office above a shop where there are only 3 employees?',
                answer:
                  'It depends on the building. Approved Document B Vol 2 cl. 5 triggers — internal corridor > 30 m, basement, no natural daylight, escape stair through windowless area — do not depend on employee count. The Workplace Regs 1992 Reg 8 applies regardless of headcount. If the office has any of those triggers, EL is required. If not, the risk assessment under RRO Art 9 may still identify a need (single small office at street level with a window may not need it; basement office almost certainly does).',
              },
              {
                question:
                  'I am designing a new building with a corridor that is 28 m long. The Approved Document B threshold is 30 m. Do I omit the EL?',
                answer:
                  'Read the threshold as the trigger point — above it, EL is presumed needed. Below it, EL may still be needed if the corridor has other triggers (no natural daylight, multiple changes of direction, leads to a windowless area, serves a high-risk space). 28 m is close enough to 30 m that the design margin should be small. If the corridor has any of the other triggers, fit EL. If it is a 28 m corridor with full daylight glazing along one side and a straight run to a visible exit, you can defend not fitting it — but document the decision.',
              },
              {
                question:
                  'What about open-plan offices that are larger than 60 m² — anti-panic throughout?',
                answer:
                  'Yes. Anti-panic at 0.5 lx across the floor, 40:1 max:min ratio. The escape route through the open-plan area to the egress is also escape-route lighting (1 lx across the full width of the route at floor level, with the BS EN 1838:2024 edge exclusions). The two functions overlap — the same luminaires often deliver both, with the layout designed to meet the anti-panic minimum across the whole area AND the 1 lx escape-route minimum on the path.',
              },
              {
                question:
                  'Does the 2025 borrowed-light exclusion mean I have to retrofit every existing premises immediately?',
                answer:
                  'No, but the 5-year photometric verification cycle is the audit point at which the borrowed-light reliance surfaces. A 2018-design system relying on borrowed light will fail the 2026 photometric survey because the borrowed source does not deliver design illuminance directly to the affected space. Remediation happens then. Premises designed and installed under BS 5266-1:2016 are not retrospectively "non-compliant" — they were compliant when installed — but the 2025 standard is the current performance reference and remediation follows the survey.',
              },
              {
                question:
                  'My client has refused to allow EL in the toilets because "people don\'t spend long there". What is the right answer?',
                answer:
                  'The trigger is not how long people spend there but the floor area or escape complexity. Toilet > 8 m² OR escape route involves multiple turns → EL required. Even short occupancy can place an occupant in a windowless room when the lights fail; without EL they cannot reach the door safely. If the toilet meets a trigger, document the conversation and proceed with EL. If the toilet is genuinely below all triggers (small, single straight access from the corridor), document that too — your reasoning is your defence.',
              },
              {
                question:
                  'Are car parks (multi-storey or basement) within scope?',
                answer:
                  'Yes if they are enclosed and used as part of the building escape route. Multi-storey car parks have specific provisions in Approved Document B and BS 5266-1 — escape routes within the parking area, ramps, lift lobbies, and exits all need EL. Open-air at-grade parking lots typically do not need EL because the escape is outdoors with sky / overhead lighting. Basement car parks are within scope by virtue of being underground / windowless.',
              },
              {
                question:
                  'How does the location-trigger work for assembly events held in venues that are normally something else (e.g. a school sports hall used for a public concert)?',
                answer:
                  'The temporary use changes the occupancy and may push the venue across a trigger threshold. A sports hall usually used for school PE (modest occupancy, single egress) becomes a public concert venue (high occupancy, anti-panic concerns, places-of-assembly Approved Document overlay). The risk assessment for the event — RRO Art 9, plus the Purple Guide for organised events — determines whether the existing EL is sufficient or whether temporary additional provision is needed. Event organisers are typically responsible persons for the event; the venue owner is responsible person for the building.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz
            title="Locations where emergency lighting is required — Emergency Lighting Module 1.2"
            questions={quizQuestions}
          />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 1
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/emergency-lighting-module-1-section-3')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.3 Types of emergency lighting systems
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

export default EmergencyLightingModule1Section2;
