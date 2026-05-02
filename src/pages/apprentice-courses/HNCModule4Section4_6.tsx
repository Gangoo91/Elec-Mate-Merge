/**
 * Module 4 · Section 4 · Subsection 6 — Energy Efficient Lighting
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   LED selection (efficacy / CRI / L70 life), Building Regs Part L 2021 minimum
 *   95 luminaire lm/W, BS EN 15193-1 LENI calculation methodology and benchmarks,
 *   constant light output (CLO), task-ambient design and combined-controls savings
 *   (50-70%).
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

const TITLE = 'Energy Efficient Lighting - HNC Module 4 Section 4.6';
const DESCRIPTION =
  'Master energy efficient lighting design for building services: LED selection criteria, efficacy targets, Part L requirements, controls strategies, and LENI calculations for compliance.';

const quickCheckQuestions = [
  {
    id: 'led-efficacy',
    question: 'What is a typical efficacy for modern commercial LED luminaires?',
    options: ['50 lm/W', '80 lm/W', '120-150 lm/W', '200 lm/W'],
    correctIndex: 2,
    explanation:
      'Modern commercial LED luminaires typically achieve 120-150 lumens per watt efficacy. This is a significant improvement over fluorescent (60-100 lm/W) and has driven the rapid adoption of LED technology in building services.',
  },
  {
    id: 'part-l-efficacy',
    question: 'What is the minimum luminaire efficacy required by Part L for general lighting?',
    options: ['50 llm/W', '70 llm/W', '95 llm/W', '120 llm/W'],
    correctIndex: 2,
    explanation:
      'Part L 2021 requires minimum 95 luminaire lumens per circuit-watt for general lighting in new buildings. This is an increase from the previous 60 llm/W requirement, reflecting improved LED technology.',
  },
  {
    id: 'leni-definition',
    question: 'What does LENI measure in building performance?',
    options: [
      'Luminaire efficiency',
      'Annual lighting energy consumption per unit floor area',
      'Light level uniformity',
      'Lamp lumen maintenance',
    ],
    correctIndex: 1,
    explanation:
      'LENI (Lighting Energy Numeric Indicator) measures annual lighting energy consumption in kWh per square metre per year (kWh/m²/year). It enables comparison between buildings and verification of Part L compliance.',
  },
  {
    id: 'controls-savings',
    question:
      'What combined energy saving can typically be achieved with occupancy and daylight controls?',
    options: ['10-20%', '30-40%', '50-70%', '80-90%'],
    correctIndex: 2,
    explanation:
      'Combined occupancy detection and daylight-linked dimming typically achieves 50-70% energy savings compared to manually controlled lighting. This assumes well-designed, properly commissioned controls in appropriate applications.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What does L70 mean when specifying LED lamp life?',
    options: [
      '70,000 hours total life',
      '70% of luminaires will still be working',
      'Output has reduced to 70% of initial',
      '70% power consumption',
    ],
    correctAnswer: 2,
    explanation:
      'L70 is the rated life at which light output has depreciated to 70% of initial lumens. For example, L70 = 50,000 hours means the LED will produce 70% of its initial output after 50,000 hours of operation.',
  },
  {
    id: 2,
    question: 'What is the formula for calculating LENI?',
    options: [
      'LENI = Total power / Floor area',
      'LENI = (Installed power × Annual hours × Controls factor) / Floor area',
      'LENI = Lumens / Watts',
      'LENI = Illuminance × Area × Hours',
    ],
    correctAnswer: 1,
    explanation:
      'LENI = W × (tD × FD × FO) + (tN × FO) divided by floor area, where W is installed power, tD/tN are day/night hours, FD is daylight factor, and FO is occupancy factor. This accounts for controls savings.',
  },
  {
    id: 3,
    question: 'What Part L requirement relates to lighting controls in spaces over 30m²?',
    options: [
      'Time scheduling only',
      'Occupancy sensing and/or daylight dimming',
      'Manual switching only',
      'No specific requirement',
    ],
    correctAnswer: 1,
    explanation:
      'Part L requires presence/absence detection in office spaces over 30m². Additionally, daylight-linked dimming is required for luminaires within 3m of windows. These measures are credited in LENI calculations.',
  },
  {
    id: 4,
    question: 'What is the typical payback period for LED retrofit in a commercial building?',
    options: ['1-2 years', '2-4 years', '5-7 years', '10+ years'],
    correctAnswer: 1,
    explanation:
      'LED retrofits typically achieve payback in 2-4 years through energy savings and reduced maintenance. Actual payback depends on operating hours, existing system efficiency, and electricity costs.',
  },
  {
    id: 5,
    question:
      'Why is colour rendering index (CRI) important when selecting energy efficient lighting?',
    options: [
      'Higher CRI means higher efficacy',
      'CRI affects energy consumption directly',
      'Good CRI ensures visual quality despite lower illuminance',
      'CRI determines lamp life',
    ],
    correctAnswer: 2,
    explanation:
      'Good CRI (Ra ≥ 80) maintains visual quality even when optimising for energy efficiency. Lower illuminance may be acceptable with good colour rendering. Specifying CRI prevents sacrificing visual quality for efficiency.',
  },
  {
    id: 6,
    question: 'What is the purpose of constant light output (CLO) control?',
    options: [
      'Maintaining colour temperature',
      'Compensating for lamp depreciation to save energy',
      'Emergency lighting backup',
      'Preventing flicker',
    ],
    correctAnswer: 1,
    explanation:
      'CLO starts LEDs at reduced power when new, gradually increasing output as lumen depreciation occurs. This maintains consistent illuminance while saving energy over the lamp life (typically 10-15% saving).',
  },
  {
    id: 7,
    question: "What does 'parasitic power' refer to in lighting systems?",
    options: [
      'Power consumed by controls, sensors and standby',
      'Power lost as heat in luminaires',
      'Emergency lighting power',
      'Motor power in automated blinds',
    ],
    correctAnswer: 0,
    explanation:
      'Parasitic power is consumed by controls, sensors, and luminaires in standby mode even when lights are off. LENI calculations include parasitic loads. Well-designed systems minimise parasitic consumption.',
  },
  {
    id: 8,
    question: 'What approach does Part L recommend for demonstrating lighting compliance?',
    options: [
      'Prescriptive power density only',
      'LENI calculation with target benchmarks',
      'Visual inspection only',
      'Manufacturer certification',
    ],
    correctAnswer: 1,
    explanation:
      'Part L uses LENI to demonstrate compliance against benchmark values. The calculation accounts for installed power, operating hours, and control factors. The result must not exceed the target LENI for the building type.',
  },
  {
    id: 9,
    question: 'What is a typical LENI target for a new office building?',
    options: ['10 kWh/m²/year', '25 kWh/m²/year', '50 kWh/m²/year', '100 kWh/m²/year'],
    correctAnswer: 1,
    explanation:
      'Typical LENI targets for new offices are around 25 kWh/m²/year. This assumes modern LED luminaires, good controls, and reasonable operating hours. Actual values vary by building type and use pattern.',
  },
  {
    id: 10,
    question: 'What LED driver feature improves energy efficiency at reduced light levels?',
    options: [
      'Emergency backup',
      'DALI compatibility',
      'High power factor at all dim levels',
      'Wireless connectivity',
    ],
    correctAnswer: 2,
    explanation:
      'Maintaining high power factor across the dimming range ensures efficient power conversion even at low light levels. Poor drivers may have reduced efficiency when dimmed, wasting energy. Specify quality drivers for dimming applications.',
  },
];

const faqs = [
  {
    question: 'How do I balance efficacy with other lighting quality factors?',
    answer:
      "Don't sacrifice visual quality for efficiency alone. Specify minimum CRI (Ra ≥ 80 for offices, Ra ≥ 90 for colour-critical), appropriate colour temperature, good glare control (UGR), and adequate illuminance. Modern high-efficacy LEDs can achieve all these requirements. The most efficient lamp is not always the best choice if it compromises visual comfort.",
  },
  {
    question: 'What are the key factors in selecting LED luminaires for retrofit?',
    answer:
      'Consider: existing mounting and ceiling system compatibility, electrical supply requirements, control system integration (DALI, 1-10V), thermal management (LED life affected by temperature), optical distribution match to room geometry, aesthetic match to building character, warranty and manufacturer support. Also verify electrical installation will support new luminaires without rewiring.',
  },
  {
    question: 'How does Part L treat display lighting differently?',
    answer:
      'Display lighting in retail has separate requirements recognising higher illuminance needs. The efficacy requirement may be relaxed, but the overall LENI target still applies. Accent and feature lighting should use efficient sources where possible. Emergency lighting and external lighting also have separate provisions.',
  },
  {
    question: 'What documentation is required for Part L lighting compliance?',
    answer:
      'Submit: LENI calculation showing compliance with target, luminaire schedules with efficacy data, controls specification and commissioning evidence, photometric calculations demonstrating illuminance requirements met, and declarations that the installation complies with the specification. Building control may request evidence during final inspection.',
  },
  {
    question: 'How do I calculate annual operating hours for LENI?',
    answer:
      'Use BS EN 15193-1 Annex F which provides standard annual operating hours by building type. For example, offices typically use 2500 daylight hours and 250 non-daylight hours. Actual values should reflect the specific building usage pattern. Controls factors (FD for daylight, FO for occupancy) further modify effective operating hours.',
  },
  {
    question: 'What is the role of commissioning in achieving energy efficient lighting?',
    answer:
      'Commissioning is essential - controls only save energy when properly set up. Commission daylight sensors in representative conditions, adjust time schedules to actual use patterns, set appropriate hold-on times for occupancy sensors, verify scene settings match requirements, and train building operators. Poor commissioning can result in controls being overridden or bypassed.',
  },
];

const HNCModule4Section4_6 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 4 · Section 4 · Subsection 6"
            title="Energy Efficient Lighting"
            description="Designing sustainable lighting systems that meet Part L requirements while maintaining visual quality."
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              'Select LED luminaires based on efficacy and quality criteria',
              'Understand Part L requirements for lighting installations',
              'Calculate LENI for compliance demonstration',
              'Design control strategies for maximum energy savings',
              'Apply constant light output and other efficiency features',
              'Document and commission energy efficient lighting systems',
            ]}
            initialVisibleCount={3}
          />

          <TLDR
            points={[
              'Modern LED luminaires hit 130–180 lm/W; the days of 60 lm/W as a Part L floor are gone — current targets are luminaire (not source) efficacy ≥ 95 lm/W for general office.',
              'LENI (Lighting Energy Numerical Indicator, kWh/m²/yr) per BS EN 15193-1 is the calculation Part L uses. Includes parasitic + emergency + control loads — easy to under-count.',
              'Constant Light Output (CLO) compensates for L70 lumen depreciation by starting at 70–80 % power and ramping over the lifetime — saves 10–15 % over the design life.',
              'Driver quality matters: high power factor (≥ 0.95), low THD (&lt; 15 %), flicker-free per IEEE 1789, and DALI-2 compliance for future-proof controls.',
              'AFDD (Reg 421.1.7) is now recommended for AC final circuits — particularly relevant for LED final lighting circuits where driver-end faults can develop arcing.',
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 421.1.7"
            clause="Regulation 421.1.7 has been introduced recommending the installation of arc fault detection devices (AFDDs) to mitigate the risk of fire in AC final circuits of a fixed installation due to the effects of arc fault currents."
            meaning={
              <>
                A4:2026 introduced Reg 421.1.7 as a <strong>recommendation</strong> (not a
                mandate) — note the wording carefully. AFDDs detect series and parallel arc faults
                that an MCB or RCD won’t see. For dense LED lighting circuits with multiple
                luminaire drivers in series, drivers ageing in elevated ambients, or routes through
                combustible materials, AFDD on the final circuit is a sensible design choice. The
                HNC designer’s job is to apply the recommendation through risk assessment — call
                it out on the load schedule where the fire-load justifies it.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 421.1.7."
          />

          <SectionRule />

          <ConceptBlock title="LED Selection and Efficacy Targets">
            <p>
              LED technology has transformed lighting energy efficiency. Modern LEDs achieve
              efficacies that were unthinkable with traditional sources, while providing
              excellent colour quality and controllability. Selecting the right LED involves
              balancing efficacy with other quality parameters.
            </p>
            <p>
              <strong>Key LED selection criteria:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Efficacy (lm/W):</strong> higher is better, but not at expense of quality
              </li>
              <li>
                <strong>CRI (Ra):</strong> minimum 80 for offices, 90 for colour-critical
              </li>
              <li>
                <strong>CCT:</strong> appropriate colour temperature for application
              </li>
              <li>
                <strong>L70 life:</strong> rated hours to 70% lumen maintenance
              </li>
              <li>
                <strong>Warranty:</strong> minimum 5 years for commercial applications
              </li>
            </ul>
            <p>
              <strong>Light source efficacy comparison (source type / typical efficacy / typical CRI):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Incandescent — 10-15 lm/W — 100</li>
              <li>Halogen — 15-25 lm/W — 100</li>
              <li>Fluorescent T8 — 60-80 lm/W — 80-90</li>
              <li>Fluorescent T5 — 80-100 lm/W — 80-90</li>
              <li>LED (standard) — 100-130 lm/W — 80-90</li>
              <li>LED (high efficacy) — 150-200 lm/W — 80-90</li>
            </ul>
            <p>
              <strong>LED life rating (lumen maintenance):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>L70:</strong> hours until 70% of initial lumens (common rating)
              </li>
              <li>
                <strong>L80:</strong> hours until 80% of initial lumens (premium rating)
              </li>
              <li>
                <strong>B10:</strong> 10% of population will fall below L value
              </li>
              <li>
                Example: L70B10 = 50,000h means 90% of LEDs will still produce 70% output at
                50,000h
              </li>
            </ul>
            <p>
              <strong>Specification tip:</strong> Request IES TM-21 projections for LED life
              claims. Be wary of manufacturers claiming very long lives without supporting test
              data.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Part L Requirements for Lighting">
            <p>
              Building Regulations Approved Document L sets mandatory requirements for lighting
              energy efficiency in new and refurbished buildings. Compliance is demonstrated
              through the LENI (Lighting Energy Numeric Indicator) calculation methodology.
            </p>
            <p>
              <strong>Part L lighting requirements (requirement / value):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Minimum luminaire efficacy (general) — 95 luminaire lumens/circuit-watt</li>
              <li>Minimum luminaire efficacy (display) — 70 luminaire lumens/circuit-watt</li>
              <li>External lighting efficacy — 70 luminaire lumens/circuit-watt</li>
              <li>Occupancy control (spaces &gt;30m²) — required</li>
              <li>Daylight control (within 3m of windows) — required</li>
              <li>Local manual switching — accessible from task position</li>
            </ul>
            <p>
              <strong>Lighting zones (Part L):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Perimeter zone:</strong> within 3m of external windows
              </li>
              <li>
                <strong>Core zone:</strong> areas without significant daylight
              </li>
              <li>
                <strong>Circulation:</strong> corridors, stairs, lobbies
              </li>
              <li>
                <strong>Task areas:</strong> workstations, desks
              </li>
            </ul>
            <p>
              <strong>Control requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Perimeter: daylight-linked dimming</li>
              <li>Spaces &gt;30m²: occupancy detection</li>
              <li>All areas: manual override capability</li>
              <li>External: photocell + time scheduling</li>
            </ul>
            <p>
              <strong>Note:</strong> Part L requirements vary between new buildings, extensions,
              and refurbishments. Check the specific requirements for your project type in the
              current Approved Document L.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="LENI Calculations for Compliance">
            <p>
              LENI (Lighting Energy Numeric Indicator) is the method used to demonstrate Part L
              compliance. It calculates annual lighting energy consumption per unit floor area,
              accounting for installed power, operating hours, and control system effectiveness.
            </p>
            <p>
              <strong>LENI calculation formula (BS EN 15193-1):</strong> LENI = W × (t<sub>D</sub>{' '}
              × F<sub>D</sub> × F<sub>O</sub>) + (t<sub>N</sub> × F<sub>O</sub>) / A.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>W</strong> = total installed lighting power (W)
              </li>
              <li>
                <strong>t<sub>D</sub></strong> = annual daylight time hours
              </li>
              <li>
                <strong>t<sub>N</sub></strong> = annual non-daylight time hours
              </li>
              <li>
                <strong>F<sub>D</sub></strong> = daylight dependency factor (0-1)
              </li>
              <li>
                <strong>F<sub>O</sub></strong> = occupancy dependency factor (0-1)
              </li>
              <li>
                <strong>A</strong> = floor area (m²)
              </li>
            </ul>
            <p>
              <strong>Typical LENI targets by building type (building type / LENI target / notes):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Office (air-conditioned) — 25 kWh/m²/year — typical 2500 operating hours</li>
              <li>Office (naturally ventilated) — 22 kWh/m²/year — more daylight opportunity</li>
              <li>Retail (non-food) — 45 kWh/m²/year — higher display lighting load</li>
              <li>Warehouse — 15 kWh/m²/year — lower illuminance, good height</li>
              <li>School — 18 kWh/m²/year — limited occupied hours</li>
              <li>Hospital (24hr areas) — 55 kWh/m²/year — continuous operation</li>
            </ul>
            <p>
              <strong>Control factors for LENI:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>F<sub>O</sub> (occupancy):</strong> 0.9-1.0 (manual), 0.7-0.9 (presence),
                0.6-0.8 (absence)
              </li>
              <li>
                <strong>F<sub>D</sub> (daylight):</strong> 0.5-0.7 (dimming within 3m), 0.8-0.9
                (switching), 1.0 (no control)
              </li>
              <li>Lower factors = better controls = lower LENI</li>
              <li>Must be supported by compliant control specification</li>
            </ul>
            <p>
              <strong>Important:</strong> LENI calculation must use actual installed power, not
              design allowance. Verify luminaire quantities and wattages match the as-installed
              condition.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Controls Strategy for Energy Efficiency">
            <p>
              Lighting controls are essential for achieving energy efficiency targets. The right
              combination of occupancy sensing, daylight linking, scheduling, and constant light
              output can deliver savings of 50-70% compared to manually controlled systems.
            </p>
            <p>
              <strong>Control strategy energy savings (control / typical saving / best application):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Presence detection (auto on/off) — 20-30% — toilets, corridors, stores
              </li>
              <li>Absence detection (manual on) — 30-50% — offices, meeting rooms</li>
              <li>Daylight-linked dimming — 20-40% — perimeter zones (within 6m)</li>
              <li>Time scheduling — 10-20% — all areas with fixed schedules</li>
              <li>Constant light output (CLO) — 10-15% — areas with long operating hours</li>
              <li>Task-ambient lighting — 15-25% — open plan offices</li>
            </ul>
            <p>
              <strong>Constant light output (CLO):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>New LEDs start at reduced power (~80%)</li>
              <li>Output increases as lumens depreciate</li>
              <li>Maintains consistent illuminance</li>
              <li>Saves 10-15% over luminaire life</li>
              <li>Requires DALI or compatible dimming</li>
            </ul>
            <p>
              <strong>Task-ambient approach:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Lower ambient level (300 lux typical)</li>
              <li>Task lighting at workstations (500 lux)</li>
              <li>User control of task light</li>
              <li>Reduces total installed power</li>
              <li>Provides individual control</li>
            </ul>
            <p>
              <strong>Commissioning checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Set daylight sensor target illuminance and verify response</li>
              <li>Adjust occupancy sensor sensitivity and time delays</li>
              <li>Configure time schedules to match actual building use</li>
              <li>Enable and verify CLO functionality</li>
              <li>Test scene settings and document for users</li>
              <li>Provide building operator training</li>
            </ul>
            <p>
              <strong>Remember:</strong> Controls only save energy when properly commissioned.
              Budget adequate time and resource for setup and user training. Monitor
              post-occupancy to verify performance.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — LENI calculation:</strong> Calculate LENI for a 500m² office
              with 5kW installed lighting, daylight dimming and absence detection.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Floor area (A) = 500m²</li>
              <li>Installed power (W) = 5000W</li>
              <li>Operating hours: tD = 2250h, tN = 250h (from BS EN 15193)</li>
              <li>FD = 0.6 (daylight dimming)</li>
              <li>FO = 0.7 (absence detection)</li>
              <li>LENI = W × [(tD × FD × FO) + (tN × FO)] / A</li>
              <li>= 5000 × [(2250 × 0.6 × 0.7) + (250 × 0.7)] / 500</li>
              <li>= 5000 × [945 + 175] / 500</li>
              <li>= 5000 × 1120 / 500</li>
              <li>= 5,600,000 / 500</li>
              <li>
                = <strong>11,200 Wh/m²/year = 11.2 kWh/m²/year</strong>
              </li>
              <li>Target for office: 25 kWh/m²/year — compliant (11.2 &lt; 25)</li>
            </ul>
            <p>
              <strong>Example 2 — Part L efficacy check:</strong> A luminaire produces 4000
              luminaire lumens and consumes 38W (including driver). Does it comply?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Luminaire efficacy = luminaire lumens / circuit watts</li>
              <li>= 4000 / 38</li>
              <li>
                = <strong>105 luminaire lm/W</strong>
              </li>
              <li>Part L minimum (general lighting): 95 llm/W</li>
              <li>Compliant (105 &gt; 95)</li>
              <li>Note: circuit watts includes driver/control gear losses</li>
            </ul>
            <p>
              <strong>Example 3 — control strategy energy saving:</strong> Estimate annual energy
              saving from adding absence detection to a 10kW office lighting load.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Base case (manual control): FO = 1.0</li>
              <li>With absence detection: FO = 0.7</li>
              <li>Annual hours: 2500h</li>
              <li>Base energy = 10kW × 2500h × 1.0 = 25,000 kWh/year</li>
              <li>With controls = 10kW × 2500h × 0.7 = 17,500 kWh/year</li>
              <li>
                Saving = 25,000 − 17,500 = <strong>7,500 kWh/year</strong>
              </li>
              <li>
                = <strong>30% reduction</strong>
              </li>
              <li>At £0.30/kWh = £2,250/year cost saving</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Design for efficiency checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Specify high-efficacy LEDs (≥100 lm/W system)</li>
              <li>Design to target illuminance (avoid over-lighting)</li>
              <li>Maximise daylight contribution where possible</li>
              <li>Zone controls appropriately (perimeter/core/task)</li>
              <li>Include CLO for areas with long operating hours</li>
              <li>Calculate LENI to verify compliance</li>
            </ul>
            <p>
              <strong>Compliance documentation:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>LENI calculation with assumptions</li>
              <li>Luminaire schedule with efficacy data</li>
              <li>Controls specification and zone drawings</li>
              <li>Commissioning records and certificates</li>
              <li>Building log book information</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Ignoring parasitic loads</strong> — include standby power in
                  calculations
                </li>
                <li>
                  <strong>Poor commissioning</strong> — controls need proper setup to save energy
                </li>
                <li>
                  <strong>Over-lighting</strong> — designing above required illuminance wastes
                  energy
                </li>
                <li>
                  <strong>Wrong control factors</strong> — use realistic FD and FO values
                </li>
              </ul>
            }
            doInstead="Add control / sensor parasitic loads to the LENI total, scope a real commissioning visit, design to the BS EN 12464-1 task lux (no headroom), and pick FD / FO factors from BS EN 15193-1 that match the controls actually specified."
          />

          <SectionRule />

          <Scenario
            title="Hitting LENI ≤ 25 kWh/m²/yr on a flagship office fit-out"
            situation={
              <>
                You’re leading the lighting design for a 4-storey, 6,000 m² speculative office.
                Client targets BREEAM Excellent and a LENI ≤ 25 kWh/m²/yr to evidence Part L 2021
                compliance plus BREEAM Hea 06 and Ene 03. Open-plan, meeting rooms, breakout, WCs,
                back-of-house. You’ve got the lighting criteria locked from sub-section 4.1.
              </>
            }
            whatToDo={
              <>
                Spec luminaire efficacy ≥ 110 lm/W (open plan), ≥ 90 lm/W (meeting / breakout). Use
                CLO drivers with DALI-2, PF ≥ 0.95, THD &lt; 15 %, flicker-free. Strategy: absence
                detection across the open plan, presence in meeting rooms and WCs, daylight-linked
                dimming on perimeter. Run the LENI calc in BS EN 15193-1: include parasitic
                (sensor + emergency drivers ≈ 1.5 kWh/m²/yr), control factor FD = 0.7 (daylight
                response), FO = 0.8 (occupancy). Initial calc lands at 18 kWh/m²/yr — comfortable
                margin against 25. On the load schedule, flag the open-plan and meeting-room
                final circuits for AFDD per Reg 421.1.7 recommendation given the high luminaire
                density and combustible ceiling void. Include the LENI workings, the photometric
                files, and the controls narrative in the O&amp;M pack.
              </>
            }
            whyItMatters={
              <>
                LENI is a <em>calculated</em> compliance route — easy to under-count parasitics
                and over-claim daylight savings. A defensible LENI ≤ 25 with margin protects the
                design when the SBEM modeller runs the building through Part L proper.
              </>
            }
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Luminaire efficacy ≥ 95 lm/W is the working Part L 2021 floor — modern offices target 110–130 lm/W.',
              'LENI per BS EN 15193-1: include parasitic (sensors, emergency, controls) and pick realistic FD / FO factors.',
              'Constant Light Output (CLO) holds the maintained illuminance over life — saves 10–15 % across the design horizon.',
              'Drivers: PF ≥ 0.95, THD &lt; 15 %, flicker-free per IEEE 1789, DALI-2 for full controls compatibility.',
              'Controls (absence + daylight) are where the real LENI savings come from — efficacy alone won’t hit 25 kWh/m²/yr.',
              'Reg 421.1.7 (A4:2026) recommends AFDDs for AC final circuits — apply to lighting where fire-load justifies it.',
              'Commission with a real measurement visit — modelled LENI is design intent, measured kWh is reality.',
              'Document driver, photometric file, controls narrative and LENI workings in the O&amp;M for compliance audit.',
            ]}
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section4-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                External lighting
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Back to module <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Module 4
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule4Section4_6;
