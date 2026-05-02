/**
 * Module 3 · Section 4 · Subsection 6 — Earthing and Protective Devices in Distribution
 * HNC Electrical Engineering for Building Services (Pearson U4019)
 *   TN-S, TN-C-S (PME), TT earthing systems, fault loop impedance, automatic
 *   disconnection of supply, RCDs / MCBs / MCCBs and discrimination. The safety-of-life
 *   framework BS 7671 demands on every BSE distribution design.
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

const TITLE = 'Earthing and Protective Devices in Distribution - HNC Module 3 Section 4.6';
const DESCRIPTION =
  'Master earthing systems (TN-S, TN-C-S, TT), protective multiple earthing, earth fault loop impedance, protective device coordination, RCDs, MCCBs, and discrimination in three-phase distribution networks.';

const quickCheckQuestions = [
  {
    id: 'earthing-system',
    question: 'In a TN-C-S (PME) system, what is the combined conductor called?',
    options: [
      'Protective conductor (PE)',
      'Neutral conductor (N)',
      'PEN conductor',
      'Earth electrode',
    ],
    correctIndex: 2,
    explanation:
      'In TN-C-S systems, the neutral and protective functions are combined in a single PEN (Protective Earth and Neutral) conductor in the supply network, which separates into PE and N at the origin of the installation.',
  },
  {
    id: 'zs-calculation',
    question:
      'What must Zs be for a 32A Type B MCB to disconnect within 0.4s (given Zs max = 1.37 ohms)?',
    options: [
      'Less than 0.4 ohms',
      'Less than 1.37 ohms',
      'Exactly 1.37 ohms',
      'Greater than 1.37 ohms',
    ],
    correctIndex: 1,
    explanation:
      'For automatic disconnection, the measured Zs must be less than or equal to the maximum permitted value from BS 7671 tables. For a 32A Type B MCB, the maximum Zs is 1.37 ohms at 0.4s disconnection time.',
  },
  {
    id: 'rcd-three-phase',
    question:
      'What type of RCD is required for three-phase circuits supplying variable speed drives?',
    options: ['Type AC', 'Type A', 'Type B', 'Type F'],
    correctIndex: 2,
    explanation:
      'Type B RCDs are required for circuits supplying equipment that may produce smooth DC residual currents, such as variable speed drives (VSDs) and inverters. Type AC and A cannot detect DC fault currents.',
  },
  {
    id: 'discrimination',
    question:
      'What is the minimum discrimination ratio typically required between upstream and downstream MCBs?',
    options: ['1.5:1', '2:1', '3:1', '5:1'],
    correctIndex: 1,
    explanation:
      "A minimum ratio of 2:1 between the upstream device rating and the downstream device rating is typically required for current discrimination. However, manufacturers' selectivity tables should always be consulted for confirmed discrimination.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which earthing system uses a separate earth conductor from the supply transformer to the installation?',
    options: ['TT system', 'TN-S system', 'TN-C-S system', 'IT system'],
    correctAnswer: 1,
    explanation:
      "TN-S (Terra-Neutral-Separate) uses a separate protective earth conductor (typically the cable sheath or a fifth core) all the way from the supply transformer to the installation's main earthing terminal.",
  },
  {
    id: 2,
    question:
      'What is the typical maximum external earth fault loop impedance (Ze) for a TN-C-S supply?',
    options: ['0.2 ohms', '0.35 ohms', '0.8 ohms', '21 ohms'],
    correctAnswer: 1,
    explanation:
      'TN-C-S (PME) supplies typically have Ze values around 0.35 ohms. TN-S supplies are typically 0.8 ohms, while TT systems can be 21 ohms or higher.',
  },
  {
    id: 3,
    question: 'What is the purpose of the main earthing terminal (MET)?',
    options: [
      'To connect the supply neutral only',
      'To provide a common connection point for all protective conductors',
      'To measure insulation resistance',
      'To connect lighting circuits only',
    ],
    correctAnswer: 1,
    explanation:
      'The MET provides a common connection point for the earthing conductor, circuit protective conductors (CPCs), main protective bonding conductors, and any functional earthing conductors, ensuring equipotential bonding throughout the installation.',
  },
  {
    id: 4,
    question:
      'For a circuit protected by a 63A Type B MCB, if Ze = 0.35 ohms and (R1+R2) = 0.25 ohms, is automatic disconnection achieved?',
    options: [
      'Yes - Zs = 0.6 ohms which is less than maximum 0.69 ohms',
      'No - Zs is too high',
      'Cannot be determined without RCD',
      'Only if additional bonding is installed',
    ],
    correctAnswer: 0,
    explanation:
      'Zs = Ze + (R1+R2) = 0.35 + 0.25 = 0.6 ohms. The maximum Zs for a 63A Type B MCB at 0.4s is 0.69 ohms (BS 7671:2018+A4:2026 Table 41.3). Since 0.6 < 0.69 ohms, automatic disconnection is achieved.',
  },
  {
    id: 5,
    question: 'What is the main advantage of MCCBs over MCBs in distribution systems?',
    options: [
      'MCCBs are cheaper',
      'MCCBs have adjustable trip settings and higher fault ratings',
      'MCCBs are smaller in size',
      'MCCBs do not require maintenance',
    ],
    correctAnswer: 1,
    explanation:
      'MCCBs offer adjustable thermal and magnetic trip settings, higher current ratings (up to 3200A), and higher fault current ratings (up to 150kA). This makes them suitable for main distribution boards where discrimination and flexibility are required.',
  },
  {
    id: 6,
    question: 'What is PME open PEN conductor risk and why is it significant?',
    options: [
      'Risk of overcurrent in the neutral',
      'Risk of the earth becoming live if the PEN conductor breaks',
      'Risk of voltage drop in long circuits',
      'Risk of harmonic distortion',
    ],
    correctAnswer: 1,
    explanation:
      'If the PEN conductor breaks in a PME system, the installation earth can rise to a dangerous potential relative to true earth. This is why PME has restrictions for certain installations (swimming pools, petrol stations) and requires adequate main bonding.',
  },
  {
    id: 7,
    question: 'What determines the minimum size of the main protective bonding conductor?',
    options: [
      'The size of the lighting circuit conductors',
      'The size of the main supply neutral conductor',
      'Half the size of the earthing conductor with a minimum of 6mm squared',
      'The same size as the largest circuit conductor',
    ],
    correctAnswer: 2,
    explanation:
      'Per BS 7671 Table 54.8, main protective bonding conductors must be at least half the cross-sectional area of the earthing conductor, with minimum sizes of 6mm squared (Cu) for supplies up to 35mm squared.',
  },
  {
    id: 8,
    question:
      'Why might time-delayed RCDs (Type S) be used at the origin of a three-phase installation?',
    options: [
      'They are cheaper than standard RCDs',
      'They provide discrimination with downstream instantaneous RCDs',
      'They have higher current ratings',
      'They are required by BS 7671 for all installations',
    ],
    correctAnswer: 1,
    explanation:
      'Type S (selective/time-delayed) RCDs have a built-in time delay (typically 40-500ms) allowing downstream instantaneous RCDs to trip first for faults in their circuits, maintaining supply to unaffected circuits.',
  },
  {
    id: 9,
    question: 'What is the fault current at a point where Zs = 0.5 ohms on a 230V supply?',
    options: ['115A', '230A', '460A', '575A'],
    correctAnswer: 2,
    explanation:
      'Fault current If = Uo/Zs = 230/0.5 = 460A. This calculation is essential for verifying that protective devices will operate within required disconnection times.',
  },
  {
    id: 10,
    question: 'What type of earthing system requires an earth electrode at the installation?',
    options: ['TN-S', 'TN-C-S', 'TT', 'All earthing systems'],
    correctAnswer: 2,
    explanation:
      'TT systems use an earth electrode at the installation as the means of earthing, independent of any supply earth. This is common in rural areas where the DNO does not provide an earth terminal. RCD protection is essential due to higher Zs values.',
  },
];

const faqs = [
  {
    question: 'What is the difference between earthing and bonding?',
    answer:
      'Earthing connects the installation to the general mass of earth via the earthing conductor and MET, providing a path for fault currents. Bonding connects extraneous-conductive-parts (gas pipes, water pipes, structural steelwork) to the MET, ensuring they cannot rise to a dangerous potential relative to the electrical installation - this is called equipotential bonding.',
  },
  {
    question: 'Why are TT systems less common in urban areas?',
    answer:
      'DNOs in urban areas typically provide TN-S or TN-C-S supplies because the existing cable network infrastructure includes earth conductors. TT systems require local earth electrodes and have higher Zs values, making RCD protection essential. They are more common in rural areas where PME risks (open PEN) are higher due to longer overhead line runs.',
  },
  {
    question: 'How do I achieve discrimination between RCDs?',
    answer:
      "Use a Type S (time-delayed) RCD upstream and instantaneous RCDs downstream. The upstream RCD must have at least twice the rated residual current (e.g., 100mA upstream, 30mA downstream) and sufficient time delay (40ms minimum). Manufacturers' selectivity charts should be consulted for guaranteed discrimination.",
  },
  {
    question: 'When should I use an MCCB instead of an MCB?',
    answer:
      'Use MCCBs when: current ratings exceed 125A; higher fault levels require ratings above 10kA; adjustable trip settings are needed for discrimination; the application requires withdrawable units for maintenance; or when specified by the electrical design for main distribution boards and sub-main protection.',
  },
  {
    question: 'What is the 80% rule for measured Zs values?',
    answer:
      'BS 7671 Guidance Note 3 recommends that measured Zs values should not exceed 80% of the maximum tabulated values to account for conductor temperature rise during fault conditions. Cables heat up during faults, increasing resistance, so testing at ambient temperature gives lower readings than actual fault conditions.',
  },
  {
    question: 'Why is main bonding so important in PME installations?',
    answer:
      'In PME (TN-C-S) systems, if the PEN conductor becomes open circuit, the installation earth can rise to supply voltage via connected loads. Main bonding ensures all extraneous-conductive-parts are at the same potential, reducing touch voltage risk. This is why PME installations require robust main bonding and may have restrictions for certain applications.',
  },
];

const HNCModule3Section4_6 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 3 · Section 4 · Subsection 6"
            title="Earthing and Protective Devices in Distribution"
            description="Safety systems, protection coordination and automatic disconnection in three-phase distribution networks"
            tone="purple"
          />

          <TLDR
            points={[
              'You identify the DNO earthing system at every cut-out — TN-S, TN-C-S/PME or TT determines bonding, RCD strategy and ADS calculation downstream.',
              'You verify Zs &times; Ia &le; U&#x2080; for every protective device — automatic disconnection of supply (ADS) under BS 7671 411 is the bedrock of fault protection.',
              'You apply BS 7671 A4:2026 PNB / TN-C-S enhancements — every new circuit normally protected by an RCD (30 mA on socket-outlets up to 32 A, all final circuits in domestic).',
              'You design discrimination (selectivity) up the protective tree — downstream MCB trips on the faulted final circuit before the upstream MCCB clears the whole submain.',
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 411.4.1 (TN systems — earthing of installation)"
            clause="In a TN system, the integrity of the earthing of the installation depends on the reliable and effective connection of the PEN or PE conductors to Earth. Where the earthing is provided from a public or other supply system, compliance with the necessary conditions external to the installation is the responsibility of the distributor."
            meaning={
              <>
                BS 7671 411.4.1 makes the integrity of the DNO-supplied earth a precondition
                for safe TN operation. As BSE designer you must ascertain (and record in
                the certificate) which earthing system is provided, measure Ze at the
                origin, and design every downstream circuit so that the calculated
                Zs &times; Ia &le; U&#x2080; / 0.8 (for TN under Reg 411.4.5) within the
                disconnection times of Table 41.1.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Reg 411.4.1, Table 41.1; ENA Engineering Recommendation G12/4 (PME); IET Guidance Note 5"
          />

          <LearningOutcomes
            outcomes={[
              'Explain TN-S, TN-C-S and TT earthing system characteristics',
              'Calculate earth fault loop impedance (Zs) and verify disconnection times',
              'Understand PME risks and bonding requirements',
              'Select appropriate protective devices (MCB, MCCB, RCD) for three-phase circuits',
              'Apply discrimination principles for coordinated protection',
              'Design main earthing terminals and protective conductor systems',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="In 30 seconds"
            plainEnglish="Earthing systems define the fault path; protective devices must coordinate so the nearest device clears the fault first."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>TN-S:</strong> Separate earth from transformer - most reliable
              </li>
              <li>
                <strong>TN-C-S (PME):</strong> Combined PEN conductor - most common
              </li>
              <li>
                <strong>TT:</strong> Local earth electrode - requires RCD protection
              </li>
              <li>
                <strong>Zs = Ze + (R1+R2):</strong> Earth fault loop impedance
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Building Services Context</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>MCCBs:</strong> Main switchgear, adjustable protection
              </li>
              <li>
                <strong>Discrimination:</strong> Upstream trips only for downstream faults
              </li>
              <li>
                <strong>Type B RCDs:</strong> Required for VSD/inverter circuits
              </li>
              <li>
                <strong>MET:</strong> Central connection for all protective conductors
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Earthing Systems — TN-S, TN-C-S and TT">
            <p>
              The earthing system defines how an electrical installation is connected to earth and
              determines the fault current path characteristics. Understanding these systems is
              fundamental to protection coordination and safety in three-phase distribution.
            </p>
            <p className="text-sm font-medium text-white">Earthing System Notation</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>First letter:</strong> Supply earthing - T (direct earth connection), I
                (isolated/impedance)
              </li>
              <li>
                <strong>Second letter:</strong> Installation earthing - T (local earth), N
                (connected to supply earth)
              </li>
              <li>
                <strong>Third letter:</strong> Neutral/earth arrangement - S (separate), C
                (combined)
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">UK Earthing Systems Comparison</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>TN-S:</strong> Separate earth conductor from transformer — typical Ze 0.8
                ohms — older urban supplies, cable sheath earth
              </li>
              <li>
                <strong>TN-C-S:</strong> Combined PEN in supply, separate at origin — typical Ze
                0.35 ohms — most common UK supply (PME)
              </li>
              <li>
                <strong>TT:</strong> Local earth electrode, no supply earth — typical Ze 21+ ohms
                — rural areas, caravan parks, petrol stations
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">TN-S System</p>
            <p>
              The most reliable earthing arrangement with a dedicated protective earth conductor
              (typically the cable sheath or armour) running from the supply transformer to the
              installation.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Low impedance fault path - high fault currents for rapid disconnection</li>
              <li>No open PEN risk - earth and neutral are always separate</li>
              <li>Common in areas with lead-sheathed or SWA supply cables</li>
              <li>Typical Ze: 0.8 ohms maximum</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">TN-C-S System (PME)</p>
            <p>
              Protective Multiple Earthing is the most common UK system. The supply uses a combined
              PEN conductor which separates into PE and N at the consumer's main earthing terminal.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Very low Ze (typically 0.35 ohms) - excellent fault clearance</li>
              <li>Multiple earth electrodes along the supply network</li>
              <li>
                <strong>Open PEN risk:</strong> If PEN breaks, installation earth rises to supply
                voltage
              </li>
              <li>Requires robust main bonding to mitigate open PEN hazard</li>
              <li>
                Restrictions apply: Not permitted for petrol stations, swimming pools (special
                measures)
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">TT System</p>
            <p>
              The installation uses a local earth electrode with no connection to the supply earth.
              Common where PME is not available or not permitted.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>High Ze (21+ ohms) - depends on soil resistivity and electrode type</li>
              <li>
                <strong>RCD protection essential:</strong> MCBs alone cannot provide disconnection
                within required times
              </li>
              <li>30mA RCDs required for socket outlets and portable equipment</li>
              <li>
                Earth electrode resistance (Ra) must be verified: Ra x I delta n less than or equal
                to 50V
              </li>
              <li>
                Used in rural areas, temporary installations, and where PME restrictions apply
              </li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> The earthing system determines the fault current
              magnitude and hence the protective device characteristics required for automatic
              disconnection within safe time limits.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Protective Multiple Earthing (PME)">
            <p>
              PME provides an excellent low-impedance earth but carries the risk of the installation
              earth becoming live if the PEN conductor fails. Understanding this risk and the
              protective measures is essential for safe installation design.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Open PEN Conductor Hazard</p>
            <p>
              If the PEN conductor breaks between the transformer and the installation, any current
              flowing to the neutral will raise the installation earth potential. With typical
              domestic loads, this can result in a touch voltage of up to 230V on all earthed
              metalwork within the installation.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">PME Protective Measures</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Main protective bonding:</strong> All extraneous-conductive-parts bonded to
                MET
              </li>
              <li>
                <strong>Equipotential zone:</strong> All metalwork at same potential reduces touch
                voltage
              </li>
              <li>
                <strong>Minimum bonding sizes:</strong> 10mm squared Cu minimum for gas, water, oil
                services
              </li>
              <li>
                <strong>Structural steelwork:</strong> Must be bonded where accessible
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Main Protective Bonding Conductor Sizes
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Supply neutral up to 35mm²:</strong> 10mm² Cu — domestic, small commercial
              </li>
              <li>
                <strong>Over 35 to 50mm²:</strong> 16mm² Cu — commercial premises
              </li>
              <li>
                <strong>Over 50 to 95mm²:</strong> 25mm² Cu — industrial, large commercial
              </li>
              <li>
                <strong>Over 95 to 150mm²:</strong> 35mm² Cu — large installations
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">PME Restrictions (BS 7671)</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Swimming pools:</strong> PME earth not permitted within zones
              </li>
              <li>
                <strong>Petrol filling stations:</strong> TT system required for forecourt
              </li>
              <li>
                <strong>Caravans/boats:</strong> PME earth to unit not permitted
              </li>
              <li>
                <strong>Construction sites:</strong> Special arrangements required
              </li>
              <li>
                <strong>Agricultural:</strong> Additional requirements for livestock protection
              </li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Design principle:</strong> In PME installations, ensure comprehensive main
              bonding to create an equipotential zone that protects against the open PEN hazard.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Earth Fault Loop Impedance (Zs)">
            <p>
              Earth fault loop impedance determines the magnitude of fault current and hence the
              disconnection time of protective devices. Calculating and verifying Zs is fundamental
              to ensuring safety in any installation.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">The Earth Fault Loop</p>
            <p>Zs = Ze + (R1 + R2)</p>
            <p>Where Ze = external impedance, R1 = line conductor, R2 = CPC.</p>
            <p className="text-sm font-medium text-elec-yellow/80">Zs Components</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Ze:</strong> External earth fault loop impedance (DNO responsibility)
              </li>
              <li>
                <strong>R1:</strong> Line conductor resistance (origin to fault)
              </li>
              <li>
                <strong>R2:</strong> CPC resistance (fault point back to MET)
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Fault Current Calculation</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>If = Uo / Zs</strong>
              </li>
              <li>Uo = nominal voltage to earth (230V)</li>
              <li>Lower Zs = higher fault current = faster disconnection</li>
            </ul>
            {/* Zs values from canonical source: src/lib/calculators/bs7671-data/protectiveDevices.ts (BS 7671:2018+A4:2026 Table 41.3) */}
            <p className="text-sm font-medium text-elec-yellow/80">
              Maximum Zs Values (Type B MCB, 0.4s Disconnection — A4:2026)
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>6A:</strong> Max Zs 7.28Ω — 80% design 5.82Ω — lighting circuits
              </li>
              <li>
                <strong>16A:</strong> Max Zs 2.73Ω — 80% design 2.18Ω — radial power circuits
              </li>
              <li>
                <strong>32A:</strong> Max Zs 1.37Ω — 80% design 1.10Ω — ring finals, showers
              </li>
              <li>
                <strong>63A:</strong> Max Zs 0.69Ω — 80% design 0.55Ω — sub-mains, large loads
              </li>
              <li>
                <strong>100A:</strong> Max Zs 0.44Ω — 80% design 0.35Ω — distribution boards
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">The 80% Rule</p>
            <p>
              BS 7671 Guidance Note 3 recommends limiting design Zs to 80% of tabulated maximum
              values. This accounts for increased conductor resistance at operating temperature
              (cables heat up during fault conditions) and measurement tolerances.
            </p>
            <p className="text-sm text-elec-yellow/70">
              <strong>Verification:</strong> Measured Zs multiplied by 1.2 (temperature correction)
              must not exceed the tabulated maximum for the protective device rating and type.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Protective Device Coordination">
            <p>
              In three-phase distribution systems, multiple levels of protection must be coordinated
              to ensure faults are cleared by the nearest upstream device, maintaining supply to
              unaffected circuits. This is known as discrimination or selectivity.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Protection Hierarchy</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Level 1:</strong> Main incomer (MCCB/ACB) - highest rating, longest delay
              </li>
              <li>
                <strong>Level 2:</strong> Sub-main protection - intermediate rating and timing
              </li>
              <li>
                <strong>Level 3:</strong> Distribution board main switch/MCCB
              </li>
              <li>
                <strong>Level 4:</strong> Final circuit MCBs/RCBOs - lowest rating, instantaneous
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Discrimination Methods</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Current:</strong> Upstream device rated higher than downstream — minimum
                2:1 ratio (check selectivity tables)
              </li>
              <li>
                <strong>Time:</strong> Upstream device has longer time delay — MCCBs with adjustable
                trip times
              </li>
              <li>
                <strong>Energy (I²t):</strong> Upstream device has higher let-through energy —
                current-limiting devices (fuses, MCBs)
              </li>
              <li>
                <strong>Zone selective:</strong> Communication between devices to identify fault
                zone — advanced electronic trip units
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Back-up Protection</p>
            <p>
              Where full discrimination cannot be achieved (common with high fault levels), back-up
              protection ensures the upstream device provides protection if the downstream device
              fails or has insufficient breaking capacity. The let-through energy (I squared t) of
              the upstream device must not exceed the withstand capability of downstream equipment.
            </p>
            <p className="text-sm text-elec-yellow/70">
              <strong>Design approach:</strong> Always consult manufacturer selectivity tables.
              Theoretical calculations provide guidance, but confirmed discrimination requires
              manufacturer verification.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="RCDs in Three-Phase Systems">
            <p>
              Residual Current Devices provide additional protection against electric shock and
              fire. In three-phase systems, RCD selection must account for load types, particularly
              equipment generating non-sinusoidal fault currents.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">
              RCD Types for Three-Phase Applications
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Type AC:</strong> Sinusoidal AC residual current — resistive loads only
                (limited use)
              </li>
              <li>
                <strong>Type A:</strong> AC and pulsating DC — single-phase rectified loads
              </li>
              <li>
                <strong>Type F:</strong> AC, pulsating DC, composite waveforms — single-phase VSDs,
                inverters
              </li>
              <li>
                <strong>Type B:</strong> AC, pulsating DC, smooth DC — three-phase VSDs, EV
                chargers, PV inverters
              </li>
              <li>
                <strong>Type S:</strong> Time-delayed (40-500ms) — upstream discrimination with
                Type A/B
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Critical: VSD and Inverter Circuits</p>
            <p>
              Three-phase variable speed drives (VSDs) and inverters can produce smooth DC fault
              currents that Type AC and Type A RCDs cannot detect.{' '}
              <strong>Type B RCDs are mandatory</strong> for circuits supplying three-phase VSDs,
              battery storage inverters, and DC EV charging equipment.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">RCD Ratings for Three-Phase</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>30mA:</strong> Additional protection for socket outlets
              </li>
              <li>
                <strong>100mA:</strong> Fire protection, distribution boards
              </li>
              <li>
                <strong>300mA:</strong> Fire protection for distribution circuits
              </li>
              <li>
                <strong>500mA:</strong> Large motor circuits (where permitted)
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">RCD Discrimination</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Upstream: Type S, 100mA, time-delayed</li>
              <li>Downstream: Type A/B, 30mA, instantaneous</li>
              <li>Minimum 2:1 rating ratio</li>
              <li>Check manufacturer selectivity data</li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> In TT systems, RCD protection is essential due to high Ze
              values. For TN systems, RCDs provide additional protection beyond automatic
              disconnection by overcurrent devices.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="MCCB vs MCB Selection">
            <p>
              Selecting between Moulded Case Circuit Breakers (MCCBs) and Miniature Circuit Breakers
              (MCBs) depends on current rating, fault level, adjustability requirements, and
              position in the distribution hierarchy.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">MCB vs MCCB Comparison</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Current rating:</strong> MCB up to 125A — MCCB up to 3200A
              </li>
              <li>
                <strong>Breaking capacity:</strong> MCB up to 25kA (typically 6-10kA) — MCCB up to
                150kA
              </li>
              <li>
                <strong>Trip adjustment:</strong> MCB fixed (Type B, C, D) — MCCB adjustable
                thermal and magnetic
              </li>
              <li>
                <strong>Physical size:</strong> MCB DIN rail modules — MCCB larger, dedicated
                mounting
              </li>
              <li>
                <strong>Cost:</strong> MCB lower — MCCB higher
              </li>
              <li>
                <strong>Typical application:</strong> MCB final circuits — MCCB main/sub-main
                distribution
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">MCCB Trip Unit Settings</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Ir (thermal):</strong> Adjustable long-time pickup (typically 0.4-1.0 x In)
              </li>
              <li>
                <strong>tr (thermal time):</strong> Adjustable long-time delay
              </li>
              <li>
                <strong>Im (magnetic):</strong> Adjustable instantaneous pickup (typically 2-10 x
                Ir)
              </li>
              <li>
                <strong>Electronic units:</strong> May include short-time delay and earth fault
                settings
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">When to Use MCCBs</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Main incomer protection</li>
              <li>Sub-main distribution</li>
              <li>Currents exceeding 125A</li>
              <li>High fault levels (&gt;10kA)</li>
              <li>Where discrimination requires adjustable settings</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">When to Use MCBs</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Final circuit protection</li>
              <li>Currents up to 125A</li>
              <li>Where fault levels permit (check Icn)</li>
              <li>Standard Type B/C/D characteristics adequate</li>
              <li>Space-constrained distribution boards</li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Fault level check:</strong> Always verify the prospective fault current (Ipf)
              at the point of installation. The protective device breaking capacity (Icn/Icu) must
              exceed Ipf.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Discrimination and Selectivity">
            <p>
              Proper discrimination ensures that only the protective device nearest the fault
              operates, maintaining supply to healthy circuits. This is essential for continuity of
              service in commercial and industrial installations.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Discrimination Verification</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Time-current curves:</strong> Plot device characteristics to verify no
                overlap
              </li>
              <li>
                <strong>Selectivity tables:</strong> Manufacturer data for confirmed discrimination
              </li>
              <li>
                <strong>Let-through energy:</strong> Upstream I squared t must exceed downstream
                clearing time
              </li>
              <li>
                <strong>Software tools:</strong> Manufacturer selection software for complex
                systems
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Typical Discrimination Hierarchy
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Main incomer: 400A MCCB (adjustable trip)</li>
              <li>Sub-main: 160A MCCB (adjustable trip)</li>
              <li>Distribution board: 100A MCCB or switch-disconnector</li>
              <li>Final circuits: 32A Type B MCB</li>
              <li>Ratio check: 400:160:100:32 = 2.5:1.6:3.1 (discrimination likely)</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Factors Affecting Discrimination
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>High fault currents:</strong> Both devices may trip simultaneously — use
                MCCBs with adjustable magnetic trip
              </li>
              <li>
                <strong>Similar device types:</strong> Similar characteristics reduce selectivity —
                increase rating ratio or use different types
              </li>
              <li>
                <strong>Cable impedance:</strong> Reduces fault current at remote points — may
                improve discrimination for remote faults
              </li>
              <li>
                <strong>Motor starting:</strong> High inrush may cause nuisance tripping — Type C/D
                MCBs, time-delayed MCCBs
              </li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Total selectivity:</strong> Discrimination maintained up to the maximum fault
              current that can occur. <strong>Partial selectivity:</strong> Discrimination only up
              to a stated fault level.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Building Services: MET and Protective Conductors">
            <p>
              The main earthing terminal and protective conductor system forms the foundation of
              electrical safety in any building. Proper design and installation ensures fault
              currents can flow safely and all exposed-conductive-parts remain at earth potential.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">
              Main Earthing Terminal (MET) Connections
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Earthing conductor:</strong> From DNO earth terminal or earth electrode
              </li>
              <li>
                <strong>Main protective bonding:</strong> Gas, water, oil, structural steel
              </li>
              <li>
                <strong>Circuit protective conductors:</strong> From all distribution boards
              </li>
              <li>
                <strong>Functional earth:</strong> For IT equipment, lightning protection (if
                required)
              </li>
              <li>
                <strong>Supplementary bonding:</strong> Where required by specific locations
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Earthing Conductor Sizing (Table 54.7)
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Line up to 16mm²:</strong> Min earthing conductor 16mm² Cu
              </li>
              <li>
                <strong>Line over 16 to 35mm²:</strong> Min earthing conductor 16mm² Cu
              </li>
              <li>
                <strong>Line over 35mm²:</strong> Half the line conductor size
              </li>
              <li>Note: Buried earthing conductors require additional protection or larger sizes</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Circuit Protective Conductors (CPCs)
            </p>
            <p>
              CPCs provide the fault return path for each circuit. They may be separate conductors,
              cable armouring, metallic conduit/trunking (if verified), or a combination.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Line up to 16mm²:</strong> CPC = line size (minimum 1.5mm²)
              </li>
              <li>
                <strong>Line 16-35mm²:</strong> CPC = 16mm²
              </li>
              <li>
                <strong>Line over 35mm²:</strong> CPC = half line size
              </li>
              <li>
                <strong>Adiabatic check:</strong> S = √(I²t) / k for short fault durations
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Three-Phase Distribution Board Earthing
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Earth bar:</strong> Sized for all outgoing CPCs plus spare capacity
              </li>
              <li>
                <strong>Incoming earth:</strong> From upstream MET or distribution board
              </li>
              <li>
                <strong>Continuity:</strong> All metalwork bonded to earth bar
              </li>
              <li>
                <strong>Labelling:</strong> Safety electrical connection - do not remove
              </li>
              <li>
                <strong>Accessibility:</strong> Earth connections must be accessible for inspection
              </li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Inspection requirement:</strong> Main earthing and bonding connections must be
              accessible for periodic inspection and testing throughout the life of the
              installation.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p className="text-sm font-medium text-elec-yellow/80">Example 1: Zs Verification</p>
            <p>
              <strong>Question:</strong> A 32A Type B MCB protects a radial circuit. Ze = 0.35
              ohms, circuit length 30m using 4mm²/1.5mm² cable. Verify automatic disconnection.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>From tables: 4mm² (R1) = 4.61 mΩ/m, 1.5mm² (R2) = 12.1 mΩ/m</li>
              <li>(R1+R2) = 30 × (4.61 + 12.1) / 1000 = 30 × 16.71 / 1000 = 0.50 ohms</li>
              <li>
                Zs = Ze + (R1+R2) = 0.35 + 0.50 = <strong>0.85 ohms</strong>
              </li>
              <li>Maximum Zs for 32A Type B at 0.4s = 1.37 ohms</li>
              <li>80% design value = 1.37 × 0.8 = 1.10 ohms</li>
              <li>0.85 ohms &lt; 1.10 ohms - Disconnection achieved</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Example 2: TT System RCD Selection
            </p>
            <p>
              <strong>Question:</strong> A TT installation has earth electrode resistance Ra = 150
              ohms. Determine the maximum RCD rating for 50V touch voltage limit.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Touch voltage limit: Ut = 50V (AC)</li>
              <li>Using: Ra × IΔn ≤ 50V</li>
              <li>
                IΔn ≤ 50 / Ra = 50 / 150 = <strong>0.33A = 333mA</strong>
              </li>
              <li>
                Select next lower standard rating: <strong>300mA RCD</strong>
              </li>
              <li>Note: 30mA RCD provides additional protection and wider safety margin</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Example 3: Main Bonding Conductor Size
            </p>
            <p>
              <strong>Question:</strong> A commercial building has a 100A three-phase supply with
              25mm² supply conductors. Determine the minimum main protective bonding conductor size.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Supply neutral: 25mm² copper</li>
              <li>From BS 7671 Table 54.8:</li>
              <li>
                For neutral up to 35mm², minimum bonding = <strong>10mm² Cu</strong>
              </li>
              <li>However, earthing conductor (from Table 54.7):</li>
              <li>For 25mm² line, earthing conductor = 16mm²</li>
              <li>Bonding must be at least half earthing = 16/2 = 8mm²</li>
              <li>Use 10mm² (higher of the two requirements)</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Example 4: Fault Current Calculation
            </p>
            <p>
              <strong>Question:</strong> Calculate the prospective fault current at a distribution
              board where Zs = 0.25 ohms on a 400V three-phase supply.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>For single-phase to earth fault (phase to CPC):</li>
              <li>
                If = Uo / Zs = 230 / 0.25 = <strong>920A</strong>
              </li>
              <li>For phase-to-phase fault (higher current):</li>
              <li>
                If = (400 × 0.866) / Zs = 346 / 0.25 = <strong>1384A</strong>
              </li>
              <li>For three-phase symmetrical fault:</li>
              <li>
                If = Uo / Zs = 230 / 0.25 = <strong>920A per phase</strong>
              </li>
              <li>Device breaking capacity must exceed highest prospective fault current</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <p className="text-sm font-medium text-elec-yellow/80">Essential Formulas</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Zs = Ze + (R1 + R2)</strong> - Earth fault loop impedance
              </li>
              <li>
                <strong>If = Uo / Zs</strong> - Fault current calculation
              </li>
              <li>
                <strong>Ra × IΔn ≤ 50V</strong> - TT system RCD selection
              </li>
              <li>
                <strong>S = √(I²t / k)</strong> - Adiabatic equation for conductor sizing
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Key Values to Remember</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                TN-S typical Ze: <strong>0.8 ohms</strong>
              </li>
              <li>
                TN-C-S typical Ze: <strong>0.35 ohms</strong>
              </li>
              <li>
                TT Ze: <strong>21+ ohms</strong> (varies with electrode)
              </li>
              <li>
                Touch voltage limit: <strong>50V AC</strong>
              </li>
              <li>
                Disconnection time (distribution): <strong>0.4s</strong>
              </li>
              <li>
                Disconnection time (fixed equipment): <strong>5s</strong> (where permitted)
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common earthing and protection mistakes"
            whatHappens={
              <>
                Forgetting the 80% design rule on Zs. Specifying Type A RCDs on three-phase VSDs —
                they cannot detect smooth DC fault currents. Insufficient main bonding on PME
                installations. Ignoring selectivity between upstream and downstream devices.
                Choosing protective devices whose breaking capacity is below the prospective fault
                current.
              </>
            }
            doInstead={
              <>
                Design to 80% of tabulated max Zs. Use Type B RCDs on three-phase VSDs/EV
                chargers/PV. Bond every extraneous-conductive-part to the MET. Verify
                discrimination with manufacturer selectivity tables. Always confirm Icn/Icu
                exceeds prospective Ipf at the device location.
              </>
            }
          />

          <SectionRule />

          <Scenario
            title="EV charging hub on PME — bonding and PEN-fault risk assessment"
            situation={
              <>
                A car-park EV charging installation has 12&times;22 kW AC chargers fed
                from a TN-C-S (PME) supply. The cable run from the LV switchroom to the
                outdoor charging cabinet is 75 m. As the BSE engineer you must assess
                BS 7671 722 (EV) compliance against the PME PEN-fault risk.
              </>
            }
            whatToDo={
              <>
                BS 7671 Reg 722.411.4.1 requires that on TN-C-S supplies feeding outdoor
                EV charging, you must either (a) provide an alternative earth (TT
                arrangement at the charger via a dedicated earth electrode + 30 mA RCD,
                with PEN broken at the local DB) or (b) use a charger that incorporates
                PEN open-circuit detection. Most modern OCPP chargers integrate (b),
                which is the cheaper and more reliable solution. Document the choice and
                verify with the DNO that PME extension to outdoor metalwork is compliant.
              </>
            }
            whyItMatters={
              <>
                A PEN fault on a TN-C-S supply leaves the entire bonded metalwork floating
                up to U&#x2080; — fatal if a person touches a charger and stands on
                independently-earthed ground (e.g. wet concrete). The 2026 update to
                BS 7671 made the PEN-fault risk assessment for outdoor EV charging
                explicit. The HNC engineer must engage with this on every new car-park
                installation, not delegate to the manufacturer.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'TN-S: separate N and PE conductors back to source — common on older urban supplies.',
              'TN-C-S (PME): combined PEN downstream from supply, separated at the cut-out — dominant on modern UK urban supplies.',
              'TT: independent installation earth electrode — typical of rural overhead supplies; 30 mA RCD usually mandatory.',
              'ADS condition: Zs &times; Ia &le; U&#x2080; (BS 7671 411.4.4 etc.) verified on every circuit, recorded in the schedule of test results.',
              'Disconnection times: BS 7671 Table 41.1 — 0.4 s on TN final circuits up to 63 A, 0.2 s on TT.',
              'BS 7671 A4:2026 expansion of 30 mA RCD requirement &mdash; all final circuits in domestic, socket-outlets up to 32 A in commercial.',
              'PME PEN-fault risk on outdoor metalwork (EV chargers, car-park lighting) requires Reg 722 / 717 alternative earthing or OCPD protection.',
              'Discrimination (selectivity): downstream device must clear before upstream device — verified with manufacturer trip-curve overlays.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section4-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Cable Sizing
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section4-7')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Harmonics and Power Quality
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule3Section4_6;
