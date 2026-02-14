import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PenTool,
  Shield,
  Zap,
  FileCheck2,
  ClipboardCheck,
  GraduationCap,
  Calculator,
  Home,
  Camera,
  Send,
  Brain,
  BookOpen,
  Ruler,
  ShieldCheck,
  Activity,
  Gauge,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Electrical Design', href: '/guides/electrical-design-guide' },
];

const tocItems = [
  { id: 'design-process', label: 'The BS 7671 Design Process' },
  { id: 'general-characteristics', label: 'Assessment of General Characteristics' },
  { id: 'design-current', label: 'Determining Design Current' },
  { id: 'cable-selection', label: 'Cable Selection and Sizing' },
  { id: 'protection-coordination', label: 'Protection Coordination' },
  { id: 'voltage-drop', label: 'Voltage Drop Calculations' },
  { id: 'earthing-bonding', label: 'Earthing and Bonding Design' },
  { id: 'discrimination', label: 'Discrimination Between Devices' },
  { id: 'for-electricians', label: 'For Electricians: Design Tools' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Every electrical installation must be designed in accordance with BS 7671 Part 3 (Assessment of General Characteristics) before any work begins — covering supply characteristics, load assessment, earthing arrangement, and external influences.',
  'Cable selection involves a systematic process: determine design current (Ib), select protective device rating (In), apply correction factors (Ca, Cg, Ci, Cf), calculate tabulated current-carrying capacity (It), and verify from the tables in BS 7671 Appendix 4.',
  'Protection coordination ensures that protective devices disconnect the supply within the required time for both overload (In >= Ib and I2 <= 1.45 x Iz) and fault conditions (the device operates within the maximum disconnection time for the circuit type).',
  'Voltage drop must not exceed 3% for lighting circuits and 5% for other circuits (from the origin of the installation to the load) under BS 7671 Appendix 4.',
  "Elec-Mate's AI Circuit Designer helps electricians with cable sizing, voltage drop calculations, and protection coordination — producing BS 7671 compliant designs on your phone.",
];

const faqs = [
  {
    question: 'What is the design process for an electrical installation under BS 7671?',
    answer:
      'The design process under BS 7671 follows a structured sequence set out primarily in Part 3 (Assessment of General Characteristics) and Part 4 (Protection for Safety). The process is: (1) Assess the general characteristics — determine the supply characteristics (voltage, frequency, prospective fault current, earthing arrangement), the purpose and nature of the installation, the external influences (temperature, moisture, mechanical stress), and the compatibility of equipment. (2) Determine the design current (Ib) for each circuit based on the connected load and diversity. (3) Select the type and rating of the protective device (In) — this must be equal to or greater than the design current. (4) Select the cable type and cross-sectional area, applying correction factors for ambient temperature, grouping, thermal insulation, and installation method. The tabulated current-carrying capacity must meet or exceed the required capacity after correction factors are applied. (5) Verify that the circuit meets the voltage drop limits (3% for lighting, 5% for other circuits). (6) Verify that the protective devices will disconnect within the required time for earth faults. (7) Verify that the protective devices provide adequate protection against overload. (8) Document the design on the appropriate certificate (EIC for new work).',
  },
  {
    question: 'What are the BS 7671 correction factors and how do I apply them?',
    answer:
      "Correction factors reduce the current-carrying capacity of a cable to account for the actual installation conditions, which may be less favourable than the reference conditions used to derive the tabulated values. The main correction factors are: Ca (ambient temperature) — if the ambient temperature exceeds the reference temperature (typically 30 degrees C for PVC cables in air), the cable can carry less current. Ca values are found in BS 7671 Table 4B1. Cg (grouping) — when cables are installed together, they generate heat that reduces each cable's capacity. Cg values depend on the number of circuits grouped together, the installation method, and whether the cables are touching. Values are in Table 4C1 to 4C5. Ci (thermal insulation) — if a cable passes through or is enclosed in thermal insulation, its ability to dissipate heat is reduced. Ci values range from 0.5 (fully enclosed) to 1.0 (no insulation contact). Values are in Table 52.2. Cf (semi-enclosed fuse factor) — if a semi-enclosed (rewirable) fuse is used for overcurrent protection, a factor of 0.725 is applied. The formula is: It = In / (Ca x Cg x Ci x Cf), where It is the minimum tabulated current-carrying capacity required.",
  },
  {
    question: 'How do I calculate voltage drop for a circuit?',
    answer:
      'Voltage drop is calculated using the mV/A/m values from the cable tables in BS 7671 Appendix 4. The formula is: Voltage drop (V) = (mV/A/m x Ib x L) / 1000, where mV/A/m is the voltage drop per ampere per metre for the cable type and size (from the relevant table), Ib is the design current in amperes, and L is the cable route length in metres. For three-phase circuits, use the three-phase mV/A/m values. The maximum permitted voltage drop from the origin of the installation to the load is 3% of the nominal supply voltage for lighting circuits (6.9V for a 230V supply) and 5% for other circuits (11.5V for a 230V supply). These limits are specified in BS 7671 Appendix 4, Table 4Ab. If the calculated voltage drop exceeds the limit, you need to either increase the cable size (lower mV/A/m) or reduce the circuit length (shorter cable route). For circuits with varying loads (such as a ring circuit), the voltage drop calculation considers the distribution of load around the ring.',
  },
  {
    question: 'What is protection coordination and why is it important?',
    answer:
      'Protection coordination ensures that protective devices (MCBs, fuses, RCDs, RCBOs) will disconnect the supply quickly enough to prevent danger in both overload and fault conditions. There are two key aspects: Overload protection — the protective device must satisfy two conditions: (1) In >= Ib (the device rated current must be equal to or greater than the design current), and (2) I2 <= 1.45 x Iz (the device operating current must not exceed 1.45 times the cable current-carrying capacity). I2 is the current at which the device will definitely operate within the conventional time — for MCBs, I2 = 1.45 x In, so the second condition simplifies to In <= Iz. Fault protection — the protective device must disconnect the circuit within the maximum disconnection time specified in BS 7671 Table 41.1: 0.4 seconds for final circuits up to 63A in a TN system, 0.2 seconds for final circuits up to 32A in a TT system, and 5 seconds for distribution circuits. To verify this, you must check that the earth fault loop impedance (Zs) at the most remote point of the circuit does not exceed the maximum value for the device type, rating, and disconnection time.',
  },
  {
    question: 'How do I assess the general characteristics of an installation?',
    answer:
      'Part 3 of BS 7671 requires the designer to assess the general characteristics of the installation before detailed circuit design begins. This assessment covers five key areas: (1) Purpose, supplies, and structure (Chapter 31) — determine the maximum demand, the number and type of circuits required, the supply characteristics (voltage, frequency, prospective fault current at the origin), and the type of earthing arrangement (TN-S, TN-C-S, or TT). (2) External influences (Chapter 32) — assess the environmental conditions that will affect the installation: ambient temperature, presence of water, mechanical stress, presence of corrosive substances, impact, vibration, flora, fauna, electromagnetic influences, and solar radiation. Each external influence is classified using the coding system in Appendix 5. (3) Compatibility (Chapter 33) — ensure that equipment is compatible with the characteristics of the supply and the environment. For example, electronic equipment may need protection against voltage transients, and installations with harmonic-generating loads may need special consideration for neutral sizing. (4) Maintainability (Chapter 34) — design the installation so it can be safely maintained, tested, and inspected throughout its service life. Provide adequate labelling, access to equipment, and isolation facilities.',
  },
  {
    question: 'What earthing arrangement should I use for a domestic installation?',
    answer:
      'The earthing arrangement for a domestic installation in the UK is determined by the type of earth provided by the Distribution Network Operator (DNO). The three main types are: TN-S (separate earth) — the DNO provides a separate earth conductor, typically the metallic sheath of the supply cable. This is the most reliable earthing arrangement with a low earth fault loop impedance, typically found in older urban areas with lead-sheathed cables. TN-C-S (PME / Protective Multiple Earthing) — the DNO provides an earth connection derived from the combined neutral and earth conductor of the supply. This is the most common earthing arrangement for new domestic installations. It provides a reliable low-impedance earth but has specific requirements for bonding to gas, water, and other metallic services. BS 7671 imposes additional requirements for PME installations, particularly regarding bathroom installations, EV charging, and outdoor circuits. TT (earth rod) — no earth is provided by the DNO. The installation relies on a local earth electrode (typically a driven earth rod). Common in rural areas. TT systems have a higher earth fault loop impedance and require RCD protection on all circuits to achieve adequate disconnection times. The designer must verify the earthing arrangement with the DNO and design the installation accordingly.',
  },
  {
    question: 'How do I determine the design current for a circuit?',
    answer:
      "The design current (Ib) is the expected current that the circuit will carry under normal operating conditions. For fixed loads (such as an electric shower, immersion heater, or cooker), the design current is calculated from the rated power and the supply voltage using the formula: Ib = P / V for single-phase, or Ib = P / (sqrt(3) x VL) for three-phase balanced loads. For socket outlet circuits, the design current is based on the assumed maximum demand with diversity applied. BS 7671 does not prescribe diversity factors — these are typically taken from the IET On-Site Guide or the Electrician's Guide to the Building Regulations. Common diversity assumptions include: ring circuit (socket outlets) — 100% of the first 10A plus 40% of the remainder, which gives a design current of approximately 20A for a typical domestic ring; lighting circuit — 66% of the total connected load; cooker circuit — 10A plus 30% of the rated power above 10A, plus 5A if the cooker control unit has a socket outlet. The design current must be determined before the protective device can be selected and the cable can be sized.",
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Calculate the correct cable size for any circuit with correction factors, voltage drop, and fault protection.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/voltage-drop-guide-bs-7671',
    title: 'Voltage Drop Guide',
    description: 'Complete guide to voltage drop calculations under BS 7671 with worked examples.',
    icon: Activity,
    category: 'Guide',
  },
  {
    href: '/guides/correction-factors-guide',
    title: 'Correction Factors Guide',
    description:
      'How to apply Ca, Cg, Ci, and Cf correction factors for cable sizing under BS 7671.',
    icon: Ruler,
    category: 'Guide',
  },
  {
    href: '/guides/earthing-arrangements',
    title: 'Earthing Arrangements',
    description:
      'TN-S, TN-C-S, and TT earthing systems explained — characteristics, advantages, and BS 7671 requirements.',
    icon: Shield,
    category: 'Guide',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description: 'Complete reference to the IET Wiring Regulations with Amendment 3 changes.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/training/18th-edition',
    title: '18th Edition Course',
    description: 'Study for C&G 2382 with structured training courses on the Elec-Mate platform.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'design-process',
    heading: 'The BS 7671 Electrical Design Process',
    content: (
      <>
        <p>
          Every electrical installation — from a single additional socket to a full house rewire —
          requires a design. The design process is set out in{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          (the IET Wiring Regulations, 18th Edition with Amendment 3) and follows a structured
          sequence that ensures the completed installation is safe, functional, and compliant.
        </p>
        <p>
          The design process is not just for large commercial installations. Even a domestic
          consumer unit upgrade or an additional circuit for an EV charger requires the designer to
          work through the same logical steps: assess the supply, determine the load, select the
          protection, size the cable, verify voltage drop, and confirm fault protection.
        </p>
        <p>
          The design is documented on the Electrical Installation Certificate (EIC), which includes
          a section for design information. The designer signs the EIC to confirm that the
          installation has been designed in accordance with BS 7671.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">The Design Sequence</h3>
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>Assessment of general characteristics (Part 3)</li>
            <li>Determination of design current (Ib) for each circuit</li>
            <li>Selection of protective device type and rating (In)</li>
            <li>Cable selection — type, size, and installation method</li>
            <li>Verification of voltage drop</li>
            <li>Verification of earth fault loop impedance and disconnection time</li>
            <li>Verification of overload protection coordination</li>
            <li>Documentation on the EIC</li>
          </ol>
        </div>
      </>
    ),
  },
  {
    id: 'general-characteristics',
    heading: 'Assessment of General Characteristics (Part 3)',
    content: (
      <>
        <p>
          Part 3 of BS 7671 requires the designer to assess the general characteristics of the
          installation before any detailed circuit design begins. This is the foundation of the
          entire design — if you get this wrong, everything that follows is compromised.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Supply characteristics (Chapter 31).</strong> Determine the nominal voltage
                (typically 230V single-phase or 400V three-phase in the UK), frequency (50Hz),
                prospective fault current at the origin (obtained from the DNO or measured), and the
                maximum demand of the installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing arrangement.</strong> Identify the type of earthing system — TN-S,
                TN-C-S (PME), or TT. This is determined by the DNO and fundamentally affects the
                design of the{' '}
                <SEOInternalLink href="/guides/earthing-arrangements">
                  earthing and bonding
                </SEOInternalLink>
                , the selection of protective devices, and the maximum earth fault loop impedance
                values.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>External influences (Chapter 32).</strong> Assess environmental conditions:
                ambient temperature, presence of water, mechanical impacts, corrosive substances,
                vibration, and any other factors that affect the choice of equipment, cables, and
                installation methods.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Compatibility (Chapter 33).</strong> Consider electromagnetic compatibility,
                harmonic distortion, voltage fluctuations, and the compatibility of equipment with
                the supply characteristics.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Maintainability (Chapter 34).</strong> Design the installation to allow safe
                maintenance, inspection, and testing throughout its service life. Provide isolation
                and switching devices, clear labelling, and adequate access.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The assessment of general characteristics should be recorded and is part of the design
          documentation. It informs every subsequent design decision, from cable type to protective
          device selection.
        </p>
      </>
    ),
  },
  {
    id: 'design-current',
    heading: 'Determining Design Current (Ib)',
    content: (
      <>
        <p>
          The design current (Ib) is the current that the circuit is expected to carry under normal
          operating conditions. It is the starting point for selecting the protective device and
          sizing the cable.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fixed loads:</strong> Ib = P / V (single-phase) or Ib = P / (1.732 x VL)
                (three-phase balanced). For example, a 9.5kW electric shower on a 230V supply: Ib =
                9500 / 230 = 41.3A.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Socket circuits:</strong> Use diversity factors from the IET On-Site Guide.
                For a domestic ring circuit: 100% of the first 10A plus 40% of the remainder. A
                typical domestic ring has a design current of approximately 20A.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lighting circuits:</strong> Sum the wattage of all connected light fittings
                and apply 66% diversity. For a circuit with 1,200W total connected load: Ib = (1200
                x 0.66) / 230 = 3.4A.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cooker circuits:</strong> 10A plus 30% of the remaining load plus 5A if a
                socket outlet is included. For a 12kW cooker: Ib = 10 + (0.3 x ((12000/230) - 10)) +
                5 = 10 + 12.7 + 5 = 27.7A.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Getting the design current right is critical. An underestimated Ib could result in an
          undersized cable that overheats under normal load. An overestimated Ib wastes money on
          unnecessarily large cables and protective devices.
        </p>
      </>
    ),
  },
  {
    id: 'cable-selection',
    heading: 'Cable Selection and Sizing',
    content: (
      <>
        <p>
          Cable selection is the core of electrical design. The process involves determining the
          minimum cable size that can carry the design current safely, taking into account the
          installation conditions that reduce the cable's capacity.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">The Cable Sizing Formula</h3>
          <p className="text-white mb-4">It &gt;= In / (Ca x Cg x Ci x Cf)</p>
          <ul className="space-y-3 text-white text-sm">
            <li>
              <strong>It</strong> — minimum tabulated current-carrying capacity required
            </li>
            <li>
              <strong>In</strong> — rated current of the protective device
            </li>
            <li>
              <strong>Ca</strong> — ambient temperature correction factor (Table 4B1)
            </li>
            <li>
              <strong>Cg</strong> — grouping correction factor (Tables 4C1 to 4C5)
            </li>
            <li>
              <strong>Ci</strong> — thermal insulation correction factor (Table 52.2)
            </li>
            <li>
              <strong>Cf</strong> — semi-enclosed fuse factor (0.725 for BS 3036 fuses, 1.0
              otherwise)
            </li>
          </ul>
        </div>
        <p>
          Once you have calculated It, refer to the current-carrying capacity tables in Appendix 4
          of BS 7671 to find the cable size with a tabulated capacity equal to or greater than It.
          The table you use depends on the cable type (PVC, XLPE, MICC) and the installation method
          (clipped direct, in conduit, in trunking, in thermal insulation).
        </p>
        <p>
          After selecting the cable size for current-carrying capacity, you must also verify that it
          meets the{' '}
          <SEOInternalLink href="/guides/voltage-drop-guide-bs-7671">
            voltage drop limits
          </SEOInternalLink>{' '}
          and that the earth fault loop impedance at the extremity of the circuit is low enough for
          the protective device to disconnect within the required time.
        </p>
        <SEOAppBridge
          title="Size cables instantly with Elec-Mate"
          description="Elec-Mate's cable sizing calculator applies all correction factors automatically, checks voltage drop, and verifies fault protection — giving you a BS 7671 compliant cable size in seconds."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'protection-coordination',
    heading: 'Protection Coordination: Overload and Fault',
    content: (
      <>
        <p>
          Protection coordination ensures that the protective devices will operate correctly in both
          overload and fault conditions. There are two separate requirements that must both be
          satisfied:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Overload Protection</h3>
            <div className="space-y-2 text-white text-sm leading-relaxed">
              <p>Two conditions must be met:</p>
              <p>
                <strong>Condition 1:</strong> In &gt;= Ib
              </p>
              <p>The device rated current must be equal to or greater than the design current.</p>
              <p>
                <strong>Condition 2:</strong> I2 &lt;= 1.45 x Iz
              </p>
              <p>
                The device effective operating current must not exceed 1.45 times the cable's
                current-carrying capacity. For MCBs where I2 = 1.45 x In, this simplifies to In
                &lt;= Iz.
              </p>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Fault Protection</h3>
            <div className="space-y-2 text-white text-sm leading-relaxed">
              <p>The device must disconnect within:</p>
              <p>
                <strong>0.4 seconds</strong> for final circuits up to 63A (TN systems)
              </p>
              <p>
                <strong>0.2 seconds</strong> for final circuits up to 32A (TT systems)
              </p>
              <p>
                <strong>5 seconds</strong> for distribution circuits
              </p>
              <p>
                This is verified by checking the earth fault loop impedance (Zs) at the most remote
                point does not exceed the maximum value for the device.
              </p>
            </div>
          </div>
        </div>
        <p>
          The maximum earth fault loop impedance values for each device type (BS EN 60898, BS EN
          61009, BS 88, BS 3036) and rating are given in the tables in BS 7671 Chapter 41. The
          measured or calculated Zs at the extremity of the circuit must not exceed these values. If
          it does, you need to either increase the cable size (to reduce the circuit impedance) or
          select a device with a higher fault current sensitivity.
        </p>
      </>
    ),
  },
  {
    id: 'voltage-drop',
    heading: 'Voltage Drop Calculations',
    content: (
      <>
        <p>
          Voltage drop occurs because the cable has resistance — as current flows through the cable,
          some voltage is "lost" across the cable impedance. Excessive voltage drop can cause
          equipment to malfunction (lights dimming, motors overheating) and is limited by BS 7671.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Ruler className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Maximum voltage drop:</strong> 3% for lighting circuits (6.9V on 230V) and
                5% for all other circuits (11.5V on 230V), measured from the origin of the
                installation to the load.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Ruler className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Formula:</strong> Voltage drop (V) = (mV/A/m x Ib x L) / 1000, where mV/A/m
                is from the cable tables, Ib is the design current, and L is the cable route length
                in metres.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Ruler className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>If voltage drop exceeds the limit:</strong> increase the cable size (lower
                mV/A/m value) or reduce the cable route length. Cable size may need to be increased
                beyond what current-carrying capacity alone requires.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Ruler className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Worked example:</strong> A 32A radial circuit using 4mm2 T&E (clipped
                direct, mV/A/m = 11), design current 28A, cable length 25m. Voltage drop = (11 x 28
                x 25) / 1000 = 7.7V. As a percentage: 7.7 / 230 x 100 = 3.35%. This is within the 5%
                limit for a socket circuit but would exceed the 3% limit if this were a lighting
                circuit.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Voltage drop is often the factor that determines cable size for long cable runs — even
          when the cable has adequate current-carrying capacity, it may not meet the voltage drop
          limit. Always check both criteria.
        </p>
      </>
    ),
  },
  {
    id: 'earthing-bonding',
    heading: 'Earthing and Bonding Design',
    content: (
      <>
        <p>
          The{' '}
          <SEOInternalLink href="/guides/earthing-arrangements">
            earthing and bonding arrangement
          </SEOInternalLink>{' '}
          is a fundamental part of the design. It provides the path for earth fault current to flow,
          enabling protective devices to disconnect the supply and preventing dangerous touch
          voltages on exposed metalwork.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Main earthing terminal</strong> — connects the installation earth to the
                means of earthing (DNO earth for TN systems, earth electrode for TT systems).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Main protective bonding conductors</strong> — connect incoming metallic
                services (gas, water, oil) to the main earthing terminal. Minimum size: 10mm2 for
                TN-S and TN-C-S, 6mm2 for TT (subject to the requirements of Table 54.8).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Circuit protective conductors (CPCs)</strong> — the earth conductor in each
                circuit cable. Size determined by the adiabatic equation or by Table 54.7 (minimum
                CPC size relative to the line conductor size).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Supplementary bonding</strong> — additional bonding between simultaneously
                accessible exposed-conductive-parts and extraneous-conductive-parts in specific
                locations (e.g., bathrooms under certain conditions).
              </span>
            </li>
          </ul>
        </div>
        <p>
          The earthing arrangement must be designed to ensure that the earth fault loop impedance at
          every point in the installation is low enough for the protective devices to operate within
          the required disconnection times. For TT systems, where the earth fault loop impedance is
          inherently higher, RCD protection is essential to achieve adequate disconnection.
        </p>
      </>
    ),
  },
  {
    id: 'discrimination',
    heading: 'Discrimination Between Protective Devices',
    content: (
      <>
        <p>
          Discrimination (also called selectivity) means that only the protective device nearest to
          the fault operates, leaving the rest of the installation energised. This is important for
          availability — a fault on one circuit should not disconnect the entire installation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Between MCBs:</strong> discrimination is achieved when the upstream device
                has a higher rating and slower time-current characteristic than the downstream
                device. Generally, a ratio of 2:1 or higher in rated current provides adequate
                discrimination for most overcurrent conditions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Between RCDs:</strong> discrimination requires the upstream RCD to have both
                a higher rated residual operating current (e.g., 100mA vs 30mA) and a time delay
                (Type S or selective RCD). Without a time delay, both RCDs will trip simultaneously.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCBO boards:</strong> provide inherent discrimination for earth faults —
                only the RCBO on the faulty circuit trips, leaving all other circuits energised.
                This is the main advantage of a full RCBO{' '}
                <SEOInternalLink href="/guides/consumer-unit-upgrade">
                  consumer unit
                </SEOInternalLink>{' '}
                over a split-load RCD arrangement.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Good discrimination is essential for commercial and industrial installations where loss of
          power can have serious consequences. In domestic installations, a full RCBO board provides
          the best discrimination for the consumer — a single faulty circuit does not plunge the
          entire house into darkness.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Design Tools in Elec-Mate',
    content: (
      <>
        <p>
          Electrical design requires calculations that are time-consuming to do by hand but
          essential for compliance. Elec-Mate puts these design tools on your phone, so you can
          complete the design on site and produce the certificate immediately.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Brain className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI Circuit Designer</h4>
                <p className="text-white text-sm leading-relaxed">
                  Describe the circuit you need — "9.5kW shower, 18m cable run, clipped to joist, 3
                  other cables grouped" — and the AI calculates the design current, applies
                  correction factors, selects the cable size, checks voltage drop, and verifies
                  fault protection. All in seconds.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Camera className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Calculators On Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Cable sizing, voltage drop, adiabatic equation, maximum demand, prospective fault
                  current — all the BS 7671 calculations you need, available on your phone, with
                  results you can copy directly into the certificate.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Design circuits on your phone with AI"
          description="Join 430+ UK electricians using Elec-Mate's AI Circuit Designer and BS 7671 calculators. Cable sizing, voltage drop, fault protection — all calculated instantly. 7-day free trial."
          icon={PenTool}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalDesignGuidePage() {
  return (
    <GuideTemplate
      title="Electrical Design Guide | BS 7671 Design Process"
      description="Complete guide to electrical design under BS 7671. Assessment of general characteristics, design current, cable selection with correction factors, protection coordination, voltage drop, earthing and bonding, and discrimination."
      datePublished="2025-10-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Design Guide"
      badgeIcon={PenTool}
      heroTitle={
        <>
          Electrical Design Guide:{' '}
          <span className="text-yellow-400">The BS 7671 Design Process</span>
        </>
      }
      heroSubtitle="Good electrical design is the foundation of a safe, compliant installation. This guide walks through the entire BS 7671 design process — from assessing general characteristics and determining design current, through cable selection and correction factors, to protection coordination and voltage drop verification."
      readingTime={15}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Design"
      relatedPages={relatedPages}
      ctaHeading="AI-Powered Electrical Design on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate's AI Circuit Designer, cable sizing calculator, and BS 7671 design tools. Complete the design and certificate on site. 7-day free trial."
    />
  );
}
