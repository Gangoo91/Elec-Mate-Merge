/**
 * Module 2 · Section 5 · Subsection 1 — Solar Radiation
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   Solar geometry, irradiance, direct and diffuse components — the input data
 *   for every solar gain, overheating-risk and PV yield calculation on a UK
 *   building services project.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  LearningOutcomes,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Solar Radiation - HNC Module 2 Section 5.1';
const DESCRIPTION =
  'Understanding solar geometry, altitude and azimuth angles, irradiance measurements, direct and diffuse radiation, and solar gains in building design.';

const quickCheckQuestions = [
  {
    id: 'solar-constant',
    question:
      "What is the approximate value of the solar constant (irradiance outside Earth's atmosphere)?",
    options: ['500 W/m²', '1000 W/m²', '1367 W/m²', '2000 W/m²'],
    correctIndex: 2,
    explanation:
      "The solar constant is approximately 1367 W/m², representing the solar irradiance on a surface perpendicular to the sun's rays at the mean Earth-Sun distance, outside the atmosphere.",
  },
  {
    id: 'solar-altitude',
    question:
      'At solar noon in summer in the UK (latitude 52°N), approximately what is the maximum solar altitude?',
    options: ['38°', '52°', '61.5°', '90°'],
    correctIndex: 2,
    explanation:
      'Maximum altitude = 90° - latitude + declination. At summer solstice: 90° - 52° + 23.5° = 61.5°. The sun is never directly overhead in the UK.',
  },
  {
    id: 'diffuse-radiation',
    question:
      'What percentage of total radiation on a heavily overcast day in the UK is typically diffuse?',
    options: ['10-20%', '30-40%', '50-60%', 'Nearly 100%'],
    correctIndex: 3,
    explanation:
      'On heavily overcast days, nearly all solar radiation reaching the ground is diffuse (scattered by clouds). Direct beam radiation is effectively zero under complete cloud cover.',
  },
  {
    id: 'glazing-shgc',
    question:
      'A window with SHGC (Solar Heat Gain Coefficient) of 0.4 and area 3m² receives 500 W/m² irradiance. What is the solar heat gain?',
    options: ['200W', '400W', '600W', '1500W'],
    correctIndex: 2,
    explanation:
      'Solar heat gain = Irradiance × Area × SHGC = 500 × 3 × 0.4 = 600W. The SHGC represents the fraction of incident solar energy that enters as heat.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the solar azimuth angle?',
    options: [
      'The angle between the sun and the horizon',
      "The horizontal angle measured clockwise from north to the sun's position",
      'The angle of incidence on a tilted surface',
      'The declination of the sun from the celestial equator',
    ],
    correctAnswer: 1,
    explanation:
      'Solar azimuth is the horizontal angle measured clockwise from true north to the point on the horizon directly below the sun. It indicates the compass direction of the sun.',
  },
  {
    id: 2,
    question: 'What causes the variation in solar declination throughout the year?',
    options: [
      'The elliptical orbit of Earth around the Sun',
      "The tilt of Earth's axis at 23.5° to the orbital plane",
      'Atmospheric absorption variations',
      'Changes in the solar constant',
    ],
    correctAnswer: 1,
    explanation:
      "The 23.5° tilt of Earth's axis relative to its orbital plane causes the sun's declination to vary from +23.5° (summer solstice) to -23.5° (winter solstice), creating seasons.",
  },
  {
    id: 3,
    question:
      'What is the typical peak solar irradiance on a horizontal surface in the UK on a clear summer day?',
    options: ['400-500 W/m²', '600-700 W/m²', '800-900 W/m²', '1000-1100 W/m²'],
    correctAnswer: 2,
    explanation:
      'UK peak horizontal irradiance on clear summer days is typically 800-900 W/m². This is less than the solar constant due to atmospheric absorption and the sun not being directly overhead.',
  },
  {
    id: 4,
    question:
      'For a south-facing vertical window in the UK, when does maximum solar gain typically occur?',
    options: ['Summer midday', 'Winter midday', 'Spring/autumn equinox', 'Summer morning/evening'],
    correctAnswer: 1,
    explanation:
      'South-facing vertical surfaces receive maximum direct radiation when the sun is low in winter. In summer, the high sun angle means less radiation strikes vertical surfaces directly.',
  },
  {
    id: 5,
    question: "What is the 'air mass' (AM) value at solar noon when the sun is at 30° altitude?",
    options: ['AM 1.0', 'AM 1.5', 'AM 2.0', 'AM 3.0'],
    correctAnswer: 2,
    explanation:
      'Air mass = 1/sin(altitude) = 1/sin(30°) = 1/0.5 = 2.0. This means solar radiation passes through twice the atmosphere compared to when the sun is directly overhead (AM 1.0).',
  },
  {
    id: 6,
    question: 'Which factor does NOT affect the solar heat gain through a window?',
    options: [
      'Solar Heat Gain Coefficient (SHGC)',
      'Glass U-value',
      'Angle of incidence',
      'External shading devices',
    ],
    correctAnswer: 1,
    explanation:
      'U-value relates to conductive heat transfer (temperature difference driven), not solar heat gain. SHGC, incidence angle, and shading directly affect how much solar radiation enters as heat.',
  },
  {
    id: 7,
    question:
      'What is the typical annual solar irradiation (kWh/m²) on a south-facing surface tilted at latitude angle in southern UK?',
    options: [
      '500-700 kWh/m²/year',
      '900-1100 kWh/m²/year',
      '1200-1400 kWh/m²/year',
      '1500-1700 kWh/m²/year',
    ],
    correctAnswer: 1,
    explanation:
      'Southern UK receives approximately 900-1100 kWh/m²/year on optimally tilted south-facing surfaces. This is important for PV and solar thermal system sizing.',
  },
  {
    id: 8,
    question: 'The CIBSE solar cooling load calculation uses which primary dataset?',
    options: [
      'Actual weather data from nearest station',
      'Design Summer Year (DSY) data',
      'Test Reference Year (TRY) data',
      'Solar radiation tables based on clear sky models',
    ],
    correctAnswer: 3,
    explanation:
      'CIBSE Guide A provides solar radiation tables based on clear sky models for cooling load calculations. TRY and DSY data are used for dynamic thermal simulation.',
  },
  {
    id: 9,
    question:
      'What percentage of incident solar radiation on clear single glazing is typically transmitted?',
    options: ['50-55%', '65-70%', '80-85%', '90-95%'],
    correctAnswer: 2,
    explanation:
      'Clear single glazing transmits approximately 80-85% of incident solar radiation at normal incidence. The remainder is reflected (8-10%) and absorbed (5-10%).',
  },
  {
    id: 10,
    question:
      'Why does diffuse radiation have a significant heating effect even on north-facing facades?',
    options: [
      'It has higher energy content than direct radiation',
      'It comes from all directions in the sky hemisphere',
      'It is not attenuated by the atmosphere',
      'It penetrates glass more easily',
    ],
    correctAnswer: 1,
    explanation:
      "Diffuse radiation arrives from the entire sky dome, not just the sun's direction. Even north-facing surfaces receive diffuse radiation from the sky hemisphere, contributing to solar gains.",
  },
  {
    id: 11,
    question:
      'What is the typical g-value (total solar energy transmittance) of solar control double glazing?',
    options: ['0.15-0.25', '0.30-0.45', '0.55-0.65', '0.70-0.80'],
    correctAnswer: 1,
    explanation:
      'Solar control glazing typically has g-values of 0.30-0.45, reducing solar heat gain while maintaining reasonable light transmission. Standard double glazing has g-values around 0.70-0.75.',
  },
  {
    id: 12,
    question:
      'At what time does true solar noon occur in London (longitude 0°) during British Summer Time?',
    options: ['11:00', '12:00', '13:00', 'It varies with the equation of time'],
    correctAnswer: 3,
    explanation:
      'True solar noon varies throughout the year due to the equation of time (±16 minutes). During BST, clock noon is already 1 hour ahead, so solar noon is typically around 13:00-13:15.',
  },
];

const faqs = [
  {
    question: 'What is the difference between irradiance and irradiation?',
    answer:
      'Irradiance (W/m²) is the instantaneous rate of solar energy received per unit area - a power measurement. Irradiation (kWh/m² or MJ/m²) is the total solar energy received over a period (hour, day, year) - an energy measurement. Building services uses irradiance for peak load calculations and irradiation for annual energy assessments.',
  },
  {
    question: 'How do I calculate solar gain through windows for cooling load?',
    answer:
      'Solar gain = Irradiance × Glass area × SHGC × Frame factor × Shading factor. Use CIBSE solar irradiance data for the appropriate orientation and month. Apply correction factors for incidence angle if significantly off-normal. For detailed analysis, consider both direct and diffuse components separately.',
  },
  {
    question: 'Why is south-facing glazing preferred for passive solar design in the UK?',
    answer:
      'South-facing vertical glazing receives maximum solar radiation in winter (when heating is needed) because the low winter sun strikes it more directly. In summer, the high sun angle means less direct radiation, reducing overheating risk. East and west facades receive strong radiation at low angles in summer, causing overheating.',
  },
  {
    question: 'What is the equation of time and why does it matter?',
    answer:
      "The equation of time is the difference between true solar time and mean solar time, varying by ±16 minutes throughout the year. It matters for accurate solar calculations because the sun's position at clock noon varies. It results from Earth's elliptical orbit and axial tilt.",
  },
  {
    question: 'How does atmospheric air mass affect solar radiation?',
    answer:
      'Air mass (AM) represents the path length through the atmosphere relative to vertical. At AM 2.0 (sun at 30° altitude), radiation passes through twice the atmosphere, reducing intensity through absorption and scattering. This is why evening sun feels weaker - longer atmospheric path means more attenuation.',
  },
  {
    question: 'What solar data should I use for overheating assessments?',
    answer:
      'For overheating risk assessment under Part O or TM52/TM59, use CIBSE Design Summer Year (DSY) weather files which represent moderately warm summers. For extreme heat events, DSY2 (2003 event) or DSY3 are used. These differ from TRY files used for energy calculations.',
  },
];

const HNCModule2Section5_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 2 · Section 5 · Subsection 1"
            title="Solar Radiation"
            description="Understanding solar geometry, irradiance, and solar heat gains for building thermal design."
            tone="purple"
          />

          <TLDR
            points={[
              'You compute solar altitude (β) and azimuth (γs) for the project site (latitude, declination, hour angle) and use them to project beam irradiance onto any surface.',
              'You separate global horizontal irradiance into direct beam (Ib) and diffuse (Id) components — the raw inputs for cooling-load and overheating risk modelling.',
              'You read CIBSE Guide A solar irradiance tables for UK design days and apply them in TM52/TM59 overheating studies.',
              'You translate solar geometry into facade orientation, glazing g-value and shading device decisions during early-stage design.',
            ]}
          />

          <RegsCallout
            source="CIBSE Guide A — Environmental Design (Solar Data)"
            clause="Recommended UK design solar irradiance values (W/m²) on horizontal, vertical and inclined surfaces, by latitude, month and orientation, for use in cooling load and overheating-risk calculations."
            meaning={
              <>
                CIBSE Guide A is the canonical UK source for design irradiance. As HNC
                engineer you cite it on the load schedule so the architect, BREEAM assessor
                and PV/solar-thermal sub-contractor are all working from the same numbers.
              </>
            }
            cite="Source: CIBSE Guide A — Environmental Design (latest edition); CIBSE TM52 Limits of Thermal Comfort; CIBSE TM59 Design Methodology for Overheating in Homes."
          />

          <LearningOutcomes
            outcomes={[
              'Calculate solar altitude and azimuth for any location and time',
              'Distinguish between direct beam and diffuse solar radiation',
              'Apply irradiance data for different surface orientations',
              'Calculate solar heat gains through glazed elements',
              'Use CIBSE solar data for cooling load calculations',
              'Understand factors affecting solar energy reaching buildings',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="Solar Geometry - Position of the Sun"
            plainEnglish="Where the sun sits in the sky at any moment is set by two angles - altitude (how high) and azimuth (which direction). Get these right and you can predict solar gain on any surface."
          >
            <p>
              Understanding where the sun is in the sky at any given time is fundamental to
              calculating solar heat gains. The sun's position is defined by two angles measured
              from any point on Earth.
            </p>
            <p>
              <strong>Key solar angles:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Solar altitude (α):</strong> Vertical angle between the sun and the horizon
                (0° = horizon, 90° = overhead)
              </li>
              <li>
                <strong>Solar azimuth (γ):</strong> Horizontal angle measured clockwise from true
                north (0° = north, 90° = east, 180° = south)
              </li>
              <li>
                <strong>Declination (δ):</strong> Angle between sun's rays and equatorial plane
                (varies -23.5° to +23.5° annually)
              </li>
              <li>
                <strong>Hour angle (ω):</strong> Angular displacement of sun from solar noon (15°
                per hour)
              </li>
            </ul>
            <p>
              <strong>Solar Altitude at Different Times (London, 51.5°N):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>21 June (Summer): noon altitude 62°, sunrise/sunset 04:43 / 21:21, day length 16h 38m</li>
              <li>21 March/Sept (Equinox): noon altitude 38.5°, sunrise/sunset 06:00 / 18:00, day length 12h 00m</li>
              <li>21 December (Winter): noon altitude 15°, sunrise/sunset 08:04 / 15:53, day length 7h 49m</li>
            </ul>
            <p>
              <strong>Altitude calculation:</strong> sin(α) = sin(φ)sin(δ) + cos(φ)cos(δ)cos(ω). Where
              φ = latitude, δ = declination, ω = hour angle. At solar noon (ω = 0): α = 90° - φ + δ.
            </p>
            <p>
              <strong>UK context:</strong> The sun never reaches directly overhead (90° altitude) in
              the UK. Maximum altitude varies from ~62° in summer to ~15° in winter at London's
              latitude.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock
            title="Irradiance - Measuring Solar Energy"
            plainEnglish="Irradiance is the power of sunshine landing on a surface right now (W/m²). Split it into direct beam, diffuse, and ground-reflected and you can size cooling, PV, or solar thermal accurately."
          >
            <p>
              Irradiance is the instantaneous solar power received per unit area, measured in watts
              per square metre (W/m²). Understanding irradiance components is essential for accurate
              cooling load and renewable energy calculations.
            </p>
            <p>
              <strong>Components of solar radiation:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Direct beam (Ib):</strong> Radiation arriving directly from the sun's disc
                in parallel rays
              </li>
              <li>
                <strong>Diffuse (Id):</strong> Radiation scattered by atmosphere, clouds, arriving
                from all sky directions
              </li>
              <li>
                <strong>Ground reflected:</strong> Radiation reflected from surrounding surfaces
                (albedo effect)
              </li>
              <li>
                <strong>Global (I):</strong> Total radiation = Direct + Diffuse + Ground reflected
              </li>
            </ul>
            <p>
              <strong>Typical UK irradiance values:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Clear summer noon: 800-900 W/m² horizontal</li>
              <li>Overcast summer: 100-300 W/m²</li>
              <li>Clear winter noon: 200-400 W/m²</li>
              <li>Overcast winter: 50-100 W/m²</li>
            </ul>
            <p>
              <strong>Diffuse fraction:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Clear sky: 10-20% diffuse</li>
              <li>Partly cloudy: 30-50% diffuse</li>
              <li>Overcast: 90-100% diffuse</li>
              <li>UK annual average: ~55% diffuse</li>
            </ul>
            <p>
              <strong>Annual solar irradiation by region (horizontal surface):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>South England: 1000-1100 kWh/m² annual, 6-7 kWh/m² summer peak day</li>
              <li>Midlands: 900-1000 kWh/m² annual, 5.5-6.5 kWh/m² summer peak day</li>
              <li>Scotland: 800-950 kWh/m² annual, 5-6 kWh/m² summer peak day</li>
            </ul>
            <p>
              <strong>Design note:</strong> UK has high diffuse fraction compared to Mediterranean
              climates. This means north-facing glazing still receives significant radiation from
              the sky dome.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock
            title="Direct and Diffuse Radiation Behaviour"
            plainEnglish="Direct radiation comes from the sun's disc - sharp shadows, strong cosine law. Diffuse comes from the whole sky - no shadows, much harder to shade out. Get the split wrong and your shading design fails."
          >
            <p>
              Direct and diffuse radiation behave differently on building surfaces. Understanding
              this distinction is crucial for accurate cooling load calculations and appropriate
              shading design.
            </p>
            <p>
              <strong>Characteristics comparison (direct beam vs diffuse):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Direction:</strong> Direct - from sun's disc only; Diffuse - from all sky directions
              </li>
              <li>
                <strong>Shading effectiveness:</strong> Direct - highly effective; Diffuse - limited effect
              </li>
              <li>
                <strong>Incidence angle effect:</strong> Direct - strong cosine relationship; Diffuse - minimal angle dependence
              </li>
              <li>
                <strong>Weather dependence:</strong> Direct - zero when overcast; Diffuse - always present (daylight)
              </li>
              <li>
                <strong>Shadow formation:</strong> Direct - creates sharp shadows; Diffuse - no shadows
              </li>
            </ul>
            <p>
              <strong>Irradiance on tilted surface:</strong> I_surface = I_bn × cos(θ) + I_d × F_sky + I_g × ρ × F_ground.
              Where θ = angle of incidence, F = view factors, ρ = ground reflectance (albedo).
            </p>
            <p>
              <strong>Orientation effects (UK):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>South vertical:</strong> Peak in winter, less in summer
              </li>
              <li>
                <strong>East/West vertical:</strong> Strong summer AM/PM peaks
              </li>
              <li>
                <strong>North vertical:</strong> Diffuse only, relatively constant
              </li>
              <li>
                <strong>Horizontal:</strong> Maximum in summer at noon
              </li>
            </ul>
            <p>
              <strong>Air mass effect:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>AM 1.0: Sun directly overhead (0° zenith)</li>
              <li>AM 1.5: Standard test condition (48° altitude)</li>
              <li>AM 2.0: 30° altitude (UK winter noon)</li>
              <li>Higher AM = more atmospheric absorption</li>
            </ul>
            <p>
              <strong>Shading design:</strong> External shading is highly effective against direct
              radiation but has limited impact on diffuse gains. For overheating control, consider
              glazing g-values alongside shading.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock
            title="Solar Gains Through Glazing"
            plainEnglish="Solar gain through windows usually drives summer cooling loads. Multiply irradiance × area × g-value × frame × shading and you've got the watts heading inside."
          >
            <p>
              Solar gains through windows often dominate summer cooling loads in commercial
              buildings. Understanding the factors affecting solar heat gain is essential for HVAC
              sizing and overheating prevention.
            </p>
            <p>
              <strong>Solar heat gain calculation:</strong> Q_solar = I × A × SHGC × F_frame × F_shading.
              Where I = irradiance, A = glass area, SHGC = solar heat gain coefficient.
            </p>
            <p>
              <strong>Key glazing properties:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>SHGC (g-value):</strong> Fraction of incident solar energy entering as heat (0 to 1)
              </li>
              <li>
                <strong>Light transmittance (τv):</strong> Visible light transmission through glass
              </li>
              <li>
                <strong>Selectivity:</strong> Ratio of light to solar transmittance (τv/g) - higher is better
              </li>
              <li>
                <strong>Shading coefficient (SC):</strong> Older term, SC = SHGC/0.87
              </li>
            </ul>
            <p>
              <strong>Typical glazing performance (g-value / light transmittance / U-value):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Single clear: 0.85 / 0.90 / 5.7</li>
              <li>Double clear: 0.75 / 0.81 / 2.8</li>
              <li>Double Low-E (argon): 0.63 / 0.76 / 1.4</li>
              <li>Solar control double: 0.35-0.45 / 0.50-0.70 / 1.3-1.6</li>
              <li>Triple glazed: 0.50 / 0.70 / 0.8</li>
            </ul>
            <p>
              <strong>Shading factors:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>External louvres: 0.10-0.20</li>
              <li>External awning: 0.25-0.40</li>
              <li>Mid-pane blind: 0.40-0.60</li>
              <li>Internal blind (white): 0.45-0.65</li>
              <li>Internal blind (dark): 0.80-0.95</li>
            </ul>
            <p>
              <strong>Frame factor adjustment:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Aluminium frame: 0.75-0.80</li>
              <li>Timber frame: 0.70-0.75</li>
              <li>uPVC frame: 0.70-0.80</li>
              <li>Curtain walling: 0.60-0.85</li>
            </ul>
            <p>
              <strong>Part O consideration:</strong> Building Regulations Part O limits solar gains
              to prevent overheating. Maximum g-value limits apply to residential glazing based on
              orientation and area.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock
            title="Worked examples"
            plainEnglish="Four numerical walk-throughs covering solar altitude, peak window gain, the impact of external shading, and PV sizing using annual irradiation."
          >
            <p>
              <strong>Example 1 - Solar altitude calculation:</strong> Calculate the solar altitude
              at solar noon on 21st June in Birmingham (latitude 52.5°N).
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>At solar noon, altitude = 90° - latitude + declination</li>
              <li>Declination on 21st June = +23.5°</li>
              <li>α = 90° - 52.5° + 23.5° = <strong>61°</strong></li>
              <li>The sun reaches maximum altitude of 61° above the southern horizon</li>
            </ul>
            <p>
              <strong>Example 2 - Peak solar gain through window:</strong> A south-facing office has
              20m² of solar control glazing (g-value 0.40, frame factor 0.75). Peak irradiance on
              the facade is 450 W/m². Calculate the solar heat gain.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Solar gain = Irradiance × Area × g-value × Frame factor</li>
              <li>Q = 450 W/m² × 20m² × 0.40 × 0.75</li>
              <li>Q = <strong>2700W = 2.7kW</strong></li>
              <li>This is the instantaneous peak solar gain requiring cooling</li>
            </ul>
            <p>
              <strong>Example 3 - Effect of external shading:</strong> The same window (Example 2)
              has external louvres installed with shading factor 0.15. What is the new solar gain?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Shaded solar gain = Unshaded gain × Shading factor</li>
              <li>Q = 2700W × 0.15 = <strong>405W</strong></li>
              <li>Reduction = 2700 - 405 = 2295W (85% reduction)</li>
              <li>External shading is highly effective at blocking direct solar gains</li>
            </ul>
            <p>
              <strong>Example 4 - Annual irradiation for PV sizing:</strong> A roof-mounted PV
              array in London faces south at 35° tilt. Annual irradiation is 1050 kWh/m². What
              energy yield can 20m² of panels (18% efficiency) produce?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Annual energy = Irradiation × Area × Efficiency × Performance ratio</li>
              <li>Assume performance ratio = 0.80 (typical)</li>
              <li>E = 1050 × 20 × 0.18 × 0.80</li>
              <li>E = <strong>3024 kWh/year</strong></li>
              <li>Equivalent to ~3600W peak system (20m² × 180W/m²)</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Practical guidance"
            plainEnglish="The handful of formulas and standard values you'll actually pull off the page in design."
          >
            <p>
              <strong>Essential formulas:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Solar altitude at noon:</strong> α = 90° - φ + δ
              </li>
              <li>
                <strong>Air mass:</strong> AM = 1 / sin(α)
              </li>
              <li>
                <strong>Solar gain:</strong> Q = I × A × SHGC × Fframe × Fshade
              </li>
              <li>
                <strong>Direct on surface:</strong> Isurf = Ibn × cos(θ)
              </li>
            </ul>
            <p>
              <strong>Key values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Solar constant: <strong>1367 W/m²</strong> (outside atmosphere)
              </li>
              <li>
                UK peak irradiance: <strong>800-900 W/m²</strong> (clear summer)
              </li>
              <li>
                UK annual irradiation: <strong>900-1100 kWh/m²</strong> (tilted south)
              </li>
              <li>
                Summer noon altitude (London): <strong>62°</strong>
              </li>
              <li>
                Winter noon altitude (London): <strong>15°</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Forgetting diffuse:</strong> Even shaded surfaces receive diffuse radiation
                </li>
                <li>
                  <strong>Wrong orientation:</strong> South-facing vertical gets more in winter than summer
                </li>
                <li>
                  <strong>Ignoring frame:</strong> Frame factor reduces effective glass area 15-30%
                </li>
                <li>
                  <strong>Clock vs solar time:</strong> BST means solar noon is ~13:00, not 12:00
                </li>
              </ul>
            }
            doInstead="Always include a diffuse component even on shaded surfaces, check seasonal behaviour for vertical glazing, apply a realistic frame factor (15-30% reduction), and convert clock time to solar time before plotting altitude/azimuth."
          />

          <SectionRule />

          <Scenario
            title="Solar gain study for a south-facing glazed atrium"
            situation={
              <>
                A new mixed-use scheme has a 6-storey south-facing glass atrium (480 m²
                glazing, double-glazed g = 0.65). Early-stage cooling load is provisional;
                the architect is pushing back on external brise-soleil for aesthetic
                reasons. You need to quantify the no-shading penalty.
              </>
            }
            whatToDo={
              <>
                Pick July 21 12:00 noon as the design moment. Look up CIBSE Guide A direct
                and diffuse irradiance for vertical south-facing glazing at the site
                latitude (~51 °N). Compute solar gain Q = A × g × (Ib + Id). Repeat for
                09:00 and 15:00 to capture the daily peak. Compare against the with-shading
                case (brise-soleil reducing direct beam by ~70%). Quote the cooling-coil
                upsize required to handle the no-shade case.
              </>
            }
            whyItMatters={
              <>
                Solar gain on a south facade can easily exceed the entire occupant + IT
                load. A no-shade decision driven by aesthetics costs the project a larger
                chiller, fatter ductwork, more electrical infrastructure and a worse EPC.
                CIBSE-grounded numbers turn the conversation from style preference into
                cost trade-off.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Solar altitude β and azimuth γs fix the sun&rsquo;s position; both are functions of latitude, declination and hour angle.',
              'Solar declination δ varies sinusoidally between +23.45° (summer solstice) and -23.45° (winter solstice).',
              'Global irradiance G = Ib + Id (direct beam + diffuse).',
              'Solar constant ≈ 1361 W/m² at top of atmosphere; surface peak ≈ 1000 W/m² on a clear day.',
              'Surface irradiance Iθ = Ib × cos θ where θ = angle of incidence on the surface.',
              'Vertical south-facing glazing receives most winter sun in the northern hemisphere.',
              'Solar gain through glass Q = A × g-value × incident irradiance — driver of summer overheating.',
              'CIBSE Guide A and TM52/TM59 are the UK reference standards for solar data and overheating assessment.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Environmental physics in buildings
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section5-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Heat gains and losses
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule2Section5_1;
