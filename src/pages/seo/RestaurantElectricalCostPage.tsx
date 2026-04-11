import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PoundSterling,
  Zap,
  AlertTriangle,
  FileCheck2,
  Building2,
  Flame,
  ShieldCheck,
  ClipboardCheck,
  ChefHat,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Commercial Electrical', href: '/guides/commercial-electrical-installation-cost' },
  { label: 'Restaurant Electrical Cost', href: '/restaurant-electrical-cost' },
];

const tocItems = [
  { id: 'overview', label: 'Restaurant Electrical Overview' },
  { id: 'three-phase-supply', label: '3-Phase Supply for Catering' },
  { id: 'kitchen-extract', label: 'Kitchen Extract & Interlocks' },
  { id: 'emergency-lighting', label: 'Emergency Lighting (BS 5266)' },
  { id: 'fire-suppression', label: 'Fire Suppression Interlocks' },
  { id: 'cctv-security', label: 'CCTV & Security' },
  { id: 'cost-breakdown', label: 'Cost Breakdown 2025' },
  { id: 'eicr', label: 'EICR & Compliance' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A new restaurant electrical fit-out in the UK typically costs £8,000 to £25,000 depending on kitchen size, equipment load, and whether a 3-phase supply upgrade is required.',
  'Commercial catering kitchens almost always require a 3-phase 400V supply — single-phase is insufficient for high-draw equipment such as combination ovens, fryers, and commercial dishwashers running simultaneously.',
  'Kitchen canopy extract systems must be electrically interlocked with gas suppression or Ansul wet chemical systems under current building regulations and BS EN 15251.',
  'Emergency lighting to BS 5266-1 is mandatory in any restaurant serving the public and must cover all escape routes, exit signs, and the kitchen at sufficient lux levels.',
  'An EICR is required at least every five years for commercial premises; many insurers and food hygiene inspectors expect to see a current satisfactory report.',
];

const faqs = [
  {
    question: 'How much does a restaurant electrical installation cost in the UK?',
    answer:
      'A complete electrical installation for a new UK restaurant typically costs £8,000 to £25,000. A small 40-cover café with a basic kitchen will sit at the lower end (£8,000–£12,000). A full-service restaurant with a commercial catering kitchen, 3-phase supply upgrade, emergency lighting, fire suppression interlocks, and CCTV will reach £18,000–£25,000 or more. These figures cover materials and labour but exclude VAT and any DNO connection charges for a new or upgraded supply.',
  },
  {
    question: 'Does a restaurant need a 3-phase electrical supply?',
    answer:
      'Almost always yes. A 3-phase 400V (three phase, four wire) supply is required wherever you are running multiple high-draw catering appliances simultaneously — combination ovens (typically 10–15kW each), commercial fryers (6–10kW), commercial dishwashers (10–16kW), and induction hobs (3–7kW per zone). A single-phase 100A supply is limited to approximately 23kW total demand. Even a modest kitchen will exceed this once diversity is applied correctly.',
  },
  {
    question: 'What electrical standards apply to commercial kitchens?',
    answer:
      'Commercial kitchen electrical installations must comply with BS 7671:2018+A3:2024 (the IET Wiring Regulations), with particular attention to Section 706 (restrictive conductive locations — relevant to wet kitchen environments). Fire suppression interlock wiring must follow the requirements of the suppression system manufacturer and BS EN 15251. Emergency lighting is governed by BS 5266-1. Gas interlock systems follow IGEM/UP/19.',
  },
  {
    question: 'What is a gas interlock system and does it need an electrician?',
    answer:
      'A gas interlock (or gas safety interlock) system automatically cuts the gas supply to catering equipment if the extract ventilation fails or is not running. Under current building regulations (Part J) and the Gas Safety (Installation and Use) Regulations 1998, new commercial kitchen installations require such a system. The electrical work — installing the solenoid valve, wiring the control panel, connecting pressure differential sensors or airflow switches in the canopy, and providing an isolating circuit — must be carried out by a qualified electrician working alongside the gas engineer.',
  },
  {
    question: 'How often does a restaurant need an EICR?',
    answer:
      'For commercial premises such as restaurants, the recommended maximum interval for an Electrical Installation Condition Report (EICR) is five years or on change of occupancy. Many insurers, pub companies, and food safety inspectors require sight of a current satisfactory EICR. The EICR is assessed under BS 7671 Section 631. Any C1 or C2 observations must be remedied before the installation is deemed satisfactory.',
  },
  {
    question: 'What emergency lighting does a restaurant need?',
    answer:
      'Restaurants must have emergency lighting to BS 5266-1 on all escape routes (corridors, stairways), at each exit door, at changes of direction, at the kitchen (to allow safe shutdown), and covering fire-fighting equipment and first aid points. Minimum maintained illuminance on escape routes is 1 lux on the centreline (floor level); open areas use the anti-panic requirement of 0.5 lux. Duration must be at least 1 hour for new installations, 3 hours for sleeping accommodation.',
  },
  {
    question: 'Can I install electrical systems in a restaurant without a competent person scheme?',
    answer:
      'Work in commercial premises does not fall under the domestic Competent Person Schemes. However, all electrical work must comply with BS 7671 and the Electricity at Work Regulations 1989. For notifiable work (new circuits, distribution board changes), Building Regulations Part P does not apply to commercial premises — instead, the building control route applies. In practice, most restaurants require their electrician to be NICEIC or NAPIT approved and to provide an Electrical Installation Certificate (EIC) for all new work.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/pub-electrical-cost',
    title: 'Pub Electrical Installation Cost',
    description:
      'Cellar cooling, bar equipment, gaming machines, EICR — full cost guide for licensed premises.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/industrial-electrical-cost',
    title: 'Industrial Electrical Installation Cost',
    description:
      'Per square metre estimates, 3-phase distribution, and motor control for factories.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/commercial-electrical-installation-cost',
    title: 'Commercial Electrical Installation Cost',
    description: 'Complete UK commercial electrical cost guide for all building types.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'Electrical Installation Certificate App',
    description: 'Complete EICs on site with instant PDF export — no evening paperwork.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete commercial EICRs on your phone with AI board scanning.',
    icon: ClipboardCheck,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Restaurant Electrical Installation: What Is Involved?',
    content: (
      <>
        <p>
          A restaurant electrical installation is one of the most demanding commercial fit-out
          projects an electrician will undertake. The combination of high-draw catering equipment,
          wet and humid environments, life-safety systems (emergency lighting and fire suppression
          interlocks), and public access means every aspect of the design and installation must be
          executed to a higher standard than a typical office or retail premises.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ChefHat className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Kitchen electrical systems</strong> — 3-phase distribution boards,
                individual circuits for each major appliance (combination ovens, fryers,
                dishwashers, blast chillers), socket circuits for small equipment, and dedicated
                circuits for kitchen display systems (KDS).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ChefHat className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Front-of-house electrical systems</strong> — general lighting (ambient,
                task, feature), socket outlets for tills and card readers, audio-visual systems, and
                outdoor lighting where applicable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ChefHat className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Life-safety systems</strong> — emergency lighting to{' '}
                <SEOInternalLink href="/guides/emergency-lighting-bs5266">
                  BS 5266-1
                </SEOInternalLink>
                , fire alarm wiring, gas interlock systems, and fire suppression electrical
                interlocks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ChefHat className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Data and communications</strong> — structured cabling for POS systems, EPOS
                tills, customer Wi-Fi, music systems, and CCTV infrastructure.
              </span>
            </li>
          </ul>
        </div>
        <p>
          All of the above must be designed, installed, inspected, and tested in accordance with BS
          7671:2018+A3:2024 (the IET Wiring Regulations). For wet kitchen areas, Section 706 applies
          special requirements for protective measures in restrictive conductive locations.
        </p>
      </>
    ),
  },
  {
    id: 'three-phase-supply',
    heading: '3-Phase Supply for Commercial Catering Equipment',
    content: (
      <>
        <p>
          The single most important electrical decision in a restaurant fit-out is whether the
          existing supply is adequate for the catering equipment load. In most cases it is not, and
          a 3-phase supply upgrade is required before any other electrical work proceeds.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Typical catering equipment loads</strong> — a combination oven (Rational,
                Houno, or similar) draws 10–15kW. A commercial fryer draws 6–10kW. A commercial
                dishwasher (rack type) draws 10–16kW. An induction hob section draws 3–7kW per zone.
                Running multiple items simultaneously requires a 3-phase 400V supply to avoid
                excessive single-phase loading.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>DNO application</strong> — upgrading from single-phase to 3-phase requires a
                Distribution Network Operator (DNO) application. UK Power Networks (London), Western
                Power Distribution, and SP Energy Networks each have their own application process.
                Lead times range from 6 to 18 weeks. DNO connection charges for a new 3-phase
                service typically cost £1,500 to £6,000 depending on distance from the nearest
                3-phase point.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Main distribution board</strong> — a commercial kitchen will typically
                require a 3-phase 100A to 200A TPN (Three Pole and Neutral) distribution board, with
                separate ways for each major appliance. IP-rated enclosures (minimum IP4X) are
                required in kitchen areas. Budget £2,500–£8,000 for the board, incomer, and
                installation — a small café installation may sit at the lower end, while a full
                commercial kitchen MCC with metering and bespoke containment can reach
                £15,000–£20,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable containment</strong> — kitchen environments require robust cable
                containment. Stainless steel or galvanised steel conduit and trunking is preferred
                in food preparation areas. All cable entry points into catering equipment must be
                sealed to IP ratings consistent with the equipment's own IP rating.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'kitchen-extract',
    heading: 'Kitchen Extract Systems and Gas Interlocks',
    content: (
      <>
        <p>
          Commercial kitchen canopy extract systems have specific electrical requirements that go
          beyond simply wiring a fan motor. The extract system must be electrically interlocked with
          the gas supply and, where a fire suppression system is installed, with the suppression
          system controls.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Gas interlock system</strong> — a solenoid valve is fitted to the gas
                supply. An airflow sensor (pressure differential switch or paddle switch) in the
                extract duct confirms the fan is running before allowing gas flow. If the fan fails,
                the solenoid closes. Electrical installation cost: £500–£1,200 depending on
                complexity — this covers pressure switches, solenoid valve supply and wiring,
                control panel, and commissioning.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Canopy fan wiring</strong> — extract fans in commercial kitchens typically
                run on 3-phase 400V for larger installations (11kW+), or single-phase 230V for
                smaller canopies. Variable speed drive (VSD/inverter) control is increasingly common
                for energy efficiency compliance. Each fan motor requires a dedicated isolator
                within sight.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Interlock wiring complexity</strong> — where a wet chemical (Ansul) or CO₂
                fire suppression system is fitted, the electrical interlock must also shut down the
                gas solenoid on suppression activation and simultaneously cut power to the extract
                fan (to prevent the system from blowing agent away from the hazard). This requires
                careful coordination between the suppression engineer and electrician.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'emergency-lighting',
    heading: 'Emergency Lighting to BS 5266-1',
    content: (
      <>
        <p>
          Emergency lighting is a legal requirement in all restaurants, cafés, and catering premises
          open to the public. The applicable standard is BS 5266-1:2016 (Emergency lighting. Code of
          practice for the emergency lighting of premises). Non-compliance is a fire safety offence
          under the Regulatory Reform (Fire Safety) Order 2005.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Escape route lighting</strong> — minimum 1 lux on the centreline of escape
                routes (corridors, stairways). Maintained or non-maintained fittings are both
                acceptable; maintained is more common in restaurants as it doubles as decorative
                lighting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Open area (anti-panic) lighting</strong> — dining areas over 60m² must
                provide 0.5 lux anti-panic illuminance to allow patrons to reach an escape route
                safely. Larger restaurant dining rooms frequently require additional emergency
                lighting fittings above those on escape routes alone.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Kitchen emergency lighting</strong> — the kitchen must have emergency
                lighting to allow safe shutdown of gas and electrical equipment. A minimum of 10 lux
                on task areas is recommended by BS 5266-1 to allow cooks to isolate equipment safely
                in an emergency.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test and maintenance</strong> — self-test emergency luminaires (compliant
                with BS EN 62034) simplify the monthly and annual testing requirements. Standard
                fittings require manual monthly function tests and an annual 3-hour discharge test.
                All tests must be logged.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Emergency lighting installation costs for a restaurant typically range from £1,200 to
          £4,500 depending on floor area, number of floors, and fitting specification. Self-test
          fittings cost more to supply but reduce ongoing maintenance costs.
        </p>
      </>
    ),
  },
  {
    id: 'fire-suppression',
    heading: 'Fire Suppression Electrical Interlocks',
    content: (
      <>
        <p>
          Where a fixed fire suppression system is installed over cooking equipment (wet chemical
          Ansul-type systems are most common in UK commercial kitchens), electrical interlocking is
          mandatory. The suppression system activation must automatically cut power to all cooking
          equipment and gas supplies.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Shunt trip breakers</strong> — each circuit supplying cooking equipment
                under the suppression system canopy must have a shunt trip circuit breaker wired to
                the suppression panel's auxiliary contacts. On suppression activation, the panel
                opens all shunt trips simultaneously.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Extract fan shutdown</strong> — the extract fan must stop on suppression
                activation to prevent the agent being dispersed before it can extinguish the fire.
                This requires a contactor or VSD control input wired from the suppression panel.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Gas solenoid</strong> — the gas interlock solenoid must also close on
                suppression activation. This is typically achieved via the same auxiliary contact
                output used for the gas interlock, but the suppression engineer and electrician must
                confirm the logic together.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The electrical interlock wiring for a suppression system adds approximately £600–£1,500 to
          the kitchen electrical costs. This work must be documented and an{' '}
          <SEOInternalLink href="/tools/eic-certificate">
            Electrical Installation Certificate
          </SEOInternalLink>{' '}
          issued for all new circuits.
        </p>
      </>
    ),
  },
  {
    id: 'cctv-security',
    heading: 'CCTV and Security Systems',
    content: (
      <>
        <p>
          Most UK restaurants install CCTV for security, insurance compliance, and staff safety. The
          electrical requirements for a restaurant CCTV system are relatively modest compared to the
          kitchen installation but must be planned from the outset to avoid costly cable chasing
          after the fit-out is complete.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP CCTV systems</strong> — modern restaurant CCTV uses IP cameras powered by
                PoE (Power over Ethernet) switches. The electrician supplies a dedicated circuit to
                the NVR and PoE switch, typically 13A fused spur from the comms cabinet. Data
                cabling (Cat6) runs to each camera position.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Exterior cameras</strong> — outdoor cameras require weatherproof enclosures
                (IP66 minimum) and cable installed in conduit. If the camera is over a public
                thoroughfare, planning consent may be required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Typical costs</strong> — electrical supply to NVR plus 4–8 camera positions:
                £300–£700 electrical works. CCTV system supply and installation (cameras, NVR,
                monitors) is typically quoted separately by a specialist installer.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cost-breakdown',
    heading: 'Restaurant Electrical Cost Breakdown 2025',
    content: (
      <>
        <p>
          The table below reflects typical 2025 costs for a new restaurant electrical fit-out in the
          UK. Prices include labour and materials but exclude VAT and DNO connection charges. London
          and South East rates are typically 20–35% higher than the national average, reflecting
          2025/2026 labour cost escalation and skilled trade scarcity in the region.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>3-phase main distribution board (100–200A TPN)</strong> — £2,500–£8,000.
                Includes board, incomer, RCDs/MCBs, and containment to service positions. Full
                commercial kitchen MCCs can reach £15,000–£20,000 for large restaurants.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Kitchen appliance circuits (per appliance)</strong> — £150–£400 per circuit.
                Combination oven circuits (3-phase, 32–63A) at the top end; single-phase circuits
                for smaller equipment at the lower end.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Gas interlock system (electrical works)</strong> — £500–£1,200. Includes
                pressure switches, solenoid valve wiring, airflow sensor, control panel, and
                commissioning.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire suppression interlocks</strong> — £600–£1,500. Shunt trips, solenoid
                interlocking, extract fan shutdown wiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency lighting to BS 5266-1</strong> — £1,200–£4,500. Based on floor
                area and fitting specification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>General lighting and power (front of house)</strong> — £2,000–£6,000.
                Feature lighting, socket outlets, USB charging points, POS positions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>CCTV electrical supply</strong> — £300–£700.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Total new restaurant fit-out</strong> — <strong>£8,000–£25,000</strong>. A
                40-cover café with basic catering kitchen: £8,000–£12,000. A 100-cover restaurant
                with full commercial kitchen: £18,000–£25,000+.
              </span>
            </li>
          </ul>
        </div>
        <p>
          DNO charges for a new 3-phase service can add a further £1,500 to £6,000. These are
          payable directly to the network operator and are separate from the electrician's quote.
        </p>
        <p>
          <strong>2025/2026 labour rate escalation:</strong> Restaurant fit-outs in London and the
          South East have seen 15–20% labour cost increases since 2023, driven by rising material
          costs and ongoing scarcity of skilled electricians with commercial catering experience.
          London restaurant electrical fit-outs typically run 20–35% above the national average
          figures quoted above. Operators budgeting for a London or South East site should apply
          this uplift to all labour-inclusive line items.
        </p>
        <p>
          <strong>DNO 3-phase upgrade lead times:</strong> Restaurants frequently need a 3-phase
          supply upgrade, and the DNO application lead time consistently catches owners off guard.
          Lead times for a new or upgraded 3-phase service range from 6 to 18 weeks depending on the
          network operator and the distance from the nearest 3-phase point. This application must be
          made at the very start of the project — before fit-out works begin — to avoid costly
          programme delays.
        </p>
      </>
    ),
  },
  {
    id: 'eicr',
    heading: 'EICR and Compliance for Restaurants',
    content: (
      <>
        <p>
          All new restaurant electrical installations must be accompanied by an{' '}
          <SEOInternalLink href="/tools/eic-certificate">
            Electrical Installation Certificate (EIC)
          </SEOInternalLink>{' '}
          issued by the installing electrician. For existing premises, periodic inspection and
          testing (EICR) is required at five-yearly intervals or on change of occupancy.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EIC for new work</strong> — every new circuit, distribution board change, or
                significant alteration must be accompanied by an EIC or Minor Works Certificate as
                appropriate. This is a legal requirement under the Building Regulations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR frequency</strong> — commercial premises: maximum five years. Many
                restaurant insurers require annual visual inspection records in addition to the
                five-yearly full EICR. Food Standards Agency inspectors increasingly ask to see
                electrical compliance documentation alongside food hygiene records.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency lighting log book</strong> — BS 5266-1 requires a log book to be
                maintained recording all monthly tests, annual tests, and any remedial actions. This
                must be available for inspection by the responsible person and enforcement
                authorities.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Winning Restaurant Electrical Contracts',
    content: (
      <>
        <p>
          Restaurant fit-outs are high-value, multi-week contracts that generate strong revenue and
          excellent follow-on business (EICRs, emergency lighting maintenance, reactive call-outs).
          Electricians who develop expertise in catering kitchen installations — particularly
          3-phase distribution, gas interlock wiring, and suppression interlocking — are in high
          demand.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote and Certificate on Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>{' '}
                  to produce a professional itemised quote during your site survey. Issue{' '}
                  <SEOInternalLink href="/tools/eic-certificate">
                    Electrical Installation Certificates
                  </SEOInternalLink>{' '}
                  direct from your phone — no evening admin.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Manage restaurant contracts with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate to quote, certificate, and manage commercial fit-out projects. AI-assisted EIC completion, instant PDF export, and client portal. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function RestaurantElectricalCostPage() {
  return (
    <GuideTemplate
      title="Restaurant Electrical Installation Cost UK 2025 | Catering Electrical"
      description="Restaurant electrical installation costs UK 2025. 3-phase supply for commercial catering, gas interlock wiring, emergency lighting to BS 5266-1, fire suppression interlocks, CCTV. Typical fit-out £8,000–£25,000."
      datePublished="2025-01-01"
      dateModified="2026-04-11"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Commercial Cost Guide"
      badgeIcon={ChefHat}
      heroTitle={
        <>
          Restaurant Electrical Installation Cost UK 2025:{' '}
          <span className="text-yellow-400">Catering Electrical Guide</span>
        </>
      }
      heroSubtitle="Complete cost guide for UK restaurant and commercial catering kitchen electrical installations. 3-phase supply, gas interlocks, fire suppression electrical interlocking, emergency lighting to BS 5266-1, CCTV, and compliance. Typical new fit-out £8,000–£25,000."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions: Restaurant Electrical Installation Costs"
      relatedPages={relatedPages}
      ctaHeading="Quote and Certificate Restaurant Installations on Site"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for commercial quotes, EIC completion, and emergency lighting certification. 7-day free trial, cancel anytime."
    />
  );
}
