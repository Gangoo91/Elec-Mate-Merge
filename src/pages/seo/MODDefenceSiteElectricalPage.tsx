import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  Lock,
  FileCheck2,
  GraduationCap,
  ClipboardCheck,
  Zap,
  BadgeCheck,
  AlertTriangle,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Specialist Work', href: '/guides/electrical-certificate-types-uk' },
  { label: 'MOD Defence Site Electrical Work', href: '/guides/mod-defence-site-electrical-work' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'security-clearance', label: 'Security Clearance: BPSS, SC, and DV' },
  { id: 'def-stan', label: 'Def Stan Standards' },
  { id: 'sqep', label: 'SQEP Requirements' },
  { id: 'getting-work', label: 'Getting Work on MOD Estates' },
  { id: 'types-of-work', label: 'Types of MOD Electrical Work' },
  { id: 'pay-rates', label: 'Pay Rates' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'MOD (Ministry of Defence) sites operate under strict security controls. All contractors must undergo security vetting as a minimum at BPSS (Baseline Personnel Security Standard) level. Many roles require SC (Security Check) clearance; the most sensitive sites and roles require DV (Developed Vetting).',
  'Electrical installations on MOD sites must comply with Def Stan 61-12 (Design Requirements for Electrical Installations in Defence Establishments) in addition to BS 7671:2018+A3:2024. Def Stan 61-12 provides additional requirements for resilience, EMC, and specific military applications.',
  'SQEP (Suitably Qualified and Experienced Person) is the MOD\'s framework for defining the competency required for various types of technical work on defence estates. Electricians working on MOD sites must be able to demonstrate they meet the SQEP criteria for their specific scope of work.',
  'Work on MOD estates is procured primarily through DIO (Defence Infrastructure Organisation) frameworks, pre-qualification questionnaires (PQQs), and through the major Tier 1 contractors who hold MOD estate maintenance and construction contracts.',
  'Pay rates for electrical work on MOD estates range from £45 to £80 per hour depending on the clearance level required, the nature of the work, and the site. AWE (Aldermaston and Burghfield) and other nuclear-adjacent MOD sites command rates comparable to nuclear sites.',
];

const faqs = [
  {
    question: 'What security clearance do I need to work on an MOD site?',
    answer:
      'The security clearance required depends on the specific MOD establishment and the nature of the work. BPSS (Baseline Personnel Security Standard) is the minimum for any contractor working on MOD estates. It covers identity verification, right to work in the UK, three years of employment history, and a basic criminal record check. BPSS can usually be completed in 2 to 4 weeks. SC (Security Check) clearance is required for roles that involve access to SECRET information or regular, uncontrolled access to secure areas. SC involves a more comprehensive background check going back 10 years and is required for most MOD maintenance contractors on sensitive sites. SC can take 3 to 6 months to complete. DV (Developed Vetting) is the highest level of clearance and is required for roles involving access to TOP SECRET information or very sensitive facilities. DV involves a detailed investigation of the candidate\'s personal, financial, and professional background, including interviews. DV clearance can take 6 to 12 months and is only used for a small proportion of defence site contractor roles. Your employer will sponsor and manage the vetting process — you cannot initiate defence security vetting independently.',
  },
  {
    question: 'What is Def Stan 61-12 and how does it differ from BS 7671?',
    answer:
      'Def Stan 61-12 (Design Requirements for Electrical Installations in Defence Establishments) is the MOD\'s technical standard for electrical installation design on defence estates. It supplements and in some cases modifies the requirements of BS 7671:2018. Key differences and additions include: resilience requirements — certain MOD facilities require higher levels of supply reliability than standard commercial installations. Def Stan 61-12 may specify dual-supply arrangements, automatic changeover, or UPS backup for critical systems beyond what BS 7671 would normally require; electromagnetic compatibility (EMC) — military operations can be sensitive to electromagnetic interference. Def Stan 61-12 addresses EMC requirements for electrical installations that might not be covered in BS 7671; specific cable types — certain defence applications require cables rated for specific military environments (for example, cables suitable for use in vehicle installations or in extreme temperature environments); protection requirements — physical protection of cables and equipment in areas subject to security threats or blast risk may require armoured containment or other measures not normally considered in commercial installations. In practice, when working on MOD sites, the project specification will reference the applicable Def Stan standards alongside BS 7671, and the site engineer will provide guidance on where the standards diverge.',
  },
  {
    question: 'What is SQEP and how do I demonstrate it?',
    answer:
      'SQEP (Suitably Qualified and Experienced Person) is the MOD\'s framework for defining the competency required for technical work on defence estates. Unlike some specialist sectors (where CompEx or SHEA Nuclear provide a specific qualification to demonstrate competence), SQEP is a principle-based framework rather than a specific certificate. To demonstrate SQEP for electrical work on MOD sites, you would typically need to show: a relevant electrical qualification (C&G 2365 or equivalent, plus C&G 2382 18th Edition); a current ECS card at an appropriate grade for your role; experience appropriate to the scope of work (the MOD or its contractors will specify experience requirements in the tender or work package documents); relevant additional qualifications for specialist systems (for example, C&G 2391 for testing, fire alarm qualifications, emergency lighting qualifications); and membership of a relevant professional body (IET, ECA, NICEIC) where appropriate. On MOD sites, SQEP is enforced by the contractor\'s project management and by DIO (Defence Infrastructure Organisation) oversight. If you cannot demonstrate SQEP for a specific task, you must work under the supervision of someone who can.',
  },
  {
    question: 'How do MOD electrical projects differ from standard commercial projects?',
    answer:
      'MOD electrical projects share much in common with other large commercial and industrial projects but have several distinctive characteristics: security constraints — working on MOD sites involves security passes, restricted area designations, and in some cases restrictions on mobile phones and electronic devices in certain buildings; change control — any modification to an MOD electrical installation typically requires a formal engineering change request and approval process before work begins; documentation requirements — as-built drawings, test records, and certificate of conformity documentation must be produced and retained in the MOD\'s document management system; explosive and blast considerations — on some MOD sites (weapons ranges, explosive storage areas, armament facilities), electrical installations must be designed to appropriate blast and ignition source standards. This may require ATEX-type considerations even if the area is not formally classified under DSEAR; specific materials requirements — certain cable types, equipment finishes, or materials may be mandated by the project specification for reasons of durability, chemical resistance, or operational compatibility; and heritage buildings — many MOD sites include listed buildings or buildings with unusual construction that presents additional challenges for electrical installation.',
  },
  {
    question: 'How do I get work on MOD estates as a small electrical contractor?',
    answer:
      'For small contractors, direct access to MOD work is limited — most MOD estate maintenance and construction contracts are let to Tier 1 contractors through DIO (Defence Infrastructure Organisation) frameworks such as the Defence Estate Optimisation (DEO) programme and the Accommodation Modernisation Initiative (AMI). Small contractors typically access MOD work as sub-contractors to these Tier 1 contractors. To get into the supply chain, approach the electrical sub-contracting departments of the major MOD Tier 1 contractors — Amey Defence Services, VIVO Defence Services (formerly Sodexo and Ventia), AECOM, and Landmarc Support Services are among the largest. Ensure your company can provide evidence of appropriate insurance (public liability, employer\'s liability, professional indemnity), quality management (ISO 9001 or similar), and that your key personnel hold or can obtain the appropriate security clearances. Some smaller MOD projects are procured directly by base engineers on local purchase orders — building relationships with DIO project managers at specific sites can open these opportunities.',
  },
  {
    question: 'What types of electrical work are most common on MOD estates?',
    answer:
      'MOD estates encompass a huge variety of property types and therefore a wide range of electrical work: Barracks and accommodation — upgrading electrical installations in service accommodation, including heating systems, lighting upgrades to LED, EV charging infrastructure, and general rewires. This is the highest-volume category. Airfield and runway lighting — specialist work including constant current airfield lighting systems (CCR), taxiway lights, approach lighting systems. Requires specific airfield lighting qualifications. Naval bases — dockyard electrical installations including shore power connections for vessels, large mechanical handling equipment power, workshop and hangar electrical systems. Weapons ranges — electrical systems for range control, target systems, and safety lighting at live firing ranges. Requires specific access clearances and awareness of range safety rules. Technical and research facilities — specialist electrical installations at defence research establishments (DSTL, AWE). The most technically demanding and best-paid category.',
  },
  {
    question: 'What are the pay rates for MOD electrical work?',
    answer:
      'Pay rates on MOD estates vary significantly by site, clearance level, and the nature of the work: General maintenance electrician on barracks and accommodation (BPSS required): £35–£45/hr. Electrical contracts on operational sites requiring SC clearance: £45–£60/hr. Specialist electrical work (airfield lighting, HV, ATEX areas): £55–£75/hr. AWE Aldermaston and Burghfield (nuclear weapons — equivalent to commercial nuclear rates): £65–£90+/hr. DSTL Porton Down and other research establishments: £55–£80/hr. Electrical project engineer on DIO framework contracts: £60–£90+/hr. Emergency call-out on MOD operational sites typically attracts a double-time or 2.5x rate, which can be highly lucrative on busy operational bases. The security clearance overhead (time and administration) justifies the premium over equivalent commercial work.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/nuclear-site-electrical-work',
    title: 'Nuclear Site Electrical Work',
    description:
      'AWE Aldermaston requires nuclear-level vetting. Understand SHEA Nuclear, CCNSG, and nuclear safety culture.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/high-voltage-electrical-work-uk',
    title: 'High Voltage Electrical Work UK',
    description:
      'Many MOD sites have HV systems. Understand AP/CP/SAP authorisation and EWR Regulation 14.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/atex-hazardous-area-electrical-installations',
    title: 'ATEX Hazardous Area Electrical',
    description:
      'MOD weapons and fuel sites have ATEX zones. Understand zone classification and CompEx requirements.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates for MOD site electrical work on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/rail-electrical-work-uk',
    title: 'Rail Electrical Work UK',
    description:
      'Some MOD sites include railway infrastructure requiring PTS and Sentinel competencies.',
    icon: BadgeCheck,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'C&G 2391 is a key component of SQEP for electrical testing on MOD estates.',
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
    heading: 'MOD Defence Site Electrical Work: The Complete Guide',
    content: (
      <>
        <p>
          The Ministry of Defence (MOD) is one of the largest landowners in the UK, with hundreds of
          sites ranging from barracks and airfields to naval bases, weapons ranges, and research
          establishments. Together they represent a vast and largely stable source of electrical
          contracting work — the MOD cannot offshore its site maintenance.
        </p>
        <p>
          Working on MOD estates requires security clearance, compliance with the Def Stan 61-12
          electrical standard (alongside{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink>
          ), and demonstration of the SQEP (Suitably Qualified and Experienced Person) competency
          framework. The pay premium over equivalent commercial work reflects these additional
          requirements.
        </p>
        <p>
          This guide covers the security vetting process (BPSS, SC, and DV), the Def Stan 61-12
          standard, SQEP requirements, how to get work on MOD estates, the types of electrical work
          available, and the pay rates you can expect.
        </p>
      </>
    ),
  },
  {
    id: 'security-clearance',
    heading: 'Security Clearance: BPSS, SC, and DV',
    content: (
      <>
        <p>
          Security clearance on MOD estates is managed through the UK Security Vetting (UKSV)
          system. The three levels most relevant to electrical contractors are:
        </p>
        <div className="grid gap-4 sm:grid-cols-3 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">BPSS</h3>
            <p className="text-white text-sm leading-relaxed">
              Baseline Personnel Security Standard. Minimum for all MOD estate contractors.
              Identity, right to work, 3 years employment history, criminal record check.
              Typically 2–4 weeks. Required for access to open areas of most MOD sites.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">SC</h3>
            <p className="text-white text-sm leading-relaxed">
              Security Check. Required for regular, uncontrolled access to secure areas. 10-year
              background check. Takes 3–6 months. Required for most work on operational military
              establishments and technical facilities.
            </p>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">DV</h3>
            <p className="text-white text-sm leading-relaxed">
              Developed Vetting. Highest level of clearance. Required for access to TOP SECRET
              information or the most sensitive facilities. Comprehensive personal investigation and
              interview. Takes 6–12 months. Small proportion of contractor roles.
            </p>
          </div>
        </div>
        <p>
          Your employer or the Tier 1 contractor managing the MOD contract will sponsor and submit
          your vetting application. You cannot apply independently. Ensure you have a clean criminal
          record and a clear, documented employment history — gaps require explanation.
        </p>
      </>
    ),
  },
  {
    id: 'def-stan',
    heading: 'Def Stan 61-12: Electrical Installations in Defence Establishments',
    content: (
      <>
        <p>
          Def Stan 61-12 (Design Requirements for Electrical Installations in Defence Establishments)
          is the MOD's supplementary electrical standard that applies alongside BS 7671 on defence
          estates. Key areas where Def Stan 61-12 adds to or modifies BS 7671:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Supply resilience</strong> — certain MOD facilities require automatic changeover between supplies or UPS backup for critical systems beyond normal BS 7671 requirements. Def Stan 61-12 defines the resilience categories for different facility types.</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Electromagnetic compatibility</strong> — military communications and electronic warfare equipment can be sensitive to electromagnetic interference. Def Stan 61-12 addresses screening, cable segregation, and bonding requirements to minimise EMC problems.</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Specific cable types</strong> — the standard may mandate particular cable constructions for durability, chemical resistance, or military compatibility that go beyond BS 7671 requirements.</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Documentation</strong> — as-built records, test certificates, and change records must be maintained in the MOD's document management system. Def Stan 61-12 specifies the documentation requirements.</span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'sqep',
    heading: 'SQEP: Suitably Qualified and Experienced Person',
    content: (
      <>
        <p>
          SQEP is the MOD's competency framework for technical work on defence estates. Unlike
          CompEx or SHEA Nuclear (which are specific qualifications), SQEP is a principle — the
          MOD requires that all technical work is carried out by persons who are suitably qualified
          and experienced for the specific scope of work.
        </p>
        <p>
          For electricians, demonstrating SQEP typically requires:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BadgeCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Electrical qualification:</strong> C&G 2365 Level 3 (or equivalent NVQ), C&G 2382 (18th Edition Wiring Regulations), and C&G 2391 (Inspection and Testing) as a minimum.</span>
            </li>
            <li className="flex items-start gap-3">
              <BadgeCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>ECS card:</strong> Current ECS Gold card at the appropriate grade. This is the baseline competency indicator for MOD estate contractors.</span>
            </li>
            <li className="flex items-start gap-3">
              <BadgeCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Relevant experience:</strong> Experience appropriate to the type of work — for example, HV experience for HV work, ATEX experience for hazardous area work, airfield lighting experience for airfield projects.</span>
            </li>
            <li className="flex items-start gap-3">
              <BadgeCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Specialist qualifications:</strong> Where applicable — CompEx for ATEX areas, HV authorisation training, airfield lighting certification.</span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'getting-work',
    heading: 'Getting Work on MOD Estates: Frameworks and PQQs',
    content: (
      <>
        <p>
          MOD estate electrical work is procured through DIO (Defence Infrastructure Organisation)
          frameworks and through the prime contractors who hold long-term estate maintenance
          contracts. The main procurement routes are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>DIO frameworks (Tier 1):</strong> VIVO Defence Services (hard FM for most UK army/RAF sites), Amey Defence Services, Landmarc Support Services. These are long-term PFI or FM contracts. Electrical contractors typically sub-contract from these primes.</span>
            </li>
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Pre-qualification questionnaires (PQQs):</strong> MOD construction projects above a value threshold are procured through formal tendering. The first stage is often a PQQ assessing the contractor's financial standing, quality systems (ISO 9001), health and safety record, and relevant experience.</span>
            </li>
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Contracts Finder and Find a Tender:</strong> MOD procurement opportunities above £25,000 are published on the UK Government's Contracts Finder website. Monitoring this for electrical and M&E opportunities at MOD sites is a practical route for smaller contractors.</span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Professional electrical certificates for MOD site work"
          description="Elec-Mate's EIC and EICR tools produce the professional test certificates and inspection reports required for MOD site electrical documentation packages. Offline-capable. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'types-of-work',
    heading: 'Types of MOD Electrical Work',
    content: (
      <>
        <p>
          MOD estates include a wide variety of building and infrastructure types:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-base mb-3">Common Work Types</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>• Barracks and accommodation rewires and upgrades</li>
              <li>• LED lighting upgrades across estates</li>
              <li>• EV charger installation on military estates</li>
              <li>• Fire alarm and emergency lighting maintenance</li>
              <li>• Workshop and hangar electrical installations</li>
              <li>• HV substation maintenance (with appropriate clearance)</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-base mb-3">Specialist Work Types</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>• Airfield and runway lighting systems</li>
              <li>• Naval dockyard shore power connections</li>
              <li>• Weapons range electrical systems</li>
              <li>• AWE nuclear weapons facilities (highest clearance)</li>
              <li>• DSTL research facility specialist installations</li>
              <li>• Communications infrastructure power</li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'pay-rates',
    heading: 'Pay Rates on MOD Estates',
    content: (
      <>
        <p>
          Pay rates reflect the security clearance overhead, the Def Stan compliance requirements,
          and the specialist nature of specific sites:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>General maintenance electrician (BPSS required):</strong> £35–£45/hr on barracks, accommodation, and standard estate sites.</span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Operational site electrician (SC required):</strong> £45–£60/hr on active military installations.</span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Specialist work (HV, ATEX, airfield):</strong> £55–£75/hr reflecting specialist qualifications.</span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>AWE and research establishments (DV required):</strong> £65–£90+/hr, comparable to commercial nuclear sites.</span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function MODDefenceSiteElectricalPage() {
  return (
    <GuideTemplate
      title="MOD Defence Site Electrical Work UK | BPSS, SC, Def Stan 61-12"
      description="Complete guide to electrical work on MOD defence estates in the UK. Security clearance (BPSS, SC, DV), Def Stan 61-12 standard, SQEP requirements, DIO frameworks, and pay rates of £45–£80+/hr on barracks, airfields, naval bases, and research establishments."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Specialist Guide"
      badgeIcon={Lock}
      heroTitle={
        <>
          MOD Defence Site Electrical Work:{' '}
          <span className="text-yellow-400">Security Clearance, Def Stan, and Career Guide</span>
        </>
      }
      heroSubtitle="MOD estate electrical work pays £45–£90+/hr and provides long-term contract stability. This guide covers BPSS, SC, and DV clearance, Def Stan 61-12, SQEP requirements, DIO frameworks, and how to access the defence estate supply chain."
      readingTime={16}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About MOD Defence Site Electrical Work"
      relatedPages={relatedPages}
      ctaHeading="Produce Professional Electrical Certificates for MOD Site Work"
      ctaSubheading="Elec-Mate's EIC and EICR certificate tools produce the documentation required for MOD estate electrical compliance packages. 7-day free trial."
    />
  );
}
