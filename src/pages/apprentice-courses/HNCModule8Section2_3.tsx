/**
 * Module 8 · Section 2 · Subsection 3 — Fan Selection
 * HNC Electrical Engineering for Building Services (HVAC Systems)
 *   Fan types, characteristics, system curves, duty point selection and efficiency considerations
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

const TITLE = 'Fan Selection - HNC Module 8 Section 2.3';
const DESCRIPTION =
  'Master fan selection for HVAC systems: centrifugal and axial fan types, fan characteristics, system curves, duty point selection, fan laws, SFP requirements, ErP regulations, EC motors, and fan efficiency grades (FEG).';

const quickCheckQuestions = [
  {
    id: 'fan-type-selection',
    question:
      'Which fan type is most suitable for high-pressure ductwork systems with significant resistance?',
    options: [
      'Cross-flow fan',
      'Axial fan',
      'Centrifugal fan',
      'Propeller fan',
    ],
    correctIndex: 2,
    explanation:
      'Centrifugal fans are best suited for high-pressure systems due to their ability to generate higher static pressures. The curved blades accelerate air outward, creating the pressure needed to overcome significant ductwork resistance. Axial fans are better for high-volume, low-pressure applications.',
  },
  {
    id: 'fan-law-speed',
    question:
      'According to the fan laws, if fan speed is doubled, what happens to the power consumption?',
    options: [
      'It doubles (2x)',
      'It increases eightfold (8x)',
      'It quadruples (4x)',
      'It remains the same',
    ],
    correctIndex: 1,
    explanation:
      'The third fan law states that power varies with the cube of the speed ratio (P2 = P1 × (n2/n1)³). Doubling the speed means power increases by 2³ = 8 times. This is why even small speed reductions via VSDs achieve significant energy savings.',
  },
  {
    id: 'duty-point',
    question: 'The duty point on a fan performance curve represents:',
    options: [
      'Maximum possible airflow',
      'The point of lowest efficiency',
      'The intersection of fan and system curves',
      'The stall region boundary',
    ],
    correctIndex: 2,
    explanation:
      'The duty point is where the fan characteristic curve intersects the system resistance curve. At this point, the fan delivers the required airflow at the corresponding pressure. Selecting a fan with the duty point near peak efficiency ensures optimal performance.',
  },
  {
    id: 'sfp-limit',
    question:
      'What is the maximum Specific Fan Power (SFP) typically permitted for central mechanical ventilation systems under Building Regulations?',
    options: ['0.5 W/(l/s)', '1.0 W/(l/s)', '1.6 W/(l/s)', '2.5 W/(l/s)'],
    correctIndex: 2,
    explanation:
      'Building Regulations Part L and associated guidance typically limit SFP to 1.6 W/(l/s) for central mechanical ventilation with heating and cooling. Lower values apply to simpler systems. Meeting SFP targets requires careful fan selection and efficient system design.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which blade configuration on a centrifugal fan provides the highest efficiency for clean air applications?',
    options: [
      'Forward-curved blades',
      'Backward-curved or backward-inclined blades',
      'Radial (paddle) blades',
      'Straight propeller blades',
    ],
    correctAnswer: 1,
    explanation:
      'Backward-curved and backward-inclined blades offer the highest efficiency (up to 85%) for clean air applications. Forward-curved blades are less efficient but more compact. Radial blades are better suited for dirty or particulate-laden air.',
  },
  {
    id: 2,
    question:
      'According to the fan laws, if fan speed is reduced by 50%, the volume flow rate will:',
    options: [
      'Reduce by 75%',
      'Reduce by 25%',
      'Reduce by 50%',
      'Reduce by 87.5%',
    ],
    correctAnswer: 2,
    explanation:
      'The first fan law states that volume flow rate varies directly with speed (Q2 = Q1 × n2/n1). A 50% speed reduction means flow reduces to 50% of original. This linear relationship is the basis for variable speed fan control strategies.',
  },
  {
    id: 3,
    question: "What does the term 'stall' mean in relation to axial fans?",
    options: [
      'The fan reaching its maximum possible flow rate',
      'The motor overheating and tripping its overload protection',
      'A loss of drive belt tension causing the impeller to slow',
      'Airflow separation from the blades causing unstable operation',
    ],
    correctAnswer: 3,
    explanation:
      'Stall occurs when airflow separates from the fan blades due to operating at excessively high pressures. This causes turbulence, noise, vibration, and reduced performance. Axial fans are particularly susceptible and must not operate in the stall region.',
  },
  {
    id: 4,
    question: 'The system resistance curve on a pressure-volume graph follows which relationship?',
    options: [
      'Parabolic - pressure proportional to flow squared',
      'Linear - pressure proportional to flow',
      'Exponential - pressure increases exponentially with flow',
      'Constant - pressure independent of flow',
    ],
    correctAnswer: 0,
    explanation:
      'System resistance follows the square law: ΔP = kQ². As airflow doubles, the pressure drop quadruples. This parabolic relationship is fundamental to understanding how fans interact with ductwork systems and why the duty point exists.',
  },
  {
    id: 5,
    question:
      'What is the primary advantage of EC (electronically commutated) motors over AC induction motors for fans?',
    options: [
      'They require no electrical supply to operate',
      'Higher efficiency across the speed range, especially at part load',
      'They produce far higher pressure than any AC motor',
      'They eliminate the need for any fan blades',
    ],
    correctAnswer: 1,
    explanation:
      'EC motors maintain high efficiency (typically 80-90%) across their speed range, unlike AC motors which lose efficiency significantly at reduced speeds. This makes EC motors ideal for variable speed fan applications, offering substantial energy savings.',
  },
  {
    id: 6,
    question:
      'Under ErP (Energy-related Products) Lot 6, which component efficiency is regulated for fans?',
    options: [
      'Only the bare impeller efficiency in isolation',
      'Only the electric motor efficiency in isolation',
      'Complete fan unit efficiency including motor',
      'Only the drive belt and bearing losses',
    ],
    correctAnswer: 2,
    explanation:
      'ErP Lot 6 regulates the efficiency of complete fan units, expressed as Fan Efficiency Grade (FEG). This holistic approach ensures manufacturers optimise the entire assembly rather than individual components, leading to better real-world performance.',
  },
  {
    id: 7,
    question: 'A fan with a steep characteristic curve is better suited for:',
    options: [
      'Open discharge applications',
      'Systems with constant resistance',
      'Systems requiring maximum flow at all times',
      'Systems with varying resistance (damper control)',
    ],
    correctAnswer: 3,
    explanation:
      'Fans with steep curves maintain relatively stable airflow despite changes in system resistance. This makes them ideal for systems with variable resistance such as damper-controlled VAV systems, where flow stability is important despite pressure changes.',
  },
  {
    id: 8,
    question:
      'What is the minimum Fan Efficiency Grade (FEG) typically required under current ErP regulations?',
    options: [
      'FEG 67',
      'FEG 75',
      'FEG 50',
      'FEG 60',
    ],
    correctAnswer: 0,
    explanation:
      'ErP regulations typically mandate minimum FEG67, meaning the fan must achieve at least 67% of the efficiency of an ideal reference fan at the same duty point. Higher grades (FEG71, FEG85) indicate better performance above minimum requirements.',
  },
  {
    id: 9,
    question: 'When selecting a fan, operating in which region of the fan curve is most desirable?',
    options: [
      'At the peak pressure point',
      'Near the peak efficiency point',
      'At maximum flow rate',
      'In the stall region for maximum pressure',
    ],
    correctAnswer: 1,
    explanation:
      'Fans should be selected to operate near their peak efficiency point for optimal energy consumption and stable operation. Operating too far from this point wastes energy and may cause noise, vibration, or unstable performance.',
  },
  {
    id: 10,
    question: 'Specific Fan Power (SFP) is calculated as:',
    options: [
      'Motor power (W) × airflow (l/s)',
      'Pressure (Pa) × airflow (l/s)',
      'Motor power (W) ÷ airflow (l/s)',
      'Airflow (l/s) ÷ motor power (W)',
    ],
    correctAnswer: 2,
    explanation:
      'SFP = total fan power (W) ÷ airflow (l/s), expressed as W/(l/s). It measures the energy efficiency of the complete ventilation system including fans, drives, and controls. Lower SFP values indicate more efficient systems.',
  },
  {
    id: 11,
    question: 'Which statement about mixed-flow fans is correct?',
    options: [
      'They can only be used for exhaust applications',
      'They cannot be used with variable speed drives',
      'They are less efficient than both axial and centrifugal fans',
      'They combine characteristics of axial and centrifugal fans',
    ],
    correctAnswer: 3,
    explanation:
      'Mixed-flow fans combine axial and centrifugal design principles, providing moderate pressure capability with compact dimensions. They offer a compromise between the high flow of axial fans and the pressure generation of centrifugal fans.',
  },
  {
    id: 12,
    question: 'What effect does increasing air temperature have on fan performance?',
    options: [
      'Reduced mass flow rate due to lower air density',
      'Increased motor efficiency',
      'No effect - fans are temperature independent',
      'Increased pressure due to thermal expansion',
    ],
    correctAnswer: 0,
    explanation:
      'Higher temperatures reduce air density, which decreases the mass flow rate even though volumetric flow remains constant. Fan power consumption also reduces slightly, but the useful work (moving a certain mass of air) is diminished.',
  },
  {
    id: 13,
    question:
      'In a twin-fan arrangement operating in parallel, what happens to the system duty point compared to single fan operation?',
    options: [
      'Flow exactly doubles with no change in pressure',
      'Flow increases but less than double due to system curve',
      'Flow remains the same but pressure doubles',
      'Flow halves because the fans oppose each other',
    ],
    correctAnswer: 1,
    explanation:
      'Parallel fans theoretically double available flow at any given pressure. However, because system resistance increases with the square of flow, the actual combined duty point delivers increased flow but significantly less than double.',
  },
  {
    id: 14,
    question: 'The purpose of inlet guide vanes on a centrifugal fan is to:',
    options: [
      'Filter particulates out of the air before the impeller',
      'Silence the fan by absorbing sound at the inlet',
      'Provide pre-rotation to regulate airflow and improve part-load efficiency',
      'Increase the maximum pressure the fan can ever produce',
    ],
    correctAnswer: 2,
    explanation:
      'Inlet guide vanes create a pre-swirl in the airflow entering the impeller, which reduces the work done by the fan and hence the power consumed. This provides efficient flow control compared to outlet dampers, especially at moderate part loads.',
  },
];

const faqs = [
  {
    question: 'What is the difference between static pressure and total pressure in fan selection?',
    answer:
      "Static pressure is the pressure exerted perpendicular to airflow direction - the pressure available to overcome ductwork resistance. Total pressure is the sum of static pressure and velocity pressure (the kinetic energy of moving air). Fan catalogues may quote either, so it's essential to clarify. For ducted systems, static pressure is typically used for selection as it represents useful pressure available to push air through the system. Total pressure includes energy that may be lost at discharge.",
  },
  {
    question: 'How do I size a fan for a system with unknown exact resistance?',
    answer:
      'When exact system resistance is unknown, estimate using established design guidelines (e.g., CIBSE Guide B) based on duct sizing criteria (typically 1 Pa/m for low-velocity systems). Add allowances for fittings using equivalent lengths or k-factors. Apply a safety margin of 10-15% on pressure. Select a fan operating in the stable region of its curve with capacity for future adjustments. Variable speed drives provide flexibility to adjust performance once the system is commissioned and actual resistance is known.',
  },
  {
    question:
      'Why do EC motors offer better efficiency at reduced speeds compared to AC motors with VSDs?',
    answer:
      'EC motors are brushless DC motors with integral electronic commutation. They maintain high efficiency (80-90%) across their speed range because losses scale proportionally with load. AC induction motors suffer from magnetising losses and slip that become proportionally larger at reduced speeds. Even with VSDs, AC motor efficiency drops significantly below 50% speed. EC motors also eliminate separate VSD losses and offer precise speed control, making them ideal for fan applications requiring frequent part-load operation.',
  },
  {
    question: 'What happens if a fan is selected too large for the system?',
    answer:
      'An oversized fan operating against lower-than-designed resistance will deliver excessive airflow and consume more power than necessary. The duty point shifts along the fan curve toward higher flow and lower pressure. This causes: increased energy consumption, potential noise issues from high velocities, over-cooling or over-ventilation, and premature wear. Dampers may be throttled to compensate, wasting energy. The correct approach is accurate system design and fan selection near peak efficiency.',
  },
  {
    question: 'How does altitude affect fan selection?',
    answer:
      "At higher altitudes, air density decreases (approximately 12% per 1000m). Lower density reduces the mass flow rate for a given volumetric flow, affecting the fan's ability to move the required quantity of air by mass. Fan power consumption reduces slightly, but so does useful work. Selection must account for density corrections: standard catalogue data assumes sea level conditions (1.2 kg/m³). For significant altitudes, derate fan performance or select larger fans to maintain required mass flow rates.",
  },
  {
    question: 'What are the implications of the ErP regulations for fan replacement projects?',
    answer:
      'ErP (Ecodesign) regulations mandate minimum efficiency standards for fans. Replacement fans must meet current FEG requirements (typically FEG67 minimum), which may be stricter than when original equipment was installed. This can affect like-for-like replacements where the original fan type no longer meets regulations. Benefits include guaranteed energy savings and reduced lifecycle costs. Specifiers should verify ErP compliance early in projects and consider whether system modifications might be needed to accommodate compliant fan selections.',
  },
];

const HNCModule8Section2_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section2")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 8 · Section 2 · Subsection 3"
            title="Fan Selection"
            description="Fan types, characteristics, system curves, duty point selection and efficiency considerations"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Differentiate between centrifugal, axial, and mixed-flow fan types",
              "Apply fan laws to predict performance at different speeds",
              "Interpret fan and system characteristic curves",
              "Select fans for optimal duty point and efficiency",
              "Calculate and verify Specific Fan Power (SFP) compliance",
              "Understand ErP regulations and Fan Efficiency Grades (FEG)",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Fan Types and Characteristics">
            <p>Fans are the primary air-moving devices in HVAC systems. Selecting the appropriate fan type depends on the required airflow, pressure, space constraints, noise requirements, and efficiency targets. The three main categories are centrifugal, axial, and mixed-flow fans.</p>
            <p><strong>Centrifugal Fans</strong></p>
            <p>Centrifugal fans accelerate air radially outward from the impeller, converting velocity energy into pressure. They are characterised by their blade configuration:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Backward-curved/inclined:</strong> Highest efficiency (up to 85%), non-overloading characteristic, ideal for clean air HVAC applications</li>
              <li><strong>Forward-curved:</strong> Compact design, lower efficiency, suitable for low-pressure applications like fan coil units</li>
              <li><strong>Radial/paddle:</strong> Self-cleaning, handles particulate-laden air, used in industrial extraction</li>
            </ul>
            <p><strong>Axial Fans</strong></p>
            <p>Axial fans move air parallel to the shaft axis, providing high airflow at relatively low pressures. Types include:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Propeller fans:</strong> Simple design for free-air applications, wall-mounted extract</li>
              <li><strong>Tube-axial:</strong> Enclosed in cylindrical housing, moderate pressure capability</li>
              <li><strong>Vane-axial:</strong> Guide vanes improve pressure and efficiency, suitable for ducted systems</li>
            </ul>
            <p><strong>Mixed-Flow Fans</strong></p>
            <p>Mixed-flow fans combine axial and centrifugal principles. Air enters axially and exits at an angle between axial and radial. They offer moderate pressure capability in a compact form factor, making them popular for in-line duct applications where space is limited.</p>
            <p><strong>Fan Type Selection Guide</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Central AHU supply/extract:</strong> Centrifugal backward-curved — High efficiency, stable operation</li>
              <li><strong>Fan coil units:</strong> Centrifugal forward-curved — Compact size</li>
              <li><strong>Car park ventilation:</strong> Axial (jet fans) — High volume, impulse ventilation</li>
              <li><strong>In-line duct booster:</strong> Mixed-flow — Compact, moderate pressure</li>
              <li><strong>Kitchen extract:</strong> Centrifugal radial — Handles grease-laden air</li>
              <li><strong>Roof extract:</strong> Axial or mixed-flow — Weather protection, direct discharge</li>
            </ul>
            <p><strong>Selection principle:</strong> Choose centrifugal fans for high-pressure systems (&gt;500 Pa), axial fans for high-volume low-pressure applications, and mixed-flow where space is constrained.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Fan Laws and Performance Prediction">
            <p>The fan laws (also called affinity laws) describe how fan performance changes with speed, size, or density. These relationships are fundamental to understanding variable speed operation and predicting performance at conditions different from catalogue data.</p>
            <p><strong>The Three Fan Laws (for constant fan size)</strong></p>
            <p><strong>Law 1 - Flow:</strong> Q₂ = Q₁ × (n₂/n₁)</p>
            <p>Volume flow rate varies directly with speed</p>
            <p><strong>Law 2 - Pressure:</strong> P₂ = P₁ × (n₂/n₁)²</p>
            <p>Pressure varies with the square of speed</p>
            <p><strong>Law 3 - Power:</strong> W₂ = W₁ × (n₂/n₁)³</p>
            <p>Power varies with the cube of speed</p>
            <p><strong>Practical Implications of Fan Laws</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Energy savings:</strong> Reducing speed by 20% reduces power by 49% (0.8³ = 0.512)</li>
              <li><strong>Oversizing penalty:</strong> Running a large fan slowly is inefficient - motor and drive losses increase</li>
              <li><strong>VSD benefits:</strong> Variable speed drives exploit the cube law for significant energy savings</li>
              <li><strong>Noise reduction:</strong> Lower speeds typically result in reduced noise levels</li>
            </ul>
            <p><strong>Fan Laws Application Table</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>100%:</strong> 100% — 100% — 100%</li>
              <li><strong>90%:</strong> 90% — 81% — 73%</li>
              <li><strong>80%:</strong> 80% — 64% — 51%</li>
              <li><strong>70%:</strong> 70% — 49% — 34%</li>
              <li><strong>50%:</strong> 50% — 25% — 12.5%</li>
            </ul>
            <p><strong>Density Corrections</strong></p>
            <p>Fan laws assume constant air density. When operating at different temperatures or altitudes, corrections are needed. At higher temperatures, air density decreases, reducing mass flow rate for a given volumetric flow. Standard conditions are typically 20°C at sea level (density ≈ 1.2 kg/m³). For every 1000m elevation, density reduces by approximately 12%.</p>
            <p><strong>Design tip:</strong> The cubic power relationship makes variable speed control extremely effective - even small speed reductions yield significant energy savings.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="System Curves and Duty Point Selection">
            <p>The duty point is where the fan actually operates within a system. It occurs at the intersection of the fan characteristic curve and the system resistance curve. Correct duty point selection ensures the fan delivers required performance efficiently and stably.</p>
            <p><strong>Understanding System Resistance</strong></p>
            <p>System resistance follows the square law: ΔP = kQ², where k is the system constant determined by ductwork configuration, fittings, filters, coils, and terminal devices. On a pressure-flow graph, this creates a parabolic curve starting from the origin.</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Low resistance:</strong> Short duct runs, few fittings, clean filters</li>
              <li><strong>High resistance:</strong> Long duct runs, many bends, dirty filters, terminal devices</li>
              <li><strong>Variable resistance:</strong> Systems with dampers, VAV terminals, or changing filter condition</li>
            </ul>
            <p><strong>Fan Curve Regions</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>- <strong>Stable region:</strong> Right of peak pressure - desired operating zone</li>
              <li>- <strong>Peak efficiency zone:</strong> Typically 60-80% of maximum flow</li>
              <li>- <strong>Stall region:</strong> Left of peak - unstable, noisy, avoid operation here</li>
              <li>- <strong>Surge line:</strong> Boundary between stable and unstable operation</li>
            </ul>
            <p><strong>Duty Point Selection Criteria</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Flow rate:</strong> Match design requirement — Inadequate ventilation or overcooling</li>
              <li><strong>Pressure:</strong> Overcome system resistance + margin — Insufficient airflow at terminals</li>
              <li><strong>Efficiency:</strong> Near peak efficiency point — Excessive energy consumption</li>
              <li><strong>Stability:</strong> Well clear of stall region — Noise, vibration, unreliable operation</li>
              <li><strong>Future capacity:</strong> Margin for system changes — Unable to accommodate modifications</li>
            </ul>
            <p><strong>Effect of System Changes on Duty Point</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Dirty filters:</strong> Increased resistance shifts duty point left (less flow, more pressure)</li>
              <li><strong>Dampers closing:</strong> Increased resistance, reduced flow</li>
              <li><strong>Duct leakage:</strong> Reduced effective resistance, increased wasteful flow</li>
              <li><strong>Speed change:</strong> Duty point moves along system curve following fan laws</li>
            </ul>
            <p><strong>Selection guidance:</strong> Select fans to operate between 60-80% of maximum flow for best efficiency, with the duty point clearly within the stable operating region and well clear of stall.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Efficiency Standards and Regulations">
            <p>Fan efficiency is regulated through multiple frameworks including Building Regulations Part L (SFP limits), ErP Directive (Fan Efficiency Grades), and motor efficiency standards. Compliance is mandatory and significantly influences fan and system selection.</p>
            <p><strong>Specific Fan Power (SFP)</strong></p>
            <p>SFP measures the energy efficiency of the complete ventilation system, expressed as watts per litre per second (W/(l/s)). It accounts for all fans, drives, and controls serving a ventilation system.</p>
            <p>SFP = Total fan power (W) ÷ Design airflow (l/s)</p>
            <p>Example:</p>
            <p>Supply fan: 2.2 kW, Extract fan: 1.8 kW</p>
            <p>Design airflow: 2500 l/s</p>
            <p>SFP = (2200 + 1800) ÷ 2500 = 1.6 W/(l/s)</p>
            <p><strong>Building Regulations Part L - SFP Limits</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Central mechanical ventilation (supply and extract):</strong> 1.6</li>
              <li><strong>Central mechanical ventilation with heating/cooling:</strong> 1.6</li>
              <li><strong>Local supply or extract (non-domestic):</strong> 0.5</li>
              <li><strong>Zonal supply with central extract:</strong> 1.5</li>
              <li><strong>Fan coil systems:</strong> 0.8</li>
            </ul>
            <p><strong>ErP Directive and Fan Efficiency Grades (FEG)</strong></p>
            <p>The Energy-related Products (ErP) Directive Lot 6 mandates minimum efficiency for fans. Compliance is measured using Fan Efficiency Grades comparing actual efficiency to an ideal reference fan.</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>FEG67:</strong> Minimum requirement - 67% of reference fan efficiency</li>
              <li><strong>FEG71:</strong> Good efficiency - exceeds minimum</li>
              <li><strong>FEG75:</strong> High efficiency</li>
              <li><strong>FEG85:</strong> Premium efficiency for best-in-class applications</li>
            </ul>
            <p><strong>EC Motors and Variable Speed Drives</strong></p>
            <p>EC (electronically commutated) motors are increasingly specified for fan applications due to their efficiency advantages:</p>
            <p><strong>EC Motor Advantages</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>- 80-90% efficiency across speed range</li>
              <li>- Integral speed control</li>
              <li>- No separate VSD required</li>
              <li>- Compact installation</li>
              <li>- Lower heat generation</li>
            </ul>
            <p><strong>AC + VSD Comparison</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>- Efficiency drops at low speeds</li>
              <li>- Separate VSD adds losses</li>
              <li>- More installation space needed</li>
              <li>- Higher maintenance requirement</li>
              <li>- Better for larger motors (&gt;15kW)</li>
            </ul>
            <p><strong>Achieving SFP Compliance</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>- Select high-efficiency fans (FEG71+)</li>
              <li>- Use EC motors or efficient AC motors with quality VSDs</li>
              <li>- Design low-resistance ductwork (oversized ducts, smooth fittings)</li>
              <li>- Minimise system pressure drops (select appropriate terminal devices)</li>
              <li>- Regular filter maintenance to prevent increased resistance</li>
              <li>- Commission and balance systems correctly</li>
            </ul>
            <p><strong>Compliance note:</strong> ErP efficiency requirements are mandatory for fans placed on the market. Replacement projects must use compliant products, which may affect like-for-like specifications.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Fan Law Calculation</strong>
            </p>
            <p><strong>Scenario:</strong> A fan operating at 1450 rpm delivers 2.5 m³/s at 400 Pa, consuming 1.8 kW. Calculate performance at 1200 rpm.</p>
            <p>Given data:</p>
            <p>n₁ = 1450 rpm, Q₁ = 2.5 m³/s, P₁ = 400 Pa, W₁ = 1.8 kW</p>
            <p>n₂ = 1200 rpm</p>
            <p>Calculations:</p>
            <p>Speed ratio = n₂/n₁ = 1200/1450 = 0.828</p>
            <p>Q₂ = Q₁ × (n₂/n₁) = 2.5 × 0.828 = 2.07 m³/s</p>
            <p>P₂ = P₁ × (n₂/n₁)² = 400 × 0.828² = 274 Pa</p>
            <p>W₂ = W₁ × (n₂/n₁)³ = 1.8 × 0.828³ = 1.02 kW</p>
            <p>Result: 17% speed reduction achieves 43% power saving</p>
            <p>
              <strong>Example 2: SFP Calculation and Compliance</strong>
            </p>
            <p><strong>Scenario:</strong> Verify SFP compliance for a supply and extract system serving an office building.</p>
            <p>System data:</p>
            <p>Design airflow: 3,000 l/s (3.0 m³/s)</p>
            <p>Supply fan motor: 3.0 kW</p>
            <p>Extract fan motor: 2.2 kW</p>
            <p>SFP calculation:</p>
            <p>Total fan power = 3,000 + 2,200 = 5,200 W</p>
            <p>SFP = 5,200 ÷ 3,000 = 1.73 W/(l/s)</p>
            <p>Part L limit for central mechanical ventilation: 1.6 W/(l/s)</p>
            <p>Result: NON-COMPLIANT (1.73 &gt; 1.6)</p>
            <p>Options to achieve compliance:</p>
            <p>- Reduce duct resistance (larger ducts, fewer fittings)</p>
            <p>- Select higher efficiency fans</p>
            <p>- Use EC motors instead of AC + VSD</p>
            <p>- Increase airflow if system allows (reduces SFP)</p>
            <p>
              <strong>Example 3: Fan Selection for Variable Load System</strong>
            </p>
            <p><strong>Scenario:</strong> Select a fan for a VAV system requiring 1.5 m³/s at 500 Pa design duty, operating between 40-100% flow.</p>
            <p>Design requirements:</p>
            <p>Design flow: 1.5 m³/s (1500 l/s)</p>
            <p>Design pressure: 500 Pa</p>
            <p>Operating range: 40-100% (0.6-1.5 m³/s)</p>
            <p>Fan type selection:</p>
            <p>- Centrifugal backward-curved (high efficiency)</p>
            <p>- Steep characteristic (stable across pressure range)</p>
            <p>- EC motor (maintains efficiency at part load)</p>
            <p>Selection criteria:</p>
            <p>- Duty point in stable region (avoid stall)</p>
            <p>- Peak efficiency near 70-80% of max flow</p>
            <p>- Select fan where 1.5 m³/s @ 500 Pa is 70-75% max flow</p>
            <p>Recommendation: Select fan with max flow ~2.0-2.1 m³/s</p>
            <p>This places design duty near peak efficiency</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Fan Selection Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Define required airflow rate (l/s or m³/s) from design calculations</li>
              <li>Calculate total system pressure including ductwork, fittings, filters, and terminals</li>
              <li>Add 10-15% safety margin to pressure for system uncertainties</li>
              <li>Select fan type appropriate to application and pressure requirements</li>
              <li>Ensure duty point is in stable region near peak efficiency</li>
              <li>Verify ErP compliance (FEG rating) and SFP contribution</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>SFP limit (central mechanical): <strong>1.6 W/(l/s)</strong></li>
              <li>Minimum FEG: <strong>FEG67</strong> (67% of reference efficiency)</li>
              <li>Backward-curved efficiency: up to <strong>85%</strong></li>
              <li>EC motor efficiency: <strong>80-90%</strong> across speed range</li>
              <li>50% speed = <strong>12.5%</strong> power (fan law)</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Oversizing fans</strong> - wastes energy and increases noise</li>
                <li><strong>Ignoring system curve</strong> - actual performance differs from catalogue data</li>
                <li><strong>Operating in stall region</strong> - causes instability and damage</li>
                <li><strong>Not accounting for dirty filters</strong> - system resistance increases over time</li>
                <li><strong>Specifying non-compliant fans</strong> - fails ErP requirements</li>
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
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section2-2")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Air handling units
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section2-4")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Heat recovery systems
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule8Section2_3;
