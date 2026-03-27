import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  AlertTriangle,
  Calculator,
  Zap,
  FileCheck2,
  PoundSterling,
  Cable,
  Lightbulb,
  Building,
  ClipboardCheck,
  Wrench,
  GraduationCap,
  Timer,
  Eye,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Emergency Lighting Cost', href: '/guides/emergency-lighting-installation-cost' },
];

const tocItems = [
  { id: 'overview', label: 'Emergency Lighting Overview' },
  { id: 'maintained-vs-non', label: 'Maintained vs Non-Maintained' },
  { id: 'self-contained-vs-central', label: 'Self-Contained vs Central Battery' },
  { id: 'material-costs', label: 'Material Costs Breakdown' },
  { id: 'labour-costs', label: 'Labour and Installation Costs' },
  { id: 'total-costs', label: 'Total Costs by System Type' },
  { id: 'bs5266', label: 'BS 5266 Requirements' },
  { id: 'testing-maintenance', label: 'Monthly and Annual Testing' },
  { id: 'certification', label: 'Certification Requirements' },
  { id: 'for-electricians', label: 'For Electricians: Quoting Emergency Lighting' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Emergency lighting installation costs range from £500 for a small office or shop with 4 to 6 self-contained luminaires to £10,000+ for a large commercial building with a central battery system.',
  'BS 5266 Part 1 is the British Standard for emergency lighting. It specifies design, installation, wiring, testing, and maintenance requirements for all non-domestic premises.',
  'Emergency lighting must provide a minimum duration of 1 hour for premises with a sleeping risk or 3 hours where evacuation may be prolonged. Most commercial installations specify 3 hours.',
  'BS 7671 Regulation 133.2 requires identification of circuits powered by safety or standby sources, including emergency lighting. Regulation 710.415.2 covers testing requirements for emergency lighting in medical and patient areas.',
  'Monthly functional tests (30 seconds) and annual full-duration tests (1 hour or 3 hours) are mandatory under BS 5266. Automated self-test luminaires reduce the maintenance burden significantly.',
];

const faqs = [
  {
    question: 'How much does emergency lighting installation cost in 2026?',
    answer:
      'Emergency lighting installation costs in 2026 range from approximately £500 for a small office with 4 to 6 self-contained luminaires to £10,000 or more for a large commercial building. A typical medium-sized commercial premises (office, shop, restaurant) with 10 to 20 emergency luminaires costs £1,500 to £4,000 including all materials, labour, testing, and certification. The main cost drivers are the number of luminaires, the type of system (self-contained vs central battery), and the complexity of the building layout.',
  },
  {
    question: 'What is the difference between maintained and non-maintained emergency lighting?',
    answer:
      'Non-maintained emergency lighting is only illuminated during a mains failure — the luminaire stays off during normal conditions and automatically switches on when the power fails. This is the most common type for offices, shops, and industrial premises. Maintained emergency lighting is illuminated at all times — it operates as normal lighting during mains supply and continues to operate from the battery during a mains failure. Maintained luminaires are required on emergency exit signs and in venues where the normal lighting may be dimmed (cinemas, theatres, nightclubs). Maintained systems cost more because the luminaire is in constant use.',
  },
  {
    question: 'How often must emergency lighting be tested?',
    answer:
      'BS 5266 Part 1 requires monthly functional tests and annual full-duration tests. The monthly test involves simulating a mains failure for a short period (typically 30 seconds for self-test luminaires or the minimum time needed to confirm all luminaires illuminate). The annual test is a full-duration discharge test — the system must run on battery power for the full rated duration (typically 3 hours) to confirm the batteries can sustain the required illumination. All test results must be recorded in a logbook. Automated self-test luminaires perform monthly and annual tests automatically and report failures via LED indicators or a central monitoring system.',
  },
  {
    question: 'Self-contained vs central battery — which is better?',
    answer:
      'Self-contained luminaires have their own battery built in — each fitting is independent and continues to operate if any other fitting fails. They are simpler to install (no separate battery room), cheaper for small to medium installations, and each luminaire can be replaced independently. Central battery systems power all emergency luminaires from a single battery unit, typically located in a plant room. They are more cost-effective for very large installations (50+ luminaires), easier to test centrally, and the batteries can be maintained in a controlled environment. However, a central battery system is a single point of failure — if the battery unit fails, all emergency lighting is lost.',
  },
  {
    question: 'What luminance levels does emergency lighting need to provide?',
    answer:
      'BS 5266 Part 1 (referencing BS EN 1838) specifies minimum illuminance levels. For escape routes: a minimum of 1 lux along the centre line of the escape route, with a minimum of 0.5 lux over the central band (half the route width). For open areas (anti-panic areas): a minimum of 0.5 lux over the floor area, excluding a 0.5m border band. For high-risk task areas: a minimum of 10% of the normal maintained illuminance or 15 lux, whichever is greater. Emergency exit signs must be clearly legible from the maximum viewing distance. These are minimum values — good design typically exceeds them.',
  },
  {
    question: 'Do all commercial premises need emergency lighting?',
    answer:
      'Yes. The Regulatory Reform (Fire Safety) Order 2005 (England and Wales) requires all non-domestic premises to have adequate emergency lighting as part of the fire safety provisions. This includes offices, shops, factories, warehouses, restaurants, hotels, care homes, schools, and places of entertainment. The fire risk assessment determines the extent of emergency lighting required. Even small premises with a simple layout require emergency lighting at final exits and exit signs. Domestic dwellings are generally exempt unless they are HMOs, communal areas of flats, or other shared residential premises.',
  },
  {
    question: 'Can LED emergency lighting replace old fluorescent emergency fittings?',
    answer:
      'Yes, and this is one of the most common emergency lighting upgrade projects. LED emergency luminaires offer significantly longer lamp life (50,000+ hours vs 10,000 hours for fluorescent), lower energy consumption, smaller and more discreet fittings, and better battery performance. When replacing fluorescent fittings with LED, the existing wiring can usually be reused if it is in good condition. However, the emergency lighting design should be reviewed to confirm that the new LED luminaires provide adequate illuminance levels — LED fittings often have different light distribution patterns compared to the fluorescent fittings they replace.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/bs5266-emergency-lighting-standard',
    title: 'BS 5266 Emergency Lighting Standard',
    description:
      'Complete guide to BS 5266 including design, installation, testing, and maintenance requirements.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/emergency-lighting-testing',
    title: 'Emergency Lighting Testing Guide',
    description:
      'Monthly and annual testing procedures for emergency lighting systems under BS 5266.',
    icon: Timer,
    category: 'Guide',
  },
  {
    href: '/tools/emergency-lighting-certificate',
    title: 'Emergency Lighting Certificate App',
    description:
      'Complete emergency lighting installation and test certificates on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/bs5839-fire-alarm-standard',
    title: 'BS 5839 Fire Alarm Standard',
    description:
      'Fire alarm and emergency lighting are often installed together — understand both standards.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description:
      'Quote emergency lighting installations with itemised luminaires, cable, and labour.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/lux-calculator',
    title: 'Lighting Lux Calculator',
    description:
      'Calculate illuminance levels to verify emergency lighting meets BS EN 1838 minimums.',
    icon: Lightbulb,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Emergency Lighting: When the Power Goes Out, People Need to Get Out',
    content: (
      <>
        <p>
          Emergency lighting exists for one purpose: to ensure that people can find their way out of
          a building safely when the normal lighting fails. It is a legal requirement in all
          commercial and non-domestic premises, and the consequences of an inadequate system during a
          real emergency are severe — both in human terms and in regulatory enforcement.
        </p>
        <p>
          For electricians, emergency lighting is steady, recurring work. Every commercial building
          needs it. Every system needs regular testing. Every few years, batteries need replacing.
          And every building renovation or change of use triggers a review of the emergency lighting
          design. Understanding the costs, the standards, and the certification requirements puts you
          in a strong position to win and deliver this work.
        </p>
        <p>
          This guide covers the real costs of emergency lighting installation in the UK in 2026,
          the different system types, the requirements of{' '}
          <SEOInternalLink href="/guides/bs5266-emergency-lighting-standard">
            BS 5266
          </SEOInternalLink>
          , and the testing and certification obligations that come with every installation.
        </p>
      </>
    ),
  },
  {
    id: 'maintained-vs-non',
    heading: 'Maintained vs Non-Maintained Emergency Lighting',
    content: (
      <>
        <p>
          The fundamental distinction in emergency lighting is between maintained and non-maintained
          luminaires. The choice affects both the cost and the application.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Non-Maintained</h3>
            <p className="text-white text-sm leading-relaxed">
              The emergency luminaire is off during normal mains conditions. It automatically
              illuminates only when the mains supply fails. The battery is kept charged by the mains
              supply during normal operation. This is the most common type for offices, corridors,
              stairwells, and most commercial premises. Lower cost per fitting and lower energy
              consumption (the lamp is not on during normal conditions). Typical cost: £30 to £100
              per luminaire.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Maintained</h3>
            <p className="text-white text-sm leading-relaxed">
              The emergency luminaire is illuminated at all times — it operates as normal lighting
              during mains supply and continues to operate from the battery when the mains fails.
              Required for exit signs (which must be permanently illuminated during occupied hours)
              and venues where the normal lighting may be deliberately dimmed (cinemas, theatres,
              restaurants). Higher cost per fitting and higher energy consumption. Typical cost: £50
              to £200 per luminaire.
            </p>
          </div>
        </div>
        <p>
          Many installations use a combination: non-maintained luminaires along escape routes and in
          open areas, with maintained luminaires for exit signs and in areas where the lighting
          level is normally low. Some luminaires offer combined maintained/non-maintained operation
          — they provide normal lighting during mains supply and switch to emergency-only output
          during a failure.
        </p>
      </>
    ),
  },
  {
    id: 'self-contained-vs-central',
    heading: 'Self-Contained vs Central Battery Systems',
    content: (
      <>
        <p>
          The second key design decision is whether to use self-contained luminaires (each with its
          own battery) or a central battery system that powers all emergency luminaires from a single
          battery bank.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Self-contained</strong> — each luminaire has its own rechargeable battery
                (typically NiCd or NiMH, increasingly Li-ion). The battery is charged from the mains
                supply and provides emergency illumination when the mains fails. Advantages: simple
                installation (standard mains wiring), each fitting is independent (failure of one
                does not affect others), easy to replace individual fittings. Disadvantages: battery
                replacement required every 4 to 6 years in each fitting, testing requires access to
                each luminaire.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Central battery</strong> — a single battery unit (typically located in a
                plant room or electrical intake) supplies all emergency luminaires via dedicated
                fire-resistant wiring. Advantages: centralised battery maintenance, centralised
                testing and monitoring, no batteries in individual fittings (simpler luminaires,
                easier access for lamp replacement). Disadvantages: higher installation cost
                (fire-resistant wiring to every luminaire), single point of failure, requires a
                dedicated space for the battery unit.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For most small to medium commercial premises (up to approximately 40 luminaires),
          self-contained systems are more cost-effective and practical. For larger buildings (hotels,
          hospitals, shopping centres) with 50+ luminaires, central battery systems offer advantages
          in maintenance and monitoring. Modern self-test luminaires with automated reporting are
          narrowing the maintenance advantage of central systems.
        </p>
      </>
    ),
  },
  {
    id: 'material-costs',
    heading: 'Material Costs: Luminaires, Signage, and Wiring',
    content: (
      <>
        <p>
          Emergency lighting material costs depend on the luminaire type, system configuration, and
          building requirements.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Self-Contained Luminaires</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Non-maintained LED downlight (3W, 3hr)</strong> — £25 to £80 per unit.
                Compact recessed fitting for corridors and circulation areas. Self-test versions
                from approximately £50.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Non-maintained LED bulkhead (3W to 8W, 3hr)</strong> — £35 to £120 per unit.
                Surface-mounted for stairwells, plant rooms, and exposed locations. IP65 versions
                for external or damp areas. Anti-ligature versions for mental health and custodial
                facilities from £200+.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Maintained illuminated exit sign</strong> — £40 to £150 per unit. Wall or
                ceiling mounted, with running man pictogram conforming to BS 5499. LED with 3-hour
                battery backup.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency conversion kit</strong> — £30 to £80 per unit. Converts a standard
                luminaire into an emergency luminaire by adding a battery pack and inverter module.
                Useful for retrofit installations where existing fittings are suitable.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Central Battery Systems</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Central battery unit (small, up to 50 luminaires)</strong> — £1,500 to
                £4,000. Wall-mounted unit with charger, battery, and monitoring panel.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Central battery unit (large, 50 to 200+ luminaires)</strong> — £4,000 to
                £15,000+. Floor-standing cabinet with modular battery banks, automatic testing, and
                network monitoring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire-resistant wiring (FP200 or equivalent)</strong> — £1.50 to £3.00 per
                metre. Required for all central battery system wiring to maintain circuit integrity
                during fire.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'labour-costs',
    heading: 'Labour and Installation Costs',
    content: (
      <>
        <p>
          Labour costs for emergency lighting installation depend on the number of luminaires, the
          building construction (how easy it is to route cables), and the system type.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Self-contained luminaire installation</strong> — £30 to £60 per luminaire
                including mounting, wiring, and initial test. A competent electrician can typically
                install 8 to 12 self-contained luminaires per day in a straightforward commercial
                building.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Central battery system installation</strong> — £60 to £100+ per luminaire
                including fire-resistant cable runs, mounting, connection, and testing. The fire-
                resistant wiring adds significant labour time. Plus £400 to £800 for the central
                battery unit installation and commissioning.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Design and documentation</strong> — £200 to £500 for a professional
                emergency lighting design including luminaire layout, illuminance calculations,
                and as-built drawings. Often included in larger project quotes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commissioning and certification</strong> — £150 to £400 including full-
                duration discharge test, illuminance measurements, and completion of the BS 5266
                commissioning certificate. Allow a full day for the annual discharge test on a
                larger system.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'total-costs',
    heading: 'Total Emergency Lighting Costs by System Type',
    content: (
      <>
        <p>
          Here are realistic total costs for emergency lighting installations in 2026, covering
          design, materials, installation, testing, and certification.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Small office/shop (4 to 6 luminaires)</strong> — £500 to £1,000 total.
                Self-contained LED fittings, 1 to 2 exit signs, standard mains wiring. Half-day
                installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Medium commercial (10 to 20 luminaires)</strong> — £1,500 to £4,000 total.
                Self-contained LED fittings with self-test, exit signs, open area coverage.
                Professional design and full certification. 1 to 2 days installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Large commercial self-contained (30 to 50 luminaires)</strong> — £4,000 to
                £8,000 total. Self-test luminaires with automated monitoring, comprehensive coverage
                of all escape routes and open areas. 3 to 5 days installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Central battery system (50 to 100+ luminaires)</strong> — £10,000 to
                £30,000+ total. Central battery unit, fire-resistant wiring to every luminaire,
                professional design, full commissioning. 1 to 4 weeks installation.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Quote emergency lighting installations accurately"
          description="Elec-Mate's quoting app helps you build itemised quotes for emergency lighting projects — luminaires, exit signs, cable, labour, testing, and certification. Professional PDF quotes from your phone."
          icon={Lightbulb}
        />
      </>
    ),
  },
  {
    id: 'bs5266',
    heading: 'BS 5266: The Emergency Lighting Standard',
    content: (
      <>
        <p>
          BS 5266 Part 1 is the British Standard for emergency escape lighting. It references the
          European standard BS EN 1838 for specific photometric requirements. Here are the key
          requirements every electrician installing emergency lighting must understand:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Duration</strong> — emergency lighting must provide illumination for a
                minimum of 1 hour in premises where the occupants are familiar with the layout and
                can evacuate quickly. In most commercial premises, and all premises with a sleeping
                risk (hotels, care homes, hospitals), the minimum duration is 3 hours.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Illuminance levels</strong> — escape routes: minimum 1 lux along the centre
                line. Open areas: minimum 0.5 lux over the floor area. High-risk task areas:
                minimum 10% of normal or 15 lux, whichever is greater. The illuminance must be
                achieved within 5 seconds of mains failure (60 seconds for secondary battery systems
                in high-risk areas).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Luminaire positioning</strong> — emergency luminaires must be provided near
                each exit door, at changes of direction, at intersections of corridors, near each
                staircase, near any change of floor level, at first aid posts, at firefighting
                equipment, at call points, and adjacent to final exits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Exit signs</strong> — emergency exit signs must conform to BS 5499 and be
                illuminated (maintained) during all occupied hours. The signs must be clearly visible
                from the maximum viewing distance and include the running man pictogram.
              </span>
            </li>
          </ul>
        </div>
        <p>
          BS 7671 Regulation 133.2 requires that circuits powered by safety or standby sources
          (including emergency lighting) are clearly identified. Regulation 710.415.2 provides
          additional requirements for emergency lighting in medical locations, including autonomous
          test regimes and specific duration requirements to maintain visibility during power loss.
        </p>
      </>
    ),
  },
  {
    id: 'testing-maintenance',
    heading: 'Monthly and Annual Testing: The Ongoing Obligation',
    content: (
      <>
        <p>
          Emergency lighting is not a fit-and-forget installation. BS 5266 mandates regular testing
          throughout the life of the system, and the responsible person (building owner or manager)
          has a legal obligation to ensure testing is carried out and documented.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Timer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Monthly functional test</strong> — simulate a mains failure for long enough
                to confirm all emergency luminaires illuminate correctly (minimum 30 seconds for
                self-test units, or until all luminaires have been visually checked). Check for
                failed lamps, dim output, or fittings that do not illuminate. Record the results in
                the logbook. Estimated cost if contracted to an electrician: £50 to £150 per visit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Timer className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Annual full-duration test</strong> — run the emergency lighting system on
                battery power for the full rated duration (1 hour or 3 hours). Check that all
                luminaires are still illuminated at the end of the test period. This confirms that
                the batteries can sustain the required duration. Allow the batteries to fully
                recharge before normal occupation resumes (typically 24 hours). Estimated cost:
                £150 to £400 depending on system size.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Timer className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Battery replacement</strong> — self-contained luminaire batteries typically
                need replacement every 4 to 6 years. Central battery systems typically need battery
                replacement every 5 to 10 years. The annual full-duration test identifies batteries
                that are approaching end of life (luminaires that fail before the end of the test
                duration).
              </span>
            </li>
          </ul>
        </div>
        <p>
          Modern self-test luminaires automate much of this process. They perform automatic monthly
          and annual tests, record the results internally, and indicate pass or fail via LED
          indicators. Networked self-test systems (such as the Luceco Elevate Wireless platform)
          report results to a central monitoring system, eliminating the need for physical inspection
          of every luminaire. Self-test luminaires cost more upfront but significantly reduce the
          ongoing maintenance cost.
        </p>
      </>
    ),
  },
  {
    id: 'certification',
    heading: 'Certification Requirements',
    content: (
      <>
        <p>
          Every emergency lighting installation must be certified and documented. The certification
          requirements include:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 5266 commissioning certificate</strong> — issued after installation,
                confirming the system meets the design specification and BS 5266 requirements.
                Includes details of the system type, luminaire schedule, duration, and full-duration
                test results.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical installation certificate</strong> — the electrical wiring for the
                emergency lighting system requires an EIC or Minor Works Certificate under BS 7671,
                covering continuity, insulation resistance, and earth fault loop impedance testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>As-built drawings</strong> — a drawing showing the location of every
                emergency luminaire, exit sign, and the central battery unit (if applicable). This
                is essential for future maintenance and testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test logbook</strong> — a logbook must be established at handover for
                recording all monthly and annual test results. The logbook should be kept on the
                premises and available for inspection by the fire authority.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Elec-Mate supports{' '}
          <SEOInternalLink href="/tools/emergency-lighting-certificate">
            emergency lighting certification
          </SEOInternalLink>{' '}
          on mobile — complete the installation details, luminaire schedule, test results, and
          generate a professional PDF certificate on site.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Quoting Emergency Lighting Work',
    content: (
      <>
        <p>
          Emergency lighting is reliable, recurring revenue. Every commercial building needs it,
          every system needs annual testing, and batteries need periodic replacement. Building a
          portfolio of emergency lighting maintenance contracts provides predictable income alongside
          the one-off installation work.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quoting App</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use Elec-Mate's{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to build itemised quotes for emergency lighting. Luminaires, exit signs, cable,
                  conversion kits, labour, design, testing, and certification — all itemised with
                  your margins. Include a maintenance contract option in the quote to lock in
                  recurring revenue.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Emergency Lighting Certificates</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete{' '}
                  <SEOInternalLink href="/tools/emergency-lighting-certificate">
                    emergency lighting certificates
                  </SEOInternalLink>{' '}
                  on your phone — installation commissioning, annual test certificates, and
                  maintenance records. PDF export on site, emailed to the building manager.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote, install, and maintain emergency lighting systems"
          description="Join 430+ UK electricians using Elec-Mate for professional quoting, emergency lighting certification, and maintenance documentation. Build recurring revenue from testing contracts. 7-day free trial."
          icon={Lightbulb}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EmergencyLightingCostPage() {
  return (
    <GuideTemplate
      title="Emergency Lighting Installation Cost 2026 | UK Price Guide"
      description="How much does emergency lighting installation cost in 2026? Complete UK price guide covering maintained vs non-maintained, self-contained vs central battery, BS 5266 requirements, material costs, testing obligations, and certification."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cost Guide"
      badgeIcon={Lightbulb}
      heroTitle={
        <>
          Emergency Lighting Installation Cost:{' '}
          <span className="text-yellow-400">UK Price Guide 2026</span>
        </>
      }
      heroSubtitle="From self-contained LED bulkheads to full central battery systems — this guide covers every cost element of emergency lighting. Material prices, labour rates, BS 5266 compliance, testing obligations, and the certification requirements that protect lives and livelihoods."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Emergency Lighting Costs"
      relatedPages={relatedPages}
      ctaHeading="Quote and Certify Emergency Lighting on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for emergency lighting quoting, certification, and test documentation. Professional results every time. 7-day free trial, cancel anytime."
    />
  );
}
