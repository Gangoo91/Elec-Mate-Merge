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
  BadgeCheck,
  ClipboardCheck,
  Wrench,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Specialist Work', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Rail Electrical Work', href: '/guides/rail-electrical-work-uk' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'pts-card', label: 'PTS: Personal Track Safety Card' },
  { id: 'olec', label: 'OLEC: Overhead Line Electrical Competency' },
  { id: 'sentinel', label: 'Sentinel Scheme' },
  { id: 'bs-en-50110', label: 'BS EN 50110 Rail Electrical Switching' },
  { id: 'types-of-work', label: 'Types of Rail Electrical Work' },
  { id: 'pay-career', label: 'Pay Rates and Career Path' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Working on or near the railway infrastructure requires a Personal Track Safety (PTS) card, issued by Network Rail and registered on the Sentinel competency management system. PTS demonstrates the holder understands the hazards of working near moving trains and the rules for safe working.',
  'OLEC (Overhead Line Electrical Competency) is the qualification required to work on or near 25kV AC electrified overhead line equipment (OLE) on the UK main line rail network. OLEC is issued in three levels corresponding to the type of work and level of supervision required.',
  'The Sentinel scheme is Network Rail\'s competency and identity management system. All workers requiring PTS or other railway-specific competencies must be registered on Sentinel. Contractors and workers carry a Sentinel smartcard that can be scanned to verify competencies on site.',
  'Electrical switching on the railway is governed by BS EN 50110-1 (Operation of electrical installations). This European standard covers the safety of electrical switching operations and applies to railway electrical systems including 25kV traction supply and 650V/750V DC third rail systems.',
  'Rail electrical work spans station and depot fit-outs, signalling power supplies, traction power infrastructure, platform lighting, and communications systems. Pay rates range from £35 to £65+ per hour depending on the role, competency level, and shift pattern.',
];

const faqs = [
  {
    question: 'What is the PTS card and how do I get one?',
    answer:
      'The Personal Track Safety (PTS) card is a competency card that shows the holder has received training in the rules and hazards of working in the railway environment, specifically relating to working on or near the operational track. It is a mandatory requirement for any person who needs to access the railway infrastructure (the track, structures, and equipment in the operational railway environment). To obtain a PTS card you must complete Network Rail-approved PTS training, which covers: understanding track environments; understanding how trains and other movements might affect you; the rules for walking safely near the railway; understanding Lookout and warning systems; emergency procedures. The training is typically one day and is delivered at Network Rail-approved training centres. Following training, the candidate is assessed and, if successful, their PTS competency is recorded on the Sentinel system. PTS is not a stand-alone card — it is a competency recorded on your Sentinel smartcard. PTS must be renewed every 2 years.',
  },
  {
    question: 'What is the Sentinel scheme?',
    answer:
      'Sentinel is Network Rail\'s competency and identity management system for workers on the railway infrastructure. It is operated by Sentinel (a division of RSSB — Rail Safety and Standards Board). Anyone working on Network Rail infrastructure who requires track access or holds railway-specific competencies must be registered on Sentinel and carry a Sentinel smartcard. The Sentinel smartcard contains a chip that records the holder\'s competencies — including PTS status, OLEC level, specific equipment authorisations, and medical fitness status. When you arrive on a Network Rail worksite, a card reader is used to verify that your Sentinel card is valid and that you hold the required competencies for the work being done. Employers and workers can view Sentinel records through the online Sentinel portal. There is a small annual fee for maintaining a Sentinel registration. Non-Network Rail managed sites (for example, London Underground, Docklands Light Railway, or Metrolink) operate their own competency management systems and do not use Sentinel.',
  },
  {
    question: 'What does OLEC cover and what are the different levels?',
    answer:
      'OLEC (Overhead Line Electrical Competency) is the qualification framework for working with or near 25kV AC overhead line equipment (OLE) on the GB main line rail network. OLEC is issued at three levels: OLEC 1 covers working in the vicinity of OLE (not directly on it) — this is required by workers such as civil engineers and structural workers who may need to work near but not on OLE. OLEC 2 covers electrical staff who need to work directly on OLE, including maintenance, inspection, and repair. OLEC 3 covers senior staff including engineers and those responsible for electrical safety of OLE. OLEC training is competency-based and delivered at approved training centres. It involves theoretical training in traction supply systems, safety rules, and switching procedures, followed by practical assessment. OLEC is recorded on the Sentinel system. The 25kV AC overhead line carries potentially lethal voltages — the clearance rules (minimum distances from live OLE) are stringent and must be understood by anyone working in the rail environment.',
  },
  {
    question: 'What does BS EN 50110 require for railway electrical switching?',
    answer:
      'BS EN 50110-1 (Operation of electrical installations) is the European standard that governs the safe operation, including switching, of electrical installations. It is applicable across all electrical systems including railway traction supply, station electrical installations, and depot electrical systems. The standard sets out requirements for: planning and organisation of work on electrical installations; designation of work areas (boundaries of the work site); isolation and proving dead before work begins; earthing and short-circuiting of live systems; work procedures; equipment required for electrical safety; and the competencies required of persons carrying out electrical switching. On Network Rail infrastructure, the specific safety rules for traction supply switching are contained in Network Rail\'s own Group Standard GS/RT8000 (Rule Book) and supporting standards, which implement the principles of BS EN 50110 in the railway context. The Responsible Engineer and Designated Responsible Engineer (DRE) roles in Network Rail electrical safety correspond broadly to the AP/SAP roles in industrial electrical safety.',
  },
  {
    question: 'What types of electrical work are available in the rail sector?',
    answer:
      'The rail electrical sector is diverse. Main categories of work include: Station electrical fit-outs — new stations and station refurbishments require extensive electrical installations including LV distribution, lighting (including platform lighting to specific lux levels), HVAC controls, lift and escalator power, emergency lighting, and fire alarm systems. This work is similar to commercial electrical work but requires PTS card holders for any work near the operational railway. Depot electrical — train maintenance depots have complex LV distribution, lighting, overhead crane power, traction testing facilities, and 25kV or 750V DC supplies for train testing. Signalling power — signalling systems require extremely reliable, often dual-supply, battery-backed power. Signalling power electricians work alongside signalling engineers and need to understand the criticality requirements. Traction power infrastructure — the 25kV overhead line supply equipment, traction substations, and associated LV auxiliary supplies. This is the most specialist and highest-paid rail electrical work, requiring OLEC 2 or 3. Communications and security systems — station CCTV, passenger information systems, public address, and access control systems all require electrical installation work.',
  },
  {
    question: 'How do I transition from domestic or commercial electrical work into the rail sector?',
    answer:
      'The entry requirements for most station and depot electrical work are a current ECS Gold card and a PTS card. This makes rail electrical work one of the more accessible specialist sectors compared to offshore or nuclear, which require more extensive training and vetting. The starting point is to register on the Sentinel system, obtain your PTS card, and approach rail contractors such as Amey, Colas Rail, VolkerRail, Siemens Mobility, ABB, and Atkins. Station and depot electrical fit-out work often uses LV electricians from the commercial sector and provides the ideal entry point. Once you have rail experience on your CV and a Sentinel card with active PTS, subsequent rail contracts become much easier to secure. For progression into traction power and OLEC work, you will typically be sponsored by a traction power contractor for OLEC training, which usually follows 2 to 3 years of general rail electrical experience.',
  },
  {
    question: 'What are the pay rates for rail electrical work?',
    answer:
      'Pay rates in the rail sector reflect the additional training requirements and antisocial working hours (much rail maintenance work is done at night during engineering possession windows): LV electricians on station fit-outs (PTS only): £35–£45/hr. Experienced rail electricians with active Sentinel records: £40–£55/hr. Traction power electricians (OLEC 2): £55–£75/hr. Senior electrical engineers (OLEC 3, DRE authority): £65–£90+/hr. Night shift, weekend, and bank holiday premiums add significantly to rates — a basic rate of £45/hr with a 40% night shift premium and overtime is equivalent to £63+/hr for night work. Rail contractors often work 4 on / 4 off or 6 on / 3 off night shift patterns during major engineering works.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/high-voltage-electrical-work-uk',
    title: 'High Voltage Electrical Work UK',
    description:
      'Traction power substations operate at HV. Understand AP/CP/SAP authorisation and EWR Regulation 14.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/data-centre-electrical-installation',
    title: 'Data Centre Electrical Installation',
    description:
      'Rail station and depot work has similar critical power and redundancy requirements to data centres.',
    icon: Wrench,
    category: 'Guide',
  },
  {
    href: '/guides/atex-hazardous-area-electrical-installations',
    title: 'ATEX Hazardous Area Electrical',
    description:
      'Battery rooms in railway depots and certain other rail environments may require ATEX knowledge.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates for station and depot electrical fit-outs on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'C&G 2391 is essential groundwork before pursuing rail electrical work.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/guides/mod-defence-site-electrical-work',
    title: 'MOD Defence Site Electrical',
    description:
      'MoD sites include railway infrastructure at some bases — understand Def Stan and SQEP requirements.',
    icon: ShieldCheck,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Rail Electrical Work in the UK: The Specialist Electrician\'s Guide',
    content: (
      <>
        <p>
          The rail sector offers a steady stream of electrical work that, while less glamorous than
          offshore or nuclear, provides excellent pay rates, long-term contracts, and a genuinely
          interesting range of technical challenges. Network Rail's CP7 (Control Period 7) runs from
          2024 to 2029 and commits to billions of pounds of infrastructure enhancement and
          maintenance — meaning rail electrical work will be in demand for years to come.
        </p>
        <p>
          Rail electrical work spans station fit-outs, depot electrical installations, signalling
          power supplies, traction power infrastructure, platform lighting, and communications
          systems. The unifying requirement is access to the railway environment, which demands the{' '}
          <strong>Personal Track Safety (PTS) card</strong> and registration on the{' '}
          <strong>Sentinel</strong> competency management system. Beyond that, specialist roles
          require OLEC qualification and deep knowledge of electrical switching under{' '}
          <strong>BS EN 50110</strong>.
        </p>
      </>
    ),
  },
  {
    id: 'pts-card',
    heading: 'PTS: Personal Track Safety Card',
    content: (
      <>
        <p>
          The Personal Track Safety (PTS) card is the baseline access requirement for working on or
          near the operational railway. It is not a standalone card but a competency recorded on the
          Sentinel smartcard. Without a valid PTS record on Sentinel, you cannot access Network Rail
          infrastructure.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BadgeCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Training duration:</strong> Typically 1 day for initial PTS. Renewal every 2 years via a shorter refresher assessment.</span>
            </li>
            <li className="flex items-start gap-3">
              <BadgeCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>What it covers:</strong> Track environment hazards, walking near trains, Lookout systems, warning signals, emergency procedures, and the personal duty to challenge unsafe acts.</span>
            </li>
            <li className="flex items-start gap-3">
              <BadgeCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Medical requirement:</strong> PTS requires a railway medical (D&A test and fitness check). This is a condition of Sentinel registration and must be renewed regularly.</span>
            </li>
            <li className="flex items-start gap-3">
              <BadgeCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Cost:</strong> £200–£400 for initial PTS training and assessment at an approved centre. Employers often fund this for new rail hires.</span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'olec',
    heading: 'OLEC: Overhead Line Electrical Competency',
    content: (
      <>
        <p>
          OLEC (Overhead Line Electrical Competency) is required for anyone working on or near
          25kV AC overhead line equipment on the GB main line network. The overhead line system
          carries 25kV AC at up to 300A — contact or an unsafe approach is invariably fatal.
          The clearance rules (safe working distances from live OLE) are strictly enforced.
        </p>
        <div className="grid gap-4 sm:grid-cols-3 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-base mb-3">OLEC 1</h3>
            <p className="text-white text-sm leading-relaxed">
              Working in the vicinity of OLE without direct contact. Awareness of OLE clearances.
              Required by civil engineers, structural workers, and others who may work near but not
              on OLE.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-base mb-3">OLEC 2</h3>
            <p className="text-white text-sm leading-relaxed">
              Direct work on overhead line equipment — maintenance, inspection, repair. Full
              understanding of traction supply switching, earthing procedures, and OLE safety rules.
              Required for most traction power electrical work.
            </p>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-white text-base mb-3">OLEC 3</h3>
            <p className="text-white text-sm leading-relaxed">
              Senior electrical engineers and Designated Responsible Engineers (DRE). Responsible
              for safety of OLE working parties. Involved in switching authority and management of
              complex traction power outages.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'sentinel',
    heading: 'The Sentinel Scheme: Competency Management on the Railway',
    content: (
      <>
        <p>
          Sentinel is Network Rail's competency and identity management system, operated by RSSB
          (Rail Safety and Standards Board). All rail infrastructure workers requiring track access
          or railway-specific competencies must be registered on Sentinel.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Smartcard</strong> — the Sentinel smartcard records all your railway competencies including PTS status, OLEC level, equipment authorisations, and medical fitness. It is scanned at site access points.</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Online portal</strong> — workers and employers can view and manage Sentinel records online. Employers add and remove competency records as training is completed and renewed.</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Annual renewal fee</strong> — there is a small annual fee for maintaining a Sentinel registration. Your employer typically covers this cost.</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Not applicable outside Network Rail</strong> — London Underground, DLR, TfL Rail, and other metro systems operate their own separate competency management systems. Experience on one does not automatically transfer.</span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'bs-en-50110',
    heading: 'BS EN 50110: Electrical Switching on the Railway',
    content: (
      <>
        <p>
          BS EN 50110-1 (Operation of electrical installations) is the European standard governing
          safe operation — including switching — of electrical installations. On the railway,
          electrical switching involves traction supply isolations (switching out 25kV AC overhead
          line sections), station distribution switching, and signalling power switching.
        </p>
        <p>
          The standard requires that switching operations are planned, that only authorised persons
          carry out switching, that isolation is verified by test, and that appropriate earthing is
          applied before work begins. Network Rail implements these principles through its Group
          Standard GS/RT8000 (Rule Book) and supporting electrification and plant standards.
        </p>
        <p>
          For station and depot LV electrical work, BS EN 50110 principles are implemented through
          normal permit to work and isolation procedures, consistent with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink> and
          the Electricity at Work Regulations 1989.
        </p>
        <SEOAppBridge
          title="Complete electrical certificates for rail station and depot work"
          description="Elec-Mate's EIC and test record tools are ideal for station fit-out and depot electrical work documentation. Produce professional PDF certificates on site. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'types-of-work',
    heading: 'Types of Rail Electrical Work',
    content: (
      <>
        <p>
          The rail sector offers diverse electrical work opportunities, requiring different
          competency levels:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Station fit-outs:</strong> LV distribution, platform lighting, emergency lighting, fire alarm systems, HVAC controls, lifts and escalator power, communications infrastructure. Entry-level rail work — PTS card sufficient.</span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Depot electrical:</strong> Train maintenance depots with complex LV distribution, overhead crane power, traction testing supplies, workshop lighting. Often includes 750V DC or 25kV AC supplies for train testing.</span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Signalling power:</strong> Highly reliable, dual-feed, battery-backed power supplies for safety-critical signalling equipment. Requires understanding of criticality requirements and change control processes.</span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Traction power infrastructure:</strong> 25kV AC overhead line systems, traction substations (often at 132kV or 33kV supply), and associated LV auxiliary supplies. Requires OLEC 2 or 3 and HV knowledge.</span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pay-career',
    heading: 'Pay Rates and Career Path in Rail Electrical Work',
    content: (
      <>
        <p>
          Rail electrical pay reflects the specialist training requirements and the antisocial hours
          involved in night-time maintenance work:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>LV electrician, PTS card, station fit-out:</strong> £35–£45/hr days, £50–£65/hr nights.</span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Experienced rail electrician, active Sentinel:</strong> £40–£55/hr.</span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Traction power electrician, OLEC 2:</strong> £55–£75/hr.</span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Senior electrical engineer, OLEC 3, DRE authority:</strong> £65–£90+/hr.</span>
            </li>
          </ul>
        </div>
        <p>
          The career path typically runs: domestic or commercial LV electrician → obtain PTS and
          Sentinel registration → station fit-out / depot electrical work → signalling power or
          traction substation auxiliary → OLEC 2 training (sponsored by contractor) → traction power
          electrician → OLEC 3 / DRE level.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function RailElectricalWorkPage() {
  return (
    <GuideTemplate
      title="Rail Electrical Work UK | PTS Card, Sentinel, OLEC Guide"
      description="Complete guide to rail electrical work in the UK. Network Rail PTS card, Sentinel competency scheme, OLEC (Overhead Line Electrical Competency), BS EN 50110 switching, station and depot fit-outs, and pay rates from £35–£90+/hr."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Specialist Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          Rail Electrical Work in the UK:{' '}
          <span className="text-yellow-400">PTS, Sentinel, OLEC, and Career Guide</span>
        </>
      }
      heroSubtitle="Rail electrical work offers steady contracts, pay rates of £35–£90+/hr, and a clear career progression from station fit-outs to traction power. This guide covers PTS, Sentinel, OLEC, BS EN 50110, and how to get started."
      readingTime={15}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Rail Electrical Work"
      relatedPages={relatedPages}
      ctaHeading="Complete Electrical Certificates for Rail Station and Depot Work"
      ctaSubheading="Elec-Mate's EIC certificate tools produce professional PDF output for station fit-out and depot electrical work documentation. 7-day free trial."
    />
  );
}
