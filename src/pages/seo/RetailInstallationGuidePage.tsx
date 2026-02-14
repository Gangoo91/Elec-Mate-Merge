import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Store,
  ShieldCheck,
  AlertTriangle,
  Zap,
  FileCheck2,
  Calculator,
  GraduationCap,
  ClipboardCheck,
  Brain,
  Search,
  Lightbulb,
  Siren,
  Receipt,
  Plug,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Retail Installation', href: '/guides/retail-electrical-installation' },
];

const tocItems = [
  { id: 'retail-overview', label: 'Retail Electrical Requirements' },
  { id: 'lighting-design', label: 'Lighting Design for Retail' },
  { id: 'emergency-lighting', label: 'Emergency Lighting Compliance' },
  { id: 'fire-alarm-integration', label: 'Fire Alarm Integration' },
  { id: 'power-distribution', label: 'Power Distribution and Maximum Demand' },
  { id: 'part-p-commercial', label: 'Part P and Commercial Compliance' },
  { id: 'common-defects', label: 'Common Defects in Retail Installations' },
  { id: 'for-electricians', label: 'For Electricians on Retail Projects' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Retail electrical installations must balance aesthetic lighting design with compliance — BS 5266 (emergency lighting), BS 5839 (fire detection), and BS 7671 (wiring regulations) all apply to shop fit-out projects.',
  'Emergency lighting must comply with BS 5266-1 and must provide adequate illumination on escape routes, at exit signs, and in high-risk areas for a minimum of 3 hours in most retail premises.',
  'Fire alarm systems in retail premises must comply with BS 5839-1 and must be integrated with emergency lighting, access control, and any smoke ventilation systems for coordinated operation.',
  'Power distribution for retail must account for high lighting loads, electronic point-of-sale systems, refrigeration (food retail), HVAC, and seasonal variations in demand.',
  'Elec-Mate lets electricians complete EIC and EICR certificates for retail fit-outs on site, generate remedial quotes for defects, and deliver professional PDFs to the client before leaving.',
];

const faqs = [
  {
    question: 'Does Part P apply to retail and commercial electrical work?',
    answer:
      'Part P (Approved Document P — Electrical Safety in Dwellings) applies only to dwellings and the common parts of buildings containing dwellings — it does not apply to standalone commercial premises such as shops, offices, or warehouses. However, if a retail premises is part of a mixed-use building that includes dwellings (for example, a shop with a flat above), Part P may apply to the dwelling and potentially to shared electrical installations. Regardless of Part P, all commercial electrical work must comply with BS 7671 (the IET Wiring Regulations) and the Electricity at Work Regulations 1989. The employer (or building owner) has a legal duty under the Health and Safety at Work Act 1974 to ensure the electrical installation is safe and properly maintained. An Electrical Installation Certificate (EIC) must be issued for new installations, and periodic inspection (EICR) must be carried out at the recommended intervals — typically every 5 years for commercial premises, or 3 years for retail premises with public access (as recommended by IET Guidance Note 3). Building Regulations may still apply through other Approved Documents — for example, Part B (Fire Safety) and Part L (Conservation of Fuel and Power) both have implications for the electrical design of retail premises.',
  },
  {
    question: 'What emergency lighting standard applies to retail premises?',
    answer:
      'Emergency lighting in retail premises must comply with BS 5266-1 (Emergency Lighting — Code of Practice for the Emergency Lighting of Premises). The standard requires emergency lighting to be provided on all escape routes, at every exit and safety sign, at every change of direction on an escape route, at stairways (each flight receives direct light), at every change of floor level, near firefighting equipment and fire alarm call points, and at points of emphasis (such as escape route intersections and outside final exits). The emergency lighting must provide a minimum illuminance of 1 lux along the centre line of escape routes (2 lux at intersections and changes of direction) and 0.5 lux across the full width. For large open-plan retail areas exceeding 60 m², anti-panic lighting must provide a minimum of 0.5 lux across the entire floor area. The emergency lighting system must provide illumination for a minimum of 3 hours (1 hour is only acceptable in premises that are evacuated immediately upon loss of normal lighting and not reoccupied until the system is fully recharged). Monthly functional tests and annual full-duration tests must be carried out and recorded. A fire risk assessment may require additional emergency lighting beyond the BS 5266 minimum.',
  },
  {
    question: 'What fire alarm category is required for a shop?',
    answer:
      'The fire alarm system category for a retail premises is determined by the fire risk assessment, not by a blanket requirement. BS 5839-1 defines several system categories. Category M (manual) provides manual call points only — no automatic detection. This may be acceptable for small, single-storey shops where a fire can be quickly detected by occupants. Category L (life protection) provides automatic detection to protect life. L1 provides detection throughout the premises. L2 provides detection in escape routes, rooms opening onto escape routes, and high-risk rooms. L3 provides detection in escape routes only. Category P (property protection) provides automatic detection to minimise property damage. P1 provides detection throughout the premises. Most retail premises will require at least Category L3 (detection in escape routes), with many fire risk assessments recommending L2 or L1 depending on the size of the premises, the complexity of the escape routes, the occupancy numbers, and the nature of the stock (flammable goods increase the risk category). Shopping centres and large retail stores typically require Category L1 or L2 with networked addressable systems. The fire alarm designer and the fire risk assessor should work together to determine the appropriate category.',
  },
  {
    question: 'How do I calculate maximum demand for a retail unit?',
    answer:
      'Maximum demand calculation for a retail unit must account for all connected loads, with appropriate diversity factors applied. The main load categories in a typical retail unit are: lighting (often the largest single load in non-food retail — display lighting, ambient lighting, feature lighting, window displays, and signage can total 20 to 50 W/m² for high-end retail), small power (socket-outlets for tills, card machines, computers, displays — typically 25 W/m² with diversity), refrigeration (food retail only — commercial fridges and freezers can add 5 to 20 kW per unit), HVAC (heating, ventilation, and air conditioning — typically provided by the landlord in shopping centres, but may be a tenant load in standalone units), signage (illuminated signs, both internal and external, can add several kW), and security systems (CCTV, access control, intruder alarms — typically 1 to 3 kW). Apply diversity factors from BS 7671 Appendix A or from the IET On-Site Guide Table 1.1. For retail, a diversity factor of 0.9 for lighting and 0.4 for socket-outlets is typical. The total assessed maximum demand determines the incoming supply capacity — single-phase 100 A may be sufficient for a small shop, but larger retail units often require three-phase 100 A or higher. Coordinate with the landlord and the Distribution Network Operator (DNO) to ensure the supply capacity is adequate before starting the fit-out.',
  },
  {
    question: 'What are the lighting design considerations for a retail fit-out?',
    answer:
      'Retail lighting design must balance visual impact (attracting customers and showcasing products) with energy efficiency and compliance. Key considerations include: illuminance levels — the CIBSE Lighting Guide recommends 300 to 500 lux for general retail areas, with accent lighting at 3 to 5 times the ambient level for displays and feature areas. Colour rendering — the Colour Rendering Index (CRI) of the light source affects how products appear. For fashion and food retail, a CRI of 90+ is recommended. For general retail, CRI 80+ is acceptable. LED is the standard light source for new retail installations, offering high efficacy (100+ lumens per watt), excellent CRI, dimming capability, and long life. Track lighting is widely used in retail because it allows spotlights to be repositioned as displays change. Recessed downlights provide ambient lighting. Linear LED systems provide feature and accent lighting. Lighting control systems (DALI or similar) allow zones to be dimmed or switched independently, supporting different lighting scenes for trading hours, out-of-hours, and cleaning. Energy efficiency must comply with Part L of the Building Regulations — maximum lighting power densities and minimum efficacy targets apply to new-build and major refurbishment retail projects.',
  },
  {
    question: 'How often should a retail electrical installation be inspected?',
    answer:
      'IET Guidance Note 3 (Inspection and Testing) recommends a maximum interval of 5 years for commercial premises generally, and 3 years for premises with public access where there is a higher risk of electrical fault due to the intensity of use. Most retail premises fall into the 5-year category, but larger stores, shopping centres, and food retail premises with refrigeration equipment may justify a 3-year interval. The Health and Safety Executive (HSE) does not specify exact intervals but expects employers to ensure their electrical installations are maintained in a safe condition — regular EICR inspections are the accepted way to demonstrate this. Insurance providers typically require evidence of a current EICR and may invalidate cover if the installation has not been inspected within the recommended interval. Landlords in shopping centres often include specific EICR requirements in the lease — typically requiring tenants to carry out an EICR before occupation, at regular intervals during the lease, and at the end of the lease (a "dilapidations" inspection). Retail tenants should check their lease obligations carefully.',
  },
  {
    question: 'Can I use the landlord supply for a retail fit-out or do I need a new supply?',
    answer:
      "This depends on the type of retail premises and the lease arrangement. In a shopping centre, the landlord typically provides a metered sub-main supply to each unit — usually terminated at a main switch or distribution board within the unit's demise. The tenant's electrical contractor then installs the fit-out distribution system from this point. The landlord's supply capacity will be stated in the landlord's specification or \"tenant's handbook,\" and the fit-out design must not exceed this capacity. If the tenant's maximum demand exceeds the available supply, the landlord may be able to provide a larger supply — usually at the tenant's cost. For standalone retail premises (high street shops), the incoming supply is typically from the DNO (Distribution Network Operator) and is metered at the property boundary or within the premises. If the existing supply is inadequate for the fit-out (for example, the shop has a 60 A single-phase supply but the fit-out requires 100 A three-phase), the tenant or landlord must apply to the DNO for a supply upgrade. DNO supply upgrades can take 6 to 12 weeks and may involve significant cost, so this must be identified early in the fit-out programme. In all cases, the fit-out electrician must verify the available supply capacity (incoming fuse rating, maximum demand of existing loads, and headroom for additional circuits) before designing the distribution system.",
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete digital Electrical Installation Certificates on your phone. AI board scanner, voice test entry, and professional PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/emergency-lighting-certificate',
    title: 'Emergency Lighting Certificate',
    description:
      'Guide to emergency lighting testing, certification, and BS 5266 compliance for commercial premises.',
    icon: Lightbulb,
    category: 'Guide',
  },
  {
    href: '/guides/fire-alarm-certificate',
    title: 'Fire Alarm Certificate',
    description:
      'Guide to fire alarm system testing, BS 5839-1 compliance, and commissioning certificates.',
    icon: Siren,
    category: 'Guide',
  },
  {
    href: '/tools/max-demand-calculator',
    title: 'Maximum Demand Calculator',
    description:
      'Calculate maximum demand for retail and commercial premises with diversity factors and load assessment.',
    icon: Calculator,
    category: 'Calculator',
  },
  {
    href: '/guides/part-p-building-regulations',
    title: 'Part P Building Regulations',
    description:
      'Understanding where Part P applies and does not apply in mixed-use commercial and residential buildings.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/training/18th-edition',
    title: '18th Edition Course',
    description:
      'Study for C&G 2382 with 50+ structured training modules on the Elec-Mate platform.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'retail-overview',
    heading: 'Electrical Requirements for Retail Premises',
    content: (
      <>
        <p>
          Retail electrical installations sit at the intersection of aesthetics, functionality, and
          compliance. A shop fit-out must deliver visually appealing lighting that showcases
          products, reliable power for point-of-sale systems and refrigeration, fire safety systems
          that protect staff and the public, and compliance with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink>, the
          Electricity at Work Regulations, and the Building Regulations.
        </p>
        <p>
          The electrical design for a retail fit-out typically involves several interconnected
          systems: general lighting and display lighting (often the most complex and highest-value
          element), emergency lighting to BS 5266, fire detection and alarm to BS 5839-1, power
          distribution for tills, displays, and back-of-house equipment, HVAC controls, security
          systems (CCTV, intruder alarm, access control), and external signage.
        </p>
        <p>
          The key challenge for electricians is coordinating all these systems within a tight
          fit-out programme. Retail fit-outs are fast — typically 4 to 12 weeks from strip-out to
          opening day. The electrical work is on the critical path because most other trades
          (shopfitting, decorating, merchandising) cannot proceed until the first fix electrical is
          complete. An electrician who works efficiently, communicates well with other trades, and
          delivers certificates on time is invaluable on retail projects.
        </p>
      </>
    ),
  },
  {
    id: 'lighting-design',
    heading: 'Lighting Design for Retail: More Than Just Illumination',
    content: (
      <>
        <p>
          Lighting is the single most important electrical system in a retail environment. It sets
          the atmosphere, highlights products, guides customers through the store, and directly
          influences purchasing behaviour. Retail lighting design must balance visual impact with
          energy efficiency and compliance.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ambient lighting.</strong> General illumination across the sales floor,
                typically 300 to 500 lux. Recessed LED downlights or linear LED systems are the
                standard choice. The colour temperature should complement the brand — warm white
                (2700 to 3000 K) for fashion and lifestyle, neutral white (4000 K) for electronics
                and general retail.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Accent and display lighting.</strong> Spotlights, track lighting, and
                feature luminaires that highlight key products, displays, and focal points. Accent
                lighting is typically 3 to 5 times the ambient level (900 to 2500 lux on the
                product). Track lighting systems allow repositioning as displays change.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Window display lighting.</strong> High-intensity lighting for window
                displays, competing with daylight. Typically requires higher lux levels (1000 to
                3000 lux) and careful heat management. Timer or photocell control to manage energy
                use when the store is closed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Colour rendering.</strong> High CRI (Colour Rendering Index) is essential
                for retail — products must appear in their true colours. CRI 90+ is recommended for
                fashion, food, and cosmetics. CRI 80+ is acceptable for general retail.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lighting control.</strong> DALI (Digital Addressable Lighting Interface) or
                similar control systems allow zones to be dimmed, switched, and programmed
                independently. Different lighting scenes can be set for trading hours, browsing,
                cleaning, and security.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Part L of the Building Regulations sets maximum lighting power densities and minimum
          efficacy targets for new-build and major refurbishment retail projects. LED technology
          easily meets these targets, but the specification must be documented and included in the
          building control submission.
        </p>
      </>
    ),
  },
  {
    id: 'emergency-lighting',
    heading: 'Emergency Lighting: BS 5266 Compliance for Retail',
    content: (
      <>
        <p>
          Emergency lighting in retail premises is a life safety system designed to provide
          sufficient illumination for staff and customers to safely evacuate the building when the
          normal lighting fails. Compliance with BS 5266-1 is a legal requirement under the
          Regulatory Reform (Fire Safety) Order 2005.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Siren className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Escape route lighting.</strong> A minimum of 1 lux along the centre line of
                escape routes, increasing to 2 lux at intersections, changes of direction, and
                changes of floor level. The uniformity ratio must not exceed 40:1.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Siren className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Open area (anti-panic) lighting.</strong> For open-plan retail areas
                exceeding 60 m², a minimum of 0.5 lux at floor level across the entire area. This
                prevents panic and provides safe movement towards escape routes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Siren className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>High-risk task area lighting.</strong> Any area where a dangerous process
                must be shut down safely (for example, food preparation areas with sharp equipment)
                requires a minimum of 15 lux.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Siren className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Duration.</strong> 3 hours for most retail premises. 1 hour is only
                acceptable if the premises are evacuated immediately and not reoccupied until the
                system is fully recharged.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Siren className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Exit signs.</strong> Illuminated exit signs conforming to BS 5499 must be
                provided at every final exit and at points where the exit route is not obvious.
                Signs must be visible from 30 m in the viewing direction.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Emergency lighting must be tested monthly (short functional test) and annually (full
          3-hour duration test). All test results must be recorded and available for inspection by
          the fire authority. Elec-Mate's{' '}
          <SEOInternalLink href="/guides/emergency-lighting-certificate">
            emergency lighting certificate
          </SEOInternalLink>{' '}
          template is designed for exactly this purpose.
        </p>
      </>
    ),
  },
  {
    id: 'fire-alarm-integration',
    heading: 'Fire Alarm Integration in Retail Premises',
    content: (
      <>
        <p>
          The fire alarm system in a retail premises must comply with BS 5839-1 and must be
          integrated with other life safety systems. In a modern retail fit-out, the fire alarm does
          not operate in isolation — it triggers a coordinated response from multiple systems.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Detection and Notification</h3>
            <p className="text-white text-sm leading-relaxed">
              The fire alarm system detects fire through automatic detectors (smoke, heat, or
              multi-sensor) and manual call points. Upon detection, the system activates sounders
              and/or voice alarm speakers to notify occupants to evacuate. In shopping centres, the
              tenant's fire alarm system interfaces with the landlord's central system via a
              cause-and-effect matrix — a specific alarm condition in one unit triggers a defined
              response in adjacent units and common areas. The fire alarm design must be coordinated
              with the fire risk assessment and the evacuation strategy (simultaneous or phased
              evacuation).
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">System Integration</h3>
            <p className="text-white text-sm leading-relaxed">
              When the fire alarm activates, it should trigger several coordinated actions:
              emergency lighting switches to battery mode (if normal supply is lost), automatic door
              holders release fire doors, access control systems unlock escape doors, HVAC systems
              shut down or switch to smoke extract mode, fire shutters close to compartmentalise the
              building, lifts return to the ground floor and park with doors open, and gas supplies
              are isolated (in food retail with gas cooking). All of these interfaces must be
              designed, installed, commissioned, and tested as an integrated system.
            </p>
          </div>
        </div>
        <p>
          The fire alarm system must be commissioned by a competent fire alarm engineer and a
          commissioning certificate issued in accordance with BS 5839-1. The certificate must be
          retained and presented to the fire authority on request. Periodic inspection and servicing
          should be carried out at 6-monthly intervals by a competent person.
        </p>
        <SEOAppBridge
          title="Fire alarm certificates on your phone"
          description="Elec-Mate's fire alarm certificate template covers commissioning, periodic inspection, and servicing records in accordance with BS 5839-1. Complete the certificate on site and deliver it to the client instantly."
          icon={Siren}
        />
      </>
    ),
  },
  {
    id: 'power-distribution',
    heading: 'Power Distribution and Maximum Demand',
    content: (
      <>
        <p>
          Power distribution in a retail fit-out must be designed to safely and reliably supply all
          connected loads. The distribution system design starts with a maximum demand assessment
          and works back to the incoming supply.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lighting load.</strong> Retail lighting loads can be substantial — 20 to 50
                W/m² for high-end fashion retail, 10 to 20 W/m² for general retail. For a 500 m²
                store, lighting alone can be 10 to 25 kW. Use the{' '}
                <SEOInternalLink href="/tools/max-demand-calculator">
                  maximum demand calculator
                </SEOInternalLink>{' '}
                to assess the total lighting load with appropriate diversity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Small power.</strong> Socket-outlets for tills, card machines, computers,
                barcode scanners, and customer-facing displays. Typically 10 to 25 W/m² with a
                diversity factor of 0.4 to 0.6.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Refrigeration (food retail).</strong> Commercial fridges, freezers, and cold
                rooms can add 5 to 20 kW per unit. Refrigeration loads are typically on dedicated
                circuits with no diversity applied (they run continuously). Three-phase supplies are
                common for larger refrigeration plant.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HVAC.</strong> Air conditioning, ventilation fans, and heating. In shopping
                centres, the landlord often provides heating and cooling — the tenant may only need
                to install fan coil units or connection points. In standalone retail, the tenant
                provides the full HVAC system.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>External signage.</strong> Illuminated shop signs (both internal and
                external), window graphics lighting, and fascia lighting. Dedicated circuits with
                appropriate time clock or photocell control.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The distribution board layout should separate critical and non-critical loads, provide
          adequate spare capacity for future changes (retail spaces are refitted frequently), and
          allow individual circuit isolation for maintenance without affecting trading. A sub-main
          cable from the landlord's meter or the DNO supply to the tenant's distribution board must
          be correctly sized for the assessed maximum demand, with voltage drop calculated for the
          cable length.
        </p>
      </>
    ),
  },
  {
    id: 'part-p-commercial',
    heading: 'Part P, Building Regulations, and Commercial Compliance',
    content: (
      <>
        <p>
          The regulatory framework for retail electrical installations involves multiple overlapping
          requirements. Understanding which regulations apply — and which do not — is essential for
          both electricians and retail tenants.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part P does not apply to standalone commercial premises.</strong> However,
                it may apply to mixed-use buildings (shop with flat above) and to the dwelling
                portions of such buildings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671 applies to all electrical installations.</strong> The IET Wiring
                Regulations apply regardless of whether the premises are domestic or commercial. An
                EIC must be issued for new installations, and regular EICR inspections are required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electricity at Work Regulations 1989.</strong> The employer must ensure the
                electrical installation is safe. This includes regular inspection and testing, and
                keeping records of the installation's condition.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part B (Fire Safety).</strong> Fire detection, alarm, and emergency lighting
                must comply with the relevant British Standards. The fire risk assessment drives the
                specification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part L (Conservation of Fuel and Power).</strong> Lighting efficacy and
                energy efficiency requirements apply to new-build and major refurbishment retail
                projects.
              </span>
            </li>
          </ul>
        </div>
        <p>
          In shopping centres, the landlord's specification (tenant handbook) will typically set out
          additional requirements that the tenant's electrical contractor must follow. These may
          include specific cable types, containment standards, fire stopping requirements, and
          commissioning and handover documentation. The electrician should obtain and review the
          landlord's specification before starting any work.
        </p>
      </>
    ),
  },
  {
    id: 'common-defects',
    heading: 'Common Defects in Retail Electrical Installations',
    content: (
      <>
        <p>
          Retail electrical installations are subject to frequent changes — display updates, new
          equipment, seasonal decorations, and periodic refits. These changes often introduce
          defects that are identified during periodic EICR inspections:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overloaded circuits.</strong> Additional lighting, displays, or equipment
                added to existing circuits without assessing the circuit capacity. Extension leads
                and multi-way adaptors used as permanent wiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency lighting not maintained.</strong> Failed luminaires not replaced,
                testing not carried out, and batteries not functioning. A non-functional emergency
                lighting system is a serious fire safety risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire stopping compromised.</strong> Cable penetrations through fire walls
                and floors not sealed after new cables have been installed. Fire doors propped open
                or fire shutters obstructed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Missing or inaccurate circuit charts.</strong> Distribution board schedules
                not updated after modifications. Circuits labelled incorrectly, making safe
                isolation difficult.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Exposed wiring in customer areas.</strong> Cables run on the surface without
                protection, temporary installations left permanently, and damaged cable management
                not repaired.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Document each defect with the correct{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            observation code
          </SEOInternalLink>{' '}
          and a clear description. Retail clients respond well to defect reports that include
          photographs and a priced remedial quote — it removes the guesswork and gets the remedial
          work approved faster.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Retail Fit-Out Work with Elec-Mate',
    content: (
      <>
        <p>
          Retail fit-out work is fast-paced, visually demanding, and requires coordination with
          multiple trades and stakeholders. The certification requirements are extensive — EIC for
          the main installation, emergency lighting certificate, fire alarm commissioning
          certificate, and potentially separate certificates for signage circuits and specialist
          equipment. The electrician who delivers all certificates on completion day wins the next
          contract.
        </p>
        <p>Elec-Mate supports the full retail certification workflow:</p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Brain className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI Board Scanner</h4>
                <p className="text-white text-sm leading-relaxed">
                  Photograph the distribution board. Elec-Mate reads the MCB/RCBO ratings, circuit
                  designations, and board layout from the photo. The EIC or EICR schedule is half-
                  populated before you start testing. Ideal for multi-board retail installations
                  where speed matters.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <Receipt className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Remedial Quoting</h4>
                <p className="text-white text-sm leading-relaxed">
                  Found defects during the EICR? Elec-Mate's remedial works estimator prices every
                  C1, C2, and FI observation — materials, labour, and margin. Hand the client the
                  EICR and a professional remedial quote in the same visit.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Search className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Multiple Certificate Types</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete EIC, EICR,{' '}
                  <SEOInternalLink href="/guides/emergency-lighting-certificate">
                    emergency lighting
                  </SEOInternalLink>
                  , and{' '}
                  <SEOInternalLink href="/guides/fire-alarm-certificate">
                    fire alarm certificates
                  </SEOInternalLink>{' '}
                  all within the same app. One platform for every certificate type you need on a
                  retail fit-out.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          Retail work is high-value, repeat, and reputation-building. National retailers need
          reliable electrical contractors who deliver quality work, on time, with complete
          documentation. Elec-Mate helps you deliver all of that from your phone.
        </p>
        <SEOAppBridge
          title="Professional retail certificates on your phone"
          description="Join 430+ UK electricians creating professional EIC, EICR, and specialist certificates with AI board scanning, voice entry, and instant PDF delivery. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function RetailInstallationGuidePage() {
  return (
    <GuideTemplate
      title="Retail Electrical Installation | Shop Fit-Out Guide"
      description="Complete guide to retail electrical installation and shop fit-out. Lighting design, emergency lighting (BS 5266), fire alarm integration (BS 5839), power distribution, maximum demand, and Part P compliance for retail premises."
      datePublished="2025-10-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Retail Guide"
      badgeIcon={Store}
      heroTitle={
        <>
          Retail Electrical Installation:{' '}
          <span className="text-yellow-400">The Complete Shop Fit-Out Guide</span>
        </>
      }
      heroSubtitle="Retail fit-outs demand lighting design that sells, emergency systems that save lives, and certification that satisfies landlords and fire authorities. This guide covers every electrical requirement for retail premises — from initial design to final certificate."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Retail Electrical Installation"
      relatedPages={relatedPages}
      ctaHeading="Complete Retail Certificates on Your Phone"
      ctaSubheading="Join 430+ UK electricians creating professional EIC and EICR certificates with AI board scanning, voice test entry, and instant PDF delivery. Built for commercial and retail fit-outs. 7-day free trial, cancel anytime."
    />
  );
}
