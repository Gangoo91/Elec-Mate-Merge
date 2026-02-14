import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Home,
  Shield,
  FileCheck2,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  ShieldCheck,
  ClipboardCheck,
  GraduationCap,
  Calculator,
  Scale,
  Settings,
  Send,
  Car,
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
  { id: 'notifiable-work', label: 'Notifiable Work Types' },
  { id: 'non-notifiable', label: 'Non-Notifiable Work' },
  { id: 'competent-person', label: 'Competent Person Schemes' },
  { id: 'building-control', label: 'Building Control Route' },
  { id: 'certification', label: 'Certification Requirements' },
  { id: 'penalties-enforcement', label: 'Penalties and Enforcement' },
  { id: 'scotland-wales-ni', label: 'Scotland, Wales and Northern Ireland' },
  { id: 'elec-mate-compliance', label: 'Staying Compliant with Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Approved Document P of the Building Regulations governs electrical installation work in dwellings in England and Wales. Certain types of electrical work are "notifiable" and must be certified to building control.',
  'The simplest route to compliance is registration with a competent person scheme (NICEIC, NAPIT, ELECSA, or BRE). Registered electricians can self-certify notifiable work without involving building control directly.',
  'Non-registered electricians can still carry out notifiable work, but they must notify building control before starting and pay for an inspection — which is more expensive and slower.',
  'Work that is not notifiable (like replacing sockets, switches, or light fittings on existing circuits) does not require building control notification, but must still comply with BS 7671.',
  'Elec-Mate generates the correct certificates (EIC, Minor Works, EICR) in the BS 7671 format, ready to submit to your competent person scheme or provide to building control.',
];

const faqs = [
  {
    question: 'What electrical work is notifiable under Part P?',
    answer:
      'Under Approved Document P, the following electrical work in dwellings is notifiable: installing a new circuit (including adding a new ring final, radial, or lighting circuit), installing a consumer unit or distribution board, work in a special location (bathroom, shower room, or swimming pool/sauna zone), and any addition or alteration to existing circuits in a special location. Installing an EV charger is notifiable because it involves adding a new circuit. Replacing a consumer unit is notifiable because it involves the consumer unit. Any work that involves adding a new circuit from the consumer unit or altering the electrical installation in a bathroom is notifiable regardless of the scope.',
  },
  {
    question: 'What is a competent person scheme?',
    answer:
      'A competent person scheme is a government-authorised scheme that allows registered electrical contractors to self-certify their own work as compliant with the Building Regulations. This means the electrician can complete notifiable work without notifying building control in advance or paying for a building control inspection. The main competent person schemes for electrical work in England and Wales are NICEIC, NAPIT, ELECSA, and BRE Certification. Registration requires the electrician (or their qualifying supervisor) to hold the current edition qualification (C&G 2382, 18th Edition), an installation or inspection qualification, and to pass an assessment of their work. The scheme provider carries out periodic assessments (typically annually) to maintain registration.',
  },
  {
    question: 'Can I do electrical work without being registered with a scheme?',
    answer:
      'Yes, but for notifiable work you must follow the building control route. This means notifying your local authority building control department (or an approved inspector) before starting the work, allowing them to inspect the work during and after installation, and paying the building control fee — which is typically £250 to £400 depending on the local authority. The building control officer may not be an electrician, so they may require you to provide test results and certificates from a qualified person. This route is more expensive and slower than self-certification through a competent person scheme. For non-notifiable work (like-for-like replacements, adding sockets or switches to existing circuits outside special locations), you do not need to notify building control, but the work must still comply with BS 7671.',
  },
  {
    question: 'Is replacing a consumer unit notifiable?',
    answer:
      'Yes. Replacing a consumer unit (fuse box) is notifiable under Part P because the consumer unit is a critical safety component that affects the entire electrical installation. The work must be either self-certified by a registered competent person or notified to building control. After replacing a consumer unit, the electrician must issue an Electrical Installation Certificate (EIC) — not a Minor Works Certificate — because the work involves the origin of the installation. The EIC must include full test results for all circuits, not just the circuits that were worked on. This is because replacing the consumer unit provides an opportunity (and in many cases a requirement) to verify the condition of the entire installation.',
  },
  {
    question: 'What happens if I do notifiable work without notifying building control?',
    answer:
      'If notifiable electrical work is carried out without proper certification (either self-certification through a competent person scheme or notification to building control), it is technically a breach of the Building Regulations. The consequences can include: the local authority can issue an enforcement notice requiring the work to be inspected, tested, and brought into compliance; the homeowner may have difficulty selling the property because the conveyancing solicitor will identify the absence of a Building Regulations Compliance Certificate; mortgage lenders may refuse to lend on the property; and insurance claims related to the electrical installation may be declined. The homeowner can apply for regularisation — a retrospective building control inspection — but this typically costs more than the original building control fee and may require opening up completed work for inspection.',
  },
  {
    question: 'Does Part P apply to commercial properties?',
    answer:
      'No. Approved Document P applies only to dwellings — which includes houses, flats, maisonettes, and the common parts of blocks of flats. It does not apply to commercial premises, shops, offices, factories, or other non-domestic buildings. Electrical work in commercial premises must comply with BS 7671 and is regulated through other mechanisms: the Health and Safety at Work Act 1974, the Electricity at Work Regulations 1989, and landlord obligations. However, if a commercial building contains residential accommodation (for example, a flat above a shop), Part P applies to the residential parts. Similarly, if a dwelling is used partly for business purposes (a home office), Part P still applies because the building is primarily a dwelling.',
  },
  {
    question: 'What is a Building Regulations Compliance Certificate?',
    answer:
      'A Building Regulations Compliance Certificate (sometimes called a "Part P certificate" for electrical work) is issued by the local authority or an approved inspector to confirm that the work complies with the relevant Building Regulations. When a registered competent person self-certifies notifiable electrical work, the scheme provider notifies the local authority electronically, and the local authority issues the compliance certificate to the homeowner — usually within a few weeks. The homeowner should keep this certificate with their property records. It is different from the Electrical Installation Certificate (EIC) or Minor Works Certificate, which are technical documents issued by the electrician. The compliance certificate is the legal document that confirms Building Regulations compliance.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/competent-person-scheme-electrical',
    title: 'Competent Person Scheme Guide',
    description:
      'How to register with NICEIC, NAPIT, or ELECSA. Costs, assessment requirements, and benefits of scheme membership.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-certificate-types-uk',
    title: 'Electrical Certificate Types UK',
    description:
      'EIC, Minor Works, EICR — which certificate for which job. Complete guide to all UK electrical certificates.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-regulations',
    title: 'Consumer Unit Regulations',
    description:
      'Current regulations for consumer unit installation and replacement including Amendment 3 requirements.',
    icon: Settings,
    category: 'Guide',
  },
  {
    href: '/guides/iet-code-of-practice-ev',
    title: 'IET Code of Practice EV Charging',
    description:
      'Complete guide to EV charger installations — a common notifiable job under Part P.',
    icon: Car,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete digital EICR certificates on your phone with AI board scanner and voice test entry.',
    icon: ClipboardCheck,
    category: 'Certificate',
  },
  {
    href: '/training/18th-edition',
    title: '18th Edition Course',
    description:
      'Study for C&G 2382 with structured training modules covering the full scope of BS 7671.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-part-p',
    heading: 'What Is Approved Document P?',
    content: (
      <>
        <p>
          Approved Document P (ADP) is the section of the Building Regulations for England and Wales
          that covers electrical safety in dwellings. It was introduced in 2005 and has been updated
          several times since, most recently in 2013 (with the scope of notifiable work reduced).
          Its purpose is to ensure that electrical installation work in homes is designed and
          installed to a standard that provides adequate protection against fire and electric shock.
        </p>
        <p>
          ADP achieves this by requiring certain types of electrical work — called "notifiable work"
          — to be either self-certified by an electrician registered with a government- authorised
          competent person scheme, or inspected and approved by building control. The technical
          standard that the work must comply with is{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          (the IET Wiring Regulations, 18th Edition with Amendment 3).
        </p>
        <p>
          ADP applies to dwellings only — houses, flats, maisonettes, and shared areas in blocks of
          flats. It does not apply to commercial, industrial, or agricultural buildings, which are
          covered by other legislation (primarily the Electricity at Work Regulations 1989 and the
          Health and Safety at Work Act 1974).
        </p>
        <p>
          The key thing to understand is that ADP does not prevent anyone from doing electrical
          work. It simply requires that certain types of work are properly certified. A homeowner
          can legally do their own electrical work, but if it is notifiable, they must follow the
          building control route. A qualified electrician registered with a competent person scheme
          can self-certify the same work without building control involvement.
        </p>
      </>
    ),
  },
  {
    id: 'notifiable-work',
    heading: 'What Electrical Work Is Notifiable?',
    content: (
      <>
        <p>
          Under the current version of ADP (2013 edition), the following types of electrical work in
          dwellings are notifiable:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Installing a new circuit</strong> — any new circuit from the consumer unit
                or distribution board, including ring finals, radials, lighting circuits, dedicated
                appliance circuits, and{' '}
                <SEOInternalLink href="/guides/iet-code-of-practice-ev">
                  EV charger circuits
                </SEOInternalLink>
                .
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Replacing a consumer unit</strong> — including like-for-like replacements
                and upgrades. A full{' '}
                <SEOInternalLink href="/guides/consumer-unit-regulations">
                  consumer unit replacement
                </SEOInternalLink>{' '}
                requires an EIC with complete test results for all circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Work in special locations</strong> — any electrical work (additions or
                alterations) in a bathroom, shower room, or room containing a swimming pool or
                sauna. This includes adding a towel rail, installing a bathroom extractor fan, or
                moving a light fitting in a bathroom.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If the work falls into any of these categories, it must be either self-certified by a
          registered competent person or notified to building control before starting. There is no
          exemption based on the size of the job — even adding a single spur in a bathroom is
          notifiable.
        </p>
      </>
    ),
  },
  {
    id: 'non-notifiable',
    heading: 'What Electrical Work Is Not Notifiable?',
    content: (
      <>
        <p>
          The 2013 revision of ADP significantly reduced the scope of notifiable work. The following
          types of electrical work in dwellings are not notifiable (but must still comply with BS
          7671):
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                Replacing accessories (sockets, switches, light fittings, FCUs) on existing circuits
                — like-for-like or upgraded.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                Adding fused spurs to existing circuits (outside special locations) — for example,
                adding a fused connection unit for a kitchen appliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                Adding additional socket outlets or light points to existing circuits (outside
                special locations).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                Installing fixed current-using equipment (cookers, showers) where the existing
                circuit can supply it and no new circuit is required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                Replacing cables damaged by, for example, a nail through a cable — provided the
                circuit is not in a special location and no new circuit is created.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Even though this work is not notifiable, it must still be carried out to the standard
          required by BS 7671 and an appropriate certificate should be issued. For additions and
          alterations to existing circuits, a{' '}
          <SEOInternalLink href="/guides/minor-works-certificate">
            Minor Works Certificate
          </SEOInternalLink>{' '}
          is the correct document. For like-for-like replacements, a certificate is not strictly
          required by the regulations but is good practice.
        </p>
      </>
    ),
  },
  {
    id: 'competent-person',
    heading: 'Competent Person Schemes: The Self-Certification Route',
    content: (
      <>
        <p>
          The simplest and most cost-effective way for an electrician to comply with Part P is to
          register with a competent person scheme. Registration allows you to self-certify your own
          notifiable work without involving building control directly.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h4 className="font-bold text-white mb-3">Approved Schemes for Electrical Work</h4>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC</strong> — the largest scheme, with several tiers: Approved
                Contractor, Domestic Installer, and others. Annual fees and assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NAPIT</strong> — offers domestic and commercial registration tiers. Known
                for competitive fees and accessible assessment process.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>ELECSA</strong> — part of the ECA group. Offers domestic installer
                registration with a straightforward application process.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>BRE Certification</strong> — the Building Research Establishment scheme,
                less widely used but equally valid.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The self-certification process works as follows: you complete the notifiable work, issue
          the appropriate certificate (EIC or Minor Works), and submit the notification to your
          scheme provider (usually through their online portal). The scheme provider forwards the
          notification to the local authority building control department, who issue a Building
          Regulations Compliance Certificate to the homeowner. The entire process happens
          electronically and the homeowner receives their compliance certificate within a few weeks.
        </p>
        <p>
          For full details on costs, assessment requirements, and how to register, see our{' '}
          <SEOInternalLink href="/guides/competent-person-scheme-electrical">
            Competent Person Scheme Guide
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
  {
    id: 'building-control',
    heading: 'The Building Control Route',
    content: (
      <>
        <p>
          If you are not registered with a competent person scheme, you can still carry out
          notifiable electrical work — but you must use the building control route. This involves
          notifying the local authority building control department (or an approved inspector)
          before starting the work.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h4 className="font-bold text-white mb-3">Building Control Process</h4>
          <ol className="space-y-3 text-white list-decimal list-inside">
            <li>
              <strong>Submit a building notice</strong> to the local authority building control
              department before starting the work. This can usually be done online and costs
              approximately £250 to £400 depending on the local authority.
            </li>
            <li>
              <strong>Allow inspection</strong> — the building control officer may visit during or
              after the work to inspect the installation. They may not be an electrician, so they
              will typically ask for test results and certificates.
            </li>
            <li>
              <strong>Provide certificates and test results</strong> — you must provide an EIC or
              Minor Works Certificate with full test results to building control as evidence that
              the work complies with BS 7671.
            </li>
            <li>
              <strong>Receive the compliance certificate</strong> — once building control is
              satisfied, they issue the Building Regulations Compliance Certificate to the
              homeowner.
            </li>
          </ol>
        </div>
        <p>
          The building control route is more expensive (the fee is typically passed to the
          homeowner), slower (weeks rather than days), and more administratively burdensome than
          self-certification. For electricians who regularly do notifiable work, joining a competent
          person scheme is almost always the better option financially.
        </p>
      </>
    ),
  },
  {
    id: 'certification',
    heading: 'Certification Requirements',
    content: (
      <>
        <p>The type of certificate required depends on the nature of the work:</p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h4 className="font-bold text-white text-lg mb-3">
              Electrical Installation Certificate (EIC)
            </h4>
            <p className="text-white text-sm leading-relaxed">
              Required for new installations and major alterations: new circuits, consumer unit
              replacements, rewires, and new installations. Must include Design, Construction, and
              Inspection & Testing sections with full schedule of test results.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h4 className="font-bold text-white text-lg mb-3">Minor Works Certificate</h4>
            <p className="text-white text-sm leading-relaxed">
              Suitable for additions and alterations to existing circuits that do not involve a new
              circuit or consumer unit: adding spurs, additional socket outlets, light points, or
              connecting fixed appliances to existing circuits.
            </p>
          </div>
        </div>
        <p>
          The certificates must follow the model forms in Appendix 6 of BS 7671. They must include
          the electrician's name, registration details, a description of the work, and the test
          results. For{' '}
          <SEOInternalLink href="/guides/how-to-fill-in-eicr">
            periodic inspection work
          </SEOInternalLink>
          , an EICR is issued instead.
        </p>
        <SEOAppBridge
          title="Generate compliant certificates in minutes"
          description="Elec-Mate creates EIC, Minor Works, and EICR certificates in the correct BS 7671 format. Fill in the details on site, capture test results with voice entry, and export a professional PDF — ready for your scheme provider or building control."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'penalties-enforcement',
    heading: 'Penalties for Non-Compliance',
    content: (
      <>
        <p>
          Carrying out notifiable electrical work without proper certification is a breach of the
          Building Regulations. While criminal prosecution is rare, the practical consequences are
          significant:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Enforcement notice:</strong> the local authority can require the work to be
                opened up, inspected, tested, and brought into compliance at the homeowner's
                expense.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Property sale complications:</strong> solicitors acting for buyers routinely
                check for Building Regulations Compliance Certificates. Missing certificates can
                delay or prevent a sale, or require an indemnity insurance policy.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insurance issues:</strong> if a fire or electric shock incident is traced to
                uncertified electrical work, the homeowner's insurance claim may be declined.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regularisation cost:</strong> retrospective approval through building
                control (regularisation) costs more than the original notification and may require
                opening up completed work.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For electricians, the reputational damage of being associated with uncertified work can be
          more damaging than any formal penalty. Competent person scheme providers can remove
          registration if they discover that notifiable work is not being properly notified.
        </p>
      </>
    ),
  },
  {
    id: 'scotland-wales-ni',
    heading: 'Scotland, Wales, and Northern Ireland',
    content: (
      <>
        <p>Building regulations are devolved, so the rules differ in each UK nation:</p>
        <div className="grid gap-4 sm:grid-cols-3 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h4 className="font-bold text-white text-lg mb-3">Scotland</h4>
            <p className="text-white text-sm leading-relaxed">
              Electrical work in Scotland is covered by the Building (Scotland) Regulations 2004 and
              Scottish Technical Handbook Section 4 (Safety). There is no direct equivalent of Part
              P — the regulations take a different approach. All building work, including
              electrical, requires a building warrant for certain types of work. Competent person
              schemes such as SELECT (the trade association for the electrical industry in Scotland)
              operate under the Certification of Construction scheme.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h4 className="font-bold text-white text-lg mb-3">Wales</h4>
            <p className="text-white text-sm leading-relaxed">
              Wales follows the same Approved Document P as England — the Building Regulations
              (England and Wales) apply to both nations. The same competent person schemes operate
              in Wales. The practical requirements for notifiable work, self-certification, and
              building control are identical.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h4 className="font-bold text-white text-lg mb-3">Northern Ireland</h4>
            <p className="text-white text-sm leading-relaxed">
              Northern Ireland has its own Building Regulations (Northern Ireland) 2012 and
              Technical Booklet P (Electrical Safety). The scope is similar to England and Wales but
              administered by district councils. Competent person schemes such as NICEIC and NAPIT
              also operate in Northern Ireland.
            </p>
          </div>
        </div>
        <p>
          Regardless of which UK nation you work in, the underlying technical standard is the same:
          BS 7671. An electrician working to BS 7671 and issuing the correct certificates is meeting
          the technical requirements in all four nations. The differences are primarily in the
          notification and certification procedures.
        </p>
      </>
    ),
  },
  {
    id: 'elec-mate-compliance',
    heading: 'Staying Compliant with Elec-Mate',
    content: (
      <>
        <p>
          Elec-Mate simplifies Part P compliance by providing the correct certificate templates,
          automated test result entry, and professional PDF export — all on your phone. Here is how
          it helps:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Correct Certificate for Every Job</h4>
                <p className="text-white text-sm leading-relaxed">
                  EIC for new circuits and consumer unit replacements. Minor Works for additions and
                  alterations to existing circuits. EICR for periodic inspections. All in the BS
                  7671 Appendix 6 format.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Send className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Instant Delivery</h4>
                <p className="text-white text-sm leading-relaxed">
                  Send the completed certificate as a professional PDF by email or WhatsApp from
                  site. The homeowner has their documentation before you leave the property. Ready
                  to upload to your scheme provider portal.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Never miss a Part P notification again"
          description="Elec-Mate prompts you when a job is notifiable, generates the correct certificate, and reminds you to submit to your scheme provider. Join 430+ UK electricians staying compliant effortlessly. 7-day free trial."
          icon={Shield}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function BuildingRegsElectricalPage() {
  return (
    <GuideTemplate
      title="Building Regulations Electrical | Approved Document P"
      description="Complete guide to Building Regulations for electrical work in UK dwellings. Approved Document P requirements, notifiable work types, competent person schemes, building control route, certification requirements, and penalties for non-compliance."
      datePublished="2025-03-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Regulations Guide"
      badgeIcon={Home}
      heroTitle={
        <>
          Building Regulations for Electrical Work:{' '}
          <span className="text-yellow-400">Approved Document P Explained</span>
        </>
      }
      heroSubtitle="Everything UK electricians need to know about Part P of the Building Regulations. Which work is notifiable, competent person schemes, building control, certification requirements, and what happens if you get it wrong."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Building Regulations Electrical"
      relatedPages={relatedPages}
      ctaHeading="Generate Part P Compliant Certificates on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for EIC, Minor Works, and EICR certificates. Correct BS 7671 format, instant PDF delivery, and scheme provider ready. 7-day free trial, cancel anytime."
    />
  );
}
