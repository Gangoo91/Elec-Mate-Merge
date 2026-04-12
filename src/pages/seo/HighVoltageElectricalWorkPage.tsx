import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  AlertTriangle,
  ShieldCheck,
  FileCheck2,
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
  { label: 'High Voltage Electrical Work', href: '/guides/high-voltage-electrical-work-uk' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'definition', label: 'HV Definition and Voltage Bands' },
  { id: 'authorisation', label: 'HV Authorisation Systems' },
  { id: 'ena-standards', label: 'ENA Engineering Recommendations' },
  { id: 'dno-connections', label: 'DNO Connections Above LV' },
  { id: 'training', label: 'HV Training and Assessment' },
  { id: 'health-safety', label: 'Health and Safety: EWR Regulation 14' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'High voltage (HV) in the UK electrical industry context means voltages above 1kV AC (or 1.5kV DC). This is the boundary defined by BS 7671:2018+A3:2024 and IEC 60038. Standard distribution voltages above LV include 11kV, 33kV, 66kV, 132kV, and 275kV/400kV transmission.',
  'HV systems are operated through formal Authorisation systems. Key roles are: Authorised Person (AP) — responsible for establishing and maintaining safe working conditions; Competent Person (CP) — can carry out HV work under the control of an AP; Senior Authorised Person (SAP) — issues sanctions for testing and manages complex switching operations.',
  'ENA Engineering Recommendation G74 covers the protection of HV consumer installations. ENA Engineering Recommendation G82 covers safety management of HV electrical plant. These are the key industry standards for HV work on distribution networks.',
  'Electricity at Work Regulations 1989 Regulation 14 prohibits live working on HV systems in virtually all circumstances. Regulation 14 states that no person shall work on live conductors unless it is unreasonable in all the circumstances for it to be dead. For HV, "unreasonable" almost never applies — all HV work is carried out dead.',
  'HV-authorised electricians work in power generation, large industrial sites, data centres, DNO substation construction, and offshore wind. Pay rates range from £55 to £100+ per hour depending on the authorisation level and sector.',
];

const faqs = [
  {
    question: 'What counts as high voltage in UK electrical work?',
    answer:
      'The voltage band definitions in BS 7671:2018+A3:2024 (based on IEC 60038) are: Extra Low Voltage (ELV) — not exceeding 50V AC or 120V ripple-free DC; Low Voltage (LV) — exceeding ELV but not exceeding 1kV AC or 1.5kV DC; High Voltage (HV) — exceeding 1kV AC or 1.5kV DC. In the UK distribution network context, HV usually refers to the 11kV distribution network (medium voltage in IEC terminology) and above, including 33kV, 66kV, and 132kV sub-transmission. The 11kV distribution network feeds most large commercial and industrial sites via transformers down to 400V/230V LV. HV in the transmission network (National Grid) refers to the 275kV and 400kV Super Grid. For practical purposes: if you are working on anything above 1kV AC, it is HV work and requires appropriate authorisation.',
  },
  {
    question: 'What is an HV Authorised Person and how do I become one?',
    answer:
      'An Authorised Person (AP) is a person who has been formally assessed as competent to control HV switching operations and to establish and maintain safe electrical working conditions. APs are authorised by their employing company or site — authorisation is not a personal qualification you carry from employer to employer. Becoming an AP requires: a thorough understanding of the HV system being worked on (usually gained over several years as a Competent Person under AP supervision); completion of an HV authorisation training course covering switching, safety rules, permit to work systems, and fault recognition; a formal written and practical assessment; and formal appointment by letter from the authorising authority (usually the site electrical engineer or a qualified manager). The training and assessment process is typically 1 to 2 weeks and may cost £1,500 to £3,000. The candidate must then be supervised and observed on the specific HV system for a period before unsupervised authorisation is granted.',
  },
  {
    question: 'What is a switching programme and who can issue one?',
    answer:
      'A switching programme (sometimes called a switching schedule or isolation schedule) is a formal written document that lists, in precise order, all the switching operations required to achieve a particular network configuration — usually to isolate a section of HV equipment for maintenance or repair. The switching programme is prepared in advance by a Senior Authorised Person (SAP), reviewed for safety, and then executed by an AP or CP following each step in order. No switching may be carried out without an approved switching programme except in genuine emergency situations where safety is directly threatened. The switching programme also identifies all the isolators, circuit breakers, and earthing points that must be operated, and the sequence in which they must be operated to avoid creating a dangerous condition. After completing the switching, the AP confirms each step and signs the programme.',
  },
  {
    question: 'What is ENA Engineering Recommendation G74?',
    answer:
      'ENA Engineering Recommendation G74 (Protection of HV electrical plant and associated HV consumer installations) was published by the Energy Networks Association and provides guidance on the protection arrangements for HV installations connected to the Distribution Network Operator (DNO) network. It covers the protection relay settings, time-grading requirements, and automatic switching devices required on HV consumer substations (for example, the 11kV switchgear at a large industrial or commercial site). G74 is relevant when designing or maintaining the electrical protection on HV consumer installations — it ensures that the consumer protection co-ordinates correctly with the DNO network protection to achieve safe, selective fault clearance.',
  },
  {
    question: 'What is ENA Engineering Recommendation G82?',
    answer:
      'ENA Engineering Recommendation G82 (Requirements for the Connection of Generation to the Distribution Systems of Licensed Distribution Network Operators) covers generation connected to the distribution network. It is specifically relevant for embedded generation (solar farms, wind farms, combined heat and power plant) connecting at 11kV and 33kV. G82 defines the protection, control, and monitoring requirements for the connection point. For electricians and electrical engineers involved in HV-connected generation projects, G82 defines the technical requirements that the DNO will specify at the grid connection offer stage. The requirements include protection relay types and settings, automatic disconnection under abnormal voltage or frequency conditions, and communications to the DNO.',
  },
  {
    question: 'Does Electricity at Work Regulations Regulation 14 mean all HV work must be done dead?',
    answer:
      'Electricity at Work Regulations 1989 Regulation 14 states: "No person shall be engaged in any work activity on or so near any live conductor (other than one suitably covered with insulating material so as to prevent danger) that danger may arise unless — (a) it is unreasonable in all the circumstances for it to be dead; and (b) it is reasonable in all the circumstances for him to be at work on or near it while it is live; and (c) suitable precautions (including where necessary the provision of suitable protective equipment) are taken to prevent injury." For HV systems, condition (a) is almost never met — there is virtually no situation where it is unreasonable to make an 11kV circuit dead before working on it. Live HV working does exist (for example, on 132kV and above overhead line work using specialist live line techniques) but it requires highly specialised training and equipment, and is carried out only by specialist teams under exceptional circumstances. For the vast majority of HV work that electricians encounter — substation maintenance, switchgear replacement, cable jointing — the circuit is always made dead, verified by test, and earthed before work begins.',
  },
  {
    question: 'What pay rates can HV-authorised electricians expect?',
    answer:
      'HV authorisation commands a significant premium over standard LV electrical work. Typical UK market rates: HV Competent Person (working under AP supervision) — £45–£60 per hour; HV Authorised Person (AP, independent switching authority) — £60–£80 per hour; Senior Authorised Person (SAP, complex system management) — £75–£100+ per hour. The highest rates are found in: offshore wind and oil and gas (where HV work is combined with offshore premium pay); nuclear power (HV authorisation on nuclear-licensed sites adds significantly to the premium); major DNO substation projects (National Grid, SP Energy Networks, Western Power Distribution / National Grid Electricity Distribution). HV authorisation on a specific site or system also tends to create loyalty — an AP authorised on a particular 11kV network has significant value to that site operator.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/nuclear-site-electrical-work',
    title: 'Nuclear Site Electrical Work',
    description:
      'Nuclear sites operate at HV. Combine HV authorisation with nuclear vetting for maximum earning potential.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/offshore-electrical-work-uk',
    title: 'Offshore Electrical Work UK',
    description:
      'Offshore platforms and wind farms operate HV systems. Understand OPITO requirements and offshore pay rates.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/atex-hazardous-area-electrical-installations',
    title: 'ATEX Hazardous Area Electrical',
    description:
      'Many HV industrial sites also have ATEX zones. Understand zone classification and CompEx requirements.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates for LV elements of HV substation projects.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'Study for C&G 2391 — essential groundwork before pursuing HV authorisation training.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/guides/mod-defence-site-electrical-work',
    title: 'MOD Defence Site Electrical',
    description: 'Many MOD sites have HV systems. Understand Def Stan requirements and SQEP roles.',
    icon: Lock,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'High Voltage Electrical Work in the UK: What You Need to Know',
    content: (
      <>
        <p>
          High voltage electrical work is among the most technically demanding and best-rewarded
          specialisms available to UK electricians and electrical engineers. HV systems power
          industrial sites, data centres, hospitals, offshore platforms, wind farms, and the
          national distribution network. Access to this work requires formal HV authorisation —
          a structured system of roles and responsibilities that exists specifically to manage the
          risk of working with voltages that are invariably fatal on contact.
        </p>
        <p>
          This guide covers the definition of HV in UK electrical standards, the authorisation role
          structure (AP/CP/SAP), the key ENA Engineering Recommendations, DNO connections above LV,
          HV training and assessment, and the health and safety framework — in particular Electricity
          at Work Regulations 1989 Regulation 14, which governs live working restrictions.
        </p>
        <p>
          For standard LV electrical work, see the guide to{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>
          . HV work sits above and beyond BS 7671, which formally limits its scope to installations
          up to 1kV AC.
        </p>
      </>
    ),
  },
  {
    id: 'definition',
    heading: 'HV Definition and Voltage Bands',
    content: (
      <>
        <p>
          The voltage band definitions that apply in UK electrical work come from BS 7671 (based on
          IEC 60038):
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span><strong>Extra Low Voltage (ELV):</strong> Not exceeding 50V AC or 120V ripple-free DC. Safe to touch in most circumstances.</span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Low Voltage (LV):</strong> Exceeding ELV but not exceeding 1kV AC or 1.5kV DC. The standard domestic and commercial supply (230V/400V) falls in this band. Governed by BS 7671.</span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span><strong>High Voltage (HV):</strong> Exceeding 1kV AC or 1.5kV DC. UK distribution: 11kV, 33kV, 66kV, 132kV. Transmission: 275kV, 400kV. Beyond BS 7671 scope.</span>
            </li>
          </ul>
        </div>
        <p>
          In UK industry, HV most commonly refers to 11kV — the voltage at which power is distributed
          to large sites from DNO substations. Transformers step 11kV down to 400V/230V for
          building distribution. Many large industrial and commercial sites own and operate their own
          11kV switchgear and transformers (HV consumer installations).
        </p>
      </>
    ),
  },
  {
    id: 'authorisation',
    heading: 'HV Authorisation Systems: AP, CP, and SAP Roles',
    content: (
      <>
        <p>
          HV systems are controlled through formal written Authorisation systems that define who may
          carry out specific activities and under what conditions. The key roles are:
        </p>
        <div className="grid gap-4 sm:grid-cols-3 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">CP</h3>
            <p className="text-white text-sm leading-relaxed">
              Competent Person. Competent to carry out specific HV work tasks under the control of
              an AP. The CP cannot act independently on the HV system — they must work within a
              safe system established by an AP.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">AP</h3>
            <p className="text-white text-sm leading-relaxed">
              Authorised Person. Responsible for establishing and maintaining safe working conditions
              on the HV system. Issues Sanction for Test documents. Controls access to HV plant.
              Can carry out switching operations per the switching programme.
            </p>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">SAP</h3>
            <p className="text-white text-sm leading-relaxed">
              Senior Authorised Person. Manages complex switching operations, prepares switching
              programmes, issues Sanctions for Test. Has overall responsibility for the safe
              management of the HV system during an outage or operational change.
            </p>
          </div>
        </div>
        <p>
          Authorisation is always specific to a system or site. An AP authorised on a particular
          11kV network at a manufacturing plant is not automatically authorised on a different 11kV
          network at another site — they must be re-assessed and re-authorised by the responsible
          person at each site.
        </p>
      </>
    ),
  },
  {
    id: 'ena-standards',
    heading: 'ENA Engineering Recommendations G74 and G82',
    content: (
      <>
        <p>
          The Energy Networks Association (ENA) publishes Engineering Recommendations that govern
          how HV systems connect to and interact with the distribution network:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>ENA G74</strong> — Protection of HV electrical plant and associated HV
                consumer installations. Covers protection relay settings, time-grading, and automatic
                switching required on HV consumer substations (for example, at an 11kV-connected
                industrial site). Relevant to any engineer specifying or commissioning HV protection
                systems.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>ENA G82</strong> — Requirements for the Connection of Generation to
                Distribution Systems. Governs embedded generation (solar farms, wind farms, CHP)
                connecting at 11kV and 33kV. Defines protection, control, and communications
                requirements at the point of connection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>ENA G99</strong> — Requirements for Generators connecting at LV and up to
                HV. Sets out the technical requirements for generation connecting to the distribution
                network, including protection relay settings and grid code compliance. Related to
                G82 but covers a wider voltage range.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'dno-connections',
    heading: 'DNO Connections Above LV: 11kV, 33kV, 132kV',
    content: (
      <>
        <p>
          Large sites — hospitals, data centres, manufacturing plants, supermarkets, universities —
          are often connected to the DNO network at 11kV rather than 400V/230V LV. This gives them
          access to larger power supplies (several MVA) and often reduces the unit cost of
          electricity. The site operator owns and maintains the 11kV switchgear, transformers, and
          LV distribution — these are the HV consumer installation.
        </p>
        <p>
          The DNO connection process for HV sites involves a formal grid connection application,
          a connection offer specifying the protection requirements (per G74), and an inspection and
          test by the DNO before energisation. The site's HV engineer or consultant manages this
          process. Electricians and electrical engineers with HV authorisation are involved in
          commissioning the site's switchgear, testing protection relays, and energising the
          installation under DNO supervision.
        </p>
        <SEOAppBridge
          title="Manage LV certification within HV substation projects"
          description="Even the largest HV substation projects include LV distribution boards, UPS systems, and auxiliary supplies that require BS 7671-compliant EIC certificates. Elec-Mate's certificate tools handle the LV elements efficiently."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'training',
    heading: 'HV Training and Assessment',
    content: (
      <>
        <p>
          There is no single nationally-standardised HV authorisation training route in the way that
          CompEx or SHEA Nuclear standardises competency for explosive atmosphere and nuclear work.
          HV authorisation training is delivered by a range of providers and is always system and
          site specific. Common training providers and routes include:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>DNO graduate and apprentice schemes</strong> — National Grid Electricity Distribution, SP Energy Networks, UK Power Networks, and Electricity North West all run structured training schemes for HV engineers and technicians. These provide the most comprehensive route to HV authorisation.</span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Independent HV training providers</strong> — PASS (Power Academy Support Services), AEI Cables training division, and various specialist electrical training companies offer 1 to 2 week HV safety rules and authorisation courses. Costs typically £1,500–£3,000 per candidate.</span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Site-specific assessment</strong> — after completing generic HV safety training, the candidate must be assessed on the specific system they will be authorised on by the responsible senior engineer. This typically involves a period of supervised switching before unsupervised authorisation.</span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'health-safety',
    heading: 'Health and Safety: Electricity at Work Regulations 1989 Regulation 14',
    content: (
      <>
        <p>
          Regulation 14 of the Electricity at Work Regulations 1989 is the legal provision that
          governs live working. It states:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <p className="text-white italic">
            "No person shall be engaged in any work activity on or so near any live conductor
            (other than one suitably covered with insulating material so as to prevent danger) that
            danger may arise unless — (a) it is unreasonable in all the circumstances for it to be
            dead; and (b) it is reasonable in all the circumstances for him to be at work on or near
            it while it is live; and (c) suitable precautions (including where necessary the provision
            of suitable protective equipment) are taken to prevent injury."
          </p>
        </div>
        <p>
          For HV systems, condition (a) — it being unreasonable to make the conductor dead — is
          almost never satisfied. There is virtually no routine maintenance, inspection, or
          installation activity on 11kV systems where it is unreasonable to de-energise the circuit
          first. The HSE takes a very firm position on this: HV live working requires an extremely
          high burden of justification and must never be treated as a routine practice.
        </p>
        <p>
          All routine HV work — switchgear maintenance, cable jointing, transformer replacement,
          protection relay testing — is carried out with the circuit de-energised, isolated, proved
          dead by test, and earthed. The earthing step is critical: HV earthing discharges any
          capacitive stored charge and provides a low-impedance path that ensures any inadvertent
          re-energisation causes an immediate fault clearance rather than an electrocution.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Building an HV Career',
    content: (
      <>
        <p>
          The route into HV electrical work typically starts with several years of experience as a
          qualified LV electrician on large industrial or commercial projects — gaining familiarity
          with switchgear, substations, and large distribution systems. From there, the progression
          is to Competent Person (CP) level under AP supervision, then to Authorised Person (AP),
          and in time to Senior Authorised Person (SAP).
        </p>
        <p>
          The highest-earning combination is HV authorisation plus a specialist sector premium: HV
          on offshore wind farms, HV on nuclear licensed sites, or HV on oil and gas refineries. For
          the latter two,{' '}
          <SEOInternalLink href="/guides/compex-qualification-guide">CompEx</SEOInternalLink> and
          the relevant security vetting are also required.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <BadgeCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Minimum foundation:</strong> C&G 2365 (Electrical Installations), C&G 2382 (18th Edition), C&G 2391 (Inspection and Testing), 5+ years LV experience on large commercial/industrial projects.</span>
            </li>
            <li className="flex items-start gap-3">
              <BadgeCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>HV training:</strong> Attend an HV Safety Rules course (1–2 weeks, £1,500–£3,000). Seek CP appointment on your first HV site under AP supervision.</span>
            </li>
            <li className="flex items-start gap-3">
              <BadgeCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Target sectors:</strong> DNO substation construction, large industrial HV maintenance, offshore wind O&amp;M, nuclear site HV.</span>
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

export default function HighVoltageElectricalWorkPage() {
  return (
    <GuideTemplate
      title="High Voltage Electrical Work UK | HV Electrician Guide"
      description="Complete guide to high voltage electrical work in the UK. HV definition (above 1kV AC), AP/CP/SAP authorisation roles, ENA G74 and G82, DNO connections at 11kV/33kV/132kV, HV training, and Electricity at Work Regulations Regulation 14."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Specialist Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          High Voltage Electrical Work in the UK:{' '}
          <span className="text-yellow-400">Authorisation, Standards, and Career Guide</span>
        </>
      }
      heroSubtitle="HV work (above 1kV AC) requires formal authorisation, strict switching procedures, and deep knowledge of EWR Regulation 14. This guide covers everything from AP/CP/SAP roles to ENA G74, DNO connections, and HV career paths."
      readingTime={17}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About High Voltage Electrical Work"
      relatedPages={relatedPages}
      ctaHeading="Certify the LV Elements of Your HV Substation Projects"
      ctaSubheading="Elec-Mate's EIC certificate tools handle the LV distribution within HV substation projects. Professional output for DNO submission. 7-day free trial."
    />
  );
}
