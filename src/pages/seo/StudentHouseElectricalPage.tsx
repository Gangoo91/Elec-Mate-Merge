import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  ShieldCheck,
  AlertTriangle,
  PoundSterling,
  Home,
  ClipboardCheck,
  Scale,
  Building2,
  Zap,
  Users,
  BellRing,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Landlord Guides', href: '/guides/eicr-for-landlords' },
  { label: 'Student House Electrical Safety', href: '/student-house-electrical' },
];

const tocItems = [
  { id: 'eicr-requirements', label: 'EICR Requirements for Student Houses' },
  { id: 'hmo-considerations', label: 'HMO Considerations for Student Properties' },
  { id: 'common-hazards', label: 'Common Student Electrical Hazards' },
  { id: 'overloaded-sockets', label: 'Overloaded Sockets & Extension Leads' },
  { id: 'landlord-obligations', label: 'Landlord Obligations' },
  { id: 'student-checks', label: 'What Students Can Check Themselves' },
  { id: 'reporting-faults', label: 'Reporting Electrical Faults' },
  { id: 'university-accommodation', label: 'University Accommodation Standards' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Student houses let under assured shorthold tenancies are subject to the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 — landlords must hold a valid EICR and renew it at least every five years.',
  'Most student houses with four or more occupants qualify as HMOs. Mandatory HMO licensing applies where five or more occupants form two or more households. A valid EICR is a mandatory licence condition.',
  'Overloaded sockets and daisy-chained extension leads are the leading cause of electrical fires in student accommodation. Students should never plug one extension lead into another.',
  'Landlords of student properties must provide a copy of the EICR to all tenants before they move in. Failure to do so means a landlord cannot serve a valid Section 21 notice.',
  'Students who identify electrical faults should report them to the landlord in writing immediately. If the landlord fails to act, students can contact the local housing authority, which has enforcement powers under the 2020 Regulations.',
  'University-owned halls of residence and purpose-built student accommodation operated by universities are subject to different obligations under the Regulatory Reform (Fire Safety) Order 2005 rather than the private rented sector regulations.',
];

const faqs = [
  {
    question: 'Does a student house need an EICR?',
    answer:
      'Yes. Student houses let on assured shorthold tenancies are subject to the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020. Landlords must obtain an EICR from a qualified person and renew it at least every five years. The EICR must be provided to all tenants before they move in, and to the local authority within seven days of a request. Failure to comply can result in a civil penalty of up to £30,000.',
  },
  {
    question: 'Is a student house an HMO?',
    answer:
      'Most student houses with three or more occupants from different households qualify as HMOs. Where a student house has five or more occupants from two or more households, it is subject to mandatory HMO licensing under the Housing Act 2004. A valid EICR is a mandatory condition of the HMO licence. Many local authorities in university cities also operate additional HMO licensing schemes that cover smaller properties with three or four occupants. Check with your local council.',
  },
  {
    question: 'What are the most common electrical hazards in student houses?',
    answer:
      'The most common hazards are overloaded sockets and daisy-chained extension leads, which can cause overheating and fire. Other common hazards include damaged or frayed cables from appliances such as hairdryers and laptop chargers, electric blankets left on overnight or stored incorrectly, overloaded circuits from multiple high-power appliances on one circuit, and failure to report damaged sockets or switches to the landlord. Absence of RCD protection is the most common installation deficiency found on EICRs in older student houses.',
  },
  {
    question: 'Can I use extension leads in my student house?',
    answer:
      'You can use extension leads, but never plug one into another (daisy-chaining). Always use a single multi-socket extension with a surge protector, plug it directly into the wall socket, and do not overload it. Never run extension leads under carpets, through doorways, or coiled up — heat builds up and can cause fires. The total current draw through any single extension lead must not exceed its rated capacity. Extension leads with individual switched sockets allow you to turn off appliances at the socket, reducing fire risk.',
  },
  {
    question: 'What electrical checks can students carry out themselves?',
    answer:
      'Students can carry out basic visual checks: look for damaged sockets, switches, or plugs with visible scorch marks or cracks; check that all socket outlets are securely fixed to the wall; ensure that cable insulation is not frayed or damaged on appliances you own; check that smoke alarms are present and test them monthly by pressing the test button; and verify that the consumer unit is accessible and clearly labelled. Students must not carry out any electrical work themselves — all electrical work must be done by a qualified electrician.',
  },
  {
    question: 'How do I report an electrical fault in my student house?',
    answer:
      "Report the fault to your landlord or letting agent in writing — by email or text message — immediately. Include a description of the fault, when you noticed it, and any safety concerns. Keep a copy of your report. If the fault is dangerous (burning smell, sparking sockets, tripping RCDs, visible damage to wiring), do not use the affected circuit and contact the landlord urgently. If the landlord fails to respond, contact your local housing authority's environmental health or private rented sector team — they have powers to require the landlord to carry out remedial work.",
  },
  {
    question: 'What electrical standards apply to university halls of residence?',
    answer:
      'University-owned halls of residence and purpose-built student accommodation operated by universities fall outside the private rented sector regulations and are not subject to mandatory EICR under the 2020 Regulations. Instead, they are subject to the Regulatory Reform (Fire Safety) Order 2005 as non-domestic premises, and the universities themselves set their own electrical maintenance standards. Purpose-built student accommodation (PBSA) operated by private providers is generally required by its operating licence to maintain electrical safety to a standard equivalent to or higher than the 2020 Regulations.',
  },
  {
    question: 'What happens if the EICR on my student house is unsatisfactory?',
    answer:
      'An unsatisfactory EICR — one that contains C1 (danger present) or C2 (potentially dangerous) observations — means the landlord must complete remedial works within 28 days or sooner if the inspector specifies. The landlord must provide written confirmation of completed remedial works to all tenants. Students should not accept an EICR with unresolved C2 observations and should report the situation to the local housing authority if the landlord fails to complete remedial works. Living in a property with known unresolved electrical defects could also affect contents insurance claims.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/hmo-electrical-requirements',
    title: 'HMO Electrical Requirements',
    description:
      'Full guide to HMO electrical compliance including fire detection and emergency lighting.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description:
      'Complete guide to landlord EICR requirements, compliance deadlines, and penalties.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes',
    description: 'Understand C1, C2, C3 and FI codes — what they mean and what action is required.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-fail-rented-property',
    title: 'EICR Fail — Rented Property',
    description: 'What to do when a rented property receives an unsatisfactory EICR.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete EICRs on your phone with AI board scanning and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'eicr-requirements',
    heading: 'EICR Requirements for Student Houses',
    content: (
      <>
        <p>
          Student houses let on assured shorthold tenancies are fully subject to the Electrical
          Safety Standards in the Private Rented Sector (England) Regulations 2020. The nature of
          the occupants — students rather than working households — makes no difference to the legal
          obligation. Landlords must obtain an EICR and comply with all associated requirements.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR required at least every five years</strong> — the landlord must have
                the fixed electrical installation inspected and tested by a qualified person and
                obtain an <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink>{' '}
                before a new tenancy begins and at least every five years thereafter. Many student
                tenancies are fixed terms of one year, meaning the EICR obligation applies on every
                new tenancy after the five-year cycle expires.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Copy to tenants before move-in</strong> — the landlord must provide a copy
                of the EICR to new tenants before they occupy the property. This is not optional —
                failure to provide the EICR before move-in means the landlord cannot serve a valid
                Section 21 notice throughout the tenancy.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Satisfactory condition required</strong> — the EICR must be satisfactory (no
                unresolved C1 or C2 observations). Where the report is unsatisfactory, all remedial
                works must be completed within 28 days (or sooner if specified) before a new tenancy
                begins.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Penalties for non-compliance</strong> — local authorities can impose civil
                penalties of up to £30,000 per breach. Universities and student unions in many
                university cities actively publicise the right of students to receive an EICR, and
                local authority enforcement in university areas is increasingly active.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'hmo-considerations',
    heading: 'HMO Considerations for Student Properties',
    content: (
      <>
        <p>
          The vast majority of shared student houses qualify as HMOs. This adds a layer of
          compliance obligations on top of the standard EICR requirements, including additional fire
          safety measures and licensing conditions.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mandatory licensing — 5+ occupants</strong> — a student house with five or
                more students from two or more households is subject to mandatory HMO licensing. A
                valid EICR is a mandatory condition of the licence. Many local authorities in
                university cities require a three-year EICR cycle rather than the standard five
                years.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional licensing — 3-4 occupants</strong> — many councils in university
                cities operate additional HMO licensing schemes that cover smaller properties with
                three or four student occupants. These schemes typically impose the same EICR and
                fire safety conditions as mandatory licensing. Check with your local council whether
                additional licensing applies to your area.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire detection to BS 5839-6</strong> — HMO student houses require
                interlinked mains-powered smoke detectors on all escape routes (hallways, landings,
                stairwells) and heat detectors in kitchens. The Grade D, LD2 minimum is standard;
                many councils require LD1 (detectors in every room including bedrooms) for student
                HMOs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency lighting to BS 5266-1</strong> — three-storey or larger student
                HMOs commonly require emergency lighting in communal areas and escape routes. This
                is specified in the HMO licence conditions and forms part of the EICR inspection
                scope.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Landlords of student HMOs who are unsure of their local authority's specific requirements
          should contact the private rented sector team or HMO licensing team at the relevant
          council. University student unions often also publish guidance for students on what to
          expect from their landlord.
        </p>
      </>
    ),
  },
  {
    id: 'common-hazards',
    heading: 'Common Electrical Hazards in Student Houses',
    content: (
      <>
        <p>
          Student accommodation has a higher electrical fire risk than average residential
          properties. This reflects unfamiliarity with electrical safety, high-density use of
          appliances in shared kitchens, and the use of extension leads to compensate for
          insufficient socket outlets.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overloaded sockets</strong> — plugging too many appliances into a single
                socket via adaptors causes overheating of the socket and wiring. Never use a cube
                adapter (block adapter) to plug multiple appliances into a single socket. Use a
                multi-socket extension lead with surge protection instead.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Daisy-chained extension leads</strong> — plugging one extension lead into
                another is one of the most dangerous electrical practices in student accommodation.
                It can cause the extension lead to overheat and start a fire. Never chain extension
                leads together under any circumstances.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Damaged appliance cables</strong> — cables on hairdryers, laptop chargers,
                and kitchen appliances are frequently damaged in student accommodation through door
                trapping, kinking, and heavy use. A damaged cable can cause electric shock or fire.
                Inspect appliance cables regularly and replace damaged items immediately.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electric blankets left on overnight</strong> — electric blankets are a
                significant fire risk if left switched on or used with the temperature control set
                too high. Always switch off and unplug electric blankets before sleeping. Never use
                an electric blanket with a duvet folded over it.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Non-CE-marked chargers and appliances</strong> — counterfeit or uncertified
                USB chargers and phone chargers are commonly purchased cheaply online and do not
                meet UK safety standards. They are a significant fire and shock risk. Only use
                chargers and adaptors bearing the UKCA or CE mark.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'overloaded-sockets',
    heading: 'Overloaded Sockets and Illegal Extension Lead Use',
    content: (
      <>
        <p>
          Insufficient socket outlets in bedrooms and shared areas lead many students to use
          multiple extension leads — sometimes in configurations that create serious fire risks.
          Understanding the limits is essential for student safety.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Total load limit — 13A per socket</strong> — a single UK socket outlet is
                rated at 13A (approximately 3,000W). Exceeding this through adaptor plugs or
                overloaded extension leads can cause the socket, wiring, or extension lead to
                overheat. Add up the wattage of all appliances connected to one socket to check you
                are not exceeding the limit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Never daisy-chain</strong> — connecting extension leads in series increases
                resistance in the circuit and the total load, which can cause overheating of the
                leads and their plugs. This is prohibited by UK fire safety guidance and is a common
                cause of fires in student accommodation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Safe extension lead use</strong> — use a single multi-socket extension lead
                plugged directly into the wall. Choose a lead with surge protection and individually
                switched sockets. Never run extension leads under carpets, through doorways, or
                coiled up — heat cannot dissipate safely when a lead is coiled.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Report insufficient sockets to your landlord</strong> — if your room or
                shared areas have too few socket outlets, ask your landlord to install additional
                sockets. Additional sockets are notifiable electrical work under Part P of the
                Building Regulations and must be carried out by a qualified electrician.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'landlord-obligations',
    heading: 'Landlord Obligations for Student Properties',
    content: (
      <>
        <p>
          Landlords of student properties have identical obligations under the 2020 Regulations as
          any other private landlord. The high turnover of student tenancies and the relative
          unfamiliarity of student tenants with their rights makes compliance especially important.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Valid EICR before move-in</strong> — the EICR must be current and
                satisfactory before new students occupy the property. Provide a copy to every named
                tenant before the tenancy start date. Keep a record of when each copy was provided.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Respond to reported faults promptly</strong> — when students report
                electrical faults in writing, the landlord must respond and arrange inspection or
                remedial work promptly. Ignoring written reports of electrical faults is evidence of
                failure to take reasonable care and will be damaging in any subsequent enforcement
                action or civil claim.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire detection and emergency lighting</strong> — for HMO student properties,
                maintain the fire detection system to BS 5839-6, carry out and record monthly
                function tests, and ensure emergency lighting is tested and maintained to BS 5266-1.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sufficient socket outlets</strong> — whilst not specifying a minimum number,
                the Housing Health and Safety Rating System (HHSRS) includes electrical hazards in
                its assessment criteria. Too few socket outlets in a bedroom is a known contributory
                factor to overloaded extension lead use. Landlords should ensure bedrooms have at
                least four socket outlets.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'student-checks',
    heading: 'What Students Can Check Themselves',
    content: (
      <>
        <p>
          Students are not qualified to carry out electrical work, but they can carry out basic
          visual checks that help identify hazards and form the basis of a written report to the
          landlord.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check the consumer unit</strong> — locate the consumer unit (fuse board).
                Check it has a label showing when the last EICR was carried out (if the landlord
                does not provide one). Check that all MCBs and RCDs are in the ON position. If any
                have tripped, note which circuit and report to the landlord.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inspect sockets and switches</strong> — look for cracked faceplates, scorch
                marks, loose fixings, or sockets that are not flush with the wall. These are
                indicators of damage or poor installation that should be reported to the landlord.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test smoke alarms</strong> — press the test button on every smoke alarm in
                the property. A functioning alarm will sound. If any alarm does not sound, replace
                the battery immediately. If the alarm still does not sound after a battery
                replacement, report it to the landlord in writing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check your own appliances</strong> — inspect the cables and plugs of all
                appliances you bring to the property. Discard and replace any appliance with a
                damaged cable, cracked plug, or burn marks on the plug or socket. Do not bring
                uncertified or counterfeit chargers.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'reporting-faults',
    heading: 'Reporting Electrical Faults as a Student Tenant',
    content: (
      <>
        <p>
          Students have the right to report electrical faults and to expect prompt action from their
          landlord. The 2020 Regulations give student tenants the same rights as any other private
          tenant.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BellRing className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Report in writing immediately</strong> — email or text the landlord or
                letting agent as soon as you identify a fault. Include a description of the problem,
                its location, and any safety concerns. Keep a copy of every communication.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BellRing className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dangerous faults — do not use the circuit</strong> — if you see or smell
                burning, hear crackling from a socket or switch, or an RCD trips repeatedly, stop
                using that circuit immediately and report it to the landlord urgently. Do not
                attempt to reset a repeatedly tripping RCD without identifying the cause.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BellRing className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Landlord failing to act — escalate to the council</strong> — if the landlord
                does not respond to a written report of an electrical fault within a reasonable time
                (typically 24–48 hours for dangerous faults, seven days for non-urgent faults),
                contact your local housing authority's environmental health team. The council can
                require the landlord to carry out works and can impose penalties for failure to
                comply.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BellRing className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>University support</strong> — most universities have a student accommodation
                team or students' union housing advisor who can provide guidance on reporting
                electrical faults and escalating complaints against landlords. Seek their advice if
                the landlord is unresponsive.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'university-accommodation',
    heading: 'University Accommodation Electrical Standards',
    content: (
      <>
        <p>
          University-owned halls of residence and purpose-built student accommodation (PBSA)
          operated by universities are subject to different legal obligations than private sector
          student houses. Understanding the distinction is important for students choosing between
          university and private accommodation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulatory Reform (Fire Safety) Order 2005</strong> — university halls of
                residence are non-domestic premises and are subject to the Regulatory Reform (Fire
                Safety) Order 2005. The responsible person (the university) must carry out a fire
                risk assessment and implement appropriate fire precautions, including electrical
                safety measures.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Universities UK code of practice</strong> — most UK universities follow the
                Universities UK Code of Practice for the Management of Student Housing, which sets
                minimum standards for electrical safety including regular testing of fixed
                installations and portable appliances. The code recommends five-yearly EICRs for
                student residential buildings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Private PBSA operators</strong> — privately operated PBSA (student
                accommodation companies) must also comply with the Regulatory Reform (Fire Safety)
                Order 2005 and typically hold operating licences from local authorities requiring
                EICR compliance. Standards in this sector are generally high due to the commercial
                and regulatory scrutiny involved.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Student Property Inspection Work',
    content: (
      <>
        <p>
          University cities have large concentrations of student HMOs with high EICR turnover.
          Electricians who build relationships with student property letting agents and landlords
          can generate consistent inspection and remedial work throughout the academic year.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Complete Student House EICRs On Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate EICR app
                  </SEOInternalLink>{' '}
                  to complete reports on your phone while on site. Student properties often require
                  multiple EICRs in August and September before the academic year starts — fast
                  on-site completion means more inspections per day.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Remedial Work Immediately</h4>
                <p className="text-white text-sm leading-relaxed">
                  Landlords facing a tenancy start date need remedial works completed urgently.
                  Quote on site with the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  and convert inspection clients into remedial work clients before they look
                  elsewhere.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Win student property EICR work with Elec-Mate"
          description="Complete student house EICRs on your phone, quote remedial works on site, and build a recurring student landlord client base. 7-day free trial for UK electricians."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function StudentHouseElectricalPage() {
  return (
    <GuideTemplate
      title="Student House Electrical Safety UK | Guide for Landlords & Students"
      description="Student house electrical safety guide for landlords and students in the UK. EICR requirements, HMO considerations, common student electrical hazards, overloaded sockets, illegal extension leads, landlord obligations, what students can check themselves, and how to report electrical faults."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Student Property Guide"
      badgeIcon={Users}
      heroTitle={
        <>
          Student House Electrical Safety UK:{' '}
          <span className="text-yellow-400">Guide for Landlords & Students 2026</span>
        </>
      }
      heroSubtitle="Student houses are subject to the same EICR requirements as all private rental properties — and most qualify as HMOs with additional fire safety obligations. This guide covers landlord legal obligations, HMO licensing, the most common electrical hazards in student accommodation, and what students can do to stay safe."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Student House Electrical Safety"
      relatedPages={relatedPages}
      ctaHeading="Complete Student Property EICRs on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
