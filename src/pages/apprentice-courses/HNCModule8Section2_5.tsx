/**
 * Module 8 · Section 2 · Subsection 5 — Ductwork Design
 * HNC Electrical Engineering for Building Services (HVAC Systems)
 *   Sizing methods, pressure drop calculations, materials specification, acoustic treatment, and fire protection for HVAC ductwork
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

const TITLE = 'Ductwork Design - HNC Module 8 Section 2.5';
const DESCRIPTION =
  'Master ductwork design for HVAC systems: sizing methods including equal friction and velocity reduction, pressure drop calculations, DW/144 specification, duct materials, rectangular vs circular ducts, fire dampers, smoke dampers, acoustic attenuation, and duct leakage testing.';

const quickCheckQuestions = [
  {
    id: 'equal-friction',
    question:
      'In the equal friction method of duct sizing, what parameter is kept constant throughout the duct system?',
    options: [
      'Pressure drop per unit length',
      'Double-shielded or armoured cables',
      'Better performance in diffuse light',
      'Motor continuity testing stage',
    ],
    correctIndex: 0,
    explanation:
      'The equal friction method maintains a constant pressure drop per unit length (typically 1 Pa/m) throughout the duct system. This simplifies balancing as each branch experiences proportional pressure losses regardless of path length.',
  },
  {
    id: 'dw144-class',
    question:
      'According to DW/144, what leakage class is typically specified for low-pressure ductwork in commercial buildings?',
    options: [
      'Class B',
      'Class A',
      'Class C',
      'Class D',
    ],
    correctIndex: 2,
    explanation:
      'Class C is the standard leakage class for low-pressure ductwork in commercial buildings per DW/144. Class A is the tightest (high-pressure systems), while Class D has the highest allowable leakage (used only where leakage is acceptable).',
  },
  {
    id: 'fire-damper-rating',
    question:
      'What is the minimum integrity rating required for fire dampers in standard applications?',
    options: [
      'E90',
      'E60',
      'E30',
      'E120',
    ],
    correctIndex: 1,
    explanation:
      'Fire dampers must provide a minimum E60 integrity rating (60 minutes) in standard applications. Higher ratings (E90, E120, ES120) may be required depending on the fire compartmentation strategy and building regulations.',
  },
  {
    id: 'circular-advantage',
    question:
      'What is the primary advantage of circular ductwork compared to rectangular ductwork of equal cross-sectional area?',
    options: [
      'Lower pressure drop and better airflow',
      'NHS Talking Therapies (formerly IAPT)',
      'Applied - total is less than 50 × individual ADMD',
      'A load with unequal current draw on each phase',
    ],
    correctIndex: 0,
    explanation:
      'Circular ducts have lower pressure drop than equivalent rectangular ducts because they have a smaller perimeter-to-area ratio, reducing frictional losses. They also promote more uniform airflow with less turbulence at the duct walls.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What is the typical design pressure drop per metre used in the equal friction sizing method for low-velocity systems?',
    options: [
      '0.5 Pa/m',
      '1.0 Pa/m',
      '2.0 Pa/m',
      '5.0 Pa/m',
    ],
    correctAnswer: 1,
    explanation:
      'The equal friction method typically uses 1.0 Pa/m for low-velocity comfort systems. This provides a good balance between duct size (cost) and fan energy consumption. Higher values (1.5-2.0 Pa/m) may be used where space is limited.',
  },
  {
    id: 2,
    question:
      'In the velocity reduction method of duct sizing, what happens to duct velocity as air travels further from the fan?',
    options: [
      'Velocity fluctuates randomly',
      'Velocity increases',
      'Velocity decreases in steps',
      'Velocity remains constant',
    ],
    correctAnswer: 2,
    explanation:
      'The velocity reduction method progressively reduces duct velocity in steps as air travels further from the fan. Starting velocities of 6-8 m/s at the main duct reduce to 3-4 m/s at final branches, helping to reduce noise at terminals.',
  },
  {
    id: 3,
    question:
      'What is the hydraulic diameter used for when calculating pressure drop in rectangular ducts?',
    options: [
      'To isolate vibration and prevent transmission through ductwork',
      'To prevent spread of smoke between fire compartments during fire conditions',
      'Noise is proportional to velocity to the power of 5-6',
      'Converting rectangular duct dimensions to equivalent circular diameter',
    ],
    correctAnswer: 3,
    explanation:
      'Hydraulic diameter (Dh = 4A/P where A is area and P is perimeter) converts rectangular duct dimensions to an equivalent circular diameter for pressure drop calculations. This allows the use of circular duct friction charts for rectangular ducts.',
  },
  {
    id: 4,
    question:
      'According to DW/144, what is the maximum allowable air leakage rate for Class C ductwork at 400 Pa test pressure?',
    options: [
      '0.027 × p^0.65 (L/s per m²)',
      '0.009 × p^0.65 (L/s per m²)',
      '0.081 × p^0.65 (L/s per m²)',
      '0.243 × p^0.65 (L/s per m²)',
    ],
    correctAnswer: 0,
    explanation:
      'Class C ductwork allows maximum leakage of 0.027 × p^0.65 L/s per m² of duct surface area, where p is the test pressure in Pa. At 400 Pa, this equates to approximately 1.32 L/s per m² of duct surface.',
  },
  {
    id: 5,
    question:
      'What material thickness is typically specified for galvanised steel rectangular ductwork up to 450mm in the longest dimension?',
    options: [
      '0.5mm',
      '0.7mm',
      '1.0mm',
      '0.8mm',
    ],
    correctAnswer: 1,
    explanation:
      'DW/144 specifies 0.7mm galvanised steel for rectangular ducts up to 450mm. Larger ducts require thicker material: 0.8mm up to 750mm, 1.0mm up to 1000mm, and 1.2mm for larger sizes to maintain structural integrity.',
  },
  {
    id: 6,
    question: 'What is the purpose of a smoke damper in HVAC ductwork systems?',
    options: [
      'To isolate vibration and prevent transmission through ductwork',
      'Converting rectangular duct dimensions to equivalent circular diameter',
      'To prevent spread of smoke between fire compartments during fire conditions',
      'Noise is proportional to velocity to the power of 5-6',
    ],
    correctAnswer: 2,
    explanation:
      'Smoke dampers prevent the spread of smoke through ductwork between fire compartments. They are activated by smoke detectors and close to maintain tenable conditions in escape routes. Combined fire/smoke dampers provide both fire integrity and smoke control.',
  },
  {
    id: 7,
    question: 'What is the relationship between duct velocity and noise generation?',
    options: [
      'Noise is proportional to velocity',
      'Noise is proportional to velocity squared',
      'There is no relationship between velocity and noise',
      'Noise is proportional to velocity to the power of 5-6',
    ],
    correctAnswer: 3,
    explanation:
      'Aerodynamic noise generation in ductwork is proportional to velocity raised to the power of 5-6. This means doubling the velocity can increase noise by 15-18 dB. This is why velocity limits are critical in noise-sensitive applications.',
  },
  {
    id: 8,
    question: 'What type of acoustic attenuator is most commonly used in HVAC ductwork?',
    options: [
      'Lined duct sections (splitter attenuators)',
      'Device may fail to interrupt the fault safely',
      'Prove dead with approved voltage indicator',
      'It can bulge or herniate, pressing on nearby nerves',
    ],
    correctAnswer: 0,
    explanation:
      'Splitter attenuators (lined duct sections with acoustic absorbent material) are the most common type used in HVAC systems. They absorb sound energy as air passes through, typically providing 10-25 dB attenuation depending on length and design.',
  },
  {
    id: 9,
    question:
      'What is the aspect ratio limit typically recommended for rectangular ductwork to maintain efficient airflow?',
    options: [
      '2:1',
      '4:1',
      '6:1',
      '8:1',
    ],
    correctAnswer: 1,
    explanation:
      'Aspect ratios (width:height) should not exceed 4:1 for efficient airflow. Higher aspect ratios increase friction losses, make balancing difficult, and increase material usage. Where space permits, aspect ratios of 2:1 or lower are preferred.',
  },
  {
    id: 10,
    question:
      'At what pressure classification does ductwork transition from low-pressure to medium-pressure according to DW/144?',
    options: [
      '250 Pa',
      '1500 Pa',
      '500 Pa',
      '1000 Pa',
    ],
    correctAnswer: 2,
    explanation:
      'DW/144 classifies ductwork as low-pressure up to 500 Pa, medium-pressure from 500-1000 Pa, and high-pressure above 1000 Pa. Higher pressure classifications require tighter construction standards, better sealing, and more robust supports.',
  },
  {
    id: 11,
    question: 'What is the primary purpose of flexible duct connections at air handling units?',
    options: [
      'To prevent spread of smoke between fire compartments during fire conditions',
      'Converting rectangular duct dimensions to equivalent circular diameter',
      'Noise is proportional to velocity to the power of 5-6',
      'To isolate vibration and prevent transmission through ductwork',
    ],
    correctAnswer: 3,
    explanation:
      'Flexible connections (anti-vibration connectors) isolate mechanical vibration from fans and motors, preventing transmission through the rigid ductwork system. This reduces structure-borne noise and protects duct joints from fatigue failure.',
  },
  {
    id: 12,
    question:
      'When designing ductwork, what minimum distance from a bend should flow measurement stations be located?',
    options: [
      '5-10 duct diameters',
      'No minimum distance required',
      '1 duct diameter',
      '2-3 duct diameters',
    ],
    correctAnswer: 0,
    explanation:
      'Flow measurement stations should be located 5-10 duct diameters downstream and 2-3 diameters upstream of disturbances (bends, dampers, branches) to ensure uniform velocity profiles and accurate measurements.',
  },
  {
    id: 13,
    question: 'What is the function of turning vanes in ductwork?',
    options: [
      'Converting rectangular duct dimensions to equivalent circular diameter',
      'To reduce pressure drop and improve airflow through bends',
      'Pressure decay or flow rate measurement test',
      'Lined duct sections (splitter attenuators)',
    ],
    correctAnswer: 1,
    explanation:
      'Turning vanes guide airflow through bends, reducing turbulence and pressure drop. They can reduce bend pressure loss coefficients from 1.0-1.5 (without vanes) to 0.15-0.25 (with vanes), significantly improving system efficiency.',
  },
  {
    id: 14,
    question: 'What test is performed to verify ductwork airtightness per DW/143?',
    options: [
      'Lined duct sections (splitter attenuators)',
      'Noise is proportional to velocity to the power of 5-6',
      'Pressure decay or flow rate measurement test',
      'To reduce pressure drop and improve airflow through bends',
    ],
    correctAnswer: 2,
    explanation:
      'DW/143 specifies pressure testing methods: either measuring pressure decay over time or measuring the airflow required to maintain test pressure. Both methods quantify leakage rate against the specified class limits.',
  },
];

const faqs = [
  {
    question:
      'What is the difference between equal friction and velocity reduction sizing methods?',
    answer:
      'The equal friction method maintains constant pressure drop per metre throughout the system (typically 1 Pa/m), resulting in varying velocities as duct sizes reduce. The velocity reduction method starts with high velocity at the fan and deliberately reduces it in steps along the duct run. Equal friction is simpler to design and balance, while velocity reduction can achieve lower noise levels at terminals but requires more careful balancing. Most commercial systems use equal friction for its simplicity and reliable balancing characteristics.',
  },
  {
    question: 'Why are circular ducts more efficient than rectangular ducts?',
    answer:
      'Circular ducts have the lowest perimeter-to-area ratio of any shape, meaning less frictional surface for a given airflow capacity. A circular duct has approximately 12% less surface area than an equivalent rectangular duct with 2:1 aspect ratio, resulting in lower pressure drop and fan energy. Circular ducts also provide more uniform velocity distribution, better structural strength, and easier cleaning. However, rectangular ducts may be preferred where ceiling void depth is limited or where multiple ducts must fit in constrained spaces.',
  },
  {
    question: 'What is the DW/144 specification and why is it important?',
    answer:
      'DW/144 is the HVCA (now BESA) Specification for Sheet Metal Ductwork, setting standards for ductwork construction in the UK. It defines material thicknesses, joint types, support spacing, and critically, air leakage classifications (A, B, C, D). Specifying DW/144 ensures ductwork is constructed to recognised standards, with appropriate leakage limits for the system pressure class. Class C is standard for low-pressure commercial systems, while Classes A and B are required for higher pressure or energy-critical applications.',
  },
  {
    question: 'How do fire dampers and smoke dampers differ in operation?',
    answer:
      'Fire dampers are primarily structural fire barriers that close when exposed to heat (typically via a fusible link at 72 degrees C) to maintain fire compartmentation. Smoke dampers are controlled devices activated by smoke detectors or fire alarm signals to prevent smoke spread before temperatures rise significantly. Combined fire/smoke dampers (classified ES) provide both functions. Fire dampers are mandatory where ducts penetrate fire-rated walls or floors; smoke dampers are specified based on smoke control strategy, typically in escape routes and smoke control zones.',
  },
  {
    question: 'What factors affect acoustic performance in ductwork systems?',
    answer:
      'Key factors include: air velocity (noise increases with v^5-6), duct type (lined ducts attenuate noise naturally), fittings (grilles, dampers, bends generate noise), and breakout (sound radiating through duct walls). Design for low noise by limiting velocities (3-5 m/s at terminals), using acoustic attenuators after fans, selecting low-noise grilles, and specifying adequate duct wall mass or acoustic lagging where ductwork passes through noise-sensitive areas. Terminal unit selection is often the critical factor in occupied spaces.',
  },
  {
    question: 'How is ductwork leakage tested and why does it matter?',
    answer:
      'Leakage testing per DW/143 involves pressurising duct sections and measuring either pressure decay or the airflow needed to maintain test pressure. Leakage matters because it represents wasted fan energy, reduced system capacity, and potential comfort issues. A system with 10% leakage may require 20-30% more fan power. Modern buildings increasingly specify Class A or B tightness for energy compliance. Testing should occur before insulation to allow remedial sealing, with test sections typically limited to 100-200m² of duct surface area.',
  },
];

const HNCModule8Section2_5 = () => {
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
            eyebrow="Module 8 · Section 2 · Subsection 5"
            title="Ductwork Design"
            description="Sizing methods, pressure drop calculations, materials specification, acoustic treatment, and fire protection for HVAC ductwork"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Apply equal friction and velocity reduction sizing methods",
              "Calculate pressure drop through duct systems and fittings",
              "Specify ductwork materials and construction to DW/144",
              "Compare rectangular and circular duct characteristics",
              "Select and position fire dampers and smoke dampers",
              "Design acoustic attenuation and conduct leakage testing",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Duct Sizing Methods">
            <p>Duct sizing determines the cross-sectional area required to convey the design airflow at acceptable velocity and pressure drop. Two principal methods are used in UK practice: equal friction and velocity reduction, each with distinct advantages for different applications.</p>
            <p><strong>The Equal Friction Method</strong></p>
            <p>This method maintains constant pressure drop per unit length throughout the duct system, typically 1.0 Pa/m for low-velocity comfort systems or up to 2.0 Pa/m where space is limited.</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>- Duct velocity varies naturally as airflow reduces at each branch</li>
              <li>- Simplified balancing as path pressure drops are proportional to length</li>
              <li>- Self-balancing tendency in well-designed systems</li>
              <li>- Most common method for commercial HVAC systems</li>
            </ul>
            <p><strong>The Velocity Reduction Method</strong></p>
            <p>Starting with higher velocity at the fan (6-8 m/s), velocity is progressively reduced in steps along the duct run to achieve lower velocities (3-4 m/s) at terminal outlets.</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>- Controls noise generation which increases with v^5-6</li>
              <li>- Larger ducts near fan where noise is less critical</li>
              <li>- Smaller, quieter ducts in occupied spaces</li>
              <li>- Requires careful balancing with dampers at each branch</li>
            </ul>
            <p><strong>Recommended Duct Velocities</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Residential/quiet office:</strong> 4-6 — 3-4 — 2-3</li>
              <li><strong>General commercial:</strong> 6-9 — 4-6 — 3-4</li>
              <li><strong>Industrial/plant rooms:</strong> 8-12 — 6-9 — 5-8</li>
              <li><strong>Hospital/theatre:</strong> 4-5 — 3-4 — 2-3</li>
              <li><strong>Kitchen extract:</strong> 10-15 — 8-10 — 6-8</li>
            </ul>
            <p><strong>Pressure Drop Calculation</strong></p>
            <p><strong>Straight Duct Sections</strong></p>
            <p>ΔP = f × (L/D) × (ρv²/2)</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>f = friction factor (0.02-0.03 typical)</li>
              <li>L = duct length (m)</li>
              <li>D = hydraulic diameter (m)</li>
              <li>ρ = air density (1.2 kg/m³)</li>
              <li>v = velocity (m/s)</li>
            </ul>
            <p><strong>Fittings and Components</strong></p>
            <p>ΔP = K × (ρv²/2)</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>K = loss coefficient (from tables)</li>
              <li>90° bend (no vanes): K = 1.0-1.5</li>
              <li>90° bend (with vanes): K = 0.15-0.25</li>
              <li>Branch tee: K = 0.5-1.5</li>
              <li>Damper (fully open): K = 0.1-0.3</li>
            </ul>
            <p><strong>Design tip:</strong> For hydraulic diameter of rectangular ducts, use D <sub>h</sub> = 4A/P where A = cross-sectional area and P = perimeter. This allows use of circular duct friction charts.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Ductwork Materials and Construction">
            <p>The DW/144 specification (BESA/HVCA) defines construction standards for sheet metal ductwork in the UK. Material selection depends on the application, with galvanised steel being the default for most commercial systems, whilst aluminium or stainless steel serve specialist needs.</p>
            <p><strong>Material Selection Guide</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Galvanised steel:</strong> Standard commercial HVAC — Cost-effective, good corrosion resistance</li>
              <li><strong>Stainless steel:</strong> Kitchen extract, pharmaceutical, corrosive atmospheres — Excellent corrosion resistance, cleanable</li>
              <li><strong>Aluminium:</strong> Lightweight applications, external exposed — Lightweight (1/3 weight of steel), non-magnetic</li>
              <li><strong>Phenolic/PIR board:</strong> Low-velocity supply, acoustic applications — Pre-insulated, low thermal bridging, quiet</li>
              <li><strong>Flexible duct:</strong> Final connections, short runs only — Easy installation, absorbs vibration</li>
            </ul>
            <p><strong>DW/144 Material Thickness Requirements (Galvanised Steel)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Up to 300:</strong> 0.5mm — 0.5mm</li>
              <li><strong>301 - 450:</strong> 0.7mm — 0.5mm</li>
              <li><strong>451 - 750:</strong> 0.8mm — 0.6mm</li>
              <li><strong>751 - 1000:</strong> 1.0mm — 0.8mm</li>
              <li><strong>1001 - 1500:</strong> 1.2mm — 1.0mm</li>
              <li><strong>&gt;1500:</strong> 1.2mm + stiffeners — 1.0mm + stiffeners</li>
            </ul>
            <p><strong>Rectangular Duct Advantages</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Lower profile for restricted ceiling voids</li>
              <li>Easier to fit multiple runs in parallel</li>
              <li>Simpler branch connections</li>
              <li>Flat surfaces easier to insulate</li>
              <li>Better for acoustic lining installation</li>
            </ul>
            <p><strong>Circular Duct Advantages</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Lower pressure drop (12-15% less friction)</li>
              <li>More uniform velocity distribution</li>
              <li>Better structural strength per material weight</li>
              <li>Spiral wound construction is airtight</li>
              <li>Easier to clean internally</li>
            </ul>
            <p><strong>Aspect Ratio Considerations</strong></p>
            <p>For rectangular ducts, the aspect ratio (width ÷ height) should not exceed 4:1. Higher aspect ratios result in increased friction losses, uneven velocity distribution, and higher material usage. Where possible, aim for aspect ratios of 2:1 or less for optimal performance.</p>
            <p><strong>Specification note:</strong> Always specify DW/144 compliance in ductwork specifications to ensure construction quality. Include pressure class (low/medium/high) and leakage class (A/B/C/D) requirements.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Fire and Smoke Dampers">
            <p>Where ductwork penetrates fire-rated construction, fire dampers maintain the integrity of fire compartmentation. Smoke dampers prevent smoke spread through ductwork during the critical early stages of a fire when temperatures may not yet trigger fire dampers.</p>
            <p><strong>Fire Damper Classifications (BS EN 15650)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>E60:</strong> 60 minutes integrity — Standard commercial - 60 min compartments</li>
              <li><strong>E90:</strong> 90 minutes integrity — Enhanced protection - sleeping risk areas</li>
              <li><strong>E120:</strong> 120 minutes integrity — High-risk areas, extended evacuation time</li>
              <li><strong>ES60/ES120:</strong> Integrity + smoke leakage control — Combined fire/smoke damper applications</li>
            </ul>
            <p><strong>Fire Dampers</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Trigger:</strong> Fusible link (72°C) or motor operated</li>
              <li><strong>Function:</strong> Maintain fire compartment integrity</li>
              <li><strong>Required:</strong> At all fire-rated wall/floor penetrations</li>
              <li><strong>Testing:</strong> BS EN 1366-2 for fire resistance</li>
              <li><strong>Reset:</strong> Manual or automatic after inspection</li>
            </ul>
            <p><strong>Smoke Dampers</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Trigger:</strong> Fire alarm signal or smoke detector</li>
              <li><strong>Function:</strong> Prevent smoke spread via ductwork</li>
              <li><strong>Required:</strong> Smoke control zones, escape routes</li>
              <li><strong>Testing:</strong> BS EN 1751 for air leakage classification</li>
              <li><strong>Operation:</strong> Motor-operated, fail-safe design</li>
            </ul>
            <p><strong>Fire Damper Installation Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Location:</strong> Within 150mm of the fire-rated element face</li>
              <li><strong>Access:</strong> Minimum 300mm clear space for inspection and maintenance</li>
              <li><strong>Sleeve:</strong> May be required to extend through fire barrier thickness</li>
              <li><strong>Fire stopping:</strong> Gap between damper and construction sealed with fire-rated material</li>
              <li><strong>Fusible link:</strong> Must be in airstream and visible through access panel</li>
              <li><strong>Testing:</strong> Annual inspection and functional test required</li>
            </ul>
            <p><strong>Smoke Damper Leakage Classes (BS EN 1751)</strong></p>
            <p>Class 0</p>
            <p>No requirement</p>
            <p>Class 1</p>
            <p>Standard leakage</p>
            <p>Class 2</p>
            <p>Low leakage</p>
            <p>Class 3</p>
            <p>Very low leakage</p>
            <p><strong>Critical:</strong> Fire dampers must be installed strictly per manufacturer's instructions. Incorrect installation invalidates fire certification and may not function correctly in a fire.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Acoustic Attenuation and Leakage Testing">
            <p>Acoustic treatment controls noise transmission through ductwork, whilst leakage testing verifies ductwork integrity. Both are essential for energy-efficient, comfortable building environments and must be considered during the design stage.</p>
            <p><strong>Sources of Ductwork Noise</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Fan noise:</strong> Mechanical and aerodynamic sources — Attenuators, anti-vibration mounts</li>
              <li><strong>Airflow noise:</strong> Turbulence at fittings (∝ v^5-6) — Reduce velocity, turning vanes</li>
              <li><strong>Terminal noise:</strong> Diffuser/grille regenerated noise — Select low-noise terminals, reduce velocity</li>
              <li><strong>Breakout noise:</strong> Sound radiating through duct walls — Acoustic lagging, heavier duct material</li>
              <li><strong>Crosstalk:</strong> Sound transfer between rooms via ducts — Lined duct, acoustic crosstalk attenuators</li>
            </ul>
            <p><strong>Splitter Attenuators</strong></p>
            <p>The most common acoustic attenuator type uses parallel splitters of sound-absorbing material (typically glass fibre or mineral wool) to absorb sound energy as air passes through.</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>- Attenuation: 10-25 dB depending on length and splitter spacing</li>
              <li>- Typical length: 900-1800mm for significant attenuation</li>
              <li>- Splitter spacing: 100-200mm airways between splitters</li>
              <li>- Pressure drop: 20-80 Pa depending on velocity and design</li>
              <li>- Facing: Perforated metal or woven fabric to protect absorber</li>
            </ul>
            <p><strong>DW/144 Ductwork Leakage Classes</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Class A:</strong> 0.009 × p^0.65 L/s per m² — High-pressure, energy-critical, cleanrooms</li>
              <li><strong>Class B:</strong> 0.027 × p^0.65 L/s per m² — Medium-pressure, enhanced commercial</li>
              <li><strong>Class C:</strong> 0.081 × p^0.65 L/s per m² — Standard low-pressure commercial</li>
              <li><strong>Class D:</strong> 0.243 × p^0.65 L/s per m² — Where leakage is acceptable (rare)</li>
            </ul>
            <p>Note: p = test pressure in Pa. For Class C at 400 Pa: 0.081 × 400^0.65 = 4.0 L/s per m² duct surface</p>
            <p><strong>Leakage Testing Procedure (DW/143)</strong></p>
            <p><strong>Pressure Decay Method</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>1. Seal all openings in test section</li>
              <li>2. Pressurise to 110% of test pressure</li>
              <li>3. Allow to stabilise for 2 minutes</li>
              <li>4. Record pressure drop over 5 minutes</li>
              <li>5. Calculate leakage rate from decay curve</li>
              <li>6. Compare against class limit</li>
            </ul>
            <p><strong>Constant Pressure Method</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>1. Seal all openings in test section</li>
              <li>2. Connect calibrated flow meter to test rig</li>
              <li>3. Pressurise to test pressure</li>
              <li>4. Measure airflow to maintain pressure</li>
              <li>5. Record flow rate (= leakage rate)</li>
              <li>6. Divide by duct surface area, compare to limit</li>
            </ul>
            <p><strong>Energy Impact of Ductwork Leakage</strong></p>
            <p>A system with 10% duct leakage requires approximately 20-30% more fan power to deliver the same airflow to terminals. Modern energy regulations increasingly require Class A or B tightness. Testing before insulation allows remedial sealing - test sections typically limited to 100-200m² of duct surface area for practical reasons.</p>
            <p><strong>Best practice:</strong> Specify leakage testing in all ductwork contracts and witness testing on site. Remedial sealing after insulation is significantly more costly and may not achieve the required class.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Duct Sizing by Equal Friction</strong>
            </p>
            <p><strong>Scenario:</strong> Size a supply duct for 500 L/s (0.5 m³/s) using the equal friction method at 1 Pa/m.</p>
            <p>From CIBSE duct sizing chart at 1 Pa/m and 0.5 m³/s:</p>
            <p>Circular duct: Diameter = 350mm</p>
            <p>Velocity = 5.2 m/s</p>
            <p>Equivalent rectangular (4:1 max aspect):</p>
            <p>Area required = π × 0.175² = 0.096 m²</p>
            <p>Option 1: 400mm × 250mm (0.100 m², 2:1 aspect)</p>
            <p>Option 2: 500mm × 200mm (0.100 m², 2.5:1 aspect)</p>
            <p>Selected: 400mm × 250mm rectangular</p>
            <p>(Better aspect ratio, similar space requirement)</p>
            <p>
              <strong>Example 2: Pressure Drop Through Fitting</strong>
            </p>
            <p><strong>Scenario:</strong> Calculate pressure drop through a 90° bend (no vanes) at 6 m/s velocity.</p>
            <p>Using: ΔP = K × (ρv²/2)</p>
            <p>K factor for 90° bend (no vanes) = 1.2</p>
            <p>Air density ρ = 1.2 kg/m³</p>
            <p>Velocity v = 6 m/s</p>
            <p>ΔP = 1.2 × (1.2 × 6²/2)</p>
            <p>ΔP = 1.2 × (1.2 × 36/2)</p>
            <p>ΔP = 1.2 × 21.6</p>
            <p>ΔP = 25.9 Pa</p>
            <p>With turning vanes (K = 0.2):</p>
            <p>ΔP = 0.2 × 21.6 = <span>4.3 Pa</span></p>
            <p>Saving = 21.6 Pa per bend</p>
            <p>
              <strong>Example 3: Ductwork Leakage Assessment</strong>
            </p>
            <p><strong>Scenario:</strong> Verify Class C compliance for a duct section with 150 m² surface area tested at 400 Pa.</p>
            <p>Class C leakage limit formula:</p>
            <p>q = 0.081 × p^0.65 L/s per m²</p>
            <p>At test pressure p = 400 Pa:</p>
            <p>q = 0.081 × 400^0.65</p>
            <p>q = 0.081 × 49.2</p>
            <p>q = 3.98 L/s per m² of duct surface</p>
            <p>For 150 m² duct surface:</p>
            <p>Maximum allowable leakage = 3.98 × 150 = 597 L/s</p>
            <p>Test result: Measured 420 L/s to maintain 400 Pa</p>
            <p>✓ PASS - 420 L/s &lt; 597 L/s limit</p>
            <p>Actual class achieved: 420/150 = 2.8 L/s per m²</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Ductwork Design Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Calculate airflow requirements for each zone and terminal</li>
              <li>Select sizing method (equal friction or velocity reduction)</li>
              <li>Size ducts maintaining velocity limits for application</li>
              <li>Calculate total system pressure drop including fittings</li>
              <li>Specify material and DW/144 pressure/leakage class</li>
              <li>Locate fire dampers at all fire-rated penetrations</li>
              <li>Include acoustic attenuators where noise criteria apply</li>
              <li>Specify leakage testing requirements in specification</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Equal friction design: <strong>1 Pa/m</strong> typical for comfort systems</li>
              <li>Maximum aspect ratio: <strong>4:1</strong> (preferably 2:1)</li>
              <li>Noise increases with velocity: <strong>v^5 to v^6</strong></li>
              <li>Fire damper position: within <strong>150mm</strong> of fire barrier</li>
              <li>Standard commercial leakage class: <strong>Class C</strong></li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Excessive flexible duct</strong> - high pressure drop, noise source, difficult to clean</li>
                <li><strong>Ignoring fitting losses</strong> - often 50%+ of total system pressure drop</li>
                <li><strong>Poor aspect ratios</strong> - flat ducts increase friction and make balancing difficult</li>
                <li><strong>Missing access panels</strong> - fire dampers and attenuators need inspection access</li>
                <li><strong>Late leakage testing</strong> - test before insulation to allow economical remedial work</li>
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
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section2-4")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Heat recovery systems
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section2-6")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                System balancing
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule8Section2_5;
