/**
 * Module 4 · Section 1 · Subsection 4 — Harmonic Assessment
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   Non-linear loads (VSDs, SMPS, LED drivers), THD measurement, triplen / neutral
 *   loading, G5/4-1 emission limits, K-rated transformers, and choosing between line
 *   reactors, 12 / 18-pulse drives, AFE drives and active / passive filters.
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

const TITLE = 'Harmonic Assessment - HNC Module 4 Section 1.4';
const DESCRIPTION =
  'Master harmonic assessment for building services: THD measurement, neutral conductor effects, cable derating, Engineering Recommendation G5/4-1 limits, and VSD harmonic mitigation.';

const quickCheckQuestions = [
  {
    id: 'thd-definition',
    question: 'Total Harmonic Distortion (THD) measures:',
    options: [
      'Total power consumption',
      'Distortion of waveform from pure sine wave',
      'Cable temperature rise',
      'Voltage drop percentage',
    ],
    correctIndex: 1,
    explanation:
      'THD measures how much a waveform deviates from a pure sinusoidal shape, expressed as a percentage. Higher THD indicates more harmonic content.',
  },
  {
    id: 'third-harmonic',
    question: 'In a three-phase system, where do triplen harmonics (3rd, 9th, etc.) accumulate?',
    options: [
      'In the phase conductors',
      'In the earth conductor',
      'In the neutral conductor',
      'In the transformer',
    ],
    correctIndex: 2,
    explanation:
      'Triplen harmonics (multiples of 3) are in phase across all three phases and add together in the neutral conductor, potentially causing it to carry more current than the phases.',
  },
  {
    id: 'g5-4-reference',
    question: 'Engineering Recommendation G5/4-1 sets limits for:',
    options: [
      'Cable installation methods',
      'Harmonic voltage and current emissions',
      'Earth fault loop impedance',
      'RCD sensitivity',
    ],
    correctIndex: 1,
    explanation:
      'G5/4-1 is the UK standard that sets planning levels for harmonic voltage distortion and emission limits for harmonic currents from customer installations.',
  },
  {
    id: 'vsd-harmonics',
    question: 'A standard 6-pulse VSD primarily produces which harmonics?',
    options: [
      '2nd, 4th, 6th',
      '3rd, 9th, 15th',
      '5th, 7th, 11th, 13th',
      'All odd harmonics equally',
    ],
    correctIndex: 2,
    explanation:
      '6-pulse drives produce harmonics of order 6n±1 (5th, 7th, 11th, 13th...). The 5th and 7th are typically largest at around 20-30% of fundamental current.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What causes harmonic currents in building electrical systems?',
    options: [
      'Resistive loads like heaters',
      'Non-linear loads with rectifiers or switching power supplies',
      'Motor starting current',
      'Cable capacitance',
    ],
    correctAnswer: 1,
    explanation:
      'Non-linear loads (VSDs, SMPS, LED drivers, UPS) draw current in pulses rather than sinusoidally, creating harmonic currents that distort the supply waveform.',
  },
  {
    id: 2,
    question: 'The 5th harmonic current has a frequency of:',
    options: ['50Hz', '150Hz', '250Hz', '350Hz'],
    correctAnswer: 2,
    explanation:
      'Harmonic frequency = harmonic order × fundamental frequency. 5th harmonic = 5 × 50Hz = 250Hz',
  },
  {
    id: 3,
    question: 'Why is neutral conductor sizing critical in harmonic-rich environments?',
    options: [
      'Neutral carries less current with harmonics',
      'Triplen harmonics add in the neutral, potentially exceeding phase current',
      'Harmonics only flow in the neutral',
      'Neutral conductors filter harmonics',
    ],
    correctAnswer: 1,
    explanation:
      'Third harmonics and their multiples (triplen) are in phase across all three phases. They add rather than cancel in the neutral, potentially causing neutral current to exceed phase currents.',
  },
  {
    id: 4,
    question: 'What is the G5/4-1 planning level for THD voltage at LV?',
    options: ['3%', '5%', '8%', '10%'],
    correctAnswer: 1,
    explanation:
      'G5/4-1 sets the planning level for total harmonic voltage distortion at 5% for LV systems, with individual harmonic limits varying by order.',
  },
  {
    id: 5,
    question: 'Cable derating for harmonics is required because:',
    options: [
      'Harmonic currents flow to earth',
      'Harmonics cause additional heating due to skin and proximity effects',
      'Harmonics reduce cable insulation rating',
      'It is a BS 7671 regulation requirement',
    ],
    correctAnswer: 1,
    explanation:
      'Higher frequency harmonics experience increased skin and proximity effects, causing additional heating. Cables must be derated or oversized to handle this extra heat.',
  },
  {
    id: 6,
    question: 'An active harmonic filter works by:',
    options: [
      'Absorbing harmonics in resistors',
      'Injecting equal and opposite harmonic currents',
      'Blocking harmonics with inductors',
      'Converting harmonics to heat',
    ],
    correctAnswer: 1,
    explanation:
      'Active filters measure harmonic content and inject compensating currents that are equal in magnitude but opposite in phase, effectively cancelling the harmonics.',
  },
  {
    id: 7,
    question: 'Which equipment is most sensitive to harmonic voltage distortion?',
    options: [
      'Resistive heaters',
      'Capacitor banks for power factor correction',
      'Incandescent lighting',
      'Manual motor starters',
    ],
    correctAnswer: 1,
    explanation:
      'Capacitors are very sensitive to harmonics as capacitive reactance decreases with frequency. Harmonic currents can cause overheating and premature failure of PFC capacitors.',
  },
  {
    id: 8,
    question: 'A 12-pulse VSD compared to 6-pulse produces:',
    options: [
      'The same harmonics but at higher magnitude',
      'Lower magnitude 5th and 7th harmonics',
      'Only even harmonics',
      'No harmonics at all',
    ],
    correctAnswer: 1,
    explanation:
      '12-pulse drives use two 6-pulse bridges with 30° phase shift, cancelling 5th and 7th harmonics. First significant harmonics are 11th and 13th at reduced levels.',
  },
  {
    id: 9,
    question: 'BS 7671 requires oversized neutral conductors when:',
    options: [
      'Always in three-phase systems',
      'Third harmonic content exceeds 15-33% depending on cable type',
      'Power factor is below 0.9',
      'Cables exceed 25m in length',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 Appendix 11 requires consideration of neutral oversizing when third harmonic content exceeds certain thresholds. The neutral may need to be larger than phase conductors.',
  },
  {
    id: 10,
    question: 'What is the K-factor rating for transformers?',
    options: [
      'A measure of transformer efficiency',
      'A derating factor for harmonic loads',
      "The transformer's power factor",
      'The short-circuit capacity',
    ],
    correctAnswer: 1,
    explanation:
      'K-factor is a transformer rating that indicates its ability to handle harmonic load currents. Higher K-factor (K4, K13, K20) means better harmonic tolerance without derating.',
  },
];

const faqs = [
  {
    question: 'How do I know if my installation has a harmonic problem?',
    answer:
      'Signs include: overheating neutral conductors, premature capacitor failure, transformer overheating, flickering lights, electronic equipment malfunction. Power quality monitoring with a harmonic analyser confirms the issue by measuring THD and individual harmonic magnitudes.',
  },
  {
    question: 'What is the difference between passive and active harmonic filters?',
    answer:
      "Passive filters use tuned LC circuits to absorb specific harmonics - they're simple and robust but fixed to certain frequencies. Active filters use power electronics to inject compensating currents in real-time - more expensive but can adapt to changing harmonic profiles and filter multiple harmonics simultaneously.",
  },
  {
    question: 'Do LED lights cause harmonic problems?',
    answer:
      'LED drivers contain rectifiers and can have poor power factor and high harmonic content (especially 3rd harmonic) unless designed with PFC circuits. Quality commercial LED luminaires typically have >0.9 power factor and <20% THDi, but cheap products may be worse. The cumulative effect of many LED lights can be significant.',
  },
  {
    question: 'Why do VSDs create harmonics and how can I reduce them?',
    answer:
      'Standard VSDs have a 6-pulse diode rectifier front end that draws current in pulses, creating 5th, 7th, 11th, 13th harmonics. Mitigation options include: line reactors (3-5% impedance), DC link chokes, 12 or 18-pulse drives, active front-end (AFE) drives, or passive/active harmonic filters.',
  },
  {
    question: 'How do I size a neutral conductor for harmonic loads?',
    answer:
      'BS 7671 Appendix 11 provides guidance. For circuits with >33% third harmonic, the neutral must be sized for the harmonic current, which may exceed phase current. As a minimum, use equal size neutral to phase. For high harmonic loads (>50% THD), double neutral size may be needed.',
  },
  {
    question: 'What happens if I exceed G5/4-1 emission limits?',
    answer:
      'DNOs can require customers to reduce harmonic emissions. This may involve installing harmonic filters, upgrading to lower-harmonic equipment (AFE drives), or agreeing increased emission limits with network reinforcement charges. Non-compliance can result in connection refusal or disconnection.',
  },
];

const HNCModule4Section1_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 4 · Section 1 · Subsection 4"
            title="Harmonic Assessment"
            description="Understanding harmonic distortion effects and mitigation in modern building services installations."
            tone="purple"
          />

          <TLDR
            points={[
              'Harmonics are integer-multiple frequencies of the 50&nbsp;Hz fundamental, generated by non-linear loads (LED drivers, VSDs, switched-mode supplies, UPS rectifiers).',
              'Triplen harmonics (3rd, 9th, 15th) sum in the neutral on three-phase systems — neutral current can exceed phase current, demanding upsized neutrals.',
              'BS 7671 Reg 524.2.3(a) requires the &lsquo;expected maximum current including harmonics&rsquo; to be used when sizing the neutral conductor.',
              'ENA G5/4-1 sets DNO planning levels for harmonic emission at the point of common coupling — exceeding it can refuse or revoke a connection.',
              'Mitigation hierarchy: choose lower-distortion equipment first, then passive line reactors, then active filters or AFE drives. Never just upsize and hope.',
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 524.2.3(a) (Cross-sectional area of neutral conductors with harmonic content)"
            clause="The expected maximum current, including harmonics if any, in the neutral conductor during normal service shall be not greater than the current-carrying capacity of the reduced cross-sectional area of the neutral conductor."
            meaning={
              <>
                Reg 524.2.3(a) explicitly requires harmonic content to be included in the
                expected maximum neutral current. For modern offices and commercial buildings
                with LED lighting and IT equipment, third-harmonic content above 33% means the
                neutral can carry as much as the line — sometimes more. Designers must size the
                neutral against this current, not the line current alone, and apply Appendix 4
                grouping/derating factors to reflect the true thermal duty.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 524.2.3(a); BS 7671 Appendix 11; ENA Engineering Recommendation G5/4-1."
          />

          <LearningOutcomes
            outcomes={[
              'Understand harmonic generation by non-linear loads',
              'Calculate THD and individual harmonic magnitudes',
              'Apply G5/4-1 emission limits and planning levels',
              'Assess neutral conductor sizing for triplen harmonics',
              'Apply cable derating factors for harmonic loads',
              'Select appropriate harmonic mitigation techniques',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock title="Harmonic Fundamentals">
            <p>
              Harmonics are voltages or currents at frequencies that are integer multiples of the
              fundamental supply frequency (50Hz in the UK). They are produced by non-linear loads
              that draw current in a non-sinusoidal pattern.
            </p>
            <p>
              <strong>Harmonic orders, frequencies, sequence and effect:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1st (fundamental) — 50Hz, positive sequence:</strong> normal operation
              </li>
              <li>
                <strong>3rd (triplen) — 150Hz, zero sequence:</strong> adds in neutral
              </li>
              <li>
                <strong>5th — 250Hz, negative sequence:</strong> motor heating, reverse torque
              </li>
              <li>
                <strong>7th — 350Hz, positive sequence:</strong> motor heating
              </li>
              <li>
                <strong>9th (triplen) — 450Hz, zero sequence:</strong> adds in neutral
              </li>
              <li>
                <strong>11th — 550Hz, negative sequence:</strong> general heating
              </li>
            </ul>
            <p>
              <strong>Total Harmonic Distortion (THD):</strong> THD = √(I₃² + I₅² + I₇² + … + Iₙ²) /
              I₁ × 100% (where I₁ = fundamental current and Iₙ = nth harmonic current).
            </p>
            <p>
              <strong>Common harmonic sources in buildings:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Variable speed drives (VSDs):</strong> 5th, 7th, 11th, 13th harmonics
              </li>
              <li>
                <strong>UPS systems:</strong> depends on design, typically 5th, 7th
              </li>
              <li>
                <strong>LED drivers:</strong> 3rd harmonic primarily
              </li>
              <li>
                <strong>IT equipment (SMPS):</strong> 3rd, 5th harmonics
              </li>
              <li>
                <strong>Discharge lighting:</strong> 3rd harmonic from magnetic ballasts
              </li>
            </ul>
            <p>
              <strong>Key principle:</strong> Odd harmonics dominate in power systems; triplen
              harmonics (3rd, 9th, 15th) are particularly problematic in three-phase systems.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Effects on Neutral Conductors">
            <p>
              In a balanced three-phase system with linear loads, phase currents cancel in the
              neutral. However, triplen harmonics are zero-sequence and add together, potentially
              causing the neutral current to exceed the phase current.
            </p>
            <p>
              <strong>Critical warning:</strong> A circuit with 50% third harmonic per phase can
              have neutral current equal to 1.5 times the phase current. Standard neutral sizing
              (equal to or smaller than phase) is inadequate for high harmonic loads.
            </p>
            <p>
              <strong>Neutral current with harmonics:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>0-15% 3rd harmonic:</strong> ≤45% of phase — standard sizing (= phase or
                50%)
              </li>
              <li>
                <strong>15-33% 3rd harmonic:</strong> 45-100% of phase — equal to phase minimum
              </li>
              <li>
                <strong>33-45% 3rd harmonic:</strong> 100-135% of phase — larger than phase
              </li>
              <li>
                <strong>&gt;45% 3rd harmonic:</strong> &gt;135% of phase — significantly
                larger/separate
              </li>
            </ul>
            <p>
              <strong>BS 7671 requirements (Appendix 11):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Consider harmonic content when sizing neutrals</li>
              <li>For single-core cables, neutral may need to be larger than phase</li>
              <li>For multicore cables, phase derating may be required</li>
              <li>Third harmonic content &gt;15% requires consideration</li>
            </ul>
            <p>
              <strong>Design practice:</strong> For circuits serving IT equipment or LED lighting,
              size neutral equal to or larger than phase conductors.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Engineering Recommendation G5/4-1">
            <p>
              G5/4-1 is the UK standard (issued by ENA — Energy Networks Association) that sets
              limits for harmonic voltage distortion and customer emission limits. It applies to all
              installations connected to the public distribution network.
            </p>
            <p>
              <strong>Voltage THD planning levels (THD / individual odd / individual even):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>LV (400V):</strong> 5% / 4% / 2%
              </li>
              <li>
                <strong>HV (11kV):</strong> 4% / 3% / 1.5%
              </li>
              <li>
                <strong>EHV (33kV+):</strong> 3% / 2% / 1%
              </li>
            </ul>
            <p>
              <strong>Stage assessment process:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Stage 1 — simplified assessment:</strong> for small loads, if total
                harmonic-producing load is &lt;25% of supply capacity and individual equipment meets
                EN standards, no further assessment needed
              </li>
              <li>
                <strong>Stage 2 — detailed assessment:</strong> calculate harmonic currents from
                equipment data, apply to network impedance, check against emission limits
              </li>
              <li>
                <strong>Stage 3 — network study:</strong> full harmonic penetration study using
                power system analysis software, required for large or complex installations
              </li>
            </ul>
            <p>
              <strong>Equipment emission standards:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>IEC 61000-3-2:</strong> equipment ≤16A per phase
              </li>
              <li>
                <strong>IEC 61000-3-12:</strong> equipment 16-75A per phase
              </li>
              <li>
                <strong>G5/4-1:</strong> large installations and custom equipment
              </li>
            </ul>
            <p>
              <strong>DNO interface:</strong> For installations &gt;1MVA or with significant
              non-linear loads, early engagement with DNO is essential.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="VSD Harmonics and Mitigation">
            <p>
              Variable Speed Drives are major harmonic sources in building services. Understanding
              their harmonic signature and mitigation options is essential for modern HVAC system
              design.
            </p>
            <p>
              <strong>Typical VSD harmonic current spectrum (6-pulse, % of I₁):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>5th (250Hz): 25-40%</li>
              <li>7th (350Hz): 15-25%</li>
              <li>11th (550Hz): 8-12%</li>
              <li>13th (650Hz): 5-10%</li>
              <li>THDi (typical): 35-80%</li>
            </ul>
            <p>
              <strong>Harmonic mitigation options (THDi achieved / cost / application):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Standard 6-pulse:</strong> 35-80% / base / small drives, weak networks
              </li>
              <li>
                <strong>Line reactor (3%):</strong> 35-45% / low / moderate improvement
              </li>
              <li>
                <strong>DC choke:</strong> 30-40% / low / built into many drives
              </li>
              <li>
                <strong>12-pulse:</strong> 10-15% / high / large drives &gt;100kW
              </li>
              <li>
                <strong>18-pulse:</strong> 5-8% / very high / critical applications
              </li>
              <li>
                <strong>Active front end (AFE):</strong> 3-5% / high / best harmonic performance
              </li>
              <li>
                <strong>Passive filter:</strong> 8-15% / medium / central installation
              </li>
              <li>
                <strong>Active filter:</strong> &lt;5% / high / central, adaptive
              </li>
            </ul>
            <p>
              <strong>Selection guidance:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Small drives (&lt;30kW):</strong> standard with DC choke usually acceptable
              </li>
              <li>
                <strong>Medium drives (30-100kW):</strong> line reactor or passive filter
              </li>
              <li>
                <strong>Large drives (&gt;100kW):</strong> 12-pulse, 18-pulse, or AFE
              </li>
              <li>
                <strong>Multiple drives:</strong> central active filter often most economical
              </li>
            </ul>
            <p>
              <strong>Design consideration:</strong> Always check G5/4-1 compliance for total VSD
              installation, not individual drives.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — THD calculation:</strong> A VSD draws 100A fundamental with 30A
              5th and 20A 7th harmonic. Calculate THDi.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>THDi = √(I₅² + I₇²) / I₁ × 100%</li>
              <li>THDi = √(30² + 20²) / 100 × 100%</li>
              <li>THDi = √(900 + 400) / 100 × 100%</li>
              <li>THDi = √1300 / 100 × 100%</li>
              <li>
                THDi = 36.1 / 100 × 100% = <strong>36.1%</strong>
              </li>
            </ul>
            <p>
              <strong>Example 2 — neutral current:</strong> Three phases each carry 50A with 40%
              third harmonic. Calculate neutral current.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Third harmonic per phase = 50A × 0.4 = 20A</li>
              <li>Third harmonics add in neutral (zero sequence)</li>
              <li>Neutral 3rd harmonic = 3 × 20A = 60A</li>
              <li>Fundamental currents cancel (balanced load): neutral fundamental ≈ 0A</li>
              <li>
                Total neutral current ≈ <strong>60A</strong> (exceeds phase current of 50A)
              </li>
            </ul>
            <p>
              <strong>Example 3 — filter sizing:</strong> Total VSD load is 200kW at 0.95 pf. THDi
              is 40%. Size an active filter to achieve &lt;8% THDi.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Fundamental current: I₁ = 200kW / (√3 × 400V × 0.95) = 304A</li>
              <li>Total harmonic current: Ih = 304A × 0.40 = 122A</li>
              <li>Target harmonic current for 8% THDi: Ih_target = 304A × 0.08 = 24A</li>
              <li>Filter capacity needed: Filter = 122A - 24A = 98A harmonic current</li>
              <li>
                Filter kVA ≈ √3 × 400 × 98 = <strong>68 kVA active filter</strong>
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Harmonic assessment checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Identify all non-linear loads (VSDs, UPS, IT, LED)</li>
              <li>Calculate total harmonic-producing load as % of supply</li>
              <li>Assess against G5/4-1 Stage 1 criteria</li>
              <li>Check neutral conductor sizing for triplen harmonics</li>
              <li>Consider cable derating if THD &gt;10%</li>
              <li>Specify mitigation if limits exceeded</li>
            </ul>
            <p>
              <strong>Key values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                G5/4-1 voltage THD limit (LV): <strong>5%</strong>
              </li>
              <li>
                6-pulse VSD typical THDi: <strong>35-80%</strong>
              </li>
              <li>
                Neutral sizing trigger: <strong>&gt;15% 3rd harmonic</strong>
              </li>
              <li>
                Stage 1 simplified limit: <strong>&lt;25% of supply</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Ignoring cumulative effect</strong> — many small loads add up
                </li>
                <li>
                  <strong>Undersized neutrals</strong> — can overheat with triplen harmonics
                </li>
                <li>
                  <strong>PFC capacitors without detuning</strong> — can amplify harmonics
                </li>
                <li>
                  <strong>Late assessment</strong> — retrofitting filters is expensive
                </li>
              </ul>
            }
            doInstead="Survey all non-linear load equipment, run a Stage 1 G5/4-1 check at design stage, default to full-size neutrals for IT and LED-heavy circuits, and detune any PFC bank installed alongside drives."
          />

          <SectionRule />

          <Scenario
            title="Open-plan office — neutral overheating after LED retrofit"
            situation={
              <>
                A 1,200&nbsp;m² open-plan office has just had a full LED panel retrofit alongside
                300 new desktop workstations. The FM team report the sub-main neutral is running
                10–15&nbsp;°C hotter than the lines and a thermal-imaging survey shows the neutral
                bar in the DB clearly warmer than the phase bars. THD-i measured at 38% on the
                3rd harmonic.
              </>
            }
            whatToDo={
              <>
                Apply Reg 524.2.3(a): the expected neutral current must include harmonics. With
                3rd harmonic above 33%, the neutral on a balanced three-phase circuit can equal
                or exceed the line current. Recalculate the sub-main against BS 7671 Appendix 11
                derating: cable sized on a 4-core where the neutral was assumed unloaded must be
                upsized, or convert to a separate full-size neutral. Specify low-distortion LED
                drivers and PCs with active PFC at next refresh. Consider an active or hybrid
                filter at the DB if THD-i above 50%.
              </>
            }
            whyItMatters={
              <>
                Under-sized neutrals overheat insulation, accelerate cable failure and create a
                fire risk. Reg 524.2.3(a) makes inclusion of harmonic content in neutral sizing
                a mandatory design step — getting caught with a degraded neutral after a
                workstation refresh is a defendable design failure. ENA G5/4-1 emission limits
                also apply at the supply boundary.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Harmonics are integer multiples of 50&nbsp;Hz, generated by every non-linear load — LED drivers, VSDs, UPS, switched-mode PSUs, computers.',
              'Reg 524.2.3(a) makes inclusion of harmonic content mandatory when sizing neutral conductors — &lsquo;expected maximum current including harmonics&rsquo;.',
              'Triplen harmonics (3rd, 9th, 15th) are zero-sequence — they sum in the neutral instead of cancelling. Above 33% 3rd-harmonic the neutral can exceed line current.',
              'BS 7671 Appendix 11 gives cable derating factors for harmonic-loaded circuits — used in conjunction with Appendix 4 grouping factors.',
              'ENA G5/4-1 sets DNO planning levels for harmonic emission at the PCC; exceeding triggers reinforcement or filter requirements.',
              'Mitigation order: choose better equipment → line reactors / DC link chokes → 12 / 18-pulse drives → active front-end → active filters.',
              'Always specify pf and THD limits in the lighting and IT specifications — and verify at FAT.',
              'Size for the future: harmonic content tends to rise with each tech refresh. Today&rsquo;s 30% THD is tomorrow&rsquo;s 50%.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section1-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Power factor considerations
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section1-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Future load allowances
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule4Section1_4;
