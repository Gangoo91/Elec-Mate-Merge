import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  FileCheck2,
  GraduationCap,
  ClipboardCheck,
  Wrench,
  Server,
  AlertTriangle,
  Zap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Specialist Work', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Clean Room Electrical Installation', href: '/guides/clean-room-electrical-installation' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'iso-classification', label: 'ISO 14644-1 Classifications' },
  { id: 'applications', label: 'Pharmaceutical and Semiconductor Applications' },
  { id: 'containment', label: 'Containment and Cable Installation' },
  { id: 'esd-earthing', label: 'ESD Flooring and Earthing' },
  { id: 'hepa-power', label: 'HEPA Fan/Filter Unit Power' },
  { id: 'validation', label: 'Validation: IQ/OQ/PQ' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Clean rooms are classified by ISO 14644-1:2015, which defines nine classes (ISO Class 1 to ISO Class 9) based on the maximum permitted concentration of airborne particles of specified sizes. ISO Class 1 is the cleanest; ISO Class 9 is equivalent to ambient outdoor air in many locations.',
  'The two main clean room application sectors for electricians are pharmaceutical manufacturing (GMP — Good Manufacturing Practice) and semiconductor fabrication (fab). Each has specific electrical installation requirements driven by the need to prevent contamination of the product.',
  'Electrical containment in clean rooms must not create ledges or horizontal surfaces that can accumulate particulate contamination. Flush-mounted conduit, smooth-finish cable tray with sealed covers, and recessed junction boxes flush with the clean room wall are standard.',
  'Electrostatic discharge (ESD) is a critical risk in semiconductor fabs, where ESD can destroy microelectronics worth thousands of pounds. ESD control flooring is electrically conductive and must be earthed. The earthing system must provide a controlled dissipation path for static charges without creating shock risk.',
  'Validation of electrical installations in pharmaceutical clean rooms follows the IQ/OQ/PQ (Installation Qualification, Operational Qualification, Performance Qualification) methodology required by GMP regulations. The electrical engineer must produce IQ documentation demonstrating that the installation meets the design specification.',
];

const faqs = [
  {
    question: 'What is ISO 14644-1 and what are the clean room classes?',
    answer:
      'ISO 14644-1:2015 (Cleanrooms and associated controlled environments — Part 1: Classification of air cleanliness by particle concentration) is the international standard for clean room classification. It defines nine classes based on the maximum permitted concentration of airborne particles per cubic metre. The classes are: ISO Class 1 — 10 particles per m³ ≥0.1μm (semiconductor fabs, advanced nanotechnology). ISO Class 2 — 100 particles per m³ ≥0.1μm. ISO Class 3 — equivalent to the old US Federal Standard 209E Class 1 (1 particle per cubic foot at ≥0.5μm). ISO Class 4 — equivalent to FS209E Class 10. ISO Class 5 — equivalent to FS209E Class 100, typical pharmaceutical aseptic fill areas. ISO Class 6 — equivalent to FS209E Class 1,000. ISO Class 7 — equivalent to FS209E Class 10,000, typical pharmaceutical manufacturing rooms. ISO Class 8 — equivalent to FS209E Class 100,000, entry vestibules and support areas. ISO Class 9 — equivalent to ambient outdoor air in a typical location. The electrical installation must not degrade the clean room classification — this drives all the containment, sealing, and finish requirements.',
  },
  {
    question: 'What does GMP mean for pharmaceutical clean room electrical installations?',
    answer:
      'GMP (Good Manufacturing Practice) is the regulatory framework for pharmaceutical manufacturing, mandated in the UK by MHRA (Medicines and Healthcare products Regulatory Agency) and in the EU by EMA. GMP sets requirements for facilities, equipment, documentation, and personnel to ensure pharmaceutical products are manufactured consistently and to the required quality standard. For electrical installations in pharmaceutical manufacturing facilities, GMP means: all equipment must be of appropriate design (surfaces that can be cleaned, no dead-ends in pipework, no particle-shedding materials in clean rooms); all changes to the installation must go through a change control process with documented approval; the installation must be qualified (IQ/OQ/PQ — see validation section); all test results and calibration records must be retained; and the facility must be able to demonstrate to MHRA inspectors that the electrical systems have been installed and maintained in accordance with the design specification. GMP also drives requirements for environmental monitoring (temperature, humidity, particle counts) and the electrical power supply monitoring systems that support this.',
  },
  {
    question: 'How do you install conduit and cable tray in a clean room?',
    answer:
      'Standard cable tray and conduit installations create horizontal ledges that collect particulate contamination, which can then be disturbed and contaminate the product. Clean room electrical installation uses: smooth-finish or perforated cable tray with solid covers (not ventilated, which would create turbulence and disturb settled particles); conduit that is flush-mounted within the wall structure wherever possible — surface-mounted conduit running up the clean room wall creates a particle trap; sealed conduit entry into clean room junction boxes and equipment using appropriate glands; recessed junction boxes and socket outlets flush with the wall surface with no protruding edges; all surface finishes in epoxy or stainless steel that can be wiped down without accumulating contamination. In the highest classes (ISO Class 5 and above), every penetration through the clean room envelope must be sealed with appropriate materials to maintain the envelope integrity. Cable penetrations from dirty side to clean side must be sealed with fire-rated and particle-rated sealants.',
  },
  {
    question: 'What is ESD flooring and how is it earthed?',
    answer:
      'ESD (Electrostatic Discharge) conductive flooring is used in semiconductor fabs and in pharmaceutical areas where ESD could degrade product or equipment. ESD flooring materials include conductive vinyl, conductive epoxy, and conductive carpet tiles. The flooring is manufactured with a defined surface resistance (typically 1 × 10⁴ to 1 × 10⁶ ohms for static-dissipative, or <1 × 10⁴ ohms for conductive) that provides a controlled dissipation path for static charges. The earthing of ESD flooring must provide this dissipation path without creating a risk of electric shock. The approach is: the ESD floor is connected to earth via a controlled resistance (typically a 1 MΩ resistor in series) to limit the current in the event of a fault while still providing an effective static dissipation path. Ground studs are installed at regular intervals across the floor and connected to the building earthing system through the series resistor. Personnel in ESD-sensitive areas wear ESD wrist straps connected to the floor earth points or to dedicated wrist strap monitors. The entire earthing system must be designed and tested by someone familiar with IEC 61340-5-1 (Protection of electronic devices from electrostatic phenomena).',
  },
  {
    question: 'What power is required for HEPA fan/filter units?',
    answer:
      'HEPA (High Efficiency Particulate Air) fan/filter units (FFUs) are the clean room HVAC units that recirculate air through HEPA filters to maintain the particle class. Each FFU contains a fan motor and the HEPA filter. In high-class clean rooms (ISO Class 5 and above), FFUs may cover 50–80% of the ceiling area to achieve the required air change rate (1,000 to 10,000+ air changes per hour for Class 5). Power consumption per FFU is typically 200–700W depending on the fan size and filter resistance. A large semiconductor fab clean room with thousands of FFUs may have FFU electrical loads of several megawatts. FFU power is typically supplied from dedicated busbar systems running within the interstitial space (the void above the clean room ceiling where mechanical services are located). The FFU motors in high-class clean rooms are usually electronically commutated (EC) motors with variable speed capability, which reduces power consumption and allows airflow tuning without disturbing the clean room environment. The electrical engineer must design the busbar and protection system for the FFU load, accounting for the high density of circuits and the motor starting characteristics.',
  },
  {
    question: 'What is IQ/OQ/PQ validation and what is the electrical engineer\'s role?',
    answer:
      'IQ/OQ/PQ (Installation Qualification, Operational Qualification, Performance Qualification) is the validation methodology used in pharmaceutical and biotechnology manufacturing to demonstrate that equipment and facilities have been installed correctly, operate as intended, and perform consistently to produce the required outcome. Installation Qualification (IQ): Documents that the electrical installation has been installed in accordance with the approved design specification. The IQ protocol for electrical systems includes: as-built drawings verified against design; cable schedules verified; equipment schedules verified; test certificates issued; all materials verified against approved materials list. Operational Qualification (OQ): Documents that the electrical systems operate as intended throughout their operating range. For electrical systems, OQ includes: UPS transfer testing; generator auto-start testing; alarm system functional testing; environmental control system performance testing (temperature, humidity, particle counts at defined conditions). Performance Qualification (PQ): Documents that the clean room environment consistently meets the required classification under normal manufacturing conditions. The electrical engineer is involved in IQ and in supporting OQ. All IQ documentation becomes part of the permanent GMP records for the facility and must be retained for the life of the product manufactured in the room (often 5 to 10 years after the last batch).',
  },
  {
    question: 'How much does clean room electrical work pay compared to standard commercial work?',
    answer:
      'Clean room electrical work commands a premium of 20–40% over standard commercial electrical work, reflecting the additional technical knowledge, documentation discipline, and installation rigour required. Typical rates: Clean room installation electrician: £40–£55/hr. Senior clean room electrician with IQ/OQ experience: £50–£65/hr. Clean room project electrical engineer (design and supervision): £55–£80/hr. Pharmaceutical GMP validation engineer (electrical IQ): £65–£90/hr. The validation documentation skills are particularly valued — most electricians do not have experience writing IQ protocols and test reports in the GMP format. Building this skill through your first clean room project significantly increases your value for subsequent projects. Major pharmaceutical and semiconductor clean room projects in the UK include AstraZeneca, GSK, Pfizer manufacturing facilities, and TSMC and Intel planned UK investments. M&E contractors specialising in pharmaceutical and cleantech sectors include Imtech, NG Bailey, Skanska MEP, and Turner & Townsend Construction.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/data-centre-electrical-installation',
    title: 'Data Centre Electrical Installation',
    description:
      'Similar critical power and validation requirements. UPS, generators, and BS EN 50600 guide.',
    icon: Server,
    category: 'Guide',
  },
  {
    href: '/guides/atex-hazardous-area-electrical-installations',
    title: 'ATEX Hazardous Area Electrical',
    description:
      'Some pharmaceutical areas (solvent handling) have ATEX zones alongside clean room requirements.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/guides/building-management-systems-bms-electrical',
    title: 'Building Management Systems Electrical',
    description:
      'BMS monitors and controls clean room environmental conditions. Understand DDC controllers and protocols.',
    icon: Wrench,
    category: 'Guide',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates for clean room LV installations on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'C&G 2391 is essential for clean room commissioning and IQ testing documentation.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/guides/high-voltage-electrical-work-uk',
    title: 'High Voltage Electrical Work UK',
    description:
      'Large semiconductor fabs and pharmaceutical campuses connect at HV. Understand DNO connections.',
    icon: Zap,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Clean Room Electrical Installation: The Specialist Guide',
    content: (
      <>
        <p>
          Clean room electrical installation is a highly specialised discipline that combines the
          technical demands of commercial electrical work with stringent contamination control
          requirements and rigorous documentation disciplines borrowed from pharmaceutical and
          semiconductor manufacturing. It is some of the most intellectually demanding and well-paid
          electrical installation work available.
        </p>
        <p>
          The defining characteristic of clean room electrical work is that the installation itself
          must not contaminate the clean room environment. Every conduit penetration, every cable
          entry, every junction box must be designed and installed to prevent the ingress of
          particles from outside the clean room envelope and to avoid creating surfaces that trap
          particles inside it.
        </p>
        <p>
          This guide covers the ISO 14644-1 classification system, pharmaceutical GMP and
          semiconductor applications, clean room containment installation methods, ESD earthing,
          HEPA fan/filter unit power, and the IQ/OQ/PQ validation documentation that pharmaceutical
          projects require.
        </p>
      </>
    ),
  },
  {
    id: 'iso-classification',
    heading: 'ISO 14644-1:2015 Clean Room Classifications',
    content: (
      <>
        <p>
          ISO 14644-1:2015 defines nine clean room classes based on maximum permitted airborne
          particle concentrations per cubic metre. The class dictates the air change rate,
          HEPA/ULPA filter coverage, and the level of contamination control required from the
          electrical installation:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>ISO Class 1–3:</strong> Semiconductor fabrication, advanced nanotechnology. ULPA filters (99.9995% efficiency). Virtually 100% ceiling filter coverage. 1,000–10,000+ air changes/hr. Extremely demanding installation requirements.</span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>ISO Class 4–5:</strong> Pharmaceutical aseptic manufacturing, medical device manufacture, some semiconductor packaging. HEPA filters. High air change rates. All penetrations sealed. GMP validation required.</span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>ISO Class 6–7:</strong> Pharmaceutical oral solid dose manufacturing, biotech laboratories, some medical device assembly. HEPA filters. Flush-mounted electrical fittings. GMP documentation required.</span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>ISO Class 8–9:</strong> Entry vestibules, gowning rooms, support areas. Standard commercial electrical installation with smooth-finish fittings and no exposed horizontal surfaces.</span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'applications',
    heading: 'Pharmaceutical (GMP) and Semiconductor Applications',
    content: (
      <>
        <p>
          The two main clean room sectors for electrical contractors are pharmaceutical
          manufacturing and semiconductor fabrication. They have different contamination drivers
          but similar electrical installation philosophies:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-base mb-3">Pharmaceutical (GMP)</h3>
            <p className="text-white text-sm leading-relaxed">
              Contamination risk is microbial and particulate. Aseptic manufacturing (injectable
              drugs) requires ISO Class 5. Tablet and capsule manufacture operates in ISO Class 7–8.
              GMP regulations (MHRA in the UK, EMA/FDA internationally) mandate IQ/OQ/PQ validation,
              change control, and document retention. Major UK sites: AstraZeneca (Macclesfield),
              GSK (Stevenage, Barnard Castle), Pfizer (Sandwich).
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-base mb-3">Semiconductor Fabrication</h3>
            <p className="text-white text-sm leading-relaxed">
              Contamination risk is particulate — a single dust particle can destroy a microchip
              in manufacture. Fabs operate at ISO Class 1–4. ESD control is critical. Power
              demands are enormous — a modern fab requires 200–500MW. UK semiconductor activity
              is growing with government investment in domestic chip manufacturing capability.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'containment',
    heading: 'Flush-Mounted Conduit and Clean Room Cable Installation',
    content: (
      <>
        <p>
          The contamination control requirements of a clean room fundamentally change how electrical
          containment is designed and installed:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>No horizontal surfaces</strong> — all cable tray must have smooth solid covers with no ledges. Cable management within the clean room space must be flush with walls or ceiling. Standard surface-mounted cable tray is not acceptable in ISO Class 7 and above.</span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Flush conduit</strong> — conduit runs in clean rooms must be flush-mounted within the wall or ceiling structure. Where surface mounting is unavoidable, conduit must be sealed along its full length to prevent particle accumulation in the gap between conduit and wall.</span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Sealed cable entries</strong> — every penetration through the clean room envelope must be sealed with appropriate materials. Cable entry into clean room equipment, junction boxes, and through walls requires certified sealants that maintain the clean room integrity and fire compartmentation.</span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Flush fittings</strong> — socket outlets, switches, light fittings, and other electrical accessories must be flush with the clean room wall surface. Raised fittings with recessed fronts create particle traps and are not acceptable in ISO Class 7 and above.</span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'esd-earthing',
    heading: 'ESD Flooring and Electrostatic Control Earthing',
    content: (
      <>
        <p>
          In semiconductor fabs and some pharmaceutical areas where ESD could damage product or
          equipment, ESD conductive flooring is installed. The earthing of this flooring requires
          careful engineering to provide effective static dissipation without creating shock risk.
        </p>
        <p>
          The standard approach is to connect the ESD floor to earth via a controlled resistance
          (typically 1 MΩ in series with the earth connection). This limits fault current to safe
          levels while providing an effective 10⁴ to 10⁶ ohm surface resistance for static
          dissipation. Ground studs are installed at regular intervals and connected to the building
          MET through the series resistor.
        </p>
        <p>
          Personnel in ESD-sensitive areas wear ESD wrist straps and ESD footwear that connect
          them to the floor's static dissipation system. Wrist strap monitoring points are installed
          at clean room entry gowning stations — typically flush-mounted in the gowning room wall,
          connected to the ESD earthing system. The electrical design must comply with
          IEC 61340-5-1 (Protection of electronic devices from electrostatic phenomena).
        </p>
        <SEOAppBridge
          title="Document clean room electrical installations for GMP validation"
          description="Elec-Mate's EIC and test record tools produce the professional documentation required for pharmaceutical GMP Installation Qualification (IQ) packages. Complete test records on site, export PDF for the validation dossier."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'hepa-power',
    heading: 'HEPA Fan/Filter Unit Power Requirements',
    content: (
      <>
        <p>
          In higher-class clean rooms (ISO Class 5 and above), HEPA fan/filter units (FFUs) may
          cover 50 to 80% of the ceiling area to achieve the required air change rate. The power
          supply to FFUs is a significant electrical design challenge:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Individual FFU power:</strong> 200–700W per unit. A clean room with 200 FFUs has a connected load of 40–140kW from FFUs alone.</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Busbar supply:</strong> FFUs are typically fed from busbar systems in the interstitial space (the void above the clean room ceiling). This avoids cable routes through the clean room itself and allows FFU position changes without rewiring.</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Variable speed:</strong> Modern FFUs use EC (electronically commutated) motors with variable speed control. The electrical engineer must account for the harmonic currents generated by the electronic motor drives in the power supply design.</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Redundancy:</strong> In pharmaceutical aseptic areas, FFU power is often on a UPS-backed supply — loss of airflow in an aseptic filling line can result in batch rejection worth hundreds of thousands of pounds.</span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'validation',
    heading: 'IQ/OQ/PQ Validation Documentation',
    content: (
      <>
        <p>
          In pharmaceutical clean rooms, the electrical installation must be formally validated
          through the IQ/OQ/PQ process. This is a mandatory GMP requirement and must be completed
          before the clean room can be used for pharmaceutical manufacturing.
        </p>
        <div className="grid gap-4 sm:grid-cols-3 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-base mb-2">IQ</h3>
            <p className="text-white text-sm leading-relaxed">
              Installation Qualification. Documents that the installation matches the approved design
              specification. Includes: as-built drawings, cable schedules, equipment schedules,
              material certificates, and test certificates (EIC). The electrician's primary
              responsibility.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-base mb-2">OQ</h3>
            <p className="text-white text-sm leading-relaxed">
              Operational Qualification. Documents that electrical systems operate as intended.
              Functional testing of UPS transfer, generator auto-start, alarms, environmental
              monitoring. Electrician involved in executing test protocols.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-base mb-2">PQ</h3>
            <p className="text-white text-sm leading-relaxed">
              Performance Qualification. Demonstrates consistent performance under normal operating
              conditions. Includes particle counts, temperature, humidity, and air pressure
              differential monitoring over time. Primarily the HVAC and QA engineers' domain.
            </p>
          </div>
        </div>
        <p>
          All IQ documentation becomes part of the permanent GMP file for the facility. Document
          control is strict — corrections must be made with a single line through errors (not
          overtyped or corrected with correction fluid), signed, and dated. This documentation
          discipline is unfamiliar to most electricians new to pharmaceutical work but becomes
          second nature quickly.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Breaking Into Clean Room Work',
    content: (
      <>
        <p>
          Clean room electrical work is accessible to electricians with a strong commercial
          background and an ability to adapt to the contamination control and documentation
          disciplines involved. The key entry routes are through M&E contractors who specialise in
          pharmaceutical and cleantech sectors: NG Bailey, Skanska MEP, Imtech, Comfort Dynamics,
          and specialist pharmaceutical M&E companies.
        </p>
        <p>
          The additional skills most valued are: understanding of GMP and IQ/OQ/PQ principles
          (a short pharmaceutical industry awareness course is a useful investment); experience with
          commercial LV distribution and large-scale cable installation; and attention to
          documentation detail. The{' '}
          <SEOInternalLink href="/eic-certificate">
            EIC certificate
          </SEOInternalLink>{' '}
          produced by Elec-Mate is suitable for the test certificate component of the IQ package.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function CleanRoomElectricalInstallationPage() {
  return (
    <GuideTemplate
      title="Clean Room Electrical Installation UK | ISO 14644-1, GMP, ESD"
      description="Complete guide to clean room electrical installation for UK electricians. ISO 14644-1 classifications (Class 1–9), pharmaceutical GMP requirements, flush-mounted conduit, ESD earthing, HEPA FFU power, and IQ/OQ/PQ validation documentation."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Specialist Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          Clean Room Electrical Installation:{' '}
          <span className="text-yellow-400">ISO 14644-1, GMP Validation, and ESD Design</span>
        </>
      }
      heroSubtitle="Clean room electrical work demands contamination control, ESD earthing expertise, and GMP validation documentation. This guide covers ISO 14644-1 classifications, flush-mounted containment, HEPA FFU power, and the IQ/OQ/PQ validation process."
      readingTime={17}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Clean Room Electrical Installation"
      relatedPages={relatedPages}
      ctaHeading="Produce IQ-Ready Electrical Test Certificates for Clean Room Projects"
      ctaSubheading="Elec-Mate's EIC certificate tools produce professional test records suitable for pharmaceutical GMP Installation Qualification packages. 7-day free trial."
    />
  );
}
