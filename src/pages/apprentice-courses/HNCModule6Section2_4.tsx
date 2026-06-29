/**
 * Module 6 · Section 2 · Subsection 4 — Small-Scale Wind
 * HNC Electrical Engineering for Building Services (Sustainability and Environmental Engineering)
 *   Building-mounted and standalone turbines, site assessment, planning considerations, and grid connection
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  CommonMistake,
  ConceptBlock,
  FAQ,
  KeyTakeaways,
  LearningOutcomes,
  RegsCallout,
  Scenario,
  SectionRule,
  TLDR,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Small-Scale Wind - HNC Module 6 Section 2.4';
const DESCRIPTION =
  'Master small-scale wind energy systems: building-mounted and standalone turbines, site wind assessment, Weibull distribution, planning considerations, and grid connection requirements for UK installations.';

const quickCheckQuestions = [
  {
    id: 'turbine-types',
    question:
      'What is the main advantage of a horizontal axis wind turbine (HAWT) over a vertical axis wind turbine (VAWT)?',
    options: [
      'Higher energy capture efficiency',
      'Better performance in turbulent wind',
      'Lower installation costs',
      'No yaw mechanism required',
    ],
    correctIndex: 0,
    explanation:
      'HAWTs typically achieve higher energy capture efficiency (Cp values of 0.35-0.45) compared to VAWTs (0.25-0.35) because they can better optimise blade angle relative to wind direction and operate at higher tip-speed ratios.',
  },
  {
    id: 'wind-assessment',
    question: 'Why is the Weibull distribution used in wind resource assessment?',
    options: [
      'It accurately models the statistical distribution of wind speeds',
      'It converts wind speed directly into electrical power output',
      'It calculates the structural loading on the turbine tower',
      'It predicts the noise level produced at the nearest dwelling',
    ],
    correctIndex: 0,
    explanation:
      'The Weibull distribution accurately models the probability distribution of wind speeds at a site, using shape (k) and scale (c) parameters. This enables calculation of annual energy yield by combining the wind speed distribution with the turbine power curve.',
  },
  {
    id: 'building-mounted',
    question:
      'Why are building-mounted wind turbines generally less effective than freestanding installations?',
    options: [
      'They are limited to a maximum hub height of 11.1 metres',
      'They require a more expensive G99 grid connection application',
      'Building interference creates turbulent, low-velocity airflow',
      'They cannot use a yaw mechanism to track the wind direction',
    ],
    correctIndex: 2,
    explanation:
      'Buildings create significant turbulence and reduce wind speed in their vicinity. The building effect zone extends to approximately 2-3 times building height. Turbulent flow reduces energy capture and increases mechanical stress on the turbine.',
  },
  {
    id: 'grid-connection',
    question:
      'For a small wind turbine connecting to the UK grid, what is the maximum single-phase inverter capacity typically permitted under the G98 notification process?',
    options: [
      '1.6 kW',
      '2.5 kW',
      '3.68 kW',
      '6 kW',
    ],
    correctIndex: 2,
    explanation:
      'Under G98 (formerly G83), single-phase inverters up to 3.68 kW (16 A) can be connected using the notification process without requiring a formal DNO application. Above this threshold, or for three-phase systems above 11.04 kW, a G99 application is required.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'The power available in wind is proportional to:',
    options: [
      'Wind speed',
      'Wind speed cubed',
      'Wind speed squared',
      'Wind speed to the fourth power',
    ],
    correctAnswer: 1,
    explanation:
      'Wind power is proportional to the cube of wind speed (P = ½ρAV³). This means doubling wind speed increases available power by a factor of eight, making site selection critical.',
  },
  {
    id: 2,
    question:
      'The Betz limit states that the maximum theoretical efficiency of a wind turbine is approximately:',
    options: [
      '75%',
      '42%',
      '59%',
      '50%',
    ],
    correctAnswer: 2,
    explanation:
      'The Betz limit (59.3% or 16/27) is the theoretical maximum proportion of wind energy that can be extracted by a turbine. Practical turbines achieve 35-45% due to aerodynamic losses, generator efficiency, and tip losses.',
  },
  {
    id: 3,
    question:
      'A site has an average wind speed of 5 m/s. If an alternative site has 6 m/s average, approximately how much more energy would the same turbine produce?',
    options: [
      '44% more',
      '20% more',
      '100% more',
      '73% more',
    ],
    correctAnswer: 3,
    explanation:
      'Energy is proportional to velocity cubed: (6/5)³ = 1.728, representing 72.8% more energy. This demonstrates why even small increases in average wind speed significantly impact annual yield.',
  },
  {
    id: 4,
    question: 'In a Weibull distribution with shape parameter k = 2, the distribution is known as:',
    options: [
      'Rayleigh distribution',
      'Normal distribution',
      'Exponential distribution',
      'Uniform distribution',
    ],
    correctAnswer: 0,
    explanation:
      'When k = 2, the Weibull distribution becomes the Rayleigh distribution, which is commonly used for wind speed analysis. Most UK sites have k values between 1.8 and 2.5.',
  },
  {
    id: 5,
    question: 'The capacity factor of a small wind turbine is typically:',
    options: [
      '5-15%',
      '15-30%',
      '50-60%',
      '35-45%',
    ],
    correctAnswer: 1,
    explanation:
      'Small wind turbines typically achieve capacity factors of 15-30% in the UK, compared to 25-45% for large utility-scale turbines. This reflects lower hub heights, more turbulent wind regimes, and less optimal siting.',
  },
  {
    id: 6,
    question:
      'What minimum hub height above nearby obstructions is generally recommended for small wind turbines?',
    options: [
      '5 metres',
      '15 metres',
      '10 metres',
      '20 metres',
    ],
    correctAnswer: 2,
    explanation:
      'A minimum of 10 metres clearance above obstructions within a 150m radius is recommended to avoid turbulent wake effects. Higher installations capture stronger, more consistent wind.',
  },
  {
    id: 7,
    question:
      'Under UK permitted development rights, a standalone domestic wind turbine must not exceed what hub height?',
    options: [
      '9 metres',
      '20 metres',
      '15 metres',
      '11.1 metres',
    ],
    correctAnswer: 3,
    explanation:
      'Permitted development rights in England allow standalone turbines with hub height not exceeding 11.1 metres and overall height not exceeding 11.1 metres plus half the rotor diameter, subject to other conditions.',
  },
  {
    id: 8,
    question: 'Wind shear describes:',
    options: [
      'The increase in wind speed with height above ground',
      'The effect of buildings on wind direction',
      'The force exerted on turbine blades',
      'The variation in wind speed throughout the day',
    ],
    correctAnswer: 0,
    explanation:
      'Wind shear is the increase in wind speed with height, typically modelled using the power law: V₂/V₁ = (h₂/h₁)^α where α is the shear exponent (typically 0.14-0.25 depending on terrain roughness).',
  },
  {
    id: 9,
    question:
      'A 5 kW turbine at a site with capacity factor 0.22 would generate approximately how much energy annually?',
    options: [
      '4,380 kWh',
      '9,636 kWh',
      '8,760 kWh',
      '43,800 kWh',
    ],
    correctAnswer: 1,
    explanation:
      'Annual energy = Rated power × Hours in year × Capacity factor = 5 kW × 8,760 hours × 0.22 = 9,636 kWh. This represents the actual expected output compared to theoretical maximum.',
  },
  {
    id: 10,
    question:
      'Which noise level at the nearest dwelling typically triggers a planning concern for small wind turbines?',
    options: [
      '25 dB(A)',
      '35 dB(A)',
      '45 dB(A)',
      '55 dB(A)',
    ],
    correctAnswer: 2,
    explanation:
      'ETSU-R-97 guidelines typically limit turbine noise to 35-40 dB(A) at dwellings during daytime or 5 dB above background, whichever is greater. Night-time limits are often 43 dB(A) or background + 5 dB.',
  },
  {
    id: 11,
    question:
      'For grid-connected small wind systems, the inverter must comply with which current UK standard?',
    options: [
      'BS 7671 Section 712 (solar PV systems)',
      'ETSU-R-97 (turbine noise assessment)',
      'MCS MIS 3003 (wind turbine installation)',
      'G98/G99 (Engineering Recommendations)',
    ],
    correctAnswer: 3,
    explanation:
      'G98 (for systems ≤16A per phase) and G99 (larger systems) are the Engineering Recommendations governing connection of generation equipment to UK distribution networks, specifying protection, power quality, and disconnection requirements.',
  },
  {
    id: 12,
    question: 'What is the primary structural concern for building-mounted wind turbines?',
    options: [
      'Dynamic loading and resonance with building structure',
      'Excessive cable voltage drop between the turbine and inverter',
      'The need for a separate earth electrode at the tower base',
      'Shading of nearby solar PV panels by the rotating blades',
    ],
    correctAnswer: 0,
    explanation:
      'Dynamic loads from turbine operation (vibration, cyclic loading) can cause resonance with building structures, potentially causing structural damage. Structural engineering assessment is essential for building-mounted installations.',
  },
];

const faqs = [
  {
    question: 'How long does wind monitoring need to be conducted before installing a turbine?',
    answer:
      'Ideally, 12 months of site-specific wind data should be collected to capture seasonal variations. As a minimum, 6 months of data correlated with nearby long-term reference data can provide reasonable estimates. For domestic installations, using wind maps (e.g., NOABL database) combined with local adjustment factors is common, though less accurate. Professional developers typically use anemometer masts at hub height with data logging for larger installations.',
  },
  {
    question: 'What maintenance do small wind turbines require?',
    answer:
      'Annual maintenance typically includes: visual inspection of blades for damage, checking tower bolt torque, verifying yaw mechanism operation (HAWTs), inspecting guy wires and foundations, testing electrical connections and earthing, and reviewing inverter/controller function. Gearbox oil changes (if applicable) are typically every 2-3 years. Budget approximately £200-400 annually for maintenance on a domestic turbine, with major component replacement reserves.',
  },
  {
    question: 'Can I install a wind turbine in an urban area?',
    answer:
      'Urban installations face significant challenges: buildings create turbulence reducing output by 50% or more compared to rated capacity; planning permission is more difficult due to noise and visual impact; and structural loading on buildings requires engineering assessment. Permitted development rights typically do not apply to building-mounted turbines. While technically possible, urban wind installations rarely achieve economic payback. Consider solar PV as a more reliable alternative in urban settings.',
  },
  {
    question: 'What is the typical payback period for a small wind turbine in the UK?',
    answer:
      'Payback periods vary enormously based on wind resource and electricity prices. A well-sited 5 kW turbine costing £15,000-25,000 installed might generate 10,000 kWh/year, saving approximately £2,500-3,000 annually at current electricity prices, suggesting 5-10 year payback. However, poorly sited turbines may never achieve payback. The Smart Export Guarantee (SEG) provides additional income for exported electricity, typically 3-15p/kWh depending on supplier.',
  },
  {
    question: 'What is the difference between G98 and G99 for grid connection?',
    answer:
      'G98 (formerly G83) applies to smaller installations: single-phase up to 3.68 kW or three-phase up to 11.04 kW per phase. It uses a simple notification process - inform the DNO and wait 28 days. G99 applies to larger systems and requires a formal application with technical studies. Both specify protection settings, power quality requirements, and the need for type-tested inverters. MCS-certified installers can complete G98 notifications on behalf of customers.',
  },
  {
    question: 'How does turbulence intensity affect small wind turbines?',
    answer:
      'Turbulence intensity (TI) measures wind speed fluctuations relative to mean speed. High TI (>18%) increases fatigue loading on blades and components, reduces energy capture due to the cubic relationship with wind speed, and can cause premature failure. Small turbines are more susceptible than large ones due to their lower inertia. IEC 61400-2 specifies turbine design classes for different turbulence environments. Building-mounted sites typically have TI of 20-40%, significantly reducing expected lifetime and output.',
  },
];

const HNCModule6Section2_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section2")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 6 · Section 2 · Subsection 4"
            title="Small-Scale Wind"
            description="Building-mounted and standalone turbines, site assessment, planning considerations, and grid connection"
            tone="purple"
          />

          <TLDR
            points={[
              "Small-scale wind covers turbines below ~50 kW: building-mounted (rare, low yield, vibration risk) and standalone pole-mounted (mast height critical for yield).",
              "Annual mean wind speed at hub height drives economics — below 5 m/s the project rarely repays; the NOABL database is the UK starting point but on-site mast measurement (ideally 12 months) is the only reliable basis for sizing.",
              "Planning permission is almost always required (Permitted Development is highly limited); G98/G99 connection rules apply identically to PV; MCS MIS 3003 covers small wind certification.",
            ]}
          />

          <RegsCallout
            source="MCS MIS 3003 — Microgeneration Installation Standard for Wind Turbine Systems + ENA EREC G98/G99"
            clause="The wind turbine and its installation shall comply with BS EN 61400 series for design and BS EN 50438 / G98 / G99 for grid connection. The site assessment shall include consideration of wind resource, turbulence intensity, planning constraints, noise emissions to BS 4142, electromagnetic interference, ice throw zone, and structural loading on the supporting structure."
            meaning={
              <>
                Small wind has more failure modes than PV — turbulence (especially building-mounted), noise to BS 4142 boundaries, ice throw, telecoms interference, and shadow flicker all need site assessment. MIS 3003 sets the certification standard; without it, no SEG/MCS payment route is available.
              </>
            }
            cite="Source: MIS 3003 Issue 4.0 — MCS / mcscertified.com"
          />

          <LearningOutcomes
            outcomes={[
              "Analyse wind turbine types and their operating principles",
              "Apply the Weibull distribution to wind resource assessment",
              "Calculate annual energy yield and capacity factor",
              "Evaluate building-mounted versus freestanding installations",
              "Understand UK planning requirements and permitted development",
              "Specify grid connection requirements under G98/G99",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Wind Turbine Fundamentals">
            <p>Small-scale wind turbines convert kinetic energy from wind into electrical energy. Understanding the fundamental physics and turbine configurations is essential for system design and performance prediction.</p>
            <p><strong>Wind Power Equation</strong></p>
            <p><span>P = ½ρAV³</span></p>
            <p>Where:</p>
            <p>P = Power (W)</p>
            <p>ρ = Air density (≈1.225 kg/m³ at sea level)</p>
            <p>A = Swept area (m²) = πr² for HAWT</p>
            <p>V = Wind velocity (m/s)</p>
            <p><strong>Turbine Type Comparison</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Typical Cp (efficiency):</strong> 0.35-0.45 — 0.25-0.35</li>
              <li><strong>Yaw mechanism:</strong> Required (tail vane or motor) — Not required - omnidirectional</li>
              <li><strong>Turbulence tolerance:</strong> Lower - affected by gusts — Higher - better in urban sites</li>
              <li><strong>Starting wind speed:</strong> 2.5-4 m/s typical — Savonius: 2 m/s, Darrieus: 4+ m/s</li>
              <li><strong>Noise level:</strong> Moderate (tip noise) — Lower typically</li>
              <li><strong>Market availability:</strong> Dominant (90%+ of market) — Niche applications</li>
            </ul>
            <p><strong>Key operating parameters:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Cut-in speed:</strong> Minimum wind speed for generation (typically 2.5-4 m/s)</li>
              <li><strong>Rated speed:</strong> Wind speed at which rated power is achieved (10-14 m/s)</li>
              <li><strong>Cut-out speed:</strong> Maximum operating wind speed before shutdown (25-30 m/s)</li>
              <li><strong>Survival speed:</strong> Maximum wind speed the structure can withstand (50-70 m/s)</li>
            </ul>
            <p><strong>Betz limit:</strong> No turbine can extract more than 59.3% (16/27) of the wind's kinetic energy, as some air must pass through to maintain flow.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Wind Resource Assessment">
            <p>Accurate wind resource assessment is critical for predicting turbine performance. The Weibull distribution provides a statistical model for wind speed variation, while understanding wind shear and turbulence helps optimise turbine placement.</p>
            <p><strong>Weibull Distribution</strong></p>
            <p><span>f(V) = (k/c)(V/c)^(k-1) × e^(-(V/c)^k)</span></p>
            <p>Where:</p>
            <p>k = Shape parameter (typically 1.8-2.5 in UK)</p>
            <p>c = Scale parameter (related to mean wind speed)</p>
            <p>V = Wind speed</p>
            <p>When k = 2, this becomes the Rayleigh distribution</p>
            <p><strong>NOABL Database</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>UK wind speed estimates</li>
              <li>1 km grid resolution</li>
              <li>10m, 25m, 45m heights</li>
              <li>Free resource for initial assessment</li>
            </ul>
            <p><strong>Wind Shear Correction</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>V₂/V₁ = (h₂/h₁)^α</li>
              <li>α = 0.14 (open terrain)</li>
              <li>α = 0.25 (suburban)</li>
              <li>α = 0.4+ (urban)</li>
            </ul>
            <p><strong>Site Selection Criteria</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Mean speed &gt; 5 m/s at hub</li>
              <li>10m clearance above obstacles</li>
              <li>Turbulence intensity &lt; 18%</li>
              <li>Unobstructed prevailing wind</li>
            </ul>
            <p><strong>Annual Energy Yield Calculation</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Capacity factor method:</strong> AEY = P_rated × 8760 × CF — ±20-30%</li>
              <li><strong>Weibull integration:</strong> AEY = ∫P(V)×f(V)dV × 8760 — ±10-15%</li>
              <li><strong>Bin method (measured data):</strong> AEY = Σ(P_i × hours_i) — ±5-10%</li>
            </ul>
            <p><strong>Critical insight:</strong> Due to the V³ relationship, a 1 m/s error in mean wind speed assessment can result in 30-50% error in energy prediction.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Installation Types and Planning Considerations">
            <p>Small wind turbines can be installed as freestanding (pole/tower mounted) or building-mounted systems. Each has distinct structural, planning, and performance characteristics that significantly affect viability.</p>
            <p><strong>Freestanding vs Building-Mounted Comparison</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Wind quality:</strong> Cleaner, laminar flow — Turbulent, reduced speed</li>
              <li><strong>Expected output:</strong> 100% of rated potential — 30-60% of rated potential</li>
              <li><strong>Structural concerns:</strong> Foundation design — Vibration, resonance, load transfer</li>
              <li><strong>Permitted development (England):</strong> Possible with conditions — Generally not permitted</li>
              <li><strong>Typical lifespan:</strong> 20-25 years — 10-15 years (fatigue issues)</li>
            </ul>
            <p><strong>Permitted Development Conditions (England)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Only one turbine per property (standalone)</li>
              <li>Hub height ≤ 11.1 metres</li>
              <li>Total height ≤ hub height + 0.5 × rotor diameter</li>
              <li>Distance from property boundary ≥ hub height + 10%</li>
              <li>Not in Conservation Areas, AONB, World Heritage Sites, or listed building curtilage</li>
              <li>Noise level ≤ 45 dB(A) at nearest premises</li>
              <li>Must be removed when no longer needed</li>
            </ul>
            <p><strong>Structural Requirements for Building-Mounted Turbines</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Structural assessment:</strong> Building must withstand dynamic loads (thrust + cyclic)</li>
              <li><strong>Resonance check:</strong> Building natural frequency must differ from turbine operating frequency</li>
              <li><strong>Mounting detail:</strong> Loads transferred to main structure, not just roof covering</li>
              <li><strong>Vibration isolation:</strong> Anti-vibration mounts typically required</li>
              <li><strong>Waterproofing:</strong> Roof penetrations must maintain weather integrity</li>
            </ul>
            <p><strong>Noise Considerations (ETSU-R-97 Guidelines)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Daytime (07:00-23:00):</strong> 35-40 dB(A) LA90 — Background + 5 dB (if higher)</li>
              <li><strong>Night-time (23:00-07:00):</strong> 43 dB(A) LA90 — Background + 5 dB (if higher)</li>
            </ul>
            <p><strong>Planning tip:</strong> Pre-application consultation with the Local Planning Authority can identify potential issues before incurring full application costs.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Grid Connection Requirements">
            <p>Grid-connected small wind systems must comply with Engineering Recommendations G98 or G99, which specify technical requirements for protection, power quality, and safe disconnection. MCS certification is required for Smart Export Guarantee payments.</p>
            <p><strong>G98 vs G99 Application</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Single-phase limit:</strong> ≤ 3.68 kW (16A) — &gt; 3.68 kW</li>
              <li><strong>Three-phase limit:</strong> ≤ 11.04 kW (16A/phase) — &gt; 11.04 kW</li>
              <li><strong>Process:</strong> Notification (28-day wait) — Formal application required</li>
              <li><strong>Cost:</strong> Usually free — Application and study fees apply</li>
              <li><strong>Timeline:</strong> 28 days from notification — 45-90 days typical</li>
            </ul>
            <p><strong>Grid Protection Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Over/under voltage:</strong> Trip at ±10% of nominal (230V: 207-253V)</li>
              <li><strong>Over/under frequency:</strong> Trip at 47.5-52 Hz (GB grid)</li>
              <li><strong>Loss of mains:</strong> Rate of change of frequency (RoCoF) or vector shift detection</li>
              <li><strong>Reconnection delay:</strong> Minimum 20 seconds after grid restoration</li>
              <li><strong>Power factor:</strong> 0.95 lagging to 0.95 leading capability</li>
            </ul>
            <p><strong>Inverter Types for Wind Turbines</strong></p>
            <p><strong>AC-Coupled (Synchronous)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Turbine generates AC directly</li>
              <li>Frequency varies with speed</li>
              <li>Power electronics convert to grid frequency</li>
              <li>Common in larger systems</li>
            </ul>
            <p><strong>DC-Coupled (PMG + Rectifier)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Permanent magnet generator</li>
              <li>Rectified to DC, then inverted</li>
              <li>MPPT tracking for optimal power</li>
              <li>Common in small turbines</li>
            </ul>
            <p><strong>Electrical Installation Requirements (BS 7671)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Section 712:</strong> Solar PV power supply systems (principles apply)</li>
              <li><strong>Section 551:</strong> Low voltage generating sets</li>
              <li><strong>Isolation:</strong> Double-pole isolation between turbine and grid</li>
              <li><strong>Labelling:</strong> Warning labels at meter position and consumer unit</li>
              <li><strong>Earthing:</strong> Turbine and tower earthed per manufacturer and BS 7671</li>
              <li><strong>Protection:</strong> Type II SPDs recommended for exposed locations</li>
            </ul>
            <p><strong>MCS Certification Requirements</strong></p>
            <p><strong>For SEG eligibility:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Turbine must be MCS-certified product</li>
              <li>Installation by MCS-certified installer</li>
              <li>Compliance with MCS 006 (Wind) installation standard</li>
              <li>MCS certificate issued and registered</li>
              <li>Metering to comply with SEG requirements</li>
            </ul>
            <p><strong>Export tariff:</strong> SEG rates vary by supplier (3-15p/kWh typically). Some suppliers offer time-of-use export rates with higher payments during peak demand.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Wind Shear Correction</strong>
            </p>
            <p><strong>Scenario:</strong> NOABL data gives 5.2 m/s at 10m height. Calculate wind speed at 15m hub height in suburban terrain (α = 0.25).</p>
            <p>Using wind shear power law:</p>
            <p>V₂/V₁ = (h₂/h₁)^α</p>
            <p>V₁₅/V₁₀ = (15/10)^0.25</p>
            <p>V₁₅/V₁₀ = (1.5)^0.25</p>
            <p>V₁₅/V₁₀ = 1.107</p>
            <p>V₁₅ = 5.2 × 1.107 = <span>5.76 m/s at hub height</span></p>
            <p>Note: This 11% increase in wind speed translates to (1.107)³ = 36% more available power</p>
            <p>
              <strong>Example 2: Annual Energy Yield Calculation</strong>
            </p>
            <p><strong>Scenario:</strong> A 6 kW rated turbine is installed at a site with estimated capacity factor of 0.24. Calculate annual energy yield.</p>
            <p>Annual Energy Yield = Rated Power × Hours per Year × Capacity Factor</p>
            <p>AEY = P_rated × 8760 × CF</p>
            <p>AEY = 6 kW × 8760 h × 0.24</p>
            <p>AEY = <span>12,614 kWh/year</span></p>
            <p>At electricity cost of £0.28/kWh:</p>
            <p>Savings = 12,614 × £0.28 = <span>£3,532/year</span></p>
            <p>Plus SEG export (assume 50% exported at 10p/kWh):</p>
            <p>Export income = 6,307 × £0.10 = £631/year</p>
            <p>Total annual value = <span>£3,847/year</span></p>
            <p>
              <strong>Example 3: Weibull Distribution Application</strong>
            </p>
            <p><strong>Scenario:</strong> A site has Weibull parameters k = 2.1, c = 6.5 m/s. Estimate percentage of time wind speed exceeds 4 m/s (turbine cut-in).</p>
            <p>Probability P(V &gt; v) = e^(-(v/c)^k)</p>
            <p>P(V &gt; 4) = e^(-(4/6.5)^2.1)</p>
            <p>P(V &gt; 4) = e^(-(0.615)^2.1)</p>
            <p>P(V &gt; 4) = e^(-0.354)</p>
            <p>P(V &gt; 4) = <span>0.702 = 70.2% of the time</span></p>
            <p>The turbine will operate approximately 70% of hours annually</p>
            <p>Operating hours = 8760 × 0.702 = 6,150 hours/year</p>
            <p>
              <strong>Example 4: Available Wind Power</strong>
            </p>
            <p><strong>Scenario:</strong> Calculate the theoretical power available in wind for a 5m diameter rotor at 8 m/s wind speed (air density 1.225 kg/m³).</p>
            <p>Swept area A = πr² = π × 2.5² = 19.63 m²</p>
            <p>Available power P = ½ρAV³</p>
            <p>P = 0.5 × 1.225 × 19.63 × 8³</p>
            <p>P = 0.5 × 1.225 × 19.63 × 512</p>
            <p>P = <span>6,158 W (6.16 kW) available</span></p>
            <p>With Cp = 0.40 (typical HAWT efficiency):</p>
            <p>Extracted power = 6,158 × 0.40 =  <span>2,463 W electrical output</span></p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Site Assessment Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Obtain NOABL wind speed data for location and apply shear correction</li>
              <li>Survey obstructions within 150m radius and check 10m clearance rule</li>
              <li>Identify prevailing wind direction and potential wake effects</li>
              <li>Consider terrain roughness class for turbulence assessment</li>
              <li>Check planning constraints (Conservation Area, AONB, listed buildings)</li>
              <li>Assess noise sensitivity of nearest receptors</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Betz limit: <strong>59.3%</strong> maximum theoretical efficiency</li>
              <li>Typical HAWT Cp: <strong>0.35-0.45</strong></li>
              <li>Capacity factor range: <strong>15-30%</strong> for small wind UK</li>
              <li>G98 single-phase limit: <strong>3.68 kW</strong></li>
              <li>Permitted development hub height: <strong>11.1m</strong> maximum</li>
              <li>Noise limit: <strong>35-45 dB(A)</strong> at nearest dwelling</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Using unadjusted NOABL data</strong> - Always apply wind shear correction for actual hub height</li>
                <li><strong>Ignoring turbulence</strong> - Building-mounted and urban sites have severe performance penalties</li>
                <li><strong>Optimistic yield estimates</strong> - Use conservative capacity factors (0.15-0.20) for financial calculations</li>
                <li><strong>Assuming permitted development</strong> - Check all conditions carefully; many sites require full planning</li>
              </ul>
            }
            doInstead="Cross-check assumptions against published guidance, validate measured values against design intent, and engage the wider team early when interface issues emerge."
          />

          <SectionRule />

          <Scenario
            title="Building-mounted turbine fails noise complaint at neighbouring dwelling"
            situation={
              <>
                A 2.5 kW building-mounted wind turbine is installed on a four-storey commercial building. NOABL predicted 5.2 m/s mean wind speed but actual yield in the first six months is 38% of forecast. A neighbouring residential property submits a noise complaint; environmental health measure 7 dB(A) above background at the boundary in light wind, breaching BS 4142.
              </>
            }
            whatToDo={
              <>
                Building-mounted turbines almost always under-perform NOABL because of building-induced turbulence — and they are often noisier than freestanding equivalents because vibration couples through the structure. Options: (1) decommission, (2) anti-vibration mounting kit (limited improvement), (3) operating restriction at low wind speed (defeats the economics). Lesson for next time: use site-mast wind data not NOABL, and prefer pole-mounted standalone turbines.
              </>
            }
            whyItMatters={
              <>
                Small wind is the hardest microgeneration to make work in the UK — most installed building-mounted turbines under-deliver and many are removed within 5 years. Pole-mounted rural installations on validated wind sites can succeed but require careful planning consultation, measured wind data and conservative yield assumptions.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Mean wind speed at hub height >5.5 m/s for viable economics; >6.5 m/s for good payback.",
              "NOABL is a starting point only — on-site mast measurement is the only reliable basis.",
              "Building-mounted turbines: high turbulence, vibration coupling, noise risk — almost always disappoint.",
              "Planning permission required (Permitted Development very limited); BS 4142 noise + shadow flicker assessments.",
              "Connection: G98 (≤16 A/phase) or G99 (>16 A) — same DNO process as PV.",
              "MCS MIS 3003 + BS EN 61400 series for certification and design.",
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section2-3")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Biomass systems
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section2-5")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Battery storage systems
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule6Section2_4;
