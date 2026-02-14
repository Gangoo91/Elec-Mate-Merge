import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  Calculator,
  Activity,
  BookOpen,
  FileText,
  Gauge,
  ShieldCheck,
  AlertTriangle,
  Cable,
  GraduationCap,
  Flame,
  BarChart3,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Calculators', href: '/tools/electrical-testing-calculators' },
  { label: 'PFC Explained', href: '/guides/prospective-fault-current-explained' },
];

const tocItems = [
  { id: 'what-is-pfc', label: 'What Is Prospective Fault Current?' },
  { id: 'why-it-matters', label: 'Why PFC Matters' },
  { id: 'types-of-fault', label: 'Types of Fault Current' },
  { id: 'how-to-measure', label: 'How to Measure PFC' },
  { id: 'maximum-values', label: 'Maximum Values and Switchgear Ratings' },
  { id: 'relationship-to-devices', label: 'PFC and Protective Device Selection' },
  { id: 'adiabatic-equation', label: 'PFC and the Adiabatic Equation' },
  { id: 'using-elec-mate', label: 'Using the Elec-Mate PFC Calculator' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Prospective fault current (PFC) is the maximum current that would flow if a fault of negligible impedance occurred at a given point in the installation — before any protective device operates.',
  'BS 7671 Regulation 434.1 requires that every protective device has a rated breaking capacity at least equal to the prospective fault current at the point where it is installed.',
  'PFC is measured at the origin of the installation using a PFC/loop impedance tester. The supply company also provides a maximum PFC value (Ip) on the supply characteristics.',
  'If the PFC exceeds the breaking capacity of the protective device, the device may fail to clear the fault safely — resulting in an explosion, fire, or sustained arcing.',
  'Elec-Mate includes a PFC calculator alongside 50+ other calculators including cable sizing, voltage drop, Zs, max demand, adiabatic equation, conduit fill, trunking fill, and power factor.',
];

const faqs = [
  {
    question:
      'What is the difference between prospective fault current and earth fault loop impedance?',
    answer:
      'Prospective fault current (PFC or Ip) is the maximum current that would flow at a given point during a fault, before any protective device operates. Earth fault loop impedance (Zs) is the total impedance of the fault loop path for an earth fault — from the point of fault, through the protective conductor back to the transformer, and via the phase conductor to the point of fault. PFC and Zs are inversely related: a lower Zs means a higher fault current (PFC = V/Zs approximately). Both values are measured during testing and recorded on the EICR or EIC. PFC is used to verify that the protective device can safely interrupt the fault. Zs is used to verify that the protective device will operate quickly enough to disconnect the supply within the required disconnection time (0.4 seconds for final circuits, 5 seconds for distribution circuits).',
  },
  {
    question: 'How do I measure PFC on site?',
    answer:
      'PFC is measured at the origin of the installation (at the incoming supply terminals, before the main switch) using a multifunction tester or a dedicated PFC/loop impedance meter. The instrument injects a known current (or voltage) and measures the supply impedance, then calculates the prospective fault current from the supply voltage and measured impedance. Most modern multifunction testers (Megger, Fluke, Metrel) have a dedicated PFC function that gives a direct readout in kA. The measurement should be taken phase-to-neutral (for the prospective short-circuit current, Ipsn) and phase-to-earth (for the prospective earth fault current, Ipef). The higher of the two values is the PFC that must be compared against the breaking capacity of the protective devices. Always measure PFC before starting any other testing — it is the first live test in the testing sequence.',
  },
  {
    question: 'What is a typical PFC value for a domestic installation?',
    answer:
      'For a typical domestic single-phase supply in the UK, the PFC at the origin is usually between 1 kA and 6 kA. The exact value depends on the distance from the transformer, the size of the supply cable, and the transformer impedance. Properties close to a distribution transformer may have PFC values of 10 kA or higher. Properties at the end of a long underground supply run may have PFC values as low as 0.5 kA. The DNO declares a maximum PFC for each supply point — this is the value used for design purposes. Standard domestic MCBs and RCBOs typically have a breaking capacity of 6 kA, which is adequate for most domestic installations. If the measured PFC exceeds 6 kA, higher-rated devices (10 kA or 16 kA) must be used.',
  },
  {
    question: 'What happens if the breaking capacity is exceeded?',
    answer:
      'If a fault occurs and the prospective fault current exceeds the rated breaking capacity (Icn or Icu) of the protective device, the device may fail to clear the fault safely. This can result in several dangerous outcomes: the device may explode, ejecting hot gases, molten metal, and debris from the enclosure; the fault arc may not be extinguished, leading to sustained arcing and a fire; the device contacts may weld together, leaving the circuit permanently energised even after the fault; or the device may partially operate but allow a sustained fault current to flow through damaged components, overheating cables and causing fire. This is why BS 7671 Regulation 434.1 requires that the breaking capacity of every protective device must be at least equal to the prospective fault current at the point where the device is installed. It is a fundamental safety requirement with no exceptions.',
  },
  {
    question: 'Do I need to record PFC on the EICR?',
    answer:
      'Yes. The PFC must be measured and recorded on the EICR (Electrical Installation Condition Report) and the EIC (Electrical Installation Certificate). On the EICR, the PFC is recorded in Section C (Supply Characteristics and Earthing Arrangements) as the prospective fault current at the origin of the installation, measured in kA. Both the phase-to-neutral (Ipsn) and phase-to-earth (Ipef) values should be recorded. The inspector must verify that the measured PFC does not exceed the rated breaking capacity of the main protective device and any downstream devices. If the PFC exceeds the breaking capacity of any protective device, this is a C2 (Potentially Dangerous) or C1 (Danger Present) observation that must be recorded and reported.',
  },
  {
    question: 'How does PFC change downstream from the origin?',
    answer:
      'PFC decreases as you move downstream from the origin of the installation, because the impedance of the cables between the origin and the point of measurement adds to the total fault loop impedance. At the origin (the main switch), the PFC is at its highest because the fault path impedance is lowest — it includes only the supply transformer impedance and the service cable impedance. At a distribution board downstream of the main board, the PFC is lower because the impedance of the submain cable is added. At a final circuit point (a socket outlet or light fitting), the PFC is lower still because the impedance of the final circuit cable is added. This means the most critical point for PFC verification is always the origin — if the breaking capacity of the main switch is adequate at the origin, downstream devices with the same or lower PFC are also safe. However, you should still verify that each protective device has adequate breaking capacity for the PFC at its specific location.',
  },
  {
    question: 'What is the maximum PFC allowed for domestic MCBs?',
    answer:
      'Standard domestic MCBs to BS EN 60898 have a rated short-circuit capacity (Icn) of 6 kA, 10 kA, or 16 kA depending on the model. The most common domestic MCBs and consumer units are rated at 6 kA. The 6 kA rating means the MCB can safely interrupt a fault current of up to 6,000 A without exploding or failing to clear the fault. If the measured PFC at the origin exceeds 6 kA, you need to install MCBs with a higher breaking capacity (10 kA or 16 kA) or use a back-up protection arrangement where a higher-rated device upstream limits the fault current seen by the downstream device. BS 7671 Regulation 536.4 covers back-up protection and the conditions under which it is acceptable. In practice, most domestic supplies in the UK have a PFC below 6 kA, making standard 6 kA MCBs adequate.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/prospective-fault-current-calculator',
    title: 'PFC Calculator',
    description:
      'Calculate prospective fault current from supply impedance and verify protective device breaking capacity.',
    icon: Calculator,
    category: 'Calculator',
  },
  {
    href: '/guides/earth-fault-loop-impedance-calculation',
    title: 'Earth Fault Loop Impedance Guide',
    description:
      'Zs calculation, temperature correction, and comparison with maximum Zs values for disconnection times.',
    icon: Gauge,
    category: 'Guide',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables correctly with automatic current-carrying capacity, voltage drop, and fault current verification.',
    icon: Cable,
    category: 'Calculator',
  },
  {
    href: '/tools/adiabatic-equation-calculator',
    title: 'Adiabatic Equation Calculator',
    description: 'Verify cable fault current withstand using the adiabatic equation (k²S² vs I²t).',
    icon: Flame,
    category: 'Calculator',
  },
  {
    href: '/guides/testing-sequence-guide',
    title: 'Testing Sequence Guide',
    description:
      'The correct order for electrical testing including where PFC measurement fits in the sequence.',
    icon: FileText,
    category: 'Guide',
  },
  {
    href: '/guides/three-phase-calculations',
    title: 'Three Phase Calculations',
    description:
      'Power, current, and voltage calculations for three-phase systems including PFC on three-phase supplies.',
    icon: Zap,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-pfc',
    heading: 'What Is Prospective Fault Current?',
    content: (
      <>
        <p>
          Prospective fault current (PFC), also referred to as Ip or Ipf, is the maximum current
          that would flow at a given point in an electrical installation if a fault of negligible
          impedance occurred — that is, a dead short circuit between live conductors, or between a
          live conductor and earth. It is called "prospective" because it describes what would
          happen if a fault occurred, not a current that is actually flowing in normal conditions.
        </p>
        <p>
          PFC is determined by the source impedance of the supply (the transformer and supply cable)
          and the impedance of the installation cables between the supply and the point of fault.
          The lower the total impedance, the higher the fault current. At the origin of a domestic
          installation connected to a relatively close distribution transformer, PFC values of 3 to
          6 kA are typical. Close to a substation, values can exceed 16 kA.
        </p>
        <p>
          BS 7671:2018+A3:2024 requires that the prospective fault current is determined at every
          relevant point in the installation as part of the design and verification process. This is
          covered by Regulation 434.1 (which requires adequate breaking capacity) and Regulation
          612.11 (which requires PFC measurement during initial verification).
        </p>
        <SEOAppBridge
          title="Measure, record, and verify PFC"
          description="Elec-Mate records PFC at the origin as part of the EICR and EIC forms, and automatically checks whether the protective device breaking capacity is adequate. Plus 50+ calculators for cable sizing, Zs, voltage drop, and more."
          icon={Gauge}
        />
      </>
    ),
  },
  {
    id: 'why-it-matters',
    heading: 'Why PFC Matters: The Consequences of Getting It Wrong',
    content: (
      <>
        <p>
          PFC matters because every protective device has a maximum fault current it can safely
          interrupt. If the actual fault current exceeds this rating, the device fails — and the
          consequences can be catastrophic.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Device explosion.</strong> An MCB or fuse subjected to a fault current
                beyond its breaking capacity can physically explode. The arc energy inside the
                device exceeds the quenching capacity of the arc chutes, causing the enclosure to
                rupture. Hot gases, molten copper, and debris are ejected. This can cause serious
                burns and ignite surrounding materials.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sustained arcing.</strong> If the device fails to extinguish the fault arc,
                the arc continues to burn inside the consumer unit or distribution board. Arc
                temperatures exceed 3,000°C — more than enough to melt copper conductors and ignite
                the enclosure and surrounding construction materials.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Welded contacts.</strong> The device contacts may weld together under the
                extreme heat of the fault arc, leaving the circuit permanently energised. The fault
                may clear itself (through cable destruction), but the damaged device can no longer
                provide protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable damage.</strong> While the device struggles to clear the fault, the
                fault current flows through the cables. The energy (I²t) heats the cable conductors
                and insulation. If the clearance time is too long, the cable insulation melts and
                the conductors may fuse together, creating a secondary fire risk.
              </span>
            </li>
          </ul>
        </div>
        <p>
          This is why{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink>{' '}
          Regulation 434.1 states clearly: every protective device must have a rated breaking
          capacity not less than the prospective fault current at the point where it is installed.
          There are no exceptions to this requirement.
        </p>
      </>
    ),
  },
  {
    id: 'types-of-fault',
    heading: 'Types of Fault Current',
    content: (
      <>
        <p>There are two types of prospective fault current that must be considered:</p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">
              Prospective Short-Circuit Current (Ipsn)
            </h3>
            <p className="text-white text-sm leading-relaxed">
              This is the fault current that would flow if a short circuit occurred between the line
              and neutral conductors (or between phases in a three-phase system). It is typically
              the higher of the two values because the neutral conductor provides a low-impedance
              return path. Ipsn is measured phase-to-neutral using a PFC tester at the origin.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">
              Prospective Earth Fault Current (Ipef)
            </h3>
            <p className="text-white text-sm leading-relaxed">
              This is the fault current that would flow if a fault occurred between the line
              conductor and earth (protective conductor). The earth fault current is typically lower
              than the short-circuit current because the earth fault loop impedance includes the
              protective conductor, which usually has a higher impedance than the neutral. Ipef is
              measured phase-to-earth. It is related to the{' '}
              <SEOInternalLink href="/guides/earth-fault-loop-impedance-calculation">
                earth fault loop impedance (Zs)
              </SEOInternalLink>
              .
            </p>
          </div>
        </div>
        <p>
          Both values must be measured and the higher of the two is the PFC that determines the
          required breaking capacity of the protective devices. In most UK domestic installations,
          Ipsn (phase-to-neutral) is higher than Ipef (phase-to-earth). Both are recorded on the
          EICR and EIC.
        </p>
      </>
    ),
  },
  {
    id: 'how-to-measure',
    heading: 'How to Measure PFC on Site',
    content: (
      <>
        <p>
          PFC is measured as part of the{' '}
          <SEOInternalLink href="/guides/testing-sequence-guide">
            initial verification testing sequence
          </SEOInternalLink>{' '}
          and during periodic inspection. It is the first live test performed after the dead tests
          (continuity, insulation resistance, polarity) are complete and the supply is restored.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Test at the origin.</strong> Connect the PFC tester to the incoming supply
              terminals — at the line and neutral terminals of the main switch (or meter tails)
              before any protective devices in the installation. This gives the PFC at the point of
              supply.
            </li>
            <li>
              <strong>Measure phase-to-neutral (Ipsn).</strong> Connect the tester between line and
              neutral. The instrument measures the impedance of the supply (Ze approximately, for
              the neutral path) and calculates the prospective short-circuit current. Record the
              value.
            </li>
            <li>
              <strong>Measure phase-to-earth (Ipef).</strong> Connect the tester between line and
              earth (the main earthing terminal). The instrument measures the external earth fault
              loop impedance (Ze) and calculates the prospective earth fault current. Record the
              value.
            </li>
            <li>
              <strong>Record the higher value.</strong> The higher of Ipsn and Ipef is the PFC that
              must be compared against the breaking capacity of the main switch, consumer unit, and
              individual protective devices.
            </li>
          </ol>
        </div>
        <p>
          Modern multifunction testers (Megger MFT1741, Fluke 1664FC, Metrel MI 3155) display PFC
          directly in kA. Ensure the instrument is calibrated and the test leads are in good
          condition — a poor connection at the test point will give an artificially low reading
          (lower apparent PFC), which could mask a genuine problem.
        </p>
      </>
    ),
  },
  {
    id: 'maximum-values',
    heading: 'Maximum PFC Values and Switchgear Ratings',
    content: (
      <>
        <p>
          Every protective device has a rated breaking capacity — the maximum fault current it can
          safely interrupt. Here are the typical ratings for common devices used in UK
          installations:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4 overflow-x-auto">
          <table className="w-full text-white text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 pr-4 font-semibold">Device Type</th>
                <th className="text-left py-3 pr-4 font-semibold">Standard</th>
                <th className="text-left py-3 pr-4 font-semibold">Typical Icn/Icu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr>
                <td className="py-3 pr-4">Domestic MCB</td>
                <td className="py-3 pr-4">BS EN 60898</td>
                <td className="py-3 pr-4">6 kA (most common), 10 kA, 16 kA</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">RCBO</td>
                <td className="py-3 pr-4">BS EN 61009</td>
                <td className="py-3 pr-4">6 kA or 10 kA</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">Industrial MCB</td>
                <td className="py-3 pr-4">BS EN 60947-2</td>
                <td className="py-3 pr-4">10 kA, 16 kA, 25 kA, 50 kA</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">MCCB</td>
                <td className="py-3 pr-4">BS EN 60947-2</td>
                <td className="py-3 pr-4">16 kA to 150 kA</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">HRC Fuse (BS 88)</td>
                <td className="py-3 pr-4">BS 88-2</td>
                <td className="py-3 pr-4">80 kA</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">Consumer Unit (overall)</td>
                <td className="py-3 pr-4">BS EN 61439-3</td>
                <td className="py-3 pr-4">6 kA, 10 kA, or 16 kA (stated on rating plate)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          The breaking capacity is printed on the device — look for the Icn value (for devices to BS
          EN 60898) or Icu (for devices to BS EN 60947). If the measured PFC exceeds the device
          rating, the device must be replaced with one of adequate rating, or a backup protection
          arrangement must be implemented.
        </p>
      </>
    ),
  },
  {
    id: 'relationship-to-devices',
    heading: 'PFC and Protective Device Selection',
    content: (
      <>
        <p>
          When designing an installation or assessing an existing one, the PFC at each point
          determines which protective devices are suitable:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  At the Origin: Main Switch and Consumer Unit
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  The main switch and consumer unit must have a conditional short-circuit rating at
                  least equal to the PFC at the origin. Most domestic consumer units are rated at 6
                  kA or 10 kA. If the PFC exceeds this, a higher-rated consumer unit or a
                  current-limiting device (such as a BS 88 fuse upstream) is required.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Downstream: Individual MCBs and RCBOs</h4>
                <p className="text-white text-sm leading-relaxed">
                  Each MCB or RCBO must have a rated breaking capacity at least equal to the PFC at
                  its location. The PFC at an MCB inside a consumer unit is slightly lower than at
                  the origin (because the busbars and connections add a small amount of impedance),
                  but for practical purposes in domestic work, the origin PFC is used for all
                  devices in the consumer unit.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Sub-Distribution Boards</h4>
                <p className="text-white text-sm leading-relaxed">
                  For distribution boards fed by a submain cable, the PFC at the sub-board is lower
                  than at the main board because the submain cable impedance reduces the fault
                  current. The{' '}
                  <SEOInternalLink href="/tools/prospective-fault-current-calculator">
                    PFC calculator
                  </SEOInternalLink>{' '}
                  can determine the PFC at a downstream point from the origin PFC and the cable
                  impedance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'adiabatic-equation',
    heading: 'PFC and the Adiabatic Equation',
    content: (
      <>
        <p>
          PFC is also critical for verifying that cables can withstand the fault current energy
          without damage. The{' '}
          <SEOInternalLink href="/tools/adiabatic-equation-calculator">
            adiabatic equation
          </SEOInternalLink>{' '}
          (BS 7671 Regulation 434.5.2) checks whether the cable conductor can survive the thermal
          energy of the fault current for the duration it takes the protective device to clear the
          fault:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4 text-center">
          <p className="text-white text-lg font-mono">k²S² &ge; I²t</p>
          <p className="text-white text-sm mt-3">
            Where <strong>k</strong> is the conductor material constant, <strong>S</strong> is the
            conductor cross-sectional area (mm²), <strong>I</strong> is the fault current (A), and{' '}
            <strong>t</strong> is the disconnection time (s).
          </p>
        </div>
        <p>
          A higher PFC means a higher fault current (I), which means more energy (I²t) that the
          cable must withstand. If the PFC at a point is very high and the disconnection time is not
          fast enough, the cable may be too small to withstand the fault energy — requiring a larger
          cable even though the current-carrying capacity is adequate for the normal load.
        </p>
        <p>
          This is particularly relevant for cables close to the origin of the installation, where
          PFC is highest. For cables further downstream, the PFC is lower and the adiabatic equation
          is usually satisfied by the cable selected for current-carrying capacity. Elec-Mate's
          cable sizing calculator performs this check automatically.
        </p>
        <SEOAppBridge
          title="PFC, adiabatic, and 50+ more calculators"
          description="Elec-Mate includes a PFC calculator, adiabatic equation verifier, cable sizing calculator with fault current checking, Zs calculator, voltage drop, max demand, conduit fill, trunking fill, power factor, and three-phase power. 7-day free trial."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'using-elec-mate',
    heading: 'Using the Elec-Mate PFC Calculator',
    content: (
      <>
        <p>
          Elec-Mate includes a dedicated{' '}
          <SEOInternalLink href="/tools/prospective-fault-current-calculator">
            PFC calculator
          </SEOInternalLink>{' '}
          as part of its suite of 50+ electrical calculators. The PFC calculator helps with both
          design and verification:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Calculate PFC from Impedance</h4>
                <p className="text-white text-sm leading-relaxed">
                  Enter the external earth fault loop impedance (Ze) or the total loop impedance at
                  any point. The calculator computes the prospective fault current using PFC = V /
                  Z, giving you the result in amperes and kA.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Breaking Capacity Verification</h4>
                <p className="text-white text-sm leading-relaxed">
                  Enter the measured PFC and the protective device breaking capacity. The calculator
                  confirms whether the device is adequate or flags a failure. This check is done
                  automatically when you complete an EICR or EIC in Elec-Mate.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Activity className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Full Calculator Suite</h4>
                <p className="text-white text-sm leading-relaxed">
                  PFC is one of over 50 calculators on Elec-Mate. Others include{' '}
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
                    cable sizing
                  </SEOInternalLink>
                  ,{' '}
                  <SEOInternalLink href="/guides/voltage-drop-guide-bs-7671">
                    voltage drop
                  </SEOInternalLink>
                  ,{' '}
                  <SEOInternalLink href="/guides/earth-fault-loop-impedance-calculation">
                    Zs
                  </SEOInternalLink>
                  ,{' '}
                  <SEOInternalLink href="/guides/max-demand-calculation-guide">
                    max demand
                  </SEOInternalLink>
                  , adiabatic equation, conduit fill, trunking fill, power factor, diversity factor,
                  and{' '}
                  <SEOInternalLink href="/guides/three-phase-calculations">
                    three-phase power
                  </SEOInternalLink>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function PFCExplainedPage() {
  return (
    <GuideTemplate
      title="Prospective Fault Current Explained | PFC Guide"
      description="Complete guide to prospective fault current (PFC) for UK electricians. What PFC is, why it matters, how to measure it on site, maximum values for domestic and commercial supplies, switchgear breaking capacity ratings, and the adiabatic equation."
      datePublished="2025-05-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Technical Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          Prospective Fault Current:{' '}
          <span className="text-yellow-400">What Every Electrician Must Know</span>
        </>
      }
      heroSubtitle="If the fault current exceeds the breaking capacity of the protective device, the device can explode. PFC is one of the most critical measurements in electrical testing — and one of the most commonly misunderstood. This guide explains what PFC is, how to measure it, and why it matters for every installation."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Prospective Fault Current"
      relatedPages={relatedPages}
      ctaHeading="PFC Calculator in Your Pocket"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate's 50+ calculators including PFC, Zs, cable sizing, voltage drop, adiabatic equation, and more. 7-day free trial, cancel anytime."
    />
  );
}
