import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  AlertTriangle,
  PoundSterling,
  Home,
  ClipboardCheck,
  Zap,
  ShieldCheck,
  FileCheck2,
  Scale,
  Wrench,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Property Guides', href: '/guides/period-property-electrical' },
  { label: 'Listed Building Electrical Guide', href: '/listed-building-electrical' },
];

const tocItems = [
  { id: 'listed-overview', label: 'Listed Buildings and Consent' },
  { id: 'conservation-officers', label: 'Working with Conservation Officers' },
  { id: 'surface-wiring', label: 'Surface Wiring Methods' },
  { id: 'sympathetic-installation', label: 'Sympathetic Installation' },
  { id: 'niceic-napit', label: 'NICEIC/NAPIT Specialists' },
  { id: 'eicr-listed', label: 'EICR in Listed Buildings' },
  { id: 'costs', label: 'Costs 2026' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Listed building consent (LBC) is required for any works to a listed building that would affect its character as a building of special architectural or historic interest. Electrical rewiring that involves chasing into original fabric — historic plasterwork, stonework, or timber — will almost always require LBC.',
  'Carrying out works to a listed building without consent is a criminal offence. There is no time limit on prosecution, and the offence remains with the building — not just the owner who carried out the works. Penalties include unlimited fines and imprisonment.',
  'Surface-mounted wiring in period conduit or mini-trunking is the preferred method in many listed buildings where chasing is not permitted. This avoids disturbing historic fabric and is reversible.',
  'Conservation officers at the local planning authority are not adversarial — they exist to help owners maintain listed buildings appropriately. Early engagement before any work begins is strongly recommended.',
  'Electricians working in listed buildings should be members of NICEIC or NAPIT and, where possible, have experience of historic building work. Listed building owners are willing to pay a premium for electricians who understand the constraints.',
];

const faqs = [
  {
    question: 'Do I need listed building consent to rewire a listed building?',
    answer:
      'In most cases, yes. Listed building consent is required for any works that would affect the character of a listed building as a building of special architectural or historic interest. A full rewire that involves chasing cables into original plasterwork, cutting through historic timbers, or altering original joinery will require consent. Works that are entirely reversible and do not affect historic fabric — such as surface-mounted conduit in a non-principal room — may not require consent, but you should consult the conservation officer before proceeding.',
  },
  {
    question: 'What is the difference between Grade I and Grade II listed buildings for electrical work?',
    answer:
      'Grade I listed buildings are of exceptional interest (approximately 2% of all listed buildings). They are subject to the strictest controls and any works affecting historic fabric will face close scrutiny. Grade II* (two star) buildings are particularly important and face similar scrutiny. Grade II listed buildings (92% of the total) are nationally important but generally allow for more flexibility, particularly in later additions and outbuildings that are not of the highest historic significance. In all cases, consult the conservation officer before starting any electrical work.',
  },
  {
    question: 'Can I install modern sockets and switches in a listed building?',
    answer:
      'Yes, but with care. Modern white plastic sockets and switches are generally acceptable in listed buildings where they are installed sympathetically and do not damage historic fabric. Some conservation officers prefer period-style accessories (brass or nickel finishes, surface-mounted in period-appropriate box types) particularly in principal rooms. The location and method of installation matters more than the accessory type — damage to historic plasterwork to install a modern socket is far more problematic than the socket itself.',
  },
  {
    question: 'What is surface-mounted wiring and when is it used?',
    answer:
      'Surface-mounted wiring runs cables in conduit or trunking fixed to the surface of walls and ceilings, rather than being chased into the fabric of the building. In listed buildings where chasing original plasterwork or masonry is not permitted, surface mounting is the preferred (and sometimes only acceptable) method. Period-appropriate conduit — oval steel conduit, brass conduit, or black iron conduit — can be used to create an installation that sits sympathetically within the historic context.',
  },
  {
    question: 'How do I find an electrician experienced in listed building work?',
    answer:
      'Search the NICEIC or NAPIT registers for electricians in your area, and specifically ask about listed building experience when contacting them. Some NICEIC contractors have additional accreditations in heritage or conservation work. Local conservation officers and the Society for the Protection of Ancient Buildings (SPAB) can sometimes recommend suitable electricians. Ask to see examples of previous work in listed buildings and check references.',
  },
  {
    question: 'Can I put recessed downlights in a listed building?',
    answer:
      'Recessed downlights require cutting through ceilings and, in listed buildings, this almost always requires listed building consent where the ceiling is of historic interest (original plaster, decorative mouldings, or historic construction). In a listed building with a plain modern ceiling added in the 20th century, recessed lights may be more readily approved. Surface-mounted or pendant lights that do not require cutting into the ceiling fabric are generally easier to obtain consent for. Always consult the conservation officer.',
  },
  {
    question: 'What happens if I carry out electrical work on a listed building without consent?',
    answer:
      'Carrying out works to a listed building without consent is a criminal offence under the Planning (Listed Buildings and Conservation Areas) Act 1990. The offence is committed by the person who carries out the works, which can include the electrician as well as the owner. There is no time limit on prosecution. Penalties include unlimited fines and up to two years imprisonment. The planning authority can also require the works to be reversed at the owner\'s expense — which in the case of a rewire could mean restoring original fabric that has been disturbed.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/victorian-house-rewire',
    title: 'Victorian House Rewire Guide',
    description: 'Rewiring Victorian properties — rubber wiring, solid walls, cornicing preservation, and costs.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/period-property-electrical',
    title: 'Period Property Electrical Guide',
    description: 'General guide covering all pre-1966 properties — survey checklist and EICR importance.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/edwardian-house-electrical',
    title: 'Edwardian House Electrical Guide',
    description: 'Rewiring 1901–1910 Edwardian properties — VIR cables, early consumer units, renovation considerations.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes Explained',
    description: 'Understand C1, C2, C3 and FI codes — what they mean and what action is required.',
    icon: ClipboardCheck,
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
    id: 'listed-overview',
    heading: 'Listed Buildings and the Consent Requirement',
    content: (
      <>
        <p>
          There are approximately 400,000 listed buildings in England, managed by Historic
          England under the Planning (Listed Buildings and Conservation Areas) Act 1990.
          The vast majority — around 92 per cent — are Grade II listed. A further 5.5 per cent
          are Grade II* (two star) and approximately 2 per cent are Grade I, representing
          buildings of exceptional interest.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Listed building consent (LBC)</strong> — required for any works
                that would affect the character of a listed building as a building of special
                architectural or historic interest. This includes both the interior and
                exterior of the building, and all fixtures that are considered part of the
                listing. LBC is in addition to (not instead of) planning permission and
                Building Regulations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>When LBC is required for electrical work</strong> — chasing cables
                into original historic plasterwork, cutting through historic timbers or
                masonry, removing or altering original joinery or fittings, and any work
                that materially alters the character of the building will require LBC.
                Works that are entirely reversible and affect only non-original fabric
                may not require consent — but the advice of the conservation officer
                should be sought before proceeding.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Criminal offence</strong> — carrying out works to a listed building
                without consent is a criminal offence. There is no time limit on prosecution,
                and the offence runs with the building — a new owner who discovers unauthorised
                works may be required to reverse them at their own expense even if they did
                not commission them.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Applying for LBC</strong> — applications are made to the local planning
                authority (the same body as for planning permission). Most authorities have
                a conservation officer who handles listed building matters. Applications
                should include drawings showing the proposed cable routes, conduit types,
                and accessory locations, and should explain how the works minimise impact
                on historic fabric.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Building Regulations notification is also required for electrical work in listed
          buildings, as for any domestic property. A registered electrician (NICEIC, NAPIT)
          can self-certify the electrical work. The listed building consent is a separate
          process handled by the planning authority.
        </p>
      </>
    ),
  },
  {
    id: 'conservation-officers',
    heading: 'Working with Conservation Officers',
    content: (
      <>
        <p>
          Conservation officers at local planning authorities are the specialists responsible
          for administering listed building consent. They are not adversaries — their role
          is to help owners maintain listed buildings appropriately and to balance the needs
          of the building with the needs of the occupants. Early and open engagement is almost
          always beneficial.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pre-application advice</strong> — most planning authorities offer
                pre-application advice for listed building works, sometimes free of charge.
                A pre-application meeting or written query allows you to explain the proposed
                electrical work and get informal guidance on whether LBC is required and
                what approach is likely to be acceptable, before committing to a formal
                application.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>What conservation officers look for</strong> — the key principles
                are reversibility (can the work be undone without damaging historic fabric?),
                minimum intervention (does the proposed method of installation cause the
                least possible impact on the historic building?), and authenticity (does
                the finished appearance respect the character of the building?). Proposals
                that score well on all three are much more likely to be approved.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Involving the electrician early</strong> — a conservation officer
                will want to understand the proposed installation method in detail. Having
                a qualified electrician with listed building experience involved from the
                outset — and able to attend a site meeting if required — significantly
                strengthens the application.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Historic England guidance</strong> — Historic England publishes
                detailed guidance on electrical installations in historic buildings. This
                guidance (available on the Historic England website) is the standard reference
                document for conservation officers and electricians working on listed buildings.
                Electricians who can demonstrate familiarity with this guidance are well-placed
                to work on listed buildings.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'surface-wiring',
    heading: 'Surface Wiring — When Chasing Is Not Permitted',
    content: (
      <>
        <p>
          In many listed buildings, the conservation officer will not permit cables to be chased
          into original historic plasterwork or masonry. Surface wiring — cables run in conduit
          or trunking fixed to the surface — is the accepted alternative. Done well, it can be
          almost invisible or even sympathetically decorative.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Oval steel conduit</strong> — thin oval steel conduit, available in
                black finish, is often used in exposed timber-framed buildings and early
                vernacular structures. It has a period character that sits sympathetically
                in old buildings and is accepted by many conservation officers in rooms of
                high historic significance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Brass and nickel conduit</strong> — decorative brass or nickel
                surface conduit and fittings are appropriate in Georgian and Victorian
                principal rooms. When installed with period-appropriate switches and
                sockets (in matching brass or nickel finishes), the surface installation
                becomes a feature rather than a compromise.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mini-trunking</strong> — white PVC mini-trunking is less sympathetic
                in historic rooms but is widely used in service areas, kitchens, bathrooms,
                and secondary rooms of listed buildings. It is easy to install, clean in
                appearance, and fully reversible. Conservation officers generally accept
                it in non-principal rooms.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Running in existing voids</strong> — where floor voids and ceiling
                voids exist and can be accessed without disturbing historic fabric, cables
                can be run concealed without surface conduit. This requires careful planning
                — cables in voids must still comply with BS 7671, particularly regarding
                protection from mechanical damage and the risk of rodent damage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Skirting board routes</strong> — many listed buildings have deep
                original skirting boards (75mm to 150mm) that can accommodate cables run
                behind them without chasing. Purpose-designed skirting trunking systems
                provide a clean finish with easy future access. Some conservation officers
                require that original skirting boards are not permanently altered to
                accommodate trunking.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'sympathetic-installation',
    heading: 'Sympathetic Electrical Installation Methods',
    content: (
      <>
        <p>
          Sympathetic installation in a listed building goes beyond simply avoiding damage to
          historic fabric. It means actively choosing methods, materials, and accessories that
          respect and complement the character of the building. The best listed building
          electrical installations are almost invisible within their historic context.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Period-style accessories</strong> — brass, antique bronze, nickel,
                and black nickel finishes on sockets and switches are available from
                specialist suppliers (Hamilton Litestat, Forbes and Lomax, Crabtree Vintage).
                Surface-mounted boxes in the same finish complete the period aesthetic.
                These accessories cost more than standard white plastic but are appropriate
                investments in a listed building.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ceiling roses and pendant lighting</strong> — original ceiling roses
                should be preserved. New lighting cables can often be routed from above
                through the existing rose aperture without disturbing the rose itself.
                Where original roses have been removed, replica plaster roses are available
                from specialist suppliers and are generally acceptable to conservation officers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lighting design</strong> — in listed buildings, the lighting design
                should complement the architecture. Wall sconces, picture lights, and
                carefully positioned floor lamps reduce the need for extensive ceiling
                wiring. A lighting designer experienced in historic buildings can often
                achieve excellent results with minimal electrical infrastructure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit location</strong> — the consumer unit in a listed
                building should be located in a service area (utility room, cellar, or
                purpose-built cupboard) rather than in a historically significant space.
                Modern metal consumer units are functional rather than decorative and
                should not be visible within principal rooms.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'niceic-napit',
    heading: 'Finding NICEIC/NAPIT Approved Specialists for Listed Buildings',
    content: (
      <>
        <p>
          Not all qualified electricians have experience of listed building work. The
          constraints of listed building consent, the need to work with conservation officers,
          and the specialist installation methods required mean that experience matters
          significantly. The following guidance helps owners find suitable specialists.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC and NAPIT registers</strong> — search the NICEIC and NAPIT
                online registers for electricians in your area. When contacting them, ask
                specifically about listed building experience and whether they have worked
                with local conservation officers before. Ask for references from listed
                building clients.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Conservation officer recommendation</strong> — your local planning
                authority's conservation officer may be able to suggest electricians they
                have worked with successfully on similar projects. This is not an official
                endorsement but is a useful practical resource.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SPAB and Georgian Group</strong> — the Society for the Protection
                of Ancient Buildings (SPAB) and the Georgian Group maintain networks of
                contractors experienced in historic building work. Their websites carry
                guidance on finding appropriate tradespeople.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Get multiple quotes</strong> — listed building electrical work
                is specialist and the cost varies significantly between contractors.
                Obtain at least three written quotes, each specifying the installation
                method, materials, and accessories in detail. The cheapest quote may
                not be the most appropriate for a listed building context.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'eicr-listed',
    heading: 'EICR in Listed Buildings — Special Considerations',
    content: (
      <>
        <p>
          An{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            EICR
          </SEOInternalLink>{' '}
          in a listed building follows the same technical requirements as any EICR under
          BS 7671, but presents additional practical challenges. The inspector must carry
          out a thorough inspection without causing damage to historic fabric.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Limited access</strong> — in a listed building, the inspector cannot
                lift floorboards, remove panel linings, or open wall chases to inspect
                concealed wiring without consent. The inspection scope must be agreed with
                the owner in advance, and any limitations on access must be documented
                in the EICR. Where access is limited, the inspection may be classified as
                a "limited inspection" with appropriate caveats.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Original accessories</strong> — listed buildings sometimes have
                original switchgear, sockets, or light fittings that cannot be opened
                without risk of damage. The inspector must use professional judgement in
                deciding how many accessories to open and inspect, balancing thoroughness
                against the risk of causing damage to historic fittings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Photographic record</strong> — thorough photographic documentation
                during an EICR in a listed building is especially important, both to support
                the EICR findings and to provide a baseline record of the installation
                condition before any remedial work is carried out.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Recommended re-inspection intervals</strong> — listed buildings
                with original or partially-original wiring should have EICRs more frequently
                than modern properties. An interval of 5 years is appropriate; some
                inspectors recommend 3 years for the oldest and most complex installations.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Electrical Work Costs in Listed Buildings (2026)',
    content: (
      <>
        <p>
          Electrical work in listed buildings costs significantly more than in non-listed
          properties. The premium reflects the additional time required for sympathetic
          installation methods, specialist materials, and the preparation and liaison
          required for listed building consent applications.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR — listed building</strong> — £250 to £600, depending on the
                size and complexity of the property. Limited access inspections at the lower
                end; full inspections of complex multi-storey listed buildings at the higher
                end.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacement</strong> — £600 to £1,200. Higher than
                standard due to the need to locate the consumer unit sympathetically and
                ensure all connections to existing (potentially original) wiring are
                properly assessed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full rewire — Grade II listed cottage or terrace</strong> — £6,000
                to £15,000. Surface mounting throughout, period-style accessories, liaison
                with conservation officer, listed building consent application. Significantly
                more time-consuming than an equivalent unlisted property.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full rewire — Grade I or Grade II* listed house</strong> — £12,000
                to £30,000+. The most complex and historic properties require the most
                careful approach and the greatest investment of time and specialist materials.
                Projects at the upper end typically involve full surface installations in
                period conduit throughout multiple floors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Listed building consent application</strong> — £200 to £1,000
                in professional fees for preparing and submitting the application, in
                addition to the LBC application fee (currently £206 in England).
              </span>
            </li>
          </ul>
        </div>
        <p>
          Owners of listed buildings may be eligible for grants from Historic England,
          the National Lottery Heritage Fund, or local authority conservation grants to
          assist with the cost of repairs and improvements to listed buildings. Check
          with your local conservation officer for current funding opportunities.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in Listed Buildings',
    content: (
      <>
        <p>
          Listed building work is a specialist market that commands premium fees and requires
          genuine expertise. Electricians who develop a reputation for sympathetic, knowledgeable
          listed building work are rarely short of work — the pool of qualified competitors is
          small and the clients (often wealthy, highly educated, and deeply invested in their
          properties) are loyal and refer actively.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Document the Historic Installation Thoroughly</h4>
                <p className="text-white text-sm leading-relaxed">
                  Before any work begins, carry out a full{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    photographic EICR with the Elec-Mate app
                  </SEOInternalLink>
                  . In a listed building, the before-state is as important as the after-state.
                  Comprehensive photographic documentation protects you if the condition
                  of the original installation is later disputed, and supports any listed
                  building consent application.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote for the Full Scope — Include Consent</h4>
                <p className="text-white text-sm leading-relaxed">
                  Listed building clients often underestimate the total project cost. Use
                  the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>{' '}
                  to produce a detailed quote that includes the electrical installation,
                  specialist materials, and an allowance for listed building consent
                  liaison time. Transparent, professional quotes build trust with clients
                  who are accustomed to specialist contractors.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Know the Legal Risk — and Protect Yourself</h4>
                <p className="text-white text-sm leading-relaxed">
                  As an electrician, you can be prosecuted for carrying out works on a listed
                  building without consent — even if instructed to do so by the owner.
                  Before starting any work that involves disturbing historic fabric, confirm
                  in writing that listed building consent has been obtained and obtain a
                  copy. If consent has not been obtained, do not proceed until it has been.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Complete listed building EICRs professionally with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for on-site EICR completion with thorough photographic documentation, AI board scanning, and professional quoting. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ListedBuildingElectricalPage() {
  return (
    <GuideTemplate
      title="Listed Building Electrical Guide | Rewiring Grade I & II Listed Properties UK"
      description="Complete guide to electrical work in listed buildings. Listed building consent requirements, working with conservation officers, surface wiring methods, sympathetic installation, NICEIC/NAPIT specialists, and costs £250–£30,000+ for 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Listed Building Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          Listed Building Electrical Guide:{' '}
          <span className="text-yellow-400">Rewiring Grade I &amp; II Properties</span>
        </>
      }
      heroSubtitle="Electrical work in a listed building requires listed building consent, careful liaison with conservation officers, and sympathetic installation methods that protect historic fabric. This guide covers consent requirements, surface wiring, period-appropriate installation techniques, finding specialist electricians, and the real costs — from £250 for an EICR to £30,000+ for a full rewire of a Grade I property."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Listed Building Electrical Work"
      relatedPages={relatedPages}
      ctaHeading="Complete Listed Building EICRs on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site EICR completion with thorough photographic documentation, AI board scanning, and professional quoting. 7-day free trial, cancel anytime."
    />
  );
}
