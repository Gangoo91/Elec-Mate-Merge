import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  AlertTriangle,
  Wrench,
  CheckCircle,
  FileCheck2,
  HardHat,
  Lock,
  ClipboardCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Tools & Equipment', href: '/guides/electrical-safety-at-home' },
  { label: 'Insulated Tools Guide', href: '/insulated-tools-guide' },
];

const tocItems = [
  { id: 'iec-60900', label: 'IEC 60900 Standard' },
  { id: 'what-ratings-mean', label: 'What Insulation Ratings Mean' },
  { id: 'when-mandatory', label: 'When Insulated Tools Are Mandatory' },
  { id: 'live-work-authorisation', label: 'Live Work Authorisation' },
  { id: 'brands', label: 'Brands — Knipex, Wiha, Wera, Bahco' },
  { id: 'tool-types', label: 'Types of Insulated Tools' },
  { id: 'inspection', label: 'Testing and Inspection' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'IEC 60900:2018 is the international standard for hand tools used for live working up to 1,000V AC and 1,500V DC. All insulated tools sold in the UK for electrical work must comply with this standard. The standard specifies testing, construction, and marking requirements.',
  'The double-triangle symbol (two overlapping triangles) or "1000V" marking on a tool confirms compliance with IEC 60900. The VDE mark (from the German testing body) indicates the tool has been independently tested to IEC 60900 and is widely regarded as the benchmark in the industry.',
  'Insulated tools are not a substitute for safe isolation. Under Regulation 14 of the Electricity at Work Regulations 1989, live working is only permitted in exceptional circumstances with employer authorisation, a risk assessment, and a second competent person present.',
  'Regular inspection and testing of insulated tools is required. The IEC 60900 standard requires that tools be inspected before each use and periodically tested by a competent person. Damaged insulation must be taken out of service immediately — there is no safe way to repair damaged insulation on hand tools.',
  'The insulation on IEC 60900 tools provides protection at 1,000V AC — but this is a safety margin, not an invitation to work live routinely. The insulation protects against accidental contact, not sustained live working without other precautions.',
];

const faqs = [
  {
    question: 'What does IEC 60900 mean for insulated tools?',
    answer:
      'IEC 60900:2018 is the international standard specifying requirements for hand tools used for live working on electrical systems up to 1,000V AC and 1,500V DC. The standard covers the construction of insulation layers, dielectric testing (tools are tested to 10,000V AC to provide a safety margin over the 1,000V working rating), mechanical testing, labelling requirements, and instructions for use. In the UK, IEC 60900 is adopted as BS EN IEC 60900. Any tool claiming to be "insulated" for electrical live work must comply with this standard.',
  },
  {
    question: 'What is the VDE mark and why does it matter?',
    answer:
      'VDE (Verband der Elektrotechnik) is a German testing and certification body that independently tests tools against IEC 60900. The VDE mark on a tool means the tool has been submitted to VDE, tested to the standard, and certified as compliant. This is important because some manufacturers self-declare compliance without independent testing. VDE certification provides independent assurance. Many professional electricians in the UK only purchase VDE-certified tools for live work applications.',
  },
  {
    question: 'When am I legally required to use insulated tools?',
    answer:
      'Insulated tools are legally required when working live on electrical systems under Regulation 14 of the Electricity at Work Regulations 1989. The regulation states that suitable precautions must be taken to prevent injury when working on or near live conductors. Using IEC 60900 compliant insulated tools is one of those precautions. However, live working itself requires specific employer authorisation, a risk assessment demonstrating it is unreasonable for the conductors to be dead, and a second competent person present. Insulated tools alone do not make live work safe or legal.',
  },
  {
    question: 'What is the difference between insulated and insulating tools?',
    answer:
      'Insulated tools have a covering of insulating material (typically two or more layers of different coloured materials) over a conductive core. The tool still conducts electricity through the metal core, but the insulation protects the user from accidental contact. Insulating tools are made entirely of non-conductive materials. For most electrical live working purposes, IEC 60900 insulated tools are specified. Insulating tools are less common and typically used in specialist high-voltage applications.',
  },
  {
    question: 'How often should insulated tools be tested?',
    answer:
      'IEC 60900 requires visual inspection before each use. For periodic electrical testing, the standard does not specify a fixed interval, but UK industry guidance typically recommends annual dielectric testing by a competent person. After any suspected electrical exposure (contact with a live conductor), the tool must be withdrawn from service and tested before reuse. The tool should also be removed from service if any damage to the insulation is visible — cracking, cuts, swelling, or discolouration. Many large contractors test insulated tools every six months as part of their PUWER inspection regime.',
  },
  {
    question: 'Can I use standard tools with insulating tape as insulated tools?',
    answer:
      'No. Standard tools wrapped in insulating tape do not comply with IEC 60900 and must never be used as a substitute for properly insulated tools during live work. Insulating tape is not a reliable insulating barrier — it can peel, puncture, or fail. IEC 60900 compliant tools have multi-layer insulation that has been tested to 10,000V. Improvised insulation does not provide equivalent protection and exposes the user to serious risk of electrocution.',
  },
  {
    question: 'Which brands make the best IEC 60900 insulated tools?',
    answer:
      'Knipex (Germany) is widely regarded as the market leader for insulated pliers and cutters, with their VDE-certified range covering virtually every type of plier used in electrical work. Wiha (Germany) produces excellent insulated screwdrivers, nut drivers, and pliers with VDE certification. Wera (Germany) is renowned for insulated screwdrivers and is popular among electricians for handle ergonomics and Torx/Pozidriv variants. Bahco (Swedish-owned, global) produces VDE-certified insulated tools including pliers and cutters. Stanley/FatMax and CK Tools offer more affordable insulated ranges that comply with IEC 60900 and are suitable for occasional live work.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/lockout-tagout-guide',
    title: 'Lockout Tagout Guide',
    description: 'Safe isolation procedures, LOTO devices, and permit to work systems.',
    icon: Lock,
    category: 'Safety',
  },
  {
    href: '/electrical-rescue-procedure',
    title: 'Electrical Rescue Procedure',
    description: 'What to do if someone receives an electric shock — safe isolation, 999, CPR.',
    icon: AlertTriangle,
    category: 'Safety',
  },
  {
    href: '/guides/electrical-safety-at-home',
    title: 'Electrical Safety Guide',
    description: 'Complete UK electrical safety reference for qualified electricians.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/rams-generator',
    title: 'RAMS Generator',
    description: 'Generate site-specific risk assessments and method statements instantly.',
    icon: FileCheck2,
    category: 'Tool',
  },
  {
    href: '/electrical-accident-reporting',
    title: 'Accident Reporting Guide',
    description: 'RIDDOR 2013 reporting requirements for electrical accidents and near misses.',
    icon: ClipboardCheck,
    category: 'Safety',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'iec-60900',
    heading: 'IEC 60900 — The Standard for Insulated Hand Tools',
    content: (
      <>
        <p>
          IEC 60900:2018 (adopted in the UK as BS EN IEC 60900:2018) is the international standard
          for hand tools used for live working on electrical systems up to 1,000V AC or 1,500V DC.
          It is the only standard relevant to insulated hand tools in the UK electrical industry.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dielectric testing to 10,000V</strong> — although rated for use up to 1,000V
                AC, IEC 60900 tools are tested during manufacture to 10,000V AC. This tenfold safety
                margin ensures the insulation provides meaningful protection even if it degrades
                slightly over time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Multi-layer insulation</strong> — the standard requires at least two layers
                of insulation of different colours. The inner layer is typically a contrasting
                colour (often orange or red) so that any damage to the outer layer is immediately
                visible. This is a critical safety feature — if you see the inner colour, the tool
                must be taken out of service.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Marking requirements</strong> — compliant tools must be marked with the
                voltage rating (1000V), the double-triangle symbol indicating compliance with IEC
                60900, and the manufacturer's name or trademark. The VDE mark indicates independent
                third-party testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mechanical testing</strong> — in addition to dielectric testing, IEC 60900
                specifies mechanical tests including impact, bending, and tensile strength tests to
                ensure the insulation remains intact under normal working conditions.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The standard also covers insulated handles, blankets, and other live-working accessories.
          For hand tools specifically, look for the IEC 60900 or BS EN IEC 60900 reference on the
          packaging or the tool itself.
        </p>
      </>
    ),
  },
  {
    id: 'what-ratings-mean',
    heading: 'What Insulation Ratings Mean',
    content: (
      <>
        <p>
          Understanding what the markings on insulated tools mean helps you select the right tool
          and recognise when a tool's insulation has been compromised.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>1000V marking</strong> — confirms the tool is rated for use on systems up to
                1,000V AC or 1,500V DC under IEC 60900. This covers the vast majority of low-voltage
                electrical installations in the UK, including 230V single-phase and 400V three-phase
                systems.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Double-triangle symbol</strong> — the two overlapping triangles symbol on an
                insulated tool indicates compliance with IEC 60900. This is the universal marking
                recognised across Europe and internationally.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>VDE mark</strong> — the VDE oval mark indicates independent testing and
                certification by VDE (Germany). This is the gold standard for insulated tools and
                provides the highest level of assurance. GS mark (Geprüfte Sicherheit) is another
                German safety mark that may accompany the VDE mark.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Colour coding</strong> — Knipex and Wiha use red/yellow insulation; other
                manufacturers use different combinations. Importantly, the inner layer must be a
                contrasting colour to the outer — if you see the inner colour breaking through, the
                tool's insulation is compromised. Take it out of service immediately.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Be aware of cheap tools that carry "1000V" markings without genuine IEC 60900 compliance.
          If a tool is significantly cheaper than reputable brands' equivalents, it may not have
          been tested to the standard. Purchase from reputable electrical wholesalers and check for
          the double-triangle symbol and, ideally, the VDE mark.
        </p>
      </>
    ),
  },
  {
    id: 'when-mandatory',
    heading: 'When Insulated Tools Are Mandatory',
    content: (
      <>
        <p>
          Insulated tools are mandatory when working on or near live electrical conductors. Under
          the Electricity at Work Regulations 1989, working live requires specific justification and
          precautions — insulated tools are one of those required precautions.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Live fault finding</strong> — when diagnosing a fault that cannot be
                reproduced with the circuit de-energised, such as an intermittent fault in a motor
                control circuit. This is one of the few situations where live working may be
                justified under Regulation 14.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Work in distribution switchgear</strong> — when working in or near live
                busbars in switchgear panels where adjacent live conductors cannot be isolated or
                screened off. Strictly controlled and requires specific authorisation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Voltage testing with exposed conductors</strong> — even when using an
                approved voltage indicator, any work adjacent to exposed live conductors requires
                insulated tools to prevent accidental contact by other means (e.g., screwdriver
                slipping while removing a cover adjacent to a live busbar).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inspection work near live parts</strong> — when inspecting an installation
                where some circuits remain live (e.g., inspecting a sub-board with an adjacent live
                main incomer), insulated tools should be used for any work in proximity to live
                conductors.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Outside of these situations,{' '}
          <SEOInternalLink href="/lockout-tagout-guide">
            safe isolation and lockout tagout procedures
          </SEOInternalLink>{' '}
          should always be the first choice. Insulated tools are a precaution against accidental
          contact — they are not a licence to work live routinely.
        </p>
      </>
    ),
  },
  {
    id: 'live-work-authorisation',
    heading: 'Live Work Authorisation — Regulation 14',
    content: (
      <>
        <p>
          Regulation 14 of the Electricity at Work Regulations 1989 permits live working only in
          tightly defined circumstances. Understanding this regulation is essential for any
          electrician considering live work.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-part test</strong> — live work is only permitted if: (1) it is
                unreasonable in all the circumstances for the conductors to be dead; (2) it is
                reasonable in all the circumstances for the person to be at work on or near those
                conductors; and (3) suitable precautions are taken. All three conditions must be
                satisfied simultaneously.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Employer authorisation required</strong> — the employer must assess and
                authorise live work. Self-employed electricians must carry out and document their
                own risk assessment. A verbal "it's fine" is not sufficient — the assessment must be
                documented and the worker must be trained in live-working techniques.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Required precautions for live work</strong> — IEC 60900 insulated tools,
                insulating gloves (Class 00 minimum — rated to 500V AC, tested to 2,500V), face
                shield rated to the arc flash energy level, a second competent person present at all
                times, and a rescue plan including first aid provision.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not a cost-saving measure</strong> — live working to avoid the inconvenience
                or cost of isolation does not satisfy the Regulation 14 test. "The customer didn't
                want the power off" is not a defence. HSE inspectors are experienced at identifying
                rationalisation after the fact.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'brands',
    heading: 'Brands — Knipex, Wiha, Wera, Bahco',
    content: (
      <>
        <p>
          The German tool industry dominates the insulated hand tool market, with several brands
          offering VDE-certified insulated ranges that are trusted by professional electricians
          across the UK.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Knipex</strong> — market leader for insulated pliers and cutters. Their VDE
                insulated range covers combination pliers, long-nose pliers, side cutters, cable
                shears, strippers, and crimping tools. The Knipex 98-series is widely used by UK
                electricians. Known for exceptional build quality and precision.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wiha</strong> — leading brand for insulated screwdrivers, nut drivers, and
                pliers. Their SlimBit and SlimLine insulated ranges are popular for work in
                restricted spaces. VDE-certified and available from all major UK electrical
                wholesalers. Excellent ergonomics.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wera</strong> — the preferred choice for many UK electricians for insulated
                screwdrivers, particularly in Torx and Pozidriv variants. VDE-certified. Wera's
                Kraftform handle design is ergonomically well-regarded for repetitive screwdriving
                tasks common in electrical installation work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bahco</strong> — Swedish brand (owned by Snap-on) offering VDE-certified
                insulated pliers and cutters at a competitive price point. Good quality and widely
                available. A solid mid-range option for electricians who want VDE certification
                without Knipex pricing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>CK Tools (Carl Kammerling)</strong> — UK-focused brand offering a broad
                range of IEC 60900 insulated tools. Popular in the UK trade market. More affordable
                than the German premium brands while maintaining compliance with IEC 60900.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Regardless of brand, always verify the double-triangle symbol and IEC 60900 compliance
          marking on the tool itself before purchasing for live-work applications.
        </p>
      </>
    ),
  },
  {
    id: 'tool-types',
    heading: 'Types of Insulated Tools for Electricians',
    content: (
      <>
        <p>
          A full insulated tool kit for an electrician carries insulated versions of every tool that
          might contact a live conductor during the course of work.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Screwdrivers</strong> — slotted and Pozidriv in multiple sizes, plus Torx
                for modern equipment. VDE-insulated screwdrivers are the most commonly carried
                insulated tool among UK electricians.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pliers and cutters</strong> — combination pliers, long-nose pliers, side
                cutters (snips), and end-cutting pliers. Knipex dominates this category.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Strippers and crimpers</strong> — insulated cable strippers and crimping
                tools for working on terminated conductors in live panels.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Spanners and nut drivers</strong> — insulated nut drivers (commonly in 10mm,
                13mm, and 17mm) and insulated open-ended spanners for work on terminals and bus
                connections.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable knives</strong> — insulated electrician's knives for cable preparation
                adjacent to live conductors. A non-insulated knife blade contacting a live conductor
                is a serious electrocution risk.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'inspection',
    heading: 'Testing and Inspection of Insulated Tools',
    content: (
      <>
        <p>
          Insulated tools are personal protective equipment (PPE) under the Personal Protective
          Equipment at Work Regulations 1992. They must be maintained in serviceable condition and
          inspected regularly. The Provision and Use of Work Equipment Regulations 1998 (PUWER) also
          applies to tools used at work.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Visual inspection before each use</strong> — IEC 60900 requires tools to be
                visually inspected before use. Check for cuts, cracks, punctures, swelling,
                hardening, or discolouration of the insulation. Check that the inner contrasting
                layer is not visible through the outer layer. Remove any tool with visible damage
                from service immediately.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Periodic electrical testing</strong> — the IEC 60900 standard recommends
                periodic testing of insulated tools and protective devices. This involves applying
                10,000V AC for one minute across the insulation and measuring the leakage current,
                and must be carried out by a competent person with appropriate equipment. While
                annual testing is widely adopted as industry best practice in the UK, IEC 60900 does
                not mandate a specific interval — employers and duty holders should set their own
                inspection frequencies based on risk assessment under PUWER.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Record keeping</strong> — maintain a record of insulated tool inspections
                and tests. This demonstrates compliance with PUWER and PPE regulations and is useful
                evidence in the event of an incident investigation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>No field repair of insulation</strong> — damaged insulation on an IEC 60900
                tool cannot be repaired on site with insulating tape or similar. The tool must be
                withdrawn and either returned to the manufacturer for assessment or destroyed.
                Attempting to repair damaged insulation creates a false sense of security and could
                cause electrocution.
              </span>
            </li>
          </ul>
        </div>
        <p>
          After any suspected contact with a live conductor (including a suspected insulation
          failure), the tool must be withdrawn from service and tested before reuse. Never assume a
          tool is still safe after an electrical incident.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: RAMS for Live Work',
    content: (
      <>
        <p>
          Any live electrical work must be documented in a risk assessment and method statement
          (RAMS) before work begins. The RAMS must specify the justification for live working, the
          insulated tools and PPE to be used, the competency of the workers, and the rescue plan.
          This documentation protects you legally and demonstrates professional standards.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5 my-4">
          <div className="flex items-start gap-4">
            <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-1">Generate Live Work RAMS Instantly</h4>
              <p className="text-white text-sm leading-relaxed">
                Use the{' '}
                <SEOInternalLink href="/rams-generator">Elec-Mate RAMS generator</SEOInternalLink> to
                create comprehensive risk assessments and method statements for live electrical
                work, including IEC 60900 tool requirements, PPE specifications, and rescue plan
                documentation. Ready to share with clients and principal contractors.
              </p>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Professional H&S documentation for electrical contractors"
          description="Join 1,000+ UK electricians using Elec-Mate for RAMS generation, site safety documentation, and health and safety compliance. AI-generated, site-specific documents ready in minutes. 7-day free trial."
          icon={HardHat}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function InsulatedToolsGuidePage() {
  return (
    <GuideTemplate
      title="Insulated Tools for Electricians UK | 1000V Rated Tools Guide"
      description="Complete UK guide to IEC 60900 insulated tools for electricians. VDE-rated tools explained, when insulated tools are legally required, brands including Knipex, Wiha, Wera and Bahco, and testing and inspection requirements."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Tools Guide"
      badgeIcon={Wrench}
      heroTitle={
        <>
          Insulated Tools for Electricians UK:{' '}
          <span className="text-yellow-400">IEC 60900 Guide</span>
        </>
      }
      heroSubtitle="Everything UK electricians need to know about insulated hand tools — IEC 60900 standard, VDE certification, when insulated tools are legally required under the Electricity at Work Regulations 1989, top brands, and inspection requirements."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Insulated Tools"
      relatedPages={relatedPages}
      ctaHeading="Generate Live Work RAMS and Safety Documentation"
      ctaSubheading="Elec-Mate's AI RAMS generator creates comprehensive risk assessments for live electrical work, including IEC 60900 tool requirements and PPE specifications. 7-day free trial."
    />
  );
}
