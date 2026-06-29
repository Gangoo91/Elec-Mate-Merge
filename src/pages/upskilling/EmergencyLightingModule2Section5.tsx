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
    id: 'elm2-s5-pictogram',
    question:
      'Which ISO 7010 pictogram is the correct emergency exit sign showing a running man through a door, with the door on the LEFT and the figure running RIGHT?',
    options: [
      'E001 — running man, door on the left, figure running right.',
      'E002 — running man, door on the right, figure running left.',
      'E003 — the first-aid pictogram.',
      'E007 — the assembly-point pictogram.',
    ],
    correctIndex: 0,
    explanation:
      'ISO 7010:2020 — E001 is the running man with door on left, figure running right. E002 is the mirror image (door on right, figure running left). Selection follows actual travel direction at the sign location. Both are valid emergency exit pictograms; using the wrong handedness is a navigation error not a compliance error, but in practice both are tested.',
  },
  {
    id: 'elm2-s5-viewing',
    question:
      'A non-internally-illuminated emergency exit sign has a pictogram height of 150 mm. What is the maximum viewing distance under BS EN 1838:2024 d = s × p?',
    options: [
      '15 m — using p = 100, the internally illuminated factor.',
      '30 m — using p = 200, the externally illuminated factor.',
      '7.5 m — using half the pictogram height as a factor.',
      '60 m — using p = 400 in error.',
    ],
    correctIndex: 1,
    explanation:
      'BS EN 1838:2024 §5.5 — d = s × p. p = 100 for internally illuminated signs, p = 200 for externally illuminated. A 150 mm pictogram externally illuminated reads at 30 m max. The same sign internally illuminated reads at only 15 m max — internal illumination is generally less effective per millimetre than external illumination because the sign face is the source rather than the reflector.',
  },
  {
    id: 'elm2-s5-luminance',
    question:
      'Under BS EN 1838:2024 what is the minimum luminance of any part of a self-luminous emergency exit sign safety-colour area?',
    options: [
      '0.5 cd/m² minimum on the safety-colour area.',
      '5 cd/m² minimum (500 cd/m² maximum, ratio across the face no more than 10:1).',
      '50 cd/m² fixed across the safety-colour area.',
      '5000 cd/m² minimum on the safety-colour area.',
    ],
    correctIndex: 1,
    explanation:
      'BS EN 1838:2024 §5.4 — sign face luminance: ≥ 5 cd/m² minimum, ≤ 500 cd/m² maximum, ratio of max to min on safety-colour area ≤ 10:1. The three-part rule defends against three failure modes: too dim (invisible), too bright (glare), and uneven (deceptive). A well-designed back-lit sign reads at about 50 to 200 cd/m² uniform — well inside the cap and comfortably above the floor.',
  },
  {
    id: 'elm2-s5-mounting',
    question:
      'What is the typical mounting height range for emergency exit signs in commercial premises?',
    options: [
      '0.5 to 1.0 m — low-level only.',
      '2.0 to 2.5 m, measured to the underside of the sign.',
      '4.0 to 5.0 m, regardless of ceiling height.',
      'No standard range — entirely the designer\'s choice.',
    ],
    correctIndex: 1,
    explanation:
      'BS 5266-1:2025 §7.7 + BS EN 1838:2024 §5 — typical mounting 2.0 to 2.5 m to the underside. Higher mounting (e.g. high-bay warehouse) requires correspondingly larger pictogram height per d = s × p. Low-level supplementary signage at 0.4 to 0.6 m is a separate provision (BS EN 1838 §5.7 way-finding lights) used in addition to the high-level signage, not instead of it.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A new office is fitted with externally-illuminated emergency exit signs with a pictogram height of 200 mm. What is the maximum viewing distance under BS EN 1838:2024?',
    options: [
      '20 m — using p = 100, the internally illuminated factor, in error.',
      '10 m — using a quarter of the sign height as the distance.',
      '40 m — using p = 200, the externally illuminated factor.',
      '100 m — using p = 500 in error.',
    ],
    correctAnswer: 2,
    explanation:
      'BS EN 1838:2024 §5.5 — d = s × p, p = 200 for externally illuminated. 200 mm × 200 = 40 m. A common 150 mm pictogram externally illuminated reads at 30 m; a 100 mm pictogram only at 20 m. Sign size ladders directly from required viewing distance.',
  },
  {
    id: 2,
    question:
      'Which value of p is used in d = s × p for an internally illuminated emergency exit sign under BS EN 1838:2024?',
    options: [
      '100 — half the externally illuminated factor.',
      '200 — the externally illuminated factor.',
      '50 — a quarter of the externally illuminated factor.',
      '500 — the luminance ceiling, misused as a distance factor.',
    ],
    correctAnswer: 0,
    explanation:
      'BS EN 1838:2024 §5.5 — p = 100 for internally illuminated, p = 200 for externally illuminated. The factor accounts for the contrast and effective edge sharpness of the pictogram under each illumination mode. A common error is to assume internally illuminated is "always better" because it is self-luminous; the contrast reduction at the safety colour boundary actually halves the effective viewing distance per pictogram size.',
  },
  {
    id: 3,
    question:
      'What is the minimum luminance of any part of the safety-colour area on an emergency exit sign under BS EN 1838:2024?',
    options: [
      '0.5 cd/m² — the minimum brightness anywhere on the safety-colour area.',
      '500 cd/m² — the minimum brightness anywhere on the safety-colour area.',
      '50 cd/m² — the minimum brightness anywhere on the safety-colour area.',
      '5 cd/m² — the minimum brightness anywhere on the safety-colour area.',
    ],
    correctAnswer: 3,
    explanation:
      'BS EN 1838:2024 §5.4 — sign-face luminance ≥ 5 cd/m². The floor figure is calibrated against typical ambient luminance during an evacuation: corridors at 1 to 5 lx have wall surfaces around 0.5 to 2 cd/m², so a sign at 5 cd/m² is at least 2 to 10 times brighter than the surrounding walls and unambiguously the brightest object in the visual field. Below 5 cd/m² the sign blends into the wall. The maximum is 500 cd/m² (above which glare impairs adaptation) and the brightness ratio across the face is capped at 10:1.',
  },
  {
    id: 4,
    question:
      'What is the minimum proportion of the sign area that must be the safety colour (Pantone 354c green) under BS EN 1838:2024 / ISO 7010?',
    options: [
      '20 % — at least a fifth of the sign area must be the safety colour.',
      '50 % — at least half the sign area must be the safety colour.',
      '10 % — at least a tenth of the sign area must be the safety colour.',
      '90 % — almost the whole sign area must be the safety colour.',
    ],
    correctAnswer: 1,
    explanation:
      'ISO 7010:2020 + BS EN 1838:2024 §5.3 — safety colour ≥ 50 % of sign area, so it is the dominant visual cue and the sign reads unambiguously as a safe-condition / escape sign rather than a generic information sign. Pantone 354c is the specified green for safe-condition signs (escape, first aid, assembly point); other greens are not interchangeable. The pictogram is rendered in white over the green background. Reds, yellows and blues are reserved for prohibition, warning and mandatory signs respectively.',
  },
  {
    id: 5,
    question:
      'Under BS EN 1838:2024 §5.4, what is the maximum permissible ratio of brightest to darkest area on the safety-colour portion of an emergency exit sign face?',
    options: [
      '40:1 — matching the uniformity ratio used along an escape route.',
      '100:1 — the brightest area may be up to a hundred times the darkest.',
      '2:1 — a far tighter cap than the standard requires.',
      '10:1 — the brightest area no more than ten times the darkest.',
    ],
    correctAnswer: 3,
    explanation:
      'BS EN 1838:2024 §5.4 — Lmax/Lmin on safety colour ≤ 10:1, part of the three-part luminance rule (≥ 5 cd/m² floor, ≤ 500 cd/m² ceiling, ≤ 10:1 internal uniformity). The cap prevents internal hot spots on back-lit signs with poor diffusion: a 200 cd/m² hot spot with a 5 cd/m² darker area gives 40:1 and fails. Such signs are luminous everywhere but visually deceptive because the hot spot dominates and the rest reads as off. Manufacturers achieve compliance with LED edge-lighting and light-guide panels rather than direct LED illumination of the face; well-designed signs achieve 3:1 or better.',
  },
  {
    id: 6,
    question:
      'A maintained emergency exit sign and a non-maintained emergency exit sign have what fundamental difference?',
    options: [
      'A maintained sign is lit continuously and on mains failure; a non-maintained sign lights only on mains failure.',
      'They carry different pictograms — maintained uses E001, non-maintained uses E002.',
      'They use a different safety colour — maintained green, non-maintained blue.',
      'They are different physical sizes for the same viewing distance.',
    ],
    correctAnswer: 0,
    explanation:
      'A maintained sign is illuminated continuously during normal operation and remains illuminated on mains failure (the battery takes over); a non-maintained sign is off during normal operation and illuminates only on mains failure. The choice is driven by occupant familiarity: maintained signs are required where occupants do not know the building (cinemas, theatres, hotels, public spaces); non-maintained signs are acceptable where occupants know the layout (offices, factories during occupied hours). BS 5266-1:2025 §7.7 retains both, with maintained preferred for unfamiliar-occupant premises.',
  },
  {
    id: 7,
    question:
      'BS 5266-1:2025 strengthened the rules around external escape signage at final exits. What is the new requirement?',
    options: [
      'No external signage is required beyond the final exit door.',
      'Only verbal evacuation instructions are required at the final exit.',
      'External exit signs at every final exit, confirming the route to the assembly point.',
      'Only a single assembly-point sign is required, with no signs at the exits.',
    ],
    correctAnswer: 2,
    explanation:
      'BS 5266-1:2025 §7.3 + §7.7 — external escape signage at every final exit, plus signage along the external path to the assembly point. IP65 minimum. Same pictogram, luminance, and viewing-distance rules. Existing buildings without external signage should retrofit at the next major refurbishment.',
  },
  {
    id: 8,
    question:
      'A new shopping centre has high-bay corridors at 4.5 m mounting height. The emergency exit signs are externally illuminated. What pictogram height is required to maintain a 30 m viewing distance under BS EN 1838:2024?',
    options: [
      '50 mm — using p = 600 in error.',
      '500 mm — using p = 60 in error.',
      '15 mm — confusing the pictogram height with a tenth of the distance.',
      '150 mm — from d = s × p, with d = 30 m and p = 200.',
    ],
    correctAnswer: 3,
    explanation:
      'd = s × p — for d = 30 m and p = 200 (external), s = 0.15 m = 150 mm. In practice high-bay applications often step up to 200 mm pictograms to give a 40 m viewing distance and accommodate the additional sight-line geometry.',
  },
  {
    id: 9,
    question:
      'What is the BS 5266-1:2025 position on legend-only signs (text only, no pictogram, e.g. the word "EXIT")?',
    options: [
      'Deprecated — ISO 7010 pictogram signs are mandatory; legend-only signs do not satisfy the standard.',
      'Recommended as the preferred sign type for all premises.',
      'Required as the primary escape sign in all new installations.',
      'Mandatory in addition to the pictogram on every escape sign.',
    ],
    correctAnswer: 0,
    explanation:
      'BS 5266-1:2025 §7.7 + ISO 7010:2020 — pictograms mandatory, legend-only deprecated. Legend-only signs (e.g. the word "EXIT") are language-dependent and unreadable to non-English-speakers; ISO 7010 E001 / E002 pictograms are language-independent and outperform text under low-adaptation conditions. New installations must use the pictograms; supplementary text below the pictogram is permitted as additional information but cannot substitute for it. Existing legend-only signs should be upgraded at the next refurbishment cycle.',
  },
  {
    id: 10,
    question:
      'BS EN 1838:2024 specifies the response time for emergency exit signs. Which option matches?',
    options: [
      'Instant — full rated luminance must be reached immediately on mains failure.',
      '0.5 s to full luminance — the same fast response as high-risk task-area lighting.',
      '50 % of rated luminance within 5 s, full within 60 s — same profile as escape route lighting.',
      '120 s to full luminance — allowing for slow ballast warm-up.',
    ],
    correctAnswer: 2,
    explanation:
      'BS EN 1838:2024 §5.4 — sign response: 5 s to 50 % luminance, 60 s to 100 %. Same profile as escape route lighting illuminance in §4.3. Maintained signs (always on) trivially comply; non-maintained signs need fast LED switching to meet 5 s.',
  },
];

const EmergencyLightingModule2Section5 = () => {
  const navigate = useNavigate();

  useSEO({
    title:
      'Emergency exit signs (signage and wayfinding) | Emergency Lighting Module 2.5 | Elec-Mate',
    description:
      'BS EN 1838:2024 emergency exit signs: ISO 7010 E001/E002 pictograms, d = s × p viewing distance, 5 cd/m² to 500 cd/m² luminance with 10:1 max ratio, Pantone 354c safety colour ≥ 50 %, mounting and BS 5266-1:2025 external signage rules.',
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
            eyebrow="Module 2 · Section 5"
            title="Emergency exit signs (signage and wayfinding)"
            description="The visual beacons that turn an escape route into a navigable path. ISO 7010 E001 / E002 running-man pictograms, the d = s × p viewing-distance formula (p = 100 internal, p = 200 external), 5 to 500 cd/m² sign-face luminance with a 10:1 internal uniformity cap, Pantone 354c safety colour at ≥ 50 % of the sign area, and the BS 5266-1:2025 strengthening of external signage at final exits."
            tone="yellow"
          />

          <TLDR
            points={[
              'Pictograms mandatory: ISO 7010 E001 (door on left, figure running right) or E002 (door on right, figure running left). Selection follows actual direction of travel at the sign.',
              'Legend-only "EXIT" text signs are deprecated under BS 5266-1:2025. New installations must use pictogram signs; supplementary text is allowed below the pictogram but cannot substitute for it.',
              'Viewing distance formula: d = s × p. d = max viewing distance, s = pictogram height, p = 100 for internally illuminated, p = 200 for externally illuminated. A 150 mm pictogram externally illuminated reads at 30 m max.',
              'Sign-face luminance: ≥ 5 cd/m² minimum (visibility floor), ≤ 500 cd/m² maximum (glare cap), Lmax/Lmin ≤ 10:1 across the safety colour area (uniformity to prevent hot-spot deception).',
              'Safety colour: Pantone 354c green, occupying ≥ 50 % of the sign area. Pictogram rendered in white over green. Other greens / shades are not interchangeable.',
              'Maintained vs non-maintained: maintained = always illuminated; non-maintained = illuminates on mains failure only. Maintained required for unfamiliar-occupant premises (cinemas, theatres, hotels, public spaces).',
              'Mounting height: 2.0 to 2.5 m typical to underside, measured from finished floor. Higher mounting requires a larger pictogram per d = s × p. Low-level supplementary way-finding lights at 0.4 to 0.6 m supplement, not replace, high-level signage.',
              'BS 5266-1:2025 strengthened external signage rules at final exits: IP65 emergency exit signs at every final exit and along the external path to the assembly point.',
              'Response time: same 5 s to 50 % / 60 s to 100 % profile as escape route lighting. Maintained signs trivially comply; non-maintained signs need LED to meet 5 s.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify the correct ISO 7010 pictogram (E001 or E002) for the direction of travel at a sign location',
              'Apply the d = s × p viewing-distance formula with p = 100 internal / p = 200 external to size pictograms',
              'State the BS EN 1838:2024 luminance requirements (5 to 500 cd/m², 10:1 uniformity) and the Pantone 354c safety-colour rule',
              'Distinguish maintained from non-maintained emergency exit signs and select the correct mode for the premises type',
              'Place signs at the correct mounting height with appropriate pictogram size for sight-line distance',
              'Recognise the BS 5266-1:2025 strengthened external-signage rules at final exits and along the assembly-point path',
              'Specify sign luminaires that meet the 5 s response and IP65 external rating where applicable',
              'Verify a signage scheme by line-of-sight check and viewing-distance calculation before procurement',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>ISO 7010 pictograms — E001 and E002</ContentEyebrow>

          <ConceptBlock
            title="Why pictograms beat words"
            plainEnglish="A pictogram communicates one idea — running man through door — without language. An occupant who reads English, Mandarin, Polish, Arabic, or none of those, all see the same meaning. A legend-only sign (the word EXIT in English) is invisible to most of the world's population and unreliable even for English speakers under low-adaptation conditions, when the eye struggles to resolve text. ISO 7010 standardised the running-man pictogram as the international emergency exit sign in 2003; the 2020 update reaffirmed the standard. BS 5266-1:2025 makes the pictogram mandatory and deprecates legend-only signs; supplementary text below the pictogram is permitted but cannot replace it."
            onSite="Verify any existing emergency exit signage on a survey by checking it is ISO 7010 — running man through door, white-on-green, Pantone 354c. Legend-only EXIT signs are non-compliant for new work and should be flagged for replacement at the next refurbishment cycle."
          >
            <p>The two ISO 7010 emergency exit pictograms:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>E001 — door on LEFT, figure running RIGHT.</strong> Used where the occupant
                is travelling toward the right at the sign location. The figure points to where the
                exit is.
              </li>
              <li>
                <strong>E002 — door on RIGHT, figure running LEFT.</strong> The mirror image. Used
                where the occupant is travelling toward the left at the sign location.
              </li>
              <li>
                <strong>Selection follows actual travel direction.</strong> The pictogram should
                point in the direction of travel relative to the occupant's approach. A sign at a
                T-junction with the exit to the right uses E001; the same sign for an exit to the
                left uses E002.
              </li>
              <li>
                <strong>Down-arrow / up-arrow modifiers.</strong> Where the exit is below or above
                the current floor (stair signage), additional ISO 7010 down-arrow or up-arrow
                pictograms are placed adjacent to the running-man sign to indicate level change.
              </li>
              <li>
                <strong>Stairs supplementary pictogram.</strong> ISO 7010 also includes stair
                pictograms (E001 with stairs) for situations where the route involves a
                descent / ascent — common in multi-storey escape signage.
              </li>
              <li>
                <strong>Other related pictograms.</strong> E007 (assembly point), E003 (first aid),
                E009 (eye-wash) — same green / white scheme but different functional category.
                Do not mix them with the running-man pictogram on the same sign.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="ISO 7010:2020 + BS EN 1838:2024 · §5 (Safety signs for emergency lighting)"
            clause={
              <>
                Emergency exit signs shall use the ISO 7010 pictogram for safe condition signs
                (E001 / E002 running man through door) on a green background. The safety colour
                shall occupy at least 50 % of the area of the sign. Legend-only signs (text
                without pictogram) shall not be used as the primary emergency exit sign.
              </>
            }
            meaning="Pictogram first, language second. The ISO 7010 running man is the international standard for emergency exit signage and is mandatory under BS EN 1838:2024 + BS 5266-1:2025. Legend-only signs are deprecated; supplementary text below the pictogram is allowed but cannot replace it."
          />

          <SectionRule />

          <ContentEyebrow>The viewing distance formula d = s × p</ContentEyebrow>

          <ConceptBlock
            title="Sizing pictograms for sight-line distance"
            plainEnglish="The viewing distance formula d = s × p is the load-bearing calculation for sign sizing. d is the maximum distance from which an occupant can reliably read the sign during an evacuation. s is the height of the pictogram on the sign (the running man, not the green background — measured from the top of the figure to the bottom of the door silhouette). p is a distance factor that depends on illumination mode: 100 for internally illuminated signs (light source is inside the sign, sign face is the source), 200 for externally illuminated signs (sign face reflects external light)."
          >
            <p>Worked examples:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>100 mm pictogram, internal.</strong> d = 0.10 × 100 = 10 m. Signs spaced no
                more than 10 m apart along the escape route.
              </li>
              <li>
                <strong>100 mm pictogram, external.</strong> d = 0.10 × 200 = 20 m.
              </li>
              <li>
                <strong>150 mm pictogram, internal.</strong> d = 0.15 × 100 = 15 m. The most
                common size in commercial offices.
              </li>
              <li>
                <strong>150 mm pictogram, external.</strong> d = 0.15 × 200 = 30 m. Common in
                medium-format retail and education.
              </li>
              <li>
                <strong>200 mm pictogram, external.</strong> d = 0.20 × 200 = 40 m. Large retail,
                shopping centres, leisure complexes.
              </li>
              <li>
                <strong>300 mm pictogram, external.</strong> d = 0.30 × 200 = 60 m. Warehouses,
                airports, exhibition halls, sports venues.
              </li>
              <li>
                <strong>500 mm pictogram, external.</strong> d = 0.50 × 200 = 100 m. Stadium-scale
                applications.
              </li>
            </ul>
            <p>
              Internally illuminated signs are CHEAPER to install (single luminaire / sign housing,
              direct mains feed) but read at HALF the viewing distance per pictogram size. For long
              sight lines, externally illuminated signs are typically more cost-effective because
              the same maximum viewing distance can be achieved with a smaller (and cheaper) sign
              face plus a separate luminaire.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 1838:2024 · §5.5 (Maximum viewing distance for emergency exit signs)"
            clause={
              <>
                The maximum distance d at which an emergency exit sign can be reliably identified
                shall be determined by the formula d = s × p, where s is the height of the
                pictogram on the sign and p is a distance factor with the value p = 100 for
                internally illuminated signs and p = 200 for externally illuminated signs. Where
                the actual sight-line distance exceeds d, additional or larger signs shall be
                provided.
              </>
            }
            meaning="The formula bounds the maximum sign-to-sign spacing along an escape route. If the calculated d is shorter than the available sight line at any point, an additional sign is required mid-span or the sign size must be increased. Designers verify the formula against the floor plan at each sign location."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          {/* Diagram: exit sign anatomy showing pictogram, dimensions, viewing distance */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Emergency exit sign anatomy — d = s × p (worked example: 150 mm pictogram externally illuminated, d = 30 m)
            </h4>
            <svg
              viewBox="0 0 820 440"
              className="w-full h-auto"
              role="img"
              aria-label="Anatomy of an emergency exit sign showing the ISO 7010 E001 running man pictogram on a green Pantone 354c background, with annotations for safety colour area at least 50 percent of the sign, pictogram height s, and the viewing distance formula d equals s times p, where p is 100 for internal illumination or 200 for external. Worked example shows a 150 mm pictogram externally illuminated giving d equals 30 m maximum viewing distance."
            >
              <text x="410" y="22" textAnchor="middle" fill="#FBBF24" fontSize="13" fontWeight="bold">
                EMERGENCY EXIT SIGN — ISO 7010 E001 + d = s × p
              </text>
              <text x="410" y="38" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="10">
                BS EN 1838:2024 §5 · ISO 7010:2020 · BS 5266-1:2025 §7.7
              </text>

              {/* Sign rectangle (green Pantone 354c approximation) */}
              <rect x="60" y="100" width="280" height="170" fill="#00833F" stroke="#FFFFFF" strokeWidth="2" />

              {/* White door rectangle (left side) */}
              <rect x="80" y="130" width="60" height="115" fill="rgba(255,255,255,0.92)" />

              {/* Running figure white silhouette (right of door) */}
              <g fill="rgba(255,255,255,0.95)">
                {/* head */}
                <circle cx="200" cy="148" r="11" />
                {/* body / arms / legs simplified */}
                <path d="M 188 162 L 215 162 L 220 198 L 235 235 L 226 240 L 210 210 L 198 240 L 184 240 L 192 200 L 175 188 L 165 175 L 172 168 Z" />
              </g>

              {/* Arrow pictogram element (small) */}
              <path d="M 250 180 L 280 180 L 275 173 M 280 180 L 275 187" stroke="rgba(255,255,255,0.95)" strokeWidth="3" fill="none" />

              {/* Pictogram height (s) annotation */}
              <line x1="350" y1="135" x2="350" y2="245" stroke="#22D3EE" strokeWidth="1.5" />
              <line x1="345" y1="135" x2="355" y2="135" stroke="#22D3EE" strokeWidth="1.5" />
              <line x1="345" y1="245" x2="355" y2="245" stroke="#22D3EE" strokeWidth="1.5" />
              <text x="362" y="195" fill="#22D3EE" fontSize="11" fontWeight="bold">
                s = 150 mm
              </text>
              <text x="362" y="210" fill="rgba(255,255,255,0.6)" fontSize="9">
                pictogram height
              </text>

              {/* Sign size note */}
              <text x="200" y="290" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                green Pantone 354c ≥ 50 % of sign area
              </text>

              {/* Viewing distance equation panel (right side) */}
              <rect x="460" y="100" width="320" height="200" rx="10" fill="rgba(34,211,238,0.06)" stroke="rgba(34,211,238,0.4)" strokeWidth="1.4" />
              <text x="620" y="128" textAnchor="middle" fill="#22D3EE" fontSize="14" fontWeight="bold">
                d = s × p
              </text>
              <text x="475" y="156" fill="rgba(255,255,255,0.85)" fontSize="11">
                d = max viewing distance (m)
              </text>
              <text x="475" y="174" fill="rgba(255,255,255,0.85)" fontSize="11">
                s = pictogram height (m)
              </text>
              <text x="475" y="192" fill="rgba(255,255,255,0.85)" fontSize="11">
                p = 100 (internally illuminated)
              </text>
              <text x="475" y="210" fill="rgba(255,255,255,0.85)" fontSize="11">
                p = 200 (externally illuminated)
              </text>
              <text x="475" y="240" fill="#FBBF24" fontSize="11" fontWeight="bold">
                Worked example:
              </text>
              <text x="475" y="258" fill="rgba(255,255,255,0.85)" fontSize="11">
                s = 0.15 m, p = 200 (external)
              </text>
              <text x="475" y="276" fill="#FBBF24" fontSize="12" fontWeight="bold">
                d = 0.15 × 200 = 30 m
              </text>
              <text x="475" y="292" fill="rgba(255,255,255,0.55)" fontSize="9">
                signs spaced no more than 30 m apart
              </text>

              {/* Luminance + safety-colour panel (bottom) */}
              <rect x="60" y="320" width="720" height="100" rx="10" fill="rgba(239,68,68,0.06)" stroke="rgba(239,68,68,0.45)" strokeWidth="1.4" />
              <text x="80" y="344" fill="#EF4444" fontSize="11" fontWeight="bold">
                Sign-face luminance: ≥ 5 cd/m² (visibility floor) · ≤ 500 cd/m² (glare cap) · Lmax/Lmin ≤ 10:1 (uniformity).
              </text>
              <text x="80" y="362" fill="rgba(255,255,255,0.7)" fontSize="10">
                Safety colour Pantone 354c green ≥ 50 % of sign area; pictogram rendered white-on-green.
              </text>
              <text x="80" y="380" fill="rgba(255,255,255,0.7)" fontSize="10">
                Mounting height typically 2.0 to 2.5 m to underside; high-bay → larger pictogram per d = s × p.
              </text>
              <text x="80" y="398" fill="rgba(255,255,255,0.7)" fontSize="10">
                Response: 5 s to 50 % luminance, 60 s to 100 %. Maintained = always on; non-maintained = on at mains failure.
              </text>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>Sign-face luminance — 5 to 500 cd/m², 10:1 ratio</ContentEyebrow>

          <ConceptBlock
            title="The three-part luminance rule"
            plainEnglish="Sign visibility under emergency conditions depends on three luminance properties: brightness floor (so the sign is visible at all), brightness ceiling (so glare does not impair adaptation to the dim escape route), and uniformity across the sign face (so hot-spots do not deceive the eye into perceiving the sign as off elsewhere). BS EN 1838:2024 §5.4 codifies all three: ≥ 5 cd/m², ≤ 500 cd/m², Lmax/Lmin ≤ 10:1 across the safety-colour area. Compliance is verified at commissioning by luminance meter readings on the sign face."
          >
            <p>How each part of the rule operates:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>≥ 5 cd/m² floor.</strong> The minimum brightness on any part of the safety
                colour. Calibrated against typical wall luminance during evacuation (around 0.5 to
                2 cd/m²); the sign must be at least 2 to 10 times brighter than the surrounding
                walls to function as a beacon.
              </li>
              <li>
                <strong>≤ 500 cd/m² ceiling.</strong> The maximum brightness anywhere on the safety
                colour. Above 500 cd/m² the eye experiences glare; the sign becomes uncomfortable
                to look at and the escape route around the sign appears darker by contrast (eye
                stops adapting downward). 500 cd/m² is roughly the brightness of a typical
                office-grade computer monitor at full white.
              </li>
              <li>
                <strong>Lmax/Lmin ≤ 10:1.</strong> Uniformity across the safety-colour area. A back-lit
                sign with a single LED behind the centre of the panel and no diffuser produces a
                hot-spot at the centre and dim corners; this fails 10:1. Modern back-lit signs use
                edge-lit light-guide panels to achieve 3:1 or better.
              </li>
              <li>
                <strong>Pictogram (white area) is separate.</strong> The 10:1 cap applies to the
                green safety-colour area. The white pictogram is the contrasting element and is
                allowed to be brighter or dimmer than the green area; the contrast is the sign's
                identifiability. White-on-green typically reads at about 1.5 to 3× the luminance
                of the green area.
              </li>
              <li>
                <strong>Verification at commissioning.</strong> Calibrated luminance meter held
                normal to the sign face, measuring at multiple points on the safety-colour area.
                Record min, max, and ratio. Each must fall inside the published rule.
              </li>
              <li>
                <strong>Internally vs externally illuminated.</strong> The luminance rules apply
                to both. Internally illuminated signs typically deliver 50 to 200 cd/m² uniform.
                Externally illuminated signs depend on the external luminaire output and reflectance
                of the sign face material — typically retro-reflective vinyl on a white substrate.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 1838:2024 · §5.4 (Luminance of safety signs for emergency lighting)"
            clause={
              <>
                The luminance of any part of the safety colour area of a safety sign for emergency
                lighting shall be not less than 5 cd/m² and not more than 500 cd/m². The ratio of
                the maximum to minimum luminance within the safety colour area shall not exceed
                10:1.
              </>
            }
            meaning="Three-part rule: floor, ceiling, uniformity. All three apply simultaneously to the safety-colour (green) area. The pictogram (white) is the contrast element and is exempt from the 10:1 cap on the green; the green-area uniformity is the test. Verify with a calibrated luminance meter."
          />

          <CommonMistake
            title="Back-lit sign with single central LED, hot-spot in middle"
            whatHappens="A budget back-lit emergency exit sign uses a single 1 W LED behind the centre of the panel with no diffuser. Centre of the green area reads at 350 cd/m²; corners read at 25 cd/m². Lmax/Lmin = 14:1. Above the 10:1 cap. Sign fails BS EN 1838 §5.4. Visually the sign reads as a bright spot with dim corners; the eye locks onto the bright spot and the rest of the sign disappears. Replacement required."
            doInstead="Specify edge-lit light-guide-panel (LGP) signs as standard. LEDs are around the perimeter of the sign housing; light is conducted across the panel through total internal reflection and exits the front face uniformly. Lmax/Lmin typically 2:1 to 3:1 — comfortably inside the 10:1 cap. Slightly more expensive than back-lit but the lifetime, uniformity, and compliance cost are all better. Verify the data sheet specifies edge-lit / LGP and includes the luminance uniformity ratio."
          />

          <SectionRule />

          <ContentEyebrow>Maintained vs non-maintained — and when each applies</ContentEyebrow>

          <ConceptBlock
            title="Always-on or only-on-failure?"
            plainEnglish="Emergency exit signs come in two functional modes. Maintained mode means the sign is illuminated continuously during normal operation AND continues to be illuminated during mains failure (battery takes over). Non-maintained mode means the sign is OFF during normal operation and only illuminates on mains failure. Both modes are valid under BS 5266-1:2025; selection depends on premises type and occupant familiarity."
          >
            <p>How to choose between maintained and non-maintained:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Maintained — required for unfamiliar-occupant premises.</strong> Cinemas,
                theatres, hotels, hostels, restaurants, public exhibition spaces, transport hubs,
                medical waiting areas, places of worship. Occupants do not know the layout and must
                be guided by always-visible signage during normal operation as well as emergency.
              </li>
              <li>
                <strong>Non-maintained — acceptable for familiar-occupant premises.</strong>
                Offices, factories, warehouses, schools during occupied hours, private workshops.
                Occupants know the layout from daily use; the sign serves only the failure case.
              </li>
              <li>
                <strong>Energy considerations.</strong> Maintained signs consume slightly more
                energy continuously (typically 3 to 8 W per sign) but modern LED maintained signs
                are very low-power. The energy difference between maintained and non-maintained is
                marginal at scale.
              </li>
              <li>
                <strong>Battery sizing the same.</strong> Both maintained and non-maintained signs
                need batteries sized for the rated duration. Maintained signs do not get a smaller
                battery; the battery must support the sign for 1 h or 3 h regardless of normal
                operation mode.
              </li>
              <li>
                <strong>Lifecycle implications.</strong> Maintained signs have their LEDs always
                on; lifetime (typical 50 000 to 100 000 hours at constant on) means about 6 to 11
                years of continuous service. Non-maintained signs have their LEDs only on during
                emergencies and tests; lifetime in years is much longer, but battery life governs
                replacement cycle.
              </li>
              <li>
                <strong>Hybrid switching ("switched maintained").</strong> Some premises use
                signs that are maintained during occupied hours and non-maintained during
                unoccupied hours, controlled by a building management system. Acceptable under BS
                5266-1:2025 provided the sign achieves maintained behaviour whenever the premises
                are occupied.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · §7.7 (Selection of maintained or non-maintained emergency exit signs)"
            clause={
              <>
                Maintained emergency exit signs shall be installed in premises where the occupants
                are not necessarily familiar with the means of escape, including but not limited to
                cinemas, theatres, hotels, hostels, restaurants, places of worship, transport hubs,
                medical waiting areas, and public exhibition spaces. In other premises, where the
                occupants are familiar with the means of escape, non-maintained signs are
                acceptable provided the response time and luminance requirements of BS EN 1838:2024
                §5 are met.
              </>
            }
            meaning="Maintained for unfamiliar occupants; non-maintained acceptable for familiar occupants. The familiarity test is the distinguishing rule. Mixed premises (e.g. an office with a public reception) typically use maintained signs in the public areas and non-maintained in the staff-only areas."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Mounting and placement</ContentEyebrow>

          <ConceptBlock
            title="2.0 to 2.5 m typical, with line-of-sight verification"
            plainEnglish="Emergency exit sign mounting height is a balance between visibility (above the heads of nearby occupants in a queue) and viewing-distance geometry (the sight-line angle from a viewer near the floor to the sign). Typical mounting is 2.0 to 2.5 m to the underside of the sign, measured from finished floor level. Above 2.5 m the sign begins to require a larger pictogram per the d = s × p formula because the sight-line distance becomes longer than the simple horizontal distance. Below 2.0 m the sign can be obscured by other occupants and signage."
          >
            <p>Practical mounting and placement rules:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>2.0 to 2.5 m typical.</strong> Above the head of an average occupant
                (1.7 m) plus arm-up clearance. Provides clear sight-line from anywhere along the
                escape route at floor level.
              </li>
              <li>
                <strong>High-bay applications.</strong> Warehouses, hangars, sports halls — sign
                mounting may be 4 m or higher. Pictogram height stepped up accordingly. d = s × p
                is calculated against actual sight-line distance, not horizontal distance; in tall
                spaces the sight line may be 1.5× the horizontal distance.
              </li>
              <li>
                <strong>Low-level supplementary signage.</strong> ISO 16069 + BS 5266-1:2025 allow
                additional way-finding lighting at 0.4 to 0.6 m from the floor (low-level escape
                route lighting). This complements the high-level signage during smoke-logging
                conditions where the upper part of a corridor may be obscured by smoke. Used in
                cinemas, theatres, large enclosed spaces.
              </li>
              <li>
                <strong>Sight-line verification.</strong> Walk the route at design stage with a
                printed sign-size template held at the proposed mounting position. Confirm the sign
                is unambiguously visible from the start of the corresponding leg of the escape
                route. If not, reposition or upsize.
              </li>
              <li>
                <strong>Distance from final exit.</strong> Sign within 2 m of every final exit
                (BS EN 1838:2024 §4.5 decision-point rule). The sign visually marks the exit; an
                exit without an adjacent sign is a navigation failure even if the door is otherwise
                obvious.
              </li>
              <li>
                <strong>Distance between signs along a route.</strong> Maximum sign-to-sign spacing
                = d, where d is calculated from the formula. In practice spacing is somewhat
                tighter to provide redundancy; if one sign is obscured by smoke or fixture damage,
                the next sign should still be visible from the previous one.
              </li>
              <li>
                <strong>Avoid sign placement where it can be obscured.</strong> Behind doors when
                open, behind hanging banners, behind racking that may be erected at retail
                fit-out, behind moveable partitions. Site survey must consider not just the
                building as built but the building as USED.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · §7.7 (Mounting of emergency exit signs)"
            clause={
              <>
                Emergency exit signs shall be mounted at a height that ensures visibility from any
                point on the corresponding section of the escape route, taking into account the
                presence of occupants, fixtures, and other potential obstructions. The viewing
                distance shall be verified against d = s × p of BS EN 1838:2024 §5.5. Where the
                sight-line distance exceeds d, additional or larger signs shall be provided.
              </>
            }
            meaning="Mounting is governed by the viewing-distance formula and by sight-line obstruction. Both must be satisfied. Designers verify by walking the route at design stage with the proposed sign positions printed on the floor plan. Adjust position or size where the sight line fails."
          />

          <Scenario
            title="A 60 m straight corridor in a hotel"
            situation="A new boutique hotel has a 60 m straight corridor on each guest floor, running between two stairwells. Width 1.6 m, mounting height for signage 2.4 m, finishes mid-grey carpet, white walls, white ceiling. Occupants are guests — unfamiliar with the layout. Designer is selecting emergency exit signs."
            whatToDo="(1) Maintained signs required (unfamiliar occupants). (2) Both stairwells are exits; pictogram E001 toward one end of the corridor and E002 toward the other end (figures pointing toward each respective exit). (3) Sign-to-sign spacing = d. With 60 m total length and signs at both ends, midway sign is at 30 m. Using internally illuminated signs at p = 100, d = 30 m requires s = 0.30 m (300 mm pictogram) — large and conspicuous, possibly too large for the corridor scale. Using externally illuminated signs at p = 200, d = 30 m requires s = 0.15 m (150 mm pictogram) — typical, well-proportioned. (4) Choose externally illuminated 150 mm pictogram signs at each stairwell entrance plus one mid-corridor. (5) Each sign within 2 m of corresponding decision points (stair landings count as changes of level). (6) Luminance verification at commissioning: 5 cd/m² floor, 500 cd/m² ceiling, 10:1 across sign face."
            whyItMatters="The choice of internal vs external illumination doubles or halves the sign size for a given viewing distance. Cost-conscious designers default to internal (cheaper sign housings, single feed) and end up with oversized 300 mm pictograms in narrow corridors — visually awkward and often refused by interior designers. External illumination with smaller signs is often the better aesthetic choice as well as the cheaper one for large premises."
          />

          <SectionRule />

          <ContentEyebrow>BS 5266-1:2025 external signage at final exits</ContentEyebrow>

          <ConceptBlock
            title="Strengthening of the rules around external escape signage"
            plainEnglish="Alongside the expansion of the escape route definition (Module 2 §4) to include external final exits and the path to the assembly point, BS 5266-1:2025 strengthened the requirements for external emergency exit signage. The 2016 edition was largely silent on external signage; the 2025 edition makes it explicit. Every final exit must have an external emergency exit sign visible from the path of travel away from the building, illuminated to the same luminance and uniformity rules as internal signs, with IP65 environmental rating to survive weather exposure."
          >
            <p>What the strengthened external signage rules require:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>External sign at every final exit.</strong> Visible from the path of travel
                away from the building, identifying the exit from outside. Helps emergency
                services find the building entry / exit; helps occupants who have just left re-orient
                if needed.
              </li>
              <li>
                <strong>IP65 minimum.</strong> Weather-rated for outdoor exposure. Indoor-rated
                signs (typically IP20) are not permitted at external locations regardless of how
                sheltered the position appears.
              </li>
              <li>
                <strong>Same luminance rules.</strong> 5 to 500 cd/m², 10:1 uniformity. Same
                Pantone 354c green, same ISO 7010 pictogram.
              </li>
              <li>
                <strong>Path-of-travel signage.</strong> Where the route to the assembly point is
                long or has changes of direction, intermediate external signs are required to
                guide occupants along the path. ISO 7010 directional pictograms (running man with
                appropriate arrow) are used.
              </li>
              <li>
                <strong>Assembly point sign (E007).</strong> The assembly point itself is marked
                with an ISO 7010 E007 pictogram (assembly point). This is a different pictogram
                (figures gathered around a meeting point) and a different sign function — it
                identifies the destination, not the route to it. Same Pantone 354c green, same
                luminance rules.
              </li>
              <li>
                <strong>Power supply.</strong> External signs are on the building emergency supply
                (CPS or self-contained battery). External self-contained signs need outdoor-rated
                batteries with appropriate temperature tolerance for the climate.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · §7.3 + §7.7 (External escape signage at final exits)"
            clause={
              <>
                Emergency exit signs shall be provided at the external face of each final exit and
                along the external escape route to the assembly point. External signs shall comply
                with the same luminance, uniformity and pictogram requirements as internal signs
                of BS EN 1838:2024 §5, and shall have an ingress-protection rating appropriate to
                the location, with IP65 the minimum for normally-exposed external locations. The
                assembly point shall be identified by an emergency safety sign in accordance with
                ISO 7010 E007.
              </>
            }
            meaning="External signage at every final exit and along the external escape route. IP65 minimum. Same internal luminance / uniformity / pictogram rules. Assembly point uses E007 (assembly point pictogram), not E001 / E002 (running man). The escape route extends from any internal point to the assembly point in a continuous, signposted line."
          />

          <CommonMistake
            title="No sign on the outside of the final exit"
            whatHappens="A new commercial building has internal emergency exit signs at every final exit (compliant with BS 5266-1:2016 as-was). Outside the final exits — nothing. The escape route ends at the door. The 2025 edition expands the escape route through the door to the assembly point, and signage must extend with it. At commissioning under BS 5266-1:2025 the auditor cites §7.3 + §7.7. External IP65 signs and an E007 assembly-point sign are added retrospectively at significant cost."
            doInstead="From 31 October 2025 onwards, treat external signage at final exits as a default deliverable. At each final exit specify an external IP65 sign on the outside face (visible from the path of travel away from the building), plus an E007 assembly-point sign at the assembly point itself. For longer external paths, intermediate directional signs at the same d = s × p spacing as internal signs."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Sign luminaires and circuit considerations</ContentEyebrow>

          <ConceptBlock
            title="Self-contained, central battery, internal vs external"
            plainEnglish="Sign luminaires come in three architectural forms. Self-contained internally illuminated signs have an LED light source inside the sign housing plus an internal battery; they need only a mains feed. Externally illuminated signs have a separate luminaire pointing at the sign face; sign and luminaire are different products and the luminaire is the energy-consuming and battery-bearing element. Central battery sign luminaires are fed from a centralised CPS over fire-rated cable; the sign itself contains no battery."
          >
            <p>Selection considerations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Self-contained internal — small premises.</strong> Lowest install cost.
                One product per sign, mains feed only, internal battery. Maintenance by sign-by-sign
                replacement at end-of-life. Suitable for offices, small retail, small warehouses.
              </li>
              <li>
                <strong>Self-contained external — flexible retrofit.</strong> Two products
                (sign + luminaire) but no centralised infrastructure. Useful for retrofit where a
                CPS is not present. The luminaire is the emergency-rated element; the sign is
                often a passive printed face.
              </li>
              <li>
                <strong>Central battery (CPS) — large premises.</strong> Centralised infrastructure
                serves many signs over fire-rated cable. Higher install cost but lower maintenance
                cost at scale (one battery bank rather than hundreds of internal batteries).
                Suitable for hospitals, large hotels, shopping centres, transport hubs.
              </li>
              <li>
                <strong>Self-test luminaires (BS EN 62034).</strong> Self-contained luminaires with
                internal monitoring electronics that perform monthly functional tests automatically
                and report status via an LED indicator or addressable network. Reduce manual
                testing labour; covered in detail in Module 2 §6.
              </li>
              <li>
                <strong>Cable considerations.</strong> Internal sign feeds are typically standard
                low-voltage cable. Central battery feeds in escape routes typically require
                fire-rated cable (e.g. BS 8434-2 / BS EN 50200 PH classification) to maintain
                circuit integrity during fire conditions for the rated duration.
              </li>
              <li>
                <strong>Circuit protection.</strong> BS 7671:2018+A2:2022 §560 applies. Final
                circuit OCPDs must coordinate with the emergency supply. Discrimination is critical
                — a non-emergency-circuit fault must not propagate into the emergency circuit.
              </li>
              <li>
                <strong>Test switches.</strong> BS 5266-1:2025 §8 requires accessible test
                facilities at each sign (or sign group) to allow simulated mains failure during
                routine inspections. Lockable test key switches are typical.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · §8 (Wiring and test arrangements for emergency exit signs)"
            clause={
              <>
                Final circuits supplying emergency exit signs shall be sized and protected in
                accordance with BS 7671. Where central battery (CPS) supply is used, the cabling
                between the CPS and the sign luminaires shall be of fire-rated construction
                appropriate to the duration of the emergency lighting. Test facilities shall be
                provided to allow simulation of normal supply failure for routine maintenance and
                inspection.
              </>
            }
            meaning="Three layers of wiring rules: BS 7671 for the final circuit sizing and protection, fire-rated cable for CPS feeders to maintain integrity for the rated duration, and accessible test facilities at each sign / sign group. All three must be in place at commissioning."
          />

          <SectionRule />

          <ContentEyebrow>Verification and ongoing testing</ContentEyebrow>

          <ConceptBlock
            title="What gets checked, when, and how"
            plainEnglish="Emergency exit sign verification has two stages: commissioning (one-off, full check at handover) and ongoing testing (covered in Module 2 §6). At commissioning, every sign is verified for pictogram correctness, mounting position, luminance, and response time. At ongoing testing, signs are checked monthly (functional test, short duration) and annually (full duration). Sign luminance is also rechecked periodically because LED output degrades over time."
          >
            <p>The commissioning checks:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Pictogram correctness.</strong> ISO 7010 E001 / E002 at every sign,
                handedness matches direction of travel. Photo each sign for the record.
              </li>
              <li>
                <strong>Mounting position.</strong> Within 2 m of decision point. Mounting height
                2.0 to 2.5 m to underside (or as designed). No sight-line obstructions.
              </li>
              <li>
                <strong>Luminance.</strong> Calibrated luminance meter on safety-colour area.
                Multiple points per sign. Confirm 5 to 500 cd/m², 10:1 ratio.
              </li>
              <li>
                <strong>Response time.</strong> Switch off normal supply; confirm sign reaches 50 %
                rated luminance within 5 s, 100 % within 60 s. Maintained signs trivially comply
                (already on); non-maintained signs must transition.
              </li>
              <li>
                <strong>Discharge test.</strong> Hold sign on emergency supply for full rated
                duration (1 h or 3 h). Confirm luminance remains ≥ 50 % of rated value at end of
                duration. Sign self-recovers fully within 24 h.
              </li>
              <li>
                <strong>External signs.</strong> Same checks plus IP65 verification (visual check
                of seals, gland integrity, luminaire enclosure). Confirm external luminaire is
                connected to emergency supply, not security supply.
              </li>
              <li>
                <strong>Records.</strong> Commissioning sheet records each sign by location and
                test result. Cross-references the BS 5266-1:2025 design and installation record
                produced by the competent designer.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · §11 (Commissioning verification of emergency exit signs)"
            clause={
              <>
                Each emergency exit sign shall be verified at commissioning for pictogram, mounting,
                luminance, response time and full-duration performance. The verification shall be
                recorded sign-by-sign in the commissioning record, which shall form part of the
                design and installation record retained by the responsible person.
              </>
            }
            meaning="Sign-by-sign commissioning verification, not a sample. Each sign is photographed, measured, and tested. The record is part of the design and installation record retained as part of the building golden thread."
          />

          <CommonMistake
            title="Sign luminance not verified at commissioning"
            whatHappens="A new office fit-out has 24 internally illuminated emergency exit signs. Commissioning records show response-time test pass and discharge-duration pass for every sign. Luminance not measured. At a subsequent fire risk assessment (3 years later), a luminance meter check finds 6 signs reading below 5 cd/m² because the LEDs have degraded. The signs have been ineffective for some time but no one noticed because the visual cue is subtle. Replacement of all 24 signs is required and the responsible person carries audit findings of inadequate maintenance."
            doInstead="At commissioning, take a calibrated luminance meter to every sign. Record min, max, ratio for the safety-colour area. Confirm 5 to 500 cd/m², 10:1 ratio. Cross-reference the manufacturer's rated luminance — most manufacturers specify 100 to 200 cd/m² at the start of life. A sign reading below 50 cd/m² at commissioning is suspect (possible LED defect) even if technically above 5 cd/m²; flag for investigation."
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
              'Pictograms mandatory: ISO 7010 E001 (door left, figure right) or E002 (door right, figure left). Selection follows actual direction of travel. Legend-only signs deprecated.',
              'Viewing distance: d = s × p. p = 100 internally illuminated, p = 200 externally illuminated. 150 mm pictogram external = 30 m max viewing distance.',
              'Luminance: ≥ 5 cd/m² floor, ≤ 500 cd/m² ceiling, ≤ 10:1 across safety colour area. Verify at commissioning with a calibrated luminance meter.',
              'Safety colour: Pantone 354c green ≥ 50 % of sign area. Pictogram white-on-green. Other shades / colours not interchangeable.',
              'Maintained vs non-maintained: maintained always-on (required for unfamiliar-occupant premises), non-maintained on-failure-only (acceptable for familiar-occupant premises).',
              'Mounting height: 2.0 to 2.5 m to underside typical. Higher mounting → larger pictogram per d = s × p. Low-level supplementary signage at 0.4 to 0.6 m supplements, not replaces, high-level signage.',
              'Sign within 2 m of every final exit. Sign-to-sign spacing along route ≤ d.',
              'BS 5266-1:2025 strengthening: external IP65 signs at every final exit and along the external path to the assembly point. E007 pictogram at assembly point.',
              'Response time: 5 s to 50 % luminance, 60 s to 100 %. Maintained trivially compliant; non-maintained needs LED to meet 5 s.',
              'Verify at commissioning sign-by-sign: pictogram, mounting, luminance, response, discharge. Records form part of the BS 5266-1:2025 design and installation record.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'When should I use E001 vs E002 — is there a default?',
                answer:
                  'Neither is the default; selection follows the direction of travel at the sign location. At a T-junction with the exit to the right, E001 (figure running right) directs occupants to the right. At the same junction with the exit to the left, E002 (figure running left) directs them to the left. Mirror-image pictograms are not interchangeable; placing E001 where E002 belongs is a navigation error and an audit finding even if all other rules are met. On a straight corridor with the exit dead ahead, either pictogram is acceptable provided there is no perpendicular branch nearby.',
              },
              {
                question:
                  'Can I use a 100 mm pictogram in a typical office corridor?',
                answer:
                  'Depends on viewing distance. A 100 mm pictogram externally illuminated reads at 20 m max; internally illuminated at 10 m max. For an office corridor up to 10 m end-to-end with internal signs, 100 mm is fine. For a corridor over 20 m with external signs, 100 mm fails the formula and a 150 mm pictogram is required. Most offices in practice use 150 mm pictograms because corridors over 15 m are common; the slightly larger size also reads better under poor adaptation than 100 mm.',
              },
              {
                question:
                  'How do I confirm my sign uses Pantone 354c?',
                answer:
                  'Manufacturer data sheet should specify. Pantone 354c is a defined chromaticity (CIE x ≈ 0.272, y ≈ 0.566, Y > 25 %). Look for "ISO 3864 / ISO 7010 colour compliant" or "Pantone 354c" on the sign data sheet. Avoid generic "green" sign products that do not declare colour compliance — the chromaticity may be off-standard and the sign may fail audit. Tested compliance is part of the manufacturer\'s declaration of conformity.',
              },
              {
                question:
                  'Are photoluminescent (glow-in-the-dark) signs allowed instead of electrically illuminated signs?',
                answer:
                  'BS 5266-1:2025 permits photoluminescent signs ONLY as supplementary way-finding (low-level escape route lighting per BS EN 1838 §5.7), not as the primary emergency exit sign. The primary sign must be electrically illuminated (internally or externally) so that it can meet the 5 s / 60 s response time and the 5 to 500 cd/m² luminance rules during a power failure. Photoluminescent materials are reliant on prior light exposure and decay over time; they cannot guarantee 5 cd/m² at the end of a 3 h emergency duration in a deeply windowless interior.',
              },
              {
                question:
                  'What about exit signs in stair cores — do they need different treatment?',
                answer:
                  'Stair cores benefit from down-arrow / up-arrow modifier pictograms below the running-man pictogram, indicating that the route involves descent / ascent. ISO 7010 includes specific pictograms for stairs (running man with stairs). The d = s × p formula applies as normal; in tall stair cores, sign size may need to step up because the sight-line distance from one floor to the next is longer than a flat horizontal corridor. Maintained signs are common in stair cores because they are often unfamiliar even to building occupants who use lifts daily.',
              },
              {
                question:
                  'How does sign placement interact with the building strategy for compartmentation and refuge?',
                answer:
                  'Where the building has refuges (areas of relative safety for mobility-impaired occupants to wait for assistance, common in multi-storey buildings), the route to the refuge is part of the escape route and must be signed. ISO 7010 includes pictograms for refuge / wheelchair access. Compartmentation lines (fire-rated walls and doors) should be marked with appropriate signage (E001 / E002 for primary route signage; specific refuge signs at refuge entries). The fire strategy document for the building drives this; the lighting designer follows the strategy.',
              },
              {
                question:
                  'Can I retrofit existing legend-only EXIT signs to BS 5266-1:2025 by adding a pictogram below?',
                answer:
                  'Best practice is to replace the entire sign with an ISO 7010 pictogram sign with optional supplementary text. A retrofit pictogram-below-text arrangement is awkward visually and may not meet the safety-colour ≥ 50 % rule. The cost of new signs is modest; replacement at the next refurbishment is the cleanest approach. Where rapid retrofit is needed, replace existing sign housings with ISO 7010 signs of the same external dimensions to minimise rework.',
              },
              {
                question:
                  'What is the IP rating required for a covered-loading-bay external sign?',
                answer:
                  'IP65 is the BS 5266-1:2025 minimum for normally-exposed external locations. A covered loading bay is external (subject to wind-driven rain even with a roof) and IP65 applies. Some manufacturers offer IP66 or IP67 for additional margin; not required by the standard but cheap insurance for exposed coastal or industrial environments. Inside the building proper (e.g. internal lobbies fully enclosed), IP20 is acceptable for non-wet environments.',
              },
              {
                question:
                  'How do I record sign luminance for the design and installation record?',
                answer:
                  'Record at commissioning: sign-by-sign luminance readings (min, max, ratio across safety colour area) using a calibrated luminance meter. Tabulate by sign location reference. Include the meter calibration certificate as an appendix. Cross-reference each sign to the floor plan in the design and installation record (BS 5266-1:2025 §13). The record is signed by the competent designer and retained by the responsible person.',
              },
              {
                question:
                  'Do I need separate signage for occasional visitors vs regular building users?',
                answer:
                  'No — the signage is provided to the same standard for all occupants. Where the population is mixed (e.g. office building with public reception), the worst-case (unfamiliar occupants) drives the design — maintained signs throughout. Designers do not zone signage by occupant familiarity; they zone by area access and worst-case occupant type. The whole reception area uses maintained, the staff-only back-of-house could use non-maintained but in practice many designers default everything to maintained for design simplicity.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Emergency exit signs — Module 2.5" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/emergency-lighting-module-2-section-4')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                2.4 Escape route lighting design
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/emergency-lighting-module-2-section-6')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.6 Testing and record keeping
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

export default EmergencyLightingModule2Section5;
