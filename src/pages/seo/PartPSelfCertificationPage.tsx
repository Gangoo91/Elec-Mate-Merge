import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import { FileCheck2, ShieldCheck, Building2, Scale, BookOpen, MapPin } from 'lucide-react';

// -------------------------------------------------------------------
// Shared surface classes — edge-to-edge on phones, inset from sm: up
// -------------------------------------------------------------------

const CARD =
  '-mx-4 rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5';

const TABLE_WRAP = `${CARD} overflow-x-auto`;
const TABLE = 'w-full min-w-[560px] text-left text-sm text-white';
const TH = 'border-b border-white/20 py-3 pr-4 align-bottom font-semibold text-white';
const TD = 'py-3 pr-4 align-top text-white';
const TR = 'border-b border-white/[0.08] last:border-0';

const TERM = 'text-sm font-semibold text-white';
const DEF = 'mt-1 text-sm text-white';
const STACK = 'space-y-5';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Building Regulations', href: '/part-p-self-certification' },
  { label: 'Part P Self-Certification Guide', href: '/part-p-self-certification' },
];

const tocItems = [
  { id: 'notifiable-work', label: 'What Work Is Notifiable?' },
  { id: 'special-location', label: 'What Counts as a Special Location' },
  { id: 'certification-routes', label: 'The Three Certification Routes' },
  { id: 'what-is-part-p', label: 'What Part P Actually Says' },
  { id: 'consequences', label: 'Work Done Without Certification' },
  { id: 'scotland-ni', label: 'Scotland and Northern Ireland' },
  { id: 'scheme-comparison', label: 'Choosing a Competent Person Scheme' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'In England, only three types of domestic electrical work are notifiable, and they are listed in regulation 12(6A) of the Building Regulations 2010: installing a new circuit, replacing a consumer unit, and any addition or alteration to an existing circuit in a special location.',
  'England cut the notifiable list on 6 April 2013. Work in a kitchen, a garden or an outbuilding is no longer notifiable in England on those grounds alone. Wales did not follow — it still runs the 2006 edition of Approved Document P, where kitchens, outdoor wiring and other special installations remain notifiable.',
  'Notifiable work must be certified by one of three routes (Approved Document P, paragraph 3.1): self-certification by a registered competent person, certification by a registered third-party certifier, or certification by a building control body.',
  'On the self-certification route the installer or their registration body must, within 30 days of completion, give the Building Regulations compliance certificate to the occupier and give the certificate or its details to the building control body.',
  'The bodies authorised to run electrical competent person schemes for dwellings are named in Schedule 3 to the Building Regulations 2010 — currently Certsure LLP (NICEIC), NAPIT Registration Limited, Blue Flame Certification Limited and the Oil Firing Technical Association Limited.',
  'Part P applies in England and Wales only. Scotland controls electrical work through the building warrant system and standard 4.5 (Electrical safety). The Building Regulations (Northern Ireland) 2012 contain no electrical safety Part at all.',
];

const faqs = [
  {
    question: 'What is a Part P certificate?',
    answer:
      'A Part P certificate is a Building Regulations compliance certificate confirming that notifiable domestic electrical work meets Part P of Schedule 1 to the Building Regulations 2010. It is not the same document as a BS 7671 Electrical Installation Certificate or Minor Electrical Installation Works Certificate — those record the electrical inspection and testing. On the self-certification route, the installer or their registration body must give the compliance certificate to the occupier, and give the certificate or its details to the building control body, within 30 days of the work being completed.',
  },
  {
    question: 'What electrical work is notifiable under Part P?',
    answer:
      'In England, regulation 12(6A) of the Building Regulations 2010 makes three types of work notifiable: (a) the installation of a new circuit; (b) the replacement of a consumer unit; and (c) any addition or alteration to existing circuits in a special location. Everything else — additions and alterations outside special locations, and replacements, repairs and maintenance anywhere — is not notifiable, though it must still comply with Part P and should be certificated to BS 7671. Wales still uses the wider pre-2013 list, in which work in a kitchen, outdoor lighting and power installations, electric floor or ceiling heating and solar PV are also notifiable.',
  },
  {
    question: 'Is electrical work in a kitchen notifiable?',
    answer:
      'Not in England. Kitchens stopped being notifiable on 6 April 2013 when the notifiable list was reduced to the three items in regulation 12(6A). Adding a socket or a lighting point to an existing kitchen circuit in England is not notifiable — but running a new circuit for it is, because a new circuit is notifiable wherever it goes. In Wales, kitchens remain notifiable: the Welsh edition of Approved Document P only exempts additions to existing circuits that are not in a kitchen or a special location.',
  },
  {
    question: 'How does Part P self-certification work?',
    answer:
      'A registered competent person carries out the work, inspects and tests it to BS 7671, and completes the appropriate BS 7671 certificate for the person ordering the work. No prior notice to building control is needed. The installer or their registration body then has 30 days from completion to give the Building Regulations compliance certificate to the occupier and to give the certificate, or the information on it, to the building control body. Approved Document P sets this out at paragraphs 3.3 and 3.4.',
  },
  {
    question: 'What if I am not registered with a competent person scheme?',
    answer:
      'There are two other routes. You can appoint a registered third-party certifier before work begins; you then notify them within 5 days of completing the work, and they inspect, test and issue an electrical installation condition report, with their registration body issuing the compliance certificate within 30 days. Or you notify a building control body before work begins, and it decides how much inspection and testing it needs. Giving building control your own BS 7671 certificate and evidence of your qualifications can reduce the charge, because a local authority setting charges under the Building (Local Authority Charges) Regulations 2010 has to take account of how much inspection work it expects to do.',
  },
  {
    question: 'How much does a Part P certificate cost?',
    answer:
      'On the competent person route there is no separate building control charge — the cost is absorbed into the electrician’s price and their annual scheme registration fee. On the building control route, the charge is set locally by each authority under the Building (Local Authority Charges) Regulations 2010, so it varies. Ask the relevant authority for its published scale of charges before you commit, and ask separately about the regularisation charge if the work has already been done.',
  },
  {
    question: 'Does Part P apply in Scotland?',
    answer:
      'No. Scotland has its own system under the Building (Scotland) Act 2003 and the Building (Scotland) Regulations 2004. The relevant standard is standard 4.5, Electrical safety: "Every building must be designed and constructed in such a way that the electrical installation does not (a) threaten the health and safety of the people in, and around, the building; and (b) become a source of fire." Control is exercised through the building warrant system rather than a Part P style notifiable-work list, and the self-certification equivalent is the Approved Certifier of Construction role under the certification of construction scheme for electrical installations.',
  },
  {
    question: 'Does Part P apply in Northern Ireland?',
    answer:
      'No, and there is no direct equivalent. The Building Regulations (Northern Ireland) 2012 have no Part covering electrical safety — Part P in Northern Ireland deals with sanitary appliances, unvented hot water storage systems and reducing the risk of scalding, and Technical Booklet E covers fire safety. There is therefore no notification or self-certification requirement for domestic electrical work in Northern Ireland under the building regulations. Work should still be designed, installed, inspected and tested to BS 7671, and other duties such as landlord obligations apply separately.',
  },
  {
    question: 'Can a homeowner do their own Part P electrical work?',
    answer:
      'Part P applies to the work, not to the person, so a homeowner may carry out electrical work in their own home provided it complies. If the work is not notifiable, no notification is required. If it is notifiable — a new circuit, a consumer unit replacement, or an addition or alteration to an existing circuit in a special location — an unregistered person must either appoint a registered third-party certifier before starting or notify a building control body before starting. Consumer unit replacement in particular requires full inspection and testing to BS 7671 and an Electrical Installation Certificate.',
  },
  {
    question: 'How do I certify Part P work that was already done?',
    answer:
      'Retrospective certification runs through regulation 18 of the Building Regulations 2010, which lets a local authority issue a regularisation certificate for unauthorised building work carried out on or after 11 November 1985. Apply to the local authority, which will decide what needs to be exposed, inspected or tested. An electrician can support the application with inspection and test results — an Electrical Installation Certificate where the work is identifiable and can be verified, or an EICR covering the installation as found. A competent person scheme cannot retrospectively self-certify work carried out by someone else.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/niceic-vs-napit-comparison',
    title: 'NICEIC vs NAPIT Comparison',
    description:
      'Compare the main Part P competent person schemes — costs, assessments, and which to choose.',
    icon: Scale,
    category: 'Guide',
  },
  {
    href: '/select-electrical-registration',
    title: 'SELECT Electrical Registration Scotland',
    description:
      'The Scottish equivalent of Part P — building standards, warrants and SELECT explained.',
    icon: MapPin,
    category: 'Guide',
  },
  {
    href: '/eca-membership-guide',
    title: 'ECA Membership Guide',
    description:
      'The ECA trade body — technical helpline, legal support, and lobbying for UK contractors.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Landlord electrical safety requirements, compliance deadlines, and penalties.',
    icon: ShieldCheck,
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
    id: 'notifiable-work',
    heading: 'What Electrical Work Is Notifiable Under Part P?',
    content: (
      <>
        <p>
          In England the notifiable list is short, and it is set out in regulation 12(6A) of the
          Building Regulations 2010 — not in an approved document. Three things are notifiable:
        </p>
        <div className={CARD}>
          <ol className="space-y-3 text-white">
            <li className="text-sm">
              <strong>1.</strong> The installation of a new circuit.
            </li>
            <li className="text-sm">
              <strong>2.</strong> The replacement of a consumer unit.
            </li>
            <li className="text-sm">
              <strong>3.</strong> Any addition or alteration to existing circuits in a special
              location.
            </li>
          </ol>
          <p className="mt-4 text-sm text-white">
            Everything else is not notifiable. Approved Document P puts it plainly at paragraph 2.7:
            all other electrical installation work is not notifiable — namely additions and
            alterations to existing installations outside special locations, and replacements,
            repairs and maintenance anywhere.
          </p>
        </div>

        <h3 className="pt-2 text-base font-semibold text-white">
          England cut the list on 6 April 2013. Wales did not.
        </h3>
        <p>
          The 2013 edition of Approved Document P reduced the range of notifiable work in England.
          Wales kept the earlier regime and still publishes the 2006 edition of Approved Document P
          incorporating the 2010 amendments, in which work is notifiable unless it appears on an
          exemption list. That divergence is the single biggest source of confusion on Part P, and
          it matters on every job near the border.
        </p>

        <div className={TABLE_WRAP}>
          <table className={TABLE}>
            <thead>
              <tr>
                <th className={TH}>Work</th>
                <th className={TH}>England</th>
                <th className={TH}>Wales</th>
              </tr>
            </thead>
            <tbody>
              <tr className={TR}>
                <td className={TD}>New circuit, anywhere in the dwelling</td>
                <td className={TD}>Notifiable</td>
                <td className={TD}>Notifiable</td>
              </tr>
              <tr className={TR}>
                <td className={TD}>Consumer unit replacement</td>
                <td className={TD}>Notifiable</td>
                <td className={TD}>Notifiable</td>
              </tr>
              <tr className={TR}>
                <td className={TD}>
                  Addition or alteration to an existing circuit in a special location
                </td>
                <td className={TD}>Notifiable</td>
                <td className={TD}>Notifiable</td>
              </tr>
              <tr className={TR}>
                <td className={TD}>
                  Extra socket or lighting point on an existing kitchen circuit
                </td>
                <td className={TD}>Not notifiable</td>
                <td className={TD}>Notifiable</td>
              </tr>
              <tr className={TR}>
                <td className={TD}>
                  Outdoor lighting or power, garden and outbuilding wiring on an existing circuit
                </td>
                <td className={TD}>Not notifiable</td>
                <td className={TD}>
                  Notifiable — outdoor lighting or power is a special installation
                </td>
              </tr>
              <tr className={TR}>
                <td className={TD}>
                  Electric floor or ceiling heating, solar PV, microCHP, extra-low voltage lighting
                  installations
                </td>
                <td className={TD}>Not notifiable unless a new circuit is involved</td>
                <td className={TD}>Notifiable — listed as special installations</td>
              </tr>
              <tr className={TR}>
                <td className={TD}>
                  Extra socket or lighting point on an existing circuit elsewhere in the dwelling
                </td>
                <td className={TD}>Not notifiable</td>
                <td className={TD}>Not notifiable</td>
              </tr>
              <tr className={TR}>
                <td className={TD}>
                  Replacing an accessory with no new fixed cabling; repairs and maintenance
                </td>
                <td className={TD}>Not notifiable</td>
                <td className={TD}>Not notifiable</td>
              </tr>
              <tr className={TR}>
                <td className={TD}>Installing or upgrading main or supplementary bonding</td>
                <td className={TD}>Not notifiable</td>
                <td className={TD}>Not notifiable</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-white">
          Sources: regulation 12(6A) of the Building Regulations 2010 and Approved Document P 2013
          edition (England); Approved Document P 2006 edition incorporating 2010 amendments, Tables
          1 and 2 (Wales).
        </p>

        <h3 className="pt-2 text-base font-semibold text-white">Two traps worth remembering</h3>
        <div className={CARD}>
          <div className={STACK}>
            <div>
              <p className={TERM}>Fixed equipment is in scope even on a 13 A plug</p>
              <p className={DEF}>
                Installing fixed electrical equipment is within the scope of Part P even where the
                final connection is a standard 13 A plug and socket. It is only notifiable if it
                involves work on the regulation 12(6A) list. Approved Document P gives the worked
                example: a built-in cooker is not notifiable unless a new cooker circuit is needed,
                and connecting an electric gate to an existing isolator is not notifiable, but
                installing the new circuit up to that isolator is.
              </p>
            </div>
            <div className="border-t border-white/[0.1] pt-4">
              <p className={TERM}>Not notifiable does not mean not certificated</p>
              <p className={DEF}>
                Non-notifiable work still has to comply with Part P and should be designed,
                installed, inspected, tested and certificated to BS 7671 (Approved Document P,
                paragraph 3.13). Local authorities can take enforcement action if non-notifiable
                work is found to be unsafe and non-compliant.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'special-location',
    heading: 'What Counts as a Special Location',
    content: (
      <>
        <p>
          This is the term that decides whether a small job is notifiable, and it has a statutory
          definition that is narrower than most people assume. In England a special location is a
          measured <em>space</em>, not the whole bathroom.
        </p>
        <div className={TABLE_WRAP}>
          <table className={TABLE}>
            <thead>
              <tr>
                <th className={TH}>Boundary</th>
                <th className={TH}>Extent (England, regulation 12(9))</th>
              </tr>
            </thead>
            <tbody>
              <tr className={TR}>
                <td className={TD}>Vertical</td>
                <td className={TD}>
                  Finished floor level up to 2.25 m — or up to the shower head where it is fixed to
                  a wall or ceiling higher than 2.25 m
                </td>
              </tr>
              <tr className={TR}>
                <td className={TD}>Horizontal, with a bath tub or shower tray</td>
                <td className={TD}>0.6 m from the edge of the bath tub or shower tray</td>
              </tr>
              <tr className={TR}>
                <td className={TD}>Horizontal, no bath tub or shower tray</td>
                <td className={TD}>
                  1.2 m from the centre point of the shower head where it is attached to the wall or
                  ceiling
                </td>
              </tr>
              <tr className={TR}>
                <td className={TD}>Whole room</td>
                <td className={TD}>A room containing a swimming pool or a sauna heater</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={CARD}>
          <div className={STACK}>
            <div>
              <p className={TERM}>Wales uses a list, not a measurement</p>
              <p className={DEF}>
                The Welsh approved document lists special locations as locations containing a bath
                tub or shower basin, swimming pools or paddling pools, and hot air saunas — the
                whole location, not a measured envelope. It then adds special installations:
                electric floor or ceiling heating systems, outdoor lighting or power installations,
                solar photovoltaic power supply systems, small scale generators such as microCHP
                units, and extra-low voltage lighting installations other than pre-assembled
                lighting sets.
              </p>
            </div>
            <div className="border-t border-white/[0.1] pt-4">
              <p className={TERM}>The statutory special location is not a BS 7671 zone</p>
              <p className={DEF}>
                BS 7671 Section 701 defines zones 0, 1 and 2 for the purpose of selecting and
                erecting equipment. The building regulations special location is a separate,
                differently measured definition used only to decide whether the work is notifiable.
                Use Section 701 to design the circuit and{' '}
                <SEOInternalLink href="/guides/bathroom-electrical-zones-bs7671">
                  the bathroom zone guide
                </SEOInternalLink>{' '}
                for the detail; use regulation 12(9) to decide whether to notify.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'certification-routes',
    heading: 'The Three Certification Routes',
    content: (
      <>
        <p>
          Approved Document P, paragraph 3.1: for notifiable electrical installation work, one of
          three procedures must be used to certify that the work complies with the Building
          Regulations. Only the first avoids a building control charge and a wait.
        </p>
        <div className={TABLE_WRAP}>
          <table className={TABLE}>
            <thead>
              <tr>
                <th className={TH}>Route</th>
                <th className={TH}>When you notify</th>
                <th className={TH}>What the homeowner gets</th>
              </tr>
            </thead>
            <tbody>
              <tr className={TR}>
                <td className={TD}>
                  <strong>Self-certification</strong> by a registered competent person
                </td>
                <td className={TD}>No prior notice. Notify your scheme after completion.</td>
                <td className={TD}>
                  BS 7671 certificate from the installer, plus a Building Regulations compliance
                  certificate from the installer or the registration body within 30 days of
                  completion — a copy of which also goes to the building control body
                </td>
              </tr>
              <tr className={TR}>
                <td className={TD}>
                  <strong>Registered third-party certifier</strong>
                </td>
                <td className={TD}>
                  Appoint the certifier <strong>before work begins</strong>; notify them within 5
                  days of completing the work
                </td>
                <td className={TD}>
                  An electrical installation condition report from the certifier, plus a compliance
                  certificate from the certifier&rsquo;s registration body within 30 days of a
                  satisfactory report
                </td>
              </tr>
              <tr className={TR}>
                <td className={TD}>
                  <strong>Building control body</strong>
                </td>
                <td className={TD}>
                  <strong>Before work begins</strong>
                </td>
                <td className={TD}>
                  A completion certificate from the local authority, or a final certificate from an
                  approved inspector
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-white">
          Source: Approved Document P 2013 edition, paragraphs 3.1 to 3.12.
        </p>

        <h3 className="pt-2 text-base font-semibold text-white">
          Which BS 7671 certificate goes with the job
        </h3>
        <p>
          The Building Regulations compliance certificate is a separate document from the BS 7671
          certificate. You issue both. Regulation 644.4.201 of BS 7671:2018+A4:2026 sets the
          boundary: where the work does not include the provision of a new circuit or the
          replacement of a distribution board or consumer unit, a Minor Electrical Installation
          Works Certificate may be provided for each circuit added to or altered, as an alternative
          to an Electrical Installation Certificate.
        </p>
        <div className={CARD}>
          <div className={STACK}>
            <div>
              <p className={TERM}>New circuit or consumer unit replacement</p>
              <p className={DEF}>
                Electrical Installation Certificate, with the Schedule of Inspections and the
                Schedule of Circuit Details and Test Results. A Minor Works Certificate is not
                permitted for either.
              </p>
            </div>
            <div className="border-t border-white/[0.1] pt-4">
              <p className={TERM}>Addition or alteration to an existing circuit</p>
              <p className={DEF}>
                Minor Electrical Installation Works Certificate, one per circuit added to or
                altered. This is the usual certificate for notifiable work in a special location
                that does not need a new circuit.
              </p>
            </div>
            <div className="border-t border-white/[0.1] pt-4">
              <p className={TERM}>Consumer unit replacement — check AFDDs before you quote</p>
              <p className={DEF}>
                Regulation 421.1.7 of BS 7671:2018+A4:2026 requires arc fault detection devices
                conforming to BS EN 62606 on single-phase AC final circuits supplying socket-outlets
                rated at not more than 32 A in high rise residential buildings, houses in multiple
                occupation, purpose-built student accommodation and care homes. For all other
                premises, including ordinary dwellings, AFDDs are recommended rather than required
                on those circuits. A note to the regulation takes high rise residential buildings as
                being over 18 m in height or more than six storeys, whichever is met first — so a
                board change in a converted house in multiple occupation is a different job from a
                board change in a semi.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'what-is-part-p',
    heading: 'What Part P Actually Says',
    content: (
      <>
        <p>
          Part P is one short requirement in Schedule 1 to the Building Regulations 2010. It has
          applied to work started on or after 1 January 2005, introduced by the Building (Amendment)
          (No. 3) Regulations 2004. Requirement P1, Design and installation, reads:
        </p>
        <div className={CARD}>
          <p className="text-sm text-white">
            &ldquo;Reasonable provision shall be made in the design and installation of electrical
            installations in order to protect persons operating, maintaining or altering the
            installations from fire or injury.&rdquo;
          </p>
        </div>
        <p>
          Note what it does not say. It sets no numbers, names no standard and says nothing about
          notification — those come from elsewhere. BS 7671 is the accepted means of meeting it, and
          competent person schemes require work to be carried out to the current edition, now BS
          7671:2018+A4:2026.
        </p>

        <h3 className="pt-2 text-base font-semibold text-white">Where Part P reaches</h3>
        <p>
          The limits on application in Schedule 1 restrict Part P to low or extra-low voltage
          installations that are:
        </p>
        <div className={CARD}>
          <ul className="space-y-3 text-sm text-white">
            <li>in or attached to a dwelling;</li>
            <li>
              in the common parts of a building serving one or more dwellings, but excluding power
              supplies to lifts;
            </li>
            <li>
              in a building that receives its electricity from a source located within or shared
              with a dwelling; or
            </li>
            <li>
              in a garden, or in or on land associated with a building, where the electricity is
              from a source located within or shared with a dwelling.
            </li>
          </ul>
        </div>
        <p>
          That last pair is why a shop or public house below a flat can fall inside Part P when it
          shares the dwelling&rsquo;s meter, and why sheds, detached garages and domestic
          greenhouses sharing the house supply are in scope even though they are otherwise exempt
          buildings. It is also why Part P covers fixed installations only — the Building
          Regulations define an electrical installation as fixed electrical cables or fixed
          electrical equipment on the consumer&rsquo;s side of the electricity supply meter, so
          portable appliances are outside it.
        </p>
      </>
    ),
  },
  {
    id: 'consequences',
    heading: 'Work Done Without Certification',
    content: (
      <>
        <p>
          Notifiable work carried out with neither self-certification, third-party certification nor
          a building control notification is unauthorised building work. There is a statutory way
          back, and it is worth knowing before a conveyancing solicitor asks.
        </p>
        <div className={CARD}>
          <div className={STACK}>
            <div>
              <p className={TERM}>The fix is a regularisation certificate</p>
              <p className={DEF}>
                Regulation 18 of the Building Regulations 2010 lets a local authority issue a
                regularisation certificate for unauthorised building work carried out on or after 11
                November 1985. The owner applies to the local authority, which decides what needs to
                be exposed, inspected or tested before it can certify. Inspection and test results
                from an electrician support the application; they do not replace it. No competent
                person scheme can retrospectively self-certify someone else&rsquo;s work.
              </p>
            </div>
            <div className="border-t border-white/[0.1] pt-4">
              <p className={TERM}>Property sale</p>
              <p className={DEF}>
                Conveyancing enquiries ask for building regulations evidence for notifiable work.
                Missing paperwork typically leads to a regularisation application, an indemnity
                policy, a price adjustment, or all three — and to delay while it is sorted out.
              </p>
            </div>
            <div className="border-t border-white/[0.1] pt-4">
              <p className={TERM}>Enforcement</p>
              <p className={DEF}>
                Local authorities have enforcement powers over non-compliant work, and Approved
                Document P confirms they can act even where the work was not notifiable, if it is
                found to be unsafe and non-compliant.
              </p>
            </div>
            <div className="border-t border-white/[0.1] pt-4">
              <p className={TERM}>Liability</p>
              <p className={DEF}>
                For the electrician, the practical exposure is evidential. Without certification and
                test results, demonstrating afterwards that the installation was designed, installed
                and verified properly is far harder — which matters if the installation is later
                implicated in a fire or an injury.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'scotland-ni',
    heading: 'Scotland and Northern Ireland',
    content: (
      <>
        <p>
          Part P is an England and Wales instrument. Neither of the other two nations has anything
          that maps onto it directly, and one of them has no building regulations electrical
          requirement at all.
        </p>
        <div className={CARD}>
          <div className={STACK}>
            <div>
              <p className={TERM}>Scotland — a warrant, not a notification</p>
              <p className={DEF}>
                Electrical safety is standard 4.5 of Schedule 5 to the Building (Scotland)
                Regulations 2004: every building must be designed and constructed in such a way that
                the electrical installation does not threaten the health and safety of the people in
                and around the building, and does not become a source of fire. Standard 4.6 adds a
                requirement for lighting points and socket outlets in domestic buildings. Control is
                exercised through the building warrant system rather than a notifiable-work list —
                Schedule 3 to those regulations exempts limited categories such as extra-low voltage
                installations. Self-certification is by an Approved Certifier of Construction under
                the certification of construction scheme for electrical installations, for which{' '}
                <SEOInternalLink href="/select-electrical-registration">SELECT</SEOInternalLink> is
                the principal scheme provider.
              </p>
            </div>
            <div className="border-t border-white/[0.1] pt-4">
              <p className={TERM}>Northern Ireland — no electrical Part</p>
              <p className={DEF}>
                The Building Regulations (Northern Ireland) 2012 contain no Part covering electrical
                safety. Part P there is Sanitary appliances, unvented hot water storage systems and
                reducing the risk of scalding, and Technical Booklet E covers fire safety. There is
                consequently no building regulations notification or self-certification requirement
                for domestic electrical work in Northern Ireland. Installations should still be
                designed, installed, inspected and tested to BS 7671, and separate duties — landlord
                obligations, health and safety law, scheme membership required by a client — still
                apply.
              </p>
            </div>
            <div className="border-t border-white/[0.1] pt-4">
              <p className={TERM}>Wales — same requirement, different notifiable list</p>
              <p className={DEF}>
                Requirement P1 is identical in Wales. What differs is what has to be notified: Wales
                runs the 2006 edition of Approved Document P incorporating the 2010 amendments, so
                the wider pre-2013 list still applies. See the comparison table above.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'scheme-comparison',
    heading: 'Choosing a Competent Person Scheme',
    content: (
      <>
        <p>
          A competent person scheme is not a badge — it is a legal mechanism. Schedule 3 to the
          Building Regulations 2010 pairs a description of work with the bodies whose registered
          members may self-certify it. For paragraph 8, installation of fixed low or extra-low
          voltage electrical installations in dwellings, the bodies currently named are:
        </p>
        <div className={TABLE_WRAP}>
          <table className={TABLE}>
            <thead>
              <tr>
                <th className={TH}>Body named in Schedule 3</th>
                <th className={TH}>Trades as</th>
                <th className={TH}>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr className={TR}>
                <td className={TD}>Certsure LLP</td>
                <td className={TD}>NICEIC</td>
                <td className={TD}>
                  The most recognisable brand with domestic customers; several registration tiers
                </td>
              </tr>
              <tr className={TR}>
                <td className={TD}>NAPIT Registration Limited</td>
                <td className={TD}>NAPIT</td>
                <td className={TD}>
                  Multi-discipline — also named for heating, ventilation, plumbing and
                  microgeneration work
                </td>
              </tr>
              <tr className={TR}>
                <td className={TD}>Blue Flame Certification Limited</td>
                <td className={TD}>Blue Flame Certification</td>
                <td className={TD}>Smaller operator, also named across the heating schedules</td>
              </tr>
              <tr className={TR}>
                <td className={TD}>Oil Firing Technical Association Limited</td>
                <td className={TD}>OFTEC</td>
                <td className={TD}>
                  Primarily oil-firing; named for electrical work in dwellings as well
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-white">
          A separate entry, paragraph 9, covers electrical work in dwellings carried out as a
          necessary adjunct to other work by the registered person — that one also names the
          Association of Plumbing and Heating Contractors (Certification) Limited.
        </p>
        <div className={CARD}>
          <div className={STACK}>
            <div>
              <p className={TERM}>Check the schedule, not a list you were sent</p>
              <p className={DEF}>
                Schedule 3 is amended regularly, and operators have been added and removed. ELECSA
                and Stroma are no longer named in it for electrical work in dwellings, so treat any
                older comparison list as out of date and confirm against the current schedule before
                you register.
              </p>
            </div>
            <div className="border-t border-white/[0.1] pt-4">
              <p className={TERM}>Pick on scope and assessment, not on logo recognition</p>
              <p className={DEF}>
                All the bodies above carry the same legal weight for self-certification. The real
                differences are annual cost, assessment style, how much non-electrical work you can
                also certify, and what the technical support is like when you are stuck on site. The{' '}
                <SEOInternalLink href="/niceic-vs-napit-comparison">
                  NICEIC vs NAPIT comparison
                </SEOInternalLink>{' '}
                goes through those in detail.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Getting the Paperwork Out the Same Day',
    content: (
      <>
        <p>
          The Building Regulations compliance certificate is your scheme&rsquo;s job; the BS 7671
          certificate is yours, and it is the one that holds jobs up. Elec-Mate builds Electrical
          Installation Certificates, Minor Works Certificates and EICRs on site and emails the PDF
          to the client before you have packed the van.
        </p>
        <SEOAppBridge
          title="Issue the BS 7671 certificate before you leave site"
          description="Electrical Installation Certificates, Minor Works Certificates and EICRs on your phone, with AI board scanning and automatic BS 7671 validation. Start free."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function PartPSelfCertificationPage() {
  return (
    <GuideTemplate
      title="Part P Certificate: What Is Notifiable (UK 2026)"
      description="Part P certificate explained: the three notifiable jobs in England, why Wales differs, the three certification routes, and which certificate to issue."
      datePublished="2026-03-27"
      dateModified="2026-08-07"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Building Regulations Guide"
      badgeIcon={BookOpen}
      heroTitle={
        <>
          Part P Self-Certification:{' '}
          <span className="text-elec-yellow">Competent Person Scheme Guide UK</span>
        </>
      }
      heroSubtitle="What is notifiable under Part P in England and Wales, the three routes to certifying it, which BS 7671 certificate goes with each job, and how Scotland and Northern Ireland differ."
      answerBox={{
        question: 'What electrical work is notifiable under Part P?',
        answer:
          'In England, regulation 12(6A) of the Building Regulations 2010 makes three things notifiable: installing a new circuit, replacing a consumer unit, and any addition or alteration to an existing circuit in a special location. All other domestic electrical work is not notifiable.',
        detail:
          'Wales still uses the wider pre-2013 list, in which kitchens, outdoor lighting and power, electric underfloor heating and solar PV are also notifiable. Notifiable work must be certified by a registered competent person, a registered third-party certifier, or a building control body.',
      }}
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Part P Self-Certification"
      relatedPages={relatedPages}
      ctaHeading="Generate BS 7671 Certificates on Your Phone"
      ctaSubheading="Complete Electrical Installation Certificates, Minor Works Certificates, and EICRs on site with Elec-Mate. Instant PDF generation, automatic client delivery, and scheme-compliant documentation. 7-day free trial."
    />
  );
}
