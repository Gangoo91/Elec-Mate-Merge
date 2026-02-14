import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Shield,
  FileCheck2,
  AlertTriangle,
  Home,
  ClipboardCheck,
  Flame,
  Wind,
  Bell,
  Send,
  Receipt,
  Search,
  PoundSterling,
  GraduationCap,
  Users,
  Scale,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Landlord Checklist', href: '/guides/electrical-safety-landlord-checklist' },
];

const tocItems = [
  { id: 'overview', label: 'Landlord Electrical Safety Overview' },
  { id: 'eicr-requirement', label: 'EICR Requirement' },
  { id: 'pat-testing', label: 'PAT Testing' },
  { id: 'smoke-alarms', label: 'Smoke Alarms' },
  { id: 'co-alarms', label: 'Carbon Monoxide Alarms' },
  { id: 'tenant-notification', label: 'Tenant Notification' },
  { id: 'record-keeping', label: 'Record Keeping' },
  { id: 'hmo-extras', label: 'HMO Extras' },
  { id: 'checklist', label: 'The Complete Checklist' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Landlords in England must comply with multiple electrical safety obligations: a valid EICR every 5 years, working smoke alarms on every floor, and carbon monoxide alarms in rooms with fixed combustion appliances.',
  'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 carry penalties of up to £30,000 per breach for non-compliance with EICR requirements.',
  'PAT testing of landlord-supplied appliances is not a strict legal requirement, but it is strongly recommended and expected by insurers and competent person scheme assessors.',
  'Landlords must provide copies of the EICR to tenants before they move in (new tenancies) or within 28 days (existing tenancies), and to the local authority within 7 days of a written request.',
  'HMOs (Houses in Multiple Occupation) have additional requirements including fire alarm systems, emergency lighting, and more frequent inspection obligations under HMO licensing conditions.',
];

const faqs = [
  {
    question: 'What is the difference between an EICR and PAT testing?',
    answer:
      'An EICR (Electrical Installation Condition Report) covers the fixed electrical installation — the wiring, consumer unit, sockets, switches, light fittings, and all permanently connected equipment from the meter onwards. A PAT test (Portable Appliance Testing) covers portable and moveable electrical equipment — things that plug into the sockets, such as kettles, toasters, washing machines, and fridges. They are completely separate processes. The EICR is a legal requirement for landlords under the 2020 Regulations. PAT testing is not legally mandated by the same regulations, but the Landlord and Tenant Act 1985, the Housing Act 2004, and the duty of care under the Health and Safety at Work Act 1974 all create an expectation that landlord-supplied appliances are safe. In practice, most competent landlords do both.',
  },
  {
    question: 'Do I need to PAT test if I supply appliances with the rental?',
    answer:
      'There is no specific legal requirement in England that says "landlords must PAT test appliances." However, if you supply electrical appliances with the property (fridge, washing machine, oven, kettle, microwave, etc.), you have a duty of care to ensure they are safe. The Electrical Equipment (Safety) Regulations 2016 require that electrical equipment is safe when supplied. The Housing Act 2004 and the Housing Health and Safety Rating System (HHSRS) include electrical hazards from appliances. If a tenant is injured by a faulty appliance that the landlord supplied and had not tested, the landlord could face civil liability and potentially criminal prosecution. PAT testing is the standard method of demonstrating that appliances are safe. Most landlord insurance policies require it, and letting agents increasingly expect evidence of PAT testing. The practical advice is: if you supply it, test it.',
  },
  {
    question: 'What type of smoke alarms do I need in a rental property?',
    answer:
      'Under the Smoke and Carbon Monoxide Alarm (Amendment) Regulations 2022, landlords in England must ensure that at least one smoke alarm is installed on each storey of the property where there is a room used wholly or partly as living accommodation. From 1 October 2022, all smoke alarms in rented properties must be working at the start of each new tenancy. The alarms do not need to be hard-wired (mains-powered) — battery-operated alarms with sealed long-life lithium batteries (typically 10-year life) are acceptable and are the most common choice for landlords. However, if the property is an HMO, the fire alarm requirements are more stringent and may require a Category LD2 or LD1 fire detection system to BS 5839-6, which involves mains-powered, interconnected smoke detectors. Check your HMO licence conditions for specific requirements.',
  },
  {
    question: 'Where do carbon monoxide alarms need to be placed?',
    answer:
      'Under the Smoke and Carbon Monoxide Alarm (Amendment) Regulations 2022, a carbon monoxide alarm must be installed in any room of a rented property that contains a fixed combustion appliance. This includes gas boilers, gas fires, wood-burning stoves, coal fires, and oil-fired appliances. It does not include gas cookers. The alarm should be placed on the ceiling or at head height on a wall, between 1 metre and 3 metres from the appliance. The alarm must be working at the start of each tenancy. Battery-operated CO alarms with sealed long-life batteries are acceptable. The regulations were strengthened in 2022 to extend the CO alarm requirement to all rooms with combustion appliances, not just those with solid fuel appliances as was previously the case.',
  },
  {
    question: 'Can a landlord be fined for not having working smoke alarms?',
    answer:
      'Yes. Under the Smoke and Carbon Monoxide Alarm (England) Regulations 2015 (as amended in 2022), the local housing authority can issue a remedial notice requiring the landlord to install and/or repair smoke and CO alarms. If the landlord fails to comply with the notice within 28 days, the local authority can enter the property and fit the alarms themselves, and can impose a civil penalty of up to £5,000. This is separate from the EICR penalties. A landlord who fails to have both a valid EICR and working smoke alarms could face combined penalties. Additionally, if a fire occurs and a tenant is harmed in a property without working smoke alarms, the landlord could face civil liability claims and potential prosecution for negligence.',
  },
  {
    question: 'What records should a landlord keep for electrical safety?',
    answer:
      'Landlords should maintain a comprehensive electrical safety file for each property containing: the current EICR (and copies of all previous EICRs); records of any remedial work carried out following an unsatisfactory EICR (including the Electrical Installation Certificate or Minor Works Certificate for the remedial work); PAT testing records for any landlord-supplied appliances; smoke alarm installation and testing records; carbon monoxide alarm installation and testing records; gas safety certificate (CP12); energy performance certificate (EPC); and any correspondence with tenants about access for inspections. Keep digital copies of everything. Providing these documents promptly when requested by the local authority, a prospective buyer, or a mortgage lender demonstrates good management and can reduce the severity of any penalty if issues arise.',
  },
  {
    question: 'Do these requirements apply to lodgers?',
    answer:
      'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 apply to privately rented properties with a tenancy agreement (AST or similar). If you are a live-in landlord taking a lodger who shares your living accommodation under a licence agreement rather than a tenancy, the 2020 Regulations do not apply. However, the smoke and carbon monoxide alarm regulations apply to all rented accommodation including lodgers. And your general duty of care under the Occupiers Liability Act 1957 applies regardless — if a lodger is injured by a known electrical fault in your home, you could be liable. The practical advice for live-in landlords with lodgers: get an EICR anyway, ensure smoke and CO alarms are fitted and working, and test any appliances you provide. The cost is minimal and the protection is significant.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description:
      'Detailed guide to EICR requirements, penalties, timeframes, and what to do with an unsatisfactory result.',
    icon: Scale,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete digital EICR certificates on your phone with AI board scanning and voice test entry.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'Observation Codes Explained',
    description: 'In-depth guide to C1, C2, C3, and FI classification codes with real examples.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-cost-uk',
    title: 'EICR Cost UK 2026',
    description: 'Average EICR prices by property type and guidance on what to charge.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/guides/fire-alarm-certificate',
    title: 'Fire Alarm Certificate',
    description: 'Guide to fire alarm certification requirements including BS 5839 compliance.',
    icon: Flame,
    category: 'Guide',
  },
  {
    href: '/guides/pat-testing-guide',
    title: 'PAT Testing Guide',
    description: 'Complete guide to portable appliance testing for landlords and electricians.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Landlord Electrical Safety: The Complete Picture',
    content: (
      <>
        <p>
          Electrical safety in rented properties is not a single obligation — it is a collection of
          legal requirements, best practices, and duty-of-care responsibilities that landlords must
          manage together. Many landlords focus on the EICR (because it carries the highest penalty)
          and overlook other requirements that are equally important.
        </p>
        <p>
          This checklist covers everything: the EICR, PAT testing, smoke alarms, carbon monoxide
          alarms, tenant notification, record keeping, and additional requirements for HMOs. Whether
          you are a landlord managing your own compliance or an electrician advising landlord
          clients, this page provides a single reference for all the electrical safety obligations.
        </p>
        <p>The key legislation for landlords includes:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>
                  Electrical Safety Standards in the Private Rented Sector (England) Regulations
                  2020
                </strong>{' '}
                — EICR requirement, 5-year cycle, £30,000 penalties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smoke and Carbon Monoxide Alarm (Amendment) Regulations 2022</strong> —
                smoke alarms on every floor, CO alarms in rooms with combustion appliances.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Housing Act 2004</strong> — HMO licensing, Housing Health and Safety Rating
                System (HHSRS), general property standards.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Landlord and Tenant Act 1985</strong> — duty to keep the electrical
                installation in repair and proper working order.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'eicr-requirement',
    heading: 'EICR: The 5-Year Inspection Cycle',
    content: (
      <>
        <p>
          The{' '}
          <SEOInternalLink href="/guides/eicr-for-landlords">
            EICR (Electrical Installation Condition Report)
          </SEOInternalLink>{' '}
          is the cornerstone of landlord electrical safety. Under the 2020 Regulations, every
          privately rented property in England must have a valid EICR carried out by a qualified and
          competent person.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Frequency:</strong> At least every 5 years, or sooner if recommended by the
                inspector.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Timing:</strong> Must be obtained before a new tenancy begins. For existing
                tenancies, should already be in place.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualified person:</strong> Registered with NICEIC, NAPIT, or ELECSA. Holds
                C&G 2391 or equivalent inspection and testing qualification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>If Unsatisfactory:</strong> Remedial work must be completed within 28 days.
                Written confirmation must be provided to the tenant and local authority.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Penalty:</strong> Up to £30,000 per breach. Penalties are per breach, not
                per property.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The EICR covers the fixed electrical installation only: wiring, consumer unit, sockets,
          switches, light fittings, and permanently connected equipment. It does not cover portable
          appliances — that is what PAT testing is for.
        </p>
      </>
    ),
  },
  {
    id: 'pat-testing',
    heading: 'PAT Testing: Not Legally Required, But Essential',
    content: (
      <>
        <p>
          Portable Appliance Testing (PAT) is the inspection and testing of electrical appliances
          that plug into the mains — fridges, washing machines, kettles, toasters, microwaves, and
          any other equipment the landlord supplies with the property.
        </p>
        <p>
          There is no specific regulation that says "landlords must PAT test appliances." However,
          the duty of care is clear:
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                The Electrical Equipment (Safety) Regulations 2016 require electrical equipment to
                be safe when supplied.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                The Housing Act 2004 HHSRS includes electrical hazards from appliances as a category
                of risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Most landlord insurance policies require evidence of PAT testing for
                landlord-supplied appliances.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                If a tenant is injured by a faulty appliance the landlord supplied, the landlord
                faces civil liability and potential prosecution.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The practical approach: if you supply it, test it. PAT testing is quick and inexpensive —
          an electrician can test a typical property's appliances in 30 minutes to an hour. Many
          electricians offer{' '}
          <SEOInternalLink href="/guides/pat-testing-guide">PAT testing</SEOInternalLink> as an
          add-on when conducting the EICR, which saves the landlord a second visit.
        </p>
      </>
    ),
  },
  {
    id: 'smoke-alarms',
    heading: 'Smoke Alarms: Every Floor, Every Tenancy',
    content: (
      <>
        <p>
          Under the Smoke and Carbon Monoxide Alarm (Amendment) Regulations 2022, landlords must
          ensure:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Bell className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>At least one smoke alarm on every storey</strong> of the property where
                there is a room used as living accommodation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Bell className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>All alarms must be working</strong> at the start of each new tenancy. The
                landlord (or their agent) must test them on the day the tenancy begins.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Bell className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Battery or mains-powered alarms are acceptable.</strong> Sealed long-life
                lithium battery alarms (10-year life) are the most common choice for landlords as
                they do not require wiring and the battery lasts the life of the alarm.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Best practice for smoke alarm placement: on the ceiling in the hallway or landing of each
          floor, at least 300mm from any wall or light fitting. Avoid kitchens (where cooking fumes
          cause false alarms) — use a heat detector in the kitchen instead.
        </p>
        <p>
          For HMOs, the fire detection requirements are more stringent. A Category LD2 or LD1 system
          to BS 5839-6 may be required, depending on the HMO licence conditions. This involves
          mains-powered, interconnected detectors with battery backup — installation by a qualified
          electrician is recommended.
        </p>
      </>
    ),
  },
  {
    id: 'co-alarms',
    heading: 'Carbon Monoxide Alarms: Rooms with Combustion Appliances',
    content: (
      <>
        <p>
          Carbon monoxide (CO) is a colourless, odourless gas produced by incomplete combustion. It
          kills approximately 30 people per year in the UK and hospitalises hundreds more. CO alarms
          are a simple, inexpensive way to protect tenants.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wind className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Required in any room with a fixed combustion appliance:</strong> gas
                boilers, gas fires, wood-burning stoves, coal fires, oil-fired appliances. Gas
                cookers are excluded.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wind className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Placement:</strong> on the ceiling or at head height on a wall, between 1
                metre and 3 metres from the appliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wind className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Must be working at the start of each tenancy.</strong> Test on the day the
                tenancy begins.
              </span>
            </li>
          </ul>
        </div>
        <p>
          CO alarms are inexpensive — typically £15 to £25 for a sealed 7-year unit. There is no
          excuse for not having them. Many landlords fit CO alarms in all habitable rooms as a
          precaution, not just the rooms with combustion appliances.
        </p>
      </>
    ),
  },
  {
    id: 'tenant-notification',
    heading: 'Tenant Notification: What You Must Provide and When',
    content: (
      <>
        <p>
          Providing documentation to tenants is a legal requirement, not a courtesy. The deadlines
          are specific:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Send className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR — new tenants:</strong> before they move in.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Send className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR — existing tenants:</strong> within 28 days of the inspection date.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Send className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR — local authority:</strong> within 7 days of receiving a written
                request.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Send className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remedial work confirmation:</strong> within 28 days of completion, to both
                the tenant and (if requested) the local authority.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Failure to provide the EICR to a tenant can invalidate a Section 21 eviction notice.
          Failure to provide it to the local authority on request is a separate breach that can
          trigger its own penalty.
        </p>
        <SEOAppBridge
          title="Send the EICR to the landlord before you leave site"
          description="Elec-Mate exports the completed EICR as a professional PDF and sends it by email or WhatsApp in one tap. The landlord can forward it to the tenant immediately. No desk time, no delay."
          icon={Send}
        />
      </>
    ),
  },
  {
    id: 'record-keeping',
    heading: 'Record Keeping: Your Evidence File',
    content: (
      <>
        <p>
          Good record keeping is what separates a compliant landlord from a landlord who is
          technically compliant but cannot prove it. Keep a dedicated electrical safety file for
          each property containing:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>Current EICR and all previous EICRs.</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>EIC or Minor Works Certificates for any remedial work or alterations.</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>PAT testing records for landlord-supplied appliances.</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>Smoke alarm installation dates, types, and test records.</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>Carbon monoxide alarm installation dates, types, and test records.</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                Evidence of tenant notification: email confirmations, signed receipts, or WhatsApp
                delivery records showing the EICR was provided.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>Gas safety certificate (CP12) and energy performance certificate (EPC).</span>
            </li>
          </ul>
        </div>
        <p>
          Keep digital copies of everything. A physical filing system can be lost, damaged, or
          destroyed. Cloud-based storage ensures your records are always accessible and can be
          shared instantly when requested by the local authority or a prospective buyer.
        </p>
      </>
    ),
  },
  {
    id: 'hmo-extras',
    heading: 'HMO Extras: Additional Requirements for Multi-Occupancy Properties',
    content: (
      <>
        <p>
          Houses in Multiple Occupation (HMOs) are subject to all the standard landlord electrical
          safety requirements plus additional obligations under HMO licensing. The specific
          requirements depend on the HMO licence conditions set by the local authority, but commonly
          include:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire detection and alarm system:</strong> typically a Category LD2 or LD1
                system to BS 5839-6, with mains-powered, interconnected detectors in escape routes
                and habitable rooms. Installation and annual testing by a competent fire alarm
                engineer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency lighting:</strong> in escape routes and common areas, to BS 5266.
                Must be tested monthly (function test) and annually (full duration test).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire doors:</strong> to bedrooms and kitchens, with intumescent strips and
                cold smoke seals. Self-closing devices required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Annual EICR (some authorities):</strong> while the 2020 Regulations require
                a 5-year EICR cycle, some local authorities specify annual EICRs as a condition of
                the HMO licence. Check your specific licence conditions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire risk assessment:</strong> a documented fire risk assessment must be
                carried out and reviewed regularly. This is separate from the EICR.
              </span>
            </li>
          </ul>
        </div>
        <p>
          HMO non-compliance carries even greater penalties. Operating an unlicensed HMO can result
          in an unlimited fine (criminal prosecution) or a civil penalty of up to £30,000. Breaching
          licence conditions can lead to licence revocation. The stakes are high — get professional
          advice if you are unsure about your HMO obligations.
        </p>
      </>
    ),
  },
  {
    id: 'checklist',
    heading: 'The Complete Landlord Electrical Safety Checklist',
    content: (
      <>
        <p>
          Use this checklist to confirm you have covered every electrical safety obligation for your
          rental property. Print it, save it, or send it to your letting agent.
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>Valid EICR (within 5 years or recommended interval)</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>Any C1/C2 remedial work completed within 28 days</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>EICR copy provided to current tenants</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>Smoke alarm on every floor — tested and working</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>CO alarm in every room with a combustion appliance — tested and working</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>PAT testing completed for all landlord-supplied appliances</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>All records filed and accessible (digital copies recommended)</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>Next EICR date noted in calendar</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>If HMO: fire alarm, emergency lighting, and fire doors compliant</span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Complete the EICR and send it from site"
          description="Elec-Mate makes landlord EICRs fast and professional. AI board scanner, voice test entry, defect-to-quote conversion, and instant PDF delivery to the landlord by email or WhatsApp. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalSafetyLandlordPage() {
  return (
    <GuideTemplate
      title="Electrical Safety Landlord Checklist | Complete 2026 Guide"
      description="Complete electrical safety checklist for UK landlords. Covers EICR requirements, PAT testing, smoke alarms, CO alarms, tenant notification, record keeping, and HMO extras. Penalties up to £30,000."
      datePublished="2025-04-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Landlord Guide"
      badgeIcon={Shield}
      heroTitle={
        <>
          Electrical Safety Landlord Checklist:{' '}
          <span className="text-yellow-400">Every Obligation in One Place</span>
        </>
      }
      heroSubtitle="EICR, PAT testing, smoke alarms, carbon monoxide alarms, tenant notification, record keeping, and HMO extras — this is the complete electrical safety checklist for UK landlords in 2026. Miss any of these and you risk fines of up to £30,000, insurance invalidation, or worse."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Landlord Electrical Safety"
      relatedPages={relatedPages}
      ctaHeading="Complete Landlord EICRs on Your Phone"
      ctaSubheading="AI board scanner, voice test entry, defect-to-quote conversion, and instant PDF delivery. Join 430+ electricians making landlord work faster and more profitable. 7-day free trial."
    />
  );
}
