/**
 * Module 7 · Section 3 · Subsection 1 — Lighting Fundamentals
 * HNC Electrical Engineering for Building Services (Power and Lighting Systems)
 *   Photometric quantities, luminous efficacy, colour temperature, and colour rendering for building services lighting design
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  ConceptBlock,
  CommonMistake,
  LearningOutcomes,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Lighting Fundamentals - HNC Module 7 Section 3.1';
const DESCRIPTION =
  'Master lighting fundamentals for building services: luminous flux, illuminance, luminance, luminous efficacy, colour temperature (CCT), and colour rendering index (CRI/Ra).';

const quickCheckQuestions = [
  {
    id: 'luminous-flux',
    question: 'What is the SI unit of luminous flux?',
    options: [
      'Watt (W)',
      'Lumen (lm)',
      'Lux (lx)',
      'Candela (cd)',
    ],
    correctIndex: 1,
    explanation:
      'Luminous flux is measured in lumens (lm). It represents the total quantity of visible light emitted by a source in all directions, weighted according to human eye sensitivity.',
  },
  {
    id: 'illuminance-definition',
    question: 'Illuminance is defined as:',
    options: [
      'Luminous flux incident per unit area',
      'Power consumed per lumen output',
      'Light emitted per unit solid angle',
      'Light reflected from a surface',
    ],
    correctIndex: 0,
    explanation:
      'Illuminance (E) is the luminous flux incident on a surface per unit area, measured in lux (lx). One lux equals one lumen per square metre (lm/m²).',
  },
  {
    id: 'colour-temperature',
    question: 'A light source with a correlated colour temperature (CCT) of 2700K would appear:',
    options: [
      'Cool white/bluish',
      'Neutral white',
      'Warm white/yellowish',
      'Daylight',
    ],
    correctIndex: 2,
    explanation:
      'Lower colour temperatures (2700-3000K) produce warm white light with a yellowish appearance. Higher temperatures (5000-6500K) produce cool white to daylight appearance.',
  },
  {
    id: 'cri-meaning',
    question: 'A CRI (Ra) value of 95 indicates:',
    options: [
      'High luminous efficacy',
      'Excellent colour rendering',
      'Poor colour rendering',
      'High colour temperature',
    ],
    correctIndex: 1,
    explanation:
      'CRI (Colour Rendering Index) ranges from 0-100, with higher values indicating better colour rendering. Ra &gt; 90 is considered excellent, accurately revealing object colours compared to natural light.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which photometric quantity describes the intensity of light in a particular direction?',
    options: [
      'Luminous flux (lm)',
      'Luminous intensity (cd)',
      'Illuminance (lx)',
      'Luminance (cd/m²)',
    ],
    correctAnswer: 1,
    explanation:
      'Luminous intensity (I) measured in candelas (cd) describes the quantity of light emitted in a specific direction per unit solid angle. One candela equals one lumen per steradian.',
  },
  {
    id: 2,
    question: 'What is the relationship between illuminance and distance from a point source?',
    options: [
      'Directly proportional to the distance from the source',
      'Inversely proportional to the distance from the source',
      'Inversely proportional to the square of distance',
      'Independent of the distance from the source',
    ],
    correctAnswer: 2,
    explanation:
      'The inverse square law states that illuminance is inversely proportional to the square of the distance from the source: E = I/d². Doubling the distance reduces illuminance to one quarter.',
  },
  {
    id: 3,
    question:
      'An LED luminaire consumes 40W and produces 4,400 lumens. What is its luminous efficacy?',
    options: [
      '40 lm/W',
      '0.009 lm/W',
      '4,400 lm/W',
      '110 lm/W',
    ],
    correctAnswer: 3,
    explanation:
      'Luminous efficacy = luminous flux ÷ power = 4,400 lm ÷ 40 W = 110 lm/W. This is typical for modern LED luminaires and significantly higher than traditional incandescent lamps (~15 lm/W).',
  },
  {
    id: 4,
    question: 'Luminance differs from illuminance in that luminance:',
    options: [
      'Describes how bright a surface appears to an observer',
      'Measures the luminous flux falling on a surface per unit area',
      'Is the total light output of a source in all directions',
      'Is the light intensity emitted in a single direction',
    ],
    correctAnswer: 0,
    explanation:
      "Luminance (cd/m²) describes the brightness of a surface as perceived by an observer. It depends on both the illuminance falling on the surface and the surface's reflective properties.",
  },
  {
    id: 5,
    question:
      'Which colour temperature would be most appropriate for a hospital operating theatre?',
    options: [
      '3000K (warm white)',
      '5000K or higher (daylight)',
      '2700K (warm white)',
      '4000K (neutral white)',
    ],
    correctAnswer: 1,
    explanation:
      'Operating theatres require high CCT (5000K+) for accurate tissue colour discrimination during surgery. This daylight-equivalent light ensures surgeons can clearly distinguish between tissue types.',
  },
  {
    id: 6,
    question:
      "The luminous efficacy of a theoretical 'perfect' light source producing only light at 555nm would be:",
    options: [
      '100 lm/W',
      '250 lm/W',
      '683 lm/W',
      '1000 lm/W',
    ],
    correctAnswer: 2,
    explanation:
      'The maximum theoretical luminous efficacy is 683 lm/W, achieved at 555nm (green-yellow) where the human eye is most sensitive. Real sources are always lower due to spectral distribution.',
  },
  {
    id: 7,
    question:
      'For retail applications displaying fresh food, which CRI value would be considered acceptable?',
    options: [
      'Ra &gt; 60',
      'Ra &gt; 70',
      'Ra &gt; 80',
      'Ra &gt; 90',
    ],
    correctAnswer: 3,
    explanation:
      'Retail food displays typically require Ra &gt; 90 for accurate colour rendering, ensuring meat appears red, vegetables appear vibrant, and customers perceive food as fresh and appetising.',
  },
  {
    id: 8,
    question: 'What is a steradian?',
    options: [
      'A unit of solid angle in three-dimensional space',
      'A unit of luminous flux equal to one lumen',
      'A unit of illuminance equal to one lux',
      'A unit of plane angle equal to one radian',
    ],
    correctAnswer: 0,
    explanation:
      'A steradian (sr) is the SI unit of solid angle in 3D space. A sphere contains 4π steradians. Luminous intensity uses steradians: 1 cd = 1 lm/sr.',
  },
  {
    id: 9,
    question:
      'If a surface receives 500 lux of illuminance and has a reflectance of 0.8, what is the exitance?',
    options: [
      '500 lm/m²',
      '400 lm/m²',
      '625 lm/m²',
      '4000 lm/m²',
    ],
    correctAnswer: 1,
    explanation:
      'Exitance (M) is the luminous flux leaving a surface per unit area. M = E × ρ = 500 lx × 0.8 = 400 lm/m². The remaining 100 lm/m² is absorbed by the surface.',
  },
  {
    id: 10,
    question: 'The R9 value in extended CRI metrics specifically measures:',
    options: [
      'Overall colour rendering',
      'Skin tone rendering',
      'Red colour rendering',
      'Green colour rendering',
    ],
    correctAnswer: 2,
    explanation:
      'R9 specifically measures the rendering of saturated red colours. Standard Ra averages R1-R8 only. R9 is critical for applications like retail, healthcare, and anywhere red discrimination matters.',
  },
  {
    id: 11,
    question: 'What luminous efficacy would you expect from a modern T5 fluorescent lamp?',
    options: [
      '10-20 lm/W',
      '40-60 lm/W',
      '150-200 lm/W',
      '90-105 lm/W',
    ],
    correctAnswer: 3,
    explanation:
      'Modern T5 fluorescent lamps achieve approximately 90-105 lm/W. This is higher than older T8/T12 tubes but now surpassed by LED technology which can exceed 150 lm/W.',
  },
  {
    id: 12,
    question: 'In the CIE 1931 chromaticity diagram, the Planckian locus represents:',
    options: [
      'Colours of ideal black body radiators at different temperatures',
      'The boundary of colours visible to the human eye',
      'The range of colours a display can reproduce',
      'The line of equal luminous efficacy across wavelengths',
    ],
    correctAnswer: 0,
    explanation:
      'The Planckian locus traces the chromaticity coordinates of an ideal black body radiator as its temperature increases. It forms the basis for defining colour temperature of light sources.',
  },
];

const faqs = [
  {
    question: 'Why do LEDs have both lumen output and efficacy ratings?',
    answer:
      'Lumen output (lm) tells you the total light produced, while efficacy (lm/W) tells you how efficiently electrical power is converted to light. A 100W LED might produce 15,000 lm at 150 lm/W, while a 50W LED might produce 5,000 lm at 100 lm/W. For energy efficiency comparisons, efficacy is key. For determining if a luminaire provides sufficient light for a space, lumen output matters.',
  },
  {
    question: 'What is the difference between CCT and CRI, and why do both matter?',
    answer:
      'CCT (Correlated Colour Temperature) describes the apparent warmth or coolness of the light itself - whether it appears yellowish (2700K) or bluish (6500K). CRI (Colour Rendering Index) describes how accurately the light reveals the colours of objects compared to a reference illuminant. A lamp can have any CCT with any CRI. For example, you might want 3000K warm light (CCT) with Ra &gt; 90 (CRI) for a restaurant to create ambience while ensuring food looks appetising.',
  },
  {
    question: 'How do I convert between photometric units?',
    answer:
      'Key relationships: Illuminance (lx) = Luminous flux (lm) ÷ Area (m²). For point sources: E = I/d² where I is luminous intensity (cd) and d is distance (m). Luminous efficacy = Lumens ÷ Watts. Luminance depends on surface reflectance: approximately L = E × ρ/π for diffuse surfaces. For a 1000 lm source illuminating 10m², average E = 100 lux (assuming uniform distribution).',
  },
  {
    question: 'Why is Ra limited to R1-R8 and what are extended CRI metrics?',
    answer:
      'The standard CRI (Ra) averages only eight pastel test colour samples (R1-R8), missing saturated colours. This means two light sources could have the same Ra but render reds, blues, or skin tones very differently. Extended metrics include R9-R15 for saturated colours, and newer metrics like TM-30-18 provide Rf (fidelity) and Rg (gamut) scores with detailed colour vector graphics for comprehensive colour rendering assessment.',
  },
  {
    question: 'What colour temperature is best for different applications?',
    answer:
      'Guidelines vary by application: residential/hospitality typically use 2700-3000K for warmth and relaxation; offices often use 4000K neutral white for alertness without appearing clinical; retail depends on merchandise (warm for fashion/furniture, cool for electronics); healthcare uses 4000-5000K in clinical areas, warmer in patient rooms; industrial typically uses 4000-5000K for task visibility. Tuneable white systems allow adjustment throughout the day.',
  },
  {
    question: 'How does surface reflectance affect lighting design?',
    answer:
      'Surface reflectance directly impacts how much light bounces back into the space. A room with light-coloured walls (reflectance 0.7-0.8) requires fewer luminaires than one with dark surfaces (reflectance 0.1-0.2) to achieve the same illuminance on the working plane. The room surface reflectance affects utilisation factor calculations - typically ceiling 0.7, walls 0.5, floor 0.2 are used for design. Inter-reflections can add 10-30% to working plane illuminance.',
  },
];

const HNCModule7Section3_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section3")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 7 · Section 3 · Subsection 1"
            title="Lighting Fundamentals"
            description="Photometric quantities, luminous efficacy, colour temperature, and colour rendering for building services lighting design"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Define and calculate luminous flux, intensity, illuminance, and luminance",
              "Apply the inverse square law to point source calculations",
              "Explain luminous efficacy and compare light source efficiencies",
              "Describe correlated colour temperature and its applications",
              "Interpret CRI values and extended colour rendering metrics",
              "Select appropriate CCT and CRI for different building applications",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Photometric Quantities">
            <p>Photometry is the science of measuring visible light as perceived by the human eye. Unlike radiometry which measures total electromagnetic radiation, photometry weights measurements according to the spectral sensitivity of human vision, defined by the CIE photopic luminosity function V(λ).</p>
            <p><strong>The Four Core Photometric Quantities:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Luminous flux:</strong> Φ (phi) — Lumen (lm) — Total visible light emitted by a source</li>
              <li><strong>Luminous intensity:</strong> I — Candela (cd) — Flux per unit solid angle (cd = lm/sr)</li>
              <li><strong>Illuminance:</strong> E — Lux (lx) — Flux incident per unit area (lx = lm/m²)</li>
              <li><strong>Luminance:</strong> L — cd/m² — Intensity per unit projected area</li>
            </ul>
            <p><strong>Understanding the Lumen</strong></p>
            <p>The lumen is derived from the candela: a source of 1 cd intensity emitting uniformly in all directions produces 4π lumens (approximately 12.57 lm). The lumen is weighted by the eye's spectral sensitivity - 1 watt of radiant power at 555nm (green-yellow, peak sensitivity) equals 683 lumens, while 1 watt at other wavelengths produces fewer perceived lumens.</p>
            <p><strong>Typical Illuminance Levels</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Full sunlight:</strong> 100,000 lux</li>
              <li><strong>Overcast day:</strong> 10,000-20,000 lux</li>
              <li><strong>Office workspace:</strong> 300-500 lux</li>
              <li><strong>Corridor/circulation:</strong> 100 lux</li>
              <li><strong>Emergency lighting:</strong> 1 lux minimum on escape routes</li>
            </ul>
            <p><strong>Key distinction:</strong> Illuminance measures light arriving at a surface; luminance measures light leaving a surface (either emitted or reflected) and represents what we actually perceive as brightness.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Inverse Square Law and Illuminance Calculations">
            <p>The inverse square law is fundamental to understanding how light diminishes with distance. For a point source, illuminance decreases proportionally to the square of the distance from the source, as light spreads over an increasingly larger area.</p>
            <p><strong>Inverse Square Law</strong></p>
            <p>E = I / d²</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>E = illuminance (lux)</li>
              <li>I = luminous intensity (candela)</li>
              <li>d = distance from source (metres)</li>
            </ul>
            <p><strong>Cosine Law (Oblique Incidence)</strong></p>
            <p>E = (I × cos θ) / d²</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>θ = angle of incidence</li>
              <li>Accounts for non-perpendicular light</li>
              <li>Maximum E when θ = 0°</li>
            </ul>
            <p><strong>Distance Effects on Illuminance</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1 m:</strong> 100% — 1000 lux</li>
              <li><strong>2 m:</strong> 25% — 250 lux</li>
              <li><strong>3 m:</strong> 11% — 111 lux</li>
              <li><strong>4 m:</strong> 6.25% — 62.5 lux</li>
            </ul>
            <p><strong>Practical Application</strong></p>
            <p>The inverse square law applies strictly to point sources. For linear sources (fluorescent tubes), illuminance decreases linearly with distance when close, transitioning to inverse square behaviour at distances greater than approximately five times the source length. For large area sources, illuminance remains relatively constant until distance exceeds the source dimensions.</p>
            <p><strong>Design implication:</strong> Mounting height significantly impacts illuminance and uniformity. Higher mounting spreads light more evenly but reduces peak illuminance, requiring more luminaires.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Luminous Efficacy">
            <p>Luminous efficacy (η) measures how efficiently a light source converts electrical power into visible light. Expressed in lumens per watt (lm/W), it is the key metric for comparing the energy efficiency of different lamp technologies and is fundamental to sustainable lighting design.</p>
            <p><strong>Luminous Efficacy Formula</strong></p>
            <p>η = Φ / P</p>
            <p>Where Φ = luminous flux (lumens) and P = input power (watts). The theoretical maximum for monochromatic light at 555nm is 683 lm/W. White light sources achieve lower values because they emit across the visible spectrum, including wavelengths where the eye is less sensitive.</p>
            <p><strong>Efficacy Comparison by Lamp Type</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Incandescent (phased out):</strong> 10-17 — 1,000</li>
              <li><strong>Halogen:</strong> 15-25 — 2,000-4,000</li>
              <li><strong>Compact fluorescent (CFL):</strong> 50-70 — 8,000-15,000</li>
              <li><strong>T5 fluorescent:</strong> 90-105 — 20,000-30,000</li>
              <li><strong>LED (current):</strong> 100-200 — 50,000-100,000</li>
              <li><strong>High-pressure sodium:</strong> 80-140 — 16,000-24,000</li>
            </ul>
            <p><strong>Luminaire Efficacy vs Lamp Efficacy</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Lamp efficacy:</strong> Light output from bare lamp</li>
              <li><strong>Luminaire efficacy:</strong> Light from complete fitting</li>
              <li>Includes optical losses (reflector, diffuser)</li>
              <li>Includes driver/ballast losses</li>
              <li>LOR (Light Output Ratio) = Φluminaire / Φlamp</li>
            </ul>
            <p><strong>Factors Affecting Efficacy</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Operating temperature:</strong> LEDs lose efficacy when hot</li>
              <li><strong>Dimming:</strong> Can improve or reduce efficacy</li>
              <li><strong>Driver efficiency:</strong> Typically 85-95%</li>
              <li><strong>Lumen depreciation:</strong> Reduces over lifetime</li>
            </ul>
            <p><strong>Energy perspective:</strong> Replacing 60W incandescent lamps (900 lm) with 8W LEDs (900 lm) achieves 87% energy reduction while maintaining the same light output.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Colour Temperature and Colour Rendering">
            <p>The colour appearance of light and its ability to accurately reveal object colours are critical considerations in lighting design. Correlated Colour Temperature (CCT) describes the apparent warmth or coolness of light, while the Colour Rendering Index (CRI) measures how faithfully colours are reproduced compared to a reference illuminant.</p>
            <p><strong>Correlated Colour Temperature (CCT)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>2700-3000K:</strong> Warm white (yellowish) — Residential, hospitality, restaurants</li>
              <li><strong>3500-4000K:</strong> Neutral white — Offices, retail, commercial</li>
              <li><strong>5000-5700K:</strong> Daylight — Industrial, healthcare, task lighting</li>
              <li><strong>6500K+:</strong> Cool daylight (bluish) — Photography, inspection, display</li>
            </ul>
            <p><strong>Understanding CCT</strong></p>
            <p>CCT is expressed in Kelvin (K) and relates to the temperature of an ideal black body radiator that would produce light of similar colour. Counter-intuitively, lower temperatures appear warmer (more yellow/orange) while higher temperatures appear cooler (more blue). This matches heated metal: red-hot is cooler than white-hot. The term "correlated" acknowledges that most light sources don't exactly match black body radiation but approximate its colour appearance.</p>
            <p><strong>Colour Rendering Index (CRI/Ra)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Definition:</strong> Measure of colour fidelity compared to reference illuminant</li>
              <li><strong>Scale:</strong> 0-100, where 100 is perfect rendering</li>
              <li><strong>Ra (average):</strong> Mean of R1-R8 test colour samples</li>
              <li><strong>Reference:</strong> Incandescent below 5000K; daylight above 5000K</li>
            </ul>
            <p><strong>CRI Requirements by Application</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Ra &gt; 90:</strong> Excellent — Retail, galleries, healthcare, food display</li>
              <li><strong>Ra 80-90:</strong> Good — Offices, education, general commercial</li>
              <li><strong>Ra 60-80:</strong> Moderate — Industrial, warehouses, car parks</li>
              <li><strong>Ra &lt; 60:</strong> Poor — Security lighting only (HPS)</li>
            </ul>
            <p><strong>Extended CRI Values (R9-R15)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>R9:</strong> Saturated red - critical for retail/healthcare</li>
              <li><strong>R13:</strong> Skin tone (Caucasian reference)</li>
              <li><strong>R15:</strong> Skin tone (Asian reference)</li>
              <li>Standard Ra ignores saturated colours</li>
            </ul>
            <p><strong>TM-30-18 (Modern Alternative)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Rf:</strong> Fidelity index (like CRI, 0-100)</li>
              <li><strong>Rg:</strong> Gamut index (saturation, 60-140)</li>
              <li>Uses 99 colour samples</li>
              <li>Colour vector graphics show shifts</li>
            </ul>
            <p><strong>Design consideration:</strong> CCT and CRI are independent. A 3000K lamp can have poor or excellent CRI. Always specify both parameters when colour quality matters.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Illuminance Calculation</strong>
            </p>
            <p><strong>Problem:</strong> A spotlight has a luminous intensity of 2500 cd in the downward direction. Calculate the illuminance on a horizontal surface directly below at distances of 2m and 4m.</p>
            <p>Using E = I / d²</p>
            <p>At 2m distance:</p>
            <p>E = 2500 / 2² = 2500 / 4 = 625 lux</p>
            <p>At 4m distance:</p>
            <p>E = 2500 / 4² = 2500 / 16 = 156.25 lux</p>
            <p>Note: Doubling distance reduces illuminance to 1/4</p>
            <p>
              <strong>Example 2: Luminous Efficacy Comparison</strong>
            </p>
            <p><strong>Problem:</strong> Compare the energy consumption of lighting a space with 60W incandescent lamps versus LED equivalents, both producing 800 lumens.</p>
            <p>Incandescent: η = 800 lm / 60 W = 13.3 lm/W</p>
            <p>LED (modern): η = 800 lm / 8 W = 100 lm/W</p>
            <p>Power saving per lamp: 60 - 8 = 52 W</p>
            <p>Percentage saving: (52/60) × 100 = 86.7%</p>
            <p>For 100 lamps operating 3000 hours/year:</p>
            <p>Incandescent: 100 × 60W × 3000h = 18,000 kWh</p>
            <p>LED: 100 × 8W × 3000h = 2,400 kWh</p>
            <p>Annual saving: 15,600 kWh</p>
            <p>
              <strong>Example 3: CCT and CRI Selection</strong>
            </p>
            <p><strong>Scenario:</strong> Specify CCT and CRI for a supermarket with different zones.</p>
            <p>Zone requirements:</p>
            <p>Fresh meat/fish counter:</p>
            <p>CCT: 3000K (enhances warm colours)</p>
            <p>CRI: Ra &gt; 90, R9 &gt; 50 (accurate red rendering)</p>
            <p>Bakery section:</p>
            <p>CCT: 2700-3000K (warm, inviting)</p>
            <p>CRI: Ra &gt; 90 (enhance golden tones)</p>
            <p>General aisles:</p>
            <p>CCT: 4000K (neutral, good visibility)</p>
            <p>CRI: Ra &gt; 80 (acceptable general rendering)</p>
            <p>Fresh produce:</p>
            <p>CCT: 4000-5000K (enhance greens)</p>
            <p>CRI: Ra &gt; 90 (vibrant vegetable colours)</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Key Formulae Summary:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Illuminance:</strong> E = Φ / A (lux = lm/m²)</li>
              <li><strong>Inverse square law:</strong> E = I / d² (point sources)</li>
              <li><strong>Luminous efficacy:</strong> η = Φ / P (lm/W)</li>
              <li><strong>Exitance:</strong> M = E × ρ (reflected flux density)</li>
              <li><strong>Solid angle:</strong> Total sphere = 4π steradians</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Maximum theoretical efficacy: <strong>683 lm/W</strong> at 555nm</li>
              <li>Modern LED efficacy: <strong>100-200 lm/W</strong></li>
              <li>Warm white CCT: <strong>2700-3000K</strong></li>
              <li>Neutral white CCT: <strong>4000K</strong></li>
              <li>Good colour rendering: <strong>Ra &gt; 80</strong></li>
              <li>Excellent colour rendering: <strong>Ra &gt; 90</strong></li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Confusing illuminance and luminance:</strong> Illuminance is incident light; luminance is perceived brightness</li>
                <li><strong>Ignoring CCT psychology:</strong> Warm light feels comfortable but cool light promotes alertness</li>
                <li><strong>Specifying CRI without R9:</strong> Standard Ra misses saturated red performance</li>
                <li><strong>Comparing lamp vs luminaire efficacy:</strong> Always compare like with like</li>
              </ul>
            }
            doInstead="Cross-check assumptions against published guidance, validate measured values against design intent, and engage the wider team early when interface issues emerge."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section3")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Lighting design calculations
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section3-2")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Lumen method calculations
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule7Section3_1;
