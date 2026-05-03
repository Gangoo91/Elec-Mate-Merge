/**
 * Module 8 · Section 3 · Subsection 3 — Chilled Water Systems
 * HNC Electrical Engineering for Building Services (HVAC Systems)
 *   Chillers, cooling towers, pumping arrangements and system hydraulics for commercial cooling
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

const TITLE = 'Chilled Water Systems - HNC Module 8 Section 3.3';
const DESCRIPTION =
  'Master chilled water systems for building services: air-cooled and water-cooled chillers, cooling towers, primary/secondary pumping arrangements, variable primary systems, pipe sizing, system hydraulics and free cooling strategies.';

const quickCheckQuestions = [
  {
    id: 'chiller-types',
    question: 'What is the main advantage of water-cooled chillers over air-cooled chillers?',
    options: [
      'Lower initial cost',
      'No water consumption',
      'Higher efficiency and better COP',
      'Simpler installation',
    ],
    correctIndex: 2,
    explanation:
      'Water-cooled chillers achieve higher efficiency (COP typically 5-7) compared to air-cooled units (COP 2.5-4) because water is a more effective heat transfer medium than air. However, they require cooling towers and associated water treatment.',
  },
  {
    id: 'chw-temps',
    question:
      'What are the typical chilled water flow and return temperatures in UK commercial systems?',
    options: ['4/10°C', '6/12°C', '8/14°C', '10/16°C'],
    correctIndex: 1,
    explanation:
      'Standard UK commercial chilled water systems operate at 6°C flow and 12°C return, giving a 6K temperature differential. This provides adequate cooling capacity whilst avoiding condensation issues and maintaining chiller efficiency.',
  },
  {
    id: 'primary-secondary',
    question: 'What is the purpose of a bypass in a primary-secondary pumping system?',
    options: [
      'To increase system pressure',
      'To allow variable secondary flow whilst maintaining constant primary flow',
      'To reduce energy consumption',
      'To improve water quality',
    ],
    correctIndex: 1,
    explanation:
      'The bypass (decoupler) allows the primary circuit to maintain constant flow through the chillers whilst the secondary circuit varies flow to match load. When secondary flow is less than primary, excess water bypasses through the decoupler.',
  },
  {
    id: 'pipe-velocity',
    question:
      'What is the recommended maximum water velocity in chilled water distribution pipework?',
    options: ['0.5 m/s', '1.5 m/s', '3.0 m/s', '5.0 m/s'],
    correctIndex: 2,
    explanation:
      'CIBSE recommends maximum velocities of 1.5-3.0 m/s for chilled water distribution mains to limit noise and erosion. Higher velocities increase pump energy and can cause noise issues, particularly near occupied spaces.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What is the typical COP (Coefficient of Performance) range for a modern water-cooled centrifugal chiller at full load?',
    options: ['2.5-3.5', '4.0-5.0', '5.5-7.0', '8.0-10.0'],
    correctAnswer: 2,
    explanation:
      'Modern water-cooled centrifugal chillers achieve COPs of 5.5-7.0 at full load design conditions. This high efficiency is due to the effective heat rejection via cooling towers and optimised compressor design.',
  },
  {
    id: 2,
    question: 'What is the purpose of a cooling tower approach temperature?',
    options: [
      'The difference between entering and leaving water temperatures',
      'The difference between leaving water temperature and wet bulb temperature',
      'The difference between air inlet and outlet temperatures',
      'The difference between design and actual performance',
    ],
    correctAnswer: 1,
    explanation:
      'Approach temperature is the difference between the leaving water temperature and the ambient wet bulb temperature. A typical approach is 3-5K. Lower approach means larger, more expensive towers but better chiller performance.',
  },
  {
    id: 3,
    question:
      'In a primary-secondary system, what happens when the secondary flow exceeds the primary flow?',
    options: [
      'The system shuts down',
      'Water flows backwards through the bypass',
      'Warm return water mixes with chilled supply',
      'Pump cavitation occurs',
    ],
    correctAnswer: 2,
    explanation:
      "When secondary flow exceeds primary flow, warm return water is drawn through the bypass and mixes with the chilled water supply. This raises the supply temperature and reduces cooling capacity - a condition called 'low delta T syndrome'.",
  },
  {
    id: 4,
    question:
      'What is the main advantage of a variable primary flow (VPF) system over primary-secondary?',
    options: [
      'Lower chiller cost',
      'Elimination of secondary pumps and reduced energy consumption',
      'Simpler controls',
      'Better water quality',
    ],
    correctAnswer: 1,
    explanation:
      'VPF systems eliminate the secondary pumps entirely, reducing capital cost and pump energy. However, they require chillers capable of handling variable flow and more sophisticated controls to manage minimum flow requirements.',
  },
  {
    id: 5,
    question:
      'What is the minimum flow rate typically required through a chiller to prevent laminar flow and freezing?',
    options: [
      '10-20% of design flow',
      '30-50% of design flow',
      '60-80% of design flow',
      '90-100% of design flow',
    ],
    correctAnswer: 1,
    explanation:
      'Most chillers require a minimum flow of 30-50% of design flow to maintain turbulent flow in the evaporator and prevent freezing. Below this, heat transfer deteriorates rapidly and freeze protection may activate.',
  },
  {
    id: 6,
    question:
      'What pressure drop per metre run is typically used for preliminary chilled water pipe sizing?',
    options: ['50-100 Pa/m', '150-300 Pa/m', '400-600 Pa/m', '800-1000 Pa/m'],
    correctAnswer: 1,
    explanation:
      'CIBSE recommends a pressure drop of 150-300 Pa/m for preliminary pipe sizing. This provides a balance between pipe cost (smaller pipes = higher pressure drop) and pump energy (higher pressure drop = more pump energy).',
  },
  {
    id: 7,
    question: 'What is the purpose of a plate heat exchanger in a free cooling system?',
    options: [
      'To increase system pressure',
      'To separate the chilled water circuit from the condenser water circuit',
      'To improve water quality',
      'To reduce noise',
    ],
    correctAnswer: 1,
    explanation:
      'The plate heat exchanger separates the clean chilled water circuit from the potentially contaminated condenser water circuit whilst allowing heat transfer for free cooling. This protects the chilled water system from cooling tower water quality issues.',
  },
  {
    id: 8,
    question:
      'At what ambient wet bulb temperature can free cooling typically begin to contribute to a chilled water system?',
    options: ['Below 20°C WB', 'Below 15°C WB', 'Below 10°C WB', 'Below 5°C WB'],
    correctAnswer: 2,
    explanation:
      'Free cooling can typically begin when ambient wet bulb drops below approximately 10°C, as this allows cooling tower water to approach the required chilled water temperatures. Full free cooling (chillers off) may be possible below 5°C WB.',
  },
  {
    id: 9,
    question: 'What is the typical range of a cooling tower?',
    options: [
      'The difference between wet and dry bulb temperatures',
      'The difference between entering and leaving water temperatures',
      'The distance water falls through the fill',
      'The temperature difference across the chiller condenser',
    ],
    correctAnswer: 1,
    explanation:
      'Range is the temperature difference between the water entering and leaving the cooling tower, typically 5-6K for HVAC applications. It equals the heat rejected divided by the water flow rate and specific heat capacity.',
  },
  {
    id: 10,
    question: 'Why is glycol sometimes added to chilled water systems?',
    options: [
      'To improve heat transfer',
      'To prevent biological growth',
      'To prevent freezing in exposed pipework or during free cooling',
      'To reduce pumping energy',
    ],
    correctAnswer: 2,
    explanation:
      'Glycol (typically 20-30% concentration) is added to prevent freezing in systems with exposed external pipework or where free cooling could result in very low temperatures. Note that glycol reduces heat transfer capacity and increases pumping energy.',
  },
  {
    id: 11,
    question:
      'What is the purpose of two-port control valves in a variable flow chilled water system?',
    options: [
      'To maintain constant flow through terminal units',
      'To vary flow to terminal units based on load',
      'To balance the system',
      'To prevent reverse flow',
    ],
    correctAnswer: 1,
    explanation:
      'Two-port valves modulate flow to terminal units (FCUs, AHU coils) based on cooling demand. As valves close, system pressure rises and VSDs on pumps reduce speed, saving significant pump energy compared to constant flow systems.',
  },
  {
    id: 12,
    question: 'What is low delta T syndrome and why is it problematic?',
    options: [
      'Excessive temperature drop causing freezing',
      'Return water temperature too close to supply, reducing system capacity',
      'High pressure drop across control valves',
      'Excessive noise in pipework',
    ],
    correctAnswer: 1,
    explanation:
      'Low delta T syndrome occurs when the return water temperature is too close to the supply temperature (e.g., 3K instead of 6K). This reduces the cooling capacity per unit of water flow, requiring more chillers and pumps to operate and wasting energy.',
  },
  {
    id: 13,
    question:
      'What is the purpose of a differential pressure sensor in a variable speed pumping system?',
    options: [
      'To measure flow rate',
      'To control pump speed to maintain required pressure at the index circuit',
      'To detect leaks',
      'To measure water quality',
    ],
    correctAnswer: 1,
    explanation:
      'The DP sensor, located at the hydraulically most remote point (index circuit), controls pump speed to maintain adequate pressure for the furthest terminals. As valves close, pressure rises and pumps slow down, saving energy.',
  },
  {
    id: 14,
    question: 'What is the typical fill material used in modern induced draught cooling towers?',
    options: [
      'Wooden slats',
      'Metal plates',
      'PVC or polypropylene film or splash fill',
      'Ceramic tiles',
    ],
    correctAnswer: 2,
    explanation:
      'Modern towers use PVC or polypropylene fill media, either film type (for clean water) or splash type (more resistant to fouling). These materials provide high surface area for heat and mass transfer whilst being lightweight and resistant to biological growth.',
  },
];

const faqs = [
  {
    question: 'What is the difference between air-cooled and water-cooled chillers?',
    answer:
      'Air-cooled chillers reject heat directly to outdoor air via finned coils and fans, making them simpler to install with no water consumption. However, they have lower efficiency (COP 2.5-4) and performance degrades significantly in hot weather. Water-cooled chillers reject heat via a separate condenser water circuit to cooling towers, achieving higher efficiency (COP 5-7) and more stable performance. They require cooling towers, condenser water pumps, water treatment and make-up water, adding complexity and operational cost but offering substantial energy savings in larger installations.',
  },
  {
    question: 'When should I use primary-secondary pumping versus variable primary flow?',
    answer:
      "Primary-secondary is the traditional approach, providing hydraulic separation between constant-flow chillers and variable-flow distribution. It's simpler to control and works with any chiller but requires additional pumps and pipework. Variable primary flow (VPF) eliminates secondary pumps, reducing capital and energy costs, but requires chillers rated for variable flow (typically minimum 30-50% flow) and sophisticated controls including bypass arrangements. VPF is increasingly preferred for new installations where chillers are suitable, whilst primary-secondary remains appropriate for retrofit or where simpler controls are required.",
  },
  {
    question: 'How do I size chilled water pipes?',
    answer:
      'Preliminary sizing uses a target pressure drop of 150-300 Pa/m run and maximum velocity of 1.5-3.0 m/s. Calculate the required flow rate from Q = cooling load / (4.2 x delta T x 1000) in litres/second. Select pipe size from tables or software to meet both pressure drop and velocity criteria. For risers and branches near occupied spaces, reduce velocity to 1.0-1.5 m/s to limit noise. Final sizing should include allowance for fittings (typically 30-50% addition to straight pipe losses) and verify pump selection against actual system resistance.',
  },
  {
    question: 'What causes low delta T syndrome and how can it be prevented?',
    answer:
      'Low delta T syndrome occurs when control valves are oversized, coils are dirty or undersized, or system balancing is poor. This results in return water temperatures closer to supply than design (e.g., 9°C instead of 12°C). Prevention includes proper valve sizing (aim for 50-70% open at design load), regular coil maintenance, correct system commissioning, and use of delta T monitoring. Some systems use return temperature control strategies where chillers modulate based on maintaining design delta T rather than just supply temperature.',
  },
  {
    question: 'How does free cooling work in chilled water systems?',
    answer:
      'Free cooling uses low ambient temperatures to pre-cool or fully cool the chilled water without running compressors. In waterside free cooling, the cooling tower water (when cold enough) passes through a heat exchanger to cool chilled water directly. This can begin when wet bulb temperature drops below approximately 10°C, with full free cooling possible below 5°C. A plate heat exchanger separates the two water circuits to protect chilled water quality. Airside economisers on AHUs provide a similar benefit by using cold outdoor air directly. Free cooling can reduce chiller energy by 30-50% in UK climates.',
  },
  {
    question: 'What water treatment is required for chilled water systems?',
    answer:
      'Chilled water systems require treatment to prevent corrosion, scale and biological growth. Typical treatment includes corrosion inhibitors (e.g., nitrite-based for closed systems), biocides to prevent Legionella and biofilm, and pH adjustment to 8.5-9.5. Closed chilled water circuits need minimal make-up and annual water testing. Condenser water circuits serving cooling towers require more intensive treatment due to evaporation concentrating minerals and the warm, aerated water encouraging Legionella growth. Cooling towers need regular cleaning, biocide dosing and monitoring under L8/HSG274 requirements.',
  },
];

const HNCModule8Section3_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section3")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 8 · Section 3 · Subsection 3"
            title="Chilled Water Systems"
            description="Chillers, cooling towers, pumping arrangements and system hydraulics for commercial cooling"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Understand air-cooled versus water-cooled chiller operation and selection",
              "Explain cooling tower operation including range and approach",
              "Design primary-secondary and variable primary pumping systems",
              "Size chilled water pipework using pressure drop and velocity criteria",
              "Apply system hydraulics principles for balancing and control",
              "Implement free cooling strategies to reduce energy consumption",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Chillers - Air-Cooled and Water-Cooled">
            <p>Chillers are the heart of any chilled water system, producing cold water typically at 6°C for distribution to air handling units, fan coil units and other terminal equipment. The choice between air-cooled and water-cooled chillers significantly impacts system efficiency, capital cost and operational complexity.</p>
            <p><strong>Air-Cooled Chillers</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Reject heat directly to outdoor air via finned coils and fans</li>
              <li>Typical COP of 2.5-4.0 depending on ambient conditions</li>
              <li>Performance degrades significantly above 35°C ambient</li>
              <li>No water consumption or cooling tower maintenance required</li>
              <li>Simpler installation but require adequate outdoor space for airflow</li>
              <li>Generally suited for loads up to approximately 500kW</li>
            </ul>
            <p><strong>Water-Cooled Chillers</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Reject heat via condenser water circuit to cooling towers</li>
              <li>Higher COP of 5.0-7.0 due to lower condensing temperatures</li>
              <li>More stable performance regardless of ambient dry bulb temperature</li>
              <li>Require cooling towers, condenser pumps and water treatment</li>
              <li>Typical for larger installations &gt;500kW where efficiency savings justify complexity</li>
              <li>Compressor types include scroll, screw and centrifugal</li>
            </ul>
            <p><strong>Chiller Comparison</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Typical COP:</strong> 2.5-4.0 — 5.0-7.0</li>
              <li><strong>Capital cost:</strong> Lower (chiller only) — Higher (+ towers, pumps)</li>
              <li><strong>Water consumption:</strong> None — Significant (evaporation)</li>
              <li><strong>Maintenance:</strong> Simpler — Complex (water treatment)</li>
              <li><strong>Space requirement:</strong> Large outdoor area — Roof/external for towers</li>
              <li><strong>Noise:</strong> Condenser fans — Tower fans (lower)</li>
            </ul>
            <p><strong>Design tip:</strong> For UK climates, water-cooled chillers typically offer 20-40% energy savings over air-cooled units, often paying back the additional capital cost within 3-5 years for systems operating &gt;2000 hours annually.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Cooling Towers">
            <p>Cooling towers reject heat from the condenser water circuit to atmosphere through evaporative cooling. As water cascades through the tower, a portion evaporates, removing heat from the remaining water. This allows condenser water temperatures to approach the ambient wet bulb temperature rather than the higher dry bulb temperature.</p>
            <p><strong>Key Cooling Tower Terms</strong></p>
            <p>Range</p>
            <p>Temperature difference between entering and leaving water. Typically 5-6K for HVAC applications.</p>
            <p>Approach</p>
            <p>Difference between leaving water and ambient wet bulb. Typically 3-5K - lower approach = larger tower.</p>
            <p><strong>Cooling tower types:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Induced draught:</strong> Fan at top draws air through fill - most common for HVAC</li>
              <li><strong>Forced draught:</strong> Fan at bottom pushes air through - good where height is limited</li>
              <li><strong>Crossflow:</strong> Air flows horizontally through falling water - easier maintenance access</li>
              <li><strong>Counterflow:</strong> Air flows upward against falling water - more compact, higher efficiency</li>
            </ul>
            <p><strong>Typical Condenser Water Temperatures</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Design (UK summer):</strong> 27-30°C — 32-35°C</li>
              <li><strong>Part load (spring/autumn):</strong> 20-25°C — 25-30°C</li>
              <li><strong>Free cooling potential:</strong> &lt;15°C — &lt;20°C</li>
            </ul>
            <p><strong>Legionella Risk Management</strong></p>
            <p>Cooling towers create ideal conditions for Legionella growth (warm, aerated water with nutrients from airborne contamination). Compliance with L8 ACOP and HSG274 Part 1 is mandatory, requiring written risk assessments, competent water treatment, regular monitoring (including quarterly Legionella testing) and comprehensive records.</p>
            <p><strong>Remember:</strong> Cooling tower performance is limited by wet bulb temperature, not dry bulb. A tower cannot cool water below the wet bulb temperature. UK design wet bulb is typically 20°C, allowing condenser water as low as 23-25°C.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Primary-Secondary and Variable Primary Pumping">
            <p>Pumping arrangement determines how water flows through the chiller plant and distribution system. The two main approaches - primary-secondary and variable primary flow - offer different trade-offs between complexity, capital cost and energy efficiency.</p>
            <p><strong>Primary-Secondary Pumping</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Primary pumps maintain constant flow through chillers (one pump per chiller)</li>
              <li>Secondary pumps distribute variable flow to building loads</li>
              <li>Bypass pipe (decoupler) connects the two circuits hydraulically</li>
              <li>When secondary flow &lt; primary, excess water bypasses back to return</li>
              <li>When secondary flow &gt; primary, warm return mixes with supply (avoid this)</li>
              <li>Simple, proven approach suitable for most applications</li>
            </ul>
            <p><strong>Primary-Secondary System Rules</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Bypass pipe should be short with minimal fittings (&lt;0.5m head loss)</li>
              <li>Size bypass for full primary flow at &lt;1.5 m/s velocity</li>
              <li>Locate DP sensor at hydraulically most remote circuit</li>
              <li>Primary flow must always exceed or equal secondary flow</li>
              <li>Stage chillers based on return water temperature or load</li>
            </ul>
            <p><strong>Variable Primary Flow (VPF)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Eliminates secondary pumps entirely - single set of variable speed pumps</li>
              <li>Water flows directly from chillers to loads and back</li>
              <li>Requires chillers rated for variable flow operation (minimum 30-50%)</li>
              <li>Bypass valve maintains minimum flow when load is very low</li>
              <li>25-35% pump energy savings compared to primary-secondary</li>
              <li>More sophisticated controls required for chiller staging</li>
            </ul>
            <p><strong>System Comparison</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Capital cost:</strong> Higher (more pumps) — Lower</li>
              <li><strong>Pump energy:</strong> Higher — 25-35% lower</li>
              <li><strong>Control complexity:</strong> Simpler — More complex</li>
              <li><strong>Chiller requirements:</strong> Any chiller — Variable flow rated</li>
              <li><strong>Plant room space:</strong> Larger — Smaller</li>
            </ul>
            <p><strong>Design consideration:</strong> Low delta T syndrome reduces system capacity regardless of pumping arrangement. Ensure control valves are correctly sized (50-70% open at design), coils are clean and properly selected, and system is correctly balanced.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Pipe Sizing and System Hydraulics">
            <p>Correct pipe sizing balances capital cost against pump energy consumption. Undersized pipes increase pressure drop and pump energy; oversized pipes waste material and increase capital cost. CIBSE Guide C provides comprehensive guidance for pipe sizing in building services.</p>
            <p><strong>Pipe Sizing Criteria</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Pressure drop:</strong> 150-300 Pa/m for preliminary sizing</li>
              <li><strong>Maximum velocity:</strong> 3.0 m/s in mains, 1.5 m/s near occupied spaces</li>
              <li><strong>Minimum velocity:</strong> 0.5 m/s to avoid air accumulation</li>
              <li><strong>Noise:</strong> Reduce velocity to 1.0-1.5 m/s for risers and branches</li>
            </ul>
            <p><strong>Flow Rate Calculation</strong></p>
            <p>Q = Cooling Load / (4.2 x ΔT x 1000)</p>
            <p>Where Q is flow rate in l/s, cooling load in kW, ΔT in K (typically 6K)</p>
            <p>Example: 500kW cooling load</p>
            <p>Q = 500 / (4.2 x 6 x 1000) = 500 / 25,200 = 0.0198 m³/s</p>
            <p>Q = 19.8 l/s or 71.4 m³/h</p>
            <p><strong>Recommended Pipe Sizes (Steel)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>DN50:</strong> 2.0 l/s — 1.0 m/s — 50</li>
              <li><strong>DN80:</strong> 5.5 l/s — 1.2 m/s — 140</li>
              <li><strong>DN100:</strong> 10 l/s — 1.4 m/s — 250</li>
              <li><strong>DN150:</strong> 25 l/s — 1.6 m/s — 630</li>
              <li><strong>DN200:</strong> 50 l/s — 1.8 m/s — 1260</li>
            </ul>
            <p><strong>System Hydraulics</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Index circuit:</strong> The circuit with highest pressure drop - determines pump head</li>
              <li><strong>Balancing:</strong> Adjust regulating valves to achieve design flow in all circuits</li>
              <li><strong>Fittings allowance:</strong> Add 30-50% to straight pipe losses for fittings</li>
              <li><strong>Control valve authority:</strong> Valve ΔP should be &gt;50% of circuit ΔP</li>
              <li><strong>PICV:</strong> Pressure independent control valves combine balancing and control</li>
            </ul>
            <p><strong>Free Cooling Integration</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Waterside free cooling uses plate heat exchanger between condenser and chilled water</li>
              <li>Available when wet bulb temperature drops below approximately 10°C</li>
              <li>Full free cooling (chillers off) possible when wet bulb &lt;5°C</li>
              <li>Partial free cooling pre-cools return water, reducing chiller load</li>
              <li>Can reduce annual chiller energy by 30-50% in UK climates</li>
              <li>Requires controls to switch between modes and manage transitions</li>
            </ul>
            <p><strong>Commissioning note:</strong> All chilled water systems must be flushed, cleaned and chemically treated before commissioning. System balancing should achieve design flow rates ±10%. Document all commissioning results for O&amp;M manual.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Chiller Selection</strong>
            </p>
            <p><strong>Question:</strong> A building has a design cooling load of 800kW. Compare the annual energy consumption of air-cooled (COP 3.0) vs water-cooled (COP 6.0) chillers operating 2500 equivalent full load hours.</p>
            <p>Air-cooled annual energy:</p>
            <p>E = Load / COP x Hours = 800 / 3.0 x 2500 = 666,667 kWh</p>
            <p>Water-cooled annual energy:</p>
            <p>E = 800 / 6.0 x 2500 = 333,333 kWh</p>
            <p>Annual saving = 333,334 kWh</p>
            <p>At £0.15/kWh = <strong>£50,000 annual saving</strong></p>
            <p>
              <strong>Example 2: Chilled Water Flow Rate</strong>
            </p>
            <p><strong>Question:</strong> Calculate the chilled water flow rate for a 350kW AHU coil with 6/12°C chilled water.</p>
            <p>Q = Cooling Load / (cp x ΔT x ρ)</p>
            <p>Q = 350 / (4.2 x 6 x 1000)</p>
            <p>Q = 350 / 25,200 = <strong>0.0139 m³/s = 13.9 l/s</strong></p>
            <p>Or: Q = 50 m³/h</p>
            <p>→ Select DN80 pipe (capacity ~14 l/s at 200 Pa/m)</p>
            <p>
              <strong>Example 3: Pump Head Calculation</strong>
            </p>
            <p><strong>Question:</strong> The index circuit has 150m equivalent pipe length at 250 Pa/m, plus chiller (45 kPa), AHU coil (25 kPa) and control valve (15 kPa). Calculate pump head.</p>
            <p>Pipe losses = 150m x 250 Pa/m = 37,500 Pa = 37.5 kPa</p>
            <p>Equipment losses = 45 + 25 + 15 = 85 kPa</p>
            <p>Total = 37.5 + 85 = 122.5 kPa</p>
            <p>Head in metres = 122.5 / 9.81 = <strong>12.5 m</strong></p>
            <p>→ Select pump for 13.9 l/s at 12.5 m head + margin</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Essential Formulas:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Flow rate:</strong> Q = kW / (4.2 x ΔT x 1000) in m³/s</li>
              <li><strong>COP:</strong> Cooling output / Electrical input</li>
              <li><strong>Pump power:</strong> P = Q x ΔP / η (flow x pressure / efficiency)</li>
              <li><strong>Cooling tower range:</strong> Entering - Leaving water temp</li>
              <li><strong>Cooling tower approach:</strong> Leaving water - Wet bulb temp</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Chilled water: <strong>6/12°C</strong> (6K delta T)</li>
              <li>Condenser water: <strong>27/32°C</strong> typical design</li>
              <li>Max pipe velocity: <strong>3.0 m/s</strong> mains, <strong>1.5 m/s</strong>  branches</li>
              <li>Pressure drop target: <strong>150-300 Pa/m</strong></li>
              <li>Minimum chiller flow: <strong>30-50%</strong> of design</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Ignoring glycol:</strong> If used, recalculate flow rates (lower specific heat)</li>
                <li><strong>Oversizing control valves:</strong> Results in hunting and poor control</li>
                <li><strong>Neglecting minimum flow:</strong> Chillers can freeze if flow too low</li>
                <li><strong>Wrong DP sensor location:</strong> Must be at index circuit, not plantroom</li>
                <li><strong>Ignoring water treatment:</strong> Leads to corrosion, fouling and Legionella risk</li>
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
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section3-2")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                DX systems
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section3-4")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Terminal units
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule8Section3_3;
