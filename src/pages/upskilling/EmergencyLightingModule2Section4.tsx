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
    id: 'elm2-s4-centreline',
    question:
      'What is the BS EN 1838:2024 minimum illuminance on an escape route up to 2 m wide?',
    options: [
      '0.5 lx across the open floor — the same as open-area anti-panic lighting.',
      '1 lx, horizontal at floor level across the full width, outer ¼ each side excluded.',
      '5 lx vertical at the equipment — the same as fire-fighting equipment lighting.',
      '15 lx at the working plane — the same as high-risk task area lighting.',
    ],
    correctIndex: 1,
    explanation:
      'BS EN 1838:2024 §4 — 1 lx across the full width of the route at floor level, with the outer ¼ width each side excluded for routes 2 m or narrower (and the outer 0.5 m each side excluded for routes wider than 2 m). The 2013 centre-line + central-band wording is superseded.',
  },
  {
    id: 'elm2-s4-uniformity',
    question:
      'What is the maximum permissible uniformity ratio (Emax/Emin) along an escape route under BS EN 1838:2024?',
    options: [
      '10:1 — the same uniformity ratio required across a sign face.',
      '40:1 — brightest to darkest along the route, within the non-excluded width.',
      '100:1 — the brightest point may be up to 100 times the darkest point.',
      'Unlimited — only the minimum illuminance matters, not the uniformity.',
    ],
    correctIndex: 1,
    explanation:
      'BS EN 1838:2024 §4.2 — uniformity along the route within the non-excluded width shall not exceed 40:1 (Emax/Emin). The rule defends against eye adaptation to bright spots that hide darker zones. Achieving 40:1 typically requires luminaire spacing no greater than 1.5 to 2 times mounting height; designs with wider spacing tend to fall outside the cap.',
  },
  {
    id: 'elm2-s4-response',
    question:
      'What is the BS EN 1838:2024 escape route lighting response time profile?',
    options: [
      'Instant — full rated output within 0.1 s of the mains failing.',
      '50 % of rated illuminance within 5 s, full rated illuminance within 60 s.',
      '0.5 s to full output — the same response as for high-risk task lighting.',
      '15 s to reach 50 % of rated, then 120 s to reach full rated output.',
    ],
    correctIndex: 1,
    explanation:
      'BS EN 1838:2024 §4.3 — escape route lighting must reach 50 % of rated illuminance within 5 s and full rated illuminance within 60 s. Where the area is also identified as a high-risk task area, the response time tightens to 0.5 s to full (BS EN 1838:2024 §6). Areas with very high task illuminance may also have a "50 s to full" allowance under the 2024 edition — but the 5 s / 60 s split is the headline rule.',
  },
  {
    id: 'elm2-s4-duration',
    question:
      'A new four-storey office with sleeping accommodation on the top floor is being designed. Which BS 5266-1:2025 minimum duration applies to the escape lighting?',
    options: [
      '30 minutes — applying the small-premises rapid-evacuation rule.',
      '3 hours — sleeping accommodation and multi-storey both attract a 3 h minimum.',
      '1 hour — covering the initial evacuation of the building only.',
      '8 hours — applying a notional back-up generator standby rule.',
    ],
    correctIndex: 1,
    explanation:
      'BS 5266-1:2025 §6.4 — escape lighting duration shall be at least 3 h for premises with sleeping accommodation, multi-storey premises, and large premises. The 1 h minimum applies only to small premises evacuated rapidly with no sleeping risk. Most non-domestic UK premises default to 3 h for design simplicity; under-specifying duration is one of the most common BS 5266 failures at audit.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What is the BS EN 1838:2024 minimum illuminance on a 1.8 m wide corridor escape route, measured horizontally at floor level?',
    options: [
      '0.5 lx across the open floor — the open-area anti-panic figure.',
      '5 lx vertical at the equipment — the fire-fighting equipment figure.',
      '15 lx at the working plane — the high-risk task area figure.',
      '1 lx across the full width, with the outer ¼ width each side excluded.',
    ],
    correctAnswer: 3,
    explanation:
      'BS EN 1838:2024 §4 — 1 lx across the full width at floor level, with the outer ¼ width each side excluded for routes ≤ 2 m (routes wider than 2 m use the outer 0.5 m exclusion). On a 1.8 m corridor that leaves a central 0.9 m to achieve 1 lx throughout, read horizontally with a calibrated lux meter. At decision points (turns, junctions, stairs, exits) the figure is supplemented by a luminaire within 2 m. The 2013 centre-line + central-band wording is superseded.',
  },
  {
    id: 2,
    question:
      'What is the maximum uniformity ratio (Emax/Emin) along an escape route under BS EN 1838:2024?',
    options: [
      '40:1 — brightest to darkest point along the route, within the non-excluded width.',
      '10:1 — brightest to darkest, tighter than this standard actually requires.',
      '100:1 — the brightest point may be up to 100 times the darkest point.',
      'Unlimited — only the minimum illuminance matters, not the uniformity.',
    ],
    correctAnswer: 0,
    explanation:
      'BS EN 1838:2024 §4.2 — uniformity along the route within the non-excluded width ≤ 40:1. The cap is the tightest constraint on luminaire spacing: meet 40:1 and spacing is correct; fail it and the route has dark patches between luminaires that disappear once the eye adapts to bright spots. Wider spacing means bigger dark gaps mid-span and a higher ratio. Achieving 40:1 typically means spacing no greater than 1.5 to 2 times mounting height.',
  },
  {
    id: 3,
    question:
      'A corridor escape luminaire is mounted at 2.5 m. Using a representative spacing rule of 1.5 to 2 × mounting height, what is the typical maximum spacing along the corridor that will keep uniformity inside 40:1?',
    options: [
      '1.0 m — very dense, 0.4 × mounting height.',
      '8.0 m — fast and cheap, 3.2 × mounting height.',
      '3.75 to 5.0 m — roughly 1.5 to 2 × the mounting height.',
      '12.0 m — 4.8 × mounting height.',
    ],
    correctAnswer: 2,
    explanation:
      'A practical spacing rule for typical commercial LED escape luminaires is 1.5 to 2 × mounting height. At 2.5 m mounting that gives 3.75 to 5 m spacing along the route. Photometric calculation refines the exact figure for the specific luminaire chosen. Spacing wider than 2 × mounting height typically fails the 40:1 uniformity cap.',
  },
  {
    id: 4,
    question:
      'A corridor leads to a final exit door. What does BS 5266-1:2025 require regarding luminaire placement near the exit?',
    options: [
      'No specific luminaire placement rule applies in the vicinity of the final exit.',
      'Only an illuminated running-man exit sign is required above the door, nothing more.',
      'Only floor-level guidance lighting near the door threshold is required at the exit.',
      'A luminaire within 2 m of the final exit, plus the external threshold and any change of level.',
    ],
    correctAnswer: 3,
    explanation:
      'BS 5266-1:2025 §7.3 extends the escape route definition to cover the EXTERNAL final exit and the route to the assembly point. A luminaire is required within 2 m of each final exit, on both sides of the door. Changes of level (steps, kerbs) outside the door must also be illuminated. This is a notable expansion from the 2016 edition, which stopped at the inside of the door.',
  },
  {
    id: 5,
    question:
      'BS 5266-1:2025 introduced a new requirement around design responsibility and documentation. What is it?',
    options: [
      'A formal design and installation record, produced and signed by a competent designer.',
      'No new documentation requirement at all beyond the existing 2016 edition provisions.',
      'Only the manufacturer luminaire data sheets need to be retained at handover.',
      'Only the lux meter calibration certificate is required to be kept on record.',
    ],
    correctAnswer: 0,
    explanation:
      'BS 5266-1:2025 §5.2 and §13 — design and installation record + competent designer requirement. The record is a substantial document covering risk assessment outputs, photometric calculations, luminaire schedule, circuit diagram, commissioning results, and the designer\'s declaration of competence. It forms part of the building golden thread of fire safety information under the Building Safety Act 2022.',
  },
  {
    id: 6,
    question:
      'BS EN 1838:2024 specifies the response-time profile for escape route lighting. Which option matches the 2024 edition?',
    options: [
      'Instant 100 % rated output at the moment of switchover to battery.',
      '0.5 s to full rated output, the same response as for high-risk task lighting.',
      '50 % of rated within 5 s, and 100 % of rated within 60 s.',
      'Unspecified — the response-time rule is qualitative guidance only.',
    ],
    correctAnswer: 2,
    explanation:
      'BS EN 1838:2024 §4.3 — escape route response: 50 % rated illuminance within 5 s, full rated illuminance within 60 s. The 5 s figure is the safety-critical one (occupant adaptation and onset of movement). The 60 s figure allows ballast / driver settling. High-risk task lighting at a tighter 0.5 s response is a separate category, not a replacement for the escape route rule.',
  },
  {
    id: 7,
    question:
      'A multi-storey care home with sleeping accommodation on every floor is being designed. What is the minimum duration of escape lighting under BS 5266-1:2025?',
    options: [
      '30 minutes — applying the small-premises rapid-evacuation rule.',
      '1 hour — covering the initial evacuation of the building only.',
      '24 hours — continuous standby illumination for a full day.',
      '3 hours — sleeping accommodation and multi-storey each demand 3 h.',
    ],
    correctAnswer: 3,
    explanation:
      'A care home is the textbook 3 h case. Sleeping accommodation alone is decisive; the multi-storey nature reinforces it; the building size adds further weight. Designers who specify 1 h on an instinctive cost basis fail BS 5266 audit and create a serious liability under the Regulatory Reform (Fire Safety) Order 2005.',
  },
  {
    id: 8,
    question:
      'BS 5266-1:2025 expanded the escape route definition. Which of the following are now explicitly inside the escape route?',
    options: [
      'Internal routes plus the external final exit and the path to the assembly point.',
      'Only the internal corridors running up to each final exit door, stopping at the door.',
      'Only the internal escape stairs and their associated intermediate landings.',
      'Only the protected lobby immediately inside the final exit door of the building.',
    ],
    correctAnswer: 0,
    explanation:
      'BS 5266-1:2025 §7.3 — escape route includes external final exits and the route to the assembly point. Practical implication: external bulkheads / wall-mounted emergency luminaires at every final exit, with photometric verification that 1 lx is achieved at floor level on the external escape path up to the assembly point. Older installations may need retrofit at the next major upgrade cycle.',
  },
  {
    id: 9,
    question:
      'A retail unit has a 4 m wide internal escape corridor. How does the BS EN 1838:2024 rule apply?',
    options: [
      'A single centre-line strip at 1 lx, applying the superseded 2013 wording.',
      'Only the two outer edges of the corridor need to be illuminated to 1 lx.',
      '1 lx across the full width, with the outer 0.5 m each side excluded (central 3 m).',
      'Floor-level strip lighting only, running along the base of the corridor wall.',
    ],
    correctAnswer: 2,
    explanation:
      'BS EN 1838:2024 §4 — full width 1 lx at floor level with the outer 0.5 m each side excluded for routes wider than 2 m. The 2013 wording (1 lx centre-line + 0.5 lx central band, with wide-route decomposition into 2 m strips) is superseded. Designers can use side-mounted, central-row, or hybrid layouts so long as the non-excluded width achieves 1 lx everywhere.',
  },
  {
    id: 10,
    question:
      'What competent-person requirement does BS 5266-1:2025 introduce for emergency lighting design?',
    options: [
      'Anyone may design the emergency lighting, with no stated competence requirement.',
      'Only the installer, not the designer, needs documented competence at handover.',
      'No specific designer competence requirement is set by the 2025 edition at all.',
      'A competent designer must produce and sign the design and installation record.',
    ],
    correctAnswer: 3,
    explanation:
      'BS 5266-1:2025 §5.2 + §13 — competent designer + signed design and installation record. The record retains photometric data, luminaire schedule, circuit topology, risk assessment, commissioning results, and competence declaration. Forms part of the golden thread of fire safety information for Higher-Risk Buildings under the Building Safety Act 2022.',
  },
];

const EmergencyLightingModule2Section4 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Escape route lighting design | Emergency Lighting Module 2.4 | Elec-Mate',
    description:
      'BS EN 1838:2024 escape route lighting design: 1 lx full width at floor level (with edge exclusions), 40:1 uniformity, 5 s to 50 % / 60 s to full, 1 h or 3 h duration; BS 5266-1:2025 expansion to external final exits and the new design and installation record.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 2
          </button>

          <PageHero
            eyebrow="Module 2 · Section 4"
            title="Escape route lighting design"
            description="Translating the BS EN 1838:2024 floor-level requirements into a buildable design. 1 lx across the full route width at floor level (with edge exclusions: 0.5 m on routes > 2 m, ¼ width on routes ≤ 2 m), 40:1 uniformity, 5 s to 50 % / 60 s to full, 1 h or 3 h duration. BS 5266-1:2025 brings new requirements: designer competence, the design and installation record, and an expanded escape route that now includes external final exits and the path to the assembly point."
            tone="yellow"
          />

          <TLDR
            points={[
              'Floor-level minimum: 1 lx horizontally across the FULL WIDTH of the escape route, with edge exclusions (outer 0.5 m on routes > 2 m, outer ¼ width on routes ≤ 2 m). The 2013 centre-line + central-band wording is superseded.',
              'Uniformity: ratio of brightest to darkest point along the route within the non-excluded width shall not exceed 40:1 (BS EN 1838:2024 §4.2). The cap is the tightest constraint on luminaire spacing.',
              'Spacing rule of thumb: 1.5 to 2 × mounting height. At 2.5 m mounting, longitudinal spacing of about 4 m is typical. Manufacturer photometric data refines the exact figure.',
              'Response time: 50 % of rated illuminance within 5 s, full rated illuminance within 60 s of mains failure. Where the 2024 edition allows 50 s to full for high-task-illuminance areas, the 5 s / 60 s split still applies to the escape route itself.',
              'Duration: 1 h minimum for small, fully-evacuated premises with no sleeping accommodation; 3 h minimum for premises with sleeping accommodation, multi-storey premises, and large premises. Most non-domestic UK premises default to 3 h.',
              'Luminaire placement: within 2 m of each final exit, exit sign, change of direction, change of level, intersection of corridors, fire-fighting equipment, and first-aid post. The 2 m radius is mandatory at each of these "decision points".',
              'BS 5266-1:2025 expansion: escape route now includes the EXTERNAL face of final exits and the route from the final exit to the assembly point. External luminaires at every final exit are now mandatory, not optional.',
              'BS 5266-1:2025 records: a "design and installation record" signed by a competent designer is now mandatory. Risk-based documentation forms part of the golden thread under the Building Safety Act 2022.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State the BS EN 1838:2024 illuminance, uniformity, response-time and duration requirements for escape route lighting',
              'Apply the BS EN 1838:2024 full-width 1 lx rule with the correct edge exclusions (0.5 m on routes > 2 m, ¼ width on routes ≤ 2 m)',
              'Use the 1.5 to 2 × mounting height spacing heuristic and verify with manufacturer photometric data',
              'Identify the mandatory "decision-point" locations where a luminaire must lie within 2 m',
              'Distinguish 1 h and 3 h minimum durations under BS 5266-1:2025 by premises type',
              'Recognise the BS 5266-1:2025 expansion of the escape route to include external final exits and the assembly-point path',
              'Describe the competent designer requirement and the contents of the design and installation record',
              'Verify a small corridor scheme by sketch-and-photometric check before procurement',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The 1 lx full-width rule</ContentEyebrow>

          <ConceptBlock
            title="What 1 lx actually buys you on the floor"
            plainEnglish="1 lx is the floor-level horizontal illuminance below which the human eye loses the ability to see floor texture, step edges, kerb-stones, and small changes of level. Above 1 lx, an occupant can see where the floor goes — the edge of a step, the lip of a doorway, the texture of a slip-resistant strip. Below 1 lx, the eye treats the floor as a uniform dark surface and trip / fall risk rises sharply. The 1 lx figure is therefore not arbitrary; it is calibrated against the eye's lower limit for hazard recognition during a low-adaptation evacuation."
            onSite="Verify with a calibrated lux meter held horizontally at floor level across the route width (within the non-excluded boundary). Take readings at multiple points — luminaire centre, mid-span, decision points, exit thresholds, near the edge of the non-excluded width. Each must read at least 1 lx. The reading is horizontal — face the meter cell up at the ceiling, not at a luminaire."
          >
            <p>How the BS EN 1838:2024 full-width rule applies in practice:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Routes 2 m or narrower.</strong> 1 lx across the full width of the route at
                floor level, with the outer ¼ width on each side excluded. A 1.6 m corridor
                excludes 0.4 m each side; the central 0.8 m must achieve 1 lx throughout.
              </li>
              <li>
                <strong>Routes wider than 2 m.</strong> 1 lx across the full width of the route at
                floor level, with the outer 0.5 m on each side excluded. A 4 m foyer excludes
                0.5 m each side; the central 3 m must achieve 1 lx everywhere. The 2013 rule of
                decomposing wide routes into 2 m strips is superseded.
              </li>
              <li>
                <strong>Where the route bends.</strong> At corners and changes of direction, the
                full-width verification follows the curve. Verify illuminance across the
                non-excluded width along the curved path, not just at the geometric centre.
              </li>
              <li>
                <strong>Stairs.</strong> Each tread is a step change in floor level. 1 lx full
                width applies to each tread top surface within the non-excluded boundary. A
                luminaire is mandatory at the head and foot of each flight; intermediate landings
                count as decision points.
              </li>
              <li>
                <strong>Outside the final exit.</strong> Under BS 5266-1:2025 the route continues
                outside the door, along the path to the assembly point. The same full-width 1 lx
                rule applies to the external floor surface within the non-excluded boundary.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 1838:2024 · §4.1 (Escape route lighting illuminance)"
            clause={
              <>
                The horizontal illuminance at floor level on the escape route shall be not less
                than 1 lx across the full width of the route. For escape routes wider than 2 m, an
                outer border of 0.5 m on each side may be excluded. For escape routes of 2 m width
                or less, an outer border of one quarter of the route width on each side may be
                excluded.
              </>
            }
            meaning="1 lx across the FULL width of the escape route at floor level is the irreducible minimum, with the permitted edge exclusions. The 2024 wording supersedes the 2013 centre-line + central-band approach. Edges within the non-excluded width must achieve 1 lx, not 0.5 lx."
          />

          <SectionRule />

          <ContentEyebrow>The 40:1 uniformity cap</ContentEyebrow>

          <ConceptBlock
            title="Why uniformity matters even more than the average"
            plainEnglish="Average illuminance is a misleading number for emergency lighting. A route can have an average of 5 lx and still fail BS EN 1838 if the variation along the route is too great. The reason is eye adaptation. Beneath a luminaire the floor might be at 50 lx; mid-span between two luminaires it might be at 0.3 lx. The eye, having adapted to the 50 lx hot-spot, sees the 0.3 lx zone as effectively black. The route is not safely usable even though the average looks fine. The 40:1 uniformity cap addresses this by limiting the ratio of bright to dark along the route within the non-excluded width."
          >
            <p>Practical implications of the 40:1 cap:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Spacing-to-mounting-height ratio.</strong> The cap effectively limits how
                widely you can space luminaires for any given mounting height. A working rule is
                spacing ≤ 2 × mounting height; spacing wider than this typically fails 40:1.
              </li>
              <li>
                <strong>Photometric verification is mandatory.</strong> The 40:1 number cannot be
                guessed from a sketch — it must be calculated from the photometric data of the
                actual luminaire chosen at the actual mounting height and spacing. Most lighting
                design software (Dialux, Relux, manufacturer tools) reports uniformity as part of
                the calculation output.
              </li>
              <li>
                <strong>Luminaire choice changes the cap headroom.</strong> A wide-distribution
                luminaire (high beta angle, low intensity) achieves better uniformity at wider
                spacing than a narrow-distribution luminaire. For escape routes, a "batwing"
                photometric distribution is ideal — it spreads light along the route axis and
                evens out the dark zones.
              </li>
              <li>
                <strong>The full non-excluded width is in scope.</strong> The 40:1 cap is checked
                across the full width of the route (less the permitted edge border), not just at
                the geometric centre. Designers must verify wall-side illuminance within the
                non-excluded width. A reading of 5 lx near the centre with 0.1 lx near the edge
                of the non-excluded width breaches the cap (50:1) even if the centre alone passes.
              </li>
              <li>
                <strong>Diversity of luminaires.</strong> Mixing luminaires with very different
                outputs along the same route undermines uniformity. Use the same product (or close
                family) along a single escape route; the photometric distributions then add evenly.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 1838:2024 · §4.2 (Uniformity ratio for escape route lighting)"
            clause={
              <>
                Along the length of the escape route within the non-excluded width, the ratio of
                the maximum illuminance to the minimum illuminance shall not exceed 40:1.
              </>
            }
            meaning="Single ratio cap. Bright spot divided by darkest point along the route (within the non-excluded width) must be no more than forty. Failing the cap usually means luminaire spacing is too wide for the chosen product / mounting height. Tighter spacing, wider photometric distribution, or higher mounting all fix it."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          {/* Diagram: corridor escape route with 1 lx full-width minimum, spacing, mounting height */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Corridor escape route — 1 lx full width (edge excl.), 40:1 uniformity, spacing 1.5 to 2 × mounting height
            </h4>
            <svg
              viewBox="0 0 820 420"
              className="w-full h-auto"
              role="img"
              aria-label="Corridor plan view showing four escape route luminaires at 4 m spacing, mounting height 2.5 m, illuminance contour showing 1 lx minimum across the full width at floor level (with permitted edge exclusion), with mandatory luminaire within 2 m of the final exit door."
            >
              <text x="410" y="22" textAnchor="middle" fill="#FBBF24" fontSize="13" fontWeight="bold">
                ESCAPE ROUTE — 1 lx full width (floor level), 40:1 uniformity, 5 s to 50 %
              </text>
              <text x="410" y="38" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="10">
                BS EN 1838:2024 §4 · BS 5266-1:2025 §7.3
              </text>

              {/* Corridor walls */}
              <rect x="60" y="120" width="700" height="120" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.4" />

              {/* Final exit door at right */}
              <rect x="740" y="120" width="20" height="120" fill="rgba(34,211,238,0.15)" stroke="#22D3EE" strokeWidth="1.4" />
              <text x="750" y="115" textAnchor="middle" fill="#22D3EE" fontSize="9" fontWeight="bold">
                FINAL
              </text>
              <text x="750" y="252" textAnchor="middle" fill="#22D3EE" fontSize="9" fontWeight="bold">
                EXIT
              </text>

              {/* Centreline */}
              <line x1="60" y1="180" x2="740" y2="180" stroke="rgba(251,191,36,0.5)" strokeWidth="1.2" strokeDasharray="3,3" />
              <text x="100" y="174" fill="rgba(251,191,36,0.85)" fontSize="9">
                route axis (1 lx min full width, horizontal at floor)
              </text>

              {/* Luminaires along centreline at 4 m spacing (notional) */}
              {[155, 305, 455, 605, 730].map((cx, i) => (
                <g key={`lum-${i}`}>
                  <circle cx={cx} cy="100" r="9" fill="rgba(251,191,36,0.95)" />
                  <circle cx={cx} cy="100" r="20" fill="rgba(251,191,36,0.18)" />
                  {/* Cone of light */}
                  <path
                    d={`M ${cx - 30} 180 L ${cx} 110 L ${cx + 30} 180 Z`}
                    fill="rgba(251,191,36,0.08)"
                    stroke="rgba(251,191,36,0.35)"
                    strokeWidth="1"
                    strokeDasharray="2,2"
                  />
                  {/* Floor reading */}
                  <text x={cx} y="200" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="9">
                    ≈ 4 lx
                  </text>
                </g>
              ))}

              {/* Mid-span dark patches */}
              {[230, 380, 530, 670].map((cx, i) => (
                <g key={`mid-${i}`}>
                  <text x={cx} y="200" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                    ≈ 1.2 lx
                  </text>
                </g>
              ))}

              {/* Mounting height annotation */}
              <line x1="40" y1="100" x2="40" y2="180" stroke="#22D3EE" strokeWidth="1.2" />
              <line x1="35" y1="100" x2="45" y2="100" stroke="#22D3EE" strokeWidth="1.2" />
              <line x1="35" y1="180" x2="45" y2="180" stroke="#22D3EE" strokeWidth="1.2" />
              <text x="20" y="144" fill="#22D3EE" fontSize="9" fontWeight="bold">
                h = 2.5 m
              </text>

              {/* Spacing annotation */}
              <line x1="155" y1="262" x2="305" y2="262" stroke="#A855F7" strokeWidth="1.2" />
              <line x1="155" y1="258" x2="155" y2="266" stroke="#A855F7" strokeWidth="1.2" />
              <line x1="305" y1="258" x2="305" y2="266" stroke="#A855F7" strokeWidth="1.2" />
              <text x="230" y="278" textAnchor="middle" fill="#A855F7" fontSize="9" fontWeight="bold">
                spacing ≈ 4 m (1.6 × h)
              </text>

              {/* 2 m of exit annotation */}
              <line x1="730" y1="262" x2="760" y2="262" stroke="#EF4444" strokeWidth="1.2" />
              <text x="745" y="278" textAnchor="middle" fill="#EF4444" fontSize="9" fontWeight="bold">
                ≤ 2 m of exit
              </text>

              {/* Annotation strip */}
              <rect x="60" y="310" width="700" height="100" rx="10" fill="rgba(34,211,238,0.06)" stroke="rgba(34,211,238,0.4)" strokeWidth="1.4" />
              <text x="80" y="334" fill="#22D3EE" fontSize="11" fontWeight="bold">
                Full width 1 lx min (with edge exclusions), uniformity Emax/Emin ≤ 40:1.
              </text>
              <text x="80" y="352" fill="rgba(255,255,255,0.7)" fontSize="10">
                Spacing 1.5 to 2 × mounting height keeps uniformity inside cap; verify with photometric data.
              </text>
              <text x="80" y="372" fill="rgba(255,255,255,0.7)" fontSize="10">
                Luminaire mandatory within 2 m of: final exit, exit sign, change of direction, change of level,
              </text>
              <text x="80" y="388" fill="rgba(255,255,255,0.7)" fontSize="10">
                intersection, stairs, fire-fighting equipment, first-aid post. Decision points = no exceptions.
              </text>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>Decision points — within 2 m</ContentEyebrow>

          <ConceptBlock
            title="The mandatory luminaire-within-2-m rule"
            plainEnglish="At certain points along an escape route, a luminaire must lie within a 2 m horizontal radius — regardless of the spacing rules elsewhere. These decision points are places where occupants must make a navigation choice or face a hazard. Missing a luminaire at a decision point is one of the most common BS 5266 failures at audit, even where the 1 lx full-width rule is otherwise met. The decision-point rule is independent of the photometric rule; both apply simultaneously."
          >
            <p>Mandatory decision-point locations (BS EN 1838:2024 §4.5):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>At each final exit door.</strong> Luminaire within 2 m, internal side AND
                external side under BS 5266-1:2025. The exit must be unmistakably visible from the
                approach.
              </li>
              <li>
                <strong>At each exit sign.</strong> Luminaire within 2 m of every emergency exit
                sign, so the sign itself is illuminated externally if non-internally-illuminated.
                Internally illuminated signs do not need an external luminaire but still benefit
                from one for sign legibility under low-adaptation conditions.
              </li>
              <li>
                <strong>At each change of direction.</strong> Corner of a corridor, bend, junction
                — luminaire within 2 m of the geometric corner. Occupants must see clearly which
                way to go.
              </li>
              <li>
                <strong>At each intersection of corridors.</strong> Crossroads, T-junctions,
                Y-junctions. Luminaire within 2 m of the centre of the intersection.
              </li>
              <li>
                <strong>At each change of level.</strong> Top and bottom of every flight of stairs;
                each landing; ramps; thresholds with a step. Tripping hazards must be illuminated.
              </li>
              <li>
                <strong>At each fire-fighting equipment location.</strong> Fire extinguishers, fire
                alarm call points, hose reels, dry risers, sprinkler valves. Equipment must be
                findable and usable in the dark.
              </li>
              <li>
                <strong>At each first-aid post.</strong> First-aid kit, defibrillator (AED),
                eyewash station. Same logic — findable and usable.
              </li>
              <li>
                <strong>Outside each final exit (NEW under BS 5266-1:2025).</strong> The route from
                the door to the assembly point now has decision-point luminaires at every change of
                direction, change of level, and at the assembly point itself.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 1838:2024 · §4.5 (Luminaire placement at decision points)"
            clause={
              <>
                Emergency luminaires shall be sited within 2 m horizontally of every: (a) exit
                door; (b) exit sign; (c) staircase, change of level, or other tripping hazard; (d)
                change of direction or intersection of corridors; (e) place where fire-fighting
                equipment or fire alarm call points are sited; (f) first-aid post. Compliance with
                this clause is in addition to the full-width illuminance and uniformity
                requirements of §4.1 and §4.2.
              </>
            }
            meaning="The decision-point rule operates on top of the full-width photometric rule, not instead of it. A scheme that meets 1 lx full width but misses a luminaire near a fire extinguisher fails — and so does a scheme with luminaires at every decision point but a 1 lx gap mid-corridor. Both rules apply concurrently."
          />

          <CommonMistake
            title="No luminaire within 2 m of an exit sign"
            whatHappens="A new corridor scheme has perfect full-width illuminance — 1 lx everywhere within the non-excluded width, 12:1 uniformity, well within the cap. At the corridor turn, the exit sign is mounted on the wall above the door but the nearest emergency luminaire is 3.2 m away. The sign is non-internally-illuminated. At commissioning the auditor notes the breach: BS EN 1838 §4.5 requires a luminaire within 2 m of the sign. The fix is one extra luminaire — but the audit failure is recorded against the design and the snag is expensive to retrofit (penetrating finished ceiling tiles, re-routing cables)."
            doInstead="At design stage, identify every decision point on the floor plan and place a luminaire within 2 m of each before doing the photometric calculation. Decision points dictate luminaire LOCATIONS; the full-width 1 lx rule then dictates whether more luminaires are needed in between. Order of operations matters — place decision-point luminaires first."
          />

          <SectionRule />

          <ContentEyebrow>Response time and duration</ContentEyebrow>

          <ConceptBlock
            title="5 s to 50 %, 60 s to full — and why"
            plainEnglish="When mains fails, the emergency lighting does not have to deliver its rated illuminance instantly. The standard recognises that batteries / lamp warm-up takes time, and that the human eye also takes time to adapt to the dimmer level. The 50 % within 5 s figure is the safety-critical one — by 5 s after the failure, the eye has begun to adapt and movement toward exits can begin. The full output within 60 s figure allows ballast and driver settling. Together they form a calibrated profile: enough illumination quickly for safe movement; full illumination soon enough for the bulk of the evacuation."
          >
            <p>How the response profile works:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>50 % within 5 s.</strong> The eye is mid-adaptation. 50 % of rated
                illuminance allows occupant movement to begin. Walking speed is initially cautious;
                full illumination is not required for the first metre of movement.
              </li>
              <li>
                <strong>100 % within 60 s.</strong> Battery / driver / lamp settling complete.
                Steady-state emergency illumination achieved. Occupants now navigating at near
                normal speed using emergency illumination only.
              </li>
              <li>
                <strong>BS EN 1838:2024 "50 s to full" allowance.</strong> The 2024 edition adds an
                allowance for areas with very high task illuminance — where the normal lighting was
                very bright, the eye takes longer to adapt downward, and the standard permits 50 s
                to full instead of 60 s in those cases. Practical effect: minor; the 60 s figure
                still applies to most escape routes.
              </li>
              <li>
                <strong>High-risk task lighting separate.</strong> Where an area is also a
                high-risk task area (BS EN 1838:2024 §6), the response time tightens to 0.5 s to
                full output. The escape route 5 s / 60 s rule still applies to the route portion;
                the 0.5 s rule applies to the working plane of the task. Two concurrent rules.
              </li>
              <li>
                <strong>Commissioning verification.</strong> Discharge a representative luminaire
                with a stopwatch and lux meter; record time to 50 % illuminance and time to full
                illuminance. Both must fall inside the published profile.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 1838:2024 · §4.3 (Response time for escape route lighting)"
            clause={
              <>
                For escape route lighting the illuminance shall reach 50 % of the required
                illuminance within 5 s and the full required illuminance within 60 s of the
                failure of the supply to the normal lighting. Where the normal task illuminance is
                very high, the time to reach the full required illuminance may be extended to 50 s
                in the assessment of design.
              </>
            }
            meaning="Two-stage profile. 5 s to 50 % is mandatory and audited; 60 s to 100 % is mandatory; the 50 s allowance applies to specific high-task-illuminance areas only and is a relaxation, not a tightening. Most escape routes work to the 60 s figure."
          />

          <ConceptBlock
            title="1 hour or 3 hours — getting duration right"
            plainEnglish="BS 5266-1:2025 specifies two minimum durations: 1 hour for small premises evacuated quickly with no sleeping risk, and 3 hours for premises with sleeping accommodation, multi-storey premises, and large premises. Most non-domestic UK premises fall into the 3-hour category by default — once any one of the three triggers fires, the duration is 3 hours. Designers under-specify duration at their peril; the audit failure is straightforward and the remediation (replacing every battery / extending every CPS bank) is expensive."
          >
            <p>How to choose between 1 h and 3 h:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Sleeping accommodation → 3 h.</strong> Hotels, guest-houses, hostels,
                halls of residence, care homes, hospital wards, sleeping pods in offices. The 3 h
                supports re-entry by fire and rescue services to retrieve occupants who could not
                self-evacuate.
              </li>
              <li>
                <strong>Multi-storey → 3 h.</strong> More than one storey above or below ground.
                Multi-storey evacuations take longer and stair use under emergency lighting must be
                supported throughout. The 3 h covers extended evacuation plus return-to-floor for
                fire-fighting.
              </li>
              <li>
                <strong>Large premises → 3 h.</strong> "Large" is risk-assessed; typical thresholds
                are floor area, occupancy, complexity of escape geometry. Shopping centres,
                large-format retail, factories, warehouses with mezzanines, leisure complexes —
                practically all attract 3 h.
              </li>
              <li>
                <strong>1 h reserved for small, fully-evacuated, no-sleeping premises.</strong>
                Small offices in single-storey premises, small workshops without sleeping
                accommodation, small retail units — and even these often default to 3 h for
                consistency.
              </li>
              <li>
                <strong>UK design default: 3 h.</strong> Practical UK commercial design is almost
                always 3 h. The decision tree practically only branches to 1 h for very small
                single-storey premises with confirmed no-sleeping risk and no anticipated re-entry.
              </li>
              <li>
                <strong>Duration interacts with battery sizing.</strong> A 3 h system needs roughly
                3 × the battery capacity of a 1 h system at the same load. Self-contained
                luminaires for 3 h are physically larger and more expensive; central battery banks
                for 3 h scale similarly. Get this right at scheme stage.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · §6.4 (Duration of emergency lighting)"
            clause={
              <>
                The minimum duration of escape lighting shall be: (a) 1 h for premises that are
                evacuated immediately and re-entry is not allowed until the supply is restored; (b)
                3 h for premises with sleeping accommodation, multi-storey premises, and large
                premises in which evacuation may be prolonged or where re-entry by emergency
                services is anticipated. Where there is doubt as to the appropriate duration, the
                3 h minimum shall apply.
              </>
            }
            meaning="3 h is the default in case of doubt. The 1 h option is narrow and conditional. Designers should treat 3 h as the planning baseline for non-domestic UK premises and only step down to 1 h with a documented argument."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Spacing, mounting height and photometric calculation</ContentEyebrow>

          <ConceptBlock
            title="From rule of thumb to verified design"
            plainEnglish={`Spacing of luminaires along an escape route is a function of their photometric output, the mounting height, the corridor width, and the surface reflectances. The simple rule of thumb — spacing ≤ 1.5 to 2 × mounting height — gets you close. Photometric calculation using manufacturer data verifies exactly. Manufacturers publish "spacing tables" and "isolux contours" that translate luminaire output into floor illuminance for typical mounting heights and spacings. Design software (Dialux, Relux, manufacturer-specific tools) automates the calculation.`}
          >
            <p>How a typical corridor scheme is sized:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Step 1 — choose mounting height.</strong> Typical 2.4 to 2.7 m for
                commercial corridors. Higher mounting (3 m+) gives wider light spread and tolerates
                wider spacing, but reduces lux per watt at floor level. Lower mounting (2.2 m) is
                used in low-ceiling refurbishments.
              </li>
              <li>
                <strong>Step 2 — apply spacing heuristic.</strong> Multiply mounting height by 1.5
                to 2.0. At 2.5 m mounting, target spacing is 3.75 to 5.0 m. Use 4 m as a starting
                figure and adjust against photometric verification.
              </li>
              <li>
                <strong>Step 3 — verify with photometric data.</strong> Use the luminaire's
                manufacturer spacing table or run the layout in design software. Confirm the
                full-width 1 lx minimum and the 40:1 uniformity cap are both met.
              </li>
              <li>
                <strong>Step 4 — place decision-point luminaires.</strong> Add luminaires within
                2 m of every decision point identified on the plan. These take precedence over
                spacing — a decision point may require a luminaire closer than the calculated
                spacing dictates.
              </li>
              <li>
                <strong>Step 5 — verify duration.</strong> Sum the load (W) of all emergency
                luminaires and multiply by duration (h) to get battery / CPS sizing. Confirm
                battery capacity (Ah at the system DC voltage) matches at the end of the rated
                duration to 50 % illuminance, not 100 %.
              </li>
              <li>
                <strong>Step 6 — circuit protection.</strong> BS 7671:2018+A2:2022 §560 applies to
                emergency lighting circuits. Final-circuit OCPDs must coordinate with the emergency
                supply (CPS or self-contained); discrimination is critical so a non-emergency
                circuit fault does not cascade into the emergency circuit.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · §7.6 (Photometric design and verification)"
            clause={
              <>
                The illuminance levels and uniformity ratios required by BS EN 1838:2024 shall be
                verified by photometric calculation at the design stage, using the photometric
                data of the actual luminaires proposed. Verification at commissioning shall
                include direct measurement of horizontal illuminance at floor level across the
                full width of each escape route (excluding the permitted edge border) at points
                selected to represent the worst-case inter-luminaire condition.
              </>
            }
            meaning="Two verifications: design-stage calculation using manufacturer photometric data, and commissioning-stage measurement using a calibrated lux meter. The commissioning measurement targets the WORST-CASE position — typically mid-span between luminaires, where uniformity is most likely to fail. A reading of 1 lx at the worst-case point confirms the design."
          />

          <Scenario
            title="A 35 m office corridor, 1.8 m wide"
            situation="A new commercial fit-out has a 35 m long internal corridor running between the entrance lobby and the office cores. Width is 1.8 m, ceiling height 2.7 m, surface reflectances ceiling 70 %, walls 50 %, floor 20 %. Three doors lead off the corridor (two office doors, one store), one fire alarm call point and one fire extinguisher are wall-mounted, and the corridor terminates at a final exit door at one end. Designer is choosing escape route lighting layout."
            whatToDo="(1) Decision points first: place a luminaire within 2 m of: the final exit (internal AND external sides under BS 5266-1:2025), the exit sign above the door, the fire alarm call point, the fire extinguisher, and any change of direction. That fixes about 5 to 6 luminaire positions. (2) Photometric calculation: target 1 lx across the full width of the corridor at floor level, with the outer ¼ width each side excluded (1.8 m route → 0.45 m excluded each side, central 0.9 m must achieve 1 lx), and 40:1 uniformity along the route within that non-excluded width. With 2.5 m mounting height (LED bulkheads slightly recessed from the 2.7 m ceiling), spacing target 4 m. The 35 m corridor needs 9 luminaires; total of about 10 to 11 once decision-point luminaires are merged. (3) Photometric verification: run the layout in Dialux using the chosen LED bulkhead's IES file; confirm 1 lx full width and 40:1 uniformity. (4) Duration: office building, multi-storey → 3 h minimum. Self-contained luminaires with 3 h batteries are typical for fit-out scale. (5) Records: produce design and installation record signed by competent designer per BS 5266-1:2025 §13."
            whyItMatters="The decision-point rule typically dominates the layout for routes under about 50 m. The full-width photometric calculation often produces fewer luminaires than the decision-point rule requires. Designers who calculate photometrically first and decision points second tend to over-specify; designers who place decision-point luminaires first tend to produce minimal-count compliant layouts."
          />

          <SectionRule />

          <ContentEyebrow>BS 5266-1:2025 changes — what is new</ContentEyebrow>

          <ConceptBlock
            title="Five practical changes from the 2016 edition"
            plainEnglish="BS 5266-1:2025 supersedes BS 5266-1:2016 and is effective from 31 October 2025. Five changes matter most for escape route design: the competent-designer requirement, the design and installation record, the expanded definition of escape route to cover external final exits and assembly-point paths, the strengthened risk-based documentation, and the new dual-circuit rule for high-risk task lighting (covered in detail in §3 of this module)."
          >
            <p>The five changes a designer must respond to:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>1. Competent designer (§5.2).</strong> The designer must be a competent
                person — defined as having the training, qualifications, and experience to
                undertake the work. Acceptable evidence includes IEng / CEng with relevant
                emergency lighting experience, ICEL qualifications, manufacturer-specific design
                certification, or documented experience under a chartered engineer.
              </li>
              <li>
                <strong>2. Design and installation record (§13).</strong> A formal record signed
                by the designer covering: photometric calculations, luminaire schedule, circuit
                topology, risk assessment outputs, commissioning results, and competence
                declaration. Forms part of the building golden thread under the Building Safety
                Act 2022.
              </li>
              <li>
                <strong>3. Expanded escape route (§7.3).</strong> The escape route now includes the
                external face of every final exit door and the route from the final exit to the
                assembly point — including any changes of level (steps, kerbs, ramps). External
                emergency luminaires at every final exit are now mandatory.
              </li>
              <li>
                <strong>4. Risk-based documentation (§5.5).</strong> The risk assessment must
                identify high-risk task areas, areas where anti-panic lighting is triggered, and
                any other areas where the standard's general rules do not adequately cover the
                specific hazards. The lighting design must respond to each item identified.
              </li>
              <li>
                <strong>5. Dual-circuit rule for high-risk task lighting (§7.5).</strong> At high-risk
                task areas (only — not escape route), at least 2 separate circuits with no more than
                20 luminaires per circuit. Covered in detail in Module 2 §3. Mentioned here for
                completeness — escape route circuits are not subject to this specific rule.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · §13 (Design and installation record)"
            clause={
              <>
                The designer of an emergency lighting installation shall produce, sign, and retain
                a design and installation record. The record shall include: (a) the basis of
                design including the risk assessment outputs; (b) the photometric calculations
                including illuminance and uniformity verification; (c) the luminaire schedule
                including type, location, and rating; (d) the circuit topology and protective
                device coordination; (e) the commissioning test results; (f) a declaration that
                the designer is a competent person within the meaning of §5.2.
              </>
            }
            meaning="The record is now a formal deliverable, not an optional extra. It must be produced by a competent designer, signed, and retained. The contents map onto the data the designer should already have generated — photometric calcs, schedules, single-line diagrams, commissioning sheets. The new requirement is to compile them into a single signed document and retain it as part of the building safety information."
          />

          <CommonMistake
            title="No external escape lighting at final exits"
            whatHappens="A small commercial fit-out is commissioned in November 2025 — three months after the BS 5266-1:2025 effective date. The internal escape route lighting is well-designed, photometrically verified, with all decision points covered. The two final exits, both leading directly to a car park, have no external emergency luminaires above or beside them. At handover the auditor cites BS 5266-1:2025 §7.3 — the escape route is now defined to include the external face of the final exit and the path to the assembly point. Two external IP65 LED bulkheads are fitted retrospectively at significant remediation cost; the design and installation record has to be re-issued."
            doInstead="From 31 October 2025 onwards, treat the external face of every final exit as part of the escape route. At each final exit specify an external IP65 emergency luminaire within 2 m of the door, plus additional luminaires at any change of level (steps, kerbs) and at the assembly point itself. Verify 1 lx across the full width of the external escape path (within the non-excluded boundary) from the door to the assembly point. Document in the design and installation record."
          />

          <CommonMistake
            title="Designer competence not documented"
            whatHappens="A facilities manager commissions a small refurbishment scheme using an in-house electrician who has installed plenty of emergency lighting but holds no specific emergency-lighting design qualification. The scheme is photometrically modelled in free Dialux software using assumed luminaire data. At handover the safety consultant requests the BS 5266-1:2025 design and installation record. The electrician produces commissioning sheets but no competence declaration. The audit notes the absence; the building cannot complete its fire safety information for the golden thread under the Building Safety Act 2022."
            doInstead="At project initiation, identify a competent designer with documented training, qualification, and experience in emergency lighting. ICEL is the standard UK industry qualification body; manufacturer design certifications also satisfy the test if relevant to the project. The competent designer signs the record at handover; the record is retained by the responsible person as part of the building's fire safety file."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>External escape and assembly point</ContentEyebrow>

          <ConceptBlock
            title="The escape route does not stop at the door"
            plainEnglish="The 2025 expansion of the escape route is the single most consequential change for many designers. Before 2025, the inside of the final exit door was the boundary; outside the door was the responsibility of building owners under general fire safety duties but not specifically under BS 5266. After 2025, the escape route definition extends through the door, across any external area, up to and including the assembly point. Every step of that path now needs the same illuminance, uniformity, and decision-point coverage as an internal corridor."
          >
            <p>What this means in practice:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>External luminaire at every final exit.</strong> IP65 minimum. Within 2 m
                of the door, on the external face. Mounted at 2.5 to 3 m typically (above
                door-frame line, on a bracket or wall-mount).
              </li>
              <li>
                <strong>Steps and kerbs immediately outside.</strong> Any change of level within a
                couple of metres of the door must be illuminated. A single step down with 1 lx on
                the tread, riser visible.
              </li>
              <li>
                <strong>Path to assembly point.</strong> 1 lx full width along the external path (with edge exclusions),
                same 40:1 uniformity. For longer paths this means a series of external bollards or
                wall-mounted bulkheads at the same 1.5 to 2 × mounting-height spacing.
              </li>
              <li>
                <strong>Assembly point itself.</strong> A luminaire to identify the point, plus
                sufficient illuminance for a roll-call to be conducted. The exact illuminance is
                not prescribed but 1 lx average is the de-facto target.
              </li>
              <li>
                <strong>Power supply.</strong> External luminaires must be supplied from the same
                emergency supply (CPS or self-contained battery) as the internal scheme. Cable
                routes may need fire-rated containment depending on the building's fire strategy.
              </li>
              <li>
                <strong>Existing buildings.</strong> Retrospective application is encouraged, not
                mandated. At the next major refurbishment or emergency lighting upgrade, external
                escape lighting should be brought into compliance.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · §7.3 (Extent of the escape route)"
            clause={
              <>
                The escape route shall be considered to extend from any point in the premises,
                through the internal escape geometry, through each final exit, and along the
                external path of travel to the designated place of safety or assembly point. The
                illuminance, uniformity and luminaire placement requirements of BS EN 1838:2024
                §4 shall apply to the entire extent of the escape route, including external
                portions.
              </>
            }
            meaning="Single continuous escape route from any internal point to the assembly point. Same rules apply throughout. External portion is no longer optional or governed only by general fire safety; it is governed by BS 5266 and BS EN 1838 directly."
          />

          <SectionRule />

          <ContentEyebrow>Verification at commissioning</ContentEyebrow>

          <ConceptBlock
            title="What gets measured, where, with what"
            plainEnglish="Commissioning verification is the bridge between design intent and delivered installation. Three measurements matter: illuminance, response time, and duration. The illuminance verification is taken with a calibrated lux meter at floor level across the route width within the BS EN 1838:2024 non-excluded boundary, at worst-case points (mid-span between luminaires, including readings near the edge of the non-excluded width). Response time is taken with a stopwatch and lux meter at a representative luminaire position. Duration is taken by discharge test, holding the luminaire on emergency battery for the rated duration and confirming illuminance remains above 50 % of rated value at the end."
          >
            <p>The commissioning test sequence:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Pre-test charge.</strong> Batteries fully charged for at least 24 h before
                discharge test. Fresh batteries for new installations; aged batteries for retest of
                existing installations.
              </li>
              <li>
                <strong>Functional test.</strong> Switch off normal supply at the local DB; confirm
                emergency lighting energises within 5 s and full output within 60 s.
              </li>
              <li>
                <strong>Illuminance measurement at worst-case points.</strong> Lux meter horizontal
                at floor level across the route width (within the non-excluded boundary) at mid-span between luminaires. Reading must be
                ≥ 1 lx. Take readings at multiple worst-case points along the route.
              </li>
              <li>
                <strong>Uniformity verification.</strong> Reading at brightest point (under
                luminaire) and darkest point (mid-span). Ratio Emax/Emin ≤ 40:1.
              </li>
              <li>
                <strong>Decision-point coverage.</strong> Visual check that every decision point
                has a luminaire within 2 m. Photo each decision point with the emergency lighting
                only as evidence.
              </li>
              <li>
                <strong>Discharge test (full duration).</strong> Hold the system on emergency
                battery for the rated duration (1 h or 3 h). At the end of the duration,
                illuminance must remain at least 50 % of rated value (most luminaires actually hold
                close to 100 % for most of the duration and drop in the last 10 %).
              </li>
              <li>
                <strong>Recharge verification.</strong> After discharge, system must recharge to
                full within 24 h. Confirm by visual inspection and battery management system
                readout.
              </li>
              <li>
                <strong>Records.</strong> Commissioning sheet records meter readings, locations,
                times, and pass/fail status. Forms an annex to the BS 5266-1:2025 design and
                installation record.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · §11 (Commissioning verification)"
            clause={
              <>
                On completion of installation, the system shall be verified by tests including:
                (a) illuminance measurement at floor level across the full width of each escape
                route (within the non-excluded boundary per BS EN 1838:2024) at worst-case
                positions, demonstrating ≥ 1 lx; (b) measurement of response time at
                representative luminaire positions, demonstrating ≤ 5 s to 50 % and ≤ 60 s to
                100 %; (c) discharge test for the full rated duration, demonstrating maintenance
                of at least 50 % of rated illuminance throughout; (d) verification of decision-point
                luminaire placement against the design plan.
              </>
            }
            meaning="Four verifications, four lines of evidence. Lux meter for illuminance and uniformity; stopwatch + lux meter for response; full-duration discharge for duration; design plan walk-through for decision points. All four are required; missing any one fails the BS 5266-1:2025 commissioning."
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
              'Full-width 1 lx at floor level (BS EN 1838:2024). Edge exclusions: outer 0.5 m on routes > 2 m, outer ¼ width on routes ≤ 2 m. The 2013 centre-line + central-band wording is superseded.',
              'Uniformity ≤ 40:1 along the route within the non-excluded width. Spacing 1.5 to 2 × mounting height keeps you inside the cap; verify with manufacturer photometric data.',
              'Decision points: luminaire within 2 m of every final exit, exit sign, change of direction, change of level, intersection, fire-fighting equipment, first-aid post. Place these FIRST.',
              'Response: 50 % within 5 s, 100 % within 60 s. Where a high-risk task overlays the route, 0.5 s response applies to the working plane (Module 2 §3) — escape route response unchanged.',
              'Duration: 3 h default for non-domestic UK premises. 1 h reserved for small, fully-evacuated, no-sleeping premises. In doubt → 3 h.',
              'BS 5266-1:2025 expansion: escape route now includes the EXTERNAL face of every final exit and the path to the assembly point. External IP65 luminaires at every final exit are now mandatory.',
              'BS 5266-1:2025 record: design and installation record signed by a competent designer is mandatory and forms part of the golden thread under the Building Safety Act 2022.',
              'Verification at commissioning: floor-level lux meter readings at worst-case mid-span points, response-time test, full-duration discharge, decision-point walk-through. All four required.',
              'Spacing rule of thumb is a starting point, never a finishing point. Always verify with photometric calculation using the actual luminaire chosen.',
              'Escape route, anti-panic, and high-risk task are three concurrent functional categories. Designers must consider each independently — a route may be all three at once.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'How is the route width established when the corridor is irregular in plan (curves, alcoves, recesses)?',
                answer:
                  'The route width is measured perpendicular to the walking direction at each point. For irregular routes (alcoves, recesses), the local width determines the applicable edge exclusion (¼ width for ≤ 2 m, 0.5 m for > 2 m) and the non-excluded band where 1 lx must be achieved. Photometric calculation follows the curve, not a straight-line short-cut. Most lighting design software handles curved routes automatically; manual sketch-and-verify is feasible for short routes.',
              },
              {
                question:
                  'Does the 1 lx figure apply to the floor surface or to a horizontal plane at floor level?',
                answer:
                  'BS EN 1838:2024 specifies horizontal illuminance at the floor — measured with a lux meter held horizontal, cell facing up, anywhere within the non-excluded width of the route at floor level. Carpet, tile, polished concrete — the surface finish does not change the requirement; the 1 lx is the incoming illuminance at floor level, not the reflected luminance of the floor. A dark carpet absorbs more light than a light tile, but the 1 lx illuminance number is the same regardless.',
              },
              {
                question:
                  'My corridor is 2.05 m wide. Which edge exclusion applies?',
                answer:
                  'The 0.5 m exclusion (routes wider than 2 m). The 2024 wording uses "wider than 2 m" for the 0.5 m edge exclusion and "2 m or less" for the ¼-width exclusion. At 2.05 m the 0.5 m exclusion applies — 0.5 m excluded each side, central 1.05 m must achieve 1 lx everywhere. In practice a 2.05 m route will probably meet the requirement with a single central row of luminaires; verify with photometric calculation.',
              },
              {
                question:
                  'How do I size the battery / CPS for a 3 h scheme with 30 self-contained LED luminaires at 5 W each?',
                answer:
                  'For self-contained luminaires the battery sizing is internal to each luminaire — you do not size a central battery. Each luminaire carries its own 3 h battery rated for the luminaire wattage. At 5 W per luminaire over 3 h, each luminaire battery delivers about 15 Wh. Manufacturers fit this internally; you specify "3 h rated" and the manufacturer guarantees the battery capacity. For central battery (CPS), total connected load × duration → battery capacity (Wh), then divide by system DC voltage to get Ah, with a margin for end-of-life capacity loss (typically 25 to 30 %).',
              },
              {
                question:
                  'Can a single luminaire cover both the escape route full-width minimum and a decision point within 2 m?',
                answer:
                  'Yes — and frequently does. A luminaire placed at a corner serves the corner (decision point within 2 m) and contributes to the full-width illuminance on both sides of the corner. Designers count luminaires once even if they serve multiple functions. The decision-point rule and the full-width photometric rule are constraints, not separate luminaire counts; a single luminaire that satisfies both reduces total count.',
              },
              {
                question:
                  'What surface reflectance assumptions are appropriate for photometric calculation in a typical commercial corridor?',
                answer:
                  'Typical defaults: ceiling 70 %, walls 50 %, floor 20 %. These are realistic for white-painted plasterboard ceiling, neutral painted walls, and mid-grey carpet or LVT floor. Dark walls (timber panelling, dark paint) drop wall reflectance to 30 % or lower, reducing inter-reflection contribution to floor illuminance — the photometric calculation tightens. Always confirm the actual reflectances at survey if practical; otherwise default to the typical figures and add a 10 % design margin.',
              },
              {
                question:
                  'Are there premises types where 1 lx is not enough?',
                answer:
                  'Yes — risk-assessment-driven. Premises with elderly or mobility-impaired occupants (care homes, hospital wards, sheltered housing) often warrant higher than 1 lx for safe evacuation. BS 5266-1:2025 specifically calls out this case in §6.1, allowing the responsible person and competent designer to specify higher levels where the risk assessment supports it. Typical figures used in care environments are 5 to 10 lx across the full width of the route. Document the rationale in the design and installation record.',
              },
              {
                question:
                  'How does the BS 5266-1:2025 external escape route requirement interact with security lighting?',
                answer:
                  'They are different systems with different power supplies. Security lighting is typically mains-only and may also be photocell-controlled (off during daylight). Emergency escape lighting must be on the emergency supply (CPS or self-contained) and energise on mains failure regardless of time of day. A single external luminaire can serve both functions if it is dual-supplied — fed from mains for security duty AND from the emergency supply for emergency duty. Many manufacturers offer this as a standard product. Otherwise, two separate luminaires, one for each duty.',
              },
              {
                question:
                  'My existing installation was commissioned in 2019 to BS 5266-1:2016. Do I need to retrofit to BS 5266-1:2025?',
                answer:
                  'Existing installations remain compliant under the standard in force at the time of commissioning, unless the responsible person\'s fire risk assessment identifies a deficiency that requires upgrade under the Regulatory Reform (Fire Safety) Order 2005 article 9. Major refurbishment or change of use triggers re-design under BS 5266-1:2025. Best practice is to upgrade external escape lighting at the next major maintenance cycle (typically when batteries are replaced en masse) — this minimises additional cost and brings the building into line with current best practice.',
              },
              {
                question:
                  'Where do I record the photometric calculations as part of the design and installation record?',
                answer:
                  'BS 5266-1:2025 §13 requires photometric calculations as part of the record. In practice: print or PDF the design software output (Dialux / Relux / manufacturer tool report) showing the full-width illuminance across the route (within the BS EN 1838:2024 non-excluded boundary), uniformity, decision-point coverage, and luminaire schedule. Sign the cover sheet declaring competence. Include the IES files referenced. The record is bundled with the commissioning sheets and risk assessment outputs into a single PDF retained by the responsible person as part of the building fire safety information.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Escape route lighting design — Module 2.4" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/emergency-lighting-module-2-section-3')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                2.3 High-risk task lighting
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/emergency-lighting-module-2-section-5')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.5 Emergency exit signs
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

export default EmergencyLightingModule2Section4;
