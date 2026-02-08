import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Solar PV Integration - MOET Module 3.6.1";
const DESCRIPTION =
  "Comprehensive guide to solar photovoltaic systems for electrical maintenance technicians: PV cell technology, system architectures, inverters, grid connection, BS 7671 Section 712, G99/G98 compliance, maintenance and fault-finding under ST1426.";

/* ------------------------------------------------------------------ */
/*  Quick-check questions (4) — shown after each content section       */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    id: "pv-cell-principle",
    question:
      "What is the fundamental operating principle of a photovoltaic cell?",
    options: [
      "Electromagnetic induction",
      "The photovoltaic effect — semiconductor materials (typically crystalline silicon) generate a direct current (DC) when exposed to sunlight, as photons transfer energy to electrons in the material",
      "Thermoelectric conversion",
      "Piezoelectric effect",
    ],
    correctIndex: 1,
    explanation:
      "A PV cell exploits the photovoltaic effect. When photons from sunlight strike the semiconductor junction (typically a p-n junction in crystalline silicon), they transfer energy to electrons, creating electron-hole pairs. The electric field at the junction separates these charge carriers, producing a DC voltage across the cell. A typical silicon cell produces approximately 0.5-0.6 V; cells are connected in series within a module to achieve useful voltages (typically 30-40 V per module).",
  },
  {
    id: "inverter-function",
    question:
      "What is the primary function of a solar inverter in a grid-connected PV system?",
    options: [
      "To store energy in batteries",
      "To convert the DC output from the PV array into AC at the correct voltage, frequency and phase to synchronise with the grid supply, and to provide anti-islanding protection",
      "To increase the voltage of PV panels",
      "To cool the PV panels",
    ],
    correctIndex: 1,
    explanation:
      "The inverter is the critical interface between the DC PV array and the AC grid supply. It converts DC to AC using power electronics (typically IGBT or MOSFET switching), synchronises the output with the grid (matching voltage, frequency and phase), and includes anti-islanding protection that disconnects the PV system if the grid supply fails — preventing exported power from endangering DNO network operatives working on what they believe is a dead circuit.",
  },
  {
    id: "bs7671-section712",
    question:
      "Which section of BS 7671 specifically covers the requirements for solar PV installations?",
    options: [
      "Section 701 (Bathrooms)",
      "Section 712 — Solar Photovoltaic (PV) Power Supply Systems, which covers additional requirements for PV installations including DC wiring, isolation, labelling, and protection against electric shock",
      "Section 722 (EV Charging)",
      "Section 753 (Heating)",
    ],
    correctIndex: 1,
    explanation:
      "BS 7671 Section 712 contains the specific requirements for PV installations. Key requirements include: DC circuit protection and isolation (Regulation 712.411), PV DC isolator adjacent to the inverter (Regulation 712.537.2), fire-resistant DC wiring within buildings (Regulation 712.522), labelling at the main distribution board and meter position warning of dual supply (Regulation 712.514), and overcurrent protection for both DC and AC circuits.",
  },
  {
    id: "anti-islanding",
    question:
      "Why is anti-islanding protection mandatory for grid-connected PV systems?",
    options: [
      "To maximise energy production",
      "To prevent the PV system from continuing to export power into a section of the grid that has been disconnected for maintenance, which could electrocute DNO network operatives",
      "To reduce electricity bills",
      "To protect the inverter from overheating",
    ],
    correctIndex: 1,
    explanation:
      "Anti-islanding is a critical safety requirement. If the grid supply is disconnected (for maintenance, fault repair, or load management), a grid-connected PV system could continue to energise the local network section — creating a lethal hazard for DNO operatives who believe the circuit is dead. Anti-islanding protection (required by G99/G98 and built into all approved inverters) detects loss of grid supply and disconnects the PV system within 0.5 seconds.",
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions (12) — end-of-page assessment                       */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      "The two main types of crystalline silicon PV cell are:",
    options: [
      "AC cells and DC cells",
      "Monocrystalline (single crystal, higher efficiency 20-22%, more expensive) and polycrystalline (multiple crystals, lower efficiency 15-17%, lower cost)",
      "Indoor cells and outdoor cells",
      "Flexible cells and rigid cells",
    ],
    correctAnswer: 1,
    explanation:
      "Monocrystalline cells are cut from a single silicon crystal ingot, giving a uniform dark appearance and higher efficiency (typically 20-22% for commercial modules). Polycrystalline cells are cast from molten silicon, forming multiple crystal structures with a characteristic blue speckled appearance and slightly lower efficiency (15-17%). Monocrystalline is more expensive per watt but produces more power per square metre, making it preferred where roof space is limited.",
  },
  {
    id: 2,
    question: "A string inverter differs from a microinverter in that:",
    options: [
      "A string inverter is smaller",
      "A string inverter converts the DC output from a series-connected string of multiple PV modules, while a microinverter is fitted to each individual module and converts its output independently",
      "A string inverter is more expensive per watt",
      "A string inverter is fitted to each panel",
    ],
    correctAnswer: 1,
    explanation:
      "String inverters receive the combined DC output from a series string of PV modules (typically 8-14 modules at 300-600 V DC). One inverter serves many modules. Microinverters are small inverters fitted to each individual module, converting DC to AC at the module level. Microinverters offer module-level monitoring, better performance in partial shading, and eliminate high-voltage DC cabling, but are more expensive overall and require access to each module for maintenance.",
  },
  {
    id: 3,
    question:
      "Under BS 7671 Regulation 712.537.2, the PV DC isolator must be:",
    options: [
      "Located in the main consumer unit",
      "Located adjacent to the inverter and be capable of being operated by a person standing at floor level, to allow safe isolation of the DC supply from the PV array before any work on the inverter or AC circuits",
      "Hidden behind the PV array",
      "Located at the DNO meter position",
    ],
    correctAnswer: 1,
    explanation:
      "Regulation 712.537.2 requires a DC isolator switch adjacent to the inverter that can disconnect the PV array from the inverter. It must be accessible to a person standing at floor level (not requiring roof access). This allows the high-voltage DC circuit to be safely isolated before any maintenance work. The DC isolator must be rated for DC duty (not an AC isolator used on DC) as DC arcs do not self-extinguish at current zero like AC arcs.",
  },
  {
    id: 4,
    question:
      "The maximum power point tracker (MPPT) in a solar inverter:",
    options: [
      "Tracks the position of the sun",
      "Continuously adjusts the operating voltage and current of the PV array to extract maximum power under varying irradiance and temperature conditions",
      "Controls the tilt angle of panels",
      "Monitors the grid frequency",
    ],
    correctAnswer: 1,
    explanation:
      "PV modules have a characteristic I-V curve where power output varies with operating voltage. The maximum power point (MPP) changes continuously with irradiance levels and cell temperature. The MPPT algorithm in the inverter dynamically adjusts the DC operating point to maintain the array at its MPP, maximising energy harvest. Without MPPT, the array would operate at a fixed voltage, losing 10-25% of potential energy production as conditions change throughout the day.",
  },
  {
    id: 5,
    question: "G99 (formerly G59) applies to PV installations where:",
    options: [
      "The installation is off-grid",
      "The total generation capacity exceeds 3.68 kW per phase (16 A per phase), requiring formal application to the DNO for connection approval before installation",
      "The panels are mounted on the ground",
      "The installation uses battery storage",
    ],
    correctAnswer: 1,
    explanation:
      "Engineering Recommendation G99 (which replaced G59 in 2019) applies to generating equipment connecting to the distribution network above 3.68 kW per phase. It requires formal application to the DNO, technical assessment, and approval before connection. G98 (which replaced G83) covers smaller installations up to 3.68 kW per phase under a 'fit and notify' arrangement. Both standards specify protection settings, power quality limits, and anti-islanding requirements.",
  },
  {
    id: 6,
    question:
      "When testing a PV system, the DC string voltage will typically be:",
    options: [
      "12 V",
      "300-600 V DC under normal operating conditions (depending on the number of modules in series and irradiance level), presenting a serious electric shock hazard that cannot be switched off while daylight is present",
      "230 V AC",
      "50 V DC",
    ],
    correctAnswer: 1,
    explanation:
      "A PV string of 10-15 modules connected in series produces 300-600 V DC (or higher in commercial systems). Critically, this voltage is present whenever there is sufficient light — it cannot be 'switched off' like a mains supply. Even on overcast days, string voltages remain hazardous. Safe working practices require: DC isolation at the inverter, string disconnection at the array junction box (if accessible), and verification of dead circuit. PV-specific insulated tools and DC-rated test equipment are essential.",
  },
  {
    id: 7,
    question:
      "Fire-resistant DC cabling is required within buildings for PV systems because:",
    options: [
      "It reduces power losses",
      "BS 7671 Regulation 712.522 requires that DC cables within a building that cannot be isolated from the PV array in a fire are either fire-resistant (to BS 8434/BS 8519) or enclosed in fire-resistant conduit, because they will remain energised as long as daylight is present",
      "It is cheaper than standard cable",
      "It improves the aesthetic appearance",
    ],
    correctAnswer: 1,
    explanation:
      "Unlike mains circuits that can be isolated at the origin, PV DC cables remain energised in daylight and cannot be remotely disconnected. In a building fire, firefighters face the risk of electrocution from damaged PV DC cables carrying hazardous voltages. BS 7671 Regulation 712.522 therefore requires either fire-resistant cable or fire-resistant enclosure for DC PV cables routed within buildings. This requirement does not apply to cables between modules on the roof.",
  },
  {
    id: 8,
    question:
      "A common fault indication on a PV system showing lower-than-expected output is:",
    options: [
      "The panels are too new",
      "One or more bypass diodes have activated due to cell shading or cell failure within a module, causing the affected module to produce reduced output while allowing the string to continue operating",
      "The system is producing too much power",
      "The meter is faulty",
    ],
    correctAnswer: 1,
    explanation:
      "PV modules contain bypass diodes that allow current to bypass shaded or failed cell strings within the module. When a bypass diode activates, that portion of the module produces no power, reducing overall string output. Causes include: partial shading (trees, chimneys, bird droppings), cell micro-cracking (from impact or thermal stress), hotspot formation, and solder joint degradation. Thermal imaging and I-V curve tracing are the primary diagnostic tools for identifying affected modules.",
  },
  {
    id: 9,
    question:
      "The MCS (Microgeneration Certification Scheme) is relevant to PV installations because:",
    options: [
      "It is a type of PV panel",
      "It is the quality assurance scheme for PV installations in the UK — only MCS-certified installers can register installations for Smart Export Guarantee (SEG) payments and access certain warranty provisions",
      "It is a brand of inverter",
      "It only applies to wind turbines",
    ],
    correctAnswer: 1,
    explanation:
      "MCS is the UK quality assurance scheme for microgeneration technologies. For PV, MCS certification requires: use of MCS-approved products (modules and inverters), installation by an MCS-certified installer, compliance with MCS installation standard MIS 3002, and commissioning and handover documentation. MCS registration is mandatory for the installation to qualify for Smart Export Guarantee (SEG) payments from energy suppliers and is increasingly required by DNOs and building insurers.",
  },
  {
    id: 10,
    question:
      "When maintaining a PV system, the maintenance technician should:",
    options: [
      "Only inspect the inverter",
      "Inspect the complete system including: module condition (cracking, delamination, snail trails), mounting frame integrity and corrosion, DC cable condition and connections, isolator switch operation, inverter performance data, and earthing continuity",
      "Only check the electricity meter",
      "Only clean the panels",
    ],
    correctAnswer: 1,
    explanation:
      "Comprehensive PV maintenance covers: visual inspection of modules (cracking, delamination, hotspots, snail trails, soiling); mounting frame (corrosion, loose fixings, wind damage); DC cabling (UV degradation, rodent damage, loose connections); DC and AC isolator operation; inverter display/logs for fault codes and performance data (compare actual yield with expected yield); earthing and bonding continuity; labelling condition; and vegetation management (shading). Thermal imaging during peak irradiance reveals hotspots and underperforming modules.",
  },
  {
    id: 11,
    question:
      "Potential Induced Degradation (PID) in PV modules:",
    options: [
      "Is a fault with the inverter",
      "Is a phenomenon where high voltage difference between the PV cells and the earthed frame causes leakage currents through the encapsulant, degrading cell performance over time — particularly in high-humidity environments",
      "Only occurs at night",
      "Improves panel efficiency",
    ],
    correctAnswer: 1,
    explanation:
      "PID occurs when the voltage potential between PV cells and the grounded module frame drives leakage currents through the glass and encapsulant material. This causes ion migration that degrades cell performance, sometimes reducing module output by 30% or more. It is more severe in high-humidity conditions, at the ends of strings where the voltage differential to earth is greatest, and in systems with transformerless inverters. PID-resistant modules and system grounding strategies can mitigate the effect.",
  },
  {
    id: 12,
    question:
      "Under the Electricity at Work Regulations 1989, a PV system is classified as:",
    options: [
      "Not covered by the regulations",
      "A source of electrical energy that must be treated as live whenever daylight is present, requiring safe systems of work, competent persons, and appropriate isolation procedures — the duty holder has the same obligations as for any other electrical system",
      "Only covered during installation",
      "Only covered if the system exceeds 10 kW",
    ],
    correctAnswer: 1,
    explanation:
      "The Electricity at Work Regulations 1989 apply to all electrical systems, including PV. The PV array is a source of electrical energy that cannot be de-energised by simply operating a switch — it generates voltage whenever there is sufficient light. The duty holder must ensure: safe systems of work for maintenance (including recognition that DC circuits cannot be isolated at the source); competent persons carry out the work; suitable test equipment rated for the voltages present; and emergency procedures are in place.",
  },
];

/* ------------------------------------------------------------------ */
/*  FAQs (5)                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question:
      "Can I work on a PV system at night when the panels are not generating?",
    answer:
      "While PV panels produce negligible voltage in darkness, this is not a reliable isolation method. Residual charge may remain in DC capacitors within the inverter, and even low light levels (dawn, dusk, moonlight, street lighting) can produce hazardous voltages. Always follow proper isolation procedures: isolate the DC supply at the array isolator and the inverter DC isolator, isolate the AC supply at the consumer unit, and prove dead on both DC and AC circuits using appropriately rated test equipment. Never rely on darkness as an isolation measure.",
  },
  {
    question:
      "What is the difference between G98 and G99 for PV installations?",
    answer:
      "G98 (formerly G83) covers small-scale generation up to 3.68 kW per phase (single phase: 3.68 kW, three phase: 11.04 kW). It operates on a 'fit and notify' basis — the installer completes the installation and notifies the DNO within 28 days. G99 (formerly G59) covers generation above 3.68 kW per phase and requires formal application to the DNO before installation. The DNO assesses the network impact and may impose conditions such as export limitation, protection settings, or network reinforcement. Both standards require compliant inverters with anti-islanding protection.",
  },
  {
    question:
      "How often should PV systems be inspected and tested?",
    answer:
      "The IET Code of Practice for Grid Connected Solar PV Systems recommends annual visual inspection and performance monitoring review. Full electrical testing (insulation resistance, earth continuity, open-circuit voltage, short-circuit current, I-V curve tracing) should be carried out at intervals determined by the risk assessment — typically every 3-5 years for domestic installations and annually for commercial installations. Inverter performance data should be monitored continuously to detect degradation trends. BS 7671 periodic inspection requirements also apply to the AC circuits.",
  },
  {
    question:
      "What are the main safety hazards when working on PV systems?",
    answer:
      "The primary hazards are: DC electric shock (300-600 V DC that cannot be switched off in daylight); arc flash (DC arcs do not self-extinguish and can cause fires); working at height (roof access for module inspection/maintenance); fire risk (from DC arc faults in damaged cables or connectors); and structural loading (module weight on roof structure). Additional hazards include: electrocution risk to firefighters from damaged DC cables; stored energy in inverter DC capacitors; and the risk of back-feeding through the inverter if anti-islanding fails.",
  },
  {
    question:
      "What does the Smart Export Guarantee (SEG) mean for PV maintenance?",
    answer:
      "The SEG requires energy suppliers with over 150,000 customers to offer a tariff for exported electricity from small-scale generation (up to 5 MW). For PV system owners, this creates a financial incentive to maintain system performance. For maintenance technicians, it means: ensuring export meters are functioning correctly; monitoring system yield against expected performance; identifying and rectifying faults that reduce output; and maintaining MCS registration (required for SEG eligibility). Poor maintenance directly reduces the financial return from the PV investment.",
  },
];

/* ================================================================== */
/*  Component                                                          */
/* ================================================================== */
const MOETModule3Section6_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* ---- Sticky header ---- */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
            </Link>
          </Button>
        </div>
      </div>

      {/* ---- Main article ---- */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* ---- Header ---- */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 3.6.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Solar PV Integration
          </h1>
          <p className="text-white/80">
            Photovoltaic systems, grid connection and maintenance for electrical
            technicians
          </p>
        </header>

        {/* ---- Summary boxes ---- */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">
              In 30 Seconds
            </p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1">
                <strong>PV effect:</strong> Semiconductor cells convert sunlight
                directly to DC electricity
              </li>
              <li className="pl-1">
                <strong>Inverter:</strong> Converts DC to grid-synchronised AC
                with anti-islanding
              </li>
              <li className="pl-1">
                <strong>Hazard:</strong> DC circuits energised whenever daylight
                present (300-600 V DC)
              </li>
              <li className="pl-1">
                <strong>Standards:</strong> BS 7671 Section 712, G98/G99, MCS
                MIS 3002
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">
              Maintenance Context
            </p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1">
                <strong>Inspection:</strong> Annual visual, 3-5 year full
                electrical test
              </li>
              <li className="pl-1">
                <strong>Diagnostics:</strong> Thermal imaging, I-V curve
                tracing, inverter logs
              </li>
              <li className="pl-1">
                <strong>Safety:</strong> DC-rated isolators, fire-resistant
                cabling, dual-supply labels
              </li>
              <li className="pl-1">
                <strong>ST1426:</strong> Maps to emerging technologies KSBs
              </li>
            </ul>
          </div>
        </div>

        {/* ---- Learning outcomes ---- */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">
            What You Will Learn
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the photovoltaic effect and PV cell technologies (mono, poly, thin-film)",
              "Describe PV system architectures: string inverter, microinverter and optimiser topologies",
              "Apply BS 7671 Section 712 requirements for PV installations",
              "Distinguish between G98 and G99 DNO connection requirements",
              "Carry out PV system inspection, testing and fault-finding procedures",
              "Identify the maintenance requirements for maximising PV system performance and safety",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-sm text-white"
              >
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* ---- Section 01 ---- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            PV Cell Technology and Module Construction
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Solar photovoltaic technology converts sunlight directly into
              electrical energy through the photovoltaic effect. When photons
              from sunlight strike a semiconductor material (typically
              crystalline silicon), they transfer energy to electrons, creating
              an electric current. This fundamental principle underpins all PV
              technologies, from small domestic rooftop arrays to large
              commercial installations.
            </p>
            <p>
              Understanding cell technology is important for maintenance
              technicians because different cell types have different degradation
              modes, performance characteristics, and temperature coefficients. A
              technician who understands the technology can diagnose faults more
              effectively and advise building operators on performance
              expectations.
            </p>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                PV Cell Technologies Comparison
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">
                        Technology
                      </th>
                      <th className="border border-white/10 px-3 py-2 text-left">
                        Efficiency
                      </th>
                      <th className="border border-white/10 px-3 py-2 text-left">
                        Characteristics
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">
                        Monocrystalline
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        20-22%
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Single crystal, uniform dark, highest output per m²,
                        premium cost
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">
                        Polycrystalline
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        15-17%
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Multiple crystals, blue speckled, good value, slightly
                        lower output
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">
                        Thin-film (CdTe/CIGS)
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        10-13%
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Deposited layers, flexible options, better in low light,
                        lower cost per m²
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">
                        Half-cut cell
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        20-22%
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Cells cut in half — reduced resistive losses, better
                        shade tolerance
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                Module Construction
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Front glass:</strong> Tempered low-iron glass (3.2 mm
                  typical) — anti-reflective coated for maximum light
                  transmission
                </li>
                <li className="pl-1">
                  <strong>Encapsulant:</strong> EVA (ethylene vinyl acetate)
                  sheets above and below the cells — protects cells and provides
                  electrical insulation
                </li>
                <li className="pl-1">
                  <strong>Cells:</strong> Series-connected cell strings with
                  bypass diodes (typically 3 per module) to allow current to
                  bypass shaded sections
                </li>
                <li className="pl-1">
                  <strong>Backsheet:</strong> Polymer layer (or glass in
                  glass-glass modules) providing weather protection and
                  electrical insulation
                </li>
                <li className="pl-1">
                  <strong>Frame:</strong> Anodised aluminium providing structural
                  support and mounting interface
                </li>
                <li className="pl-1">
                  <strong>Junction box:</strong> IP65-rated box containing bypass
                  diodes and cable connections with MC4 connectors
                </li>
              </ul>
            </div>
            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> A typical 400 W module produces
              approximately 40 V open-circuit and 10 A short-circuit in standard
              test conditions (STC: 1000 W/m² irradiance, 25 degrees C cell
              temperature, AM1.5 spectrum). Connecting 10 modules in series
              creates a string voltage of approximately 400 V DC — a potentially
              lethal voltage that is present whenever there is daylight.
            </p>
          </div>
        </section>

        {/* Quick check 1 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ---- Section 02 ---- */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            System Architectures and Inverter Technologies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The inverter is the most technologically complex component in a PV
              system and the component most likely to require maintenance or
              replacement during the system lifetime. Understanding the different
              inverter topologies and their implications for performance and
              maintenance is essential for electrical maintenance technicians.
            </p>
            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                  String Inverter Systems
                </h3>
                <p className="text-sm text-white mb-2">
                  The most common topology for domestic and small commercial
                  installations. Multiple PV modules are connected in series (a
                  'string') to achieve the required DC input voltage for the
                  inverter. One or two strings connect to a single wall-mounted
                  inverter.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">
                    Cost-effective for unshaded roofs with uniform orientation
                  </li>
                  <li className="pl-1">
                    Single point of failure — inverter fault disables entire
                    array
                  </li>
                  <li className="pl-1">
                    String performance limited by the weakest module (series
                    connection)
                  </li>
                  <li className="pl-1">
                    High DC string voltage (300-600 V) requires careful cable
                    management
                  </li>
                  <li className="pl-1">
                    MPPT operates at string level — shading affects entire string
                  </li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                  Microinverter Systems
                </h3>
                <p className="text-sm text-white mb-2">
                  A small inverter is fitted to each individual PV module,
                  converting DC to AC at the module level. All module outputs
                  connect in parallel to the AC distribution board.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">
                    Module-level MPPT — each module operates independently at
                    its maximum power point
                  </li>
                  <li className="pl-1">
                    Excellent shade tolerance — shading one module does not
                    affect others
                  </li>
                  <li className="pl-1">
                    No high-voltage DC on the roof — only module-level DC (30-40
                    V) and 230 V AC
                  </li>
                  <li className="pl-1">
                    Module-level monitoring identifies individual
                    underperforming modules
                  </li>
                  <li className="pl-1">
                    Higher cost per watt; more components with potential failure
                    points
                  </li>
                  <li className="pl-1">
                    Maintenance requires roof access to each microinverter
                  </li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                  DC Optimiser Systems
                </h3>
                <p className="text-sm text-white mb-2">
                  Power optimisers fitted to each module provide module-level
                  MPPT and voltage regulation, feeding a centralised string
                  inverter. A hybrid approach combining benefits of both
                  topologies.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">
                    Module-level MPPT with centralised DC-to-AC conversion
                  </li>
                  <li className="pl-1">
                    Rapid shutdown capability for firefighter safety (reduces DC
                    voltage to safe level)
                  </li>
                  <li className="pl-1">
                    Module-level monitoring via the string inverter interface
                  </li>
                  <li className="pl-1">
                    Fixed string voltage output regardless of irradiance
                    conditions
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> All grid-connected inverters must
              incorporate anti-islanding protection compliant with G98 or G99
              engineering recommendations. The inverter must disconnect from the
              grid within 0.5 seconds of detecting loss of mains supply.
            </p>
          </div>
        </section>

        {/* Quick check 2 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ---- Section 03 ---- */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            BS 7671 Section 712 and DNO Connection Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              PV installations must comply with both BS 7671 general
              requirements and the additional requirements of Section 712
              specific to PV systems. The maintenance technician must understand
              these requirements to carry out periodic inspection and testing
              correctly and to identify non-compliant installations.
            </p>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                Key BS 7671 Section 712 Requirements
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>712.411:</strong> Where protection by automatic
                  disconnection of supply cannot be achieved on the DC side,
                  protection by double or reinforced insulation (Class II) or by
                  electrical separation shall be used
                </li>
                <li className="pl-1">
                  <strong>712.512.1:</strong> A PV installation shall be
                  subdivided into PV string circuits, PV array circuits and PV
                  installation circuits for correct overcurrent protection
                </li>
                <li className="pl-1">
                  <strong>712.514:</strong> Labelling at the origin of the
                  installation (consumer unit/distribution board) and at the
                  meter position warning of the presence of a dual supply —
                  'DUAL SUPPLY — SOLAR PV'
                </li>
                <li className="pl-1">
                  <strong>712.522:</strong> PV DC cables within a building shall
                  be either fire-resistant (to BS 8434 or BS 8519) or installed
                  in fire-resistant trunking/conduit
                </li>
                <li className="pl-1">
                  <strong>712.537.2:</strong> A DC isolator shall be provided
                  adjacent to the inverter, operable from floor level, allowing
                  isolation of the PV array from the inverter
                </li>
                <li className="pl-1">
                  <strong>712.411.203:</strong> On the DC side, earth fault
                  protection shall be provided by an insulation monitoring
                  device (IMD) or equivalent within the inverter
                </li>
              </ul>
            </div>
            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">
                Critical: Anti-Islanding and DNO Safety
              </p>
              <p className="text-sm text-white">
                Grid-connected PV systems must disconnect from the network when
                the grid supply fails. Without anti-islanding protection, a PV
                system could export power into a section of network that DNO
                operatives believe is dead — creating a lethal electrocution
                hazard. All approved inverters include integral anti-islanding
                (loss of mains) protection. The maintenance technician must
                verify this function is active and correctly configured during
                periodic inspection. Engineering Recommendations G98 and G99
                define the protection settings and response times.
              </p>
            </div>
            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                G98 vs G99 Connection Requirements
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">
                        Feature
                      </th>
                      <th className="border border-white/10 px-3 py-2 text-left">
                        G98 (formerly G83)
                      </th>
                      <th className="border border-white/10 px-3 py-2 text-left">
                        G99 (formerly G59)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">
                        Capacity
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Up to 3.68 kW per phase
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Above 3.68 kW per phase
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">
                        Process
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Fit and notify (within 28 days)
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Apply and approval required before install
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">
                        DNO assessment
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Not required
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Network impact assessment required
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">
                        Export limitation
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Rarely required
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        May be imposed by DNO
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">
                        Protection testing
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Type tested (inverter)
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Commissioning witness test may be required
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The MCS (Microgeneration Certification
              Scheme) installation standard MIS 3002 provides the detailed
              design and installation requirements for PV systems. MCS
              registration is mandatory for SEG (Smart Export Guarantee)
              eligibility and is increasingly required by building insurers and
              warranty providers.
            </p>
          </div>
        </section>

        {/* Quick check 3 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ---- Section 04 ---- */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            PV Maintenance, Testing and Fault-Finding
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              PV systems require regular maintenance to maintain performance and
              safety. While PV has no moving parts, environmental exposure,
              thermal cycling, and electrical stress cause gradual degradation.
              The maintenance technician must carry out systematic inspection,
              testing, and fault-finding to identify issues before they become
              safety hazards or cause significant performance losses.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                  Visual Inspection Checklist
                </h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">
                    Module front glass: cracks, delamination, snail trails,
                    soiling
                  </li>
                  <li className="pl-1">
                    Module backsheet: yellowing, cracking, burn marks
                  </li>
                  <li className="pl-1">
                    Frame: corrosion, loose fixings, impact damage
                  </li>
                  <li className="pl-1">
                    Mounting system: roof penetration seals, rail fixings
                  </li>
                  <li className="pl-1">
                    DC cabling: UV degradation, rodent damage, connector
                    condition
                  </li>
                  <li className="pl-1">
                    Isolators: operation, weathering, label legibility
                  </li>
                  <li className="pl-1">
                    Inverter: fan operation, display/LED status, dust ingress
                  </li>
                  <li className="pl-1">
                    Labels: dual supply warnings at origin and meter
                  </li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                  Electrical Testing
                </h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">
                    Open-circuit voltage (Voc) per string — compare with
                    calculated expected value
                  </li>
                  <li className="pl-1">
                    Short-circuit current (Isc) per string — compare with module
                    datasheet
                  </li>
                  <li className="pl-1">
                    Insulation resistance: DC side (500 V DC test), AC side
                    (500 V DC test)
                  </li>
                  <li className="pl-1">
                    Earth continuity of exposed-conductive-parts (frames,
                    mounting)
                  </li>
                  <li className="pl-1">
                    I-V curve tracing: identifies underperforming modules in a
                    string
                  </li>
                  <li className="pl-1">
                    Thermal imaging: hotspots, bypass diode activation,
                    connection faults
                  </li>
                  <li className="pl-1">
                    Inverter performance data: compare actual yield with
                    expected yield
                  </li>
                </ul>
              </div>
            </div>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">
                Common PV Faults and Diagnostic Approach
              </h3>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">
                        Symptom
                      </th>
                      <th className="border border-white/10 px-3 py-2 text-left">
                        Possible Cause
                      </th>
                      <th className="border border-white/10 px-3 py-2 text-left">
                        Diagnostic Method
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">
                        Zero output
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Inverter fault, DC isolator open, earth fault
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Inverter display/logs, DC voltage check, insulation
                        resistance
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">
                        Reduced output
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Soiling, shading, module degradation, bypass diode
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Thermal imaging, I-V curve, Voc comparison
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">
                        Inverter earth fault
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Damaged DC cable insulation, water ingress to JB
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        String-by-string insulation resistance testing
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">
                        Hotspot on module
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Cell micro-crack, solder joint failure, PID
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Thermal imaging, electroluminescence imaging
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">
                        Inverter tripping
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Grid voltage/frequency out of range, islanding detected
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Inverter event logs, grid voltage/frequency monitoring
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">
                Safety Warning: DC Arc Flash
              </p>
              <p className="text-sm text-white">
                DC arcs from PV systems do not self-extinguish at current zero
                like AC arcs. A DC arc from a faulty connector or damaged cable
                can sustain temperatures exceeding 3000 degrees C, causing fire.
                When working on DC PV circuits: use DC-rated isolators and test
                equipment; inspect MC4 connectors for burn marks, melting, or
                discolouration; never disconnect MC4 connectors under load; and
                report any signs of arcing immediately.
              </p>
            </div>
            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Under ST1426, maintenance technicians must
              demonstrate knowledge of renewable energy technologies including
              solar PV. This includes understanding system operation, safety
              hazards, and maintenance requirements. Practical competence in PV
              inspection and testing is assessed through workplace evidence.
            </p>
          </div>
        </section>

        {/* Quick check 4 */}
        <InlineCheck {...quickCheckQuestions[3]} />

        {/* ---- Section 05 ---- */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            PV System Performance Monitoring and Degradation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Long-term PV system performance monitoring is essential for
              maximising the return on investment and identifying degradation
              before it becomes a safety issue. The maintenance technician should
              understand how to assess whether a PV system is performing as
              expected, identify common degradation mechanisms, and advise
              building operators on when intervention is required.
            </p>
            <p>
              PV modules degrade over their lifetime at a rate of approximately
              0.5% per year for crystalline silicon, meaning a system that
              produced 4,000 kWh in year one might produce approximately 3,500
              kWh by year 25. This is normal and accounted for in system design.
              However, accelerated degradation -- caused by manufacturing
              defects, installation errors, or environmental damage -- can reduce
              output far more rapidly and may indicate safety issues.
            </p>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">
                Performance Assessment Methods
              </h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Specific yield comparison:</strong> Compare actual
                  annual yield (kWh/kWp) against expected yield for the location
                  and orientation (typically 800-1,000 kWh/kWp in the UK)
                </li>
                <li className="pl-1">
                  <strong>Performance ratio:</strong> The ratio of actual energy
                  output to the theoretical maximum -- a healthy system achieves
                  75-85%
                </li>
                <li className="pl-1">
                  <strong>Inverter monitoring:</strong> Most inverters log daily
                  and monthly yields -- compare trends year-on-year to detect
                  gradual degradation
                </li>
                <li className="pl-1">
                  <strong>String comparison:</strong> In multi-string systems,
                  compare string performance -- one underperforming string
                  indicates a module or wiring fault
                </li>
                <li className="pl-1">
                  <strong>Thermal imaging:</strong> Identify hotspots, bypass
                  diode activation and connection faults during peak irradiance
                </li>
              </ul>
            </div>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">
                Common Degradation Mechanisms
              </h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>PID (Potential Induced Degradation):</strong> Leakage
                  currents through encapsulant degrade cell performance -- more
                  severe in humid conditions
                </li>
                <li className="pl-1">
                  <strong>LID (Light Induced Degradation):</strong> Initial 1-3%
                  output loss in the first hours of exposure -- a normal
                  characteristic of crystalline silicon
                </li>
                <li className="pl-1">
                  <strong>Snail trails:</strong> Silver-coloured discolouration
                  along cell micro-cracks -- cosmetic initially but indicates
                  moisture ingress risk
                </li>
                <li className="pl-1">
                  <strong>Delamination:</strong> Separation of encapsulant from
                  glass or cells -- allows moisture ingress causing corrosion
                  and earth faults
                </li>
                <li className="pl-1">
                  <strong>Hotspots:</strong> Localised heating caused by cell
                  damage, shading or connection failure -- fire risk if severe
                </li>
                <li className="pl-1">
                  <strong>Connector degradation:</strong> MC4 connectors exposed
                  to UV and thermal cycling -- arcing risk from corroded or
                  loose connections
                </li>
              </ul>
            </div>
            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Under ST1426, maintenance technicians must
              demonstrate knowledge of PV system operation and maintenance. This
              includes understanding performance assessment, degradation
              mechanisms, and the safety implications of system faults. Practical
              competence in PV inspection supports the emerging technologies
              knowledge requirement of the standard.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* ---- FAQs ---- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">
            Common Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="pb-4 border-b border-white/5 last:border-0"
              >
                <h3 className="text-sm font-medium text-white mb-1">
                  {faq.question}
                </h3>
                <p className="text-sm text-white/90 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* ---- Quick Reference ---- */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">
              Quick Reference
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">
                  PV System Essentials
                </p>
                <ul className="space-y-0.5">
                  <li>PV cell: ~0.5-0.6 V per cell</li>
                  <li>Module: ~40 V open circuit (400 W)</li>
                  <li>String: 300-600 V DC (lethal in daylight)</li>
                  <li>Mono: 20-22% efficiency</li>
                  <li>Poly: 15-17% efficiency</li>
                  <li>Degradation: ~0.5%/year normal</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">
                  Standards and Safety
                </p>
                <ul className="space-y-0.5">
                  <li>BS 7671 Section 712 (PV installations)</li>
                  <li>G98: up to 3.68 kW/phase (fit and notify)</li>
                  <li>G99: above 3.68 kW/phase (apply first)</li>
                  <li>MCS MIS 3002 installation standard</li>
                  <li>DC isolator adjacent to inverter</li>
                  <li>Fire-resistant DC cable inside buildings</li>
                  <li>Dual-supply labels at origin and meter</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ---- Quiz ---- */}
        <section className="mb-10">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        {/* ---- Navigation ---- */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section6-2">
              Next: Wind and Other Renewables
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default MOETModule3Section6_1;
