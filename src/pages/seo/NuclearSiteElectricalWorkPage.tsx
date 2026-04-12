import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Zap,
  GraduationCap,
  ClipboardCheck,
  BadgeCheck,
  Lock,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Specialist Work', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Nuclear Site Electrical Work', href: '/guides/nuclear-site-electrical-work' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'nuclear-sites', label: 'UK Nuclear Licensed Sites' },
  { id: 'security-vetting', label: 'Security Vetting: BPSS, CTC and SC' },
  { id: 'standards', label: 'IEC 60364 and BS 7671 on Nuclear Sites' },
  { id: 'safety-culture', label: 'Nuclear Safety Culture and Permit to Work' },
  { id: 'training', label: 'Required Training and Cards' },
  { id: 'pay-rates', label: 'Pay Rates and Career Entry' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Nuclear licensed sites in the UK operate under Nuclear Site Licences issued by the Office for Nuclear Regulation (ONR). All contractors must comply with the site licence conditions, which place strict controls on work affecting safety-related systems.',
  'Security vetting is mandatory. Most nuclear sites require a minimum of Baseline Personnel Security Standard (BPSS). Higher-risk roles require Counter-Terrorism Check (CTC) or Security Check (SC) clearance, which can take 3 to 6 months to complete.',
  'Electrical installation on nuclear sites must comply with IEC 60364 (the international standard) as well as BS 7671:2018+A3:2024. Nuclear-safety-classified systems have additional design, installation, and documentation requirements beyond standard BS 7671.',
  'The CCNSG Safety Passport is the minimum site safety card for most UK nuclear and construction sites. The SHEA Nuclear card (Safety, Health and Environment in the Nuclear Industry) is required for site access on most licensed nuclear sites.',
  'Pay rates range from £55 to £90+ per hour for nuclear-site electricians, reflecting the vetting requirements, specialist knowledge, and restricted working environment. Rates are substantially higher than standard commercial electrical work.',
];

const faqs = [
  {
    question: 'What security clearance do I need to work on a nuclear site?',
    answer:
      'The minimum security clearance for most UK nuclear licensed sites is the Baseline Personnel Security Standard (BPSS). BPSS checks your identity, right to work in the UK, employment history for the last three years, and criminal record. Many roles — particularly those involving access to more sensitive areas — require a Counter-Terrorism Check (CTC), which is a more in-depth national security vetting check. Security Check (SC) clearance is required for roles with long-term, frequent, or uncontrolled access to secure areas. SC clearance involves a comprehensive background check going back ten years and can take four to six months to complete. Developed Vetting (DV) is required for the most sensitive roles. Your employer or the site operator will initiate the vetting process — you cannot apply for nuclear vetting independently.',
  },
  {
    question: 'What is the SHEA Nuclear card and who needs it?',
    answer:
      'The SHEA Nuclear card (Safety, Health and Environment Awareness in the Nuclear Industry) is a site safety induction card specifically for the nuclear industry. It is issued by Cogent Skills (the sector skills organisation for the nuclear industry) and is required for site access on most UK nuclear licensed sites including Sellafield, Hinkley Point, Sizewell, and Heysham. To obtain a SHEA Nuclear card you must complete the SHEA Nuclear training course, which covers nuclear industry safety culture, radiation awareness, nuclear site rules, and emergency procedures. The course is typically one day and is delivered by Cogent Skills-approved training providers. The card must be renewed every three years. Some sites also accept the CSCS card with a nuclear site induction, but the SHEA Nuclear card is the preferred standard.',
  },
  {
    question: 'How does working to IEC 60364 differ from BS 7671?',
    answer:
      'BS 7671 (the IET Wiring Regulations) is based on IEC 60364 and the two are largely aligned, but there are differences in terminology, cable sizing methods, and specific technical requirements. On nuclear sites, IEC 60364 is often the specified design standard because nuclear projects are international in scope and IEC 60364 is used globally. Key differences include: IEC 60364 uses slightly different voltage band classifications; cable sizing tables differ in places from BS 7671 Appendix 4; IEC 60364-7 special installations series covers some locations not covered in Part 7 of BS 7671. In practice, electricians on nuclear sites work to site-specific technical specifications and quality plans, which reference whichever standard applies to each system. Nuclear-safety-classified (Class 1) systems have additional requirements for material traceability, inspection hold points, and formal sign-off at each stage of installation.',
  },
  {
    question: 'What is a Permit to Work system on a nuclear site?',
    answer:
      'A Permit to Work (PTW) system is a formal documented system for controlling work on plant and equipment where there is a risk of injury from hazardous energy, radiation, or other nuclear-specific hazards. On nuclear licensed sites, the PTW system is mandated by the Nuclear Site Licence conditions and is far more rigorous than PTW systems on standard industrial sites. Before any electrical work can begin, an Authorised Person (AP) must assess the scope of work, identify all hazards, apply isolations, verify safe conditions, and issue a formal permit. The permit specifies exactly what work is permitted, who may carry it out, the time window, and the conditions that must be maintained. No work may begin until the permit is in hand and understood. If conditions change, the permit must be suspended and re-issued. The PTW system on nuclear sites typically has multiple levels: Radiation Work Permit (RWP), Electrical Isolation Certificate, and the overarching PTW. All documents must be retained as quality records.',
  },
  {
    question: 'What is the CCNSG Safety Passport and is it enough for nuclear sites?',
    answer:
      'The Client Contractor National Safety Group (CCNSG) Safety Passport is a nationally recognised site safety card that demonstrates basic health and safety awareness. It is required for access to most UK nuclear, chemical, oil and gas, and major construction sites. To obtain a CCNSG Safety Passport you must complete a one-day training course covering hazard identification, risk assessment, permit to work principles, emergency procedures, and site rules. The card is valid for three years. However, the CCNSG Safety Passport alone is not sufficient for nuclear sites — you will also need the SHEA Nuclear card (or site-specific induction), and you must pass the security vetting for the site. Think of CCNSG as the baseline; SHEA Nuclear is the nuclear-specific layer on top.',
  },
  {
    question: 'How do I get my first nuclear site electrical job?',
    answer:
      'The most common entry route is through a specialist nuclear or major infrastructure contractor such as Cavendish Nuclear, Jacobs, Doosan Babcock, or Altrad. These companies regularly recruit electricians for outage and new-build work at Sellafield, Hinkley Point C, and other sites. Start by obtaining your CCNSG Safety Passport and SHEA Nuclear card — having these before applying demonstrates initiative. Make sure your CSCS or ECS (Electrotechnical Certification Scheme) card is current and reflects your highest qualification. Some contractors require an NVQ Level 3 in Electrotechnical Technology or equivalent. Once you have your foot in the door, the employer will initiate the security vetting process. Pay rates for first-time nuclear-site electricians typically start at £55 to £65 per hour on PAYE, rising with experience and clearance level.',
  },
  {
    question: 'What nuclear sites in the UK currently have active electrical contractor work?',
    answer:
      'The largest employer of nuclear-site electricians in the UK is Sellafield in Cumbria, which has ongoing decommissioning and waste management work spanning decades. Hinkley Point C in Somerset (EDF Energy) is the largest active new nuclear build project, employing thousands of contractors including large numbers of electricians. Sizewell C (Suffolk) is in the planning and early development phase. Heysham 1 and 2 (Lancashire), Hartlepool, and Torness (Scotland) are operational EDF Advanced Gas-cooled Reactor (AGR) stations with regular outage contractor work. Dungeness B (Kent) and Hunterston B (Scotland) have been shut down but decommissioning work continues. AWE Aldermaston and Burghfield (nuclear weapons sites operated for the Ministry of Defence) also employ large numbers of electrical contractors, but require additional security clearance.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/atex-hazardous-area-electrical-installations',
    title: 'ATEX Hazardous Area Electrical Installations',
    description:
      'Nuclear sites often include ATEX zones. Understand zone classification and Ex equipment selection.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/guides/high-voltage-electrical-work-uk',
    title: 'High Voltage Electrical Work in the UK',
    description:
      'Nuclear sites operate at HV. Understand authorisation systems and HV switching procedures.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/mod-defence-site-electrical-work',
    title: 'MOD Defence Site Electrical Work',
    description:
      'AWE Aldermaston and Burghfield require MOD-level clearance. Understand the SQEP and Def Stan requirements.',
    icon: Lock,
    category: 'Guide',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates for nuclear site work on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/compex-qualification-guide',
    title: 'CompEx Qualification Guide',
    description:
      'CompEx certification for explosive atmosphere work — relevant to nuclear sites with ATEX zones.',
    icon: BadgeCheck,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'Study for C&G 2391 with structured training modules covering advanced installation types.',
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
    heading: 'Nuclear Site Electrical Work: What Every Electrician Needs to Know',
    content: (
      <>
        <p>
          Working as an electrician on a UK nuclear licensed site is among the most demanding and
          best-paid electrical work available. Nuclear sites operate under strict regulatory control
          by the Office for Nuclear Regulation (ONR), and all contractors — including electricians —
          must comply with site licence conditions, security vetting requirements, and a safety
          culture that goes well beyond standard commercial or industrial electrical work.
        </p>
        <p>
          The rewards are significant. Nuclear-site electricians typically earn £55 to £90+ per hour,
          with the highest rates on decommissioning and new-build projects. The work is long-term,
          technically interesting, and provides a career that is genuinely recession-proof — nuclear
          decommissioning in the UK will continue for decades.
        </p>
        <p>
          This guide covers the UK nuclear licensed sites, the security vetting process, the
          additional standards that apply on nuclear sites (IEC 60364 alongside{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink>
          ), permit to work systems, the required training cards, and how to make the transition from
          standard electrical work into nuclear.
        </p>
      </>
    ),
  },
  {
    id: 'nuclear-sites',
    heading: 'UK Nuclear Licensed Sites',
    content: (
      <>
        <p>
          The ONR issues Nuclear Site Licences to operators of civil nuclear facilities. Each licence
          attaches a set of Licence Conditions (LCs) that govern how the site is operated, maintained,
          and decommissioned. Contractors working on licensed sites are bound by these conditions
          through their contractual arrangements with the site operator.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sellafield (Cumbria)</strong> — the UK's largest and most complex nuclear
                site, covering reprocessing, waste management, and decommissioning. Thousands of
                contractors are employed at any given time. Work spans decades.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hinkley Point C (Somerset)</strong> — the UK's first new nuclear power
                station in a generation, under construction by EDF Energy. The largest infrastructure
                project in the UK, with peak workforce exceeding 10,000 on site.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Heysham 1 and 2, Hartlepool, Torness</strong> — operational EDF
                Advanced Gas-cooled Reactor stations with regular outage maintenance contractor
                work. Outages last several weeks and require large numbers of specialist
                contractors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>AWE Aldermaston and Burghfield (Berkshire)</strong> — nuclear weapons
                establishment operated for the Ministry of Defence. Requires additional MOD security
                clearance beyond standard nuclear vetting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Decommissioning sites</strong> — Dungeness B, Hunterston B, Bradwell, and
                others are in various stages of defuelling and decommissioning. Decommissioning work
                provides steady long-term employment for electrical contractors.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'security-vetting',
    heading: 'Security Vetting: BPSS, CTC and SC Clearance',
    content: (
      <>
        <p>
          Security vetting is non-negotiable on nuclear licensed sites. The level of clearance
          required depends on the site, the areas you will access, and the nature of the work.
          Vetting is initiated by your employer and processed by the relevant government vetting
          authority — you cannot self-initiate nuclear security vetting.
        </p>
        <div className="grid gap-4 sm:grid-cols-3 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">BPSS</h3>
            <p className="text-white text-sm leading-relaxed">
              Baseline Personnel Security Standard. Minimum for most nuclear sites. Covers identity,
              right to work, three years of employment history, and criminal record check. Typically
              completed in 2 to 4 weeks. Required for all nuclear site workers without exception.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">CTC</h3>
            <p className="text-white text-sm leading-relaxed">
              Counter-Terrorism Check. Required for roles with access to sensitive areas or
              information. Involves national security database checks. Takes 4 to 8 weeks. Required
              at Sellafield for many contractor roles and at AWE sites.
            </p>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">SC</h3>
            <p className="text-white text-sm leading-relaxed">
              Security Check. The most common clearance for long-term nuclear site contractors. Ten
              years of background check, financial vetting, and interview. Takes 4 to 6 months.
              Required for regular unescorted access to controlled areas.
            </p>
          </div>
        </div>
        <p>
          Plan the vetting timeline when considering nuclear site work. The employer will guide you
          through the process, but you need to be prepared for the personal and financial information
          requests. A clear criminal record and a settled employment history make the process
          straightforward.
        </p>
      </>
    ),
  },
  {
    id: 'standards',
    heading: 'IEC 60364 and BS 7671 on Nuclear Sites',
    content: (
      <>
        <p>
          Electrical installations on nuclear licensed sites must comply with BS 7671:2018+A3:2024
          for standard installations, but nuclear-safety-classified systems (Class 1 systems that
          could affect reactor safety) must also comply with IEC 60364 and additional
          nuclear-specific standards such as IEC 60780 (nuclear power plants — electrical equipment
          of the safety system) and site-specific technical specifications.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Material traceability</strong> — all materials used in safety-classified
                systems must be traceable back to their manufacturer certification. No substitution
                without formal engineering change control.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inspection hold points</strong> — the installation process is divided into
                stages with formal hold points where a quality inspector must sign off before work
                proceeds. This is mandated by the site Quality Plan.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Quality records</strong> — test results, inspection records, and as-built
                drawings must be retained for the life of the installation — which on a nuclear site
                may be 40+ years. Records are audited by the ONR.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Seismic qualification</strong> — on new-build nuclear stations (Hinkley
                Point C), safety-classified electrical equipment and cable installations must be
                designed to withstand site-specific seismic events. Cable supports and tray systems
                require seismic design certification.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'safety-culture',
    heading: 'Nuclear Safety Culture and Permit to Work',
    content: (
      <>
        <p>
          Nuclear safety culture — sometimes called a "questioning attitude" — is the expectation
          that every worker, regardless of role, will stop and raise a concern if something does not
          look right. This is not optional on nuclear sites. The ONR judges site licence compliance
          in part on the health of the site safety culture.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Stop Work Authority</strong> — every worker has the explicit right and duty
                to stop work if they observe an unsafe condition. Stopping work for safety on a
                nuclear site is never a disciplinary matter.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Permit to Work (PTW)</strong> — formal written permission is required before
                any work on plant or equipment. The PTW specifies the scope, isolations, radiation
                dose limits, and time window. No work without a permit, no exceptions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Isolation verification</strong> — electrical isolations on nuclear sites are
                verified by independent test before any work begins. Proving dead by test is
                mandatory — never assume isolation is in place.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Radiation awareness</strong> — even electricians working on non-nuclear
                systems must understand radiation zones, dosimetry, and contamination procedures.
                Personal dosimeters are worn at all times in radiation-controlled areas.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'training',
    heading: 'Required Training and Cards',
    content: (
      <>
        <p>
          To access a UK nuclear licensed site as an electrical contractor, you typically need the
          following as a minimum:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BadgeCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>ECS (Electrotechnical Certification Scheme) card</strong> — the standard
                card for qualified electricians in the UK. Must reflect your current role and
                qualifications.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BadgeCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>CCNSG Safety Passport</strong> — Client Contractor National Safety Group
                site safety card. Valid for three years. Required for most nuclear and major
                industrial sites.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BadgeCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SHEA Nuclear card</strong> — Safety, Health and Environment Awareness in the
                Nuclear Industry. Issued by Cogent Skills. Required for site access at Sellafield,
                Hinkley Point C, Heysham, and most other licensed sites. Valid for three years.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BadgeCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Site-specific induction</strong> — each site has its own induction covering
                site rules, emergency procedures, radiation zones, and permit to work system.
                Typically one to two days.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BadgeCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>CompEx (if applicable)</strong> — if the role involves work in ATEX
                hazardous areas on the nuclear site (for example, in certain process buildings),
                CompEx certification is also required. See the{' '}
                <SEOInternalLink href="/guides/compex-qualification-guide">
                  CompEx qualification guide
                </SEOInternalLink>
                .
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pay-rates',
    heading: 'Pay Rates and Getting Into Nuclear Electrical Work',
    content: (
      <>
        <p>
          Nuclear-site electrical work commands a significant pay premium over standard commercial
          and industrial electrical work. The premium reflects the vetting burden, specialist
          knowledge, restricted working environment, and the long-term nature of most contracts.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrician (PAYE, new to nuclear):</strong> £55–£65 per hour. Hinkley
                Point C and Sellafield outage work. CCNSG and SHEA Nuclear required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrician (experienced, SC cleared):</strong> £65–£80 per hour. Sellafield
                decommissioning, safety-classified work, nuclear new build.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Authorised Person / HV Electrical:</strong> £80–£90+ per hour. HV
                authorisation, switching programmes, outage management. See the{' '}
                <SEOInternalLink href="/guides/high-voltage-electrical-work-uk">
                  HV electrical work guide
                </SEOInternalLink>
                .
              </span>
            </li>
          </ul>
        </div>
        <p>
          The most direct route in is through one of the major nuclear Tier 1 contractors: Cavendish
          Nuclear, Jacobs, Doosan Babcock, Altrad, Kaefer, or Bilfinger. Search their careers pages
          for "electrician nuclear" roles. Having your CCNSG and SHEA Nuclear card before applying
          demonstrates readiness and accelerates the onboarding process.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Manage Nuclear Site Documentation',
    content: (
      <>
        <p>
          Nuclear site work generates substantial documentation requirements — test records,
          inspection sign-offs, permit records, and quality certificates. Elec-Mate helps you manage
          the electrical certification side of this documentation chain.
        </p>
        <SEOAppBridge
          title="Electrical certification for specialist site work"
          description="Complete Electrical Installation Certificates and test records on site. Elec-Mate's EIC app works offline on nuclear sites where internet access may be restricted, syncing when you return to a connected area. Professional PDF output for quality record submission."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function NuclearSiteElectricalWorkPage() {
  return (
    <GuideTemplate
      title="Nuclear Site Electrical Work UK | Electrician Guide"
      description="Complete guide to working as an electrician on UK nuclear licensed sites. Security vetting (BPSS, CTC, SC), SHEA Nuclear card, CCNSG Safety Passport, IEC 60364, permit to work systems, and pay rates of £55–90+/hr."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Specialist Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          Nuclear Site Electrical Work:{' '}
          <span className="text-yellow-400">The UK Electrician's Complete Guide</span>
        </>
      }
      heroSubtitle="Working on UK nuclear licensed sites pays £55–90+/hr but demands security vetting, specialist training cards, and a safety culture unlike any other sector. This guide covers everything you need to make the transition."
      readingTime={18}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Nuclear Site Electrical Work"
      relatedPages={relatedPages}
      ctaHeading="Certify and Document Nuclear Site Electrical Work"
      ctaSubheading="Elec-Mate's EIC and test record tools work offline for restricted nuclear site environments. Professional PDF output for quality record submission. 7-day free trial."
    />
  );
}
