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
    id: 'elm3-s3-mounth',
    question: 'Typical mounting height for emergency luminaires on escape routes is...?',
    options: [
      '0.5 m above floor.',
      '2 to 3 m above floor — gives reasonable spread of light, keeps luminaires above head height to avoid direct glare into the field of view, and fits standard ceiling heights. Higher mounting (3 m and above) increases luminaire spacing but reduces lux at floor; lower mounting (below 2 m) creates glare and is impractical except as bulkhead luminaires above doors.',
      '5 to 6 m above floor.',
      '10 m above floor.',
    ],
    correctIndex: 1,
    explanation:
      'BS 5266-1:2025 references the 2 to 3 m mounting band for typical escape routes. Manufacturer photometric data is published for standard mounting heights in this range. Mounting outside the band requires bespoke calculation and verification.',
  },
  {
    id: 'elm3-s3-reflectance',
    question: 'Surface reflectances assumed in BS EN 1838:2024 emergency lighting calculations are...?',
    options: [
      '0% (zero) — emergency lighting design is to direct illuminance only; light bouncing off walls, ceiling and floor is NOT counted toward the duty. Worst-case assumption protects against dirt, repainting, soft furnishings absorbing light.',
      '70% ceiling, 50% wall, 20% floor (typical office values).',
      '50% all surfaces.',
      '100% mirror surfaces.',
    ],
    correctIndex: 0,
    explanation:
      'BS EN 1838:2024 requires emergency illumination calculations on a 0% reflectance basis — direct light only. The contribution from reflected light is not counted because over the life of the installation, surfaces darken with dirt, walls are repainted, soft furnishings are added or moved. Designing to direct lux is the conservative approach the standard mandates.',
  },
  {
    id: 'elm3-s3-spacingtoheight',
    question: 'Spacing-to-height ratio (S/h) in luminaire layout is...?',
    options: [
      'A relevance only to large industrial spaces.',
      'The ratio of luminaire spacing along the escape route (S) to mounting height above the floor (h). A manufacturer publishes maximum S/h for each photometric distribution; exceeding it produces dim spots between luminaires. For typical escape route luminaires at 2.5 m mounting, S/h around 1.5 to 2.0 gives 1 lx with reasonable margin; very wide distributions allow up to 3.0.',
      'A measurement of luminaire weight.',
      'Always exactly 1:1.',
    ],
    correctIndex: 1,
    explanation:
      'S/h is the working tool for layout. Manufacturers publish maximum S/h tables for each luminaire / distribution combination at standard mounting heights. The designer reads off the maximum and lays out at or below it. Exceeding the published S/h is the most common cause of dim spots between luminaires.',
  },
  {
    id: 'elm3-s3-ldties',
    question: 'LDT and IES files are...?',
    options: [
      'Spreadsheet formats.',
      'Standardised photometric data file formats. LDT (also known as Eulumdat) is the European format; IES is the North American (LM-63) format. Each describes the luminaire light output as a polar / three-dimensional intensity distribution, used by lighting calculation software (Dialux, Relux, AGi32) to compute illuminance at any point on a target plane. Manufacturers publish LDT/IES files for every luminaire model / variant.',
      'Project management tools.',
      'Wiring diagram formats.',
    ],
    correctIndex: 1,
    explanation:
      'LDT (Eulumdat) is the European photometric file format; IES (LM-63) is the North American equivalent. Both describe luminous intensity distribution. Software imports the file and calculates illuminance from luminaire position + orientation + room geometry. Without LDT/IES data the software cannot calculate; designers verify the manufacturer publishes the file before specifying a luminaire.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Typical escape-route mounting height per BS 5266-1:2025 references is...?',
    options: [
      '0.5 m above floor.',
      '2 to 3 m above floor — manufacturer photometric data is published for this range and the lux calculations assume this band.',
      '5 m above floor.',
      'No standard.',
    ],
    correctAnswer: 1,
    explanation:
      'The 2 to 3 m mounting band is standard for escape-route luminaires. Higher mounting widens spacing but lowers floor lux; lower mounting causes glare. Mountings outside this band need bespoke verification.',
  },
  {
    id: 2,
    question: 'Surface reflectance assumption in BS EN 1838:2024 emergency lighting calculations is...?',
    options: [
      '70% ceiling, 50% wall, 20% floor.',
      '0% — direct illuminance only; reflected light is not counted toward the emergency duty.',
      '50% all surfaces.',
      '100%.',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 1838:2024 requires emergency illumination to be calculated against direct light only. Reflectance contributes nothing to the certified value. The reasoning: reflectance varies with maintenance, repainting, dirt, soft furnishings — designing against zero reflectance is the conservative assumption.',
  },
  {
    id: 3,
    question: 'What does spacing-to-height ratio (S/h) define?',
    options: [
      'The wattage of the luminaire.',
      'The ratio of luminaire spacing (S) along the route to mounting height (h) above floor — a manufacturer-published maximum that limits how far apart luminaires can be while still meeting the photometric duty.',
      'The colour temperature.',
      'The luminaire body length.',
    ],
    correctAnswer: 1,
    explanation:
      'S/h is the layout sizing tool. Manufacturers publish maximum S/h for each luminaire / distribution at standard mounting heights. Designers read the max and lay out at or below it. Exceeding S/h causes dim regions between luminaires.',
  },
  {
    id: 4,
    question: 'Photometric distribution types referenced in some manufacturer tools (BR-A, BR-B, BR-C, BR-D) describe...?',
    options: [
      'Different battery chemistries.',
      'Categories of beam shape — typically narrow (BR-A) through to very wide / asymmetric (BR-D), used to match a luminaire to the route geometry. Narrow beams suit high mountings or focused tasks; wide beams suit low mountings and corridor coverage.',
      'Mounting bracket variants.',
      'Power supply ratings.',
    ],
    correctAnswer: 1,
    explanation:
      'BR-A through BR-D (or similar manufacturer-specific naming) describe beam categories. Some tools categorise as narrow / medium / wide / asymmetric. The category drives the maximum S/h at each mounting height; selecting the wrong distribution wastes light and produces non-compliant layouts.',
  },
  {
    id: 5,
    question: 'LDT files are...?',
    options: [
      'CAD files.',
      'Standardised photometric data files (Eulumdat format) describing luminaire intensity distribution; used by lighting design software to calculate illuminance at any point.',
      'Manufacturer pricing files.',
      'Test certificates.',
    ],
    correctAnswer: 1,
    explanation:
      'LDT (Eulumdat) is the European standard photometric data format. IES (LM-63) is the North American equivalent. Both describe how the luminaire emits light; design software uses them to compute lux at any target point.',
  },
  {
    id: 6,
    question: 'Why does BS EN 1838:2024 require zero-reflectance calculation?',
    options: [
      'Convention.',
      'Surface reflectance varies and degrades over time — repainting, dirt, soft furnishings, fabric notice boards, mounted artwork all change the reflectance environment. Designing against zero reflectance ensures the emergency duty is met regardless of decoration changes over the installation life. The standard requires the conservative assumption.',
      'Reflective paint is banned.',
      'For aesthetic reasons.',
    ],
    correctAnswer: 1,
    explanation:
      'Zero reflectance is a long-life design assumption. Real-world surfaces darken with dirt over years, may be repainted to a darker scheme, and soft furnishings absorb light. The 0% basis means the design works regardless of what happens to the surfaces.',
  },
  {
    id: 7,
    question: 'A luminaire mounted at 4 m has a published max S/h of 1.8. Maximum spacing along the route is...?',
    options: [
      '4 m.',
      '7.2 m — calculated as S = (S/h) × h = 1.8 × 4 m = 7.2 m. Beyond this the lux drops below 1 lx between luminaires.',
      '10 m.',
      '1.8 m.',
    ],
    correctAnswer: 1,
    explanation:
      'S = (S/h) × h. The ratio multiplied by the mounting height gives the maximum spacing. Designers can space at or below this; exceeding causes failure of the photometric duty between luminaires.',
  },
  {
    id: 8,
    question: 'Why are higher mounting heights generally accompanied by wider spacing AND lower at-floor lux?',
    options: [
      'Coincidence.',
      'Inverse-square law and beam geometry — a luminaire at twice the height illuminates a spot at one-quarter the lux (assuming similar optic) but covers approximately twice the radius at the same fraction of peak. Designers can space wider but the lux at any point is lower; net effect is fewer luminaires for the same coverage but more critical photometric calculation.',
      'Manufacturer policy.',
      'It is the opposite.',
    ],
    correctAnswer: 1,
    explanation:
      'The inverse-square law governs point illuminance from a source. Higher mounting reduces lux at floor as the square of distance; the wider spread compensates partially through coverage. Manufacturer S/h tables capture this trade-off.',
  },
  {
    id: 9,
    question: 'For a 30 m corridor with luminaires at 2.5 m mounting and a published max S/h of 2.0, the design must place at least...?',
    options: [
      '1 luminaire.',
      '7 luminaires — calculated as max spacing 5.0 m (2.0 × 2.5), corridor length 30 m, so 30 / 5 = 6 spacings between luminaires which means 7 luminaires (positions at 0, 5, 10, 15, 20, 25 and 30 m). Practical layout would round up for margin.',
      '15 luminaires.',
      '30 luminaires.',
    ],
    correctAnswer: 1,
    explanation:
      'Layout calculation: 30 m / 5 m max spacing = 6 spacings = 7 positions. In practice designers round up for margin and verify with photometric software. The S/h sets the upper bound; designers may go closer if the layout requires.',
  },
  {
    id: 10,
    question: 'Manufacturer photometric data is supplied at...?',
    options: [
      'Theoretical values only.',
      'Tested luminous flux from a representative production luminaire, typically by an independent photometric laboratory, with declared tolerance bands. The LDT/IES file represents the certified output at rated input voltage. Real-world output is subject to tolerance — designers apply maintenance factors to allow for tolerance, lumen depreciation and dirt.',
      'Marketing copy.',
      'Customer reviews.',
    ],
    correctAnswer: 1,
    explanation:
      'Photometric data comes from laboratory testing (goniophotometer measurement) of a representative luminaire. The data is certified at rated input. Designers apply maintenance factor (typically 0.7 to 0.8) to allow for production tolerance, lumen depreciation over life, and dirt accumulation.',
  },
];

const EmergencyLightingModule3Section3 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Mounting heights and photometric considerations | EL Module 3.3 | Elec-Mate',
    description:
      'BS 5266-1:2025 mounting heights, BS EN 1838:2024 zero-reflectance calculation rule, spacing-to-height ratio (S/h), photometric distribution types, LDT and IES file formats — the technical foundation for laying out emergency luminaires.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 3
          </button>

          <PageHero
            eyebrow="Module 3 · Section 3"
            title="Mounting heights and photometric considerations"
            description="The physics behind the layout. Emergency lighting design lives or dies on the photometric calculation — luminaire mounting height, beam distribution, spacing-to-height ratio, and the BS EN 1838 zero-reflectance rule that strips away any reliance on bouncing light. Get the photometrics right and the lux meter passes; get them wrong and no number of luminaires saves the design."
            tone="yellow"
          />

          <TLDR
            points={[
              'Standard mounting band 2 to 3 m above floor — manufacturer photometric data is published for this range; outside the band requires bespoke verification.',
              'BS EN 1838:2024 requires emergency lux calculation against ZERO surface reflectance — direct light only, reflected light NOT counted toward the duty.',
              'Spacing-to-height ratio (S/h) is the working layout tool — manufacturer publishes max S/h per luminaire and distribution; max spacing S = (S/h) × h.',
              'Photometric distribution types — narrow / medium / wide / asymmetric — match the luminaire beam to the route geometry. Wrong distribution wastes light.',
              'LDT (Eulumdat, European) and IES (LM-63, North American) are the photometric data file formats lighting design software uses.',
              'Maintenance factor (typically 0.7 to 0.8) is applied to manufacturer values to allow for production tolerance, lumen depreciation and dirt over life.',
              'Inverse-square law: doubling mounting height reduces at-floor lux to one-quarter while widening coverage radius — the trade-off captured in S/h tables.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply the standard 2 to 3 m mounting band for escape-route luminaires and identify when bespoke calculation is required outside it',
              'Apply the BS EN 1838:2024 zero-reflectance rule to emergency lighting calculations',
              'Use spacing-to-height ratio (S/h) to set maximum luminaire spacing along an escape route',
              'Select photometric distribution type appropriate to route geometry (narrow / wide / asymmetric)',
              'Read and apply LDT and IES photometric data files in design software',
              'Apply a maintenance factor to manufacturer-published initial values to derive end-of-life design lux',
              'Diagnose dim-spot and over-spec failure modes from S/h, distribution and reflectance errors',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Mounting heights — the standard band</ContentEyebrow>

          <ConceptBlock
            title="Why 2 to 3 m for typical escape-route luminaires"
            plainEnglish="The standard mounting band of 2 to 3 m above floor balances three factors: glare avoidance, photometric coverage, and standard ceiling heights. Below 2 m, the luminaire is at or near eye level and direct beam glare hampers vision. Above 3 m, beam spread widens but at-floor lux drops as the inverse square of distance and the manufacturer-published S/h tables degrade. 2 to 3 m is the sweet spot where most escape-route luminaires are tested, certified and published."
            onSite="Higher than 3 m and you need to verify photometrically; lower than 2 m and you need to consider glare. Outside the band is a design exception, not the default. Standard ceiling heights (2.4 to 2.7 m suspended; 2.7 to 3.0 m exposed slab) usually drop a luminaire into the band without thinking about it."
          >
            <p>The mounting bands and what they suit:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>1.8 to 2.2 m — bulkhead.</strong> Wall-mounted bulkhead luminaires above
                doorways, in lobbies, on stair landings. Below standard ceiling and just above
                door head height. Used where the geometry suits — narrow corridors, immediate
                door illumination, exit signage with integrated luminaire.
              </li>
              <li>
                <strong>2.4 to 2.8 m — standard ceiling.</strong> Most office, retail, education,
                healthcare ceilings. Recessed downlighters, ceiling-mounted modular emergency
                luminaires, integrated emergency-and-general lighting. The bulk of the market.
              </li>
              <li>
                <strong>2.8 to 3.5 m — high standard ceiling.</strong> Atria, retail anchor
                stores, gymnasium-type spaces. Manufacturer photometric data is typically
                published for these heights. Wider spacing achievable but more critical to S/h.
              </li>
              <li>
                <strong>3.5 to 6 m — high bay.</strong> Industrial, warehouse, large retail.
                High-bay luminaires with narrow / focused beams. Bespoke photometric calculation
                with the manufacturer's specific high-bay model — generic luminaires designed for
                3 m mounting do not scale up.
              </li>
              <li>
                <strong>Above 6 m — specialist.</strong> High-bay industrial, atrium, distribution
                centre. Photometric design becomes specialist; multiple luminaires per area, point
                photometric calculation rather than rule-of-thumb S/h. Verification on site is
                essential because manufacturer S/h tables typically stop around 6 m.
              </li>
            </ul>
            <p>
              Mounting at the lower end of the band (around 2.0 to 2.4 m) places the luminaire
              close to the user and increases the lux at floor; mounting at the upper end widens
              coverage but drops the lux. For the same luminaire and the same nominal 1 lx target,
              the lower mounting needs more luminaires (closer spacing); the higher mounting
              needs fewer but each provides less margin. Designers choose for the specific
              geometry and verify with photometric software.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · §6.2 (Luminaire mounting)"
            clause={
              <>
                Luminaires shall be mounted at heights compatible with the manufacturer's published
                photometric data and shall provide direct illumination to the area being lit.
                Where mounting heights fall outside the range for which photometric data is
                published, bespoke calculation shall be performed and verified by point-by-point
                measurement at commissioning.
              </>
            }
            meaning="Stay within manufacturer-published heights or do bespoke calculation. The standard does not prescribe a fixed mounting band; it requires consistency with photometric data and verification when outside it."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The zero-reflectance rule</ContentEyebrow>

          <ConceptBlock
            title="Direct light only — why BS EN 1838:2024 is uncompromising"
            plainEnglish="In normal lighting design, reflectance from ceilings, walls and floors contributes typically 20 to 40 percent of the lux at the working plane. A 70% ceiling, 50% wall, 20% floor (a typical office scheme) gives the bouncing-light contribution that lighting designers count toward the work-plane illuminance. BS EN 1838:2024 explicitly EXCLUDES this contribution from emergency-lighting calculations. The lux delivered to the floor must come from direct illumination only. Reflected light contributes zero — the calculation assumes 0% reflectance on every surface."
          >
            <p>The reasons:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Reflectance varies over installation life.</strong> A pristine
                white-painted office ceiling at install gives 80% reflectance; ten years on,
                grimed and yellowed by age, may give 60%. Walls repainted in fashionable dark
                tones drop from 50% to 15%. Soft furnishings, fabric notice boards, mounted
                artwork all absorb light.
              </li>
              <li>
                <strong>Decorations change without electrical involvement.</strong> The dutyholder
                does not consult the emergency lighting designer when changing wall colour or
                replacing carpet. The emergency duty must survive arbitrary decoration changes.
              </li>
              <li>
                <strong>Smoke absorbs light.</strong> In the actual incident emergency lighting
                must work for, smoke is in the air. Reflected light reduces sharply in smoke;
                direct light penetrates better. Designing against direct light only matches the
                worst-case operating environment.
              </li>
              <li>
                <strong>Verification simplicity.</strong> A direct-light-only calculation can be
                verified by physical measurement at commissioning — point the lux meter, read
                the value. A reflected-light calculation is harder to verify because the
                reflectance environment at commissioning may not match the calculation
                assumption.
              </li>
            </ul>
            <p>
              The practical effect: emergency lighting designs typically need MORE luminaires
              than a comparable normal-lighting design. A scheme that gives 100 lx normal at the
              working plane (with reflectance contribution) might need to be designed for
              200 lx direct (reflectance excluded) to deliver the same work-plane illuminance —
              that is exactly what the EN 1838 zero-reflectance rule means for emergency lux
              numbers.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 1838:2024 · §5.2 (Calculation method)"
            clause={
              <>
                Calculations of escape-route, anti-panic and high-risk task area illumination
                shall be performed assuming surface reflectances of zero. The contribution of
                indirect (reflected) illumination shall not be counted toward the minimum
                illuminance values specified in this standard.
              </>
            }
            meaning="Direct light only. Reflectance contributes zero. Designs that look generous when reflectance is included can fail when stripped back to direct-only — the calculation must be done correctly from the start."
          />

          <SectionRule />

          <ContentEyebrow>Spacing-to-height ratio (S/h)</ContentEyebrow>

          <ConceptBlock
            title="The working tool for luminaire layout"
            plainEnglish="Spacing-to-height ratio is the working dimensionless number that tells the designer how far apart luminaires can be while still meeting the photometric duty. It is the spacing along the escape route (S, in metres) divided by the mounting height above floor (h, in metres). Each luminaire / photometric distribution combination has a maximum S/h published by the manufacturer for standard mounting heights. The designer reads off the maximum and lays out at or below it. Maximum spacing in metres is then S = (S/h) × h."
          >
            <p>How S/h is used:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Look up the published max S/h.</strong> From the luminaire datasheet at
                the chosen mounting height. Typical values: 1.5 to 2.0 for standard escape-route
                luminaires at 2.5 m mounting; up to 3.0 for wide-distribution luminaires
                optimised for corridor coverage.
              </li>
              <li>
                <strong>Calculate max spacing in metres.</strong> S = (S/h) × h. At 2.5 m
                mounting with S/h of 1.8, max spacing is 4.5 m. The first and last luminaires
                are typically half-spaced from the wall (so a 4.5 m spacing through the corridor
                centre with 2.25 m end gaps).
              </li>
              <li>
                <strong>Round down for margin.</strong> Designers commonly use 80 to 90% of the
                max published S/h to allow for tolerance, environmental variation and minor
                positioning errors. A published 1.8 might be designed at 1.5.
              </li>
              <li>
                <strong>Verify photometrically.</strong> The S/h is a guideline; the final
                verification is point-by-point photometric calculation using LDT/IES data in
                Dialux or Relux. S/h gives the rule-of-thumb starting point; software gives the
                evidence.
              </li>
            </ul>
            <p>
              Manufacturer S/h tables typically distinguish between "axial" S/h (along the route)
              and "transverse" S/h (across the route) for asymmetric distributions. A
              forward-throw luminaire might have axial S/h of 3.0 (very wide spacing along the
              corridor) but transverse S/h of only 0.8 (close spacing across the corridor) —
              suiting it to long straight corridors but not to open areas.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Photometric distributions</ContentEyebrow>

          <ConceptBlock
            title="Matching beam shape to route geometry"
            plainEnglish="A photometric distribution describes how the luminaire spreads light. Some luminaires concentrate light directly downward (narrow); some spread sideways (wide); some throw forward in one direction (asymmetric / forward-throw); some illuminate ceiling and surrounding (uplight component). Matching the distribution to the route geometry is fundamental — a narrow downlight in a long corridor produces dim spots between luminaires; a wide-distribution luminaire over a small lobby creates glare and wastes light into the walls."
          >
            <p>The distribution categories and their applications:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Narrow (BR-A / similar).</strong> Beam concentrated within ±15 to 20
                degrees of vertical. Suits high mountings (above 4 m) and focused tasks. Floor
                lux directly below is high; coverage narrow. Used in high-bay industrial settings,
                some focused emergency applications. Poorly suited to corridor escape routes at
                standard mounting heights.
              </li>
              <li>
                <strong>Medium (BR-B / similar).</strong> Beam ±20 to 35 degrees. The general-
                purpose distribution for ceiling-mounted recessed downlighters at standard
                heights. Good balance of floor lux and coverage. The default choice for most
                escape route applications.
              </li>
              <li>
                <strong>Wide (BR-C / similar).</strong> Beam ±35 to 50 degrees. Suits corridors
                where luminaires are spaced widely; gives good corridor coverage with fewer
                luminaires. Lower floor lux directly below than medium distribution; better at
                filling between.
              </li>
              <li>
                <strong>Asymmetric / forward-throw (BR-D / similar).</strong> Beam tilted along
                the route — most light goes forward (in the direction of travel) rather than
                straight down. Suits long straight corridors where the user is moving forward;
                aligns the brightest part of the beam with the line of sight. Direction-of-
                escape friendly.
              </li>
              <li>
                <strong>Bulkhead / wall-mount.</strong> Wall-mounted with a horizontal-throw
                distribution. Suits stair landings, doorways, lobbies. Throws light across the
                floor at low mounting; specifically designed photometric for the geometry.
              </li>
            </ul>
            <p>
              Designers reading manufacturer datasheets see the photometric distribution as a
              polar diagram (the candela distribution in vertical and horizontal planes) and an
              S/h table. Selection is by matching the route to the published distribution; the
              S/h table gives the spacing implications. Wrong distribution choice is one of the
              most common design errors and reveals itself only at point-by-point photometric
              calculation.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>LDT and IES photometric data files</ContentEyebrow>

          <ConceptBlock
            title="The standard data formats for design software"
            plainEnglish="Modern lighting design software (Dialux, Relux, AGi32, others) calculates illuminance at any point in a room from luminaire position, orientation and photometric data. The photometric data is supplied by the manufacturer as a standardised data file. LDT (Eulumdat) is the European format. IES (LM-63) is the North American format. Both describe the luminaire's luminous intensity distribution as a three-dimensional polar table — candela values at every combination of vertical angle and horizontal azimuth."
          >
            <p>What the file contains:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Header information.</strong> Luminaire identifier, manufacturer, type,
                light source, total luminous flux, photometric centre offsets.
              </li>
              <li>
                <strong>Intensity distribution.</strong> Candela values at every vertical angle
                (typically 0 degrees / nadir to 180 degrees / zenith in 5-degree increments) and
                every horizontal azimuth (0 to 360 degrees in 22.5- or 15-degree increments).
                The full 3D distribution.
              </li>
              <li>
                <strong>Reference data.</strong> Light source flux, luminaire power, ballast
                losses, beam efficiency. Used by software to compute energy figures alongside
                illuminance.
              </li>
              <li>
                <strong>Tolerance and test conditions.</strong> Test laboratory, test method
                (typically goniophotometer), tolerance bands. The data is laboratory-tested at
                rated input voltage; real-world output is subject to tolerance.
              </li>
            </ul>
            <p>
              Designers verify that the manufacturer publishes LDT/IES files for the specific
              variant being specified — not just the family. A 12 W LED emergency luminaire and a
              7 W LED emergency luminaire from the same product family have different photometric
              files; using the wrong one produces wrong calculations. Manufacturer downloads
              typically include LDT and IES variants of the same luminaire for designers in
              different markets.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 1838:2024 · §5.3 (Photometric data and calculation)"
            clause={
              <>
                Calculations shall be performed using photometric data in standard format (LDT or
                IES) supplied by the luminaire manufacturer, applied through approved lighting
                calculation software. The calculation shall produce a point-by-point illuminance
                grid at the relevant target plane (floor for horizontal duties; vertical face for
                safety equipment) with the resulting minimum, maximum and uniformity clearly
                identified.
              </>
            }
            meaning="LDT/IES + approved software + point-by-point grid. Hand calculations are not sufficient for compliance evidence on a non-trivial design. The output documents the design lux at every grid point."
          />

          <SectionRule />

          {/* Diagram — mounting heights vs photometric distributions */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Mounting height × photometric distribution — comparison and S/h
            </h4>
            <svg
              viewBox="0 0 880 540"
              className="w-full h-auto"
              role="img"
              aria-label="Comparison diagram showing three luminaires mounted at 2.0 m, 2.5 m and 3.5 m with respective beam cones and lux footprints, plus a separate panel showing narrow medium wide and asymmetric photometric distributions."
            >
              <rect x="0" y="0" width="880" height="46" fill="rgba(251,191,36,0.10)" stroke="#FBBF24" strokeWidth="1.4" />
              <text x="440" y="29" textAnchor="middle" fill="#FBBF24" fontSize="14" fontWeight="bold">
                Mounting height vs floor lux + photometric distribution types
              </text>

              {/* Three mounting heights */}
              {/* Floor line */}
              <line x1="40" y1="380" x2="440" y2="380" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
              <text x="240" y="396" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">floor (target plane)</text>

              {/* 2.0 m luminaire */}
              <circle cx="100" cy="220" r="10" fill="#FBBF24" stroke="#000" strokeWidth="1.4" />
              <text x="100" y="200" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5" fontWeight="bold">2.0 m</text>
              <line x1="100" y1="220" x2="60" y2="380" stroke="rgba(251,191,36,0.4)" strokeWidth="1" strokeDasharray="3,2" />
              <line x1="100" y1="220" x2="140" y2="380" stroke="rgba(251,191,36,0.4)" strokeWidth="1" strokeDasharray="3,2" />
              <line x1="100" y1="220" x2="100" y2="380" stroke="rgba(251,191,36,0.7)" strokeWidth="1.2" />
              <ellipse cx="100" cy="380" rx="40" ry="6" fill="rgba(251,191,36,0.30)" />
              <text x="100" y="412" textAnchor="middle" fill="#FBBF24" fontSize="10" fontWeight="bold">low mount</text>
              <text x="100" y="427" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">high lux ↓ small spread</text>

              {/* 2.5 m luminaire */}
              <circle cx="240" cy="180" r="10" fill="#FBBF24" stroke="#000" strokeWidth="1.4" />
              <text x="240" y="160" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5" fontWeight="bold">2.5 m</text>
              <line x1="240" y1="180" x2="180" y2="380" stroke="rgba(251,191,36,0.4)" strokeWidth="1" strokeDasharray="3,2" />
              <line x1="240" y1="180" x2="300" y2="380" stroke="rgba(251,191,36,0.4)" strokeWidth="1" strokeDasharray="3,2" />
              <line x1="240" y1="180" x2="240" y2="380" stroke="rgba(251,191,36,0.7)" strokeWidth="1.2" />
              <ellipse cx="240" cy="380" rx="60" ry="7" fill="rgba(251,191,36,0.22)" />
              <text x="240" y="412" textAnchor="middle" fill="#FBBF24" fontSize="10" fontWeight="bold">standard</text>
              <text x="240" y="427" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">balanced lux + spread</text>

              {/* 3.5 m luminaire */}
              <circle cx="380" cy="120" r="10" fill="#FBBF24" stroke="#000" strokeWidth="1.4" />
              <text x="380" y="100" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5" fontWeight="bold">3.5 m</text>
              <line x1="380" y1="120" x2="300" y2="380" stroke="rgba(251,191,36,0.4)" strokeWidth="1" strokeDasharray="3,2" />
              <line x1="380" y1="120" x2="460" y2="380" stroke="rgba(251,191,36,0.4)" strokeWidth="1" strokeDasharray="3,2" />
              <line x1="380" y1="120" x2="380" y2="380" stroke="rgba(251,191,36,0.7)" strokeWidth="1.2" />
              <ellipse cx="380" cy="380" rx="80" ry="8" fill="rgba(251,191,36,0.14)" />
              <text x="380" y="412" textAnchor="middle" fill="#FBBF24" fontSize="10" fontWeight="bold">high mount</text>
              <text x="380" y="427" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">lower lux ↓ wider spread</text>

              {/* Inverse-square note */}
              <rect x="40" y="450" width="400" height="60" fill="rgba(168,85,247,0.06)" stroke="rgba(168,85,247,0.5)" strokeWidth="1.2" />
              <text x="240" y="468" textAnchor="middle" fill="#A855F7" fontSize="11" fontWeight="bold">Inverse-square law</text>
              <text x="240" y="484" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5">double the height → quarter the lux at target point</text>
              <text x="240" y="500" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">but coverage radius approximately doubles → S/h captures the trade-off</text>

              {/* Distribution panel */}
              <rect x="480" y="60" width="380" height="450" fill="rgba(34,197,94,0.04)" stroke="rgba(34,197,94,0.5)" strokeWidth="1.2" />
              <text x="670" y="86" textAnchor="middle" fill="#22C55E" fontSize="13" fontWeight="bold">Photometric distributions</text>

              {/* Narrow */}
              <text x="510" y="120" fill="#22C55E" fontSize="11" fontWeight="bold">Narrow (BR-A)</text>
              <line x1="555" y1="135" x2="555" y2="170" stroke="rgba(34,211,238,0.6)" strokeWidth="6" />
              <text x="585" y="155" fill="rgba(255,255,255,0.85)" fontSize="9.5">±15 to 20° beam — high lux directly below, narrow coverage; high-bay only</text>

              {/* Medium */}
              <text x="510" y="200" fill="#22C55E" fontSize="11" fontWeight="bold">Medium (BR-B)</text>
              <polygon points="555,215 540,250 570,250" fill="rgba(34,211,238,0.5)" />
              <text x="585" y="240" fill="rgba(255,255,255,0.85)" fontSize="9.5">±20 to 35° — general purpose, default for ceiling-mount escape routes</text>

              {/* Wide */}
              <text x="510" y="280" fill="#22C55E" fontSize="11" fontWeight="bold">Wide (BR-C)</text>
              <polygon points="555,295 525,335 585,335" fill="rgba(34,211,238,0.4)" />
              <text x="595" y="320" fill="rgba(255,255,255,0.85)" fontSize="9.5">±35 to 50° — corridor coverage, fewer luminaires, lower direct lux</text>

              {/* Asymmetric */}
              <text x="510" y="360" fill="#22C55E" fontSize="11" fontWeight="bold">Asymmetric (BR-D / forward-throw)</text>
              <polygon points="555,375 540,415 600,415 580,395" fill="rgba(34,211,238,0.4)" />
              <text x="610" y="400" fill="rgba(255,255,255,0.85)" fontSize="9.5">tilted along route</text>
              <text x="610" y="414" fill="rgba(255,255,255,0.85)" fontSize="9.5">direction-of-escape friendly</text>

              {/* S/h note */}
              <rect x="495" y="440" width="350" height="60" fill="rgba(251,191,36,0.06)" stroke="rgba(251,191,36,0.5)" strokeWidth="1.2" />
              <text x="670" y="458" textAnchor="middle" fill="#FBBF24" fontSize="11" fontWeight="bold">S/h ratio</text>
              <text x="670" y="474" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5">max spacing S = (S/h) × h — manufacturer publishes per distribution / height</text>
              <text x="670" y="490" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">narrow ≈ 1.0 to 1.5 · medium ≈ 1.5 to 2.0 · wide ≈ 2.0 to 3.0</text>
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

          <ContentEyebrow>Mistakes the photometrics expose</ContentEyebrow>

          <CommonMistake
            title="Calculating with normal-lighting reflectance values"
            whatHappens="Designer uses Dialux to model an emergency lighting layout but leaves the reflectance values at the normal-lighting defaults (70% ceiling, 50% wall, 20% floor). The calculation shows 1.4 lx on the centre line — a comfortable pass. At commissioning, third-party verification re-runs the calculation with 0% reflectance per BS EN 1838:2024 §5.2 and reads 0.7 lx on the centre line — non-compliant. Project requires additional luminaires, rewiring, retesting."
            doInstead="Set reflectance to 0% on every surface BEFORE running the emergency calculation. Most lighting design software has a dedicated 'emergency lighting' calculation mode that does this automatically; using the normal-lighting calculation by mistake is the trap. Verify the calculation report explicitly states 0% reflectance assumptions; if it does not, re-run."
          />

          <CommonMistake
            title="Using a narrow-distribution luminaire on a long corridor"
            whatHappens="Procurement specifies a narrow-distribution emergency downlighter at every 4 m along a 20 m corridor — the luminaire is cheap and the lux directly below is high. Photometric calculation shows 1.4 lx directly under each luminaire, dropping to 0.3 lx midway between. Mid-spans are non-compliant. Designer must either reduce spacing (more luminaires) or change to a wider distribution. Either change is more expensive than getting the distribution right at the start."
            doInstead="Match distribution to geometry. Long straight corridors at standard mounting heights suit medium-to-wide distributions or asymmetric / forward-throw. Narrow distributions are for high-bay or focused-task applications. Read the manufacturer's distribution datasheet before specifying; verify the polar diagram visually matches the route geometry."
          />

          <CommonMistake
            title="Designing at maximum published S/h with no margin"
            whatHappens="Designer reads the manufacturer's max S/h of 2.0 at 2.5 m mounting and lays out luminaires at exactly 5 m centres. Calculation gives 1.05 lx between luminaires — passes by 5%. At commissioning, one luminaire is mounted 50 mm low (wider beam coverage but lower at-floor lux at distance) and another has dirt on the diffuser from construction. The mid-span lux reads 0.92 lx — non-compliant. The 5% margin is consumed by tolerance and the design fails."
            doInstead="Design at 80 to 90% of the published max S/h. The cost of two extra luminaires across a building is small; the cost of a non-compliant commissioning report is large. The S/h published is theoretical at zero tolerance; designers apply margin to account for installation tolerance, dirt, lumen depreciation, and small variations in actual mounting height versus drawing."
          />

          <SectionRule />

          <Scenario
            title="A 30 m corridor at 2.7 m ceiling — which luminaire?"
            situation="Office corridor, 30 m long × 1.8 m wide. Suspended ceiling at 2.7 m. Two final exits, one each end. One change of direction at midpoint (90 degrees, T-junction with secondary corridor). Fire alarm call point at the midpoint. Design 1 lx escape route + 5 lx vertical at MCP."
            whatToDo="Select a medium or asymmetric / forward-throw distribution (corridor geometry, standard mounting). Read manufacturer S/h: typical medium at 2.7 m gives max S/h of 1.8, so max spacing 4.86 m; design at 4.0 m centres for margin. 30 m / 4 m = 7.5 spacings, so 8 luminaire positions (rounding up). Position one near each exit (mandatory §5.5), one at the change of direction (mandatory §5.5), and additional between to meet 4 m spacing. The MCP gets a dedicated wall-washer or sidelight luminaire mounted 1.5 m beside it to give 5 lx vertical on the call-point face. Run point-by-point photometric calculation with 0% reflectance to verify 1 lx full-width along the corridor centre line; verify 5 lx vertical at the MCP face."
            whyItMatters="The S/h tool gives the starting layout (8 positions); the §5.5 mandatory list confirms positional rules (exits, turns); the photometric calculation verifies. A scheme that omits any of these three checks is not evidenced. The MCP vertical lux is a separate calculation that often catches schemes designed only for floor lux."
          />

          <Scenario
            title="A high-bay industrial space at 8 m ceiling — what changes?"
            situation="Production hall, 30 × 20 m, 8 m exposed-roof ceiling. Two escape routes from the production floor to two final exits (one at each long end). Production machinery is 2 m tall in places, creating shadowing on the escape routes."
            whatToDo="Mounting at 8 m is OUT of standard manufacturer escape-route data range. Two options: (a) use specialist high-bay emergency luminaires with published photometric data at the 6 to 10 m band (smaller manufacturer choice but available); (b) mount luminaires lower than ceiling, on suspended hangers or on wall-mounted brackets, to bring them into the standard 2 to 3 m band. Most designers choose option (b) for production environments because the routes are narrow tracks between machinery and lower mounting gives reliable lux. For option (a), photometric calculation must be point-by-point with the specific high-bay luminaire's LDT data, accounting for production machinery shadowing. Verification by physical lux measurement at commissioning is essential — high-bay calculations have larger tolerance because of the long throw."
            whyItMatters="The 2 to 3 m mounting band is the comfort zone where most published photometric data lives. Outside the band, designs need bespoke calculation with specialist data and physical verification. High-bay industrial is the typical exception; designers either work with high-bay-rated luminaires or bring the mounting down."
          />

          <SectionRule />

          <KeyTakeaways
            title="The photometric foundation — to commit to memory"
            points={[
              'Standard mounting band 2 to 3 m for escape-route luminaires; outside the band needs bespoke calculation.',
              'BS EN 1838:2024 requires 0% surface reflectance assumption — direct light only, reflected light not counted.',
              'S/h is the working layout tool. Max spacing S = (S/h) × h. Manufacturer publishes max S/h per distribution and height.',
              'Design at 80 to 90% of published max S/h to allow tolerance, dirt, lumen depreciation.',
              'Photometric distributions: narrow (high-bay), medium (default ceiling), wide (corridor), asymmetric (long corridors, direction-of-escape).',
              'LDT (Eulumdat, European) and IES (LM-63, US) photometric files; Dialux / Relux / AGi32 for calculation.',
              'Apply maintenance factor 0.7 to 0.8 to manufacturer initial values to get end-of-life design lux.',
              'Verify by point-by-point grid in software with 0% reflectance; document min, max, uniformity at every grid point.',
            ]}
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <FAQ
            items={[
              {
                question: 'Can I mount emergency luminaires lower than 2 m if the ceiling forces it?',
                answer:
                  'Yes — bulkhead luminaires at 1.8 to 2.2 m above doorways and on stair landings are common and have manufacturer photometric data published for those heights. The 2 to 3 m range is typical for ceiling-mounted luminaires; bulkhead and wall-mounted variants extend lower. The constraint is matching the mounting to the published photometric data, not a fixed minimum height.',
              },
              {
                question: 'If reflectance is 0% in the calculation, why does the room look lit by emergency luminaires in real life?',
                answer:
                  'It does look lit — the reflected light is real, just not COUNTED toward the BS EN 1838 duty. The 0% reflectance is a calculation rule for compliance, not a physical statement. Reflected light helps the user see the room ambience and provides a margin above the certified value. The standard requires the calculation to show 1 lx without it; the user benefits from it in practice.',
              },
              {
                question: 'How do I know my luminaire has correct LDT/IES data?',
                answer:
                  'Download the file from the manufacturer website, open it in Dialux or Relux, and check the displayed information — luminaire name, total flux, intensity distribution. Compare with the printed datasheet; the file should match. Some manufacturers publish multiple files for the same luminaire (different lamp options, different reflectors); verify you have the file for the specific variant. Files from third-party databases are sometimes outdated; the manufacturer-direct download is authoritative.',
              },
              {
                question: 'My calculation passes at 1.05 lx. Is that enough margin?',
                answer:
                  'No. 1.05 lx is on the edge and consumes the margin needed for installation tolerance, dirt and lumen depreciation. Aim for 1.4 to 1.6 lx in the calculation so the certified value can drop over life and still meet 1 lx. Designs that pass by 5% on paper often fail at first periodic test as luminaires age; designers who allow 40 to 60% margin produce installations that hold compliance through the maintenance interval.',
              },
              {
                question: 'What maintenance factor should I use?',
                answer:
                  'Typical 0.7 to 0.8 for indoor commercial / residential environments with regular cleaning. Lower (0.6 to 0.7) for industrial or dusty environments. The factor accounts for production tolerance (typically ±5%), lumen depreciation over the rated life of the LED (typically 5 to 15% over 5 to 10 years), and dirt accumulation on the optic / diffuser between cleanings. Manufacturer-specific guidance applies; some publish maintenance-factor recommendations per environment type.',
              },
              {
                question: 'Can I mix luminaire types on the same escape route?',
                answer:
                  'Yes, provided each luminaire is verified in the photometric calculation with its own LDT/IES file. Designers commonly mix: standard ceiling-mount in the corridors, bulkhead at the stair head and exit, asymmetric forward-throw on long sections. The calculation handles each correctly. Avoid mixing for aesthetic reasons alone if the photometric does not need it; consistency simplifies maintenance.',
              },
              {
                question: 'My corridor has a beam crossing at the ceiling — does it affect the calculation?',
                answer:
                  'Yes. Architectural features that obstruct the luminaire beam reduce light at the floor below them. Photometric software handles this with 3D room geometry — input the beam as a furniture / obstruction object and the calculation accounts for shadow. Hand calculations using S/h often miss this. For complex ceilings (services, beams, rafters, mezzanines) the 3D photometric calculation is essential.',
              },
              {
                question: 'Does luminaire orientation matter?',
                answer:
                  'For symmetric distributions (typical recessed downlighters) — no, rotation about the vertical axis does not change the floor pattern. For asymmetric / forward-throw distributions — yes, hugely. The luminaire must be installed with the brightest part of the beam aligned with the direction of travel along the route. The drawing must show the orientation arrow; the installer must follow it. Wrong orientation negates the design.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Mounting heights and photometric considerations — Module 3.3" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 3
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-3-section-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.4 Risk-based design adjustments
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

export default EmergencyLightingModule3Section3;
