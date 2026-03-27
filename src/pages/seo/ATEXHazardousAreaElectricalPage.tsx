import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  AlertTriangle,
  ShieldCheck,
  FileCheck2,
  Zap,
  GraduationCap,
  ClipboardCheck,
  BadgeCheck,
  Wrench,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Specialist Work', href: '/guides/electrical-certificate-types-uk' },
  { label: 'ATEX Hazardous Area Electrical', href: '/guides/atex-hazardous-area-electrical-installations' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'legislation', label: 'ATEX Directive and DSEAR 2002' },
  { id: 'zone-classification', label: 'Zone Classification' },
  { id: 'ex-equipment', label: 'Ex Equipment Markings and Selection' },
  { id: 'installation-standard', label: 'BS EN 60079-14 Installation' },
  { id: 'inspection', label: 'BS EN 60079-17 Inspection' },
  { id: 'competency', label: 'CompEx Competency Requirement' },
  { id: 'industries', label: 'Common Industries' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'ATEX Directive 2014/34/EU (implemented in the UK as the Equipment and Protective Systems Intended for Use in Potentially Explosive Atmospheres Regulations 2016) governs the manufacture and marking of electrical equipment for hazardous areas. DSEAR (Dangerous Substances and Explosive Atmospheres Regulations 2002) governs workplace safety obligations for employers and contractors.',
  'Hazardous areas are classified into zones based on the likelihood of an explosive atmosphere being present. Gas and vapour areas: Zone 0 (continuous), Zone 1 (likely in normal operation), Zone 2 (unlikely but possible). Dust areas: Zone 20, Zone 21, Zone 22, following the same principle.',
  'Every piece of electrical equipment in a hazardous area carries an Ex marking indicating its protection concept (Ex d, Ex e, Ex ia, Ex n, etc.), equipment group, and temperature class. The equipment must be selected to match the zone, gas group, and temperature class of the hazardous area.',
  'Installation must comply with BS EN 60079-14 (Electrical installations design, selection and erection). Inspection and maintenance must comply with BS EN 60079-17 (Inspection and maintenance of electrical installations in hazardous areas).',
  'The CompEx certificate (Competency in Explosive Atmospheres) is the industry-recognised standard for demonstrating competence. DSEAR requires that only competent persons carry out work in hazardous areas. Without CompEx, you may struggle to demonstrate competence on formal contracts.',
];

const faqs = [
  {
    question: 'What is the difference between ATEX and DSEAR?',
    answer:
      'ATEX Directive 2014/34/EU (and the equivalent UK retained regulation) governs the design and manufacture of equipment intended for use in potentially explosive atmospheres — it sets out how equipment must be constructed, tested, and marked. DSEAR (Dangerous Substances and Explosive Atmospheres Regulations 2002) governs the duties placed on employers to manage the risk from dangerous substances in the workplace, including the duty to classify hazardous areas, select appropriate equipment, and ensure only competent persons carry out work. In practice, ATEX is about the equipment; DSEAR is about the workplace management system. Both apply to electrical contractors working in hazardous areas: you must use ATEX-marked equipment and you must comply with DSEAR in how you carry out the work. DSEAR was retained in UK law post-Brexit and continues to apply.',
  },
  {
    question: 'What do Zone 0, Zone 1 and Zone 2 mean?',
    answer:
      'Zone 0 is a place where an explosive gas atmosphere is present continuously, for long periods, or frequently. This is typically inside storage tanks, inside pipes, or in open-top containers where flammable liquid is always present. Zone 1 is a place where an explosive gas atmosphere is likely to occur in normal operation occasionally. This includes areas adjacent to Zone 0 (around tank vents, flanges, pump seals, loading arms). Zone 2 is a place where an explosive gas atmosphere is not likely to occur in normal operation but, if it does occur, will persist for only a short time. This covers the outer boundary of Zone 1 and areas where flammable material is only present if there is a leakage or abnormal condition. For dust (Zone 20, 21, 22), the same principle applies: Zone 20 is continuous dust cloud; Zone 21 is occasional dust cloud in normal operation; Zone 22 is unlikely in normal operation.',
  },
  {
    question: 'How do I read an ATEX equipment marking?',
    answer:
      'A typical ATEX marking looks like: Ex d IIB T4 Gb. Breaking this down: "Ex" indicates it is explosion-protected equipment. "d" is the protection concept — "d" means flameproof enclosure (the enclosure can withstand an internal explosion without igniting the surrounding atmosphere). "IIB" is the equipment group — Group I is mining; Group II is surface industries. "IIA" covers gases with similar properties to propane; "IIB" covers gases including ethylene; "IIC" covers hydrogen and acetylene (the most onerous). "T4" is the temperature class — the maximum surface temperature the equipment can reach. T1 = 450°C, T2 = 300°C, T3 = 200°C, T4 = 135°C, T5 = 100°C, T6 = 85°C. The temperature class must be below the ignition temperature of the gas present. "Gb" is the equipment protection level — Ga/Gb/Gc correspond to Zone 0/Zone 1/Zone 2 respectively. Common protection concepts include: Ex e (increased safety), Ex ia/ib/ic (intrinsic safety), Ex n (non-sparking, Zone 2 only), Ex p (pressurised enclosure), Ex m (encapsulation).',
  },
  {
    question: 'What does BS EN 60079-14 require for hazardous area installation?',
    answer:
      'BS EN 60079-14 covers the design, selection, and erection of electrical installations in hazardous areas. Key requirements include: selection of equipment with the appropriate Ex protection concept, equipment group, and temperature class for the zone and gas/dust type; cable selection (armoured cable or conduit systems to protect against mechanical damage; cables must be appropriate for the environment including temperature, chemicals, and UV exposure); cable entry devices must be certified for use with the cable type and must be installed to maintain the integrity of the enclosure; earthing and bonding must be designed to prevent electrostatic discharge, which can itself be an ignition source; documentation — a complete design drawing showing zone classification, equipment list with Ex certificates, and as-installed drawings must be produced.',
  },
  {
    question: 'What does BS EN 60079-17 require for hazardous area inspection?',
    answer:
      'BS EN 60079-17 covers the inspection and maintenance of electrical installations in hazardous areas. It defines three types of inspection: Initial inspection (carried out before a new installation is commissioned or an existing installation is returned to service after modification); Periodic inspection (carried out at defined intervals — the standard recommends intervals based on the installation type and environment, typically 1 to 3 years for close inspection and 3 years for detailed inspection); Continuous supervision (for installations under continuous observation by a competent person). Inspection must be carried out by a competent person — this is where CompEx becomes essential. The inspection must verify that all equipment is correctly installed, undamaged, has legible certification markings, and that cable entries are correctly sealed. Records of all inspections must be retained.',
  },
  {
    question: 'What industries commonly require ATEX electrical competency?',
    answer:
      'The most common industries in the UK that require ATEX-competent electricians include: Onshore and offshore oil and gas (refineries, tank farms, offshore platforms — the largest sector); Chemical manufacturing (fine chemicals, bulk chemicals, agrochemicals); Pharmaceutical manufacturing (solvent handling and bulk manufacture areas); Paint manufacturing and spray finishing (spray booths, paint mixing rooms); Distilleries and breweries (spirit storage and filling areas where alcohol vapour concentrations can create Zone 1 and Zone 2 areas); Flour milling and grain handling (combustible dust — Zone 20/21/22); Rubber and plastics manufacturing (solvent-based processes); Wastewater treatment plants (digester gas, methane). The North Sea oil and gas sector and UK petrochemical sites on Teesside, Merseyside, and Humberside are the largest employers of ATEX-competent electricians.',
  },
  {
    question: 'Is CompEx mandatory or just recommended for ATEX work?',
    answer:
      'DSEAR Regulation 7 requires that employers ensure work in hazardous areas is carried out only by competent persons, but it does not mandate CompEx by name as the only acceptable route to demonstrating competence. However, CompEx has become the de facto industry standard, and in practice most major oil and gas operators, chemical companies, and their principal contractors will not permit electrical work in hazardous areas without a current CompEx certificate. The Health and Safety Executive (HSE) recognises CompEx as an appropriate demonstration of competence. If you cannot produce a CompEx certificate, you will need to demonstrate equivalent competence through other evidence — which is difficult in practice. The straightforward answer for any electrician seeking work in hazardous areas is: get your CompEx certificate.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/compex-qualification-guide',
    title: 'CompEx Qualification Guide',
    description:
      'Full guide to obtaining CompEx certification — units, training centres, cost, and career benefits.',
    icon: BadgeCheck,
    category: 'Guide',
  },
  {
    href: '/guides/offshore-electrical-work-uk',
    title: 'Offshore Electrical Work UK',
    description:
      'ATEX/CompEx is essential for offshore platforms. Understand OPITO BOSIET, OGUK medical, and pay rates.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/nuclear-site-electrical-work',
    title: 'Nuclear Site Electrical Work',
    description:
      'Nuclear sites often include ATEX zones. Understand the additional vetting and safety culture requirements.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Issue Electrical Installation Certificates for hazardous area electrical work on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'Study for C&G 2391 with structured training modules covering specialist installation types.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/guides/high-voltage-electrical-work-uk',
    title: 'High Voltage Electrical Work UK',
    description:
      'Many ATEX sites also operate at HV. Understand HV authorisation and switching requirements.',
    icon: Wrench,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'ATEX Hazardous Area Electrical Installations: The Essential Guide',
    content: (
      <>
        <p>
          Working on electrical installations in potentially explosive atmospheres is one of the most
          demanding — and best-paid — specialisms in UK electrical contracting. Oil refineries,
          chemical plants, offshore platforms, distilleries, and flour mills all contain areas where
          flammable gas, vapour, mist, or combustible dust can form an explosive atmosphere. A single
          ignition source in these areas can cause a catastrophic explosion.
        </p>
        <p>
          The legal framework for managing this risk is built on two pillars: the ATEX Directive
          (which governs equipment) and DSEAR 2002 (which governs the workplace safety obligations).
          The technical installation standard is{' '}
          <strong>BS EN 60079-14</strong>, and inspection is governed by{' '}
          <strong>BS EN 60079-17</strong>. Competency is demonstrated through the{' '}
          <SEOInternalLink href="/guides/compex-qualification-guide">
            CompEx certificate
          </SEOInternalLink>
          .
        </p>
        <p>
          This guide covers the legislation, zone classification, Ex equipment markings, installation
          and inspection standards, competency requirements, and the industries where this specialism
          is most in demand.
        </p>
      </>
    ),
  },
  {
    id: 'legislation',
    heading: 'ATEX Directive 2014/34/EU and DSEAR Regulations 2002',
    content: (
      <>
        <p>
          Two pieces of legislation govern hazardous area electrical work in the UK:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">ATEX 2014/34/EU</h3>
            <p className="text-white text-sm leading-relaxed">
              The Equipment and Protective Systems Intended for Use in Potentially Explosive
              Atmospheres Regulations 2016 (implementing ATEX in UK law, retained post-Brexit).
              Governs manufacturers of Ex equipment. Sets out construction, testing, and marking
              requirements. Enforced by OPSS (Office for Product Safety and Standards). Applies to
              the equipment, not the installation.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">DSEAR 2002</h3>
            <p className="text-white text-sm leading-relaxed">
              Dangerous Substances and Explosive Atmospheres Regulations 2002. Governs employers
              and contractors. Requires hazardous area classification, risk assessment, appropriate
              equipment selection, and work by competent persons. Enforced by the HSE. Retained in
              UK law post-Brexit and continues to apply. This is the regulation that drives the need
              for CompEx certification.
            </p>
          </div>
        </div>
        <p>
          DSEAR Regulation 7 is the key provision for electricians: it requires that work involving
          dangerous substances is carried out by competent persons using appropriate procedures and
          equipment. The Approved Code of Practice for DSEAR references BS EN 60079-14 and
          BS EN 60079-17 as the appropriate technical standards.
        </p>
      </>
    ),
  },
  {
    id: 'zone-classification',
    heading: 'Zone Classification: Gas and Dust',
    content: (
      <>
        <p>
          The first step in managing hazardous areas is classification — identifying and documenting
          the zones. This is the duty of the operator (employer), but electricians must understand
          the classification to select appropriate equipment.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="mb-4">
            <h3 className="font-semibold text-white mb-2">Gas, Vapour and Mist Zones</h3>
            <ul className="space-y-3 text-white">
              <li className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                <span><strong>Zone 0</strong> — explosive atmosphere present continuously or for long periods. Equipment: Category 1G (Ga). Only Ex ia and some Ex ma permitted.</span>
              </li>
              <li className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
                <span><strong>Zone 1</strong> — explosive atmosphere likely in normal operation. Equipment: Category 1G or 2G (Ga or Gb). Ex d, Ex e, Ex ia, Ex ib, Ex p, Ex mb, Ex q permitted.</span>
              </li>
              <li className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <span><strong>Zone 2</strong> — explosive atmosphere not likely but possible. Equipment: Category 1G, 2G or 3G (Ga, Gb or Gc). Ex n (non-sparking) also permitted here.</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-2">Combustible Dust Zones</h3>
            <ul className="space-y-3 text-white">
              <li className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                <span><strong>Zone 20</strong> — cloud of combustible dust present continuously or for long periods (inside hoppers, silos, mills).</span>
              </li>
              <li className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
                <span><strong>Zone 21</strong> — cloud of combustible dust likely in normal operation (around filling equipment, conveyors, dusty processes).</span>
              </li>
              <li className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <span><strong>Zone 22</strong> — cloud of combustible dust not likely but possible (outer boundary of Zone 21).</span>
              </li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'ex-equipment',
    heading: 'Ex Equipment Markings and Selection',
    content: (
      <>
        <p>
          Every piece of certified Ex equipment carries a marking that encodes its protection concept,
          equipment group, and temperature class. The equipment must match the zone, gas group, and
          temperature class of the hazardous area. Common protection concepts:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Ex d — Flameproof enclosure.</strong> The enclosure can contain an internal explosion without igniting the surrounding atmosphere. Used for motors, junction boxes, switchgear. Zone 1 and Zone 2.</span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Ex e — Increased safety.</strong> Measures applied to prevent sparks and excessive temperatures. Used for terminal boxes, junction boxes where no sparking is expected. Zone 1 and Zone 2.</span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Ex ia — Intrinsic safety (Category ia).</strong> Energy limited so that any spark cannot ignite the explosive atmosphere. Used for instruments, sensors, transmitters. Zone 0, 1, and 2.</span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Ex n — Non-sparking.</strong> Equipment that will not ignite the surrounding atmosphere in normal operation. Zone 2 only. Suitable for lighting and general purpose equipment in the outer zone.</span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Ex p — Pressurised enclosure.</strong> The enclosure is pressurised with clean air or inert gas to prevent the ingress of the explosive atmosphere. Used for large motors, analysers, control panels.</span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'installation-standard',
    heading: 'BS EN 60079-14: Installation Standard',
    content: (
      <>
        <p>
          BS EN 60079-14 (Explosive atmospheres — Part 14: Electrical installations design, selection
          and erection) is the mandatory technical standard for hazardous area electrical
          installation. Key requirements include:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Equipment selection</strong> — must match zone, gas group (IIA, IIB, IIC), and temperature class. Selection must be documented and traceable to the hazardous area classification drawing.</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Cable selection</strong> — armoured cable (SWA or braided) or conduit systems to protect against mechanical damage. Cables must be rated for the operating temperature and chemical environment.</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Cable entries</strong> — certified cable glands or conduit seals must be used to maintain the integrity of Ex d and Ex e enclosures. Unused entries must be sealed with certified blanking plugs.</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Earthing and bonding</strong> — earthing must be designed to prevent electrostatic accumulation, which is an ignition risk for dust zones in particular.</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Documentation</strong> — an installation dossier including zone classification drawing, equipment schedule with Ex certificate numbers, and as-installed drawings must be produced and retained.</span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'inspection',
    heading: 'BS EN 60079-17: Inspection and Maintenance',
    content: (
      <>
        <p>
          BS EN 60079-17 (Explosive atmospheres — Part 17: Electrical installations inspection and
          maintenance) governs how hazardous area installations are inspected after commissioning. It
          defines three grades of inspection and requires that all inspections are carried out by
          competent persons and formally recorded.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Visual inspection</strong> — can be carried out without opening equipment. Checks for visible damage, missing fasteners, illegible labels, obvious deterioration. Can be done by trained operators as part of routine checks.</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Close inspection</strong> — includes all visual inspection checks plus opening enclosures to check cable entries, fastener torque, internal condition, and equipment certification. Must be done by a competent person (CompEx-certified). Typically every 1 to 3 years.</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Detailed inspection</strong> — includes all close inspection checks plus functional testing, insulation resistance testing, and full equipment verification. Must be done by a competent person. Typically every 3 years for most installations.</span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'competency',
    heading: 'CompEx Competency Requirement',
    content: (
      <>
        <p>
          DSEAR requires that only competent persons carry out electrical work in hazardous areas.
          The CompEx scheme (Competency in Explosive Atmospheres) is the recognised industry standard
          for demonstrating this competency. It is administered by the CompEx Certification Scheme
          operated by EAL (Awards for Business and Industry).
        </p>
        <p>
          CompEx covers installation and inspection of electrical equipment in explosive atmospheres.
          The core units for electricians are EX01 to EX04, covering gas and vapour Zone 0/1/2 work.
          See the{' '}
          <SEOInternalLink href="/guides/compex-qualification-guide">
            CompEx qualification guide
          </SEOInternalLink>{' '}
          for full details on units, training centres, costs, and the assessment process. Without
          CompEx, access to formal hazardous area electrical contracts in oil and gas, chemical, and
          offshore sectors is extremely limited.
        </p>
        <SEOAppBridge
          title="Document hazardous area electrical work professionally"
          description="Elec-Mate's certificate and test record tools help you produce the professional documentation required for ATEX installation dossiers and BS EN 60079-17 inspection records. Works offline on process sites."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'industries',
    heading: 'Common Industries for ATEX Electrical Work',
    content: (
      <>
        <p>
          ATEX-competent electricians are in demand across a wide range of UK industries:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-base mb-3">Gas and Vapour (Zone 0/1/2)</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>• Oil and gas refineries (Fawley, Grangemouth, Lindsey)</li>
              <li>• Onshore and offshore oil and gas production</li>
              <li>• Chemical and petrochemical plants</li>
              <li>• Distilleries and spirit bottling plants</li>
              <li>• Paint and coatings manufacturing</li>
              <li>• Pharmaceutical bulk manufacture (solvent handling)</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-base mb-3">Dust (Zone 20/21/22)</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>• Flour mills and grain handling facilities</li>
              <li>• Animal feed and agricultural processing</li>
              <li>• Woodworking and MDF manufacturing</li>
              <li>• Coal handling (power stations)</li>
              <li>• Sugar and confectionery manufacturing</li>
              <li>• Metal powder processing</li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ATEXHazardousAreaElectricalPage() {
  return (
    <GuideTemplate
      title="ATEX Hazardous Area Electrical Installations UK | Guide"
      description="Complete guide to ATEX hazardous area electrical installations for UK electricians. Zone classification, Ex equipment markings, BS EN 60079-14 installation, BS EN 60079-17 inspection, DSEAR 2002, and CompEx competency requirements."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Specialist Guide"
      badgeIcon={AlertTriangle}
      heroTitle={
        <>
          ATEX Hazardous Area Electrical Installations:{' '}
          <span className="text-yellow-400">UK Electrician's Guide</span>
        </>
      }
      heroSubtitle="Working in explosive atmospheres requires zone classification knowledge, Ex equipment selection, BS EN 60079-14 installation practice, and CompEx certification. This guide covers everything you need."
      readingTime={20}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About ATEX Hazardous Area Electrical Work"
      relatedPages={relatedPages}
      ctaHeading="Document ATEX Electrical Work to Professional Standards"
      ctaSubheading="Elec-Mate's certificate and test record tools support hazardous area installation dossiers. Offline-capable for process sites. 7-day free trial."
    />
  );
}
