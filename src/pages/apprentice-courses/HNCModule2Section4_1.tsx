/**
 * Module 2 · Section 4 · Subsection 1 — Light and Vision
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   The electromagnetic spectrum, photopic vs scotopic vision, colour temperature
 *   and CRI — the visual-perception foundation behind every lux-level brief and
 *   every CIBSE LG-compliant lighting scheme.
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

const TITLE = 'Light and Vision - HNC Module 2 Section 4.1';
const DESCRIPTION =
  'Understanding the electromagnetic spectrum, visual perception, colour temperature, CRI, and photopic/scotopic vision for building services lighting design.';

const quickCheckQuestions = [
  {
    id: 'visible-spectrum',
    question: 'What is the approximate wavelength range of visible light?',
    options: [
      '800-1200nm',
      '100-400nm',
      '1000-2000nm',
      '380-780nm',
    ],
    correctIndex: 3,
    explanation:
      'Visible light occupies the 380-780nm wavelength range within the electromagnetic spectrum. Below 380nm is ultraviolet, above 780nm is infrared.',
  },
  {
    id: 'colour-temp-warm',
    question: 'What colour temperature would you specify for a warm, relaxed atmosphere?',
    options: [
      '2700K',
      '5000K',
      '4000K',
      '6500K',
    ],
    correctIndex: 0,
    explanation:
      '2700K provides warm white light with a yellowish appearance, ideal for relaxed environments like restaurants and lounges. Higher values produce cooler, bluer light.',
  },
  {
    id: 'cri-minimum',
    question: 'What is the minimum CRI typically specified for general office lighting?',
    options: [
      '60',
      '70',
      '80',
      '90',
    ],
    correctIndex: 2,
    explanation:
      'CRI 80 (Ra80) is the minimum recommended for most interior applications. Critical colour tasks like printing may require CRI 90+.',
  },
  {
    id: 'scotopic-vision',
    question:
      'Which type of vision predominates in low light levels below approximately 0.01 cd/m²?',
    options: [
      'Chromatic vision',
      'Photopic vision',
      'Scotopic vision',
      'Mesopic vision',
    ],
    correctIndex: 2,
    explanation:
      'Scotopic vision uses rod cells and operates at very low light levels (below 0.01 cd/m²). It provides no colour perception and lower acuity than photopic vision.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is light?',
    options: [
      'Class EN 131 Professional — suitable for trade use',
      'Electromagnetic radiation visible to the human eye',
      'Different types have different instantaneous trip levels',
      'Prove tester, test dead, prove tester',
    ],
    correctAnswer: 1,
    explanation:
      'Light is electromagnetic radiation within the visible spectrum (approximately 380-780nm) that can be detected by the human eye.',
  },
  {
    id: 2,
    question: 'Which part of the eye contains photoreceptor cells responsible for vision?',
    options: [
      'Iris',
      'Cornea',
      'Retina',
      'Lens',
    ],
    correctAnswer: 2,
    explanation:
      'The retina at the back of the eye contains rods and cones - the photoreceptor cells that convert light into electrical signals sent to the brain.',
  },
  {
    id: 3,
    question: 'What is the colour temperature of typical daylight at midday?',
    options: [
      '4000K',
      '2700K',
      '8000K',
      '5500-6500K',
    ],
    correctAnswer: 3,
    explanation:
      "Daylight at midday typically ranges from 5500K to 6500K, appearing as neutral to cool white. This is why 6500K is often called 'daylight' in lamp specifications.",
  },
  {
    id: 4,
    question: 'What does CRI stand for and what does it measure?',
    options: [
      'Colour Rendering Index - ability to reveal colours accurately',
      'Colour Radiation Intensity - brightness of colours',
      'Chromatic Reference Indicator - colour temperature accuracy',
      'Candela Rating Index - luminous intensity',
    ],
    correctAnswer: 0,
    explanation:
      'Colour Rendering Index (CRI or Ra) measures how accurately a light source reveals the true colours of objects compared to a reference source. Maximum value is 100.',
  },
  {
    id: 5,
    question: 'At what light level does vision transition from photopic to mesopic?',
    options: [
      '0.01 cd/m²',
      '3 cd/m²',
      '10 cd/m²',
      '0.001 cd/m²',
    ],
    correctAnswer: 1,
    explanation:
      'Below approximately 3 cd/m², vision begins transitioning from photopic (cone-dominated) to mesopic (mixed rod-cone) vision. Full scotopic vision occurs below 0.01 cd/m².',
  },
  {
    id: 6,
    question: 'Which photoreceptor cells provide colour vision?',
    options: [
      'Rods only',
      'Both rods and cones equally',
      'Cones only',
      'Neither - colour is processed in the brain',
    ],
    correctAnswer: 2,
    explanation:
      'Cones are responsible for colour vision (photopic vision). There are three types sensitive to red, green, and blue wavelengths. Rods provide only monochromatic vision.',
  },
  {
    id: 7,
    question: 'A lamp has a colour temperature of 4000K. How would this typically be described?',
    options: [
      'Warm white',
      'Very warm',
      'Daylight',
      'Cool white/neutral',
    ],
    correctAnswer: 3,
    explanation:
      "4000K is typically described as 'cool white' or 'neutral white'. It provides a balance between warm (2700-3000K) and daylight (5000K+) appearances.",
  },
  {
    id: 8,
    question: 'Why is the S/P ratio important in lighting design?',
    options: [
      'It affects visual performance at mesopic light levels',
      'At all safety signs, changes of level, and intersection points',
      'Ensure power is isolated and use appropriate IP-rated equipment',
      'Identify the correct circuit using drawings/spec',
    ],
    correctAnswer: 0,
    explanation:
      'The Scotopic/Photopic (S/P) ratio indicates how effective a light source is at mesopic light levels. Higher S/P ratios can improve visibility in peripheral vision and low-light areas.',
  },
  {
    id: 9,
    question: 'What is the Purkinje shift?',
    options: [
      'Substitute the substance with a less hazardous alternative',
      'Change in eye sensitivity towards blue at low light levels',
      'Multiple methods: landline, mobile, radio, alarms',
      'Inspection is visual, testing uses instruments',
    ],
    correctAnswer: 1,
    explanation:
      'The Purkinje shift describes how peak eye sensitivity moves from yellow-green (photopic) towards blue-green (scotopic) as light levels decrease, affecting colour perception in low light.',
  },
  {
    id: 10,
    question: 'For critical colour matching tasks, what minimum CRI should be specified?',
    options: [
      'CRI 70',
      'CRI 80',
      'CRI 95+',
      'CRI 90',
    ],
    correctAnswer: 2,
    explanation:
      'Critical colour matching (printing, textiles, paint matching) typically requires CRI 95+ to ensure accurate colour perception. Some applications specify individual R values (R9 for reds).',
  },
  {
    id: 11,
    question: 'What wavelength does the human eye perceive as brightest under photopic conditions?',
    options: [
      '450nm (blue)',
      '507nm (blue-green)',
      '630nm (red)',
      '555nm (yellow-green)',
    ],
    correctAnswer: 3,
    explanation:
      'The photopic luminous efficiency function peaks at 555nm (yellow-green). This is why lumens are weighted towards this wavelength and why yellow-green appears brightest.',
  },
  {
    id: 12,
    question: 'Which CIBSE publication provides guidance on colour in interior lighting?',
    options: [
      'LG7',
      'TM10',
      'LG1',
      'LG3',
    ],
    correctAnswer: 0,
    explanation:
      "CIBSE LG7 'Office Lighting' and other Lighting Guides provide specific guidance on colour rendering and colour temperature for various applications.",
  },
];

const faqs = [
  {
    question: 'Why do colours look different under different light sources?',
    answer:
      'Different light sources have different spectral power distributions - they emit different amounts of each wavelength. If a light source lacks certain wavelengths (like some LEDs lacking red), objects needing those wavelengths to appear their true colour will look dull or shifted. This is why CRI matters - it indicates how complete the spectrum is.',
  },
  {
    question: 'What is the difference between CCT and CRI?',
    answer:
      'CCT (Correlated Colour Temperature in Kelvin) describes the appearance of the light itself - warm (low K) or cool (high K). CRI (Colour Rendering Index) measures how accurately that light reveals colours in objects. A lamp can be warm white (2700K) with poor CRI (colours look wrong) or good CRI (colours look accurate). Both matter in lighting design.',
  },
  {
    question: 'Why do street lights often appear yellow or orange?',
    answer:
      'Traditional sodium street lights (now being replaced by LED) produced nearly monochromatic yellow-orange light around 589nm. This gave poor colour rendering (CRI ~20) but high luminous efficacy. LED replacements typically offer 4000K neutral white with CRI 70+, improving visibility and colour perception.',
  },
  {
    question: 'How does age affect colour perception?',
    answer:
      "The eye's lens yellows with age, absorbing more blue light. This shifts colour perception warmer and reduces sensitivity to blue wavelengths. Older occupants may need higher light levels and benefit from cooler colour temperatures (4000-5000K) to compensate. CIBSE guidance recommends considering this in lighting for older populations.",
  },
  {
    question: 'What is metamerism in lighting?',
    answer:
      'Metamerism occurs when two colours appear identical under one light source but different under another. This is caused by their different spectral reflectance curves interacting with different lamp spectra. It is important in retail, textiles, and any application where colour matching matters between different lighting environments.',
  },
  {
    question: 'Why is 4000K becoming popular for offices?',
    answer:
      '4000K neutral white provides good visual acuity and alertness during working hours while being less harsh than daylight (5000-6500K). It works well with daylight integration and suits a range of tasks. Many modern office specifications now use 4000K as standard, though circadian considerations may favour tuneable white systems.',
  },
];

const HNCModule2Section4_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 2 · Section 4 · Subsection 1"
            title="Light and Vision"
            description="Understanding the electromagnetic spectrum, visual perception, and colour properties essential for building services lighting design."
            tone="purple"
          />

          <TLDR
            points={[
              'You can place visible light (380–780 nm) within the EM spectrum and explain why luminaire spectral output drives both visual comfort and circadian effect.',
              'You select correlated colour temperature (CCT) — 3000 K warm, 4000 K neutral, 5000 K cool — to match end-use, and CRI ≥ 80 (Ra80) for general office work, ≥ 90 for retail and clinical.',
              'You distinguish photopic, mesopic and scotopic vision and apply the relevant V(λ) curve when verifying lux meter readings against design.',
              'You translate visual-perception theory into a CIBSE LG-compliant lighting design brief.',
            ]}
          />

          <RegsCallout
            source="CIBSE/SLL Lighting Guides — LG7 Offices, LG5 Lighting for Education, LG2 Hospitals"
            clause="Recommended maintained illuminance, glare limits (UGR), CCT and CRI values for each task and space type, plus uniformity ratios for the working plane."
            meaning={
              <>
                The CIBSE/SLL Lighting Guides translate visual-perception theory into the
                hard numbers you cite on the lighting schedule. As HNC engineer you reference
                LG7 (offices) when defending a 500 lux maintained design, LG5 in classrooms
                and LG2 in clinical spaces.
              </>
            }
            cite="Source: CIBSE/SLL LG7 Lighting for Offices; SLL Code for Lighting; BS EN 12464-1 Light and lighting — Lighting of work places."
          />

          <LearningOutcomes
            outcomes={[
              'Explain the position of visible light in the electromagnetic spectrum',
              'Describe how the human eye perceives light and colour',
              'Define colour temperature (K) and its application in lighting design',
              'Explain Colour Rendering Index (CRI) and specify appropriate values',
              'Distinguish between photopic, mesopic, and scotopic vision',
              'Apply visual perception principles to building services lighting',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="The Electromagnetic Spectrum"
            plainEnglish="Light is just one slice of the EM spectrum the eye can see. Below it is UV (sunburn, germicidal). Above it is infrared (heat). Lighting design lives in between."
          >
            <p>
              Light is electromagnetic radiation that travels at approximately 3 × 10⁸ m/s in a
              vacuum. The electromagnetic spectrum spans from radio waves (long wavelength, low
              frequency) to gamma rays (short wavelength, high frequency), with visible light
              occupying a narrow band that the human eye can detect.
            </p>
            <p>
              <strong>Key properties of electromagnetic radiation:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Wavelength (λ) measured in nanometres (nm) or micrometres (μm)</li>
              <li>Frequency (f) measured in Hertz (Hz), where c = f × λ</li>
              <li>Energy is proportional to frequency (E = hf)</li>
              <li>Does not require a medium to propagate</li>
            </ul>
            <p>
              <strong>Electromagnetic Spectrum for Building Services:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>UV-C:</strong> 100-280nm — Germicidal lamps, HVAC disinfection
              </li>
              <li>
                <strong>UV-A/B:</strong> 280-400nm — Material degradation, skin hazard
              </li>
              <li>
                <strong>Visible light:</strong> 380-780nm — General and task lighting
              </li>
              <li>
                <strong>Near infrared:</strong> 780nm-3μm — Heat from lamps, solar gain
              </li>
              <li>
                <strong>Far infrared:</strong> 3μm-1mm — Radiant heating, thermal imaging
              </li>
            </ul>
            <p>
              <strong>Visible Spectrum Colours:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Violet:</strong> 380-450nm
              </li>
              <li>
                <strong>Blue:</strong> 450-495nm
              </li>
              <li>
                <strong>Green:</strong> 495-570nm
              </li>
              <li>
                <strong>Yellow:</strong> 570-590nm
              </li>
              <li>
                <strong>Orange:</strong> 590-620nm
              </li>
              <li>
                <strong>Red:</strong> 620-780nm
              </li>
            </ul>
            <p>
              <strong>Remember:</strong> Shorter wavelengths (violet/blue) carry more energy than
              longer wavelengths (red). This affects both visual perception and circadian rhythm
              impacts.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock
            title="Visual Perception and the Human Eye"
            plainEnglish="Eye + brain = vision. Cones do colour and sharp detail in good light. Rods do peripheral and low-light detection. Lighting designers aim at both."
          >
            <p>
              The human visual system consists of the eye (optical system) and the brain (image
              processing). Understanding how we perceive light is fundamental to designing effective
              lighting systems that meet both functional and comfort requirements.
            </p>
            <p>
              <strong>Key structures of the eye:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cornea:</strong> Transparent front surface providing ~70% of focusing power
              </li>
              <li>
                <strong>Iris:</strong> Controls pupil size (2-8mm) to regulate light entry
              </li>
              <li>
                <strong>Lens:</strong> Adjustable focus (accommodation) for different distances
              </li>
              <li>
                <strong>Retina:</strong> Light-sensitive layer containing photoreceptors
              </li>
              <li>
                <strong>Fovea:</strong> Central area of retina with highest acuity
              </li>
            </ul>
            <p>
              <strong>Cone Cells (Photopic Vision):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>~6 million cones concentrated in fovea</li>
              <li>Three types: S (blue), M (green), L (red)</li>
              <li>High acuity, colour perception</li>
              <li>Operate above ~3 cd/m²</li>
              <li>Peak sensitivity at 555nm</li>
            </ul>
            <p>
              <strong>Rod Cells (Scotopic Vision):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>~120 million rods in peripheral retina</li>
              <li>One type only (monochromatic)</li>
              <li>Lower acuity, no colour vision</li>
              <li>Operate below ~0.01 cd/m²</li>
              <li>Peak sensitivity at 507nm</li>
            </ul>
            <p>
              <strong>Adaptation:</strong> The eye adapts to different light levels over time. Dark
              adaptation (entering a dark space) takes 20-30 minutes for full sensitivity. Light
              adaptation (entering bright light) is much faster at 1-2 minutes. Lighting design must
              consider adaptation zones at building entrances.
            </p>
            <p>
              <strong>Design implication:</strong> Transition zones between bright and dark areas
              should provide gradual changes in light level to allow visual adaptation.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Colour Temperature (K) and Colour Rendering (CRI)"
            plainEnglish="CCT = how warm or cool the light looks. CRI = how true the colours look under it. They're separate properties — and you spec both."
          >
            <p>
              Colour temperature and colour rendering are two distinct but related properties of
              light sources. Both significantly impact visual comfort, task performance, and the
              appearance of spaces and objects.
            </p>
            <p>
              <strong>Correlated Colour Temperature (CCT):</strong> CCT describes the colour
              appearance of white light, measured in Kelvin (K). It relates to the colour of light
              emitted by an ideal black body radiator heated to that temperature. Lower values
              appear warm (yellow/orange), higher values appear cool (blue/white).
            </p>
            <p>
              <strong>Colour Temperature Guide:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>2700K — Warm white:</strong> Hospitality, residential, restaurants
              </li>
              <li>
                <strong>3000K — Warm white:</strong> Retail (warm), hotel lobbies
              </li>
              <li>
                <strong>4000K — Neutral/cool white:</strong> Offices, schools, healthcare
              </li>
              <li>
                <strong>5000K — Cool white/daylight:</strong> Industrial, colour matching
              </li>
              <li>
                <strong>6500K — Daylight:</strong> Colour critical tasks, D65 reference
              </li>
            </ul>
            <p>
              <strong>Colour Rendering Index (CRI/Ra):</strong> CRI measures how accurately a light
              source reveals the colours of objects compared to a reference illuminant. It is
              calculated from colour shifts in 8 test colours (R1-R8), with the average giving Ra.
              Extended CRI (Re) uses 14 colours including saturated red (R9).
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>CRI 60-70:</strong> Basic (industrial)
              </li>
              <li>
                <strong>CRI 80:</strong> Good (offices)
              </li>
              <li>
                <strong>CRI 90:</strong> Excellent (retail)
              </li>
              <li>
                <strong>CRI 95+:</strong> Critical (colour matching)
              </li>
            </ul>
            <p>
              <strong>Kruithof curve:</strong> Research suggests pleasing combinations of light
              level and colour temperature - warm light suits lower levels, cool light suits higher
              levels.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock
            title="Photopic, Mesopic, and Scotopic Vision"
            plainEnglish="Three vision modes for three light levels. Bright = cones (colour). Dim = mix. Very dark = rods (no colour). Outside lighting needs to think about all three."
          >
            <p>
              The human visual system operates in three distinct modes depending on the ambient
              light level. Understanding these modes is essential for designing lighting for
              different environments, particularly external and emergency lighting where light
              levels may be low.
            </p>
            <p>
              <strong>Vision Modes and Light Levels:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Photopic:</strong> Luminance &gt;3 cd/m², photoreceptors are cones, peak
                sensitivity 555nm (yellow-green)
              </li>
              <li>
                <strong>Mesopic:</strong> Luminance 0.01-3 cd/m², photoreceptors are rods + cones,
                peak sensitivity 507-555nm
              </li>
              <li>
                <strong>Scotopic:</strong> Luminance &lt;0.01 cd/m², photoreceptors are rods, peak
                sensitivity 507nm (blue-green)
              </li>
            </ul>
            <p>
              <strong>S/P Ratio (Scotopic/Photopic):</strong> The S/P ratio indicates how effective
              a light source is under mesopic conditions relative to photopic lumens. Light sources
              with higher blue content have higher S/P ratios and can appear brighter in peripheral
              vision at low light levels.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>High-pressure sodium:</strong> S/P ratio ≈ 0.6
              </li>
              <li>
                <strong>Warm white LED (2700K):</strong> S/P ratio ≈ 1.1
              </li>
              <li>
                <strong>Neutral white LED (4000K):</strong> S/P ratio ≈ 1.4
              </li>
              <li>
                <strong>Cool white LED (5000K):</strong> S/P ratio ≈ 1.7
              </li>
              <li>
                <strong>Metal halide:</strong> S/P ratio ≈ 1.5
              </li>
            </ul>
            <p>
              <strong>Design Implications:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Interior lighting: photopic (lux/lumens sufficient)</li>
              <li>Street lighting: mesopic (S/P ratio matters)</li>
              <li>Emergency escape: may be mesopic/scotopic</li>
              <li>External areas: consider mesopic benefits</li>
            </ul>
            <p>
              <strong>Purkinje Shift:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>As light levels fall, sensitivity shifts to blue</li>
              <li>Blue objects appear relatively brighter</li>
              <li>Red objects appear relatively darker</li>
              <li>Affects colour perception at dusk</li>
            </ul>
            <p>
              <strong>Practical note:</strong> External lighting calculations increasingly consider
              mesopic lumens rather than just photopic lumens, particularly for road and area
              lighting where peripheral detection is important.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock
            title="Worked examples"
            plainEnglish="Three real specifying decisions: choosing CCT, choosing CRI, and deciding when mesopic effects matter."
          >
            <p>
              <strong>Example 1: Selecting Colour Temperature.</strong> A new open-plan office
              requires lighting. The design brief specifies a professional, productive atmosphere
              with good daylight integration. What colour temperature should be specified?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Consider the requirements:</li>
              <li>Professional appearance: suggests cooler rather than warm</li>
              <li>Productive atmosphere: 4000K+ supports alertness</li>
              <li>Daylight integration: artificial light should blend</li>
              <li>
                <strong>Recommendation: 4000K neutral white</strong>
              </li>
              <li>This balances warmth with alertness and blends well with daylight
              (5500-6500K).</li>
            </ul>
            <p>
              <strong>Example 2: CRI Specification.</strong> A fashion retailer requires lighting
              for clothing displays. What CRI should be specified and why?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Retail clothing requirements:</li>
              <li>Colours must appear accurate (customers check fabric colours)</li>
              <li>Skin tones must look flattering (changing rooms)</li>
              <li>High-end brand image expected</li>
              <li>
                <strong>Specification: CRI 90 minimum (Ra90), R9 ≥ 50</strong>
              </li>
              <li>R9 (saturated red) is particularly important for skin tones and warm fabric
              colours.</li>
            </ul>
            <p>
              <strong>Example 3: Mesopic Consideration.</strong> A car park operates at 50 lux
              average. Should mesopic effects be considered in the lighting design?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>At 50 lux with typical surface reflectances:</li>
              <li>Luminance ≈ 50 × 0.2 / π ≈ 3 cd/m²</li>
              <li>This is at the photopic/mesopic boundary</li>
              <li>Peripheral vision will be partly mesopic</li>
              <li>
                <strong>Yes — consider S/P ratio.</strong>
              </li>
              <li>A 4000K LED (S/P ~1.4) will provide better peripheral visibility than 2700K
              (S/P ~1.1) at the same photopic lux level.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Practical guidance"
            plainEnglish="The handful of numbers and CIBSE references you'll lean on for any lighting spec."
          >
            <p>
              <strong>Key Specifications to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Visible spectrum:</strong> 380-780nm
              </li>
              <li>
                <strong>Photopic peak:</strong> 555nm (yellow-green)
              </li>
              <li>
                <strong>Scotopic peak:</strong> 507nm (blue-green)
              </li>
              <li>
                <strong>Office standard:</strong> 4000K, CRI 80+
              </li>
              <li>
                <strong>Retail standard:</strong> 3000-4000K, CRI 90+
              </li>
            </ul>
            <p>
              <strong>CIBSE References:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>CIBSE LG7:</strong> Office Lighting (CCT and CRI guidance)
              </li>
              <li>
                <strong>CIBSE LG1:</strong> The Industrial Environment
              </li>
              <li>
                <strong>CIBSE LG6:</strong> The Outdoor Environment
              </li>
              <li>
                <strong>SLL Lighting Handbook:</strong> Comprehensive guidance
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Confusing CCT and CRI:</strong> A lamp can be warm (2700K) with poor CRI
                </li>
                <li>
                  <strong>Ignoring R9:</strong> Overall CRI can be good but reds may render poorly
                </li>
                <li>
                  <strong>Mixing CCTs:</strong> Different colour temperatures in same space look
                  inconsistent
                </li>
                <li>
                  <strong>Forgetting adaptation:</strong> Transition areas need gradual light level
                  changes
                </li>
              </ul>
            }
            doInstead="Always spec CCT and CRI separately, ask for R9 numbers on critical jobs, hold one CCT per space, and design transition zones at entrances so eyes can adapt before reaching the bright (or dark) interior."
          />

          <SectionRule />

          <Scenario
            title="Specifying CCT and CRI for an open-plan office relight"
            situation={
              <>
                A 1990s open-plan office (1,800 m²) is being relit as part of a Cat-A
                refurb. The client wants higher comfort, stronger sustainability story and
                better video-conferencing colour. The existing 4000 K, CRI 80 T8 fluorescent
                scheme is being replaced.
              </>
            }
            whatToDo={
              <>
                Specify 4000 K neutral white as the primary CCT to balance daylight integration
                and visual comfort. Lift CRI to Ra ≥ 90 (TM-30 Rf ≥ 88, Rg ≥ 95) to
                handle skin tones on Teams/Zoom calls. Verify maintained illuminance against
                LG7 (500 lux task, 300 lux background, U₀ ≥ 0.6) and UGR ≤ 19 with the
                manufacturer&rsquo;s photometric file. Document on the lighting schedule with
                CIBSE LG7 reference.
              </>
            }
            whyItMatters={
              <>
                CCT and CRI are not aesthetic preferences — they drive visual fatigue,
                wellbeing scores in WELL/BREEAM, and how staff appear on camera. Getting
                them wrong forces a costly relamp 18 months in. The CIBSE LG-cited
                specification is auditable and defendable.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Visible light = 380–780 nm — a narrow window in the EM spectrum.',
              'Photopic vision (cones, daylight) peaks at 555 nm; scotopic vision (rods, low light) peaks at 507 nm.',
              'Correlated Colour Temperature (CCT) in Kelvin: 2700–3000 K warm, 4000 K neutral, 5000–6500 K cool.',
              'Colour Rendering Index Ra: ≥ 80 general, ≥ 90 retail/clinical, ≥ 95 art and museum.',
              'TM-30 Rf (fidelity) and Rg (gamut) supersede CRI for accurate colour appraisal.',
              'Mesopic (street, low-level interior) demands different luminance metrics — relevant to car parks and external lighting.',
              'CIBSE/SLL Lighting Guides + BS EN 12464-1 set the maintained illuminance and UGR targets the design must meet.',
              'Spectral output also drives circadian impact — increasingly written into healthcare and education briefs.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Lighting and Acoustics
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section4-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Illumination Calculations
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule2Section4_1;
