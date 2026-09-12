/**
 * MOET · Module 3 · Section 3.6 · Subsection 1 — Solar PV Integration
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option. NOT ST0154 (the "MOET" the course is named after) —
 * ST0154 v1.6 is still live, but its own EPA plan records that the Electrical
 * Technician option "was retired 31/12/2025" and was replaced by ST1426
 * (single discipline) or ST1443 (dual discipline). The course keeps the MOET
 * name because that is what employers and colleges still call the role.
 *
 * KSBs covered, quoted rather than numbered — the published K/S/B
 * numbering is unverified, so never write a code here:
 *   · "Electrical. Electrical plant, equipment, and systems maintenance
 *     requirements: removing and replacing parts, inspecting, testing,
 *     setting up, adjusting, cleaning, and functional testing."
 *   · "Electrical. Electricity at Work regulations. IET wiring regulations."
 *   · "Electrical. Different types of cables; their specifications and
 *     application."
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  StudyPage,
  Bleed,
  ReadingProgress,
  TLDR,
  ConceptBlock,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  VideoCard,
} from '@/components/study-centre/learning';
import { PvCellCrossSection } from '@/components/study-centre/diagrams/renewablePv';
import { ResidentialPvSld } from '@/components/study-centre/diagrams/renewableSld';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Solar PV Integration - MOET Module 3.6.1';
const DESCRIPTION =
  'Comprehensive guide to solar photovoltaic systems for electrical maintenance technicians: PV cell technology, system architectures, inverters, grid connection, BS 7671 Section 712, G99/G98 compliance, maintenance and fault-finding under ST1426.';

/* ------------------------------------------------------------------ */
/*  Quick-check questions (4) — shown after each content section       */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    id: 'pv-cell-principle',
    question: 'What is the fundamental operating principle of a photovoltaic cell?',
    options: [
      'The thermoelectric effect — a temperature difference across the cell drives a current through the semiconductor',
      'The piezoelectric effect — pressure from sunlight on the cell surface generates a small voltage',
      'Electromagnetic induction — sunlight induces an alternating current in the cell windings',
      'The photovoltaic effect — a semiconductor generates DC when sunlight transfers energy to its electrons',
    ],
    correctIndex: 3,
    explanation:
      'A PV cell exploits the photovoltaic effect. When photons from sunlight strike the semiconductor junction (typically a p-n junction in crystalline silicon), they transfer energy to electrons, creating electron-hole pairs. The electric field at the junction separates these charge carriers, producing a DC voltage across the cell. A typical silicon cell produces approximately 0.5-0.6 V; cells are connected in series within a module to achieve useful voltages (typically 30-40 V per module).',
  },
  {
    id: 'inverter-function',
    question: 'What is the primary function of a solar inverter in a grid-connected PV system?',
    options: [
      'To convert the array DC into grid-synchronised AC and provide anti-islanding protection',
      'To step up the DC voltage from the array so that it can be stored in a battery bank',
      'To track the position of the sun and adjust the angle of the PV modules for maximum output',
      'To rectify the incoming AC grid supply into DC for charging the PV array overnight',
    ],
    correctIndex: 0,
    explanation:
      'The inverter is the critical interface between the DC PV array and the AC grid supply. It converts DC to AC using power electronics (typically IGBT or MOSFET switching), synchronises the output with the grid (matching voltage, frequency and phase), and includes anti-islanding protection that disconnects the PV system if the grid supply fails — preventing exported power from endangering DNO network operatives working on what they believe is a dead circuit.',
  },
  {
    id: 'bs7671-section712',
    question:
      'Which section of BS 7671 specifically covers the requirements for solar PV installations?',
    options: [
      'Section 705 — Agricultural and Horticultural Premises, which covers outdoor generation equipment',
      'Section 722 — Electric Vehicle Charging Installations, which covers all renewable generation',
      'Section 712 — Solar Photovoltaic (PV) Power Supply Systems, covering DC wiring, isolation and labelling',
      'Section 701 — Locations Containing a Bath or Shower, which covers all low-voltage DC systems',
    ],
    correctIndex: 2,
    explanation:
      'BS 7671 Section 712 contains the specific requirements for PV installations. Key requirements include: DC circuit protection and isolation (Regulation 712.411), PV DC isolator adjacent to the inverter (Regulation 712.537.2), fire-resistant DC wiring within buildings (Regulation 712.522), labelling at the main distribution board and meter position warning of dual supply (Regulation 712.514), and overcurrent protection for both DC and AC circuits.',
  },
  {
    id: 'anti-islanding',
    question: 'Why is anti-islanding protection mandatory for grid-connected PV systems?',
    options: [
      'To stop the PV array from drawing power from the grid when irradiance is too low to generate',
      'To protect the inverter from damage caused by voltage spikes on the grid supply',
      'To limit the amount of power the system can export so the DNO meter is not overloaded',
      'To stop the PV system energising a grid section disconnected for maintenance, protecting DNO operatives',
    ],
    correctIndex: 3,
    explanation:
      'Anti-islanding is a critical safety requirement. If the grid supply is disconnected (for maintenance, fault repair, or load management), a grid-connected PV system could continue to energise the local network section — creating a lethal hazard for DNO operatives who believe the circuit is dead. Anti-islanding protection (required by G99/G98 and built into all approved inverters) detects loss of grid supply and disconnects the PV system within 0.5 seconds.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions (12) — end-of-page assessment                       */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question: 'The two main types of crystalline silicon PV cell are:',
    options: [
      'Amorphous (flexible film, highest efficiency) and crystalline (rigid glass, lower efficiency)',
      'Monocrystalline (single crystal, ~20-22%) and polycrystalline (multiple crystals, ~15-17%)',
      'Cadmium telluride (thin-film) and copper indium gallium selenide (thin-film)',
      'Single-junction (low voltage) and multi-junction (high voltage) gallium arsenide cells',
    ],
    correctAnswer: 1,
    explanation:
      'Monocrystalline cells are cut from a single silicon crystal ingot, giving a uniform dark appearance and higher efficiency (typically 20-22% for commercial modules). Polycrystalline cells are cast from molten silicon, forming multiple crystal structures with a characteristic blue speckled appearance and slightly lower efficiency (15-17%). Monocrystalline is more expensive per watt but produces more power per square metre, making it preferred where roof space is limited.',
  },
  {
    id: 2,
    question: 'A string inverter differs from a microinverter in that:',
    options: [
      'A string inverter is fitted to each individual module, while a microinverter handles the combined output of a whole series string of modules',
      'A string inverter only works with monocrystalline modules, while a microinverter is required for any polycrystalline array',
      'A string inverter converts a whole series string, while a microinverter converts each module independently',
      'A string inverter outputs DC to the consumer unit, while a microinverter outputs high-voltage DC that is converted to AC at the distribution board',
    ],
    correctAnswer: 2,
    explanation:
      'String inverters receive the combined DC output from a series string of PV modules (typically 8-14 modules at 300-600 V DC). One inverter serves many modules. Microinverters are small inverters fitted to each individual module, converting DC to AC at the module level. Microinverters offer module-level monitoring, better performance in partial shading, and eliminate high-voltage DC cabling, but are more expensive overall and require access to each module for maintenance.',
  },
  {
    id: 3,
    question: 'Under BS 7671 Regulation 712.537.2, the PV DC isolator must be:',
    options: [
      'Mounted at the highest accessible point of the array on the roof, so that the modules can be isolated as close to the source of generation as possible',
      'Fitted with an AC-rated switch-disconnector, since the inverter output is the most hazardous part of the circuit to interrupt under load',
      'Lockable in the closed (on) position only, to prevent unauthorised persons disconnecting the supply and interrupting export to the grid',
      'Located adjacent to the inverter and operable from floor level, to isolate the DC supply before work',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 712.537.2 requires a DC isolator switch adjacent to the inverter that can disconnect the PV array from the inverter. It must be accessible to a person standing at floor level (not requiring roof access). This allows the high-voltage DC circuit to be safely isolated before any maintenance work. The DC isolator must be rated for DC duty (not an AC isolator used on DC) as DC arcs do not self-extinguish at current zero like AC arcs.',
  },
  {
    id: 4,
    question: 'The maximum power point tracker (MPPT) in a solar inverter:',
    options: [
      'Adjusts the array operating point to extract maximum power as irradiance and temperature change',
      'Holds the array at a fixed voltage to keep the inverter output frequency stable',
      'Disconnects the array when the maximum rated power of the inverter is exceeded',
      'Tracks the position of the sun to mechanically orientate the PV modules on the roof',
    ],
    correctAnswer: 0,
    explanation:
      'PV modules have a characteristic I-V curve where power output varies with operating voltage. The maximum power point (MPP) changes continuously with irradiance levels and cell temperature. The MPPT algorithm in the inverter dynamically adjusts the DC operating point to maintain the array at its MPP, maximising energy harvest. Without MPPT, the array would operate at a fixed voltage, losing 10-25% of potential energy production as conditions change throughout the day.',
  },
  {
    id: 5,
    question: 'G99 (formerly G59) applies to PV installations where:',
    options: [
      'The installation uses microinverters rather than a single string inverter, regardless of the total generation capacity',
      'The total generation exceeds 3.68 kW per phase (16 A), requiring DNO approval before connection',
      'The system includes any battery storage, irrespective of the inverter rating or the export capacity to the grid',
      'The DC string voltage exceeds 600 V, requiring the DNO to assess the additional electric shock risk before connection',
    ],
    correctAnswer: 1,
    explanation:
      "Engineering Recommendation G99 (which replaced G59 for connections on or after 27 April 2019) applies to generating equipment above the G98 threshold. G99 defines that threshold in current, not power: G98 covers a Power Generating Module with a nominal current up to and including 16 A per phase, and for Fully Type Tested equipment it is the AGGREGATE Registered Capacity that must be 16 A per phase or less. The familiar 3.68 kW figure is simply 16 A x 230 V — useful shorthand, but the amps and the word 'aggregate' are what the document actually says. It requires formal application to the DNO, technical assessment, and approval before connection. G98 (which replaced G83) covers smaller installations up to 3.68 kW per phase under a 'fit and notify' arrangement. Both standards specify protection settings, power quality limits, and anti-islanding requirements.",
  },
  {
    id: 6,
    question: 'When testing a PV system, the DC string voltage will typically be:',
    options: [
      'Below 50 V DC at all times, so the string is classed as SELV and can be worked on without isolation',
      'A fixed 230 V DC regardless of the number of modules, because the inverter regulates the string voltage to match the AC supply',
      '300-600 V DC in normal operation, a shock hazard that cannot be switched off while daylight is present',
      'Zero whenever the DC isolator at the inverter is open, because this disconnects the modules from their source of generation',
    ],
    correctAnswer: 2,
    explanation:
      "A PV string of 10-15 modules connected in series produces 300-600 V DC (or higher in commercial systems). Critically, this voltage is present whenever there is sufficient light — it cannot be 'switched off' like a mains supply. Even on overcast days, string voltages remain hazardous. Safe working practices require: DC isolation at the inverter, string disconnection at the array junction box (if accessible), and verification of dead circuit. PV-specific insulated tools and DC-rated test equipment are essential.",
  },
  {
    id: 7,
    question: 'Fire-resistant DC cabling is required within buildings for PV systems because:',
    options: [
      'DC carries a higher risk of overload than AC, so the cable insulation must be uprated to survive the continuous heating effect of the array',
      'Fire-resistant cable produces less smoke when installed near the inverter, reducing the risk of the inverter electronics being contaminated',
      'Fire-resistant cable has a lower resistance than standard cable, reducing voltage drop on the long DC runs typical of rooftop arrays',
      'Reg 712.522 requires fire-resistant cable or enclosure, as DC cables stay energised in daylight',
    ],
    correctAnswer: 3,
    explanation:
      'Unlike mains circuits that can be isolated at the origin, PV DC cables remain energised in daylight and cannot be remotely disconnected. In a building fire, firefighters face the risk of electrocution from damaged PV DC cables carrying hazardous voltages. BS 7671 Regulation 712.522 therefore requires either fire-resistant cable or fire-resistant enclosure for DC PV cables routed within buildings. This requirement does not apply to cables between modules on the roof.',
  },
  {
    id: 8,
    question: 'A common fault indication on a PV system showing lower-than-expected output is:',
    options: [
      'A bypass diode has activated from shading or cell failure, cutting that module while the string runs on',
      'The anti-islanding protection has tripped, which always reduces the array output by exactly one third while the grid remains connected',
      'The MPPT has locked the array at its open-circuit voltage, which increases the voltage but lowers the current and therefore the power',
      'The modules are operating in monocrystalline mode rather than polycrystalline mode, which temporarily reduces their rated efficiency',
    ],
    correctAnswer: 0,
    explanation:
      'PV modules contain bypass diodes that allow current to bypass shaded or failed cell strings within the module. When a bypass diode activates, that portion of the module produces no power, reducing overall string output. Causes include: partial shading (trees, chimneys, bird droppings), cell micro-cracking (from impact or thermal stress), hotspot formation, and solder joint degradation. Thermal imaging and I-V curve tracing are the primary diagnostic tools for identifying affected modules.',
  },
  {
    id: 9,
    question:
      'The MCS (Microgeneration Certification Scheme) is relevant to PV installations because:',
    options: [
      'It is the legal authority that issues the licence allowing a PV system to export power to the grid, replacing the need for any DNO notification',
      'It is the UK quality assurance scheme; only MCS-certified installs qualify for SEG export payments',
      'It is the BS 7671 section that replaced Section 712 and now governs all DC isolation and labelling requirements for PV',
      'It is the manufacturer testing body that certifies inverters for anti-islanding compliance under G98 and G99',
    ],
    correctAnswer: 1,
    explanation:
      'MCS is the UK quality assurance scheme for microgeneration technologies. For PV, MCS certification requires: use of MCS-approved products (modules and inverters), installation by an MCS-certified installer, compliance with MCS installation standard MIS 3002, and commissioning and handover documentation. MCS registration is mandatory for the installation to qualify for Smart Export Guarantee (SEG) payments from energy suppliers and is increasingly required by DNOs and building insurers.',
  },
  {
    id: 10,
    question: 'When maintaining a PV system, the maintenance technician should:',
    options: [
      'Restrict all work to night-time only, when the array produces no voltage, so that isolation procedures and DC-rated equipment are unnecessary',
      'Inspect only the AC side of the installation, since the DC array is sealed for life and cannot develop any maintainable faults',
      'Inspect the whole system — modules, frame, DC cabling, isolators, inverter data and earthing continuity',
      'Wash the modules with a high-pressure jet on every visit, as removing all soiling is the single most important maintenance task',
    ],
    correctAnswer: 2,
    explanation:
      'Comprehensive PV maintenance covers: visual inspection of modules (cracking, delamination, hotspots, snail trails, soiling); mounting frame (corrosion, loose fixings, wind damage); DC cabling (UV degradation, rodent damage, loose connections); DC and AC isolator operation; inverter display/logs for fault codes and performance data (compare actual yield with expected yield); earthing and bonding continuity; labelling condition; and vegetation management (shading). Thermal imaging during peak irradiance reveals hotspots and underperforming modules.',
  },
  {
    id: 11,
    question: 'Potential Induced Degradation (PID) in PV modules:',
    options: [
      'Is the initial 1-3% drop in output that occurs in the first few hours of sunlight exposure and then stabilises permanently',
      'Is mechanical cracking of the cells caused by people walking on the modules during installation or maintenance',
      'Is the gradual fading of the anti-reflective coating on the front glass, which reduces light transmission into the cells',
      'Is cell-to-frame voltage driving leakage currents through the encapsulant, degrading output over time',
    ],
    correctAnswer: 3,
    explanation:
      'PID occurs when the voltage potential between PV cells and the grounded module frame drives leakage currents through the glass and encapsulant material. This causes ion migration that degrades cell performance, sometimes reducing module output by 30% or more. It is more severe in high-humidity conditions, at the ends of strings where the voltage differential to earth is greatest, and in systems with transformerless inverters. PID-resistant modules and system grounding strategies can mitigate the effect.',
  },
  {
    id: 12,
    question: 'Under the Electricity at Work Regulations 1989, a PV system is classified as:',
    options: [
      'An electrical system, live whenever daylight is present, with the same duty-holder obligations as any other',
      'Exempt from the Regulations because it is a renewable, low-carbon source rather than a conventional mains supply',
      'Covered only while it is exporting to the grid; once the grid is disconnected the array falls outside the scope of the Regulations',
      'A non-electrical mechanical system, so that only the Provision and Use of Work Equipment Regulations rather than the Electricity at Work Regulations apply',
    ],
    correctAnswer: 0,
    explanation:
      'The Electricity at Work Regulations 1989 apply to all electrical systems, including PV. The PV array is a source of electrical energy that cannot be de-energised by simply operating a switch — it generates voltage whenever there is sufficient light. The duty holder must ensure: safe systems of work for maintenance (including recognition that DC circuits cannot be isolated at the source); competent persons carry out the work; suitable test equipment rated for the voltages present; and emergency procedures are in place.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQs (5)                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'Can I work on a PV system at night when the panels are not generating?',
    answer:
      'While PV panels produce negligible voltage in darkness, this is not a reliable isolation method. Residual charge may remain in DC capacitors within the inverter, and even low light levels (dawn, dusk, moonlight, street lighting) can produce hazardous voltages. Always follow proper isolation procedures: isolate the DC supply at the array isolator and the inverter DC isolator, isolate the AC supply at the consumer unit, and prove dead on both DC and AC circuits using appropriately rated test equipment. Never rely on darkness as an isolation measure.',
  },
  {
    question: 'What is the difference between G98 and G99 for PV installations?',
    answer:
      "G98 (formerly G83) covers a Power Generating Module with a nominal current up to and including 16 A per phase — about 3.68 kW single phase, 11.04 kW across three phases. The limit is on the AGGREGATE Registered Capacity, so adding battery storage to an existing PV array can push a previously G98 installation over the line even though neither item alone exceeds it. It operates on a 'fit and notify' basis — the installer completes the installation and notifies the DNO within 28 days. G99 (formerly G59) covers generation above 3.68 kW per phase and requires formal application to the DNO before installation. The DNO assesses the network impact and may impose conditions such as export limitation, protection settings, or network reinforcement. Both standards require compliant inverters with anti-islanding protection.",
  },
  {
    question: 'How often should PV systems be inspected and tested?',
    answer:
      'The IET Code of Practice for Grid Connected Solar PV Systems recommends annual visual inspection and performance monitoring review. Full electrical testing (insulation resistance, earth continuity, open-circuit voltage, short-circuit current, I-V curve tracing) should be carried out at intervals determined by the risk assessment — typically every 3-5 years for domestic installations and annually for commercial installations. Inverter performance data should be monitored continuously to detect degradation trends. BS 7671 periodic inspection requirements also apply to the AC circuits.',
  },
  {
    question: 'What are the main safety hazards when working on PV systems?',
    answer:
      'The primary hazards are: DC electric shock (300-600 V DC that cannot be switched off in daylight); arc flash (DC arcs do not self-extinguish and can cause fires); working at height (roof access for module inspection/maintenance); fire risk (from DC arc faults in damaged cables or connectors); and structural loading (module weight on roof structure). Additional hazards include: electrocution risk to firefighters from damaged DC cables; stored energy in inverter DC capacitors; and the risk of back-feeding through the inverter if anti-islanding fails.',
  },
  {
    question: 'What does the Smart Export Guarantee (SEG) mean for PV maintenance?',
    answer:
      'The SEG requires energy suppliers with over 150,000 customers to offer a tariff for exported electricity from small-scale generation (up to 5 MW). For PV system owners, this creates a financial incentive to maintain system performance. For maintenance technicians, it means: ensuring export meters are functioning correctly; monitoring system yield against expected performance; identifying and rectifying faults that reduce output; and maintaining MCS registration (required for SEG eligibility). Poor maintenance directly reduces the financial return from the PV investment.',
  },
];

const MOETModule3Section6_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 3 · Section 3.6 · Subsection 1"
        title="Solar PV Integration"
        backTo="/study-centre/apprentice/m-o-e-t-module3-section6"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Photovoltaic systems, grid connection and maintenance for electrical technicians.
          </p>

          <TLDR
            points={[
              'PV effect: Semiconductor cells convert sunlight directly to DC electricity.',
              'Inverter: Converts DC to grid-synchronised AC with anti-islanding.',
              'Hazard: DC circuits energised whenever daylight present (300-600 V DC).',
              'Standards: BS 7671 Section 712, G98/G99, MCS MIS 3002.',
            ]}
          />

          <ConceptBlock title="Maintenance context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow">
              <li>Inspection: annual visual, 3-5 year full electrical test.</li>
              <li>Diagnostics: thermal imaging, I-V curve tracing, inverter logs.</li>
              <li>Safety: DC-rated isolators, fire-resistant cabling, dual-supply labels.</li>
              <li>ST1426: maps to emerging technologies KSBs.</li>
            </ul>
          </ConceptBlock>

          <LearningOutcomes
            outcomes={[
              'Explain the photovoltaic effect and PV cell technologies (mono, poly, thin-film)',
              'Describe PV system architectures: string inverter, microinverter and optimiser topologies',
              'Apply BS 7671 Section 712 requirements for PV installations',
              'Distinguish between G98 and G99 DNO connection requirements',
              'Carry out PV system inspection, testing and fault-finding procedures',
              'Identify the maintenance requirements for maximising PV system performance and safety',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>PV cell technology and module construction</ContentEyebrow>

          <ConceptBlock title="How a PV cell converts sunlight into electricity">
            <p>
              Solar photovoltaic technology converts sunlight directly into electrical energy
              through the photovoltaic effect. When photons from sunlight strike a semiconductor
              material (typically crystalline silicon), they transfer energy to electrons, creating
              an electric current. This fundamental principle underpins all PV technologies, from
              small domestic rooftop arrays to large commercial installations.
            </p>
            <p>
              Understanding cell technology is important for maintenance technicians because
              different cell types have different degradation modes, performance characteristics,
              and temperature coefficients. A technician who understands the technology can diagnose
              faults more effectively and advise building operators on performance expectations.
            </p>
          </ConceptBlock>

          <PvCellCrossSection caption="The photovoltaic effect: a photon striking the p-n junction creates an electron-hole pair, and the built-in electric field separates the charge carriers to produce a DC voltage." />

          <ConceptBlock title="PV cell technologies comparison">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Technology</th>
                    <th className="py-2 pr-4 font-medium text-white">Efficiency</th>
                    <th className="py-2 font-medium text-white">Characteristics</th>
                  </tr>
                </thead>
                <tbody className="text-xs text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Monocrystalline</td>
                    <td className="py-2 pr-4">20-22%</td>
                    <td className="py-2">
                      Single crystal, uniform dark, highest output per m², premium cost
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Polycrystalline</td>
                    <td className="py-2 pr-4">15-17%</td>
                    <td className="py-2">
                      Multiple crystals, blue speckled, good value, slightly lower output
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Thin-film (CdTe/CIGS)</td>
                    <td className="py-2 pr-4">10-13%</td>
                    <td className="py-2">
                      Deposited layers, flexible options, better in low light, lower cost per m²
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">Half-cut cell</td>
                    <td className="py-2 pr-4">20-22%</td>
                    <td className="py-2">
                      Cells cut in half — reduced resistive losses, better shade tolerance
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Module construction">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow">
              <li>
                <strong>Front glass:</strong> Tempered low-iron glass (3.2 mm typical) —
                anti-reflective coated for maximum light transmission.
              </li>
              <li>
                <strong>Encapsulant:</strong> EVA (ethylene vinyl acetate) sheets above and below
                the cells — protects cells and provides electrical insulation.
              </li>
              <li>
                <strong>Cells:</strong> Series-connected cell strings with bypass diodes (typically
                3 per module) to allow current to bypass shaded sections.
              </li>
              <li>
                <strong>Backsheet:</strong> Polymer layer (or glass in glass-glass modules)
                providing weather protection and electrical insulation.
              </li>
              <li>
                <strong>Frame:</strong> Anodised aluminium providing structural support and mounting
                interface.
              </li>
              <li>
                <strong>Junction box:</strong> IP65-rated box containing bypass diodes and cable
                connections with MC4 connectors.
              </li>
            </ul>
            <p className="text-sm text-elec-yellow">
              <strong>Key point:</strong> A typical 400 W module produces approximately 40 V
              open-circuit and 10 A short-circuit in standard test conditions (STC: 1000 W/m²
              irradiance, 25 degrees C cell temperature, AM1.5 spectrum). Connecting 10 modules in
              series creates a string voltage of approximately 400 V DC — a potentially lethal
              voltage that is present whenever there is daylight.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>System architectures and inverter technologies</ContentEyebrow>

          <ConceptBlock title="The inverter: the most technologically complex component">
            <p>
              The inverter is the most technologically complex component in a PV system and the
              component most likely to require maintenance or replacement during the system
              lifetime. Understanding the different inverter topologies and their implications for
              performance and maintenance is essential for electrical maintenance technicians.
            </p>
          </ConceptBlock>

          <ConceptBlock title="String inverter systems">
            <p>
              The most common topology for domestic and small commercial installations. Multiple PV
              modules are connected in series (a &apos;string&apos;) to achieve the required DC
              input voltage for the inverter. One or two strings connect to a single wall-mounted
              inverter.
            </p>
            <ul className="list-disc space-y-1 pl-5 marker:text-elec-yellow">
              <li>Cost-effective for unshaded roofs with uniform orientation.</li>
              <li>Single point of failure — inverter fault disables entire array.</li>
              <li>String performance limited by the weakest module (series connection).</li>
              <li>High DC string voltage (300-600 V) requires careful cable management.</li>
              <li>MPPT operates at string level — shading affects entire string.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Microinverter systems">
            <p>
              A small inverter is fitted to each individual PV module, converting DC to AC at the
              module level. All module outputs connect in parallel to the AC distribution board.
            </p>
            <ul className="list-disc space-y-1 pl-5 marker:text-elec-yellow">
              <li>
                Module-level MPPT — each module operates independently at its maximum power point.
              </li>
              <li>Excellent shade tolerance — shading one module does not affect others.</li>
              <li>No high-voltage DC on the roof — only module-level DC (30-40 V) and 230 V AC.</li>
              <li>Module-level monitoring identifies individual underperforming modules.</li>
              <li>Higher cost per watt; more components with potential failure points.</li>
              <li>Maintenance requires roof access to each microinverter.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="DC optimiser systems">
            <p>
              Power optimisers fitted to each module provide module-level MPPT and voltage
              regulation, feeding a centralised string inverter. A hybrid approach combining
              benefits of both topologies.
            </p>
            <ul className="list-disc space-y-1 pl-5 marker:text-elec-yellow">
              <li>Module-level MPPT with centralised DC-to-AC conversion.</li>
              <li>
                Rapid shutdown capability for firefighter safety (reduces DC voltage to safe level).
              </li>
              <li>Module-level monitoring via the string inverter interface.</li>
              <li>Fixed string voltage output regardless of irradiance conditions.</li>
            </ul>
            <p className="text-sm text-elec-yellow">
              <strong>Key point:</strong> All grid-connected inverters must incorporate
              anti-islanding protection compliant with G98 or G99 engineering recommendations. The
              inverter must disconnect from the grid within 0.5 seconds of detecting loss of mains
              supply.
            </p>
          </ConceptBlock>

          <ResidentialPvSld caption="A residential PV system: the hybrid inverter ties the array (and any battery) together on the DC side and feeds AC into the consumer unit, with surplus exported through the smart meter." />

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>BS 7671 Section 712 and DNO connection requirements</ContentEyebrow>

          <ConceptBlock title="Complying with both general requirements and Section 712">
            <p>
              PV installations must comply with both BS 7671 general requirements and the additional
              requirements of Section 712 specific to PV systems. The maintenance technician must
              understand these requirements to carry out periodic inspection and testing correctly
              and to identify non-compliant installations.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Key BS 7671 Section 712 requirements">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow">
              <li>
                <strong>712.411:</strong> Where protection by automatic disconnection of supply
                cannot be achieved on the DC side, protection by double or reinforced insulation
                (Class II) or by electrical separation shall be used.
              </li>
              <li>
                <strong>712.512.1:</strong> A PV installation shall be subdivided into PV string
                circuits, PV array circuits and PV installation circuits for correct overcurrent
                protection.
              </li>
              <li>
                <strong>712.514:</strong> Labelling at the origin of the installation (consumer
                unit/distribution board) and at the meter position warning of the presence of a dual
                supply — &apos;DUAL SUPPLY — SOLAR PV&apos;.
              </li>
              <li>
                <strong>712.522:</strong> PV DC cables within a building shall be either
                fire-resistant (to BS 8434 or BS 8519) or installed in fire-resistant
                trunking/conduit.
              </li>
              <li>
                <strong>712.537.2:</strong> A DC isolator shall be provided adjacent to the
                inverter, operable from floor level, allowing isolation of the PV array from the
                inverter.
              </li>
              <li>
                <strong>712.411.203:</strong> On the DC side, earth fault protection shall be
                provided by an insulation monitoring device (IMD) or equivalent within the inverter.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Critical: anti-islanding and DNO safety">
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4">
              <p className="text-sm text-white">
                Grid-connected PV systems must disconnect from the network when the grid supply
                fails. Without anti-islanding protection, a PV system could export power into a
                section of network that DNO operatives believe is dead — creating a lethal
                electrocution hazard. All approved inverters include integral anti-islanding (loss
                of mains) protection. The maintenance technician must verify this function is active
                and correctly configured during periodic inspection. Engineering Recommendations G98
                and G99 define the protection settings and response times.
              </p>
            </div>
          </ConceptBlock>

          <ConceptBlock title="G98 vs G99 connection requirements">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Feature</th>
                    <th className="py-2 pr-4 font-medium text-white">G98 (formerly G83)</th>
                    <th className="py-2 font-medium text-white">G99 (formerly G59)</th>
                  </tr>
                </thead>
                <tbody className="text-xs text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Capacity</td>
                    <td className="py-2 pr-4">Aggregate up to 16 A/phase (~3.68 kW)</td>
                    <td className="py-2">Above 16 A/phase aggregate</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Process</td>
                    <td className="py-2 pr-4">Fit and notify (within 28 days)</td>
                    <td className="py-2">Apply and approval required before install</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">DNO assessment</td>
                    <td className="py-2 pr-4">Not required</td>
                    <td className="py-2">Network impact assessment required</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Export limitation</td>
                    <td className="py-2 pr-4">Rarely required</td>
                    <td className="py-2">May be imposed by DNO</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">Protection testing</td>
                    <td className="py-2 pr-4">Type tested (inverter)</td>
                    <td className="py-2">Commissioning witness test may be required</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-elec-yellow">
              <strong>Key point:</strong> The MCS (Microgeneration Certification Scheme)
              installation standard MIS 3002 provides the detailed design and installation
              requirements for PV systems. MCS registration is mandatory for SEG (Smart Export
              Guarantee) eligibility and is increasingly required by building insurers and warranty
              providers.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>PV maintenance, testing and fault-finding</ContentEyebrow>

          <ConceptBlock title="Systematic inspection, testing and fault-finding">
            <p>
              PV systems require regular maintenance to maintain performance and safety. While PV
              has no moving parts, environmental exposure, thermal cycling, and electrical stress
              cause gradual degradation. The maintenance technician must carry out systematic
              inspection, testing, and fault-finding to identify issues before they become safety
              hazards or cause significant performance losses.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Visual inspection checklist">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow">
              <li>Module front glass: cracks, delamination, snail trails, soiling.</li>
              <li>Module backsheet: yellowing, cracking, burn marks.</li>
              <li>Frame: corrosion, loose fixings, impact damage.</li>
              <li>Mounting system: roof penetration seals, rail fixings.</li>
              <li>DC cabling: UV degradation, rodent damage, connector condition.</li>
              <li>Isolators: operation, weathering, label legibility.</li>
              <li>Inverter: fan operation, display/LED status, dust ingress.</li>
              <li>Labels: dual supply warnings at origin and meter.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Electrical testing">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow">
              <li>
                Open-circuit voltage (Voc) per string — compare with calculated expected value.
              </li>
              <li>Short-circuit current (Isc) per string — compare with module datasheet.</li>
              <li>Insulation resistance: DC side (500 V DC test), AC side (500 V DC test).</li>
              <li>Earth continuity of exposed-conductive-parts (frames, mounting).</li>
              <li>I-V curve tracing: identifies underperforming modules in a string.</li>
              <li>Thermal imaging: hotspots, bypass diode activation, connection faults.</li>
              <li>Inverter performance data: compare actual yield with expected yield.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Common PV faults and diagnostic approach">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Symptom</th>
                    <th className="py-2 pr-4 font-medium text-white">Possible cause</th>
                    <th className="py-2 font-medium text-white">Diagnostic method</th>
                  </tr>
                </thead>
                <tbody className="text-xs text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Zero output</td>
                    <td className="py-2 pr-4">Inverter fault, DC isolator open, earth fault</td>
                    <td className="py-2">
                      Inverter display/logs, DC voltage check, insulation resistance
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Reduced output</td>
                    <td className="py-2 pr-4">
                      Soiling, shading, module degradation, bypass diode
                    </td>
                    <td className="py-2">Thermal imaging, I-V curve, Voc comparison</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Inverter earth fault</td>
                    <td className="py-2 pr-4">Damaged DC cable insulation, water ingress to JB</td>
                    <td className="py-2">String-by-string insulation resistance testing</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Hotspot on module</td>
                    <td className="py-2 pr-4">Cell micro-crack, solder joint failure, PID</td>
                    <td className="py-2">Thermal imaging, electroluminescence imaging</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">Inverter tripping</td>
                    <td className="py-2 pr-4">
                      Grid voltage/frequency out of range, islanding detected
                    </td>
                    <td className="py-2">Inverter event logs, grid voltage/frequency monitoring</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Safety warning: DC arc flash">
            <div className="rounded-lg border border-orange-500/30 bg-orange-500/10 p-4">
              <p className="text-sm text-white">
                DC arcs from PV systems do not self-extinguish at current zero like AC arcs. A DC
                arc from a faulty connector or damaged cable can sustain temperatures exceeding 3000
                degrees C, causing fire. When working on DC PV circuits: use DC-rated isolators and
                test equipment; inspect MC4 connectors for burn marks, melting, or discolouration;
                never disconnect MC4 connectors under load; and report any signs of arcing
                immediately.
              </p>
            </div>
            <p className="text-sm text-white italic">
              <strong>Note:</strong> Under ST1426, maintenance technicians must demonstrate
              knowledge of renewable energy technologies including solar PV. This includes
              understanding system operation, safety hazards, and maintenance requirements.
              Practical competence in PV inspection and testing is assessed through workplace
              evidence.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>PV system performance monitoring and degradation</ContentEyebrow>

          <ConceptBlock title="Maximising return on investment and catching degradation early">
            <p>
              Long-term PV system performance monitoring is essential for maximising the return on
              investment and identifying degradation before it becomes a safety issue. The
              maintenance technician should understand how to assess whether a PV system is
              performing as expected, identify common degradation mechanisms, and advise building
              operators on when intervention is required.
            </p>
            <p>
              PV modules degrade over their lifetime at a rate of approximately 0.5% per year for
              crystalline silicon, meaning a system that produced 4,000 kWh in year one might
              produce approximately 3,500 kWh by year 25. This is normal and accounted for in system
              design. However, accelerated degradation -- caused by manufacturing defects,
              installation errors, or environmental damage -- can reduce output far more rapidly and
              may indicate safety issues.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Performance assessment methods">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow">
              <li>
                <strong>Specific yield comparison:</strong> Compare actual annual yield (kWh/kWp)
                against expected yield for the location and orientation (typically 800-1,000 kWh/kWp
                in the UK).
              </li>
              <li>
                <strong>Performance ratio:</strong> The ratio of actual energy output to the
                theoretical maximum -- a healthy system achieves 75-85%.
              </li>
              <li>
                <strong>Inverter monitoring:</strong> Most inverters log daily and monthly yields --
                compare trends year-on-year to detect gradual degradation.
              </li>
              <li>
                <strong>String comparison:</strong> In multi-string systems, compare string
                performance -- one underperforming string indicates a module or wiring fault.
              </li>
              <li>
                <strong>Thermal imaging:</strong> Identify hotspots, bypass diode activation and
                connection faults during peak irradiance.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Common degradation mechanisms">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow">
              <li>
                <strong>PID (Potential Induced Degradation):</strong> Leakage currents through
                encapsulant degrade cell performance -- more severe in humid conditions.
              </li>
              <li>
                <strong>LID (Light Induced Degradation):</strong> Initial 1-3% output loss in the
                first hours of exposure -- a normal characteristic of crystalline silicon.
              </li>
              <li>
                <strong>Snail trails:</strong> Silver-coloured discolouration along cell
                micro-cracks -- cosmetic initially but indicates moisture ingress risk.
              </li>
              <li>
                <strong>Delamination:</strong> Separation of encapsulant from glass or cells --
                allows moisture ingress causing corrosion and earth faults.
              </li>
              <li>
                <strong>Hotspots:</strong> Localised heating caused by cell damage, shading or
                connection failure -- fire risk if severe.
              </li>
              <li>
                <strong>Connector degradation:</strong> MC4 connectors exposed to UV and thermal
                cycling -- arcing risk from corroded or loose connections.
              </li>
            </ul>
            <p className="text-sm text-white italic">
              <strong>Note:</strong> Under ST1426, maintenance technicians must demonstrate
              knowledge of PV system operation and maintenance. This includes understanding
              performance assessment, degradation mechanisms, and the safety implications of system
              faults. Practical competence in PV inspection supports the emerging technologies
              knowledge requirement of the standard.
            </p>
          </ConceptBlock>

          <SectionRule />

          <VideoCard
            url="https://www.youtube.com/watch?v=Yxt72aDjFgY"

            title="How Solar Panels Work — Generating Electricity"

            channel="The Engineering Mindset"

            duration="22:35"

            topic="From the photovoltaic effect through to a working array"

            caption="Thorough. Covers the cell physics behind the cross-section diagram above, then builds up to the array."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'PV cell: ~0.5-0.6 V per cell. Module: ~40 V open circuit (400 W). String: 300-600 V DC — lethal in daylight.',
              'Monocrystalline: 20-22% efficiency. Polycrystalline: 15-17% efficiency. Degradation: ~0.5%/year normal.',
              'BS 7671 Section 712 governs PV installations. G98: aggregate up to 16 A/phase, about 3.68 kW (fit and notify). G99: above that (apply to the DNO first).',
              'MCS MIS 3002 is the installation standard. A DC isolator must sit adjacent to the inverter.',
              'Fire-resistant DC cable is required inside buildings. Dual-supply labels are required at origin and meter.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Test Your Knowledge" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module3-section6')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Back to section
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Section 3.6 hub
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module3-section6-2')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Wind and Other Renewables
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule3Section6_1;
