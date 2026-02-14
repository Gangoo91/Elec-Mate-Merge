import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Home,
  Shield,
  Zap,
  AlertTriangle,
  Calculator,
  ClipboardCheck,
  FileCheck2,
  CheckCircle,
  XCircle,
  MapPin,
  Scale,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = "Non-Notifiable Electrical Work | What Doesn't Need Part P";
const PAGE_DESCRIPTION =
  "Complete guide to non-notifiable electrical work under Part P of the Building Regulations. What doesn't need notification, like-for-like replacements, adding sockets in non-special locations, work outside kitchens and bathrooms. For UK electricians and homeowners.";

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Non-Notifiable Electrical Work', href: '/guides/non-notifiable-electrical-work' },
];

const tocItems = [
  { id: 'what-is-non-notifiable', label: 'What Is Non-Notifiable Work?' },
  { id: 'part-p-overview', label: 'Part P Building Regulations Overview' },
  { id: 'like-for-like', label: 'Like-for-Like Replacements' },
  { id: 'adding-sockets', label: 'Adding Sockets in Non-Special Locations' },
  { id: 'special-locations', label: 'Special Locations Explained' },
  { id: 'work-that-is-notifiable', label: 'Work That IS Notifiable' },
  { id: 'diy-vs-professional', label: 'DIY vs Professional Work' },
  { id: 'certification-for-non-notifiable', label: 'Certification for Non-Notifiable Work' },
  { id: 'common-questions', label: 'Common Grey Areas' },
  { id: 'elec-mate', label: 'Non-Notifiable Work with Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Non-notifiable electrical work is work that does not need to be notified to building control or carried out by a registered competent person scheme member. It still must comply with BS 7671.',
  'Like-for-like replacements are generally non-notifiable — replacing a socket outlet, light switch, ceiling rose, or fused spur with an equivalent item in the same location.',
  'Adding sockets, lighting points, or fused spurs to an existing circuit is non-notifiable ONLY if the work is NOT in a special location (kitchen, bathroom, outdoors, or swimming pool/sauna area).',
  'Any work in a special location (bathroom, kitchen, outdoors) is notifiable, even adding a single socket. New circuits are always notifiable regardless of location.',
  'Elec-Mate generates Minor Works certificates for non-notifiable work, providing professional documentation even when notification is not legally required.',
];

const faqs = [
  {
    question: 'What electrical work does not need Part P notification?',
    answer:
      'The following electrical work does not need notification under Part P of the Building Regulations (Approved Document P, 2013 edition with 2016 amendments): replacing accessories such as socket outlets, light switches, ceiling roses, and fused connection units on a like-for-like basis; replacing a damaged cable for a single circuit on a like-for-like basis; re-fixing or replacing enclosures (back boxes) of existing accessories; adding lighting points, socket outlets, or fused spurs to an existing circuit in areas that are NOT special locations (not in a kitchen, bathroom, outdoors, or near a swimming pool or sauna); and installing or upgrading main or supplementary equipotential bonding connections. All non-notifiable work must still comply with BS 7671. The fact that notification is not required does not mean the work can be done to a lower standard.',
  },
  {
    question: 'Is replacing a consumer unit notifiable work?',
    answer:
      'Yes. Replacing a consumer unit (or any distribution board) is always notifiable work under Part P, regardless of location. This is because a consumer unit replacement involves work on the main supply and affects the protection of the entire installation. The work must be carried out by a registered competent person (NICEIC, NAPIT, ELECSA, etc.) or notified to building control with the appropriate fee and inspection. An Electrical Installation Certificate (EIC) must be issued for the new consumer unit, and the work must be tested and certified to BS 7671. A building control completion certificate will be issued after satisfactory inspection.',
  },
  {
    question: 'Can I add a socket in my kitchen without notification?',
    answer:
      'No. A kitchen is classified as a special location under Part P. Any electrical installation work in a kitchen — including adding a socket outlet, adding a lighting point, or adding a fused spur — is notifiable work. It must be carried out by a registered competent person or notified to building control. The only exception is like-for-like replacement of existing accessories (replacing a broken socket with an identical one in the same location). Adding a new accessory or altering a circuit in a kitchen always requires notification.',
  },
  {
    question: 'What counts as a special location under Part P?',
    answer:
      'Under Approved Document P, special locations include: rooms containing a bath or shower (bathrooms, en-suites, wet rooms), swimming pool areas, hot tub and sauna areas, and outdoors (gardens, driveways, external walls). Kitchens are also treated as special locations for the purposes of Part P notification — any new electrical work in a kitchen (beyond like-for-like replacement) is notifiable. The key principle is that these locations present an increased risk of electric shock due to the presence of water, damp conditions, or reduced body resistance (wet skin). Electrical work in these locations requires additional protective measures and must be properly certified.',
  },
  {
    question: 'Is adding an outside light notifiable?',
    answer:
      'It depends on what work is involved. If you are simply replacing an existing outside light fitting with a new one in the same location (like-for-like replacement), this is non-notifiable. However, if you are adding a new outside light where one did not exist before, this involves new electrical work outdoors — a special location — and is notifiable. If you are running a new cable to an outside light, adding a new switch, or creating a new circuit for outdoor lighting, this is notifiable. In practice, most new outdoor lighting installations are notifiable because they involve new cabling or new circuit work in a special location.',
  },
  {
    question: 'Do I need a certificate for non-notifiable work?',
    answer:
      'There is no legal requirement to issue a certificate for non-notifiable work. However, it is strongly recommended that a Minor Works certificate is issued for any electrical work, including non-notifiable work. The certificate provides documentary evidence that the work has been carried out to BS 7671, protects the electrician against future claims, and gives the customer confidence in the work. For homeowners selling their property, having certificates for electrical work (even non-notifiable work) can avoid complications during the conveyancing process. Most professional electricians issue a Minor Works certificate for all electrical work as standard practice.',
  },
  {
    question: 'Can a homeowner do non-notifiable electrical work themselves?',
    answer:
      'Yes. Non-notifiable electrical work can legally be carried out by anyone, including a homeowner doing DIY. There is no legal requirement for the person to be qualified or registered with a competent person scheme. However, the work must still comply with BS 7671 — this is a legal requirement under the Building Regulations regardless of who carries out the work. In practice, electrical DIY carries significant safety risks if the person does not have the knowledge and skills to work safely and to the required standard. Common DIY errors include incorrect polarity, missing earth connections, incorrect cable sizes, and failure to test the completed work. If the work is not to standard and causes injury or property damage, the homeowner could face prosecution under the Health and Safety at Work Act.',
  },
];

const sections = [
  {
    id: 'what-is-non-notifiable',
    heading: 'What Is Non-Notifiable Electrical Work?',
    content: (
      <>
        <p>
          Non-notifiable electrical work is work that does not need to be reported (notified) to the
          local authority building control department. Under Part P of the Building Regulations
          (England and Wales), certain types of electrical work in domestic dwellings require
          notification to building control — either by a registered competent person who
          self-certifies the work, or by the homeowner/builder who notifies building control
          directly and pays for an inspection.
        </p>
        <p>
          Non-notifiable work falls below this threshold. It can be carried out by anyone —
          qualified electrician, general builder, or homeowner — without the need for building
          control notification. However, and this is critically important, non-notifiable work must
          still comply with BS 7671:2018+A2:2022 (the Wiring Regulations). The fact that
          notification is not required does not mean the work can be done to a lower standard or
          without following the regulations.
        </p>
        <p>
          The distinction between notifiable and non-notifiable work is defined in Approved Document
          P (2013 edition with 2016 amendments) of the{' '}
          <SEOInternalLink href="/guides/part-p-building-regulations">
            Building Regulations
          </SEOInternalLink>
          . Understanding this distinction is essential for every electrician to advise customers
          correctly and to know when certification and notification are required.
        </p>
      </>
    ),
  },
  {
    id: 'part-p-overview',
    heading: 'Part P Building Regulations Overview',
    content: (
      <>
        <p>
          Part P of the Building Regulations applies to electrical installations in dwellings
          (houses, flats, maisonettes) in England and Wales. Scotland and Northern Ireland have
          their own building regulations with different requirements. Part P was introduced in 2005
          to improve the safety of domestic electrical installations by requiring certain types of
          work to be inspected and certified.
        </p>
        <p>
          The current version is Approved Document P, 2013 edition incorporating 2016 amendments.
          This version simplified the notification requirements compared to the original 2005
          version. The key principle is that work which creates a new circuit or involves work in a
          special location is notifiable, while minor work on existing circuits in normal locations
          is non-notifiable.
        </p>
        <p>
          Compliance with Part P can be demonstrated in two ways: by having the work carried out by
          a person who is registered with a competent person scheme (NICEIC, NAPIT, ELECSA, STROMA,
          etc.) who will self-certify the work, or by notifying building control before the work
          starts, paying the applicable fee, and having the work inspected by a building control
          officer or approved inspector.
        </p>
      </>
    ),
  },
  {
    id: 'like-for-like',
    heading: 'Like-for-Like Replacements',
    content: (
      <>
        <p>
          Like-for-like replacement means replacing an existing electrical accessory or component
          with an equivalent item in the same location. This is the most common type of
          non-notifiable work. Examples include:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-4">
            Non-Notifiable Like-for-Like Replacements
          </h3>
          <ul className="space-y-3 text-white leading-relaxed">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Replacing a damaged or outdated socket outlet with a new one in the same location
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Replacing a light switch (including upgrading from a standard switch to a dimmer,
                provided the circuit is suitable)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>Replacing a ceiling rose or light fitting in the same location</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>Replacing a fused connection unit (fused spur) in the same location</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Replacing a damaged section of cable on a single circuit (like-for-like cable
                replacement)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Replacing a cooker control unit, shaver supply unit, or other accessory in the same
                location
              </span>
            </li>
          </ul>
        </div>
        <p>
          The key words are "like-for-like" and "same location." If you are moving the accessory to
          a different position, adding a new accessory, or upgrading the circuit (for example,
          replacing a radial circuit with a ring), this goes beyond like-for-like and may be
          notifiable depending on the location.
        </p>
        <p>
          Note that like-for-like replacements are non-notifiable even in special locations. You can
          replace a bathroom light fitting with a new one in the same position without notification.
          However, adding a new light fitting in a bathroom where one did not exist before is
          notifiable.
        </p>
      </>
    ),
  },
  {
    id: 'adding-sockets',
    heading: 'Adding Sockets in Non-Special Locations',
    content: (
      <>
        <p>
          Adding a socket outlet, lighting point, or fused spur to an existing circuit is
          non-notifiable — but only if the work is NOT in a special location. This is one of the
          most commonly misunderstood aspects of Part P.
        </p>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Non-Notifiable Additions</h3>
          <ul className="space-y-3 text-white leading-relaxed">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Adding a socket in a bedroom:</strong>{' '}
                Non-notifiable. Bedrooms are not special locations. Adding a spur from an existing
                ring circuit to a new socket position in a bedroom does not require notification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Adding a light in a living room:</strong>{' '}
                Non-notifiable. Adding a lighting point to an existing lighting circuit in a living
                room, dining room, or hallway does not require notification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Adding a fused spur in a garage:</strong>{' '}
                Non-notifiable (assuming the garage is attached to or within the curtilage of the
                dwelling and is not an outbuilding requiring a new circuit).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-red-400">Adding a socket in a kitchen:</strong> NOTIFIABLE.
                Kitchens are special locations. This work requires notification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-red-400">Adding a light in a bathroom:</strong> NOTIFIABLE.
                Bathrooms are special locations. This work requires notification.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Even when adding accessories to existing circuits in non-special locations (which is
          non-notifiable), the work must comply with BS 7671. This means the cable must be correctly
          sized for the circuit, the circuit must not be overloaded, the earthing and bonding must
          be correct, and the completed work should be tested.
        </p>
      </>
    ),
  },
  {
    id: 'special-locations',
    heading: 'Special Locations Explained',
    content: (
      <>
        <p>
          Special locations are areas where the risk of electric shock is increased due to the
          presence of water, damp conditions, or reduced body resistance. Under Part P, any
          electrical installation work (beyond like-for-like replacement) in a special location is
          notifiable.
        </p>
        <div className="space-y-4 mt-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Bathrooms and shower rooms</h3>
                <p className="text-white text-sm leading-relaxed">
                  Any room containing a bath or shower. This includes en-suites, wet rooms, and
                  cloakrooms with a shower. The bathroom zones (0, 1, 2, and outside zones) defined
                  in BS 7671 Section 701 determine what equipment can be installed where.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Kitchens</h3>
                <p className="text-white text-sm leading-relaxed">
                  Kitchens are treated as special locations for Part P notification purposes due to
                  the proximity of water, metallic sinks, and metallic appliances. Any new
                  electrical work in a kitchen (beyond like-for-like replacement) is notifiable.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Outdoors</h3>
                <p className="text-white text-sm leading-relaxed">
                  Gardens, driveways, external walls, outbuildings, and any area outside the main
                  building envelope. This includes garden lighting, external sockets, outbuilding
                  supplies, and EV charger installations.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Swimming pools, saunas, and hot tubs</h3>
                <p className="text-white text-sm leading-relaxed">
                  These areas have the highest risk of electric shock and the most restrictive
                  requirements. BS 7671 Sections 702 (swimming pools) and 703 (saunas) apply.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'work-that-is-notifiable',
    heading: 'Work That IS Notifiable',
    content: (
      <>
        <p>
          For clarity, here is a summary of work that IS notifiable under Part P and therefore
          requires either a registered competent person or building control notification:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Always Notifiable</h3>
          <ul className="space-y-3 text-white leading-relaxed">
            <li className="flex items-start gap-3">
              <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
              <span>
                Installing a new circuit (regardless of location) — including running a new radial
                or ring from the consumer unit
              </span>
            </li>
            <li className="flex items-start gap-3">
              <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
              <span>Replacing a consumer unit or distribution board</span>
            </li>
            <li className="flex items-start gap-3">
              <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
              <span>
                Any electrical work in a special location (kitchen, bathroom, outdoors, swimming
                pool/sauna area) other than like-for-like replacement
              </span>
            </li>
            <li className="flex items-start gap-3">
              <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
              <span>Adding or altering circuits in a special location</span>
            </li>
            <li className="flex items-start gap-3">
              <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
              <span>Installing an EV charger (new circuit to an external location)</span>
            </li>
            <li className="flex items-start gap-3">
              <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
              <span>Installing a new shower circuit (new circuit in a special location)</span>
            </li>
          </ul>
        </div>
        <p>
          If you are unsure whether work is notifiable, the safest approach is to treat it as
          notifiable. The consequences of carrying out notifiable work without notification can
          include enforcement action by building control, difficulty selling the property, and
          potential prosecution if the work is found to be unsafe.
        </p>
      </>
    ),
  },
  {
    id: 'diy-vs-professional',
    heading: 'DIY vs Professional Electrical Work',
    content: (
      <>
        <p>
          Non-notifiable electrical work can legally be carried out by anyone — there is no legal
          requirement for the person to be qualified or registered. This means a homeowner can
          legally carry out non-notifiable work themselves as a DIY task.
        </p>
        <p>
          However, the work must still comply with BS 7671. This is not optional — it is a legal
          requirement under the Building Regulations. Common DIY electrical errors include: reversed
          polarity (line and neutral swapped), missing or incorrect earth connections, cables not
          protected against mechanical damage, incorrect cable sizes for the circuit loading,
          failure to test the completed work, and failure to consider the impact of adding loads to
          existing circuits.
        </p>
        <p>
          For homeowners, our strong recommendation is to use a qualified electrician for all
          electrical work, including non-notifiable work. The cost of having a professional carry
          out the work is modest compared to the safety risks of incorrect DIY electrical work. A
          qualified electrician will also issue a{' '}
          <SEOInternalLink href="/tools/minor-works-certificate">
            Minor Works certificate
          </SEOInternalLink>{' '}
          documenting the work, which protects both the homeowner and the electrician.
        </p>
      </>
    ),
  },
  {
    id: 'certification-for-non-notifiable',
    heading: 'Certification for Non-Notifiable Work',
    content: (
      <>
        <p>
          Although there is no legal requirement to issue a certificate for non-notifiable work,
          best practice (and most competent person scheme provider requirements) is to issue a Minor
          Works certificate for any electrical work carried out. This provides:
        </p>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5 my-4">
          <ul className="space-y-3 text-white leading-relaxed">
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Documentary evidence</strong> that the work was
                carried out to BS 7671 and was tested
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Legal protection</strong> for the electrician if
                the work is later questioned or if an incident occurs
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Customer confidence</strong> that the work has
                been professionally carried out and verified
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Property sale documentation</strong> —
                solicitors and conveyancers increasingly request electrical certificates during the
                property sale process
              </span>
            </li>
          </ul>
        </div>
        <p>
          A Minor Works certificate is appropriate for additions and alterations to existing
          circuits that do not require a full EIC. For like-for-like replacements, some electricians
          issue a Minor Works certificate; others provide a simple written confirmation of the work
          carried out. Either approach is acceptable, but a Minor Works certificate is more
          professional and more useful as documentary evidence.
        </p>
        <SEOAppBridge
          title="Minor Works certificates in under 5 minutes"
          description="Elec-Mate generates professional Minor Works certificates for non-notifiable work. Enter the circuit details, test results, and description of work — the app auto-validates every value and generates a signed PDF certificate. Perfect for socket additions, accessory replacements, and minor alterations."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'common-questions',
    heading: 'Common Grey Areas',
    content: (
      <>
        <p>
          Several types of work fall into grey areas where it is not immediately obvious whether the
          work is notifiable. Here are the most common:
        </p>
        <div className="space-y-4 mt-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Utility room — is it a kitchen?</h3>
                <p className="text-white text-sm leading-relaxed">
                  A utility room with a sink and plumbing is generally treated the same as a kitchen
                  for Part P purposes. Adding electrical accessories in a utility room is typically
                  notifiable. If the room has no water supply, it is not a special location.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Conservatory — indoors or outdoors?</h3>
                <p className="text-white text-sm leading-relaxed">
                  A conservatory attached to the house is generally treated as indoors for Part P
                  purposes, provided it has a solid roof and walls. Adding sockets to an existing
                  circuit in a conservatory is typically non-notifiable. However, a new circuit to a
                  conservatory is always notifiable.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Garage — attached vs detached</h3>
                <p className="text-white text-sm leading-relaxed">
                  An integral or attached garage is part of the dwelling. Adding accessories to an
                  existing circuit in an attached garage is non-notifiable. A detached garage
                  typically requires a new circuit from the consumer unit, which is notifiable.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Replacing a single MCB</h3>
                <p className="text-white text-sm leading-relaxed">
                  Replacing an individual MCB or RCBO on a like-for-like basis is non-notifiable.
                  However, if you are changing the type or rating (for example, upgrading from a B16
                  to a B20, or from an MCB to an RCBO), this involves altering the circuit
                  protection and some scheme providers treat this as notifiable. Check with your
                  scheme provider.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'elec-mate',
    heading: 'Non-Notifiable Work with Elec-Mate',
    content: (
      <>
        <p>
          Elec-Mate makes it easy to issue professional Minor Works certificates for non-notifiable
          work. The app includes a{' '}
          <SEOInternalLink href="/tools/minor-works-certificate">
            Minor Works certificate template
          </SEOInternalLink>{' '}
          that captures all the required information: description of work, circuit details, test
          results, and declaration. Every test result is auto-validated against BS 7671 limits.
        </p>
        <SEOAppBridge
          title="Professional certificates for every job"
          description="Issue a Minor Works certificate for every non-notifiable job — socket additions, accessory replacements, and minor alterations. Elec-Mate generates a signed PDF in under 5 minutes. Your customers get professional documentation; you get legal protection."
          icon={ClipboardCheck}
        />
        <p>
          For notifiable work, Elec-Mate generates full{' '}
          <SEOInternalLink href="/tools/eic-certificate">
            Electrical Installation Certificates
          </SEOInternalLink>{' '}
          with complete schedules of test results. The{' '}
          <SEOInternalLink href="/tools/electrical-testing-calculators">
            70+ electrical calculators
          </SEOInternalLink>{' '}
          help you verify cable sizes, voltage drop, and Zs values for every circuit. The 8 Elec-AI
          agents can answer Part P questions in real time on site.
        </p>
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/guides/part-p-building-regulations',
    title: 'Part P Building Regulations',
    description:
      'Complete guide to Part P. What is notifiable, competent person schemes, building control process.',
    icon: Scale,
    category: 'Guide',
  },
  {
    href: '/tools/minor-works-certificate',
    title: 'Minor Works Certificate',
    description:
      'Generate professional Minor Works certificates for non-notifiable electrical work. Auto-validated test results.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/consumer-unit-regulations',
    title: 'Consumer Unit Regulations',
    description:
      'Consumer unit replacement is always notifiable. Current regulations, AMD3, and metal CU requirements.',
    icon: Shield,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Full Electrical Installation Certificates for notifiable work. Auto-validated schedules of test results.',
    icon: ClipboardCheck,
    category: 'Certificate',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation',
    description:
      'EV charger installation is notifiable (new circuit, outdoor location). Complete installation guide.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-testing-calculators',
    title: '70+ Electrical Calculators',
    description:
      'Cable sizing, voltage drop, Zs verification, PFC, and dozens more. Verify your work to BS 7671.',
    icon: Calculator,
    category: 'Calculator',
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function NonNotifiableWorkPage() {
  return (
    <GuideTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2025-08-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Regulations Guide"
      badgeIcon={Home}
      heroTitle={
        <>
          Non-Notifiable Electrical Work:{' '}
          <span className="text-yellow-400">What Does Not Need Part P</span>
        </>
      }
      heroSubtitle="Complete guide to non-notifiable electrical work under Part P of the Building Regulations. Like-for-like replacements, adding sockets in non-special locations, the difference between notifiable and non-notifiable work, and when certification is still recommended."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Professional certificates for every job — even non-notifiable"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site certification. Minor Works certificates in under 5 minutes. Auto-validated test results. 7-day free trial, cancel anytime."
    />
  );
}
