import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import { FileCheck2, Flame, Wrench, Layers, Zap } from 'lucide-react';

// -------------------------------------------------------------------
// Shared surface classes — edge-to-edge on phones, inset from sm: up
// -------------------------------------------------------------------

const CARD =
  '-mx-4 my-4 rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5';

const TABLE_WRAP = `${CARD} overflow-x-auto`;
const TABLE = 'w-full min-w-[520px] text-left text-sm text-white';
const TH = 'border-b border-white/20 py-3 pr-4 align-bottom font-semibold text-white';
const TD = 'py-3 pr-4 align-top text-white';

const WARN =
  '-mx-4 my-4 rounded-none border-y border-orange-500/30 bg-orange-500/10 p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5';

const EYEBROW = 'mb-3 text-xs font-semibold uppercase tracking-wide text-elec-yellow';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation Guides', href: '/guides/cable-installation' },
  { label: 'FP200 Gold Cable Guide', href: '/fp200-gold-cable-guide' },
];

const tocItems = [
  { id: 'at-a-glance', label: 'FP200 Gold at a Glance' },
  { id: 'what-is-fp200', label: 'What is FP200 Gold Cable?' },
  { id: 'standards', label: 'BS 7629-1, Test Standards and CPR' },
  { id: 'bs7671-requirements', label: 'What BS 7671 Requires' },
  { id: 'bs5839-bs5266', label: 'BS 5839 and BS 5266 Requirements' },
  { id: 'termination', label: 'How to Terminate FP200 Gold' },
  { id: 'clip-and-support', label: 'Clipping and Support Spacing' },
  { id: 'segregation', label: 'Fire Alarm Cable Segregation' },
  { id: 'vs-micc', label: 'FP200 Gold vs MICC: Pros and Cons' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'FP200 Gold is a fire-resistant cable to BS 7629-1:2015+A1:2019 — the product specification for 300/500 V fire-resistant, screened, fixed-installation cables with low emission of smoke and corrosive gases.',
  'BS 7671 Reg 560.8 sets the fire rating: cables supplying safety circuits must achieve the time authorised by the building regulations or the relevant British Standard, or one hour where neither specifies a time.',
  'Reg 560.8.1 lists four permitted wiring systems for safety services. FP200 Gold sits under route (c) — cables meeting the test requirements of BS EN 50200, BS 8434 or BS 8491, and BS EN 60332-1-2.',
  'Reg 560.8.1 also requires the wiring system to be mounted and installed so that circuit integrity will not be impaired during a fire — which is what makes fire-rated glands and fixings part of the compliance, not an optional extra.',
  'Reg 521.10.202 requires wiring systems to be supported so they will not collapse prematurely in a fire, and its NOTE 3 rules out non-metallic clips or cable ties as the sole means of support. Steel or copper clips and saddles are the stated example.',
  'BS 5839-1:2025 (fire detection and alarm, non-domestic premises) and BS 5266-1:2025 (emergency lighting) are the codes of practice BS 7671 Regs 560.10 and 560.9 point to.',
  'The On-Site Guide 7.4.1 note states fire alarm and emergency lighting circuits must be separated from other cables and from each other, in compliance with BS 5839 and BS 5266 respectively.',
  'FP200 Gold terminates with conventional strippers and standard screw terminals — no crimping tools and no moisture-sealing kit, which is its main practical advantage over MICC.',
];

const faqs = [
  {
    question: 'What is FP200 Gold cable?',
    answer:
      'FP200 Gold is a Prysmian brand of fire-resistant cable for fixed wiring in life-safety circuits — fire detection and alarm systems and emergency lighting. It is manufactured to BS 7629-1, the British Standard for 300/500 V fire-resistant, screened, fixed installation cables having low emission of smoke and corrosive gases when affected by fire. It is one of the most commonly specified fire-resistant cables in the UK because it installs with ordinary tools.',
  },
  {
    question: 'What is BS 7629 and does FP200 Gold comply with it?',
    answer:
      'BS 7629-1:2015+A1:2019 is the product specification for 300/500 V fire-resistant, screened, fixed installation cables having low emission of smoke and corrosive gases when affected by fire (multicore cables). FP200 Gold is manufactured to it. Note that BS 7629-1 is a cable specification, not a fire test method — circuit integrity is assessed against BS EN 50200, BS 8434 or BS 8491, which are the test standards named in BS 7671 Reg 560.8.1(c). NOTE 1 to Reg 560.8.1 confirms that BS 5266, BS 5839 and BS 8519 accept cables to BS 7629-1 when appropriately selected for the application.',
  },
  {
    question: 'How long must a fire alarm cable keep working in a fire?',
    answer:
      'BS 7671 Reg 560.8 states that cables supplying safety circuits shall have a resistance to fire rating of either the time authorised by regulations for building elements, or by British Standards for the circuits, or one hour in the absence of such a regulation or standard. So the design duration comes from the building regulations or from BS 5839-1 / BS 5266-1 / BS 8519 for the application; one hour is the fallback. Check the grade and declared classification of the specific cable against the duration your design needs.',
  },
  {
    question: 'How do you terminate FP200 cable?',
    answer:
      'Strip the LSZH outer sheath back only as far as the enclosure needs, taking care not to damage the insulation or the tape beneath it. Enter the enclosure through a fire-rated gland specified by the cable manufacturer, terminate the conductors into standard screw terminals, and terminate the screen or drain conductor as the circuit protective conductor where the design uses it as one — its cross-sectional area must satisfy BS 7671 Reg 543.1.3. Every termination must be made inside a suitable accessory or enclosure (Reg 526.5) and must remain accessible for inspection, testing and maintenance (Reg 526.3). No crimping tool or moisture-sealing kit is needed, unlike MICC.',
  },
  {
    question: 'Where is FP200 Gold required by BS 5839-1?',
    answer:
      'BS 5839-1:2025 is the code of practice for the design, installation, commissioning and maintenance of fire detection and fire alarm systems in non-domestic premises, and BS 7671 Reg 560.10 requires such systems to comply with the relevant parts of the BS 5839 series. NOTE 1 to Reg 560.8.1 records that BS 5839 specifies cables to BS EN 60702-1, BS 7629-1 and BS 7846 as suitable when appropriately selected. In practice that means fire-resistant cable such as FP200 Gold, or mineral insulated cable, for detection circuits, sounder circuits, power supplies and panel interconnects. The category of system (Category L or Category M) and the fire risk assessment determine the extent of coverage.',
  },
  {
    question: 'Can FP200 Gold be used for emergency lighting circuits?',
    answer:
      'Yes. BS 7671 Reg 560.9 requires emergency lighting systems to comply with BS 5266-1, BS EN 1838 and BS EN 50172, and NOTE 1 to Reg 560.8.1 records that BS 5266 specifies cables to BS EN 60702-1, BS 7629-1, BS 7846 and BS 8592 as suitable when appropriately selected. FP200 Gold to BS 7629-1 is therefore an accepted choice, provided it is installed with fire-rated fixings and glands so that circuit integrity is not impaired in a fire.',
  },
  {
    question: 'What is the maximum current rating of FP200 Gold cable?',
    answer:
      "Current ratings depend on conductor size and installation method and come from the manufacturer's data sheet — as a rough guide, 1.5mm² is around 14A and 2.5mm² around 20A clipped direct. Fire alarm and emergency lighting circuits usually draw far less than this, so voltage drop over long detection loops is normally the limiting factor rather than current. Apply the BS 7671 Appendix 4 correction factors for ambient temperature (Table 4B1) and grouping (Table 4C1) to the tabulated rating for the reference method you are actually using.",
  },
  {
    question: 'Do I need special tools to install FP200 Gold cable?',
    answer:
      'No specialist tools are needed for the cable itself — conventional strippers and standard screw terminals, unlike MICC which needs a crimping tool and a moisture-sealing termination kit. Fixings are a different matter: BS 7671 Reg 521.10.202 NOTE 3 precludes non-metallic cable clips or cable ties as the sole means of support where cables are clipped direct or suspended under tray, and NOTE 4 gives suitably spaced steel or copper clips, saddles or ties as examples that meet the regulation. Enclosure entries need fire-rated glands.',
  },
  {
    question: 'Why not just use twin and earth for a fire alarm?',
    answer:
      'Standard twin and earth is not a fire-resistant cable and does not meet any of the four routes in BS 7671 Reg 560.8.1, so it cannot be used for a safety service required to operate in fire conditions. Reg 422.2.1 also restricts what may be installed in protected escape routes to fire-resistant cables meeting Reg 560.8.1, bunched cables with resistance to flame propagation to BS EN 60332-3, or single cables in the listed non-flame-propagating containment systems — and requires limited smoke production (minimum 60% light transmittance to BS EN 61034-2) and limited halogen acid gas content (not exceeding 0.5% to BS EN 60754-1).',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/mineral-insulated-cable-guide',
    title: 'Mineral Insulated Cable (MICC) Guide',
    description: 'Pyrotenax MICC cable for extreme fire resistance — termination and applications.',
    icon: Flame,
    category: 'Guide',
  },
  {
    href: '/armoured-cable-installation',
    title: 'Armoured Cable (SWA) Installation',
    description: 'Steel Wire Armoured cable — types, current ratings, burial depths, and glands.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/conduit-installation-guide',
    title: 'Conduit Installation Guide',
    description: 'Steel and PVC conduit — bending, threading, and earthing for commercial work.',
    icon: Wrench,
    category: 'Guide',
  },
  {
    href: '/cable-tray-installation',
    title: 'Cable Tray Installation',
    description: 'Commercial cable management — perforated, solid bottom, and wire mesh trays.',
    icon: Layers,
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
    id: 'at-a-glance',
    heading: 'FP200 Gold at a Glance',
    content: (
      <>
        <p>
          The figures below are the ones you need on site. Regulation numbers are BS 7671:2018+A4:2026
          unless stated otherwise.
        </p>
        <div className={TABLE_WRAP}>
          <table className={TABLE}>
            <tbody>
              <tr>
                <th scope="row" className={TH}>
                  Product specification
                </th>
                <td className={TD}>
                  BS 7629-1:2015+A1:2019 — 300/500 V fire-resistant, screened, fixed installation
                  cables with low emission of smoke and corrosive gases (multicore)
                </td>
              </tr>
              <tr>
                <th scope="row" className={TH}>
                  Voltage rating
                </th>
                <td className={TD}>300/500 V</td>
              </tr>
              <tr>
                <th scope="row" className={TH}>
                  BS 7671 route
                </th>
                <td className={TD}>
                  Reg 560.8.1(c) — tested to BS EN 50200, BS 8434 or BS 8491, plus BS EN 60332-1-2
                </td>
              </tr>
              <tr>
                <th scope="row" className={TH}>
                  Required fire duration
                </th>
                <td className={TD}>
                  Reg 560.8 — the time authorised by the building regulations or the relevant British
                  Standard; <strong>one hour</strong> where neither specifies one
                </td>
              </tr>
              <tr>
                <th scope="row" className={TH}>
                  Typical applications
                </th>
                <td className={TD}>
                  Fire detection and alarm (BS 5839-1:2025), emergency lighting (BS 5266-1:2025)
                </td>
              </tr>
              <tr>
                <th scope="row" className={TH}>
                  Continuous conductor temperature
                </th>
                <td className={TD}>
                  105°C per the manufacturer's data — check the data sheet for the size and grade you
                  are installing
                </td>
              </tr>
              <tr>
                <th scope="row" className={TH}>
                  Termination
                </th>
                <td className={TD}>
                  Conventional strippers and standard screw terminals; fire-rated gland at every
                  enclosure entry
                </td>
              </tr>
              <tr>
                <th scope="row" className={TH}>
                  Fixings
                </th>
                <td className={TD}>
                  Steel or copper clips, saddles or ties (Reg 521.10.202 NOTE 4). Non-metallic clips
                  and cable ties are precluded as the sole support (NOTE 3)
                </td>
              </tr>
              <tr>
                <th scope="row" className={TH}>
                  Typical clip spacing
                </th>
                <td className={TD}>
                  250mm horizontal, 400mm vertical per the manufacturer's installation data
                </td>
              </tr>
              <tr>
                <th scope="row" className={TH}>
                  Protected escape routes
                </th>
                <td className={TD}>
                  Permitted by Reg 422.2.1(a) as a cable meeting Reg 560.8.1. Appendix 13 gives the
                  supporting guidance
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    id: 'what-is-fp200',
    heading: 'What is FP200 Gold Fire-Resistant Cable?',
    content: (
      <>
        <p>
          FP200 Gold is a fire-resistant cable manufactured by Prysmian for fixed wiring in
          life-safety circuits that must continue to function during a fire. It is one of the most
          commonly specified fire-resistant cables in the UK for fire alarm systems and emergency
          lighting, largely because it installs and terminates with ordinary tools.
        </p>
        <p>
          Unlike standard PVC-insulated cables, FP200 Gold uses an enhanced insulation system beneath
          a low smoke, zero halogen (LSZH) outer sheath. That construction is what lets the cable hold
          electrical continuity while exposed to flame — keeping sounders operating and escape route
          luminaires lit during evacuation.
        </p>
        <p>
          It is available in 2-core, 3-core and multi-core variants in conductor sizes from 1mm² to
          4mm² for fire protection work. Red sheath is the UK convention for fire alarm cabling, with
          white and cream variants where red is visually unacceptable.
        </p>
        <div className={CARD}>
          <p className={EYEBROW}>What BS 7671 means by &ldquo;low smoke, low halogen&rdquo;</p>
          <p className="text-white">
            Reg 422.2.1 puts numbers on it for cables in protected escape routes: limited smoke
            production, a minimum of 60% light transmittance when tested to BS EN 61034-2, and limited
            halogen acid gas content not exceeding 0.5% when tested to BS EN 60754-1. Those two
            figures are the objective test of an LSZH claim.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'standards',
    heading: 'BS 7629-1, the Fire Test Standards and CPR',
    content: (
      <>
        <p>
          Three separate things get conflated on data sheets, and it is worth keeping them apart: the
          cable <strong>specification</strong>, the <strong>fire test methods</strong> used to
          classify circuit integrity, and the <strong>reaction-to-fire</strong> requirements of the
          Construction Products Regulation.
        </p>
        <div className={TABLE_WRAP}>
          <table className={TABLE}>
            <thead>
              <tr>
                <th className={TH}>Standard</th>
                <th className={TH}>What it covers</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={TD}>
                  <strong>BS 7629-1:2015+A1:2019</strong>
                </td>
                <td className={TD}>
                  The cable specification — 300/500 V fire-resistant, screened, fixed installation
                  cables with low emission of smoke and corrosive gases, multicore. This is what FP200
                  Gold is made to. It is a product spec, not a fire test.
                </td>
              </tr>
              <tr>
                <td className={TD}>
                  <strong>BS EN 50200:2015</strong>
                </td>
                <td className={TD}>
                  Method of test for resistance to fire of unprotected small cables for use in
                  emergency circuits. Named in Reg 560.8.1(c).
                </td>
              </tr>
              <tr>
                <td className={TD}>
                  <strong>BS 8434</strong>
                </td>
                <td className={TD}>
                  Methods of test for assessment of the fire integrity of electric cables. Named in
                  Reg 560.8.1(c).
                </td>
              </tr>
              <tr>
                <td className={TD}>
                  <strong>BS 8491:2008</strong>
                </td>
                <td className={TD}>
                  Method for assessment of fire integrity of large diameter power cables used as
                  components of smoke and heat control systems and certain other active fire safety
                  systems. Named in Reg 560.8.1(c).
                </td>
              </tr>
              <tr>
                <td className={TD}>
                  <strong>BS EN 60332-1-2</strong>
                </td>
                <td className={TD}>
                  Flame propagation of a single vertical cable. Required alongside every one of routes
                  (a), (b) and (c) of Reg 560.8.1.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3 className="mt-6 text-base font-semibold text-white">Voltage and temperature</h3>
        <p>
          The 300/500 V rating in the BS 7629-1 title covers mains-voltage fire alarm power supplies
          and the extra-low voltage detection circuits that run alongside them. The manufacturer
          quotes a continuous conductor temperature of 105°C against 70°C for ordinary thermoplastic
          cable — take the figure from the data sheet for the size and grade you are actually
          installing, and remember Reg 526.1(e) requires the means of connection to be chosen so that
          the terminal temperature in normal service does not impair the insulation of the conductors
          connected to it.
        </p>
        <h3 className="mt-6 text-base font-semibold text-white">
          CPR: what the label does and does not mean
        </h3>
        <p>
          Appendix 2, Item 17 of BS 7671 explains the position. The Construction Products Regulation
          is administered by the Ministry of Housing, Communities and Local Government (MHCLG) and
          empowers the UK to set performance levels for particular installations, but{' '}
          <strong>MHCLG has not exercised those powers in respect of reaction to fire for cables</strong>
          . The generic reaction-to-fire requirements for all cables sit in BS EN 50575. The NOTE to
          Reg 527.1.3 and NOTE 1 to Reg 422.2.1 both point readers to that item — and NOTE 1 to Reg
          422.2.1 adds that there are no requirements in the CPR for the fire-resisting cables
          described in Reg 560.8.
        </p>
        <p>
          So a Cca-s1b,d1,a1 declaration on an FP200 Gold reel is a manufacturer's CPR classification
          and labelling matter, not a BS 7671 minimum. If a project needs a specific CPR class, the
          specification and the purchase order have to call it up explicitly.
        </p>
      </>
    ),
  },
  {
    id: 'bs7671-requirements',
    heading: 'What BS 7671 Requires for Fire-Resistant Wiring',
    content: (
      <>
        <p>
          The obligation sits in Chapter 56, Safety Services. Reg 560.5.1 recognises that safety
          services may be required to operate at all relevant times, including during mains and local
          supply failure and through fire conditions. Where they are required to operate in fire
          conditions, Reg 560.5.2 requires two things: a source selected to maintain a supply of
          adequate duration, and all equipment provided — by construction or by erection — with
          fire-resisting protection of adequate duration.
        </p>
        <div className={TABLE_WRAP}>
          <p className={EYEBROW}>Reg 560.8.1 — the four permitted wiring systems</p>
          <table className={TABLE}>
            <tbody>
              <tr>
                <th scope="row" className={TH}>
                  (a)
                </th>
                <td className={TD}>
                  Mineral insulated cable systems complying with BS EN 60702-1 and BS EN 60702-2 and
                  BS EN 60332-1-2 — MICC / Pyrotenax.
                </td>
              </tr>
              <tr>
                <th scope="row" className={TH}>
                  (b)
                </th>
                <td className={TD}>
                  Fire-resistant cables complying with IEC 60331-1, IEC 60331-2 or IEC 60331-3 and
                  with BS EN 60332-1-2.
                </td>
              </tr>
              <tr>
                <th scope="row" className={TH}>
                  (c)
                </th>
                <td className={TD}>
                  Fire-resistant cables complying with the test requirements of BS EN 50200, BS 8434
                  or BS 8491, appropriate for the cable size, and with BS EN 60332-1-2.{' '}
                  <strong>This is FP200 Gold's route.</strong>
                </td>
              </tr>
              <tr>
                <th scope="row" className={TH}>
                  (d)
                </th>
                <td className={TD}>
                  A wiring system maintaining the necessary fire and mechanical protection — NOTE 2
                  gives constructional enclosures, or wiring systems in separate fire compartments
                  giving equivalent protection, as examples.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Reg 560.8.1 does not stop at the list. It goes on to require that the wiring system selected
          shall meet the requirements of the relevant code of practice for the application{' '}
          <strong>
            and shall be mounted and installed in such a way that the circuit integrity will not be
            impaired during a fire
          </strong>
          . That sentence is why glands, clips and penetrations are compliance items rather than
          finishing touches.
        </p>
        <p>
          BS 7629-1 is not one of the four lettered routes, but it is not absent either: NOTE 1 to Reg
          560.8.1 records that BS 5266, BS 5839 and BS 8519 specify cables to BS EN 60702-1, BS
          7629-1, BS 7846 and BS 8592 (BS 5266 only) as suitable when appropriately selected for the
          application.
        </p>
        <h3 className="mt-6 text-base font-semibold text-white">
          How long the cable has to survive
        </h3>
        <p>
          Reg 560.8 sets the duration: cables supplying safety circuits shall have a resistance to
          fire rating of either the time authorised by regulations for building elements, or by
          British Standards for the circuits, or <strong>one hour</strong> in the absence of such a
          regulation or standard. Confirm the declared classification of the cable and its
          accessories covers whatever duration the fire strategy calls for.
        </p>
        <h3 className="mt-6 text-base font-semibold text-white">Other regulations that bite</h3>
        <div className={TABLE_WRAP}>
          <table className={TABLE}>
            <tbody>
              <tr>
                <th scope="row" className={TH}>
                  422.2.1
                </th>
                <td className={TD}>
                  Only cables meeting Reg 560.8.1, bunched cables to the relevant part of BS EN
                  60332-3, or single cables in the listed non-flame-propagating containment may be
                  installed in protected escape routes. Cables there must be as short as practicable
                  and not within arm's reach unless protected against mechanical damage.
                </td>
              </tr>
              <tr>
                <th scope="row" className={TH}>
                  422.2.201
                </th>
                <td className={TD}>
                  Nothing may be installed in a firefighting shaft or protected stairway unless it is
                  part of an essential fire safety or related safety system, general needs lighting,
                  or socket-outlets for cleaning and maintenance.
                </td>
              </tr>
              <tr>
                <th scope="row" className={TH}>
                  422.6(b)
                </th>
                <td className={TD}>
                  In locations of national, commercial, industrial or public significance, cables with
                  improved fire-resisting characteristics such as those to BS 7629-1, BS 7846 or BS
                  8592 are among the measures that may be considered.
                </td>
              </tr>
              <tr>
                <th scope="row" className={TH}>
                  560.9 / 560.10
                </th>
                <td className={TD}>
                  Emergency lighting systems shall comply with BS 5266-1, BS EN 1838 and BS EN 50172.
                  Fire detection and fire alarm systems shall comply with the relevant parts of the BS
                  5839 series.
                </td>
              </tr>
              <tr>
                <th scope="row" className={TH}>
                  560.11
                </th>
                <td className={TD}>
                  Power and control cable systems required to maintain circuit integrity for life
                  safety and firefighting applications shall comply with the relevant parts of BS
                  8519:2020.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    id: 'bs5839-bs5266',
    heading: 'Requirements Under BS 5839 and BS 5266',
    content: (
      <>
        <p>
          BS 7671 hands the detail to two codes of practice. Reg 560.10 requires fire detection and
          fire alarm systems to comply with the relevant parts of the BS 5839 series; Reg 560.9
          requires emergency lighting systems to comply with BS 5266-1, BS EN 1838 and BS EN 50172.
          The current dated references in BS 7671 Appendix 1 are BS 5839-1:2025 and BS 5266-1:2025.
        </p>
        <div className={TABLE_WRAP}>
          <table className={TABLE}>
            <thead>
              <tr>
                <th className={TH}>Standard</th>
                <th className={TH}>Scope and effect on cable choice</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={TD}>
                  <strong>BS 5839-1:2025</strong>
                </td>
                <td className={TD}>
                  Design, installation, commissioning and maintenance of fire detection and fire alarm
                  systems in <strong>non-domestic premises</strong>. Cables to BS EN 60702-1, BS
                  7629-1 or BS 7846 are the accepted types per NOTE 1 to Reg 560.8.1 — covering
                  detection circuits, sounder circuits, power supplies and panel interconnects. System
                  category (Category L or Category M) and the fire risk assessment set the extent of
                  coverage.
                </td>
              </tr>
              <tr>
                <td className={TD}>
                  <strong>BS 5266-1:2025</strong>
                </td>
                <td className={TD}>
                  Code of practice for the emergency lighting of premises. NOTE 1 to Reg 560.8.1 adds
                  BS 8592 to the accepted cable list for BS 5266 work. Routes must be designed to
                  minimise fire exposure and circuits separated from one another.
                </td>
              </tr>
              <tr>
                <td className={TD}>
                  <strong>BS 8519:2020</strong>
                </td>
                <td className={TD}>
                  Selection and installation of fire-resistant power and control cable systems for
                  life safety and firefighting applications. Reg 560.11 makes this the governing code
                  for firefighting lifts, smoke control and similar systems.
                </td>
              </tr>
              <tr>
                <td className={TD}>
                  <strong>Approved Document B</strong>
                </td>
                <td className={TD}>
                  England's Building Regulations fire safety guidance references the BS 5839 and BS
                  5266 series. Scotland and Northern Ireland have their own equivalent technical
                  guidance.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          For dwellings, the relevant part is the domestic part of the BS 5839 series rather than BS
          5839-1, which covers non-domestic premises. Grade D domestic systems are commonly wired in
          standard cable; higher grades and any commercial or institutional building will call for
          fire-resistant cable. Work to the current edition of the applicable part and to the specific
          project risk assessment.
        </p>
      </>
    ),
  },
  {
    id: 'termination',
    heading: 'How to Terminate FP200 Gold Cable',
    content: (
      <>
        <p>
          FP200 Gold is terminated with conventional tools — that is its main practical advantage over
          MICC. There is no crimping tool, no pot, no sealing compound and no moisture window to work
          within. What does need care is the gland, the strip length and the screen.
        </p>
        <div className={CARD}>
          <p className={EYEBROW}>Termination sequence</p>
          <ol className="list-decimal space-y-3 pl-5 text-white marker:font-semibold marker:text-elec-yellow">
            <li>
              <strong>Fit the gland first.</strong> Every enclosure entry — panel, sounder base,
              junction box, conduit box — takes a fire-rated gland specified by the cable
              manufacturer. Reg 560.8.1 requires the wiring system to be mounted and installed so that
              circuit integrity will not be impaired during a fire, and a standard gland at a panel
              entry defeats that at the one point the cable is most likely to be attacked.
            </li>
            <li>
              <strong>Strip only what you need.</strong> Take the LSZH outer sheath back to the
              minimum length the enclosure requires. Use a proper stripping tool and avoid nicking the
              insulation or the tape beneath it — damage there is invisible on a continuity test and
              only shows up in a fire.
            </li>
            <li>
              <strong>Terminate the conductors.</strong> Standard screw terminals are fine. Reg 526.1
              requires every connection to give durable electrical continuity and adequate mechanical
              strength and protection, and Reg 526.1(e) requires the terminal temperature in normal
              service not to impair the insulation of the conductors connected to it.
            </li>
            <li>
              <strong>Deal with the screen.</strong> BS 7629-1 cables are screened. Where the design
              uses the screen or drain conductor as a circuit protective conductor, its
              cross-sectional area must satisfy Reg 543.1.3 — the adiabatic calculation, or a
              reference to BS 7454. Do not leave a screen floating at one end without checking what
              the system designer intended.
            </li>
            <li>
              <strong>Enclose and keep it accessible.</strong> Reg 526.5 requires every termination
              and joint in a live conductor to be made inside a suitable accessory, an equipment
              enclosure, or an enclosure formed with non-combustible building material. Reg 526.3
              requires every connection to be accessible for inspection, testing and maintenance
              unless it falls into one of the listed exceptions.
            </li>
          </ol>
        </div>
        <div className={WARN}>
          <p className={EYEBROW}>The most common termination failure</p>
          <p className="text-white">
            Correct cable, correct clips, standard glands. Fire performance is a property of the whole
            cable system, not the drum it came off. If the gland, the enclosure and the fixings are
            not rated for the same duration as the cable, the circuit fails at the termination and the
            cable's classification counts for nothing.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'clip-and-support',
    heading: 'Clipping and Support Spacing',
    content: (
      <>
        <p>
          Support is a BS 7671 requirement in its own right. Reg 521.10.202 states that wiring systems
          shall be supported such that they will not be liable to premature collapse in the event of a
          fire, and it applies throughout the installation — not just in escape routes as the
          superseded Reg 521.11.201 did.
        </p>
        <div className={TABLE_WRAP}>
          <table className={TABLE}>
            <thead>
              <tr>
                <th className={TH}>Reg 521.10.202</th>
                <th className={TH}>What it says</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={TD}>NOTE 2</td>
                <td className={TD}>
                  Cables installed in or on steel cable containment systems are deemed to meet the
                  regulation.
                </td>
              </tr>
              <tr>
                <td className={TD}>NOTE 3</td>
                <td className={TD}>
                  Precludes non-metallic cable clips or cable ties as the sole means of support where
                  cables are clipped direct to exposed surfaces or suspended under cable tray, and
                  non-metallic trunking as the sole support of the cables within it.
                </td>
              </tr>
              <tr>
                <td className={TD}>NOTE 4</td>
                <td className={TD}>
                  Suitably spaced steel or copper clips, saddles or ties are examples that meet the
                  regulation.
                </td>
              </tr>
              <tr>
                <td className={TD}>NOTE 5</td>
                <td className={TD}>
                  The intent is to stop wiring systems collapsing and hindering evacuation or
                  firefighter access. It is <strong>not</strong> intended to maintain circuit
                  integrity for life safety or firefighting — that is Chapter 56 and the codes of
                  practice BS 5266, BS 5839 and BS 8519.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          That last note matters on fire alarm work. Meeting Reg 521.10.202 with steel clips is the
          floor, not the ceiling — the fixing also has to hold the cable in place for the duration the
          fire strategy requires, which is a manufacturer and BS 5839-1 question.
        </p>
        <div className={TABLE_WRAP}>
          <table className={TABLE}>
            <thead>
              <tr>
                <th className={TH}>Run</th>
                <th className={TH}>Typical maximum spacing</th>
                <th className={TH}>Why</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={TD}>Horizontal, 1.5mm² and 2.5mm²</td>
                <td className={TD}>250mm centres</td>
                <td className={TD}>
                  Keeps unsupported spans short enough that a softened cable does not sag out of its
                  designed route
                </td>
              </tr>
              <tr>
                <td className={TD}>Vertical</td>
                <td className={TD}>400mm centres</td>
                <td className={TD}>
                  Gravity loading on a vertical drop is higher, so each clip must grip rather than
                  merely locate the cable
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          These are the manufacturer's typical figures for FP200 Gold — larger sizes and specific
          grades vary, so confirm against the current Prysmian installation data for the cable on the
          drum. Standard oval or round white PVC clips, nylon ties used as the sole fixing, and
          self-adhesive clips are all ruled out by Reg 521.10.202 NOTE 3.
        </p>
        <div className={WARN}>
          <p className={EYEBROW}>Also on the list</p>
          <p className="text-white">
            Fire stop every penetration of a fire-rated wall, floor or ceiling with an approved
            system. Reg 422.2.202 is the related point: cables are only deemed to be outside a
            protected escape route where they are in a fire-resisting enclosure with a fire resistance
            at least equal to that of the compartment they pass through, or as specified by the fire
            engineer.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'segregation',
    heading: 'Fire Alarm Cable Segregation',
    content: (
      <>
        <p>
          Segregation comes from two directions. BS 7671 Reg 528.1 deals with the proximity of Band I
          and Band II circuits and sets out the conditions (a) to (f) under which they may share a
          wiring system — insulation to the highest voltage present, separate compartments, a
          partitioned tray, separate conduit or trunking, or an earthed metal screen of equivalent
          current-carrying capacity in a multicore cable. NOTE 2 to that regulation then points to BS
          5266, BS 5839 and BS 8519 for separation and segregation in relation to safety services.
        </p>
        <p>
          The IET On-Site Guide restates it plainly at 7.4.1: fire alarm and emergency lighting
          circuits must be separated from other cables and from each other, in compliance with BS 5839
          and BS 5266 respectively. So a detection loop and an emergency lighting sub-main sharing an
          unpartitioned trunking is not acceptable simply because both cables are fire-rated.
        </p>
        <div className={CARD}>
          <p className={EYEBROW}>What this means on site</p>
          <ul className="list-disc space-y-3 pl-5 text-white marker:text-elec-yellow">
            <li>
              Fire alarm circuits get their own containment, or a partitioned compartment within
              shared containment.
            </li>
            <li>
              Emergency lighting circuits are separated from the fire alarm as well as from general
              wiring — &ldquo;from each other&rdquo; is explicit in the On-Site Guide note.
            </li>
            <li>
              Where segregation is achieved by insulation rather than physical separation, Reg 528.1
              requires every cable or conductor sharing the system to be insulated for the highest
              voltage present.
            </li>
            <li>
              Segregation of Band I from Band II circuits is an item on the standard schedule of
              inspections, cited against Reg 528.1 — so it will be looked for on an EICR.
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'vs-micc',
    heading: 'FP200 Gold vs MICC: Advantages and Disadvantages',
    content: (
      <>
        <p>
          Both are accepted by BS 7671 — MICC under Reg 560.8.1(a), FP200 Gold under Reg 560.8.1(c) —
          so the choice is practical rather than regulatory. The trade is installation speed against
          fire performance headroom.
        </p>
        <div className={TABLE_WRAP}>
          <table className={TABLE}>
            <thead>
              <tr>
                <th className={TH}>&nbsp;</th>
                <th className={TH}>FP200 Gold</th>
                <th className={TH}>MICC</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className={TH}>
                  BS 7671 route
                </th>
                <td className={TD}>560.8.1(c) — BS EN 50200 / BS 8434 / BS 8491</td>
                <td className={TD}>560.8.1(a) — BS EN 60702-1 and -2</td>
              </tr>
              <tr>
                <th scope="row" className={TH}>
                  Termination
                </th>
                <td className={TD}>
                  Conventional strippers, standard screw terminals, fire-rated glands
                </td>
                <td className={TD}>
                  Pot, seal and crimping tool; termination must be completed before moisture ingress
                </td>
              </tr>
              <tr>
                <th scope="row" className={TH}>
                  Labour cost
                </th>
                <td className={TD}>Lower — no specialist kit, faster per termination</td>
                <td className={TD}>Higher — skilled terminations, more time per gland</td>
              </tr>
              <tr>
                <th scope="row" className={TH}>
                  Material cost
                </th>
                <td className={TD}>Lower per metre; inexpensive accessories</td>
                <td className={TD}>Higher per metre; termination kits add significantly</td>
              </tr>
              <tr>
                <th scope="row" className={TH}>
                  Routing
                </th>
                <td className={TD}>Flexible — suits congested ceiling voids and risers</td>
                <td className={TD}>Stiff; larger sizes need a bending former</td>
              </tr>
              <tr>
                <th scope="row" className={TH}>
                  Fire performance headroom
                </th>
                <td className={TD}>
                  Adequate for the great majority of alarm and emergency lighting circuits
                </td>
                <td className={TD}>
                  Higher — the usual choice where the fire strategy demands extended duration or
                  severe exposure
                </td>
              </tr>
              <tr>
                <th scope="row" className={TH}>
                  Mechanical damage
                </th>
                <td className={TD}>Polymer sheath — needs protection where impact is likely</td>
                <td className={TD}>Copper sheath — inherently robust</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          For most fire alarm and emergency lighting projects in commercial and residential buildings
          FP200 Gold is the sensible choice. MICC earns its cost where the exposure is severe or the
          required duration is long — plant and generator rooms, tunnels, and firefighting systems
          under BS 8519. See the{' '}
          <SEOInternalLink href="/mineral-insulated-cable-guide">MICC cable guide</SEOInternalLink>{' '}
          for termination detail on mineral insulated cable.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Testing and Certifying Fire Alarm Wiring',
    content: (
      <>
        <p>
          Fire alarm and emergency lighting installations are certified by a competent person working
          to BS 5839-1 and BS 5266-1. The electrical certification should record that a cable meeting
          one of the Reg 560.8.1 routes has been used, and that the fixings, glands and penetrations
          support the duration the fire strategy requires.
        </p>
        <div className={CARD}>
          <p className={EYEBROW}>Insulation resistance on fire alarm circuits</p>
          <p className="text-white">
            The NOTE to BS 7671 Reg 643.3.2 is explicit: more specific requirements are applicable for
            the wiring of fire detection and fire alarm systems in buildings — see BS 5839-1. The
            Table 64 regime (500 V DC and a minimum 1.0 MΩ for circuits up to and including 500 V) is
            the BS 7671 baseline, not a substitute for the commissioning tests BS 5839-1 calls for.
            Where connected equipment could influence or be damaged by the test, Reg 643.3.3 requires
            the Table 64 test before connection and then a 250 V DC test between live conductors and
            the protective conductor after connection, with a minimum of 1 MΩ.
          </p>
        </div>
        <div className={CARD}>
          <p className={EYEBROW}>A note on batteries</p>
          <p className="text-white">
            Chapter 57 (Stationary secondary batteries) is new at A4:2026, but Reg 570.1 excludes
            secondary batteries wholly within fire detection and fire alarm systems conforming to the
            BS 5839 series, and within emergency lighting conforming to the BS 5266 series. A standard
            panel battery or luminaire battery pack is therefore outside Chapter 57 — a separate
            battery installation supplying the wider system is not.
          </p>
        </div>
        <SEOAppBridge
          title="Certify fire alarm wiring installations on your phone"
          description="Record cable types, fixing methods, test results and BS 5839-1 compliance detail on site, then generate the PDF before you leave."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function FP200GoldCableGuidePage() {
  return (
    <GuideTemplate
      title="FP200 Cable: Termination, Clipping, Pros & Cons"
      description="How to terminate FP200 Gold with standard tools and fire-rated glands — BS 7629-1, Reg 560.8 one-hour default, 250mm/400mm clip spacing, FP200 vs MICC."
      datePublished="2026-03-27"
      dateModified="2026-08-07"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Flame}
      heroTitle={
        <>
          FP200 Gold Fire Resistant Cable:{' '}
          <span className="text-elec-yellow">UK Installation Guide</span>
        </>
      }
      heroSubtitle="Terminating, clipping and segregating FP200 Gold to BS 7671:2018+A4:2026 — the Reg 560.8.1 compliance routes, the one-hour default fire rating, support requirements under Reg 521.10.202, and how it compares to mineral insulated cable."
      readingTime={12}
      answerBox={{
        question: 'What is FP200 Gold cable used for?',
        answer:
          'FP200 Gold is a fire-resistant cable to BS 7629-1 used for life-safety circuits — fire detection and alarm systems (BS 5839-1) and emergency lighting (BS 5266-1) — where the cable must keep working during a fire. It satisfies BS 7671 Reg 560.8.1(c), terminates with conventional tools rather than the crimping and sealing kit MICC needs, and must be supported on steel or copper clips so it does not collapse in a fire.',
      }}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About FP200 Gold Fire-Resistant Cable"
      relatedPages={relatedPages}
      ctaHeading="Complete Fire Alarm Installation Certificates on Your Phone"
      ctaSubheading="Join 1,600+ UK electricians using Elec-Mate to certify fire alarm and emergency lighting installations on site. Record cable types, test results, and BS 5839-1 compliance — instant PDF export. 7-day free trial."
    />
  );
}
