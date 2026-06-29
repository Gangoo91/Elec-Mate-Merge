/**
 * Module 7 · Section 6 · Subsection 3 — Earthing Systems
 * HNC Electrical Engineering for Building Services (Power and Lighting Systems)
 *   TN-S, TN-C-S, TT, and IT systems, main earthing terminal, protective conductors, equipotential bonding, and earth electrode testing
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

const TITLE = 'Earthing Systems - HNC Module 7 Section 6.3';
const DESCRIPTION =
  'Master earthing systems for electrical installations: TN-S, TN-C-S, TT, and IT systems, main earthing terminal, protective conductors, circuit protective conductor sizing, main equipotential bonding, supplementary bonding, and earth electrode testing.';

const quickCheckQuestions = [
  {
    id: 'tns-system',
    question: 'In a TN-S earthing system, how is the means of earthing provided?',
    options: [
      'Through the building structure',
      'Earth electrode at the installation',
      'Separate metallic return path via supply cable sheath',
      'Combined neutral and earth conductor',
    ],
    correctIndex: 2,
    explanation:
      "In a TN-S system, the means of earthing is provided by a separate metallic return path, typically the metal sheath or armouring of the supply cable. The 'S' denotes separate neutral and protective conductors throughout.",
  },
  {
    id: 'tncs-pme',
    question: 'What is the alternative name for a TN-C-S earthing system in the UK?',
    options: [
      'Separately Earthed Neutral (SEN)',
      'Combined Earth and Neutral Terminal (CENT)',
      'Protective Multiple Earthing (PME)',
      'Direct Earth Return (DER)',
    ],
    correctIndex: 2,
    explanation:
      'TN-C-S is commonly known as Protective Multiple Earthing (PME) in the UK. The neutral conductor is earthed at multiple points along the distribution network, providing the means of earthing to consumers.',
  },
  {
    id: 'cpc-sizing',
    question:
      'According to the adiabatic equation, what does k represent when calculating minimum cpc size?',
    options: [
      'A factor depending on conductor material and insulation',
      'The prospective earth fault current at the point of the fault',
      'The maximum permitted disconnection time for the circuit',
      'The cross-sectional area of the associated line conductor',
    ],
    correctIndex: 0,
    explanation:
      'In the adiabatic equation S = √(I²t)/k, the k value is a factor that depends on the conductor material (copper or aluminium) and the type of insulation. For thermoplastic insulated copper, k = 115.',
  },
  {
    id: 'main-bonding',
    question:
      'What is the minimum cross-sectional area for main protective bonding conductors with a 25mm² supply neutral?',
    options: [
      '16mm²',
      '25mm²',
      '10mm²',
      '6mm²',
    ],
    correctIndex: 2,
    explanation:
      'Main protective bonding conductors must have a csa of not less than half the csa of the supply neutral, with a minimum of 6mm² and maximum requirement of 25mm². With a 25mm² neutral: 25 ÷ 2 = 12.5mm², so 16mm² would be required (next standard size up from 10mm²).',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'In which earthing system does the DNO provide no means of earthing, requiring the installation of an earth electrode?',
    options: [
      'TN-S',
      'TT',
      'TN-C-S',
      'TN-C',
    ],
    correctAnswer: 1,
    explanation:
      'In a TT system, the DNO provides no means of earthing. The installation requires its own earth electrode to be installed, and protection is typically provided by RCDs due to the higher earth fault loop impedance.',
  },
  {
    id: 2,
    question: "What does the designation 'TN' indicate about an earthing system?",
    options: [
      'The source is isolated from earth and the installation uses its own earth electrode',
      'Both the source and the installation are earthed via independent earth electrodes',
      'The source is directly earthed and exposed-conductive-parts are connected to that earth',
      'The neutral and protective conductors remain combined throughout the installation',
    ],
    correctAnswer: 2,
    explanation:
      'TN indicates: T = terra (source directly earthed at one point), N = neutral (exposed-conductive-parts connected to the earthed point of the source, i.e., the neutral). The earthing arrangement uses the supply neutral.',
  },
  {
    id: 3,
    question: 'What is the typical maximum declared earth fault loop impedance (Ze) for a TN-S system?',
    options: [
      '21Ω',
      '0.8Ω',
      '200Ω',
      '0.35Ω',
    ],
    correctAnswer: 1,
    explanation:
      'The typical maximum declared Ze for a TN-S system is 0.8Ω, with the fault return path via the metallic cable sheath. The lower 0.35Ω figure is the typical declared maximum for a TN-C-S (PME) supply.',
  },
  {
    id: 4,
    question:
      'Why must additional precautions be taken with PME supplies when providing earthing to outbuildings?',
    options: [
      'Loss of the PEN conductor could result in dangerous voltages appearing on metalwork',
      'The earth fault loop impedance is too low to allow protective devices to operate',
      'PME earthing increases the resistance of the circuit protective conductor',
      'Outbuildings always have a higher prospective fault current than the main building',
    ],
    correctAnswer: 0,
    explanation:
      'If the PEN (combined protective earth and neutral) conductor is lost in a PME system, dangerous voltages can appear on all metalwork connected to the PME earth. For outbuildings, TT earthing with an earth electrode is often required.',
  },
  {
    id: 5,
    question: 'The main earthing terminal must be connected to which of the following?',
    options: [
      'Only the means of earthing, with circuit protective conductors taken to the neutral bar',
      'The means of earthing, all circuit cpcs, main bonding conductors, and functional earthing',
      'Only the main protective bonding conductors for gas and water services',
      'The neutral conductor and the line conductors at the origin of the installation',
    ],
    correctAnswer: 1,
    explanation:
      "The main earthing terminal (MET) is the central connection point for the installation's earthing arrangement. It must connect the means of earthing, all circuit protective conductors, main protective bonding conductors, and any functional earthing requirements.",
  },
  {
    id: 6,
    question:
      'Using the adiabatic equation S = √(I²t)/k, calculate the minimum cpc size for a prospective fault current of 1500A, disconnection time of 0.4s, with k=115.',
    options: [
      '4mm²',
      '6mm²',
      '8.25mm² (use 10mm²)',
      '10mm²',
    ],
    correctAnswer: 2,
    explanation:
      'S = √(I²t)/k = √(1500² × 0.4)/115 = √(2,250,000 × 0.4)/115 = √900,000/115 = 949/115 = 8.25mm². The next standard size up is 10mm².',
  },
  {
    id: 7,
    question: 'What is the purpose of supplementary equipotential bonding?',
    options: [
      'To provide the main fault current return path back to the source transformer',
      'To replace the need for a circuit protective conductor on final circuits',
      'To lower the earth electrode resistance of a TT installation',
      'To reduce touch voltages by connecting simultaneously accessible metalwork in specific locations',
    ],
    correctAnswer: 3,
    explanation:
      'Supplementary bonding connects together simultaneously accessible exposed-conductive-parts and extraneous-conductive-parts within specific locations (e.g., bathrooms) to reduce touch voltages that could occur during a fault.',
  },
  {
    id: 8,
    question: 'Which extraneous-conductive-parts require main protective bonding?',
    options: [
      'Metal gas, water, oil pipes, structural steel, and other services entering the building',
      'Plastic water and waste pipes, which can carry static charge into the building',
      'The exposed metalwork of Class II double-insulated appliances',
      'Internal metal pipework located more than 600mm beyond the service entry',
    ],
    correctAnswer: 0,
    explanation:
      'Main protective bonding is required for metal water pipes, gas installation pipes (within 600mm of the meter), oil pipes, structural steel, central heating and air conditioning systems, and any other metallic service entering the building.',
  },
  {
    id: 9,
    question:
      'For an earth electrode serving a TT installation, what test should be performed and what is the typical maximum acceptable resistance?',
    options: [
      'Insulation resistance test, with a minimum acceptable value of 1 megohm',
      'Earth electrode resistance test, typically less than 200Ω when using 30mA RCD protection',
      'Earth fault loop impedance test, with a maximum acceptable value of 0.35Ω',
      'Continuity test of the protective conductor, with a maximum of 0.05Ω',
    ],
    correctAnswer: 1,
    explanation:
      'Earth electrode resistance should be tested using a dedicated earth electrode resistance tester. For TT systems with 30mA RCD protection, Ra × IΔn ≤ 50V means Ra ≤ 50/0.03 = 1667Ω, but practically values under 200Ω are preferred for reliable operation.',
  },
  {
    id: 10,
    question: 'What is an IT earthing system primarily used for?',
    options: [
      'Standard domestic installations supplied from an underground cable network',
      'Rural installations fed by overhead lines where no DNO earth is provided',
      'Installations requiring high continuity of supply where a first fault should not cause disconnection',
      'Temporary supplies on construction sites where PME is not permitted',
    ],
    correctAnswer: 2,
    explanation:
      'IT systems have either an unearthed source or a source earthed through a high impedance. This means a first earth fault will not cause automatic disconnection, providing continuity of supply for critical processes like hospitals or manufacturing.',
  },
  {
    id: 11,
    question:
      'What is the maximum allowable resistance between main bonding conductors and extraneous-conductive-parts?',
    options: [
      'There is no specific maximum, just a sound electrical connection',
      '0.5Ω',
      '5Ω',
      '0.05Ω',
    ],
    correctAnswer: 3,
    explanation:
      'The resistance of main protective bonding conductors should not exceed 0.05Ω (50 milliohms). This ensures an effective equipotential zone and allows adequate fault current to flow for protective device operation.',
  },
  {
    id: 12,
    question:
      'When using Table 54.7 of BS 7671 for cpc sizing, what determines the minimum cpc size?',
    options: [
      'The cross-sectional area of the line conductor',
      'The prospective earth fault current at the consumer unit',
      'The rated residual operating current of any RCD fitted',
      'The total length of the final circuit being protected',
    ],
    correctAnswer: 0,
    explanation:
      'Table 54.7 relates minimum cpc size to the cross-sectional area of the associated line conductor. For line conductors up to 16mm², cpc must be at least equal in size. Above 16mm², different ratios apply.',
  },
];

const faqs = [
  {
    question: 'What is the difference between TN-S and TN-C-S systems?',
    answer:
      'In TN-S, the protective conductor (earth) and neutral are separate throughout the entire system, with earthing typically provided via the cable sheath. In TN-C-S (PME), they are combined in the supply network as a PEN conductor, then separated at the intake position. TN-C-S is more common for modern installations but requires additional precautions for certain applications due to the shared neutral/earth path.',
  },
  {
    question: 'Why is RCD protection usually required for TT installations?',
    answer:
      'TT systems typically have much higher earth fault loop impedance (Ze can exceed 20Ω) because the fault current must return via the general mass of earth. This high impedance means fault currents may be too low to operate overcurrent devices quickly enough. RCDs detect the imbalance caused by earth leakage and can disconnect within the required time regardless of loop impedance.',
  },
  {
    question: 'Can I use Table 54.7 instead of the adiabatic equation for cpc sizing?',
    answer:
      'Yes, Table 54.7 provides a simplified method for sizing cpcs based on line conductor size, without needing to calculate fault current and disconnection time. However, the adiabatic equation method often allows smaller conductor sizes and must be used where Table 54.7 is not applicable, such as for unusually long circuits or non-standard situations.',
  },
  {
    question: 'What is the 600mm rule for gas bonding?',
    answer:
      'Main protective bonding to gas installation pipework should be connected within 600mm of the gas meter. This ensures that the bonding is applied before any internal gas pipework, which could become live through a fault. The bonding clamp should be fitted on the consumer side of the meter on hard pipework, not on the meter itself.',
  },
  {
    question: 'When is supplementary bonding required in a bathroom?',
    answer:
      'BS 7671 has reduced requirements for supplementary bonding in bathrooms. It is not required if the location is served by circuits with RCD protection not exceeding 30mA, all exposed-conductive-parts and extraneous-conductive-parts are connected to the main earthing system, and the main protective bonding complies with current regulations.',
  },
  {
    question: 'How do I test earth electrode resistance?',
    answer:
      'Earth electrode resistance is typically measured using the fall-of-potential method with a dedicated earth electrode resistance tester. Two temporary test spikes are driven into the ground at set distances from the electrode. The tester passes a current between the electrode and one spike while measuring voltage to the other, calculating resistance from these values.',
  },
];

const HNCModule7Section6_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section6")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 7 · Section 6 · Subsection 3"
            title="Earthing Systems"
            description="TN-S, TN-C-S, TT, and IT systems, main earthing terminal, protective conductors, equipotential bonding, and earth electrode testing"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Identify and explain TN-S, TN-C-S, TT, and IT earthing systems",
              "Understand the function of the main earthing terminal",
              "Size circuit protective conductors using Table 54.7 and adiabatic equation",
              "Apply main equipotential bonding requirements correctly",
              "Determine when supplementary bonding is required",
              "Perform and interpret earth electrode resistance tests",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Earthing System Types">
            <p>The earthing system defines how the source (transformer) is earthed and how the exposed-conductive-parts of the installation are connected to earth. The system type affects protective device selection, earth fault loop impedance values, and additional protection requirements.</p>
            <p><strong>System designation letters:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>First letter (relationship of supply to earth):</strong> T = direct connection to earth, I = isolated or high impedance connection</li>
              <li><strong>Second letter (installation earthing):</strong> T = direct connection to earth, N = connection to earthed point of source (neutral)</li>
              <li><strong>Subsequent letters:</strong> S = separate neutral and protective conductors, C = combined conductor (PEN)</li>
            </ul>
            <p><strong>UK Earthing Systems Comparison</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>TN-S:</strong> Cable sheath/armouring — ≤ 0.8Ω — Older urban supplies, industrial</li>
              <li><strong>TN-C-S (PME):</strong> Supply neutral (PEN) — ≤ 0.35Ω — Modern domestic/commercial</li>
              <li><strong>TT:</strong> Earth electrode — ≤ 21Ω (typically) — Rural, overhead supplies, outbuildings</li>
              <li><strong>IT:</strong> Isolated or high impedance — Variable — Critical systems, hospitals, process plants</li>
            </ul>
            <p><strong>PME Precautions</strong></p>
            <p>With TN-C-S (PME) systems, if the PEN conductor becomes open-circuit, all metalwork connected to the PME earth could rise to a dangerous potential. Special precautions apply for:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Swimming pools and hot tubs - PME earthing not permitted</li>
              <li>Caravan parks - additional requirements apply</li>
              <li>Construction sites - restrictions on PME use</li>
              <li>Outbuildings - TT earthing often required</li>
            </ul>
            <p><strong>Key point:</strong> Always verify the earthing system type at the origin before designing or testing an installation. The system type determines Zs values, protective device selection, and additional measures required.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Main Earthing Terminal and Protective Conductors">
            <p>The main earthing terminal (MET) is the central point of the installation's earthing arrangement, providing a connection between the means of earthing and all protective conductors. Circuit protective conductors (cpcs) provide the fault current path from exposed-conductive-parts back to the source.</p>
            <p><strong>Main Earthing Terminal Connections</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Earthing conductor to means of earthing</li>
              <li>All circuit protective conductors</li>
              <li>Main protective bonding conductors</li>
              <li>Functional earthing (if required)</li>
              <li>Lightning protection (if applicable)</li>
            </ul>
            <p><strong>MET Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Must be readily accessible</li>
              <li>Suitable for disconnection for testing</li>
              <li>Disconnection requires tool</li>
              <li>Mechanically strong and reliable</li>
              <li>Label: "Safety Electrical Connection - Do Not Remove"</li>
            </ul>
            <p><strong>CPC Sizing - Table 54.7 Method</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>S ≤ 16:</strong> S (same as line) — e.g., 2.5mm² line → 2.5mm² cpc</li>
              <li><strong>16 &lt; S ≤ 35:</strong> 16 — e.g., 25mm² line → 16mm² cpc</li>
              <li><strong>S &gt; 35:</strong> S/2 — e.g., 70mm² line → 35mm² cpc</li>
            </ul>
            <p><strong>Adiabatic Equation Method</strong></p>
            <p>S = √(I²t) / k</p>
            <p>Where:</p>
            <p>S = minimum cpc cross-sectional area (mm²)</p>
            <p>I = prospective fault current (A)</p>
            <p>t = disconnection time (s)</p>
            <p>k = factor for conductor material and insulation</p>
            <p>Common k values (thermoplastic insulation):</p>
            <p>Copper conductor: k = 115</p>
            <p>Aluminium conductor: k = 76</p>
            <p><strong>Design tip:</strong> The adiabatic equation often permits smaller cpcs than Table 54.7, reducing cable costs on larger installations. Always verify the result is practical and meets minimum requirements.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Main Equipotential Bonding">
            <p>Main protective bonding connects extraneous-conductive-parts to the main earthing terminal, creating an equipotential zone where all metalwork is at the same potential. This limits touch voltages during earth faults and provides a path for fault current.</p>
            <p><strong>Parts Requiring Main Bonding</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Water installation pipes:</strong> Bond at point of entry or as close as practicable</li>
              <li><strong>Gas installation pipes:</strong> Bond within 600mm of meter outlet on consumer side</li>
              <li><strong>Other services:</strong> Oil pipes, central heating, air conditioning</li>
              <li><strong>Structural steel:</strong> Where it forms extraneous-conductive-part</li>
              <li><strong>Lightning protection:</strong> Earth termination system</li>
            </ul>
            <p><strong>Main Bonding Conductor Sizing</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Up to 16:</strong> 10 (min 6mm²) — Small domestic (60A-80A supply)</li>
              <li><strong>25:</strong> 16 (half of 25 = 12.5, round up) — Larger domestic (100A supply)</li>
              <li><strong>35:</strong> 16 (half of 35 = 17.5, round down to 16) — Commercial small</li>
              <li><strong>50 or greater:</strong> 25 (maximum requirement) — Large commercial/industrial</li>
            </ul>
            <p><strong>Bonding Connection Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Use appropriate clamps (BS 951)</li>
              <li>Connect to clean, bare metal</li>
              <li>Resistance not exceeding 0.05Ω</li>
              <li>Label: "Safety Electrical Connection - Do Not Remove"</li>
              <li>Accessible for inspection</li>
            </ul>
            <p><strong>Connection Locations</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Water: after stopcock, before branch pipes</li>
              <li>Gas: within 600mm of meter outlet</li>
              <li>Before insulating sections</li>
              <li>On hard pipe, not flexible connectors</li>
              <li>Accessible for testing/maintenance</li>
            </ul>
            <p><strong>Important:</strong> With PME supplies, the bonding requirements are critical. Loss of the PEN conductor could result in the neutral rising to a dangerous potential, and bonding ensures all metalwork rises equally, limiting touch voltages.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Supplementary Bonding and Earth Electrode Testing">
            <p>Supplementary equipotential bonding connects simultaneously accessible exposed-conductive-parts and extraneous-conductive-parts within specific locations to reduce touch voltages. Earth electrode testing verifies that TT installations have adequate earthing for protective device operation.</p>
            <p><strong>Supplementary Bonding Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Two exposed-conductive-parts:</strong> 2.5mm² Cu — 4mm² Cu</li>
              <li><strong>Exposed to extraneous:</strong> 2.5mm² Cu — 4mm² Cu</li>
              <li><strong>Two extraneous-conductive-parts:</strong> 2.5mm² Cu — 4mm² Cu</li>
            </ul>
            <p><strong>When Supplementary Bonding May Be Omitted</strong></p>
            <p>In locations such as bathrooms, supplementary bonding may be omitted where:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>All circuits are protected by 30mA RCD</li>
              <li>All exposed and extraneous-conductive-parts are connected to main earthing</li>
              <li>Main protective bonding complies with Regulation 411.3.1.2</li>
            </ul>
            <p><strong>Earth Electrode Testing</strong></p>
            <p><strong>Fall of Potential Method</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>1. Disconnect electrode from installation</li>
              <li>2. Place current spike (C) at least 10× electrode depth away</li>
              <li>3. Place potential spike (P) at 62% of distance to C</li>
              <li>4. Measure resistance using dedicated tester</li>
              <li>5. Move P spike to verify stable reading</li>
              <li>6. Record and compare with requirements</li>
            </ul>
            <p><strong>Maximum Electrode Resistance</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>TT with 30mA RCD: Ra ≤ 1667Ω (50V ÷ 0.03A)</li>
              <li>Practical target: Ra &lt; 200Ω preferred</li>
              <li>TT with 100mA RCD: Ra ≤ 500Ω</li>
              <li>Lower values improve fault clearance reliability</li>
              <li>Soil conditions affect achievable values</li>
              <li>Multiple rods may be needed for low values</li>
            </ul>
            <p><strong>Earth Electrode Types and Installation</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Driven rod (copper-clad steel):</strong> Most common, domestic TT — 1.2m minimum, often 2.4m</li>
              <li><strong>Earth mat/plate:</strong> Rocky ground, low depth — Varies by soil conditions</li>
              <li><strong>Foundation electrode:</strong> New builds, commercial — Embedded in concrete</li>
              <li><strong>Tape/strip buried:</strong> Large sites, ring electrodes — 25mm × 3mm copper tape</li>
            </ul>
            <p><strong>Testing note:</strong> Earth electrode resistance varies with soil moisture content. Test during dry conditions for worst-case values. Seasonal variation can be significant - document testing conditions on certificates.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: CPC Sizing Using Adiabatic Equation</strong>
            </p>
            <p><strong>Scenario:</strong> Calculate minimum cpc size for a circuit with Ipf = 2000A, disconnection time = 0.2s, thermoplastic copper (k=115).</p>
            <p>Given: I = 2000A, t = 0.2s, k = 115</p>
            <p>S = √(I²t) / k</p>
            <p>S = √(2000² × 0.2) / 115</p>
            <p>S = √(4,000,000 × 0.2) / 115</p>
            <p>S = √800,000 / 115</p>
            <p>S = 894.4 / 115</p>
            <p>S = 7.78mm²</p>
            <p>Select next standard size: 10mm² cpc</p>
            <p>Note: If line conductor is 4mm², Table 54.7 would require 4mm² cpc</p>
            <p>Adiabatic calculation may permit reduction if other conditions met</p>
            <p>
              <strong>Example 2: Main Bonding Conductor Selection</strong>
            </p>
            <p><strong>Scenario:</strong> Determine main bonding conductor size for a commercial installation with 35mm² supply neutral.</p>
            <p>Supply neutral: 35mm²</p>
            <p>Main bonding requirement: not less than half neutral csa</p>
            <p>Calculation:</p>
            <p>35 ÷ 2 = 17.5mm²</p>
            <p>Minimum requirement: 6mm² (always applies)</p>
            <p>Maximum requirement: 25mm² (cap for main bonding)</p>
            <p>Select: 16mm² main bonding conductor</p>
            <p>(17.5mm² rounds to 16mm² as nearest standard below,</p>
            <p>but some specify 25mm² for additional margin)</p>
            <p>
              <strong>Example 3: TT System Earth Electrode Requirements</strong>
            </p>
            <p><strong>Scenario:</strong> Determine maximum earth electrode resistance for a TT installation protected by a 30mA RCD.</p>
            <p>RCD rating: IΔn = 30mA = 0.03A</p>
            <p>Maximum touch voltage limit: 50V</p>
            <p>Formula: Ra × IΔn ≤ 50V</p>
            <p>Ra ≤ 50 / IΔn</p>
            <p>Ra ≤ 50 / 0.03</p>
            <p>Ra ≤ 1666.7Ω</p>
            <p>Maximum theoretical: 1667Ω</p>
            <p>Practical recommendation: Aim for Ra &lt; 200Ω</p>
            <p>This provides margin for seasonal variation and reliable RCD operation</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Site Assessment Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Identify earthing system type from DNO documentation or visual inspection</li>
              <li>Measure Ze at origin to confirm system type and values</li>
              <li>Identify all extraneous-conductive-parts requiring main bonding</li>
              <li>Verify supply neutral size for bonding conductor sizing</li>
              <li>Check for PME restrictions in the installation location</li>
              <li>Document earthing arrangement on installation certificate</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>TN-S typical Ze: <strong>0.8Ω maximum</strong></li>
              <li>TN-C-S typical Ze: <strong>0.35Ω maximum</strong></li>
              <li>Main bonding minimum: <strong>6mm² copper</strong></li>
              <li>Main bonding maximum: <strong>25mm² copper</strong></li>
              <li>Bonding connection resistance: <strong>≤ 0.05Ω</strong></li>
              <li>Gas bonding: <strong>Within 600mm of meter</strong></li>
              <li>Thermoplastic copper k value: <strong>115</strong></li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Assuming earthing type:</strong> Always verify with measurement and documentation</li>
                <li><strong>Undersized bonding:</strong> Calculate from supply neutral, not guesswork</li>
                <li><strong>Gas bonding position:</strong> Must be within 600mm of meter, on hard pipe</li>
                <li><strong>PME to outbuildings:</strong> Consider TT earthing for separate structures</li>
                <li><strong>Missing labels:</strong> All bonding connections require safety labels</li>
                <li><strong>Electrode testing:</strong> Test in dry conditions for reliable values</li>
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
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section6-2")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Circuit protection
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section6-4")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Coordination studies
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule7Section6_3;
