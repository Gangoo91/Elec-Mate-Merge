/**
 * Module 2 · Section 4 · Subsection 4 — Sound Fundamentals
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   Sound as mechanical wave motion, frequency/wavelength, the decibel scale,
 *   inverse-square law and A-weighting — the acoustic literacy underpinning every
 *   plant-noise breakout calculation and every NR/NC compliance check.
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

const TITLE = 'Sound Fundamentals - HNC Module 2 Section 4.4';
const DESCRIPTION =
  'Understanding frequency, wavelength, decibels, sound pressure levels, dB addition, and inverse square law for building services acoustics.';

const quickCheckQuestions = [
  {
    id: 'db-scale',
    question: 'Why is the decibel scale logarithmic rather than linear?',
    options: [
      'It makes calculations simpler',
      'Sound pressure levels vary over a huge range (1:10 million)',
      'It matches digital audio formats',
      'It was invented before calculators',
    ],
    correctIndex: 1,
    explanation:
      'Human hearing responds to sound pressures from 20 μPa to 200 Pa - a range of 10 million:1. The logarithmic dB scale compresses this to a manageable 0-140 dB range.',
  },
  {
    id: 'frequency-range',
    question: 'What is the approximate frequency range of human hearing?',
    options: [
      '2 Hz to 200 Hz',
      '20 Hz to 20,000 Hz',
      '200 Hz to 2,000 Hz',
      '2,000 Hz to 200,000 Hz',
    ],
    correctIndex: 1,
    explanation:
      'Human hearing typically ranges from 20 Hz (very low bass) to 20,000 Hz (very high treble). This range decreases with age, particularly at high frequencies.',
  },
  {
    id: 'db-addition',
    question: 'If two identical sound sources each produce 60 dB, what is the combined level?',
    options: ['60 dB', '63 dB', '90 dB', '120 dB'],
    correctIndex: 1,
    explanation:
      'Doubling sound power adds 3 dB. Two identical sources (60 + 60 dB) = 63 dB, not 120 dB. Decibels add logarithmically, not arithmetically.',
  },
  {
    id: 'inverse-square',
    question:
      'According to the inverse square law, if you double your distance from a point source, the sound level:',
    options: ['Decreases by 3 dB', 'Decreases by 6 dB', 'Decreases by 10 dB', 'Halves'],
    correctIndex: 1,
    explanation:
      'The inverse square law states sound intensity drops as 1/r². Doubling distance quarters intensity, which equals a 6 dB reduction (10 log 0.25 = -6 dB).',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is sound?',
    options: [
      'Electromagnetic radiation at audio frequencies',
      'Mechanical pressure waves travelling through a medium',
      'Electrical signals in the audible range',
      'Vibration of the human ear drum',
    ],
    correctAnswer: 1,
    explanation:
      'Sound is a mechanical pressure wave that requires a medium (air, water, solids) to propagate. It cannot travel through a vacuum unlike electromagnetic radiation.',
  },
  {
    id: 2,
    question: 'What is the speed of sound in air at 20°C?',
    options: ['140 m/s', '343 m/s', '1500 m/s', '3000 m/s'],
    correctAnswer: 1,
    explanation:
      'Sound travels at approximately 343 m/s in air at 20°C. Speed increases with temperature (roughly 0.6 m/s per °C) and varies significantly in other media (1500 m/s in water, 5000 m/s in steel).',
  },
  {
    id: 3,
    question: 'Calculate the wavelength of a 500 Hz tone in air (c = 340 m/s).',
    options: ['0.34 m', '0.68 m', '1.47 m', '170 m'],
    correctAnswer: 1,
    explanation:
      'Using λ = c/f: wavelength = 340/500 = 0.68 m. Low frequencies have long wavelengths (difficult to block), high frequencies have short wavelengths (easier to attenuate).',
  },
  {
    id: 4,
    question: 'What is the reference sound pressure for 0 dB SPL?',
    options: ['1 Pa', '20 Pa', '20 μPa', '1 μPa'],
    correctAnswer: 2,
    explanation:
      '0 dB SPL is referenced to 20 μPa (20 × 10⁻⁶ Pa), which is approximately the threshold of human hearing at 1 kHz. This is an extremely small pressure.',
  },
  {
    id: 5,
    question: 'Convert a sound pressure level of 94 dB to Pascals, given that 94 dB = 1 Pa.',
    options: ['0.002 Pa', '0.02 Pa', '1 Pa', '2 Pa'],
    correctAnswer: 2,
    explanation:
      '94 dB SPL corresponds to exactly 1 Pascal sound pressure. This is a useful reference point: SPL = 20 log(p/20μPa), so 20 log(1/0.00002) = 20 log(50000) = 94 dB.',
  },
  {
    id: 6,
    question:
      'Three machines produce 70 dB, 73 dB, and 75 dB respectively. What is the approximate combined level?',
    options: ['72.5 dB', '75 dB', '77 dB', '218 dB'],
    correctAnswer: 2,
    explanation:
      'Add logarithmically: start with highest (75 dB), add 73 dB (+1.8 dB) = 76.8, add 70 dB (+1.0 dB) ≈ 77.8 dB. The combined level is dominated by the loudest sources.',
  },
  {
    id: 7,
    question: 'What does the dB(A) weighting represent?',
    options: [
      'Peak sound level',
      'Average sound level',
      'Frequency weighting matching human ear sensitivity',
      'The maximum allowable exposure',
    ],
    correctAnswer: 2,
    explanation:
      'A-weighting adjusts measured levels to match the frequency response of human hearing, which is less sensitive to low and very high frequencies. dB(A) is standard for environmental noise.',
  },
  {
    id: 8,
    question:
      'A sound source produces 80 dB at 1m. What level would you expect at 4m in a free field?',
    options: ['74 dB', '72 dB', '68 dB', '60 dB'],
    correctAnswer: 2,
    explanation:
      'Using the inverse square law: doubling distance reduces level by 6 dB. 1m→2m = 74 dB, 2m→4m = 68 dB. Each doubling of distance gives another 6 dB reduction.',
  },
  {
    id: 9,
    question:
      'What is the relationship between sound power level (Lw) and sound pressure level (Lp)?',
    options: [
      'They are identical',
      'Lp depends on distance from source; Lw does not',
      'Lw depends on distance from source; Lp does not',
      'Both depend equally on distance',
    ],
    correctAnswer: 1,
    explanation:
      "Sound power level (Lw) is a property of the source - it doesn't change with distance. Sound pressure level (Lp) is what we measure at a point - it reduces with distance from the source.",
  },
  {
    id: 10,
    question: 'What is a typical background noise level for an open plan office?',
    options: ['25-30 dB(A)', '35-40 dB(A)', '45-50 dB(A)', '55-60 dB(A)'],
    correctAnswer: 2,
    explanation:
      'CIBSE Guide A recommends 45-50 dB(A) for open plan offices. This provides speech privacy and masks distracting noises while still allowing communication.',
  },
  {
    id: 11,
    question:
      'What is the sound intensity at 2m from a 1W omnidirectional point source in a free field?',
    options: ['0.02 W/m²', '0.04 W/m²', '0.08 W/m²', '0.25 W/m²'],
    correctAnswer: 0,
    explanation:
      'I = W / (4πr²) = 1 / (4π × 4) = 1 / 50.3 ≈ 0.02 W/m². Sound intensity follows the inverse square law for point sources.',
  },
  {
    id: 12,
    question: 'Why are low frequency sounds (bass) harder to control in buildings?',
    options: [
      'They carry more energy',
      'They have long wavelengths relative to construction thicknesses',
      'They are louder',
      'They travel faster',
    ],
    correctAnswer: 1,
    explanation:
      'Low frequencies have long wavelengths (e.g., 100 Hz = 3.4m). Barriers and absorbers need to be comparable to the wavelength to be effective, making low frequency control challenging.',
  },
];

const faqs = [
  {
    question: 'What is the difference between dB, dB(A), and dB(C)?',
    answer:
      "dB (or dB(Lin)) applies no frequency weighting - it's the raw measurement. dB(A) applies A-weighting which matches human ear sensitivity and is standard for environmental noise assessment. dB(C) has flatter weighting and is used for peak measurements and assessing low frequency content. Most building services specifications use dB(A) for general noise and NR (Noise Rating) curves for detailed analysis.",
  },
  {
    question: 'How do I add decibel values from multiple sources?',
    answer:
      'Never add dB values arithmetically (60+60≠120). For two equal sources, add 3 dB. For unequal sources, use: L_total = 10 log(10^(L1/10) + 10^(L2/10) + ...). Quick method: if difference is 0-1 dB add 3, 2-3 dB add 2, 4-9 dB add 1, 10+ dB add 0. The total is dominated by the loudest source - a 50 dB source adds nothing significant to an 80 dB source.',
  },
  {
    question: 'Does the inverse square law always apply?',
    answer:
      "The inverse square law (6 dB per doubling of distance) applies for point sources in free field conditions. In practice, rooms have reflections which maintain sound levels, and real sources aren't perfect point sources. Line sources (roads, pipes) follow a 3 dB per doubling rule. Inside buildings, reverberation means sound doesn't decay as quickly as inverse square would predict.",
  },
  {
    question: 'What sound levels are dangerous to hearing?',
    answer:
      'Exposure limits (Control of Noise at Work Regulations): Lower action value 80 dB(A) daily average (provide hearing protection), Upper action value 85 dB(A) (mandatory protection), Peak action value 137 dB(C). Building services plant rooms commonly exceed these levels - access should be limited and hearing protection required. 90+ dB(A) can cause permanent hearing damage with prolonged exposure.',
  },
  {
    question: 'Why do we measure in octave bands?',
    answer:
      'Octave bands divide the frequency spectrum into manageable segments for analysis. Standard centre frequencies are 63, 125, 250, 500, 1000, 2000, 4000, 8000 Hz. This allows us to characterise noise spectra (is it predominantly low or high frequency?) and select appropriate control measures. One-third octave bands provide finer detail when needed.',
  },
  {
    question: 'How does temperature affect sound?',
    answer:
      'Sound speed increases with temperature (approximately 0.6 m/s per °C in air). At 20°C, c ≈ 343 m/s. This affects wavelength (λ = c/f) and can cause refraction outdoors where temperature varies with height. Hot plant rooms have slightly different acoustic behaviour than calculations at standard conditions might suggest, though the effect is usually small.',
  },
];

const HNCModule2Section4_4 = () => {
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
            eyebrow="Module 2 · Section 4 · Subsection 4"
            title="Sound Fundamentals"
            description="Frequency, wavelength, decibels, and the physics of sound for building services acoustics."
            tone="purple"
          />

          <TLDR
            points={[
              'You handle the decibel scale fluently — adding sources logarithmically (10 × log₁₀ Σ10^(Lᵢ/10)) rather than arithmetically.',
              'You apply the inverse-square law (6 dB drop per doubling of distance) to plant breakout calculations and BS 4142 assessments.',
              'You convert between SPL (Lp) and SWL (Lw) using Lp = Lw − 20 log r − 11 (free field, point source) when the manufacturer&rsquo;s data is given as SWL.',
              'You apply A-weighting (dBA) for human-response work and C-weighting (dBC) for impulsive/low-frequency plant noise.',
            ]}
          />

          <RegsCallout
            source="BS 4142:2014+A1:2019 — Methods for rating and assessing industrial and commercial sound"
            clause="Method for rating sound from industrial and commercial premises (including HVAC plant) by reference to a representative background sound level, with corrections for tonal, impulsive and intermittent character."
            meaning={
              <>
                BS 4142 is the UK reference for assessing whether plant noise is likely to
                generate complaint at the nearest residential receptor. As HNC engineer you
                use it for chiller, AHU and dry-cooler positioning, and to brief the
                acoustic consultant on attenuator selection.
              </>
            }
            cite="Source: BS 4142:2014+A1:2019; CIBSE Guide A — Environmental Design (acoustics chapter); CIBSE Guide B4 — Noise and Vibration Control."
          />

          <LearningOutcomes
            outcomes={[
              'Define sound as mechanical wave motion with frequency and wavelength',
              'Explain the decibel scale and calculate sound pressure levels',
              'Add decibel values from multiple sources correctly',
              'Apply the inverse square law to sound propagation',
              'Understand A-weighting and its significance',
              'Relate frequency to wavelength using c = fλ',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="What is Sound?"
            plainEnglish="A pressure wave wobbling through air, water or steel. No medium, no sound — that's why a vacuum is silent."
          >
            <p>
              Sound is a mechanical wave — a travelling disturbance in pressure, density, and
              particle velocity that propagates through an elastic medium. Unlike light, sound
              requires a medium (air, water, solids) and cannot travel through a vacuum.
            </p>
            <p>
              <strong>Key properties of sound:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Frequency (f):</strong> Cycles per second, measured in Hertz (Hz)
              </li>
              <li>
                <strong>Wavelength (λ):</strong> Distance between wave peaks, in metres
              </li>
              <li>
                <strong>Speed (c):</strong> Propagation velocity, ~343 m/s in air at 20°C
              </li>
              <li>
                <strong>Amplitude:</strong> Magnitude of pressure variation (relates to loudness)
              </li>
            </ul>
            <p>
              <strong>Wave Equation:</strong> c = f × λ. Speed (m/s) = Frequency (Hz) × Wavelength
              (m). Rearranged: λ = c/f (wavelength = 343/frequency in air).
            </p>
            <p>
              <strong>Speed of Sound in Different Media:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Air (20°C):</strong> 343 m/s (standard reference)
              </li>
              <li>
                <strong>Water:</strong> 1480 m/s (plumbing noise transmission)
              </li>
              <li>
                <strong>Concrete:</strong> 3400 m/s (structure-borne sound)
              </li>
              <li>
                <strong>Steel:</strong> 5100 m/s (pipe and duct transmission)
              </li>
            </ul>
            <p>
              <strong>Building services:</strong> Structure-borne sound (through building fabric)
              travels much faster than airborne sound, which is why vibration isolation is critical
              for plant.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock
            title="Frequency, Wavelength, and Human Hearing"
            plainEnglish="Low frequencies = long waves = bass = hard to block. High frequencies = short waves = treble = easy to absorb. Pitch matters when you choose your noise control."
          >
            <p>
              Frequency determines the pitch we hear — low frequencies sound bass, high frequencies
              sound treble. The human ear can typically detect frequencies from 20 Hz to 20,000 Hz,
              though this range decreases with age.
            </p>
            <p>
              <strong>Frequency Ranges and Wavelengths:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>20 Hz:</strong> 17.2 m wavelength, lowest audible, large transformers
              </li>
              <li>
                <strong>100 Hz:</strong> 3.4 m wavelength, low bass, fan hum and motors
              </li>
              <li>
                <strong>500 Hz:</strong> 0.69 m wavelength, mid-range, speech fundamentals
              </li>
              <li>
                <strong>1000 Hz:</strong> 0.34 m wavelength, mid-range (reference), standard test
                tone
              </li>
              <li>
                <strong>4000 Hz:</strong> 0.086 m wavelength, high (speech clarity), consonant
                sounds
              </li>
              <li>
                <strong>20000 Hz:</strong> 0.017 m wavelength, highest audible, above most adults
              </li>
            </ul>
            <p>
              <strong>Standard Octave Bands:</strong> Acoustic analysis uses octave bands with
              centre frequencies: 31.5 | 63 | 125 | 250 | 500 | 1k | 2k | 4k | 8k | 16k Hz. Each
              band covers frequencies from 0.707× to 1.414× the centre frequency.
            </p>
            <p>
              <strong>Why wavelength matters:</strong> Sound control measures (barriers, absorbers)
              need dimensions comparable to the wavelength. Low frequencies (long λ) are hardest to
              control.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="The Decibel Scale"
            plainEnglish="Hearing covers a 10-million-to-1 pressure range. The logarithmic dB scale squashes that into 0-140. +3 dB = double the power. +10 dB = sounds twice as loud."
          >
            <p>
              The decibel (dB) is a logarithmic unit used to express the ratio of a value to a
              reference value. It is used for sound because human perception of loudness is
              approximately logarithmic, and because sound pressures vary over an enormous range.
            </p>
            <p>
              <strong>Sound Pressure Level Formula:</strong> Lp = 20 log₁₀(p / pref) dB. Where pref
              = 20 μPa (threshold of hearing at 1 kHz).
            </p>
            <p>
              <strong>Sound Level Examples:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>0 dB:</strong> Threshold of hearing — silence
              </li>
              <li>
                <strong>30 dB(A):</strong> Quiet bedroom — very quiet
              </li>
              <li>
                <strong>45 dB(A):</strong> Quiet office — quiet
              </li>
              <li>
                <strong>60 dB(A):</strong> Normal conversation — moderate
              </li>
              <li>
                <strong>70 dB(A):</strong> Busy road — intrusive
              </li>
              <li>
                <strong>85 dB(A):</strong> Plant room — loud (hearing damage risk)
              </li>
              <li>
                <strong>100 dB(A):</strong> Pneumatic drill — very loud
              </li>
              <li>
                <strong>140 dB:</strong> Threshold of pain — painful
              </li>
            </ul>
            <p>
              <strong>Key decibel relationships:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>+3 dB:</strong> Double the sound power/intensity
              </li>
              <li>
                <strong>+10 dB:</strong> Perceived as roughly twice as loud
              </li>
              <li>
                <strong>+20 dB:</strong> Ten times the sound pressure
              </li>
              <li>
                <strong>-6 dB:</strong> Half the sound pressure (distance doubling)
              </li>
            </ul>
            <p>
              <strong>Perception:</strong> A 10 dB change sounds approximately twice or half as
              loud. A 3 dB change is the smallest difference most people can reliably detect.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock
            title="Adding Decibels and the Inverse Square Law"
            plainEnglish="Don't add dB like normal numbers. Two equal sources = +3 dB only. And distance: every time you double it, drop another 6 dB outdoors."
          >
            <p>
              Because decibels are logarithmic, they cannot be added arithmetically. Two 60 dB
              sources do not make 120 dB. Instead, we must convert to linear values (power or
              intensity), add, then convert back.
            </p>
            <p>
              <strong>Adding Decibels:</strong> L_total = 10 log₁₀(10^(L1/10) + 10^(L2/10) + ...)
            </p>
            <p>
              <strong>Quick addition guide</strong> (add to higher value):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Difference 0-1 dB → add 3 dB</li>
              <li>Difference 2-3 dB → add 2 dB</li>
              <li>Difference 4-9 dB → add 1 dB</li>
              <li>Difference 10+ dB → add 0 dB</li>
            </ul>
            <p>
              <strong>Inverse Square Law:</strong> L2 = L1 - 20 log₁₀(r2/r1). For point source in
              free field: each doubling of distance = -6 dB.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>1m → 80 dB (reference)</li>
              <li>2m → 74 dB</li>
              <li>4m → 68 dB</li>
              <li>8m → 62 dB</li>
            </ul>
            <p>
              <strong>Sound Power vs Pressure:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Lw (power):</strong> Source property, constant
              </li>
              <li>
                <strong>Lp (pressure):</strong> Measured at a point, varies
              </li>
              <li>Lp = Lw - 10 log(4πr²) for free field</li>
              <li>Manufacturer data usually gives Lw</li>
            </ul>
            <p>
              <strong>A-Weighting:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Adjusts for human ear response</li>
              <li>Reduces low frequency contribution</li>
              <li>Standard for environmental noise</li>
              <li>Expressed as dB(A) or dBA</li>
            </ul>
            <p>
              <strong>In practice:</strong> Indoor spaces have reflections, so sound doesn't decay
              purely by inverse square. The reverberant field maintains levels away from sources.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock
            title="Worked examples"
            plainEnglish="Find a wavelength, add three plant items, predict outdoor noise at distance — three real acoustics calcs."
          >
            <p>
              <strong>Example 1: Wavelength Calculation.</strong> Calculate the wavelength of fan
              noise at 250 Hz in air at 20°C.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Using λ = c / f</li>
              <li>λ = 343 / 250</li>
              <li>
                λ = <strong>1.37 metres</strong>
              </li>
              <li>This long wavelength explains why low frequency noise is hard to attenuate with
              thin barriers.</li>
            </ul>
            <p>
              <strong>Example 2: Adding Sound Sources.</strong> A plant room has three pumps
              producing 72 dB(A), 70 dB(A), and 68 dB(A). What is the combined sound level?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Method: Start with highest, add others sequentially.</li>
              <li>
                72 + 70 dB: difference = 2, add 2 → <strong>74 dB</strong>
              </li>
              <li>
                74 + 68 dB: difference = 6, add 1 → <strong>75 dB(A)</strong>
              </li>
              <li>Or precisely: 10 log(10^7.2 + 10^7.0 + 10^6.8) = 10 log(15.85×10⁶ + 10×10⁶ +
              6.31×10⁶)</li>
              <li>
                = 10 log(32.16×10⁶) = <strong>75.1 dB(A)</strong>
              </li>
            </ul>
            <p>
              <strong>Example 3: Distance Attenuation.</strong> A cooling tower produces 85 dB(A) at
              5m. What level would be expected at 40m in open conditions?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Using inverse square law: L2 = L1 - 20 log(r2/r1)</li>
              <li>L2 = 85 - 20 log(40/5) = 85 - 20 log(8)</li>
              <li>L2 = 85 - 20 × 0.903 = 85 - 18</li>
              <li>
                L2 = <strong>67 dB(A)</strong>
              </li>
              <li>Alternative: 5m→10m→20m→40m = 3 doublings = 3×6 = 18 dB reduction.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Practical guidance"
            plainEnglish="Four formulas, the CIBSE Guide A targets, and the speed-of-sound trivia you'll quote in any acoustic discussion."
          >
            <p>
              <strong>Key Formulas:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Wave equation:</strong> c = f × λ (343 m/s in air)
              </li>
              <li>
                <strong>SPL:</strong> Lp = 20 log(p/20μPa) dB
              </li>
              <li>
                <strong>dB addition:</strong> L = 10 log(Σ10^(Li/10))
              </li>
              <li>
                <strong>Distance:</strong> ΔL = -20 log(r2/r1) = -6 dB per doubling
              </li>
            </ul>
            <p>
              <strong>Building Services Targets (CIBSE Guide A):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Open plan office:</strong> 45-50 dB(A), NR40-45
              </li>
              <li>
                <strong>Private office:</strong> 35-40 dB(A), NR35-40
              </li>
              <li>
                <strong>Meeting room:</strong> 35-40 dB(A), NR30-35
              </li>
              <li>
                <strong>Plant room:</strong> Hearing protection if &gt;85 dB(A)
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Adding dB linearly:</strong> 60 + 60 = 63 dB, not 120 dB
                </li>
                <li>
                  <strong>Forgetting distance:</strong> Manufacturer Lw needs conversion to Lp at
                  distance
                </li>
                <li>
                  <strong>Ignoring frequency:</strong> Overall dB(A) may mask tonal problems
                </li>
                <li>
                  <strong>Free field assumption:</strong> Indoor levels don't follow simple inverse
                  square
                </li>
              </ul>
            }
            doInstead="Always add dB logarithmically, convert manufacturer Lw to Lp at the actual receiver distance, look at octave-band data not just the dB(A) total, and use room acoustics models (not pure inverse square) for any indoor calculation."
          />

          <SectionRule />

          <Scenario
            title="Roof-mounted chiller breakout to a residential boundary"
            situation={
              <>
                Three air-cooled chillers (each 92 dB(A) SWL at 1 m) are scheduled for the
                roof of a city-centre office. The nearest residential window is 35 m away.
                Local planning sets a 5 dB margin above background (40 dB(A) night) — so
                the chiller contribution at the receptor must be ≤ 45 dB(A).
              </>
            }
            whatToDo={
              <>
                Sum the three chiller SWLs logarithmically: 92 + 10 log 3 ≈ 96.8 dB(A).
                Apply distance attenuation Lp = Lw − 20 log 35 − 11 ≈ 96.8 − 30.9 −
                11 = 54.9 dB(A). That&rsquo;s 9.9 dB above the limit. Specify acoustic
                louvres or a duct silencer with insertion loss ≥ 12 dB(A), or relocate
                plant 15 m further from the boundary, or both. Document the calculation
                in the BS 4142 assessment.
              </>
            }
            whyItMatters={
              <>
                A planning condition breach means a Section 80 abatement notice, possible
                enforcement action, and an emergency attenuator install at the contractor&rsquo;s
                cost. The dB-arithmetic done at design stage is what stops a six-figure
                rework bill.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Sound = mechanical pressure wave; speed in air c ≈ 343 m/s at 20 °C.',
              'Frequency × wavelength = speed: c = fλ.',
              'Decibel scale is logarithmic; doubling sound power = +3 dB; 10× = +10 dB.',
              'Add equal sources: 2× = +3 dB, 3× ≈ +4.8 dB, 10× = +10 dB.',
              'SPL Lp = 20 log(p/p₀) where p₀ = 20 µPa (threshold of hearing).',
              'Inverse-square law: free field point source loses 6 dB per doubling of distance.',
              'A-weighting (dBA) approximates human ear response; C-weighting (dBC) for low-frequency or impulsive noise.',
              'BS 4142 is the UK assessment method for HVAC plant noise at residential receptors.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section4-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Lamp Types and Efficacy
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section4-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Noise Control Methods
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule2Section4_4;
