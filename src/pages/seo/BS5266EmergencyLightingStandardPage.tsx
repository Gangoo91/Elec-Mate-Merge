import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Scale,
  BookOpen,
  Shield,
  AlertTriangle,
  FileCheck2,
  GraduationCap,
  ClipboardCheck,
  ShieldCheck,
  Brain,
  Lightbulb,
  Clock,
  Building2,
  Camera,
  Receipt,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Regulations', href: '/guides/bs-7671-18th-edition-guide' },
  { label: 'BS 5266', href: '/guides/bs-5266-emergency-lighting-standard' },
];

const tocItems = [
  { id: 'what-is-bs5266', label: 'What Is BS 5266?' },
  { id: 'legal-requirements', label: 'Legal Requirements' },
  { id: 'escape-route-lighting', label: 'Escape Route Lighting' },
  { id: 'open-area-lighting', label: 'Open Area Lighting' },
  { id: 'high-risk-areas', label: 'High-Risk Task Area Lighting' },
  { id: 'standby-lighting', label: 'Standby Lighting' },
  { id: 'testing-intervals', label: 'Testing Intervals' },
  { id: 'certification-elec-mate', label: 'Certification with Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'BS 5266-1 is the UK code of practice for emergency lighting, covering escape route lighting, open area lighting, high-risk task area lighting, and standby lighting.',
  'Emergency lighting is a legal requirement under the Regulatory Reform (Fire Safety) Order 2005, the Health and Safety at Work Act 1974, and Building Regulations Approved Document B.',
  'Emergency luminaires must provide a minimum of 1 lux along the centre line of an escape route, with a minimum duration of 3 hours for most commercial premises.',
  'Testing intervals are defined as: monthly functional tests (flick test), annually a full rated duration test (3-hour battery discharge), and daily visual checks where practicable.',
  'Elec-Mate includes emergency lighting certificate templates, AI-powered defect coding, and training courses covering BS 5266 design, installation, and testing requirements.',
];

const faqs = [
  {
    question: 'What is the minimum duration for emergency lighting?',
    answer:
      'BS 5266-1 recommends a minimum duration of 3 hours for emergency lighting in most premises. This is based on the assumption that it could take up to 3 hours to safely evacuate a building and for normal lighting to be restored. Some premises may require a longer duration — for example, sleeping accommodation such as hotels, hospitals, and care homes may need emergency lighting that lasts the full period until daylight or until the normal supply is restored. The 3-hour duration must be achieved after the battery has been charged in normal service. The battery must reach 80% of its rated capacity within 24 hours of the previous discharge test. For standby lighting (used for continuing essential activities, not just evacuation), the duration depends on the specific risk assessment.',
  },
  {
    question: 'How often does emergency lighting need to be tested?',
    answer:
      'BS 5266-1 sets out a three-tier testing regime. A daily visual check should confirm that the green indicator light on each self-contained luminaire is illuminated (indicating the battery is charging). A monthly functional test involves simulating a mains failure (usually by switching off the supply to the emergency lighting circuit) and checking that each luminaire switches to battery mode within 5 seconds and provides adequate illumination. This test should last long enough to confirm the lamps illuminate but not so long that it significantly discharges the batteries — typically 30 seconds to a few minutes. An annual full rated duration test involves a complete discharge for the full rated duration (typically 3 hours). After this test, the batteries are recharged and all luminaires are checked to confirm they have recovered to full charge within 24 hours.',
  },
  {
    question: 'Do I need emergency lighting in a domestic property?',
    answer:
      'For a standard domestic dwelling (a single household), emergency lighting is not generally required by Building Regulations. However, emergency lighting is required in the common areas (corridors, stairways, lobbies) of purpose-built blocks of flats and in Houses in Multiple Occupation (HMOs). For HMOs, the local authority housing team will specify the emergency lighting requirements as a condition of the HMO licence. The LACORS fire safety guidance for HMOs references BS 5266 for emergency lighting requirements. In larger HMOs or purpose-built blocks, a full BS 5266-compliant emergency lighting system with regular testing and certification may be required. For smaller HMOs, battery-operated emergency luminaires with self-test functionality may be acceptable — but always check with the local authority.',
  },
  {
    question: 'What is the difference between maintained and non-maintained emergency lighting?',
    answer:
      'Maintained emergency luminaires are permanently illuminated — they operate as normal room lighting when the mains supply is available and automatically switch to battery power when the mains fails. They are used in areas where the lighting could be switched off (for example, a cinema or theatre) so that emergency lighting is always visible regardless of the position of the normal lighting switches. Non-maintained emergency luminaires are off during normal conditions and only switch on when the mains supply fails. They are the most common type and are used in areas where the normal lighting is always on during occupation (for example, office corridors, stairways, and car parks). There are also sustained luminaires, which contain two lamps — one operating as normal lighting and one operating as the emergency lamp (non-maintained). The choice between maintained and non-maintained depends on the risk assessment and the specific application.',
  },
  {
    question: 'Can an electrician carry out emergency lighting testing?',
    answer:
      'Yes. A qualified electrician is competent to design, install, and test emergency lighting systems in accordance with BS 5266-1. The testing does not require specialist fire alarm qualifications — it is fundamentally an electrical testing task. The monthly functional test involves isolating the supply to the emergency lighting circuit and checking that each luminaire operates on battery. The annual full duration test involves the same isolation but allowing the system to run for the full 3-hour rated duration. The electrician must record the results, including any luminaires that fail to illuminate, provide inadequate light output, or fail to achieve the full duration. Any defective luminaires must be replaced. Emergency lighting testing is a valuable recurring revenue stream — commercial premises need monthly and annual tests, creating regular maintenance contracts for electricians.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/emergency-lighting-certificate',
    title: 'Emergency Lighting Certificate App',
    description:
      'Create digital emergency lighting test certificates on your phone with BS 5266 compliance and professional PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/bs-5839-fire-alarm-standard',
    title: 'BS 5839 Fire Alarm Standard',
    description:
      'Complete guide to fire detection and fire alarm systems — Part 1 commercial, Part 6 domestic, categories, and grades.',
    icon: Shield,
    category: 'Guide',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description:
      'The IET Wiring Regulations covering all electrical installation work including emergency lighting circuits.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-certificate-types-uk',
    title: 'Electrical Certificate Types UK',
    description:
      'EIC, EICR, Minor Works, fire alarm, emergency lighting — which certificate is required for each type of work.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/electricity-at-work-regulations',
    title: 'Electricity at Work Regulations',
    description:
      'Employer duties for electrical safety in the workplace, including emergency lighting system maintenance.',
    icon: Scale,
    category: 'Guide',
  },
  {
    href: '/training/emergency-lighting',
    title: 'Emergency Lighting Course',
    description:
      'Study BS 5266 with structured training modules covering design, installation, testing, and certification.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-bs5266',
    heading: 'What Is BS 5266? The UK Emergency Lighting Standard',
    content: (
      <>
        <p>
          BS 5266 is the British Standard code of practice for the emergency lighting of premises.
          The primary document is <strong>BS 5266-1</strong>, which provides guidance on the design,
          installation, wiring, testing, and maintenance of emergency lighting systems in buildings.
          It works alongside the European standard BS EN 1838, which specifies the minimum
          illuminance levels and design parameters.
        </p>
        <p>
          Emergency lighting is the lighting that operates when the normal mains-powered lighting
          fails. Its purpose is to enable the safe evacuation of a building, to illuminate fire
          safety equipment (extinguishers, call points, fire exits), and to allow high-risk
          processes to be safely shut down. Without adequate emergency lighting, a power failure in
          a building at night or in a windowless space could leave occupants in complete darkness —
          creating a serious risk of injury from falls, collisions, and panic.
        </p>
        <p>
          For electricians, emergency lighting is a core competence area. It features in domestic
          work (HMOs, blocks of flats), commercial work (offices, shops, warehouses), and industrial
          work (factories, plant rooms). Understanding{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink> alone
          is not enough — you also need to understand BS 5266-1 and BS EN 1838 to design and install
          emergency lighting systems correctly.
        </p>
      </>
    ),
  },
  {
    id: 'legal-requirements',
    heading: 'Legal Requirements for Emergency Lighting',
    content: (
      <>
        <p>
          Emergency lighting is a legal requirement in the UK under several overlapping pieces of
          legislation:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulatory Reform (Fire Safety) Order 2005</strong> — the "responsible
                person" (usually the employer, building owner, or managing agent) must ensure that
                emergency routes and exits are equipped with emergency lighting of adequate
                intensity. The Order applies to virtually all non-domestic premises in England and
                Wales.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Health and Safety at Work Act 1974</strong> — employers must ensure the
                health and safety of employees at work, which includes providing adequate emergency
                lighting in workplaces. The{' '}
                <SEOInternalLink href="/guides/electricity-at-work-regulations">
                  Workplace (Health, Safety and Welfare) Regulations 1992
                </SEOInternalLink>{' '}
                specifically require that every workplace has suitable and sufficient emergency
                lighting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building Regulations Approved Document B</strong> — requires emergency
                lighting to be provided in accordance with BS 5266-1 for all new buildings and
                material alterations where the building has a floor area exceeding 60m² or where
                there are inner rooms without direct access to a final exit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO licensing requirements</strong> — local authorities require emergency
                lighting in the common areas of HMOs as a condition of the HMO licence. The LACORS
                fire safety guidance for HMOs references BS 5266.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Failure to provide or maintain adequate emergency lighting is an offence under the Fire
          Safety Order 2005 and can result in enforcement notices, prohibition notices, and
          prosecution. In the event of a fire in which occupants are injured because of inadequate
          emergency lighting, the responsible person could face criminal charges including corporate
          manslaughter in the most serious cases.
        </p>
      </>
    ),
  },
  {
    id: 'escape-route-lighting',
    heading: 'Escape Route Lighting',
    content: (
      <>
        <p>
          Escape route lighting is the most critical component of an emergency lighting system. Its
          purpose is to illuminate the escape routes so that occupants can see where they are going
          during an evacuation. BS EN 1838 sets out the specific illuminance requirements:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Minimum 1 lux</strong> along the centre line of the escape route at floor
                level. The centre band (half the width of the route) must achieve at least 1 lux.
                The edge bands must achieve at least 0.5 lux (50% of the centre line value).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Uniformity ratio</strong> — the ratio of maximum to minimum illuminance on
                the escape route must not exceed 40:1. This prevents dark spots that could cause
                trips or falls.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>50% of required illuminance within 5 seconds.</strong> The emergency
                luminaire must achieve at least 50% of the required illuminance (0.5 lux on the
                centre line) within 5 seconds of the mains supply failing. Full illuminance (1 lux)
                must be achieved within 60 seconds.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Minimum duration of 3 hours.</strong> The emergency luminaire must maintain
                the required illuminance for at least 3 hours on battery power.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Emergency luminaires on escape routes should be positioned at every change of direction,
          at every change of floor level (stairways), at every intersection of corridors, at each
          final exit, immediately outside each final exit, near each first aid post, near each
          fire-fighting equipment point, and near each manual call point.
        </p>
        <p>
          The positioning of luminaires is critical to achieving the uniformity requirement. Placing
          luminaires too far apart will create dark zones between them, while placing them too close
          together wastes equipment and increases maintenance costs. BS 5266-1 provides guidance on
          luminaire spacing based on the mounting height and the light output of the luminaire.
        </p>
      </>
    ),
  },
  {
    id: 'open-area-lighting',
    heading: 'Open Area (Anti-Panic) Lighting',
    content: (
      <>
        <p>
          Open area lighting (also called anti-panic lighting) is required in large open areas such
          as open-plan offices, shop floors, assembly halls, sports halls, and similar spaces
          exceeding 60m² in floor area. The purpose is to prevent panic and provide enough
          illumination for occupants to identify the escape routes and move safely towards them.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Minimum 0.5 lux</strong> at floor level across the entire open area. This is
                lower than the escape route requirement (1 lux) because the purpose is orientation,
                not detailed navigation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Uniformity ratio</strong> — the ratio of maximum to minimum illuminance must
                not exceed 40:1.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Coverage</strong> — the 0.5 lux minimum must be achieved across the entire
                area, excluding a 0.5m border around the perimeter.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Duration</strong> — the same minimum of 3 hours applies, with 50% of
                required illuminance within 5 seconds and full illuminance within 60 seconds.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Open area lighting is often achieved by converting a proportion of the normal room
          luminaires to emergency operation (maintained or non-maintained with battery back-up
          packs). The designer must calculate how many luminaires need emergency conversion to
          achieve the 0.5 lux minimum across the area. Emergency lighting design software or
          manufacturer spacing tables are used to verify the design.
        </p>
      </>
    ),
  },
  {
    id: 'high-risk-areas',
    heading: 'High-Risk Task Area Lighting',
    content: (
      <>
        <p>
          High-risk task area lighting is required where a sudden loss of normal lighting would
          create a direct hazard to the safety of the occupants. This applies to any work activity
          that involves a significant risk of injury if the lights go out — for example:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Machinery operation</strong> — workers operating lathes, presses, saws, or
                other dangerous machinery. A sudden loss of visibility while operating machinery
                could result in serious injury.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Chemical handling</strong> — areas where hazardous chemicals are handled,
                mixed, or stored. A loss of lighting could lead to spills, incorrect handling, or
                exposure to harmful substances.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical switchrooms</strong> — a power failure in an electrical
                switchroom requires the operator to see clearly to carry out switching operations
                safely. Emergency lighting in switchrooms is essential.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Working at height</strong> — any area where workers are on scaffolding,
                ladders, or elevated platforms. A sudden loss of visibility could cause falls.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The illuminance requirement for high-risk task areas is significantly higher than for
          escape routes. BS EN 1838 specifies a minimum of{' '}
          <strong>10% of the normal task illuminance or 15 lux</strong>, whichever is greater. The
          uniformity ratio must not exceed 10:1 (much tighter than the 40:1 for escape routes). The
          light must reach the required level within 0.5 seconds of mains failure — much faster than
          the 5-second requirement for escape routes.
        </p>
        <p>
          This high requirement means that high-risk task area emergency lighting often needs
          higher-output luminaires with fast-response light sources (LEDs are ideal for this as they
          reach full output virtually instantly).
        </p>
      </>
    ),
  },
  {
    id: 'standby-lighting',
    heading: 'Standby Lighting',
    content: (
      <>
        <p>
          Standby lighting is not strictly part of the emergency escape lighting system, but it is
          covered by BS 5266-1. Standby lighting is provided to enable normal activities to continue
          during a mains power failure. It is used in situations where a complete shutdown is not
          acceptable — for example:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hospital operating theatres</strong> — surgical procedures cannot be
                interrupted by a power failure. Standby lighting (usually from a generator) provides
                full working illumination until the normal supply is restored.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Data centres</strong> — standby lighting allows staff to continue working
                during a power outage while the UPS and generator maintain server operations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Control rooms</strong> — building management system control rooms, security
                monitoring centres, and similar facilities where continuous operation is essential.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Standby lighting is typically powered by a generator or central battery system with an
          automatic changeover switch. The illuminance level for standby lighting is determined by
          the specific requirements of the activity — it is often the same as the normal lighting
          level. The standby lighting system must be designed to integrate with the emergency escape
          lighting so that both systems can operate simultaneously during a mains failure.
        </p>
        <SEOAppBridge
          title="Remedial estimator for emergency lighting defects"
          description="Found faulty emergency luminaires during testing? Elec-Mate's remedial works estimator prices each replacement — luminaire cost, labour, and margin — and generates a professional quote. Hand the client the test report and the quote in the same visit."
          icon={Receipt}
        />
      </>
    ),
  },
  {
    id: 'testing-intervals',
    heading: 'Testing Intervals: Daily, Monthly, and Annual',
    content: (
      <>
        <p>
          Regular testing of emergency lighting is essential to ensure the system will function when
          needed. BS 5266-1 defines a clear testing schedule:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Daily — Visual check.</strong> Where practicable, a visual check should be
                made to confirm that the green charging indicator on each self-contained luminaire
                is illuminated. This indicates the battery is charging normally. Any luminaire with
                a red fault indicator or no indicator light should be investigated.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Monthly — Functional test.</strong> Simulate a mains failure by switching
                off the supply to the emergency lighting circuit (or using a test switch on each
                luminaire). Check that each luminaire switches to battery mode within 5 seconds and
                provides adequate illumination. The test should last long enough to confirm
                operation but keep the discharge short — typically a few minutes. Record the results
                in the emergency lighting log book, noting any luminaires that fail to illuminate or
                show signs of reduced light output.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Annually — Full rated duration test.</strong> Discharge the batteries for
                the full rated duration (typically 3 hours). At the end of the test period, check
                that each luminaire is still providing adequate illumination. After the test,
                restore the mains supply and check that each luminaire recharges fully within 24
                hours. Any luminaire that fails to maintain output for the full duration or fails to
                recharge must be replaced. This test should be carried out at a time that minimises
                disruption — ideally during daylight hours in a building with windows, or outside
                normal working hours.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Many modern self-contained emergency luminaires include automatic self-test functionality.
          These luminaires automatically carry out a brief functional test (30 seconds to 1 minute)
          at regular intervals and a full duration test once a year. The results are indicated by
          LED status lights on the luminaire. Self-testing luminaires reduce the manual testing
          burden but do not eliminate it entirely — the results must still be checked and recorded.
        </p>
        <p>
          All test results must be recorded in an emergency lighting log book, which should be kept
          on the premises and available for inspection by the fire authority. The log book should
          record the date, time, type of test, results, and any remedial action taken.
        </p>
      </>
    ),
  },
  {
    id: 'certification-elec-mate',
    heading: 'Emergency Lighting Certification with Elec-Mate',
    content: (
      <>
        <p>
          Proper documentation is essential for emergency lighting systems. Clients need test
          certificates to demonstrate compliance with the Fire Safety Order, and the fire authority
          can request evidence of regular testing at any time. Elec-Mate provides everything you
          need to manage emergency lighting work efficiently:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Emergency Lighting Certificate</h4>
                <p className="text-white text-sm leading-relaxed">
                  Elec-Mate includes a dedicated emergency lighting certificate template compliant
                  with BS 5266-1. Complete the certificate on your phone during the test, record
                  luminaire statuses, and export as a professional PDF. Send it to the client by
                  email or WhatsApp before you leave.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <Camera className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Photo Documentation</h4>
                <p className="text-white text-sm leading-relaxed">
                  Attach photos of failed luminaires, damaged fittings, or compliance issues
                  directly to the certificate. The photos are embedded in the PDF, providing clear
                  evidence to the client and the fire authority.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Receipt className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quoting and Invoicing</h4>
                <p className="text-white text-sm leading-relaxed">
                  Found failed luminaires during testing? Use Elec-Mate's quoting tool to price the
                  replacements and send the quote alongside the test report. Then invoice the client
                  directly from the app. Complete the entire workflow on site — no desk time.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <GraduationCap className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">BS 5266 Training Course</h4>
                <p className="text-white text-sm leading-relaxed">
                  Study BS 5266-1 with Elec-Mate's structured training modules. Covers system
                  design, luminaire siting, illuminance requirements, testing procedures, and
                  certification. Part of the 46+ course library. Plus flashcards and mock exams.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Emergency lighting testing made efficient"
          description="Elec-Mate streamlines the entire emergency lighting workflow — testing, certification, defect reporting, quoting, and invoicing. All from your phone, all on site. Plus AI agents, 50+ calculators, and 46+ training courses. 7-day free trial."
          icon={Lightbulb}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function BS5266EmergencyLightingStandardPage() {
  return (
    <GuideTemplate
      title="BS 5266 Emergency Lighting Standard | UK Guide"
      description="Complete guide to BS 5266 emergency lighting standard. Escape routes, open areas, high-risk task areas, standby lighting, testing intervals (daily, monthly, annual), and certification requirements for UK electricians."
      datePublished="2025-06-20"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Regulations"
      badgeIcon={Scale}
      heroTitle={
        <>
          BS 5266 Emergency Lighting: <span className="text-yellow-400">The Complete UK Guide</span>
        </>
      }
      heroSubtitle="BS 5266-1 is the UK code of practice for emergency lighting. It covers escape route lighting, open area lighting, high-risk task areas, and standby lighting. This guide explains the design requirements, illuminance levels, testing intervals, and certification — essential knowledge for every electrician."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About BS 5266 Emergency Lighting"
      relatedPages={relatedPages}
      ctaHeading="Emergency Lighting Certificates on Your Phone"
      ctaSubheading="Create professional BS 5266-compliant emergency lighting certificates with Elec-Mate. Complete testing, certification, quoting, and invoicing on site. Plus 46+ training courses and 50+ calculators. 7-day free trial."
    />
  );
}
