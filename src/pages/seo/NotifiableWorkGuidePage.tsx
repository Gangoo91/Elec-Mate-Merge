import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  AlertTriangle,
  Home,
  ShieldCheck,
  FileCheck2,
  GraduationCap,
  BookOpen,
  ClipboardCheck,
  Brain,
  Scale,
  Shield,
  Building,
  CheckCircle,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Regulations', href: '/guides/bs-7671-18th-edition-guide' },
  { label: 'Notifiable Work', href: '/guides/notifiable-electrical-work' },
];

const tocItems = [
  { id: 'what-is-notifiable', label: 'What Is Notifiable Work?' },
  { id: 'part-p-overview', label: 'Part P Building Regulations' },
  { id: 'what-needs-notification', label: 'What Work Needs Notification?' },
  { id: 'non-notifiable-work', label: 'Non-Notifiable Work' },
  { id: 'competent-person-route', label: 'Competent Person Route' },
  { id: 'building-control-route', label: 'Building Control Route' },
  { id: 'special-locations', label: 'Special Locations' },
  { id: 'consequences', label: 'Consequences of Not Notifying' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Part P of the Building Regulations (England and Wales) requires certain electrical work in dwellings to be notified to the local authority building control or self-certified through a competent person scheme.',
  'All new circuits, consumer unit replacements, and work in special locations (bathrooms, swimming pools, saunas) are notifiable regardless of the scope of work.',
  'Electricians registered with a competent person scheme (NICEIC, NAPIT, ELECSA, BRE) can self-certify notifiable work without involving building control.',
  'Non-notifiable work includes like-for-like replacements, adding sockets or switches to existing circuits (outside special locations), and repairs.',
  'Failure to notify can result in enforcement action, difficulty selling the property, and invalidated insurance — it is not worth the risk.',
];

const faqs = [
  {
    question: 'Is replacing a consumer unit notifiable work?',
    answer:
      'Yes. Replacing a consumer unit (also called a fuse box or distribution board) is always notifiable work under Part P of the Building Regulations. This applies whether you are upgrading from a rewireable fuseboard to a modern RCBO board, replacing a faulty consumer unit, or adding a new consumer unit as part of an extension. The consumer unit is the heart of the electrical installation — it houses the main switch, the overcurrent protective devices (MCBs or RCBOs), and the RCD protection. Replacing it affects the entire installation and must be done correctly. The work must be carried out by a qualified electrician, an Electrical Installation Certificate (EIC) must be issued, and the work must be notified either through a competent person scheme or via building control. If you are registered with NICEIC, NAPIT, ELECSA, or BRE, you can self-certify the work. If you are not registered, you must submit a building notice to the local authority before starting the work and pay the building control fee (typically £250 to £400).',
  },
  {
    question: 'Can a homeowner do their own electrical work?',
    answer:
      'There is no legal prohibition on a homeowner doing their own electrical work in their own home. However, if the work is notifiable under Part P, the homeowner must notify building control before starting the work and arrange for the completed work to be inspected and tested by building control (or an approved inspector). The homeowner cannot self-certify through a competent person scheme — scheme registration is only available to businesses. In practice, this means a homeowner who wants to install a new circuit, replace a consumer unit, or do work in a bathroom must pay for building control involvement (typically £250 to £400 plus the inspection visit fee). The building control inspector will want to see that the work complies with BS 7671, that testing has been carried out (continuity, insulation resistance, earth fault loop impedance, RCD operation), and that an EIC has been completed. If the work does not comply, the inspector can require it to be corrected. For non-notifiable work (like-for-like socket replacement, adding a spur to an existing circuit outside a special location), no notification is needed and the homeowner can do the work themselves — but it must still comply with BS 7671.',
  },
  {
    question: 'What counts as a special location under Part P?',
    answer:
      'Part P identifies certain locations within dwellings where the risk of electric shock is increased, and where all electrical work (not just new circuits) is notifiable. The key special locations are: bathrooms and shower rooms (BS 7671 Section 701), swimming pools and hot tubs (Section 702), and saunas (Section 703). In a bathroom, even adding a shaver socket, replacing a light fitting, or installing a heated towel rail is notifiable work. The regulations recognise that the combination of water and electricity in these locations creates an elevated risk, and therefore all work — no matter how minor — must be properly inspected, tested, and certified. Gardens and outbuildings are not classified as special locations under Part P, but a new circuit to a garden building or outbuilding is notifiable because it is a new circuit, not because of the location. Work on existing circuits in gardens (for example, replacing an outdoor socket like-for-like) is non-notifiable.',
  },
  {
    question: 'How much does building control cost for electrical work?',
    answer:
      'Building control fees for electrical work vary by local authority, but typical costs in England are £250 to £400 for a building notice submission, plus an additional inspection fee if the building control officer needs to visit the property. Some local authorities charge a single fee that covers both the notice and the inspection. The fee applies each time a building notice is submitted — so if you are doing multiple jobs at different properties, each one incurs a separate fee. This is one of the main reasons electricians register with a competent person scheme: scheme registration costs between £300 and £600 per year (depending on the scheme and the scope of registration), but it allows the electrician to self-certify unlimited notifiable jobs without paying building control fees for each one. For a busy electrician doing consumer unit replacements and new circuit installations, the scheme fee pays for itself within the first few jobs.',
  },
  {
    question: 'What certificate do I need for notifiable work?',
    answer:
      'For notifiable work, you need an Electrical Installation Certificate (EIC) — not a Minor Works Certificate. The EIC is the full certificate that covers design, construction, inspection, and testing of the new work. It must include a schedule of inspections and a schedule of test results for every circuit affected by the work. For a consumer unit replacement, the EIC covers the new consumer unit and all circuits connected to it — which means every circuit in the installation must be tested. For a new circuit (for example, a new ring circuit to an extension), the EIC covers the new circuit and its connection to the distribution board. The EIC must be signed by the designer, the installer, and the inspector/tester — in practice, for a one-person business, this is often the same person signing all three roles. If you are registered with a competent person scheme, the EIC is submitted to the scheme provider, who issues a building regulations compliance certificate and notifies the local authority. If you are going through building control, you submit the EIC to the building control officer as evidence of compliance.',
  },
  {
    question: 'Is adding an outside socket notifiable work?',
    answer:
      'It depends on whether the work involves a new circuit. If you are adding an outside socket as a spur from an existing internal socket circuit (fused connection unit or direct spur from the ring), and the work does not involve a new circuit from the consumer unit, it is generally non-notifiable. However, if you are installing a new dedicated circuit from the consumer unit to supply the outside socket — for example, a dedicated 20A radial circuit for an EV charger or garden workshop — that is a new circuit and is notifiable. There is a grey area around significant alterations to existing circuits. Adding multiple outside sockets, running a substantial length of new cable, or altering the circuit design could be considered a new circuit rather than an addition to an existing one. The safe approach is: if in doubt, treat it as notifiable. Self-certifying through your competent person scheme costs nothing extra, and it protects both you and the homeowner. Failing to notify when you should have done can cause problems when the property is sold.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/competent-person-scheme-electrical',
    title: 'Competent Person Schemes',
    description:
      'NICEIC, NAPIT, ELECSA, and BRE — registration process, costs, and self-certification benefits.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Create Electrical Installation Certificates on your phone for notifiable work, with AI-assisted completion.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description:
      'Complete overview of the IET Wiring Regulations — the technical standard that notifiable work must comply with.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-regulations',
    title: 'Consumer Unit Regulations',
    description:
      'All the rules around consumer unit specification, installation, and replacement — always notifiable.',
    icon: Shield,
    category: 'Guide',
  },
  {
    href: '/guides/bathroom-electrical-regulations',
    title: 'Bathroom Electrical Regulations',
    description:
      'Zones, IP ratings, RCD protection, and bonding — all bathroom electrical work is notifiable.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/training/18th-edition-course',
    title: '18th Edition Course',
    description:
      'Study for C&G 2382 with structured modules covering Part P, BS 7671, and certification.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-notifiable',
    heading: 'What Is Notifiable Electrical Work?',
    content: (
      <>
        <p>
          Notifiable electrical work is any electrical installation work in a dwelling that must be
          reported to the local authority building control body under Part P of the Building
          Regulations. The purpose of notification is to ensure that electrical work in homes meets
          safety standards — specifically{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671 (the IET Wiring Regulations)
          </SEOInternalLink>{' '}
          — and is properly inspected, tested, and certified.
        </p>
        <p>
          Part P applies to dwellings in England and Wales. It covers houses, flats, maisonettes,
          and the shared areas of blocks of flats. It does not apply to commercial premises,
          industrial buildings, or common parts of buildings that are not dwellings (although other
          regulations, such as the Electricity at Work Regulations 1989, apply to those).
        </p>
        <p>
          The notification requirement exists because electrical faults are a significant cause of
          house fires and electric shock injuries. By requiring that certain categories of
          electrical work are formally reported and inspected, the Building Regulations create a
          safety net that catches substandard work before it causes harm.
        </p>
        <p>
          There are two routes to compliance: the <strong>competent person route</strong> (where a
          registered electrician self-certifies the work through their scheme provider) and the{' '}
          <strong>building control route</strong> (where the local authority building control
          inspects the work directly). The competent person route is faster, cheaper, and more
          convenient — which is why the majority of notifiable electrical work in the UK is
          self-certified by scheme-registered electricians.
        </p>
      </>
    ),
  },
  {
    id: 'part-p-overview',
    heading: 'Part P Building Regulations: The Legal Framework',
    content: (
      <>
        <p>
          Part P of the Building Regulations 2010 (as amended) is titled "Electrical safety —
          Dwellings." It was first introduced in 2005 and has been amended several times since. The
          current version (2013 amendment) simplified the original requirements and reduced the
          scope of notifiable work.
        </p>
        <p>The key legal requirements under Part P are:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 1:</strong> Electrical installations in dwellings must be
                designed, installed, inspected, tested, and certified so that they are safe and do
                not present a danger to people or property.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 2:</strong> The technical standard for compliance is BS 7671 —
                the IET Wiring Regulations. Work that complies with BS 7671 is deemed to satisfy
                Part P.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 3:</strong> Certain categories of electrical work are
                "notifiable" and must be reported to the local authority either through a competent
                person scheme or via a building control body before the work starts.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The Approved Document P (supporting guidance to Part P) sets out in detail which types of
          work are notifiable and which are exempt. It also describes the competent person scheme
          route and the building control route for notification.
        </p>
        <p>
          Part P applies to all dwellings regardless of age. Whether the property is a new-build, a
          Victorian terrace, or a 1960s flat, any notifiable electrical work must be reported. The
          regulation applies to the work itself, not the property — so even if the existing wiring
          is old and non-compliant, any new work must meet current BS 7671 standards and be notified
          if it falls within the notifiable categories.
        </p>
      </>
    ),
  },
  {
    id: 'what-needs-notification',
    heading: 'What Electrical Work Needs Notification?',
    content: (
      <>
        <p>
          Under the current Approved Document P (2013 edition), the following categories of
          electrical work in dwellings are notifiable:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New circuits.</strong> Installing any new circuit from the consumer unit or
                distribution board — whether it is a new ring circuit, a new radial circuit, a new
                lighting circuit, or a dedicated supply to a specific appliance (cooker, shower,
                immersion heater, EV charger). This is the most common category of notifiable work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacement.</strong> Replacing or upgrading the consumer unit
                is always notifiable, regardless of whether new circuits are being added. This
                includes upgrading from a rewireable fuseboard to MCBs, adding RCD or RCBO
                protection, and full{' '}
                <SEOInternalLink href="/guides/consumer-unit-regulations">
                  consumer unit upgrades
                </SEOInternalLink>
                .
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Any work in special locations.</strong> All electrical work in bathrooms,
                shower rooms, swimming pools, and saunas is notifiable — including minor additions,
                alterations, and replacements. Even adding a shaver socket or replacing a bathroom
                light fitting is notifiable if it is in a{' '}
                <SEOInternalLink href="/guides/bathroom-electrical-regulations">
                  bathroom zone
                </SEOInternalLink>
                .
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New installations.</strong> The complete electrical installation in a new
                dwelling or a new extension to an existing dwelling is notifiable. This is typically
                handled as part of the overall building control process for the construction
                project.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The common thread is clear: any work that creates a new circuit, replaces the main
          protective equipment, or takes place in a high-risk location must be formally inspected
          and certified. This is not bureaucracy for its own sake — these are the categories of work
          where the consequences of poor installation are most severe.
        </p>
        <SEOAppBridge
          title="Check if the work is notifiable with AI"
          description="Describe the job to Elec-Mate's AI regulations assistant and get an instant answer: notifiable or non-notifiable, which certificate is needed, and whether you can self-certify through your competent person scheme."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'non-notifiable-work',
    heading: 'What Electrical Work Is Non-Notifiable?',
    content: (
      <>
        <p>
          Not all electrical work in dwellings requires notification. The following categories are
          exempt from the notification requirement (but must still comply with BS 7671):
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Like-for-like replacements.</strong> Replacing a socket, switch, light
                fitting, or accessory with a new one of the same type in the same location. No new
                wiring, no new circuit, no change in the installation design.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additions to existing circuits (outside special locations).</strong> Adding
                a socket, spur, switch, or light fitting to an existing circuit — provided the work
                is not in a bathroom, shower room, swimming pool, or sauna. Adding a fused spur from
                a ring circuit, extending a lighting circuit, or adding an outdoor socket from an
                existing circuit are all non-notifiable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Repairs and maintenance.</strong> Repairing a fault, replacing a damaged
                cable section, re-terminating connections, or carrying out any work that restores
                the installation to its original condition without adding new circuits or equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Prefabricated equipment.</strong> Installing or replacing prefabricated
                equipment sets with integral wiring — such as cooker hoods, extractor fans, towel
                rails, and similar appliances — where the work only involves connecting to an
                existing supply point.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Even though non-notifiable work does not require formal notification, it must still comply
          with BS 7671 and should be documented. For additions and alterations, a{' '}
          <SEOInternalLink href="/guides/minor-works-certificate-guide">
            Minor Works Certificate
          </SEOInternalLink>{' '}
          should be issued. For like-for-like replacements, a certificate is not legally required
          but is good practice — particularly for rented properties where the landlord may need
          evidence of compliance.
        </p>
      </>
    ),
  },
  {
    id: 'competent-person-route',
    heading: 'The Competent Person Route: Self-Certification',
    content: (
      <>
        <p>
          The competent person route is the most common and practical way to comply with Part P
          notification requirements. An electrician registered with a government-authorised
          competent person scheme can self-certify their own notifiable work without involving
          building control.
        </p>
        <p>The process works as follows:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Complete the electrical work</strong> in accordance with BS 7671. Design the
              installation, install it, and carry out full inspection and testing.
            </li>
            <li>
              <strong>Issue an Electrical Installation Certificate (EIC)</strong> for the completed
              work, including schedules of inspection and test results.
            </li>
            <li>
              <strong>Notify the work through your scheme provider</strong> — typically by
              submitting the job details through the scheme online portal within 30 days of
              completion.
            </li>
            <li>
              <strong>The scheme provider notifies the local authority</strong> on your behalf and
              issues a Building Regulations Compliance Certificate to the homeowner. This is the
              official proof that the work has been done to standard and formally notified.
            </li>
          </ol>
        </div>
        <p>
          The four main{' '}
          <SEOInternalLink href="/guides/competent-person-scheme-electrical">
            competent person schemes for electrical work
          </SEOInternalLink>{' '}
          in England and Wales are NICEIC, NAPIT, ELECSA, and BRE Certification. Each scheme
          assesses the electrician competence before granting registration, and carries out periodic
          audits to ensure ongoing compliance.
        </p>
        <p>
          The key advantage of the competent person route is speed and cost. There is no building
          control fee per job (only the annual scheme registration fee), no waiting for building
          control inspections, and no delays to the project. The homeowner receives their compliance
          certificate quickly, which is important for property sales and insurance.
        </p>
      </>
    ),
  },
  {
    id: 'building-control-route',
    heading: 'The Building Control Route',
    content: (
      <>
        <p>
          If the electrician is not registered with a competent person scheme, the alternative is to
          use the building control route. This involves notifying the local authority building
          control body (or an approved inspector) before starting the notifiable work.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Submit a building notice.</strong> Before starting work, submit a building
                notice to the local authority. This can usually be done online. The fee varies but
                is typically £250 to £400 for electrical work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Complete the work.</strong> Carry out the installation in accordance with BS
                7671. Complete an EIC with full test results.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Arrange inspection.</strong> Contact building control to arrange an
                inspection visit. The building control officer will review the EIC, check the
                installation against BS 7671, and may carry out spot-check testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Receive completion certificate.</strong> If the building control officer is
                satisfied, they issue a completion certificate confirming the work complies with the
                Building Regulations.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The building control route is more expensive (per-job fee versus annual scheme
          registration), slower (waiting for inspection appointments), and less convenient. It is
          typically used by homeowners doing DIY electrical work, electricians who are not yet
          scheme-registered, or one-off situations where scheme registration is not cost-effective.
        </p>
        <p>
          For professional electricians doing regular notifiable work, scheme registration is always
          the better option. The annual fee pays for itself within the first few jobs, and clients
          expect to see competent person scheme registration as a mark of quality.
        </p>
      </>
    ),
  },
  {
    id: 'special-locations',
    heading: 'Special Locations: Bathrooms, Swimming Pools, and Saunas',
    content: (
      <>
        <p>
          The most important thing to understand about special locations is that{' '}
          <strong>all electrical work in these locations is notifiable</strong> — not just new
          circuits. Even replacing a light fitting in a bathroom is notifiable under Part P.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Home className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Bathrooms and Shower Rooms (Section 701)
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Any room containing a bath or shower is a special location. This includes en-suite
                  bathrooms, wet rooms, and shower rooms. BS 7671 Section 701 defines zones (Zone 0,
                  Zone 1, Zone 2, and outside the zones) with specific requirements for each.
                  Equipment must have appropriate IP ratings for the zone. All circuits must have 30
                  mA RCD protection. Supplementary bonding may be required unless the installation
                  meets specific conditions under Regulation 415.2. Even a simple task like
                  replacing a bathroom light fitting must be notified.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Home className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Swimming Pools and Hot Tubs (Section 702)
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Swimming pools, paddling pools, hot tubs, and their surrounding areas are special
                  locations with the most stringent requirements. Zone 0 (inside the pool) allows
                  only SELV at 12V AC or 30V DC. Zone 1 and Zone 2 have strict IP rating and
                  equipment restrictions. Electrical work around pools and hot tubs should only be
                  carried out by electricians with specific experience in this area.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <Home className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Saunas (Section 703)</h4>
                <p className="text-white text-sm leading-relaxed">
                  Saunas present extreme environmental conditions — high temperatures and humidity.
                  Cabling and equipment must withstand temperatures of up to 170 degrees Celsius in
                  certain zones. Only heat-resistant cables (such as silicone-insulated) are
                  permitted within the sauna compartment. All work is notifiable.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          For electricians, the special location rules are examined in the{' '}
          <SEOInternalLink href="/training/18th-edition-course">
            18th Edition qualification
          </SEOInternalLink>{' '}
          and the{' '}
          <SEOInternalLink href="/training/inspection-and-testing">
            C&G 2391 inspection and testing course
          </SEOInternalLink>
          . Getting them wrong can result in failed inspections, remedial work, and complaints to
          your competent person scheme.
        </p>
      </>
    ),
  },
  {
    id: 'consequences',
    heading: 'What Happens If You Do Not Notify?',
    content: (
      <>
        <p>
          Failing to notify notifiable electrical work is a breach of the Building Regulations. The
          consequences can be serious — both for the electrician and the homeowner.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Enforcement action.</strong> The local authority can serve an enforcement
                notice requiring the homeowner to have the work inspected, tested, and certified —
                or to have it removed or altered to comply. In extreme cases, the local authority
                can seek an injunction through the courts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Problems selling the property.</strong> Conveyancing solicitors routinely
                check for Building Regulations compliance certificates for electrical work. If a
                consumer unit has been replaced or new circuits installed without notification, the
                solicitor will flag it as a defect. The seller may need to obtain retrospective
                regularisation (which involves paying building control to inspect the existing work)
                or provide an indemnity insurance policy.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insurance implications.</strong> If a fire or injury results from electrical
                work that was not properly notified and certified, the home insurance may not cover
                the claim. The insurer can argue that the homeowner failed to comply with Building
                Regulations and that the uncertified work voids the policy.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Professional consequences.</strong> An electrician registered with a
                competent person scheme who fails to notify notifiable work risks disciplinary
                action from the scheme — including warnings, additional audits, or removal from the
                scheme register.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Retrospective regularisation is possible — a homeowner (or electrician) can apply to the
          local authority to regularise work that was done without notification. Building control
          will inspect the work, may require testing, and will charge a fee (often higher than the
          original building notice fee). If the work is compliant, a regularisation certificate is
          issued. If it is not compliant, remedial work will be required.
        </p>
        <p>
          The simplest way to avoid these problems is to notify every time. If you are a registered
          electrician, self-certify through your scheme. It takes minutes, costs nothing extra, and
          protects everyone involved.
        </p>
        <SEOAppBridge
          title="Generate EICs for notifiable work on site"
          description="Elec-Mate creates professional Electrical Installation Certificates with full schedules of inspection and test results. Complete the EIC on your phone, submit it to your scheme provider, and send the PDF to the client — all from site."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function NotifiableWorkGuidePage() {
  return (
    <GuideTemplate
      title="Notifiable Electrical Work | Part P Guide UK"
      description="Complete guide to notifiable electrical work under Part P Building Regulations. Covers which work needs notification, competent person schemes, building control, self-certification, special locations, and consequences of non-compliance."
      datePublished="2025-04-10"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Regulations Guide"
      badgeIcon={ClipboardCheck}
      heroTitle={
        <>
          Notifiable Electrical Work:{' '}
          <span className="text-yellow-400">Your Complete Part P Guide</span>
        </>
      }
      heroSubtitle="Which electrical work needs notification under Part P? When can you self-certify? What happens if you do not notify? This guide covers every aspect of the notification process for UK electricians and homeowners."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Notifiable Electrical Work"
      relatedPages={relatedPages}
      ctaHeading="Self-Certify Notifiable Work Faster"
      ctaSubheading="Elec-Mate generates professional EICs with full test schedules, AI-assisted defect coding, and instant PDF delivery. Complete the paperwork on site and get back to the next job. 7-day free trial."
    />
  );
}
