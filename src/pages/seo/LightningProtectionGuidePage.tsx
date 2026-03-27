import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Cable,
  GraduationCap,
  ClipboardCheck,
  Target,
  Building,
  BookOpen,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Lightning Protection', href: '/guides/lightning-protection-guide' },
];

const tocItems = [
  { id: 'overview', label: 'Lightning Protection Overview' },
  { id: 'bs-en-62305', label: 'BS EN 62305 Standard' },
  { id: 'risk-assessment', label: 'Risk Assessment' },
  { id: 'spds', label: 'Surge Protection Devices (Chapter 44)' },
  { id: 'earth-termination', label: 'Earth Termination Systems' },
  { id: 'when-required', label: 'When Lightning Protection Is Required' },
  { id: 'inspection-testing', label: 'Inspection and Testing' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Lightning protection systems in the UK are designed and installed in accordance with BS EN 62305 (Protection against lightning), which consists of four parts covering general principles, risk management, physical damage protection, and electrical and electronic systems protection.',
  'A lightning protection risk assessment to BS EN 62305-2 determines whether a structure needs lightning protection and what level of protection (I to IV) is required based on the building type, contents, occupancy, and consequences of a strike.',
  'Surge Protection Devices (SPDs) protect the electrical installation from transient overvoltages caused by lightning. BS 7671 Chapter 44 sets out the requirements for SPD selection and installation within the electrical installation.',
  'The earth termination system is the foundation of any lightning protection system. It must provide a low-impedance path to earth — typically using earth rods, ring earth electrodes, or foundation earth electrodes.',
  'Lightning protection systems must be inspected and tested regularly — annually for critical structures and at intervals not exceeding 4 years for general buildings, in accordance with BS EN 62305-3.',
];

const faqs = [
  {
    question: 'What is BS EN 62305?',
    answer:
      'BS EN 62305 is the British and European standard for protection against lightning. It consists of four parts: Part 1 (General principles) covers the physics of lightning and the scope of protection measures. Part 2 (Risk management) provides the methodology for assessing the risk of lightning damage and determining whether protection is needed. Part 3 (Physical damage to structures and life hazard) covers the design and installation of lightning protection systems (air termination, down conductors, and earth termination). Part 4 (Electrical and electronic systems within structures) covers protection of internal systems against the electromagnetic effects of lightning, including surge protection. The standard replaced the previous BS 6651 in 2006.',
  },
  {
    question: 'How is a lightning protection risk assessment carried out?',
    answer:
      'A risk assessment to BS EN 62305-2 evaluates the probability of a lightning strike and the consequences if one occurs. The assessment considers: the geographical location and local thunderstorm frequency (measured in lightning flash density — strikes per square kilometre per year), the size and height of the structure, the type of construction (steel frame, reinforced concrete, timber), the nature of the contents (people, flammable materials, electronic equipment, cultural heritage), the type of services entering the building (overhead or underground power, telecoms), and the consequences of damage (loss of life, public service disruption, economic loss). The output is a risk value (R) for each type of loss, compared against a tolerable risk level. If R exceeds the tolerable level, lightning protection is required. The level of protection (Class I to IV) is determined by how much risk reduction is needed.',
  },
  {
    question: 'What are SPDs and why does BS 7671 Chapter 44 require them?',
    answer:
      'SPDs (Surge Protection Devices) are devices installed in the electrical installation to limit transient overvoltages caused by lightning strikes and switching surges. BS 7671 Chapter 44 requires a risk assessment to determine whether SPDs are needed. The assessment considers the consequences of overvoltage on the installation — if loss of human life, public services, cultural heritage, or commercial value would result, SPDs are generally required. In practice, SPDs are now fitted in most new installations. Type 1 SPDs (also called Type B or Class I) are installed where the building has a lightning protection system or is fed by an overhead line. Type 2 SPDs (also called Type C or Class II) are the standard choice for most domestic and commercial installations. They are installed at the consumer unit or distribution board.',
  },
  {
    question: 'What is an earth termination system?',
    answer:
      'The earth termination system is the part of the lightning protection system that disperses the lightning current into the ground. It must provide a low-impedance path to earth to ensure the lightning energy is safely dissipated. Common earth termination arrangements include: earth rods (vertical copper or copper-clad steel rods driven into the ground), ring earth electrodes (a bare copper conductor buried around the perimeter of the building), and foundation earth electrodes (conductors embedded in the concrete foundations of the building during construction). The earth termination system must achieve an earth resistance as low as practicable — BS EN 62305-3 recommends a target of 10 ohms or less for each earth electrode. The earth termination system of the lightning protection system must be bonded to the main earthing terminal of the electrical installation.',
  },
  {
    question: 'When is lightning protection required by law?',
    answer:
      'There is no specific UK law that requires lightning protection for all buildings. However, several regulations create a duty to assess the risk and provide protection where necessary. The Regulatory Reform (Fire Safety) Order 2005 requires a fire risk assessment that should consider lightning as an ignition source. The Health and Safety at Work etc. Act 1974 requires employers to ensure the safety of employees and others — where lightning poses a foreseeable risk, protection may be required. The Electricity at Work Regulations 1989 require that electrical systems are maintained to prevent danger. Building Regulations Approved Document B (Fire Safety) may require lightning protection for certain building types. In practice, lightning protection is most commonly required for: tall buildings, buildings with large footprints, buildings storing flammable materials, buildings providing essential public services (hospitals, fire stations), and buildings of cultural or historical significance.',
  },
  {
    question: 'How often should a lightning protection system be tested?',
    answer:
      'BS EN 62305-3 recommends testing at intervals not exceeding: 1 year for structures containing explosive materials or where the consequence of a strike is particularly severe, 2 years for structures with a Class I or II level of protection, and 4 years for structures with a Class III or IV level of protection. Testing should also be carried out after any known lightning strike to the structure, after any modification to the building or lightning protection system, and after any damage is observed. Testing includes visual inspection of all components (air termination, down conductors, bonds, earth termination), continuity testing of all conductors and bonds, and earth resistance testing of the earth termination system.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/spd-surge-protection',
    title: 'SPD Surge Protection Guide',
    description: 'Surge protection device selection, installation, and BS 7671 Chapter 44.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/earthing-arrangements',
    title: 'Earthing Arrangements',
    description: 'TN-S, TN-C-S, and TT earthing systems explained.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/guides/earth-electrode-test',
    title: 'Earth Electrode Testing',
    description: 'How to test earth electrode resistance and interpret results.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Complete Electrical Installation Certificates on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 Guide',
    description: '18th Edition Wiring Regulations overview and key requirements.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description: 'Study for C&G 2391 with structured training modules.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Lightning Protection: What Every Electrician Needs to Know',
    content: (
      <>
        <p>
          The UK experiences approximately 200,000 to 300,000 lightning strikes per year.
          While most strikes occur in open countryside, strikes to buildings and structures cause
          fires, structural damage, electrical installation damage, destruction of electronic
          equipment, and risk to life.
        </p>
        <p>
          A lightning protection system (LPS) provides a preferential path for the lightning
          current to follow from the point of strike to earth, bypassing the building structure and
          its contents. The system consists of an air termination network (the conductors on the
          roof that intercept the lightning), down conductors (that carry the current to ground),
          and an earth termination system (that disperses the current into the ground).
        </p>
        <p>
          This guide covers the BS EN 62305 standard, risk assessment methodology, surge protection
          devices (SPDs) under BS 7671 Chapter 44, earth termination requirements, when lightning
          protection is required, and inspection and testing.
        </p>
      </>
    ),
  },
  {
    id: 'bs-en-62305',
    heading: 'BS EN 62305: The Lightning Protection Standard',
    content: (
      <>
        <p>
          BS EN 62305 is the comprehensive standard for lightning protection in the UK and Europe.
          It replaced the previous BS 6651 in 2006 and consists of four parts:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part 1: General principles</strong> — covers the physics of lightning,
                damage mechanisms, and the scope of protection measures. Provides the foundation
                for understanding why protection is needed and what it achieves.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part 2: Risk management</strong> — the methodology for assessing lightning
                risk and determining whether protection is needed. This is the starting point for
                any lightning protection project.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part 3: Physical damage and life hazard</strong> — the design and
                installation of the structural lightning protection system: air termination, down
                conductors, earth termination, equipotential bonding, and separation distances.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part 4: Electrical and electronic systems</strong> — protection of internal
                electrical and electronic systems from the electromagnetic effects of lightning.
                This includes surge protection, screening, and routing of services.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'risk-assessment',
    heading: 'Lightning Protection Risk Assessment',
    content: (
      <>
        <p>
          The risk assessment to BS EN 62305-2 is the first step in any lightning protection
          project. It determines whether protection is needed and, if so, what level of protection
          is required.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lightning flash density</strong> — the number of lightning flashes per
                square kilometre per year at the building location. In the UK, this ranges from
                approximately 0.2 (northern Scotland) to 2.0 (south-east England).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Collection area</strong> — calculated from the building dimensions (length,
                width, height). Taller buildings have a larger collection area and are more likely
                to be struck.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consequence analysis</strong> — what happens if the building is struck?
                The assessment considers loss of human life, loss of public service, loss of
                cultural heritage, and economic loss.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Protection level</strong> — if protection is required, the level (Class I
                to IV) is determined by the risk reduction needed. Class I provides the highest
                level of protection (98% efficiency), Class IV the lowest (80% efficiency).
              </span>
            </li>
          </ul>
        </div>
        <p>
          The risk assessment is typically carried out by a specialist lightning protection
          contractor, but electricians working on commercial and industrial projects should
          understand the process and be able to advise clients on the need for assessment.
        </p>
      </>
    ),
  },
  {
    id: 'spds',
    heading: 'Surge Protection Devices (BS 7671 Chapter 44)',
    content: (
      <>
        <p>
          While the structural lightning protection system (to BS EN 62305-3) protects the building
          itself, the electrical installation inside the building needs its own protection from
          transient overvoltages. This is where{' '}
          <SEOInternalLink href="/guides/spd-surge-protection">
            Surge Protection Devices (SPDs)
          </SEOInternalLink>{' '}
          come in, governed by BS 7671 Chapter 44.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type 1 SPDs</strong> — installed where the building has a lightning
                protection system or is fed by an overhead supply line. These handle the highest
                energy surges (direct lightning current). Installed at the main distribution board.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type 2 SPDs</strong> — the standard choice for most installations. They
                protect against switching surges and indirect lightning effects. Installed at the
                consumer unit or main distribution board.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type 3 SPDs</strong> — fine protection for sensitive equipment. Installed
                close to the equipment being protected (at the socket or within the equipment's
                supply circuit).
              </span>
            </li>
          </ul>
        </div>
        <p>
          BS 7671 Chapter 44 requires a risk assessment to determine whether SPDs are needed. Where
          the consequence of transient overvoltage includes risk to human life or disruption of
          public services, SPDs are generally required. In practice, SPDs are now installed in most
          new domestic and commercial installations.
        </p>
      </>
    ),
  },
  {
    id: 'earth-termination',
    heading: 'Earth Termination Systems',
    content: (
      <>
        <p>
          The earth termination system is the foundation of the lightning protection system. Its
          purpose is to disperse the lightning current safely into the ground with the lowest
          possible impedance.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth rods</strong> — vertical copper or copper-clad steel rods driven
                into the ground to a depth of 2.4m or more. Multiple rods may be needed to achieve
                the target earth resistance of 10 ohms or less.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ring earth electrode</strong> — a bare copper conductor (minimum 50mm
                cross-section) buried at least 0.5m deep around the perimeter of the building.
                This provides a distributed earth termination with low impedance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Foundation earth electrode</strong> — conductors embedded in the reinforced
                concrete foundations during construction. This is the most effective earth
                termination but can only be installed during the building phase.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The lightning protection earth termination must be bonded to the main earthing terminal of
          the electrical installation to ensure equipotential bonding. This prevents dangerous
          potential differences between the lightning protection system and the electrical
          installation during a strike.
        </p>
      </>
    ),
  },
  {
    id: 'when-required',
    heading: 'When Lightning Protection Is Required',
    content: (
      <>
        <p>
          Lightning protection is most commonly required for:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tall buildings</strong> — buildings over 20m are significantly more likely
                to be struck and typically require protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Buildings with large footprints</strong> — warehouses, factories, and
                distribution centres have a large collection area.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Buildings storing flammable or explosive materials</strong> — petrol
                stations, chemical stores, munitions facilities.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Essential public services</strong> — hospitals, fire stations, data centres,
                telecommunications facilities.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Buildings of cultural or historical significance</strong> — churches,
                listed buildings, museums, galleries.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Isolated structures</strong> — buildings on hilltops or in exposed positions
                with no surrounding structures of similar or greater height.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For most domestic properties in the UK, a full structural lightning protection system is
          not required. However, SPDs at the consumer unit are increasingly standard practice under
          BS 7671 Chapter 44.
        </p>
      </>
    ),
  },
  {
    id: 'inspection-testing',
    heading: 'Inspection and Testing of Lightning Protection Systems',
    content: (
      <>
        <p>
          Lightning protection systems must be regularly inspected and tested to ensure they remain
          effective. BS EN 62305-3 specifies the following intervals:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Visual inspection</strong> — check all visible components for physical
                damage, corrosion, loose fixings, and broken conductors. Pay particular attention
                to bonds, test clamps, and the junction between down conductors and the earth
                termination.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Continuity testing</strong> — test the continuity of all conductors and
                bonds using a low-resistance ohmmeter. The resistance of each down conductor from
                air termination to earth termination should not exceed 0.2 ohms.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth resistance testing</strong> — measure the resistance of each earth
                electrode using the fall-of-potential method or a clamp-on earth tester. The target
                is 10 ohms or less per electrode.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Lightning Protection Opportunities',
    content: (
      <>
        <p>
          Lightning protection is a specialist area, but general electricians can add value by
          understanding the basics, advising clients on SPD installation, and carrying out the
          electrical aspects of lightning protection work.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">SPD Installation</h4>
                <p className="text-white text-sm leading-relaxed">
                  Installing SPDs at consumer units and distribution boards is within the scope of
                  a general electrician. Understanding BS 7671 Chapter 44 and the risk assessment
                  process enables you to recommend and install SPDs as part of new installations
                  and upgrades.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EIC Certificate</h4>
                <p className="text-white text-sm leading-relaxed">
                  SPD installation requires an{' '}
                  <SEOInternalLink href="/tools/eic-certificate">
                    Electrical Installation Certificate
                  </SEOInternalLink>{' '}
                  or Minor Works Certificate. Complete it on site with Elec-Mate.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Install and certify SPDs with confidence"
          description="Elec-Mate provides cable sizing, EIC certificates, and BS 7671 regulation lookup on your phone. 7-day free trial."
          icon={Zap}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function LightningProtectionGuidePage() {
  return (
    <GuideTemplate
      title="Lightning Protection Guide | BS EN 62305 and SPDs UK"
      description="Complete guide to lightning protection for buildings in the UK. BS EN 62305 standard, risk assessment, surge protection devices (SPDs), BS 7671 Chapter 44, earth termination systems, when lightning protection is required, and inspection and testing."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Technical Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          Lightning Protection:{' '}
          <span className="text-yellow-400">BS EN 62305, SPDs, and Earth Termination</span>
        </>
      }
      heroSubtitle="A practical guide to lightning protection for UK electricians. Covers BS EN 62305, risk assessment methodology, surge protection devices under BS 7671 Chapter 44, earth termination systems, and when lightning protection is required."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Lightning Protection"
      relatedPages={relatedPages}
      ctaHeading="Install SPDs and Certify on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for EIC certificates, cable sizing, and regulation lookup. 7-day free trial, cancel anytime."
    />
  );
}
