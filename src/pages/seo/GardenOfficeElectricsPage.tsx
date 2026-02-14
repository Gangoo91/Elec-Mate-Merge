import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Sun,
  Cable,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Calculator,
  Zap,
  Wrench,
  Wifi,
  Thermometer,
  GraduationCap,
  ClipboardCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Garden Office', href: '/guides/garden-office-electrics' },
];

const tocItems = [
  { id: 'overview', label: 'Garden Office Electrics Overview' },
  { id: 'swa-cable-run', label: 'SWA Cable Run' },
  { id: 'dedicated-circuit', label: 'Dedicated Circuit and Distribution' },
  { id: 'part-p-notification', label: 'Part P Notification' },
  { id: 'ip-rated-accessories', label: 'IP-Rated Accessories' },
  { id: 'heating-cooling', label: 'Heating and Cooling' },
  { id: 'data-cabling', label: 'Data Cabling and Connectivity' },
  { id: 'testing-certification', label: 'Testing and Certification' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A garden office requires a dedicated electrical supply, typically via SWA (Steel Wire Armoured) cable buried underground from the house consumer unit to a sub-distribution board in the outbuilding.',
  'The installation is notifiable under Part P of the Building Regulations — it must be carried out by a competent person scheme member or notified to building control.',
  'IP-rated accessories (IP44 minimum, IP55 recommended) are required for outbuildings that may experience condensation, temperature fluctuation, or moisture ingress.',
  'Heating, data cabling, and Wi-Fi connectivity should be planned as part of the electrical design — retrofitting is disruptive and costly.',
  'Elec-Mate cable sizing calculator handles SWA derating for direct burial and voltage drop calculations for the full cable run from the house to the garden office.',
];

const faqs = [
  {
    question: 'Do I need Part P notification for a garden office electrical supply?',
    answer:
      'Yes. Running a new circuit from the house to a garden office is notifiable work under Approved Document P of the Building Regulations. This applies regardless of the size of the garden office or whether it has planning permission. The simplest route is to use an electrician registered with a competent person scheme (NICEIC, NAPIT, ELECSA) who will self-certify the work and notify building control. If you use an unregistered electrician, a building control application must be made before work starts, and building control will inspect the installation before sign-off. The Part P completion certificate is important — if you sell the property, a buyer solicitor will ask for it, and its absence can delay or prevent the sale.',
  },
  {
    question: 'What size SWA cable do I need for a garden office?',
    answer:
      'The SWA cable size depends on the total load (lighting, sockets, heating, and any specialist equipment), the length of the cable run, and the voltage drop. For a typical garden office with LED lighting, 4 to 6 double sockets, a 2kW panel heater, and a small air conditioning unit, the total load is typically 3 to 5kW. For a cable run up to 20 metres, a 4.0mm 3-core SWA is usually sufficient. For runs of 20 to 40 metres or higher loads (for example, if an electric shower or large workshop tools are included), 6.0mm or 10.0mm may be required. Use the Elec-Mate cable sizing calculator to determine the exact size — enter the load, cable length, and burial conditions, and the calculator applies all derating and voltage drop factors automatically.',
  },
  {
    question: 'Does a garden office need its own consumer unit?',
    answer:
      'It is strongly recommended. A sub-distribution board (small consumer unit) in the garden office provides local isolation, individual circuit protection, and RCD protection for all circuits. It also makes future modifications easier — adding an extra socket circuit or a dedicated circuit for a heater is straightforward if there are spare ways in the board. The alternative — running individual cables for each circuit from the main house board — is impractical for most garden office installations because of the cable run distance, the number of circuits needed, and the lack of local isolation. A 4-way or 6-way metal consumer unit with RCBOs is the standard specification for a garden office sub-board.',
  },
  {
    question: 'Can I run an extension lead from the house to a garden office?',
    answer:
      'This is not a safe or compliant solution. Extension leads are intended for temporary use, not as a permanent supply. They are not weatherproof, they present a trip hazard across the garden, and they cannot provide the overcurrent and RCD protection required by BS 7671. A garden office used as a permanent workspace must have a proper fixed electrical installation with a buried SWA cable, sub-distribution board, and wired circuits. This protects the occupant from electric shock, reduces fire risk, and ensures the installation is insurable. An insurance company may refuse a claim for damage or injury if the garden office is supplied by an extension lead rather than a compliant fixed installation.',
  },
  {
    question: 'What heating options work for a garden office?',
    answer:
      'The most common heating options for a garden office are electric panel heaters (1kW to 2kW), infrared heaters, fan heaters, or an air conditioning unit that provides both heating and cooling (a heat pump). Electric panel heaters are simple to install — they require a standard 13A socket or a fused connection unit. Infrared heaters are energy-efficient but require careful positioning. An air conditioning / heat pump unit is the most effective option for year-round comfort but requires a dedicated circuit (typically 16A or 20A) and professional installation by an F-Gas registered engineer for the refrigerant. Underfloor heating is possible if the garden office has a suitable floor construction. Whatever the heating method, ensure the electrical supply is sized for the heating load in addition to the lighting, sockets, and equipment loads.',
  },
  {
    question: 'Should I run data cabling to a garden office?',
    answer:
      'Yes, if the garden office is used for work that requires reliable internet connectivity. Wi-Fi from the house rarely provides a stable signal to a garden office 10 to 30 metres away, especially through walls, glass, and garden terrain. The best solution is to run a Cat 6 or Cat 6a Ethernet cable alongside the SWA power cable in the same trench (but separated by at least 50mm to avoid electromagnetic interference). This provides a wired connection from the house router to the garden office, where a second Wi-Fi access point can provide wireless coverage inside the office. The alternative is a point-to-point wireless bridge, which works but is less reliable than a physical cable. Plan the data cabling at the same time as the electrical installation — it is far cheaper to run data cable in an open trench than to dig a new trench later.',
  },
  {
    question: 'Does a garden office need planning permission?',
    answer:
      'Most garden offices fall under permitted development rights and do not require planning permission, provided they meet certain criteria: the building is single-storey, it is not forward of the front elevation of the house, it does not exceed 2.5m in height if within 2m of a boundary, and it does not cover more than 50% of the garden area. However, permitted development rights may be restricted in conservation areas, Areas of Outstanding Natural Beauty (AONB), or if the property is a listed building. The electrical installation is a separate matter from planning — even if planning permission is not required, the electrical work is still notifiable under Part P. Always check with the local planning authority before starting construction.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size SWA cables for garden office supplies with burial depth derating and voltage drop checks.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/voltage-drop-calculator',
    title: 'Voltage Drop Calculator',
    description: 'Check voltage drop on long SWA runs from the house to the garden office.',
    icon: Zap,
    category: 'Tool',
  },
  {
    href: '/guides/part-p-building-regulations',
    title: 'Part P Building Regulations',
    description: 'Complete guide to Part P notification for outbuilding electrical supplies.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete digital Electrical Installation Certificates for garden office installations.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/garage-electrics',
    title: 'Garage Electrics Guide',
    description: 'Similar SWA cable and sub-board installation for garage supplies.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/guides/earthing-arrangements',
    title: 'Earthing Arrangements',
    description:
      'TN-S, TN-C-S, and TT earthing systems with implications for outbuilding supplies.',
    icon: GraduationCap,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Garden Office Electrics: Planning a Professional Workspace',
    content: (
      <>
        <p>
          The demand for garden offices has grown substantially since 2020, with thousands of UK
          homeowners building dedicated workspaces in their gardens. A garden office needs a
          reliable electrical supply — not just for lighting and power, but for heating, data
          connectivity, and the equipment needed for a productive working environment.
        </p>
        <p>
          The electrical installation must comply with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          and be notified under{' '}
          <SEOInternalLink href="/guides/part-p-building-regulations">
            Part P of the Building Regulations
          </SEOInternalLink>
          . This is not a DIY project — it requires a qualified electrician to design, install,
          test, and certify the work.
        </p>
        <p>
          This guide covers the full scope of garden office electrics: SWA cable supply, sub-board
          installation, IP-rated accessories, heating options, data cabling, and the certification
          needed for building control sign-off.
        </p>
      </>
    ),
  },
  {
    id: 'swa-cable-run',
    heading: 'SWA Cable Run from the House',
    content: (
      <>
        <p>
          The supply to a garden office is delivered via an SWA (Steel Wire Armoured) cable buried
          underground from the house to the outbuilding. SWA cable provides the mechanical
          protection needed for direct burial and doubles as the earth path via its steel armour.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable selection</strong> — 3-core SWA is preferred (line, neutral, and a
                dedicated CPC in addition to the armour). Common sizes are 4.0mm for light loads and
                short runs, 6.0mm for medium loads or longer runs, and 10.0mm for heavy loads or
                runs exceeding 30 metres.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Trench specification</strong> — minimum 500mm depth, with the cable laid on
                a 50mm bed of fine sand, covered with sand, and cable warning tape placed at half
                depth. The trench route should avoid tree roots, drainage runs, and areas likely to
                be excavated in the future.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable entry points</strong> — the SWA cable enters the house and the garden
                office through properly sealed duct entries. Use SWA glands at both ends for
                termination and armour bonding. Seal the entry points against water and pest
                ingress.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If data cabling is being installed (see the Data Cabling section below), run the Cat 6
          cable in the same trench as the SWA cable, separated by at least 50mm to avoid
          electromagnetic interference. It is far cheaper to share the trench than to dig a separate
          one later.
        </p>
        <p>
          Use the{' '}
          <SEOInternalLink href="/tools/cable-sizing-calculator">
            cable sizing calculator
          </SEOInternalLink>{' '}
          to determine the correct SWA size. Enter the total load (including heating), the cable run
          length, and the installation conditions. The calculator applies burial depth derating and
          checks the voltage drop automatically.
        </p>
      </>
    ),
  },
  {
    id: 'dedicated-circuit',
    heading: 'Dedicated Circuit and Sub-Distribution Board',
    content: (
      <>
        <p>
          A garden office should have its own sub-distribution board (small consumer unit) rather
          than being fed by a single circuit from the house board. A dedicated sub-board provides:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Local isolation</strong> — a main switch at the garden office board allows
                all circuits to be isolated without returning to the house. Essential for safe
                maintenance and emergency isolation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Individual circuit protection</strong> — separate MCBs or RCBOs for
                lighting, sockets, heating, and any dedicated circuits. A fault on one circuit does
                not affect the others.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection</strong> — all circuits protected by 30mA RCDs as required by
                BS 7671. Using RCBOs provides individual RCD protection per circuit, preventing
                nuisance tripping from affecting the entire office.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Spare capacity</strong> — a 4-way or 6-way board with spare ways allows
                future additions without rewiring the supply cable.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Typical circuits for a garden office include: a lighting circuit (6A MCB), a socket
          circuit (32A MCB, ring or radial), a dedicated heating circuit (16A or 20A MCB for an air
          conditioning unit or panel heaters), and potentially a dedicated circuit for specialist
          equipment. The sub-board should be a metal enclosure mounted in an accessible location
          inside the garden office.
        </p>
      </>
    ),
  },
  {
    id: 'part-p-notification',
    heading: 'Part P Notification for Garden Office Electrics',
    content: (
      <>
        <p>
          Installing a new circuit to supply a garden office is notifiable work under{' '}
          <SEOInternalLink href="/guides/part-p-building-regulations">
            Part P of the Building Regulations
          </SEOInternalLink>{' '}
          (Approved Document P). This applies to all garden offices, regardless of whether the
          building itself requires planning permission.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person scheme route</strong> — the electrician is registered with
                NICEIC, NAPIT, ELECSA, or another approved scheme. They self-certify the work,
                notify building control, and issue a completion certificate. This is the most common
                route and avoids the need for a separate building control application.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building control application route</strong> — if the electrician is not
                registered with a competent person scheme, a building control application must be
                made before work starts. Building control will inspect the work and charge a fee
                (typically £250 to £500). This route involves more administration and cost.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The Part P completion certificate is a legal document that demonstrates the electrical
          work complies with the Building Regulations. Keep it with the property paperwork — when
          selling the house, a buyer solicitor will request it.
        </p>
      </>
    ),
  },
  {
    id: 'ip-rated-accessories',
    heading: 'IP-Rated Accessories for Garden Offices',
    content: (
      <>
        <p>
          Even a well-insulated garden office experiences temperature fluctuation and potential
          condensation, particularly in the early morning before heating has warmed the space. The
          IP rating of electrical accessories must account for these conditions.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insulated, heated garden office</strong> — IP20 standard domestic
                accessories are generally acceptable if the building is well-insulated and heated
                regularly. However, IP44 provides an extra margin of safety and is recommended.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Uninsulated or unheated outbuilding</strong> — IP55 rated weatherproof
                accessories are required. Condensation on cold surfaces can cause moisture to enter
                standard accessories and create a shock or fire risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>External accessories</strong> — any sockets, lights, or switches on the
                outside of the garden office must be IP65 or IP66. External PIR lights, pathway
                lights, and any outdoor sockets fall into this category.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The consumer unit in the garden office must be a metal enclosure as required by BS 7671
          Amendment 3 for domestic premises. Position it away from areas prone to condensation —
          avoid external walls where cold bridging occurs.
        </p>
      </>
    ),
  },
  {
    id: 'heating-cooling',
    heading: 'Heating and Cooling Options',
    content: (
      <>
        <p>
          A garden office without adequate heating is unusable for much of the UK winter. The
          heating system should be considered at the electrical design stage, as it significantly
          affects the circuit sizing and total load calculation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Air source heat pump / air conditioning</strong> — the best option for
                year-round comfort, providing both heating and cooling. Requires a dedicated circuit
                (typically 16A or 20A) and professional installation by an F-Gas registered engineer
                for the refrigerant handling. Budget £600 to £1,200 for a small unit suitable for a
                garden office.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electric panel heaters</strong> — simple, cheap, and effective for small
                spaces. A 1kW to 2kW panel heater on a standard 13A socket or fused connection unit
                is sufficient for most garden offices up to 15 square metres. Multiple heaters can
                be thermostatically controlled.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Infrared heaters</strong> — energy-efficient and silent. They heat objects
                and people directly rather than the air, which works well in well-insulated spaces.
                Can be ceiling-mounted to save floor space.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electric underfloor heating</strong> — provides even, comfortable heat
                without radiators or wall units. Must be installed during the floor construction
                phase. Requires a dedicated circuit and thermostat.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Whatever heating method is chosen, include the heating load in the maximum demand
          calculation when sizing the SWA supply cable. A 2kW heater adds approximately 8.7A to the
          circuit load — this can be the difference between a 4.0mm and a 6.0mm SWA cable.
        </p>
      </>
    ),
  },
  {
    id: 'data-cabling',
    heading: 'Data Cabling and Connectivity',
    content: (
      <>
        <p>
          Reliable internet connectivity is essential for a garden office used for professional
          work. Wi-Fi from the house often does not reach a garden office 10 to 30 metres away with
          adequate speed and stability, especially through walls, glass, and garden terrain.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wifi className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cat 6 Ethernet cable (recommended)</strong> — run a Cat 6 or Cat 6a cable
                from the house router to the garden office. Lay it in the same trench as the SWA
                power cable, separated by at least 50mm. Terminate at both ends with RJ45 sockets or
                a small network switch. This provides a gigabit wired connection to the garden
                office.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wifi className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wi-Fi access point in the garden office</strong> — connect a Wi-Fi access
                point to the Cat 6 cable in the garden office. This provides full-speed wireless
                coverage inside the office without relying on the house Wi-Fi signal. A PoE (Power
                over Ethernet) access point is powered by the Cat 6 cable itself, requiring no
                separate power supply.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wifi className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Point-to-point wireless bridge</strong> — an alternative where trenching is
                impractical. Two wireless bridge units (one on the house, one on the garden office)
                create a dedicated link. Less reliable than a physical cable, but suitable for
                lighter use.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Data cabling is not covered by Part P (it is extra-low voltage), but it should be
          installed to a professional standard. Use external-grade Cat 6 cable for the buried
          section, or run the cable through a protective duct. Terminate neatly with flush-mounted
          data sockets inside the garden office.
        </p>
      </>
    ),
  },
  {
    id: 'testing-certification',
    heading: 'Testing and Certification',
    content: (
      <>
        <p>
          All new electrical work in the garden office must be tested to BS 7671 Chapter 6 and
          certified with an Electrical Installation Certificate (EIC). The test regime covers:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Continuity of protective conductors (including SWA armour continuity end-to-end)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Insulation resistance (500V DC test, minimum 1 megohm)</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Polarity verification at every termination point</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Earth fault loop impedance (Zs) — accounting for the SWA cable impedance</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Prospective fault current at the garden office sub-board</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>RCD operation — 30mA trip test and 5 times rated current trip time</span>
            </li>
          </ul>
        </div>
        <p>
          The{' '}
          <SEOInternalLink href="/tools/eic-certificate">
            Electrical Installation Certificate
          </SEOInternalLink>{' '}
          covers all circuits from the supply point at the house board to every final circuit in the
          garden office. If the electrician is registered with a competent person scheme, the EIC is
          used to self-certify and notify building control. The homeowner receives the EIC and the
          Part P completion certificate for their records.
        </p>
        <SEOAppBridge
          title="Complete the EIC on site and send it instantly"
          description="Elec-Mate lets you complete the Electrical Installation Certificate on your phone. AI board scanner reads the new sub-board, voice test entry fills in the schedule of results while you test. Export as a professional PDF and send to the homeowner before you leave."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Winning Garden Office Work',
    content: (
      <>
        <p>
          Garden office installations are growing rapidly and represent a high-margin opportunity
          for domestic electricians. The typical job includes SWA cable supply, sub-board
          installation, multiple circuits, heating, and data cabling — a package worth £1,500 to
          £4,000 depending on the specification and cable run length.
        </p>
        <p>
          Homeowners investing in a garden office expect professional service and prompt
          certification. Here is how Elec-Mate helps you deliver:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Sizing Calculator</h4>
                <p className="text-white text-sm leading-relaxed">
                  Size the SWA cable during the survey visit.{' '}
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
                    Enter the total load, cable run length, and burial conditions
                  </SEOInternalLink>{' '}
                  — the calculator applies all derating factors and checks voltage drop. Know
                  exactly what cable to order before you leave the site.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Professional Quoting</h4>
                <p className="text-white text-sm leading-relaxed">
                  Price the full garden office package with Elec-Mate's{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . SWA cable, trenching, sub-board, circuits, accessories, testing, and
                  certification — all itemised with your margins. Send a professional PDF quote to
                  the homeowner on the spot.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EIC Certificate on Your Phone</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete the Electrical Installation Certificate on site. AI board scanning, voice
                  test entry, and instant PDF export. Certify the garden office installation and
                  send the certificate to the homeowner before you pack up the tools.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote, install, and certify garden offices faster"
          description="Join 430+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site EIC certification. Everything you need for garden office electrics in one app. 7-day free trial."
          icon={Sun}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function GardenOfficeElectricsPage() {
  return (
    <GuideTemplate
      title="Garden Office Electrics | Power Supply Guide UK"
      description="Complete guide to garden office electrics in the UK. SWA cable run, dedicated circuit, sub-distribution board, Part P notification, IP-rated accessories, heating options, data cabling, and EIC certification."
      datePublished="2025-08-10"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Sun}
      heroTitle={
        <>
          Garden Office Electrics:{' '}
          <span className="text-yellow-400">Power Supply Guide for UK Installations</span>
        </>
      }
      heroSubtitle="A garden office needs a proper electrical supply — SWA cable, sub-distribution board, heating, data cabling, and Part P certification. This guide covers the full scope of garden office electrics for UK electricians and homeowners."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Garden Office Electrics"
      relatedPages={relatedPages}
      ctaHeading="Size Cables and Certify Garden Office Installations on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for SWA cable sizing, professional quoting, and on-site EIC certificates. 7-day free trial, cancel anytime."
    />
  );
}
