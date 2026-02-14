import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Zap,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  BookOpen,
  Cable,
  ClipboardCheck,
  Home,
  Award,
  Scale,
  Shield,
  Gavel,
  Building2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Building Regulations Electrical', href: '/guides/building-regulations-electrical' },
];

const tocItems = [
  { id: 'what-is-part-p', label: 'What Is Part P?' },
  { id: 'who-can-self-certify', label: 'Who Can Self-Certify?' },
  { id: 'notifiable-work-types', label: 'Types of Notifiable Work' },
  { id: 'building-control-notification', label: 'Building Control Notification' },
  { id: 'special-locations', label: 'Special Locations' },
  { id: 'penalties', label: 'Penalties for Non-Compliance' },
  { id: 'scotland-wales-ni', label: 'Scotland, Wales, and Northern Ireland' },
  { id: 'documentation', label: 'Required Documentation' },
  { id: 'faq', label: 'FAQs' },
  { id: 'related', label: 'Related Guides' },
];

const keyTakeaways = [
  'Part P (Approved Document P: Electrical Safety — Dwellings) applies to electrical work in dwellings in England. It requires most electrical installation work to be either carried out by a registered competent person or notified to building control before work begins.',
  'Electricians registered with a competent person scheme (NICEIC, NAPIT, ELECSA, Stroma) can self-certify their work and notify building control electronically. This is the most common route for professional electricians.',
  'Notifiable work includes installing a new circuit, installing or replacing a consumer unit, work in special locations (bathrooms, swimming pools, saunas), and installing outdoor wiring on a new circuit. Non-notifiable work includes like-for-like replacements and minor additions to existing circuits outside special locations.',
  'Failure to comply with Part P can result in enforcement notices, fines, and the requirement to have the work inspected and possibly removed. Non-compliant work can also cause difficulties when selling a property.',
  'Elec-Mate generates compliant EICs and Minor Works Certificates with auto-validated test results. For notifiable work, the certificate satisfies Part P documentation requirements. Digital signature and PDF export included.',
];

const faqs = [
  {
    question: 'What is Part P of the Building Regulations?',
    answer:
      'Part P (Approved Document P: Electrical Safety — Dwellings) is the section of the Building Regulations 2010 (as amended) that deals with electrical safety in dwellings in England. It requires that electrical installation work in homes is designed, installed, inspected, and tested to ensure safety, and that most such work is either carried out by a person registered with a competent person scheme or notified to building control before work begins. Part P was first introduced in 2005 and has been amended several times since, most significantly in 2013 when kitchens were removed from the list of special locations. The current edition is Approved Document P (2013 edition with 2016 amendments).',
  },
  {
    question: 'What work needs to be notified to building control?',
    answer:
      'Under Part P, the following electrical work in dwellings must be notified to building control: installing a new circuit (regardless of location), replacing a consumer unit or distribution board, work in special locations (rooms containing a bath or shower, swimming pools and paddling pools, saunas) other than like-for-like replacement, and installing a new outdoor circuit. Work that does not need notification includes like-for-like replacement of accessories (sockets, switches, light fittings), adding lighting points, sockets, or spurs to an existing circuit outside special locations, and repairs. If you are registered with a competent person scheme, you can self-certify all notifiable work without a separate building control application.',
  },
  {
    question: 'What happens if I do notifiable work without notifying building control?',
    answer:
      'Carrying out notifiable work without proper notification or self-certification is a breach of the Building Regulations. The local authority can issue an enforcement notice requiring you to either obtain retrospective building control approval (which involves inspection and testing, and may result in the work needing to be altered or removed) or reverse the work entirely. The local authority can also prosecute, with fines of up to two thousand pounds. Additionally, non-compliant electrical work can cause serious problems when selling a property — conveyancing solicitors check for electrical certificates, and the absence of certificates for notifiable work can delay or prevent the sale.',
  },
  {
    question: 'How much does it cost to notify building control directly?',
    answer:
      'If you are not registered with a competent person scheme and need to notify building control directly, the cost varies by local authority. Building notice fees for electrical work typically range from one hundred and fifty to three hundred pounds, depending on the local authority and the scope of work. This fee covers the administrative processing and any building control inspection of the completed work. In contrast, competent person scheme registration allows you to self-certify and notify electronically at no additional per-job cost. For electricians who carry out notifiable work regularly, scheme registration is significantly more cost-effective than paying building notice fees for each job.',
  },
  {
    question: 'Is Part P the same across the whole UK?',
    answer:
      'No. Part P specifically applies to England. Wales has very similar requirements under the Building Regulations 2010 (Wales), with Approved Document P (Wales). Scotland uses a different system under the Building (Scotland) Act 2003 and the Building (Scotland) Regulations 2004 — electrical installations must comply with BS 7671 but the notification process and competent person schemes operate differently. Northern Ireland has its own Building Regulations (Northern Ireland) 2012. The principle is similar across all jurisdictions — electrical work must be safe and must comply with BS 7671 — but the specific notification requirements, exemptions, and administrative processes differ.',
  },
  {
    question: 'Can I do my own electrical work at home under Part P?',
    answer:
      'Yes, but with significant limitations. Householders are legally permitted to carry out electrical work in their own homes, provided the work complies with BS 7671. For non-notifiable work (like-for-like replacements, minor additions to existing circuits outside special locations), no formal notification is needed. For notifiable work, the householder must notify building control before starting and may need an inspection. The householder cannot self-certify — only registered competent persons can do that. In practice, DIY electrical work is risky because compliance with BS 7671 requires technical knowledge, appropriate test instruments, and an understanding of the Wiring Regulations. Insurance companies may refuse claims for damage caused by DIY electrical work.',
  },
];

const relatedPages = [
  {
    href: '/guides/non-notifiable-electrical-work',
    title: 'Non-Notifiable Work Guide',
    description: 'What work does not need building control notification.',
    icon: Home,
    category: 'Guide' as const,
  },
  {
    href: '/guides/notifiable-work-guide',
    title: 'Notifiable Work Guide',
    description: 'Complete list of work that requires notification.',
    icon: Gavel,
    category: 'Guide' as const,
  },
  {
    href: '/guides/competent-person-scheme',
    title: 'Competent Person Scheme',
    description: 'NICEIC, NAPIT, ELECSA — registration and benefits.',
    icon: Award,
    category: 'Guide' as const,
  },
  {
    href: '/guides/part-p-building-regulations',
    title: 'Part P Detailed Guide',
    description: 'In-depth Part P requirements and exemptions.',
    icon: BookOpen,
    category: 'Regulations' as const,
  },
  {
    href: '/guides/eic-certificate',
    title: 'EIC Certificate Guide',
    description: 'How to issue an Electrical Installation Certificate for notifiable work.',
    icon: FileCheck2,
    category: 'Certificate' as const,
  },
  {
    href: '/guides/minor-works-certificate',
    title: 'Minor Works Certificate',
    description: 'When and how to issue a Minor Works Certificate.',
    icon: FileCheck2,
    category: 'Certificate' as const,
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-part-p',
    heading: 'What Is Part P?',
    content: (
      <>
        <p>
          Part P (Approved Document P: Electrical Safety — Dwellings) is the section of the Building
          Regulations that governs electrical installation work in homes in England. It exists to
          protect homeowners, tenants, and the public from the risks of unsafe electrical work —
          fire, electric shock, and burns.
        </p>
        <p>
          Part P was introduced on 1 January 2005 following a series of fatal incidents attributed
          to defective electrical installations in dwellings. Before Part P, there was no building
          control oversight of domestic electrical work — any person could carry out any electrical
          work without restriction. Part P changed this by requiring that most domestic electrical
          work is either carried out by a registered competent person or inspected by building
          control.
        </p>
        <p>
          The regulation applies to dwellings, which includes houses, flats, maisonettes, and the
          common parts of blocks of flats. It applies to new builds, extensions, alterations, and
          additions. Commercial premises, industrial installations, and agricultural buildings are
          not covered by Part P (they have separate regulatory frameworks).
        </p>
        <p>
          The key principle: all electrical installation work in dwellings must comply with{' '}
          <SEOInternalLink href="/guides/bs7671-eighteenth-edition">BS 7671</SEOInternalLink> (the
          IET Wiring Regulations). Most work must also be notified to building control or
          self-certified by a registered competent person. Some lower-risk work is exempt from
          notification but must still comply with BS 7671.
        </p>
      </>
    ),
  },
  {
    id: 'who-can-self-certify',
    heading: 'Who Can Self-Certify Electrical Work?',
    content: (
      <>
        <p>
          Self-certification is the process by which a registered electrician certifies that their
          own work complies with the Building Regulations and notifies building control
          electronically. Only persons registered with an approved{' '}
          <SEOInternalLink href="/guides/competent-person-scheme">
            competent person scheme
          </SEOInternalLink>{' '}
          can self-certify.
        </p>
        <p>The approved competent person schemes for electrical work in England are:</p>
        <ul className="space-y-3 my-4">
          <li className="flex items-start gap-3">
            <Award className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white">
              <strong className="text-yellow-400">NICEIC</strong> — National Inspection Council for
              Electrical Installation Contracting. The largest scheme with over 40,000 registered
              contractors.{' '}
              <SEOInternalLink href="/guides/niceic-registration">
                NICEIC registration guide
              </SEOInternalLink>
              .
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Award className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white">
              <strong className="text-yellow-400">NAPIT</strong> — National Association of
              Professional Inspectors and Testers. A growing scheme with competitive fees.{' '}
              <SEOInternalLink href="/guides/napit-registration">
                NAPIT registration guide
              </SEOInternalLink>
              .
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Award className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white">
              <strong className="text-yellow-400">ELECSA</strong> — Electrical Contractors
              Association.{' '}
              <SEOInternalLink href="/guides/elecsa-registration">
                ELECSA registration guide
              </SEOInternalLink>
              .
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Award className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white">
              <strong className="text-yellow-400">Stroma</strong> — offers electrical competent
              person scheme registration alongside building energy and gas registration.
            </span>
          </li>
        </ul>
        <p>
          When a registered person completes notifiable work, they issue the appropriate certificate
          ( <SEOInternalLink href="/guides/eic-certificate">EIC</SEOInternalLink> or{' '}
          <SEOInternalLink href="/guides/minor-works-certificate">Minor Works</SEOInternalLink>),
          notify the scheme electronically, and the scheme notifies building control on their
          behalf. A Building Regulations Compliance Certificate is then issued to the homeowner.
        </p>
      </>
    ),
  },
  {
    id: 'notifiable-work-types',
    heading: 'Types of Notifiable Work',
    content: (
      <>
        <p>The following types of electrical work in dwellings are notifiable under Part P:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Always Notifiable</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>
                <strong className="text-yellow-400">Installing a new circuit</strong> — any new
                circuit from the consumer unit or distribution board, regardless of location. This
                includes circuits for cookers, showers,{' '}
                <SEOInternalLink href="/guides/ev-charger-installation">
                  EV chargers
                </SEOInternalLink>
                , immersion heaters, and outbuildings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>
                <strong className="text-yellow-400">Consumer unit replacement</strong> — replacing
                the{' '}
                <SEOInternalLink href="/guides/consumer-unit-regulations">
                  consumer unit
                </SEOInternalLink>{' '}
                is always notifiable, even if it is a direct like-for-like replacement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>
                <strong className="text-yellow-400">Work in special locations</strong> — any
                electrical work (other than like-for-like replacement of accessories) in a room
                containing a bath or shower, a swimming pool, or a sauna.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For a complete list of work that does not need notification, see the{' '}
          <SEOInternalLink href="/guides/non-notifiable-electrical-work">
            non-notifiable work guide
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
  {
    id: 'building-control-notification',
    heading: 'Building Control Notification Process',
    content: (
      <>
        <p>There are two routes for building control notification of electrical work:</p>
        <div className="grid sm:grid-cols-2 gap-4 my-6">
          <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
            <Award className="w-6 h-6 text-yellow-400 mb-3" />
            <h3 className="font-bold text-yellow-400 text-lg mb-2">
              Route 1: Competent Person Scheme
            </h3>
            <p className="text-white text-sm leading-relaxed mb-3">
              The electrician is registered with NICEIC, NAPIT, ELECSA, or Stroma. They complete the
              work, issue the certificate, and notify the scheme electronically. The scheme notifies
              building control and a Building Regulations Compliance Certificate is issued.
            </p>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span>No separate building control fee per job</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span>No building control inspection required</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span>Faster and more cost-effective</span>
              </li>
            </ul>
          </div>
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <Building2 className="w-6 h-6 text-white mb-3" />
            <h3 className="font-bold text-white text-lg mb-2">Route 2: Building Notice</h3>
            <p className="text-white text-sm leading-relaxed mb-3">
              The person carrying out the work submits a building notice to the local authority
              building control department before starting work. Building control may inspect the
              work before and after completion.
            </p>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                <span>Fee required per job (typically 150 to 300 pounds)</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                <span>Building control inspection may be required</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                <span>Slower and more expensive per job</span>
              </li>
            </ul>
          </div>
        </div>
        <p>
          For professional electricians carrying out notifiable work regularly, competent person
          scheme registration is overwhelmingly the preferred route. The annual registration fee
          pays for itself within a few jobs compared to paying building notice fees.
        </p>
      </>
    ),
  },
  {
    id: 'special-locations',
    heading: 'Special Locations Under Part P',
    content: (
      <>
        <p>
          Special locations are areas within dwellings where the risk of electric shock is
          heightened due to reduced body resistance or confined conductive spaces. Electrical work
          in these locations — other than like-for-like replacement — is always notifiable under
          Part P.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">
            Special Locations (Approved Document P)
          </h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>
                <strong className="text-yellow-400">Rooms containing a bath or shower</strong> —
                includes bathrooms, en-suites, shower rooms, and any room with a bath or shower
                regardless of its primary purpose. The zones defined in{' '}
                <SEOInternalLink href="/guides/bathroom-electrical-regs">
                  BS 7671 Section 701
                </SEOInternalLink>{' '}
                apply.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>
                <strong className="text-yellow-400">Swimming pools and paddling pools</strong> —
                indoor and outdoor, including surrounding areas within the zones defined in BS 7671
                Section 702.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>
                <strong className="text-yellow-400">Saunas</strong> — including steam rooms and
                associated changing areas, as defined in BS 7671 Section 703.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5 my-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-2">Kitchens Are Not Special Locations</h4>
              <p className="text-white text-sm leading-relaxed">
                Since the 2013 edition of Approved Document P, kitchens are no longer classified as
                special locations. Work in kitchens that does not involve a new circuit is
                non-notifiable. This was a significant change from the original 2005 Part P.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'penalties',
    heading: 'Penalties for Non-Compliance',
    content: (
      <>
        <p>
          Failure to comply with Part P can have serious consequences for both electricians and
          homeowners:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <div className="flex items-start gap-3">
              <Gavel className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-2">Enforcement Notice</h4>
                <p className="text-white text-sm leading-relaxed">
                  The local authority can issue an enforcement notice requiring the work to be
                  brought into compliance within 28 days. This may involve having the work inspected
                  and tested by a competent person, and possibly having it altered or removed if it
                  does not comply with BS 7671.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <div className="flex items-start gap-3">
              <Gavel className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-2">Prosecution and Fines</h4>
                <p className="text-white text-sm leading-relaxed">
                  In serious cases, the local authority can prosecute under the Building Act 1984.
                  Fines can be up to two thousand pounds for each offence, and in cases of continued
                  non-compliance, daily fines can be imposed. The person who carried out the work
                  and the property owner can both be liable.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <div className="flex items-start gap-3">
              <Home className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-2">Property Sale Complications</h4>
                <p className="text-white text-sm leading-relaxed">
                  When selling a property, conveyancing solicitors check for Building Regulations
                  compliance certificates. Missing certificates for notifiable work can delay or
                  prevent the sale. The seller may need to obtain a retrospective building control
                  certificate (regularisation) or purchase indemnity insurance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'scotland-wales-ni',
    heading: 'Scotland, Wales, and Northern Ireland',
    content: (
      <>
        <p>
          Part P as described above applies specifically to England. The devolved nations have their
          own regulatory frameworks for domestic electrical work:
        </p>
        <ul className="space-y-3 my-4">
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white">
              <strong className="text-yellow-400">Wales</strong> — uses Approved Document P (Wales)
              under the Building Regulations 2010 (Wales). Requirements are very similar to England
              but administered by Welsh local authorities.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white">
              <strong className="text-yellow-400">Scotland</strong> — uses the Building (Scotland)
              Regulations 2004 under the Building (Scotland) Act 2003. Electrical installations must
              comply with BS 7671 but the notification process differs.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white">
              <strong className="text-yellow-400">Northern Ireland</strong> — uses the Building
              Regulations (Northern Ireland) 2012. Electrical work must comply with BS 7671.
            </span>
          </li>
        </ul>
        <p>
          In all jurisdictions, BS 7671 is the technical standard for electrical installation work.
          The differences lie in the administrative framework. If you work across multiple
          jurisdictions, familiarise yourself with each region's specific requirements.
        </p>
      </>
    ),
  },
  {
    id: 'documentation',
    heading: 'Required Documentation',
    content: (
      <>
        <p>The documentation required for electrical work depends on the type of work:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>
                <strong className="text-yellow-400">Notifiable new work:</strong>{' '}
                <SEOInternalLink href="/guides/eic-certificate">
                  Electrical Installation Certificate (EIC)
                </SEOInternalLink>{' '}
                with schedule of inspections and schedule of test results. Building Regulations
                Compliance Certificate issued via the competent person scheme or building control.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>
                <strong className="text-yellow-400">Notifiable minor work:</strong>{' '}
                <SEOInternalLink href="/guides/minor-works-certificate">
                  Minor Works Certificate
                </SEOInternalLink>{' '}
                for small notifiable jobs. Building Regulations Compliance Certificate via the
                scheme.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>
                <strong className="text-yellow-400">Non-notifiable work:</strong> No building
                control certificate required, but best practice is to issue a Minor Works
                Certificate. See the{' '}
                <SEOInternalLink href="/guides/non-notifiable-electrical-work">
                  non-notifiable work guide
                </SEOInternalLink>
                .
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>
                <strong className="text-yellow-400">Periodic inspection:</strong>{' '}
                <SEOInternalLink href="/guides/eicr-certificate">EICR</SEOInternalLink> for
                condition reports on existing installations.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Every Certificate Type, One App"
          description="Elec-Mate generates EICs, Minor Works Certificates, and EICRs with auto-validated test results against BS 7671. Digital signatures, instant PDF delivery, and professional formatting. Certificates that satisfy scheme assessors and building control. 7-day free trial."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function BuildingRegulationsElectricalPage() {
  return (
    <GuideTemplate
      title="Building Regulations Part P Electrical | UK Guide for Electricians"
      description="Complete guide to Part P Building Regulations for UK electricians. What work is notifiable, who can self-certify, competent person schemes (NICEIC, NAPIT, ELECSA), special locations, penalties for non-compliance, and documentation requirements. England, Wales, Scotland, and Northern Ireland."
      datePublished="2025-04-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Regulations Guide"
      badgeIcon={Gavel}
      heroTitle={
        <>
          Building Regulations Part P
          <br />
          <span className="text-yellow-400">Electrical Safety in Dwellings</span>
        </>
      }
      heroSubtitle="Part P of the Building Regulations requires most domestic electrical work to be notified to building control or self-certified by a registered competent person. This guide covers what work is notifiable, how to self-certify, special locations, penalties, and documentation requirements."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Certify Every Job Professionally"
      ctaSubheading="Elec-Mate generates compliant EICs and Minor Works Certificates with auto-validated test results. Digital signatures, instant PDF delivery, professional formatting. Join 430+ UK electricians. 7-day free trial."
    />
  );
}
