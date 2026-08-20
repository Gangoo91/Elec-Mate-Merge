import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  FileText,
  ClipboardCheck,
  HardHat,
  Plug,
  BookOpen,
  TestTube,
  FileCheck2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Shared styles
// -------------------------------------------------------------------

/** Edge-to-edge on phones, inset card from sm: up. */
const cardCn =
  '-mx-4 my-5 rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] ' +
  'to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-6';

const tableWrapCn = '-mx-4 mt-4 overflow-x-auto px-4 sm:mx-0 sm:px-0';
const tableCn = 'w-full min-w-[34rem] border-collapse text-left text-sm text-white';
const theadRowCn = 'border-b border-white/20 text-white';
const thCn = 'py-2 pr-4 font-semibold';
const trCn = 'border-b border-white/[0.08] align-top';
const tdCn = 'py-3 pr-4 align-top';
const figureCn = 'py-3 pr-4 align-top font-semibold text-elec-yellow whitespace-nowrap';
const noteCn = 'mt-3 text-sm text-white';
const h3Cn = 'text-[15px] font-semibold tracking-tight text-white';
const listCn = 'space-y-3 text-white';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Safety', href: '/guides/electrical-safety-on-site' },
  { label: 'Temporary Installations', href: '/guides/temporary-installations-bs-7909' },
];

const tocItems = [
  { id: 'which-rules-apply', label: 'Which Rules Apply' },
  { id: 'scope-bs7909', label: 'Scope of BS 7909' },
  { id: 'supply-design', label: 'Temporary Supply Design' },
  { id: 'earthing-bonding', label: 'Earthing and Bonding' },
  { id: 'protection-devices', label: 'Protection and RCDs' },
  { id: 'testing-verification', label: 'Testing and Verification' },
  { id: 'documentation', label: 'Documentation Requirements' },
  { id: 'construction-vs-events', label: 'Construction Sites vs Events' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'BS 7909:2023 is the Code of Practice for temporary electrical systems for entertainment and related purposes. BS 7671 Sections 706 and 711 expressly do not apply to systems defined in BS 7909 (Regs 706.1, 711.4), and Sections 717 and 740 point to it for guidance.',
  'Temporary work on a construction or demolition site is covered directly by BS 7671 Section 704 — not by BS 7909.',
  'On construction and demolition sites a PME (TN-C-S) earthing facility shall not be used unless every extraneous-conductive-part is reliably connected to the main earthing terminal (Reg 704.411.3.1) — in practice TT with an earth electrode is the usual answer.',
  'On a TT system, fault protection is by RCD: Ra × IΔn must not exceed 50 V (Reg 411.5.3). Table 41.5 gives the maximum Zs — 1667 Ω for a 30 mA RCD, 500 Ω for 100 mA, 167 Ω for 300 mA, 100 Ω for 500 mA.',
  'On construction sites, circuits supplying socket-outlets or hand-held equipment up to and including 32 A must use reduced low voltage, ADS with a 30 mA RCD, electrical separation, or SELV/PELV (Reg 704.410.3.10). Socket-outlet circuits above 32 A need an RCD not exceeding 500 mA (Reg 704.411.3.2.1).',
  'Where the supply is a portable or temporarily sited generating set, every final circuit must have additional protection by a 30 mA RCD (Reg 551.4.4.2) — not just the socket-outlet circuits.',
  'RCD type selection matters: Type A covers pulsating DC, Type F adds composite/mixed-frequency residual currents, Type B adds smooth DC. Type AC may only serve fixed equipment where the load current is known to contain no DC components (Reg 531.3.3).',
  'Section 704 does not apply to administrative locations on construction sites — offices, cloakrooms, meeting rooms, canteens, restaurants, dormitories and toilets fall under the general requirements of Parts 1 to 6 and Part 8 (Reg 704.1.1).',
];

const faqs = [
  {
    question: 'What is the difference between BS 7909 and BS 7671?',
    answer:
      'BS 7671:2018+A4:2026 (the IET Wiring Regulations) is the national standard for electrical installations in the UK, and Regulation 110.1.1 confirms it applies to construction and demolition sites, to exhibitions, shows and stands, and to temporary installations at fairgrounds, amusement parks and circuses. BS 7909:2023 is a separate Code of Practice — "Code of practice for temporary electrical systems for entertainment and related purposes" — covering structures, sets and mobile units used for public or private events, touring shows, theatrical, radio, TV and film productions. The relationship is defined in BS 7671 itself: Section 706 (conducting locations with restricted movement) and Section 711 (exhibitions, shows and stands) both state that they do not apply to electrical systems as defined in BS 7909 (Regs 706.1 and 711.4), while Section 717 (mobile and transportable units) and Section 740 (fairgrounds, amusement parks and circuses) carry notes directing the reader to BS 7909 for guidance. So BS 7909 is not a replacement for BS 7671 — it is the code you work to for entertainment systems, with BS 7671 remaining the design and verification framework. For a construction site temporary installation, BS 7671 Section 704 applies directly.',
  },
  {
    question: 'Does a temporary installation need an electrical certificate?',
    answer:
      'Yes. Temporary installations must be inspected and tested in accordance with BS 7671 Chapter 64 and the results recorded. For a new temporary installation an Electrical Installation Certificate (EIC) is issued, with the Schedule of Inspection and the Schedule of Circuit Details and Test Results attached (Reg 644.3). The recommended interval to the first periodic inspection must be recorded on the Certificate (Reg 644.4). For subsequent periodic inspection, an Electrical Installation Condition Report (EICR) is produced (Reg 653.1). Where the work does not include a new circuit or the replacement of a distribution board or consumer unit, a Minor Electrical Installation Works Certificate may be used instead for each circuit added to or altered (Reg 644.4.201). Certificates may be produced in written or electronic form provided their authenticity and integrity can be verified (Reg 644.4.202), and must be signed or otherwise authenticated by one or more skilled persons competent to verify compliance (Reg 644.5).',
  },
  {
    question: 'What earthing system is used for temporary installations?',
    answer:
      'It depends on the supply source, but BS 7671 restricts PME (TN-C-S) sharply on temporary work. On a construction or demolition site, a PME earthing facility shall not be used unless all extraneous-conductive-parts are reliably connected to the main earthing terminal in accordance with Regulation 411.3.1.2 — and the note to Regulation 704.411.3.1 states plainly that bonding all extraneous-conductive-parts is very difficult to achieve and maintain throughout the life of the installation. For exhibitions, shows and stands, Regulation 711.411.4 permits PME outside a building only where the installation is continuously under the supervision of a skilled or instructed person and the suitability and effectiveness of the means of earthing has been confirmed before connection. That is why TT with a driven earth electrode is the usual arrangement for outdoor temporary supplies. Where a generating set provides a switched alternative to the public supply, fault protection must not rely on the earthed point of the public distribution system and a suitable means of earthing must be provided (Reg 551.4.3.2.1). An unearthed generator run as an IT system needs an insulation monitoring device giving audible and visual signals (Reg 538.1). The earth electrode resistance must be measured (Reg 643.7.2) before the installation is put into service.',
  },
  {
    question: 'How often should a temporary installation be inspected?',
    answer:
      'BS 7671 does not set a fixed interval. Regulation 652.1 requires the frequency of periodic inspection and testing to be determined having regard to the type of installation and equipment, its use and operation, the frequency and quality of maintenance, and the external influences to which it may be subjected — taking account of the results and recommendations of previous certificates and condition reports. The recommended interval to the first periodic inspection is recorded on the Electrical Installation Certificate at initial verification (Reg 644.4). In practice, established industry guidance (IET Guidance Note 3 and HSE construction guidance) puts construction site temporary installations on a three-monthly cycle, and event installations are inspected before each event or season of use. Regulation 652.2 also allows periodic inspection and testing to be replaced by an adequate regime of continuous monitoring and maintenance by skilled persons where the installation is under an effective preventative maintenance management system, provided appropriate records are kept. Between formal inspections, routine visual checks should look for cable damage, loose connections, water ingress and signs of overheating, with defects reported and rectified before further use.',
  },
  {
    question: 'What IP rating is required for temporary outdoor electrical equipment?',
    answer:
      'BS 7671 does not publish a single IP figure for all temporary work. Section 704 instead requires that consideration be given to the risk of damage to equipment by corrosive substances, movement of structures and vehicles, wear and tear, tension, flexing, impact, abrasion, severing and the ingress of liquids or solids (Reg 704.512.2) — so the rating follows the assessed external influences. Where specific figures are given they are location-specific: for example, a caravan pitch socket-outlet and its enclosure must be at least IP44 to BS EN 60529 (Reg 708.553.1.8), and enclosures used for basic protection with SELV or PELV at exhibitions must be at least IP4X or IPXXD (Reg 711.414.4.5). In practice IP44 is the working minimum for outdoor distribution equipment, IP55 to IP65 where heavy rain or hose-down cleaning is expected, and IP67 at ground level where standing water or flooding is possible. Choose for the worst conditions the equipment will actually see, not for a dry commissioning day, and record the assessment.',
  },
  {
    question: 'Can I use a domestic consumer unit for a temporary installation?',
    answer:
      'No — and on a construction or demolition site BS 7671 says so directly. Regulation 704.511.1 requires all assemblies for the distribution of electricity on construction and demolition sites to comply with BS EN 61439-4, the particular requirements for Assemblies for Construction Sites (ACS). Plugs and socket-outlets rated 16 A up to 125 A must comply with BS EN IEC 60309-2, and those rated above 125 A up to 800 A where interchangeability is not required must comply with BS EN IEC 60309-1. Regulation 704.537.2 further requires current-using equipment to be supplied via an ACS incorporating overcurrent protective devices, devices affording fault protection and socket-outlets where required, with a means of isolating the incoming supply that is suitable for securing in the off position — a padlockable device or a lockable enclosure. A domestic consumer unit meets none of that. Note that BS EN IEC 60309 is the current designation; the older BS 4343 reference is superseded.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/electrical-safety-on-site',
    title: 'Electrical Safety on Site',
    description:
      'Complete guide to managing electrical risks on construction sites including 110V systems.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/earthing-arrangements',
    title: 'Earthing Arrangements',
    description:
      'TN-S, TN-C-S, TT, and IT earthing systems explained with practical testing guidance.',
    icon: Plug,
    category: 'Guide',
  },
  {
    href: '/rcd-testing-guide',
    title: 'RCD Testing Guide',
    description:
      'How to test RCDs correctly including trip times, test currents, and recording results.',
    icon: TestTube,
    category: 'Guide',
  },
  {
    href: '/guides/risk-assessment-electricians',
    title: 'Risk Assessment for Electricians',
    description:
      'Risk assessments for temporary installations covering environmental and electrical hazards.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description:
      'The IET Wiring Regulations that underpin all temporary installation requirements.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/construction-site-electrical-safety',
    title: 'Construction Site Electrical Safety',
    description:
      'CDM duties, 110V systems, and construction-specific electrical safety requirements.',
    icon: HardHat,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'which-rules-apply',
    heading: 'Which Rules Apply to Your Temporary Job',
    content: (
      <>
        <p>
          Start here. &ldquo;Temporary installation&rdquo; is not one rulebook — BS 7671 splits the
          work across several Part 7 sections, and BS 7909 sits alongside them for entertainment
          systems. Find the row that matches the job before you design anything.
        </p>
        <div className={cardCn}>
          <h3 className={h3Cn}>What governs which job</h3>
          <div className={tableWrapCn}>
            <table className={tableCn}>
              <thead>
                <tr className={theadRowCn}>
                  <th className={thCn}>Type of temporary work</th>
                  <th className={thCn}>What applies</th>
                  <th className="py-2 font-semibold">Anchor</th>
                </tr>
              </thead>
              <tbody>
                <tr className={trCn}>
                  <td className={tdCn}>Construction and demolition sites</td>
                  <td className={tdCn}>
                    BS 7671 Section 704, on top of the general requirements. Covers new build,
                    repair, alteration, extension, demolition, engineering works and earthworks —
                    fixed and movable installations alike.
                  </td>
                  <td className={figureCn}>Reg 704.1.1</td>
                </tr>
                <tr className={trCn}>
                  <td className={tdCn}>
                    Site offices, cloakrooms, meeting rooms, canteens, restaurants, dormitories,
                    toilets
                  </td>
                  <td className={tdCn}>
                    General requirements of Parts 1 to 6 and Part 8 only. Section 704 does{' '}
                    <em>not</em> apply to these administrative locations.
                  </td>
                  <td className={figureCn}>Reg 704.1.1</td>
                </tr>
                <tr className={trCn}>
                  <td className={tdCn}>Exhibitions, shows and stands</td>
                  <td className={tdCn}>
                    BS 7671 Section 711, including mobile and portable displays. It does not cover
                    the fixed installation of the host building.
                  </td>
                  <td className={figureCn}>Reg 711.4</td>
                </tr>
                <tr className={trCn}>
                  <td className={tdCn}>
                    Fairgrounds, amusement parks, circuses — repeatedly erected machines and
                    structures
                  </td>
                  <td className={tdCn}>
                    BS 7671 Section 740. The permanent installation on the site is outside its
                    scope.
                  </td>
                  <td className={figureCn}>Reg 740.1.1</td>
                </tr>
                <tr className={trCn}>
                  <td className={tdCn}>Mobile or transportable units</td>
                  <td className={tdCn}>
                    BS 7671 Section 717, whose note directs you to BS 7909 for temporary event and
                    entertainment systems.
                  </td>
                  <td className={figureCn}>Reg 717.1</td>
                </tr>
                <tr className={trCn}>
                  <td className={tdCn}>
                    Structures, sets and mobile units for public or private events, touring shows,
                    theatrical, radio, TV and film production
                  </td>
                  <td className={tdCn}>
                    BS 7909:2023. Sections 706 and 711 of BS 7671 expressly do not apply to
                    electrical systems as defined in BS 7909.
                  </td>
                  <td className={figureCn}>Regs 706.1, 711.4</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={noteCn}>
            BS 7671 Regulation 110.1.1 lists construction and demolition sites, exhibitions, shows
            and stands, and temporary fairground installations among the installations the
            Regulations apply to — so the Wiring Regulations are the framework in every row above.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'scope-bs7909',
    heading: 'What Does BS 7909 Cover?',
    content: (
      <>
        <p>
          BS 7909:2023 is the British Standard Code of Practice for temporary electrical systems for
          entertainment and related purposes. BS 7671 cites it by name at Regulations 706.1, 711.4,
          717.1 and 740.1.1, so its boundary with the{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            Wiring Regulations
          </SEOInternalLink>{' '}
          is set by BS 7671 itself rather than by custom.
        </p>
        <div className={cardCn}>
          <h3 className={h3Cn}>Where BS 7909 is the working code</h3>
          <ul className={`${listCn} mt-3`}>
            <li>
              <strong>Events and entertainment.</strong> Structures, sets and mobile units used for
              public or private events, touring shows, and theatrical, radio, TV or film
              productions — the exact wording BS 7671 uses when it excludes these systems from
              Sections 706 and 711.
            </li>
            <li>
              <strong>Temporary structures.</strong> Marquees, temporary stages, grandstands and
              hospitality builds erected for a limited period and needing a supply.
            </li>
            <li>
              <strong>Generator-supplied event systems.</strong> Where the source is a generating set
              rather than a DNO supply, BS 7671 Section 551 still governs the earthing and the
              protective arrangements — see Regulations 551.4.3.2.1 and 551.4.4.2.
            </li>
          </ul>
          <p className={noteCn}>
            Construction and demolition sites are the exception: they are covered directly by BS 7671
            Section 704 and by BS 7375:2010, the Code of practice for distribution of electricity on
            construction and building sites cited in the note to Regulation 704.411.3.1. BS 7909 is
            not the governing code for that work.
          </p>
        </div>
        <p>
          The practical consequence is that BS 7909 does not lower the bar. Every temporary
          installation still has to be designed, erected and verified to BS 7671; the temporary
          nature of the work adds risks — cable damage from foot traffic and site plant, water
          ingress, repeated assembly and dismantling — that the codes then address in detail.
        </p>
      </>
    ),
  },
  {
    id: 'supply-design',
    heading: 'Temporary Supply Design',
    content: (
      <>
        <p>
          A temporary installation usually starts from the opposite end to a permanent one: not
          &ldquo;how do I wire this building?&rdquo; but &ldquo;where is the power coming from, and
          how much do we need?&rdquo;
        </p>
        <div className={cardCn}>
          <h3 className={h3Cn}>Design decisions, in order</h3>
          <ul className={`${listCn} mt-3`}>
            <li>
              <strong>Supply source.</strong> A temporary builder&rsquo;s supply from the DNO, a
              generating set, or both with changeover. A single construction site may be served by
              several sources — public supply and generating set together — and equipment must be
              identified with, and compatible with, the particular supply energising it (Reg
              704.313.3). Safety and standby supplies must be connected by devices arranged to
              prevent interconnection (Reg 704.537.2).
            </li>
            <li>
              <strong>Load assessment.</strong> Establish maximum demand with diversity applied,
              covering lighting, tools or stage equipment, heating, welfare and any specialist
              plant, then size the supply, main cables and protective devices to it with headroom
              for the site growing.
            </li>
            <li>
              <strong>Distribution layout.</strong> On a construction site, current-using equipment
              must be supplied via an Assembly for Construction Sites (ACS) incorporating overcurrent
              protective devices, devices affording fault protection and socket-outlets where
              required. Each ACS needs its own means of switching and isolating the incoming supply,
              suitable for securing in the off position — a padlockable device or a lockable
              enclosure (Reg 704.537.2). At exhibitions, every separate temporary structure and each
              distribution circuit supplying outdoor installations needs its own readily accessible,
              identifiable means of isolation (Reg 711.537.2.1.1).
            </li>
            <li>
              <strong>Cable selection.</strong> On construction sites, reduced low voltage systems
              use low temperature 3182/3/4/5A thermoplastic cable to BS 6004 or equivalent flexible
              cable; anything above reduced low voltage uses H07RN-F to BS EN 50525-2-21 or
              equivalent heavy duty flexible cable, and flexible cables subject to movement must be
              H07RN-F or equivalent, resistant to abrasion and water (Reg 704.522.8.11). Rate every
              cable for the current it will actually carry, allowing for{' '}
              <SEOInternalLink href="/guides/cable-sizing-guide-bs-7671">
                ambient temperature and grouping
              </SEOInternalLink>
              .
            </li>
            <li>
              <strong>Cable routing.</strong> Cables should not be run across site roads or
              walkways; where that is unavoidable, provide adequate protection against mechanical
              damage and contact with construction plant. Surface-run and overhead cables need
              particular attention (Reg 704.522.8.101). At exhibitions, flexible cables must not be
              laid in areas accessible to the public unless protected against mechanical damage, and
              wiring cables must be copper of at least 1.5 mm² (Reg 711.52).
            </li>
          </ul>
        </div>
        <div className={cardCn}>
          <h3 className={h3Cn}>Equipment standards on construction sites</h3>
          <p className="mt-1 text-sm text-white">
            Regulation 704.511.1 names the standards outright — there is no room for interpretation
            here.
          </p>
          <div className={tableWrapCn}>
            <table className={tableCn}>
              <thead>
                <tr className={theadRowCn}>
                  <th className={thCn}>Equipment</th>
                  <th className={thCn}>Standard</th>
                </tr>
              </thead>
              <tbody>
                <tr className={trCn}>
                  <td className={tdCn}>
                    All assemblies for the distribution of electricity on site
                  </td>
                  <td className={figureCn}>BS EN 61439-4</td>
                </tr>
                <tr className={trCn}>
                  <td className={tdCn}>Plugs and socket-outlets, 16 A up to 125 A</td>
                  <td className={figureCn}>BS EN IEC 60309-2</td>
                </tr>
                <tr className={trCn}>
                  <td className={tdCn}>
                    Plugs and socket-outlets above 125 A up to 800 A, where interchangeability is
                    not required
                  </td>
                  <td className={figureCn}>BS EN IEC 60309-1</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={cardCn}>
          <h3 className={h3Cn}>Minimum IP ratings by environment</h3>
          <p className="mt-1 text-sm text-white">
            BS 7671 does not publish one IP figure for temporary work — Regulation 704.512.2 requires
            external influences to be assessed instead. The figures below are the practical working
            minima. Select for the worst conditions the equipment will actually see.
          </p>
          <div className={tableWrapCn}>
            <table className={tableCn}>
              <thead>
                <tr className={theadRowCn}>
                  <th className={thCn}>Location</th>
                  <th className={thCn}>Minimum IP</th>
                  <th className="py-2 font-semibold">Protects against</th>
                </tr>
              </thead>
              <tbody>
                <tr className={trCn}>
                  <td className={tdCn}>Indoor, under cover, dry</td>
                  <td className={figureCn}>IP2X – IP4X</td>
                  <td className="py-3 align-top">
                    Contact with solid objects; no specific water protection
                  </td>
                </tr>
                <tr className={trCn}>
                  <td className={tdCn}>Outdoor, general exposure</td>
                  <td className={figureCn}>IP44</td>
                  <td className="py-3 align-top">
                    Solid objects of 1 mm and greater, and splashing water from any direction
                  </td>
                </tr>
                <tr className={trCn}>
                  <td className={tdCn}>Heavy rain or hose-down cleaning</td>
                  <td className={figureCn}>IP55 – IP65</td>
                  <td className="py-3 align-top">
                    Dust ingress and low-pressure water jets from any direction
                  </td>
                </tr>
                <tr className={trCn}>
                  <td className={tdCn}>Ground level, flooding or standing water</td>
                  <td className={figureCn}>IP67</td>
                  <td className="py-3 align-top">Dust-tight, and temporary immersion</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={noteCn}>
            Where BS 7671 does give a figure it is location-specific: at exhibitions, enclosures
            providing basic protection for SELV or PELV must be at least IP4X or IPXXD (Reg
            711.414.4.5), and a floor-mounted socket-outlet must be adequately protected against
            accidental ingress of water and strong enough for the expected traffic load (Reg
            711.55.7).
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'earthing-bonding',
    heading: 'Earthing and Bonding for Temporary Installations',
    content: (
      <>
        <p>
          Most temporary installations end up on TT, because BS 7671 restricts PME on exactly the
          kind of work temporary installations involve. That decision then drives everything else:
          on TT, fault protection is by RCD, so the electrode resistance and the RCD rating have to
          satisfy Regulation 411.5.3 together.
        </p>
        <div className={cardCn}>
          <h3 className={h3Cn}>TT fault protection: the numbers</h3>
          <p className="mt-1 text-sm text-white">
            Regulation 411.5.3 sets two conditions. Disconnection must be within the time required by
            Regulation 411.3.2.2 or 411.3.2.4, <strong>and</strong> R
            <sub>A</sub> × I<sub>Δn</sub> must not exceed 50 V. The requirement is met if the earth
            fault loop impedance meets Table 41.5.
          </p>
          <div className={tableWrapCn}>
            <table className={tableCn}>
              <thead>
                <tr className={theadRowCn}>
                  <th className={thCn}>
                    RCD rated residual operating current (I<sub>Δn</sub>)
                  </th>
                  <th className="py-2 font-semibold">
                    Maximum Z<sub>s</sub> — Table 41.5, U<sub>0</sub> 230 V
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className={trCn}>
                  <td className={tdCn}>30 mA</td>
                  <td className={figureCn}>1667 Ω</td>
                </tr>
                <tr className={trCn}>
                  <td className={tdCn}>100 mA</td>
                  <td className={figureCn}>500 Ω</td>
                </tr>
                <tr className={trCn}>
                  <td className={tdCn}>300 mA</td>
                  <td className={figureCn}>167 Ω</td>
                </tr>
                <tr className={trCn}>
                  <td className={tdCn}>500 mA</td>
                  <td className={figureCn}>100 Ω</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={noteCn}>
            The 1667 Ω and 500 Ω figures carry a note in Table 41.5: the resistance of the
            installation earth electrode should be as low as practicable, and a value exceeding 200
            Ω may not be stable (see Reg 542.2.4). That 200 Ω is a <em>stability</em> caution, not
            the compliance limit — the compliance limits are the ones tabulated above. On poor
            ground, drive more electrodes.
          </p>
        </div>
        <div className={cardCn}>
          <h3 className={h3Cn}>Maximum disconnection times</h3>
          <p className="mt-1 text-sm text-white">
            Table 41.1 applies to final circuits rated up to 63 A with one or more socket-outlets,
            and up to 32 A supplying only fixed connected equipment (Reg 411.3.2.2). Figures below
            are for AC at U<sub>0</sub> of 230 V.
          </p>
          <div className={tableWrapCn}>
            <table className={tableCn}>
              <thead>
                <tr className={theadRowCn}>
                  <th className={thCn}>System</th>
                  <th className={thCn}>Final circuit within Reg 411.3.2.2</th>
                  <th className="py-2 font-semibold">Distribution circuit</th>
                </tr>
              </thead>
              <tbody>
                <tr className={trCn}>
                  <td className={tdCn}>TT</td>
                  <td className={figureCn}>0.2 s</td>
                  <td className={figureCn}>1 s (Reg 411.3.2.4)</td>
                </tr>
                <tr className={trCn}>
                  <td className={tdCn}>TN</td>
                  <td className={figureCn}>0.4 s</td>
                  <td className={figureCn}>5 s (Reg 411.3.2.3)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={noteCn}>
            Where disconnection on a TT system is achieved by an overcurrent protective device{' '}
            <em>and</em> the protective equipotential bonding is connected to all
            extraneous-conductive-parts in accordance with Regulation 411.3.1.2, the TN times may be
            used instead.
          </p>
        </div>
        <div className={cardCn}>
          <h3 className={h3Cn}>Earthing systems for temporary supplies</h3>
          <div className={tableWrapCn}>
            <table className={tableCn}>
              <thead>
                <tr className={theadRowCn}>
                  <th className={thCn}>System</th>
                  <th className={thCn}>Source</th>
                  <th className="py-2 font-semibold">Suitability for temporary work</th>
                </tr>
              </thead>
              <tbody>
                <tr className={trCn}>
                  <td className={figureCn}>TT</td>
                  <td className={tdCn}>Mains or generator with an earth electrode</td>
                  <td className="py-3 align-top">
                    The usual answer outdoors and on sites. Fault protection relies on RCDs;
                    electrode resistance must be measured (Reg 643.7.2) and satisfy Reg 411.5.3.
                  </td>
                </tr>
                <tr className={trCn}>
                  <td className={figureCn}>TN-S</td>
                  <td className={tdCn}>
                    DNO TN-S, or a generator with an earthed star point and a separate protective
                    conductor
                  </td>
                  <td className="py-3 align-top">
                    Acceptable where a sound, dedicated protective conductor runs all the way back to
                    the source.
                  </td>
                </tr>
                <tr className={trCn}>
                  <td className={figureCn}>TN-C-S (PME)</td>
                  <td className={tdCn}>DNO combined PEN</td>
                  <td className="py-3 align-top">
                    Shall not be used on construction and demolition sites unless every
                    extraneous-conductive-part is reliably connected to the main earthing terminal
                    per Reg 411.3.1.2 (Reg 704.411.3.1). At exhibitions and shows, permitted outside
                    a building only under continuous supervision by a skilled or instructed person,
                    with the means of earthing confirmed before connection (Reg 711.411.4).
                  </td>
                </tr>
                <tr className={trCn}>
                  <td className={figureCn}>IT</td>
                  <td className={tdCn}>Unearthed generator</td>
                  <td className="py-3 align-top">
                    Runs on through a first fault, but needs an insulation monitoring device giving
                    audible and visual signals (Reg 538.1) so the first fault is cleared before a
                    second occurs.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={noteCn}>
            Where a generating set provides a switched alternative to the public supply, fault
            protection shall not rely on the connection to the earthed point of the public
            distribution system — a suitable means of earthing must be provided (Reg 551.4.3.2.1).
          </p>
        </div>
        <div className={cardCn}>
          <h3 className={h3Cn}>Bonding conductor sizes</h3>
          <ul className={`${listCn} mt-3`}>
            <li>
              <strong>Main protective bonding, no PME (Reg 544.1.1).</strong> Not less than half the
              cross-sectional area required for the earthing conductor of the installation, at least
              6 mm², and need not exceed 25 mm² in copper or equivalent conductance in another
              metal.
            </li>
            <li>
              <strong>Main protective bonding where PME conditions apply (Table 54.8).</strong>{' '}
              Selected against the PEN conductor of the supply: 10 mm² for a PEN of 35 mm² or less,
              16 mm² over 35 up to 50 mm², 25 mm² over 50 up to 95 mm², 35 mm² over 95 up to 150
              mm², and 50 mm² above 150 mm². It is not a flat 10 mm². Where there is more than one
              source to which PME conditions apply, size against the largest PEN conductor.
            </li>
            <li>
              <strong>Supplementary bonding (Reg 544.2).</strong> Between two exposed-conductive-parts,
              conductance not less than the smaller protective conductor (Reg 544.2.1). Between an
              exposed-conductive-part and an extraneous-conductive-part, not less than half the
              protective conductor connected to the exposed-conductive-part (Reg 544.2.2). Between
              two extraneous-conductive-parts, not less than 2.5 mm² (Reg 544.2.3). In every case,
              where mechanical protection is not provided the minimum is 4 mm².
            </li>
            <li>
              <strong>What to bond.</strong> Extraneous-conductive-parts — metallic structures,
              scaffolding, staging and trusses, metallic services — connected to the main earthing
              terminal. At exhibitions, structural metallic parts accessible from within the stand,
              vehicle, wagon, caravan or container shall be connected through the main protective
              bonding conductors to the main earthing terminal within the unit (Reg 711.411.3.1.2).
            </li>
          </ul>
        </div>
        <p>
          The{' '}
          <SEOInternalLink href="/earthing-arrangements">earthing arrangement</SEOInternalLink> must
          be shown on the single-line diagram and verified by testing before the installation is
          energised.
        </p>
      </>
    ),
  },
  {
    id: 'protection-devices',
    heading: 'Protection and RCDs',
    content: (
      <>
        <p>
          Temporary installations carry the same overcurrent and fault protection requirements as
          permanent ones, plus a layer of extra RCD requirements that only apply to temporary work.
          These are the ones people miss.
        </p>
        <div className={cardCn}>
          <h3 className={h3Cn}>RCD requirements by situation</h3>
          <div className={tableWrapCn}>
            <table className={tableCn}>
              <thead>
                <tr className={theadRowCn}>
                  <th className={thCn}>Situation</th>
                  <th className={thCn}>Requirement</th>
                  <th className="py-2 font-semibold">Anchor</th>
                </tr>
              </thead>
              <tbody>
                <tr className={trCn}>
                  <td className={tdCn}>
                    Any AC installation — socket-outlets up to 32 A, and mobile equipment up to 32 A
                    for use outdoors
                  </td>
                  <td className={tdCn}>
                    Additional protection by an RCD not exceeding 30 mA. The documented risk
                    assessment exception applies only to socket-outlets in &ldquo;other
                    locations&rdquo;, never to outdoor mobile equipment.
                  </td>
                  <td className={figureCn}>Reg 411.3.3</td>
                </tr>
                <tr className={trCn}>
                  <td className={tdCn}>
                    Construction site — circuits supplying socket-outlets up to 32 A, or hand-held
                    equipment up to 32 A
                  </td>
                  <td className={tdCn}>
                    Reduced low voltage; or ADS with additional protection by a 30 mA RCD; or
                    electrical separation with an individual transformer or separate winding per
                    item; or SELV/PELV.
                  </td>
                  <td className={figureCn}>Reg 704.410.3.10</td>
                </tr>
                <tr className={trCn}>
                  <td className={tdCn}>
                    Construction site — circuits supplying socket-outlets rated above 32 A
                  </td>
                  <td className={tdCn}>
                    An RCD with a rated residual operating current not exceeding 500 mA, operating
                    within the disconnection time of Reg 411.3.2.3 or 411.3.2.4.
                  </td>
                  <td className={figureCn}>Reg 704.411.3.2.1</td>
                </tr>
                <tr className={trCn}>
                  <td className={tdCn}>
                    Portable or temporarily sited generating set — TN, TT or IT
                  </td>
                  <td className={tdCn}>
                    <strong>Every</strong> final circuit must have additional protection by a 30 mA
                    RCD, not just the socket-outlet circuits.
                  </td>
                  <td className={figureCn}>Reg 551.4.4.2</td>
                </tr>
                <tr className={trCn}>
                  <td className={tdCn}>Exhibition, show or stand — cable supplying a temporary structure</td>
                  <td className={tdCn}>
                    Protected at its origin by an RCD not exceeding 300 mA, time-delayed or type S
                    for selectivity with the final circuit RCDs.
                  </td>
                  <td className={figureCn}>Reg 711.410.3.4</td>
                </tr>
                <tr className={trCn}>
                  <td className={tdCn}>
                    Exhibition, show or stand — final circuits up to 32 A for socket-outlets or
                    hand-held equipment, and all lighting final circuits
                  </td>
                  <td className={tdCn}>
                    ADS with a 30 mA RCD; or SELV/PELV; or electrical separation. Final circuits of
                    safety services are excepted.
                  </td>
                  <td className={figureCn}>Reg 711.410.3.101</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={noteCn}>
            On construction sites the reduced low voltage option means a nominal voltage not
            exceeding 110 V AC RMS between lines — 63.5 V to earthed neutral three-phase, 55 V to
            earthed midpoint single-phase (Reg 411.8.1.2). Regulation 704.410.3.10 notes that
            reduced low voltage is strongly preferred for portable handlamps for general use,
            portable hand tools and local lighting up to 2 kW, and that SELV is strongly preferred
            for portable handlamps in confined or damp locations.
          </p>
        </div>
        <div className={cardCn}>
          <h3 className={h3Cn}>RCD type selection (Reg 531.3.3)</h3>
          <p className="mt-1 text-sm text-white">
            Choose the lowest type that fully covers the residual-current waveform the load can
            produce. Type AC shall only be used to serve fixed equipment where it is known that the
            load current contains no DC components.
          </p>
          <div className={tableWrapCn}>
            <table className={tableCn}>
              <thead>
                <tr className={theadRowCn}>
                  <th className={thCn}>Type</th>
                  <th className={thCn}>Trips on</th>
                  <th className="py-2 font-semibold">Typical temporary-installation loads</th>
                </tr>
              </thead>
              <tbody>
                <tr className={trCn}>
                  <td className={figureCn}>AC</td>
                  <td className={tdCn}>Alternating sinusoidal residual current only</td>
                  <td className="py-3 align-top">
                    Fixed equipment with no DC content — electric heating appliances, simple
                    filament lighting containing no electronic components. Not a default for modern
                    kit.
                  </td>
                </tr>
                <tr className={trCn}>
                  <td className={figureCn}>A</td>
                  <td className={tdCn}>
                    As Type AC, plus residual pulsating direct current
                  </td>
                  <td className="py-3 align-top">
                    General socket-outlets, single-phase tools, most LED and switch-mode loads — the
                    practical minimum for modern equipment.
                  </td>
                </tr>
                <tr className={trCn}>
                  <td className={figureCn}>F</td>
                  <td className={tdCn}>
                    As Type A, plus composite residual currents and pulsating DC superimposed on
                    smooth DC
                  </td>
                  <td className="py-3 align-top">
                    Single-phase variable-speed drives, dimmers and stage equipment producing
                    mixed-frequency residual currents.
                  </td>
                </tr>
                <tr className={trCn}>
                  <td className={figureCn}>B</td>
                  <td className={tdCn}>
                    As Type F, plus residual sinusoidal AC up to 1 kHz, rectified DC from two or
                    more phases, and smooth DC
                  </td>
                  <td className="py-3 align-top">
                    Three-phase drives, EV charge points and other equipment that can produce smooth
                    DC residual current.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={noteCn}>
            All RCDs connected in series should be appropriate for the residual currents expected
            from the loads. Entertainment lighting and stage electronics routinely produce pulsating
            DC or composite residual currents that a Type AC device will not see — start at{' '}
            <SEOInternalLink href="/guides/rcd-types-explained">Type A</SEOInternalLink> and move up.
          </p>
        </div>
        <div className={cardCn}>
          <h3 className={h3Cn}>Overcurrent devices and selectivity</h3>
          <ul className={`${listCn} mt-3`}>
            <li>
              <strong>Breaking capacity.</strong> Every circuit needs an appropriately rated MCB or
              RCBO providing both overload and fault current protection, with a breaking capacity at
              least equal to the prospective fault current at the point of installation — which is
              measured, calculated or otherwise determined at the origin and at other relevant points
              (Reg 643.7.3.201).
            </li>
            <li>
              <strong>Selectivity between RCDs (Reg 536.4.1.4).</strong> BS 7671 calls this
              selectivity, not discrimination, and it is not achieved by rating alone. Two conditions
              must both be met: the upstream RCD is of selective type — type S, or time-delayed with
              an appropriate delay setting — <em>and</em> the ratio of upstream to downstream rated
              residual operating current is at least 3:1. A 100 mA type S device upstream of 30 mA
              devices satisfies the ratio. At exhibitions, selectivity between RCDs installed in
              series shall be provided (Reg 711.536.4.1.4).
            </li>
            <li>
              <strong>Switchgear access.</strong> At exhibitions, shows and stands, switchgear and
              controlgear must be placed in closed cabinets that can only be opened with a key or a
              tool, except for parts designed and intended to be operated by ordinary persons (Reg
              711.51).
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'testing-verification',
    heading: 'Testing and Verification of Temporary Installations',
    content: (
      <>
        <p>
          Initial verification of a temporary installation follows BS 7671 Chapter 64 exactly as a
          permanent one does, with extra visual attention to the risks the temporary nature creates.
          The dead tests of Regulations 643.2 to 643.6 are carried out in that order before the
          installation is energised, and where the installation has an earth electrode the test of
          Regulation 643.7.2 is done as part of that sequence.
        </p>
        <div className={cardCn}>
          <h3 className={h3Cn}>The verification sequence</h3>
          <ol className={`${listCn} mt-3 list-decimal pl-5`}>
            <li>
              <strong>Visual inspection.</strong> Cables checked for damage; connections tight and
              correctly terminated; enclosure IP ratings appropriate to the assessed external
              influences; routing free of trip hazards, water exposure and plant damage; every
              circuit and board labelled.
            </li>
            <li>
              <strong>Dead tests.</strong> Continuity of protective conductors including main and
              supplementary bonding; ring final circuit continuity where present; insulation
              resistance (Reg 643.3) — for circuits up to and including 500 V, 500 V DC test with a
              minimum of 1.0 MΩ per Table 64; polarity (Reg 643.6).
            </li>
            <li>
              <strong>Insulation resistance where equipment is connected (Reg 643.3.3).</strong>{' '}
              Where connected equipment is likely to influence the result or be damaged, the Table 64
              test is applied <em>before</em> that equipment is connected. After connection, a{' '}
              <strong>250 V DC</strong> test is applied between live conductors and the protective
              conductor connected to the earthing arrangement, with a value of at least 1 MΩ. On
              temporary installations full of switch-mode drivers and control gear, this two-stage
              route is usually the practical one.
            </li>
            <li>
              <strong>Live tests.</strong> Earth fault loop impedance to verify disconnection times;
              prospective short-circuit and earth fault current at the origin and other relevant
              points (Reg 643.7.3.201); phase sequence on polyphase circuits (Reg 643.9);{' '}
              <SEOInternalLink href="/rcd-testing-guide">RCD verification</SEOInternalLink> under
              Regulation 643.8 using equipment to BS EN 61557-6 — a single alternating current test
              at the rated residual operating current, I<sub>Δn</sub>, whatever the device type,
              with 300 ms maximum for a general non-delay device. Amendment 4 deleted Table 3A of
              Appendix 3, so the ½× and 5× tests are no longer part of the required sequence.
            </li>
            <li>
              <strong>Functional testing (Reg 643.10).</strong> Switchgear and controlgear
              assemblies, drives, controls and interlocks proved to operate correctly; main switches
              and RCD test buttons operated; generator changeover proved where fitted.
            </li>
          </ol>
        </div>
        <SEOAppBridge
          title="Complete electrical certificates on your phone"
          description="Elec-Mate lets you create EIC, EICR, and Minor Works certificates directly on site. AI board scanner reads distribution board details…"
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'documentation',
    heading: 'Documentation Requirements',
    content: (
      <>
        <p>
          Temporary installations are certified the same way permanent ones are, plus the records the
          temporary nature demands. BS 7671 is specific about what has to accompany the certificate.
        </p>
        <div className={cardCn}>
          <h3 className={h3Cn}>What has to exist before hand-over</h3>
          <ul className={`${listCn} mt-3`}>
            <li>
              <strong>Single-line diagram.</strong> Supply source, main and sub-distribution, cable
              types and sizes, protective devices, earthing arrangement and loads. This is the
              reference for anyone who works on the installation after you.
            </li>
            <li>
              <strong>Electrical Installation Certificate.</strong> Issued by the persons
              responsible for design, construction and verification, to the person ordering the work
              (Reg 644.4), before the installation goes into service.
            </li>
            <li>
              <strong>Schedules (Reg 644.3).</strong> The Certificate must state the extent of the
              work and include the Schedule(s) of Inspection and the Schedule(s) of Circuit Details
              and Test Results, based on the models in Appendix 6.
            </li>
            <li>
              <strong>Recommended re-inspection interval.</strong> The interval between initial
              verification and the first periodic inspection must be recorded on the Certificate
              (Reg 644.4). For temporary work this is the field that carries your inspection
              regime — set it deliberately.
            </li>
            <li>
              <strong>Risk assessment and method statement.</strong> Covering installation,
              commissioning, operation and decommissioning, completed before work begins. Where the
              documented risk assessment exception to Regulation 411.3.3 is used, it must be provided
              with the certificate.
            </li>
            <li>
              <strong>Periodic records.</strong> An Electrical Installation Condition Report on each
              periodic inspection (Reg 653.1), retained with the project file.
            </li>
          </ul>
          <p className={noteCn}>
            Certificates and Minor Works Certificates may be produced in written or electronic form,
            provided their authenticity and integrity — and the fidelity of any copy — can be
            verified by a reliable process (Reg 644.4.202).
          </p>
        </div>
        <SEOAppBridge
          title="Generate RAMS and certificates with AI"
          description="Elec-Mate's AI Health and Safety agent generates complete RAMS documents for temporary installations, while the certificate app produces EIC, EICR…"
          icon={FileText}
        />
      </>
    ),
  },
  {
    id: 'construction-vs-events',
    heading: 'Construction Sites vs Events: Key Differences',
    content: (
      <>
        <p>
          The design principles are shared, but the governing section, the voltages and the people
          exposed to the installation are not.
        </p>
        <div className={cardCn}>
          <div className={tableWrapCn}>
            <table className={tableCn}>
              <thead>
                <tr className={theadRowCn}>
                  <th className={thCn}>&nbsp;</th>
                  <th className={thCn}>Construction and demolition sites</th>
                  <th className="py-2 font-semibold">Exhibitions, shows and stands</th>
                </tr>
              </thead>
              <tbody>
                <tr className={trCn}>
                  <td className={tdCn}>Governing section</td>
                  <td className="py-3 pr-4 align-top">BS 7671 Section 704</td>
                  <td className="py-3 align-top">
                    BS 7671 Section 711 — unless the system falls within BS 7909:2023, which Section
                    711 excludes
                  </td>
                </tr>
                <tr className={trCn}>
                  <td className={tdCn}>Supply voltage</td>
                  <td className="py-3 pr-4 align-top">
                    Reduced low voltage strongly preferred for portable hand tools, handlamps and
                    local lighting up to 2 kW (Reg 704.410.3.10)
                  </td>
                  <td className="py-3 align-top">
                    Shall not exceed 230/400 V AC or 500 V DC (Reg 711.313)
                  </td>
                </tr>
                <tr className={trCn}>
                  <td className={tdCn}>Distribution equipment</td>
                  <td className="py-3 pr-4 align-top">
                    Assembly for Construction Sites to BS EN 61439-4, with lockable-off isolation
                    (Regs 704.511.1, 704.537.2)
                  </td>
                  <td className="py-3 align-top">
                    Switchgear in closed cabinets openable only by key or tool (Reg 711.51)
                  </td>
                </tr>
                <tr className={trCn}>
                  <td className={tdCn}>PME</td>
                  <td className="py-3 pr-4 align-top">
                    Not unless every extraneous-conductive-part is reliably connected to the MET (Reg
                    704.411.3.1)
                  </td>
                  <td className="py-3 align-top">
                    Outside a building, only under continuous supervision with the earthing confirmed
                    beforehand (Reg 711.411.4)
                  </td>
                </tr>
                <tr className={trCn}>
                  <td className={tdCn}>Who is exposed</td>
                  <td className="py-3 pr-4 align-top">
                    Trained workers; CDM 2015 duties apply alongside BS 7671
                  </td>
                  <td className="py-3 align-top">
                    Ordinary persons, including children — hence the restrictions on public access to
                    cables and switchgear
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p>
          <strong>Section 704 does not cover the site offices.</strong> The particular requirements
          of Section 704 do <em>not</em> apply to administrative locations on construction sites —
          offices, cloakrooms, meeting rooms, canteens, restaurants, dormitories and toilets are
          explicitly excluded, and the general requirements of Parts 1 to 6 and Part 8 apply there
          instead (Reg 704.1.1). Certifying a site cabin as though it were site distribution gets
          this wrong in both directions.
        </p>
        <p>
          The public-safety dimension of event work is what drives the extra restrictions. Flexible
          cables must not be laid in areas accessible to the public unless protected against
          mechanical damage (Reg 711.52); a floor-mounted socket-outlet must resist water ingress and
          the expected traffic load (Reg 711.55.7); and extra-low voltage transformers and electronic
          converters must be mounted out of arm&rsquo;s reach of ordinary persons (Reg 711.55.101).
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function TemporaryInstallationsBS7909Page() {
  return (
    <GuideTemplate
      title="Temporary Installations BS 7909: Events & Sites"
      description="Temporary electrical installations to BS 7909:2023 and BS 7671: which section applies, TT earthing figures, RCD rules, testing and certification."
      datePublished="2025-09-12"
      dateModified="2026-08-07"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Technical Guide"
      badgeIcon={Zap}
      answerBox={{
        question: 'What is BS 7909 and how does it relate to BS 7671?',
        answer:
          'BS 7909:2023 is the UK Code of Practice for temporary electrical systems for entertainment and related purposes — structures, sets and mobile units for events, touring shows and theatrical, radio, TV and film production. BS 7671 Sections 706 and 711 expressly do not apply to systems defined in BS 7909 (Regs 706.1, 711.4). Temporary installations on construction and demolition sites are covered instead by BS 7671 Section 704.',
        detail:
          'Section 704 states that a PME (TN-C-S) earthing facility shall not be used unless all extraneous-conductive-parts are reliably connected to the main earthing terminal (Reg 704.411.3.1), and that circuits supplying socket-outlets or hand-held equipment up to and including 32 A must use reduced low voltage, automatic disconnection with a 30 mA RCD, electrical separation, or SELV/PELV (Reg 704.410.3.10). Socket-outlet circuits above 32 A need an RCD not exceeding 500 mA (Reg 704.411.3.2.1).',
      }}
      heroTitle={
        <>
          Temporary Installations:{' '}
          <span className="text-elec-yellow">BS 7909, Events, and Construction Sites</span>
        </>
      }
      heroSubtitle="Temporary electrical installations demand the same rigour as permanent ones — and often more. From construction site supplies to festival power systems, this guide covers which section governs the job, supply design, TT earthing figures, RCD requirements, testing and certification."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Temporary Installations"
      relatedPages={relatedPages}
      ctaHeading="Certificates and RAMS for Temporary Installations"
      ctaSubheading="Create EIC, EICR, and Minor Works certificates on your phone. Generate RAMS and risk assessments with AI. Designed for electricians working on temporary installations. 7-day free trial."
    />
  );
}
