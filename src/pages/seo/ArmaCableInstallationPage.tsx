import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import { FileCheck2, Zap, AlertTriangle, ShieldCheck, Wrench, Layers, ClipboardCheck } from 'lucide-react';

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

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation Guides', href: '/guides/cable-installation' },
  { label: 'Armoured Cable Installation', href: '/armoured-cable-installation' },
];

const tocItems = [
  { id: 'what-is-swa', label: 'What is SWA Armoured Cable?' },
  { id: 'types-and-cores', label: 'Types and Core Configurations' },
  { id: 'current-ratings', label: 'Current Ratings and Sizing' },
  { id: 'stripping-and-terminating', label: 'Stripping and Terminating' },
  { id: 'underground-burial', label: 'Underground Burial Depths' },
  { id: 'ip-ratings', label: 'IP Ratings for Glands' },
  { id: 'common-mistakes', label: 'Common Mistakes' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Regulation 522.8.10: except where it runs in a conduit or duct giving equivalent protection against mechanical damage, a cable buried in the ground shall incorporate an earthed armour or metal sheath (or both) suitable for use as a protective conductor. SWA satisfies that on its own — no separate duct is required.',
  'Regulation 543.2.1(e) allows the armouring of a cable to be the circuit protective conductor, so the armour is earthed at both ends through the gland. Its cross-sectional area still has to satisfy Regulation 543.1.1 — calculated by the adiabatic equation of 543.1.3 or selected in accordance with 543.1.4.',
  'BS 7671 sets no general burial depth. Regulation 522.8.10 requires a sufficient depth to avoid damage from any reasonably foreseeable disturbance of the ground, and requires the location of buried cables to be marked by cable covers or a suitable marker tape.',
  '2-core SWA uses the armour as the CPC. 3-core carries line, neutral and a dedicated earth core (or three lines in a delta circuit). 4-core carries three lines and a neutral with the armour as the CPC. 5-core adds a separate earth core.',
  'Read the current rating from the Appendix 4 table that matches the cable you are actually installing: Table 4E4A for 90 °C thermosetting (XLPE / LSZH) armoured cable to BS 5467 or BS 6724, Table 4D4A for 70 °C thermoplastic armoured cable. Reference Method D2 is direct in the ground; D1 is in a duct in the ground.',
  'Buried ratings assume 20 °C ground temperature, 0.7 m depth of laying and soil of 2.5 K·m/W. Apply Ca, Cg, Cs and Cd where site conditions differ — and note Regulation 433.1.203, under which overload protection of a buried cable is satisfied where In does not exceed 0.9 × Iz.',
  'Voltage drop: Appendix 4 Table 4Ab gives 3% for lighting and 5% for other uses, measured from the origin, on a low voltage installation supplied directly from a public distribution system.',
  'Always fit the gland shroud over the cable before fitting the gland body — once the gland is tightened onto the enclosure the shroud cannot be fitted retrospectively.',
];

const faqs = [
  {
    question: 'Does SWA cable need to be earthed at both ends?',
    answer:
      'Yes. The steel wire armour is connected to earth at both the supply end and the load end. BS 7671 Regulation 543.2.1(e) permits a metal covering such as the armouring of a cable to be used as a protective conductor, and Regulation 522.8.10 requires a buried cable to incorporate an earthed armour or metal sheath suitable for use as a protective conductor. SWA glands with an earth tag and lock-nut clamp the armour and provide the earth connection at each termination. Where the armour is the circuit protective conductor, Regulation 543.2.7 requires the earthing terminal of each accessory to be connected by a separate protective conductor to an earthing terminal in the associated box or enclosure.',
  },
  {
    question: 'What is the minimum burial depth for SWA cable in the UK?',
    answer:
      'BS 7671 gives no single figure for ordinary installations. Regulation 522.8.10 requires buried cables, conduits and ducts to be at a sufficient depth to avoid being damaged by any reasonably foreseeable disturbance of the ground, and requires the location to be marked by cable covers or a suitable marker tape. Where BS 7671 does put a number on it, the figures are: 0.6 m generally considered a minimum for underground distribution circuits on caravan and camping parks (Regulation 708.521.7.2, NOTE 1); 0.5 m generally considered a minimum for underground distribution cables at marinas (Regulation 709.521.1.7, NOTE); and on agricultural premises where vehicles and mobile agricultural machines operate, at least 0.6 m with added mechanical protection, or at least 1 m in arable or cultivated ground (Section 705). Those figures are widely adopted as practical minima elsewhere, deeper under vehicle loading than under footpaths.',
  },
  {
    question: 'Can SWA cable be used as the earth conductor?',
    answer:
      'Yes, subject to sizing. BS 7671 Regulation 543.2.1(e) lists a metal covering — for example the sheath, screen or armouring of a cable — as a permitted protective conductor. The armour cross-sectional area must satisfy Regulation 543.1.1, either calculated with the adiabatic equation of 543.1.3 or selected in accordance with 543.1.4. In 2-core SWA the armour carries the earth with separate line and neutral conductors inside. Where the armour cross-sectional area is insufficient for the fault current and disconnection time, use a cable with a dedicated earth core (3-core single-phase, or 5-core three-phase) or run a separate protective conductor.',
  },
  {
    question: 'What type of gland is used for SWA cable?',
    answer:
      'SWA cable requires a specific armoured cable gland — commonly a BW or CW type brass gland with a cone and back-nut that grips the armour wires mechanically. A BW is the two-part indoor pattern; a CW adds an outer seal onto the cable sheath for outdoor and damp locations. The gland body clamps the armour to provide mechanical retention and earth continuity, and an earth tag is fitted under the lock-nut to connect the armour to the enclosure. For outdoor and underground work use IP66 or IP68 rated glands; for indoor dry locations IP54 may be acceptable.',
  },
  {
    question: 'What size SWA cable do I need for a 100A supply?',
    answer:
      'There is no single answer — it falls out of the calculation, not a rule of thumb. Start from Regulation 433.1.1: the device rating In must be at least the design current Ib and must not exceed the cable current-carrying capacity Iz. For a buried cable, Regulation 433.1.203 gives compliance where In does not exceed 0.9 × Iz. Take Iz from the Appendix 4 table for your cable — Table 4E4A for 90 °C thermosetting armoured cable to BS 5467 or BS 6724, Table 4D4A for 70 °C thermoplastic armoured — in the column for Reference Method D2 if the cable is direct in the ground or D1 if it is in a duct. Then correct for ambient ground temperature (Ca), grouping (Cg), soil thermal resistivity (Cs) and depth of laying (Cd), and check voltage drop over the full run against Table 4Ab. The Elec-Mate cable sizing calculator does all of this from the route details.',
  },
  {
    question: 'Does SWA cable need additional protection in the ground?',
    answer:
      'Not normally. Regulation 522.8.10 requires a buried cable to incorporate an earthed armour or metal sheath suitable for use as a protective conductor except where it is installed in a conduit or duct giving equivalent protection against mechanical damage — so SWA satisfies the requirement on its own and does not need to be ducted. Where the cable passes under a road or driveway, or through a building wall, ducting is still good practice because it allows future replacement without excavation. Where minimum depth cannot be achieved, or in corrosive ground, supplementary protection is needed and the cable manufacturer should be consulted.',
  },
  {
    question: 'How do I strip SWA cable correctly?',
    answer:
      'Score around the outer sheath at the required strip length with a sharp knife or an armoured cable stripping tool, bend the cable to crack the sheath, then remove it without nicking the armour. Fan out and straighten the armour wires and cut them square to the correct length for the gland with side cutters. Slide the shroud onto the cable first, then the back-nut and cone, before fitting the gland body. Never cut the armour wires too short — they must be gripped firmly between the cone and the gland body, because that joint is carrying the circuit protective conductor.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/mineral-insulated-cable-guide',
    title: 'Mineral Insulated Cable Guide',
    description: 'MICC/Pyrotenax cable for fire circuits and high-temperature environments.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/fp200-gold-cable-guide',
    title: 'FP200 Gold Cable Guide',
    description: 'Fire-resistant cable for fire alarm and emergency lighting circuits.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/cable-tray-installation',
    title: 'Cable Tray Installation',
    description: 'Perforated, solid bottom, and wire mesh cable management for commercial work.',
    icon: Layers,
    category: 'Guide',
  },
  {
    href: '/conduit-installation-guide',
    title: 'Conduit Installation Guide',
    description: 'Steel and PVC conduit wiring — bending, threading, and earthing.',
    icon: Wrench,
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
    id: 'what-is-swa',
    heading: 'What is Steel Wire Armoured (SWA) Cable?',
    content: (
      <>
        <p>
          Steel Wire Armoured (SWA) cable is a multi-core power cable for fixed wiring where
          mechanical protection is required. It is the default choice for underground runs, external
          sub-mains between buildings, and industrial and commercial wiring exposed to accidental
          damage.
        </p>
        <p>
          The construction is a copper or aluminium conductor, insulation on each core, a bedding
          layer, a layer of galvanised steel wires laid helically around the cable (the armour), and
          an outer sheath. The armour does two jobs: it takes the mechanical punishment, and when
          correctly terminated it acts as the circuit protective conductor for the circuit.
        </p>

        <h3 className="mt-6 text-[15px] font-semibold tracking-tight text-white">
          The regulation that puts SWA underground
        </h3>
        <p>
          Regulation 522.8.10 is the one that matters and it is worth reading in full. Except where
          installed in a conduit or duct which provides equivalent protection against mechanical
          damage, a cable buried in the ground shall incorporate an earthed armour or metal sheath or
          both, suitable for use as a protective conductor. The location of buried cables shall be
          marked by cable covers or a suitable marker tape. Buried cables, conduits and ducts shall
          be at a sufficient depth to avoid being damaged by any reasonably foreseeable disturbance
          of the ground.
        </p>
        <p>
          That is why plain twin-and-earth in a garden trench fails an inspection and SWA does not.
          SWA already carries an earthed armour suitable for use as a protective conductor, so it
          needs no additional duct — only depth and marking.
        </p>

        <h3 className="mt-6 text-[15px] font-semibold tracking-tight text-white">
          Which British Standard is the cable made to?
        </h3>
        <p>
          The standard printed on the sheath decides which Appendix 4 rating table applies. BS 7671
          Table 4A3 sets out the mapping.
        </p>
        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr>
                <th className={thCn}>Cable standard</th>
                <th className={thCn}>Insulation</th>
                <th className={thCn}>Conductor operating temp.</th>
                <th className={thCn}>Appendix 4 tables</th>
              </tr>
            </thead>
            <tbody>
              <tr className={trCn}>
                <td className={tdCn}>BS 5467</td>
                <td className={tdCn}>Thermosetting (XLPE), armoured</td>
                <td className={tdCn}>90 °C</td>
                <td className={tdCn}>4E3 single-core, 4E4 multicore</td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>BS 6724</td>
                <td className={tdCn}>
                  Thermosetting, armoured, low emission of smoke and corrosive gases
                </td>
                <td className={tdCn}>90 °C</td>
                <td className={tdCn}>4E3 single-core, 4E4 multicore</td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>BS 6346 (withdrawn)</td>
                <td className={tdCn}>PVC insulated, armoured</td>
                <td className={tdCn}>70 °C</td>
                <td className={tdCn}>4D3 single-core, 4D4 multicore</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          BS 6346 is retained in BS 7671 Table 4A3 for historical purposes only — the standard is
          withdrawn. New SWA bought in the UK today is normally BS 5467, or BS 6724 where a low smoke
          and fume cable is specified for escape routes and public buildings. Both are 90 °C
          thermosetting cables rated from Tables 4E3 and 4E4, not the 70 °C 4D tables.
        </p>
        <p>
          Regulation 522.6.204(a) also names BS 5467 and BS 6724 among the cables accepted as
          incorporating an earthed metallic covering complying with the requirements for a protective
          conductor of the circuit concerned.
        </p>
        <p>
          Install in accordance with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A4:2026
          </SEOInternalLink>{' '}
          and the associated IET Guidance Notes.
        </p>
      </>
    ),
  },
  {
    id: 'types-and-cores',
    heading: 'Types and Core Configurations',
    content: (
      <>
        <p>
          The core count decides where the earth comes from. Get this wrong and either the CPC is
          undersized or you have paid for a core you never connect.
        </p>
        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr>
                <th className={thCn}>Cores</th>
                <th className={thCn}>Conductors</th>
                <th className={thCn}>Circuit protective conductor</th>
                <th className={thCn}>Typical use</th>
              </tr>
            </thead>
            <tbody>
              <tr className={trCn}>
                <td className={tdCn}>2-core</td>
                <td className={tdCn}>Line, neutral</td>
                <td className={tdCn}>Armour</td>
                <td className={tdCn}>
                  Single-phase sub-mains to outbuildings, garden offices and garages
                </td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>3-core</td>
                <td className={tdCn}>Line, neutral, earth — or three lines (delta)</td>
                <td className={tdCn}>Dedicated earth core, armour in parallel</td>
                <td className={tdCn}>
                  Single-phase runs needing a larger CPC than the armour gives; three-phase delta
                  loads with no neutral
                </td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>4-core</td>
                <td className={tdCn}>Three lines, neutral</td>
                <td className={tdCn}>Armour</td>
                <td className={tdCn}>
                  Three-phase and neutral distribution — sub-mains, distribution boards, machinery
                </td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>5-core</td>
                <td className={tdCn}>Three lines, neutral, earth</td>
                <td className={tdCn}>Dedicated earth core, armour in parallel</td>
                <td className={tdCn}>
                  Three-phase runs where a separate CPC is specified in addition to the armour
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Whichever configuration you choose, the CPC has to satisfy Regulation 543.1.1 — either
          calculated with the adiabatic equation of Regulation 543.1.3, or selected in accordance
          with Regulation 543.1.4. Where the armour alone will not carry the prospective earth fault
          current for the disconnection time, move up to a cable with a dedicated earth core.
        </p>
        <p>
          Conductor sizes run from 1.5 mm² up to 400 mm² and beyond. Aluminium conductor SWA is used
          for large distribution cables where copper would be prohibitively heavy and expensive; it
          is rated from the 4H and 4J series of tables rather than the 4D and 4E series.
        </p>
      </>
    ),
  },
  {
    id: 'current-ratings',
    heading: 'Current Ratings and Cable Sizing',
    content: (
      <>
        <p>
          There is no such thing as &ldquo;the rating of 10 mm² SWA&rdquo;. The tabulated value
          depends on the cable standard, the reference method, and then the correction factors for
          your site. Work through it in that order.
        </p>

        <h3 className="mt-6 text-[15px] font-semibold tracking-tight text-white">
          Step 1 — pick the right reference method
        </h3>
        <p>
          Appendix 4 defines the installation conditions each column of a rating table assumes.
          Getting D1 and D2 the wrong way round is a common and expensive error: burying direct
          dissipates heat better than a duct, so D2 carries the higher rating.
        </p>
        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr>
                <th className={thCn}>Reference Method</th>
                <th className={thCn}>Condition</th>
                <th className={thCn}>Assumed by the table</th>
              </tr>
            </thead>
            <tbody>
              <tr className={trCn}>
                <td className={tdCn}>C</td>
                <td className={tdCn}>Clipped direct to a surface</td>
                <td className={tdCn}>30 °C ambient air (Table 4B1)</td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>D1</td>
                <td className={tdCn}>
                  Multicore armoured cable in conduit or cable ducting in the ground
                </td>
                <td className={tdCn}>
                  100 mm duct, 20 °C ground, soil 2.5 K·m/W, laid at 0.7 m
                </td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>D2</td>
                <td className={tdCn}>Multicore armoured cable direct in the ground</td>
                <td className={tdCn}>20 °C ground, soil 2.5 K·m/W, laid at 0.7 m</td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>E</td>
                <td className={tdCn}>Multicore cable in free air</td>
                <td className={tdCn}>
                  Heat dissipation unimpeded, clearance at least 0.3 × cable diameter
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Appendix 4 notes that D1 and D2 values are based on conservative installation parameters.
          Where the actual ground thermal resistance, ground ambient temperature and cable depth are
          known, the cable manufacturer or the ERA 69-30 series may support a smaller cable.
        </p>

        <h3 className="mt-6 text-[15px] font-semibold tracking-tight text-white">
          Step 2 — read Iz from the table that matches the cable
        </h3>
        <p>
          Do not carry a number across from another table. For 90 °C thermosetting armoured cable to
          BS 5467 or BS 6724, multicore ratings are in Table 4E4A and voltage drop in Table 4E4B. For
          70 °C thermoplastic armoured cable, the equivalents are Tables 4D4A and 4D4B. Aluminium
          conductor cables use the 4J series.
        </p>
        <div className={cardCn}>
          <p className="text-white text-sm leading-relaxed">
            <strong>Indicative only.</strong> The figures below are rough magnitudes for copper
            multicore armoured cable, given so you can sanity-check a design — they are not a
            substitute for reading the value out of the correct Appendix 4 table for the cable you
            are installing.
          </p>
        </div>
        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr>
                <th className={thCn}>Size</th>
                <th className={thCn}>Buried (approx.)</th>
                <th className={thCn}>Clipped direct (approx.)</th>
                <th className={thCn}>Typical application</th>
              </tr>
            </thead>
            <tbody>
              <tr className={trCn}>
                <td className={tdCn}>4 mm² 2-core</td>
                <td className={tdCn}>44 A</td>
                <td className={tdCn}>36 A</td>
                <td className={tdCn}>Small sub-feeds, garden supplies</td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>10 mm² 2-core</td>
                <td className={tdCn}>73 A</td>
                <td className={tdCn}>61 A</td>
                <td className={tdCn}>Cooker circuits, moderate sub-mains</td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>25 mm² 4-core</td>
                <td className={tdCn}>130 A</td>
                <td className={tdCn}>—</td>
                <td className={tdCn}>Three-phase sub-mains to distribution boards</td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>95 mm² 4-core</td>
                <td className={tdCn}>265 A</td>
                <td className={tdCn}>—</td>
                <td className={tdCn}>Large three-phase distribution feeds</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="mt-6 text-[15px] font-semibold tracking-tight text-white">
          Step 3 — apply the correction factors
        </h3>
        <p>
          Each factor has its own symbol and its own table. Applying the wrong one — or an invented
          &ldquo;installation method multiplier&rdquo; on top of a tabulated column — is how cables
          end up undersized.
        </p>
        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr>
                <th className={thCn}>Factor</th>
                <th className={thCn}>What it corrects for</th>
                <th className={thCn}>Table</th>
              </tr>
            </thead>
            <tbody>
              <tr className={trCn}>
                <td className={tdCn}>Ca</td>
                <td className={tdCn}>Ambient air temperature other than 30 °C</td>
                <td className={tdCn}>4B1</td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>Ca</td>
                <td className={tdCn}>Ambient ground temperature other than 20 °C</td>
                <td className={tdCn}>4B2</td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>Cs</td>
                <td className={tdCn}>
                  Soil thermal resistivity other than 2.5 K·m/W, cables buried direct or in
                  underground conduit
                </td>
                <td className={tdCn}>4B3</td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>Cd</td>
                <td className={tdCn}>
                  Depth of laying other than 0.7 m, direct buried cables and cables in buried ducts
                </td>
                <td className={tdCn}>4B4</td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>Cg</td>
                <td className={tdCn}>Grouping — more than one circuit buried directly in the ground</td>
                <td className={tdCn}>4C2</td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>Cg</td>
                <td className={tdCn}>Grouping — more than one circuit in ducts buried in the ground</td>
                <td className={tdCn}>4C3</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Two further factors catch people out on buried SWA. Under Regulation 433.1.203, for direct
          buried cables and cables in buried ducts, condition (c) of Regulation 433.1.1 is satisfied
          where the rated current of the protective device does not exceed 0.9 times the
          current-carrying capacity of the lowest rated conductor — an effective 0.9 factor on Iz.
          And under Regulation 433.1.202, where the protective device is a semi-enclosed fuse to BS
          3036, the factor is 0.725.
        </p>

        <h3 className="mt-6 text-[15px] font-semibold tracking-tight text-white">
          Step 4 — check voltage drop
        </h3>
        <p>
          Appendix 4, Section 6.4 and Table 4Ab give the voltage drop between the origin of an
          installation and any load point, expressed against the nominal voltage.
        </p>
        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr>
                <th className={thCn}>Supply</th>
                <th className={thCn}>Lighting</th>
                <th className={thCn}>Other uses</th>
              </tr>
            </thead>
            <tbody>
              <tr className={trCn}>
                <td className={tdCn}>
                  Low voltage installation supplied directly from a public low voltage distribution
                  system
                </td>
                <td className={tdCn}>3%</td>
                <td className={tdCn}>5%</td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>Low voltage installation supplied from a private LV supply</td>
                <td className={tdCn}>6%</td>
                <td className={tdCn}>8%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          On a private LV supply the voltage drop within each final circuit should still not exceed
          the 3% and 5% figures. SWA runs are often long, and Table 4Ab allows for that: where the
          wiring systems of the installation are longer than 100 m, the values above may be increased
          by 0.005% per metre beyond 100 m, without that increase being greater than 0.5%. The
          calculated voltage drop should include any effects due to harmonic currents.
        </p>
      </>
    ),
  },
  {
    id: 'stripping-and-terminating',
    heading: 'Stripping and Terminating SWA Cable',
    content: (
      <>
        <p>
          The gland is not just a cable entry. On a 2-core or 4-core cable it is the joint in the
          circuit protective conductor, so a poor termination is an earthing fault, not a cosmetic
          one.
        </p>
        <ol className={`${cardCn} list-none space-y-5 text-white`}>
          <li>
            <p className="font-semibold text-white">1 — Measure and mark</p>
            <p className="mt-1 text-sm leading-relaxed text-white">
              Measure the depth of the gland entry plus the length of armour the cone has to grip.
              Mark the outer sheath. Allow extra length inside the enclosure for dressing and
              connecting the cores.
            </p>
          </li>
          <li>
            <p className="font-semibold text-white">2 — Remove the outer sheath</p>
            <p className="mt-1 text-sm leading-relaxed text-white">
              Score around the sheath with a sharp knife without cutting into the armour, bend the
              cable to crack it, and pull the section off. An armoured cable stripping tool is safer
              and gives a cleaner cut.
            </p>
          </li>
          <li>
            <p className="font-semibold text-white">3 — Dress the armour</p>
            <p className="mt-1 text-sm leading-relaxed text-white">
              Fan out and straighten the steel wires, then cut them square to length with sharp side
              cutters. Uneven armour gives poor cone grip and a high-resistance earth path.
            </p>
          </li>
          <li>
            <p className="font-semibold text-white">4 — Fit the shroud first</p>
            <p className="mt-1 text-sm leading-relaxed text-white">
              Slide the shroud onto the cable before anything else. Once the gland is tightened onto
              the enclosure the shroud cannot be passed over it, and it cannot be retrofitted without
              stripping the termination back. This is the single most common SWA termination error on
              site.
            </p>
          </li>
          <li>
            <p className="font-semibold text-white">5 — Fit the gland</p>
            <p className="mt-1 text-sm leading-relaxed text-white">
              Slide the back-nut then the cone over the armour, taper facing the gland body. Feed the
              cable through the entry, then tighten the back-nut to draw the cone under the armour and
              clamp the wires. Firm, not crushed — over-tightening cuts the wires you are relying on.
            </p>
          </li>
          <li>
            <p className="font-semibold text-white">6 — Make the earth connection</p>
            <p className="mt-1 text-sm leading-relaxed text-white">
              Fit an earth tag between the gland body and the enclosure lock-nut and run a
              green/yellow conductor from the tag to the earth bar. Regulation 543.2.7: where the
              protective conductor is formed by the metal sheath or armour of a cable, the earthing
              terminal of each accessory shall be connected by a separate protective conductor to an
              earthing terminal incorporated in the associated box or other enclosure.
            </p>
          </li>
        </ol>

        <h3 className="mt-6 text-[15px] font-semibold tracking-tight text-white">
          Verifying the termination
        </h3>
        <p>
          Prove continuity of the armour with a low-resistance ohmmeter from end to end, then measure
          earth fault loop impedance and compare it with the maximum for the protective device:
          Table 41.2 for fuses on a 0.4 s disconnection time, Table 41.3 for circuit-breakers, and{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            Table 41.4 for fuses on a 5 s disconnection time
          </SEOInternalLink>
          .
        </p>
        <p>
          Those tabulated values assume the conductor is at its normal operating temperature, and on
          site you are usually testing a cold cable. Appendix 3 gives the correction: the requirement
          is considered met where the measured loop impedance Zs(m) does not exceed 0.8 × (U₀ × Cmin
          / Ia) — that is, 0.8 times the tabulated limit, or equivalently multiply your measured Zs by
          1.25 before comparing. For a low voltage supply given in accordance with the ESQCR, Cmin is
          0.95. Appendix 3 also notes this is one method of correcting for temperature and others are
          not precluded.
        </p>
      </>
    ),
  },
  {
    id: 'underground-burial',
    heading: 'Underground Burial Depth Requirements',
    content: (
      <>
        <p>
          Regulation 522.8.10 sets a performance requirement, not a number: buried cables, conduits
          and ducts shall be at a sufficient depth to avoid being damaged by any reasonably
          foreseeable disturbance of the ground. There is no general depth figure in BS 7671 for an
          ordinary domestic or commercial run — the depth has to be justified against the risk on
          that site.
        </p>
        <p>
          Where BS 7671 does put a figure on it, it does so for particular locations. These are the
          depths the standard itself uses, and they are widely adopted as practical minima elsewhere.
        </p>
        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr>
                <th className={thCn}>Location</th>
                <th className={thCn}>Depth</th>
                <th className={thCn}>Status</th>
                <th className={thCn}>Reference</th>
              </tr>
            </thead>
            <tbody>
              <tr className={trCn}>
                <td className={tdCn}>Caravan and camping parks — distribution circuits</td>
                <td className={tdCn}>0.6 m</td>
                <td className={tdCn}>
                  Generally considered a minimum (NOTE). Alternatively install outside the pitch area
                  where tent pegs or ground anchors may be driven
                </td>
                <td className={tdCn}>708.521.7.2</td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>Marinas — distribution cables</td>
                <td className={tdCn}>0.5 m</td>
                <td className={tdCn}>Generally considered a minimum (NOTE)</td>
                <td className={tdCn}>709.521.1.7</td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>
                  Agricultural premises — areas where vehicles and mobile agricultural machines
                  operate
                </td>
                <td className={tdCn}>0.6 m</td>
                <td className={tdCn}>Requirement, with added mechanical protection</td>
                <td className={tdCn}>Section 705</td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>Agricultural premises — arable or cultivated ground</td>
                <td className={tdCn}>1 m</td>
                <td className={tdCn}>Requirement</td>
                <td className={tdCn}>Section 705</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          In each case the depth is only excused where additional mechanical protection is provided.
          In practice that means deeper under anything carrying vehicles than under a footpath or
          border, and deeper again where groundworks or machinery are foreseeable.
        </p>
        <p>
          Remember the rating consequence as well as the safety one: Appendix 4 tabulates buried
          ratings at a depth of laying of 0.7 m. Bury shallower or deeper and Cd from Table 4B4
          applies.
        </p>

        <h3 className="mt-6 text-[15px] font-semibold tracking-tight text-white">
          Marking and bedding
        </h3>
        <p>
          Regulation 522.8.10 requires the location of buried cables to be marked by cable covers or
          a suitable marker tape, and buried conduits and ducts to be suitably identified. That
          marking is the regulatory requirement — surface route marker posts and as-fitted drawings
          are sound practice that make the route traceable later, but they are not what 522.8.10
          asks for and they do not replace tape or covers.
        </p>
        <p>
          Lay the cable on fine sand or selected fill free from sharp stones, glass and debris, cover
          with further selected fill, then lay the warning tape or covers above it for the full run
          before backfilling.
        </p>

        <div className={cardCn}>
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
            <div>
              <p className="mb-1 font-semibold text-white">
                PME / TN-C-S earthing when you feed an outbuilding
              </p>
              <p className="text-sm leading-relaxed text-white">
                BS 7671 does not ban exporting a PME earth to an outbuilding, and the myth that it
                does causes as many bad installations as the practice itself. What it requires is
                that every extraneous-conductive-part in that building is main bonded, with the
                bonding conductor selected under Regulation 544.1.1 in accordance with the
                characteristics of the distribution circuit protective conductor for that particular
                building — not less than 6 mm², and need not exceed 25 mm² in copper. Where those
                parts cannot be reliably bonded, a TT arrangement with a local electrode is the
                correct answer and the exported earth must then be kept separate.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white">
                Two specifics worth knowing. On agricultural and horticultural premises, Regulation
                705.411.4 NOTE 2 says the use of a PME earthing facility as the means of earthing is
                not recommended unless a metal grid is laid in the floor. And Regulation 709.411.4
                records that the ESQCR prohibit connecting a PME earthing facility to any metalwork
                in a boat — though not to the installations of permanent buildings. Regulation
                411.4.2 recommends an additional earth electrode at the main earthing terminal, but
                expressly excludes outbuildings of dwellings served by the installation from that
                recommendation.
              </p>
            </div>
          </div>
        </div>

        <p>
          Where minimum depth cannot be achieved — a shallow area of bedrock, for example — provide
          supplementary mechanical protection such as duct, tiles or concrete encasement, and record
          the route on as-fitted drawings retained for the life of the installation.
        </p>
      </>
    ),
  },
  {
    id: 'ip-ratings',
    heading: 'IP Ratings for SWA Glands',
    content: (
      <>
        <p>
          The gland has to suit the environment it sits in. A gland with too low an IP rating lets
          moisture and dust into the termination, and the first thing to degrade is the earth path
          through the armour.
        </p>
        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr>
                <th className={thCn}>Rating</th>
                <th className={thCn}>Protection</th>
                <th className={thCn}>Where it is appropriate</th>
              </tr>
            </thead>
            <tbody>
              <tr className={trCn}>
                <td className={tdCn}>IP54</td>
                <td className={tdCn}>Dust protected, splashing water</td>
                <td className={tdCn}>
                  Indoor locations with dust or occasional splash — garages, plant rooms. Not for
                  outdoor or underground use
                </td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>IP66</td>
                <td className={tdCn}>Dust tight, powerful water jets</td>
                <td className={tdCn}>
                  The normal minimum for outdoor glands and cable entry into external enclosures
                </td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>IP68</td>
                <td className={tdCn}>Dust tight, continuous immersion</td>
                <td className={tdCn}>
                  Entries into pits, chambers and below-ground enclosures, and where cables pass
                  through below-ground walls
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          The assembly is only as good as its weakest part: an IP68 gland in an IP66 enclosure gives
          you IP66. Match the gland to the enclosure rating or better, and choose the seal material —
          neoprene, EPDM or silicone — for the temperature and chemical exposure at that entry.
        </p>
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common Mistakes in SWA Cable Installation',
    content: (
      <>
        <p>
          These are the SWA defects that turn up as observations on{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">EICRs</SEOInternalLink>.
        </p>
        <div className={cardCn}>
          <div className="mb-3 flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 shrink-0 text-red-400" />
            <p className="font-semibold text-white">Five that keep recurring</p>
          </div>
          <ul className="space-y-4 text-white">
            <li>
              <strong>Armour not earthed at one or both ends.</strong> The most dangerous of the set.
              An unearthed armour provides no fault protection and can become live if a conductor
              faults to it.
            </li>
            <li>
              <strong>The wrong gland.</strong> A standard non-armoured gland grips only the outer
              sheath — no armour retention, no earth continuity, and nothing obvious to see from the
              outside.
            </li>
            <li>
              <strong>Insufficient depth.</strong> Shallow cables are routinely struck during garden
              work and landscaping. Measure the depth and record it.
            </li>
            <li>
              <strong>No cable covers or marker tape.</strong> Regulation 522.8.10 requires the
              location of buried cables to be marked by cable covers or a suitable marker tape. It is
              a requirement, not an optional extra.
            </li>
            <li>
              <strong>Voltage drop not calculated over the real route length.</strong> SWA runs are
              long. Check the full length against Table 4Ab — 3% for lighting, 5% for other uses on a
              public LV supply.
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Documenting SWA Installations',
    content: (
      <>
        <p>
          Certify every SWA installation with an Electrical Installation Certificate (EIC), or a
          Minor Electrical Installation Works Certificate where the work does not extend to a new
          circuit. Keep the cable sizing calculation and the as-fitted route drawing with the
          certificate — both are what a future inspector, and your own insurer, will ask for.
        </p>
        <div className={cardCn}>
          <div className="flex items-start gap-4">
            <ClipboardCheck className="mt-0.5 h-6 w-6 shrink-0 text-elec-yellow" />
            <div>
              <h4 className="mb-1 font-bold text-white">Certify on site</h4>
              <p className="text-sm leading-relaxed text-white">
                Use the{' '}
                <SEOInternalLink href="/tools/eicr-certificate">
                  Elec-Mate EIC certificate app
                </SEOInternalLink>{' '}
                to complete and issue the certificate before you leave. Record earth fault loop
                impedance, continuity of the armour, insulation resistance and the cable route
                description in the app, and send the PDF to the client on the spot.
              </p>
            </div>
          </div>
        </div>
        <p className="mt-4 text-sm text-white">
          Reviewed by Andrew Moore, founder of Elec-Mate. Content is grounded in BS 7671:2018+A4:2026
          and the IET Guidance Notes series.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ArmaCableInstallationPage() {
  return (
    <GuideTemplate
      title="Armoured Cable Installation UK | SWA Cable Guide"
      description="Complete UK guide to Steel Wire Armoured (SWA) cable installation. Types, current ratings, stripping and terminating with SWA glands."
      datePublished="2026-03-27"
      dateModified="2026-08-07"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          Armoured Cable Installation UK: <span className="text-yellow-400">SWA Cable Guide</span>
        </>
      }
      heroSubtitle="Everything electricians need to know about Steel Wire Armoured (SWA) cable — core configurations, which Appendix 4 table to read, correct gland termination for earth continuity, underground burial depths, IP ratings, and the mistakes that generate EICR observations."
      answerBox={{
        question: 'How do you connect armoured cable correctly?',
        answer:
          'Strip the outer sheath, fan and trim the armour square, then slide the shroud onto the cable first, followed by the back-nut and cone. Draw the cone under the armour with the back-nut so the wires are clamped firmly but not crushed. Fit an earth tag under the lock-nut and run a green/yellow tail to the enclosure earth bar. Do exactly the same at both ends — the armour is the circuit protective conductor.',
        detail:
          'BS 7671 Regulation 543.2.1(e) permits the armouring of a cable to be used as a protective conductor. Regulation 543.2.7 requires the earthing terminal of each accessory to be connected by a separate protective conductor to an earthing terminal in the associated box or enclosure where the CPC is formed by the armour.',
      }}
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About SWA Armoured Cable Installation"
      relatedPages={relatedPages}
      ctaHeading="Certify SWA Cable Installations on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate to complete Electrical Installation Certificates on site. Record test results, cable details, and route descriptions — instant PDF export. 7-day free trial."
    />
  );
}
