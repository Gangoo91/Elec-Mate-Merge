import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import { PoundSterling, Calculator, Building2, FileCheck2 } from 'lucide-react';

// -------------------------------------------------------------------
// Shared presentation classes
// -------------------------------------------------------------------

const cardCn =
  '-mx-4 my-5 rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] ' +
  'to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5';

const tableWrapCn =
  '-mx-4 my-5 overflow-x-auto rounded-none border-y border-white/[0.14] ' +
  'bg-gradient-to-b from-white/[0.08] to-white/[0.04] sm:mx-0 sm:rounded-2xl sm:border-x';

const tableCn = 'w-full min-w-[560px] border-collapse text-left text-[13.5px] text-white';
const thCn = 'px-4 py-3 font-semibold text-white align-bottom';
const tdCn = 'px-4 py-3 text-white align-top';
const trCn = 'border-t border-white/[0.1]';

const subCn = 'mt-7 mb-2 text-[15px] font-semibold tracking-tight text-white';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Commercial Rewire Cost', href: '/guides/commercial-rewire-cost' },
];

const tocItems = [
  { id: 'overview', label: 'What a Commercial Rewire Involves' },
  { id: 'cost-per-m2', label: 'Cost Per Square Metre' },
  { id: 'three-phase', label: '3-Phase Supply and Distribution' },
  { id: 'containment', label: 'Containment and Cable Management' },
  { id: 'data-fire-emergency', label: 'Data, Fire Alarm and Emergency Lighting' },
  { id: 'factors', label: 'Factors Affecting Price' },
  { id: 'regulations', label: 'Regulations and Certification' },
  { id: 'for-electricians', label: 'For Electricians: Quoting Commercial Rewires' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Commercial rewire costs in the UK typically range from £30 to £80 per square metre depending on specification, building complexity, and the scope of ancillary systems such as fire alarm and emergency lighting.',
  'Three-phase distribution is standard in commercial premises. A new 3-phase distribution board with MCCB incomer costs £2,000 to £6,000 depending on the number of ways and rating.',
  'Containment (cable tray, trunking, conduit) often accounts for 25% to 40% of the total rewire cost in commercial buildings — significantly more than domestic work.',
  'Fire alarm systems to BS 5839-1:2025 and emergency lighting to BS 5266-1:2025 are typically included in the scope. BS 7671 Regulations 560.9 and 560.10 require compliance with those standards.',
  'An Electrical Installation Certificate (EIC) must be issued on completion under Regulation 644.1, issued by those responsible for design, construction and verification.',
];

const faqs = [
  {
    question: 'How much does a commercial rewire cost per square metre in 2026?',
    answer:
      'Commercial rewire costs typically range from £30 to £80 per square metre in 2026. A basic office refurbishment with standard power and lighting might sit at £30 to £45 per square metre, whilst a high-specification fit-out with 3-phase distribution, structured data cabling, fire alarm, emergency lighting, and BMS integration can reach £60 to £80 per square metre or more. These figures include containment, cabling, distribution, final circuits, and basic commissioning but typically exclude specialist systems such as access control or CCTV unless specified.',
  },
  {
    question: 'Does a commercial rewire need a 3-phase supply?',
    answer:
      'Most commercial premises already have a 3-phase supply, and a commercial rewire will typically involve 3-phase distribution. Even smaller commercial units such as retail shops or restaurants often have a 3-phase incoming supply. If the existing supply is single-phase and the load assessment shows it is inadequate, an application to the DNO for a 3-phase supply upgrade will be required — this can take 8 to 12 weeks and costs £1,500 to £5,000 depending on the work the DNO needs to carry out.',
  },
  {
    question: 'What containment systems are used in commercial rewires?',
    answer:
      'Commercial rewires use a combination of cable tray, cable basket, steel trunking, PVC trunking, and steel conduit. Cable tray and basket are used for primary distribution routes above suspended ceilings. Dado trunking provides power and data outlets at desk height in offices. Steel conduit is used in exposed or industrial areas. The choice depends on the building type, fire rating requirements, aesthetic considerations, and budget. Containment typically accounts for 25% to 40% of the total electrical installation cost.',
  },
  {
    question: 'Is fire alarm installation included in a commercial rewire?',
    answer:
      'Fire alarm installation is frequently included in the scope of a commercial rewire, particularly where the existing system is being replaced or the building use is changing. BS 7671 Regulation 560.10 requires fire detection and fire alarm systems to comply with the relevant parts of the BS 5839 series — for non-domestic buildings that is BS 5839-1:2025. The system category (M, L1 to L5, or the property-protection categories P1 and P2) follows from the fire risk assessment and the building use. A typical Category L2 installation in a 500 square metre office costs £3,000 to £8,000 for detection, sounders, interface units, and a conventional or addressable panel.',
  },
  {
    question: 'What certification is required for a commercial rewire?',
    answer:
      'An Electrical Installation Certificate (EIC) must be issued on completion under Regulation 644.1 of BS 7671:2018+A4:2026, based on the model in Appendix 6. Regulation 644.4 requires the persons responsible for the design, construction and verification of the installation to issue it, taking account of their respective responsibilities, and to record the recommended interval to the first periodic inspection. Regulation 644.3 requires Schedules of Inspection plus Schedules of Circuit Details and Test Results. Part P notification does not apply to commercial premises, but the installation must still comply with the Building Regulations and the Electricity at Work Regulations 1989. Separate commissioning certificates are required for fire alarm and emergency lighting systems.',
  },
  {
    question: 'How long does a commercial rewire take?',
    answer:
      'A commercial rewire duration depends heavily on the floor area, specification level, and whether the building is occupied during the works. A 200 square metre office might take 2 to 3 weeks with a team of 2 to 3 electricians. A 1,000 square metre unit with full fire alarm, emergency lighting, and data cabling could take 6 to 10 weeks. Phased rewires in occupied buildings take longer due to out-of-hours working and the need to maintain power to operational areas. Always build a realistic programme with the client before starting.',
  },
  {
    question: 'Do I need asbestos checks before a commercial rewire?',
    answer:
      'Yes. Any commercial building built or refurbished before the UK ban took full effect in 1999 may contain asbestos in ceiling tiles, floor tiles, pipe lagging, or cable containment. Regulation 4 of the Control of Asbestos Regulations 2012 places a duty to manage asbestos on the person responsible for maintenance of non-domestic premises, including taking reasonable steps to find out whether asbestos is present. Regulation 5 requires a suitable and sufficient assessment identifying asbestos before any work liable to disturb it begins. As an electrical contractor you must not disturb any material that may contain asbestos without that information — in practice, a management survey or a refurbishment/demolition survey. If asbestos is found, it must be dealt with before electrical work proceeds in that area.',
  },
  {
    question: 'What is the difference between a Cat A and a Cat B commercial fit-out?',
    answer:
      'Cat A and Cat B describe the fit-out stage, not the cabling. A Cat A fit-out delivers the base build ready to let: distribution boards, containment routes, general lighting, fire alarm, emergency lighting and floor boxes. A Cat B fit-out adds the tenant-specific wiring — workstation power and data, meeting rooms, kitchens, feature lighting and specialist areas. These are separate from data cable categories such as Cat 5e, Cat 6 and Cat 6A, which describe the balanced twisted-pair cabling itself. BS 7671:2018+A4:2026 now names those categories directly: Regulation 716.521.101 lists Category 5, 6, 6A, 7, 7A, 8.1 and 8.2 cabling for the distribution of DC power over data cabling.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/rewire-cost-uk',
    title: 'Domestic Rewire Cost UK 2026',
    description: 'Full house rewire costs for comparison with commercial rates.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/guides/warehouse-lighting-cost',
    title: 'Warehouse Lighting Cost',
    description: 'High bay LED lighting installation costs for industrial premises.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Complete Electrical Installation Certificates on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description:
      'Quote commercial rewires with itemised materials, labour, and professional PDF output.',
    icon: Calculator,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'What a Commercial Rewire Involves',
    content: (
      <>
        <p>
          A commercial rewire is a fundamentally different undertaking to a domestic rewire. The
          scale of distribution, the containment requirements, the regulatory framework, and the
          ancillary systems involved — fire alarm, emergency lighting, data infrastructure — mean
          that commercial electrical projects demand a different approach to pricing and project
          management.
        </p>
        <p>
          Commercial rewires typically involve replacing the entire electrical installation from the
          incoming supply through to final circuits. This includes 3-phase distribution boards,
          sub-distribution, containment systems (cable tray, trunking, conduit), power circuits,
          lighting circuits, small power, and often fire alarm and emergency lighting systems.
        </p>
        <p>
          Whether you are a building owner planning a refurbishment, a project manager tendering the
          electrical package, or an electrical contractor pricing a commercial rewire, this guide
          gives realistic per-square-metre costs alongside the BS 7671 requirements that drive them.
        </p>
        <p className="mt-2 border-l-2 border-elec-yellow/50 pl-3 text-sm text-white">
          Written by a qualified electrician. Regulation references verified against
          BS 7671:2018+A4:2026.
        </p>
      </>
    ),
  },
  {
    id: 'cost-per-m2',
    heading: 'Cost Per Square Metre',
    content: (
      <>
        <p>
          Commercial electrical installations are priced per square metre of gross internal floor
          area. Three specification bands cover most jobs.
        </p>

        <h3 className={subCn}>Per square metre rates, 2026</h3>
        <p className="text-sm text-white">
          Indicative UK market guidance, not a quote. Rates cover supply, install, test and
          certification.
        </p>
        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr className={trCn}>
                <th className={thCn}>Specification</th>
                <th className={thCn}>Rate</th>
                <th className={thCn}>What it buys</th>
              </tr>
            </thead>
            <tbody>
              <tr className={trCn}>
                <td className={`${tdCn} font-semibold whitespace-nowrap`}>Basic</td>
                <td className={`${tdCn} font-semibold whitespace-nowrap`}>£30–£45/m²</td>
                <td className={tdCn}>
                  Power, lighting and basic containment. No fire alarm or emergency lighting in
                  scope. Single distribution board replacement. Suits refurbishments under 300m².
                </td>
              </tr>
              <tr className={trCn}>
                <td className={`${tdCn} font-semibold whitespace-nowrap`}>
                  Mid
                  <span className="mt-1 block text-xs font-semibold text-elec-yellow">
                    Most common
                  </span>
                </td>
                <td className={`${tdCn} font-semibold whitespace-nowrap`}>£45–£60/m²</td>
                <td className={tdCn}>
                  3-phase distribution, sub-distribution boards, structured data cabling, fire alarm
                  (Category L2 to BS 5839-1), emergency lighting to BS 5266-1, and dado or floor-box
                  containment.
                </td>
              </tr>
              <tr className={trCn}>
                <td className={`${tdCn} font-semibold whitespace-nowrap`}>High spec</td>
                <td className={`${tdCn} font-semibold whitespace-nowrap`}>£60–£80/m²</td>
                <td className={tdCn}>
                  MCCB panel board, multiple sub-distribution boards, high-density power and data,
                  addressable fire alarm, maintained emergency lighting, DALI lighting control, BMS
                  integration and UPS provisions. Corporate offices, medical centres, high-end
                  retail.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className={subCn}>Worked examples by floor area</h3>
        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr className={trCn}>
                <th className={thCn}>Floor area</th>
                <th className={thCn}>Specification</th>
                <th className={thCn}>Indicative cost</th>
              </tr>
            </thead>
            <tbody>
              <tr className={trCn}>
                <td className={`${tdCn} whitespace-nowrap`}>200m²</td>
                <td className={tdCn}>Basic office</td>
                <td className={`${tdCn} font-semibold whitespace-nowrap`}>£6,000–£9,000</td>
              </tr>
              <tr className={trCn}>
                <td className={`${tdCn} whitespace-nowrap`}>500m²</td>
                <td className={tdCn}>Mid spec</td>
                <td className={`${tdCn} font-semibold whitespace-nowrap`}>£22,500–£30,000</td>
              </tr>
              <tr className={trCn}>
                <td className={`${tdCn} whitespace-nowrap`}>1,000m²</td>
                <td className={tdCn}>High spec fit-out</td>
                <td className={`${tdCn} font-semibold whitespace-nowrap`}>£60,000–£80,000</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          These figures include materials, labour, containment, testing and certification. They
          exclude specialist systems such as access control or CCTV unless specifically scoped, and
          assume a vacant or partly occupied building. Treat a per-m² rate as the starting point for
          a measured estimate, never a fixed price — the factors further down this guide can move
          the rate by a factor of two.
        </p>
      </>
    ),
  },
  {
    id: 'three-phase',
    heading: '3-Phase Supply and Distribution',
    content: (
      <>
        <p>
          Almost all commercial premises operate on a 3-phase supply. The{' '}
          <SEOInternalLink href="/guides/distribution-board-wiring">
            distribution architecture
          </SEOInternalLink>{' '}
          is the backbone of the installation and must be designed to carry the assessed maximum
          demand with appropriate diversity applied.
        </p>

        <h3 className={subCn}>Distribution equipment — supply and install</h3>
        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr className={trCn}>
                <th className={thCn}>Item</th>
                <th className={thCn}>Cost</th>
                <th className={thCn}>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr className={trCn}>
                <td className={`${tdCn} font-semibold`}>3-phase main board (TPN)</td>
                <td className={`${tdCn} font-semibold whitespace-nowrap`}>£2,000–£6,000</td>
                <td className={tdCn}>
                  An 18-way TPN board with MCCB incomer is roughly £3,500 installed. The rate scales
                  with rating and number of ways.
                </td>
              </tr>
              <tr className={trCn}>
                <td className={`${tdCn} font-semibold`}>Sub-distribution board (each)</td>
                <td className={`${tdCn} font-semibold whitespace-nowrap`}>£800–£2,500</td>
                <td className={tdCn}>
                  Each floor or zone typically has its own board fed from the main board via a
                  submain cable.
                </td>
              </tr>
              <tr className={trCn}>
                <td className={`${tdCn} font-semibold`}>Submain cables (per metre)</td>
                <td className={`${tdCn} font-semibold whitespace-nowrap`}>£15–£60/m</td>
                <td className={tdCn}>
                  Depends on CSA. A 4-core 25mm² SWA floor submain is roughly £25/m installed
                  including containment and termination.
                </td>
              </tr>
              <tr className={trCn}>
                <td className={`${tdCn} font-semibold`}>Surge protection (SPD)</td>
                <td className={`${tdCn} font-semibold whitespace-nowrap`}>£150–£600</td>
                <td className={tdCn}>
                  Type 1+2 at the main board £300–£600 installed; Type 2 at sub-boards £150–£300
                  each. See the regulations section for when these are required.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className={subCn}>Phase balancing</h3>
        <p>
          The design should distribute single-phase loads evenly across the three phases to limit
          neutral current and voltage imbalance. This is verified during commissioning and recorded
          on the schedules that accompany the certificate.
        </p>

        <h3 className={subCn}>EV charging provision</h3>
        <p>
          Commercial fit-outs increasingly include EV charging. Section 722 of BS 7671:2018+A4:2026
          covers electric vehicle charging installations, and Regulation 722.311.201 states that
          load curtailment — load reduction or disconnection, either automatically or manually — may
          be taken into account when determining the maximum demand of the installation or part
          thereof. In practice that means several charge points can often be accommodated on the
          existing incoming supply where a suitable load management system is specified, avoiding a
          costly DNO supply upgrade. The regulation does not prescribe a calculation method, so the
          designer must document the curtailment assumptions behind the demand figure. Budget £800
          to £2,500 per charge point installed, plus the load management controller where multiple
          points are provided.
        </p>
      </>
    ),
  },
  {
    id: 'containment',
    heading: 'Containment and Cable Management',
    content: (
      <>
        <p>
          Containment is one of the biggest cost drivers in commercial electrical work. Unlike
          domestic installations, where cables are clipped or run in the building fabric, commercial
          work requires engineered containment routes that provide access, support and fire
          protection.
        </p>

        <h3 className={subCn}>Containment rates — installed</h3>
        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr className={trCn}>
                <th className={thCn}>Containment</th>
                <th className={thCn}>Rate</th>
                <th className={thCn}>Typical use</th>
              </tr>
            </thead>
            <tbody>
              <tr className={trCn}>
                <td className={`${tdCn} font-semibold`}>Cable tray</td>
                <td className={`${tdCn} font-semibold whitespace-nowrap`}>£8–£15/m</td>
                <td className={tdCn}>
                  Primary power distribution routes above suspended ceilings. Medium-duty tray is
                  the commercial default.
                </td>
              </tr>
              <tr className={trCn}>
                <td className={`${tdCn} font-semibold`}>Cable basket</td>
                <td className={`${tdCn} font-semibold whitespace-nowrap`}>£6–£12/m</td>
                <td className={tdCn}>Data cabling routes and lighter secondary distribution.</td>
              </tr>
              <tr className={trCn}>
                <td className={`${tdCn} font-semibold`}>Dado trunking</td>
                <td className={`${tdCn} font-semibold whitespace-nowrap`}>£12–£25/m</td>
                <td className={tdCn}>Power and data outlets at desk height in cellular offices.</td>
              </tr>
              <tr className={trCn}>
                <td className={`${tdCn} font-semibold`}>Floor boxes</td>
                <td className={`${tdCn} font-semibold whitespace-nowrap`}>£80–£200 each</td>
                <td className={tdCn}>
                  Open-plan areas fed from floor trunking or an access floor void.
                </td>
              </tr>
              <tr className={trCn}>
                <td className={`${tdCn} font-semibold`}>Steel conduit</td>
                <td className={`${tdCn} font-semibold whitespace-nowrap`}>£8–£18/m</td>
                <td className={tdCn}>
                  Exposed and industrial areas, and anywhere mechanical protection is needed.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Fire barriers must be reinstated wherever containment passes through a compartment wall or
          floor. Containment typically accounts for 25% to 40% of the total electrical installation
          cost in commercial buildings, and underestimating it is one of the most common causes of
          losses on commercial electrical contracts. Measure every route before you price anything
          else.
        </p>
      </>
    ),
  },
  {
    id: 'data-fire-emergency',
    heading: 'Data, Fire Alarm and Emergency Lighting',
    content: (
      <>
        <p>
          A commercial rewire scope frequently includes structured data cabling, fire alarm and
          emergency lighting. These usually sit with the electrical contractor even though each
          requires its own design competence and its own commissioning certificate.
        </p>

        <h3 className={subCn}>Ancillary system costs</h3>
        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr className={trCn}>
                <th className={thCn}>System</th>
                <th className={thCn}>Indicative cost</th>
                <th className={thCn}>Scope</th>
              </tr>
            </thead>
            <tbody>
              <tr className={trCn}>
                <td className={`${tdCn} font-semibold`}>Structured data cabling (Cat 6A)</td>
                <td className={`${tdCn} font-semibold whitespace-nowrap`}>£80–£150/point</td>
                <td className={tdCn}>
                  Includes patch-panel termination and testing. A typical desk needs 2 points. Fibre
                  backbone between comms rooms adds £500–£1,500 per link.
                </td>
              </tr>
              <tr className={trCn}>
                <td className={`${tdCn} font-semibold`}>
                  Fire alarm, BS 5839-1 (Category L2, addressable)
                </td>
                <td className={`${tdCn} font-semibold whitespace-nowrap`}>£6–£12/m²</td>
                <td className={tdCn}>
                  Detectors, manual call points, sounders, interface units and an addressable panel.
                  Category follows from the fire risk assessment.
                </td>
              </tr>
              <tr className={trCn}>
                <td className={`${tdCn} font-semibold`}>Emergency lighting, BS 5266-1</td>
                <td className={`${tdCn} font-semibold whitespace-nowrap`}>£3–£6/m²</td>
                <td className={tdCn}>
                  Maintained or non-maintained luminaires on escape routes, open areas and high-risk
                  task areas. 3-hour duration is the usual commercial specification.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          For a 500m² office, ancillary systems typically add £8,000 to £15,000 to the base
          electrical installation cost.
        </p>

        <h3 className={subCn}>Power over Ethernet is now in BS 7671</h3>
        <p>
          BS 7671:2018+A4:2026 introduced a new Section 716 covering the distribution of ELV DC
          power over balanced data cabling — PoE lighting, wireless access points, cameras and door
          controllers. If your scope includes any of those, the data cabling package is now partly a
          BS 7671 package. The headline requirements are:
        </p>
        <div className={cardCn}>
          <ul className="space-y-3 text-sm text-white">
            <li>
              <strong>Regulation 716.410.3.3</strong> — the protective measure extra-low voltage
              provided by SELV or PELV shall be applied.
            </li>
            <li>
              <strong>Regulation 716.521.101</strong> — ICT cables used to distribute DC power shall
              comply with Category 5, 6, 6A, 7, 7A, 8.1 or 8.2, or other cables defined in
              BS EN 50173-1.
            </li>
            <li>
              <strong>Regulation 716.523.2.101</strong> — the design current in any conductor shall
              not exceed <strong>750 mA</strong>.
            </li>
            <li>
              <strong>Regulation 716.526.101</strong> — connecting hardware shall comply with
              BS ISO/IEC 11801-1 and support a continuous operating current of 750 mA per contact.
            </li>
          </ul>
        </div>
        <p>
          The practical cost impact is on connectors and on bundle planning: cheap patch panels that
          will not carry 750 mA per contact are no longer an acceptable saving on a PoE-fed
          installation.
        </p>
      </>
    ),
  },
  {
    id: 'factors',
    heading: 'Factors Affecting Commercial Rewire Price',
    content: (
      <>
        <p>
          The per-square-metre rate can vary by a factor of two or more depending on these
          variables.
        </p>
        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr className={trCn}>
                <th className={thCn}>Factor</th>
                <th className={thCn}>Effect on the rate</th>
              </tr>
            </thead>
            <tbody>
              <tr className={trCn}>
                <td className={`${tdCn} font-semibold`}>Building type and access</td>
                <td className={tdCn}>
                  A vacant shell with clear ceiling voids is far cheaper to wire than an occupied
                  building with limited access, asbestos risk and out-of-hours working.
                </td>
              </tr>
              <tr className={trCn}>
                <td className={`${tdCn} font-semibold`}>Specification density</td>
                <td className={tdCn}>
                  Outlet density varies hugely. A basic warehouse office might have one double
                  socket per 10m²; a trading floor might have four doubles per desk at 6m² per desk.
                </td>
              </tr>
              <tr className={trCn}>
                <td className={`${tdCn} font-semibold`}>Working-hours restrictions</td>
                <td className={tdCn}>
                  Occupied buildings may need evening and weekend working, adding 25% to 50% to
                  labour costs through overtime rates and reduced productivity.
                </td>
              </tr>
              <tr className={trCn}>
                <td className={`${tdCn} font-semibold`}>Asbestos and legacy services</td>
                <td className={tdCn}>
                  Pre-2000 buildings often contain asbestos. Removal or encapsulation is the
                  client&apos;s cost, but the programme delay lands on the electrical contractor.
                </td>
              </tr>
              <tr className={trCn}>
                <td className={`${tdCn} font-semibold`}>Location</td>
                <td className={tdCn}>
                  London rates run 20% to 40% above regional rates on labour, parking, congestion
                  charge and site-access restrictions.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Regulations and Certification',
    content: (
      <>
        <p>
          Commercial installations must comply with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A4:2026
          </SEOInternalLink>{' '}
          and the Electricity at Work Regulations 1989. Part P of the Building Regulations does not
          apply to commercial premises, but the installation must still satisfy the relevant parts
          of the Building Regulations, particularly Part B (fire safety). These are the regulations
          that change what a commercial rewire costs.
        </p>

        <h3 className={subCn}>Quick reference — BS 7671:2018+A4:2026</h3>
        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr className={trCn}>
                <th className={thCn}>Regulation</th>
                <th className={thCn}>What it means on a commercial rewire</th>
              </tr>
            </thead>
            <tbody>
              <tr className={trCn}>
                <td className={`${tdCn} font-semibold whitespace-nowrap`}>443.4.1</td>
                <td className={tdCn}>
                  SPDs are the default. Omission depends on the owner declaring they are not
                  required.
                </td>
              </tr>
              <tr className={trCn}>
                <td className={`${tdCn} font-semibold whitespace-nowrap`}>534.4.4.2</td>
                <td className={tdCn}>
                  Protective distance over 10 m — consider additional coordinated SPDs closer to the
                  equipment.
                </td>
              </tr>
              <tr className={trCn}>
                <td className={`${tdCn} font-semibold whitespace-nowrap`}>411.3.3</td>
                <td className={tdCn}>
                  30 mA RCD on socket-outlets rated up to 32 A. A documented risk assessment can
                  disapply indent (b) only.
                </td>
              </tr>
              <tr className={trCn}>
                <td className={`${tdCn} font-semibold whitespace-nowrap`}>411.3.4</td>
                <td className={tdCn}>
                  RCD protection of lighting circuits is a domestic requirement — it does not apply
                  to commercial premises.
                </td>
              </tr>
              <tr className={trCn}>
                <td className={`${tdCn} font-semibold whitespace-nowrap`}>421.1.7</td>
                <td className={tdCn}>
                  AFDDs are recommended, not required, in offices, retail and industrial units.
                </td>
              </tr>
              <tr className={trCn}>
                <td className={`${tdCn} font-semibold whitespace-nowrap`}>560.9 / 560.10</td>
                <td className={tdCn}>
                  Emergency lighting to BS 5266-1; fire detection and alarm to the BS 5839 series.
                </td>
              </tr>
              <tr className={trCn}>
                <td className={`${tdCn} font-semibold whitespace-nowrap`}>644.1 / 644.4</td>
                <td className={tdCn}>
                  An EIC shall be issued on completion by those responsible for design, construction
                  and verification.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className={subCn}>Surge protection: Regulation 443.4.1</h3>
        <p>
          Regulation 443.4.1 requires protection against transient overvoltages where the
          consequence caused by the overvoltage could result in:
        </p>
        <div className={cardCn}>
          <ul className="space-y-2 text-sm text-white">
            <li>
              <strong>(a)</strong> serious injury to, or loss of, human life;
            </li>
            <li>
              <strong>(b)</strong> deleted by BS 7671:2018+A2:2022, Corrigendum (May 2023);
            </li>
            <li>
              <strong>(c)</strong> significant financial or data loss.
            </li>
          </ul>
          <p className="mt-3 text-sm leading-relaxed text-white">
            For all other cases, protection against transient overvoltages shall be provided unless
            the owner of the installation declares it is not required due to any loss or damage
            being tolerable and they accept the risk of damage to equipment and any consequential
            loss.
          </p>
        </div>
        <p>
          On commercial premises the &ldquo;significant financial or data loss&rdquo; limb is
          usually met outright, and even where it is not, the default position is that an SPD goes
          in. Price one unless the client puts the declaration in writing. Where SPDs are used they
          shall be selected and erected in accordance with Section 534. Regulation 534.4.4.2 adds a
          detail worth carrying into the design: if the protective distance between the SPD and the
          equipment it protects exceeds 10 metres, oscillations could lead to a voltage at the
          equipment terminals of up to twice the SPD&apos;s voltage protection level, so consider
          additional coordinated{' '}
          <SEOInternalLink href="/guides/spd-surge-protection">SPDs</SEOInternalLink> closer to the
          equipment or a device with a lower protection level. In a multi-storey office that means
          budgeting Type 2 units at each sub-distribution board, not just one at the origin.
        </p>

        <h3 className={subCn}>RCD protection: Regulations 411.3.3 and 411.3.4</h3>
        <p>
          Regulation 411.3.3 requires additional protection by a 30 mA RCD for socket-outlets rated
          up to 32 A. It has three indents: (a) socket-outlets in locations where they are liable to
          be used by persons of capability BA1 or children (BA2), (b) socket-outlets in other
          locations, and (c) mobile equipment up to 32 A for use outdoors. An exception is permitted
          to indent (b) — but not to (a) or (c) — where a suitably documented risk assessment
          undertaken with the involvement of a skilled person (electrically) determines that RCD
          protection is not necessary. That risk assessment shall be provided with the electrical
          installation certificate, so allow for producing it rather than assuming a verbal
          agreement will do.
        </p>
        <p>
          Note that Regulation 411.3.4, which requires 30 mA RCD protection of final circuits
          supplying luminaires, applies within domestic (household) premises only. Commercial
          lighting circuits do not attract it, which is a genuine saving on a large lighting
          package.
        </p>
        <p>
          Commercial installations are usually protected by RCBOs on individual circuits rather than
          bank RCDs, so that a fault on one circuit does not take out several others. Regulation
          314.1 backs the approach directly: an installation shall be divided into circuits to
          (a) avoid danger and minimise inconvenience in the event of a fault and (d) reduce the
          possibility of unwanted tripping of RCDs due to excessive protective conductor currents
          not due to a fault. Budget for it at tender — retrofitting RCBOs after a client complains
          about nuisance tripping is not a variation you will get paid for.
        </p>

        <h3 className={subCn}>AFDDs: Regulation 421.1.7</h3>
        <p>
          Arc fault detection devices conforming to BS EN 62606 shall be provided for single-phase
          AC final circuits supplying socket-outlets rated up to 32 A in high rise residential
          buildings, houses in multiple occupation, purpose-built student accommodation, and care
          homes. For all other premises — which covers most commercial work — the use of AFDDs is{' '}
          <strong>recommended</strong>, not required. Where they are used, they shall be placed at
          the origin of the circuit to be protected. Price them as a priced option and let the
          client decide, rather than either omitting them silently or loading the tender with them.
        </p>

        <h3 className={subCn}>Certification</h3>
        <p>
          Under Regulation 644.1, an Electrical Installation Certificate based on the model in
          Appendix 6 shall be issued to the person ordering the work on completion of verification.
          Regulation 644.3 requires it to include the extent of the work covered, Schedule(s) of
          Inspection, and Schedule(s) of Circuit Details and Test Results — on a large commercial
          job those schedules run to many pages, which is why testing is not a last-afternoon
          activity. Regulation 644.4 requires the persons responsible for the design, construction
          and verification to issue the certificate taking account of their respective
          responsibilities, and to record the recommended interval between initial verification and
          the first periodic inspection.
        </p>
        <p>
          Fire alarm and emergency lighting are certified separately. Regulation 560.9 requires
          emergency lighting systems to comply with BS 5266-1, BS EN 1838 and BS EN 50172;
          Regulation 560.10 requires fire detection and fire alarm systems to comply with the
          relevant parts of the BS 5839 series. Both systems need commissioning certificates and
          ongoing periodic testing.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Quoting Commercial Rewires',
    content: (
      <>
        <p>
          Commercial rewires are high-value contracts with real profit in them and real risk if
          priced badly. Three things separate the tenders that make money from the ones that do not.
        </p>
        <div className="my-5 space-y-4">
          <div className={cardCn}>
            <h3 className="mb-1 text-base font-bold text-white">Measure containment first</h3>
            <p className="text-sm leading-relaxed text-white">
              Walk the building and measure every containment route before pricing anything else. It
              is the biggest variable cost and the one most often guessed. Use Elec-Mate&apos;s{' '}
              <SEOInternalLink href="/electrical-quoting-app">quoting app</SEOInternalLink> to build
              itemised schedules of containment, distribution equipment and final circuits.
            </p>
          </div>
          <div className={cardCn}>
            <h3 className="mb-1 text-base font-bold text-white">Price the certification properly</h3>
            <p className="text-sm leading-relaxed text-white">
              Allow real time for testing and completing the{' '}
              <SEOInternalLink href="/eic-certificate">EIC</SEOInternalLink> and its schedules. A
              500m² commercial installation takes 2 to 3 days to test and certify properly. Add the
              fire alarm and emergency lighting commissioning certificates, and any documented risk
              assessment you are relying on under Regulation 411.3.3.
            </p>
          </div>
          <div className={cardCn}>
            <h3 className="mb-1 text-base font-bold text-white">Do not forget the prelims</h3>
            <p className="text-sm leading-relaxed text-white">
              Site supervision, welfare, temporary lighting, tool hire, waste disposal and site
              access all cost money and none of them appear on a materials list. On a six-week
              commercial contract, prelims add 8% to 12% to the direct costs.
            </p>
          </div>
        </div>
        <SEOAppBridge
          title="Quote commercial rewires with confidence"
          description="Elec-Mate's quoting app handles itemised commercial tenders with distribution equipment, containment schedules, and final circuit costing."
          icon={Calculator}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function CommercialRewireCostPage() {
  return (
    <GuideTemplate
      title="Commercial Rewire Cost UK 2026: £30–£80 per m²"
      description="Commercial rewire costs £30–£80 per m² in 2026: 3-phase distribution, containment, data cabling, fire alarm and BS 7671 compliance pricing."
      datePublished="2026-03-27"
      dateModified="2026-08-07"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cost Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Commercial Rewire Cost:{' '}
          <span className="text-elec-yellow">UK Per m² Price Guide 2026</span>
        </>
      }
      heroSubtitle="What does a commercial rewire really cost? Per-square-metre pricing for 3-phase distribution, containment, data cabling, fire alarm and emergency lighting — with the BS 7671:2018+A4:2026 regulations that drive the price."
      readingTime={14}
      answerBox={{
        question: 'How much does a commercial rewire cost per square metre in the UK?',
        answer:
          'A commercial rewire typically costs £30 to £80 per square metre in 2026. Basic office work sits at £30 to £45/m²; a mid-spec rewire with 3-phase distribution, fire alarm and emergency lighting runs £45 to £60/m²; and a high-spec corporate fit-out reaches £60 to £80/m². Figures include containment, cabling, distribution, testing and certification to BS 7671:2018+A4:2026.',
      }}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Commercial Rewire Costs"
      relatedPages={relatedPages}
      ctaHeading="Quote Commercial Rewires with Itemised Pricing"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for commercial quoting with distribution schedules, containment costing, and AI cost engineering. 7-day free trial."
    />
  );
}
