import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  Lightbulb,
  AlertTriangle,
  ShieldCheck,
  ClipboardCheck,
  Zap,
  Clock,
  Building2,
  PoundSterling,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Electrical Guides', href: '/guides' },
  { label: 'Emergency Lighting Installation', href: '/emergency-lighting-installation' },
];

const tocItems = [
  { id: 'what-is-emergency-lighting', label: 'What Is Emergency Lighting?' },
  { id: 'bs5266-standard', label: 'BS 5266 Part 1 Standard' },
  { id: 'types-of-emergency-lighting', label: 'Types of Emergency Lighting' },
  { id: 'lux-levels', label: 'Illuminance Requirements' },
  { id: 'system-types', label: 'Self-Contained vs Central Battery' },
  { id: 'maintained-non-maintained', label: 'Maintained vs Non-Maintained' },
  { id: 'installation-requirements', label: 'Installation Requirements' },
  { id: 'testing-certification', label: 'Testing & Certification' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'BS 5266 Part 1 is the UK standard governing emergency lighting design, installation, and testing. Compliance is a legal requirement for most non-domestic buildings under the Regulatory Reform (Fire Safety) Order 2005.',
  'Escape route lighting must achieve a minimum of 1 lux along the centre line of the escape route. Open area (anti-panic) lighting requires a minimum of 0.5 lux across the core area.',
  'High-risk task areas require emergency lighting at a minimum of 10% of the normal working illuminance, or 15 lux, whichever is greater.',
  'Emergency luminaires must reach full rated illuminance within 5 seconds (or 0.5 seconds for high-risk task areas) and sustain it for the rated duration — typically 1, 2, or 3 hours.',
  'Monthly function tests and annual full-rated-duration discharge tests are mandatory. All results must be recorded in a BS 5266-1 compliant logbook.',
];

const faqs = [
  {
    question: 'Which buildings require emergency lighting under BS 5266?',
    answer:
      'BS 5266 Part 1 applies to all premises where the failure of normal lighting would create a risk to the health and safety of occupants. This includes offices, shops, factories, hotels, schools, healthcare facilities, sports venues, and any other non-domestic building. Residential blocks of flats with communal areas are also commonly required to have emergency lighting. Single-family dwellings are generally excluded.',
  },
  {
    question: 'What is the minimum lux level for escape route emergency lighting?',
    answer:
      'Under BS 5266-1, escape route emergency lighting must provide a minimum horizontal illuminance of 1 lux along the centre line of the escape route. The ratio of maximum to minimum illuminance along the centre line must not exceed 40:1. For escape routes up to 2 metres wide, this 1 lux requirement applies. For wider escape routes, anti-panic lighting provisions apply instead.',
  },
  {
    question: 'What is the difference between maintained and non-maintained emergency lighting?',
    answer:
      'A maintained emergency luminaire is energised (lit) at all times, whether from normal or emergency power. A non-maintained luminaire only energises when the normal power supply fails. Maintained fittings are required in areas of public assembly, entertainment venues, and locations where occupants may not be familiar with the building layout. Non-maintained fittings are suitable for most workplaces where lighting is only needed during working hours.',
  },
  {
    question: 'What duration rating is required for emergency lighting?',
    answer:
      'BS 5266-1 requires emergency lighting to operate for the full evacuation period plus a contingency. The most common duration ratings are 1 hour, 2 hours, and 3 hours. The required duration depends on the building type and risk assessment. Most offices and retail premises require 1-hour or 3-hour fittings. High-risk premises such as hospitals, large hotels, and underground car parks typically require 3-hour rated systems.',
  },
  {
    question: 'Can I install emergency lighting as a self-contained or central battery system?',
    answer:
      'Both are valid under BS 5266. Self-contained systems (with a battery inside each luminaire) are simpler to install and are suitable for most buildings. Central battery systems (with a single battery supplying multiple luminaires) offer advantages in large buildings: easier battery management, no need for individual charging circuit monitoring, and often lower whole-life costs. Central systems are common in hospitals, large hotels, and multi-storey commercial buildings.',
  },
  {
    question: 'Who can install and certify emergency lighting?',
    answer:
      'Emergency lighting installation and certification should be carried out by a competent electrician with knowledge of BS 5266-1. A BS 5266-1 Emergency Lighting Certificate must be issued on completion of a new installation. In practice, installers should be registered with a competent person scheme such as NICEIC or NAPIT, and may also hold specific emergency lighting competency qualifications. The responsible person for the premises (under the Fire Safety Order) must ensure the installation is compliant.',
  },
  {
    question: 'What certificate do I issue after installing emergency lighting?',
    answer:
      'Upon completion, the installer must issue a BS 5266-1 Completion Certificate confirming that the installation has been designed, installed, and tested in accordance with the standard. This certificate remains with the premises and is required during fire safety inspections. Ongoing testing results are recorded in a BS 5266-1 log book which must be kept on the premises.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/emergency-lighting-testing',
    title: 'Emergency Lighting Testing Guide',
    description:
      'Monthly and annual testing requirements, log books, and what to do when a luminaire fails.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/fire-alarm-installation',
    title: 'Fire Alarm Installation',
    description: 'BS 5839 fire alarm systems — categories, wiring, and certification.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Landlord electrical inspection requirements and compliance deadlines.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete electrical certificates on your phone with instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/external-lighting-installation',
    title: 'External Lighting Installation',
    description: 'Outdoor lighting wiring, cable requirements, and planning considerations.',
    icon: Lightbulb,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-emergency-lighting',
    heading: 'What Is Emergency Lighting?',
    content: (
      <>
        <p>
          Emergency lighting is a secondary lighting system that automatically activates when the
          normal power supply to the main lighting fails. Its purpose is to enable the safe
          evacuation of a building and, where required, to allow essential tasks to continue safely
          until the emergency is resolved or evacuation is complete.
        </p>
        <p>
          In the UK, emergency lighting is a legal requirement in most non-domestic buildings. The
          primary legal driver is the Regulatory Reform (Fire Safety) Order 2005, which places a
          duty on the responsible person to ensure adequate means of escape are maintained — and
          those means of escape must be adequately lit. BS 5266 Part 1 is the technical standard
          that defines exactly how emergency lighting must be designed, installed, and maintained.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Legal basis</strong> — the Regulatory Reform (Fire Safety) Order 2005
                requires the responsible person to ensure adequate emergency lighting. Building
                Regulations Part B (Fire Safety) and Part M also reference emergency lighting
                requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Technical standard</strong> — BS 5266 Part 1:2016 is the UK standard for
                emergency lighting in premises other than cinemas and certain other specified
                premises. It covers design, installation, commissioning, and maintenance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scope</strong> — offices, retail premises, factories, warehouses, hotels,
                schools, healthcare facilities, sports venues, leisure centres, licensed premises,
                communal areas of residential blocks, car parks, and any other building where
                lighting failure would create a risk to occupants.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'bs5266-standard',
    heading: 'BS 5266 Part 1: The Emergency Lighting Standard',
    content: (
      <>
        <p>
          BS 5266 Part 1:2016 (Code of practice for the emergency lighting of premises) is the
          definitive UK standard for emergency lighting. It is harmonised with the European standard
          EN 1838 and covers the design philosophy, performance requirements, and maintenance
          obligations for emergency lighting systems.
        </p>
        <p>
          The standard defines three categories of emergency lighting, each serving a distinct
          purpose within a building's fire safety strategy:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Escape route lighting</strong> — illuminates designated escape routes to
                allow safe evacuation. Must achieve 1 lux minimum along the centre line of the route
                and illuminate exit signs and fire safety equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Open area (anti-panic) lighting</strong> — provided in large open areas to
                prevent panic and enable occupants to reach an escape route. Minimum 0.5 lux across
                the core area, which is the floor area excluding a 0.5 metre border around the
                perimeter.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>High-risk task area lighting</strong> — required in areas where hazardous
                processes or equipment are in use and must be brought to a safe state before
                evacuation. Minimum illuminance is 10% of the normal working illuminance or 15 lux,
                whichever is greater. Must reach full illuminance within 0.5 seconds.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The standard also specifies requirements for standby lighting — lighting provided to allow
          continued work in the event of normal supply failure — though standby lighting is distinct
          from escape lighting and is subject to different design criteria.
        </p>
      </>
    ),
  },
  {
    id: 'types-of-emergency-lighting',
    heading: 'Types of Emergency Lighting',
    content: (
      <>
        <p>
          Emergency lighting encompasses several different luminaire and sign types, each serving a
          specific function within the escape strategy.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency luminaires</strong> — general-purpose fittings that provide
                illuminance along escape routes and in open areas. Modern fittings are typically
                LED-based with a self-contained battery and automatic test capability.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency exit signs</strong> — internally illuminated signs indicating
                escape route directions. Must comply with BS EN 1838 and display the running person
                pictogram. Required above all final exits and at changes of direction on escape
                routes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Combination units</strong> — a single fitting that provides both escape
                route illumination and an illuminated exit sign. Common above final exit doors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>High-risk task area units</strong> — high-output fittings designed to reach
                full illuminance within 0.5 seconds. Often directional to illuminate specific
                machine controls or hazardous processes.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'lux-levels',
    heading: 'Illuminance Requirements Under BS 5266',
    content: (
      <>
        <p>
          The illuminance values specified in BS 5266-1 are minimum requirements that must be
          maintained at floor level throughout the rated duration of the emergency lighting system.
          These are measured values, not design values — the design must account for luminaire
          depreciation over the battery duration.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Escape routes (corridors, stairways)</strong> — minimum 1 lux along the
                centre line. Maximum-to-minimum ratio along the centre line must not exceed 40:1.
                Stairways must be lit so that each tread receives direct light.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Open areas (anti-panic)</strong> — minimum 0.5 lux across the core area
                (total floor area less a 0.5 m border). Anti-panic lighting is required in open
                areas exceeding 60 m² or where the escape route passes through an open area.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>High-risk task areas</strong> — minimum 10% of normal maintained illuminance
                or 15 lux, whichever is greater. Must be achieved within 0.5 seconds of normal
                supply failure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Activation time</strong> — for escape routes and open areas, 50% of the
                required illuminance must be achieved within 5 seconds of normal supply failure, and
                100% within 60 seconds. For high-risk task areas, 100% must be achieved within 0.5
                seconds.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'system-types',
    heading: 'Self-Contained vs Central Battery Systems',
    content: (
      <>
        <p>
          The two principal system architectures for emergency lighting are self-contained systems
          (each luminaire has its own battery) and central battery systems (a single battery
          supplies multiple luminaires via a dedicated wiring circuit).
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Self-contained (BS EN 60598-2-22)</strong> — the most common type in the UK.
                Each luminaire contains its own rechargeable battery, charger, and control
                circuitry. Installation is straightforward — just a permanent live feed and neutral
                to each fitting. Battery life is typically 4 years before replacement is required.
                Suitable for most commercial and light industrial premises.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Central battery (BS EN 50172)</strong> — a single battery bank (usually
                located in a dedicated plant room or secure cupboard) supplies the emergency
                circuit. Luminaires are standard fittings wired on a separate circuit from the
                battery unit. Advantages include: simpler battery management, lower whole-life cost
                in large installations, and the ability to test all luminaires simultaneously from
                one location. Common in hospitals, large hotels, underground car parks, and
                multi-storey commercial buildings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Addressable (automatic test) systems</strong> — self-contained or central
                battery systems with addressable luminaires that perform automatic function and
                duration tests and report results to a central monitoring panel. These systems
                satisfy the BS 5266-1 testing requirements automatically and log results
                electronically, greatly reducing maintenance burden in large buildings.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'maintained-non-maintained',
    heading: 'Maintained vs Non-Maintained Emergency Lighting',
    content: (
      <>
        <p>
          Emergency luminaires are classified by their operating mode: maintained fittings are lit
          at all times; non-maintained fittings only illuminate on mains failure.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Maintained</strong> — the lamp is energised at all times (normal and
                emergency modes). Required by BS 5266-1 in premises used by the public or where
                people may be unfamiliar with the building layout — including cinemas, theatres,
                concert halls, sports venues, shopping centres, and licensed premises.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Non-maintained</strong> — the lamp only illuminates when the normal mains
                supply fails. Suitable for workplaces where lighting is only needed when the
                building is occupied during normal working hours and occupants are familiar with the
                layout. Most appropriate for offices, warehouses, and factories.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sustained</strong> — a combined luminaire with separate lamp circuits for
                normal and emergency modes. The emergency lamp is non-maintained but shares the
                fitting with a normal lamp that is mains-powered. Less common in modern
                installations as LED emergency modules in standard fittings achieve the same result
                more elegantly.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The choice between maintained and non-maintained is determined by the{' '}
          <SEOInternalLink href="/guides/fire-risk-assessment">
            fire risk assessment
          </SEOInternalLink>{' '}
          and the type of premises. Where in doubt, maintained fittings are the safer specification
          as they also serve as normal lighting, reducing the total number of fittings required.
        </p>
      </>
    ),
  },
  {
    id: 'installation-requirements',
    heading: 'Installation Requirements',
    content: (
      <>
        <p>
          Emergency lighting installation must comply with BS 5266-1, BS 7671 (the IET Wiring
          Regulations), and any additional requirements specified in the fire risk assessment or
          building regulations approval. Key installation considerations include:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Circuit arrangement</strong> — self-contained luminaires require a permanent
                live feed (not switched) so the battery remains charged at all times. The supply
                must not be on the same circuit as the normal lighting it is designed to replace.
                The emergency circuit must be protected by a dedicated{' '}
                <SEOInternalLink href="/guides/rcd-protection-explained">RCD</SEOInternalLink> or
                RCBO.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Luminaire positioning</strong> — fittings must be positioned to achieve the
                required illuminance at floor level. Key locations include: above every final exit
                door, at changes of direction on escape routes, at stairways (each landing must be
                lit directly), adjacent to fire alarm call points and fire-fighting equipment, near
                first-aid points, and in toilet areas exceeding 8 m².
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Spacing calculations</strong> — the maximum spacing between luminaires
                depends on the mounting height and the photometric data for the specific fitting.
                Manufacturers provide spacing data in their technical sheets. Photometric
                calculations using software (DIALux, Relux, or manufacturer-specific tools) are
                recommended for larger or complex installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Exit signs</strong> — internally illuminated exit signs must display the BS
                EN ISO 7010 E001 running-person pictogram. Arrow direction must be correct for the
                escape route direction. Signs above final exit doors must be horizontal; directional
                signs at changes of direction must incorporate an appropriate arrow.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'testing-certification',
    heading: 'Testing & Certification',
    content: (
      <>
        <p>
          BS 5266-1 mandates a structured programme of tests following commissioning. All test
          results must be recorded in a dedicated logbook, which must be kept on the premises and
          made available for inspection by the fire authority or responsible person.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Monthly function test</strong> — simulate a mains failure for a short period
                (typically 1 minute using a test key or inhibit switch) to confirm each luminaire
                illuminates. The test must be brief enough not to significantly discharge the
                battery. Record the date, result, and any failed fittings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Annual full-duration test</strong> — discharge the batteries to their full
                rated duration (1 hour, 2 hours, or 3 hours depending on the fitting rating). All
                luminaires must remain fully illuminated throughout. This test should be performed
                at a time when the building is unoccupied, as it renders the emergency lighting
                inoperative during the discharge and recharge period.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Six-monthly intermediate test</strong> — where the full-duration test cannot
                be carried out annually (due to operational constraints), BS 5266-1 permits an
                intermediate test of half the rated duration. However, a full-duration test must
                still be performed at least every three years.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commissioning certificate</strong> — on completion of a new or modified
                installation, the installer must issue a BS 5266-1 Completion Certificate. This is a
                legal document confirming the system has been designed, installed, and tested in
                accordance with the standard.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Failed luminaires identified during testing must be replaced promptly. A failed luminaire
          on the escape route constitutes a breach of the fire safety obligations of the responsible
          person. Electricians should advise clients to carry out monthly tests themselves between
          annual visits.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Emergency Lighting Work',
    content: (
      <>
        <p>
          Emergency lighting installation and testing is a recurring revenue stream for electricians
          serving commercial, retail, and industrial clients. Every non-domestic premises with
          emergency lighting requires an annual test and periodic system upgrades as batteries
          degrade.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Issue Certificates on Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate certificate app
                  </SEOInternalLink>{' '}
                  to issue BS 5266-1 Emergency Lighting Certificates and log annual test results on
                  site. Send the completed certificate to the client before you leave the premises —
                  no evening paperwork.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Typical Costs (2026)</h4>
                <p className="text-white text-sm leading-relaxed">
                  Self-contained LED emergency luminaire: £15–£60 supply. Installation per fitting
                  (including cable and commissioning): £40–£100. Annual test per fitting: £5–£15. A
                  20-fitting commercial installation is typically worth £1,500–£3,000 in
                  installation revenue plus £200–£400 per year in testing and maintenance.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Manage emergency lighting certificates with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate to issue electrical certificates on site. BS 5266-1 emergency lighting certificates, EICR reports, and minor works notices — all on your phone with instant PDF export. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EmergencyLightingInstallationPage() {
  return (
    <GuideTemplate
      title="Emergency Lighting Installation UK | BS 5266 Guide"
      description="Complete guide to emergency lighting installation in the UK. BS 5266 Part 1 standard explained — escape route lighting (1 lux), anti-panic lighting (0.5 lux), high-risk task areas, maintained vs non-maintained, self-contained vs central battery, and certification."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Lightbulb}
      heroTitle={
        <>
          Emergency Lighting Installation UK:{' '}
          <span className="text-yellow-400">BS 5266 Complete Guide</span>
        </>
      }
      heroSubtitle="Everything electricians and responsible persons need to know about emergency lighting installation in the UK — BS 5266 Part 1 requirements, lux levels, system types, maintained vs non-maintained, installation rules, and certification."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Emergency Lighting Installation"
      relatedPages={relatedPages}
      ctaHeading="Issue Emergency Lighting Certificates on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site certification. BS 5266-1 emergency lighting certificates, EICR reports, and minor works notices with instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
